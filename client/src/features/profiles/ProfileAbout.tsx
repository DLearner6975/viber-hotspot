import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Button, Divider, Typography } from "@mui/material";

export default function ProfileAbout() {
    const { id } = useParams();
    const { profile } = useProfile(id);

    return (
        <Box>
            <Box>
                <Typography variant="h6">
                    About {profile?.displayName}
                </Typography>
                <Box>
                    <Button>Edit Profile</Button>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ overflow: "auto", maxHeight: "350px" }}>
                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {profile?.bio || "No description added yet."}
                </Typography>
            </Box>
        </Box>
    );
}
