import { Box, Card, CardContent, CardHeader } from "@mui/material";

type Props = {
    title: string;
    subheader?: string;
    children: React.ReactNode;
};

export default function SectionCard({ title, subheader, children }: Props) {
    return (
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
                    }}
                    title={title}
                    subheader={subheader}
                    slotProps={{
                        title: {
                            variant: "h5",
                            fontWeight: 300,
                        },
                        subheader: {
                            variant: "body1",
                            color: "white",
                            fontWeight: 100,
                            pt: 0.5,
                        },
                    }}
                />
                <CardContent sx={{ pt: 10 }}>{children}</CardContent>
            </Card>
        </Box>
    );
}
