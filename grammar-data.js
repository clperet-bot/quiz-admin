/*
  Grammar Boost — petit parcours d'aide en grammaire anglaise (autonomie).
  12 points de grammaire ; l'élève choisit ses difficultés, puis pour chaque point :
  WARM-UP (leçon courte) → ROUND A (QCM) → ROUND B (compléter avec la liste) → ROUND C (3-4 phrases, correction IA).
  Partagé par la page élève (cours-grammar.html) et le suivi enseignante (cours-suivi.html).
  Identifiants de réponses : 'pick' (difficultés choisies) puis '<clé>-A-1', '<clé>-B-1', '<clé>-C-1' (parcours 1) ; les parcours suivants (nouveaux exercices) sont '<clé>-A-2', '-A-3'…
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

/* ===== Parcours supplémentaires (V2, V3) : mêmes objectifs, nouveaux exercices.
   V1 = exercices d'origine (qid '<clé>-A-1'…), V2 → '<clé>-A-2', V3 → '<clé>-A-3'. ===== */
const a = (q, opts, ans) => ({ q, opts, ans });
const b = (list, lines, ans) => ({ list, lines:lines.map(x => [x]), ans });
const c = (title, instruct, ph, minWords, rubric) => ({ title:'Round C · ' + title, instruct, ph, minWords, rubric });
const MORE = {
 pron:{
  A:[[ a('Paul is my cousin. ___ lives in Nice.', ['She','He','It','They'], 1), a('The dogs are in the garden. ___ are very happy.', ['It','He','We','They'], 3), a('The sun is hot today. ___ is very bright.', ['It','He','They','She'], 0), a('You and I are in the same class. ___ are friends.', ['They','We','She','It'], 1) ],
      [ a('Lola is my best friend. ___ likes music.', ['He','It','She','We'], 2), a('My brother and sister are twins. ___ are 14.', ['They','He','It','She'], 0), a('My bike is old. ___ is red.', ['We','It','She','They'], 1), a('Tom and I play football. ___ play every Sunday.', ['We','They','He','It'], 0) ]],
  B:[ b(['he','it','we','they'], ['My dad is a cook. ___ works in a restaurant.','The film is long. ___ is three hours.','Sara and I are cousins. ___ live in the same street.','My neighbours are old. ___ have two cats.'], ['he','it','we','they']),
      b(['I','she','it','they'], ['___ am from Paris.','Emma is my aunt. ___ is a vet.','My phone is broken. ___ does not work.','The twins are tall. ___ play basketball.'], ['I','she','it','they']) ],
  C:[ c('Des personnes célèbres', 'Présente 3 personnes célèbres (un chanteur ou un acteur, une chanteuse ou une actrice, un groupe ou une équipe) : une avec **he**, une avec **she**, une avec **they**. Écris 3 ou 4 phrases courtes.', 'My favourite singer is ...', 10,
       `POINT DE GRAMMAIRE : pronoms personnels sujets (he, she, they). Le texte doit faire 3 à 4 phrases courtes qui présentent des personnes célèbres. ok = true si he est utilisé pour un garçon ou un homme, she pour une fille ou une femme, et they pour plusieurs personnes, correctement, au moins une fois chacun, sans pronom sujet oublié ou confondu. Ne vérifie QUE les pronoms sujets : ignore les autres petites fautes.`),
      c('Mon équipe', 'Imagine une équipe de sport ou un groupe de musique avec 3 membres. Présente-les en 3 ou 4 phrases : un garçon (**he**), une fille (**she**) et toute l\'équipe (**they**).', 'In my team, there is ...', 10,
       `POINT DE GRAMMAIRE : pronoms personnels sujets (he, she, they). Le texte doit faire 3 à 4 phrases courtes qui présentent les membres d'une équipe imaginaire. ok = true si he est utilisé pour un garçon, she pour une fille et they pour plusieurs personnes, correctement, au moins une fois chacun, sans pronom sujet oublié ou confondu. Ne vérifie QUE les pronoms sujets : ignore les autres petites fautes.`) ] },
 be:{
  A:[[ a('My brothers ___ at school now.', ['is','am','are','be'], 2), a('She ___ 14 years old.', ['has','is','are','have'], 1), a('___ your dad a teacher?', ['Is','Are','Do','Am'], 0), a('I ___ not hungry.', ['is','are','be','am'], 3) ],
      [ a('We ___ late for the bus.', ['is','am','are','be'], 2), a('It ___ cold today.', ['are','is','am','be'], 1), a('How old ___ you?', ['is','do','are','have'], 2), a('Jo and Ali ___ at school today. They are ill.', ['isn\'t','aren\'t','am not','don\'t'], 1) ]],
  B:[ b(['am','is','are','be'], ['My brother ___ 12 years old.','You ___ very kind.','I ___ in the kitchen now.','They want to ___ doctors.'], ['is','are','am','be']),
      b(['am','is','are','be'], ['My sisters ___ in Canada.','Be quiet! I ___ on the phone.','The teacher ___ in the classroom.','We must ___ on time.'], ['are','am','is','be']) ],
  C:[ c('Mon ami.e', 'Écris 4 phrases pour présenter un.e ami.e ou un membre de ta famille : son prénom, son âge, où il ou elle habite et un adjectif pour le ou la décrire.', 'My best friend is ...', 10,
       `POINT DE GRAMMAIRE : le verbe to be au présent (am, is, are, he's, she's...). Le texte doit présenter une autre personne en 3 à 4 phrases (prénom, âge, lieu, adjectif). ok = true si to be est utilisé correctement dans au moins 3 phrases, y compris pour l'âge ("she is 15", jamais "she has 15 years"). Ne vérifie QUE to be : ignore l'orthographe et les autres fautes.`),
      c('Ma classe', 'Décris ta classe en 4 phrases : le nombre d\'élèves, comment est ton ou ta prof, comment sont tes camarades. Utilise **is** et **are**.', 'My class is ...', 10,
       `POINT DE GRAMMAIRE : le verbe to be au présent (am, is, are). Le texte doit décrire une classe en 3 à 4 phrases. ok = true si is est utilisé avec un singulier et are avec un pluriel (ou we / they / you), correctement, dans au moins 3 phrases, sans verbe être oublié. Ne vérifie QUE to be : ignore l'orthographe et les autres fautes.`) ] },
 present:{
  A:[[ a('My dad ___ the car on Sunday.', ['wash','washes','washing','washs'], 1), a('We ___ English on Tuesday.', ['has','have','having','haves'], 1), a('She doesn\'t ___ to school by bus.', ['goes','go','going','went'], 1), a('___ they play tennis on Saturday?', ['Does','Are','Do','Is'], 2) ],
      [ a('The train ___ at 8 o\'clock.', ['leave','leaves','leaving','leavs'], 1), a('I ___ up at 7 every day.', ['get','gets','getting','am get'], 0), a('He ___ like fish.', ['don\'t','doesn\'t','isn\'t','not'], 1), a('What time ___ the film start?', ['do','does','is','are'], 1) ]],
  B:[ b(['watches','play',"don't",'does'], ['My mum ___ the news every evening.','My friends ___ video games at the weekend.','I ___ eat meat. I am vegetarian.','___ your brother live in Paris?'], ['watches','play',"don't",'does']),
      b(['studies','eat',"doesn't",'do'], ['My sister ___ French at university.','We ___ lunch at school every day.','He ___ speak Spanish.','Where ___ they work?'], ['studies','eat',"doesn't",'do']) ],
  C:[ c('Ma journée type', 'Écris 4 phrases sur une journée normale : 3 phrases sur **ce que tu fais** (matin, midi, soir) et 1 phrase sur ce que fait **un.e ami.e** ou un membre de ta famille.', 'I get up at ...', 12,
       `POINT DE GRAMMAIRE : le présent simple. Le texte doit faire 3 à 4 phrases sur des habitudes quotidiennes. ok = true si les verbes sont bien conjugués au présent simple, avec -s (ou -es, has, goes...) à he / she / it / un nom singulier dans au moins 1 phrase, et à la forme de base avec I / we / they, sans erreur du type "does + verbe avec -s". Ne vérifie QUE ce point : ignore l'orthographe et le vocabulaire.`),
      c('Ce que j\'aime', 'Écris 4 phrases sur les goûts : 2 phrases sur ce que **tu** aimes ou n\'aimes pas, et 2 phrases sur ce qu\'**une autre personne** aime ou n\'aime pas.', 'I like ...', 12,
       `POINT DE GRAMMAIRE : le présent simple (goûts). Le texte doit faire 3 à 4 phrases sur des goûts (l'élève et une autre personne), dont au moins une négative. ok = true si le verbe prend -s avec he / she / it / un nom singulier dans au moins 2 phrases, si la négation utilise don't (I, we, they) ou doesn't (he, she, it) + verbe de base. Ne vérifie QUE ce point : ignore l'orthographe et le vocabulaire.`) ] },
 poss:{
  A:[[ a('Tom has a blue bike. It is ___ bike.', ['his','her','their','my'], 0), a('Anna and I have a cat. ___ cat is black.', ['Their','Our','Her','My'], 1), a('That is ___ bag.', ['Julie','Julies','Julie\'s','Julies\''], 2), a('You have a sister. ___ sister is nice.', ['Your','You','Yours','Her'], 0) ],
      [ a('Mia has two brothers. ___ brothers are tall.', ['His','Her','Their','Our'], 1), a('I have new shoes. I love ___ shoes.', ['my','your','his','their'], 0), a('The dog is hungry. ___ bowl is empty.', ['His','Her','Its','Their'], 2), a('Max and Lou are twins. ___ birthday is in May.', ['His','Our','Her','Their'], 3) ]],
  B:[ b(['his','our','your','their'], ['Paul is my friend. ___ sister is called Eva.','My family and I love ___ garden.','Hi Lea, is this ___ pen?','My cousins like ___ new school.'], ['his','our','your','their']),
      b(['my','her','its','our'], ['I forgot ___ keys at home.','Sofia loves ___ grandmother.','The cat likes ___ new bed.','We are proud of ___ team.'], ['my','her','its','our']) ],
  C:[ c('Ma famille et celle d\'un.e ami.e', 'Écris 4 phrases : 2 sur **ta** famille et 2 sur la famille d\'**un.e ami.e** (utilise **his** ou **her**).', 'My mum is ...', 12,
       `POINT DE GRAMMAIRE : adjectifs possessifs (my, your, his, her, its, our, their) et 's. Le texte doit faire 3 à 4 phrases sur des familles. ok = true si les adjectifs possessifs sont choisis d'après le POSSESSEUR (my pour l'élève, his pour un garçon, her pour une fille, their pour plusieurs) dans au moins 3 phrases, sans erreur du type "her" pour un garçon. Ne vérifie QUE ce point : ignore les autres petites fautes.`),
      c('Un groupe célèbre', 'Imagine un groupe de musique ou une équipe célèbre. Écris 4 phrases : ce qui appartient au groupe (**their**), à un garçon (**his**), à une fille (**her**), et une phrase avec **\'s**.', 'Their new song is ...', 12,
       `POINT DE GRAMMAIRE : adjectifs possessifs (his, her, their) et 's. Le texte doit faire 3 à 4 phrases sur un groupe imaginaire. ok = true si their est utilisé pour plusieurs personnes, his pour un garçon, her pour une fille, et si 's est bien utilisé au moins une fois (ex. Tom's guitar). Ne vérifie QUE ce point : ignore les autres petites fautes.`) ] },
 past:{
  A:[[ a('Last night, I ___ my homework.', ['do','did','done','doed'], 1), a('They ___ to the beach last summer.', ['go','goed','went','gone'], 2), a('We ___ a great concert on Saturday.', ['saw','seen','seed','see'], 0), a('Did you ___ the match?', ['watched','watch','watches','watching'], 1) ],
      [ a('My sister ___ a new phone yesterday.', ['buyed','buy','bought','buys'], 2), a('He ___ the door and left.', ['closed','close','closes','closeed'], 0), a('I ___ not hear the bell.', ['do','did','does','am'], 1), a('Last week, she ___ me a message.', ['send','sended','sent','sends'], 2) ]],
  B:[ b(['had','visited',"didn't",'did'], ['On Sunday, I ___ a big breakfast.','Last year, we ___ our grandparents in Spain.','Yesterday I ___ see my friends. I stayed at home.','___ you call him last night?'], ['had','visited',"didn't",'did']),
      b(['ate','walked','did','took'], ['Last night, we ___ pasta for dinner.','This morning, I ___ to school.','___ she like the film yesterday?','I ___ a photo of the sunset.'], ['ate','walked','did','took']) ],
  C:[ c('Mes dernières vacances', 'Raconte tes dernières vacances (ou une sortie) en 4 phrases : 3 choses que tu **as faites** et 1 chose que tu **n\'as pas faite**.', 'Last holiday, I ...', 12,
       `POINT DE GRAMMAIRE : le prétérit (past simple). Le texte doit faire 3 à 4 phrases au passé sur des vacances ou une sortie, dont une négative. ok = true si au moins 3 verbes sont bien au prétérit (-ed ou forme irrégulière correcte : went, saw, had, ate...) et si la phrase négative utilise didn't + verbe de base. Pas de présent à la place du passé. Ne vérifie QUE ce point : ignore l'orthographe et le vocabulaire.`),
      c('Ma journée d\'hier', 'Raconte ta journée d\'hier en 4 phrases : 3 choses que tu **as faites** et 1 chose que tu **n\'as pas faite**.', 'Yesterday, I ...', 12,
       `POINT DE GRAMMAIRE : le prétérit (past simple). Le texte doit faire 3 à 4 phrases au passé sur la journée d'hier, dont une négative. ok = true si au moins 3 verbes sont bien au prétérit (-ed ou forme irrégulière correcte) et si la phrase négative utilise didn't + verbe de base. Pas de présent à la place du passé. Ne vérifie QUE ce point : ignore l'orthographe et le vocabulaire.`) ] },
 art:{
  A:[[ a('She is ___ nurse.', ['a','an','the','two'], 0), a('I eat ___ orange every day.', ['a','an','the','two'], 1), a('Look at ___ moon! It is so big.', ['an','a','the','two'], 2), a('He is ___ honest man.', ['a','an','the','many'], 1) ],
      [ a('We have ___ new teacher.', ['an','a','the','many'], 1), a('There is ___ egg in the fridge.', ['a','an','the','three'], 1), a('Mia has a sister. ___ sister is a doctor.', ['An','A','The','Two'], 2), a('It is ___ university in Lyon.', ['an','a','three','many'], 1) ]],
  B:[ b(['a','an','the','some'], ['I need ___ pen.','She has ___ idea!','Can I have ___ water, please?','Open ___ window, it is hot in the room.'], ['a','an','some','the']),
      b(['a','an','the','some'], ['He has ___ bike.','I eat ___ egg for breakfast.','There is ___ juice on the table.','The cat is on the sofa. ___ sofa is blue.'], ['a','an','some','the']) ],
  C:[ c('Ma classe', 'Décris ta salle de classe (ou ton lycée) en 4 phrases. Utilise **a**, **an** et **the**.', 'In my classroom, there is a ...', 12,
       `POINT DE GRAMMAIRE : les articles a / an / the. Le texte doit faire 3 à 4 phrases qui décrivent une salle de classe ou un lycée. ok = true si a / an sont bien choisis d'après le son (a table, an exercise book), si the est utilisé pour une chose déjà citée ou unique, et s'il n'y a pas d'article oublié devant un nom singulier dénombrable dans au moins 3 phrases. Ne vérifie QUE les articles : ignore les autres petites fautes.`),
      c('Mon repas', 'Décris un repas (petit-déjeuner, déjeuner ou dîner) en 4 phrases. Utilise **a**, **an** et **the**.', 'For breakfast, I eat a ...', 12,
       `POINT DE GRAMMAIRE : les articles a / an / the. Le texte doit faire 3 à 4 phrases qui décrivent un repas. ok = true si a / an sont bien choisis d'après le son (a sandwich, an apple), si the est utilisé pour une chose déjà citée ou unique, et s'il n'y a pas d'article oublié devant un nom singulier dénombrable dans au moins 3 phrases. Ne vérifie QUE les articles : ignore les autres petites fautes.`) ] },
 plural:{
  A:[[ a('There are three ___ on the table.', ['dishs','dish','dishes','dishies'], 2), a('My two ___ are very cold.', ['foots','feet','feets','foot'], 1), a('Many ___ live here.', ['people','peoples','person','persons'], 0), a('I have two ___.', ['babys','babies','babyes','baby'], 1) ],
      [ a('I bought five ___.', ['watchs','watch','watches','watchies'], 2), a('There are two ___ in the class.', ['womans','women','womens','woman'], 1), a('My ___ hurt.', ['tooths','teeth','tooth','teeths'], 1), a('We saw two ___ at the zoo.', ['monkeys','monkies','monkeyes','monkey'], 0) ]],
  B:[ b(['dogs','buses','countries','men'], ['My neighbours have two ___.','Three ___ stop here every hour.','France and Spain are big ___.','Two ___ are in the shop.'], ['dogs','buses','countries','men']),
      b(['pens','dishes','babies','women'], ['I have three blue ___ in my bag.','He washes the ___ after dinner.','The ___ are crying.','The ___ in my family are tall.'], ['pens','dishes','babies','women']) ],
  C:[ c('Mon quartier', 'Écris 4 phrases sur ta ville ou ton quartier. Utilise au moins 4 noms au **pluriel**, dont un pluriel **irrégulier**.', 'In my town, there are many ...', 12,
       `POINT DE GRAMMAIRE : le pluriel des noms. Le texte doit faire 3 à 4 phrases contenant au moins 4 noms au pluriel. ok = true si au moins 3 pluriels sont corrects (-s, -es, -ies) et si les pluriels irréguliers utilisés sont corrects (children, men, women, people, feet, teeth...). Ne vérifie QUE le pluriel des noms : ignore les autres petites fautes.`),
      c('Un magasin', 'Décris un magasin (ou un marché) en 4 phrases. Utilise au moins 4 noms au **pluriel**, dont un pluriel **irrégulier**.', 'In the shop, I can see ...', 12,
       `POINT DE GRAMMAIRE : le pluriel des noms. Le texte doit faire 3 à 4 phrases contenant au moins 4 noms au pluriel. ok = true si au moins 3 pluriels sont corrects (-s, -es, -ies) et si les pluriels irréguliers utilisés sont corrects (children, men, women, people, feet, teeth...). Ne vérifie QUE le pluriel des noms : ignore les autres petites fautes.`) ] },
 quest:{
  A:[[ a('— ___ do you go to school? — By bus.', ['Where','How','Who','When'], 1), a('Choose the right question.', ['Where he works?','Where do he work?','Where does he work?','Where does he works?'], 2), a('___ they play football on Sunday?', ['Does','Do','Are','Is'], 1), a('— ___ is your English teacher? — Mr Smith.', ['Where','Who','When','Why'], 1) ],
      [ a('— ___ did you go yesterday? — To the cinema.', ['Who','Why','Where','How'], 2), a('Choose the right question.', ['What time you get up?','What time does you get up?','What time do you gets up?','What time do you get up?'], 3), a('___ you like pizza?', ['Is','Do','Does','Are'], 1), a('Why ___ he angry?', ['do','does','is','did'], 2) ]],
  B:[ b(['do','does','did','are'], ['What ___ you eat for breakfast?','Where ___ your mum work?','___ they win the match last night?','How ___ you today?'], ['do','does','did','are']),
      b(['do','does','did','is'], ['When ___ the film start?','Why ___ you come late yesterday?','Who ___ your best friend?','What music ___ you like?'], ['does','did','is','do']) ],
  C:[ c('Questions à une star', 'Tu rencontres ta personne célèbre préférée. Écris 4 questions à lui poser, avec des mots interrogatifs différents.', 'Where ...', 10,
       `POINT DE GRAMMAIRE : poser une question. Le texte doit contenir 3 à 4 questions adressées à une personne célèbre. ok = true si au moins 3 questions sont bien formées (mot interrogatif + do / does / did ou to be inversé + sujet + verbe de base, bon ordre des mots) et si au moins 3 mots interrogatifs différents sont utilisés. Ne vérifie QUE la formation des questions : ignore l'orthographe et le vocabulaire.`),
      c('Ma nouvelle classe', 'Tu arrives dans une nouvelle classe. Écris 4 questions à poser à un.e camarade pour mieux le ou la connaître, avec des mots interrogatifs différents.', 'What ...', 10,
       `POINT DE GRAMMAIRE : poser une question. Le texte doit contenir 3 à 4 questions adressées à un.e camarade. ok = true si au moins 3 questions sont bien formées (mot interrogatif + do / does / did ou to be inversé + sujet + verbe de base, bon ordre des mots) et si au moins 3 mots interrogatifs différents sont utilisés. Ne vérifie QUE la formation des questions : ignore l'orthographe et le vocabulaire.`) ] },
 prep:{
  A:[[ a('We have lunch ___ noon.', ['in','on','at','to'], 2), a('My birthday is ___ 5 May.', ['at','in','to','on'], 3), a('She lives ___ London.', ['in','at','on','of'], 0), a('My cousin is ___ work today.', ['in','on','at','to'], 2) ],
      [ a('We play tennis ___ Wednesday.', ['at','on','in','to'], 1), a('I was born ___ 2009.', ['on','at','in','to'], 2), a('The bus leaves ___ 7.30.', ['at','in','on','to'], 0), a('There is a poster ___ the wall.', ['in','at','of','on'], 3) ]],
  B:[ b(['in','on','at'], ['The concert is ___ Saturday.','I go to bed ___ 10 o\'clock.','We go on holiday ___ August.','My brother is ___ home.'], ['on','at','in','at']),
      b(['in','on','at'], ['My sister lives ___ Canada.','School finishes ___ 5 o\'clock.','We have a test ___ Monday.','It is cold ___ winter.'], ['in','at','on','in']) ],
  C:[ c('Mon week-end', 'Écris 4 phrases sur ton week-end habituel : où tu es et à quel moment.', 'On Saturday, I am at ...', 12,
       `POINT DE GRAMMAIRE : prépositions de lieu et de temps in / on / at. Le texte doit faire 3 à 4 phrases sur le week-end de l'élève (lieux et moments). ok = true si in / on / at sont bien choisis dans au moins 3 cas (on + jour, at + heure, in + mois ou année ou pays ou ville, at + school / home / work). Ne vérifie QUE ces prépositions : ignore les autres petites fautes.`),
      c('Ma journée', 'Écris 4 phrases sur ta journée d\'hier ou de demain : à quelle heure, où et quel jour.', 'On Friday, I am ...', 12,
       `POINT DE GRAMMAIRE : prépositions de lieu et de temps in / on / at. Le texte doit faire 3 à 4 phrases sur une journée (heures, lieux, jour). ok = true si in / on / at sont bien choisis dans au moins 3 cas (on + jour, at + heure, in + mois ou année ou pays ou ville, at + school / home / work). Ne vérifie QUE ces prépositions : ignore les autres petites fautes.`) ] },
 comp:{
  A:[[ a('A plane is ___ than a car.', ['fast','faster','fastest','more fast'], 1), a('This is ___ book in the shop.', ['more expensive','expensivest','the most expensive','the expensivest'], 2), a('My phone is ___ than yours.', ['good','best','gooder','better'], 3), a('Mia is ___ girl in the class.', ['taller','tallest','the tallest','more tall'], 2) ],
      [ a('Summer is ___ than winter.', ['hot','hotter','hottest','more hot'], 1), a('Maths is ___ than English for me.', ['difficulter','difficult','most difficult','more difficult'], 3), a('He is ___ player in the team.', ['better','good','the best','the goodest'], 2), a('This bag is ___ of all.', ['cheaper','the cheapest','cheap','most cheap'], 1) ]],
  B:[ b(['bigger','the oldest','more interesting','the worst'], ['A lion is 150 kg. A cat is 4 kg. A lion is ___ than a cat.','Grandma is 85, Grandpa is 82 and Dad is 50. Grandma is ___ person in the family.','I love history but I find sport boring. For me, history is ___ than sport.','My mark is 2/20 and all the other marks are higher. It is ___ mark in the class.'], ['bigger','the oldest','more interesting','the worst']),
      b(['smaller','the fastest','more dangerous','the best'], ['A mouse is ___ than a dog.','Usain Bolt is faster than all the other runners. He is ___ runner.','Motorbikes are ___ than bikes.','Everybody loves this pizza more than the others. It is ___ pizza in town.'], ['smaller','the fastest','more dangerous','the best']) ],
  C:[ c('Mes préférences', 'Écris 4 phrases : compare 2 sports ou 2 matières (2 phrases), puis dis lequel ou laquelle est **le plus…** ou **la plus…** pour toi (2 phrases).', 'Football is ...', 14,
       `POINT DE GRAMMAIRE : comparatif et superlatif. Le texte doit faire 3 à 4 phrases : des comparaisons de deux éléments puis des superlatifs. ok = true si au moins un comparatif correct (-er than ou more ... than, ou better / worse than) et au moins un superlatif correct (the -est ou the most ..., ou the best / the worst) sont utilisés, sans erreur du type "more taller" ou "the most big". Ne vérifie QUE ce point : ignore les autres petites fautes.`),
      c('Ma famille et mes ami.e.s', 'Écris 4 phrases : compare 2 personnes de ta famille ou de tes ami.e.s (2 phrases), puis dis qui est **le plus…** ou **la plus…** (2 phrases).', 'My brother is ...', 14,
       `POINT DE GRAMMAIRE : comparatif et superlatif. Le texte doit faire 3 à 4 phrases : des comparaisons entre personnes puis des superlatifs. ok = true si au moins un comparatif correct (-er than ou more ... than, ou better / worse than) et au moins un superlatif correct (the -est ou the most ..., ou the best / the worst) sont utilisés, sans erreur du type "more taller" ou "the most big". Ne vérifie QUE ce point : ignore les autres petites fautes.`) ] },
 there:{
  A:[[ a('___ two windows in my room.', ['There is','It is','There are','They are'], 2), a('___ there two cats in the garden?', ['Is','Are','Do','Does'], 1), a('There ___ a book on the desk.', ['are','be','am','is'], 3), a('There ___ any eggs. I must go shopping.', ['is','isn\'t','are','aren\'t'], 3) ],
      [ a('___ there a pool in your school?', ['Is','Are','Do','Does'], 0), a('There ___ four people in my family.', ['is','are','be','isn\'t'], 1), a('In my town, there ___ a cinema. We go to the next town.', ['is','isn\'t','are','aren\'t'], 1), a('There ___ some posters on the wall.', ['is','am','are','be'], 2) ]],
  B:[ b(['is','are',"isn't","aren't"], ['There ___ a big tree in the park.','There ___ three trains this morning.','The fridge is empty. There ___ any apples.','There ___ a lift in my building. I take the stairs.'], ['is','are',"aren't","isn't"]),
      b(['is','are',"isn't","aren't"], ['In the box, there ___ two pens.','There ___ a phone on the table.','There ___ any students in the room. It is empty.','There ___ a shop near here. We must take the bus.'], ['are','is',"aren't","isn't"]) ],
  C:[ c('Mon lycée', 'Décris ton lycée ou ta ville : 3 phrases sur ce qu\'il y a, et 1 phrase sur ce qu\'il n\'y a **pas**.', 'In my school, there is ...', 12,
       `POINT DE GRAMMAIRE : there is / there are. Le texte doit faire 3 à 4 phrases qui décrivent un lycée ou une ville, dont une phrase négative. ok = true si there is est utilisé avec un seul élément, there are avec plusieurs, et si la phrase négative utilise there isn't / there aren't (ou there is no) correctement, dans au moins 3 phrases. Ne vérifie QUE ce point : ignore les autres petites fautes.`),
      c('Ma maison idéale', 'Décris ta maison idéale : 3 phrases sur ce qu\'il y a, et 1 phrase sur ce qu\'il n\'y a **pas**.', 'In my dream house, there is ...', 12,
       `POINT DE GRAMMAIRE : there is / there are. Le texte doit faire 3 à 4 phrases qui décrivent une maison, dont une phrase négative. ok = true si there is est utilisé avec un seul élément, there are avec plusieurs, et si la phrase négative utilise there isn't / there aren't (ou there is no) correctement, dans au moins 3 phrases. Ne vérifie QUE ce point : ignore les autres petites fautes.`) ] },
 objpron:{
  A:[[ a('Mrs Martin is nice. I like ___.', ['she','her','hers','he'], 1), a('Look at the girls! Do you know ___?', ['they','their','them','she'], 2), a('My dad calls ___ every evening.', ['I','me','my','mine'], 1), a('We love our teacher and he helps ___.', ['we','our','ours','us'], 3) ],
      [ a('Leo is late. Wait for ___.', ['he','him','his','they'], 1), a('My cousins are here. Let\'s play with ___.', ['they','their','us','them'], 3), a('Anna and I have a problem. Can you help ___?', ['we','us','our','me'], 1), a('I have a new bike. I ride ___ every day.', ['it','its','them','me'], 0) ]],
  B:[ b(['me','her','us','them'], ['I am lost. Please help ___.','Sofia is my friend. I often call ___.','My sister and I are hungry. Mum cooks for ___.','The students are noisy. The teacher looks at ___.'], ['me','her','us','them']),
      b(['him','it','you','them'], ['Tom is my brother. I live with ___.','I love this song. I listen to ___ every day.','Hi Lea! I want to talk to ___.','My parents are kind. I help ___ at home.'], ['him','it','you','them']) ],
  C:[ c('Les gens que j\'aime', 'Écris 4 phrases sur des personnes importantes pour toi. Dans chaque phrase, utilise un pronom complément : **him**, **her**, **them**, **us** ou **me**.', 'I often see ...', 12,
       `POINT DE GRAMMAIRE : les pronoms compléments (me, you, him, her, it, us, them). Le texte doit faire 3 à 4 phrases où un pronom complément remplace une personne. ok = true si au moins 3 pronoms compléments sont corrects et bien choisis (him pour un garçon, her pour une fille, them pour plusieurs, us pour "nous", me pour l'élève), sans pronom sujet utilisé à la place (ex. "I love he", "help I"). Ne vérifie QUE ce point : ignore les autres petites fautes.`),
      c('Une journée avec mes ami.e.s', 'Raconte ce que tu fais avec tes ami.e.s ou ta famille en 4 phrases. Dans chaque phrase, utilise un pronom complément : **him**, **her**, **them**, **us** ou **me**.', 'My friends often invite ...', 12,
       `POINT DE GRAMMAIRE : les pronoms compléments (me, you, him, her, it, us, them). Le texte doit faire 3 à 4 phrases où un pronom complément remplace une personne. ok = true si au moins 3 pronoms compléments sont corrects et bien choisis (him pour un garçon, her pour une fille, them pour plusieurs, us pour "nous", me pour l'élève), sans pronom sujet utilisé à la place (ex. "I love he", "help I"). Ne vérifie QUE ce point : ignore les autres petites fautes.`) ] }
};

/* Variantes par point et par round : V[L][0] = exercices d'origine, puis V2, V3… (qid '<clé>-<L>-<n>') */
POINTS.forEach(p => { const m = MORE[p.key] || {}; p.V = { A:[p.A].concat(m.A || []), B:[p.B].concat(m.B || []), C:[p.C].concat(m.C || []) }; });

/* Descriptions utilisées par le suivi (une entrée par point, n = rang du point dans cette liste) */
const basePrompt = (p, L, v) => L === 'A' ? p.title + ' — Round A (QCM)' : L === 'B' ? p.title + ' — Round B (compléter)' : p.title + ' — Round C (phrases : ' + v.instruct.replace(/\*\*/g, '') + ')';
const course = {
  id:'grammar-boost',
  title:'Grammar Boost',
  subtitle:'Un coup de pouce en grammaire anglaise',
  studentPage:'cours-grammar.html',
  pick:{ id:'pick', prompt:'Quelles sont tes difficultés ?' },
  steps: POINTS.map((p, i) => { const lv = (L, tag) => ({ title:'Round ' + L, tag, qs:p.V[L].map((v, k) => ({ id:p.key + '-' + L + '-' + (k + 1), variant:k + 1, prompt:basePrompt(p, L, v) + (k ? ' — Parcours ' + (k + 1) : '') })) });
    return { n:i + 1, key:p.key, chip:p.icon, title:p.title, skill:'Grammaire', lu:'', goal:p.title, variants:p.V.A.length,
      levels:{ A:lv('A', 'QCM'), B:lv('B', 'je complète avec la liste'), C:lv('C', 'j\'écris 3-4 phrases') } }; })
};
course.allQuestions = [{ id:'pick', step:0, level:'—', index:0, prompt:'Quelles sont tes difficultés ?' }];
course.steps.forEach(s => ['A','B','C'].forEach(L => s.levels[L].qs.forEach((q, k) => { q.step = s.n; q.level = L; q.index = k; course.allQuestions.push(q); })));

window.GRAMMAR_COURSE = course;
window.GRAMMAR_DATA = { MISSION, MISSION_FR, POINTS };
})();
