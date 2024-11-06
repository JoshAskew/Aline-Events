import React from 'react';

interface EventCardProps {
  title: string;
  date: number;
  location: string;
  description: string;
  imageUrl: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, location, description, imageUrl }) => {
  return (
    <div className="event-card">
      <img src={imageUrl} alt={title} className="event-card-image" />
      <div className="event-card-content">
        <h2>{title}</h2>
        <p>{date}</p>
        <p>{location}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default EventCard;
