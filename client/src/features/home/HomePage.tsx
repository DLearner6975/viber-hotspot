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
                <motion.div
                    style={{ opacity, y: yTransform }}
                    initial={{ scale: 0.95, opacity: 0, y: 60 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 14,
                        duration: 0.7,
                    }}
                >
                    <Stack direction="row" alignItems="flex-end" spacing={2}>
                        <motion.div
                            initial={{ x: -60, rotate: -15, opacity: 0 }}
                            animate={{ x: 0, rotate: 0, opacity: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 80,
                                delay: 0.15,
                            }}
                        >
                            <ViberHotspot height={120} width={150} />
                        </motion.div>
                        <motion.div
                            initial={{ x: 40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 70,
                                delay: 0.25,
                            }}
                        >
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
                                    letterSpacing: 2,
                                }}
                            >
                                <motion.span
                                    initial={{ letterSpacing: "0.1em" }}
                                    animate={{ letterSpacing: "0.15em" }}
                                    transition={{
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        duration: 2.5,
                                        ease: "easeInOut",
                                    }}
                                >
                                    Viber Hotspot
                                </motion.span>
                            </Typography>
                        </motion.div>
                    </Stack>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.4,
                            duration: 0.8,
                            ease: "easeOut",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ color: "#ccc", textAlign: "center", mb: 4 }}
                        >
                            Discover, chat about, and attend awesome activities
                            and events with friends—your local social hub!
                        </Typography>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{
                            opacity: 1,
                            scale: [1, 1.045, 1],
                            boxShadow: [
                                "0 4px 24px 2px rgba(240,56,105,0.07)",
                                "0 4px 28px 6px rgba(144,120,246,0.13)",
                                "0 4px 24px 2px rgba(240,56,105,0.07)",
                            ],
                        }}
                        transition={{
                            delay: 0.9,
                            duration: 1.6,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "mirror",
                        }}
                        style={{ display: "inline-block" }}
                    >
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
                                fontSize: "1.1rem",
                                boxShadow:
                                    "0 4px 24px 2px rgba(240,56,105,0.17)",
                                "&:hover": {
                                    opacity: 0.85,
                                    transform: "scale(1.05)",
                                    transition: "all 0.3s",
                                },
                            }}
                        >
                            Explore Activities
                        </Button>
                    </motion.div>
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
