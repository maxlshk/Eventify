import { Await, Form, redirect, useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom"
import EventCard from "../cards/EventCard"
import Background from "../elements/Background"
import SearchDetailsForm from "../forms/SearchDetailsForm"
import SearchInput from "../inputs/SearchInput"
import ShortEvent from "../../interfaces/ShortEventInterface"
import { Suspense } from "react"
import EventCardSkeleton from "../cards/EventCardSkeleton"
import { getToken } from "../../auth"

//Function to get the current position of the user
const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

//EventsSidebar component, displays the events sidebar with the search form and events list
function EventsSidebar() {

    const data = useRouteLoaderData('map-layout') as { events: ShortEvent[] };
    const types = useLoaderData() as string[];
    const navigate = useNavigate();

    //Function to handle the search form submit event
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const hashtagRegex = /#\w+/g;

        const searchValue = formData.get('search-value') as string;
        const hashtags = searchValue.match(hashtagRegex) || [];
        let cleanSearchValue = searchValue.replace(hashtagRegex, '').trim();

        const queryParams = new URLSearchParams({
            'search-value': cleanSearchValue,
        });

        hashtags.map(tag => tag.slice(1)).forEach(tag => {
            queryParams.append('tag', tag);
        });

        formData.forEach((value, key) => {
            if (key !== 'search-value' && value.toString().trim() !== '') {
                if (key === 'from' || key === 'to') {
                    const date = new Date(value.toString());
                    if (key === 'from') {
                        date.setHours(0, 0, 0, 0);
                    } else if (key === 'to') {
                        date.setHours(23, 59, 59, 999);
                    }
                    const isoDateString = date.toISOString().replace('Z', '');
                    queryParams.append(key, isoDateString);
                    console.log(isoDateString);
                } else {
                    queryParams.append(key, value.toString().toUpperCase());
                }
                console.log(key, value)
            }
        });

        try {
            const position = await getCurrentPosition();
            queryParams.append('longitude', position.coords.longitude.toString());
            queryParams.append('latitude', position.coords.latitude.toString());

        } catch (error) {
            console.error('Error getting current position:', error);
        }

        const queryString = queryParams.toString();

        navigate(`/events?${queryString}`);
    };

    return (
        <section className='w-fit min-w-[384px] flex flex-col bg-white gap-y-4 z-10 relative shadow-left p-4 pb-0 bg-white/70 overflow-hidden'>
            <Background />
            <div className="absolute z-0 pointer-events-none top-0 left-0 w-full h-full bg-white/65" />
            <Form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
                <SearchInput />
                <SearchDetailsForm eventTypes={types} />
            </Form>

            <div className="h-full overflow-y-scroll custom-scrollbar z-10 pr-2">
                <div className="flex flex-col gap-y-3">
                    {/*<Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>*/}
                    <Suspense fallback={
                        <div className="flex flex-col gap-y-3">
                            {[...Array(5)].map((_, index) => (
                                <EventCardSkeleton key={index} />
                            ))}
                        </div>
                    }>

                        <Await resolve={data.events}>
                            {(events: ShortEvent[]) => events.map((event: ShortEvent, index: number) => (
                                <EventCard key={index} event={event} />
                            ))}
                        </Await>
                    </Suspense>
                </div>
            </div>

        </section>
    )
}

export default EventsSidebar

//Loader function to fetch event types
export async function loader() {
    const token = getToken();
    if (!token) {
        return redirect('/login');
    }

    const baseurl = import.meta.env.VITE_API_URL as string || 'http://localhost:8080';

    try {
        const response = await fetch(`${baseurl}/rest/events/types`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch event types');
        }

        const types = await response.json();
        return types;
    } catch (error) {
        console.error('Error fetching event types:', error);
        return [];
    }
}