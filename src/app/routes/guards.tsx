import { useMe } from "@/features/auth/hooks/useMe";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function RequireAuth() {
    const { data: user, isLoading } = useMe();
    const location = useLocation();

    if (isLoading) return null;

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}

export function RequireGuest() {
    const { data: user, isLoading } = useMe();

    if (isLoading) return null;

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />
}