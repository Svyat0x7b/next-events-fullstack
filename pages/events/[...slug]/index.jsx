import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import EventList from '@/components/events/EventList';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Button from '@/components/ui/Button';

const FilteredEventsPage = () => {
    const [filteredEvents, setFilteredEvents] = useState();
    const [error, setError] = useState({
        is: false,
        message: '',
    });
    const router = useRouter();
    const filterData = router.query.slug;

    useEffect(() => {
        if (!filterData) {
            return;
        }

        const filteredYear = filterData[0];
        const filteredMonth = filterData[1];
        const numYear = +filteredYear;
        const numMonth = +filteredMonth;

        if (
            isNaN(numYear) ||
            isNaN(numMonth) ||
            numYear > 2030 ||
            numYear < 2019 ||
            numMonth < 1 ||
            numMonth > 12
        ) {
            setError({
                is: true,
                message: 'Invalid filter. Please adjust your values!',
            });
            return;
        }

        const fetchFilteredEvents = async () => {
            const endpoint = `/api/filteredEvents/${filteredYear}-${filteredMonth}`;
            try {
                const res = await fetch(endpoint);
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                const data = await res.json();
                setFilteredEvents(data);
            } catch (err) {
                setError({
                    is: true,
                    message: err.message,
                });
            }
        };

        fetchFilteredEvents();
    }, [filterData]);

    if (error.is) {
        return (
            <ErrorMessage>
                {error.message}
                <Button link="/events">Go back</Button>
            </ErrorMessage>
        );
    }

    return filteredEvents ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ margin: '20px 0' }}>
                Filtered Events of {filterData[0]}-{filterData[1].toString().padStart(2, '0')}
            </h1>
            <EventList events={filteredEvents} />
        </div>
    ) : (
        <ErrorMessage>There are no such events!</ErrorMessage>
    );
};

export default FilteredEventsPage;
