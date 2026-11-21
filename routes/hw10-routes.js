// HW10 – COSC 2328 – Professor McCurry
// Implemented by: Augie Pedraza

const express = require('express');
const router  = express.Router();
const db      = require('../db');

// buildPage — returns a complete HTML document as a string
function buildPage(monsters, message, error, battle) {
  const roster = monsters.map(m => `
      <div class="monster-card">
        <h3>${m.name} <span class="monster-id">#${m.id}</span></h3>
        <p class="species">${m.species}</p>
        <ul class="stats">
          <li>ATK <strong>${m.attack}</strong></li>
          <li>DEF <strong>${m.defense}</strong></li>
          <li>HP <strong>${m.hp}</strong></li>
        </ul>
      </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Monster Arena</title>
  <link rel="stylesheet" href="/hw10/css/hw10.css">
</head>
<body>
  <header>
    <h1>Monster Arena</h1>
    <p class="subtitle">Recruit, retire, and battle your creatures</p>
  </header>

  <main>
    ${message ? `<p class="banner-success">${message}</p>` : ''}
    ${error ? `<p class="banner-error">${error}</p>` : ''}

    ${battle ? `<div class="battle-results">
      <h2>Battle Results</h2>
      <div class="fighters">
        <div class="fighter">
          <h3>${battle.a.name}</h3>
          <p class="species">${battle.a.species}</p>
          <p>ATK ${battle.a.attack} · DEF ${battle.a.defense} · HP ${battle.a.hp}</p>
          <p class="score">Score: ${battle.scoreA}</p>
        </div>
        <div class="vs">VS</div>
        <div class="fighter">
          <h3>${battle.b.name}</h3>
          <p class="species">${battle.b.species}</p>
          <p>ATK ${battle.b.attack} · DEF ${battle.b.defense} · HP ${battle.b.hp}</p>
          <p class="score">Score: ${battle.scoreB}</p>
        </div>
      </div>
      <p class="winner">${battle.winner}</p>
    </div>` : ''}

    <section class="forms">
      <form class="form-box" action="/hw10/recruit" method="POST">
        <h2>Recruit a Monster</h2>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>

        <label for="species">Species</label>
        <input type="text" id="species" name="species" required>

        <label for="attack">Attack</label>
        <input type="number" id="attack" name="attack" required>

        <label for="defense">Defense</label>
        <input type="number" id="defense" name="defense" required>

        <label for="hp">HP</label>
        <input type="number" id="hp" name="hp" required>

        <button type="submit">Recruit</button>
      </form>

      <form class="form-box" action="/hw10/retire" method="POST">
        <h2>Retire a Monster</h2>
        <label for="id">Monster ID</label>
        <input type="number" id="id" name="id" required>
        <button type="submit">Retire</button>
      </form>

      <form class="form-box" action="/hw10/battle" method="POST">
        <h2>Battle</h2>
        <p>Pick two random fighters and see who wins.</p>
        <button type="submit">Battle!</button>
      </form>
    </section>

    <section>
      <h2>Roster (${monsters.length})</h2>
      <div class="roster">${roster}
      </div>
    </section>
  </main>
</body>
</html>`;
}

// GET /hw10 — show the full page
router.get('/', (req, res) => {
  const message = req.query.message || null;
  const error   = req.query.error   || null;
  db.all('SELECT * FROM monsters ORDER BY id', [], (err, rows) => {
    if (err) return res.status(500).send('<p>Database error: ' + err.message + '</p>');
    const html = buildPage(rows, message, error, null);
    res.send(html);
  });
});

// POST /hw10/recruit — add a monster, then redirect (PRG)
router.post('/recruit', (req, res) => {
  const { name, species, attack, defense, hp } = req.body;
  db.run(
    'INSERT INTO monsters (name, species, attack, defense, hp) VALUES (?, ?, ?, ?, ?)',
    [name, species, attack, defense, hp],
    function (err) {
      if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
      res.redirect('/hw10?message=' + encodeURIComponent('Monster recruited!'));
    }
  );
});

// POST /hw10/retire — delete by id, then redirect (PRG)
router.post('/retire', (req, res) => {
  const { id } = req.body;
  db.run('DELETE FROM monsters WHERE id = ?', [id], function (err) {
    if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
    if (this.changes === 0) {
      return res.redirect('/hw10?error=' + encodeURIComponent('Monster not found.'));
    }
    res.redirect('/hw10?message=' + encodeURIComponent('Monster retired!'));
  });
});

// POST /hw10/battle — two random distinct fighters; send the page directly (no redirect)
router.post('/battle', (req, res) => {
  db.all('SELECT * FROM monsters', [], (err, rows) => {
    if (err) return res.redirect('/hw10?error=' + encodeURIComponent(err.message));
    if (rows.length < 2) {
      return res.redirect('/hw10?error=' + encodeURIComponent('Not enough monsters to battle!'));
    }

    let i = Math.floor(Math.random() * rows.length);
    let j;
    do { j = Math.floor(Math.random() * rows.length); } while (j === i);

    const a = rows[i];
    const b = rows[j];
    const scoreA = a.attack + a.defense + a.hp;
    const scoreB = b.attack + b.defense + b.hp;

    let winner = 'Draw!';
    if (scoreA > scoreB) winner = a.name + ' wins!';
    else if (scoreB > scoreA) winner = b.name + ' wins!';

    const battle = { a, b, scoreA, scoreB, winner };
    const html   = buildPage(rows, null, null, battle);
    res.send(html);
  });
});

module.exports = router;
