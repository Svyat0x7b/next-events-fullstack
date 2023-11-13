import Head from 'next/head';
import EventSummary from '@/components/eventDetail/eventSummary';
import EventLogistics from '@/components/eventDetail/eventLogistics';
import EventContent from '@/components/eventDetail/eventContent';
import Comments from '@/components/input/Comments';
// import NotFound from '@/pages/404';
// import { useState, useEffect, Fragment } from 'react';
// import { useRouter } from 'next/router';

const EventDetailPage = (props) => {
    const { event } = props;
    // const [wantedEvent, setWantedEvent] = useState();
    // const [isError, setIsError] = useState(false);
    // const router = useRouter();
    // const { eventId } = router.query;

    // useEffect(() => {
    //     const fetchWantedEvent = async () => {
    //         const endpoint = `/api/events/${eventId}`;
    //         await fetch(endpoint)
    //             .then((res) => {
    //                 if (!res.ok) throw new Error('Network response is not ok!');
    //                 return res.json();
    //             })
    //             .then((data) => setWantedEvent(data))
    //             .catch((err) => setIsError(true));
    //     };
    //     if (eventId) {
    //         fetchWantedEvent();
    //     }
    // }, [eventId]);

    // if (isError) return <NotFound />;

    if (!event) return <p style={{ textAlign: 'center', marginTop: '200px' }}>Loading...</p>;

    return (
        <>
            <Head>
                <title>{event.title}</title>
                <meta name="description" contents={event.description} />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt="event image"
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <Comments eventId={event.id} />
        </>
    );
};

export default EventDetailPage;

export async function getStaticProps(context) {
    const { params } = context;
    const eventId = params.eventId;

    const res = await fetch(`http://localhost:3000/api/events/${eventId}`);

    const data = await res.json();

    return {
        props: {
            event: data,
        },
        revalidate: 30,
    };
}

export async function getStaticPaths() {
    const res = await fetch(`http://localhost:3000/api/featuredEvents`);

    const data = await res.json();
    const paths = data.map((event) => {
        return {
            params: { eventId: event.id },
        };
    });
    return {
        paths: paths,
        fallback: 'blocking',
    };
}
