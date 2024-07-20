import { Section, Task } from "@prisma/client";

export type SectionWithLists = Section & {
    tasks?: Task[];
};
