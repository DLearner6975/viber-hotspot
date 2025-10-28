import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";

export default function ActivityDashboard() {
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }} sx={{ order: { xs: 2, md: 1 } }}>
                <ActivityList />
            </Grid>
            <Grid
                size={{ xs: 12, md: 4 }}
                sx={{
                    order: { xs: 1, md: 2 },
                    position: { md: "sticky" },
                    top: { md: 112 },
                    alignSelf: { md: "flex-start" },
                }}
            >
                <ActivityFilters />
            </Grid>
        </Grid>
    );
}
