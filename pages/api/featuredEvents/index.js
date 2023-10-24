// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getFeaturedEvents } from '@/data';

export default function handler(req, res) {
    const featuredEvents = getFeaturedEvents();

    if (featuredEvents) {
        res.status(200).json(featuredEvents);
    } else {
        res.status(404).json({ message: 'Featured events not found!' });
    }
}
