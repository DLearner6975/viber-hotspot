import { Box, Button } from "@mui/material";
import { useActivities } from "@lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import type { ActivitySchema } from "@lib/schemas/activitySchemas";
import { activitySchema } from "@lib/schemas/activitySchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@shared/components/TextInput";
import { categoryOptions } from "./categoryOptions";
import SelectInput from "@shared/components/SelectInput";
import DateTimeInput from "@shared/components/DateTimeInput";
import LocationInput from "@shared/components/LocationInput";
import SectionCard from "@shared/components/SectionCard";
import LoadingSpinner from "@shared/components/LoadingSpinner";

export default function ActivityForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateActivity, createActivity, activity, isLoadingActivity } =
        useActivities(id);

    const defaultValues = useMemo<Partial<ActivitySchema>>(() => {
        if (!activity) return {};
        return {
            title: activity.title,
            description: activity.description,
            category: activity.category,
            date: new Date(activity.date),
            location: {
                city: activity.city,
                venue: activity.venue,
                latitude: activity.latitude,
                longitude: activity.longitude,
            },
        };
    }, [activity]);

    const { reset, handleSubmit, control } = useForm<ActivitySchema>({
        mode: "onTouched",
        resolver: zodResolver(activitySchema),
        defaultValues,
    });

    useEffect(() => {
        if (activity) {
            reset({
                title: activity.title,
                description: activity.description,
                category: activity.category,
                date: new Date(activity.date),
                location: {
                    city: activity.city,
                    venue: activity.venue,
                    latitude: activity.latitude,
                    longitude: activity.longitude,
                },
            });
        }
    }, [activity, reset]);

    const onSubmit = async (data: ActivitySchema) => {
        const { location, ...rest } = data;
        const flattenedData = { ...rest, ...location };
        try {
            if (activity && id) {
                await updateActivity.mutateAsync(
                    { id, ...flattenedData },
                    {
                        onSuccess: () => navigate(`/activities/${id}`),
                    }
                );
            } else {
                createActivity.mutate(flattenedData, {
                    onSuccess: (id) => navigate(`/activities/${id}`),
                });
            }
        } catch (error) {
            console.log("🚀 ~ onSubmit ~ error:", error);
        }
    };

    if (isLoadingActivity) return <LoadingSpinner size={50} />;
    const isSubmitting = activity
        ? updateActivity.isPending
        : createActivity.isPending;
    return (
        <SectionCard
            title={activity ? "Edit Activity" : "Create Activity"}
            subheader={
                activity ? "Edit your activity" : "Create a new activity"
            }
        >
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                display="flex"
                flexDirection="column"
                gap={3}
            >
                <TextInput label="Title" control={control} name="title" />
                <TextInput
                    label="Description"
                    control={control}
                    name="description"
                    multiline
                    rows={3}
                />
                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        flexDirection: { xs: "column", md: "row" },
                    }}
                >
                    <SelectInput
                        items={categoryOptions}
                        label="Category"
                        control={control}
                        name="category"
                    />
                    <DateTimeInput label="Date" control={control} name="date" />
                </Box>
                <LocationInput
                    label="Enter the location"
                    control={control}
                    name="location"
                />
                <Box display="flex" justifyContent="end" gap={3}>
                    <Button onClick={() => navigate(-1)} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        loading={isSubmitting}
                        loadingPosition="end"
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            color: "white",
                            backgroundColor: "primary.main",
                            "&:hover": {
                                backgroundColor: "primary.dark",
                            },
                        }}
                        disabled={isSubmitting}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </SectionCard>
    );
}
