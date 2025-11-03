import { useParams } from "react-router";
import { useProfile } from "@lib/hooks/useProfile";
import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";
import ProfileCard from "./ProfileCard";
import LoadingSpinner from "@shared/components/LoadingSpinner";

type Props = {
    activeTab: number;
};
export default function ProfileFollowings({ activeTab }: Props) {
    const { id } = useParams();
    const predicate = activeTab === 3 ? "followers" : "followings";
    const { profile, followings, loadingFollowings } = useProfile(
        id!,
        predicate
    );
    if (!profile) return null;

    return (
        <Box>
            <Box display="flex">
                <Typography variant="h5">
                    {activeTab === 3
                        ? `People following ${profile.displayName}`
                        : `People ${profile.displayName} is following`}
                </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            {loadingFollowings ? (
                <LoadingSpinner />
            ) : (
                <Box display="flex" mt={3} gap={3} overflow="auto">
                    {followings?.map((profile) => (
                        <ProfileCard key={profile.id} profile={profile} />
                    ))}
                </Box>
            )}
        </Box>
    );
}
