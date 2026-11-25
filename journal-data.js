/*
  Créer le journal du lycée — français 2nde (objet d'étude « Informer, s'informer »).
  Partagé par la page élève (cours-journal.html) et le suivi enseignante (cours-suivi.html).
*/
(function(){

const ROLES = [
  ['Rédacteur.rice en chef','Tu décides, tu répartis les sujets, tu choisis la Une.'],
  ['Chef.fe de rubrique','Tu suis une rubrique du journal.'],
  ['Journaliste','Tu enquêtes et tu écris les articles.'],
  ['Photographe','Tu choisis ou tu prends les images.'],
  ['Fact-checker','Tu vérifies que les infos sont vraies.'],
  ['Correcteur.rice','Tu relis et tu corriges les textes.'],
  ['Maquettiste','Tu mets le journal en page sur Canva.']
];
const ROLE_ALONE = 'Et si je suis seul.e ? Je porte plusieurs casquettes, à tour de rôle.';
const ROLE_RULES = ['Je respecte la date de bouclage (le rendu).', 'Je vérifie avant de publier.', 'Je sépare les faits et les avis.', 'Je cite mes sources et mes témoins.', 'Je respecte les personnes (pas d\'insulte, droit à l\'image).'];

const TYPES = {
  actu:{ name:'Journal d\'actualité du lycée', icon:'📰',
    desc:'On écrit sur ce qui vient de se passer dans le lycée : une sortie, un tournoi sportif, une fête, une intervention…',
    rubriques:['Événements récents','Actualité du lycée','Brèves','Interviews','Reportage photo'] },
  mag:{ name:'Magazine thématique', icon:'📘',
    desc:'On choisit un seul grand thème et on écrit uniquement dessus (par exemple : le sport au lycée, la culture, l\'écologie, la vie des élèves…).',
    rubriques:['Portraits','Interview','Reportage','Dossier spécial','Conseils et astuces'] },
  gen:{ name:'Journal scolaire général', icon:'🗞️',
    desc:'On mélange plusieurs rubriques : actualité du lycée, sport, culture, interviews, avis d\'élèves…',
    rubriques:['Actualité du lycée','Vie culturelle et sport','Vie des élèves','Créations et jeux','Tribune libre'] }
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


/* ============ Contenu repris de la fiche papier (étapes 4, 6 à 10) ============ */
// Rappel « info ou pas ? » (étape 4)
const INFO_OR_NOT = [['Info','un fait vérifié.'],['Rumeur','une information non vérifiée.'],['Opinion','un avis.'],['Anecdote','une histoire personnelle.']];
const ANECDOTE = [['« Hier, j\'ai raté le bus et le prof m\'a puni. »','une histoire personnelle (anecdote)'],['« Le bus 12 a eu 20 minutes de retard lundi, selon la vie scolaire. »','une information']];

// Étape 6 : poser ses questions
const STATUS_OPTS = ['⏳ Pas encore commencé', '💬 J\'ai posé mes questions en vrai', '👩‍🏫 J\'ai montré mon mail à ma prof', '📤 J\'ai envoyé mon mail', '📬 J\'ai reçu la réponse'];

// Étape 7 : exemple guidé d'un article d'information
const ARTICLE_EXAMPLE = [
  ['Titre', 'Un exercice d\'évacuation mobilise 600 élèves', 'Court, avec un verbe d\'action.', '#E85D8C'],
  ['Chapeau', 'Mardi 12 novembre, tout le lycée a quitté les bâtiments lors d\'un exercice prévu depuis la rentrée.', 'Il résume les W.', '#7B5FE0'],
  ['Les faits', '**Mardi 12 novembre,** vers 10 h, l\'alarme a retenti dans le bâtiment A. Les 600 élèves ont rejoint la cour en moins de cinq minutes.', 'Quoi, qui, où, quand.', '#2E8B57'],
  ['Le pourquoi', '**Il s\'agissait d\'**un exercice programmé pour tester les nouvelles consignes de sécurité.', 'La cause.', '#1FA9C9'],
  ['Le témoin', '« Tout s\'est bien passé, même si certains ont mis du temps à sortir », **explique** M. Lemoine, professeur de sciences.', 'Guillemets, nom, fonction.', '#4C6EF5'],
  ['La suite', '**Selon la direction,** un second exercice aura lieu en mars.', 'Conséquence ou ouverture.', '#F28C28']
];
const ARTICLE_MUST = ['pas de « je »', 'phrases courtes', 'un témoin cité', 'aucun avis personnel'];
const OTHER_MODELS = [
  { t:'Interview', c:'#C9ECF5', x:'Noa, élève, a lancé le club de dessin. **Journaliste :** Pourquoi ce club ? **Noa :** Il n\'y avait rien à faire à la pause.', s:'présentation, questions ouvertes, réponses citées.' },
  { t:'Brève', c:'#BEEBD9', x:'Le self change d\'horaires. À partir du 4 décembre, il ouvre dès 11 h 45. Les menus restent affichés dans le hall.', s:'quoi, quand, info pratique.' },
  { t:'Critique', c:'#FBD9DE', x:'Le film de la sortie est une réussite : l\'image est superbe. **Seul bémol :** une fin trop rapide. Je le recommande.', s:'je présente, réussi, moins réussi, verdict.' },
  { t:'Chronique', c:'#FDEBC4', x:'Ah, le lundi matin… Mon réveil et moi, nous nous disputons depuis des années. Aujourd\'hui encore, il a gagné.', s:'accroche, exemple vécu, regard drôle, chute.' },
  { t:'Éditorial', c:'#E0D7FA', x:'Le lycée a besoin d\'une salle de travail calme. **Il faudrait que** les élèves puissent s\'y concentrer. Il est temps d\'agir.', s:'constat, arguments, appel à l\'action.' }
];
// Le plan de l'article selon le type (4 paragraphes)
const PLAN_COLS = ['Type d\'article', '① Paragraphe 1', '② Paragraphe 2', '③ Paragraphe 3', '④ Paragraphe 4'];
const PLAN_TYPES = [
  ['Information', 'les faits', 'le pourquoi', 'un témoin (« … », explique [nom])', 'la suite'],
  ['Interview', 'qui est la personne', 'question 1', 'question 2', 'ce que je retiens'],
  ['Critique', 'je présente', 'le réussi', 'le moins réussi', 'le verdict'],
  ['Chronique', 'l\'accroche', 'un exemple', 'un regard drôle', 'la chute'],
  ['Éditorial', 'le constat', 'argument 1', 'argument 2', 'l\'appel']
];

// Étape 8 : repérer les erreurs d'un texte
const TEXT_FIX = '« Ce matin, on a eu une alerte au lycée. Les élèves sont sortis et ils ne comprenaient pas pourquoi. Après, la police est venue et tout est redevenu normal. Moi, je trouve que c\'est abusé, personne n\'a rien expliqué ! »';

// Étape 9 : classer les informations, choisir les images
const PLACE_OPTS = ['À la Une', 'En page intérieure', 'En brève'];
const PLACE_ITEMS = [
  '« Une alerte incendie a fait évacuer 600 élèves. »',
  '« Le menu de la semaine au self. »',
  '« Un élève du lycée a gagné un concours régional de robotique. »',
  '« Les horaires du CDI changent la semaine prochaine. »',
  '« Le gymnase sera fermé deux mois pour travaux. »',
  '« Interview d\'un nouveau professeur. »'
];
const PLACE_ASK = ['Combien de personnes sont concernées ?', 'Est-ce récent ?', 'Est-ce important pour les lecteurs ?', 'Est-ce surprenant ou utile ?'];
const IMG_QUALITIES = [['Utile', 'elle illustre l\'info, elle ne décore pas.'], ['Nette', 'bien cadrée, ni floue ni trop sombre.'], ['Autorisée', 'tes photos ou des images libres de droits ; pas d\'élève reconnaissable sans autorisation.'], ['Légendée', 'une phrase : qui, quoi, où, et la source.']];

// Étape 9 : choisir son format, styles, recettes de titres, JT
const FORMATS = [
  { id:'une', name:'La Une d\'un journal', icon:'📰', txt:'Tu crées la première page d\'un vrai journal, sur Canva. Tu rends 2 pages en PDF. Tu vas aimer : la mise en page, les images, le gros titre qui accroche.' },
  { id:'jt', name:'Le JT : les grands titres', icon:'📺', txt:'Tu crées une courte vidéo de journal télévisé, sur Canva. Tu rends une vidéo MP4 d\'environ 30 secondes. Tu vas aimer : le rythme, les animations, la musique.' }
];
const UNE_STYLES = [
  ['La Une classique', 'Un gros titre + une image. Idéale pour une information importante.'],
  ['L\'édition spéciale', 'Un bandeau rouge + un titre. Idéale pour un événement exceptionnel.'],
  ['La Une magazine', 'Une grande image + des titres courts. Idéale pour un portrait ou un dossier.']
];
const TITLE_RECIPES = [
  ['Un chiffre + un verbe d\'action', '« 600 élèves évacuent le lycée en 5 minutes »'],
  ['Une question', '« Le self ouvrira-t-il plus tôt ? »'],
  ['Un mot choc + deux-points', '« ÉDITION SPÉCIALE : la finale a basculé »']
];
const JT_PARTS = [['Le nom du JT', 'en haut'], ['La pastille « en direct »', 'elle donne le rythme'], ['Le gros titre', 'l\'information principale'], ['L\'image', 'elle illustre le titre'], ['Le bandeau', 'les titres courts, en bas'], ['La date et l\'heure', 'qui dit quand']];
const JT_SCENES = ['Le nom du JT', 'Le gros titre', 'Le titre 2', 'Le titre 3', 'Au revoir'];
const JT_STYLES = [
  ['Le JT classique', 'Un ton sérieux, des titres courts. Idéal pour une information importante.'],
  ['L\'édition spéciale', 'Un seul événement, un bandeau rouge. Idéale pour un événement exceptionnel.'],
  ['Le flash info', 'Trois infos très courtes, un rythme rapide. Idéal pour résumer la semaine.']
];

// Étape 10 : la mise en page sur Canva
const LAYOUT_RULES = [['Une grille', 'je range titres, images et textes en colonnes.'], ['2 polices', 'une pour les titres, une pour le texte.'], ['3 couleurs', 'pas plus, toujours les mêmes.'], ['Des titres hiérarchisés', 'le gros titre est le plus gros.'], ['De l\'espace blanc', 'je laisse respirer la page.']];
const CANVA_UNE = [
  { h:'Partie 1 · Je me connecte et je choisis mon modèle', steps:[
    'Ouvre ton navigateur et va sur canva.com.',
    'Clique sur « Se connecter » (en haut à droite).',
    'Clique sur « Continuer avec Google » ou écris ton adresse e-mail. Si Canva envoie un code : copie-le depuis ta boîte mail et colle-le dans Canva.',
    'Sur la page « Accueil », écris « journal » dans la barre de recherche, puis appuie sur Entrée.',
    'Choisis un modèle sans couronne (les modèles avec une couronne sont payants), puis clique sur « Personnaliser ce modèle ».'] },
  { h:'Partie 2 · Je personnalise ma Une', steps:[
    'Double-clique sur un texte du modèle et écris le titre de ton journal, la date et ton gros titre.',
    'Clique sur un texte, puis ouvre le menu des polices en haut et choisis l\'une de tes 2 polices.',
    'Pour une couleur : clique sur l\'élément, puis sur le carré de couleur en haut, et choisis l\'une de tes 3 couleurs.',
    'Pour ajouter ta photo : « Importer » (menu à gauche), « Importer des fichiers », puis clique sur ta photo. Sans photo : « Photos » et un mot-clé.',
    'Pour remplacer l\'image du modèle, fais glisser ta photo dessus.',
    'Page 2 : sous la page, clique sur « Ajouter une page ». Écris ton article, ta brève, ton image et sa légende.'] },
  { h:'Partie 3 · Je vérifie et je télécharge ma Une', steps:[
    'Je vérifie : tout est aligné, le texte se lit facilement, les titres sont plus gros que le texte, chaque image a sa légende, aucune faute, 2 polices et 3 couleurs seulement.',
    'Clique sur « Partager » (en haut à droite), puis sur « Télécharger ».',
    'Type de fichier : « PDF (standard) », pages : « Toutes les pages ». Clique sur « Télécharger » et rends ton fichier.'] }
];
const CANVA_JT = [
  { h:'Partie 1 · Je me connecte et je choisis mon modèle', steps:[
    'Ouvre ton navigateur et va sur canva.com, puis clique sur « Se connecter » (en haut à droite).',
    'Clique sur « Continuer avec Google » ou écris ton adresse e-mail. Si Canva envoie un code : copie-le depuis ta boîte mail et colle-le dans Canva.',
    'Sur la page « Accueil », clique sur « Créer », puis sur « Vidéo ».',
    'Dans le menu de gauche, clique sur « Modèles » et écris « breaking news » ou « journal télévisé » (ou « flash info », « actualités », « édition spéciale »).',
    'Choisis un modèle sans couronne (les modèles avec une couronne sont payants) et clique dessus. Si Canva demande, applique toutes les pages du modèle.'] },
  { h:'Partie 2 · Je repère mon écran Canva', steps:[
    'Je repère les scènes : une vignette = une scène (en bas).',
    'Je repère le « + » (ajouter une scène), la piste audio (la musique) et les barres colorées (la durée de chaque texte).',
    'Je repère « Importer » (mes images), « Photos » (images libres de droits), « Aperçu » (voir la vidéo en entier) et « Partager » (télécharger).'] },
  { h:'Partie 3 · Je personnalise mes scènes', steps:[
    'Clique sur la 1re scène, double-clique sur un texte, efface-le et écris le nom de ton JT.',
    'Clique sur la scène suivante : écris ton gros titre, puis ton titre 2 et ton titre 3.',
    'Pour ajouter une scène : « + » à droite des vignettes. Pour copier une scène : clic droit, puis « Dupliquer la page ».',
    'Pour changer la durée : tire le bord droit de la vignette (plus long vers la droite, plus court vers la gauche).',
    'Pour ta photo : « Importer », « Importer des fichiers », puis fais-la glisser sur l\'image du modèle.',
    'Écris ta phrase dans le bandeau du bas (double-clique sur le texte du bandeau).'] },
  { h:'Partie 4 · J\'anime, je vérifie et je télécharge', steps:[
    'Clique sur un texte, puis sur « Animer » (en haut) et choisis un effet simple.',
    'Pour la musique : « Ajouter une piste audio » (sous la frise), écris « news » et choisis un son sans couronne.',
    'Clique sur « Aperçu » et regarde toute ta vidéo. Je vérifie : les textes se lisent facilement, les titres sont très courts, aucune faute, la vidéo dure environ 30 secondes, aucun.e élève n\'est reconnaissable sans autorisation.',
    'Clique sur « Partager », puis « Télécharger ». Type de fichier : « MP4 ». Clique sur « Télécharger » et rends ta vidéo.'] }
];
const CANVA_TIPS = ['Utilise « Annuler » si tu te trompes.', 'Garde les mêmes polices partout.', 'Enregistre souvent.'];
const READY_UNE = ['Mon article respecte les 5 W.', 'Mon article est relu et corrigé.', 'Ma Une a un gros titre et une image.', 'Mes images ont une légende.', 'J\'utilise 2 polices et 3 couleurs.', 'Mon PDF est téléchargé.'];
// Grille de bilan du journal complet (/20)
const READY_JT = ['Mon gros titre répond aux W.', 'Mon article est relu et corrigé.', 'Mes titres sont courts.', 'Mes 5 scènes sont dans l\'ordre.', 'J\'ai mis de la musique ou des animations.', 'Ma vidéo MP4 est téléchargée.'];
const GRID_JT = [
  { id:'j_faits', name:'Faits et 5 W dans le gros titre', max:4 },
  { id:'j_titres', name:'Titres courts et clairs', max:3 },
  { id:'j_hier', name:'Hiérarchie : le plus important en premier', max:3 },
  { id:'j_img', name:'Images utiles et autorisées', max:3 },
  { id:'j_montage', name:'Montage : scènes, durée, texte lisible', max:4 },
  { id:'j_ortho', name:'Orthographe', max:3 }
];
const GRID_FINAL = [
  { id:'f_struct', name:'Structure journalistique (5 W)', max:4 },
  { id:'f_style', name:'Style journalistique', max:3 },
  { id:'f_titre', name:'Titre et chapeau', max:2 },
  { id:'f_ortho', name:'Orthographe et grammaire', max:2 },
  { id:'f_hier', name:'Une : gros titre, hiérarchie, style choisi', max:3 },
  { id:'f_img', name:'Images et légendes', max:3 },
  { id:'f_page', name:'Mise en page', max:3 }
];

const course = {
  id:'journal-lycee',
  title:'Créer le journal du lycée',
  subtitle:'Français 2nde — Informer, s\'informer',
  studentPage:'cours-journal.html',
  steps:[
    { n:1, title:'Mon équipe', skill:'Expression écrite', lu:null,
      task:'monter mon équipe de rédaction : son nom, ses membres et ma spécialité.',
      acts:['Je donne un nom à ma rédaction','Je choisis ma spécialité'],
      goal:'Objectif : inscrire ton équipe de rédaction (son nom, ses membres) et choisir ta spécialité de journaliste.',
      qs:[{id:'1-team', prompt:'Nom de l\'équipe, membres, spécialité'}] },
    { n:2, title:'Choisir le type de journal', skill:'Expression écrite', lu:'Écrire : argumenter un choix (type de journal)',
      task:'choisir le type de journal de mon équipe et expliquer pourquoi.',
      acts:['Je comprends les 3 types de journal','J\'écris le choix de mon équipe'],
      goal:'Objectif : comprendre les 3 types de journal, puis écrire le choix de ton équipe et pourquoi il intéressera les élèves du lycée.',
      qs:[{id:'2-quiz', prompt:'Quel type de journal ?'},{id:'2-type', prompt:'Le type de journal de mon équipe'}] },
    { n:3, title:'Définir les rubriques', skill:'Expression écrite', lu:'Écrire : organiser un journal (rubriques)',
      task:'choisir le titre de mon journal et ses rubriques.',
      acts:['Je comprends ce qu\'est une rubrique','Je choisis mon titre et au moins 4 rubriques'],
      goal:'Objectif : comprendre ce qu\'est une rubrique, puis choisir les rubriques de ton journal et son titre.',
      qs:[{id:'3-quiz', prompt:'Les rubriques'},{id:'3-rub', prompt:'Titre du journal et rubriques choisies'}] },
    { n:4, title:'Choisir mon sujet et mes témoins', skill:'Compréhension et expression écrites', lu:'S\'informer : choisir une information à traiter',
      task:'choisir un vrai sujet d\'information et des témoins variés.',
      acts:['Je choisis mon sujet','Je comprends la pluralité des témoignages','Je choisis mes témoins'],
      goal:'Objectif : choisir le sujet de ton article (à partir de l\'info hebdo ou de l\'actualité du moment) et les personnes variées que tu vas interviewer.',
      qs:[{id:'4-quiz', prompt:'La pluralité des témoignages'},{id:'4-subject', prompt:'Mon sujet d\'article et mes témoins'}] },
    { n:5, title:'Préparer l\'enquête', skill:'Expression écrite', lu:'S\'informer : préparer une interview (questions)',
      task:'préparer mon enquête : les 5 W et mes questions.',
      acts:['Je distingue questions ouvertes et fermées','Je remplis les 5 W','J\'écris mes questions'],
      goal:'Objectif : lister les informations à trouver (les 5W) et écrire de bonnes questions d\'interview.',
      qs:[{id:'5-quiz', prompt:'Questions ouvertes ou fermées ?'},{id:'5-5w', prompt:'Les 5W de mon article'},{id:'5-questions', prompt:'Mes questions d\'interview'}] },
    { n:6, title:'Interroger mes témoins', skill:'Expression écrite', lu:'Écrire : rédiger un mail formel',
      task:'poser mes questions à mes témoins, en vrai ou par mail, et noter leurs réponses.',
      acts:['Je pose mes questions (en vrai si possible, par mail sinon)','Je note la réponse mot pour mot','Si besoin, j\'écris mon mail'],
      goal:'Objectif : poser tes questions à tes témoins (en vrai si possible, par mail sinon) et garder leurs réponses.',
      qs:[{id:'6-sent', prompt:'Où en est mon interview ?'},{id:'6-temoin', prompt:'Mes témoins et leurs réponses'},{id:'6-quiz', prompt:'Bien écrire un mail'},{id:'6-mail', prompt:'Mon mail d\'interview'}] },
    { n:7, title:'Rédiger mon article', skill:'Expression écrite', lu:'Écrire : rédiger un article de presse',
      task:'écrire mon article dans le style journalistique, puis ma brève.',
      acts:['J\'étudie un exemple guidé','Je rédige mon article','J\'écris ma brève'],
      goal:'Objectif : rédiger ton article avec les informations obtenues, en suivant les 5 conseils du journaliste.',
      qs:[{id:'7-quiz', prompt:'Les conseils du journaliste'},{id:'7-article', prompt:'Mon article'},{id:'7-breve', prompt:'Ma brève'}] },
    { n:8, title:'Relire et corriger', skill:'Expression écrite', lu:'Écrire : relire et corriger un écrit',
      task:'relire et corriger mon article.',
      acts:['Je repère les erreurs d\'un texte','Je relis mon article avec la grille','Je vois où j\'en suis avec la grille sur 20'],
      goal:'Objectif : relire ton article avec la grille de relecture, puis voir où tu en es avec la grille d\'évaluation.',
      qs:[{id:'8-texte', prompt:'Repérer les erreurs d\'un texte'},{id:'8-check', prompt:'Grille de relecture'},{id:'8-eval', prompt:'Article final (grille d\'évaluation)'}] },
    { n:9, title:'Je construis ma Une ou mon JT', skill:'Compréhension et expression écrites', lu:'Écrire : concevoir la Une d\'un journal ou un journal télévisé',
      task:'construire la Une de mon journal ou mon JT : classer les informations, choisir mon format, le gros titre et les images.',
      acts:['Je classe 6 informations','Je choisis mon format : la Une ou le JT','Je compose ma Une ou mon JT','Je choisis et je légende mes images'],
      goal:'Objectif : classer les informations, choisir ton format (la Une ou le JT), puis préparer le gros titre, les images et la mise en page.',
      qs:[{id:'9-classement', prompt:'Classer 6 informations'},{id:'9-format', prompt:'Mon format : la Une ou le JT'},{id:'9-quiz', prompt:'Les éléments d\'une Une'},{id:'9-plan', prompt:'Le plan de ma Une'},{id:'9-images', prompt:'Mes images et leur légende'},{id:'9-maquette', prompt:'Maquette de ma Une (facultatif)'},{id:'9-jt-style', prompt:'Mon JT : style et nom'},{id:'9-jt-titres', prompt:'Mon JT : mes grands titres'},{id:'9-jt-scenes', prompt:'Mon JT : mes 5 scènes'}] },
    { n:10, title:'Je réalise ma Une ou mon JT', skill:'Compétence numérique', lu:'Réaliser un journal ou un JT avec un outil numérique (Canva)',
      task:'réaliser ma Une (2 pages) ou mon JT (vidéo de 30 secondes) sur Canva, puis faire le bilan.',
      acts:['Je dessine mon plan (Une) ou je prépare mes scènes (JT)','Je réalise ma Une ou mon JT sur Canva','Je fais le bilan'],
      goal:'Objectif : réaliser ta Une ou ton JT sur Canva, le télécharger puis faire le bilan.',
      qs:[{id:'10-chemin', prompt:'Mon chemin de fer'},{id:'10-canva', prompt:'Ma Une sur Canva'},{id:'10-jt-canva', prompt:'Mon JT sur Canva'},{id:'10-bilan', prompt:'Le bilan de ma Une ou de mon JT'},{id:'10-rendu', prompt:'Mon travail terminé (facultatif)'}] }
  ]
};
course.allQuestions = [];
course.steps.forEach(s => (s.qs || []).forEach((q, i) => { q.step = s.n; q.level = '—'; q.index = i; course.allQuestions.push(q); }));
// questions facultatives (ne bloquent pas la validation de l'étape)
// questions propres à un parcours (Une ou JT) : elles ne comptent que si l'élève a choisi ce parcours à l'étape 9
course.pathOf = { '9-quiz':'une', '9-plan':'une', '9-images':'une', '9-maquette':'une', '10-chemin':'une', '10-canva':'une', '9-jt-style':'jt', '9-jt-titres':'jt', '9-jt-scenes':'jt', '10-jt-canva':'jt' };
course.inPath = (id, fmt) => { const p = course.pathOf[id]; return !p || p === fmt; };
course.optional = ['6-temoin', '6-quiz', '6-mail', '9-maquette', '10-rendu'];

window.JOURNAL_COURSE = course;
window.JOURNAL_DATA = { ROLES, TYPES, QUIZ_TYPES, QUIZ_RUB, QUIZ_OPEN, OPEN_OPTS, QUIZ_MAIL, MAIL_MODEL, G_NOW, QUIZ_ARTICLE, QUIZ_PLURAL, PROFILES, TYPE_GUIDE, EVENTS, TIPS, CHECKLIST, GRID, UNE_QUIZ, UNE_OPTS, FONTS, HEBDO,
  INFO_OR_NOT, ANECDOTE, STATUS_OPTS, ARTICLE_EXAMPLE, ARTICLE_MUST, OTHER_MODELS, PLAN_COLS, PLAN_TYPES, TEXT_FIX, ROLE_ALONE, ROLE_RULES, FORMATS, UNE_STYLES, TITLE_RECIPES, JT_PARTS, JT_SCENES, JT_STYLES, CANVA_UNE, CANVA_JT, READY_UNE, READY_JT, GRID_JT, PLACE_OPTS, PLACE_ITEMS, PLACE_ASK, IMG_QUALITIES, LAYOUT_RULES, CANVA_TIPS, GRID_FINAL };
})();
