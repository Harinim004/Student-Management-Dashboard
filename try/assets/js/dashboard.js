const students = JSON.parse(localStorage.getItem("students")) || [];

function updateDashboard() {
  const total = students.length;
  const depts = [...new Set(students.map(s => s.dept))];
  const avg = students.reduce((acc, s) => acc + s.marks, 0) / (total || 1);
  const recent = students[total - 1];

  document.getElementById("totalStudents").textContent = total;
  document.getElementById("totalDepartments").textContent = depts.length;
  document.getElementById("averageMarks").textContent = avg.toFixed(2);
  document.getElementById("recentStudent").textContent = recent?.name || "N/A";

  updateCharts(depts);
  updateNotifications();
}

function updateCharts(depts) {
  const deptCounts = {};
  const marksByRegNo = [];

  students.forEach(s => {
    deptCounts[s.dept] = (deptCounts[s.dept] || 0) + 1;
    marksByRegNo.push({ label: s.regNo, value: s.marks });
  });

  new Chart(document.getElementById("deptChart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(deptCounts),
      datasets: [{ data: Object.values(deptCounts), backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"] }]
    }
  });

  new Chart(document.getElementById("marksChart"), {
    type: "bar",
    data: {
      labels: marksByRegNo.map(e => e.label),
      datasets: [{ label: "Marks", data: marksByRegNo.map(e => e.value), backgroundColor: "#17a2b8" }]
    }
  });
}

function updateNotifications() {
  const list = document.getElementById("notificationsList");
  list.innerHTML = "";

  students.forEach(s => {
    if (s.marks < 40) {
      const li = document.createElement("li");
      li.className = "list-group-item text-danger";
      li.textContent = `⚠️ ${s.name} (${s.regNo}) has low marks (${s.marks})`;
      list.appendChild(li);
    }
  });

  const events = JSON.parse(localStorage.getItem("events")) || [];
  const today = new Date();
  events.forEach(e => {
    const date = new Date(e.date);
    if (date >= today && date <= new Date(today.getTime() + 7 * 86400000)) {
      const li = document.createElement("li");
      li.className = "list-group-item text-primary";
      li.textContent = `📅 Upcoming: ${e.title} on ${e.date}`;
      list.appendChild(li);
    }
  });
}

updateDashboard();
