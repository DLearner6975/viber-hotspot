import {
    Stack,
    Tabs,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import ProfileActivities from "./ProfileActivities";
import { StyledTab } from "./StyledTab";
import { TabPanel } from "./TabPanel";
import {
    PersonOutlined,
    MonochromePhotosOutlined,
    GroupsOutlined,
    EventOutlined,
    InfoOutlined,
} from "@mui/icons-material";

export default function ProfileContent() {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

    const tabData = [
        {
            label: "About",
            content: <ProfileAbout />,
            icon: <InfoOutlined />,
        },
        {
            label: "Photos",
            content: <ProfilePhotos />,
            icon: <MonochromePhotosOutlined />,
        },
        {
            label: "Events",
            content: <ProfileActivities />,
            icon: <EventOutlined />,
        },
        {
            label: "Followers",
            content: <ProfileFollowings activeTab={value} />,
            icon: <PersonOutlined />,
        },
        {
            label: "Following",
            content: <ProfileFollowings activeTab={value} />,
            icon: <GroupsOutlined />,
        },
    ];

    return (
        <Stack
            direction={{ xs: "column", lg: "row" }}
            gap={{ xs: 2, sm: 2, lg: 2 }}
            mt={2}
        >
            <Tabs
                orientation={isDesktop ? "vertical" : "horizontal"}
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons={isMobile ? "auto" : false}
                slotProps={{ indicator: { sx: { display: "none" } } }}
                value={value}
                onChange={(_event, newValue) => setValue(newValue)}
                sx={{
                    "& .MuiTabs-flexContainer": {
                        gap: { xs: 0.5, sm: 1, lg: 1 },
                        flexDirection: isDesktop ? "column" : "row",
                    },
                    width: { xs: "100%", lg: "auto" },
                    minWidth: { lg: 280 },
                    maxWidth: { lg: 320 },
                }}
            >
                {tabData.map((tab, index) => (
                    <StyledTab
                        key={index}
                        $isVertical={isDesktop}
                        label={
                            isMobile ? (
                                tab.icon
                            ) : (
                                <Stack
                                    direction={{
                                        xs: "column",
                                        sm: "row",
                                        lg: "row",
                                    }}
                                    alignItems="center"
                                    gap={{ xs: 0.25, sm: 0.5, lg: 0.5 }}
                                    justifyContent="center"
                                >
                                    {tab.icon}
                                    <Box>
                                        <Typography
                                            whiteSpace="nowrap"
                                            variant="body2"
                                        >
                                            {tab.label}
                                        </Typography>
                                    </Box>
                                </Stack>
                            )
                        }
                    />
                ))}
            </Tabs>
            {tabData.map((tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {tab.content}
                </TabPanel>
            ))}
        </Stack>
    );
}
