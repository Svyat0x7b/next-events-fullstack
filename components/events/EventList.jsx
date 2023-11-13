import EventItem from './EventItem';
import ErrorMessage from '../ui/ErrorMessage';
import styles from './EventList.module.css';

const EventList = ({ events }) => {
    if (!events || !Array.isArray(events) || events.length === 0) {
        return <ErrorMessage>There are no such events!</ErrorMessage>;
    }
    return (
        <ul className={styles.list}>
            {events?.map((event) => (
                <EventItem
                    title={event.title}
                    id={event.id}
                    img={event.image}
                    description={event.description}
                    location={event.location}
                    date={event.date}
                />
            ))}
        </ul>
    );
};

export default EventList;
