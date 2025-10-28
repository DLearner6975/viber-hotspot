import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Typography,
} from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";
import { Link } from "react-router";
import {
    registerSchema,
    type RegisterSchema,
} from "../../lib/schemas/registerSchema";

export default function RegisterForm() {
    const { registerUser } = useAccount();

    const {
        control,
        handleSubmit,
        setError,
        formState: { isValid, isSubmitting },
    } = useForm<RegisterSchema>({
        mode: "onTouched",
        resolver: zodResolver(registerSchema),
    });

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
        <Container maxWidth="sm">
            <Box sx={{ mt: 6 }}>
                <Card sx={{ overflow: "visible", position: "relative" }}>
                    <CardHeader
                        sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            borderRadius: 1,
                            boxShadow: 3,
                            position: "absolute",
                            left: 16,
                            right: 16,
                            transform: "translateY(-50%)",
                            p: 6,
                        }}
                        title="Register"
                        slotProps={{
                            title: {
                                variant: "h5",
                                fontWeight: 300,
                                textAlign: "center",
                            },
                        }}
                    />
                    <CardContent sx={{ pt: 10 }}>
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
                            <TextInput
                                label="Email"
                                control={control}
                                name="email"
                            />
                            <TextInput
                                label="Display Name"
                                control={control}
                                name="displayName"
                            />
                            <TextInput
                                label="Password"
                                control={control}
                                type="password"
                                name="password"
                            />
                            <Button
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
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}
