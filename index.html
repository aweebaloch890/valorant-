<!DOCTYPE html>
<html>
<head>
    <style>
        body { margin: 0; padding: 0; display: flex; justify-content: center; font-family: 'Arial Black', sans-serif; color: white; }
        .scoreboard {
            background: rgba(15, 25, 35, 0.9);
            border-bottom: 4px solid #ff4655;
            display: flex; align-items: center; padding: 10px 50px;
            clip-path: polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%);
            margin-top: 20px;
        }
        .team { font-size: 28px; width: 250px; text-align: center; text-transform: uppercase; }
        .score { font-size: 45px; background: #ff4655; padding: 0 25px; margin: 0 20px; font-weight: 900; min-width: 60px; text-align: center; }
    </style>
</head>
<body>
    <div class="scoreboard">
        <div id="tAn" class="team">TEAM A</div>
        <div id="tAs" class="score">0</div>
        <div style="opacity:0.5">VS</div>
        <div id="tBs" class="score">0</div>
        <div id="tBn" class="team">TEAM B</div>
    </div>

    <script>
        async function sync() {
            try {
                const r = await fetch('/api/match');
                const d = await r.json();
                document.getElementById('tAn').innerText = d.teamA_name;
                document.getElementById('tBn').innerText = d.teamB_name;
                document.getElementById('tAs').innerText = d.teamA_score;
                document.getElementById('tBs').innerText = d.teamB_score;
            } catch(e) {}
        }
        setInterval(sync, 2000);
        sync();
    </script>
</body>
</html>
