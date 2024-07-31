import { Label, Project, Section, Task, TaskLabels } from "@prisma/client";

export type SectionWithLists = Section & {
    tasks?: Task[];
};

export type LabelWithLists = Label & {
    tasks?: Task[];
};

export type FullTask = Task & {
    taskLabels: Label[];
    section: Section | null;
    project: Project | null;
};
