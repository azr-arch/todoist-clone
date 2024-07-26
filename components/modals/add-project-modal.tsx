"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { COLORS } from "@/lib/constants";
import { Button } from "../ui/button";
import { FormSubmit } from "../form/form-submit";
import { useAction } from "@/hooks/use-action";
import { createProject } from "@/actions/create-project";
import { toast } from "sonner";

interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddProjectModal = ({ isOpen, onClose }: AddProjectModalProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [name, setName] = useState("");

    const { execute, isLoading } = useAction(createProject, {
        onComplete: () => {
            toast("Project created!");
            onClose();
        },
        onSuccess: () => {},
        onError: (err) => {
            toast(err);
        },
    });

    const onSubmit = (formData: FormData) => {
        const name = formData.get("name") as string;
        const color = formData.get("color") as string;

        execute({
            name,
            color,
        });
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Modal title="Add project" isOpen={isOpen} onClose={onClose}>
            <form className="w-full space-y-4" action={onSubmit}>
                {/* {defaultFormValue?.labelId && (
                    <input type="hidden" name="labelId" value={defaultFormValue.labelId} readOnly />
                )} */}
                <div className="space-y-1">
                    <Label>Name</Label>
                    <Input
                        className="h-8"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="off"
                    />
                </div>

                <div className="space-y-1">
                    <Label>Color</Label>

                    <Select defaultValue={"#808081"} name="color">
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {COLORS.map((color) => (
                                <SelectItem key={color.value} value={color.value}>
                                    <div className="flex items-center w-full gap-x-3">
                                        <span
                                            style={{ backgroundColor: color.value }}
                                            className={`w-3 h-3 rounded-full`}
                                        />
                                        {color.label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <p className="text-sm text-neutral-400 font-thin">
                        TODO: Add Workspace select and Layout view
                    </p>
                </div>
                {/* Implement workspace, layout view */}
                <div className="w-full flex items-center justify-end gap-x-2">
                    <Button type="button" onClick={onClose} variant="outline">
                        Cancel
                    </Button>

                    <FormSubmit disabled={false} label="Add" />
                </div>
            </form>
        </Modal>
    );
};
