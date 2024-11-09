// import React, { MouseEventHandler} from "react";
// import { Event } from "../interfaces/Events";
// import { ApiMessage } from "../interfaces/ApiMessage";
// import { Button, Card, Image, Text } from "@chakra-ui/react"
// import './Home.css'
// import Aline from "../images/aline.webp"
// import { Link } from "react-router-dom";
// import WeatherSidebar from "../components/SideBar";
// import {
//     PopoverArrow,
//     PopoverBody,
//     PopoverContent,
//     PopoverRoot,
//     PopoverTitle,
//     PopoverTrigger,
// } from "../components/ui/popover"
// import "./SavedEvents.css"

// interface EventCardProps {
//     event: Event;
//     deleteEvent: (id: number) => Promise<ApiMessage>;
//     setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
// }

// const SavedEventCard: React.FC<EventCardProps> = ({ event, deleteEvent, setEvents }) => {
//     const handleDelete: MouseEventHandler<HTMLButtonElement> = async () => {
//             try {
//                 //delete event from database
//                 const data = await deleteEvent(Number(event.id));
//                 console.log('Deleted event:', data);
                
//                 //delete event from local storage
//                 const savedEvents = JSON.parse(localStorage.getItem('savedEvents') || '[]');
//                 const updatedEvents = savedEvents.filter((e: Event) => e.id !== event.id);
//                 localStorage.setItem('savedEvents', JSON.stringify(updatedEvents));

//                 //update state
//                 setEvents(prevEvents => prevEvents.filter((e: Event) => e.id !== event.id));
//             } catch (error) {
//                 console.error('Failed to delete event:', error);
//             }
//     };

//     return (
//         <div className="cards-container">
//         <Card.Root className="card" maxW="sm" overflow="hidden">
//             <Image
//                 src={event.images[0].url}
//             />
//             <Card.Body gap="2">
//                 <Card.Title>{event.name}</Card.Title>
//                 <Card.Description>
//                     {event.info}
//                 </Card.Description>
//                 <Card.Description>
//                     {/* {event.date.start.localDate}
//                     {event.date.end?.localDate} */}
//                 </Card.Description>
//                 <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
//                     {event.priceRanges[0].currency} {event.priceRanges[0].min}
//                 </Text>
//             </Card.Body>
//             <Card.Footer gap="2">
//                 <Button variant="solid" onClick={handleDelete}>Remove</Button>
//             </Card.Footer>
//         </Card.Root>
//     </div>
//     )

// }