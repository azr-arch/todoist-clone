import { z } from "zod";

import { Project, Task } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { UpdateProjectSchema } from "./schema";

export type InputType = z.infer<typeof UpdateProjectSchema>;
export type ReturnType = ActionState<InputType, Project>;
