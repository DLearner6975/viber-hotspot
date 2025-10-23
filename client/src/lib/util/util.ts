import { format, formatDistanceToNow, type DateArg } from "date-fns";
import { z } from "zod";

export const formatDate = (date: DateArg<Date>) => {
    return format(date, "dd MMM yyyy h:mm a");
};

export const timeAgo = (date: DateArg<Date>) => {
    return `${formatDistanceToNow(date)} ago`;
};

export const requiredString = (fieldName: string) =>
    z
        .string({ message: `${fieldName} is required` })
        .min(1, { message: `${fieldName} is required` });
export const requiredDate = (fieldName: string) =>
    z
        .date({ message: `${fieldName} is required` })
        .min(new Date(), { message: `${fieldName} must be in the future` });
