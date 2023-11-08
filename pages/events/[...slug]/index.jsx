import useSWR from 'swr';
import EventList from '@/components/events/EventList';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const FilteredEventsPage = () => {
    const router = useRouter();
    const [filterData, setFilterData] = useState(router.query.slug);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setFilterData(router.query.slug);
    }, [router.query.slug]);

    useEffect(() => {
        if (!filterData || filterData.length !== 2) {
            return;
        }

        const filteredYear = filterData[0];
        const filteredMonth = filterData[1];

        fetchFilteredEvents(filteredYear, filteredMonth);
    }, [filterData]);

    const fetchFilteredEvents = async (year, month) => {
        try {
            const res = await fetch(`http://localhost:3000/api/filteredEvents/${year}-${month}`);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            const data = await res.json();
            setFilteredEvents(data);
        } catch (err) {
            setError(err);
        }
    };

    if (!filterData) {
        return <p style={{ marginTop: '200px', textAlign: 'center' }}>Loading...</p>;
    }

    if (!filteredEvents || filteredEvents.length === 0) {
        return <ErrorMessage>There are no such events!</ErrorMessage>;
    }

    if (error) {
        return (
            <ErrorMessage>
                {error.message}
                <Button link="/events">Go to all events</Button>
            </ErrorMessage>
        );
    }

    const formatedDate = `${filterData[0]}-${String(filterData[1]).padStart(2, '0')}`;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ margin: '20px 0' }}>Filtered Events of {formatedDate}</h1>
            <EventList events={filteredEvents} />
        </div>
    );
    // useEffect(() => {
    //     if (!filterData) {
    //         return;
    //     }
    //     const filteredYear = filterData[0];
    //     const filteredMonth = filterData[1];
    //     const numYear = +filteredYear;
    //     const numMonth = +filteredMonth;
    //     if (
    //         isNaN(numYear) ||
    //         isNaN(numMonth) ||
    //         numYear > 2030 ||
    //         numYear < 2019 ||
    //         numMonth < 1 ||
    //         numMonth > 12
    //     ) {
    //         setError({
    //             is: true,
    //             message: 'Invalid filter. Please adjust your values!',
    //         });
    //         return;
    //     }
    //     const fetchFilteredEvents = async () => {
    //         const endpoint = `/api/filteredEvents/${filteredYear}-${filteredMonth}`;
    //         try {
    //             const res = await fetch(endpoint);
    //             if (!res.ok) {
    //                 throw new Error(res.statusText);
    //             }
    //             const data = await res.json();
    //             setFilteredEvents(data);
    //         } catch (err) {
    //             setError({
    //                 is: true,
    //                 message: err.message,
    //             });
    //         }
    //     };
    //     fetchFilteredEvents();
    // }, [filterData]);
};

// export async function getServerSideProps(context) {
//     const { params } = context;
//     const filterData = params.slug;
// const formatedDate = `${filterData[0]}-${filterData[1].toString().padStart(2, '0')}`;
//     const filteredYear = filterData[0];
//     const filteredMonth = filterData[1];
//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;

//     if (
//         isNaN(numYear) ||
//         isNaN(numMonth) ||
//         numYear > 2030 ||
//         numYear < 2019 ||
//         numMonth < 1 ||
//         numMonth > 12
//     ) {
//         return {
//             hasError: true,
//         };
//     }

//     const res = await fetch(
//         `http://localhost:3000/api/filteredEvents/${filteredYear}-${filteredMonth}`,
//     );

//     if (res.status == 404) {
//         return {
//             notFound: true,
//         };
//     }

//     const data = await res.json();

//     return {
//         props: {
//             filteredEvents: data,
//             date: formatedDate,
//         },
//     };
// }

export default FilteredEventsPage;
