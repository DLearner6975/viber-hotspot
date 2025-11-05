import { styled, Tab } from "@mui/material";

export const StyledTab = styled(Tab, {
    shouldForwardProp: (prop) => prop !== "$isVertical",
})<{ $isVertical?: boolean }>(({ theme, $isVertical }) => ({
    alignItems: $isVertical ? "flex-start" : "center",
    justifyContent: $isVertical ? "flex-start" : "center",
    border: "1px solid",
    borderColor: theme.palette.grey[200],
    textTransform: "none",
    backgroundColor: theme.palette.grey[50],
    borderRadius: "12px",
    padding: "8px",
    transition: "all 0.2s ease-in-out",
    [theme.breakpoints.up("sm")]: {
        padding: "12px 16px",
        minHeight: 56,
    },
    [theme.breakpoints.up("lg")]: {
        padding: "24px",
        minHeight: "auto",
    },
    [theme.breakpoints.down("sm")]: {
        minHeight: 48,
        justifyContent: "center",
    },
    "& p": {
        color: theme.palette.grey[500],
    },
    "& svg": {
        fontSize: 20,
        color: theme.palette.grey[400],
        [theme.breakpoints.up("sm")]: {
            fontSize: 24,
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: 30,
        },
    },
    "&.Mui-selected, &:hover": {
        backgroundColor: "#fff",
        boxShadow: theme.shadows[3],
        "& p": {
            color: theme.palette.primary.main,
        },
        "& svg": {
            color: (
                theme.palette.primary as unknown as Record<string, string>
            )[400],
        },
    },
}));

