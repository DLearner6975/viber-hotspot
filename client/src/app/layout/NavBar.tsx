import {
    Box,
    AppBar,
    Toolbar,
    Container,
    MenuItem,
    CircularProgress,
    IconButton,
    Menu,
    ListItemIcon,
    ListItemText,
    Divider,
    Avatar,
    useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";
import { useAccount } from "../../lib/hooks/useAccount";
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { ViberHotspotAlt } from "../shared/components/icons/ViberHotspotAlt";

export default function NavBar() {
    const { uiStore } = useStore();
    const { currentUser, logoutUser } = useAccount();
    const [mobileMenuAnchor, setMobileMenuAnchor] =
        useState<null | HTMLElement>(null);
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

    useEffect(() => {
        if (isMdUp && mobileMenuAnchor) {
            setMobileMenuAnchor(null);
        }
    }, [isMdUp, mobileMenuAnchor]);

    const handleOpenMobileMenu = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setMobileMenuAnchor(event.currentTarget);
    };

    const handleCloseMobileMenu = () => {
        setMobileMenuAnchor(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                sx={{
                    backgroundImage: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 69%, ${theme.palette.primary.main} 89%)`,
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            {/* <ViberHotspot
                                style={{
                                    height: 40,
                                    width: "auto",
                                    display: "block",
                                }}
                            /> */}
                            <MenuItem
                                component={NavLink}
                                to="/"
                                sx={{ display: "flex", gap: 2, p: 0 }}
                            >
                                <ViberHotspotAlt
                                    height={72}
                                    width={100}
                                    fill="white"
                                />
                                <Observer>
                                    {() =>
                                        uiStore.isLoading ? (
                                            <CircularProgress
                                                size={20}
                                                thickness={7}
                                                sx={{
                                                    color: "white",
                                                    position: "absolute",
                                                    top: "30%",
                                                    left: "105%",
                                                }}
                                            />
                                        ) : null
                                    }
                                </Observer>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <MenuItemLink to="/activities">
                                Activities
                            </MenuItemLink>
                            <MenuItemLink to="/counter">Counter</MenuItemLink>
                            <MenuItemLink to="/errors">Errors</MenuItemLink>
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{ display: { xs: "none", md: "flex" } }}
                        >
                            {currentUser ? (
                                <UserMenu />
                            ) : (
                                <>
                                    <MenuItemLink to="/login">
                                        Login
                                    </MenuItemLink>
                                    <MenuItemLink to="/register">
                                        Register
                                    </MenuItemLink>
                                </>
                            )}
                        </Box>
                        <IconButton
                            color="inherit"
                            onClick={handleOpenMobileMenu}
                            sx={{ display: { xs: "flex", md: "none" } }}
                            aria-label="open navigation menu"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
                <Menu
                    anchorEl={mobileMenuAnchor}
                    open={Boolean(mobileMenuAnchor)}
                    onClose={handleCloseMobileMenu}
                    slotProps={{
                        paper: { sx: { width: 260 } },
                        list: { "aria-labelledby": "mobile-nav-button" },
                    }}
                >
                    {currentUser && (
                        <MenuItem
                            disabled
                            sx={{ opacity: 1, cursor: "default" }}
                        >
                            <ListItemIcon>
                                <Avatar
                                    src={currentUser.imageUrl}
                                    alt="current user image"
                                />
                            </ListItemIcon>
                            <ListItemText primary={currentUser.displayName} />
                        </MenuItem>
                    )}
                    {currentUser && <Divider />}
                    <MenuItem
                        component={NavLink}
                        to="/activities"
                        onClick={handleCloseMobileMenu}
                    >
                        <ListItemText>Activities</ListItemText>
                    </MenuItem>
                    <MenuItem
                        component={NavLink}
                        to="/counter"
                        onClick={handleCloseMobileMenu}
                    >
                        <ListItemText>Counter</ListItemText>
                    </MenuItem>
                    <MenuItem
                        component={NavLink}
                        to="/errors"
                        onClick={handleCloseMobileMenu}
                    >
                        <ListItemText>Errors</ListItemText>
                    </MenuItem>
                    <Divider />
                    {currentUser ? (
                        <>
                            <MenuItem
                                component={NavLink}
                                to="/createActivity"
                                onClick={handleCloseMobileMenu}
                            >
                                <ListItemText>Create Activity</ListItemText>
                            </MenuItem>
                            <MenuItem
                                component={NavLink}
                                to={`/profiles/${currentUser.id}`}
                                onClick={handleCloseMobileMenu}
                            >
                                <ListItemText>My Profile</ListItemText>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    logoutUser.mutate();
                                    handleCloseMobileMenu();
                                }}
                            >
                                <ListItemText>Logout</ListItemText>
                            </MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem
                                component={NavLink}
                                to="/login"
                                onClick={handleCloseMobileMenu}
                            >
                                <ListItemText>Login</ListItemText>
                            </MenuItem>
                            <MenuItem
                                component={NavLink}
                                to="/register"
                                onClick={handleCloseMobileMenu}
                            >
                                <ListItemText>Register</ListItemText>
                            </MenuItem>
                        </>
                    )}
                </Menu>
            </AppBar>
        </Box>
    );
}
