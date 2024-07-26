import { z } from "zod";

import { Label } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { EditLabelSchema } from "./schema";

export type InputType = z.infer<typeof EditLabelSchema>;
export type ReturnType = ActionState<InputType, Label>;
