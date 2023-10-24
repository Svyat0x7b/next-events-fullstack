import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import EventList from '@/components/events/EventList';
import EventsSearch from '@/components/events/EventsSearch';
const EventsPage = () => {
    const [fetchedEvents, setFetchedEvents] = useState(null);
    const [error, setError] = useState({
        is: false,
        message: null,
    });
    const router = useRouter();

    const searchEventsHandler = (year, month) => {
        router.push(`/events/${year}/${month}`);
    };

    useEffect(() => {
        const fetchAllEvents = async () => {
            await fetch('/api/events')
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Response is not ok!');
                    }
                    return res.json();
                })
                .then((data) => setFetchedEvents(data))
                .catch((err) => {
                    setError({
                        is: true,
                        message: err.message,
                    });
                });
        };
        fetchAllEvents();
    }, []);

    if (error.is)
        return <div style={{ textAlign: 'center', marginTop: '200px' }}>{error.message}</div>;

    return fetchedEvents ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>All events</h1>
            <EventsSearch onSearch={searchEventsHandler} />
            <EventList events={fetchedEvents} />
        </div>
    ) : (
        <p style={{ textAlign: 'center', marginTop: '200px' }}>Loading</p>
    );
};

export default EventsPage;
