import { toast } from "react-toastify";
import { store } from "../stores/store";
import axios from "axios";
import { router } from "../../app/router/Routes";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

agent.interceptors.request.use(async (config) => {
    store.uiStore.isBusy();
    return config;
});

agent.interceptors.response.use(
    async (response) => {
        if (import.meta.env.DEV) await sleep(1000);
        store.uiStore.isIdle();
        return response;
    },
    async (error) => {
        if (import.meta.env.DEV) await sleep(1000);
        store.uiStore.isIdle();
        const { status, data } = error.response;
        switch (status) {
            case 400:
                if (data.errors) {
                    const modalStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key]);
                        }
                    }
                    throw modalStateErrors.flat();
                } else {
                    toast.error(data);
                }
                break;
            case 401:
                toast.error("Unauthorized");
                break;
            case 404:
                router.navigate("/not-found");
                break;
            case 500:
                router.navigate("/server-error", { state: { error: data } });
                break;
            default:
                break;
        }
        return Promise.reject(error.response?.data);
    }
);

// export const Activities = {
//     list: () =>
//         agent.get<Activity[]>("activities").then((response) => response.data),
//     details: (id: string) =>
//         agent
//             .get<Activity>(`activities/${id}`)
//             .then((response) => response.data),
//     create: (activity: Activity) =>
//         agent
//             .post<void>("activities", activity)
//             .then((response) => response.data),
//     update: (activity: Activity) =>
//         agent
//             .put<void>(`activities/${activity.id}`, activity)
//             .then((response) => response.data),
//     delete: (id: string) =>
//         agent
//             .delete<void>(`activities/${id}`)
//             .then((response) => response.data),
// };

// export const TestErrors = {
//     get400Error: () => agent.get<void>("buggy/bad-request"),
//     get401Error: () => agent.get<void>("buggy/unauthorized"),
//     get404Error: () => agent.get<void>("buggy/not-found"),
//     get500Error: () => agent.get<void>("buggy/server-error"),
//     getValidationError: () => agent.get<void>("buggy/validation-error"),
// };
export default agent;
