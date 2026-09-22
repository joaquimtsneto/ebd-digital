/* ============================================================
   EBD Digital PRO — autenticação e Área PRO
   Primeira fase: estrutura de acesso. Conteúdo protegido será
   ligado ao Storage/Database do Supabase após a configuração.
   ============================================================ */
(function () {
  'use strict';

  var config = window.EBD_SUPABASE_CONFIG || {};
  var ready = !!(config.url && config.anonKey && window.supabase);
  var client = ready ? window.supabase.createClient(config.url, config.anonKey) : null;

  function $(id) { return document.getElementById(id); }
  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function setMessage(text, kind) {
    var el = $('proMessage');
    if (!el) return;
    el.textContent = text || '';
    el.className = 'pro-message' + (kind ? ' ' + kind : '');
  }

  function showConfigNotice() {
    var notice = $('proConfigNotice');
    var form = $('proLoginForm');
    if (notice) notice.hidden = false;
    if (form) form.hidden = true;
  }

  function hideConfigNotice() {
    var notice = $('proConfigNotice');
    var form = $('proLoginForm');
    if (notice) notice.hidden = true;
    if (form) form.hidden = false;
  }

  function showLogin() {
    var login = $('proLoginView');
    var dash = $('proDashboardView');
    if (login) login.hidden = false;
    if (dash) dash.hidden = true;
  }

  function showDashboard(profile, license) {
    var login = $('proLoginView');
    var dash = $('proDashboardView');
    if (login) login.hidden = true;
    if (dash) dash.hidden = false;

    var name = profile && profile.full_name ? profile.full_name : 'Usuário EBD Digital';
    var role = profile && profile.role ? profile.role : 'usuário';
    var church = profile && profile.organization_name ? profile.organization_name : 'Igreja participante';

    var nameEl = $('proUserName'); if (nameEl) nameEl.textContent = name;
    var roleEl = $('proUserRole'); if (roleEl) roleEl.textContent = roleLabel(role);
    var churchEl = $('proChurchName'); if (churchEl) churchEl.textContent = church;

    var statusEl = $('proLicenseStatus');
    if (statusEl) {
      var active = license && license.status === 'active' && (!license.ends_at || new Date(license.ends_at) >= new Date());
      statusEl.textContent = active ? 'Licença ativa' : 'Acesso em análise';
      statusEl.className = 'pro-status ' + (active ? 'active' : 'pending');
    }
  }

  function roleLabel(role) {
    var labels = {
      platform_admin: 'Administrador EBD Digital',
      church_admin: 'Administrador da igreja',
      pastor: 'Pastor',
      teacher: 'Professor',
      student: 'Aluno'
    };
    return labels[role] || 'Usuário';
  }

  async function loadProfile(user) {
    if (!client || !user) return;

    var profile = null;
    var license = null;

    var p = await client.from('profiles')
      .select('id, full_name, role, organization_id, organizations(name), active')
      .eq('id', user.id).maybeSingle();

    if (!p.error && p.data) {
      profile = p.data;
      profile.organization_name = p.data.organizations ? p.data.organizations.name : '';
    }

    if (profile && profile.organization_id) {
      var l = await client.from('licenses')
        .select('status, starts_at, ends_at, max_users')
        .eq('organization_id', profile.organization_id)
        .order('ends_at', { ascending: false }).limit(1).maybeSingle();
      if (!l.error) license = l.data;
    }

    showDashboard(profile, license);
  }

  async function refreshSession() {
    if (!client) { showLogin(); return; }
    var result = await client.auth.getSession();
    if (result.data && result.data.session) {
      await loadProfile(result.data.session.user);
    } else {
      showLogin();
    }
  }

  async function login(email, password) {
    if (!client) return;
    setMessage('Entrando...', 'loading');
    var result = await client.auth.signInWithPassword({ email: email, password: password });
    if (result.error) {
      setMessage(result.error.message || 'Não foi possível entrar. Verifique o email e a senha.', 'error');
      return;
    }
    setMessage('');
    await loadProfile(result.data.user);
  }

  async function logout() {
    if (client) await client.auth.signOut();
    showLogin();
    setMessage('Sessão encerrada.');
  }

  function bind() {
    if (!ready) { showConfigNotice(); return; }
    hideConfigNotice();

    var form = $('proLoginForm');
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = $('proEmail').value.trim();
      var password = $('proPassword').value;
      if (!email || !password) {
        setMessage('Informe seu email e sua senha.', 'error');
        return;
      }
      login(email, password);
    });

    var logoutBtn = $('proLogout');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    client.auth.onAuthStateChange(function (event, session) {
      if (session) loadProfile(session.user); else showLogin();
    });

    refreshSession();
  }

  document.addEventListener('DOMContentLoaded', bind);
})();
