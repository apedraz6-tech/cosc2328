// IC22 – COSC 2328 – Professor McCurry
// Implemented by: [Augie Pedraza]

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
