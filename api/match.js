const { MongoClient, ServerApiVersion } = require('mongodb');

// Connection String with your password
const uri = "mongodb+srv://aweerind890:aweerind1122@cluster0.3hgittm.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        await client.connect();
        const db = client.db("valorant_esports");
        const collection = db.collection("live_data");

        if (req.method === 'GET') {
            const data = await collection.findOne({ id: "current_match" });
            return res.status(200).json(data || { teamA_score: 0, teamB_score: 0, teamA_name: "TEAM A", teamB_name: "TEAM B", veto: [] });
        }

        if (req.method === 'POST') {
            await collection.updateOne(
                { id: "current_match" },
                { $set: req.body },
                { upsert: true }
            );
            return res.status(200).json({ status: "Success" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}