import { useLoaderData, useActionData } from "@remix-run/react";
// import { Event } from '../../../interfaces/event';
import { formatDate } from '../helpers';
import parse from 'html-react-parser';
import { getEventByUrl } from '../data/events.server';
import RegistrationForm from '../components/registration-form';

export const meta = ({data}) => {
    return [{
      title: data.title,
      description:data.short_description,
    }, {
      property: "og:title",
      content: data.title,
    }, {
      property: "og:description",
      content: data.short_description
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

export async function action({
    request,
  }) {
    const formData = await request.formData()
    const title = String(formData.get("title"));
    const content = String(formData.get("content"));
  
    // definisikan rules disini
    const errors = {};
    if (!title) {
      errors.title = "Title wajib diisi";
    }
    if (!content) {
      errors.content = "Content wajib diisi";
    } else if (!content.length < 12) {
      errors.title = "Title wajib tidak boleh kurang dari 12 karakter";
    }
    // jika object error tidak kosong maka return errors dalam bentuk json
    if (Object.keys(errors).length > 0) {
      return json({ errors });
    }
  
    const noteData = Object.fromEntries(formData)
    noteData.id =  new Date().toISOString();
    await storeNotes(noteData);
    return redirect('/')
}  

export const loader = ({params}) => {
    return getEventByUrl(params.eventId);
};

export default function EventPage() {
    const event = useLoaderData();
    const actionData = useActionData();

    return (
        <div>
            <div className={`grid grid-cols-12 gap-x-2 md:gap-x-[30px]`}>
                <div className={`col-start-1 col-end-3 pt-1 text-center md:pt-0 lg:col-end-2`}>
                    <time className={`flex flex-col items-center text-2xs font-bold uppercase sm:text-xs md:text-base`} dateTime={formatDate(event.starttime, 'full')}>
                    <span className={`text-accent`}>{formatDate(event.starttime, 'month')}</span>
                    <span className={`text-xl tracking-tighter text-primary sm:text-2xl md:text-[34px] md:leading-none`}>{formatDate(event.starttime, 'day')}</span>
                    </time>
                </div>
                <div className={`col-start-3 col-end-13 lg:col-start-2 lg:col-end-12`}>
                    <h1 className={`mb-4 text-xl font-bold tracking-tight text-primary md:mb-5 md:text-2xl lg:mb-8 lg:text-4xl xl:mb-14 xl:text-5xl`}>{event.title}</h1>
                    <div className={`lg:text-lg lg:leading-8 lg:tracking-tight`}>
                        <p>
                            {event.short_description}
                        </p>
                    </div>
                    <ul className={`flex flex-wrap gap-y-5 pt-9 lg:pt-14 xl:gap-x-24`}>
                    <li className={`flex basis-full gap-x-4 leading-tight sm:basis-1/2 xl:basis-auto`}>
                        <div className={`lg:pt-1`}>
                        <svg role="img" className={`h-6 w-6 fill-primary`}>
                            <use xlinkHref={`/assets/img/icons.svg#pin`}></use>
                        </svg>
                        </div>
                        <div>
                        <h5 className={`font-bold tracking-tight text-primary md:text-lg md:leading-tight lg:pb-[2px]`}>
                            {event.place}
                        </h5>
                        <span className={`text-xs lg:text-sm`}>Where</span>
                        </div>
                    </li>
                    <li className={`flex basis-full gap-x-4 leading-tight sm:basis-1/2 xl:basis-auto`}>
                        <div className={`lg:pt-1`}>
                        <svg role="img" className={`h-6 w-6 fill-primary`}>
                            <use xlinkHref={`/assets/img/icons.svg#clock`}></use>
                        </svg>
                        </div>
                        <div>
                        <h5 className={`font-bold tracking-tight text-primary md:text-lg md:leading-tight lg:pb-[2px]`}>{formatDate(event.starttime, 'hour')}</h5>
                        <span className={`text-xs lg:text-sm`}>Starts</span>
                        </div>
                    </li>
                    {
                        event.endtime ? (
                        <li className={`flex basis-full gap-x-4 leading-tight sm:basis-1/2 xl:basis-auto`}>
                            <div className={`lg:pt-1`}>
                                <svg role="img" className={`h-6 w-6 fill-primary`}>
                                    <use xlinkHref={`/assets/img/icons.svg#clock`}></use>
                                </svg>
                            </div>
                            <div>
                                <h5 className={`font-bold tracking-tight text-primary md:text-lg md:leading-tight lg:pb-[2px]`}>{formatDate(event.endtime, 'hour')}</h5>
                                <span className={`text-xs lg:text-sm`}>Ends</span>
                            </div>
                        </li>
                        ) : ''
                    }
                    <li className={`flex basis-full gap-x-4 leading-tight sm:basis-1/2 xl:basis-auto`}>
                        <div className={`lg:pt-1`}>
                        <svg role="img" className={`h-6 w-6 fill-primary`}>
                            <use xlinkHref={`/assets/img/icons.svg#ticket`}></use>
                        </svg>
                        </div>
                        <div>
                        <h5 className={`font-bold tracking-tight text-primary md:text-lg md:leading-tight lg:pb-[2px]`}>{event.price ? event.price : 'Free'}</h5>
                        <span className={`text-xs lg:text-sm`}>Price</span>
                        </div>
                    </li>
                    </ul>
                </div>
            </div>
            
            <div className={`grid grid-cols-12 gap-y-14 gap-x-2 md:gap-x-[30px] mt-20`}>
                <div className={`col-span-full md:col-start-2 md:col-end-12`}>
                    <h3 className={`mb-4 text-xl font-bold tracking-tight text-primary md:text-2xl lg:text-3xl mb-5 xl:text-3.5xl xl:tracking-tighter`}>Description</h3>
                    <div className={`prose max-w-none prose-p:text-gray-500 prose-p:tracking-tighter prose-p:lg:mb-8 prose-p:lg:text-lg prose-p:lg:leading-8`}>
                        {parse(event.description)}
                    </div>
                </div>
            </div>
            
            <div className={`grid grid-cols-12 gap-y-14 gap-x-2 md:gap-x-[30px] mt-5 mb-10`}>
                { !event.status || new Date(event.starttime) < new Date() ? (
                            ''
                ) : (
                <div className={`col-span-full md:col-start-2 md:col-end-12`}>
                    <h3 className={`mb-4 text-xl font-bold tracking-tight text-primary md:text-2xl lg:text-3xl mb-5 xl:text-3.5xl xl:tracking-tighter`}>Registration</h3>
                    <div className={`w-full`}>
                        <RegistrationForm actionData={actionData} eventDetail={event}/>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}