let students = JSON.parse(localStorage.getItem("students")) || [
  { regNo: "1001", name: "John Doe", dept: "CSE", year: 2, marks: 88 },
  { regNo: "1002", name: "Aisha Khan", dept: "ECE", year: 3, marks: 75 },
  { regNo: "1003", name: "Ravi Kumar", dept: "MECH", year: 1, marks: 92 }
];
let editIndex = -1;

function renderTable() {
  localStorage.setItem("students", JSON.stringify(students));
  applyFilters();
}

function editStudent(index) {
  const s = students[index];
  document.getElementById("regNo").value = s.regNo;
  document.getElementById("name").value = s.name;
  document.getElementById("dept").value = s.dept;
  document.getElementById("year").value = s.year;
  document.getElementById("marks").value = s.marks;
  editIndex = index;
}

function deleteStudent(index) {
  if (confirm("Are you sure?")) {
    students.splice(index, 1);
    renderTable();
  }
}

function clearForm() {
  document.getElementById("studentForm").reset();
  editIndex = -1;
}

document.getElementById("studentForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const student = {
    regNo: document.getElementById("regNo").value,
    name: document.getElementById("name").value,
    dept: document.getElementById("dept").value,
    year: parseInt(document.getElementById("year").value),
    marks: parseInt(document.getElementById("marks").value),
  };
  if (editIndex === -1) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = -1;
  }
  this.reset();
  renderTable();
});

function applyFilters() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const selectedDept = document.getElementById("filterDept").value;
  const selectedYear = document.getElementById("filterYear").value;
  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";

  students.forEach((s, i) => {
    const matchesSearch =
      s.regNo.toLowerCase().includes(searchTerm) ||
      s.name.toLowerCase().includes(searchTerm) ||
      s.dept.toLowerCase().includes(searchTerm) ||
      s.year.toString().includes(searchTerm);

    const matchesDept = selectedDept === "" || s.dept === selectedDept;
    const matchesYear = selectedYear === "" || s.year.toString() === selectedYear;

    if (matchesSearch && matchesDept && matchesYear) {
      const row = `<tr>
        <td>${s.regNo}</td>
        <td>${s.name}</td>
        <td>${s.dept}</td>
        <td>${s.year}</td>
        <td>${s.marks}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick="editStudent(${i})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteStudent(${i})">Delete</button>
        </td>
      </tr>`;
      tbody.innerHTML += row;
    }
  });
}

document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("filterDept").addEventListener("change", applyFilters);
document.getElementById("filterYear").addEventListener("change", applyFilters);

renderTable();
