import { Event } from '../interfaces/Events';




const searchTicketMaster = async (): Promise<Event[]> => {

  try {
  
    
    //console.log(import.meta.env);


    //https://app.ticketmaster.com/discovery/v2/events.json?city=minneapolis&source=universe&countryCode=US&apikey=${import.meta.env.VITE_GITHUB_TOKEN}

    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=minneapolis&source=universe&countryCode=US&apikey=${import.meta.env.VITE_GITHUB_TOKEN}`,);
    
    
    const data = await response.json();

    console.log('data:');
    console.log(data);

    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    
    return data;
    
  } catch (err) {
     console.log('an error occurred', err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return {};
  }
};

export { searchTicketMaster, searchGithubUser };
