import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';

import EventList from '../../components/events/event-list';
import { ResultTitle } from '../../components/events/result-title';
import { Button } from '../../components/ui/button';
import { ErrorAlert } from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../helpers/api-util';

type RemovePromise<T> = T extends Promise<infer R> ? R : string;
type Props = RemovePromise<ReturnType<typeof getServerSideProps>>['props'];

const FilteredEventsPage = (props: Props) => {
  const router = useRouter();
  // const filterData = router.query.slug as [string, string];
  // if (!filterData) {
  //   return <p className='center'>Loading... </p>;
  // }
  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];
  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  if (props['hasError']) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter.</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvent = props.events;
  if (!filteredEvent || filteredEvent.length === 0) {
    return (
      <>
        <p>No events found for the chosen filter!</p>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(props.year, props.month - 1);

  return (
    <>
      <ResultTitle date={date} />
      <EventList items={filteredEvent} />
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  const filterData = params!.slug as [string, string];

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: '/error',
      // },
    };
  }

  const filteredEvent = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  if (!filteredEvent || filteredEvent.length === 0) {
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: '/error',
      // },
    };
  }

  return {
    props: {
      hasError: false,
      events: filteredEvent,
      year: numYear,
      month: numMonth,
    },
  };
};

export default FilteredEventsPage;
