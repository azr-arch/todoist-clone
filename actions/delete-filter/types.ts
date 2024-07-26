import { z } from "zod";

import { Label } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { DeleteFilterSchema } from "./schema";

export type InputType = z.infer<typeof DeleteFilterSchema>;
export type ReturnType = ActionState<InputType, Label>;
