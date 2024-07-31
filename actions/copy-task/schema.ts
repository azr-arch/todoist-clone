import { Priority } from "@prisma/client";
import { z } from "zod";

export const CopyTask = z.object({
    taskId: z.string(),
});
