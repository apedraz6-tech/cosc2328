// IC20 – COSC 2328 – Professor McCurry
// Implemented by: [Augie Pedraza]
/*
1. It’s middleware that reads the request body, parses it from JSON, and puts the result on req.body. Without it, req.body would be undefined, 
so destructuring {name, destination} would throw an error (or the route would fail), and you’d never get to save the mission.
2. 200 OK means the request succeeded. Use it for GETs and things like your DELETE that return existing data.
201 Created means the request succeeded and a new resource was made. Use it for POSTs that create something, like adding a mission.
3. The missions array lives in the server’s memory, so it resets to the two seed missions whenever the container restarts, 
and any added missions are lost. To keep them you’d need storage outside memory: a database (MongoDB, PostgreSQL, SQLite), or
writing to a JSON file stored on a Docker volume, so the file survives the container being replaced.
4. Yes, they’d both end up with the same list. There’s only one missions array on the server, and every request reads and writes that same array.
 Node handles requests one at a time on a single thread, so the two pushes won’t overwrite each other.
The catch is that each tab only shows the new data after it fetches again. Tab A won’t see Tab B’s mission until it refreshes or makes another GET. 
The server’s data is shared, but each page’s display isn’t live unless you add polling or WebSockets.These are written plainly so you can reword them in 
your own voice.


*/
const list = document.getElementById('mission-list');
const form = document.getElementById('mission-form');

async function loadMissions() {
  const res  = await fetch('/ic20/missions');
  const data = await res.json();
  list.innerHTML = '';
  data.forEach(m => {
    const li = document.createElement('li');
    li.innerHTML = `<p class="name">${m.name}</p><p class="dest">${m.destination}</p>`;
    list.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name        = document.getElementById('mission-name').value.trim();
  const destination = document.getElementById('mission-dest').value.trim();
  await fetch('/ic20/missions', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ name, destination }),
  });
  form.reset();
  loadMissions();
});

loadMissions();

