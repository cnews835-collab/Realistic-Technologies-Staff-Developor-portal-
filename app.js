// =============================
// USER ACCOUNTS
// =============================
const users = {
    "CEO": { password: "admin123", role: "Chief Executive Officer" },
    "DevA": { password: "dev123", role: "Developer" },
    "MgrX": { password: "manager", role: "Department Manager" }
};

// =============================
// CHECK LOGIN
// =============================
function login() {
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;

    if (users[u] && users[u].password === p) {
        localStorage.setItem("loggedUser", u);
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        loadUser();
    } else {
        document.getElementById("errorMsg").style.display = "block";
    }
}

// =============================
// LOAD UI AFTER LOGIN
// =============================
function loadUser() {
    const u = localStorage.getItem("loggedUser");
    document.getElementById("userName").innerHTML = u;
    document.getElementById("userRole").innerHTML = users[u].role;

    if (users[u].role === "Chief Executive Officer") {
        document.getElementById("ceoControls").innerHTML = `
            <button onclick="addTask()">+ Add Task</button>
            <button onclick="addAnnouncement()">+ Announcement</button>
        `;
    }
}

// =============================
// LOGOUT
// =============================
function logout() {
    localStorage.removeItem("loggedUser");
    location.reload();
}

// =============================
// TASKS + STORAGE
// =============================
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    let box = document.getElementById("tasksList");
    if (!box) return;

    box.innerHTML = "";

    tasks.forEach((t, i) => {
        box.innerHTML += `
            <div class="task">
                ${t}
                <button onclick="deleteTask(${i})">✖</button>
            </div>
        `;
    });

    document.getElementById("taskCount").innerHTML = tasks.length;
}

function deleteTask(i) {
    tasks.splice(i, 1);
    saveTasks();
}

function addTask() {
    let txt = prompt("New task:");
    if (txt) {
        tasks.push(txt);
        saveTasks();
    }
}

// =============================
// ANNOUNCEMENTS
// =============================
let announcements = JSON.parse(localStorage.getItem("announcements") || "[]");

function addAnnouncement() {
    let txt = prompt("Announcement:");
    if (txt) {
        announcements.push(txt);
        localStorage.setItem("announcements", JSON.stringify(announcements));
        renderAnnouncements();
    }
}

function renderAnnouncements() {
    const box = document.getElementById("announcementsList");
    if (!box) return;
    box.innerHTML = "";

    announcements.forEach(a => {
        box.innerHTML += `<div class="announce">${a}</div>`;
    });
}

// =============================
// INITIAL RENDER IF LOGGED
// =============================
window.onload = () => {
    if (localStorage.getItem("loggedUser")) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        loadUser();
        renderTasks();
        renderAnnouncements();
    }
};

