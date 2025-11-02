import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "@lib/hooks/useAccount";
import LoadingSpinner from "@shared/components/LoadingSpinner";

export default function RequiredAuth() {
    const { currentUser, loadingUserInfo } = useAccount();
    const location = useLocation();

    if (loadingUserInfo) return <LoadingSpinner size={50} />;
    if (!currentUser)
        return <Navigate to="/login" state={{ from: location }} />;

    return <Outlet />;
}
