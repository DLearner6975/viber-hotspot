import { z } from "zod";
import { requiredDate, requiredString } from "@lib/util/util";

export const activitySchema = z.object({
    title: requiredString("Title"),
    description: requiredString("Description"),
    category: requiredString("Category"),
    date: requiredDate("Date"),
    location: z.object({
        venue: requiredString("Venue"),
        city: z.string().optional(),
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
    }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
