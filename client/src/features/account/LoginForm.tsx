import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Typography,
} from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";
import LoginCard from "../../app/shared/components/LoginCard";

export default function LoginForm() {
    const { loginUser } = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { isValid, isSubmitting },
    } = useForm<LoginSchema>({
        mode: "onTouched",
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || "/activities");
            },
        });
    };
    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    return (
        <LoginCard title="Login">
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    p: 3,
                    maxWidth: "md",
                    mx: "auto",
                    borderRadius: 3,
                }}
            >
                <TextInput label="Email" control={control} name="email" />
                <TextInput
                    label="Password"
                    control={control}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        aria-label="toggle password visibility"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    disabled={!isValid || isSubmitting}
                >
                    Login
                </Button>
                <Typography sx={{ textAlign: "center" }}>
                    Don't have an account?
                    <Typography
                        component={Link}
                        to="/register"
                        color="secondary"
                        sx={{ ml: 2 }}
                    >
                        Sign up
                    </Typography>
                </Typography>
            </Box>
        </LoginCard>
    );
}
