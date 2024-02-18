import {
    Outlet
} from "@remix-run/react";
import { requireUserSession } from "../../services/auth/auth.server";
import dashboardPageStyles from '../../styles/dashboard-page.css';

export const links = () => [
  { rel: "stylesheet", href: dashboardPageStyles },
];

export const meta = () => {
  return [{
    title: "Dashboard CMS",
  }, {
    property: "robots",
    content: "noindex",
  }];
};

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
      <>
        <div>
         <main id='main-content'>
            <div className={`container`}>
              <div className={`relative mt-10 mb-14 bg-white dark:bg-gray-800 shadow-3xl rounded-lg p-4`}>
                  <Outlet />
              </div>
            </div>
          </main>
        </div>
        <footer className={`text-center pb-3`}>
          Made With <a href="https://remix.run" target="_blank"><u>Remix Run</u></a>
        </footer>
      </>
    )
}