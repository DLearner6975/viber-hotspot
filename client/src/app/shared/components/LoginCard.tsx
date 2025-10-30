import { Box, Card, CardContent, CardHeader, Container } from "@mui/material";

type Props = {
    title: string;
    children: React.ReactNode;
};

export default function LoginCard({ title, children }: Props) {
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
                        title={title}
                        slotProps={{
                            title: {
                                variant: "h5",
                                fontWeight: 300,
                                textAlign: "center",
                            },
                        }}
                    />
                    <CardContent sx={{ pt: 10 }}>{children}</CardContent>
                </Card>
            </Box>
        </Container>
    );
}
