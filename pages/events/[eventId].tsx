import { useRouter } from 'next/dist/client/router';
import { EventContent } from '../../components/event-detail/event-content';
import { EventLogistics } from '../../components/event-detail/event-logistics';
import { EventSummary } from '../../components/event-detail/event-summary';
import { ErrorAlert } from '../../components/ui/error-alert';
import { getEventById } from '../../hooks/dummy-data';

const EventDetailPage = () => {
  const router = useRouter();

  const eventId = router.query.eventId as string;

  const event = getEventById(eventId);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        location={event.location}
        image={event.image}
        title={event.title}
        id={event.id}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;
