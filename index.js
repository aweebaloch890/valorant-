<!DOCTYPE html>
<html>
<head>
    <title>Valorant HUD - Live</title>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-database-compat.js"></script>
    <style>
        body { margin: 0; font-family: 'Segoe UI', sans-serif; overflow: hidden; color: white; }
        .hud-container { display: flex; justify-content: center; align-items: flex-start; width: 100vw; height: 100vh; padding-top: 20px; }
        .scoreboard { background: rgba(0,0,0,0.8); display: flex; align-items: center; border: 2px solid #ff4655; border-radius: 5px; overflow: hidden; }
        .team { padding: 10px 30px; font-size: 24px; font-weight: bold; text-transform: uppercase; }
        .score { background: #ff4655; padding: 10px 25px; font-size: 32px; font-weight: 900; min-width: 40px; text-align: center; }
        .timer { padding: 10px 20px; font-family: monospace; font-size: 24px; }
    </style>
</head>
<body>
    <div class="hud-container">
        <div class="scoreboard">
            <div id="teamA_name" class="team">TEAM A</div>
            <div id="teamA_score" class="score">0</div>
            <div class="timer">0:00</div>
            <div id="teamB_score" class="score">0</div>
            <div id="teamB_name" class="team">TEAM B</div>
        </div>
    </div>

    <script src="config.js"></script>
    <script>
        const db = firebase.database().ref('matchData');
        db.on('value', (snapshot) => {
            const data = snapshot.val();
            if(data) {
                document.getElementById('teamA_name').innerText = data.teamA_name;
                document.getElementById('teamB_name').innerText = data.teamB_name;
                document.getElementById('teamA_score').innerText = data.teamA_score;
                document.getElementById('teamB_score').innerText = data.teamB_score;
            }
        });
    </script>
</body>
</html>
