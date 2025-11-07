import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { formatDate } from "@lib/util/util";
import { useState } from "react";
import MapComponent from "@shared/components/MapComponent";

type Props = {
    activity: Activity;
};

export default function ActivityDetailsInfo({ activity }: Props) {
    const [mapOpen, setMapOpen] = useState(false);
    return (
        <Paper sx={{ mb: 2 }}>
            <Grid container alignItems="center" pl={2} py={1} wrap="nowrap">
                <Grid
                    size="auto"
                    sx={{ flexShrink: 0, pr: { xs: 0.5, sm: 1 } }}
                >
                    <Info color="info" fontSize="large" />
                </Grid>
                <Grid size="grow" sx={{ minWidth: 0 }}>
                    <Typography>{activity.description}</Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid container alignItems="center" pl={2} py={1} wrap="nowrap">
                <Grid
                    size="auto"
                    sx={{ flexShrink: 0, pr: { xs: 0.5, sm: 1 } }}
                >
                    <CalendarToday color="info" fontSize="large" />
                </Grid>
                <Grid size="grow" sx={{ minWidth: 0 }}>
                    <Typography> {formatDate(activity.date)}</Typography>
                </Grid>
            </Grid>
            <Divider />

            <Grid container alignItems="center" pl={2} py={1} wrap="nowrap">
                <Grid
                    size="auto"
                    sx={{ flexShrink: 0, pr: { xs: 0.5, sm: 1 } }}
                >
                    <Place color="info" fontSize="large" />
                </Grid>
                <Grid
                    size="grow"
                    sx={{ minWidth: 0 }}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                >
                    <Typography>
                        {activity.venue}, {activity.city}
                    </Typography>
                    <Button
                        sx={{ whiteSpace: "nowrap", mx: 2 }}
                        onClick={() => setMapOpen(!mapOpen)}
                    >
                        {mapOpen ? "Hide Map" : "Show Map"}
                    </Button>
                </Grid>
            </Grid>
            {mapOpen && (
                <Box sx={{ height: 400, zIndex: 1000, display: "block" }}>
                    <MapComponent
                        position={[activity.latitude, activity.longitude]}
                        venue={activity.venue}
                    />
                </Box>
            )}
        </Paper>
    );
}
