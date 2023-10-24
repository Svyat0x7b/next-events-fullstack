import { useState, useEffect } from 'react';
import EventList from '@/components/events/EventList';

const HomePage = () => {
    const [featuredEvents, setFeaturedEvents] = useState([]);
    useEffect(() => {
        const fetchFeaturedEvents = async () => {
            await fetch('/api/featuredEvents')
                .then((res) => res.json())
                .then((data) => setFeaturedEvents(data))
                .catch((err) => console.log(err));
        };
        fetchFeaturedEvents();
    }, []);
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0px 40px',
                borderRadius: '15px',
            }}>
            <h1 style={{ margin: '15px 0' }}>Featured Events</h1>
            <EventList events={featuredEvents} />
        </div>
    );
};

export default HomePage;
