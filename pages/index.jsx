import { useState, useEffect } from 'react';
import EventList from '@/components/events/EventList';
import classes from '@/styles/home.module.css';

const HomePage = () => {
    const [featuredEvents, setFeaturedEvents] = useState([]);
    useEffect(() => {
        const fetchFeaturedEvents = async () => {
            await fetch('http://localhost:3000/api/featuredEvents')
                .then((res) => res.json())
                .then((data) => setFeaturedEvents(data))
                .catch((err) => console.log(err));
        };
        fetchFeaturedEvents();
    }, []);
    return (
        <div className={classes.home}>
            <h1 style={{ margin: '15px 0' }}>Featured Events</h1>
            <EventList events={featuredEvents} />
        </div>
    );
};

export default HomePage;
