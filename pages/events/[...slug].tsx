import { useRouter } from 'next/dist/client/router';
import EventList from '../../components/events/event-list';
import { ResultTitle } from '../../components/events/result-title';
import { Button } from '../../components/ui/button';
import { ErrorAlert } from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../hooks/dummy-data';

const FilteredEventsPage = () => {
  const router = useRouter();
  const filterData = router.query.slug as [string, string];
  console.log(filterData);

  if (!filterData) {
    return <p className='center'>Loading... </p>;
  }

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

  const filteredEvent = getFilteredEvents({ year: numYear, month: numMonth });
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

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultTitle date={date} />
      <EventList items={filteredEvent} />
    </>
  );
};

export default FilteredEventsPage;
