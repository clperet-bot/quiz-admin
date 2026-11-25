/*
  Behind the Screen — My opinion (Spider-Man: Brand New Day) — cours d'anglais interactif.
  4 étapes qui se cumulent vers la critique finale du film.
  Niveaux A / B / C à chaque étape (= les niveaux « Je démarre en douceur », « Je m'entraîne davantage »,
  « Je me lance sans filet » du cours papier).
  Partagé par la page élève (cours-behind.html) et le suivi enseignante (cours-suivi.html).

  Types d'activités (acts) :
   select   : menus déroulants corrigés automatiquement  { items:[{q, opts, exp}] }
   fill     : phrases à trous avec une liste de mots     { lines:[[texte,{a, b?},texte…]], bank:[[en,fr]], banks? }
   qa       : questions ouvertes corrigées par l'IA       { questions, lang:'fr'|'en', rubric, minWords }
   write    : production écrite corrigée par l'IA         { rubric, minWords, ph, frames?, example?, refs? }
*/
(function(){

/* ── Bande-annonce : colle ici l'identifiant YouTube de la vidéo (la partie après v=) pour l'afficher dans la page.
      Laissé vide, la page propose un bouton qui ouvre la recherche YouTube. ── */
const TRAILER = { file:'spiderman-trailer.mp4', id:'', search:'Spider-Man Brand New Day official trailer' };

const MISSION = "Your mission: write a **movie review** of **Spider-Man: Brand New Day**. Follow **4 steps**: watch the trailer, write a summary, read reviews, then write your own review.";
const FR_MISSION = "Ta mission : écrire une **critique** du film **Spider-Man: Brand New Day**. Suis **4 étapes** : regarde la bande-annonce, écris un résumé, lis des critiques, puis écris ta propre critique.";
const LEARN = ['understand a **trailer**','write a **summary** of a movie','read **reviews** and understand opinions','give **your opinion** and write a review'];
const FR_LEARN = ['comprendre une **bande-annonce**','écrire le **résumé** d\'un film','lire des **critiques** et comprendre des avis','donner **ton avis** et écrire une critique'];

const REVIEWS_EN =
"★★★★★ Marcus_92 — 5/5\nOverall, I loved this movie. First of all, the action scenes are incredible and the new suit looks amazing on screen. However, the middle part felt a little too long. In my opinion, this is one of the best Spider-Man movies so far.\n\n" +
"★★☆☆☆ SarahReviews — 2/5\nOverall, I'm disappointed by this movie. First of all, the plot feels confusing at times, with too many characters. However, I have to admit the visual effects are impressive. In my opinion, it's not a bad movie, but I expected more.\n\n" +
"★★★★☆ TomCinephile — 4/5\nOverall, this movie is really enjoyable. First of all, I love the emotional scenes between Peter and his friends. However, the villain isn't used enough. In my opinion, fans of the character will not be disappointed.\n\n" +
"★☆☆☆☆ CriticalViewer — 1/5\nOverall, I didn't enjoy this movie. First of all, it feels like just another superhero movie, nothing new. However, Tom Holland's performance is still convincing. In my opinion, I wouldn't recommend paying full price for this one.";
const REVIEWS_FR =
"Marcus_92 — 5/5\nDe manière générale, j'ai adoré ce film. Tout d'abord, les scènes d'action sont incroyables et le nouveau costume est superbe à l'écran. Cependant, le milieu du film m'a paru un peu trop long. À mon avis, c'est l'un des meilleurs films Spider-Man jusqu'ici.\n\n" +
"SarahReviews — 2/5\nDe manière générale, ce film me déçoit. Tout d'abord, l'intrigue est parfois confuse, avec trop de personnages. Cependant, je dois reconnaître que les effets visuels sont impressionnants. À mon avis, ce n'est pas un mauvais film, mais j'en attendais plus.\n\n" +
"TomCinephile — 4/5\nDe manière générale, ce film est vraiment agréable. Tout d'abord, j'adore les scènes émouvantes entre Peter et ses ami.es. Cependant, le méchant n'est pas assez utilisé. À mon avis, les fans du personnage ne seront pas déçu.es.\n\n" +
"CriticalViewer — 1/5\nDe manière générale, je n'ai pas aimé ce film. Tout d'abord, on dirait un film de super-héros de plus, sans rien de nouveau. Cependant, le jeu de Tom Holland reste convaincant. À mon avis, je ne conseille pas de payer plein tarif pour celui-là.";

const STEPS = [

 /* ───────────── ÉTAPE 1 ───────────── */
 { title:'Watch the trailer', fr:'Regarder la bande-annonce', skill:'CO', lu:'Compréhension orale (CO)',
   goal:"Objectif : comprendre la bande-annonce de Spider-Man: Brand New Day.",
   intro:"Spider-Man: Brand New Day is a new movie. Peter Parker is the main character. Watch the trailer of the movie. You can watch it two or three times. Then answer the questions.",
   introFr:"Spider-Man: Brand New Day est un nouveau film. Peter Parker est le personnage principal. Regarde la bande-annonce du film. Tu peux la regarder deux ou trois fois. Ensuite, réponds aux questions.",
   video:true,
   vocab:[
     { title:'The trailer · la bande-annonce', items:[['trailer','bande-annonce'],['movie / film','film'],['main character','personnage principal'],['best friend','meilleur.e ami.e'],['secret','secret'],['letter','lettre'],['app','application'],['plan','plan']] },
     { title:'Verbs · les verbes', items:[['to keep a secret','garder un secret'],['to forget','oublier'],['to find','retrouver, trouver'],['to explain','expliquer'],['to write','écrire'],['to use','utiliser']] }
   ],
   levels:{
     A:{ title:'Je démarre en douceur', tag:'je coche', acts:[
       { id:'1A-1', type:'select', title:'Tick the right answer', en:'Watch the trailer. Choose the right answer.', fr:'Regarde la bande-annonce. Choisis la bonne réponse.',
         items:[
           { q:'Au début, Peter parle à…', opts:['un inconnu dans la rue','Ned, son meilleur ami','un policier'], exp:'Ned, son meilleur ami' },
           { q:'Il lui demande de…', opts:['le dire à tout le monde','garder le secret','venir se battre avec lui'], exp:'garder le secret' },
           { q:"Spider-Man dit à MJ qu'avant, ils étaient…", opts:['ennemis','ensemble (un couple)','juste amis'], exp:'ensemble (un couple)' },
           { q:"Il lui annonce qu'elle va…", opts:['partir loin de New York','oublier qui il est','le détester'], exp:'oublier qui il est' },
           { q:"Quel est son plan pour qu'elle se souvienne de lui ?", opts:['lui envoyer une lettre','la retrouver et tout lui expliquer','demander à Ned de lui dire'], exp:'la retrouver et tout lui expliquer' },
           { q:"Dans la lettre qu'il écrit, il dit qu'il est…", opts:["fatigué d'être Spider-Man",'pas juste Peter Parker, mais aussi Spider-Man',"amoureux de quelqu'un d'autre"], exp:'pas juste Peter Parker, mais aussi Spider-Man' },
           { q:"Peter demande à parler à Banner, mais on lui répond qu'il n'y a que…", opts:['Scorpion','Hulk','personne'], exp:'Hulk' },
           { q:'À la fin, les gens utilisent une application pour…', opts:['commander une pizza','repérer Spider-Man',"appeler à l'aide"], exp:'repérer Spider-Man' } ] } ] },
     B:{ title:'Je m\'entraîne davantage', tag:'je complète', acts:[
       { id:'1B-1', type:'fill', title:'Complete the sentences', en:'Complete the sentences with the words in the list.', fr:'Complète les phrases avec les mots de la liste.',
         bank:[['secret','secret'],['together','ensemble'],['forget','oublier'],['find','retrouver'],['letter','lettre'],['Hulk','Hulk'],['app','application']],
         lines:[ ['Peter asks Ned, his best friend, to keep a ',{a:'secret'},'.'], ['Spider-Man says he and MJ used to be ',{a:'together'},'.'], ['He tells her she is going to ',{a:'forget'},' who he is.'], ['His plan is to ',{a:'find'},' her and explain everything.'], ['He writes a ',{a:'letter'},' that maybe he\'ll never read to her.'], ['Peter asks to talk to Banner, but the answer is: only ',{a:'Hulk'},'.'], ['People use an ',{a:'app'},' to find Spider-Man.'] ] } ] },
     C:{ title:'Je me lance sans filet', tag:'je réponds', acts:[
       { id:'1C-1', type:'qa', lang:'en', title:'Answer the questions', en:'Answer in English.', fr:'Réponds librement, en anglais.',
         questions:['What secret does Peter tell Ned at the beginning? What does he ask him to do?','What does Spider-Man tell MJ about their past relationship, and about her memory?','What is his plan to see MJ again?','Why does Peter write a letter? What does he say in it?','What\'s funny about the "Spidey Tracker" app at the end?'],
         minWords:20,
         rubric:"Compréhension de la bande-annonce de Spider-Man: Brand New Day. FAITS DE LA BANDE-ANNONCE : au début, Peter dit à Ned, son meilleur ami, qu'il est Spider-Man (son secret) et lui demande de garder le secret ; Spider-Man dit à MJ qu'ils étaient ensemble (un couple) avant et qu'elle va oublier qui il est ; son plan est de la retrouver et de tout lui expliquer ; il écrit une lettre (qu'il ne lui lira peut-être jamais) pour dire qu'il n'est pas seulement Peter Parker mais aussi Spider-Man ; à la fin, Ned regarde l'application Spidey Tracker, qui indique que Spider-Man est tout proche, alors que Spider-Man est juste devant lui : c'est drôle. QUESTIONS : 1) le secret de Peter et ce qu'il demande à Ned ; 2) leur relation passée et sa mémoire ; 3) son plan ; 4) pourquoi la lettre et ce qu'il y dit ; 5) ce qui est drôle avec l'application. Chaque réponse doit être cohérente avec ces faits (accepte les phrases courtes et les formulations différentes ; pour la question 5, la réponse attendue est que l'application dit que Spider-Man est très proche alors qu'il est devant Ned ; accepte une idée équivalente, par exemple que l'application le repère alors qu'il est juste là)." } ] }
   } },

 /* ───────────── ÉTAPE 2 ───────────── */
 { title:'Write a summary', fr:'Écrire un résumé', skill:'EE', lu:'Expression écrite (EE)',
   goal:"Objectif : résumer l'histoire du film en anglais, sans spoiler.",
   intro:"Now you know the story of the trailer. Tell it in your own words. Be careful: no spoilers! Do not tell the end of the movie.",
   introFr:"Maintenant, tu connais l'histoire de la bande-annonce. Raconte-la avec tes propres mots. Attention : pas de spoiler ! Ne raconte pas la fin du film.",
   vocab:[
     { title:'The movie · le film', items:[['The movie is called…','Le film s\'appelle…'],['The main character is…','Le personnage principal est…'],['He has a secret','Il a un secret'],['friends','ami.es'],['used to be…','étaient avant…'],['His plan is to…','Son plan est de…'],['to tell','dire, raconter'],['no spoilers','pas de spoiler']] }
   ],
   help:{ title:'HELP · A SUMMARY', rows:[['The movie is called Finding Nemo. The main character is a little fish.','Le film s\'appelle Le Monde de Nemo. Le personnage principal est un petit poisson.'],['He has a problem: he is lost.','Il a un problème : il est perdu.'],['His plan is to find his father.','Son plan est de retrouver son père.']] },
   levels:{
     A:{ title:'Je démarre en douceur', tag:'je choisis', acts:[
       { id:'2A-1', type:'fill', title:'Choose the right words', en:'Complete the sentences. Choose the right word for each gap.', fr:'Complète les phrases en choisissant le bon mot pour chaque trou.',
         bank:[['Peter Parker','Peter Parker'],['Ned','Ned'],['MJ','MJ'],['Spider-Man','Spider-Man'],['Hulk','Hulk'],['Scorpion','Scorpion'],['Banner','Banner'],['enemies','ennemis'],['together','ensemble'],['neighbours','voisins'],['remember','se souvenir de'],['forget','oublier'],['find her again','la retrouver'],['never see her again','ne plus jamais la voir']],
         banks:[[0,1,2],[3,4,5],[1,2,6],[7,8,9],[10,11],[12,13]],
         lines:[ ['The movie is called Spider-Man: Brand New Day. The main character is ',{a:'Peter Parker',b:0},', who is also ',{a:'Spider-Man',b:1},'.'],
                 ['Peter has a secret: he is Spider-Man. He asks ',{a:'Ned',b:2},' to keep it secret.'],
                 ['Spider-Man tells MJ that they used to be ',{a:'together',b:3},', but she is going to ',{a:'forget',b:4},' who he is.'],
                 ['His plan is to ',{a:'find her again',b:5},' and explain everything.'] ] } ] },
     B:{ title:'Je m\'entraîne davantage', tag:'je complète', acts:[
       { id:'2B-1', type:'write', title:'Finish the sentences', en:'Finish the sentences with your own words.', fr:'Termine les phrases avec tes propres mots.',
         frames:['The movie is called Spider-Man: Brand New Day. The main character is Peter Parker, …','He has a big secret: …','Spider-Man tells MJ that they used to be …','He tells her that …','His plan is to …'],
         ph:'The movie is called Spider-Man: Brand New Day. The main character is Peter Parker, …\nHe has a big secret: …\nSpider-Man tells MJ that they used to be …\nHe tells her that …\nHis plan is to ….',
         minWords:25,
         rubric:"Résumé guidé de la bande-annonce de Spider-Man: Brand New Day. L'élève termine 5 débuts de phrases : « The main character is Peter Parker, … » (qui il est : Spider-Man / un super-héros), « He has a big secret: … » (il est Spider-Man), « Spider-Man tells MJ that they used to be … » (ensemble / un couple), « He tells her that … » (elle va oublier qui il est), « His plan is to … » (la retrouver et tout lui expliquer). ok = true si les 5 phrases sont complétées avec des idées cohérentes avec la bande-annonce." } ] },
     C:{ title:'Je me lance sans filet', tag:'j\'écris', acts:[
       { id:'2C-1', type:'write', title:'Write your summary', en:'Write a full summary in English (5 to 8 sentences). Try not to look at the sheet of the trailer.', fr:'Écris un résumé complet en anglais (5 à 8 phrases), sans regarder la fiche de la bande-annonce si tu peux t\'en passer.',
         example:'📋 Plan · ① le film et le personnage principal ② le secret de Peter Parker et à qui il le confie ③ la situation avec ses ami.es (MJ et Ned) et son plan ④ une dernière phrase qui donne envie de voir le film, sans spoiler.',
         ph:'The movie is called …',
         minWords:40,
         rubric:"Résumé de la bande-annonce de Spider-Man: Brand New Day en 5 à 8 phrases, sans spoiler. Plan attendu : 1) présenter le film et le personnage principal (Peter Parker / Spider-Man) ; 2) le secret de Peter (il est Spider-Man) et à qui il le confie (Ned) ; 3) la situation avec MJ et Ned (ils étaient ensemble, MJ va oublier qui il est) et son plan (la retrouver et tout lui expliquer) ; 4) une phrase finale qui donne envie de voir le film sans révéler la fin. ok = true si ces 4 éléments sont présents dans un texte cohérent d'au moins 5 phrases." } ] }
   } },

 /* ───────────── ÉTAPE 3 ───────────── */
 { title:'Read the reviews', fr:'Lire des critiques', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:"Objectif : comprendre des critiques de spectateurs, puis écrire ta propre critique.",
   intro:"On a movie website, four people give their opinion on Spider-Man: Brand New Day. Read their reviews. What do they like? What don't they like? Then write your own opinion.",
   introFr:"Sur un site de cinéma, quatre personnes donnent leur avis sur Spider-Man: Brand New Day. Lis leurs critiques. Qu'est-ce qu'elles aiment ? Qu'est-ce qu'elles n'aiment pas ? Ensuite, écris ton propre avis.",
   letter:{ en:REVIEWS_EN, fr:REVIEWS_FR, title:'User reviews' },
   vocab:[
     { title:'Opinion · donner son avis', items:[['I loved…','j\'ai adoré…'],['I didn\'t enjoy…','je n\'ai pas aimé…'],['disappointed','déçu.e'],['impressive','impressionnant.e'],['confusing','confus.e'],['emotional','émouvant.e'],['too long','trop long'],['original','original.e'],['the action scenes','les scènes d\'action'],['the visual effects','les effets visuels'],['the plot / the story','l\'intrigue / l\'histoire'],['the villain','le méchant'],['the actor','l\'acteur'],['I would recommend…','je recommanderais…']] }
   ],
   levels:{
     A:{ title:'Je démarre en douceur', tag:'je coche et je relie', acts:[
       { id:'3A-1', type:'select', title:'Positive or negative?', en:'For each review, choose the general opinion.', fr:'Pour chaque critique, choisis l\'avis général.',
         items:[ {q:'Marcus_92', opts:['positif','négatif'], exp:'positif'}, {q:'SarahReviews', opts:['positif','négatif'], exp:'négatif'}, {q:'TomCinephile', opts:['positif','négatif'], exp:'positif'}, {q:'CriticalViewer', opts:['positif','négatif'], exp:'négatif'} ] },
       { id:'3A-2', type:'select', title:'Link the words', en:'Match each word with its meaning.', fr:'Relie chaque connecteur à sa signification.',
         items:[ {q:'Overall, …', opts:['Cependant','De manière générale','À mon avis','Tout d\'abord'], exp:'De manière générale'}, {q:'First of all, …', opts:['Cependant','De manière générale','À mon avis','Tout d\'abord'], exp:'Tout d\'abord'}, {q:'However, …', opts:['Cependant','De manière générale','À mon avis','Tout d\'abord'], exp:'Cependant'}, {q:'In my opinion, …', opts:['Cependant','De manière générale','À mon avis','Tout d\'abord'], exp:'À mon avis'} ] } ] },
     B:{ title:'Je m\'entraîne davantage', tag:'je relève', acts:[
       { id:'3B-1', type:'qa', lang:'fr', title:'Good points and bad points', en:'For each review, find one good point and one bad point.', fr:'Pour chaque critique, relève un point positif et un point négatif.',
         questions:['Marcus_92 : quel est le point positif ? Quel est le point négatif ?','SarahReviews : quel est le point positif ? Quel est le point négatif ?','TomCinephile : quel est le point positif ? Quel est le point négatif ?','CriticalViewer : quel est le point positif ? Quel est le point négatif ?'],
         minWords:20,
         rubric:"Compréhension des 4 critiques. RÉPONSES ATTENDUES : Marcus_92 — positif : les scènes d'action incroyables / le nouveau costume ; négatif : le milieu du film un peu trop long. SarahReviews — positif : les effets visuels impressionnants ; négatif : l'intrigue confuse / trop de personnages. TomCinephile — positif : les scènes émouvantes entre Peter et ses ami.es ; négatif : le méchant pas assez utilisé. CriticalViewer — positif : le jeu de Tom Holland convaincant ; négatif : un film de super-héros de plus, rien de nouveau. Pour chaque critique, il suffit que l'élève donne un point positif ET un point négatif corrects (un seul des deux points possibles suffit s'il y en a deux)." } ] },
     C:{ title:'Je me lance sans filet', tag:'j\'écris ma critique', acts:[
       { id:'3C-1', type:'write', title:'Write your opinion', en:'Choose the review you agree with the most. Then write your own review of the movie (or of the trailer), 7 to 8 sentences, with the plan.', fr:'Choisis la critique avec laquelle tu es (ou serais) le plus d\'accord. Puis écris ta propre critique du film (ou de la bande-annonce), en 7 à 8 phrases, en suivant le plan.',
         example:'📋 Plan · ① ton avis général ② deux ou trois exemples qui l\'illustrent ③ deux exemples contraires ④ une phrase de conclusion qui résume tout.',
         frames:['I agree with … because …','Overall, I think …','First of all, …','However, …','In my opinion, …'],
         ph:'I agree with … because …\nOverall, I think …\nFirst of all, …\nHowever, …\nIn my opinion, ….',
         minWords:50,
         rubric:"Bloc « avis » de la critique finale. L'élève : 1) dit avec quelle critique (Marcus_92, SarahReviews, TomCinephile ou CriticalViewer) il est d'accord et pourquoi ; 2) écrit sa propre critique du film ou de la bande-annonce de Spider-Man: Brand New Day en 7 à 8 phrases environ, en suivant le plan : « Overall, I think … » (avis général), « First of all, … » (2 ou 3 exemples qui illustrent l'avis), « However, … » (1 ou 2 exemples contraires), « In my opinion, … » (conclusion qui résume). ok = true si les quatre parties sont présentes, cohérentes entre elles et suffisamment développées ; tolère les fautes de langue." } ] }
   } },

 /* ───────────── ÉTAPE 4 ───────────── */
 { title:'Write your review', fr:'Écrire ma critique', skill:'EE', lu:'Expression écrite (EE)',
   goal:"Objectif : écrire ta critique finale de Spider-Man: Brand New Day, en réutilisant ton résumé et ton avis.",
   intro:"The cinema website needs your review of Spider-Man: Brand New Day. Write about the movie if you saw it, or about the trailer if not. Use your summary from step 2 and your opinion from step 3.",
   introFr:"Le site du cinéma attend ta critique de Spider-Man: Brand New Day. Écris sur le film si tu l'as vu, sinon sur la bande-annonce. Utilise ton résumé de l'étape 2 et ton avis de l'étape 3.",
   vocab:[
     { title:'Your review · ta critique', items:[['a review','une critique'],['a summary','un résumé'],['my opinion','mon avis'],['Overall, …','De manière générale, …'],['First of all, …','Tout d\'abord, …'],['However, …','Cependant, …'],['In my opinion, …','À mon avis, …'],['I would recommend…','je recommanderais…']] }
   ],
   levels:{
     A:{ title:'Je démarre en douceur', tag:'je mets dans l\'ordre', acts:[
       { id:'4A-1', type:'select', title:'Put the review in order', en:'Put the parts of a review in the right order (1 to 5).', fr:'Mets les parties d\'une critique dans le bon ordre (de 1 à 5).',
         items:[ {q:'However, … (un point qui contraste)', exp:'4'}, {q:'The summary of the movie · le résumé du film', exp:'1'}, {q:'In my opinion, … (la conclusion)', exp:'5'}, {q:'Overall, I think … (l\'avis général)', exp:'2'}, {q:'First of all, … (les exemples)', exp:'3'} ].map(x => Object.assign(x, {opts:['1','2','3','4','5']})) } ] },
     B:{ title:'Je m\'entraîne davantage', tag:'j\'assemble', acts:[
       { id:'4B-1', type:'write', title:'Build your review', en:'Write your review with the sentence frames. Reuse your summary and your opinion.', fr:'Écris ta critique avec les débuts de phrases. Réutilise ton résumé et ton avis.',
         refs:[['Ton résumé · étape 2', ['2C-1']], ['Ton avis · étape 3', ['3C-1']]],
         frames:['The movie is called …','Overall, I think …','First of all, …','However, …','In my opinion, …'],
         ph:'The movie is called …\nOverall, I think …\nFirst of all, …\nHowever, …\nIn my opinion, ….',
         minWords:40,
         rubric:"Critique guidée de Spider-Man: Brand New Day. L'élève écrit une critique cohérente qui contient : un court résumé du film sans spoiler (« The movie is called … »), puis le plan « Overall, I think … » (avis général), « First of all, … » (exemples), « However, … » (point contraire), « In my opinion, … » (conclusion). Il peut reprendre son résumé et son avis des étapes précédentes. ok = true si les 5 parties sont présentes, cohérentes entre elles et développées." } ] },
     C:{ title:'Je me lance sans filet', tag:'j\'écris ma critique finale', acts:[
       { id:'4C-1', type:'write', title:'Write your review', en:'Write your movie review of Spider-Man: Brand New Day (the movie if you saw it, the trailer if not). Reuse your summary and your opinion. Follow the plan.', fr:'Écris ta critique du film Spider-Man: Brand New Day (le film si tu l\'as vu, sinon la bande-annonce). Réutilise ton résumé et ton avis. Suis le plan.',
         refs:[['Ton résumé · étape 2', ['2C-1']], ['Ton avis · étape 3', ['3C-1']]],
         example:'📋 Plan · le résumé du film (sans spoiler) → Overall, … → First of all, … → However, … → In my opinion, …',
         ph:'Spider-Man: Brand New Day — my review',
         minWords:60,
         rubric:"Critique finale de Spider-Man: Brand New Day (le film ou la bande-annonce) : tâche finale du cours. Elle doit contenir : 1) un résumé court sans spoiler (le film, Peter Parker / Spider-Man, son secret ou son plan) ; 2) un avis général (« Overall, … ») ; 3) deux ou trois exemples qui l'illustrent (« First of all, … ») ; 4) un ou deux exemples contraires (« However, … ») ; 5) une conclusion (« In my opinion, … »). ok = true si ces cinq éléments sont présents, dans un texte cohérent d'environ 8 à 10 phrases ; tolère les fautes de langue." } ] }
   } }
];

/* ── Données publiées pour la page élève et le suivi ── */
const course = {
  id:'behind-spiderman',
  title:'Behind the Screen — My opinion',
  subtitle:'Write a movie review of Spider-Man: Brand New Day',
  studentPage:'cours-behind.html',
  steps: STEPS.map((s, i) => ({ n:i + 1, title:s.title, skill:s.skill, lu:s.lu, goal:s.goal,
    levels: Object.fromEntries(['A','B','C'].map(L => [L, { title:s.levels[L].title, tag:s.levels[L].tag, qs:s.levels[L].acts.map(a => ({ id:a.id, prompt:s.title + ' — ' + L + ' — ' + a.title })) }])) }))
};
course.allQuestions = [];
course.steps.forEach(s => ['A','B','C'].forEach(L => s.levels[L].qs.forEach((q, k) => { q.step = s.n; q.level = L; q.index = k; course.allQuestions.push(q); })));

window.BEHIND_COURSE = course;
window.BEHIND_DATA = { MISSION, FR_MISSION, LEARN, FR_LEARN, STEPS, TRAILER };
})();
