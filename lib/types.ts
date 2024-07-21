import { Label, Section, Task } from "@prisma/client";

export type SectionWithLists = Section & {
    tasks?: Task[];
};

export type LabelsWithLists = (Label & {
    tasks?: Task[];
})[];
