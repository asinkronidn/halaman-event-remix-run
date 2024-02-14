import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import globalStyles from './styles/global.css';
import logoAsinkron from "../public/assets/img/logo-asinkron.png";
import { Analytics } from '@vercel/analytics/react';


export const links = () => [
  { rel: "stylesheet", href: globalStyles },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={`antialiased tracking-tight font-base text-gray-500 text-base bg-gray-lighter overflow-x-hidden`}>
        <div className={`space-section m-auto px-4 pt-16 pb-36`}>
          <a href="http://asinkron.com/">
            <img
              width={200}
              height={56}
              alt={`Workshop Asinkron Indonesia`}
              src={logoAsinkron}
              className={`logo-space-img m-auto`}
            />
          </a>
          <nav className={`main-nav`}>
            <ol className={` text-center pt-6 text-white font-black	relative flex flex-wrap justify-center divide-x-2 divide-white text-md uppercase leading-none`}>
              <li className={`px-[10px]`}>
                <a href="http://asinkron.com/">Home</a>
              </li>
              <li className={`px-[10px]`}>
                <Link to="/">Events</Link>
              </li>
            </ol>
          </nav>
        </div>
        <main id='main-content' className={`grow lg:pt-0`}>
          <div className={`pt-14 pb-5 lg:pt-40`}>
            <div className={`container`}>
              <div className={`relative -mt-20 mb-14 bg-white dark:bg-gray-800 shadow-3xl lg:-mt-[200px] rounded-lg p-4`}>
                <Outlet />
              </div>
            </div>
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <footer className={`text-center pb-3`}>
          Made With <a href="https://remix.run" target="_blank"><u>Remix Run</u></a>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
