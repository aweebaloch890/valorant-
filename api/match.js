const mysql = require('mysql2/promise');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const dbConfig = {
        host: '167.86.79.221',
        user: 'u307_TuUviZ5pEf',
        password: 'YPt9YCopTPFjtie6rQ!QTM7+',
        database: 's307_valorant',
        port: 3306
    };

    try {
        const connection = await mysql.createConnection(dbConfig);
        
        // Initial Table Setup with Player Data JSON
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS vct_match (
                id VARCHAR(50) PRIMARY KEY,
                teamA JSON,
                teamB JSON,
                maps JSON,
                current_round INT,
                timer VARCHAR(10)
            )
        `);

        if (req.method === 'GET') {
            const [rows] = await connection.execute('SELECT * FROM vct_match WHERE id = "live"');
            return res.status(200).json(rows[0] || {});
        }

        if (req.method === 'POST') {
            await connection.execute(`
                INSERT INTO vct_match (id, teamA, teamB, maps, current_round, timer)
                VALUES ("live", ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                teamA = VALUES(teamA), teamB = VALUES(teamB), maps = VALUES(maps), 
                current_round = VALUES(current_round), timer = VALUES(timer)
            `, [JSON.stringify(req.body.teamA), JSON.stringify(req.body.teamB), JSON.stringify(req.body.maps), req.body.current_round, req.body.timer]);
            
            return res.status(200).json({ success: true });
        }
        await connection.end();
    } catch (e) { res.status(500).json({ error: e.message }); }
}
