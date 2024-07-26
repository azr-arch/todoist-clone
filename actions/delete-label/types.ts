import { z } from "zod";

import { Label } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { DeleteLabelSchema } from "./schema";

export type InputType = z.infer<typeof DeleteLabelSchema>;
export type ReturnType = ActionState<InputType, Label>;
