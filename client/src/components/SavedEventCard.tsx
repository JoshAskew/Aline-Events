import { Event } from "../interfaces/Events";
import { ApiMessage } from "../interfaces/ApiMessage";
import { mouseEventHandler} from "react";

import { Button, Card, Image, Text } from "@chakra-ui/react"
import './Home.css'
import Aline from "../images/aline.webp"
import { Link } from "react-router-dom";
import WeatherSidebar from "../components/SideBar";
import {
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverRoot,
    PopoverTitle,
    PopoverTrigger,
} from "../components/ui/popover"
import "./SavedEvents.css"

interface EventCardProps {
    event: Event;
    deleteEvent: (id: number) => Promise<ApiMessage>
}

const SavedEventCard = ({ event, deleteEvent}: EventCardProps) => {
    const handleDelete: mouseEventHandler<HTMLButtonElement> = async () => {
        const id = Number(event.currentTarget.value);
        if (!isNaN(id)) {
            try {
                const data = await deleteEvent(id);
                return data;
            } catch (err) {
                console.error('failed to delete event:', err);
            }
         }
    };

    return (
        <div className="cards-container">
        <Card.Root className="card" maxW="sm" overflow="hidden">
            <Image
                src={event.images[0].url}
            />
            <Card.Body gap="2">
                <Card.Title>{event.name}</Card.Title>
                <Card.Description>
                    {event.info}
                </Card.Description>
                <Card.Description>
                    {event.date.start.localDate}
                    {event.date.end?.localDate}
                </Card.Description>
                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    {event.priceRanges[0].currency} {event.priceRanges[0].min}
                </Text>
            </Card.Body>
            <Card.Footer gap="2">
                <Button variant="solid" >Remove</Button>
            </Card.Footer>
        </Card.Root>
    </div>
    )

}