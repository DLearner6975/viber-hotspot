import { useForm } from "react-hook-form";
import { useAccount } from "@lib/hooks/useAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Typography,
} from "@mui/material";

import TextInput from "@shared/components/TextInput";
import { Link } from "react-router";
import {
    registerSchema,
    type RegisterSchema,
} from "@lib/schemas/registerSchema";
import { useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import LoginCard from "@shared/components/LoginCard";

export default function RegisterForm() {
    const { registerUser } = useAccount();
    const [showPassword, setShowPassword] = useState(false);
    const {
        control,
        handleSubmit,
        setError,
        formState: { isValid, isSubmitting },
    } = useForm<RegisterSchema>({
        mode: "onTouched",
        resolver: zodResolver(registerSchema),
    });
    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach((err) => {
                        if (err.includes("Email"))
                            setError("email", {
                                message: err,
                            });
                        else if (err.includes("Password"))
                            setError("password", {
                                message: err,
                            });
                    });
                }
            },
        });
    };

    return (
        <LoginCard title="Register">
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
                    label="Display Name"
                    control={control}
                    name="displayName"
                />
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
                    loading={isSubmitting}
                    loadingPosition="end"
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    disabled={!isValid || isSubmitting}
                >
                    Register
                </Button>
                <Typography sx={{ textAlign: "center" }}>
                    Already have an account?
                    <Typography
                        component={Link}
                        to="/login"
                        color="secondary"
                        sx={{ ml: 2 }}
                    >
                        Sign in
                    </Typography>
                </Typography>
            </Box>
        </LoginCard>
    );
}
