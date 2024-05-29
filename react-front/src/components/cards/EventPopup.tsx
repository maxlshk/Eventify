import { faUsers, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { Event } from '../../pages/EventsMapPage'
import { colorVariants, iconVariants, ribbonVariants } from './EventCard'


function EventPopup({ name, location, category, people, type, link, limit, price }: Event) {

    return (
        <div
            className="bg-gray-50/80 group/item hover:bg-gray-50 backdrop-blur-sm w-full h-auto 
            rounded-lg shadow-md flex card text-gray-700"
            style={{ transition: "background-color 0.3s" }}
        >
            <div className={`w-2 -ml-[1px] text-white flex items-center rounded-l-lg shadow-xl ${ribbonVariants[category as keyof typeof ribbonVariants]}`} />

            <div className="w-full flex flex-col">
                <div className="grid grid-cols-2 gap-4 p-4">
                    <div>
                        <div className='flex flex-row justify-between gap-6 mb-4'>
                            <div className="text-xl font-bold text-gray-700">{name}</div>

                        </div>

                        {price && <span className="text-xl font-thin text-gray-700">£{price}<span className="text-lg">/PPPN</span></span>}
                        {!price && <span className="text-xl font-thin text-gray-700"><span className="text-lg">FREE</span></span>}
                        <div className="flex items-center mt-4 gap-x-5">

                            <div className="flex text-xs gap-2">
                                <FontAwesomeIcon icon={faUsers} /> {people}{limit && `/${limit}`} people
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className={`${colorVariants[type as keyof typeof colorVariants]} w-3/4 text-white aspect-square flex items-center justify-center rounded-full shadow-rounded-lg`}>
                            <FontAwesomeIcon icon={iconVariants[type as keyof typeof iconVariants]} className='text-2xl' />
                        </div>
                    </div>

                </div>
                <NavLink
                    to={link}
                    className="bg-gray-100/40 group/link group-hover/item:bg-gray-200/60 p-3 flex items-center justify-between rounded-br-lg transition ease-in-out group-hover:hover:bg-gray-200">
                    Go to event
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className='-translate-x-1 group-hover/link:translate-x-0.5'
                        style={{ transition: "transform 0.3s" }}
                    />
                </NavLink>
            </div>
        </div>
    )
}

export default EventPopup