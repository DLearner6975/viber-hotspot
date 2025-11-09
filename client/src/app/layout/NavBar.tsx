import {
    Box,
    AppBar,
    Toolbar,
    Container,
    MenuItem,
    IconButton,
    Menu,
    ListItemIcon,
    ListItemText,
    Divider,
    Avatar,
    useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import EventIcon from "@mui/icons-material/Event";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import { NavLink } from "react-router";
import MenuItemLink from "@shared/components/MenuItemLink";
import { useStore } from "@lib/hooks/useStore";
import { Observer } from "mobx-react-lite";
import { useAccount } from "@lib/hooks/useAccount";
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { ViberHotspotAlt } from "@shared/icons/ViberHotspotAlt";
import LoadingSpinner from "@shared/components/LoadingSpinner";

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
                <Container maxWidth={false}>
                    <Toolbar
                        disableGutters
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            p: 0,
                        }}
                    >
                        <Box>
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
                                            <LoadingSpinner color="secondary" />
                                        ) : null
                                    }
                                </Observer>
                            </MenuItem>
                        </Box>
                        {currentUser && (
                            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                                <MenuItemLink
                                    to="/activities"
                                    icon={<EventIcon />}
                                >
                                    Activities
                                </MenuItemLink>
                                <MenuItemLink
                                    to="/createActivity"
                                    icon={<AddIcon />}
                                >
                                    Create Activity
                                </MenuItemLink>
                                <MenuItemLink
                                    to={`/profiles/${currentUser.id}`}
                                    icon={<PersonIcon />}
                                >
                                    My Profile
                                </MenuItemLink>
                            </Box>
                        )}
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{ display: { xs: "none", md: "flex" } }}
                        >
                            {currentUser ? (
                                <UserMenu />
                            ) : (
                                <>
                                    <MenuItemLink
                                        to="/login"
                                        icon={<LoginIcon />}
                                    >
                                        Login
                                    </MenuItemLink>
                                    <MenuItemLink
                                        to="/register"
                                        icon={<PersonAddIcon />}
                                    >
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
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                            }}
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
                    {currentUser && (
                        <>
                            <Divider />
                            <MenuItem
                                component={NavLink}
                                to="/activities"
                                onClick={handleCloseMobileMenu}
                            >
                                <ListItemIcon>
                                    <EventIcon />
                                </ListItemIcon>
                                <ListItemText>Activities</ListItemText>
                            </MenuItem>
                            <MenuItem
                                component={NavLink}
                                to="/createActivity"
                                onClick={handleCloseMobileMenu}
                            >
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText>Create Activity</ListItemText>
                            </MenuItem>
                            <MenuItem
                                component={NavLink}
                                to={`/profiles/${currentUser.id}`}
                                onClick={handleCloseMobileMenu}
                            >
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText>My Profile</ListItemText>
                            </MenuItem>
                        </>
                    )}
                    <Divider />
                    {currentUser ? (
                        <MenuItem
                            onClick={() => {
                                logoutUser.mutate();
                                handleCloseMobileMenu();
                            }}
                        >
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    ) : (
                        <>
                            <MenuItem
                                component={NavLink}
                                to="/login"
                                onClick={handleCloseMobileMenu}
                            >
                                <ListItemIcon>
                                    <LoginIcon />
                                </ListItemIcon>
                                <ListItemText>Login</ListItemText>
                            </MenuItem>
                            <MenuItem
                                component={NavLink}
                                to="/register"
                                onClick={handleCloseMobileMenu}
                            >
                                <ListItemIcon>
                                    <PersonAddIcon />
                                </ListItemIcon>
                                <ListItemText>Register</ListItemText>
                            </MenuItem>
                        </>
                    )}
                </Menu>
            </AppBar>
        </Box>
    );
}
