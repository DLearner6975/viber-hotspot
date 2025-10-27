import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    InputLabel,
    Paper,
    Typography,
    type SxProps,
} from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { ActivitySchema } from "../../../lib/schemas/activitySchemas";
import { activitySchema } from "../../../lib/schemas/activitySchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import { categoryOptions } from "./categoryOptions";
import SelectInput from "../../../app/shared/components/SelectInput";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";
import type { Theme } from "@mui/material/styles";

const cardTitleWhite: SxProps<Theme> = {
    color: "white",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    // fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
};
const cardCategoryWhite: SxProps<Theme> = {
    color: "white",
    margin: "0 0 3px",
    padding: "0",
    fontSize: "14px",
    textTransform: "uppercase",
    fontWeight: "500",
    // fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    letterSpacing: "0",
};

export default function ActivityForm() {
    const { reset, handleSubmit, control } = useForm<ActivitySchema>({
        mode: "onTouched",
        resolver: zodResolver(activitySchema),
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateActivity, createActivity, activity, isLoadingActivity } =
        useActivities(id);

    useEffect(() => {
        if (activity)
            reset({
                ...activity,
                location: {
                    city: activity.city,
                    venue: activity.venue,
                    latitude: activity.latitude,
                    longitude: activity.longitude,
                },
            });
    }, [activity, reset]);

    const onSubmit = async (data: ActivitySchema) => {
        const { location, ...rest } = data;
        const flattenedData = { ...rest, ...location };
        try {
            if (activity) {
                const updateData = { ...activity, ...flattenedData };
                await updateActivity.mutateAsync(updateData, {
                    onSuccess: () => navigate(`/activities/${activity.id}`),
                });
            } else {
                createActivity.mutate(flattenedData, {
                    onSuccess: (id) => navigate(`/activities/${id}`),
                });
            }
        } catch (error) {
            console.log("🚀 ~ onSubmit ~ error:", error);
        }
    };

    if (isLoadingActivity) return <Typography>Loading...</Typography>;

    return (
        <Card>
            <CardHeader
                sx={{ bgcolor: "primary.main" }}
                title={activity ? "Edit Activity" : "Create Activity"}
                subheader={
                    activity ? "Edit your activity" : "Create a new activity"
                }
                slotProps={{
                    title: {
                        variant: "h4",
                        sx: cardTitleWhite,
                    },
                    subheader: {
                        sx: cardCategoryWhite,
                    },
                }}
            />
            <CardContent>
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
                        <DateTimeInput
                            label="Date"
                            control={control}
                            name="date"
                        />
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
                            disabled={
                                updateActivity.isPending ||
                                createActivity.isPending
                            }
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
