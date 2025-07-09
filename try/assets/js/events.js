let events = JSON.parse(localStorage.getItem("events")) || [
  { title: "Internal Test", date: "2025-06-22", note: "CSE & ECE" },
  { title: "Project Review", date: "2025-06-25", note: "Final year students" }
];
let editEventIndex = -1;

function renderEventTable() {
  const tbody = document.getElementById("eventTableBody");
  tbody.innerHTML = "";
  events.forEach((e, i) => {
    const row = `<tr>
      <td>${e.title}</td>
      <td>${e.date}</td>
      <td>${e.note || '-'}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editEvent(${i})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteEvent(${i})">Delete</button>
      </td>
    </tr>`;
    tbody.innerHTML += row;
  });
  localStorage.setItem("events", JSON.stringify(events));
}

function editEvent(index) {
  const e = events[index];
  document.getElementById("eventTitle").value = e.title;
  document.getElementById("eventDate").value = e.date;
  document.getElementById("eventNote").value = e.note;
  editEventIndex = index;
}

function deleteEvent(index) {
  if (confirm("Delete this event?")) {
    events.splice(index, 1);
    renderEventTable();
  }
}

document.getElementById("eventForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const newEvent = {
    title: document.getElementById("eventTitle").value,
    date: document.getElementById("eventDate").value,
    note: document.getElementById("eventNote").value
  };
  if (editEventIndex === -1) {
    events.push(newEvent);
  } else {
    events[editEventIndex] = newEvent;
    editEventIndex = -1;
  }
  this.reset();
  renderEventTable();
});

renderEventTable();
