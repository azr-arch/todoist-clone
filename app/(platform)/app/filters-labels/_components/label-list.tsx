"use client";

import { useAddFilterModal } from "@/hooks/use-add-filter-modal";
import { CollapsibleList } from "./collapsible-list";
import { AddFilterModal } from "@/components/modals/add-filter-modal";
import { Label, Task } from "@prisma/client";
import { LabelWithLists } from "@/lib/types";

interface LabelListProps {
    data?: LabelWithLists[];
}

export const LabelList = ({ data }: LabelListProps) => {
    const { isOpen, onOpen, onClose } = useAddFilterModal();

    return (
        <>
            <AddFilterModal isOpen={isOpen} onClose={onClose} />
            <CollapsibleList type="label" title="Labels" onDialogOpen={onOpen} data={data} />
        </>
    );
};
