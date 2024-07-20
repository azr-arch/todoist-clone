import { z } from "zod";

import { Section, Task } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { UpdateSectionSchema } from "./schema";

export type InputType = z.infer<typeof UpdateSectionSchema>;
export type ReturnType = ActionState<InputType, Section>;
