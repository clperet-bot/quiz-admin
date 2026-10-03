/*
  Behind the Screen — My opinion (Spider-Man: Brand New Day) : parcours d'aiguillage + défi B1.
  Partagé par la page élève (cours-film.html) et le suivi enseignante (cours-suivi.html).
*/
(function(){

const REVIEWS = [
  { user:'Marcus_92', stars:5, sentiment:'positif', text:"Overall, I loved this movie. First of all, the action scenes are incredible and the new suit looks amazing on screen. However, the middle part felt a little too long. In my opinion, this is one of the best Spider-Man movies so far.",
    pos:'the action scenes and the new suit', neg:'the middle part felt too long' },
  { user:'SarahReviews', stars:2, sentiment:'négatif', text:"Overall, I'm disappointed by this movie. First of all, the plot feels confusing at times, with too many characters. However, I have to admit the visual effects are impressive. In my opinion, it's not a bad movie, but I expected more.",
    pos:'the visual effects are impressive', neg:'the plot is confusing, too many characters' },
  { user:'TomCinephile', stars:4, sentiment:'positif', text:"Overall, this movie is really enjoyable. First of all, I love the emotional scenes between Peter and his friends. However, the villain isn't used enough. In my opinion, fans of the character will not be disappointed.",
    pos:'the emotional scenes between Peter and his friends', neg:"the villain isn't used enough" },
  { user:'CriticalViewer', stars:1, sentiment:'négatif', text:"Overall, I didn't enjoy this movie. First of all, it feels like just another superhero movie, nothing new. However, Tom Holland's performance is still convincing. In my opinion, I wouldn't recommend paying full price for this one.",
    pos:"Tom Holland's performance is convincing", neg:'it feels like just another superhero movie' }
];

// Étape 2 — niveau A : phrases à compléter (choix dans des parenthèses)
const SUM_A = [
  ['The movie is called Spider-Man: Brand New Day. The main character is ', {opts:['Peter Parker','Ned','MJ'], ans:'Peter Parker'}, ', who is also ', {opts:['Spider-Man','Hulk','Scorpion'], ans:'Spider-Man'}, '.'],
  ['Peter has a secret: he is Spider-Man. He asks ', {opts:['Ned','MJ','Banner'], ans:'Ned'}, ' to keep it secret.'],
  ['Spider-Man tells MJ that they used to be ', {opts:['enemies','together','neighbours'], ans:'together'}, ', but she is going to ', {opts:['remember','forget'], ans:'forget'}, ' who he is.'],
  ['His plan is to ', {opts:['find her again','never see her again'], ans:'find her again'}, ' and explain everything.']
];
// Étape 2 — niveau B : début de phrases à compléter avec ses mots
const SUM_B = [
  'The movie is called Spider-Man: Brand New Day. The main character is Peter Parker,',
  'He has a big secret:',
  'Spider-Man tells MJ that they used to be',
  'He tells her that',
  'His plan is to'
];

const TRAILER_RUBRIC = "Le texte résume la BANDE-ANNONCE de Spider-Man: Brand New Day, sans spoiler. Faits corrects de la bande-annonce : le personnage principal est Peter Parker, qui est aussi Spider-Man ; il confie son secret à son meilleur ami Ned en lui demandant de le garder ; il dit à MJ qu'ils étaient ensemble (un couple) et qu'elle va oublier qui il est ; son plan est de la retrouver et de tout lui expliquer ; il écrit une lettre qu'il ne lui montrera peut-être jamais ; quand on demande à parler à Bruce Banner, il n'y a que Hulk ; à la fin, les gens utilisent une application (Spidey Tracker) pour repérer Spider-Man.";

// Étape 3 — niveau A (2e exercice) : connecteurs
const CONNECT = [
  ['Overall, …', "l'avis général"],
  ['First of all, …', 'le premier point'],
  ['However, …', 'un point qui contraste avec le précédent'],
  ['In my opinion, …', 'la conclusion']
];
const CONNECT_OPTS = ["l'avis général", 'le premier point', 'un point qui contraste avec le précédent', 'la conclusion'];

const OPINION_PLAN = [
  ['Overall, I think','donne ton avis général'],
  ['First of all,','premier point positif ou négatif'],
  ['However,','un point qui contraste'],
  ['In my opinion,','ta conclusion']
];
const REVIEW_RUBRIC = "Critique d'un film (Spider-Man: Brand New Day, le film si l'élève l'a vu, sinon la bande-annonce) qui suit le plan : Overall (avis général), First of all (premier point), However (point qui contraste), In my opinion (conclusion). L'élève donne une opinion claire et des raisons compréhensibles, sans spoiler.";

// Étape 5 — défi B1
const B1_TEXT = [
  "Superhero films have dominated cinemas for more than twenty years, and every summer critics predict that audiences will finally get tired of them. Yet the box office keeps proving them wrong. So why do we keep going back?",
  "According to film critic Hannah Reed, the secret is not the special effects, although they are often spectacular. “What really keeps us watching is the human side of the story,” she explains. “Behind every mask there is someone who is afraid of failing, who has to choose between duty and friendship. That is something everyone can relate to.”",
  "However, not everyone agrees. Some reviewers argue that many recent films are too predictable: the hero loses, finds new strength and wins in a final battle that lasts forty minutes. They also complain that studios release too many sequels and spin-offs, which makes it hard to follow the plot unless you have seen everything.",
  "Despite these criticisms, there is a clear difference between a film that simply repeats a formula and one that takes risks. The most successful movies of the genre are usually the ones that surprise us, either with a daring story, a memorable villain or a strong emotional ending.",
  "In the end, a good superhero film is like any other good film: it makes us care about the characters. Whether you love the genre or find it overrated, that is what gives a story its power."
];
const B1_NOTE = "Texte original écrit pour ce cours ; la critique citée est fictive.";
const B1_QCM = [
  { q:'What do critics predict every summer?', opts:['That superhero films will make less money','That audiences will finally get tired of superhero films','That studios will stop making sequels','That new actors will replace the old ones'], ans:1 },
  { q:'According to Hannah Reed, what really keeps people watching?', opts:['The special effects','The length of the battles','The human side of the story','The price of the tickets'], ans:2 },
  { q:'What do some reviewers criticise?', opts:['The films are too short','The films are too predictable and there are too many sequels','The heroes are too weak','The villains are too similar to the heroes'], ans:1 },
  { q:'In the last paragraph, “overrated” probably means…', opts:['considered better than it really is','too expensive','very old','impossible to understand'], ans:0 },
  { q:"What is the writer's main message?", opts:['Superhero films are always boring','Special effects are the most important thing','A superhero film is good when we care about its characters','People should stop going to the cinema'], ans:2 }
];
const B1_OPEN_Q = 'In your own words (2 sentences), what is the difference between a film that repeats a formula and one that takes risks?';
const B1_OPEN_RUBRIC = "Question de compréhension : la différence entre un film qui répète une formule et un film qui prend des risques. Réponse attendue (texte lu) : le film qui répète une formule est prévisible (le héros perd, retrouve de la force et gagne la bataille finale) ; le film qui prend des risques nous surprend, avec une histoire audacieuse, un méchant mémorable ou une fin émouvante. ok = true si l'élève exprime clairement les deux idées avec ses propres mots (pas de copier-coller long).";

const B1_BANK = {
  'Décrire un film':[['gripping','captivant'],['predictable','prévisible'],['thought-provoking','qui fait réfléchir'],['visually stunning','visuellement époustouflant'],['overrated / underrated','surfait / sous-estimé'],['heartwarming','qui réchauffe le cœur'],['fast-paced / slow-moving','rythmé / lent'],['convincing','convaincant'],['memorable','mémorable'],['original','original']],
  'Parler du film':[['plot','intrigue'],['cast','distribution'],['performance','interprétation'],['soundtrack','bande originale'],['pacing','rythme'],['special effects','effets spéciaux'],['script','scénario'],['villain','méchant'],['sequel','suite']],
  'Exprimer son opinion':[['What I liked most was…','Ce que j\'ai le plus aimé…'],['Although …, …','Bien que…'],['Despite … , …','Malgré…'],['On the one hand… on the other hand…','D\'un côté… de l\'autre…'],['It lacks …','Il manque…'],['It\'s worth watching because…','Ça vaut le coup parce que…'],['I would recommend it to…','Je le recommande à…'],['To sum up, …','Pour résumer…'],['Personally, I think …','Personnellement, je pense…'],['As far as I\'m concerned, …','En ce qui me concerne…']]
};
// motifs pour compter les mots/expressions utilisés (minuscules, apostrophes droites)
const B1_PATTERNS = [
  'gripping','predictable','thought-provoking','visually stunning','overrated','underrated','heartwarming','fast-paced','slow-moving','convincing','memorable','original',
  'plot','cast','performance','soundtrack','pacing','special effects','script','villain','sequel',
  'what i liked most','although','despite','on the one hand','on the other hand','it lacks','worth watching','i would recommend',"i'd recommend",'to sum up','personally','as far as i\'m concerned','in spite of','whereas'
];
const B1_TARGET = 6;

const course = {
  id:'behind-the-screen',
  title:'Behind the Screen — My opinion',
  subtitle:'Spider-Man: Brand New Day',
  studentPage:'cours-film.html',
  steps:[
    { n:1, title:"Où j'en suis", skill:'bilan',
      goal:"Objectif : dire à ta prof où tu en es dans le livret, pour que le parcours te propose la bonne suite.",
      qs:[{id:'1-where', prompt:'Où en es-tu dans le livret ?'}] },
    { n:2, title:'Résumer la bande-annonce', skill:'EE', lu:'Expression écrite (EE)',
      goal:"Objectif : résumer l'histoire de la bande-annonce en anglais, sans spoiler. Commence par le niveau A et va aussi loin que tu peux.",
      levels:{
        A:{ title:'Je démarre en douceur', tag:'phrases à compléter', qs:[{id:'2A-1', prompt:'Résumé — niveau A'}] },
        B:{ title:"Je m'entraîne davantage", tag:'avec mes propres mots', qs:[{id:'2B-1', prompt:'Résumé — niveau B'}] },
        C:{ title:'Je me lance sans filet', tag:'résumé complet', qs:[{id:'2C-1', prompt:'Résumé — niveau C'}] } } },
    { n:3, title:'Lire les critiques', skill:'CE + EE', lu:'Compréhension écrite (CE)',
      goal:"Objectif : comprendre des critiques de film, repérer les connecteurs de l'opinion, puis écrire ta propre critique avec le même plan.",
      levels:{
        A:{ title:'Je démarre en douceur', tag:'avis et connecteurs', qs:[{id:'3A-1', prompt:'Avis général de chaque critique'},{id:'3A-2', prompt:'Les connecteurs'}] },
        B:{ title:"Je m'entraîne davantage", tag:'points positifs et négatifs', qs:[{id:'3B-1', prompt:'Points positifs et négatifs'},{id:'3B-2', prompt:'Ma critique avec le plan'}] },
        C:{ title:'Je me lance sans filet', tag:'ma critique', qs:[{id:'3C-1', prompt:'Ma critique du film'}] } } },
    { n:4, title:'Ma critique du film', skill:'EE', lu:'Expression écrite (EE)',
      goal:"Objectif : écrire ta critique complète de Spider-Man: Brand New Day en réutilisant ton résumé et ton avis.",
      qs:[{id:'4-review', prompt:'Critique de Spider-Man: Brand New Day'}] },
    { n:5, title:'Défi B1 : aller plus loin', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
      goal:"Objectif : un texte plus complexe (niveau B1), du vocabulaire plus riche à intégrer dans ton avis, puis une critique d'un film ou d'une série de ton choix.",
      qs:[{id:'5-cr', prompt:'Compréhension écrite B1'},{id:'5-vocab', prompt:'Mon avis enrichi (vocabulaire B1)'},{id:'5-own', prompt:'Ma critique d\'un film ou d\'une série'}] }
  ]
};
course.allQuestions = [];
course.steps.forEach(s => {
  if(s.levels) ['A','B','C'].forEach(L => s.levels[L].qs.forEach((q,i) => { q.step = s.n; q.level = L; q.index = i; course.allQuestions.push(q); }));
  else (s.qs || []).forEach((q,i) => { q.step = s.n; q.level = '—'; q.index = i; course.allQuestions.push(q); });
});

window.FILM_COURSE = course;
window.FILM_DATA = { REVIEWS, SUM_A, SUM_B, TRAILER_RUBRIC, CONNECT, CONNECT_OPTS, OPINION_PLAN, REVIEW_RUBRIC, B1_TEXT, B1_NOTE, B1_QCM, B1_OPEN_Q, B1_OPEN_RUBRIC, B1_BANK, B1_PATTERNS, B1_TARGET };
})();
