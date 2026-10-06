/*
  Music & Me — parler de sa musique en anglais.
  5 étapes cumulatives (goûts, artiste, morceau, avis, présentation finale), niveaux A / B / C à chaque étape :
  le texte de niveau C des étapes 1 à 4 est une partie de la présentation de l'étape 5.
  Partagé par la page élève (cours-music.html), le suivi enseignante (cours-suivi.html) et la fiche papier.
*/
(function(){

const MISSION = `**Present** your **music** and your **playlist** to the class: together, you choose the songs for the **end-of-year party**.`;
const LEARN = ['say what you **like** and **can\'t stand**', 'introduce your favourite **artist**', '**describe** your favourite song', 'give your **opinion** and say **why**', '**present** your music to the class'];

/* Chaque texte de niveau C (étapes 1 à 4) est UNE PARTIE de la présentation finale (étape 5). */
const STEPS = [
 { title:'My music taste', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Dire **ce que tu aimes**, **à quelle fréquence** tu écoutes de la musique et **ce que tu ne supportes pas**.`,
   vocab:[["I'm into…","je suis fan de… / j'aime beaucoup…"],["I love / I like","j'adore / j'aime"],["I can't stand…","je ne supporte pas…"],["every day","tous les jours"],["sometimes / never","parfois / jamais"],["rap / pop / rock","rap / pop / rock"],["R&B / electro","R&B / électro"],["my favourite genre","mon genre préféré"]],
   model:[['Genres I like',"I'm into pop and R&B."],['How often','I listen to music every day, on the bus and at home.'],['What I can\'t stand',"I can't stand country music."]],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'I ___ to music every day.', opts:['listen','listens','listening','am listen'], ans:0 },
     { q:'My brother ___ rap music.', opts:['loves','love','loving','is love'], ans:0 },
     { q:'Which sentence means you do NOT like metal at all?', opts:["I can't stand metal.","I'm into metal.",'I love metal.','I sometimes like metal.'], ans:0 },
     { q:'Which sentence means zero times?', opts:['I never listen to jazz.','I sometimes listen to jazz.','I always listen to jazz.','I often listen to jazz.'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['into','fan de'],['every','chaque'],['listens','écoute'],["can't",'ne supporte pas']],
     lines:[["I'm ",{a:'into'}," rap and pop."],['I listen to music ',{a:'every'},' day.'],['My sister ',{a:'listens'},' to rock in her room.'],['I ',{a:"can't"},' stand loud metal music.']] },
   C:{ title:`Je présente mes goûts musicaux`, instruct:`Écris **3 à 4 phrases** : **les genres** que tu aimes, **à quelle fréquence** tu écoutes de la musique et **un genre** que tu ne supportes pas. Ce texte sera la **partie 1** de ta présentation finale.`, ph:`I'm into …\nI listen to music …\nI can't stand …`,
     rubric:`Texte de 3 à 4 phrases simples en anglais sur les goûts musicaux : au moins un genre aimé avec « I'm into / I love / I like » (idéalement deux), une fréquence (every day, sometimes, never, often) et un genre rejeté avec « I can't stand / I don't like ». Présent simple correct (attention au -s à la 3e personne). ok = true si au moins 3 phrases sont globalement correctes et compréhensibles et si les trois éléments demandés (genre aimé, fréquence, genre rejeté) sont présents.`, minWords:20 } },

 { title:'My favourite artist', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Présenter **ton artiste préféré.e** : **d'où** il ou elle vient, **quand** il ou elle a commencé, **pourquoi** il ou elle est célèbre.`,
   vocab:[['He / She is from…','il / elle vient de…'],['started his / her career in…','a commencé sa carrière en…'],['is famous for…','est célèbre pour…'],['a singer / a rapper','chanteur.se / rappeur.se'],['a band / a DJ','un groupe / un.e DJ'],['released an album','a sorti un album'],['won an award','a gagné un prix'],['has millions of fans','a des millions de fans']],
   model:[['My artist','My favourite artist is Billie Eilish and she is from Los Angeles.'],['Her career','She started her career in 2015.'],['Why she is famous','She is famous for her dark pop songs.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'She ___ from Paris.', opts:['is','are','am','does'], ans:0 },
     { q:'He started his career ___ 2018.', opts:['in','on','at','for'], ans:0 },
     { q:'She ___ her first album in 2016.', opts:['released','release','releases','was release'], ans:0 },
     { q:'Which sentence is correct?', opts:['He is famous for his songs.','He is famous to his songs.','He famous for his songs.','He is famous of his songs.'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['from','de'],['started','a commencé'],['famous','célèbre'],['won','a gagné']],
     lines:[['My favourite rapper is ',{a:'from'},' Marseille.'],['He ',{a:'started'},' rapping when he was fifteen.'],['He is ',{a:'famous'},' for his fast lyrics.'],['Last year, he ',{a:'won'},' an award for best album.']] },
   C:{ title:`Je présente mon artiste préféré.e`, instruct:`Présente **ton artiste préféré.e** (réel.le ou inventé.e) en **3 à 4 phrases** : **son pays ou sa ville**, **le début de sa carrière**, **pourquoi** il ou elle est célèbre. Ce texte sera la **partie 2** de ta présentation finale.`, ph:`My favourite artist is …\nHe / She started …\nHe / She is famous for …`,
     rubric:`Présentation d'un.e artiste en 3 à 4 phrases : origine (is from), début de carrière (started his/her career in…, au prétérit), raison de la célébrité (is famous for…). Présent simple pour les faits actuels et prétérit pour la carrière. ok = true si au moins 3 phrases sont globalement correctes et compréhensibles, si le prétérit est bien formé pour la carrière et si origine, début de carrière et célébrité sont présents.`, minWords:20 } },

 { title:'My favourite song', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Décrire **ton morceau préféré** : **son style**, **des adjectifs**, **les paroles**, **ce que tu ressens**.`,
   vocab:[['catchy','qui reste dans la tête'],['powerful','puissant.e'],['relaxing','relaxant.e'],['energetic','plein.e d\'énergie'],['the beat / the chorus','le rythme / le refrain'],['The lyrics are about…','les paroles parlent de…'],['It makes me feel…','ça me fait me sentir…'],['a singer who… / a song which…','un.e chanteur.se qui… / un morceau qui…']],
   model:[['The song',"My favourite song is “bad guy”, a catchy pop song which has a great beat."],['The lyrics','The lyrics are about a girl who acts tough.'],['My feelings','It makes me feel confident.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'This song is very ___. I sing the chorus all day.', opts:['catchy','boring','slow','quiet'], ans:0 },
     { q:'This slow piano song is ___. I listen to it before sleeping.', opts:['relaxing','energetic','loud','catchy'], ans:0 },
     { q:'This song ___ me feel strong.', opts:['makes','make','makes to','is making to'], ans:0 },
     { q:"It's a song ___ makes me feel happy.", opts:['which','who','where','whose'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['lyrics','paroles'],['feel','sentir'],['who','qui'],['powerful','puissant']],
     lines:[['The ',{a:'lyrics'},' are about my life.'],['This song makes me ',{a:'feel'},' strong.'],['She is the singer ',{a:'who'},' wrote this song.'],['The chorus is very ',{a:'powerful'},' and loud.']] },
   C:{ title:`Je décris mon morceau préféré`, instruct:`Décris **ton morceau préféré** en **3 à 4 phrases** : **son style**, **2 adjectifs**, **de quoi parlent les paroles**, **ce que tu ressens**. Utilise « who » ou « which » au moins une fois. Ce texte sera la **partie 3** de ta présentation finale.`, ph:`My favourite song is …\nThe lyrics are about …\nIt makes me feel …`,
     rubric:`Description d'un morceau en 3 à 4 phrases : titre ou artiste, style, au moins deux adjectifs (catchy, powerful, relaxing, emotional, energetic...), « The lyrics are about… », « It makes me feel… » et au moins un « who » ou « which » correctement employé (who pour une personne, which pour une chose). ok = true si au moins 3 phrases sont globalement correctes et compréhensibles, si deux adjectifs, le thème des paroles, le ressenti et un pronom relatif sont présents.`, minWords:22 } },

 { title:'My opinion', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Donner **ton avis** : dire **pourquoi** ce morceau serait **parfait pour la fête**.`,
   vocab:[['I think that…','je pense que…'],['In my opinion,…','à mon avis,…'],['because','parce que'],['although','bien que'],['better than','meilleur.e que'],['more … than','plus … que'],['perfect for our party','parfait pour notre fête'],['everybody can dance','tout le monde peut danser']],
   model:[['My reason','In my opinion, “bad guy” is perfect for our party because the beat is catchy.'],['A contrast','Although the lyrics are a bit dark, everybody can dance to it.'],['A comparison','I think it is more energetic than most pop songs.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'Rap is ___ pop for me.', opts:['better than','more good than','gooder than','best than'], ans:0 },
     { q:'Rock is ___ jazz.', opts:['more energetic than','energetic than','more energeticer than','most energetic than'], ans:0 },
     { q:'I like this singer ___ her voice is amazing.', opts:['because','although','so','then'], ans:0 },
     { q:"I don't like this song, ___ the beat is catchy.", opts:['although','because','so','then'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['think','pense'],['because','parce que'],['although','bien que'],['better','meilleur']],
     lines:[['I ',{a:'think'},' that this song is perfect for the party.'],['I like this song ',{a:'because'},' the chorus is catchy.'],['I love this song, ',{a:'although'},' the video is not good.'],['This song is ',{a:'better'},' than the old version.']] },
   C:{ title:`Je donne mon avis`, instruct:`Explique **pourquoi ton morceau serait parfait pour la fête** en **3 à 4 phrases**. Utilise « because », « although » et **une comparaison**. Ce texte sera la **partie 4** de ta présentation finale.`, ph:`In my opinion, this song is perfect for our party because …\nAlthough …\nI think it is … than …`,
     rubric:`Texte de 3 à 4 phrases qui explique pourquoi un morceau serait parfait pour la fête de fin d'année : un avis clair (I think / In my opinion), au moins un « because » avec une raison, au moins un « although » correct et au moins une comparaison correcte (better than, more … than, adjectif + -er than). ok = true si au moins 3 phrases sont globalement correctes et compréhensibles et si « because », « although » et une comparaison sont présents et bien employés.`, minWords:25 } },

 { title:'My presentation', skill:'EE + EO', lu:'Expression écrite (EE) et Expression orale (EO)',
   goal:`**Présenter ta musique à la classe** : tu **assembles** tes 4 parties avec une **introduction** et une **conclusion**.`,
   plan:[['Intro','Hello everyone. Today, I\'m going to present my music.'],['1 · My taste','what I like, how often, what I can\'t stand'],['2 · My artist','where from, career, why famous'],['3 · My song','style, adjectives, lyrics, feelings'],['4 · Why it\'s perfect for our party','because, although, comparison'],['Conclusion','Thank you for listening. Do you have any questions?']],
   vocab:[['Hello everyone.','bonjour à tous.'],["Today, I'm going to present my music.","aujourd'hui, je vais présenter ma musique."],['First, … / Then, … / Finally, …','d\'abord… / ensuite… / enfin…'],['It is perfect for our party.','c\'est parfait pour notre fête.'],['Please vote for…','votez pour…'],['To conclude, …','pour conclure, …'],['Thank you for listening.','merci de m\'avoir écouté.e.'],['Do you have any questions?','avez-vous des questions ?']],
   model:[['1. Intro',"Hello everyone. Today, I'm going to present my music."],['2. Taste',"I'm into pop and R&B. I listen to music every day, on the bus and at home. I can't stand country music."],['3. Artist','My favourite artist is Billie Eilish and she is from Los Angeles. She started her career in 2015. She is famous for her dark pop songs.'],['4. Song','My favourite song is “bad guy”, a catchy pop song which has a great beat. The lyrics are about a girl who acts tough. It makes me feel confident.'],['5. Party','In my opinion, “bad guy” is perfect for our party because the beat is catchy. Although the lyrics are a bit dark, everybody can dance to it. I think it is more energetic than most pop songs.'],['6. Conclusion','To conclude, “bad guy” is my choice for our party. Thank you for listening. Do you have any questions?']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'Which sentence starts the presentation?', opts:['Hello everyone.','Thank you for listening.','To conclude, …','Do you have any questions?'], ans:0 },
     { q:'Which connector introduces the first part?', opts:['First, …','To conclude, …','Finally, …','Thank you, …'], ans:0 },
     { q:'Which sentence gives a reason?', opts:['It is perfect because it is fun.','It is perfect it is fun.','It perfect because fun.','It is perfect because of is fun.'], ans:0 },
     { q:'Which sentence is a question for the class?', opts:['Do you have any questions?','Hello everyone.','Thank you for listening.','First, …'], ans:0 } ] },
   B:{ title:'Je complète mon plan', bank:[['everyone','tout le monde'],['perfect','parfait'],['conclude','conclure'],['listening','écoute']],
     lines:[['Hello ',{a:'everyone'},'. Today, I\'m going to present my music.'],['I think this song is ',{a:'perfect'},' for our party.'],['To ',{a:'conclude'},', this song is my choice for the party.'],['Thank you for ',{a:'listening'},'. Do you have any questions?']] },
   C:{ title:`Je présente ma musique à la classe`, instruct:`Écris ta présentation pour la classe (**environ 15 phrases**) : **introduction**, **tes 4 parties**, **conclusion** et **une question**. Tu peux **reprendre tes textes** et les retoucher. Entraîne-toi ensuite à voix haute avec les 🔊 du modèle.`, ph:`Hello everyone. Today, I'm going to present my music.\n\n(1 My taste)\n(2 My artist)\n(3 My song)\n(4 Why it's perfect for our party)\n\nTo conclude, … Thank you for listening. Do you have any questions?`,
     prefillFrom:[1,2,3,4], minWords:80,
     rubric:`Présentation orale écrite pour la classe, d'environ 12 à 16 phrases, qui assemble : une introduction (hello, present my music), la partie 1 (goûts musicaux : genres aimés, fréquence, genre rejeté), la partie 2 (un.e artiste : origine, début de carrière, célébrité), la partie 3 (un morceau : style, adjectifs, paroles, ressenti), la partie 4 (pourquoi ce morceau serait parfait pour la fête, avec because / although / comparaison), puis une conclusion et une question pour la classe (Do you have any questions? ou équivalent). ok = true si l'introduction, les quatre parties, la conclusion et la question sont présentes et si l'anglais est globalement correct et compréhensible. Tolère les fautes mineures et la longueur approximative.` } }
];

const course = {
  id:'music-and-me',
  title:'Music & Me',
  subtitle:'Parler de ma musique en anglais',
  studentPage:'cours-music.html',
  steps: STEPS.map((s, i) => ({ n:i + 1, title:s.title, skill:s.skill, lu:s.lu, goal:s.goal.replace(/\*\*/g, ''),
    levels:{
      A:{ title:'Je démarre en douceur', tag:'je choisis la bonne réponse', qs:[{id:(i + 1) + 'A-1', prompt:s.title + ' — niveau A'}] },
      B:{ title:'Je m\'entraîne davantage', tag:'je complète avec les mots', qs:[{id:(i + 1) + 'B-1', prompt:s.title + ' — niveau B'}] },
      C:{ title:'Je me lance sans filet', tag:s.C.title, qs:[{id:(i + 1) + 'C-1', prompt:s.title + ' — niveau C'}] } } }))
};
course.allQuestions = [];
course.steps.forEach(s => ['A','B','C'].forEach(L => s.levels[L].qs.forEach((q, k) => { q.step = s.n; q.level = L; q.index = k; course.allQuestions.push(q); })));

window.MUSIC_COURSE = course;
window.MUSIC_DATA = { MISSION, LEARN, STEPS };

/* ---- Traductions françaises (bouton « Traduire ») ---- */
const M1 = ['Je suis fan de pop et de R&B.', 'J\'écoute de la musique tous les jours, dans le bus et à la maison.', 'Je ne supporte pas la country.'];
const M2 = ['Mon artiste préférée est Billie Eilish et elle vient de Los Angeles.', 'Elle a commencé sa carrière en 2015.', 'Elle est célèbre pour ses chansons pop sombres.'];
const M3 = ['Mon morceau préféré est « bad guy », un morceau pop accrocheur qui a un super rythme.', 'Les paroles parlent d\'une fille qui fait la dure.', 'Ça me donne confiance.'];
const M4 = ['À mon avis, « bad guy » est parfait pour notre fête parce que le rythme est accrocheur.', 'Bien que les paroles soient un peu sombres, tout le monde peut danser dessus.', 'Je pense qu\'il est plus énergique que la plupart des morceaux pop.'];
window.MUSIC_FR = {
  mission: `**Présente** ta **musique** et ta **playlist** à la classe : ensemble, vous choisissez les morceaux de la **fête de fin d'année**.`,
  learn: ['dire ce que tu **aimes** et ce que tu **ne supportes pas**', '**présenter** ton.ta artiste préféré.e', '**décrire** ton morceau préféré', 'donner ton **avis** et dire **pourquoi**', '**présenter** ta musique à la classe'],
  titles: ['Mes goûts musicaux', 'Mon artiste préféré.e', 'Mon morceau préféré', 'Mon avis', 'Ma présentation'],
  plan: [['Intro', 'Bonjour à tous. Aujourd\'hui, je vais présenter ma musique.'], ['1 · Mes goûts', 'ce que j\'aime, à quelle fréquence, ce que je ne supporte pas'], ['2 · Mon artiste', 'd\'où il ou elle vient, sa carrière, pourquoi il ou elle est célèbre'], ['3 · Mon morceau', 'style, adjectifs, paroles, ressenti'], ['4 · Pourquoi il est parfait pour notre fête', 'parce que, bien que, comparaison'], ['Conclusion', 'Merci de m\'avoir écouté.e. Avez-vous des questions ?']],
  model: [
    M1, M2, M3, M4,
    ['Bonjour à tous. Aujourd\'hui, je vais présenter ma musique.', M1.join(' '), M2.join(' '), M3.join(' '), M4.join(' '), 'Pour conclure, « bad guy » est mon choix pour notre fête. Merci de m\'avoir écouté.e. Avez-vous des questions ?']
  ]
};

/* ---- Petit point de grammaire (affiché dans le niveau C de l'étape indiquée ; « short » = rappel de la fiche papier) ---- */
window.MUSIC_GRAMMAR = {
  1: {
    title: 'Le présent simple pour parler de ses goûts',
    short: 'I / you / we / they : le verbe ne change pas (I listen). he / she : on ajoute -s (she listens). Négation : don\'t / doesn\'t + verbe. « every day » se met à la fin.',
    rules: [
      ['I / you / we / they', 'Le verbe ne change pas : I listen, they love.'],
      ['he / she', 'On ajoute -s : she listens, he loves.'],
      ['Négation et question', '« don\'t / doesn\'t » + verbe, « Do / Does » + sujet : I don\'t like jazz. Do you like rap ?'],
      ['Fréquence', 'Avant le verbe : I never listen… « every day » se met à la fin : I listen every day.']
    ],
    examples: [['I listen to rap every day.', 'J\'écoute du rap tous les jours.'], ['She loves pop music.', 'Elle adore la pop.'], ['I don\'t like country music.', 'Je n\'aime pas la country.'], ['Do you like electro ?', 'Aimes-tu l\'électro ?']],
    verbs: [['rap','rap'],['pop','pop'],['rock','rock'],['R&B','R&B'],['electro','électro'],['gaming soundtrack','bande-son de jeu']],
    verbsLabel: 'Genres',
    check: [
      { q: 'My friend ___ rap every day.', opts: ['listens to', 'listen to', 'listening to', 'is listen to'], ans: 0 },
      { q: 'I ___ like jazz.', opts: ["don't", "doesn't", 'not', 'am not'], ans: 0 },
      { q: '___ you like pop music?', opts: ['Do', 'Does', 'Are', 'Is'], ans: 0 },
      { q: 'She ___ listens to metal.', opts: ['never', 'ever', 'not', 'no'], ans: 0 },
      { q: 'We ___ to the same playlist every day.', opts: ['listen', 'listens', 'listening', 'is listening'], ans: 0 }
    ]
  },
  2: {
    title: 'Présent simple ou prétérit ?',
    short: 'Présent pour les faits d\'aujourd\'hui : She is from Paris. Prétérit pour la carrière : He started in 2018, she won an award (win → won, write → wrote).',
    rules: [
      ['Présent', 'Pour les faits d\'aujourd\'hui : She is from Paris. He is famous for his voice.'],
      ['Prétérit', 'Pour la carrière : He started in 2018. She released an album. Repères : in 2018, last year, two years ago.'],
      ['Irréguliers', 'win → won, write → wrote, sing → sang, become → became.'],
      ['Négatif', '« didn\'t » + verbe de base : He didn\'t win the award.']
    ],
    examples: [['She is from Spain.', 'Elle vient d\'Espagne.'], ['He started his career in 2018.', 'Il a commencé sa carrière en 2018.'], ['She won an award last year.', 'Elle a gagné un prix l\'année dernière.'], ['He didn\'t release an album in 2020.', 'Il n\'a pas sorti d\'album en 2020.']],
    verbs: [['win → won','gagner'],['write → wrote','écrire'],['sing → sang','chanter'],['become → became','devenir'],['release → released','sortir (un album)'],['start → started','commencer']],
    verbsLabel: 'Verbes de carrière',
    check: [
      { q: 'She ___ from Spain.', opts: ['is', 'are', 'am', 'be'], ans: 0 },
      { q: 'He ___ his first song in 2017.', opts: ['wrote', 'writes', 'write', 'writed'], ans: 0 },
      { q: 'She ___ famous in 2020.', opts: ['became', 'becomes', 'become', 'becomed'], ans: 0 },
      { q: 'He ___ win the prize last year.', opts: ["didn't", "doesn't", 'not', "wasn't"], ans: 0 },
      { q: 'They ___ the band in 2012.', opts: ['started', 'start', 'starts', 'are start'], ans: 0 }
    ]
  },
  3: {
    title: 'who, which et les adjectifs',
    short: '« who » pour une personne, « which » pour une chose. « makes me feel » + adjectif : This song makes me feel happy. -ing pour le morceau (relaxing), -ed pour moi (relaxed).',
    rules: [
      ['who', '« who » pour une personne : a singer who writes his songs.'],
      ['which', '« which » pour une chose : a song which has a great beat.'],
      ['makes me feel', '« makes me feel » + adjectif : This song makes me feel happy.'],
      ['-ing ou -ed ?', '-ing pour le morceau : The song is relaxing. -ed pour moi : I feel relaxed.']
    ],
    examples: [['She is a singer who writes her songs.', 'C\'est une chanteuse qui écrit ses chansons.'], ['It is a song which I love.', 'C\'est un morceau que j\'adore.'], ['This song makes me feel strong.', 'Ce morceau me donne de la force.'], ['The beat is energetic.', 'Le rythme est plein d\'énergie.']],
    verbs: [['catchy','accrocheur.se'],['powerful','puissant.e'],['relaxing','relaxant.e'],['emotional','émouvant.e'],['energetic','plein.e d\'énergie'],['sad','triste']],
    verbsLabel: 'Adjectifs',
    check: [
      { q: 'I know a DJ ___ plays at clubs.', opts: ['who', 'which', 'what', 'whose'], ans: 0 },
      { q: 'It is a song ___ I love.', opts: ['which', 'who', 'where', 'whose'], ans: 0 },
      { q: 'This song makes me ___.', opts: ['feel happy', 'to feel happy', 'feeling happy', 'felt to happy'], ans: 0 },
      { q: 'This slow song is very ___.', opts: ['relaxing', 'relaxed', 'relax', 'relaxes'], ans: 0 },
      { q: 'After this song, I feel ___.', opts: ['excited', 'exciting', 'excite', 'excites'], ans: 0 }
    ]
  },
  4: {
    title: 'Donner son avis et comparer',
    short: '« because » donne la raison, « although » = bien que. Adjectif court : louder than, good → better. Adjectif long : more energetic than.',
    rules: [
      ['Avis', 'I think that… / In my opinion, … Pour répondre : I agree / I disagree.'],
      ['because / although', '« because » = la raison. « although » = bien que, une idée contraire : Although it\'s old, I love it.'],
      ['Adjectif court', 'adjectif + -er than : louder than, cheaper than. Irrégulier : good → better.'],
      ['Adjectif long', 'more + adjectif + than : more interesting than, more expensive than.']
    ],
    examples: [['I think that rap is better than pop.', 'Je pense que le rap est mieux que la pop.'], ['I like her songs because they are true.', 'J\'aime ses chansons parce qu\'elles sont vraies.'], ['Although it is old, I love this song.', 'Bien qu\'il soit vieux, j\'adore ce morceau.'], ['This song is more energetic than that one.', 'Ce morceau est plus énergique que celui-là.']],
    verbs: [['good → better','bon → meilleur'],['loud → louder','fort → plus fort'],['cheap → cheaper','bon marché → moins cher'],['interesting → more interesting','intéressant → plus intéressant'],['expensive → more expensive','cher → plus cher'],['bad → worse','mauvais → pire']],
    verbsLabel: 'Comparer',
    check: [
      { q: 'This speaker is ___ my headphones.', opts: ['louder than', 'more loud than', 'loud than', 'the louder'], ans: 0 },
      { q: 'Rock is ___ than jazz.', opts: ['more energetic', 'energeticer', 'most energetic', 'energetic'], ans: 0 },
      { q: '___ it is old, I love this song.', opts: ['Although', 'Because', 'So', 'Or'], ans: 0 },
      { q: 'I like her songs ___ the lyrics are true.', opts: ['because', 'although', 'but', 'while'], ans: 0 },
      { q: 'In my ___, this is the best song.', opts: ['opinion', 'think', 'agree', 'idea'], ans: 0 }
    ]
  },
  5: {
    title: 'Structurer ma présentation',
    short: 'Une présentation = une introduction, tes 4 parties dans l\'ordre (First, Then, Finally), une conclusion et une question. Parle lentement, avec une pause à la fin de chaque phrase.',
    rules: [
      ['Introduction', '« Hello everyone. Today, I\'m going to present my music. »'],
      ['Les 4 parties', 'First, … Then, … Finally, … : un mot de liaison pour passer d\'une partie à l\'autre.'],
      ['Conclusion', '« To conclude, … Thank you for listening. Do you have any questions? »'],
      ['À l\'oral', 'Parle lentement, fais une pause à la fin de chaque phrase, écoute-toi avec les 🔊.']
    ],
    examples: [['Today, I\'m going to present my music.', 'Aujourd\'hui, je vais présenter ma musique.'], ['First, let me talk about my taste.', 'D\'abord, je vais parler de mes goûts.'], ['It is perfect for our party because it is energetic.', 'C\'est parfait pour notre fête parce que c\'est énergique.'], ['To conclude, this song is my choice.', 'Pour conclure, ce morceau est mon choix.']],
    verbs: [['first','d\'abord'],['then','ensuite'],['finally','enfin'],['to conclude','pour conclure'],['perfect for our party','parfait pour notre fête'],['thank you for listening','merci de m\'avoir écouté.e']],
    verbsLabel: 'Mots de la présentation',
    check: [
      { q: "Today, I'm going ___ present my music.", opts: ['to', 'for', 'at', 'of'], ans: 0 },
      { q: '___, I will talk about my music taste.', opts: ['First', 'Last', 'Lastly', 'Before'], ans: 0 },
      { q: "It's a song ___ makes me feel strong.", opts: ['which', 'who', 'where', 'what'], ans: 0 },
      { q: 'To ___, this song is my choice.', opts: ['conclude', 'concluded', 'concluding', 'conclusion'], ans: 0 },
      { q: 'Thank you for ___.', opts: ['listening', 'listen', 'to listen', 'listened'], ans: 0 }
    ]
  }
};
})();
