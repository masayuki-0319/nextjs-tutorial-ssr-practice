import { VFC } from 'react';
import Image from 'next/image';

import { AddressIcon } from '../icons/address-icon';
import { DateIcon } from '../icons/date-icon';
import { LogisticsItem } from './logistics-item';
import classes from './event-logistics.module.css';
import { Event } from '../../hooks/dummy-data';

type Props = {
  [K in keyof Pick<
    Event,
    'title' | 'image' | 'date' | 'location' | 'id'
  >]: Event[K];
};

const EventLogistics: VFC<Props> = (props) => {
  const { date, location, image, title } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const addressText = location.replace(', ', '\n');

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={image} alt={title} width='50' height='50' />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
};

export { EventLogistics };
