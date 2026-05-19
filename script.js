// Dummy login
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("login-message");

  if (username === "admin" && password === "1234") {
    window.location.href = "dashboard.html";
  } else {
    msg.textContent = "Invalid credentials!";
    msg.style.color = "red";
  }
}

// Fetch timetable
async function loadTimetable() {
  const res = await fetch("/api/timetable");
  const data = await res.json();
  const container = document.getElementById("timetable");
  container.innerHTML = "";

  for (let day in data) {
    const row = document.createElement("div");
    row.classList.add("day-row");
    row.innerHTML = `<h3>${day.toUpperCase()}</h3> <p>${data[day].join(" | ")}</p>`;
    container.appendChild(row);
  }
}

// Save timetable (admin only)
async function saveTimetable() {
  const res = await fetch("/api/timetable", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      monday: ["Math", "Science", "English", "Break", "Computer"],
      tuesday: ["Physics", "Chemistry", "Math", "Break", "PE"]
    })
  });

  const msg = await res.json();
  alert(msg.message);
}

if (document.getElementById("timetable")) {
  loadTimetable();
}
