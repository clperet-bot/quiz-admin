/*
  Survive the City — me débrouiller en anglais dans une grande ville (séjour, échange).
  6 étapes, niveaux A / B / C à chaque étape.
  Partagé par la page élève (cours-city.html), le suivi enseignante (cours-suivi.html) et la fiche papier.
*/
(function(){

const MISSION = `An **English class** is visiting next month. Learn to **manage in the city**, then **present 3 places** to your class for the visit.`;
const LEARN = ['buy a **ticket** and ask about **times**', 'say **where** things are', 'ask **prices** and **compare**', 'make **plans** with friends', 'tell **what went wrong**', 'recommend **3 places**'];

const LU1 = 'Compréhension écrite (CE) et Expression écrite (EE)';

const STEPS = [
 { title:'Getting around', skill:'CE + EE', lu:LU1,
   goal:`Objectif : acheter un ticket et poser des questions sur les horaires.`,
   vocab:[['a return ticket','un aller-retour'],['a day pass','un pass pour la journée'],['the timetable','l\'horaire / le tableau des horaires'],['the platform','le quai'],['the next train / bus','le prochain train / bus'],['It leaves at…','il part à…'],['How often…?','à quelle fréquence… ?'],['to change trains','changer de train'],['to get off','descendre'],['the last bus','le dernier bus']],
   model:[['You','A return ticket to the museum, please.'],['Clerk','Here you are. That\'s six euros.'],['You','What time does the next train leave?'],['Clerk','It leaves at ten fifteen.'],['You','Which platform does it leave from? And how often do trains run?'],['Clerk','Platform four. There is a train every ten minutes.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'What time ___ the next bus leave?', opts:['does','do','is','are'], ans:0 },
     { q:'___ do the trains run on Sundays?', opts:['How often','How much','How many','How old'], ans:0 },
     { q:'You want to go to the station and come back. You ask for…', opts:['a return ticket','a single ticket','a timetable','a platform'], ans:0 },
     { q:'The last train ___ at 11.45 p.m.', opts:['leaves','leave','leaving','is leave'], ans:0 },
     { q:'Which sentence is correct?', opts:['Which platform does the train leave from?','Which platform the train leaves from?','Which platform does the train leaves from?','Which platform do the train leave from?'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['return','retour'],['platform','quai'],['timetable','horaire'],['often','souvent'],['off','descendre'],['change','changer']],
     lines:[['A ',{a:'return'},' ticket to the museum, please.'],['Which ',{a:'platform'},' does the train leave from?'],['Check the ',{a:'timetable'},': the last bus is at 11 p.m.'],['How ',{a:'often'},' do the buses run on Sundays?'],['Get ',{a:'off'},' at the next stop.'],['You must ',{a:'change'},' trains at Central Station.']] },
   C:{ title:`Je pose mes questions`, instruct:`Tu es à la gare. Écris un dialogue de 6 répliques avec l'employé.e : tu achètes ton ticket et tu poses tes questions sur le train.`, ph:`You: A ticket to …, please.\nClerk: …\nYou: What time …`,
     rubric:`Dialogue de 6 répliques à la gare entre l'élève et un.e employé.e (les répliques de l'employé.e peuvent être très courtes). ok = true si l'élève demande un ticket (single, return, day pass...), pose au moins deux questions correctes parmi : What time does… leave ? / Which platform… ? / How often… ? (auxiliaire does + verbe de base, ou construction correcte), et si l'ensemble est compréhensible. Tolère les petites fautes.`, minWords:40 } },

 { title:'Where is it?', skill:'CE + EE', lu:LU1,
   goal:`Objectif : situer des lieux dans la ville et demander s'il y en a près d'ici.`,
   vocab:[['next to','à côté de'],['opposite','en face de'],['between … and …','entre … et …'],['behind','derrière'],['in front of','devant'],['on the corner (of)','au coin (de)'],['across the street','de l\'autre côté de la rue'],['at the end of the street','au bout de la rue'],['Is there a … near here?','y a-t-il un … près d\'ici ?'],['There is / There are','il y a (singulier / pluriel)']],
   model:[['You','Excuse me, is there a pharmacy near here?'],['Passer-by','Yes, there is. It\'s opposite the library.'],['You','And are there any cafés around here?'],['Passer-by','Yes, there are two. One is next to the bank.'],['You','Is the cinema far?'],['Passer-by','No. It\'s between the supermarket and the post office.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'There ___ two banks in my street.', opts:['are','is','be','has'], ans:0 },
     { q:'___ a bakery near here?', opts:['Is there','Are there','There is','Does there'], ans:0 },
     { q:'The cinema is ___ the bank and the park.', opts:['between','behind','opposite of','among to'], ans:0 },
     { q:'The school is on one side of the road and the park is on the other side. The park is ___ the school.', opts:['opposite','between','behind','at'], ans:0 },
     { q:'Which sentence is correct?', opts:['There aren\'t any shops on the corner.','There isn\'t any shops on the corner.','It hasn\'t any shops on the corner.','There not are any shops on the corner.'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['next','à côté'],['opposite','en face de'],['between','entre'],['behind','derrière'],['corner','coin'],['near','près']],
     lines:[['The pharmacy is ',{a:'next'},' to the bank.'],['The café is ',{a:'opposite'},' the station: I can see it from the door.'],['The park is ',{a:'between'},' the school and the museum.'],['The bike parking is ',{a:'behind'},' the library, at the back.'],['The bakery is on the ',{a:'corner'},' of the street.'],['Is there a supermarket ',{a:'near'},' here?']] },
   C:{ title:`Je décris mon quartier`, instruct:`Écris 6 phrases pour situer 6 lieux de ta ville (ou d'une ville imaginaire). Utilise « there is » ou « there are » et 4 prépositions différentes.`, ph:`There is a bakery next to …\nThere are two cafés …`,
     rubric:`Six phrases situant des lieux de la ville. ok = true si au moins 5 phrases sont compréhensibles, si « there is » et « there are » sont utilisés au moins une fois chacun correctement (accord singulier / pluriel) et si au moins 4 prépositions de lieu différentes sont correctes (next to, opposite, between, behind, in front of, on the corner, near...).`, minWords:40 } },

 { title:'Shopping', skill:'CE + EE', lu:LU1,
   goal:`Objectif : demander un prix, essayer, comparer et dire que c'est trop cher.`,
   vocab:[['How much is this jacket?','combien coûte cette veste ?'],['How much are these shoes?','combien coûtent ces chaussures ?'],['Can I try it on?','puis-je l\'essayer ?'],['the fitting room','la cabine d\'essayage'],['It\'s too expensive.','c\'est trop cher.'],['Do you have a cheaper one?','en avez-vous un moins cher ?'],['a bigger / smaller size','une taille au-dessus / en dessous'],['It\'s on sale.','c\'est en solde.'],['I\'ll take it.','je le prends.'],['Can I pay by card?','puis-je payer par carte ?']],
   model:[['You','Excuse me, how much is this jacket?'],['Seller','It\'s sixty euros.'],['You','That\'s too expensive. Do you have a cheaper one?'],['Seller','Yes, this one is forty euros. It\'s on sale.'],['You','It\'s nice. Can I try it on?'],['Seller','Of course. The fitting room is over there.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'___ are these trainers?', opts:['How much','How many','How long','How often'], ans:0 },
     { q:'This T-shirt costs 10 euros. That one costs 15 euros. This one is ___.', opts:['cheaper','cheapest','more cheap','the cheaper'], ans:0 },
     { q:'There isn\'t ___ milk in the fridge.', opts:['any','some','many','a'], ans:0 },
     { q:'Can I ___ these shoes on?', opts:['try','test','taste','look'], ans:0 },
     { q:'A watch costs 200 euros. A phone costs 500 euros. The phone is ___ than the watch.', opts:['more expensive','expensiver','most expensive','more expensively'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['much','combien'],['try','essayer'],['too','trop'],['cheaper','moins cher'],['any','de'],['lot','beaucoup']],
     lines:[['How ',{a:'much'},' is this T-shirt?'],['Can I ',{a:'try'},' it on?'],['It\'s ',{a:'too'},' expensive for me: I only have 20 euros.'],['Do you have a ',{a:'cheaper'},' one?'],['Sorry, we don\'t have ',{a:'any'},' small sizes.'],['There are a ',{a:'lot'},' of people in the shop today.']] },
   C:{ title:`Je fais mes achats`, instruct:`Tu es dans un magasin de vêtements. Écris un dialogue de 6 répliques : tu demandes un prix, tu négocies un moins cher et tu veux essayer.`, ph:`You: Excuse me, how much …\nSeller: …\nYou: …`,
     rubric:`Dialogue de 6 répliques dans un magasin entre l'élève et un.e vendeur.se. ok = true si l'élève demande un prix avec How much is / are (accord correct), utilise au moins un comparatif correct (cheaper, bigger, more expensive...) ou une expression comme too expensive, et demande à essayer (Can I try it on ?). Tolère les petites fautes si le sens est clair.`, minWords:45 } },

 { title:'Making plans', skill:'CE + EE', lu:LU1,
   goal:`Objectif : inviter, accepter et refuser poliment.`,
   vocab:[['Are you free on Saturday?','es-tu libre samedi ?'],['Shall we go to the cinema?','et si on allait au cinéma ?'],['Let\'s meet at six.','retrouvons-nous à six heures.'],['Do you want to come?','tu veux venir ?'],['Sounds great!','ça a l\'air super !'],['I\'d love to.','avec plaisir.'],['I\'m afraid I can\'t.','je suis désolé.e, je ne peux pas.'],['I\'m going to visit my cousin.','je vais rendre visite à mon cousin.'],['What about Sunday?','et si c\'était dimanche ?'],['See you there!','à tout à l\'heure !']],
   model:[['Friend','Are you free on Saturday?'],['You','Yes, I am.'],['Friend','Shall we go to the cinema?'],['You','Sounds great! Let\'s meet at six.'],['Friend','Do you want to go bowling on Sunday too?'],['You','I\'m afraid I can\'t. I\'m going to see my cousin.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'___ we go to the park?', opts:['Shall','Do','Will to','Are'], ans:0 },
     { q:'Let\'s ___ at 7 p.m.', opts:['meet','to meet','meeting','meets'], ans:0 },
     { q:'Do you want ___ come to the match?', opts:['to','for','that','-ing'], ans:0 },
     { q:'Tomorrow I ___ visit my grandparents.', opts:['am going to','go to','will going','am go to'], ans:0 },
     { q:'Your friend invites you but you are busy. You say:', opts:['I\'m afraid I can\'t.','I\'m afraid I don\'t.','Yes, I\'m not.','I can\'t afraid.'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['Shall','et si'],['Let\'s','allons'],['want','veux'],['going','(aller)'],['afraid','désolé.e'],['free','libre']],
     lines:[[{a:'Shall'},' we meet at the station?'],[{a:'Let\'s'},' go to the beach!'],['Do you ',{a:'want'},' to come with us?'],['I\'m ',{a:'going'},' to watch a film tonight.'],['I\'m ',{a:'afraid'},' I can\'t come on Friday.'],['Are you ',{a:'free'},' on Sunday afternoon?']] },
   C:{ title:`J'organise ma sortie`, instruct:`Tu invites un.e ami.e en ville. Écris un dialogue de 6 répliques : propose une sortie, fixe un lieu et une heure, puis refuse poliment une autre idée en donnant une raison.`, ph:`You: Shall we …?\nFriend: …\nYou: Let's …`,
     rubric:`Dialogue de 6 répliques pour organiser une sortie. ok = true si l'élève utilise au moins deux structures parmi Shall we + base / Let's + base / Do you want to + base / Are you free…?, accepte avec une expression (Sounds great, I'd love to...), refuse poliment avec « I'm afraid I can't » ou équivalent et donne une raison avec be going to ou une autre structure correcte. Tolère les petites fautes si le sens est clair.`, minWords:45 } },

 { title:'Something went wrong', skill:'CE + EE', lu:LU1,
   goal:`Objectif : signaler un problème à un.e agent et raconter ce qui s'est passé.`,
   vocab:[['I\'ve lost my wallet.','j\'ai perdu mon portefeuille.'],['Someone stole my phone.','on m\'a volé mon téléphone.'],['I left my bag on the bus.','j\'ai oublié mon sac dans le bus.'],['I missed the last train.','j\'ai raté le dernier train.'],['The bus was late.','le bus avait du retard.'],['the lost property office','le bureau des objets trouvés'],['to report a problem','signaler un problème'],['What happened?','que s\'est-il passé ?'],['I was walking when…','je marchais quand…'],['It happened while…','c\'est arrivé pendant que…']],
   model:[['Agent','Hello. What\'s the problem?'],['You','I\'ve lost my bag.'],['Agent','When did you lose it?'],['You','This morning. I was waiting for the bus when I put it on the ground.'],['Agent','And what happened next?'],['You','The bus arrived, so I got on. I forgot my bag.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'Yesterday, I ___ my keys in a café.', opts:['lost','losed','have lose','was lose'], ans:0 },
     { q:'I was walking in the street ___ a man took my bag.', opts:['when','because','so','although'], ans:0 },
     { q:'I ___ the last bus, so I walked home.', opts:['missed','miss','was miss','have missing'], ans:0 },
     { q:'What ___ you doing when it happened?', opts:['were','was','did','are'], ans:0 },
     { q:'Someone ___ my wallet in the metro.', opts:['stole','stealed','stolen','steal'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['lost','ai perdu'],['stole','a volé'],['missed','avons raté'],['when','quand'],['was','était'],['report','signaler']],
     lines:[['I\'m sorry, I ',{a:'lost'},' my wallet.'],['A man ',{a:'stole'},' my phone on the bus.'],['We ',{a:'missed'},' the last train, so we took a taxi.'],['I was waiting for a friend ',{a:'when'},' I saw the accident.'],['It ',{a:'was'},' raining when I left the shop.'],['I would like to ',{a:'report'},' a problem, please.']] },
   C:{ title:`Je raconte ma mésaventure`, instruct:`Invente un problème en ville (objet perdu ou volé, retard). Écris un dialogue de 8 répliques avec un.e agent : dis ce qui s'est passé et ce que tu faisais à ce moment-là.`, ph:`Agent: What's the problem?\nYou: I've lost …\nAgent: When …?`,
     rubric:`Dialogue de 8 répliques entre l'élève et un.e agent à propos d'un problème en ville. ok = true si l'élève signale le problème (I've lost / Someone stole / I missed...), utilise au moins deux verbes au prétérit correctement (lost, left, missed, stole, arrived...) et au moins une phrase au passé continu (was / were + -ing) avec when ou while. Tolère les petites fautes si le sens est clair.`, minWords:60 } },

 { title:'My city guide', skill:'EE + EO', lu:'Expression écrite (EE) et Expression orale (EO)',
   goal:`Objectif : présenter 3 lieux à la classe pour la visite des élèves anglais.`,
   vocab:[['You should visit…','tu devrais visiter…'],['You shouldn\'t miss…','ne rate pas…'],['the best place to… is…','le meilleur endroit pour… est…'],['the most interesting…','le plus intéressant…'],['the biggest / the oldest','le plus grand / le plus ancien'],['It\'s famous for…','c\'est célèbre pour…'],['a hidden gem','un trésor caché'],['First of all, / Also, / Finally,','pour commencer, / de plus, / enfin,'],['because / but','parce que / mais'],['It\'s worth a visit.','ça vaut le détour.']],
   model:[['1. Intro','Hello everyone! For the visit of our English friends, here are my top three places.'],['2. Place 1','First of all, you should visit the old town. It\'s the most beautiful area, because the streets are small and the buildings are very old.'],['3. Place 2','Also, the best place to eat is the market. It\'s cheap and it\'s famous for its fresh food.'],['4. Place 3','Finally, you shouldn\'t miss the park. It\'s a hidden gem and it\'s the most relaxing place in the city.'],['5. Tip','But don\'t go there on Sunday, because it\'s very busy.'],['6. Conclusion','It\'s worth a visit! Thank you for listening.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'You ___ visit the old town. It\'s beautiful.', opts:['should','must to','are should','shall to'], ans:0 },
     { q:'This is the number one place in the city. It\'s ___ place.', opts:['the best','the goodest','the most good','the better'], ans:0 },
     { q:'It\'s ___ interesting building in town.', opts:['the most','the more','most','the interestingest'], ans:0 },
     { q:'The park is beautiful, ___ it is very crowded on Sundays.', opts:['but','so','because','finally'], ans:0 },
     { q:'Which sentence gives good advice?', opts:['You should try the local food.','You should to try the local food.','You shoulds try the local food.','You should trying the local food.'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['should','devrais'],['best','meilleur'],['most','le plus'],['because','parce que'],['Finally','enfin'],['famous','célèbre']],
     lines:[['You ',{a:'should'},' visit the castle.'],['The market is the ',{a:'best'},' place to buy fresh food.'],['It is the ',{a:'most'},' beautiful park in the city.'],['I love this café ',{a:'because'},' the coffee is excellent.'],[{a:'Finally'},', you shouldn\'t miss the river at night.'],['This street is ',{a:'famous'},' for its street food.']] },
   C:{ title:`J'écris mon city guide`, instruct:`Tu parles à ta classe, qui choisira le programme de la visite. Présente 3 lieux de ta ville (ou imaginaire) : pour chacun, un conseil, un superlatif et une raison. Utilise des connecteurs. Ensuite, entraîne-toi à le dire à voix haute avec les boutons 🔊 du modèle.`, ph:`Hello everyone! \nFirst of all, you should visit …\nAlso, …\nFinally, …`,
     rubric:`Guide de ville d'au moins 8 phrases présentant 3 lieux. ok = true si les 3 lieux sont présents, si « should » ou « shouldn't » est utilisé correctement au moins deux fois, si au moins deux superlatifs corrects sont utilisés (the best, the most interesting, the biggest, the oldest...) et si au moins deux connecteurs différents (first of all, also, finally, because, but...) sont utilisés. Tolère les petites fautes si le sens est clair.`, minWords:90 } }
];

const course = {
  id:'survive-the-city',
  title:'Survive the City',
  subtitle:'Me débrouiller en anglais dans une grande ville',
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
window.CITY_DATA = { MISSION, LEARN, STEPS };

/* ---- Traductions françaises (bouton « Traduire ») ---- */
window.CITY_FR = {
  mission: `Une **classe anglaise** vient en visite le mois prochain. Apprends à **te débrouiller en ville**, puis **présente 3 lieux** à ta classe pour la visite.`,
  learn: ['acheter un **ticket** et demander les **horaires**', 'dire **où** sont les choses', 'demander des **prix** et **comparer**', 'faire des **projets** avec des amis', 'raconter **ce qui s\'est mal passé**', 'recommander **3 lieux**'],
  titles: ['Me déplacer', 'C\'est où ?', 'Faire les magasins', 'Faire des projets', 'Quand ça tourne mal', 'Mon guide de la ville'],
  model: [
    ['Un aller-retour pour le musée, s\'il vous plaît.', 'Voilà. Ça fait six euros.', 'À quelle heure part le prochain train ?', 'Il part à dix heures quinze.', 'De quel quai part-il ? Et à quelle fréquence passent les trains ?', 'Quai quatre. Il y a un train toutes les dix minutes.'],
    ['Excusez-moi, y a-t-il une pharmacie près d\'ici ?', 'Oui. Elle est en face de la bibliothèque.', 'Et y a-t-il des cafés dans le coin ?', 'Oui, il y en a deux. L\'un est à côté de la banque.', 'Le cinéma est-il loin ?', 'Non. Il est entre le supermarché et la poste.'],
    ['Excusez-moi, combien coûte cette veste ?', 'Elle coûte soixante euros.', 'C\'est trop cher. En avez-vous une moins chère ?', 'Oui, celle-ci coûte quarante euros. Elle est en solde.', 'Elle est jolie. Puis-je l\'essayer ?', 'Bien sûr. La cabine d\'essayage est là-bas.'],
    ['Es-tu libre samedi ?', 'Oui.', 'Et si on allait au cinéma ?', 'Super ! Retrouvons-nous à six heures.', 'Tu veux aussi aller au bowling dimanche ?', 'Je suis désolé.e, je ne peux pas. Je vais voir mon cousin.'],
    ['Bonjour. Quel est le problème ?', 'J\'ai perdu mon sac.', 'Quand l\'avez-vous perdu ?', 'Ce matin. J\'attendais le bus quand je l\'ai posé par terre.', 'Et que s\'est-il passé ensuite ?', 'Le bus est arrivé, alors je suis monté.e. J\'ai oublié mon sac.'],
    ['Bonjour à tous ! Pour la visite de nos amis anglais, voici mes trois lieux préférés.', 'Pour commencer, tu devrais visiter la vieille ville. C\'est le plus beau quartier, parce que les rues sont petites et les bâtiments très anciens.', 'De plus, le meilleur endroit pour manger est le marché. Il n\'est pas cher et il est célèbre pour ses produits frais.', 'Enfin, ne rate pas le parc. C\'est un trésor caché et c\'est l\'endroit le plus reposant de la ville.', 'Mais n\'y va pas le dimanche, parce qu\'il y a beaucoup de monde.', 'Ça vaut le détour ! Merci de m\'avoir écouté.e.']
  ]
};

/* ---- Petit point de grammaire (affiché dans le niveau C de l'étape indiquée) ---- */
window.CITY_GRAMMAR = {
  1: {
    title: 'Les questions : What time, Which, How often',
    rules: [
      ['L\'heure', '« What time does + sujet + verbe de base ? » : What time does the bus leave ?'],
      ['Le choix', '« Which platform / Which bus … ? » pour choisir parmi plusieurs.'],
      ['La fréquence', '« How often … ? » : Every ten minutes. Twice an hour.'],
      ['Présent simple', 'he / she / it → verbe + s : The train leaves at 9.15. (at half past nine)']
    ],
    examples: [['What time does the museum open ?', 'À quelle heure ouvre le musée ?'], ['Which platform does it leave from ?', 'De quel quai part-il ?'], ['How often do the buses run ?', 'À quelle fréquence passent les bus ?'], ['The train arrives at 6.30.', 'Le train arrive à 6 h 30.']],
    verbs: [['leave / leaves','partir'],['arrive / arrives','arriver'],['run / runs','circuler'],['stop / stops','s\'arrêter'],['change trains','changer de train'],['get off','descendre']],
    verbsLabel: 'Verbes utiles',
    check: [
      { q: 'What time ___ the last train arrive?', opts: ['does', 'do', 'is', 'are'], ans: 0 },
      { q: 'The bus ___ every ten minutes.', opts: ['runs', 'run', 'running', 'is run'], ans: 0 },
      { q: '___ platform does it leave from?', opts: ['Which', 'Who', 'When', 'Whose'], ans: 0 },
      { q: 'How ___ do the trains stop here?', opts: ['often', 'much', 'long ago', 'old'], ans: 0 },
      { q: 'The shop ___ at 9 a.m.', opts: ['opens', 'open', 'opening', 'is open at'], ans: 0 }
    ]
  },
  2: {
    title: 'There is / There are et les prépositions de lieu',
    rules: [
      ['There is / are', '« There is » + singulier, « There are » + pluriel : There is a bank. There are two cafés.'],
      ['Questions', '« Is there a … ? » « Are there any … ? » Réponse : Yes, there is. No, there aren\'t.'],
      ['Négation', 'There isn\'t a … / There aren\'t any …'],
      ['Où ?', 'next to, opposite, between … and …, behind, in front of, on the corner.']
    ],
    examples: [['Is there a pharmacy near here ?', 'Y a-t-il une pharmacie près d\'ici ?'], ['There are two banks in my street.', 'Il y a deux banques dans ma rue.'], ['The café is opposite the station.', 'Le café est en face de la gare.'], ['The cinema is between the bank and the park.', 'Le cinéma est entre la banque et le parc.']],
    verbs: [['next to','à côté de'],['opposite','en face de'],['between','entre'],['behind','derrière'],['in front of','devant'],['on the corner','au coin']],
    verbsLabel: 'Où est-ce ?',
    check: [
      { q: 'There ___ a supermarket next to the station.', opts: ['is', 'are', 'be', 'have'], ans: 0 },
      { q: '___ any restaurants near here?', opts: ['Are there', 'Is there', 'There are', 'Do there'], ans: 0 },
      { q: 'There ___ any parks in this area.', opts: ['aren\'t', 'isn\'t', 'not', 'don\'t'], ans: 0 },
      { q: 'The bank is ___ the café and the library.', opts: ['between', 'behind', 'next', 'under of'], ans: 0 },
      { q: 'The bakery is ___ the corner of the street.', opts: ['on', 'in', 'at to', 'by of'], ans: 0 }
    ]
  },
  3: {
    title: 'Comparatifs et some / any / a lot of',
    rules: [
      ['Adjectif court', 'adjectif + -er + than : cheaper than, bigger than. Long : more expensive than.'],
      ['Irrégulier', 'good → better, bad → worse.'],
      ['some / any / a lot of', '« some » : phrases positives. « any » : négatives et questions. « a lot of » : partout.'],
      ['How much / How many', '« How much » + indénombrable (milk, money). « How many » + dénombrable (shoes).']
    ],
    examples: [['This jacket is cheaper than that one.', 'Cette veste est moins chère que celle-là.'], ['This phone is more expensive than my old one.', 'Ce téléphone est plus cher que mon ancien.'], ['We don\'t have any small sizes.', 'Nous n\'avons pas de petites tailles.'], ['How many T-shirts do you want ?', 'Combien de T-shirts veux-tu ?']],
    verbs: [['cheap → cheaper','bon marché'],['big → bigger','grand'],['expensive → more expensive','cher'],['good → better','bon'],['a size','une taille'],['a receipt','un reçu']],
    verbsLabel: 'Comparer',
    check: [
      { q: 'This bag is ___ than that one.', opts: ['cheaper', 'more cheap', 'cheapest', 'the cheaper'], ans: 0 },
      { q: 'These shoes are ___ than the black ones.', opts: ['more expensive', 'expensiver', 'most expensive', 'more expensively'], ans: 0 },
      { q: 'I need ___ water, please.', opts: ['some', 'a', 'many', 'few'], ans: 0 },
      { q: 'We haven\'t got ___ red jackets.', opts: ['any', 'some', 'a', 'much of'], ans: 0 },
      { q: 'How ___ is the milk?', opts: ['much', 'many', 'long', 'often'], ans: 0 }
    ]
  },
  4: {
    title: 'Proposer, accepter, refuser + be going to',
    rules: [
      ['Proposer', '« Shall we + base ? » « Let\'s + base. » « Do you want to + base ? »'],
      ['Accepter', 'Sounds great ! / Good idea ! / I\'d love to.'],
      ['Refuser poliment', '« I\'m afraid I can\'t. » + une raison. What about … instead ?'],
      ['be going to', 'am / is / are + going to + base : un projet prévu. I\'m going to see my cousin.']
    ],
    examples: [['Shall we go to the cinema ?', 'Et si on allait au cinéma ?'], ['Let\'s meet at six.', 'Retrouvons-nous à six heures.'], ['I\'m afraid I can\'t. I\'m going to work.', 'Désolé.e, je ne peux pas. Je vais travailler.'], ['We are going to visit the castle.', 'Nous allons visiter le château.']],
    verbs: [['Shall we…?','et si on… ?'],['Let\'s…','allons… / faisons…'],['I\'d love to.','avec plaisir.'],['I\'m afraid I can\'t.','désolé.e, je ne peux pas.'],['What about…?','et si c\'était… ?'],['I\'m going to…','je vais…']],
    verbsLabel: 'Expressions utiles',
    check: [
      { q: 'Shall we ___ to the beach?', opts: ['go', 'going', 'to go', 'goes'], ans: 0 },
      { q: 'Let\'s ___ a film tonight.', opts: ['watch', 'watching', 'to watch', 'watches'], ans: 0 },
      { q: 'Do you want ___ with us?', opts: ['to come', 'come', 'coming', 'comes'], ans: 0 },
      { q: 'She ___ to see her grandmother tomorrow.', opts: ['is going', 'goes', 'are going', 'going'], ans: 0 },
      { q: 'You can\'t come. You say: "I\'m ___ I can\'t."', opts: ['afraid', 'scared of', 'fear', 'afraiding'], ans: 0 }
    ]
  },
  5: {
    title: 'Prétérit et passé continu : was walking when…',
    rules: [
      ['Le problème', '« I\'ve lost my bag. » dit le problème. Pour raconter : I lost it this morning.'],
      ['Prétérit', 'action courte et finie : lost, left, missed, stole. (Irréguliers à connaître !)'],
      ['Passé continu', 'was / were + -ing : ce qui était en cours. I was walking.'],
      ['when / while', 'I was walking when a man took my bag. (when + action courte)']
    ],
    examples: [['I lost my wallet this morning.', 'J\'ai perdu mon portefeuille ce matin.'], ['I was waiting for the bus when it started to rain.', 'J\'attendais le bus quand il s\'est mis à pleuvoir.'], ['Someone stole my phone while I was dancing.', 'On m\'a volé mon téléphone pendant que je dansais.'], ['What were you doing ?', 'Que faisais-tu ?']],
    verbs: [['lose → lost','perdre'],['leave → left','laisser, partir'],['steal → stole','voler'],['miss → missed','rater'],['take → took','prendre'],['forget → forgot','oublier']],
    verbsLabel: 'Verbes du problème',
    check: [
      { q: 'I ___ my phone on the bus yesterday.', opts: ['left', 'leaved', 'have leave', 'was left'], ans: 0 },
      { q: 'Someone ___ my bag in the metro.', opts: ['stole', 'stealed', 'stolen', 'steals'], ans: 0 },
      { q: 'I ___ walking when I saw the accident.', opts: ['was', 'were', 'am', 'did'], ans: 0 },
      { q: 'We were waiting ___ the train arrived.', opts: ['when', 'because', 'so', 'or'], ans: 0 },
      { q: 'What ___ you doing at 8 o\'clock?', opts: ['were', 'was', 'did', 'have'], ans: 0 }
    ]
  },
  6: {
    title: 'should, superlatifs et connecteurs',
    rules: [
      ['Conseiller', '« should / shouldn\'t » + verbe de base : You should visit the market.'],
      ['Superlatif court', 'the + adjectif + -est : the biggest, the oldest, the best.'],
      ['Superlatif long', 'the most + adjectif : the most interesting place.'],
      ['Connecteurs', 'First of all, … Also, … Finally, … but / because.']
    ],
    examples: [['You should try the local food.', 'Tu devrais goûter la cuisine locale.'], ['It\'s the oldest building in town.', 'C\'est le plus vieux bâtiment de la ville.'], ['It\'s the most beautiful park.', 'C\'est le plus beau parc.'], ['First of all, visit the old town. Finally, relax in the park.', 'Pour commencer, visite la vieille ville. Enfin, détends-toi dans le parc.']],
    verbs: [['big → the biggest','grand'],['old → the oldest','vieux'],['good → the best','bon'],['interesting → the most interesting','intéressant'],['famous for','célèbre pour'],['a hidden gem','un trésor caché']],
    verbsLabel: 'Pour recommander',
    check: [
      { q: 'You ___ visit the castle. It\'s amazing.', opts: ['should', 'should to', 'shoulds', 'are should'], ans: 0 },
      { q: 'It\'s ___ building in the city.', opts: ['the oldest', 'the most old', 'the older', 'oldest'], ans: 0 },
      { q: 'This is ___ interesting museum I know.', opts: ['the most', 'the more', 'most', 'the very'], ans: 0 },
      { q: 'You should go there ___ it\'s free.', opts: ['because', 'but', 'so that', 'although'], ans: 0 },
      { q: '___, you shouldn\'t miss the river.', opts: ['Finally', 'Because', 'Although', 'So'], ans: 0 }
    ]
  }
};
})();
