import { CloudUpload } from "@mui/icons-material";
import {
    Box,
    Button,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
    Cropper,
    CropperPreview,
    CircleStencil,
    type CropperRef,
    type CropperPreviewRef,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

type Props = {
    uploadPhoto: (file: Blob) => void;
    loading: boolean;
};

export default function PhotoUploadWidget({ uploadPhoto, loading }: Props) {
    const [files, setFiles] = useState<object & { preview: string }[]>([]);
    const cropperRef = useRef<CropperRef>(null);
    const previewRef = useRef<CropperPreviewRef>(null);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

    useEffect(() => {
        return () => {
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file as Blob),
                })
            )
        );
    }, []);

    const onCrop = useCallback(() => {
        const canvas = cropperRef.current?.getCanvas?.();
        canvas?.toBlob((blob) => {
            if (blob) uploadPhoto(blob);
        });
    }, [uploadPhoto]);

    const handleUpdate = useCallback(() => {
        if (cropperRef.current && previewRef.current) {
            previewRef.current.update(cropperRef.current);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <Typography variant="overline" color="secondary">
                    Step 1 - Add photo
                </Typography>
                <Box
                    {...getRootProps()}
                    sx={{
                        border: "dashed 3px white",
                        borderColor: isDragActive ? "secondary.main" : "white",
                        borderRadius: "5px",
                        paddingTop: { xs: "20px", md: "30px" },
                        textAlign: "center",
                        height: { xs: "200px", sm: "240px", md: "280px" },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                    }}
                >
                    <input {...getInputProps()} />
                    <CloudUpload
                        sx={{ fontSize: { xs: 50, sm: 60, md: 80 } }}
                    />
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: {
                                xs: "1rem",
                                sm: "1.25rem",
                                md: "1.5rem",
                            },
                        }}
                    >
                        Drop image here
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: {
                                xs: "1rem",
                                sm: "1.25rem",
                                md: "1.5rem",
                            },
                        }}
                    >
                        or
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: {
                                xs: "1rem",
                                sm: "1.25rem",
                                md: "1.5rem",
                            },
                        }}
                    >
                        click to upload
                    </Typography>
                </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <Typography variant="overline" color="secondary">
                    Step 2 - Resize image
                </Typography>
                {files[0]?.preview && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <Cropper
                            ref={cropperRef}
                            src={files[0]?.preview}
                            className="cropper"
                            style={{
                                height: isXs ? 250 : isSm ? 280 : 300,
                                width: "100%",
                                maxWidth: "100%",
                            }}
                            stencilProps={{ aspectRatio: 1 }}
                            stencilComponent={CircleStencil}
                            onUpdate={handleUpdate}
                        />
                    </Box>
                )}
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                {files[0]?.preview && (
                    <>
                        <Typography variant="overline" color="secondary">
                            Step 3 - Preview & upload
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <CropperPreview
                                ref={previewRef}
                                className="img-preview"
                                style={{
                                    width: "100%",
                                    maxWidth: 300,
                                    height: 300,
                                    overflow: "hidden",
                                }}
                            />
                            <Button
                                sx={{
                                    my: 1,
                                    width: { xs: "100%", sm: "100%", md: 300 },
                                    maxWidth: 300,
                                }}
                                onClick={onCrop}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                color="secondary"
                                disabled={loading}
                            >
                                Upload
                            </Button>
                        </Box>
                    </>
                )}
            </Grid>
        </Grid>
    );
}
