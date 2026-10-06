/*
  My Year in Pictures — raconter son année en anglais (2nde MES / TNE / BMA).
  Version « plus complexe » de la fiche « My Year 2025 in pictures » : 6 étapes, niveaux A / B / C à chaque étape.
  Partagé par la page élève (cours-year.html), le suivi enseignante (cours-suivi.html) et la fiche papier.
*/
(function(){

const MISSION = `Tell the story of **your year in pictures**. Build a **photo timeline** and **present it orally**.`;
const LEARN = ['tell what you **did** in the past', 'say how you **felt** and why', 'put your memories **in order**', '**describe a photo**', 'compare **good** and **difficult** moments', 'prepare a short **oral**'];

const STEPS = [
 { title:'My best moments', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Objectif : raconter ce que tu as fait pendant l'année avec des phrases simples au prétérit.`,
   vocab:[['I passed a test','j\'ai réussi un test'],['I went to a concert / a festival','je suis allé.e à un concert / un festival'],['I celebrated my birthday','j\'ai fêté mon anniversaire'],['I received a present','j\'ai reçu un cadeau'],['I went on a trip','je suis parti.e en voyage'],['I started playing the guitar','j\'ai commencé à jouer de la guitare'],['I had fun with my friends','je me suis amusé.e avec mes amis'],['I beat a difficult level','j\'ai réussi un niveau difficile'],['I discovered a new game','j\'ai découvert un nouveau jeu'],['I stayed at home','je suis resté.e à la maison']],
   model:[['Teacher','What did you do this year?'],['You','I passed my driving theory test in March.'],['Teacher','What else?'],['You','I went to a festival with my friends and I celebrated my birthday at home.'],['Teacher','Did you receive a nice present?'],['You','Yes, I did. I received a new guitar, so I started playing in July.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'Last year, I ___ a test and I was proud.', opts:['passed','pass','passing','have pass'], ans:0 },
     { q:'In July, we ___ on a trip to Spain.', opts:['went','goed','gone','go'], ans:0 },
     { q:'She ___ a present for her birthday.', opts:['received','receive','receiving','receives'], ans:0 },
     { q:'Which sentence is correct?', opts:['I did not go to the concert.','I did not went to the concert.','I not went to the concert.','I did not going to the concert.'], ans:0 },
     { q:'"Did you play a new game?"', opts:['Yes, I did.','Yes, I played.','Yes, I do.','Yes, I was.'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['passed','ai réussi'],['went','suis allé.e'],['celebrated','ai fêté'],['received','ai reçu'],['started','ai commencé'],['discovered','ai découvert']],
     lines:[['In March, I ',{a:'passed'},' an important test.'],['In June, I ',{a:'went'},' to a festival with my friends.'],['In August, I ',{a:'celebrated'},' my birthday.'],['I ',{a:'received'},' a nice present from my family.'],['In September, I ',{a:'started'},' playing football.'],['I ',{a:'discovered'},' a new video game.']] },
   C:{ title:`J'écris mes 6 souvenirs`, instruct:`Choisis 6 souvenirs de ton année (tu peux en inventer). Écris 6 phrases, une par souvenir, qui commencent par « I » et qui racontent ce que tu as fait.`, ph:`I passed a test.\nI went to a concert.\n…`,
     rubric:`Six phrases simples en anglais, une par souvenir, commençant par « I » et au prétérit (passed, went, received, started, celebrated, discovered, played...). ok = true si au moins 5 phrases sont au prétérit avec un verbe correctement conjugué (y compris les irréguliers courants went, had, saw, got) et compréhensibles.`, minWords:30 } },

 { title:'How I felt', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Objectif : dire ce que tu as ressenti et pourquoi, avec « was / were » et « because ».`,
   vocab:[['I was happy','j\'étais heureux / heureuse'],['I was excited','j\'étais enthousiaste'],['I was proud','j\'étais fier / fière'],['I was nervous','j\'étais nerveux / nerveuse'],['I was sad','j\'étais triste'],['I was disappointed','j\'étais déçu.e'],['I was surprised','j\'étais surpris.e'],['I was amused','j\'étais amusé.e'],['because','parce que'],['so','alors / donc']],
   model:[['Teacher','How did you feel when you passed your test?'],['You','I was proud because I worked hard.'],['Teacher','And at the concert?'],['You','I was excited and a little nervous, because it was my first festival.'],['Teacher','Was there a sad moment?'],['You','Yes. My team lost the final, so I was disappointed.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'I passed the test, so I ___ proud.', opts:['was','were','am','been'], ans:0 },
     { q:'My friends ___ excited about the trip.', opts:['were','was','are','be'], ans:0 },
     { q:'I was sad ___ my friend moved away.', opts:['because','so','but','or'], ans:0 },
     { q:'I lost the game, ___ I was disappointed.', opts:['so','because','although','when'], ans:0 },
     { q:'The film was very funny. I was ___.', opts:['amused','amusing','amuse','amuses'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['was','étais'],['were','étaient'],['because','parce que'],['so','alors'],['nervous','nerveux'],['surprised','surpris']],
     lines:[['I ',{a:'was'},' very happy on my birthday.'],['My friends ',{a:'were'},' proud of me.'],['I was ',{a:'nervous'},' before the test.'],['I was sad ',{a:'because'},' the holidays ended.'],['I won the game, ',{a:'so'},' I was excited.'],['I was ',{a:'surprised'},' by my present.']] },
   C:{ title:`J'écris mes émotions`, instruct:`Reprends 6 souvenirs de ton année. Pour chacun, écris 2 phrases : ce que tu as fait, puis comment tu t'es senti.e et pourquoi.`, ph:`I passed a test. I was proud because …\nI went to a concert. I was …`,
     rubric:`Six souvenirs avec, pour chacun, une action au prétérit puis une émotion exprimée avec « I was + adjectif » et une raison (because ou so). ok = true si au moins 4 souvenirs contiennent une émotion correcte (was/were + adjectif) et au moins 3 une explication avec because ou so, dans un anglais compréhensible.`, minWords:60 } },

 { title:'When did it happen?', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Objectif : placer tes souvenirs dans l'ordre de l'année avec des mots de temps.`,
   vocab:[['in January / in March','en janvier / en mars'],['in spring / in summer','au printemps / en été'],['on my birthday','le jour de mon anniversaire'],['at the end of the year','à la fin de l\'année'],['last summer','l\'été dernier'],['two months later','deux mois plus tard'],['first / then / after that','d\'abord / puis / après cela'],['finally','enfin'],['a few weeks ago','il y a quelques semaines'],['during the holidays','pendant les vacances']],
   model:[['Teacher','Let\'s start your timeline. What happened first?'],['You','In January, I started playing the guitar.'],['Teacher','And then?'],['You','In March, I passed my test. Two months later, I went to a festival.'],['Teacher','What about the end of the year?'],['You','At the end of the year, I celebrated my birthday and finally I received my present.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'I passed my test ___ March.', opts:['in','on','at','during of'], ans:0 },
     { q:'I received a present ___ my birthday.', opts:['on','in','at','for'], ans:0 },
     { q:'I went on a trip ___ the end of the year.', opts:['at','in','on','to'], ans:0 },
     { q:'Which word shows the order of events?', opts:['Then','Because','Although','Or'], ans:0 },
     { q:'Which sentence is in the right order?', opts:['First I started the guitar. Then I played in a concert.','Finally I started the guitar. First I played in a concert.','Then I started the guitar. Finally I played first.','I played in a concert. Then, first, I started the guitar.'], ans:0 } ] },
   B:{ title:'Je complète la timeline', bank:[['In','en'],['on','le'],['later','plus tard'],['After','après'],['Finally','enfin'],['last','dernier']],
     lines:[[{a:'In'},' January, I started playing football.'],['I celebrated my birthday ',{a:'on'},' the 12th of April.'],['Two months ',{a:'later'},', I passed my test.'],[{a:'After'},' that, I went to a festival.'],['Last summer, I went on a trip; ',{a:'last'},' year, I stayed at home.'],[{a:'Finally'},', I received a present at Christmas.']] },
   C:{ title:`J'écris ma timeline`, instruct:`Écris les 6 légendes de ta timeline dans l'ordre de l'année. Chaque phrase commence par un mot de temps (mois, saison, date, then, after that, finally...) et raconte un souvenir au prétérit. Ajoute au moins une émotion.`, ph:`In January, I …\nIn March, I … I was …\nThen …`,
     rubric:`Six légendes de timeline dans l'ordre chronologique, chacune avec un repère de temps correct (in + mois ou saison, on + date, then, after that, finally, later, last...) et un souvenir au prétérit. ok = true si au moins 5 phrases ont un repère de temps correct et un verbe au prétérit, avec un ordre chronologique cohérent.`, minWords:50 } },

 { title:'Describing my photo', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Objectif : décrire une photo de ton année (qui, où, ce que chacun faisait) avec « was / were + -ing ».`,
   vocab:[['in the foreground','au premier plan'],['in the background','à l\'arrière-plan'],['on the left / on the right','à gauche / à droite'],['in the middle','au milieu'],['to wear','porter (un vêtement)'],['to hold','tenir'],['to smile / to laugh','sourire / rire'],['behind / next to','derrière / à côté de'],['while','pendant que'],['It looks like…','on dirait que…']],
   model:[['Teacher','Describe this photo, please.'],['You','In the foreground, I was holding my present and smiling.'],['Teacher','Who is behind you?'],['You','My friends were standing in the background. They were laughing while I was opening the box.'],['Teacher','What was the weather like?'],['You','It was sunny. Everybody was wearing summer clothes.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'In the photo, I ___ a blue T-shirt.', opts:['was wearing','wore wearing','were wearing','am wear'], ans:0 },
     { q:'My friends ___ in the background.', opts:['were laughing','was laughing','laughed laughing','are laughed'], ans:0 },
     { q:'I was opening my present ___ my mum was filming.', opts:['while','because','so','or'], ans:0 },
     { q:'Where is the person who is far from the camera?', opts:['In the background.','In the foreground.','In the pocket.','In the front.'], ans:0 },
     { q:'Which sentence describes a photo correctly?', opts:['My brother was holding a guitar.','My brother holds a guitar yesterday.','My brother was hold a guitar.','My brother were holding a guitar.'], ans:0 } ] },
   B:{ title:'Je complète la description', bank:[['was','étais'],['were','étaient'],['holding','tenant'],['background','arrière-plan'],['while','pendant que'],['left','gauche']],
     lines:[['In the photo, I ',{a:'was'},' smiling.'],['My friends ',{a:'were'},' standing next to me.'],['I was ',{a:'holding'},' a big cake.'],['Two people were dancing in the ',{a:'background'},'.'],['I was blowing out the candles ',{a:'while'},' everybody was singing.'],['My sister is on the ',{a:'left'},'.']] },
   C:{ title:`Je décris ma photo`, instruct:`Choisis une photo de ton année (ou imagine-la). Décris-la en 7 à 9 phrases : où c'était, qui était sur la photo, où chaque personne se trouvait (au premier plan, à l'arrière-plan, à gauche, à droite) et ce que chacun faisait. Utilise le passé continu et au moins une fois « while ».`, ph:`This photo was taken in … \nIn the foreground, I was …\nIn the background, my friends were …`,
     rubric:`Description d'une photo en 7 à 9 phrases : lieu, personnes, positions (in the foreground, in the background, on the left/right, next to, behind) et actions au passé continu (was/were + -ing), avec au moins un « while ». ok = true si au moins 4 phrases utilisent correctement was/were + verbe en -ing, au moins 2 repères de position sont présents et le texte est compréhensible.`, minWords:60 } },

 { title:'Good and difficult moments', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Objectif : comparer un moment préféré et un moment difficile, et expliquer ce que tu as appris.`,
   vocab:[['My favourite moment was…','mon moment préféré était…'],['A difficult moment was…','un moment difficile était…'],['but / however','mais / cependant'],['although','bien que'],['the best / the worst','le meilleur / le pire'],['the most important','le plus important'],['I learnt that…','j\'ai appris que…'],['I felt better when…','je me suis senti.e mieux quand…'],['to overcome','surmonter'],['It made me stronger.','ça m\'a rendu.e plus fort.e.']],
   model:[['Teacher','What was your favourite moment this year?'],['You','My favourite moment was the festival, because I was with my best friends.'],['Teacher','Was there a difficult moment?'],['You','Yes. A difficult moment was my exam, but I worked hard and I passed.'],['Teacher','What did you learn?'],['You','I learnt that I can succeed although it is difficult. It made me stronger.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'My favourite moment ___ the concert.', opts:['was','were','is being','been'], ans:0 },
     { q:'It was difficult, ___ I did not give up.', opts:['but','because','so','or'], ans:0 },
     { q:'___ it was raining, we had a great day.', opts:['Although','Because','So','Then'], ans:0 },
     { q:'That was ___ day of my year!', opts:['the worst','the baddest','the most bad','the worse'], ans:0 },
     { q:'Which sentence explains what you learnt?', opts:['I learnt that friends are important.','I learnt friends important.','I learn that friends were.','I was learnt friends.'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['favourite','préféré'],['difficult','difficile'],['but','mais'],['Although','bien que'],['best','meilleur'],['learnt','ai appris']],
     lines:[['My ',{a:'favourite'},' moment was my birthday party.'],['A ',{a:'difficult'},' moment was my first week at the new school.'],['It was hard, ',{a:'but'},' I made new friends.'],[{a:'Although'},' I was nervous, I spoke in front of the class.'],['It was the ',{a:'best'},' day of the year.'],['I ',{a:'learnt'},' that I can do difficult things.']] },
   C:{ title:`J'écris mon moment préféré et mon moment difficile`, instruct:`Écris 8 à 10 phrases : 1) ton moment préféré et pourquoi, 2) un moment difficile et ce qui s'est passé, 3) ce que tu as appris. Utilise au moins « but » ou « although », « because » et un superlatif (the best, the worst, the most …).`, ph:`My favourite moment was … because …\nA difficult moment was …\nI learnt that …`,
     rubric:`Texte de 8 à 10 phrases : moment préféré avec raison (because), moment difficile avec contraste (but / although / however), ce qui a été appris (I learnt that…), au moins un superlatif (the best, the worst, the most…). Le prétérit doit être correct. ok = true si les trois parties sont présentes, si au moins deux connecteurs différents sont utilisés correctement et si le passé est globalement correct.`, minWords:70 } },

 { title:'Prepare your oral', skill:'EE + EO', lu:'Expression écrite (EE) et Expression orale (EO)',
   goal:`Objectif : écrire le texte complet de ta présentation « My Year in Pictures », puis t'entraîner à le dire à voix haute.`,
   vocab:[['This is my year in pictures.','voici mon année en photos.'],['This photo is important for me.','cette photo est importante pour moi.'],['First, … Then, … After that, …','d\'abord… puis… après cela…'],['My favourite moment was…','mon moment préféré était…'],['A difficult moment was…','un moment difficile était…'],['In this photo, …','sur cette photo, …'],['I learnt that…','j\'ai appris que…'],['To conclude, …','pour conclure, …'],['Thank you for listening.','merci de m\'avoir écouté.e.'],['Do you have any questions?','avez-vous des questions ?']],
   model:[['1. Intro','Hello everyone. This is my year in pictures.'],['2. Moments','First, I started playing the guitar in January. Then I passed my test in March, and I was proud.'],['3. A photo','In this photo, I was holding my present and my friends were laughing in the background.'],['4. Favourite / difficult','My favourite moment was the festival, because I was with my friends. A difficult moment was my exam, but I learnt that I can succeed.'],['5. Conclusion','To conclude, it was a great year. Thank you for listening. Do you have any questions?']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'Which sentence starts the presentation?', opts:['Hello everyone. This is my year in pictures.','Thank you, bye.','To conclude, hello.','Do you have any questions? Hello.'], ans:0 },
     { q:'Which sentence describes a photo?', opts:['In this photo, I was smiling.','In this photo, I smile tomorrow.','This photo was me smile.','In this photo, I am were smiling.'], ans:0 },
     { q:'Which expression introduces your favourite moment?', opts:['My favourite moment was…','To conclude…','Do you have…','In the background…'], ans:0 },
     { q:'How do you put your memories in order?', opts:['First, … Then, … After that, …','Because, … So, … Or, …','Finally, … Finally, … Finally, …','Although, … Hello, …'], ans:0 },
     { q:'What do you say at the very end?', opts:['Thank you for listening. Do you have any questions?','Please sit down.','This is my opinion hello.','See you, I am leaving.'], ans:0 } ] },
   B:{ title:'Je complète mon plan', bank:[['year','année'],['important','importante'],['First','d\'abord'],['favourite','préféré'],['learnt','ai appris'],['listening','écoute']],
     lines:[['This is my ',{a:'year'},' in pictures.'],['This photo is ',{a:'important'},' for me.'],[{a:'First'},', I started playing the guitar.'],['My ',{a:'favourite'},' moment was the festival.'],['I ',{a:'learnt'},' that I can succeed.'],['Thank you for ',{a:'listening'},'.']] },
   C:{ title:`J'écris le texte de mon oral`, instruct:`Écris le texte complet de ton oral (12 à 15 phrases) en 5 parties : 1) introduction, 2) trois souvenirs dans l'ordre avec un mot de temps et une émotion, 3) la description d'une photo, 4) ton moment préféré, un moment difficile et ce que tu as appris, 5) conclusion et « Do you have any questions? ». Ensuite, entraîne-toi à le dire à voix haute avec les boutons 🔊 du modèle.`, ph:`Hello everyone. This is my year in pictures.\nFirst, …\nIn this photo, …`,
     rubric:`Texte d'oral de 12 à 15 phrases en 5 parties : introduction, trois souvenirs dans l'ordre (mots de temps) avec émotions, description d'une photo (was/were + -ing), moment préféré / difficile / ce qui a été appris, conclusion (thank you / questions). Prétérit globalement correct, connecteurs utilisés. ok = true si au moins 4 des 5 parties sont présentes et si le passé est globalement correct.`, minWords:100 } }
];

const course = {
  id:'year-in-pictures',
  title:'My Year in Pictures',
  subtitle:'Raconter mon année en photos en anglais',
  studentPage:'cours-year.html',
  steps: STEPS.map((s, i) => ({ n:i + 1, title:s.title, skill:s.skill, lu:s.lu, goal:s.goal,
    levels:{
      A:{ title:'Je démarre en douceur', tag:'je choisis la bonne réponse', qs:[{id:(i + 1) + 'A-1', prompt:s.title + ' — niveau A'}] },
      B:{ title:'Je m\'entraîne davantage', tag:'je complète avec les mots', qs:[{id:(i + 1) + 'B-1', prompt:s.title + ' — niveau B'}] },
      C:{ title:'Je me lance sans filet', tag:s.C.title, qs:[{id:(i + 1) + 'C-1', prompt:s.title + ' — niveau C'}] } } }))
};
course.allQuestions = [];
course.steps.forEach(s => ['A','B','C'].forEach(L => s.levels[L].qs.forEach((q, k) => { q.step = s.n; q.level = L; q.index = k; course.allQuestions.push(q); })));

window.YEAR_COURSE = course;
window.YEAR_DATA = { MISSION, LEARN, STEPS };

/* ---- Traductions françaises (bouton « Traduire ») ---- */
window.YEAR_FR = {
  mission: `Raconte **ton année en photos**. Crée ta **timeline** et **présente-la à l'oral**.`,
  learn: ['raconter ce que tu as **fait** au passé', 'dire ce que tu as **ressenti** et pourquoi', 'mettre tes souvenirs **dans l\'ordre**', '**décrire une photo**', 'comparer moments **agréables** et **difficiles**', 'préparer un court **oral**'],
  titles: ['Mes meilleurs moments', 'Ce que j\'ai ressenti', 'C\'était quand ?', 'Décrire ma photo', 'Moments agréables et difficiles', 'Préparer mon oral'],
  model: [
    ['Qu\'as-tu fait cette année ?', 'J\'ai réussi mon code de la route en mars.', 'Quoi d\'autre ?', 'Je suis allé.e à un festival avec mes amis et j\'ai fêté mon anniversaire à la maison.', 'As-tu reçu un beau cadeau ?', 'Oui. J\'ai reçu une nouvelle guitare, alors j\'ai commencé à en jouer en juillet.'],
    ['Comment t\'es-tu senti.e quand tu as réussi ton test ?', 'J\'étais fier.ère parce que j\'avais beaucoup travaillé.', 'Et au concert ?', 'J\'étais enthousiaste et un peu nerveux.se, parce que c\'était mon premier festival.', 'Y a-t-il eu un moment triste ?', 'Oui. Mon équipe a perdu la finale, alors j\'étais déçu.e.'],
    ['Commençons ta timeline. Que s\'est-il passé en premier ?', 'En janvier, j\'ai commencé à jouer de la guitare.', 'Et ensuite ?', 'En mars, j\'ai réussi mon test. Deux mois plus tard, je suis allé.e à un festival.', 'Et la fin de l\'année ?', 'À la fin de l\'année, j\'ai fêté mon anniversaire et enfin j\'ai reçu mon cadeau.'],
    ['Décris cette photo, s\'il te plaît.', 'Au premier plan, je tenais mon cadeau et je souriais.', 'Qui est derrière toi ?', 'Mes amis se tenaient à l\'arrière-plan. Ils riaient pendant que j\'ouvrais la boîte.', 'Quel temps faisait-il ?', 'Il faisait beau. Tout le monde portait des vêtements d\'été.'],
    ['Quel a été ton moment préféré cette année ?', 'Mon moment préféré, c\'était le festival, parce que j\'étais avec mes meilleurs amis.', 'Y a-t-il eu un moment difficile ?', 'Oui. Un moment difficile, c\'était mon examen, mais j\'ai beaucoup travaillé et je l\'ai réussi.', 'Qu\'as-tu appris ?', 'J\'ai appris que je peux réussir même si c\'est difficile. Ça m\'a rendu.e plus fort.e.'],
    ['Bonjour à tous. Voici mon année en photos.', 'D\'abord, j\'ai commencé la guitare en janvier. Puis j\'ai réussi mon test en mars, et j\'étais fier.ère.', 'Sur cette photo, je tenais mon cadeau et mes amis riaient à l\'arrière-plan.', 'Mon moment préféré était le festival, parce que j\'étais avec mes amis. Un moment difficile était mon examen, mais j\'ai appris que je peux réussir.', 'Pour conclure, c\'était une super année. Merci de m\'avoir écouté.e. Avez-vous des questions ?']
  ]
};

/* ---- Petit point de grammaire (affiché dans le niveau C de l'étape indiquée) ---- */
window.YEAR_GRAMMAR = {
  1: {
    title: 'Le prétérit : verbes réguliers et irréguliers',
    rules: [
      ['Verbes réguliers', 'On ajoute « -ed » : play → played, pass → passed, celebrate → celebrated.'],
      ['Verbes irréguliers', 'Ils changent de forme : go → went, have → had, see → saw, get → got.'],
      ['Phrases négatives', '« did not » (didn\'t) + verbe de base : I did not go to the concert.'],
      ['Questions', '« Did » + sujet + verbe de base : Did you play a new game ?']
    ],
    examples: [['I passed a test.', 'J\'ai réussi un test.'], ['We went on a trip.', 'Nous sommes parti.e.s en voyage.'], ['I did not stay at home.', 'Je ne suis pas resté.e à la maison.'], ['Did you celebrate your birthday ?', 'As-tu fêté ton anniversaire ?']],
    verbs: [['go → went','aller'],['have → had','avoir'],['see → saw','voir'],['get → got','obtenir'],['win → won','gagner'],['buy → bought','acheter'],['take → took','prendre'],['make → made','faire']],
    verbsLabel: 'Verbes irréguliers',
    check: [
      { q: 'Last summer, I ___ to Italy.', opts: ['went', 'goed', 'go', 'gone'], ans: 0 },
      { q: 'We ___ a great time at the concert.', opts: ['had', 'haved', 'have', 'has'], ans: 0 },
      { q: 'I did not ___ the film.', opts: ['see', 'saw', 'seen', 'seeing'], ans: 0 },
      { q: '___ you win the game?', opts: ['Did', 'Do', 'Were', 'Have'], ans: 0 },
      { q: 'My team ___ the final.', opts: ['won', 'winned', 'win', 'wins'], ans: 0 }
    ]
  },
  2: {
    title: 'was / were, because et so',
    rules: [
      ['« was » ou « were » ?', 'I / he / she / it → was. You / we / they → were : I was proud. My friends were happy.'],
      ['because', '« because » donne la cause : I was sad because I lost.'],
      ['so', '« so » donne la conséquence : I lost, so I was sad.'],
      ['-ed ou -ing ?', '-ed pour ce que je ressens : I was bored. -ing pour ce qui provoque l\'émotion : The film was boring.']
    ],
    examples: [['I was proud because I passed.', 'J\'étais fier.ère parce que j\'ai réussi.'], ['We were excited about the trip.', 'Nous étions enthousiastes à propos du voyage.'], ['I lost, so I was disappointed.', 'J\'ai perdu, alors j\'étais déçu.e.'], ['The game was exciting.', 'Le jeu était passionnant.']],
    verbs: [['happy','heureux.se'],['proud','fier.ère'],['nervous','nerveux.se'],['disappointed','déçu.e'],['surprised','surpris.e'],['amused','amusé.e']],
    verbsLabel: 'Émotions',
    check: [
      { q: 'My friends ___ happy to see me.', opts: ['were', 'was', 'is', 'been'], ans: 0 },
      { q: 'I was proud ___ I won.', opts: ['because', 'so', 'but', 'then'], ans: 0 },
      { q: 'I forgot my phone, ___ I was upset.', opts: ['so', 'because', 'although', 'while'], ans: 0 },
      { q: 'The film was ___.', opts: ['amusing', 'amused', 'amuse', 'amuses'], ans: 0 },
      { q: 'I was ___ by the surprise party.', opts: ['surprised', 'surprising', 'surprise', 'surprises'], ans: 0 }
    ]
  },
  3: {
    title: 'in / on / at et les mots de temps',
    rules: [
      ['in', '« in » + mois, saison, année : in March, in summer, in 2026.'],
      ['on', '« on » + jour ou date précise : on Friday, on my birthday, on the 12th of April.'],
      ['at', '« at » + moment précis ou fin / début : at 8 p.m., at the end of the year.'],
      ['Mots d\'ordre', 'first, then, after that, later, finally pour ordonner. « ago » = il y a : two months ago.']
    ],
    examples: [['In January, I started the guitar.', 'En janvier, j\'ai commencé la guitare.'], ['I celebrated on the 12th of April.', 'J\'ai fêté ça le 12 avril.'], ['Two months later, I went to a festival.', 'Deux mois plus tard, je suis allé.e à un festival.'], ['Finally, I received my present.', 'Enfin, j\'ai reçu mon cadeau.']],
    verbs: [['first','d\'abord'],['then','puis'],['after that','après cela'],['later','plus tard'],['finally','enfin'],['ago','il y a']],
    verbsLabel: 'Mots de temps',
    check: [
      { q: 'I passed my test ___ June.', opts: ['in', 'on', 'at', 'for'], ans: 0 },
      { q: 'We had a party ___ Saturday.', opts: ['on', 'in', 'at', 'to'], ans: 0 },
      { q: 'I got a present ___ the end of the year.', opts: ['at', 'in', 'on', 'by'], ans: 0 },
      { q: 'Three weeks ___, I started a new game.', opts: ['ago', 'last', 'later of', 'before of'], ans: 0 },
      { q: 'I went to the festival. ___, I went home.', opts: ['Finally', 'Because', 'Although', 'So that'], ans: 0 }
    ]
  },
  4: {
    title: 'Le passé continu : was / were + -ing',
    rules: [
      ['Formation', 'was / were + verbe en -ing : I was smiling. They were laughing.'],
      ['À quoi ça sert ?', 'À décrire ce qui était en train de se passer à un moment donné, par exemple sur une photo.'],
      ['while', '« while » (pendant que) relie deux actions qui se passaient en même temps : I was opening the box while my friends were singing.'],
      ['Positions', 'in the foreground, in the background, on the left, on the right, in the middle, next to, behind.']
    ],
    examples: [['I was holding a cake.', 'Je tenais un gâteau.'], ['My friends were laughing in the background.', 'Mes amis riaient à l\'arrière-plan.'], ['She was standing next to me.', 'Elle se tenait à côté de moi.'], ['I was eating while they were dancing.', 'Je mangeais pendant qu\'ils dansaient.']],
    verbs: [['hold → holding','tenir'],['wear → wearing','porter'],['smile → smiling','sourire'],['laugh → laughing','rire'],['stand → standing','se tenir debout'],['dance → dancing','danser']],
    verbsLabel: 'Verbes pour décrire',
    check: [
      { q: 'In the photo, I ___ a red jacket.', opts: ['was wearing', 'wore wearing', 'were wearing', 'am wearing'], ans: 0 },
      { q: 'My friends ___ in the background.', opts: ['were dancing', 'was dancing', 'danced dancing', 'are danced'], ans: 0 },
      { q: 'My mum was filming ___ I was opening my present.', opts: ['while', 'because', 'so', 'then'], ans: 0 },
      { q: 'Mark is on the ___ of the photo.', opts: ['left', 'back', 'ground', 'up'], ans: 0 },
      { q: 'She ___ next to me.', opts: ['was standing', 'were standing', 'stood standing', 'is stand'], ans: 0 }
    ]
  },
  5: {
    title: 'but, although et les superlatifs',
    rules: [
      ['but / however', '« but » oppose deux idées : It was hard, but I did it. « However, » commence une nouvelle phrase.'],
      ['although', '« although » (bien que) introduit une idée qui surprend : Although I was nervous, I spoke.'],
      ['Superlatifs courts', 'the + adjectif + -est : the best, the worst, the happiest, the saddest.'],
      ['Superlatifs longs', 'the most + adjectif : the most important, the most difficult moment.']
    ],
    examples: [['It was difficult, but I passed.', 'C\'était difficile, mais j\'ai réussi.'], ['Although it rained, we had fun.', 'Bien qu\'il ait plu, nous nous sommes amusé.e.s.'], ['It was the best day of the year.', 'C\'était le meilleur jour de l\'année.'], ['The most difficult moment was my exam.', 'Le moment le plus difficile était mon examen.']],
    verbs: [['good → the best','bon → le meilleur'],['bad → the worst','mauvais → le pire'],['happy → the happiest','heureux → le plus heureux'],['important → the most important','important → le plus important'],['I learnt that…','j\'ai appris que…'],['It made me stronger.','ça m\'a rendu.e plus fort.e.']],
    verbsLabel: 'À retenir',
    check: [
      { q: 'It was hard, ___ I did not give up.', opts: ['but', 'because', 'so', 'or'], ans: 0 },
      { q: '___ I was tired, I went to the party.', opts: ['Although', 'Because', 'So', 'When'], ans: 0 },
      { q: 'That was ___ day of my life!', opts: ['the best', 'the goodest', 'the most good', 'the better'], ans: 0 },
      { q: 'The exam was ___ moment of the year.', opts: ['the most difficult', 'the difficultest', 'the more difficult', 'most difficult'], ans: 0 },
      { q: 'I ___ that friends are important.', opts: ['learnt', 'learn', 'learning', 'am learnt'], ans: 0 }
    ]
  },
  6: {
    title: 'Structurer mon oral',
    rules: [
      ['Introduction', '« Hello everyone. This is my year in pictures. »'],
      ['Les souvenirs', 'Utilise first / then / after that / finally, le prétérit et une émotion : First, I passed my test. I was proud.'],
      ['La photo et le bilan', 'Décris une photo avec was / were + -ing, puis donne ton moment préféré, un moment difficile et ce que tu as appris.'],
      ['Conclusion', '« To conclude, it was a great year. Thank you for listening. Do you have any questions? »']
    ],
    examples: [['This photo is important for me.', 'Cette photo est importante pour moi.'], ['In this photo, I was smiling.', 'Sur cette photo, je souriais.'], ['My favourite moment was the festival.', 'Mon moment préféré était le festival.'], ['To conclude, it was a great year.', 'Pour conclure, c\'était une super année.']],
    verbs: [['first','d\'abord'],['then','puis'],['in this photo','sur cette photo'],['my favourite moment','mon moment préféré'],['to conclude','pour conclure'],['thank you for listening','merci de m\'avoir écouté.e']],
    verbsLabel: 'Mots de l\'oral',
    check: [
      { q: '___ is my year in pictures.', opts: ['This', 'There', 'Here are', 'That were'], ans: 0 },
      { q: '___, I started the guitar. Then I passed my test.', opts: ['First', 'Finally', 'Last', 'Because'], ans: 0 },
      { q: 'In this photo, I ___ smiling.', opts: ['was', 'were', 'am being', 'be'], ans: 0 },
      { q: 'To ___, it was a great year.', opts: ['conclude', 'concluded', 'concluding', 'conclusion'], ans: 0 },
      { q: 'Thank you for ___.', opts: ['listening', 'listen', 'to listen', 'listened'], ans: 0 }
    ]
  }
};
})();
