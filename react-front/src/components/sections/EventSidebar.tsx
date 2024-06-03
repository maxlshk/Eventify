import Background from "../elements/Background"
import { LongEvent } from "../../interfaces/LongEventInterface"
import { Button, IconButton } from "@material-tailwind/react"
import { faCalendarDays, faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ArrowLeftIcon, ShareIcon } from "@heroicons/react/24/solid"
import { NavLink, redirect, useLoaderData } from "react-router-dom"
import { format } from 'date-fns';
import { EventSidebarAccordion } from "../elements/EventSidebarAccordion"
import { useEffect, useState } from "react"
import { getToken } from "../../auth"

const localDateTimeString = (utcDateTimeString: string): string => {
    const utcDate = new Date(utcDateTimeString);
    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0] + ' ' + localDate.toTimeString().split(' ')[0];
};

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
    const date = new Date(startDateTime);

    const day = format(date, 'd');
    const month = format(date, 'MMM');
    const weekday = format(date, 'EEEE');
    const time = format(date, 'h:mm a');

    const [stateCurrentParticipants, setCurrentParticipants] = useState(currentParticipants);
    const [stateParticipants, setParticipants] = useState(participants);
    const [isJoinDisabled, setIsJoinDisabled] = useState((maxParticipants !== null && stateCurrentParticipants >= maxParticipants) ||
        stateParticipants.some(participant => participant.id === host.id));

    useEffect(() => {
        setIsJoinDisabled(
            (maxParticipants !== null && stateCurrentParticipants >= maxParticipants) ||
            stateParticipants.some(participant => participant.id == host.id)
        );
    }, [stateCurrentParticipants, stateParticipants, maxParticipants]);

    const handleJoin = async () => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            throw new Error('No JWT token found');
        }

        try {
            const response = await fetch(`http://localhost:8080/rest/events/${id}/participate`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setCurrentParticipants(data.currentParticipants);
                setParticipants(data.participants);
            } else {
                console.error('Failed to join the event');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    //const isJoinDisabled = (maxParticipants !== null && stateCurrentParticipants >= maxParticipants) || stateParticipants.some(participant => participant.id === id);

    return (
        <section className='transition-all duration-500 delay-150 has-[nav]:w-1/3 w-1/4 flex flex-col justify-between min-w-[384px] bg-white z-10 relative shadow-left py-4 px-7 bg-white/70 overflow-hidden'>
            <Background />
            <div className="absolute z-0 pointer-events-none top-0 left-0 w-full h-full bg-white/65" />

            <div className="flex flex-1 max-h-full flex-col z-10">

                <div className="flex flex-row justify-between">
                    <NavLink to='..'>
                        <IconButton
                            variant="text"
                            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                        </IconButton>
                    </NavLink>

                    <p className="flex items-center text-sm font-semibold">{availability.toUpperCase()} {eventType.toUpperCase()}</p>

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

                {/* <div className="w-full mt-4 mx-auto rounded-2xl shadow-rounded">
                    <img src={BirthdayCard} alt="Event" className="w-full h-24 border-2 border-gray-800 object-cover rounded-2xl" />
                </div> */}

                <div className="mt-4">
                    <h1 className="text-lg font-bold text-center">{title}</h1>
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

                <EventSidebarAccordion id={id} description={description} locationName={locationName.substring(0, locationName.lastIndexOf(','))} currentParticipants={stateCurrentParticipants} maxParticipants={maxParticipants} eventComments={comments} />

            </div>
            <div className="flex flex-row justify-between z-10">
                <div>
                    <h3 className="font-semibold">{entranceFee === null ? 'FREE' : `₤${entranceFee}/PPPN`}</h3>
                    <p className="text-sm font-semibold text-gray-500">{maxParticipants === null ? 'Unlimited spots' : `${maxParticipants - stateCurrentParticipants} Spots left`}</p>
                </div>

                <div className="w-1/2">
                    <Button
                        variant="filled"
                        fullWidth
                        size="lg"
                        color="green"
                        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        onClick={handleJoin}
                        disabled={isJoinDisabled}
                    >
                        Join
                    </Button>
                </div>
            </div>

        </section>
    )
}

export default EventSidebar;

export async function action({ request }: { request: Request }) {
    const data = await request.formData();

    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error('No JWT token found');
    }

    return null;
}

export async function loader({ params }: { params: any }) {
    const token = getToken();
    if (!token) {
        return redirect('/login');
    }

    const id = params.id;
    console.log(id);

    try {
        const response = await fetch(`http://localhost:8080/rest/events/${id}`, {
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
                // Transform the startDateTime and resolve the event
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

