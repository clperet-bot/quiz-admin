/*
  MODÈLE — à intégrer dans un futur quiz ÉVALUÉ (pas les quiz d'entraînement).
  Ce fichier n'est pas branché automatiquement : il montre comment un quiz doit
  se connecter à ce système (base de données + anti-triche) quand tu seras prête
  à construire tes quiz notés. À coller/adapter dans le <script> du quiz concerné.
*/

const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-ANON-KEY";
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script> requis dans le <head>

const supa = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 1) Récupérer le contexte transmis par eleve.html
const params = new URLSearchParams(location.search);
const studentName = params.get('student');
const classId = params.get('class_id');
const quizId = params.get('quiz_id');

if(!studentName || !classId || !quizId){
  document.body.innerHTML = '<p style="padding:40px;font-family:sans-serif">Accède à ce quiz via le lien donné par ta prof (QR code de la classe).</p>';
  throw new Error('Missing student context');
}

function normalizeName(s){
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
}

// 2) À la fin du quiz (dans ta fonction showResults existante), enregistrer le score :
async function submitScore(score, total){
  await supa.from('attempts').insert({
    quiz_id: quizId,
    class_id: classId,
    student_name_raw: studentName,
    student_name_normalized: normalizeName(studentName),
    score: score,
    total: total,
    cancelled: false
  });
}
// Exemple d'appel : submitScore(score, QUESTIONS.length);

// 3) Anti-triche — bandeau permanent + tolérance de quelques secondes
let awayTimer = null;
let awayCount = 0;

function showCheatBanner(){
  if(document.getElementById('cheat-banner')) return;
  const banner = document.createElement('div');
  banner.id = 'cheat-banner';
  banner.style.cssText = 'position:sticky;top:0;z-index:999;background:#C0392B;color:#fff;text-align:center;padding:8px;font-size:13px;font-family:sans-serif;';
  banner.textContent = "⚠ Si tu quittes cette page, ta prof sera notifiée et tes réponses seront effacées.";
  document.body.prepend(banner);
}
showCheatBanner();

document.addEventListener('visibilitychange', () => {
  if(document.hidden){
    awayTimer = Date.now();
  } else if(awayTimer){
    const awaySeconds = (Date.now() - awayTimer) / 1000;
    awayTimer = null;
    if(awaySeconds > 4){
      awayCount++;
      cancelAttempt();
    } else {
      const banner = document.getElementById('cheat-banner');
      if(banner) banner.textContent = "⚠ Tu es sorti(e) du quiz. Si tu recommences, tes réponses seront effacées et ta prof sera notifiée.";
    }
  }
});

async function cancelAttempt(){
  await supa.from('attempts').insert({
    quiz_id: quizId,
    class_id: classId,
    student_name_raw: studentName,
    student_name_normalized: normalizeName(studentName),
    score: null,
    total: null,
    cancelled: true
  });
  document.body.innerHTML = '<p style="padding:40px;font-family:sans-serif;text-align:center">Tentative annulée : tu as quitté le quiz. Ta prof a été notifiée. Reviens demain pour réessayer.</p>';
}
