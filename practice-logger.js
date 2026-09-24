// ============================================================
// practice-logger.js — à inclure dans chaque quiz d'entraînement
// Usage : <script src="https://clperet-bot.github.io/entrainements-cours/practice-logger.js"></script>
// Puis, dans la fonction qui affiche le score final de CHAQUE quiz, ajoute :
//   if (window.logPracticeAttempt) logPracticeAttempt('Nom du quiz', score, total);
// ============================================================

(function () {
  const SUPABASE_URL = "https://eyfqryrwivjwwaftehdc.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5ZnFyeXJ3aXZqd3dhZnRlaGRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNDU2NjIsImV4cCI6MjEwMjkyMTY2Mn0.i9YiNL45rILlxyckLMl3SJVIIib8P40DSIaiNkm89tc";

  // Charge le client Supabase si pas déjà présent sur la page
  function loadSupabaseLib(callback) {
    if (window.supabase) { callback(); return; }
    const s = document.createElement('script');
    s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    s.onload = callback;
    document.head.appendChild(s);
  }

  let sb = null;

  function getStudentInfo() {
    const raw = sessionStorage.getItem('practice_student_info');
    return raw ? JSON.parse(raw) : null;
  }

  function saveStudentInfo(info) {
    sessionStorage.setItem('practice_student_info', JSON.stringify(info));
  }

  function showGate(onComplete) {
    const existing = getStudentInfo();
    if (existing) { onComplete(); return; }

    const overlay = document.createElement('div');
    overlay.id = 'practice-gate-overlay';
    overlay.style.cssText = `
      position:fixed; inset:0; z-index:99999; background:rgba(20,18,16,.92);
      display:flex; align-items:center; justify-content:center; padding:20px;
      font-family:'Segoe UI', Arial, sans-serif;
    `;
    overlay.innerHTML = `
      <div style="background:#fff; border-radius:14px; padding:28px 26px; max-width:360px; width:100%; box-shadow:0 10px 30px rgba(0,0,0,.3);">
        <h2 style="margin:0 0 4px 0; font-size:1.2em; color:#2b2470;">Avant de commencer</h2>
        <p style="margin:0 0 18px 0; font-size:0.85em; color:#6b6591;">Renseigne tes informations pour que ta prof puisse suivre ton entraînement.</p>
        <label style="display:block; font-weight:bold; font-size:0.85em; margin-bottom:4px; color:#4c3fa8;">Prénom et nom</label>
        <input type="text" id="pg-name" placeholder="Ex: Léa Martin" style="width:100%; box-sizing:border-box; padding:9px 12px; border:1.5px solid #ddd9f7; border-radius:8px; margin-bottom:14px; font-size:0.95em;">
        <label style="display:block; font-weight:bold; font-size:0.85em; margin-bottom:4px; color:#4c3fa8;">Classe</label>
        <select id="pg-classe" style="width:100%; box-sizing:border-box; padding:9px 12px; border:1.5px solid #ddd9f7; border-radius:8px; margin-bottom:18px; font-size:0.95em;">
          <option value="">-- Choisis ta classe --</option>
          <option value="2nde MES">2nde MES</option>
          <option value="2nde TNE">2nde TNE</option>
          <option value="2nde BMA">2nde BMA</option>
          <option value="1ère MES">1ère MES</option>
          <option value="1ère MELEC">1ère MELEC</option>
        </select>
        <button id="pg-submit" style="width:100%; background:linear-gradient(135deg,#6366f1,#8b5cf6); color:#fff; border:none; border-radius:10px; padding:11px; font-weight:bold; font-size:0.95em; cursor:pointer;">Commencer le quiz</button>
        <p id="pg-error" style="color:#d1354a; font-size:0.82em; margin:10px 0 0 0; display:none;"></p>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('pg-submit').addEventListener('click', function () {
      const name = document.getElementById('pg-name').value.trim();
      const classe = document.getElementById('pg-classe').value;
      const errorBox = document.getElementById('pg-error');
      if (!name || !classe) {
        errorBox.style.display = 'block';
        errorBox.textContent = 'Merci de remplir ton nom et ta classe.';
        return;
      }
      saveStudentInfo({ name, classe });
      overlay.remove();
      onComplete();
    });
  }

  window.logPracticeAttempt = function (quizName, score, maxScore) {
    const info = getStudentInfo();
    if (!info) return; // sécurité, ne devrait pas arriver
    loadSupabaseLib(function () {
      if (!sb) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      sb.from('practice_attempts').insert([{
        student_name: info.name,
        classe: info.classe,
        quiz_name: quizName,
        score: score,
        max_score: maxScore
      }]).then(function (res) {
        if (res.error) console.error('Erreur d\'enregistrement de la tentative :', res.error);
      });
    });
  };

  // Affiche la porte d'entrée dès que le script est chargé
  document.addEventListener('DOMContentLoaded', function () {
    showGate(function () {});
  });
})();
