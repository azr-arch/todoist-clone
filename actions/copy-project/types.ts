import { z } from "zod";

import { Project, Task } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CopyProjectSchema } from "./schema";

export type InputType = z.infer<typeof CopyProjectSchema>;
export type ReturnType = ActionState<InputType, Project>;
