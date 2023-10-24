import { useRouter } from 'next/router';
import { useState, useEffect, Fragment } from 'react';
import EventSummary from '@/components/eventDetail/eventSummary';
import EventLogistics from '@/components/eventDetail/eventLogistics';
import EventContent from '@/components/eventDetail/eventContent';
import NotFound from '@/pages/404';

const EventDetailPage = () => {
    const [wantedEvent, setWantedEvent] = useState();
    const [isError, setIsError] = useState(false);
    const router = useRouter();
    const { eventId } = router.query;

    useEffect(() => {
        const fetchWantedEvent = async () => {
            const endpoint = `http://localhost:3000/api/events/${eventId}`;
            await fetch(endpoint)
                .then((res) => {
                    if (!res.ok) throw new Error('Network response is not ok!');
                    return res.json();
                })
                .then((data) => setWantedEvent(data))
                .catch((err) => setIsError(true));
        };
        if (eventId) {
            fetchWantedEvent();
        }
    }, [eventId]);

    if (isError) return <NotFound />;

    return (
        <>
            {wantedEvent ? (
                <>
                    <EventSummary title={wantedEvent.title} />
                    <EventLogistics
                        date={wantedEvent.date}
                        address={wantedEvent.location}
                        image={wantedEvent.image}
                        imageAlt="event image"
                    />
                    <EventContent>
                        <p>{wantedEvent.description}</p>
                    </EventContent>
                </>
            ) : (
                <p style={{ textAlign: 'center', marginTop: '200px' }}>Loading...</p>
            )}
        </>
    );
};

export default EventDetailPage;
