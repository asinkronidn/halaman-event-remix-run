import { useLoaderData, Link, useFetcher } from "@remix-run/react";
import { sanitizeDashboardParentMeta, formatDate } from '../helpers';
import { getEvents } from '../data/events.server';
import { useEffect } from "react";

export const meta = ({
    matches
}) => {
    return [...sanitizeDashboardParentMeta(matches), { title: "Event Management" }]; 
};

export const loader = () => {
  return getEvents();
};

export default function DashboardEventPage() {
    const events = useLoaderData();
    const fetcher = useFetcher();

    const doDelete = async (e, id) => {
      e.preventDefault();
      if (fetcher.state !== 'idle') {
        return ;
      }
      if (confirm('Are you sure?')) {
        fetcher.submit(null, {
            method: "DELETE",
            action: `/dashboard/events/${id}`
        });
      }
    }

    useEffect(() => {
        if (fetcher.state === 'loading') {
            if (fetcher.data && fetcher.data !== 'success') {
                alert(fetcher.data)
            }
        }
    }, [
        fetcher
    ]);

    return (
        <>
            <div className={`relative flex flex-col min-w-0 break-words bg-white mb-6`}>
                <div className={`rounded-t mb-0 py-3 border-0`}>
                    <div className={`flex flex-wrap items-center`}>
                        <h3 className={`font-bold text-lg`}>Events</h3>
                    </div>
                </div>

              <div className={`block`}>
                <table className={`items-center bg-transparent border-collapse `}>
                  <thead>
                    <tr>
                        <th className={`px-6 align-middle border border-solid py-3 text-md border-l-0 border-r-0 font-bold text-left`}>
                            Title
                        </th>
                        <th width={`15%`} className={`px-6 align-middle border border-solid py-3 text-md border-l-0 border-r-0 font-bold text-left`}>
                            Start
                        </th>
                        <th width={`15%`} className={`px-6 align-middle border border-solid py-3 text-md border-l-0 border-r-0 font-bold text-left`}>
                            End
                        </th>
                        <th className={`px-6 align-middle border border-solid py-3 text-md border-l-0 border-r-0 font-bold text-left`}>
                            Short Description
                        </th>
                        <th className={`px-6 align-middle border border-solid py-3 text-md border-l-0 border-r-0 font-bold text-left`}>
                            Status
                        </th>
                        <th colSpan={2} className={`px-6 align-middle border border-solid py-3 text-md border-l-0 border-r-0 font-bold text-center`}>
                            Action
                        </th>
                    </tr>
                  </thead>

                  <tbody>
                  {events.map(event => (
                    <tr key={event.id}>
                        <td className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-md p-4 `}>
                            { event.title }
                        </td>
                        <td className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-md p-4 `}>
                            { formatDate(event.starttime, 'period') }
                        </td>
                        <td className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-md p-4 `}>
                            { event.endtime ? formatDate(event.endtime, 'period') : '-' }
                        </td>
                        <td className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-md p-4 `}>
                        { event.short_description }
                        </td>
                        <td className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-md p-4 `}>
                            { event.status ? (
                                <span className={`inline-flex items-center justify-center px-4 py-2 text-xs font-bold leading-none text-white bg-green rounded-full`}>Active</span>
                            ) : (
                                <span className={`inline-flex items-center justify-center px-4 py-2 text-xs font-bold leading-none text-white bg-gray rounded-full`}>Inactive</span>
                            )
                            }
                        </td>
                        <td className={`border-t-0 px-1 align-middle underline border-l-0 border-r-0 text-md text-right`}>
                            <Link to={`/dashboard/events/${event.id}`}>Detail</Link>
                        </td>
                        <td className={`border-t-0 px-1 align-middle underline border-l-0 border-r-0 text-md text-left`}>
                            <a href="#" onClick={(e) => doDelete(e, event.id)}>Delete</a>
                        </td>
                    </tr>
                  ))}
                  </tbody>

                </table>
              </div>
            </div>
        </>
    )
}