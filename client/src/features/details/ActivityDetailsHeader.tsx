import {
    Card,
    CardMedia,
    Box,
    Typography,
    Button,
    useTheme,
    Chip,
} from "@mui/material";
import { Link } from "react-router";
import { formatDate } from "../../lib/util/util";
import { useActivities } from "../../lib/hooks/useActivities";

type Props = {
    activity: Activity;
};

export default function ActivityDetailsHeader({ activity }: Props) {
    const { updateAttendance } = useActivities(activity.id);
    const theme = useTheme();
    const {
        id,
        isGoing,
        isHost,
        isCancelled,
        hostDisplayName,
        hostId,
        date,
        category,
        title,
    } = activity;

    return (
        <Card
            sx={{
                position: "relative",
                mb: 2,
                backgroundColor: "transparent",
                overflow: "hidden",
            }}
        >
            {isCancelled && (
                <Chip
                    sx={{
                        position: "absolute",
                        left: 40,
                        top: 20,
                        zIndex: 1000,
                        borderRadius: 1,
                    }}
                    color="error"
                    label="Cancelled"
                />
            )}
            <CardMedia
                component="img"
                height="300"
                image={`/images/categoryImages/${category}.jpg`}
                alt={`${category} image`}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    color: "white",
                    padding: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    background:
                        "linear-gradient(to top, rgba(0, 0, 0, 1.0), transparent)",
                    boxSizing: "border-box",
                }}
            >
                {/* Text Section */}
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        {title}
                    </Typography>
                    <Typography variant="subtitle1">
                        {formatDate(date)}
                    </Typography>
                    <Typography variant="subtitle2">
                        Hosted by
                        <Typography
                            component={Link}
                            to={`/profiles/${hostId}`}
                            color="secondary"
                            fontWeight="bold"
                            ml={0.5}
                        >
                            {hostDisplayName}
                        </Typography>
                    </Typography>
                </Box>

                {/* Buttons aligned to the right */}
                <Box sx={{ display: "flex", gap: 2 }}>
                    {isHost ? (
                        <>
                            <Button
                                variant="contained"
                                color={isCancelled ? "success" : "error"}
                                onClick={() => updateAttendance.mutate(id)}
                                disabled={updateAttendance.isPending}
                                sx={{
                                    "&.Mui-disabled": {
                                        backgroundColor:
                                            theme.palette.grey[600],
                                        color: theme.palette.text.disabled,
                                    },
                                }}
                            >
                                {isCancelled
                                    ? "Re-activate Activity"
                                    : "Cancel Activity"}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={`/manage/${id}`}
                                disabled={isCancelled}
                                sx={{
                                    "&.Mui-disabled": {
                                        backgroundColor:
                                            theme.palette.grey[600],
                                        color: theme.palette.text.disabled,
                                    },
                                }}
                            >
                                Manage Event
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            color={isGoing ? "primary" : "info"}
                            onClick={() => updateAttendance.mutate(id)}
                            disabled={updateAttendance.isPending || isCancelled}
                            sx={{
                                "&.Mui-disabled": {
                                    backgroundColor: theme.palette.grey[600],
                                    color: theme.palette.text.disabled,
                                },
                            }}
                        >
                            {isGoing ? "Cancel Attendance" : "Join Activity"}
                        </Button>
                    )}
                </Box>
            </Box>
        </Card>
    );
}
