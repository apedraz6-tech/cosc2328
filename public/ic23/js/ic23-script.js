// IC23 – COSC 2328 – Professor McCurry
// Implemented by: [Augie Pedraza]
/*
 * 1. A fetch() POST needs three options:
 *    - method: 'POST': fetch defaults to GET, so without it the server never
 *      reaches the router.post() route.
 *    - headers: { 'Content-Type': 'application/json' }: tells the server the
 *      body is JSON. Without it, express.json() won't parse the body and
 *      req.body comes back empty.
 *    - body: JSON.stringify({...}): the actual data being sent. It has to be
 *      a string, so the object gets converted with JSON.stringify.
 * 2. db.run uses function (err) because sqlite3 sets this.lastID (and
 *    this.changes) on the callback's "this". A regular function gets that
 *    "this". An arrow function doesn't have its own "this"; it takes it from
 *    the surrounding code. So this.lastID would be undefined and we couldn't
 *    send back the new student's ID.
 * 3. The re-fetch pattern means that after a successful POST, we call the GET
 *    again and redraw the whole list from what the server sends back. That
 *    keeps the page matching the database, which is the real source of
 *    truth. Appending an <li> by hand only shows what the client thinks
 *    happened. It could show a student that failed to save or miss changes
 *    made by someone else. It also wouldn't have the real ID or the
 *    server's sort order.
 * 4. In the Network tab, the POST's request headers include
 *    Content-Type: application/json, and it has a Payload tab showing the
 *    JSON body that was sent. The GET has neither because it sends no
 *    body. It just asks for data. The POST also returns status 201 Created
 *    instead of the GET's 200 OK.
 */

const list = document.getElementById('student-list');

async function loadStudents() {
  try {
    const res  = await fetch('/ic23/students');
    const data = await res.json();
    list.innerHTML = '';
    data.forEach(s => {
      const li   = document.createElement('li');
      const name = document.createElement('p');
      const meta = document.createElement('p');
      name.className = 'name';
      meta.className = 'meta';
      name.textContent = `${s.first_name} ${s.last_name}`;
      meta.textContent = `${s.classification || '—'} — ${s.major || '—'}`;
      li.appendChild(name);
      li.appendChild(meta);
      list.appendChild(li);
    });
  } catch (err) {
    list.innerHTML = `<li>Error loading students: ${err.message}</li>`;
  }
}

document.getElementById('add-btn').addEventListener('click', async () => { 
    const first_name = document.getElementById('first-name').value.trim(); 
    const last_name = document.getElementById('last-name').value.trim(); 
    const classification = document.getElementById('classification').value; 
    const major = document.getElementById('major').value.trim(); 
    const result = document.getElementById('add-result'); 
    if (!first_name || !last_name) { 
        result.className = 'error'; 
        result.textContent = 'First name and last name are required.'; 
        return; 

    }

    try { 
        const res = await fetch('/ic23/students', { 
            method: 'POST', headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ first_name, last_name, classification, major }) }); 
            const data = await res.json(); 
            if (res.ok) { result.className = ''; 
                result.textContent = `Added: ${data.first_name} ${data.last_name} (ID ${data.id})`; 
                document.getElementById('first-name').value = ''; 
                document.getElementById('last-name').value = ''; 
                document.getElementById('classification').value = ''; 
                document.getElementById('major').value = ''; 
                await loadStudents(); } else { 
                    result.className = 'error'; 
                    result.textContent = data.error || 'Something went wrong.'; } } 
                    catch (err) { result.className = 'error'; 
                        result.textContent = `Network error: ${err.message}`; } }); 
                        loadStudents();

