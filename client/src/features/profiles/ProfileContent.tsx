import { Paper, Stack, styled, Tab, Tabs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import ProfileActivities from "./ProfileActivities";
import {
    PersonOutlined,
    MonochromePhotosOutlined,
    GroupsOutlined,
    EventOutlined,
    InfoOutlined,
} from "@mui/icons-material";

export default function ProfileContent() {
    const [value, setValue] = useState(0);

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
        <Stack direction="row" gap={2} mt={2}>
            <Tabs
                orientation="vertical"
                slotProps={{ indicator: { sx: { display: "none" } } }}
                value={value}
                onChange={(_event, newValue) => setValue(newValue)}
                sx={{
                    "& .MuiTabs-flexContainer": {
                        gap: 1,
                    },
                }}
            >
                {tabData.map((tab, index) => (
                    <StyledTab
                        key={index}
                        label={
                            <Stack
                                direction="row"
                                alignItems="center"
                                gap={0.5}
                            >
                                {tab.icon}
                                <Box>
                                    <Typography whiteSpace="nowrap">
                                        {tab.label}
                                    </Typography>
                                </Box>
                            </Stack>
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

const StyledTab = styled(Tab)(({ theme }) => ({
    alignItems: "flex-start",
    border: "1px solid",
    borderColor: theme.palette.grey[200],
    textTransform: "none",
    backgroundColor: theme.palette.grey[50],
    borderRadius: "12px",
    padding: "24px",
    transition: "all 0.2s ease-in-out",
    "& p": {
        color: theme.palette.grey[500],
    },
    "& svg": {
        fontSize: 30,
        color: theme.palette.grey[400],
    },
    "&.Mui-selected, &:hover": {
        backgroundColor: "#fff",
        boxShadow: theme.shadows[3],
        "& p": {
            color: theme.palette.primary.main,
        },
        "& svg": {
            color: theme.palette.primary[400],
        },
    },
}));

type TabPanelProps = {
    children: ReactNode;
    value: number;
    index: number;
};

const TabPanel = ({ children, value, index }: TabPanelProps) => {
    return (
        <AnimatePresence mode="popLayout">
            {value === index && (
                <motion.div
                    key={index}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ width: "100%", overflow: "hidden" }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            width: "100%",
                            height: "100%",
                            borderRadius: "12px",
                        }}
                    >
                        {children},
                    </Paper>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
