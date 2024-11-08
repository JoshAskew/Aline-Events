//import React from 'react';
import { Card, Image, Text, Button } from "@chakra-ui/react";
//import { Event } from '../interfaces/Events.tsx';
import Aline from "../images/aline.webp"

    const EventCard = () =>  {
      
  return (
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
  );
};

export default EventCard;

