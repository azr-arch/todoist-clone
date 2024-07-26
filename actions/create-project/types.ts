import { z } from "zod";

import { Project } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateProjectSchema } from "./schema";

export type InputType = z.infer<typeof CreateProjectSchema>;
export type ReturnType = ActionState<InputType, Project>;
