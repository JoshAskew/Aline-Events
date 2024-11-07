import React from 'react';
import { Card, Image, Text, Button } from "@chakra-ui/react";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  price: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, location, description, imageUrl, price }) => {
  return (
    <Card.Root className="card" maxW="sm" overflow="hidden">
      <Image src={imageUrl} alt={title} />
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
        <Card.Description>{date}</Card.Description>
        <Card.Description>{location}</Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          {price}
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

