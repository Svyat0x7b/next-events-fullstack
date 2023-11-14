const { connectDatabase, insertDocument, getDocuments } = require('@/helpers/db-util');

export default async function handler(req, res) {
    let client;
    try {
        client = await connectDatabase();
    } catch (err) {
        res.status(500).json({ message: 'Connection to DB failed!' });
        return;
    }

    const { id } = req.query;

    if (req.method === 'POST') {
        const commentObj = JSON.parse(req.body);
        const { email, name, comment } = commentObj;

        if (
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !comment ||
            comment.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid Input!' });
            return;
        }

        const newComment = {
            email: email,
            username: name,
            comment: comment,
            eventId: id,
        };

        let result;
        try {
            result = await insertDocument(client, newComment, 'comments');
        } catch (err) {
            res.status(500).json({ message: 'Inserting comments to DB failed!' });
            return;
        }

        newComment._id = result.insertedId;

        res.status(201).json({ message: 'Comment Posted!', email: email });
    }

    if (req.method === 'GET') {
        let documents;
        try {
            documents = await getDocuments(client, 'comments', { id: id });
        } catch (err) {
            res.status(500).json({ message: 'Getting documents from a DB failed!' });
            return;
        }
        res.status(200).json({ comments: documents });
    }
}
