import { z } from "zod";

import { Project } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { DeleteProjectSchema } from "./schema";

export type InputType = z.infer<typeof DeleteProjectSchema>;
export type ReturnType = ActionState<InputType, Project>;
