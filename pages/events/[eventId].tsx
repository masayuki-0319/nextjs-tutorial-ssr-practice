import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { EventContent } from '../../components/event-detail/event-content';
import { EventLogistics } from '../../components/event-detail/event-logistics';
import { EventSummary } from '../../components/event-detail/event-summary';
import { ErrorAlert } from '../../components/ui/error-alert';
import { getAllEvents, getEventById } from '../../helpers/api-util';
import { Event } from '../../hooks/dummy-data';

type Props = {
  selectedEvent: Event;
};

const EventDetailPage = (props: Props) => {
  const event = props.selectedEvent;

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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const eventId = context.params!.eventId as string;

  const event = await getEventById(eventId);

  return {
    props: {
      params: {
        selectedEvent: event,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const events = await getAllEvents();

  const paths = events.map((event) => {
    return {
      params: {
        eventId: event.id,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export default EventDetailPage;
