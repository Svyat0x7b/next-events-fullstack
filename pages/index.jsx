import Head from 'next/head';
import { useState, useEffect } from 'react';
import EventList from '@/components/events/EventList';
import NewsRegister from '../components/input/NewsRegister';

const HomePage = (props) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0px 40px',
                borderRadius: '15px',
            }}>
            <Head>
                <title>Events App</title>
                <meta name="description" contents="Find a lot of great events!" />
            </Head>
            <h1 style={{ margin: '15px 0' }}>Featured Events</h1>
            <NewsRegister />
            <EventList events={props.featuredEvents} />
        </div>
    );
};

export default HomePage;

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/featuredEvents');

    const data = await res.json();

    return {
        props: {
            featuredEvents: data,
        },
        revalidate: 1800,
    };
}
