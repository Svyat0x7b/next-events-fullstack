import {getEventById } from '@/data';

export default function handler(req, res) {
    const { id } = req.query;
    const event = getEventById(id);

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).json({ message: 'Event not found!' });
    }
}
