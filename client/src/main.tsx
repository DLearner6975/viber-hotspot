import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/layout/styles.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "@fontsource-variable/nunito";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { RouterProvider } from "react-router";
import { store, StoreContext } from "@lib/stores/store.ts";
import { ToastContainer } from "react-toastify";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { router } from "./app/router/Routes.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme.ts";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
});

// Set up React Query persistence using sessionStorage
persistQueryClient({
    queryClient,
    persister: {
        persistClient: async (client) => {
            try {
                sessionStorage.setItem(
                    "REACT_QUERY_OFFLINE_CACHE",
                    JSON.stringify(client)
                );
            } catch {
                // Ignore errors
            }
        },
        restoreClient: async () => {
            try {
                const cached = sessionStorage.getItem(
                    "REACT_QUERY_OFFLINE_CACHE"
                );
                return cached ? JSON.parse(cached) : undefined;
            } catch {
                return undefined;
            }
        },
        removeClient: async () => {
            try {
                sessionStorage.removeItem("REACT_QUERY_OFFLINE_CACHE");
            } catch {
                // Ignore errors
            }
        },
    },
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
    buster: "", // Change this to invalidate cache when needed
});

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
