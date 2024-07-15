import { z } from "zod";

import { Task } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { UpdateTaskOrderSchema } from "./schema";

export type InputType = z.infer<typeof UpdateTaskOrderSchema>;
export type ReturnType = ActionState<InputType, Task[]>;
