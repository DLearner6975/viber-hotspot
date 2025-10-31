import { useEffect, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useAnimationFrame,
    useScroll,
    useTransform,
} from "framer-motion";
import { Box, Typography, Container, Button, Stack } from "@mui/material";
import { Link } from "react-router";
import { ViberHotspot } from "../../app/shared/icons/ViberHotspot";

export default function HomePage() {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springY = useSpring(mouseY, { stiffness: 80, damping: 15 });

    // Scroll fade / parallax
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, 200]);

    // Gooey points
    const points = useRef(
        Array.from({ length: 6 }, (_, i) => ({
            x: i * 200,
            y: 300,
            offset: Math.random() * 100,
        }))
    );

    // Animate gooey wave
    const [pathD, setPathD] = useState<string>("");
    useAnimationFrame((t) => {
        points.current.forEach((p, i) => {
            p.y =
                300 +
                Math.sin(t / 1000 + p.offset) * 20 +
                (springY.get() / 12) * Math.sin(i + t / 700);
        });
        setPathD(buildPath());
    });

    const buildPath = () => {
        const p = points.current;
        let path = `M ${p[0].x},${p[0].y}`;
        for (let i = 1; i < p.length; i++) {
            const midX = (p[i - 1].x + p[i].x) / 2;
            const midY = (p[i - 1].y + p[i].y) / 2;
            path += ` Q ${p[i - 1].x},${p[i - 1].y} ${midX},${midY}`;
        }
        return path;
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const rect = ref.current?.getBoundingClientRect();
            if (!rect) return;
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <Box
            ref={ref}
            sx={{
                bgcolor: "grey.600",
                color: "#fff",
                height: "200vh",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    position: "relative",
                }}
            >
                <motion.div style={{ opacity, y: yTransform }}>
                    <Stack direction="row" alignItems="flex-end">
                        <ViberHotspot height={100} width={150} />
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 700,
                                background:
                                    "linear-gradient(90deg, #f03869, #9078f6)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                textAlign: "center",
                                mb: 2,
                            }}
                        >
                            Viber Hotspot
                        </Typography>
                    </Stack>
                    <Typography
                        variant="h6"
                        sx={{ color: "#ccc", textAlign: "center", mb: 4 }}
                    >
                        Discover, chat about, and attend awesome activities and
                        events with friends—your local social hub!
                    </Typography>

                    <Button
                        component={Link}
                        to="/activities"
                        variant="contained"
                        sx={{
                            background:
                                "linear-gradient(90deg, #f03869, #9078f6)",
                            color: "#fff",
                            fontWeight: "bold",
                            borderRadius: "999px",
                            px: 4,
                            py: 1.5,
                            "&:hover": {
                                opacity: 0.85,
                                transform: "scale(1.05)",
                                transition: "all 0.3s ease",
                            },
                        }}
                    >
                        Explore Activities
                    </Button>
                </motion.div>
            </Container>
            {/* Gooey Line */}
            <svg
                width="100%"
                height="600"
                style={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: "none",
                    zIndex: 10,
                }}
                preserveAspectRatio="none"
                viewBox="0 0 1200 600"
            >
                <defs>
                    <linearGradient
                        id="gooeyGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                    >
                        <stop offset="0%" stopColor="#f03869" />
                        <stop offset="100%" stopColor="#9078f6" />
                    </linearGradient>
                </defs>
                <motion.path
                    d={pathD}
                    stroke="url(#gooeyGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </Box>
    );
}
