const { connectDatabase, insertDocument } = require('@/helpers/db-util');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const emailObj = JSON.parse(req.body);
        const { email } = emailObj;
        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address!' });
            return;
        }
        let client;
        try {
            client = await connectDatabase();
        } catch (err) {
            res.status(500).json({ message: 'Connecting to db failed!' });
            return;
        }

        try {
            await insertDocument(client, { email: email }, 'emails');
        } catch (err) {
            res.status(500).json({ message: 'Inserting data failed!' });
            return;
        }

        res.status(201).json({ email: email, message: 'Signed Up!' });
    }
}
