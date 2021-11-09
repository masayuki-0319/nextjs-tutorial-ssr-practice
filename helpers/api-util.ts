import { Event } from '../hooks/dummy-data';

const BASE_URL =
  'https://nextjs-tutorial-ssr-practice-default-rtdb.firebaseio.com/';

export const getAllEvents = async () => {
  const response = await fetch(BASE_URL + 'events.json');
  const data = await response.json();
  const events = [];

  for (const key in data) {
    const event = {
      id: key,
      ...data[key],
    } as Event;
    events.push(event);
  }

  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();

  const featuredEvents = allEvents.filter((event) => event.isFeatured);

  return featuredEvents;
};

export const getEventById = async (id: string) => {
  const allEvents = await getAllEvents();

  return allEvents.find((event) => event.id === id);
};
