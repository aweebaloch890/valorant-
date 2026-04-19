const mysql = require('mysql2/promise');

export default async function handler(req, res) {
    // CORS headers taake browser block na kare
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const dbConfig = {
        host: '167.86.79.221',
        user: 'u307_TuUviZ5pEf',
        password: 'YPt9YCopTPFjtie6rQ!QTM7+',
        database: 's307_valorant',
        port: 3306,
        connectTimeout: 10000 // 10 seconds timeout
    };

    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);

        if (req.method === 'GET') {
            const [rows] = await connection.execute('SELECT * FROM vct_match WHERE id = "live"');
            return res.status(200).json(rows[0] || {});
        }

        if (req.method === 'POST') {
            const { teamA, teamB, maps, current_round } = req.body;
            
            await connection.execute(`
                INSERT INTO vct_match (id, teamA, teamB, maps, current_round)
                VALUES ("live", ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                teamA = VALUES(teamA), teamB = VALUES(teamB), 
                maps = VALUES(maps), current_round = VALUES(current_round)
            `, [JSON.stringify(teamA), JSON.stringify(teamB), JSON.stringify(maps), current_round || 1]);
            
            return res.status(200).json({ success: true });
        }
    } catch (error) {
        console.error("Database Error:", error.message);
        return res.status(500).json({ error: "Database connection failed", details: error.message });
    } finally {
        if (connection) await connection.end();
    }
}
