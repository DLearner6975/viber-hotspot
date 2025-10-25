// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

// Extend MUI palette interface to include our custom color sets
declare module "@mui/material/styles" {
    interface Palette {
        main: Palette["primary"];
        warning: Palette["primary"];
        error: Palette["primary"];
        success: Palette["primary"];
        info: Palette["primary"];
        secondary: Palette["primary"];
        grey: Palette["primary"];
    }
    interface PaletteOptions {
        main?: PaletteOptions["primary"];
        warning?: PaletteOptions["primary"];
        error?: PaletteOptions["primary"];
        success?: PaletteOptions["primary"];
        info?: PaletteOptions["primary"];
        secondary?: PaletteOptions["primary"];
        grey?: PaletteOptions["primary"];
    }
}

// Extend component color props (so Button, Chip, etc. support them)
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        main: true;
        warning: true;
        error: true;
        success: true;
        info: true;
        secondary: true;
        grey: true;
    }
}
declare module "@mui/material/Chip" {
    interface ChipPropsColorOverrides {
        main: true;
        warning: true;
        error: true;
        success: true;
        info: true;
        secondary: true;
        grey: true;
    }
}

export const theme = createTheme({
    palette: {
        main: {
            50: "#fdedef",
            100: "#fbdee2",
            200: "#f7bdc5",
            300: "#f49aa8",
            400: "#f2728b",
            500: "#f03869",
            600: "#c32a53",
            700: "#941d3d",
            800: "#681129",
            900: "#3f0716",
            main: "#f03869",
            contrastText: "#fff",
        },
        warning: {
            50: "#fef1ed",
            100: "#fce3da",
            200: "#fac3ad",
            300: "#f8a57c",
            400: "#ef8539",
            500: "#c56d2d",
            600: "#9d5522",
            700: "#773f17",
            800: "#532a0d",
            900: "#311705",
            main: "#ef8539",
            contrastText: "#fff",
        },
        error: {
            50: "#fceded",
            100: "#fadfdf",
            200: "#f6baba",
            300: "#f39898",
            400: "#f17171",
            500: "#ef3939",
            600: "#c12a2a",
            700: "#921d1d",
            800: "#661111",
            900: "#400707",
            main: "#ef3939",
            contrastText: "#fff",
        },
        success: {
            50: "#d5fed5",
            100: "#a1fda1",
            200: "#39ef39",
            300: "#30ce30",
            400: "#27b027",
            500: "#1e8f1e",
            600: "#167316",
            700: "#0e550e",
            800: "#073c07",
            900: "#022102",
            main: "#39ef39",
            contrastText: "#000",
        },
        info: {
            50: "#edf0fd",
            100: "#dce2fc",
            200: "#bbc7f9",
            300: "#95abf6",
            400: "#7092f3",
            500: "#3976ef",
            600: "#285ec4",
            700: "#1c4594",
            800: "#11306a",
            900: "#061a3f",
            main: "#3976ef",
            contrastText: "#fff",
        },
        secondary: {
            50: "#d4ffff",
            100: "#85fefe",
            200: "#39efef",
            300: "#30cfcf",
            400: "#27afaf",
            500: "#1e8f8f",
            600: "#167171",
            700: "#0e5454",
            800: "#073b3b",
            900: "#022222",
            main: "#39efef",
            contrastText: "#000",
        },
        grey: {
            50: "#f7f6f6",
            100: "#f0edee",
            200: "#e0dadc",
            300: "#c7bbbf",
            400: "#af9ca2",
            500: "#977d86",
            600: "#78626a",
            700: "#5a494f",
            800: "#3e3236",
            900: "#231b1e",
            main: "#977d86",
            contrastText: "#fff",
        },
    },
    typography: {
        fontFamily: `"Nunito Variable", 'Roboto', 'Helvetica', 'Arial', sans-serif`,
        h1: { fontWeight: 800 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        body1: { fontWeight: 400 },
        button: { textTransform: "none", fontWeight: 600 },
    },
});
