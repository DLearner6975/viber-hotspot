import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "@lib/hooks/useActivities";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";
import LoadingSpinner from "@shared/components/LoadingSpinner";

export default function ActivityDetailPage() {
    const { id } = useParams();
    const { activity, isLoadingActivity } = useActivities(id);

    if (isLoadingActivity) return <LoadingSpinner size={50} />;

    if (!activity) return <Typography>Activity not found</Typography>;

    return (
        <Grid container spacing={2}>
            <Grid size={8}>
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity} />
                <ActivityDetailsChat />
            </Grid>
            <Grid size={4}>
                <ActivityDetailsSidebar activity={activity} />
            </Grid>
        </Grid>
    );
}
