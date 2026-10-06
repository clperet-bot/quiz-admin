/*
  Music & Me — parler de sa musique en anglais.
  6 étapes (goûts, artiste, décrire un morceau, avis, concert, playlist à l'oral), niveaux A / B / C à chaque étape.
  Partagé par la page élève (cours-music.html), le suivi enseignante (cours-suivi.html) et la fiche papier.
*/
(function(){

const MISSION = `**Present** your **music** and your **playlist** to the class: together, you choose the songs for the **end-of-year party**.`;
const LEARN = ['say what you **like** and **can\'t stand**', 'introduce an **artist**', '**describe** a song', 'give your **opinion** and say **why**', 'tell about a **concert**', 'present your **playlist** orally'];

const STEPS = [
 { title:'My music taste', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Dire **ce que tu aimes** et **à quelle fréquence** tu écoutes de la musique.`,
   vocab:[["I'm into…","je suis fan de… / j'aime beaucoup…"],["I love / I like","j'adore / j'aime"],["I can't stand…","je ne supporte pas…"],["every day","tous les jours"],["sometimes / never","parfois / jamais"],["rap / pop / rock","rap / pop / rock"],["R&B / electro","R&B / électro"],["a gaming soundtrack","une bande-son de jeu vidéo"],["a playlist","une playlist"],["my favourite genre","mon genre préféré"]],
   model:[['Genres I like',"I'm into rap and R&B. I love rap!"],['How often','I listen to music every day, on the bus and at home.'],['What I can\'t stand',"I can't stand country music. I never listen to it."]],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'I ___ to music every day.', opts:['listen','listens','listening','am listen'], ans:0 },
     { q:'My brother ___ rap music.', opts:['loves','love','loving','is love'], ans:0 },
     { q:'Which sentence means you do NOT like metal at all?', opts:["I can't stand metal.","I'm into metal.",'I love metal.','I sometimes like metal.'], ans:0 },
     { q:'Which sentence means zero times?', opts:['I never listen to jazz.','I sometimes listen to jazz.','I always listen to jazz.','I often listen to jazz.'], ans:0 },
     { q:'Which question is correct?', opts:['What kind of music do you like?','What kind of music you like?','What kind of music does you like?','What kind of music are you like?'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['into','fan de'],['every','chaque'],['listens','écoute'],['sometimes','parfois'],['never','jamais'],["can't",'ne supporte pas']],
     lines:[["I'm ",{a:'into'}," rap and pop."],['I listen to music ',{a:'every'},' day.'],['My sister ',{a:'listens'},' to rock in her room.'],['I ',{a:'sometimes'},' listen to jazz, only once or twice a year.'],["I don't like country music, so I ",{a:'never'},' listen to it.'],['I ',{a:"can't"},' stand loud metal music.']] },
   C:{ title:`Je présente mes goûts musicaux`, instruct:`Écris 6 phrases : **2 genres** que tu aimes, **1 genre** que tu ne supportes pas et **à quelle fréquence** tu écoutes de la musique.`, ph:`I'm into …\nI listen to … every day.\nI can't stand …`,
     rubric:`Six phrases simples en anglais sur les goûts musicaux : au moins deux genres aimés avec « I'm into / I love / I like », un genre rejeté avec « I can't stand / I don't like », et une fréquence (every day, sometimes, never, often). Présent simple correct (attention au -s à la 3e personne). ok = true si au moins 5 phrases sont correctes et compréhensibles et si les trois éléments demandés (genres aimés, genre rejeté, fréquence) sont présents.`, minWords:40 } },

 { title:'My favourite artist', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Présenter **un.e artiste** : **d'où** il ou elle vient, **quand** il ou elle a commencé.`,
   vocab:[['He / She is from…','il / elle vient de…'],['started his / her career in…','a commencé sa carrière en…'],['is famous for…','est célèbre pour…'],['a singer / a rapper','chanteur.se / rappeur.se'],['a band / a DJ','un groupe / un.e DJ'],['released an album','a sorti un album'],['won an award','a gagné un prix'],['wrote a song','a écrit une chanson'],['has millions of fans','a des millions de fans'],['his / her biggest hit','son plus gros tube']],
   model:[['My artist','My favourite artist is Billie Eilish. She is from Los Angeles.'],['Her career','She started her career in 2015. She won five awards in 2020.'],['Why she is famous','She is famous for her dark pop songs.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'She ___ from Paris.', opts:['is','are','am','does'], ans:0 },
     { q:'He started his career ___ 2018.', opts:['in','on','at','for'], ans:0 },
     { q:'She ___ her first album in 2016.', opts:['released','release','releases','was release'], ans:0 },
     { q:'Last year, he ___ an award.', opts:['won','wins','win','winned'], ans:0 },
     { q:'Which sentence is correct?', opts:['He is famous for his guitar solos.','He is famous to his guitar solos.','He famous for his guitar solos.','He is famous of his guitar solos.'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['from','de'],['started','a commencé'],['famous','célèbre'],['released','a sorti'],['won','a gagné'],['career','carrière']],
     lines:[['My favourite rapper is ',{a:'from'},' Marseille.'],['He ',{a:'started'},' rapping when he was fifteen.'],['He is ',{a:'famous'},' for his fast lyrics.'],['In 2019, he ',{a:'released'},' his first album.'],['Last year, he ',{a:'won'},' an award for best album.'],['His ',{a:'career'},' began in a small club.']] },
   C:{ title:`Je présente mon artiste préféré.e`, instruct:`Présente **un.e artiste** (réel.le ou inventé.e) en 6 à 8 phrases : **son pays ou sa ville**, **le début de sa carrière**, **pourquoi** il ou elle est célèbre, **un moment important**.`, ph:`My favourite artist is …\nHe / She is from …\nHe / She started …`,
     rubric:`Présentation d'un.e artiste en 6 à 8 phrases : origine (is from), début de carrière (started his/her career in…, au prétérit), raison de la célébrité (is famous for…), un moment important de la carrière au prétérit (released, won, wrote...). Présent simple pour les faits actuels et prétérit pour la carrière. ok = true si au moins 5 phrases sont correctes, si au moins 3 verbes au prétérit sont bien formés (y compris irréguliers courants won, wrote, became) et si origine, début de carrière et célébrité sont présents.`, minWords:50 } },

 { title:'Describe a song', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Décrire **un morceau** : **adjectifs**, **paroles**, **ce que tu ressens**.`,
   vocab:[['catchy','qui reste dans la tête'],['powerful','puissant.e'],['relaxing','relaxant.e'],['emotional','émouvant.e'],['energetic','plein.e d\'énergie'],['the beat / the chorus','le rythme / le refrain'],['The lyrics are about…','les paroles parlent de…'],['It makes me feel…','ça me fait me sentir…'],['a singer who…','un.e chanteur.se qui…'],['a song which…','un morceau qui…']],
   model:[['The song',"My favourite song is a catchy song which has a great chorus."],['The lyrics','The lyrics are about friendship and hard times.'],['My feelings','It makes me feel strong. I love the singer who writes his own songs.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'This song is very ___. I sing the chorus all day.', opts:['catchy','boring','slow','quiet'], ans:0 },
     { q:'This slow piano song is ___. I listen to it before sleeping.', opts:['relaxing','energetic','loud','catchy'], ans:0 },
     { q:'This song ___ me feel strong.', opts:['makes','make','makes to','is making to'], ans:0 },
     { q:'He is the singer ___ wrote this song.', opts:['who','which','what','where'], ans:0 },
     { q:"It's a song ___ makes me feel happy.", opts:['which','who','where','whose'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['lyrics','paroles'],['about','sur'],['feel','sentir'],['who','qui'],['which','qui'],['powerful','puissant']],
     lines:[['The ',{a:'lyrics'},' are about my life.'],['The lyrics are ',{a:'about'},' friendship.'],['This song makes me ',{a:'feel'},' strong.'],['She is the singer ',{a:'who'},' wrote this song.'],['It is a song ',{a:'which'},' everybody knows.'],['The chorus is very ',{a:'powerful'},' and loud.']] },
   C:{ title:`Je décris un morceau`, instruct:`Décris **un morceau** que tu aimes en 6 à 8 phrases : **son style**, **2 adjectifs**, **de quoi parlent les paroles**, **ce que tu ressens**. Utilise « who » ou « which » au moins une fois.`, ph:`My favourite song is …\nIt's a … song.\nThe lyrics are about …\nIt makes me feel …`,
     rubric:`Description d'un morceau en 6 à 8 phrases : titre ou artiste, genre, au moins deux adjectifs (catchy, powerful, relaxing, emotional, energetic...), « The lyrics are about… », « It makes me feel… » et au moins un « who » ou « which » correctement employé (who pour une personne, which pour une chose). ok = true si au moins 5 phrases sont correctes et compréhensibles, si au moins deux adjectifs de description, le thème des paroles, le ressenti et un pronom relatif sont présents.`, minWords:50 } },

 { title:'My opinion', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Donner **ton avis** et **le justifier**, puis **comparer** deux choses.`,
   vocab:[['I think that…','je pense que…'],['In my opinion,…','à mon avis,…'],['because','parce que'],['although','bien que'],['better than','meilleur.e que'],['more … than','plus … que'],['louder than','plus fort que'],['I agree / I disagree','je suis d\'accord / pas d\'accord'],["It's overrated.","c'est surcoté."],["It's worth listening to.","ça vaut le coup d'être écouté."]],
   model:[['My opinion','In my opinion, rap is better than pop because the lyrics are more interesting.'],['Another point','I think that some songs are too violent, although I love the beat.'],['A comparison','I think live music is more exciting than streaming, but it is more expensive.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'Rap is ___ pop for me.', opts:['better than','more good than','gooder than','best than'], ans:0 },
     { q:'Live music is ___ streaming.', opts:['more exciting than','exciting than','more excitinger than','most exciting than'], ans:0 },
     { q:'I like this singer ___ her voice is amazing.', opts:['because','although','so','then'], ans:0 },
     { q:"I don't like this song, ___ the beat is catchy.", opts:['although','because','so','then'], ans:0 },
     { q:'Which sentence gives an opinion?', opts:['In my opinion, this song is great.','This song is three minutes long.','I listened to it yesterday.','It is on my playlist.'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['think','pense'],['opinion','avis'],['because','parce que'],['although','bien que'],['better','meilleur'],['more','plus']],
     lines:[['I ',{a:'think'},' that jazz is relaxing.'],['In my ',{a:'opinion'},', this album is great.'],['I like this song ',{a:'because'},' the chorus is catchy.'],['I love this song, ',{a:'although'},' the video is not good.'],['This song is ',{a:'better'},' than the old version.'],['Concerts are ',{a:'more'},' expensive than streaming.']] },
   C:{ title:`Je donne mon avis`, instruct:`Donne **ton avis** sur **un style ou un morceau** en 7 à 9 phrases. Utilise « I think » ou « In my opinion », « because » (2 fois), « although » et **une comparaison**.`, ph:`In my opinion, … is better than …\nI think that …\nI like … because …`,
     rubric:`Texte d'avis de 7 à 9 phrases sur un style musical, un artiste ou un morceau : « I think / In my opinion », au moins deux « because » avec une raison, au moins un « although » correct et au moins une comparaison correcte (better than, more … than, adjectif + -er than). ok = true si au moins 5 phrases sont correctes et compréhensibles, si un avis est clair, si « because » et « although » sont utilisés correctement et si une comparaison est présente.`, minWords:60 } },

 { title:'A concert or a festival', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Raconter **une sortie** passée : **ce que tu as vu**, **comment c'était**.`,
   vocab:[['I went to a concert / a festival','je suis allé.e à un concert / un festival'],['I saw my favourite band','j\'ai vu mon groupe préféré'],['It was amazing.','c\'était incroyable.'],['The crowd was crazy.','la foule était déchaînée.'],['We were in the front row.','nous étions au premier rang.'],['We sang and danced.','nous avons chanté et dansé.'],['I bought a T-shirt.','j\'ai acheté un T-shirt.'],['The sound was loud.','le son était fort.'],['It was too crowded.','il y avait trop de monde.'],['I had a great time.','j\'ai passé un super moment.']],
   model:[['Where and when','Last July, I went to a festival with my friends.'],['Who I saw','We saw my favourite rapper. The crowd was crazy!'],['How it was','It was amazing. We were in the front row and we sang every song.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'Last summer, I ___ to a festival.', opts:['went','go','goed','was go'], ans:0 },
     { q:'We ___ our favourite band on stage.', opts:['saw','see','seed','sawed'], ans:0 },
     { q:'The crowd ___ very excited.', opts:['was','were','are','be'], ans:0 },
     { q:'My friends and I ___ in the front row.', opts:['were','was','are','been'], ans:0 },
     { q:'Which sentence is correct?', opts:["I didn't see the singer.","I didn't saw the singer.",'I not saw the singer.',"I don't saw the singer."], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['went','suis allé.e'],['saw','ai vu'],['was','était'],['were','étions'],['bought','ai acheté'],['had','ai passé']],
     lines:[['Last month, I ',{a:'went'},' to a concert.'],['I ',{a:'saw'},' my favourite singer on stage.'],['The sound ',{a:'was'},' very loud.'],['We ',{a:'were'},' in the front row.'],['After the show, I ',{a:'bought'},' a T-shirt.'],['We ',{a:'had'},' a great time!']] },
   C:{ title:`Je raconte un concert ou un festival`, instruct:`Raconte **un concert ou un festival** (réel ou imaginé) en 7 à 9 phrases : **où**, **avec qui**, **qui tu as vu**, **comment était la foule**, **ce que tu as fait**.`, ph:`Last summer, I went to …\nI saw …\nThe crowd was …\nWe …`,
     rubric:`Récit d'un concert ou festival en 7 à 9 phrases au prétérit : lieu ou moment, avec qui, qui l'élève a vu, description de la foule ou de l'ambiance avec was / were, actions (went, saw, sang, danced, bought, had...). ok = true si au moins 5 phrases sont au prétérit avec un verbe correctement conjugué (y compris irréguliers went, saw, had, bought, sang), si was ou were est bien employé au moins deux fois et si le texte est compréhensible.`, minWords:60 } },

 { title:'My playlist', skill:'EE + EO', lu:'Expression écrite (EE) et Expression orale (EO)',
   goal:`Écrire puis **dire à la classe** : **3 morceaux** pour la fête, avec **une raison** chacun.`,
   vocab:[['Hello everyone.','bonjour à tous.'],["Today, I'm going to present my playlist.","aujourd'hui, je vais présenter ma playlist."],['My first song is…','mon premier morceau est…'],["It's by…","il est de…"],['I chose it because…','je l\'ai choisi parce que…'],['It makes me feel…','ça me fait me sentir…'],['Next, … / The last song is…','ensuite… / le dernier morceau est…'],['To conclude, …','pour conclure, …'],['Thank you for listening.','merci de m\'avoir écouté.e.'],['Do you have any questions?','avez-vous des questions ?']],
   model:[['1. Intro',"Hello everyone. Today, I'm going to present my playlist."],['2. Song 1','My first song is “Lose Yourself” by Eminem. I chose it because the lyrics are powerful.'],['3. Song 2','Next, “bad guy” by Billie Eilish. It is a catchy song which makes me feel confident.'],['4. Song 3','The last song is a gaming soundtrack. It is relaxing, so I listen to it before sleeping.'],['5. Conclusion','To conclude, these three songs would be perfect for our party. Vote for them!'],['6. Thanks','Thank you for listening. Do you have any questions?']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'Which sentence starts the presentation?', opts:["Hello everyone. Today, I'm going to present my playlist.",'Thank you for listening.','To conclude, I like music.','Do you have any questions?'], ans:0 },
     { q:'How do you introduce the first song?', opts:['My first song is…','To conclude, …','Do you have any questions?','Thank you for listening.'], ans:0 },
     { q:'Which sentence gives a reason?', opts:['I chose this song because the beat is catchy.','I chose this song the beat is catchy.','I chose this song because of is catchy.','I choose this song because the beat catchy.'], ans:0 },
     { q:'Which expression introduces the second song?', opts:['Next, …','To conclude, …','Hello everyone, …','Thank you, …'], ans:0 },
     { q:'What do you say at the very end?', opts:['Thank you for listening. Do you have any questions?','Hello everyone.','My first song is…','It makes me feel…'], ans:0 } ] },
   B:{ title:'Je complète mon plan', bank:[['playlist','playlist'],['first','premier'],['chose','ai choisi'],['because','parce que'],['conclude','conclure'],['listening','écoute']],
     lines:[["Today, I'm going to present my ",{a:'playlist'},'.'],['My ',{a:'first'},' song is by Eminem.'],['I ',{a:'chose'},' it for the lyrics.'],['I love it ',{a:'because'},' it makes me feel strong.'],['To ',{a:'conclude'},', music is very important for me.'],['Thank you for ',{a:'listening'},'.']] },
   C:{ title:`J'écris le texte de mon oral`, instruct:`Écris ton oral **pour la classe** (12 à 15 phrases) : **introduction**, **3 morceaux** (artiste, adjectif, raison), **conclusion** et **question**. Puis entraîne-toi à voix haute avec les 🔊 du modèle.`, ph:`Hello everyone. Today, I'm going to present my playlist.\nMy first song is …\nNext, …\nThe last song is …\nTo conclude, …`,
     rubric:`Texte d'oral de 12 à 15 phrases : introduction (hello, present my playlist), trois morceaux présentés avec « My first song is / Next / The last song is », l'artiste (by…), au moins un adjectif de description et une raison (because / which makes me feel), puis conclusion (To conclude, thank you for listening) et question au public (Do you have any questions?). ok = true si au moins 3 morceaux sont présentés avec une raison, si l'introduction et la conclusion sont présentes et si l'anglais est globalement correct et compréhensible.`, minWords:90 } }
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
window.MUSIC_FR = {
  mission: `**Présente** ta **musique** et ta **playlist** à la classe : ensemble, vous choisissez les morceaux de la **fête de fin d'année**.`,
  learn: ['dire ce que tu **aimes** et ce que tu **ne supportes pas**', '**présenter** un.e artiste', '**décrire** un morceau', 'donner ton **avis** et dire **pourquoi**', 'raconter un **concert**', 'présenter ta **playlist** à l\'oral'],
  titles: ['Mes goûts musicaux', 'Mon artiste préféré.e', 'Décrire un morceau', 'Mon avis', 'Un concert ou un festival', 'Ma playlist'],
  model: [
    ['Je suis fan de rap et de R&B. J\'adore le rap !', 'J\'écoute de la musique tous les jours, dans le bus et à la maison.', 'Je ne supporte pas la country. Je n\'en écoute jamais.'],
    ['Mon artiste préférée est Billie Eilish. Elle vient de Los Angeles.', 'Elle a commencé sa carrière en 2015. Elle a gagné cinq prix en 2020.', 'Elle est célèbre pour ses chansons pop sombres.'],
    ['Mon morceau préféré est un morceau accrocheur qui a un super refrain.', 'Les paroles parlent d\'amitié et de moments difficiles.', 'Ça me donne de la force. J\'adore le chanteur qui écrit ses propres chansons.'],
    ['À mon avis, le rap est mieux que la pop parce que les paroles sont plus intéressantes.', 'Je pense que certains morceaux sont trop violents, bien que j\'adore le rythme.', 'Je pense que la musique en live est plus excitante que le streaming, mais c\'est plus cher.'],
    ['En juillet dernier, je suis allé.e à un festival avec mes amis.', 'Nous avons vu mon rappeur préféré. La foule était déchaînée !', 'C\'était incroyable. Nous étions au premier rang et nous avons chanté tous les morceaux.'],
    ['Bonjour à tous. Aujourd\'hui, je vais présenter ma playlist.', 'Mon premier morceau est « Lose Yourself » d\'Eminem. Je l\'ai choisi parce que les paroles sont puissantes.', 'Ensuite, « bad guy » de Billie Eilish. C\'est un morceau accrocheur qui me donne confiance.', 'Le dernier morceau est une bande-son de jeu vidéo. Elle est relaxante, alors je l\'écoute avant de dormir.', 'Pour conclure, ces trois morceaux seraient parfaits pour notre fête. Votez pour eux !', 'Merci de m\'avoir écouté.e. Avez-vous des questions ?']
  ]
};

/* ---- Petit point de grammaire (affiché dans le niveau C de l'étape indiquée) ---- */
window.MUSIC_GRAMMAR = {
  1: {
    title: 'Le présent simple pour parler de ses goûts',
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
      { q: 'After the concert, I feel ___.', opts: ['excited', 'exciting', 'excite', 'excites'], ans: 0 }
    ]
  },
  4: {
    title: 'Donner son avis et comparer',
    rules: [
      ['Avis', 'I think that… / In my opinion, … Pour répondre : I agree / I disagree.'],
      ['because / although', '« because » = la raison. « although » = bien que, une idée contraire : Although it\'s old, I love it.'],
      ['Adjectif court', 'adjectif + -er than : louder than, cheaper than. Irrégulier : good → better.'],
      ['Adjectif long', 'more + adjectif + than : more interesting than, more expensive than.']
    ],
    examples: [['I think that rap is better than pop.', 'Je pense que le rap est mieux que la pop.'], ['I like her songs because they are true.', 'J\'aime ses chansons parce qu\'elles sont vraies.'], ['Although it is old, I love this song.', 'Bien qu\'il soit vieux, j\'adore ce morceau.'], ['Concerts are more exciting than videos.', 'Les concerts sont plus excitants que les vidéos.']],
    verbs: [['good → better','bon → meilleur'],['loud → louder','fort → plus fort'],['cheap → cheaper','bon marché → moins cher'],['interesting → more interesting','intéressant → plus intéressant'],['expensive → more expensive','cher → plus cher'],['bad → worse','mauvais → pire']],
    verbsLabel: 'Comparer',
    check: [
      { q: 'This speaker is ___ my headphones.', opts: ['louder than', 'more loud than', 'loud than', 'the louder'], ans: 0 },
      { q: 'Rock is ___ than jazz.', opts: ['more energetic', 'energeticer', 'most energetic', 'energetic'], ans: 0 },
      { q: '___ I was tired, I loved the concert.', opts: ['Although', 'Because', 'So', 'Or'], ans: 0 },
      { q: 'I like her songs ___ the lyrics are true.', opts: ['because', 'although', 'but', 'while'], ans: 0 },
      { q: 'In my ___, this is the best song.', opts: ['opinion', 'think', 'agree', 'idea'], ans: 0 }
    ]
  },
  5: {
    title: 'Le prétérit : was / were et verbes irréguliers',
    rules: [
      ['was / were', 'I / he / she / it → was. You / we / they → were : The crowd was loud. We were happy.'],
      ['Réguliers', '+ -ed : dance → danced, listen → listened.'],
      ['Irréguliers', 'go → went, see → saw, buy → bought, have → had, sing → sang.'],
      ['Négatif et question', '« didn\'t » + verbe de base. « Did » + sujet + verbe de base : Did you see the band ?']
    ],
    examples: [['The crowd was crazy.', 'La foule était déchaînée.'], ['We went to a festival.', 'Nous sommes allé.e.s à un festival.'], ['I didn\'t see the singer.', 'Je n\'ai pas vu le chanteur.'], ['Did you buy a T-shirt ?', 'As-tu acheté un T-shirt ?']],
    verbs: [['go → went','aller'],['see → saw','voir'],['buy → bought','acheter'],['have → had','avoir'],['sing → sang','chanter'],['be → was / were','être']],
    verbsLabel: 'Verbes irréguliers',
    check: [
      { q: 'The tickets ___ expensive.', opts: ['were', 'was', 'is', 'be'], ans: 0 },
      { q: 'I ___ a T-shirt at the festival.', opts: ['bought', 'buyed', 'buy', 'boughted'], ans: 0 },
      { q: 'We ___ all the songs.', opts: ['sang', 'singed', 'sing', 'sung'], ans: 0 },
      { q: '___ you go to the concert?', opts: ['Did', 'Do', 'Were', 'Have'], ans: 0 },
      { q: "They didn't ___ the show.", opts: ['miss', 'missed', 'misses', 'missing'], ans: 0 }
    ]
  },
  6: {
    title: 'Structurer mon oral',
    rules: [
      ['Introduction', '« Hello everyone. Today, I\'m going to present my playlist. »'],
      ['Les 3 morceaux', 'My first song is… / Next, … / The last song is… + « It\'s by… », un adjectif, « because ».'],
      ['Conclusion', '« To conclude, … Thank you for listening. Do you have any questions? »'],
      ['À l\'oral', 'Parle lentement, fais une pause à la fin de chaque phrase, écoute-toi avec les 🔊.']
    ],
    examples: [['Today, I\'m going to present my playlist.', 'Aujourd\'hui, je vais présenter ma playlist.'], ['My first song is by Eminem.', 'Mon premier morceau est d\'Eminem.'], ['I chose it because it is powerful.', 'Je l\'ai choisi parce qu\'il est puissant.'], ['To conclude, music is important for me.', 'Pour conclure, la musique est importante pour moi.']],
    verbs: [['first','premier'],['next','ensuite'],['the last song','le dernier morceau'],['I chose','j\'ai choisi'],['to conclude','pour conclure'],['thank you for listening','merci de m\'avoir écouté.e']],
    verbsLabel: 'Mots de l\'oral',
    check: [
      { q: "Today, I'm going ___ present my playlist.", opts: ['to', 'for', 'at', 'of'], ans: 0 },
      { q: 'My ___ song is a rap track.', opts: ['first', 'firstly', 'one', 'number'], ans: 0 },
      { q: "It's a song ___ makes me feel strong.", opts: ['which', 'who', 'where', 'what'], ans: 0 },
      { q: 'To ___, I love music.', opts: ['conclude', 'concluded', 'concluding', 'conclusion'], ans: 0 },
      { q: 'Thank you for ___.', opts: ['listening', 'listen', 'to listen', 'listened'], ans: 0 }
    ]
  }
};
})();
