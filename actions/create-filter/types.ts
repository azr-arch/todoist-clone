import { z } from "zod";

import { Label } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateFilterSchema } from "./schema";

export type InputType = z.infer<typeof CreateFilterSchema>;
export type ReturnType = ActionState<InputType, Label>;
