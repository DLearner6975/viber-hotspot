import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
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
            <Grid size={4}>
                <Typography variant="overline" color="secondary">
                    Step 1 - Add photo
                </Typography>
                <Box
                    {...getRootProps()}
                    sx={{
                        border: "dashed 3px #eee",
                        borderColor: isDragActive ? "green" : "#eee",
                        borderRadius: "5px",
                        paddingTop: "30px",
                        textAlign: "center",
                        height: "280px",
                    }}
                >
                    <input {...getInputProps()} />
                    <CloudUpload sx={{ fontSize: 80 }} />
                    <Typography variant="h5">Drop image here</Typography>
                </Box>
            </Grid>
            <Grid size={4}>
                <Typography variant="overline" color="secondary">
                    Step 2 - Resize image
                </Typography>
                {files[0]?.preview && (
                    <Cropper
                        ref={cropperRef}
                        src={files[0]?.preview}
                        className="cropper"
                        style={{ height: 300, width: "90%" }}
                        stencilProps={{ aspectRatio: 1 }}
                        stencilComponent={CircleStencil}
                        onUpdate={handleUpdate}
                    />
                )}
            </Grid>
            <Grid size={4}>
                {files[0]?.preview && (
                    <>
                        <Typography variant="overline" color="secondary">
                            Step 3 - Preview & upload
                        </Typography>
                        <CropperPreview
                            ref={previewRef}
                            className="img-preview"
                            style={{
                                width: 300,
                                height: 300,
                                overflow: "hidden",
                            }}
                        />
                        <Button
                            sx={{ my: 1, width: 300 }}
                            onClick={onCrop}
                            variant="contained"
                            color="secondary"
                            disabled={loading}
                        >
                            Upload
                        </Button>
                    </>
                )}
            </Grid>
        </Grid>
    );
}
