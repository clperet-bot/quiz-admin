/*
  Video Game: Survival Challenge — cours d'anglais interactif (virus, survivants, colonie).
  5 étapes qui se cumulent vers la présentation finale au garde de la colonie.
  Niveaux A / B / C à chaque étape (= les activités A, B, C du cours papier).
  Partagé par la page élève (cours-survival.html) et le suivi enseignante (cours-suivi.html).

  Types d'activités (acts) :
   profile  : crée ton survivant.e (nom, âge, rôle, groupe)
   select   : menus déroulants corrigés automatiquement  { items:[{q, opts, exp}] }
   fill     : phrases à trous avec une liste de mots     { lines:[[texte,{a, bank?},texte…]], bank:[[en,fr]] }
   write    : production écrite corrigée par l'IA        { rubric, minWords, ph, pick?, frames? }
   qa       : 3 questions ouvertes en français (CE), corrigées par l'IA   { questions, clue, rubric }
   idcard   : carte d'identité (formulaire)
   aloud    : lecture à voix haute à cocher              { model?, checks:[…] }
   speech   : discours final en 5 parties (IA)
   words    : mots difficiles à dire 3 fois + checklist
   record   : présentation au garde + auto-évaluation
*/
(function(){

const MISSION = "A virus has turned people into dangerous creatures. You are a **survivor**. Follow **5 steps** to find **food, water and a safe place**, then speak to the **guard of the colony**.";
const LEARN = ['choose **survival objects** and say why','describe your **group**, what you **have** and **need**','decide what to **take** and what to **leave**','say **who you are** and what you **can do**','**present yourself** to the guard'];

const OBJECTS = [
  ['bottle of water','une bouteille d\'eau'],['small knife','un petit couteau'],['flashlight','une lampe de poche'],
  ['phone (low battery)','un téléphone (batterie faible)'],['backpack (empty)','un sac à dos (vide)'],['bread','du pain'],['lighter','un briquet']
];

const ROLES = [['doctor','médecin'],['mechanic','mécanicien.ne'],['cook','cuisinier.ère'],['electrician','électricien.ne'],['nurse','infirmier.ère'],['farmer','agriculteur.rice']];
const GROUPS = [['Survivors','Survivants'],['Last Stand','Dernier Rempart'],['Fire Hawks','Faucons de Feu'],['Shadow Squad','Escouade de l\'Ombre'],['Storm Riders','Cavaliers de la Tempête'],['Iron Wolves','Loups de Fer'],['Night Watch','Veilleurs de la Nuit'],['Rescue Team','Équipe de Secours'],['Phoenix Force','Force du Phénix'],['The Guardians','Les Gardiens']];

const REASONS = [
  ['because we are hungry','parce que nous avons faim'],['because we are thirsty','parce que nous avons soif'],['because it is dark outside','parce qu\'il fait sombre dehors'],
  ['because someone can get hurt','parce que quelqu\'un peut se blesser'],['because we may need to climb','parce qu\'on peut devoir grimper'],['because we don\'t know the way','parce qu\'on ne connaît pas le chemin'],
  ['because the streets are dangerous','parce que les rues sont dangereuses'],['because we can carry other things','parce qu\'on peut porter autre chose'],['because it is not useful','parce que ce n\'est pas utile'],
  ['because it is broken','parce que c\'est cassé'],['because they cannot be used','parce qu\'ils sont inutilisables'],['because it does not work','parce que ça ne fonctionne pas']
];

const LETTER_EN = "Sorry… I think there was a problem with the transmission. I managed to find a piece of paper and a pen… I hope someone will be able to read my message.\n\nWe are hiding inside an old warehouse with two other survivors. We have some water and a little food, but it is not enough. We found a knife and a backpack to carry our things. The nights are cold and we cannot use electricity.\n\nOutside, we hear strange noises… the infected are not far.\n\nTomorrow, we must look for more supplies and maybe find a safer place.\n\nI feel scared, but we must stay strong. If you are alive, please protect your group and don't go alone.";
const LETTER_FR = "Désolée… je crois qu'il y a eu un problème de transmission. J'ai réussi à trouver un bout de papier et un stylo… J'espère que quelqu'un pourra lire mon message.\n\nNous nous cachons dans un vieil entrepôt avec deux autres survivant.e.s. Nous avons de l'eau et un peu de nourriture, mais ce n'est pas assez. Nous avons trouvé un couteau et un sac à dos pour transporter nos affaires. Les nuits sont froides et nous ne pouvons pas utiliser l'électricité.\n\nDehors, nous entendons des bruits étranges… les infectés ne sont pas loin.\n\nDemain, nous devons chercher plus de provisions et peut-être trouver un endroit plus sûr.\n\nJ'ai peur, mais nous devons rester fort.e.s. Si vous êtes en vie, protégez votre groupe et n'y allez pas seul.e.";

const STEPS = [
 /* ───────────── ÉTAPE 1 ───────────── */
 { title:'Escape and survive', fr:'Fuir et survivre', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:"Objectif : choisir 3 objets de survie et expliquer pourquoi.",
   intro:"The virus has spread everywhere. People are turning into dangerous creatures. The city is not safe anymore. You and your group of survivors must leave your home very fast. You can take 3 objects with you. Choose carefully… your survival depends on it.",
   introFr:"Le virus s'est répandu. Des créatures dangereuses sont partout. La ville n'est plus sûre. Vous et votre groupe de survivant.e.s devez fuir très vite avec 3 objets. Choisissez bien.",
   vocab:[{ title:'Objects · les objets', items:OBJECTS }, { title:'Because · parce que', items:[['because','parce que'],['We took…','Nous avons pris…'],['We have…','Nous avons…']] }],
   help:{ title:'HELP · BECAUSE', rows:[['We took the knife because we need to cut things.','Nous avons pris le couteau parce que nous devons couper des choses.'],['We took the bread because we are hungry.','Nous avons pris le pain parce que nous avons faim.']] },
   levels:{
     A:{ title:'Je comprends', tag:'je crée mon survivant.e et j\'associe', acts:[
       { id:'1A-0', type:'profile', title:'Create your survivor!', en:'Create your survivor!', fr:'Crée ton survivant.e ! Le nom du groupe est facultatif : c\'est le « we » de tes phrases.' },
       { id:'1A-1', type:'select', title:'Match each object with its French word', en:'Match each object with its French word.', fr:'Relie chaque objet à son mot en français.',
         items: OBJECTS.map(o => ({ q:o[0], opts:OBJECTS.map(x => x[1]), exp:o[1] })) } ] },
     B:{ title:'Je complète', tag:'je complète les phrases', acts:[
       { id:'1B-1', type:'fill', title:'Complete the sentences', en:'Complete the sentences with the words in the lists.', fr:'Complète les phrases avec les mots des listes.',
         bank:[ ['bottle of water','une bouteille d\'eau'],['small knife','un petit couteau'],['flashlight','une lampe de poche'],['bread','du pain'],['lighter','un briquet'],
                ['because we are thirsty','parce que nous avons soif'],['because it is dark','parce qu\'il fait nuit'],['because we need to cut things','parce qu\'il faut couper des choses'],['because we are hungry','parce que nous avons faim'],['because we want to make a fire','parce qu\'on veut faire du feu'] ],
         lines:[ ['Vous avez soif. → We took the ',{a:'bottle of water',b:0},' ',{a:'because we are thirsty',b:1},'.'],
                 ['Il fait nuit. → We took the ',{a:'flashlight',b:0},' ',{a:'because it is dark',b:1},'.'],
                 ['Vous devez couper quelque chose. → We took the ',{a:'small knife',b:0},' ',{a:'because we need to cut things',b:1},'.'] ],
         banks:[[0,1,2,3,4],[5,6,7,8,9]] } ] },
     C:{ title:'J\'écris', tag:'je choisis 3 objets et j\'explique', acts:[
       { id:'1C-1', type:'write', title:'Choose 3 objects and explain', en:'Choose 3 objects. Tick them, then explain your choice.', fr:'Choisis 3 objets : coche-les, puis explique ton choix.',
         pick:{ n:3, items:OBJECTS.map(o => o[0]) },
         frames:['We took the … because …','We took the … because …','We took the … because …','We have a …, a … and a …'],
         ph:'We took the … because …\nWe took the … because …\nWe took the … because …\nWe have a …, a … and a ….',
         rubric:"Bloc 1 de la présentation finale. L'élève a coché 3 objets (voir CONTEXTE) et écrit 3 phrases « We took the [objet] because [raison] » avec une raison logique pour chaque objet, puis une phrase finale « We have a …, a … and a … » qui reprend ses 3 objets. ok = true si les 3 phrases existent avec une raison cohérente et que la phrase finale est présente, dans un anglais compréhensible.", minWords:18,
         note:'Recopie tes 3 objets : tu réutiliseras cette phrase dans ta présentation finale.' } ] }
   } },

 /* ───────────── ÉTAPE 2 ───────────── */
 { title:'Find a shelter and food', fr:'Trouver un abri et de la nourriture', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:"Objectif : lire la lettre d'une survivante et décrire la situation d'un groupe.",
   intro:"You cannot stay in the city. The streets are dangerous. You need to find a safe place. You start walking. On the way, you see an old warehouse. It looks abandoned, but maybe it can give you protection. You go inside. On a table, there is an old computer. A video starts: a woman tries to speak. The connection is bad. The image freezes. Then you see a crumpled letter on the floor. She wrote her message on it.",
   introFr:"Vous ne pouvez pas rester en ville. Les rues sont dangereuses. Vous devez trouver un lieu sûr. Sur le chemin, vous voyez un vieil entrepôt. Il a l'air abandonné, mais il peut peut-être vous protéger. Vous entrez. Sur une table, il y a un vieil ordinateur : une vidéo démarre, une femme essaie de parler. La connexion est mauvaise et l'image se fige. Puis vous voyez une lettre froissée par terre : elle y a écrit son message.",
   letter:{ en:LETTER_EN, fr:LETTER_FR, title:'The letter' },
   vocab:[
     { title:'Resources · les ressources', items:[['water','eau'],['food','nourriture'],['electricity','électricité'],['knife','couteau'],['backpack','sac à dos'],['blankets','couvertures'],['phone','téléphone'],['rope','corde'],['flashlight / torch','lampe de poche'],['batteries','piles'],['map','carte'],['clothes / jacket','vêtements / veste'],['shoes / boots','chaussures / bottes'],['tent','tente'],['sleeping bag','sac de couchage'],['matches / lighter','allumettes / briquet'],['canned food','conserves'],['radio','radio'],['first aid kit','trousse de secours'],['crowbar','pied-de-biche'],['fuel / gas','carburant / essence'],['mask / gloves','masque / gants']] },
     { title:'Needs · les besoins', items:[['medicine','médicaments'],['supplies','provisions'],['friends','amis'],['safer place','endroit plus sûr'],['light','lumière'],['help','aide'],['shelter','abri'],['protection','protection'],['weapons','armes'],['fire / heat','feu / chaleur'],['clean water','eau propre'],['rest / sleep','repos / sommeil'],['escape plan','plan d\'évasion'],['transport (bike, car, truck)','transport (vélo, voiture, camion)'],['signal / communication','signal / communication'],['security','sécurité'],['information / news','informations'],['hope','espoir']] },
     { title:'Locations · les lieux', items:[['warehouse','entrepôt'],['school','école'],['forest','forêt'],['station','gare'],['supermarket','supermarché'],['hospital','hôpital'],['abandoned house','maison abandonnée'],['bunker','bunker'],['campsite','camping'],['gas station','station-service'],['police station','commissariat'],['alley','ruelle'],['rooftop','toit'],['bridge','pont'],['factory','usine'],['farm','ferme'],['river','rivière']] },
     { title:'Feelings · les sentiments', items:[['hungry','affamé.e'],['cold','avoir froid'],['tired','fatigué.e'],['scared','effrayé.e'],['safe','en sécurité'],['strong','fort.e'],['injured / hurt','blessé.e'],['sick / infected','malade / infecté.e'],['anxious / nervous','anxieux.se'],['hopeless','sans espoir'],['lost','perdu.e'],['desperate','au désespoir'],['alert','sur ses gardes'],['determined','déterminé.e'],['brave','courageux.se'],['cautious','prudent.e'],['exhausted','épuisé.e'],['hopeful','plein.e d\'espoir'],['lonely','seul.e'],['united','uni.e'],['relieved','soulagé.e'],['trapped','pris.e au piège']] } ],
   help:{ title:'HELP · A · SOME · ANY', rows:[['We have a knife.','Nous avons un couteau. (a = un / une, 1 objet)'],['We have some water.','Nous avons de l\'eau. (some = du, de la, des — phrase positive)'],['We don\'t have any food.','Nous n\'avons pas de nourriture. (any = de, aucun — phrase négative)'],['They have / They don\'t have','Ils / elles ont · Ils / elles n\'ont pas']] },
   levels:{
     A:{ title:'Je lis et je comprends', tag:'je lis la lettre', acts:[
       { id:'2A-1', type:'select', title:'Put the 5 events in order', en:'Put the 5 events in order. Choose 1 to 5.', fr:'Remets les 5 événements dans l\'ordre : choisis de 1 à 5.',
         items:[ {q:'The video freezes. · La vidéo se fige.', exp:'3'}, {q:'You choose 3 objects and leave home. · Vous choisissez 3 objets et quittez la maison.', exp:'1'}, {q:'You find a crumpled letter. · Vous trouvez une lettre froissée.', exp:'5'}, {q:'You arrive at an abandoned warehouse. · Vous arrivez dans un entrepôt abandonné.', exp:'4'}, {q:'You start walking in the dangerous streets. · Vous marchez dans les rues dangereuses.', exp:'2'} ].map(x => Object.assign(x, {opts:['1','2','3','4','5']})) },
       { id:'2A-2', type:'select', title:'True or false?', en:'Read the letter. True or false?', fr:'Lis la lettre. Vrai ou faux ?',
         items:[ {q:'They are hiding in a school.', exp:'False'}, {q:'They have some water.', exp:'True'}, {q:'They found a knife.', exp:'True'}, {q:'They can use electricity at night.', exp:'False'}, {q:'They hear strange noises.', exp:'True'} ].map(x => Object.assign(x, {opts:['True','False']})) },
       { id:'2A-3', type:'select', title:'Tick the right answer', en:'Tick the right answer.', fr:'Choisis la bonne réponse.',
         items:[ {q:'Who is the woman?', opts:['a doctor','a survivor','a guard'], exp:'a survivor'}, {q:'Where is she hiding?', opts:['in a forest','in a hospital','in a warehouse'], exp:'in a warehouse'}, {q:'Why did she write a note?', opts:['Because the transmission has a problem.','Because she wants to sell food.','Because she is bored.'], exp:'Because the transmission has a problem.'} ] },
       { id:'2A-4', type:'select', title:'Circle the right word', en:'Circle the right word: a, some or any.', fr:'Choisis le bon mot : a, some ou any.',
         items:[ {q:'They have ___ water.', exp:'some'}, {q:'They don\'t have ___ food.', exp:'any'}, {q:'We have ___ knife.', exp:'a'}, {q:'We don\'t have ___ electricity.', exp:'any'}, {q:'They have ___ blankets.', exp:'some'} ].map(x => Object.assign(x, {opts:['a','some','any']})) } ] },
     B:{ title:'Je complète', tag:'je complète le rapport', acts:[
       { id:'2B-1', type:'fill', title:'Complete the report', en:'Complete the sentences about the survivors in the letter, with the words in the list.', fr:'Complète les phrases sur les survivant.e.s de la lettre, avec les mots de la liste.',
         example:'Example · another group: They are in a school. They have a flashlight and some food. They don\'t have any water. They feel tired.',
         bank:[['warehouse','entrepôt'],['water','eau'],['backpack','sac à dos'],['electricity','électricité'],['cold','froid'],['scared','effrayé.e'],['strong','fort.e']],
         lines:[ ['They are in a ',{a:'warehouse'},'.'], ['They have some ',{a:'water'},' and a little food.'], ['They found a knife and a ',{a:'backpack'},'.'], ['They don\'t have any ',{a:'electricity'},'.'], ['The nights are ',{a:'cold'},'.'], ['They feel ',{a:'scared'},', but they stay ',{a:'strong'},'.'] ] } ] },
     C:{ title:'J\'écris', tag:'je décris mon groupe', acts:[
       { id:'2C-1', type:'write', title:'Write about you and your group', en:'Now write about you and your group: where are you? Imagine it!', fr:'Écris sur toi et ton groupe imaginaire. Où êtes-vous ? Imagine !',
         frames:['We are in a … next to …','We have a / some …','We don\'t have a / any …','We need …','We feel …'],
         ph:'We are in a … next to …\nWe have a / some …\nWe don\'t have a / any …\nWe need …\nWe feel ….',
         rubric:"Bloc 2 de la présentation finale. L'élève décrit son groupe imaginaire en 5 phrases : « We are in a [lieu] next to [lieu] », « We have a / some … », « We don't have a / any … », « We need … », « We feel … ». Vérifie surtout l'emploi correct de a / some / any (some en phrase positive, any en phrase négative, a pour un seul objet). ok = true si les 5 types de phrases sont présents et compréhensibles, même avec quelques fautes.", minWords:20,
         note:'Tu réutiliseras ces phrases dans ta présentation finale.' } ] }
   } },

 /* ───────────── ÉTAPE 3 ───────────── */
 { title:'Follow the clues', fr:'Suivre les indices', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:"Objectif : choisir ce qu'on prend dans la maison abandonnée et justifier.",
   intro:"The next morning, you leave the warehouse. After a long walk, you arrive at an old gas station. Everything looks destroyed. On the floor, you see a torn paper written in black ink. Read it!",
   introFr:"Le lendemain matin, tu quittes l'entrepôt. Après une longue marche, tu arrives à une vieille station-service. Tout semble détruit. Par terre, tu vois un papier déchiré, écrit à l'encre noire. Lis-le !",
   letter:{ en:"If you are reading this, you are not alone. There is a safe colony. But we cannot tell you directly — it is too dangerous. Others are watching. Follow the clues. If you succeed, you will find us… and maybe the cure.\n\nTo find the next safe place, you need the key. Count the chairs in the classroom and choose the right envelope.", fr:"Si vous lisez ceci, vous n'êtes pas seul.e.s. Il existe une colonie sûre. Mais nous ne pouvons pas vous le dire directement : c'est trop dangereux. D'autres nous observent. Suivez les indices. Si vous réussissez, vous nous trouverez… et peut-être le remède. Pour trouver le prochain lieu sûr, il vous faut la clé. Comptez les chaises de la classe et choisissez la bonne enveloppe.", title:'The clue' },
   vocab:[ { title:'Why? · pourquoi', items:REASONS }, { title:'Need · should', items:[['We need…','Nous avons besoin de…'],['We should take…','Nous devrions prendre…'],['We should not take…','Nous ne devrions pas prendre…']] } ],
   help:{ title:'HELP · NEED · SHOULD', rows:[['We need water because we are thirsty.','Nous avons besoin d\'eau parce que nous avons soif.'],['We should take the rope because we may need to climb.','Nous devrions prendre la corde parce qu\'on peut devoir grimper.'],['We should not take the teddy bear because it is not useful.','Nous ne devrions pas prendre le nounours parce que ce n\'est pas utile.']] },
   levels:{
     A:{ title:'Je lis et je décide', tag:'j\'ouvre la maison', acts:[
       { id:'3A-0', type:'qa', title:'Questions', en:'Read the letter and answer in French.', fr:'Lis la lettre et réponds en français.',
         clue:'🔎 CLUE · Count the chairs in the classroom and choose the right envelope.',
         questions:['Pourquoi l\'auteur ne dit-il pas où est la colonie ?','Que trouveras-tu si tu réussis ?','Que te faut-il pour trouver le prochain lieu sûr ?'],
         rubric:"Compréhension de la lettre. LETTRE : « If you are reading this, you are not alone. There is a safe colony. But we cannot tell you directly — it is too dangerous. Others are watching. Follow the clues. If you succeed, you will find us… and maybe the cure. To find the next safe place, you need the key. Count the chairs in the classroom and choose the right envelope. » QUESTIONS : 1) Pourquoi l'auteur ne dit-il pas où est la colonie ? (réponse : c'est trop dangereux / d'autres les observent) 2) Que trouveras-tu si tu réussis ? (la colonie / eux / peut-être le remède) 3) Que te faut-il pour trouver le prochain lieu sûr ? (la clé)." },
       { id:'3A-1', type:'select', title:'Take it or leave it?', en:'You found the key and open the old, dusty house. Which objects do you need? Take it or leave it?', fr:'Tu as trouvé la clé et tu ouvres la maison. Lesquels te sont utiles ? Tu prends ou tu laisses ?',
         items:[ ['canned food','nourriture en conserve','take'],['bottle of water','bouteille d\'eau','take'],['first aid kit','trousse de secours','take'],['flashlight','lampe de poche','take'],['backpack','sac à dos','take'],['map','carte','take'],['rope','corde','take'],['boots','bottes','take'],['broken chair','chaise cassée','leave'],['teddy bear','nounours','leave'],['empty bottles','bouteilles vides','leave'],['torn curtain','rideau déchiré','leave'],['broken radio','radio cassée','leave'] ].map(o => ({ q:o[0] + ' · ' + o[1], opts:['take','leave'], exp:o[2] })) } ] },
     B:{ title:'Je complète', tag:'je justifie', acts:[
       { id:'3B-1', type:'fill', title:'Complete the sentences', en:'Complete the sentences with the words in the lists.', fr:'Complète les phrases avec les mots des listes.',
         bank:[ ['flashlight','lampe de poche'],['first aid kit','trousse de secours'],['broken radio','radio cassée'],['rope','corde'],['map','carte'],['teddy bear','nounours'],
                ['because it is dark outside','parce qu\'il fait sombre dehors'],['because someone can get hurt','parce que quelqu\'un peut se blesser'],['because it does not work','parce que ça ne fonctionne pas'],['because we may need to climb','parce qu\'on peut devoir grimper'],['because we are hungry','parce que nous avons faim'],['because it is not useful','parce que ce n\'est pas utile'] ],
         banks:[[0,1,2,3,4,5],[6,7,8,9,10,11]],
         lines:[ ['Il fait nuit dehors. → We need the ',{a:'flashlight',b:0},' ',{a:'because it is dark outside',b:1},'.'],
                 ['Quelqu\'un peut se blesser. → We should take the ',{a:'first aid kit',b:0},' ',{a:'because someone can get hurt',b:1},'.'],
                 ['La radio ne marche plus. → We should not take the ',{a:'broken radio',b:0},' ',{a:['because it does not work','because it is broken'],b:1},'.'] ] } ] },
     C:{ title:'J\'écris', tag:'je choisis mes 5 objets', acts:[
       { id:'3C-1', type:'write', title:'You can carry only 5 objects', en:'You can carry only 5 objects. Write 4 sentences.', fr:'Tu ne peux porter que 5 objets. Écris 4 phrases.',
         frames:['We need … because …','We should take … because …','We should not take … because …','We need … and …'],
         ph:'We need … because …\nWe should take … because …\nWe should not take … because …\nWe need … and ….',
         rubric:"Bloc 3 de la présentation finale. Contexte : dans une maison abandonnée, le groupe ne peut porter que 5 objets (canned food, bottle of water, first aid kit, flashlight, backpack, map, rope, boots, broken chair, teddy bear, empty bottles, torn curtain, broken radio). L'élève écrit 4 phrases : « We need … because … », « We should take … because … », « We should not take … because … » (objet inutile ou cassé), « We need … and … ». ok = true si les 4 phrases existent avec des raisons cohérentes (on ne prend pas un objet cassé ou inutile, on prend un objet utile) dans un anglais compréhensible.", minWords:22,
         note:'Recopie ce dont ton groupe a besoin : tu réutiliseras cette phrase dans ta présentation finale.' } ] }
   } },

 /* ───────────── ÉTAPE 4 ───────────── */
 { title:'The colony gate', fr:'La porte de la colonie', skill:'CE + EE + EOC', lu:'Compréhension écrite (CE), Expression écrite (EE) et Expression orale en continu (EOC)',
   goal:"Objectif : remplir ta carte d'identité et dire ce que tu sais faire.",
   intro:"You leave the house quietly. The streets are empty, but the silence feels dangerous. Finally, you see high fences and lights. It is the colony! At the entrance, a guard stops you. He looks serious. He has 4 questions for you.",
   introFr:"Vous quittez la maison en silence. Les rues sont vides, mais le silence semble dangereux. Enfin, vous voyez de hautes clôtures et des lumières : c'est la colonie ! À l'entrée, un garde vous arrête. Il a l'air sérieux et il a 4 questions à vous poser.",
   vocab:[ { title:'Skills · les compétences', items:[['I can fix things','réparer des choses'],['I can cook','cuisiner'],['I can carry heavy things','porter des choses lourdes'],['I can run fast','courir vite'],['I can climb','grimper'],['I can swim','nager'],['I can drive','conduire'],['I can take care of children','m\'occuper d\'enfants'],['I can give first aid','donner les premiers secours'],['I can build a shelter','construire un abri'],['I can make a fire','faire du feu'],['I can find water','trouver de l\'eau'],['I can read a map','lire une carte'],['I can use a radio','utiliser une radio']] },
           { title:'I am… · je suis…', items:[['strong','fort.e'],['brave','courageux.se'],['calm','calme'],['careful','prudent.e'],['fast','rapide']] } ],
   help:{ title:'HELP · CAN + VERB', rows:[['I can cook. · We can fix things.','Je sais cuisiner. · Nous savons réparer des choses.'],['I can\'t swim. · She can run fast.','Je ne sais pas nager. · Elle court vite.'],['can + verbe, sans « to » ni « s »','I can cook (pas « I can to cook » ni « he cans »).']] },
   model:{ en:"Hello, my name is Sam. We are a group of survivors. We come from a school.\nWe have water, food and a knife. I can cook. I am strong.\nTogether, we can help the colony!" },
   levels:{
     A:{ title:'Je comprends', tag:'les questions du garde', acts:[
       { id:'4A-1', type:'select', title:'Match each question with an answer', en:'Match each question with an answer.', fr:'Relie chaque question à une réponse.',
         items:[ {q:'« Who are you? »', exp:'My name is Sam. I am sixteen.'}, {q:'« Where do you come from? »', exp:'We come from a school.'}, {q:'« What do you need? »', exp:'We need medicine and water.'}, {q:'« How can you help? »', exp:'I can cook and fix things.'} ].map(x => Object.assign(x, {opts:['My name is Sam. I am sixteen.','We come from a school.','We need medicine and water.','I can cook and fix things.']})) },
       { id:'4A-2', type:'select', title:'Circle the correct word', en:'Circle the correct word.', fr:'Choisis le bon mot.',
         items:[ {q:'I can ___ for the group.', opts:['cooks','cook','to cook'], exp:'cook'}, {q:'We can ___ radios.', opts:['to fix','fixing','fix'], exp:'fix'}, {q:'He can ___ fast.', opts:['run','runs','running'], exp:'run'} ] } ] },
     B:{ title:'Je remplis', tag:'ma carte d\'identité', acts:[
       { id:'4B-1', type:'idcard', title:'Fill in your ID card', en:'Fill in your ID card. You can invent: it must fit the story.', fr:'Remplis ta carte d\'identité. Tu peux inventer, du moment que cela reste cohérent avec l\'histoire.' },
       { id:'4B-2', type:'write', title:'Write it in sentences', en:'Write it in sentences.', fr:'Écris-le en phrases.',
         frames:['My name is …','I am … years old.','We come from …'],
         ph:'My name is …\nI am … years old.\nWe come from ….',
         rubric:"Bloc 4 (introduction). L'élève écrit 3 phrases à partir de sa carte d'identité (voir CONTEXTE) : « My name is … », « I am … years old », « We come from … ». ok = true si les 3 phrases sont présentes, cohérentes avec la carte, avec le verbe be correct (I am) et years old.", minWords:9, context:'idcard' } ] },
     C:{ title:'J\'écris et je lis', tag:'ce que je sais faire', acts:[
       { id:'4C-1', type:'write', title:'How can you help the colony?', en:'How can you help the colony? Write 3 sentences with the skills in the list. Then copy your 3 best skills.', fr:'Comment aider la colonie ? Écris 3 phrases avec les compétences de la liste. Puis recopie tes 3 meilleures compétences.',
         example:'Example: I can carry heavy things because I am strong.',
         frames:['I can … because I …','I can … because I …','I can … because I …','I can … . I can … . I am … .'],
         ph:'I can … because I …\nI can … because I …\nI can … because I …\nI can …. I can …. I am ….',
         rubric:"Bloc 4 (compétences). L'élève écrit 3 phrases « I can [verbe] because I am/can [raison] » (can + verbe sans to ni s), puis une ligne qui recopie ses 3 meilleures compétences (« I can … . I can … . I am … . »). ok = true si les 3 phrases avec can + verbe correct existent et si la ligne finale est présente, dans un anglais compréhensible.", minWords:20,
         note:'Tu réutiliseras ces compétences dans ta présentation finale.' },
       { id:'4C-2', type:'aloud', title:'Read this model aloud', en:'Read this model aloud 2 times.', fr:'Lis ce modèle à voix haute 2 fois.',
         checks:['I read it aloud 2 times. · Je l\'ai lu 2 fois à voix haute.','I read it again, more slowly and clearly. · Je l\'ai relu plus lentement et plus clairement.'],
         note:'C\'est un avant-goût de l\'étape finale : tu vas présenter ta propre version.' } ] }
   } },

 /* ───────────── ÉTAPE 5 ───────────── */
 { title:'Speak to the guard', fr:'Parler au garde', skill:'EE + EOC', lu:'Expression écrite (EE) et Expression orale en continu (EOC)',
   goal:"Objectif final : te présenter au garde de la colonie (qui tu es, ce que tu as, ce que tu sais faire, ce dont tu as besoin).",
   intro:"You stand in front of the gate. It is your turn: you have one minute to tell the guard who you are, what you have, what you can do and what you need.",
   introFr:"Tu es devant la porte. C'est ton tour : tu as une minute pour dire au garde qui tu es, ce que tu as, ce que tu sais faire et ce dont tu as besoin.",
   plan:[
     {n:1, key:'intro', title:'INTRODUCTION', from:'Bloc 4', en:'Hello, my name is …. We are a group of survivors. We come from ….', fr:'Bonjour, je m\'appelle … Nous sommes un groupe de survivant.e.s. Nous venons de …', ph:'Hello, my name is …' },
     {n:2, key:'res', title:'RESOURCES', from:'Blocs 1 et 2', en:'We have water, food and a knife. We also have a backpack and blankets.', fr:'Nous avons de l\'eau, de la nourriture et un couteau. Nous avons aussi un sac à dos et des couvertures.', ph:'We have …' },
     {n:3, key:'skills', title:'SKILLS', from:'Bloc 4', en:'I can fix things. I can cook. I am strong. Together, we can help the colony.', fr:'Je sais réparer des choses. Je sais cuisiner. Je suis fort.e. Ensemble, nous pouvons aider la colonie.', ph:'I can …' },
     {n:4, key:'needs', title:'NEEDS', from:'Blocs 2 et 3', en:'We need medicine and a safe place to sleep. We are tired and scared, but we are ready to fight to survive.', fr:'Nous avons besoin de médicaments et d\'un endroit sûr pour dormir. Nous sommes fatigué.e.s et effrayé.e.s, mais prêt.e.s à nous battre pour survivre.', ph:'We need …' },
     {n:5, key:'end', title:'CONCLUSION', from:'À copier', en:'Please, let us join your colony. We want to survive with you. We can help, and together we will be stronger.', fr:'S\'il vous plaît, laissez-nous rejoindre votre colonie. Nous voulons survivre avec vous. Nous pouvons aider, et ensemble nous serons plus fort.e.s.', ph:'Please, let us join your colony …' } ],
   vocab:[ { title:'Link words · pour relier', items:[['and','et'],['also','aussi'],['but','mais'],['because','parce que'],['together','ensemble']] } ],
   levels:{
     A:{ title:'J\'écris mon discours', tag:'je réutilise mes blocs', acts:[
       { id:'5A-1', type:'speech', title:'Write your speech', en:'Write your speech. Reuse your blocks, part by part.', fr:'Écris ton discours. Réutilise tes blocs, partie par partie : environ une minute, une dizaine de phrases.',
         rubric:"Présentation finale au garde de la colonie, en 5 parties : 1 INTRODUCTION (nom, groupe, d'où ils viennent), 2 RESOURCES (ce qu'ils ont : We have …), 3 SKILLS (ce que l'élève sait faire : I can … / I am …), 4 NEEDS (ce dont le groupe a besoin : We need …), 5 CONCLUSION (demande polie pour rejoindre la colonie). Environ 10 phrases. ok = true si les 5 parties sont présentes et compréhensibles (fautes mineures tolérées).", minWords:40 } ] },
     B:{ title:'Je m\'entraîne à dire', tag:'je lis à voix haute', acts:[
       { id:'5B-1', type:'words', title:'Practise the hard words', en:'Practise the hard words. Say each word 3 times.', fr:'Entraîne-toi sur les mots difficiles : dis chaque mot 3 fois, puis coche. Les majuscules montrent la syllabe la plus forte.',
         words:[['survivors','sur-VI-vors'],['warehouse','WARE-house'],['blankets','BLAN-kets'],['because','be-CAUSE'],['medicine','MED-i-cine'],['together','to-GE-ther'],['stronger','STRONG-er'],['backpack','BACK-pack'],['colony','COL-o-ny'],['scared','SCARED'],['exhausted','ex-HAUST-ed'],['flashlight','FLASH-light']] },
       { id:'5B-2', type:'aloud', title:'Read your speech aloud 3 times', en:'Read your speech aloud 3 times.', fr:'Lis ton discours à voix haute 3 fois.',
         showSpeech:true,
         checks:['1 · Read your speech aloud, with your sheet. · Avec ta feuille.','2 · Say it again, only with the key words. · Avec les mots-clés seulement.','3 · Say it without your sheet. · Sans ta feuille.'] } ] },
     C:{ title:'Je me présente au garde', tag:'je parle', acts:[
       { id:'5C-1', type:'record', title:'Present yourself to the guard', en:'Present yourself to the guard (your teacher) or record a voice message. Then check.', fr:'Présente-toi au garde (ton enseignant.e) ou enregistre un message vocal. Puis vérifie.',
         checks:['I said my name and where we come from. · J\'ai dit mon nom et d\'où nous venons.','I said what we have. · J\'ai dit ce que nous avons.','I said 2 things I can do. · J\'ai dit 2 choses que je sais faire.','I said what we need. · J\'ai dit ce dont nous avons besoin.','I spoke clearly and I looked at the guard. · J\'ai parlé clairement et j\'ai regardé le garde.'] } ] }
   } }
];

const course = {
  id:'survival-challenge',
  title:'Video Game: Survival Challenge',
  subtitle:'Win challenges and save the world',
  studentPage:'cours-survival.html',
  steps: STEPS.map((s, i) => ({ n:i + 1, title:s.title, skill:s.skill, lu:s.lu, goal:s.goal,
    levels: Object.fromEntries(['A','B','C'].map(L => [L, { title:s.levels[L].title, tag:s.levels[L].tag, qs:s.levels[L].acts.map(a => ({ id:a.id, prompt:s.title + ' — ' + L + ' — ' + a.title })) }])) }))
};
course.allQuestions = [];
course.steps.forEach(s => ['A','B','C'].forEach(L => s.levels[L].qs.forEach((q, k) => { q.step = s.n; q.level = L; q.index = k; course.allQuestions.push(q); })));

window.SURVIVAL_COURSE = course;
window.SURVIVAL_DATA = { MISSION, LEARN, STEPS, ROLES, GROUPS, OBJECTS };
})();
