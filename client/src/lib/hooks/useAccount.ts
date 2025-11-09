import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginSchema } from "@lib/schemas/loginSchema";
import agent from "@lib/api/agents";
import { useNavigate } from "react-router";
import type { RegisterSchema } from "@lib/schemas/registerSchema";
import { toast } from "react-toastify";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post("/login?useCookies=true", creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post("/account/register", creds);
        },
        onSuccess: () => {
            toast.success("Registration successful - you can now login");
            navigate("/login");
        },
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post("/account/logout");
        },
        onSuccess: async () => {
            await queryClient.removeQueries({ queryKey: ["user"] });
            await queryClient.removeQueries({ queryKey: ["activities"] });
            navigate("/");
        },
    });

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await agent.get<User>("/account/user-info");
            return response.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        placeholderData: (previousData) => previousData,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: false,
    });

    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser,
    };
};
