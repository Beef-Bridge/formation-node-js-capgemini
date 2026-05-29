import 'dotenv/config';
import { MongoClient } from "mongodb";

// Plus besoin d'importer process, il est global !
const client = new MongoClient(process.env.ME_CONFIG_MONGODB_URL);

try {
    const res = await client.connect();
    console.log("Connecté avec succès !");

    const db = client.db('test');
    const usersCollection = db.collection('users');
    await usersCollection.insertOne({ firstname: 'Niko', lastname: 'Quattro' });
    await usersCollection.insertMany[
        { firstname: 'Niko', lastname: 'Quattro' },
        { firstname: 'Lord', lastname: 'Vader', age: '35'},
        { firstname: 'Lord', lastname: 'Sidious', empror: true}
     ];

    await usersCollection.findOne({ firstname: 'Niko' });
    //await usersCollection.findMany({ firstname: 'Lord' });
    await usersCollection.find();
} catch (error) {
    console.error(error);
}