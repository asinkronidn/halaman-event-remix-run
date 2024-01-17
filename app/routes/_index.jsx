import { useLoaderData } from "@remix-run/react";
import { formatDate } from '../helpers';
import { getEvents } from '../data/events.server';


export const meta = () => {
  return [{
    title: "Event Asinkron Indonesia",
    description: "Kumpulan workshop bahasa indonesia react.js, next.js dan remix run",
  }, {
    property: "og:title",
    content: "Event Asinkron Indonesia",
  }, {
    property: "og:description",
    content: "Kumpulan workshop bahasa indonesia react.js, next.js dan remix run",
  }, {
    property: "og:locale",
    content: "id_ID",
  }, {
    property: "og:type",
    content: "website",
  }, {
    property: "og:image",
    content: "https://web-tools.asinkron.com/assets/img/workshop-remix-next-step.png",
  }];
};

export const loader = () => {
  return getEvents();
};

export default function HomePage() {
  const events = useLoaderData();

  return (
    <div>
      <div className={`flex flex-col gap-y-[30px]`}>
      {events.map(event => (
          <div key={event.id} className={`flex flex-wrap bg-white py-7 pr-7 relative`}>
            { !event.status || new Date(event.starttime) < new Date() ? (
              <div className={`disable-event absolute top-0	left-0 w-full h-full`}/>
            ) : (
              ''
            )}
            <div className={`w-20 text-center md:w-24 lg:w-[140px]`}>
              <time className={`flex flex-col items-center text-xs font-bold uppercase md:text-base`} dateTime={formatDate(event.starttime, 'full')}>
                <span className={`text-accent`}>
                  {formatDate(event.starttime, 'month')}
                </span>
                <span className={`text-2xl tracking-tighter md:text-[34px] md:leading-none text-primary`}>
                  {formatDate(event.starttime, 'day')}
                </span>
              </time>
            </div>
            <div className={`flex flex-1 flex-wrap items-center`}>
            <div className={`basis-full lg:basis-7/12 lg:pr-8`}>
              <h4 className={`mb-3 text-lg font-bold leading-tight tracking-tight md:mb-1 md:text-1.5xl md:leading-tight lg:leading-none`}>
                <a className={`text-primary transition-colors hover:text-accent`} href={`/details/${event.url}`}>
                  {event.title}
                </a>
              </h4>
              <div className={`text-sm md:text-base lg:tracking-tight xl:text-lg xl:leading-8`}>
                <p className={`leading-tight`}>
                  {event.short_description}
                </p>
              </div>
            </div>
            <div className={`basis-full lg:basis-5/12`}>
              <ul className={`flex flex-wrap gap-y-5 pt-7 lg:pt-0`}>
                <li className={`flex basis-full gap-x-4 leading-tight sm:basis-1/2 md:basis-1/3 lg:basis-7/12 xl:basis-2/3`}>
                  <div className={`lg:pt-1`}>
                    <svg role="img" className={`h-6 w-6 fill-primary`}>
                      <use xlinkHref="/assets/img/icons.svg#pin"></use>
                    </svg>
                  </div>
                  <div>
                    <h5 className={`font-bold tracking-tight text-primary md:text-lg md:leading-tight lg:pb-[2px]`}>
                      {event.place}
                    </h5>
                    <span className={`text-xs lg:text-sm`}>Where</span>
                  </div>
                </li>
                <li className={`flex basis-full gap-x-4 leading-tight sm:basis-1/2 md:basis-1/3 lg:basis-5/12 xl:basis-1/3`}>
                  <div className={`lg:pt-1`}>
                    <svg role="img" className={`h-6 w-6 fill-primary`}>
                      <use xlinkHref="/assets/img/icons.svg#clock"></use>
                    </svg>
                  </div>
                  <div>
                    <h5 className={`font-bold tracking-tight text-primary md:text-lg md:leading-tight lg:pb-[2px]`}>
                      {formatDate(event.starttime, 'hour')}
                    </h5>
                    <span className={`text-xs lg:text-sm`}>Time</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          </div>
      ))}
      </div>
    </div>
  );
}
