import { MenuItem } from "@mui/material";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

export default function MenuItemLink({
    children,
    to,
    icon,
}: {
    children: ReactNode;
    to: string;
    icon?: React.ReactElement;
}) {
    return (
        <MenuItem
            component={NavLink}
            to={to}
            sx={{
                fontSize: "1.2rem",
                textTransform: "uppercase",
                fontWeight: "bold",
                "&.active": { color: "secondary.main" },
                display: "flex",
                alignItems: "center",
                gap: 0.5,
            }}
        >
            {icon}
            {children}
        </MenuItem>
    );
}
