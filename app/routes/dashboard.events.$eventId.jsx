import { json, redirect } from "@remix-run/react";
import { deleteEvent } from "../data/events.server";

export const action = async ({
    params,
    request
}) => {
    const eventId = parseInt(params.eventId);
    if (request.method === "DELETE") {
        try {
            await deleteEvent(eventId);
            return redirect("/dashboard/events");
        } catch (e) {
            return json("Not Found", {
                status: 404
            });
        }
    }
    return {};
};

export default function DashboardEventDetailPage() {
    return (
        <div>
            <p>Event Detail Page</p>
        </div>
    )
}