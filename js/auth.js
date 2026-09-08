// js/auth.js

// ─── LOGIN ───────────────────────────────────────────────
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert('Login failed: ' + error.message);
        return;
    }

    // Save session info
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = 'index.html';
}

// ─── LOGOUT ──────────────────────────────────────────────
async function handleLogout() {
    await supabaseClient.auth.signOut();
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// ─── CHECK SESSION ───────────────────────────────────────
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
    }
    return user;
}

// ─── ATTACH EVENT LISTENERS ─────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});
