import EventItem from './EventItem';

const EventList = ({ events }) => {
    return (
        <ul>
            {events.map((event) => (
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
