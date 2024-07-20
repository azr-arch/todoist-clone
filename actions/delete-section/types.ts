import { z } from "zod";

import { Section, Task } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { DeleteSectionSchema } from "./schema";

export type InputType = z.infer<typeof DeleteSectionSchema>;
export type ReturnType = ActionState<InputType, Section>;
