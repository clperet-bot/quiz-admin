/*
  Survive the City — présenter 3 lieux de sa ville à la classe pour la visite d'une classe anglaise.
  5 étapes qui se cumulent : le texte écrit au niveau C de chaque étape devient une PARTIE de la présentation finale (étape 5).
  Niveaux A / B / C à chaque étape.
  Partagé par la page élève (cours-city.html), le suivi enseignante (cours-suivi.html) et la fiche papier.
*/
(function(){

const MISSION = `An **English class** is visiting next month. Step by step, prepare **3 places** to **present to your class**: the class will choose the **programme**.`;
const LEARN = ['say **how to get there**', 'say **where** it is', 'talk about **food and prices**', 'suggest a **plan** for the visit', '**present** your city guide'];

// Plan de la présentation finale (étape 5)
const PLAN = [['Intro','Hello everyone! For the visit of our English friends…'],['Place 1','where it is + how to get there'],['Place 2','food, prices + the oldest / the best…'],['Place 3','the most… + your advice with should'],['The plan','the programme for the visit'],['Conclusion','thank the class + ask a question']];

const LU1 = 'Compréhension écrite (CE) et Expression écrite (EE)';
const SAME = ' Garde ces 3 lieux et ce texte : tu les réutiliseras à l\'étape 5.';

const STEPS = [
 { title:'Getting there', skill:'CE + EE', lu:LU1,
   goal:`Objectif : expliquer comment aller à tes 3 lieux (transport, ticket, horaires).`,
   vocab:[['take bus 12 / the tram / the train','prendre le bus 12 / le tram / le train'],['a single / a return ticket','un aller simple / un aller-retour'],['a day pass','un pass pour la journée'],['the timetable','l\'horaire'],['the platform','le quai'],['It leaves at…','il part à…'],['every ten minutes','toutes les dix minutes'],['to get off at…','descendre à…']],
   model:[['1. The museum','To get to the museum, take bus 12: a single ticket costs two euros and the bus leaves every ten minutes.'],['2. The castle','For the castle, take the train from platform 3 at 10.30: a return ticket is six euros.'],['3. The park','To go to the park, take tram A and get off at Central Square: the last tram is at 11.45 p.m.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'To get to the museum, ___ bus 12.', opts:['take','go','get','make'], ans:0 },
     { q:'The next train ___ at ten fifteen.', opts:['leaves','leave','leaving','is leave'], ans:0 },
     { q:'You want to go to the castle and come back today. You buy…', opts:['a return ticket','a single ticket','a timetable','a platform'], ans:0 },
     { q:'There is a bus ___ ten minutes.', opts:['every','each','all','at'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['platform','quai'],['timetable','horaire'],['off','descendre'],['single','simple'],['change','changer']],
     lines:[['Check the ',{a:'timetable'},': the last bus is at 11 p.m.'],['The train leaves from ',{a:'platform'},' 3.'],['Get ',{a:'off'},' at Central Square.'],['I don\'t come back today. A ',{a:'single'},' ticket, please.']] },
   C:{ title:`J'explique comment y aller`, instruct:`Choisis 3 lieux de ta ville (ou d'une ville imaginaire). Écris 3 paragraphes séparés par une ligne vide, un par lieu, de 1 ou 2 phrases : le transport, le prix du ticket et l'horaire.` + SAME, ph:`To get to my first place, take …\n\nFor my second place, …\n\nTo go to my third place, …`,
     rubric:`Trois paragraphes (un par lieu) expliquant comment aller à 3 lieux de la ville. ok = true si les 3 lieux sont traités, si au moins quatre éléments différents sont donnés avec des constructions correctes parmi : take + transport (bus, tram, train), single / return ticket ou day pass avec un prix, It leaves at… / the last bus is at…, every … minutes, platform, get off, et si l'ensemble est compréhensible. Tolère les petites fautes.`, minWords:30 } },

 { title:'Where is it?', skill:'CE + EE', lu:LU1,
   goal:`Objectif : situer tes 3 lieux dans la ville.`,
   vocab:[['next to','à côté de'],['opposite','en face de'],['between … and …','entre … et …'],['behind','derrière'],['in front of','devant'],['on the corner (of)','au coin (de)'],['at the end of the street','au bout de la rue'],['There is / There are','il y a (singulier / pluriel)']],
   model:[['1. The museum','The museum is in the old town, next to the cathedral.'],['2. The castle','The castle is on a hill behind the station, and there are two cafés opposite the entrance.'],['3. The park','The park is between the river and the school, and there is a bakery on the corner.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'There ___ two cafés in front of the castle.', opts:['are','is','be','has'], ans:0 },
     { q:'___ a bank near the museum?', opts:['Is there','Are there','There is','Does there'], ans:0 },
     { q:'The cinema is on one side of the street and the bank is on the other side. The bank is ___ the cinema.', opts:['opposite','between','behind','at'], ans:0 },
     { q:'Which sentence is correct?', opts:['There aren\'t any shops near the station.','There isn\'t any shops near the station.','It hasn\'t any shops near the station.','There not are any shops near the station.'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['next','à côté'],['between','entre'],['corner','coin'],['front','devant'],['behind','derrière']],
     lines:[['The museum is ',{a:'next'},' to the cathedral.'],['The park is ',{a:'between'},' the river and the school.'],['The bakery is on the ',{a:'corner'},' of the street.'],['There is a big square in ',{a:'front'},' of the castle.']] },
   C:{ title:`Je situe mes lieux`, instruct:`Pour chacun de tes 3 lieux, écris 1 phrase pour dire où il est, avec 3 paragraphes séparés par une ligne vide. Utilise « there is » et « there are », et des prépositions de lieu différentes.` + SAME, ph:`My first place is next to …\n\nMy second place …\n\nThere are …`,
     rubric:`Trois paragraphes (un par lieu) qui situent les 3 lieux de la ville. ok = true si les 3 lieux sont situés, si « there is » et « there are » sont utilisés au moins une fois chacun correctement (accord singulier / pluriel) et si au moins 3 prépositions de lieu différentes sont correctes (next to, opposite, between, behind, in front of, on the corner, near...). Tolère les petites fautes.`, minWords:30 } },

 { title:'Eating & shopping', skill:'CE + EE', lu:LU1,
   goal:`Objectif : dire où manger et acheter, donner les prix et comparer.`,
   vocab:[['How much is it? / How much are they?','combien ça coûte ?'],['It costs … euros.','ça coûte … euros.'],['cheap / expensive','pas cher / cher'],['cheaper than…','moins cher que…'],['more expensive than…','plus cher que…'],['a souvenir shop','une boutique de souvenirs'],['lunch / a snack','le déjeuner / un en-cas'],['It\'s free.','c\'est gratuit.']],
   model:[['1. The museum','There is a café next to the museum: a sandwich is four euros, so it is cheap.'],['2. The castle','The restaurant at the castle is expensive, but the café in the village is cheaper than the restaurant.'],['3. The park','The park is free, but the T-shirts in the shop are more expensive than the postcards.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'___ is a sandwich at this café?', opts:['How much','How many','How long','How often'], ans:0 },
     { q:'A burger costs 12 euros. A sandwich costs 4 euros. A sandwich is ___ than a burger.', opts:['cheaper','cheapest','more cheap','the cheaper'], ans:0 },
     { q:'A T-shirt costs 15 euros. A postcard costs 1 euro. A T-shirt is ___ than a postcard.', opts:['more expensive','expensiver','most expensive','more expensively'], ans:0 },
     { q:'How much ___ these postcards?', opts:['are','is','do','does'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['costs','coûte'],['much','combien'],['cheaper','moins cher'],['expensive','cher'],['free','gratuit']],
     lines:[['A coffee ',{a:'costs'},' two euros.'],['How ',{a:'much'},' is the ticket to the castle?'],['The café is ',{a:'cheaper'},' than the restaurant.'],['The T-shirts are more ',{a:'expensive'},' than the postcards.']] },
   C:{ title:`Je parle de manger et d'acheter`, instruct:`Pour chacun de tes 3 lieux, écris 1 ou 2 phrases, en 3 paragraphes séparés par une ligne vide : où manger ou acheter, les prix, et une comparaison.` + SAME, ph:`Near my first place, there is …\n\nAt my second place, …\n\nAt my third place, …`,
     rubric:`Trois paragraphes (un par lieu) sur où manger ou acheter et les prix. ok = true si les 3 lieux sont traités, si au moins deux prix sont donnés correctement (is / costs … euros, It's free) et si au moins un comparatif correct est utilisé (cheaper than, more expensive than, bigger than...), et si l'ensemble est compréhensible. Tolère les petites fautes.`, minWords:35 } },

 { title:'Making a plan', skill:'CE + EE', lu:LU1,
   goal:`Objectif : proposer un programme pour la visite et refuser une idée avec une raison.`,
   vocab:[['Shall we visit…?','et si on visitait… ?'],['Let\'s have lunch at…','déjeunons à…'],['Why don\'t we…?','et si on… ?'],['at ten o\'clock / at half past two','à dix heures / à deux heures et demie'],['in the morning / in the afternoon','le matin / l\'après-midi'],['then / after lunch','ensuite / après le déjeuner'],['We could…','on pourrait…'],['I\'m afraid we can\'t, because…','désolé.e, on ne peut pas, parce que…']],
   model:[['1. Morning','In the morning, shall we visit the museum at ten o\'clock and have lunch in the café?'],['2. Afternoon','After lunch, why don\'t we go to the castle? Let\'s take the train at half past two.'],['3. Evening','Let\'s finish in the park at five. We could also go to the stadium, but I\'m afraid we can\'t: it is closed on Sundays.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'___ we visit the museum at ten o\'clock?', opts:['Shall','Do','Will to','Are'], ans:0 },
     { q:'Let\'s ___ lunch in the café.', opts:['have','to have','having','has'], ans:0 },
     { q:'Why don\'t we ___ the castle in the afternoon?', opts:['visit','visiting','to visit','visits'], ans:0 },
     { q:'The stadium is closed on Sundays. Which sentence is correct?', opts:['I\'m afraid we can\'t go: it is closed.','I\'m afraid we don\'t go: it is closed.','We afraid can\'t go: it is closed.','I\'m afraid we can go: it is closed.'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['Shall','et si'],['Let\'s','allons'],['afraid','désolé.e'],['o\'clock','heures'],['Why','pourquoi']],
     lines:[[{a:'Shall'},' we meet at the station?'],[{a:'Let\'s'},' have lunch at the market!'],['I\'m ',{a:'afraid'},' we can\'t go there: it is closed.'],['The museum opens at ten ',{a:'o\'clock'},'.']] },
   C:{ title:`J'organise la visite`, instruct:`Propose un programme avec tes 3 lieux. Écris 3 paragraphes séparés par une ligne vide : le matin, l'après-midi, le soir. Donne des horaires, utilise « Shall we », « Let's » ou « Why don't we », et refuse une autre idée en donnant une raison.` + SAME, ph:`In the morning, …\n\nIn the afternoon, …\n\nIn the evening, …`,
     rubric:`Programme de visite en 3 paragraphes (matin, après-midi, soir) avec les 3 lieux. ok = true si au moins deux horaires sont donnés, si au moins deux structures différentes parmi Shall we / Let's / Why don't we / We could + verbe de base sont utilisées correctement, et si une autre idée est refusée poliment avec « I'm afraid we can't » (ou équivalent) et une raison. Tolère les petites fautes si le sens est clair.`, minWords:35 } },

 { title:'My city guide', skill:'EE + EO', lu:'Expression écrite (EE) et Expression orale (EO)',
   goal:`Objectif : présenter 3 lieux à la classe pour la visite, avec tes textes des étapes 1 à 4.`,
   vocab:[['First of all, / Also, / Finally,','pour commencer, / de plus, / enfin,'],['You should visit…','tu devrais visiter…'],['You shouldn\'t miss…','ne rate pas…'],['the best place to… is…','le meilleur endroit pour… est…'],['the most interesting…','le plus intéressant…'],['the biggest / the oldest','le plus grand / le plus ancien'],['because / but','parce que / mais'],['It\'s worth a visit.','ça vaut le détour.']],
   model:[['1. Intro','Hello everyone! For the visit of our English friends, here are my three places and my plan.'],['2. Place 1','First of all, you should visit the museum. It is in the old town, next to the cathedral. To get there, take bus 12: a single ticket costs two euros.'],['3. Place 2','Also, the castle is the oldest building in town. It is on a hill behind the station: take the train at 10.30. The café in the village is cheaper than the restaurant.'],['4. Place 3','Finally, you shouldn\'t miss the park: it is the most relaxing place in the city. It is between the river and the school, and it is free.'],['5. The plan','Shall we visit the museum at ten o\'clock, then go to the castle at half past two? Let\'s finish in the park at five. We could also go to the stadium, but I\'m afraid we can\'t: it is closed on Sundays.'],['6. Conclusion','It\'s worth a visit! Thank you for listening. Which place do you prefer?']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'You ___ visit the old town. It\'s beautiful.', opts:['should','must to','are should','shall to'], ans:0 },
     { q:'The park is ___ relaxing place in the city.', opts:['the most','the more','most','the relaxingest'], ans:0 },
     { q:'You should visit the market, ___ the food is fresh and cheap.', opts:['because','but','finally','so'], ans:0 },
     { q:'Which connector do you use to start the LAST place?', opts:['Finally,','First of all,','Because','But'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['should','devrais'],['most','le plus'],['because','parce que'],['best','meilleur'],['Also','de plus']],
     lines:[['You ',{a:'should'},' visit the castle.'],['The park is the ',{a:'most'},' relaxing place in the city.'],['The market is the ',{a:'best'},' place to eat in town.'],['Go to the market ',{a:'because'},' the food is excellent.']] },
   C:{ title:`Je présente ma ville`, instruct:`Tu présentes ta ville à ta classe, qui choisira le programme. Suis le plan : réutilise tes textes des étapes 1 à 4 (déjà dans la zone), réorganise-les lieu par lieu, puis ajoute introduction, connecteurs, conseils avec « should », superlatifs et conclusion avec une question. Vise 12 à 15 phrases.`, ph:`Hello everyone! For the visit of our English friends, …\n\nFirst of all, …\n\nAlso, …\n\nFinally, …`,
     rubric:`Présentation orale écrite de la ville, destinée à la classe, d'environ 12 à 15 phrases, qui doit suivre ce plan : (1) introduction qui salue la classe et parle de la visite des amis anglais ; (2) à (4) trois lieux, chacun situé (there is / are, prépositions) avec comment y aller (take, ticket, horaire) ; au moins un lieu avec nourriture ou prix et un comparatif ; (5) un programme de la visite (Shall we / Let's / Why don't we + horaires, éventuellement une idée refusée avec une raison) ; (6) conclusion avec remerciement et une question à la classe. ok = true si cette structure est présente, si « should » ou « shouldn't » est utilisé correctement au moins une fois, si au moins deux superlatifs corrects sont utilisés (the best, the most interesting, the biggest, the oldest...) et si au moins deux connecteurs différents (first of all, also, finally, because, but...) sont utilisés. ok = false si l'élève a seulement collé ses textes précédents sans introduction, conclusion, connecteurs ou superlatifs, s'il reste « … » ou s'il manque une partie du plan. Tolère les petites fautes si le sens est clair.`, minWords:110 } }
];

const course = {
  id:'survive-the-city',
  title:'Survive the City',
  subtitle:'Présenter 3 lieux de ma ville à la classe',
  studentPage:'cours-city.html',
  steps: STEPS.map((s, i) => ({ n:i + 1, title:s.title, skill:s.skill, lu:s.lu, goal:s.goal,
    levels:{
      A:{ title:'Je démarre en douceur', tag:'je choisis la bonne réponse', qs:[{id:(i + 1) + 'A-1', prompt:s.title + ' — niveau A'}] },
      B:{ title:'Je m\'entraîne davantage', tag:'je complète avec les mots', qs:[{id:(i + 1) + 'B-1', prompt:s.title + ' — niveau B'}] },
      C:{ title:'Je me lance sans filet', tag:s.C.title, qs:[{id:(i + 1) + 'C-1', prompt:s.title + ' — niveau C'}] } } }))
};
course.allQuestions = [];
course.steps.forEach(s => ['A','B','C'].forEach(L => s.levels[L].qs.forEach((q, k) => { q.step = s.n; q.level = L; q.index = k; course.allQuestions.push(q); })));

window.CITY_COURSE = course;
window.CITY_DATA = { MISSION, LEARN, PLAN, STEPS };

/* ---- Traductions françaises (bouton « Traduire ») ---- */
window.CITY_FR = {
  mission: `Une **classe anglaise** vient en visite le mois prochain. Étape par étape, prépare **3 lieux** à **présenter à ta classe** : la classe choisira le **programme**.`,
  learn: ['dire **comment y aller**', 'dire **où** c\'est', 'parler de **nourriture et de prix**', 'proposer un **programme** pour la visite', '**présenter** ton guide de la ville'],
  titles: ['Y aller', 'C\'est où ?', 'Manger et acheter', 'Faire un programme', 'Mon guide de la ville'],
  plan: ['Bonjour à tous ! Pour la visite de nos amis anglais…', 'où c\'est + comment y aller', 'nourriture, prix + le plus ancien / le meilleur…', 'le plus… + ton conseil avec should', 'le programme de la visite', 'remercier la classe + poser une question'],
  model: [
    ['Pour aller au musée, prenez le bus 12 : un aller simple coûte deux euros et le bus passe toutes les dix minutes.', 'Pour le château, prenez le train au quai 3 à 10 h 30 : un aller-retour coûte six euros.', 'Pour aller au parc, prenez le tram A et descendez à la place Centrale : le dernier tram est à 23 h 45.'],
    ['Le musée est dans la vieille ville, à côté de la cathédrale.', 'Le château est sur une colline derrière la gare, et il y a deux cafés en face de l\'entrée.', 'Le parc est entre la rivière et l\'école, et il y a une boulangerie au coin.'],
    ['Il y a un café à côté du musée : un sandwich coûte quatre euros, donc ce n\'est pas cher.', 'Le restaurant du château est cher, mais le café du village est moins cher que le restaurant.', 'Le parc est gratuit, mais les T-shirts de la boutique sont plus chers que les cartes postales.'],
    ['Le matin, et si on visitait le musée à dix heures et qu\'on déjeunait au café ?', 'Après le déjeuner, pourquoi ne pas aller au château ? Prenons le train à deux heures et demie.', 'Finissons au parc à cinq heures. On pourrait aussi aller au stade, mais désolé.e, on ne peut pas : il est fermé le dimanche.'],
    ['Bonjour à tous ! Pour la visite de nos amis anglais, voici mes trois lieux et mon programme.', 'Pour commencer, tu devrais visiter le musée. Il est dans la vieille ville, à côté de la cathédrale. Pour y aller, prends le bus 12 : un aller simple coûte deux euros.', 'De plus, le château est le plus vieux bâtiment de la ville. Il est sur une colline derrière la gare : prends le train à 10 h 30. Le café du village est moins cher que le restaurant.', 'Enfin, ne rate pas le parc : c\'est l\'endroit le plus reposant de la ville. Il est entre la rivière et l\'école, et il est gratuit.', 'Et si on visitait le musée à dix heures, puis le château à deux heures et demie ? Finissons au parc à cinq heures. On pourrait aussi aller au stade, mais désolé.e, on ne peut pas : il est fermé le dimanche.', 'Ça vaut le détour ! Merci de m\'avoir écouté.e. Quel lieu préférez-vous ?']
  ]
};

/* ---- Petit point de grammaire (rappel en 3 lignes sur papier ; web : affiché dans le niveau C de l'étape indiquée) ---- */
window.CITY_GRAMMAR = {
  1: {
    title: 'Comment y aller : take, ticket, horaires',
    rules: [
      ['Le transport', '« take + bus 12 / the tram / the train » : To get to the museum, take bus 12.'],
      ['Le ticket', 'a single ticket (aller simple), a return ticket (aller-retour), a day pass.'],
      ['L\'horaire', 'The bus leaves at 9.15 (he / she / it → verbe + s). Every ten minutes.']
    ],
    examples: [['To get to the park, take tram A.', 'Pour aller au parc, prends le tram A.'], ['The train leaves from platform 3.', 'Le train part du quai 3.']],
    verbs: [['leave / leaves','partir'],['arrive / arrives','arriver'],['get off','descendre'],['change trains','changer de train']],
    verbsLabel: 'Verbes utiles',
    check: [
      { q: 'We ___ off at the next stop.', opts: ['get', 'go', 'take', 'put'], ans: 0 },
      { q: 'The last train ___ at 11.45 p.m.', opts: ['leaves', 'leave', 'leaving', 'is leave'], ans: 0 },
      { q: 'Which platform ___ the train leave from?', opts: ['does', 'do', 'is', 'are'], ans: 0 }
    ]
  },
  2: {
    title: 'There is / There are et où ?',
    rules: [
      ['There is / are', '« There is » + singulier, « There are » + pluriel : There are two cafés.'],
      ['Négation', 'There isn\'t a … / There aren\'t any …'],
      ['Où ?', 'next to, opposite, between … and …, behind, in front of, on the corner.']
    ],
    examples: [['There is a bank next to the museum.', 'Il y a une banque à côté du musée.'], ['The park is between the river and the school.', 'Le parc est entre la rivière et l\'école.']],
    verbs: [['next to','à côté de'],['opposite','en face de'],['behind','derrière'],['in front of','devant']],
    verbsLabel: 'Où est-ce ?',
    check: [
      { q: 'There ___ a supermarket near the station.', opts: ['is', 'are', 'be', 'have'], ans: 0 },
      { q: '___ any restaurants near here?', opts: ['Are there', 'Is there', 'There are', 'Do there'], ans: 0 },
      { q: 'The bank is ___ the corner of the street.', opts: ['on', 'in', 'at to', 'by of'], ans: 0 }
    ]
  },
  3: {
    title: 'Les prix et les comparatifs',
    rules: [
      ['Adjectif court', 'adjectif + -er + than : cheaper than, bigger than.'],
      ['Adjectif long', 'more + adjectif + than : more expensive than.'],
      ['Les prix', 'How much is…? / How much are…? It costs four euros. It\'s free.']
    ],
    examples: [['A sandwich is cheaper than a burger.', 'Un sandwich est moins cher qu\'un burger.'], ['How much are the postcards?', 'Combien coûtent les cartes postales ?']],
    verbs: [['cheap → cheaper','bon marché'],['expensive → more expensive','cher'],['It costs…','ça coûte…'],['It\'s free.','c\'est gratuit.']],
    verbsLabel: 'Comparer',
    check: [
      { q: 'This bag is ___ than that one.', opts: ['cheaper', 'more cheap', 'cheapest', 'the cheaper'], ans: 0 },
      { q: 'The hotel is ___ than the hostel.', opts: ['more expensive', 'expensiver', 'most expensive', 'more expensively'], ans: 0 },
      { q: 'A coffee ___ two euros.', opts: ['costs', 'cost', 'is cost', 'costing'], ans: 0 }
    ]
  },
  4: {
    title: 'Proposer un programme et refuser',
    rules: [
      ['Proposer', '« Shall we + base ? » « Let\'s + base. » « Why don\'t we + base ? »'],
      ['L\'heure', 'at ten o\'clock, at half past two, in the morning, in the afternoon.'],
      ['Refuser', '« I\'m afraid we can\'t, because… » + une raison.']
    ],
    examples: [['Shall we visit the museum at ten?', 'Et si on visitait le musée à dix heures ?'], ['Let\'s have lunch in the café.', 'Déjeunons au café.']],
    verbs: [['Shall we…?','et si on… ?'],['Let\'s…','faisons… / allons…'],['Why don\'t we…?','et si on… ?'],['I\'m afraid we can\'t.','désolé.e, on ne peut pas.']],
    verbsLabel: 'Expressions utiles',
    check: [
      { q: 'Shall we ___ to the beach?', opts: ['go', 'going', 'to go', 'goes'], ans: 0 },
      { q: 'Why don\'t we ___ a taxi?', opts: ['take', 'taking', 'to take', 'takes'], ans: 0 },
      { q: 'Let\'s ___ at the station at nine.', opts: ['meet', 'meeting', 'to meet', 'meets'], ans: 0 }
    ]
  },
  5: {
    title: 'should, superlatifs et connecteurs',
    rules: [
      ['Conseiller', '« should / shouldn\'t » + verbe de base : You should visit the market.'],
      ['Superlatif', 'the + adjectif + -est : the oldest. Long : the most interesting.'],
      ['Connecteurs', 'First of all, … Also, … Finally, … but / because.']
    ],
    examples: [['You should try the local food.', 'Tu devrais goûter la cuisine locale.'], ['It\'s the most beautiful park.', 'C\'est le plus beau parc.']],
    verbs: [['big → the biggest','grand'],['old → the oldest','vieux'],['good → the best','bon'],['a hidden gem','un trésor caché']],
    verbsLabel: 'Pour recommander',
    check: [
      { q: 'It\'s ___ building in the city.', opts: ['the oldest', 'the most old', 'the older', 'oldest'], ans: 0 },
      { q: 'You ___ miss the market: it\'s great!', opts: ['shouldn\'t', 'should', 'are', 'do'], ans: 0 },
      { q: 'The market is ___ place to eat.', opts: ['the best', 'the most good', 'the goodest', 'the better'], ans: 0 }
    ]
  }
};
})();
