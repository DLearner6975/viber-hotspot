import {
    Typography,
    List,
    ListItem,
    Chip,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Grid,
} from "@mui/material";
import { Link } from "react-router";
import SectionCard from "@shared/components/SectionCard";

type Props = { activity: Activity };

export default function ActivityDetailsSidebar({ activity }: Props) {
    return (
        <SectionCard title={`${activity.attendees.length} People Going`}>
            {activity.attendees.map((attendee) => (
                <Grid key={attendee.id} container alignItems="center">
                    <Grid size={8}>
                        <List
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <ListItem
                                component={Link}
                                to={`/profiles/${attendee.id}`}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        alt={`${attendee.displayName} image`}
                                        src={attendee.imageUrl}
                                        sx={{
                                            width: 75,
                                            height: 75,
                                            mr: 3,
                                        }}
                                    />
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="h6">
                                        {attendee.displayName}
                                    </Typography>
                                    {attendee.following && (
                                        <Typography
                                            variant="body2"
                                            color="orange"
                                        >
                                            Following
                                        </Typography>
                                    )}
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid
                        size={4}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 1,
                        }}
                    >
                        {activity.hostId === attendee.id && (
                            <Chip
                                label="Host"
                                color="warning"
                                variant="filled"
                                sx={{ borderRadius: 2 }}
                            />
                        )}
                    </Grid>
                </Grid>
            ))}
        </SectionCard>
    );
}
