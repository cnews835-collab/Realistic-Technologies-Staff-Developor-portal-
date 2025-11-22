// =========================
// USER ACCOUNTS
// =========================
const users = {
    'ceo.admin': { 
        pass: 'RealisticCEO2025!', 
        role: 'Chief Executive Officer',
        name: 'CEO Admin',
        level: 'admin'
    },
    'coo.admin': { 
        pass: 'RealisticCOO2025!', 
        role: 'Chief Operating Officer',
        name: 'COO Admin',
        level: 'admin'
    },
    'dept.manager1': { 
        pass: 'DeptMgr1#2025', 
        role: 'Asset Department Manager',
        name: 'Asset Dept Manager',
        level: 'halfadmin'
    },
    'dept.manager2': { 
        pass: 'DeptMgr2#2025', 
        role: 'Design Department Manager',
        name: 'Design Dept Manager',
        level: 'halfadmin'
    },
    'dept.manager3': { 
        pass: 'DeptMgr3#2025', 
        role: 'Sales Department Manager',
        name: 'Sales Dept Manager',
        level: 'halfadmin'
    },
    'dev.manager1': { 
        pass: 'DevMgr1#2025', 
        role: 'Development Manager',
        name: 'Dev Manager 1',
        level: 'halfadmin'
    },
    'dev.manager2': { 
        pass: 'DevMgr2#2025', 
        role: 'Senior Dev Manager',
        name: 'Dev Manager 2',
        level: 'halfadmin'
    },
    'developer1': { 
        pass: 'Dev1Pass2025!', 
        role: 'Developer',
        name: 'Developer 1',
        level: 'user'
    },
    'developer2': { 
        pass: 'Dev2Pass2025!', 
        role: 'Developer',
        name: 'Developer 2',
        level: 'user'
    },
    'developer3': { 
        pass: 'Dev3Pass2025!', 
        role: 'Developer',
        name: 'Developer 3',
        level: 'user'
    },
    'lead.dev': { 
        pass: 'LeadDev2025!', 
        role: 'Lead Developer',
        name: 'Lead Developer',
        level: 'user'
    },
    'designer': { 
        pass: 'Designer2025!', 
        role: 'Senior Designer',
        name: 'Senior Designer',
        level: 'user'
    }
};

// =========================
// GLOBAL VARIABLES
// =========================
let currentUser = null;
let data = loadData();

// =========================
// LOAD / SAVE DATA
// =========================
function loadData() {
    const saved = localStorage.getItem('realisticTechData');
    if (saved) return JSON.parse(saved);

    return {
        tasks: [{title: 'Complete weapon pack', desc: 'Finish 5 models', priority: 'high', assigned: 'Asset Team'}],
        messages: [{text: 'Welcome to Realistic Technologies!', date: 'Nov 22, 2025'}],
        announcements: [{title: '🚀 Welcome', text: 'Portal is now live!', date: 'Nov 22, 2025'}],
        documents: [{name: 'Employee Handbook', meta: 'Updated Nov 2025', requiresSignature: false, signatures: []}]
    };
}

function saveData() {
    localStorage.setItem('realisticTechData', JSON.stringify(data));
}

// =========================
// LOGIN / LOGOUT
// =========================
function login() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;

    if (users[u] && users[u].pass === p) {
        currentUser = users[u];
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userRole').textContent = currentUser.role;
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';

        const controls = document.getElementById('ceoControls');
        if (currentUser.level === 'admin') {
            controls.style.display = 'flex';
            controls.innerHTML = `
                <button class="btn-primary" onclick="openModal('taskModal')">+ Task</button>
                <button class="btn-primary" onclick="openModal('announcementModal')">+ Announcement</button>
                <button class="btn-primary" onclick="openModal('messageModal')">+ Message</button>
                <button class="btn-primary" onclick="openModal('documentModal')">+ Document</button>
            `;
        } else if (currentUser.level === 'halfadmin') {
            controls.style.display = 'flex';
            controls.innerHTML = `
                <button class="btn-primary" onclick="openModal('taskModal')">+ Task</button>
                <button class="btn-primary" onclick="openModal('messageModal')">+ Message</button>
            `;
        }

        render();
    } else {
        document.getElementById('errorMsg').style.display = 'block';
    }
}

function logout() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('ceoControls').style.display = 'none';
    currentUser = null;
}

// =========================
// MODALS
// =========================
function openModal(id) {
    document.getElementById(id).classList.add('show');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}

// =========================
// CREATE TASKS / ANNOUNCEMENTS / MESSAGES / DOCUMENTS
// =========================
function createTask() {
    const title = document.getElementById('taskTitle').value;
    const desc = document.getElementById('taskDesc').value;
    const priority = document.getElementById('taskPriority').value;
    const assigned = document.getElementById('taskAssigned').value;

    if (title && desc) {
        data.tasks.push({title, desc, priority, assigned});
        saveData();
        render();
        closeModal('taskModal');
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDesc').value = '';
        document.getElementById('taskAssigned').value = '';
    }
}

function createAnnouncement() {
    const title = document.getElementById('announcementTitle').value;
    const text = document.getElementById('announcementText').value;

    if (title && text) {
        data.announcements.unshift({title, text, date: new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})});
        saveData();
        render();
        closeModal('announcementModal');
        document.getElementById('announcementTitle').value = '';
        document.getElementById('announcementText').value = '';
    }
}

function createMessage() {
    const text = document.getElementById('messageText').value;

    if (text) {
        data.messages.unshift({text, date: new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})});
        saveData();
        render();
        closeModal('messageModal');
        document.getElementById('messageText').value = '';
    }
}

function createDocument() {
    const name = document.getElementById('docName').value;
    const meta = document.getElementById('docMeta').value;
    const type = document.getElementById('docType').value;
    const content = document.getElementById('docContent').value;
    const requiresSignature = document.getElementById('docRequiresSignature').checked;

    if (name) {
        data.documents.push({
            name,
            meta,
            type,
            content,
            requiresSignature,
            signatures: [],
            createdBy: currentUser.name,
            createdDate: new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})
        });
        saveData();
        render();
        closeModal('documentModal');
        document.getElementById('docName').value = '';
        document.getElementById('docMeta').value = '';
        document.getElementById('docContent').value = '';
        document.getElementById('docRequiresSignature').checked = false;
    }
}

// =========================
// VIEW & SIGN DOCUMENTS
// =========================
function viewDocument(index) {
    const doc = data.documents[index];
    document.getElementById('viewDocTitle').textContent = doc.name;

    let contentHTML = `
        <div class="item-meta">${doc.meta || 'No description'}</div>
        ${doc.content ? `<div class="doc-content">${doc.content}</div>` : ''}
    `;
    document.getElementById('viewDocContent').innerHTML = contentHTML;

    if (doc.requiresSignature) {
        const hasSigned = doc.signatures.some(sig => sig.user === currentUser.name);
        let sigHTML = `<div class="signature-section"><div style="font-weight: 600; color: #1e293b; margin-bottom: 8px;">📝 Signature Required</div>`;

        if (doc.signatures.length > 0) {
            sigHTML += '<div class="signature-list">';
            doc.signatures.forEach(sig => {
                sigHTML += `<div class="signature-item">✓ Signed by ${sig.user} on ${sig.date}</div>`;
            });
            sigHTML += '</div>';
        }

        if (!hasSigned) {
            sigHTML += `<button class="btn-sign" onclick="signDocument(${index})">✍️ Sign Document</button>`;
        } else {
            sigHTML += `<div style="color: #059669; font-weight: 600; margin-top: 12px;">✓ You have signed this document</div>`;
        }
        sigHTML += '</div>';
        document.getElementById('viewDocSignatureSection').innerHTML = sigHTML;
    } else {
        document.getElementById('viewDocSignatureSection').innerHTML = '';
    }

    openModal('viewDocModal');
}

function signDocument(index) {
    const doc = data.documents[index];
    const hasSigned = doc.signatures.some(sig => sig.user === currentUser.name);

    if (!hasSigned) {
        doc.signatures.push({
            user: currentUser.name,
            role: currentUser.role,
            date: new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})
        });
        saveData();
        render();
        viewDocument(index);
    }
}

// =========================
// RENDER DASHBOARD
// =========================
function render() {
    document.getElementById('taskCount').textContent = data.tasks.length;

    document.getElementById('tasksList').innerHTML = data.tasks.map(t => `
        <div class="item">
            <div class="item-header">
                <div class="item-title">${t.title}</div>
                <span class="badge priority-${t.priority}">${t.priority.toUpperCase()}</span>
            </div>
            <div class="item-desc">${t.desc}</div>
            <div class="item-meta">Assigned: ${t.assigned}</div>
        </div>
    `).join('');

    document.getElementById('messagesList').innerHTML = data.messages.map(m => `
        <div class="item">
            <div class="item-title">From: CEO</div>
            <div class="item-meta">${m.date}</div>
            <div class="item-desc">${m.text}</div>
        </div>
    `).join('');

    document.getElementById('announcementsList').innerHTML = data.announcements.map(a => `
        <div class="item">
            <div class="item-title">${a.title}</div>
            <div class="item-meta">${a.date} • Posted by CEO</div>
            <div class="item-desc">${a.text}</div>
        </div>
    `).join('');

    document.getElementById('documentsList').innerHTML = data.documents.map((d, i) => {
        const hasSigned = d.signatures && d.signatures.some(sig => sig.user === currentUser.name);
        const needsSignature = d.requiresSignature && !hasSigned;
        let badge = '';
        if (d.requiresSignature) {
            badge = hasSigned ? '<span class="signature-badge badge-signed">✓ SIGNED</span>'
                              : '<span class="signature-badge badge-needs-signature">⚠ NEEDS SIGNATURE</span>';
        }

        return `
            <div class="item clickable" onclick="viewDocument(${i})">
                <div class="item-title">${d.type || '📄'} ${d.name}${badge}</div>
                <div class="item-meta">${d.meta || 'Click to view'}</div>
            </div>
        `;
    }).join('');
}

// =========================
// ENTER KEY LOGIN
// =========================
document.addEventListener('keypress', e => {
    if (e.key === 'Enter' && document.getElementById('loginPage').style.display !== 'none') {
        login();
    }
});

// INITIAL RENDER
render();


