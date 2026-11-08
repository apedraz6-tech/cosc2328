// HW9 – COSC 2328 – Professor McCurry
// Implemented by: Augie Pedraza

// Step 11 – load credentials into <dl id="credentials">
async function loadCredentials() {
  const response = await fetch('/hw9/credentials');
  const data = await response.json();

  const dl = document.getElementById('credentials');
  dl.innerHTML = '';

  Object.entries(data).forEach(([key, value]) => {
    const dt = document.createElement('dt');
    dt.textContent = key;

    const dd = document.createElement('dd');
    dd.textContent = String(value);

    dl.append(dt, dd);
  });
}

// Small helper: make a <div> with a class and text
function makeLine(className, text) {
  const div = document.createElement('div');
  div.className = className;
  div.textContent = text;
  return div;
}

// Step 12 – load cases into <ul id="case-list">
async function loadCases() {
  const response = await fetch('/hw9/cases');
  const cases = await response.json();

  const list = document.getElementById('case-list');
  list.innerHTML = '';

  if (cases.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty-msg';
    li.textContent = 'No cases filed yet.';
    list.appendChild(li);
    return;
  }

  cases.forEach(c => {
    const li = document.createElement('li');
    li.append(
      makeLine('case-id', `Case #${c.id}`),
      makeLine('case-suspect', c.suspect),
      makeLine('case-location', c.location),
      makeLine('case-notes', c.notes),
      makeLine('case-ts', new Date(c.timestamp).toLocaleString())
    );
    list.appendChild(li);
  });
}

// Step 13 – file a new case with fetch POST
async function logCase() {
  const suspectInput  = document.getElementById('suspect');
  const locationInput = document.getElementById('location');
  const notesInput    = document.getElementById('notes');
  const status        = document.getElementById('log-status');

  const suspect  = suspectInput.value.trim();
  const location = locationInput.value.trim();
  const notes    = notesInput.value.trim();

  const response = await fetch('/hw9/cases', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ suspect, location, notes })
  });

  if (!response.ok) {
    const data = await response.json();
    status.textContent = data.error;
    return;
  }

  suspectInput.value  = '';
  locationInput.value = '';
  notesInput.value    = '';
  status.textContent  = '';
  loadCases();
}

document.getElementById('log-btn').addEventListener('click', logCase);

// Load everything when the page opens
loadCredentials();
loadCases();
