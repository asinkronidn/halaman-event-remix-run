import {
    Outlet
  } from "@remix-run/react";

import { authenticator } from "../../services/auth.server";


export const loader = async ({
    request
}) => {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });      
    return {
        user
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