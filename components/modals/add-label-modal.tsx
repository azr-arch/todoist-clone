"use client";

import { useCallback, useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { COLORS } from "@/lib/constants";
import { FormSubmit } from "../form/form-submit";
import { useAction } from "@/hooks/use-action";
import { createLabel } from "@/actions/create-label";
import { toast } from "sonner";
import { editLabel } from "@/actions/edit-label";
import { useAddLabel } from "@/hooks/use-add-label-modal";

interface AddLabelModalProps {
    isOpen: boolean;
    onClose: () => void;
    type?: "edit" | "add";
}

export const AddLabelModal = ({ isOpen, onClose, type = "add" }: AddLabelModalProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [name, setName] = useState("");

    const { defaultFormValue } = useAddLabel();
    const { execute } = useAction(createLabel, {
        onComplete: () => {},
        onSuccess: () => {
            toast("Label created successfully!");
            onClose();
        },
        onError: (err) => {
            toast(err);
        },
    });

    const { execute: executeEdit } = useAction(editLabel, {
        onComplete: () => {
            toast("Label updated successfully!");
            onClose();
        },
        onSuccess: () => {
            toast("Label updated successfully!");
            onClose();
        },
        onError: (err) => {
            console.log("error: ", err);
            toast(err);
        },
    });

    const onSubmit = useCallback(
        (formData: FormData) => {
            const name = formData.get("name") as string;
            const color = formData.get("color") as string;
            const labelId = formData.get("labelId") as string;

            if (type === "add") {
                execute({
                    name,
                    color,
                });

                return;
            }

            // Edit for type "edit"
            executeEdit({
                name,
                color,
                labelId: labelId!,
            });
            return;
        },
        [execute, executeEdit, type]
    );

    const closeModal = useCallback(() => {
        setName("");
        onClose();
    }, [onClose]);

    useEffect(() => {
        if (defaultFormValue?.name) {
            setName(defaultFormValue.name);
        }
    }, [defaultFormValue]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Modal title="Add label" isOpen={isOpen} onClose={closeModal}>
            <form action={onSubmit} className="w-full space-y-4">
                {defaultFormValue?.labelId && (
                    <input type="hidden" name="labelId" value={defaultFormValue.labelId} readOnly />
                )}
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

                    <Select defaultValue={defaultFormValue?.color ?? "#808081"} name="color">
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
                <div className="w-full flex items-center justify-end gap-x-2">
                    <Button type="button" onClick={closeModal} variant="outline">
                        Cancel
                    </Button>

                    <FormSubmit disabled={!name} label="Add" />
                </div>
            </form>
        </Modal>
    );
};
