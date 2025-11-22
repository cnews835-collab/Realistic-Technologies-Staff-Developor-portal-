// USERS
const users = {
    // Full Admin (CEO, COO)
    "ceo.admin": {
        pass: "RealTechCEO2025",
        name: "Chief Executive Officer",
        role: "admin"
    },
    "coo.admin": {
        pass: "RealTechCOO2025",
        name: "Chief Operating Officer",
        role: "admin"
    },

    // Department Manager (Half Admin)
    "dept.manager": {
        pass: "DeptManager2025",
        name: "Department Manager",
        role: "halfadmin"
    },

    // Developer (Regular)
    "developer": {
        pass: "DevPass2025",
        name: "Developer",
        role: "user"
    }
};

let currentUser = null;

// STORAGE
let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// LOGIN
function login() {
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;

    if (users[u] && users[u].pass === p) {
        currentUser = users[u];

        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");

        document.getElementById("displayUser").textContent = u;
        document.getElementById("displayRole").textContent = currentUser.name;

        if (currentUser.role === "admin" || currentUser.role === "halfadmin") {
            document.getElementById("adminPanel").classList.remove("hidden");
        }

        render();
    } else {
        document.getElementById("error").classList.remove("hidden");
    }
}

// LOGOUT
function logout() {
    currentUser = null;
    document.getElementById("loginPage").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("adminPanel").classList.add("hidden");
}

// CREATE ANNOUNCEMENT
function newAnnouncement() {
    const msg = prompt("Enter announcement:");
    if (!msg) return;

    announcements.push(msg);
    localStorage.setItem("announcements", JSON.stringify(announcements));
    render();
}

// CREATE TASK
function newTask() {
    const t = prompt("Enter new task:");
    if (!t) return;

    tasks.push(t);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
}

// RENDER LISTS
function render() {
    let annBox = document.getElementById("annList");
    let taskBox = document.getElementById("taskList");

    annBox.innerHTML = "";
    announcements.forEach(a => {
        annBox.innerHTML += `<li>${a}</li>`;
    });

    taskBox.innerHTML = "";
    tasks.forEach(t => {
        taskBox.innerHTML += `<li>${t}</li>`;
    });
}
