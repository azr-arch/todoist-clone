import { z } from "zod";

import { Section, Task } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateSectionSchema } from "./schema";

export type InputType = z.infer<typeof CreateSectionSchema>;
export type ReturnType = ActionState<InputType, Section>;
