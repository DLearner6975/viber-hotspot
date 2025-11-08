import { Box, Paper } from "@mui/material";
import { type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type TabPanelProps = {
    children: ReactNode;
    value: number;
    index: number;
};

export const TabPanel = ({ children, value, index }: TabPanelProps) => {
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
                    <Box pb="20px">
                        <Paper
                            elevation={3}
                            sx={{
                                p: { xs: 2, sm: 2.5, lg: 3 },
                                width: "100%",
                                height: "100%",
                                borderRadius: "12px",
                            }}
                        >
                            {children}
                        </Paper>
                    </Box>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
