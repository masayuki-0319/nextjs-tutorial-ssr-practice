import { useRouter } from 'next/dist/client/router';
import EventList from '../../components/events/event-list';
import { EventSearch } from '../../components/events/event-search';
import { getAllEvents } from '../../hooks/dummy-data';

const AllEventsPage = () => {
  const router = useRouter();

  const events = getAllEvents();

  const findEventHandler = (year: string, month: string) => {
    const fullPath = `events/${year}/${month}`;
    console.log(fullPath);

    router.push(fullPath);
  };

  return (
    <div>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </div>
  );
};

export default AllEventsPage;
