import { Typography, Textarea, Button } from '@material-tailwind/react'
import InputWithLabel from '../inputs/InputWithLabel'
import DatePicker from '../inputs/DatePicker'
import { Form, useLoaderData } from 'react-router-dom'
import { LatLngExpression } from 'leaflet'
import SingleSelectInput from '../inputs/SingleSelectInput'
import ImageInput from '../inputs/ImageInput'
import TimePicker from '../inputs/TimePicker'

function EventCreationFrom({ tabName, location, locationData }: { tabName: string, location: string, locationData: LatLngExpression }) {
    const data = useLoaderData() as { eventTypes: any[], currentLocation: LatLngExpression };

    let lat, lng;
    if (Array.isArray(locationData)) {
        lat = locationData[0];
        lng = locationData[1];
    } else if (locationData.lat !== undefined && locationData.lng !== undefined) {
        lat = locationData.lat;
        lng = locationData.lng;
    } else {
        throw new Error("Invalid latLngExpression format");
    }

    const changingForm = {
        'public': (
            <div className='grid grid-cols-2 gap-x-4'>
                <InputWithLabel
                    label="Event Location"
                    color="gray"
                    size="lg"
                    placeholder="Ukraine, Kyiv"
                    name="location"
                    value={location}
                    readOnly
                    containerProps={{
                        className: "min-w-full",
                    }}
                />
                <InputWithLabel
                    label="Event Tags"
                    color="gray"
                    size="lg"
                    placeholder="#event"
                    name="tags"
                    containerProps={{
                        className: "min-w-full",
                    }}
                />
            </div>),
        'paid': (
            <div className="grid grid-cols-3 gap-4">
                <InputWithLabel
                    label="Event Location"
                    color="gray"
                    size="lg"
                    placeholder="Ukraine, Kyiv"
                    name="location"
                    value={location}
                    readOnly
                    containerProps={{
                        className: "min-w-full",
                    }}
                />
                <InputWithLabel
                    label="Event Tags"
                    color="gray"
                    size="lg"
                    placeholder="#event"
                    name="tags"
                    containerProps={{
                        className: "min-w-full",
                    }}
                />
                <InputWithLabel
                    label="Event Price"
                    color="gray"
                    size="lg"
                    type="number"
                    placeholder="$20-30"
                    name="event-price"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    required
                />
            </div>
        ),
        'private': (
            <InputWithLabel
                label="Event Location"
                color="gray"
                size="lg"
                placeholder="Ukraine, Kyiv"
                name="location"
                value={location}
                readOnly
            >
                <Button
                    variant='outlined'
                    size="md"
                    placeholder="Last Name"
                    name="last-name"
                    className="focus:!border-gray-900 !border-blue-gray-200"
                    onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                >
                    Invite
                </Button>
            </InputWithLabel>),
    }
    return (
        <Form method='POST'>
            <input type="text" className='hidden' name="locationX" readOnly value={lat} />
            <input type="text" className='hidden' name="locationY" readOnly value={lng} />
            <input type="text" className='hidden' value={tabName} readOnly name='availability' />
            <input type="text" className='hidden' value={locationData.toString()} readOnly name='locationLatLng' />

            <div className='grid grid-cols-3 gap-x-4'>

                <div className="col-span-2 grid grid-cols-2 gap-x-4">
                    <InputWithLabel
                        label="Event Name"
                        color="gray"
                        size="lg"
                        placeholder="Event Name"
                        name="title"
                        containerProps={{
                            className: "min-w-full",
                        }}
                        required
                    />
                    <SingleSelectInput eventTypes={data.eventTypes} />

                    <DatePicker />
                    <TimePicker
                        label="Event Time"
                        name="event-time"
                        color="gray"
                        size="lg"
                        placeholder="Event Name"
                        containerProps={{
                            className: "min-w-full",
                        }}
                        required
                    />
                </div>
                <ImageInput />
            </div>
            {changingForm[tabName as keyof typeof changingForm]}

            <div>
                <Typography
                    variant="small"
                    className="mb-2 text-left font-medium !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                    Event Description
                </Typography>
                <Textarea
                    rows={3}
                    color="gray"
                    placeholder="Description"
                    name="description"
                    className="!border focus:!border-gray-900 !border-blue-gray-200 !ring-0"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            </div>

            <Button type="submit" className="w-full mt-4" color="gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Create {tabName} Event
            </Button>
        </Form>
    )
}

export default EventCreationFrom