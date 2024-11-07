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
import EventCard from "../components/EventCard";

const SavedEvents = () => {
    return (
        <>

            <WeatherSidebar />
            <PopoverRoot>
                <Link to="../Home">
                <Button className="back-button" size="sm" variant="subtle" >
                    Back To Events
                </Button>
                </Link>
                <PopoverTrigger asChild> 
                    <Button className="logout" size="sm" variant="outline" >
                        Logout
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                        <PopoverTitle fontWeight="bold">Are you sure you want to logout?</PopoverTitle>
                        <Text my="4">
                            These prices are not guaranteed to persist.
                        </Text>
                        <Link to="../Login">
                            <Button className="logout" size="sm" variant="outline">
                                Yes, Log Me Out
                            </Button>
                        </Link>
                    </PopoverBody>
                </PopoverContent>
            </PopoverRoot>
            <h1 className="header">Aline</h1>
            <div className="cards-container">
                <Card.Root className="card" maxW="sm" overflow="hidden">
                    <Image
                        src={Aline}
                    />
                    <Card.Body gap="2">
                        <Card.Title>Event Title</Card.Title>
                        <Card.Description>
                            This is the type of the event.
                        </Card.Description>
                        <Card.Description>
                            Start Date-End Date
                        </Card.Description>
                        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                            $450-$1000
                        </Text>
                    </Card.Body>
                    <Card.Footer gap="2">
                        <Button variant="solid">Save Event</Button>
                        <Button variant="ghost">Skip Event</Button>
                    </Card.Footer>
                </Card.Root>
            </div>
        </>
    );
};

export default SavedEvents;