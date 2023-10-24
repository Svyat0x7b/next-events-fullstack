import { getFilteredEvents } from '@/data';

export default function handler(req, res) {
    const { filter } = req.query;
    const queryArr = filter.split('-');
    const year = +queryArr[0];
    const month = +queryArr[1];
    const filteredEvents = getFilteredEvents({ year: year, month: month });

    if (filteredEvents && filteredEvents.length !== 0) {
        res.status(200).json(filteredEvents);
    } else {
        res.status(404).json({ message: 'Events not found!' });
    }
}
