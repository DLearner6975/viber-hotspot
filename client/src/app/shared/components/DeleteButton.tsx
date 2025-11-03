import { DeleteOutline, Delete } from "@mui/icons-material";
import { Box, Button, type ButtonProps } from "@mui/material";

export default function DeleteButton({
    loading,
    loadingPosition = "end",
    ...props
}: ButtonProps) {
    return (
        <Box sx={{ position: "relative" }}>
            <Button
                sx={{
                    opacity: 0.8,
                    transition: "opacity 0.3s",
                    position: "relative",
                    cursor: "pointer",
                }}
                loading={loading}
                loadingPosition={loadingPosition}
                {...props}
            >
                <DeleteOutline
                    sx={{ fontSize: 32, color: "white", position: "absolute" }}
                />
                <Delete
                    sx={{
                        fontSize: 28,
                        color: "red",
                    }}
                />
            </Button>
        </Box>
    );
}
