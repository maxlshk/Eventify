import Background from "../elements/Background"
import EventPlaceholderImage from "../../assets/evnt-placeholder-image.webp"
import { LongEvent } from "../../interfaces/LongEventInterface"
import { Button, IconButton } from "@material-tailwind/react"
import { faCalendarDays, faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ArrowLeftIcon, ShareIcon } from "@heroicons/react/24/solid"
import { Form, NavLink, redirect, useLoaderData } from "react-router-dom"
import { format } from 'date-fns';
import { EventSidebarAccordion } from "../elements/EventSidebarAccordion"
import { getToken, getUserId } from "../../auth"

const localDateTimeString = (utcDateTimeString: string): string => {
    const utcDate = new Date(utcDateTimeString);
    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0] + ' ' + localDate.toTimeString().split(' ')[0];
};

//EventSidebar component, displays the event sidebar with all the event details
function EventSidebar() {
    const {
        id,
        title,
        host,
        description,
        availability,
        locationName,
        eventType,
        startDateTime,
        entranceFee,
        currentParticipants,
        maxParticipants,
        participants,
        imgUrl,
        comments
    } = useLoaderData() as LongEvent;
    const userId = getUserId();
    //Transform the startDateTime to a readable format
    const date = new Date(startDateTime);

    const day = format(date, 'd');
    const month = format(date, 'MMM');
    const weekday = format(date, 'EEEE');
    const time = format(date, 'h:mm a');

    //Check if the user can join the event
    const isJoinDisabled = (maxParticipants !== null && currentParticipants >= maxParticipants);
    //Check if the user is already subscribed to the event
    const isSubscibed = participants.some(participant => participant.id === userId);

    return (
        <section className='transition-all duration-500 delay-150 has-[nav]:w-1/3 w-1/4 flex flex-col justify-between min-w-[384px] bg-white z-10 relative shadow-left py-4 pl-7 pr-3 bg-white/70 overflow-hidden'>
            <Background />
            <div className="absolute z-0 pointer-events-none top-0 left-0 w-full h-full bg-white/65" />

            <div className="flex flex-col pr-4 mb-5 z-10 overflow-y-auto custom-scrollbar">

                <div className="flex flex-row justify-between">
                    <NavLink to='..'>
                        <IconButton
                            variant="text"
                            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                        </IconButton>
                    </NavLink>

                    <p className="flex items-center text-sm font-semibold">{title}</p>

                    <div className="flex gap-x-4">
                        <IconButton
                            variant="text"
                            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >
                            <ShareIcon className="w-5 h-5" />
                        </IconButton>
                        <IconButton
                            variant="text"
                            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >
                            <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                        </IconButton>
                    </div>
                </div>

                <div className="w-full mt-4 mx-auto rounded-2xl shadow-rounded">
                    <img src={imgUrl || EventPlaceholderImage} alt="Event" className="w-full h-48 border-2 border-gray-800 object-cover rounded-2xl" />
                </div>

                <div className="my-5 flex flex-row justify-between">
                    <div className="flex flex-row">

                        <div className="px-6 flex flex-col justify-center text-center">
                            <h3 className="font-semibold">{day}</h3>
                            <p className="text-sm font-semibold text-gray-500">{month}</p>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-semibold">{weekday}</h3>
                            <p className="text-sm font-semibold text-gray-500">{time}</p>
                        </div>
                    </div>
                    <IconButton
                        variant="outlined"
                        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                    >
                        <FontAwesomeIcon icon={faCalendarDays} className="w-5 h-5" />
                    </IconButton>
                </div>

                <EventSidebarAccordion
                    id={id}
                    description={description}
                    locationName={locationName.length > 10 ? locationName.substring(0, locationName.lastIndexOf(',')) : locationName}
                    participants={participants}
                    currentParticipants={currentParticipants}
                    maxParticipants={maxParticipants}
                    eventComments={comments}
                    host={host}
                    availability={availability}
                    eventType={eventType}
                />

            </div>
            <div className="flex flex-row justify-between z-10">
                <div>
                    <h3 className="font-semibold">{entranceFee === null ? 'FREE' : `₤${entranceFee}/PPPN`}</h3>
                    <p className="text-sm font-semibold text-gray-500">{maxParticipants === null ? 'Unlimited spots' : `${maxParticipants - currentParticipants} Spots left`}</p>
                </div>

                {isSubscibed ? (
                    <Form method='DELETE' className="w-1/2">
                        <Button
                            variant="outlined"
                            type="submit"
                            fullWidth
                            size="lg"
                            color="red"
                            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >
                            Leave
                        </Button>
                    </Form>
                ) : (
                    <Form method='PATCH' className="w-1/2">
                        <Button
                            type="submit"
                            variant="filled"
                            fullWidth
                            size="lg"
                            color="green"
                            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                            disabled={isJoinDisabled}
                        >
                            Join
                        </Button>
                    </Form>
                )}
            </div>

        </section>
    )
}

export default EventSidebar;

//Action to join the event by sending a PATCH request to the server with the event id
async function joinEvent(eventId: string, token: string) {
    const baseurl = import.meta.env.VITE_API_URL as string || 'http://localhost:8080';

    try {
        const response = await fetch(`${baseurl}/rest/events/${eventId}/participate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            console.error('Failed to join the event');
        }
    } catch (error) {
        console.error('Error:', error);
    }

    return redirect(`/events/${eventId}`);
}

//Action function to join or leave the event
export async function action({ params }: { request: any, params: any }) {

    const token = getToken();
    if (!token) {
        return redirect('/login/');
    }

    const eventId = params.id;
    return joinEvent(eventId, token);
}

//Loader function to fetch the event details
export async function loader({ params }: { params: any }) {
    const token = getToken();
    if (!token) {
        return redirect('/login/');
    }

    const id = params.id;
    console.log(id);
    const baseurl = import.meta.env.VITE_API_URL as string || 'http://localhost:8080';

    try {
        const response = await fetch(`${baseurl}/rest/events/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        const event = await new Promise<LongEvent>((resolve, reject) => {
            response.json().then((data: LongEvent) => {
                data.startDateTime = localDateTimeString(data.startDateTime);
                resolve(data);
            }).catch((error) => {
                console.error('Error processing event data:', error);
                reject(error);
            });
        });
        console.log(event);
        return event;

    } catch (error) {
        console.error('Error fetching events:', error);
        return null;
    }
};

