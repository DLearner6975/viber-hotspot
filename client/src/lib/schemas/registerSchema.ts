import { z } from "zod";
import { requiredString } from "@lib/util/util";

export const registerSchema = z.object({
    email: z.email({ message: "email is required" }),
    displayName: requiredString("displayName"),
    password: requiredString("password")
        .min(8, { message: "Password must be at least 8 characters" })
        .max(100, { message: "Password cannot exceed 100 characters" })
        .regex(/[A-Z]/, {
            message: "Password must include at least one uppercase letter",
        })
        .regex(/[a-z]/, {
            message: "Password must include at least one lowercase letter",
        })
        .regex(/[0-9]/, {
            message: "Password must include at least one number",
        })
        .regex(/[^A-Za-z0-9]/, {
            message: "Password must include at least one symbol",
        }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
