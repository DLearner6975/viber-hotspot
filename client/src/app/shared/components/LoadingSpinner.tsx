import { CircularProgress, type CircularProgressProps } from "@mui/material";

export default function LoadingSpinner({
    size = 20,
    ...props
}: CircularProgressProps) {
    return (
        <CircularProgress
            variant="indeterminate"
            color="primary"
            size={size}
            thickness={7}
            {...props}
        />
    );
}
