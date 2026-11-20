// IC22 – COSC 2328 – Professor McCurry
// Implemented by: [Augie Pedraza]

/*
1. db.all() runs the query and gives back every matching row as an array.
   db.get() gives back only the first matching row as a single object, or
   undefined if nothing matches. I used db.all() for /students since I want
   the whole list, and db.get() for /students/:id since an ID can only match
   one student.
2. Putting id straight into the SQL string means whatever the user sends
   becomes part of the query itself. That's SQL injection. If someone sent
   "1; DROP TABLE students", the query would turn into
   SELECT * FROM students WHERE id = 1; DROP TABLE students
   which could wipe out the whole table. The fix is a ? placeholder with
   [id] passed separately, so sqlite3 treats it as a value and never as code.
3. The names match what you actually get back. row is one object, so you
   read row.first_name directly. rows is an array, so you loop over it.
   The name tells you how to use the data without having to look it up.
4. :id is a route parameter, a placeholder that matches whatever is in that
   spot in the URL. Express puts that value in req.params.id, so
   /students/2 gives "2" and /students/7 gives "7". One route handles
   every ID.
*/
async function loadStudents() {
const resposnes = await fetch('/ic22/students');
const students = await responses.json();

const list = document.getElementById('student-list');
list.innerHTML = '';

students.forEach(student => {
    const li = document.createElement('li');
    li.textContent = `${student.first_name}: ${student.last_name} ${student.classification}, ${student.major}`;
    list.append(li);
});

}

document.getElementById('load-students').addEventListener('click', async () => {
    const id = document.getElementById('student-id').value;
    const result = document.getElementById('student-result');

    const response = await fetch(`/ic22/students/${id}`);
    const student = await response.json();

    if (student.error) {
        result.textContent = student.message;
    } else {
        result.textContent = `${student.first_name}: ${student.last_name} ${student.classification}, ${student.major}`;
    }
});


loadstudents();
