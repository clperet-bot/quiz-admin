/*
  Listes de vocabulaire (10 mots ou expressions) + correction à règles fixes, sans IA.
  Pour un nouveau quiz : ajouter une liste dans VOCAB_SETS, puis ouvrir vocab-quiz.html?liste=<clé>.
  fr = ce que l'élève voit · en = réponses acceptées (la première est la réponse de référence).
  Ne plus changer l'ordre des mots d'une liste une fois que des élèves l'ont faite.
*/
const VOCAB_SETS = {
  cinema: { title:'Vocabulary — Cinema', words:[
    { fr:'la bande-annonce',      en:['trailer','the trailer','a trailer'] },
    { fr:'le personnage principal', en:['main character','the main character','a main character'] },
    { fr:'le meilleur ami',       en:['best friend','the best friend','a best friend'] },
    { fr:'garder un secret',      en:['to keep a secret','keep a secret','to keep the secret','keep the secret'] },
    { fr:'oublier',               en:['to forget','forget'] },
    { fr:"l'intrigue",            en:['plot','the plot','story','the story'] },
    { fr:'le méchant (du film)',  en:['villain','the villain','a villain'] },
    { fr:'les effets visuels',    en:['visual effects','the visual effects'] },
    { fr:'cependant',             en:['however'] },
    { fr:'à mon avis',            en:['in my opinion'] }
  ]}
};

/* Majuscules, accents, espaces, tirets, apostrophes et ponctuation sont ignorés. */
function vocabNormalize(s){
  return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]/g,'');
}
/* Vrai si une seule faute d'écart : lettre en trop, manquante, remplacée, ou deux lettres voisines inversées. */
function vocabOneAway(a, b){
  if(a === b || Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while(i < a.length && i < b.length && a[i] === b[i]) i++;
  if(a.length === b.length)
    return a.slice(i+1) === b.slice(i+1) || (a[i] === b[i+1] && a[i+1] === b[i] && a.slice(i+2) === b.slice(i+2));
  return a.length > b.length ? a.slice(i+1) === b.slice(i) : a.slice(i) === b.slice(i+1);
}
/* 'ok' = juste · 'review' = à vérifier par la prof (0 point en attendant) · 'no' = faux */
function vocabGrade(answer, accepted){
  const a = vocabNormalize(answer);
  if(!a) return 'no';
  const list = accepted.map(vocabNormalize);
  if(list.includes(a)) return 'ok';
  return list.some(x => vocabOneAway(a, x)) ? 'review' : 'no';
}
if(typeof module !== 'undefined') module.exports = { VOCAB_SETS, vocabNormalize, vocabGrade };
