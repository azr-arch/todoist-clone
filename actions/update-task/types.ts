import { z } from "zod";

import { Task } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { UpdateTaskSchema } from "./schema";

export type InputType = z.infer<typeof UpdateTaskSchema>;
export type ReturnType = ActionState<InputType, Task>;
