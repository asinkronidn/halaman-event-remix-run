import {
    Outlet
} from "@remix-run/react";
import { requireUserSession } from "../../services/auth/auth.server";

// import authenticator from "../../services/auth/auth.server";

export const loader = async ({
    request
}) => {
    const userId = await requireUserSession({
        request,
        redirectPath: '/login'
    });
    return {
        userId
    };
};

export default function DashboardLayout() {
    return (
        <div>
            <p>Dashboard Layout</p>
            <Outlet/>
        </div>
    )
}