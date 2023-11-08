import EventList from '@/components/events/EventList';
import EventsSearch from '@/components/events/EventsSearch';
import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';

const EventsPage = (props) => {
    const { events } = props;
    // const [fetchedEvents, setFetchedEvents] = useState(null);
    // const [error, setError] = useState({
    //     is: false,
    //     message: null,
    // });
    const router = useRouter();

    const searchEventsHandler = (year, month) => {
        router.push(`/events/${year}/${month}`);
    };

    // useEffect(() => {
    //     const fetchAllEvents = async () => {
    //         await fetch('/api/events')
    //             .then((res) => {
    //                 if (!res.ok) {
    //                     throw new Error('Response is not ok!');
    //                 }
    //                 return res.json();
    //             })
    //             .then((data) => setFetchedEvents(data))
    //             .catch((err) => {
    //                 setError({
    //                     is: true,
    //                     message: err.message,
    //                 });
    //             });
    //     };
    //     fetchAllEvents();
    // }, []);

    // if (error.is)
    //     return <div style={{ textAlign: 'center', marginTop: '200px' }}>{error.message}</div>;

    if (!events) return <p style={{ textAlign: 'center', marginTop: '200px' }}>Loading...</p>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>All events</h1>
            <EventsSearch onSearch={searchEventsHandler} />
            <EventList events={events} />
        </div>
    );
};

export default EventsPage;

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/events');

    const data = await res.json();

    return {
        props: {
            events: data,
        },
        revalidate: 3600,
    };
}
