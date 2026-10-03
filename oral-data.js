/*
  Oral — "From client brief to shop sign" (bakery sign) : aide à la préparation de l'oral.
  Données partagées par la page élève (cours-oral.html) et le suivi enseignante (cours-suivi.html).
*/
(function(){

// Les 6 parties du discours (étape 2)
const PARTS = [
  { k:1, title:'Introduction',
    fr:"Salue, dis ton prénom et annonce ce que tu présentes : ton panneau pour la boulangerie Green Leaf Bakery.",
    frame:"Hello, my name is ___. Today I am going to present my sign for Green Leaf Bakery.",
    mapKeys:[], sentences:'1 à 2 phrases',
    rubric:"Introduction : un bonjour, le prénom de l'élève, et l'annonce qu'il/elle présente son panneau (sign) pour la boulangerie Green Leaf Bakery." },
  { k:2, title:"The client's request",
    fr:"Présente la demande de la cliente, Sarah Green : ce qu'elle veut (moderne, écologique, facile à lire), les couleurs, ce qu'elle veut éviter, le texte du panneau.",
    frame:"The client is Sarah Green. She wants a ___ sign. She wants it to be ___ and ___. She wants the colours ___. She wants to avoid ___.",
    mapKeys:[], sentences:'3 à 4 phrases',
    rubric:"Présentation de la demande de la cliente Sarah Green (Green Leaf Bakery) avec au moins 3 informations EXACTES parmi : enseigne moderne et écologique (eco-friendly), facile à lire depuis la rue, vert et blanc, aspect bois / naturel, éviter le plastique brillant, texte « Green Leaf Bakery – Fresh. Local. Natural. »." },
  { k:3, title:'My colours',
    fr:"Dis quelles couleurs tu as choisies et pourquoi.",
    frame:"I chose ___ and ___ for the colours because they are ___ and ___.",
    mapKeys:['colors','colors_why'], sentences:'2 phrases',
    rubric:"Couleurs : l'élève cite les couleurs de SA carte mentale (ou des couleurs très proches) et donne au moins une raison avec un adjectif (natural, eco-friendly, warm, fresh, clean, modern…)." },
  { k:4, title:'My materials',
    fr:"Dis quels matériaux tu as choisis et pourquoi.",
    frame:"I chose ___ for the materials because it is ___ and ___.",
    mapKeys:['materials','materials_why'], sentences:'2 phrases',
    rubric:"Matériaux : l'élève cite les matériaux de SA carte mentale (ou très proches : wood, glass, metal…) et donne au moins une raison avec un adjectif (natural, durable, strong, eco-friendly, modern…)." },
  { k:5, title:'My font',
    fr:"Dis quelle police tu as choisie et pourquoi.",
    frame:"I chose the font ___ because it is ___ and easy to read.",
    mapKeys:['font','font_why'], sentences:'1 à 2 phrases',
    rubric:"Police : l'élève cite la police de SA carte mentale (ex : Playfair Display, Montserrat, Pacifico, Allura, Cinzel) et donne au moins une raison simple (elegant, modern, easy to read, clean, handmade…)." },
  { k:6, title:'Conclusion',
    fr:"Conclus en une ou deux phrases qui résument ton panneau, puis remercie.",
    frame:"In conclusion, my sign is ___ and ___. Thank you for listening.",
    mapKeys:[], sentences:'1 à 2 phrases',
    rubric:"Conclusion : une phrase qui résume le panneau (ex : modern, eco-friendly, green and white…) et une formule de remerciement (Thank you for listening / Thank you)." }
];

const MAP_BOXES = [
  ['colors','Colours','🎨'],['colors_why','Why? (colours)','💬'],
  ['materials','Materials','🪵'],['materials_why','Why? (materials)','💬'],
  ['font','Font','🔤'],['font_why','Why? (font)','💬']
];

// Banque de vocabulaire (issue de la fiche + compléments)
const VOCAB = {
  'Colours':[['green','vert'],['olive green','vert olive'],['sage green','vert sauge'],['beige','beige'],['cream / off white','crème / blanc cassé'],['light brown','marron clair'],['dark brown','marron foncé'],['terracotta','terracotta'],['warm orange','orange chaud'],['mustard yellow','jaune moutarde'],['white','blanc'],['black','noir']],
  'Materials':[['wood','bois'],['recycled wood','bois recyclé'],['glass','verre'],['frosted glass','verre dépoli'],['metal','métal'],['brushed metal','métal brossé']],
  'Adjectives':[['natural','naturel'],['authentic','authentique'],['eco-friendly','écologique'],['modern','moderne'],['elegant','élégant'],['transparent','transparent'],['strong','solide'],['durable','durable'],['handmade','fait main'],['warm','chaleureux'],['traditional','traditionnel'],['clean','net, propre'],['simple','simple'],['professional','professionnel'],['fresh','frais'],['easy to read','facile à lire']],
  'Fonts':[['Playfair Display','élégante, classique'],['Montserrat','moderne, très lisible'],['Pacifico','manuscrite, décontractée'],['Allura','calligraphie fine'],['Cinzel','capitales de style romain']]
};

const CLIENT_BRIEF = `Mail de la cliente : de Sarah Green, propriétaire de « Green Leaf Bakery », objet « New shop sign for my bakery ». Elle veut une enseigne moderne et écologique (eco-friendly), facile à lire depuis la rue ; verte et blanche, avec un aspect bois ou naturel ; elle veut éviter le plastique brillant ; le texte doit être : « Green Leaf Bakery – Fresh. Local. Natural. ».`;

const course = {
  id:'oral-bakery-sign',
  title:'Préparer mon oral',
  subtitle:'From client brief to shop sign · Present your project in English',
  studentPage:'cours-oral.html',
  steps:[
    { n:1, title:'Ma carte mentale', skill:'EO · préparation', lu:'Expression orale (EO)',
      goal:"Objectif : transformer ta carte mentale « My bakery sign » en une carte claire, simple et corrigée, en anglais.",
      qs:[{id:'1-map', prompt:'Carte mentale (photo → version corrigée)'}] },
    { n:2, title:'Mon discours', skill:'EE', lu:'Expression écrite (EE)',
      goal:"Objectif : écrire, partie par partie, ce que tu vas dire à l'oral. Tu es corrigé.e tout de suite.",
      levels:{
        A:{ title:'Je démarre en douceur', tag:'phrases à compléter', qs:PARTS.map(p => ({id:'2A-'+p.k, prompt:p.title})) },
        B:{ title:"Je m'entraîne davantage", tag:'mots-clés de ma carte', qs:PARTS.map(p => ({id:'2B-'+p.k, prompt:p.title})) },
        C:{ title:'Je me lance sans filet', tag:'production libre', qs:PARTS.map(p => ({id:'2C-'+p.k, prompt:p.title})) }
      } },
    { n:3, title:'Prononciation', skill:'EO', lu:'Expression orale (EO)',
      goal:"Objectif : repérer les mots difficiles, écouter, puis lire chaque phrase à voix haute. Le micro vérifie ce qu'il comprend.",
      endId:'3-end', qs:[{id:'3-script', prompt:'Mon texte final'}] },
    { n:4, title:"Je m'enregistre", skill:'EO', lu:'Expression orale (EO)',
      goal:"Objectif : t'enregistrer, te réécouter et progresser, d'abord avec ton texte, puis avec ta carte mentale seulement.",
      qs:[{id:'4-t1', prompt:'Prise 1 — avec mon texte'},{id:'4-t2', prompt:'Prise 2 — avec ma carte mentale seulement'}] }
  ]
};

course.allQuestions = [];
course.steps.forEach(s => {
  if(s.levels) ['A','B','C'].forEach(L => s.levels[L].qs.forEach((q,i) => { q.step = s.n; q.level = L; q.index = i; course.allQuestions.push(q); }));
  else (s.qs || []).forEach((q,i) => { q.step = s.n; q.level = '—'; q.index = i; course.allQuestions.push(q); });
});

window.ORAL_COURSE = course;
window.ORAL_PARTS = PARTS;
window.ORAL_MAP_BOXES = MAP_BOXES;
window.ORAL_VOCAB = VOCAB;
window.ORAL_CLIENT_BRIEF = CLIENT_BRIEF;
})();
