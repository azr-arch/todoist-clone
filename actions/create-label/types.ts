import { z } from "zod";

import { Label } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateLabelSchema } from "./schema";

export type InputType = z.infer<typeof CreateLabelSchema>;
export type ReturnType = ActionState<InputType, Label>;
