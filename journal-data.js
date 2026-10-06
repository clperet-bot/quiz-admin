/*
  Créer le journal du lycée — français 2nde (objet d'étude « Informer, s'informer »).
  Partagé par la page élève (cours-journal.html) et le suivi enseignante (cours-suivi.html).
*/
(function(){

const ROLES = [
  ['🕵️ Enquêteur','Tu cherches des infos fiables sur le terrain ou sur Internet.'],
  ['📸 Photographe','Tu prends ou choisis des images pour illustrer les articles.'],
  ['🧠 Fact-checker','Tu vérifies que les infos sont vraies et bien expliquées.'],
  ['🎨 Designer','Tu rends le journal beau, clair et agréable à lire.'],
  ['📣 Chargé de communication','Tu présentes le projet à l\'extérieur (professeurs, élèves, affiches…).'],
  ['✍️ Chroniqueur','Tu écris un article d\'opinion, une critique ou une chronique régulière.'],
  ['🪶 Correcteur','Tu relis les articles, corriges les fautes et aides à reformuler si besoin.']
];

const TYPES = {
  actu:{ name:'Journal d\'actualité du lycée', icon:'📰',
    desc:'On écrit sur ce qui vient de se passer dans le lycée : une sortie, un tournoi sportif, une fête, une intervention…',
    rubriques:['Événements récents (sorties, compétitions, fêtes, interventions d\'invités…)','Actualité du lycée (projets, travaux, nouveautés, changements dans l\'établissement)','Brèves (petites infos rapides du quotidien)','Interviews (d\'élèves, de professeurs, de la direction, d\'intervenants)','Reportage photo (images d\'un événement important)'] },
  mag:{ name:'Magazine thématique', icon:'📘',
    desc:'On choisit un seul grand thème et on écrit uniquement dessus (par exemple : le sport au lycée, la culture, l\'écologie, la vie des élèves…).',
    rubriques:['Portraits (d\'élèves sportifs, d\'artistes, de passionnés…)','Interview (prof, élève, intervenant extérieur)','Reportage (sur un projet ou une activité en lien avec le thème)','Dossier spécial (ex. : pourquoi l\'écologie est importante au lycée, ou l\'histoire d\'un club sportif)','Conseils / astuces (comment s\'entraîner, s\'organiser, progresser dans le thème choisi)','Témoignages (avis d\'élèves, expériences personnelles)'] },
  gen:{ name:'Journal scolaire général', icon:'🗞️',
    desc:'On mélange plusieurs rubriques : actualité du lycée, sport, culture, interviews, avis d\'élèves…',
    rubriques:['Actualité du lycée (sorties, événements, projets, nouveautés)','Vie culturelle (spectacles, cinéma, lecture, expos, événements culturels locaux)','Sport (compétitions, portraits de sportifs, résultats)','Vie des élèves (témoignages, débats, sondages, coups de cœur / coups de gueule)','Interviews (professeurs, élèves, personnels du lycée, parents d\'élèves)','Créations (poèmes, dessins, petites nouvelles écrites par les élèves)','Jeux / détente (mots croisés, quiz, BD, blagues)','Tribune libre (espace d\'expression : opinions, débats, critiques)'] }
};

// Quiz (menus déroulants corrigés automatiquement)
const QUIZ_TYPES = [
  ['« On choisit un seul grand thème (l\'écologie, par exemple) et on écrit uniquement dessus. »','mag'],
  ['« On raconte ce qui vient de se passer au lycée : une sortie, un tournoi, une fête. »','actu'],
  ['« On mélange plusieurs rubriques : sport, culture, interviews, avis d\'élèves. »','gen'],
  ['« Un journal entièrement consacré au sport au lycée. »','mag']
];
const QUIZ_RUB = [
  { q:'Une rubrique, c\'est…', opts:['une section du journal consacrée à un type de sujet (sport, culture…)','le nom du journal','la photo de la Une','un article écrit par un journaliste célèbre'], ans:0 },
  { q:'« Les résultats du match de foot du lycée » : dans quelle rubrique ?', opts:['Sport','Jeux / détente','Créations','Tribune libre'], ans:0 },
  { q:'« Mots croisés, quiz et blagues » : dans quelle rubrique ?', opts:['Interviews','Jeux / détente','Vie culturelle','Sport'], ans:1 },
  { q:'« À mon avis, la cantine devrait changer ses menus » : dans quelle rubrique ?', opts:['Brèves','Reportage photo','Tribune libre','Sport'], ans:2 }
];
const QUIZ_OPEN = [
  { q:'« Aimez-vous le nouveau planning ? »', ans:0 },
  { q:'« Comment avez-vous organisé cette collecte ? »', ans:1 },
  { q:'« Pourquoi avez-vous choisi ce projet ? »', ans:1 },
  { q:'« La panne est-elle réparée ? »', ans:0 }
];
const OPEN_OPTS = ['Question fermée (on répond par oui ou non)','Question ouverte (on répond avec une phrase développée)'];
const QUIZ_MAIL = [
  { q:'Quel objet de mail est le plus clair ?', opts:['Question','Bonjour !!','Demande d\'interview pour le journal du lycée','Urgent'], ans:2 },
  { q:'Tu écris à Mme Martin, professeure. Quelle formule d\'appel convient ?', opts:['Salut,','Bonjour Madame Martin,','Hey Madame !','Madame Martin !!!'], ans:1 },
  { q:'Quelle phrase est la plus polie pour demander une réponse ?', opts:['Répondez avant vendredi.','Réponds vite stp.','Pourriez-vous répondre à mes questions avant vendredi ?','J\'ai besoin de vos réponses.'], ans:2 },
  { q:'Quelle formule de politesse termine bien le mail ?', opts:['Bisous,','Ciao,','Merci de répondre vite.','Cordialement,'], ans:3 }
];
const MAIL_MODEL = [
  ['Objet','Demande d\'interview pour le journal du lycée'],
  ['Formule d\'appel','Bonjour Madame Martin,'],
  ['Je me présente','Je m\'appelle Léa Durand, élève de 2nde TNE. Je suis rédactrice du journal « Le Fil du lycée », créé avec mon équipe en cours de français.'],
  ['J\'explique ma demande','Nous préparons un article sur la collecte organisée par les élèves pour une association. Pourriez-vous répondre aux questions suivantes ?'],
  ['Mes questions (numérotées)','1. Comment avez-vous organisé cette collecte ?\n2. Pourquoi avez-vous choisi cette association ?\n3. Quand et où les dons ont-ils été remis ?'],
  ['Le délai','Serait-il possible d\'avoir vos réponses avant vendredi 17 octobre ?'],
  ['Je remercie','Je vous remercie d\'avance pour votre aide.'],
  ['Formule de politesse et signature','Cordialement,\nLéa Durand, 2nde TNE']
];
const QUIZ_ARTICLE = [
  { q:'Quelle phrase est claire et précise ?', opts:['Mardi matin, une fausse alerte a fait évacuer le lycée.','Des choses se sont déroulées dans le lycée récemment.'], ans:0 },
  { q:'Quelle première phrase accroche le mieux le lecteur ?', opts:['Il s\'est passé un truc au lycée ce matin.','Une alerte incendie a obligé tous les élèves à quitter le lycée ce matin à 9 h.'], ans:1 },
  { q:'Quelle phrase fait bien parler un témoin ?', opts:['Un surveillant était amusé.','« Je n\'ai jamais vu autant d\'élèves courir ! », raconte un surveillant amusé.'], ans:1 },
  { q:'Quelle conclusion est la meilleure ?', opts:['Voilà, c\'est fini.','Les cours ont repris normalement dans l\'après-midi, mais une enquête est en cours pour déterminer l\'origine de l\'alarme.'], ans:1 }
];
const TIPS = [
  ['Sois clair et précis','Va droit au but : dis ce qui s\'est passé, qui est concerné, où, quand et pourquoi. Utilise des phrases simples et percutantes.'],
  ['Commence fort','La première phrase (titre ou chapeau) doit accrocher le lecteur : une information forte, une question, une citation.'],
  ['Utilise les 5W','Qui ? Quoi ? Où ? Quand ? Pourquoi ? (et parfois Comment ?).'],
  ['Fais parler les témoins','Intègre des citations : cela donne du réalisme et rend ton article plus vivant.'],
  ['Soigne ta conclusion','Termine en expliquant les conséquences ou en donnant une ouverture (ce qui va se passer ensuite).']
];
const CHECKLIST = [
  'Orthographe (mots correctement écrits)',
  'Texte fluide et facile à lire',
  'Grammaire (accords, conjugaison)',
  'Phrases claires et pas trop longues',
  'Informations bien organisées (Qui ? Quoi ? Où ? Quand ? Pourquoi ? Comment ?)',
  'Vocabulaire adapté au style journalistique',
  'Pas de répétitions inutiles',
  'Ton neutre et objectif (pas de « on », pas d\'avis personnel)'
];
// Grille d'évaluation de l'article (/20)
const GRID = [
  { id:'sujet', name:'Respect du sujet', desc:'Le sujet est en lien avec le lycée et intéressant pour les lecteurs.', max:3 },
  { id:'structure', name:'Structure journalistique', desc:'L\'article respecte les 5W (Qui, Quoi, Où, Quand, Pourquoi, Comment).', max:4 },
  { id:'titre', name:'Titre et accroche', desc:'Le titre est clair, accrocheur et correspond au contenu. L\'accroche donne envie de lire.', max:2 },
  { id:'orga', name:'Organisation et clarté', desc:'L\'information est présentée de manière logique, phrases courtes et compréhensibles.', max:3 },
  { id:'enquete', name:'Enquête / sources', desc:'L\'article s\'appuie sur des faits réels, des témoignages ou des interviews. Les sources sont claires.', max:3 },
  { id:'style', name:'Style journalistique', desc:'Vocabulaire adapté, pas d\'opinions personnelles, distinction entre faits et avis.', max:3 },
  { id:'ortho', name:'Orthographe et grammaire', desc:'Respect de la langue, peu ou pas de fautes.', max:2 }
];
const UNE_QUIZ = [
  ['« Le nom de ton journal, avec son logo. »','Titre du journal'],
  ['« La phrase en gros qui annonce l\'article le plus important. »','Gros titre'],
  ['« Les petites phrases qui donnent envie de lire les autres articles. »','Accroches'],
  ['« La date et le numéro du journal. »','Date et numéro'],
  ['« La phrase sous la photo qui explique l\'image. »','Légende']
];
const UNE_OPTS = ['Titre du journal','Gros titre','Accroches','Date et numéro','Légende'];
const FONTS = ['Sérieuse (lettres classiques, comme un vrai quotidien)','Moderne (lettres simples et nettes)','Fun (lettres arrondies, amusantes)','Manuscrite (comme écrite à la main)','Grosses lettres percutantes (style affiche)'];

/*
  INFO HEBDO — extraits utiles aux élèves de l'info hebdo n°533 (28/09 au 11/10/2026).
  Volontairement laissés de côté : les rappels aux enseignants et les absences de personnels.
  Chaque élément : { group, title, text, who }
*/
// Autres idées de sujets d'actualité (manifestations, blocus…), proposées dans le cours
const EVENTS = [
  ['Les manifestations lycéennes : pourquoi des élèves défilent-ils ?','des élèves qui ont manifesté, des élèves qui ont choisi de ne pas y aller'],
  ['Les blocus devant les lycées : que se passe-t-il à l\'entrée de l\'établissement ?','la vie scolaire, la direction, des élèves'],
  ['Un reportage dans un cortège : les slogans, l\'ambiance, les pancartes','des manifestant.es et des passant.es (avec leur accord)'],
  ['Le droit de manifester et de bloquer : ce que dit la loi, ce que dit le règlement du lycée','un professeur d\'histoire-géographie ou de droit, la vie scolaire'],
  ['Les cours manqués : comment rattraper pendant les blocus et les manifestations ?','des professeurs, des élèves, la direction'],
  ['Pour ou contre le blocus : le point de vue des élèves, des parents et des professeurs','des élèves, des parents, des professeurs'],
  ['Les examens et le bac pro : les manifestations changent-elles quelque chose ?','des élèves de terminale, des professeurs principaux']
];

const G_NOW = 'L\'actualité du moment';
const HEBDO = { title:'Info hebdo La Salle — n°533 (du 28/09 au 11/10/2026)', note:'Extraits de l\'info hebdo du lycée. Tu peux aussi proposer un autre sujet, à condition qu\'il ait un lien avec le lycée.', pdf:'', images:[], items:[
  { group:G_NOW, title:'Les cours à distance pendant les manifestations dans les lycées', text:'Comment les élèves, les professeurs et les familles vivent-ils les cours à distance ? Qu\'est-ce qui change ?', who:'des élèves de plusieurs classes, des professeurs, la vie scolaire, la direction' },
  { group:G_NOW, title:'Ce qui s\'est passé au lycée Godefroy de Bouillon pendant les manifestations', text:'Raconte les faits vérifiés et les différents points de vue, sans rumeur et sans prendre parti.', who:'des élèves, des professeurs, du personnel, la direction' },
  { group:G_NOW, title:'Travailler à distance : les difficultés et les astuces des élèves', text:'Comment s\'organiser, rester concentré.e, garder le contact avec les profs ?', who:'des élèves, des professeurs, le CDI' },
  { group:'Vie du lycée', title:'Exercice incendie au lycée Godefroy de Bouillon', text:'Lundi 5 octobre à 9 h 30. Les consignes et les plans d\'évacuation sont transmis à tous.', who:'la direction, la vie scolaire, des élèves, un professeur' },
  { group:'Vie du lycée', title:'Le soutien scolaire a repris', text:'Maths-Physique : lundis et mardis de 16 h à 19 h (salle J108). Français-Anglais : mardis de 16 h à 19 h (salle J109). Référent : Michel Ganne.', who:'Michel Ganne, des élèves qui y vont, un professeur' },
  { group:'Vie du lycée', title:'Le Brevet d\'Initiation à l\'Aéronautique (BIA)', text:'Réunion de présentation le mercredi 30 septembre (salle J008). Référente : Anne Lamadon.', who:'Anne Lamadon, des élèves intéressés' },
  { group:'Vie du lycée', title:'Le lycée sélectionné pour le Goncourt des Lycéens', text:'Les élèves de 1ère HLP participent aux journées nationales du concours. Référentes : Raluca Arsenie et Chloé Vidalin.', who:'Raluca Arsenie, Chloé Vidalin, des élèves de 1ère HLP' },
  { group:'Vie du lycée', title:'La chorale du lycée', text:'Ouverte à tous les élèves. Inscriptions jusqu\'au 2 octobre, répétitions tous les mercredis à 13 h à partir du 7 octobre.', who:'des choristes, la personne qui anime la chorale' },
  { group:'Vie du lycée', title:'La formation des délégués', text:'Délégués de 2nde pro : mercredi 30 septembre de 9 h à 12 h.', who:'des délégués, la vie scolaire' },
  { group:'Vie du lycée', title:'La réunion des éco-délégués', text:'Vendredi 9 octobre de 11 h 30 à 14 h (salle J006). Référente : Chloé Vidalin.', who:'Chloé Vidalin, des éco-délégués' },
  { group:'Vie du lycée', title:'Les candidatures au BDL', text:'Dépôt des candidatures du 22 au 30 septembre.', who:'des candidat.e.s, la vie scolaire' },
  { group:'Sorties et voyages', title:'Sortie à la Biennale d\'art contemporain de Lyon', text:'Vendredi 2 octobre, de 8 h à 18 h, pour les élèves de 2nde option Arts plastiques, de 1ère et Terminale spécialité Arts plastiques et DN MADe 2.', who:'des élèves qui y sont allés, un.e professeur.e accompagnateur.rice' },
  { group:'Sorties et voyages', title:'Les élèves de 1 AEPA à l\'EHPAD Champs Fleuris', text:'Lundi 5 octobre, de 14 h 15 à 17 h : animations auprès de personnes âgées, dans le cadre d\'un partenariat.', who:'des élèves de 1 AEPA, Cécile Baudet ou Sandrine Doudin (accompagnatrices)' },
  { group:'Sorties et voyages', title:'Sortie au Puy-en-Velay', text:'Jeudi 8 octobre, de 8 h 15 à 17 h 30, pour les 2nde 1 et 2nde 5 : la ville médiévale et le musée Crozatier.', who:'des élèves de 2nde 1 ou 2nde 5, un professeur accompagnateur' },
  { group:'Sorties et voyages', title:'Cinq élèves au pèlerinage de Lourdes', text:'Du 6 au 11 octobre, pour le pèlerinage du Rosaire. Accompagnatrice : Véronique Vian.', who:'Véronique Vian, l\'un des élèves' },
  { group:'Intervenants et partenariats', title:'Deux nouveaux techniciens pour la spécialité Cinéma', text:'Partenariat « Sauve qui peut le court métrage » : Pierre Vinour et Béranger Godeau accompagneront les élèves toute l\'année. Référents : Ghislain Constans et Sylvie Marliac.', who:'les techniciens, les référents, des élèves de la spécialité Cinéma' },
  { group:'Intervenants et partenariats', title:'Un expert « 2 Minutes Max » intervient auprès des BTS', text:'Vendredi 2 octobre, auprès des étudiants de BTS NDRC 1. Intervenant : Philippe Chabalian. Référente : Sophie Gales.', who:'Sophie Gales, des étudiants de BTS' },
  { group:'À venir', title:'Les voyages scolaires de l\'année', text:'Angleterre (28 mars au 3 avril 2027, référente Valérie Louis), Italie (4 au 9 avril 2027, référente Patrizia Valente), Quiberon pour le collège (12 au 16 octobre).', who:'Valérie Louis, Patrizia Valente, des élèves' }
] };

// Pluralité des témoignages
const PROFILES = ['Des élèves (de plusieurs classes)', 'Des professeurs', 'La direction', 'Du personnel (vie scolaire, secrétariat, agents, CDI, restauration…)', 'Des parents', 'Un intervenant extérieur ou un ancien élève'];
const QUIZ_PLURAL = [
  { q:'La « pluralité des témoignages », c\'est…', opts:['interroger toujours la même personne','interroger des personnes différentes pour avoir plusieurs points de vue','interroger seulement ses meilleurs amis','citer un seul témoin très connu'], ans:1 },
  { q:'Pour son article sur les manifestations, Léa interroge 5 élèves de sa classe. Est-ce suffisant ?', opts:['Oui : 5 témoins, c\'est beaucoup','Oui : seuls les élèves sont concernés','Non : il manque d\'autres points de vue (autres classes, professeurs, personnel, direction)'], ans:2 },
  { q:'Quelle liste de personnes à interroger est la plus variée ?', opts:['Trois amis de la cantine','Une déléguée, un professeur, la CPE','Deux élèves de 2nde TNE et un ami de 1ère'], ans:1 }
];

// Conseils adaptés à chaque type de journal
const TYPE_GUIDE = {
  actu:{ name:'Journal d\'actualité du lycée',
    sujets:'Un événement récent ou en cours qui concerne les élèves : ce qui s\'est passé cette semaine ou ce qui se passe en ce moment (cours à distance, manifestations, exercice incendie, sortie, intervention…). Un sujet d\'actualité doit être récent : s\'il date de trop longtemps, ce n\'est plus de l\'actu.',
    personnes:'Des témoins directs (ceux qui l\'ont vécu), un responsable (la direction, un professeur, la vie scolaire) et quelqu\'un qui a un autre point de vue.',
    questions:'Pense à la chronologie et aux conséquences : Que s\'est-il passé exactement ? Quand et où ? Qui est concerné ? Pourquoi ? Quelles conséquences pour les élèves ? Et maintenant, que va-t-il se passer ?',
    article:'Un article factuel : l\'essentiel en premier (qui, quoi, où, quand), puis les explications, les témoignages de plusieurs personnes et la suite. Pas d\'avis personnel, et pas de rumeur : vérifie chaque information.' },
  mag:{ name:'Magazine thématique',
    sujets:'Un angle précis sur ton thème : un portrait, un reportage, un dossier, des conseils ou des témoignages. Le sujet ne dépend pas de l\'actualité du jour : il peut durer, mais il doit rester en lien avec ton thème et avec le lycée.',
    personnes:'Des passionnés ou pratiquants du thème, un.e spécialiste (professeur, intervenant), des élèves qui ne le pratiquent pas pour avoir un autre regard, et si besoin la direction.',
    questions:'Les questions portent sur l\'expérience et les avis : Comment as-tu découvert ce thème ? Qu\'est-ce qui te plaît ? Quelles difficultés ? Que conseilles-tu ? Que pense l\'établissement de ce thème ?',
    article:'Un portrait, un reportage, un dossier ou des conseils : une accroche, des témoignages variés, des exemples concrets et une conclusion. L\'information peut être moins « chaude », mais elle doit être vraie et vérifiée.' },
  magsport:{ name:'Magazine thématique : le sport',
    sujets:'Les événements et la vie sportive de l\'établissement : un tournoi, un match, une compétition (UNSS…), le portrait d\'un.e sportif.ve du lycée, l\'histoire d\'une équipe ou d\'un club, le gymnase, des conseils d\'entraînement. Attention : un événement sportif a une date, un lieu, un résultat.',
    personnes:'Des sportifs et sportives (joueurs, capitaine), le professeur d\'EPS ou l\'entraîneur, des supporters ou des élèves spectateurs, quelqu\'un de la direction ; pour un match, l\'arbitre ou l\'équipe adverse.',
    questions:'Les questions sont propres au sport : Quel a été le résultat ou le score ? Comment s\'est passée la préparation ? Quelle a été l\'ambiance ? Quel a été le moment fort ? Quelles difficultés ? Quel est le prochain rendez-vous ?',
    article:'Des chiffres exacts (score, classement, date, lieu), un récit vivant (le moment fort), des citations de sportifs ET de l\'entraîneur. Vérifie chaque chiffre : une erreur de score se remarque tout de suite !' },
  gen:{ name:'Journal scolaire général',
    sujets:'Chaque rubrique demande un sujet différent : un événement pour « Actualité du lycée », un résultat pour « Sport », un avis recueilli pour « Vie des élèves », un portrait pour « Interviews »… Choisis d\'abord ta rubrique, puis le sujet qui va avec.',
    personnes:'Cela dépend de ta rubrique : un témoin direct pour l\'actualité, un sportif pour le sport, plusieurs élèves pour un sondage… Pense toujours à varier les profils.',
    questions:'Adapte tes questions à ta rubrique : « Comment s\'est passé… ? » (actualité), « Quel est ton parcours ? » (portrait), « Que pensez-vous de… ? » (vie des élèves).',
    article:'Le format dépend de ta rubrique : brève (2 à 3 phrases avec les 5W), interview (questions et réponses), reportage ou tribune libre (avis signé et argumenté). Pour l\'article évalué, reste factuel.' }
};

const course = {
  id:'journal-lycee',
  title:'Créer le journal du lycée',
  subtitle:'Français 2nde — Informer, s\'informer',
  studentPage:'cours-journal.html',
  steps:[
    { n:1, title:'Mon équipe', skill:'équipe', lu:null,
      goal:'Objectif : inscrire ton équipe de rédaction (son nom, ses membres) et choisir ta spécialité de journaliste.',
      qs:[{id:'1-team', prompt:'Nom de l\'équipe, membres, spécialité'}] },
    { n:2, title:'Choisir le type de journal', skill:'EE', lu:'Écrire : argumenter un choix (type de journal)',
      goal:'Objectif : comprendre les 3 types de journal, puis écrire le choix de ton équipe et pourquoi il intéressera les élèves du lycée.',
      qs:[{id:'2-quiz', prompt:'Quel type de journal ?'},{id:'2-type', prompt:'Le type de journal de mon équipe'}] },
    { n:3, title:'Définir les rubriques', skill:'EE', lu:'Écrire : organiser un journal (rubriques)',
      goal:'Objectif : comprendre ce qu\'est une rubrique, puis choisir les rubriques de ton journal et son titre.',
      qs:[{id:'3-quiz', prompt:'Les rubriques'},{id:'3-rub', prompt:'Titre du journal et rubriques choisies'}] },
    { n:4, title:'Choisir mon sujet et mes témoins', skill:'CE + EE', lu:'S\'informer : choisir une information à traiter',
      goal:'Objectif : choisir le sujet de ton article (à partir de l\'info hebdo ou de l\'actualité du moment) et les personnes variées que tu vas interviewer.',
      qs:[{id:'4-quiz', prompt:'La pluralité des témoignages'},{id:'4-subject', prompt:'Mon sujet d\'article et mes témoins'}] },
    { n:5, title:'Préparer l\'enquête', skill:'EE', lu:'S\'informer : préparer une interview (questions)',
      goal:'Objectif : lister les informations à trouver (les 5W) et écrire de bonnes questions d\'interview.',
      qs:[{id:'5-quiz', prompt:'Questions ouvertes ou fermées ?'},{id:'5-5w', prompt:'Les 5W de mon article'},{id:'5-questions', prompt:'Mes questions d\'interview'}] },
    { n:6, title:'Écrire le mail d\'interview', skill:'EE', lu:'Écrire : rédiger un mail formel',
      goal:'Objectif : écrire un mail poli à la personne que tu veux interviewer, avec tes questions.',
      qs:[{id:'6-quiz', prompt:'Bien écrire un mail'},{id:'6-mail', prompt:'Mon mail d\'interview'},{id:'6-sent', prompt:'Où en est mon mail ?'}] },
    { n:7, title:'Rédiger mon article', skill:'EE', lu:'Écrire : rédiger un article de presse',
      goal:'Objectif : rédiger ton article avec les informations obtenues, en suivant les 5 conseils du journaliste.',
      qs:[{id:'7-quiz', prompt:'Les conseils du journaliste'},{id:'7-article', prompt:'Mon article'}] },
    { n:8, title:'Relire et vérifier', skill:'EE', lu:'Écrire : relire et corriger un écrit',
      goal:'Objectif : relire ton article avec la grille de relecture, puis voir où tu en es avec la grille d\'évaluation.',
      qs:[{id:'8-check', prompt:'Grille de relecture'},{id:'8-eval', prompt:'Article final (grille d\'évaluation)'}] },
    { n:9, title:'La Une et le style graphique', skill:'EE', lu:'Écrire : concevoir la Une d\'un journal',
      goal:'Objectif : imaginer la Une de ton journal et choisir un style graphique cohérent.',
      qs:[{id:'9-quiz', prompt:'Les éléments d\'une Une'},{id:'9-plan', prompt:'Le plan de ma Une'},{id:'9-maquette', prompt:'Maquette de ma Une (facultatif)'}] }
  ]
};
course.allQuestions = [];
course.steps.forEach(s => (s.qs || []).forEach((q, i) => { q.step = s.n; q.level = '—'; q.index = i; course.allQuestions.push(q); }));
// questions facultatives (ne bloquent pas la validation de l'étape)
course.optional = ['6-sent', '9-maquette'];

window.JOURNAL_COURSE = course;
window.JOURNAL_DATA = { ROLES, TYPES, QUIZ_TYPES, QUIZ_RUB, QUIZ_OPEN, OPEN_OPTS, QUIZ_MAIL, MAIL_MODEL, G_NOW, QUIZ_ARTICLE, QUIZ_PLURAL, PROFILES, TYPE_GUIDE, EVENTS, TIPS, CHECKLIST, GRID, UNE_QUIZ, UNE_OPTS, FONTS, HEBDO };
})();
