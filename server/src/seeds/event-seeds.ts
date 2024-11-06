import { Event } from '../models/events.js';

export const seedEvents= async () => {
  await Event.bulkCreate([
    {  
        name: 'Minnesota Timberwolves vs. Pheonix Suns', 
        url: 'https://www.ticketmaster.com/event/Z7r9jZ1A7C3_O', 
        type: 'event', 
        images: [{
        url: 'https://s1.ticketm.net/dam/a/c70/98044e71-9085-471b-9f21-78525c745c70_TABLET_LANDSCAPE_3_2.jpg',
      }], 
      dates: {start: {localDate: '2024-11-17' }}, 
      priceRanges: [{
        min: '150',
        max: '1600'
      }], 
      info: 'info may be the wrong type', 
      venue: {name: 'Target Center',}
    },

    {  
        name: 'Minnesota Vikings vs. Green Bay Packers', 
        url: 'https://www.ticketmaster.com/minnesota-vikings-vs-green-bay-packers-minneapolis-minnesota-12-29-2024/event/0600604DCB876A8A', 
        type: 'event', 
        images: [{
        url: 'https://s1.ticketm.net/dam/a/c8f/75f3a489-bc4f-40dc-a6d5-19042e05ec8f_1325351_RETINA_PORTRAIT_16_9.jpg',
      }], 
      dates: {start: {localDate: '2024-12-29' }}, 
      priceRanges: [{
        min: '150',
        max: '1600'
      }], 
      info: 'info may be the wrong type', 
      venue: {name: 'U.S. BANK STADIUM',}
    },
    
    {  
        name: 'Minnesota Vikings vs. Green Bay Packers', 
        url: 'https://www.ticketmaster.com/minnesota-vikings-vs-green-bay-packers-minneapolis-minnesota-12-29-2024/event/0600604DCB876A8A', 
        type: 'event', 
        images: [{
        url: 'https://s1.ticketm.net/dam/a/c8f/75f3a489-bc4f-40dc-a6d5-19042e05ec8f_1325351_RETINA_PORTRAIT_16_9.jpg',
      }], 
      dates: {start: {localDate: '2024-12-29' }}, 
      priceRanges: [{
        min: '150',
        max: '1600'
      }], 
      info: 'info may be the wrong type', 
      venue: {name: 'U.S. BANK STADIUM',}
    },

    {  
        name: 'Minnesota Vikings vs. Green Bay Packers', 
        url: 'https://www.ticketmaster.com/minnesota-vikings-vs-green-bay-packers-minneapolis-minnesota-12-29-2024/event/0600604DCB876A8A', 
        type: 'event', 
        images: [{
        url: 'https://s1.ticketm.net/dam/a/c8f/75f3a489-bc4f-40dc-a6d5-19042e05ec8f_1325351_RETINA_PORTRAIT_16_9.jpg',
      }], 
      dates: {start: {localDate: '2024-12-29' }}, 
      priceRanges: [{
        min: '150',
        max: '1600'
      }], 
      info: 'info may be the wrong type', 
      venue: {name: 'U.S. BANK STADIUM',}
    },

    {  
        name: 'Minnesota Vikings vs. Green Bay Packers', 
        url: 'https://www.ticketmaster.com/minnesota-vikings-vs-green-bay-packers-minneapolis-minnesota-12-29-2024/event/0600604DCB876A8A', 
        type: 'event', 
        images: [{
        url: 'https://s1.ticketm.net/dam/a/c8f/75f3a489-bc4f-40dc-a6d5-19042e05ec8f_1325351_RETINA_PORTRAIT_16_9.jpg',
      }], 
      dates: {start: {localDate: '2024-12-29' }}, 
      priceRanges: [{
        min: '150',
        max: '1600'
      }], 
      info: 'info may be the wrong type', 
      venue: {name: 'U.S. BANK STADIUM',}
    }

  ]);
};
