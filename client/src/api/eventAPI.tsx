import { Event } from '../interfaces/Events';
import { ApiMessage } from '../interfaces/ApiMessage';
import Auth from '../utils/auth';

//get events saved to user profile
export const getSavedEvents = async (): Promise<Event[]> => {
    try {
        const response = await fetch(`/api/events/saved`, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            }
        );
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Invalid API response');
        }
        return data;
    } catch (error) {
        console.log(error);
        return [];
};
};

export const saveEvent = async (body: Event) => {
    try {
        const response = await fetch(`/api/events/save`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                },
                body: JSON.stringify(body)
            }
        );
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Invalid API response');
        }
        return data;
    } catch (error) {
        console.log('Error saving event:', error);
        return Promise.reject({ message: 'Error saving event' });
    }
};

export const deleteEvent = async (id: number): Promise<ApiMessage> => {
    try {
        const response = await fetch(`/api/events/delete/${id}`, 
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            }
        );
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Invalid API response');
        }
        
        return data;
    } catch (error) {
        console.log('Error deleting event:', error);
        return Promise.reject({ message: 'Error deleting event' });
    }
}