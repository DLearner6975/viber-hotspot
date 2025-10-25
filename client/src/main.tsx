import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/layout/styles.css";
import "@fontsource-variable/nunito";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";
import { store, StoreContext } from "./lib/stores/store.ts";
import { ToastContainer } from "react-toastify";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { router } from "./app/router/Routes.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StoreContext.Provider value={store}>
                    <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtools initialIsOpen={false} />
                        <ToastContainer
                            position="bottom-right"
                            hideProgressBar
                            theme="colored"
                        />
                        <RouterProvider router={router} />
                    </QueryClientProvider>
                </StoreContext.Provider>
            </LocalizationProvider>
        </ThemeProvider>
    </StrictMode>
);
