// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllEvents } from '@/data';

export default function handler(req, res) {
    const events = getAllEvents();

    if (events) {
        res.status(200).json(events);
    } else {
        res.status(404).json({ message: 'Not Found', status: 404 });
    }
}
