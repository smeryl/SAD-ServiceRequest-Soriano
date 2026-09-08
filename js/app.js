// js/app.js

let currentUser = null;

// ─── INIT ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
    currentUser = checkAuth();
    if (!currentUser) return;

    await loadDashboard();
    await loadRequests();

    document.getElementById('newRequestBtn').addEventListener('click', showCreateForm);
    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('statusFilter').addEventListener('change', applyFilters);
    document.getElementById('priorityFilter').addEventListener('change', applyFilters);
});

// ─── DASHBOARD ───────────────────────────────────────────
async function loadDashboard() {
    const { data, error } = await supabaseClient
        .from('service_requests')
        .select('status');

    if (error) {
        console.error('Dashboard error:', error);
        return;
    }

    const total = data.length;
    const pending = data.filter(r => r.status === 'Pending').length;
    const inProgress = data.filter(r => r.status === 'In Progress').length;
    const completed = data.filter(r => r.status === 'Completed').length;

    document.getElementById('totalCount').textContent = total;
    document.getElementById('pendingCount').textContent = pending;
    document.getElementById('inProgressCount').textContent = inProgress;
    document.getElementById('completedCount').textContent = completed;
}

// ─── READ (with search + filter) ─────────────────────────
async function loadRequests() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const statusFilter = document.getElementById('statusFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;

    let query = supabaseClient
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

    // Apply filters
    if (statusFilter !== 'All') {
        query = query.eq('status', statusFilter);
    }
    if (priorityFilter !== 'All') {
        query = query.eq('priority', priorityFilter);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Load error:', error);
        return;
    }

    // Client‑side search (requester name or description)
    let filtered = data;
    if (searchTerm) {
        filtered = data.filter(row =>
            row.requester_name.toLowerCase().includes(searchTerm) ||
            row.description.toLowerCase().includes(searchTerm)
        );
    }

    renderTable(filtered);
}

// ─── RENDER TABLE ────────────────────────────────────────
function renderTable(requests) {
    const tbody = document.getElementById('requestTableBody');
    tbody.innerHTML = '';

    if (requests.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;">No requests found.</td></tr>`;
        return;
    }

    requests.forEach(req => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${req.id}</td>
            <td>${escapeHtml(req.requester_name)}</td>
            <td>${escapeHtml(req.category)}</td>
            <td>${escapeHtml(req.priority)}</td>
            <td>${escapeHtml(req.status)}</td>
            <td>
                <button class="edit-btn" data-id="${req.id}">✏️ Edit</button>
                <button class="delete-btn" data-id="${req.id}">🗑️ Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Attach event listeners
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => showEditForm(btn.dataset.id));
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => deleteRequest(btn.dataset.id));
    });
}

// ─── CREATE ──────────────────────────────────────────────
function showCreateForm() {
    const form = document.getElementById('requestForm');
    form.reset();
    document.getElementById('formTitle').textContent = 'New Service Request';
    document.getElementById('requestId').value = '';
    document.getElementById('status').value = 'Pending'; // default
    document.getElementById('requestFormContainer').style.display = 'block';
}

async function saveRequest(event) {
    event.preventDefault();

    const id = document.getElementById('requestId').value;
    const requester_name = document.getElementById('requester_name').value.trim();
    const department = document.getElementById('department').value.trim();
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value.trim();
    const priority = document.getElementById('priority').value;
    const status = document.getElementById('status').value;

    // Business rules validation
    if (!requester_name) { alert('Requester name is required.'); return; }
    if (!department) { alert('Department is required.'); return; }
    if (!category) { alert('Category is required.'); return; }
    if (description.length < 5) { alert('Description must be at least 5 characters.'); return; }
    if (!['Low', 'Medium', 'High'].includes(priority)) { alert('Invalid priority.'); return; }

    const payload = {
        requester_name,
        department,
        category,
        description,
        priority,
        status: status || 'Pending',
        user_id: currentUser.id,
    };

    let error;

    if (id) {
        // UPDATE
        const { error: updateError } = await supabaseClient
            .from('service_requests')
            .update(payload)
            .eq('id', id);
        error = updateError;
    } else {
        // INSERT
        const { error: insertError } = await supabaseClient
            .from('service_requests')
            .insert([payload]);
        error = insertError;
    }

    if (error) {
        alert('Error saving request: ' + error.message);
        return;
    }

    document.getElementById('requestFormContainer').style.display = 'none';
    await loadDashboard();
    await loadRequests();
}

// ─── UPDATE (populate form) ─────────────────────────────
async function showEditForm(id) {
    const { data, error } = await supabaseClient
        .from('service_requests')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        alert('Could not load request: ' + error.message);
        return;
    }

    document.getElementById('formTitle').textContent = 'Edit Request';
    document.getElementById('requestId').value = data.id;
    document.getElementById('requester_name').value = data.requester_name;
    document.getElementById('department').value = data.department;
    document.getElementById('category').value = data.category;
    document.getElementById('description').value = data.description;
    document.getElementById('priority').value = data.priority;
    document.getElementById('status').value = data.status;

    document.getElementById('requestFormContainer').style.display = 'block';
}

// ─── DELETE (with confirmation) ─────────────────────────
async function deleteRequest(id) {
    if (!confirm('Are you sure you want to delete this request?')) return;

    const { error } = await supabaseClient
        .from('service_requests')
        .delete()
        .eq('id', id);

    if (error) {
        alert('Delete failed: ' + error.message);
        return;
    }

    await loadDashboard();
    await loadRequests();
}

// ─── SEARCH + FILTER (triggered by input/change) ────────
function applyFilters() {
    loadRequests();
}

// ─── UTILITY: escape HTML ──────────────────────────────
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

// ─── CANCEL FORM ─────────────────────────────────────────
function cancelForm() {
    document.getElementById('requestFormContainer').style.display = 'none';
}
