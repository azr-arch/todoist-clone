import { z } from "zod";

import { Task } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { AddTaskSchema } from "./schema";

export type InputType = z.infer<typeof AddTaskSchema>;
export type ReturnType = ActionState<InputType, Task>;
