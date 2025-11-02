import { z } from "zod";
import { requiredString } from "@lib/util/util";

export const registerSchema = z.object({
    email: z.email({ message: "email is required" }),
    displayName: requiredString("displayName"),
    password: requiredString("password"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
