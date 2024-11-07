import React from 'react';
import { Card, Image, Text, Button } from "@chakra-ui/react";
import { Event } from '../interfaces/Events.tsx';

interface EventCardProps {
  event: Event;
  addToEventList: () => void | undefined;
  removeFromEvents: () => void | undefined;
}

const EventCard: React.FC<EventCardProps> = ({ event, addToEventList, removeFromEvents }) => {
  return (
    <Card.Root className="card" maxW="sm" overflow="hidden">
      <Image src={event.imageUrl} alt={event.title} />
      <Card.Body gap="2">
        <Card.Title>{event.title}</Card.Title>
        <Card.Description>{event.description}</Card.Description>
        <Card.Description>{event.date}</Card.Description>
        <Card.Description>{event.location}</Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          {event.price}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid" onClick={addToEventList}>Save Event</Button>
        <Button variant="ghost" onClick={removeFromEvents}>Skip Event</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default EventCard;

