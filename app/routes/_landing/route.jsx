import {
    Link,
    Outlet
  } from "@remix-run/react";
import logoAsinkron from "../../../public/assets/img/logo-asinkron.png";
import landingPageStyles from '../../styles/landing-page.css';

export const links = () => [
    { rel: "stylesheet", href: landingPageStyles },
];

export default function LandingPageLayout() {
    return (
      <>
        <div>
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
        </div>
        <footer className={`text-center pb-3`}>
          Made With <a href="https://remix.run" target="_blank"><u>Remix Run</u></a>
        </footer>
      </>
    )
}