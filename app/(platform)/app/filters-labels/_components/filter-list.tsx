"use client";

import { useAddFilterModal } from "@/hooks/use-add-filter-modal";
import { CollapsibleList } from "./collapsible-list";
import { AddFilterModal } from "@/components/modals/add-filter-modal";
import { Filter } from "@prisma/client";

export const FilterList = ({ data }: { data?: Filter[] }) => {
    const { isOpen, onOpen, onClose } = useAddFilterModal();

    return (
        <>
            <AddFilterModal type="add" isOpen={isOpen} onClose={onClose} />
            <CollapsibleList title="Filters" type="filter" onDialogOpen={onOpen} data={data} />
        </>
    );
};
