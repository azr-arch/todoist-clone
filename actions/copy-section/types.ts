import { z } from "zod";

import { Section, Task } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CopySectionSchema } from "./schema";

export type InputType = z.infer<typeof CopySectionSchema>;
export type ReturnType = ActionState<InputType, Section>;
