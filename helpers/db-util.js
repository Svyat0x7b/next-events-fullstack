const { MongoClient } = require('mongodb');

export async function connectDatabase() {
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const client = await new MongoClient(
        `mongodb+srv://${username}:${password}@cluster0.gmorrmh.mongodb.net/?retryWrites=true&w=majority`,
    ).connect();

    return client;
}

export async function insertDocument(client, document, collection) {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getDocuments(client, collection, payload) {
    const db = client.db();
    const documents = await db
        .collection(collection)
        .find({ eventId: payload.id })
        .sort({ _id: -1 })
        .toArray();

    return documents;
}
