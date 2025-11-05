import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useParams } from "react-router";
import { useProfile } from "@lib/hooks/useProfile";

export default function ProfileHeader() {
    const { id } = useParams();
    const { isCurrentUser, profile, updateFollowing } = useProfile(id!);
    if (!profile) return null;
    return (
        <Paper
            elevation={3}
            sx={{ p: { xs: 2, sm: 3, lg: 4 }, borderRadius: 3 }}
        >
            <Grid container spacing={2}>
                <Grid
                    size={{ xs: 12, sm: 4, lg: false }}
                    sx={{
                        display: {
                            xs: "flex",
                            sm: "flex",
                            lg: "none",
                        },
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        src={profile.imageUrl}
                        alt={`${profile.displayName} image`}
                        sx={{
                            height: { xs: 120, sm: 130, lg: 150 },
                            width: { xs: 120, sm: 130, lg: 150 },
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 8, lg: 8 }}>
                    <Stack
                        direction={{ xs: "column", sm: "row", lg: "row" }}
                        spacing={3}
                        alignItems={{
                            xs: "center",
                            sm: "center",
                            lg: "center",
                        }}
                        justifyContent={{
                            xs: "center",
                            sm: "flex-start",
                            lg: "flex-start",
                        }}
                    >
                        <Avatar
                            src={profile.imageUrl}
                            alt={`${profile.displayName} image`}
                            sx={{
                                height: 150,
                                width: 150,
                                display: { xs: "none", sm: "none", lg: "flex" },
                            }}
                        />
                        <Box
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            alignItems={{
                                xs: "center",
                                sm: "flex-start",
                                lg: "flex-start",
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    textAlign: {
                                        xs: "center",
                                        sm: "left",
                                        lg: "left",
                                    },
                                }}
                            >
                                {profile.displayName}
                            </Typography>
                            {profile.following && (
                                <Chip
                                    variant="outlined"
                                    label="Following"
                                    color="secondary"
                                    sx={{ borderRadius: 1 }}
                                />
                            )}
                        </Box>
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, lg: 4 }}>
                    <Stack spacing={2} alignItems="center">
                        <Box
                            display="flex"
                            justifyContent="space-around"
                            width="100%"
                        >
                            <Box textAlign="center">
                                <Typography variant="h6">Followers</Typography>
                                <Typography variant="h6">
                                    {profile.followersCount}
                                </Typography>
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h6">Following</Typography>
                                <Typography variant="h6">
                                    {profile.followingCount}
                                </Typography>
                            </Box>
                        </Box>
                        {!isCurrentUser && (
                            <>
                                <Divider sx={{ width: "100%" }} />
                                <Button
                                    onClick={() => updateFollowing.mutate()}
                                    disabled={updateFollowing.isPending}
                                    fullWidth
                                    variant="outlined"
                                    color={
                                        profile.following ? "error" : "success"
                                    }
                                >
                                    {profile.following ? "Unfollow" : "Follow"}
                                </Button>
                            </>
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
}
