/*
  Grammar Boost — petit parcours d'aide en grammaire anglaise (autonomie).
  12 points de grammaire ; l'élève choisit ses difficultés, puis pour chaque point :
  WARM-UP (leçon courte) → ROUND A (QCM) → ROUND B (compléter avec la liste) → ROUND C (3-4 phrases, correction IA).
  Partagé par la page élève (cours-grammar.html) et le suivi enseignante (cours-suivi.html).
  Identifiants de réponses : 'pick' (difficultés choisies) puis '<clé>-A-1', '<clé>-B-1', '<clé>-C-1'.
*/
(function(){

const MISSION = `Choisis tes **points difficiles**, puis entraîne-toi **round après round**.`;
const MISSION_FR = `Pour chaque point : une **leçon courte**, puis **3 rounds** pour t'entraîner.`;

/* A : 4 QCM {q, opts, ans}   B : liste de 4 mots + 4 trous   C : 3-4 phrases corrigées par l'IA */
const POINTS = [
 { key:'pron', icon:'🙋', title:'Les pronoms personnels sujets', tag:'I · you · he · she · we · they',
   lesson:{
     rules:[`Le **pronom sujet** dit **qui fait l'action**. En anglais, on ne peut **jamais l'oublier** : **I am** tired.`, `**It** = une chose ou un animal. **You** = tu ou vous. **They** = ils ou elles.`],
     table:{ head:['Pronom','En français'], rows:[['I','je'],['you','tu / vous'],['he','il (un garçon, un homme)'],['she','elle (une fille, une femme)'],['it','il / elle (une chose, un animal)'],['we','nous'],['they','ils / elles']] },
     examples:[['She is my sister.','Elle est ma sœur.'],['They are at school.','Ils sont à l\'école.'],['We like football.','Nous aimons le foot.'],['It is a big dog.','C\'est un gros chien.']] },
   A:[ { q:'My brother is tall. ___ plays basketball.', opts:['She','He','It','We'], ans:1 },
       { q:'Mia and Zoe are friends. ___ like music.', opts:['She','It','They','He'], ans:2 },
       { q:'The phone is new. ___ is very fast.', opts:['They','It','He','She'], ans:1 },
       { q:'My mum and I are at home. ___ cook dinner.', opts:['He','She','It','We'], ans:3 } ],
   B:{ list:['I','she','they','we'], lines:[['___ am happy today.'],['My sister is a nurse. ___ works at the hospital.'],['Léo and Max are brothers. ___ live in Lyon.'],['Anna and I are friends. ___ play tennis.']], ans:['I','she','they','we'] },
   C:{ title:'Round C · Présente 3 personnes', instruct:'Présente 3 personnes de ta famille ou de tes proches : une avec **he**, une avec **she**, une avec **they**. Écris 3 ou 4 phrases courtes.', ph:'My cousin is 12. ...', minWords:10,
       rubric:`POINT DE GRAMMAIRE : pronoms personnels sujets (he, she, they). Le texte doit faire 3 à 4 phrases courtes qui présentent des personnes. ok = true si he est utilisé pour un garçon ou un homme, she pour une fille ou une femme, et they pour plusieurs personnes, correctement, au moins une fois chacun, sans pronom sujet oublié ni confondu (ex. "is my brother" sans sujet, ou "she" pour un garçon). Ne vérifie QUE les pronoms sujets : ignore les autres petites fautes.` } },

 { key:'be', icon:'🧍', title:'Le verbe « to be »', tag:'I am · she is · they are',
   lesson:{
     rules:[`**To be** = être. Il change : **am** (I), **is** (he, she, it), **are** (you, we, they).`, `Pour l'**âge**, on utilise **to be** : **I am** 15 (et pas « I have 15 »).`, `Négation : **not** (isn't, aren't). Question : on met **am / is / are** au début.`],
     table:{ head:['Pronom','to be','Forme courte'], rows:[['I','am','I\'m'],['he / she / it','is','he\'s / she\'s / it\'s'],['you / we / they','are','you\'re / we\'re / they\'re']] },
     examples:[['I am 16.','J\'ai 16 ans.'],['She is a teacher.','Elle est prof.'],['They are not at home.','Ils ne sont pas à la maison.'],['Are you tired?','Tu es fatigué.e ?']] },
   A:[ { q:'My mum ___ a nurse.', opts:['are','is','am','be'], ans:1 },
       { q:'We ___ in the same class.', opts:['is','am','are','be'], ans:2 },
       { q:'I ___ 17 years old.', opts:['have','am','is','are'], ans:1 },
       { q:'___ you hungry?', opts:['Is','Do','Are','Am'], ans:2 } ],
   B:{ list:['am','is','are','be'], lines:[['I ___ 16 years old.'],['Nina ___ my best friend.'],['My parents ___ at work now.'],['I want to ___ a vet.']], ans:['am','is','are','be'] },
   C:{ title:'Round C · Présente-toi', instruct:'Écris 4 phrases pour te présenter : ton prénom, ton âge, d\'où tu viens et un adjectif pour te décrire.', ph:'My name is ...', minWords:10,
       rubric:`POINT DE GRAMMAIRE : le verbe to be au présent (am, is, are, I'm...). Le texte doit présenter l'élève en 3 à 4 phrases (prénom, âge, origine, adjectif). ok = true si to be est utilisé correctement dans au moins 3 phrases, y compris pour l'âge ("I am 16", jamais "I have 16 years"). Ne vérifie QUE to be : ignore l'orthographe et les autres fautes.` } },

 { key:'present', icon:'🔁', title:'Le présent simple', tag:'she plays · I don\'t like · do you…?',
   lesson:{
     rules:[`On parle des **habitudes** et de ce qui est **vrai tout le temps**.`, `À **he / she / it**, on ajoute **-s** au verbe : she play**s**.`, `Négation et question : **do / does** + verbe de base. Après **does**, plus de -s : **Does** he play ?`],
     table:{ head:['Pronom','Verbe play','Négation'], rows:[['I / you / we / they','play',"don't play"],['he / she / it','play**s**',"doesn't play"]] },
     examples:[['I walk to school.','Je vais à l\'école à pied.'],['My brother plays football.','Mon frère joue au foot.'],['She doesn\'t eat meat.','Elle ne mange pas de viande.'],['Do you like pizza?','Tu aimes la pizza ?']] },
   A:[ { q:'My sister ___ to the gym on Monday.', opts:['gos','go','goes','going'], ans:2 },
       { q:'They ___ TV in the evening.', opts:['watch','watches','watching','watched'], ans:0 },
       { q:'He doesn\'t ___ coffee.', opts:['likes','liking','liked','like'], ans:3 },
       { q:'___ your mum work on Saturday?', opts:['Do','Does','Is','Are'], ans:1 } ],
   B:{ list:['plays','live',"doesn't",'do'], lines:[['My brother ___ video games every day.'],['My cousins ___ in Spain.'],['She ___ like spicy food.'],['___ you live near the school?']], ans:['plays','live',"doesn't",'do'] },
   C:{ title:'Round C · Mes habitudes', instruct:'Écris 4 phrases : 2 sur tes habitudes (ce que **tu** fais) et 2 sur les habitudes d\'une personne de ta famille (ce qu\'**il** ou **elle** fait).', ph:'I get up at 7. My dad ...', minWords:12,
       rubric:`POINT DE GRAMMAIRE : le présent simple. Le texte doit faire 3 à 4 phrases sur des habitudes (l'élève et une autre personne). ok = true si le verbe prend -s (ou -es, has, goes...) avec he / she / it / un nom singulier dans au moins 2 phrases, et reste à la forme de base avec I / they / we, sans erreur du type "does + verbe avec -s". Ne vérifie QUE ce point : ignore l'orthographe et le vocabulaire.` } },

 { key:'poss', icon:'🎒', title:'L\'appartenance (my, your, his… et \'s)', tag:'my bag · her brother · Tom\'s phone',
   lesson:{
     rules:[`**my, your, his, her, its, our, their** se placent **devant le nom** et s'accordent avec **celui qui possède** : **his** mother = la mère **de lui**.`, `**'s** veut dire « de » : **Tom's** bag = le sac **de Tom**.`],
     table:{ head:['Pronom','Adjectif possessif','En français'], rows:[['I','my','mon / ma / mes'],['you','your','ton / ta / tes / votre'],['he','his','son / sa / ses (à lui)'],['she','her','son / sa / ses (à elle)'],['it','its','son / sa / ses (chose, animal)'],['we','our','notre / nos'],['they','their','leur / leurs']] },
     examples:[['This is my phone.','C\'est mon téléphone.'],['Her brother is tall.','Son frère (à elle) est grand.'],['It\'s Sara\'s bike.','C\'est le vélo de Sara.'],['Their house is big.','Leur maison est grande.']] },
   A:[ { q:'Lisa has a red bag. It is ___ bag.', opts:['his','my','her','their'], ans:2 },
       { q:'My friends and I have a coach. ___ coach is nice.', opts:['Their','Her','His','Our'], ans:3 },
       { q:'That is ___ phone.', opts:['Marc','Marcs','Marc\'s','Marcs\''], ans:2 },
       { q:'Zoe and Max live here. This is ___ house.', opts:['their','her','our','his'], ans:0 } ],
   B:{ list:['my','her','its','their'], lines:[['I am Sam. ___ dog is called Max.'],['Look at Nina. ___ hair is long.'],['Look at the new phone. ___ screen is big.'],['Mia and Tom are here. ___ bags are red.']], ans:['my','her','its','their'] },
   C:{ title:'Round C · Mes affaires, tes affaires', instruct:'Écris 4 phrases : 2 sur **tes** affaires ou ta famille, et 2 sur les affaires ou la famille d\'**une autre personne** (ou de plusieurs personnes).', ph:'My phone is ...', minWords:12,
       rubric:`POINT DE GRAMMAIRE : adjectifs possessifs (my, your, his, her, its, our, their) et 's. Le texte doit faire 3 à 4 phrases sur ce qui appartient à l'élève et à d'autres personnes. ok = true si les adjectifs possessifs sont choisis d'après le POSSESSEUR (his pour un garçon, her pour une fille, their pour plusieurs) dans au moins 3 phrases, et si 's est bien utilisé quand il y en a un. Ne vérifie QUE ce point : ignore les autres petites fautes.` } },

 { key:'past', icon:'⏪', title:'Le prétérit (verbes réguliers et irréguliers)', tag:'played · went · didn\'t see',
   lesson:{
     rules:[`On parle du **passé fini** (yesterday, last week…).`, `**Réguliers** : verbe + **-ed** (play → play**ed**). **Irréguliers** : forme à apprendre (go → **went**).`, `Négation et question : **did** + verbe de base : I **didn't** go. **Did** you go ?`],
     table:{ head:['Verbe','Passé','En français'], rows:[['play','played','jouer'],['watch','watched','regarder'],['go','went','aller'],['see','saw','voir'],['have','had','avoir'],['eat','ate','manger']] },
     examples:[['I played football yesterday.','J\'ai joué au foot hier.'],['She went to Paris last year.','Elle est allée à Paris l\'an dernier.'],['We didn\'t watch TV.','Nous n\'avons pas regardé la télé.'],['Did you eat lunch?','Tu as mangé ?']] },
   A:[ { q:'Yesterday, I ___ to the cinema.', opts:['go','goed','went','going'], ans:2 },
       { q:'She ___ football last Sunday.', opts:['plays','played','play','playd'], ans:1 },
       { q:'Last Friday, we ___ a pizza.', opts:['ate','eat','eated','eats'], ans:0 },
       { q:'He didn\'t ___ the film.', opts:['watched','watch','watches','watching'], ans:1 } ],
   B:{ list:['went','played','saw','did'], lines:[['Last summer, I ___ to Spain.'],['Yesterday, my brother ___ football with his friends.'],['Last night, we ___ a very good film at the cinema.'],['___ you eat lunch at school yesterday?']], ans:['went','played','saw','did'] },
   C:{ title:'Round C · Mon dernier week-end', instruct:'Raconte ton dernier week-end en 4 phrases : 3 choses que tu **as faites** et 1 chose que tu **n\'as pas faite**.', ph:'Last weekend, I ...', minWords:12,
       rubric:`POINT DE GRAMMAIRE : le prétérit (past simple). Le texte doit faire 3 à 4 phrases au passé sur le dernier week-end, dont une négative. ok = true si au moins 3 verbes sont bien au prétérit (-ed ou forme irrégulière correcte : went, saw, had, ate...) et si la phrase négative utilise didn't + verbe de base. Pas de présent à la place du passé. Ne vérifie QUE ce point : ignore l'orthographe et le vocabulaire.` } },

 { key:'art', icon:'📦', title:'Les articles a / an / the', tag:'a dog · an apple · the sun',
   lesson:{
     rules:[`**a** devant un **son consonne** (a book). **an** devant un **son voyelle** (an apple). On regarde le **son**, pas la lettre : **an** hour, **a** university.`, `**a / an** = une chose parmi d'autres (première fois). **the** = une chose connue ou unique : I have a cat. **The** cat is black.`],
     table:{ head:['Article','Quand ?','Exemple'], rows:[['a','son consonne','a book, a school'],['an','son voyelle','an apple, an hour'],['the','chose connue ou unique','the sun, the teacher']] },
     examples:[['I have a dog.','J\'ai un chien.'],['She eats an apple.','Elle mange une pomme.'],['The dog is in the garden.','Le chien est dans le jardin.'],['He is an engineer.','Il est ingénieur.']] },
   A:[ { q:'My dad is ___ electrician.', opts:['some','a','an','two'], ans:2 },
       { q:'I have ___ big dog.', opts:['an','a','three','many'], ans:1 },
       { q:'Tom has a dog. ___ dog is very big.', opts:['The','An','Two','Many'], ans:0 },
       { q:'I wait for ___ hour.', opts:['a','three','an','many'], ans:2 } ],
   B:{ list:['a','an','the','some'], lines:[['There is ___ cat on the sofa.'],['There is ___ umbrella in my bag.'],['There is ___ milk in the fridge.'],['___ sun is hot today.']], ans:['a','an','some','the'] },
   C:{ title:'Round C · Mon sac', instruct:'Décris le contenu de ton sac (ou de ta chambre) en 4 phrases. Utilise **a**, **an** et **the**.', ph:'In my bag, there is a ...', minWords:12,
       rubric:`POINT DE GRAMMAIRE : les articles a / an / the. Le texte doit faire 3 à 4 phrases qui décrivent un sac ou une chambre. ok = true si a / an sont bien choisis d'après le son (a book, an apple), si the est utilisé pour une chose déjà citée ou unique, et s'il n'y a pas d'article oublié devant un nom singulier dénombrable dans au moins 3 phrases. Ne vérifie QUE les articles : ignore les autres petites fautes.` } },

 { key:'plural', icon:'👥', title:'Le pluriel des noms', tag:'books · boxes · children',
   lesson:{
     rules:[`En général : nom + **-s** (a book → book**s**).`, `Après **s, x, ch, sh** : **-es** (a box → box**es**). Consonne + **y** : **-ies** (a city → cit**ies**).`, `Des pluriels **irréguliers** sont à apprendre : man → **men**, child → **children**.`],
     table:{ head:['Singulier','Pluriel'], rows:[['book','books'],['box','boxes'],['city','cities'],['child','children'],['man / woman','men / women'],['person','people']] },
     examples:[['I have two brothers.','J\'ai deux frères.'],['There are three boxes.','Il y a trois boîtes.'],['The children are happy.','Les enfants sont contents.'],['My friends live in big cities.','Mes ami.e.s vivent dans de grandes villes.']] },
   A:[ { q:'I have three ___.', opts:['box','boxs','boxes','boxies'], ans:2 },
       { q:'There are two ___ in the car.', opts:['children','child','childs','childes'], ans:0 },
       { q:'Paris and Lyon are big ___.', opts:['citys','cities','city','cityes'], ans:1 },
       { q:'Five ___ are in the room.', opts:['mens','man','mans','men'], ans:3 } ],
   B:{ list:['books','boxes','cities','people'], lines:[['I read two ___ every month.'],['We put the shoes in two big ___.'],['London and Paris are big ___.'],['Many ___ live in my street.']], ans:['books','boxes','cities','people'] },
   C:{ title:'Round C · Au pluriel', instruct:'Écris 4 phrases sur ta famille, tes ami.e.s ou ce que tu as dans ton sac. Utilise au moins 4 noms au **pluriel**, dont un pluriel **irrégulier**.', ph:'In my bag, I have two ...', minWords:12,
       rubric:`POINT DE GRAMMAIRE : le pluriel des noms. Le texte doit faire 3 à 4 phrases contenant au moins 4 noms au pluriel. ok = true si au moins 3 pluriels sont corrects (-s, -es, -ies) et si les pluriels irréguliers utilisés sont corrects (children, men, women, people, feet, teeth...). Ne vérifie QUE le pluriel des noms : ignore les autres petites fautes.` } },

 { key:'quest', icon:'❓', title:'Poser une question', tag:'Where do you live? · Does she…?',
   lesson:{
     rules:[`Ordre : **mot interrogatif** + **do / does / did** + sujet + verbe de base ? Where **do** you live ?`, `Avec **to be**, on inverse : **Are** you tired ? Why **is** she sad ?`],
     table:{ head:['Mot','En français'], rows:[['What','quoi / que'],['Where','où'],['When','quand'],['Who','qui'],['Why','pourquoi'],['How','comment']] },
     examples:[['Where do you live?','Où habites-tu ?'],['What does he like?','Qu\'est-ce qu\'il aime ?'],['Did she call you?','Est-ce qu\'elle t\'a appelé.e ?'],['Why are they late?','Pourquoi sont-ils en retard ?']] },
   A:[ { q:'— ___ is your birthday? — It is in May.', opts:['Where','When','Who','Why'], ans:1 },
       { q:'Choose the right question.', opts:['Where do you live?','Where you live?','Where does you live?','Where you do live?'], ans:0 },
       { q:'___ she like pizza?', opts:['Do','Is','Does','Are'], ans:2 },
       { q:'Why ___ they late today?', opts:['is','do','does','are'], ans:3 } ],
   B:{ list:['do','does','did','is'], lines:[['Where ___ you live now?'],['What ___ your brother do on Sundays?'],['___ you watch the film yesterday?'],['Why ___ she sad today?']], ans:['do','does','did','is'] },
   C:{ title:'Round C · Mes questions', instruct:'Tu rencontres un.e élève d\'une autre école. Écris 4 questions à lui poser, avec des mots interrogatifs différents.', ph:'Where ...', minWords:10,
       rubric:`POINT DE GRAMMAIRE : poser une question. Le texte doit contenir 3 à 4 questions adressées à un.e élève. ok = true si au moins 3 questions sont bien formées (mot interrogatif + do / does / did ou to be inversé + sujet + verbe de base, bon ordre des mots) et si au moins 3 mots interrogatifs différents sont utilisés. Ne vérifie QUE la formation des questions : ignore l'orthographe et le vocabulaire.` } },

 { key:'prep', icon:'📍', title:'Les prépositions in / on / at', tag:'in May · on Monday · at 8 o\'clock',
   lesson:{
     rules:[`**in** = **dans** un espace ou une période longue. **on** = **sur** / un **jour** précis. **at** = un **point** précis, une **heure**.`],
     table:{ head:['','Lieu','Temps'], rows:[['in','in France, in the bag','in May, in 2024'],['on','on the table, on the wall','on Monday, on 5 May'],['at','at school, at home','at 8 o\'clock, at night']] },
     examples:[['My phone is on the table.','Mon téléphone est sur la table.'],['I get up at 7 o\'clock.','Je me lève à 7 h.'],['School starts in September.','L\'école commence en septembre.'],['We have English on Tuesday.','On a anglais le mardi.']] },
   A:[ { q:'My birthday is ___ June.', opts:['on','at','in','to'], ans:2 },
       { q:'The lesson starts ___ 8 o\'clock.', opts:['at','in','on','to'], ans:0 },
       { q:'I play football ___ Saturday.', opts:['at','in','to','on'], ans:3 },
       { q:'I live ___ France.', opts:['in','at','on','of'], ans:0 } ],
   B:{ list:['in','on','at'], lines:[['I have maths ___ Friday.'],['The film starts ___ 9 o\'clock.'],['My uncle lives ___ Italy.'],['Mum is ___ home today.']], ans:['on','at','in','at'] },
   C:{ title:'Round C · Ma semaine', instruct:'Écris 4 phrases sur ta semaine : où tu es et à quel moment.', ph:'On Monday, I am at ...', minWords:12,
       rubric:`POINT DE GRAMMAIRE : prépositions de lieu et de temps in / on / at. Le texte doit faire 3 à 4 phrases sur la semaine de l'élève (lieux et moments). ok = true si in / on / at sont bien choisis dans au moins 3 cas (on + jour, at + heure, in + mois ou année ou pays ou ville, at + school / home / work). Ne vérifie QUE ces prépositions : ignore les autres petites fautes.` } },

 { key:'comp', icon:'🏆', title:'Comparatif et superlatif', tag:'taller than · the fastest · more expensive',
   lesson:{
     rules:[`**Adjectif court** : **-er** / **the -est** (fast → fast**er** → the fast**est**). **Adjectif long** : **more** / **the most** (**more** expensive).`, `On compare avec **than**. Irréguliers : good → **better** → **the best**.`],
     table:{ head:['Adjectif','Comparatif','Superlatif'], rows:[['tall','taller','the tallest'],['big','bigger','the biggest'],['expensive','more expensive','the most expensive'],['good','better','the best']] },
     examples:[['My brother is taller than me.','Mon frère est plus grand que moi.'],['This phone is more expensive than that one.','Ce téléphone est plus cher que celui-là.'],['She is the fastest in the class.','Elle est la plus rapide de la classe.'],['This is the best pizza!','C\'est la meilleure pizza !']] },
   A:[ { q:'Léo is ___ than his sister.', opts:['tallest','tall','more tall','taller'], ans:3 },
       { q:'This film is ___ than the book.', opts:['more interesting','interestinger','most interesting','interesting'], ans:0 },
       { q:'She is ___ runner in the team.', opts:['faster','fast','the fastest','more fast'], ans:2 },
       { q:'My notes are ___ than yours.', opts:['good','better','best','gooder'], ans:1 } ],
   B:{ list:['older','the tallest','more expensive','the best'], lines:[['Grandpa is 80. Dad is 50. Grandpa is ___ than Dad.'],['A new car costs 20 000 euros. A bike costs 300. The car is ___ than the bike.'],['In the class, Mia is number 1 for singing. She is ___ singer.'],['The Eiffel Tower is 330 m. The other buildings in Paris are 100 m or less. It is ___ building in Paris.']], ans:['older','more expensive','the best','the tallest'] },
   C:{ title:'Round C · Qui est le plus… ?', instruct:'Écris 4 phrases : compare 2 personnes ou 2 objets (2 phrases), puis dis qui ou quoi est **le plus…** dans un groupe (2 phrases).', ph:'My phone is ...', minWords:14,
       rubric:`POINT DE GRAMMAIRE : comparatif et superlatif. Le texte doit faire 3 à 4 phrases : des comparaisons de deux éléments puis des superlatifs. ok = true si au moins un comparatif correct (-er than ou more ... than, ou better / worse than) et au moins un superlatif correct (the -est ou the most ..., ou the best / the worst) sont utilisés, sans erreur du type "more taller" ou "the most big". Ne vérifie QUE ce point : ignore les autres petites fautes.` } },

 { key:'there', icon:'🛋️', title:'There is / There are', tag:'There is a… · There are two… · Is there…?',
   lesson:{
     rules:[`On dit **ce qu'il y a** quelque part. **There is** + 1 chose. **There are** + plusieurs choses.`, `Négation : there **isn't** / there **aren't** any. Question : **Is there** … ? / **Are there** … ?`],
     table:{ head:['','1 chose','Plusieurs choses'], rows:[['Phrase','There is a book.','There are two books.'],['Négation',"There isn't a book.","There aren't any books."],['Question','Is there a book?','Are there any books?']] },
     examples:[['There is a park near my house.','Il y a un parc près de chez moi.'],['There are two bikes in the garage.','Il y a deux vélos dans le garage.'],['There isn\'t a bank here.','Il n\'y a pas de banque ici.'],['Are there any shops?','Y a-t-il des magasins ?']] },
   A:[ { q:'___ a cinema in my town.', opts:['There are','There is','It is','They are'], ans:1 },
       { q:'There ___ three chairs in the room.', opts:['is','be','are','am'], ans:2 },
       { q:'___ there a bus stop near here?', opts:['Is','Are','Do','Does'], ans:0 },
       { q:'There ___ any shops in my street.', opts:['is','aren\'t','isn\'t','are'], ans:1 } ],
   B:{ list:['is','are',"isn't","aren't"], lines:[['Look! There ___ a dog in the garden.'],['Look! There ___ five students here.'],['The room is empty. There ___ any chairs.'],['The street is empty. There ___ a car.']], ans:['is','are',"aren't","isn't"] },
   C:{ title:'Round C · Ma chambre', instruct:'Décris ta chambre ou ton quartier : 3 phrases sur ce qu\'il y a, et 1 phrase sur ce qu\'il n\'y a **pas**.', ph:'In my room, ...', minWords:12,
       rubric:`POINT DE GRAMMAIRE : there is / there are. Le texte doit faire 3 à 4 phrases qui décrivent une chambre ou un quartier, dont une phrase négative. ok = true si there is est utilisé avec un seul élément, there are avec plusieurs, et si la phrase négative utilise there isn't / there aren't (ou there is no) correctement, dans au moins 3 phrases. Ne vérifie QUE ce point : ignore les autres petites fautes.` } },

 { key:'objpron', icon:'🫱', title:'Les pronoms compléments (me, him, her, them…)', tag:'I love him · help me · with us',
   lesson:{
     rules:[`Après un **verbe** ou une **préposition**, on utilise le **pronom complément** : I love **him**. Come with **us**.`, `Ne confonds pas **I** (sujet) et **me** (complément) : **I** help him / he helps **me**.`],
     table:{ head:['Sujet','Complément','En français'], rows:[['I','me','me / moi'],['you','you','te / vous'],['he','him','le / lui'],['she','her','la / lui'],['it','it','le / la'],['we','us','nous'],['they','them','les / leur / eux']] },
     examples:[['I love him.','Je l\'aime.'],['Can you help me?','Peux-tu m\'aider ?'],['She talks to them every day.','Elle leur parle tous les jours.'],['Look at us!','Regarde-nous !']] },
   A:[ { q:'My sister is nice. I love ___.', opts:['she','he','her','hers'], ans:2 },
       { q:'Tom is my friend. I play with ___.', opts:['him','he','his','they'], ans:0 },
       { q:'My parents are strict. I listen to ___.', opts:['us','they','their','them'], ans:3 },
       { q:'Can you help ___, please? I am lost.', opts:['I','me','my','mine'], ans:1 } ],
   B:{ list:['me','him','them','us'], lines:[['I can\'t see the board. Can you help ___?'],['My brother and I are late. The teacher is looking at ___.'],['My cousins are funny. I often visit ___.'],['Tom is nice. I like ___.']], ans:['me','us','them','him'] },
   C:{ title:'Round C · Les gens que je connais', instruct:'Écris 4 phrases sur des personnes que tu connais (ton frère, tes ami.e.s…). Dans chaque phrase, utilise un pronom complément : **him**, **her**, **them**, **us** ou **me**.', ph:'I often call ...', minWords:12,
       rubric:`POINT DE GRAMMAIRE : les pronoms compléments (me, you, him, her, it, us, them). Le texte doit faire 3 à 4 phrases où un pronom complément remplace une personne. ok = true si au moins 3 pronoms compléments sont corrects et bien choisis (him pour un garçon, her pour une fille, them pour plusieurs, us pour "nous", me pour l'élève), sans pronom sujet utilisé à la place (ex. "I love he", "help I"). Ne vérifie QUE ce point : ignore les autres petites fautes.` } }
];

/* Descriptions utilisées par le suivi (une entrée par point, n = rang du point dans cette liste) */
const course = {
  id:'grammar-boost',
  title:'Grammar Boost',
  subtitle:'Un coup de pouce en grammaire anglaise',
  studentPage:'cours-grammar.html',
  pick:{ id:'pick', prompt:'Quelles sont tes difficultés ?' },
  steps: POINTS.map((p, i) => ({ n:i + 1, key:p.key, chip:p.icon, title:p.title, skill:'Grammaire', lu:'', goal:p.title,
    levels:{
      A:{ title:'Round A', tag:'QCM', qs:[{id:p.key + '-A-1', prompt:p.title + ' — Round A (QCM)'}] },
      B:{ title:'Round B', tag:'je complète avec la liste', qs:[{id:p.key + '-B-1', prompt:p.title + ' — Round B (compléter)'}] },
      C:{ title:'Round C', tag:'j\'écris 3-4 phrases', qs:[{id:p.key + '-C-1', prompt:p.title + ' — Round C (phrases : ' + p.C.instruct.replace(/\*\*/g, '') + ')'}] } } }))
};
course.allQuestions = [{ id:'pick', step:0, level:'—', index:0, prompt:'Quelles sont tes difficultés ?' }];
course.steps.forEach(s => ['A','B','C'].forEach(L => s.levels[L].qs.forEach((q, k) => { q.step = s.n; q.level = L; q.index = k; course.allQuestions.push(q); })));

window.GRAMMAR_COURSE = course;
window.GRAMMAR_DATA = { MISSION, MISSION_FR, POINTS };
})();
