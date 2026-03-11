import { z } from "zod";
import { requiredString } from "@lib/util/util";

export const loginSchema = z.object({
    email: z.email(),
    password: requiredString("password")
        .min(8, { message: "Password must be at least 8 characters" })
        .max(100, { message: "Password cannot exceed 100 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
