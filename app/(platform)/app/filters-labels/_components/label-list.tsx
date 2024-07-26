"use client";

import { useAddLabel } from "@/hooks/use-add-label-modal";
import { CollapsibleList } from "./collapsible-list";
import { Label, Task } from "@prisma/client";
import { LabelWithLists } from "@/lib/types";
import { AddLabelModal } from "@/components/modals/add-label-modal";

interface LabelListProps {
    data?: LabelWithLists[];
}

export const LabelList = ({ data }: LabelListProps) => {
    const { isOpen, onOpen, onClose } = useAddLabel();

    return (
        <>
            <AddLabelModal isOpen={isOpen} onClose={onClose} />
            <CollapsibleList type="label" title="Labels" onDialogOpen={onOpen} data={data} />
        </>
    );
};
