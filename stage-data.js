/*
  Internship Report — raconter, analyser et présenter son stage en anglais (1ère MELEC / MES).
  Version « plus complexe » du « Talk about your internship » : 6 étapes, niveaux A / B / C à chaque étape.
  Partagé par la page élève (cours-stage.html), le suivi enseignante (cours-suivi.html) et la fiche papier.
*/
(function(){

const MISSION = `You did your work placement (or you are about to). Now you have to talk about it like a professional: present your placement, describe the company and the people, explain what you did, tell a problem you solved, thank your tutor and give your opinion — and finally prepare a clear oral presentation. Your mission: build your own "internship report" step by step, in English.`;
const LEARN = ['present yourself and your placement', 'describe a company and the people', 'explain your tasks in the past', 'tell a problem and how you solved it', 'thank your tutor and give your opinion', 'prepare and give an oral presentation'];

const STEPS = [
 { title:'Presenting my internship', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Objectif : te présenter et situer ton stage (quand, où, combien de temps, avec qui).`,
   vocab:[['internship / work placement','stage en entreprise'],['tutor / supervisor','tuteur / tutrice en entreprise'],['to take place','avoir lieu'],['from … to …','du … au …'],['for three weeks','pendant trois semaines (durée)'],['during','pendant (une période, un événement)'],['to be in charge of','être chargé.e de'],['department','service'],['work experience','expérience professionnelle'],['apprenticeship','apprentissage / alternance']],
   model:[['Teacher','Tell me about your internship.'],['You',`My name is Léa and I am sixteen years old. My internship took place at an electrical company in Clermont-Ferrand.`],['Teacher','When was it?'],['You','It lasted three weeks, from the 3rd of March to the 21st of March.'],['Teacher','Who was your supervisor?'],['You','My tutor was Mr Martin. He was in charge of the maintenance department.'],['Teacher','Did you like it?'],['You','Yes, I did. I learnt a lot during those three weeks.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'My internship ___ at a small company.', opts:['took place','take place','was taking place at','taken place'], ans:0 },
     { q:'It lasted three weeks, ___ the 3rd ___ the 21st of March.', opts:['from … to','since … until','of … at','between … for'], ans:0 },
     { q:'I worked there ___ three weeks.', opts:['for','since','ago','during of'], ans:0 },
     { q:'My tutor ___ in charge of the workshop.', opts:['was','were','is being','has been'], ans:0 },
     { q:'Which sentence is correct?', opts:['I did my internship last month.','I did my internship before last month ago.','I did my internship since last month.','I do my internship last month.'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['took','a eu (took place)'],['from','du'],['to','au'],['for','pendant (durée)'],['charge','charge'],['learnt','ai appris']],
     lines:[['My internship ',{a:'took'},' place at Legrand.'],['It lasted three weeks, ',{a:'from'},' the 3rd of March ',{a:'to'},' the 21st of March.'],['I worked there ',{a:'for'},' three weeks.'],['My tutor was in ',{a:'charge'},' of the department.'],['I ',{a:'learnt'},' a lot during my internship.']] },
   C:{ title:`J'écris ma présentation`, instruct:`Présente-toi et présente ton stage en 6 à 8 phrases : ton prénom et ton âge, le nom et le lieu de l'entreprise (invente-les si besoin), les dates et la durée (from … to … / for …), ton tuteur et son rôle, ce que tu as pensé de cette expérience.`, ph:`My name is … and I am … years old.\nMy internship took place at …`,
     rubric:`Présentation d'un stage en anglais (6 à 8 phrases) : prénom et âge, entreprise et lieu, dates ou durée (from … to … / for …), tuteur et son rôle, appréciation. Le passé (took place, lasted, was) doit être utilisé correctement. ok = true si au moins 5 de ces éléments sont présents dans un anglais compréhensible, avec des phrases au passé correctes pour parler du stage.`, minWords:50 } },

 { title:'The company and the people', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Objectif : décrire l'entreprise et les personnes avec qui tu as travaillé, en utilisant who / which / that.`,
   vocab:[['company / firm','entreprise'],['to specialise in','être spécialisé.e dans'],['employees / staff','employés / personnel'],['customer / client','client'],['workshop','atelier'],['building site','chantier'],['safety rules','règles de sécurité'],['protective equipment','équipements de protection'],['team','équipe'],['manager','responsable / directeur']],
   model:[['Teacher','What kind of company was it?'],['You','It was a small company which specialised in electrical installations.'],['Teacher','How many people worked there?'],['You','About twenty employees, who worked in teams of two or three.'],['Teacher','Who did you work with?'],['You','I worked with Paul, who is an electrician with ten years of experience.'],['Teacher','Were there safety rules?'],['You','Yes. We had to wear protective equipment that the company provided.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'It was a company ___ specialised in solar panels.', opts:['which','who','where','whose'], ans:0 },
     { q:'I worked with a man ___ taught me a lot.', opts:['who','which','what','whose'], ans:0 },
     { q:'The tools ___ we used were new.', opts:['that','who','where','whom'], ans:0 },
     { q:'Choose the best sentence.', opts:['The company had twenty employees.','The company had twenty employees staffs.','The company have twenty employee.','The company has had twenty employees yesterday.'], ans:0 },
     { q:'"What kind of company was it?"', opts:['It was a small company which installed alarms.','It was Monday morning.','I was sixteen.','It took place in March.'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['which','qui / que (chose)'],['who','qui (personne)'],['specialised','spécialisée'],['employees','employés'],['safety','sécurité'],['team','équipe']],
     lines:[['It was a company ',{a:'which'},' repaired machines.'],['My tutor, ',{a:'who'},' was very kind, explained everything.'],['The company was ',{a:'specialised'},' in electrical installations.'],['It had twenty ',{a:'employees'},'.'],['We had to follow the ',{a:'safety'},' rules.'],['I worked in a ',{a:'team'},' of three people.']] },
   C:{ title:`Je décris l'entreprise et mon tuteur`, instruct:`Décris en 7 à 9 phrases l'entreprise de ton stage (type, taille, activité, règles de sécurité) et une ou deux personnes avec qui tu as travaillé. Utilise au moins 3 fois « who », « which » ou « that ».`, ph:`It was a … company which …\nI worked with …, who …`,
     rubric:`Description d'une entreprise et de collègues en anglais (7 à 9 phrases) : type et taille de l'entreprise, activité, au moins une règle de sécurité, au moins une personne décrite. Au moins 3 propositions relatives avec who / which / that employées correctement. ok = true si au moins 3 relatives correctes et le reste globalement compréhensible.`, minWords:55 } },

 { title:'My tasks and a typical day', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Objectif : raconter ce que tu as fait pendant ton stage au passé (prétérit) et organiser ton récit.`,
   vocab:[['to install','installer'],['to wire / to connect','câbler / connecter'],['to test','tester'],['to measure','mesurer'],['to read a diagram','lire un schéma'],['to tighten / to loosen','serrer / desserrer'],['to replace','remplacer'],['to help / to assist','aider / assister'],['I had to …','j\'ai dû …'],['I was allowed to …','j\'avais le droit de …']],
   model:[['Teacher','What did you do during a typical day?'],['You','First, I helped my tutor prepare the tools. Then we went to a building site.'],['Teacher','What were your main tasks?'],['You','I connected cables, tested circuits and read diagrams.'],['Teacher','Were you allowed to work alone?'],['You',`No, I wasn't. I had to ask for help for dangerous tasks.`],['Teacher','And at the end of the day?'],['You','Finally, we cleaned the site and wrote a short report.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'Yesterday, I ___ a circuit.', opts:['tested','test','am testing','have test'], ans:0 },
     { q:'Last week, we ___ to a building site.', opts:['went','goed','gone','go'], ans:0 },
     { q:'My tutor ___ me to the workshop.', opts:['took','taked','taken','take'], ans:0 },
     { q:'I ___ ask for help because it was dangerous.', opts:['had to','have to','must to','had'], ans:0 },
     { q:'Choose the best sequence.', opts:['First, I helped. Then, I tested. Finally, I wrote a report.','Finally, I helped. First, I wrote. Then, I tested.','Then, first I helped. Finally, then I tested.','I tested first then finally helped first.'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['helped','ai aidé'],['went','suis allé.e'],['took','a emmené'],['tested','ai testé'],['had to','ai dû'],[`wasn't`,`n'avais pas le droit`]],
     lines:[['First, I ',{a:'helped'},' my tutor.'],['Then we ',{a:'went'},' to a building site.'],['My tutor ',{a:'took'},' me to the workshop.'],['I ',{a:'tested'},' circuits.'],['I ',{a:'had to'},' wear a helmet.'],['I ',{a:`wasn't`},' allowed to work alone.']] },
   C:{ title:`Je raconte une journée type`, instruct:`Raconte une journée type de ton stage en 8 à 10 phrases, au passé : ce que tu as fait, avec qui, avec quels outils. Utilise first / then / after that / finally, au moins 4 verbes différents dont 2 irréguliers (go, take, make, do, have, find…) et une phrase avec « I had to » ou « I was allowed to ».`, ph:`First, I …\nThen, we …`,
     rubric:`Récit au passé d'une journée de stage (8 à 10 phrases) : verbes au prétérit (réguliers et au moins 2 irréguliers corrects : went, took, made, did, had, found, built…), connecteurs de séquence (first, then, after that, finally), au moins 4 tâches ou actions différentes, une phrase avec « I had to » ou « I was allowed to ». ok = true si le prétérit est globalement correct (au plus 2 erreurs de forme) et si au moins 3 connecteurs sont présents.`, minWords:70 } },

 { title:'A problem and how I solved it', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Objectif : raconter un problème et sa solution avec le passé continu (while + was / were + -ing) et des mots de liaison.`,
   vocab:[['a problem / a mistake','un problème / une erreur'],['a power cut','une coupure de courant'],['to fix / to solve','réparer / résoudre'],['to realise','se rendre compte'],['to ask for help','demander de l\'aide'],['dangerous','dangereux'],['lucky','chanceux'],['however','cependant'],['although','bien que'],['next time','la prochaine fois']],
   model:[['Teacher','Did you have any problems during your internship?'],['You','Yes. One day, while I was testing a circuit, the lights went out.'],['Teacher','What did you do?'],['You','I stopped immediately and called my tutor, because it was dangerous.'],['Teacher','How did you solve it?'],['You','We found a loose wire and fixed it. However, I should have checked the fuse first.'],['Teacher','And next time?'],['You','Next time, I would check everything before starting.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'While I ___ a circuit, the lights went out.', opts:['was testing','tested','am testing','test'], ans:0 },
     { q:'I was working when my tutor ___.', opts:['arrived','was arrive','arrives','arriving'], ans:0 },
     { q:'It was dangerous, ___ I stopped immediately.', opts:['so','because','although','however'], ans:0 },
     { q:'I made a mistake, ___ my tutor was not angry.', opts:['but','so','because','while'], ans:0 },
     { q:'Choose the best sentence.', opts:['Next time, I would check the fuse first.','Next time, I would checked the fuse first.','Next time, I will to check.','Next time I checking first.'], ans:0 } ] },
   B:{ title:'Je complète le texte', bank:[['was testing','testais'],['went out','s\'est éteinte'],['because','parce que'],['However','cependant'],['should','aurais dû'],['would','ferais']],
     lines:[['While I ',{a:'was testing'},' a circuit, I smelled something strange.'],['Suddenly, the lights ',{a:'went out'},'.'],['I called my tutor ',{a:'because'},' it was dangerous.'],['It was my mistake. ',{a:'However'},', nobody was hurt.'],['I ',{a:'should'},' have checked the fuse first.'],['Next time, I ',{a:'would'},' check everything.']] },
   C:{ title:`Je raconte un problème`, instruct:`Raconte en 8 à 10 phrases un problème (réel ou inventé) que tu as rencontré pendant ton stage et comment il a été résolu. Utilise au moins une fois « while + was / were + -ing », un mot de liaison (because / so / but / however) et termine par « Next time, I would… » ou « I should have… ».`, ph:`One day, while I was …\nSuddenly, …`,
     rubric:`Récit d'un problème en stage (8 à 10 phrases) : contexte, problème, réaction, solution, leçon. Au moins une phrase avec while + passé continu (was/were + -ing) correcte, au moins un connecteur (because, so, but, however, although), une phrase de leçon avec « Next time, I would… » ou « I should have… ». ok = true si ces trois éléments sont présents et corrects, et si le récit est compréhensible.`, minWords:70 } },

 { title:'Thank you and my opinion', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:`Objectif : donner ton avis sur le stage, parler de ce que tu as appris et de ton projet, et écrire un mail de remerciement à ton tuteur.`,
   vocab:[['skill','compétence'],['to improve','progresser / s\'améliorer'],['teamwork','travail d\'équipe'],['responsibility','responsabilité'],['proud','fier / fière'],['I would recommend …','je recommanderais …'],['future career','futur métier'],['thanks to …','grâce à …'],['Dear Mr …,','Cher Monsieur …,'],['Yours sincerely,','Cordialement,']],
   model:[['Subject','Thank you for my internship'],['Greeting','Dear Mr Martin,'],['Thanks','I would like to thank you for welcoming me in your company.'],['Skills','Thanks to you, I improved my technical skills and learnt to work in a team.'],['Opinion','The most interesting part was installing the circuits, but the most difficult one was reading the diagrams.'],['Future','I would like to work in an electrical company in the future.'],['Closing','Thank you again for everything.'],['Sign-off','Yours sincerely, Léa Durand']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'Which opening is correct for a formal email to your tutor?', opts:['Dear Mr Martin,','Hey Martin!','Yo,','Dear Martin, my friend!'], ans:0 },
     { q:'Which sentence thanks the company politely?', opts:['I would like to thank you for welcoming me.','Thanks, bye.','You welcome me yes.','I thank welcome you.'], ans:0 },
     { q:'___ you, I improved my skills.', opts:['Thanks to','Because','Although','Instead'], ans:0 },
     { q:'Which sentence gives an opinion about the internship?', opts:['The most interesting part was installing circuits.','The company is in Clermont-Ferrand.',`I arrived at 8 o'clock.`,'It lasted three weeks.'], ans:0 },
     { q:'How do you end a formal email?', opts:['Yours sincerely,','See you, bro,','Kisses,','Bye bye!!!'], ans:0 } ] },
   B:{ title:'Je complète le mail', bank:[['thank','remercier'],['improved','ai progressé'],['proud','fier / fière'],['recommend','recommander'],['career','carrière / métier'],['sincerely','cordialement']],
     lines:[['I would like to ',{a:'thank'},' you for welcoming me.'],['I ',{a:'improved'},' my technical skills.'],['I am very ',{a:'proud'},' of my work.'],['I would ',{a:'recommend'},' this company to other students.'],['I would like to build a ',{a:'career'},' in electricity.'],['Yours ',{a:'sincerely'},',']] },
   C:{ title:`J'écris mon mail de remerciement`, instruct:`Écris un mail de remerciement à ton tuteur (8 à 10 phrases) : formule d'appel, remerciements, 2 choses que tu as apprises, la partie que tu as préférée et celle qui était difficile, ton projet pour l'avenir (I would like to… / I'm going to… / I hope to…), formule de politesse et signature.`, ph:`Subject: Thank you for my internship\n\nDear Mr …,\n\nI would like to thank you for …\n\nYours sincerely,\n…`,
     rubric:`Mail formel de remerciement à un tuteur de stage (8 à 10 phrases) : objet, formule d'appel (Dear Mr/Ms …), remerciements, au moins 2 compétences ou apprentissages, avis sur une partie préférée et une partie difficile, projet d'avenir (would like to / going to / hope to), formule de politesse (Yours sincerely) et signature. ok = true si au moins 5 de ces éléments sont présents, avec un registre poli et correct.`, minWords:75 } },

 { title:'Prepare your oral', skill:'EE + EO', lu:'Expression écrite (EE) et Expression orale (EO)',
   goal:`Objectif : écrire le texte complet de ton oral « Talk about my internship », puis t'entraîner à le dire à voix haute.`,
   vocab:[[`I'm going to talk about …`,'je vais parler de …'],['First of all,','tout d\'abord,'],['Then / After that,','ensuite / après cela,'],['In my opinion,','à mon avis,'],['To conclude,','pour conclure,'],['Thank you for listening.','merci de m\'avoir écouté.'],['Do you have any questions?','avez-vous des questions ?'],['to sum up','résumer'],['a key word','un mot-clé'],['to speak clearly','parler clairement']],
   model:[['1. Intro',`Hello everyone. I'm going to talk about my internship.`],['2. Company','It took place at a small electrical company which employed twenty people.'],['3. Tasks','First of all, I helped my tutor. Then I connected cables and tested circuits.'],['4. Opinion','In my opinion, the most interesting part was repairing devices, because I learnt a lot.'],['5. Conclusion','To conclude, I loved my internship. Thank you for listening. Do you have any questions?']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'Which sentence starts an oral presentation?', opts:[`Hello everyone. I'm going to talk about my internship.`,'Bye, that was all.','In my opinion, thank you.','Do you have any questions? Hello.'], ans:0 },
     { q:'Which expression introduces your opinion?', opts:['In my opinion,','First of all,','To conclude,','Thank you,'], ans:0 },
     { q:'Which expression ends the talk?', opts:['To conclude, I loved my internship.','First of all, I loved it.','Then, hello.','In my opinion, hello.'], ans:0 },
     { q:'To explain your tasks in order you say…', opts:['First of all, … Then, … Finally, …','Finally, … First of all, … Then, …','Then, … Then, … Then, …','In conclusion, … Hello, …'], ans:0 },
     { q:'What do you say at the very end?', opts:['Thank you for listening. Do you have any questions?','See you, I am leaving.','This is my opinion hello.','Please sit down.'], ans:0 } ] },
   B:{ title:'Je complète mon plan', bank:[['going','je vais'],['First','tout d\'abord'],['Then','ensuite'],['opinion','avis'],['conclude','conclure'],['listening','écoute']],
     lines:[[`I'm `,{a:'going'},' to talk about my internship.'],[{a:'First'},' of all, I helped my tutor.'],[{a:'Then'},' I connected cables.'],['In my ',{a:'opinion'},', it was a great experience.'],['To ',{a:'conclude'},', I loved it.'],['Thank you for ',{a:'listening'},'.']] },
   C:{ title:`J'écris mon texte d'oral`, instruct:`Écris le texte complet de ton oral (12 à 15 phrases) en 5 parties : 1) introduction, 2) l'entreprise, 3) ce que tu as fait (au passé, avec first / then / finally), 4) ton avis et un problème résolu, 5) conclusion et « Do you have any questions? ». Ensuite, entraîne-toi à le dire à voix haute avec les boutons 🔊 du modèle et prépare ta carte mentale avec des mots-clés.`, ph:`Hello everyone. I'm going to talk about my internship.\n…`,
     rubric:`Texte d'oral sur un stage en anglais (12 à 15 phrases) en 5 parties : introduction, entreprise, tâches au passé (first/then/finally), avis (in my opinion + because) avec un problème résolu, conclusion (to conclude + thank you / questions). Prétérit globalement correct, connecteurs de l'oral utilisés. ok = true si au moins 4 des 5 parties sont présentes et si le passé est globalement correct.`, minWords:100 } }
];

const course = {
  id:'internship-report',
  title:'Internship Report',
  subtitle:'Raconter, analyser et présenter mon stage en anglais',
  studentPage:'cours-stage.html',
  steps: STEPS.map((s, i) => ({ n:i + 1, title:s.title, skill:s.skill, lu:s.lu, goal:s.goal,
    levels:{
      A:{ title:'Je démarre en douceur', tag:'je choisis la bonne réponse', qs:[{id:(i + 1) + 'A-1', prompt:s.title + ' — niveau A'}] },
      B:{ title:'Je m\'entraîne davantage', tag:'je complète avec les mots', qs:[{id:(i + 1) + 'B-1', prompt:s.title + ' — niveau B'}] },
      C:{ title:'Je me lance sans filet', tag:s.C.title, qs:[{id:(i + 1) + 'C-1', prompt:s.title + ' — niveau C'}] } } }))
};
course.allQuestions = [];
course.steps.forEach(s => ['A','B','C'].forEach(L => s.levels[L].qs.forEach((q, k) => { q.step = s.n; q.level = L; q.index = k; course.allQuestions.push(q); })));

window.STAGE_COURSE = course;
window.STAGE_DATA = { MISSION, LEARN, STEPS };

/* ---- Traductions françaises (bouton « Traduire ») ---- */
window.STAGE_FR = {
  mission: `Tu as fait ton stage (ou tu vas le faire). Maintenant, il faut en parler comme un.e professionnel.le : présenter ton stage, décrire l'entreprise et les personnes, expliquer ce que tu as fait, raconter un problème que tu as résolu, remercier ton tuteur et donner ton avis — et enfin préparer un oral clair. Ta mission : construire ton « rapport de stage » étape par étape, en anglais.`,
  learn: ['te présenter et présenter ton stage', 'décrire une entreprise et les personnes', 'expliquer tes tâches au passé', 'raconter un problème et comment tu l\'as résolu', 'remercier ton tuteur et donner ton avis', 'préparer et présenter un oral'],
  titles: ['Présenter mon stage', 'L\'entreprise et les personnes', 'Mes tâches et une journée type', 'Un problème et comment je l\'ai résolu', 'Remercier et donner mon avis', 'Préparer mon oral'],
  model: [
    ['Parle-moi de ton stage.', `Je m'appelle Léa et j'ai seize ans. Mon stage a eu lieu dans une entreprise d'électricité à Clermont-Ferrand.`, 'C\'était quand ?', 'Il a duré trois semaines, du 3 mars au 21 mars.', 'Qui était ton tuteur ?', 'Mon tuteur était M. Martin. Il était responsable du service maintenance.', 'Ça t\'a plu ?', 'Oui. J\'ai beaucoup appris pendant ces trois semaines.'],
    ['Quel genre d\'entreprise c\'était ?', 'C\'était une petite entreprise spécialisée dans les installations électriques.', 'Combien de personnes y travaillaient ?', 'Une vingtaine d\'employés, qui travaillaient par équipes de deux ou trois.', 'Avec qui as-tu travaillé ?', 'J\'ai travaillé avec Paul, qui est électricien depuis dix ans.', 'Y avait-il des règles de sécurité ?', 'Oui. Nous devions porter des équipements de protection que l\'entreprise fournissait.'],
    ['Que faisais-tu pendant une journée type ?', 'D\'abord, j\'aidais mon tuteur à préparer les outils. Ensuite, nous allions sur un chantier.', 'Quelles étaient tes tâches principales ?', 'Je connectais des câbles, je testais des circuits et je lisais des schémas.', 'Avais-tu le droit de travailler seul.e ?', 'Non. Je devais demander de l\'aide pour les tâches dangereuses.', 'Et à la fin de la journée ?', 'Enfin, nous nettoyions le chantier et écrivions un court rapport.'],
    ['As-tu eu des problèmes pendant ton stage ?', 'Oui. Un jour, pendant que je testais un circuit, les lumières se sont éteintes.', 'Qu\'as-tu fait ?', 'Je me suis arrêté.e tout de suite et j\'ai appelé mon tuteur, parce que c\'était dangereux.', 'Comment l\'avez-vous résolu ?', 'Nous avons trouvé un fil mal serré et nous l\'avons réparé. Cependant, j\'aurais dû vérifier le fusible d\'abord.', 'Et la prochaine fois ?', 'La prochaine fois, je vérifierais tout avant de commencer.'],
    ['Objet : Merci pour mon stage', 'Cher Monsieur Martin,', 'Je voudrais vous remercier de m\'avoir accueilli.e dans votre entreprise.', 'Grâce à vous, j\'ai amélioré mes compétences techniques et appris à travailler en équipe.', 'La partie la plus intéressante a été l\'installation des circuits, mais la plus difficile a été la lecture des schémas.', 'Je voudrais travailler dans une entreprise d\'électricité plus tard.', 'Merci encore pour tout.', 'Cordialement, Léa Durand'],
    ['Bonjour à tous. Je vais parler de mon stage.', 'Il a eu lieu dans une petite entreprise d\'électricité qui employait vingt personnes.', 'Tout d\'abord, j\'ai aidé mon tuteur. Ensuite, j\'ai connecté des câbles et testé des circuits.', 'À mon avis, la partie la plus intéressante a été de réparer des appareils, parce que j\'ai beaucoup appris.', 'Pour conclure, j\'ai adoré mon stage. Merci de m\'avoir écouté. Avez-vous des questions ?']
  ]
};

/* ---- Petit point de grammaire (affiché dans le niveau C de l'étape indiquée) ---- */
window.STAGE_GRAMMAR = {
  1: {
    title: 'Dates et durée : from … to, for, during, ago, last',
    rules: [
      ['Début et fin', '« from … to … » donne le début et la fin : from the 3rd of March to the 21st of March.'],
      ['La durée', '« for » + une durée : for three weeks. Attention : on ne dit pas « during three weeks ».'],
      ['Pendant une période', '« during » + un nom (une période, un événement) : during my internship, during the summer.'],
      ['Il y a / dernier', '« ago » se place après la durée : two months ago. « last » se place avant : last week, last month.']
    ],
    examples: [['My internship lasted three weeks.', 'Mon stage a duré trois semaines.'], ['It took place from March to April.', 'Il a eu lieu de mars à avril.'], ['I learnt a lot during my internship.', 'J\'ai beaucoup appris pendant mon stage.'], ['I started two months ago.', 'J\'ai commencé il y a deux mois.']],
    verbs: [['for','pendant (durée)'],['during','pendant (période)'],['ago','il y a'],['last','dernier / dernière'],['since','depuis']],
    verbsLabel: 'Mots utiles',
    check: [
      { q: 'I worked there ___ three weeks.', opts: ['for', 'during', 'ago', 'last'], ans: 0 },
      { q: 'It lasted ___ the 3rd of March to the 21st.', opts: ['from', 'since', 'for', 'at'], ans: 0 },
      { q: 'I did my internship two months ___.', opts: ['ago', 'last', 'for', 'during'], ans: 0 },
      { q: 'I learnt a lot ___ my internship.', opts: ['during', 'for', 'ago', 'from'], ans: 0 },
      { q: '___ month, I started my internship.', opts: ['Last', 'Ago', 'For', 'During'], ans: 0 }
    ]
  },
  2: {
    title: 'who / which / that : les pronoms relatifs',
    rules: [
      ['À quoi ça sert ?', 'Les pronoms relatifs relient deux phrases et évitent de répéter : « I worked with a man. He taught me a lot. » devient « I worked with a man who taught me a lot. »'],
      ['who', 'pour les personnes : my tutor, who was very kind.'],
      ['which', 'pour les choses : a company which repaired machines.'],
      ['that', 'pour les personnes ou les choses, quand on ne met pas de virgule : the tools that we used.'],
      ['where', 'pour un lieu : the workshop where I worked.']
    ],
    examples: [['I met a woman who works in HR.', 'J\'ai rencontré une femme qui travaille aux RH.'], ['It is a company which makes cables.', 'C\'est une entreprise qui fabrique des câbles.'], ['The tools that I used were heavy.', 'Les outils que j\'ai utilisés étaient lourds.'], ['This is the workshop where I worked.', 'Voici l\'atelier où j\'ai travaillé.']],
    verbs: [['who','qui (personne)'],['which','qui / que (chose)'],['that','qui / que'],['where','où']],
    verbsLabel: 'Mots utiles',
    check: [
      { q: 'I met a woman ___ works in HR.', opts: ['who', 'which', 'where', 'what'], ans: 0 },
      { q: 'It is a company ___ makes cables.', opts: ['which', 'who', 'where', 'whose'], ans: 0 },
      { q: 'The tools ___ I used were heavy.', opts: ['that', 'who', 'where', 'whom'], ans: 0 },
      { q: 'My tutor, ___ is very kind, explained everything.', opts: ['who', 'which', 'that', 'where'], ans: 0 },
      { q: 'The workshop ___ I worked is big.', opts: ['where', 'who', 'which', 'what'], ans: 0 }
    ]
  },
  3: {
    title: 'Le prétérit : raconter ce qui s\'est passé',
    rules: [
      ['Verbes réguliers', 'On ajoute -ed : install → installed, test → tested, help → helped.'],
      ['Verbes irréguliers', 'Ils changent : go → went, take → took, make → made, do → did, have → had, find → found, write → wrote. Il faut les apprendre !'],
      ['Négation', 'didn\'t + verbe de base (sans -ed) : I didn\'t work alone.'],
      ['Question', 'Did + sujet + verbe de base : Did you work on Friday?']
    ],
    examples: [['I installed a socket.', 'J\'ai installé une prise.'], ['We went to a building site.', 'Nous sommes allés sur un chantier.'], ['I didn\'t use the machine alone.', 'Je n\'ai pas utilisé la machine seul.e.'], ['Did you wire the board?', 'As-tu câblé le tableau ?']],
    verbs: [['go','went'],['take','took'],['make','made'],['do','did'],['have','had'],['find','found'],['write','wrote'],['see','saw'],['give','gave'],['build','built']],
    verbsLabel: 'Verbes irréguliers',
    check: [
      { q: 'Last month, I ___ a new tool.', opts: ['found', 'finded', 'find', 'founded'], ans: 0 },
      { q: 'I ___ use the machine alone.', opts: ["didn't", "don't", "wasn't", 'not'], ans: 0 },
      { q: '___ you work on Friday?', opts: ['Did', 'Do', 'Were', 'Have'], ans: 0 },
      { q: 'We ___ the cables on Monday.', opts: ['installed', 'installing', 'installs', 'install'], ans: 0 },
      { q: 'She ___ me how to wire it.', opts: ['showed', 'showing', 'show', 'shown'], ans: 0 }
    ]
  },
  4: {
    title: 'Passé continu et prétérit : while / when',
    rules: [
      ['Le passé continu', 'was / were + verbe en -ing : une action en cours dans le passé. « I was testing a circuit. »'],
      ['Le prétérit', 'une action courte, qui interrompt : « The lights went out. »'],
      ['while / when', '« While » + passé continu (action longue). « When » + prétérit (action courte). While I was testing, the lights went out. / I was testing when the lights went out.'],
      ['Les mots de liaison', 'because (parce que), so (donc), but (mais), however (cependant), although (bien que).']
    ],
    examples: [['While I was working, the power went off.', 'Pendant que je travaillais, le courant a été coupé.'], ['I was checking the cables when it happened.', 'Je vérifiais les câbles quand c\'est arrivé.'], ['It was dangerous, so I called my tutor.', 'C\'était dangereux, donc j\'ai appelé mon tuteur.'], ['Next time, I would check the fuse first.', 'La prochaine fois, je vérifierais d\'abord le fusible.']],
    verbs: [['while','pendant que'],['when','quand'],['because','parce que'],['so','donc'],['however','cependant']],
    verbsLabel: 'Mots de liaison',
    check: [
      { q: 'While I ___ the cables, the power went off.', opts: ['was checking', 'checked', 'check', 'have checked'], ans: 0 },
      { q: 'I was checking the cables ___ the power went off.', opts: ['when', 'while', 'because', 'so'], ans: 0 },
      { q: 'What ___ you doing when the lights went out?', opts: ['were', 'did', 'was', 'do'], ans: 0 },
      { q: 'We ___ a loose wire, so we fixed it.', opts: ['found', 'were finding', 'find', 'finding'], ans: 0 },
      { q: 'They ___ for a solution when I arrived.', opts: ['were looking', 'looked', 'look', 'looks'], ans: 0 }
    ]
  },
  5: {
    title: 'Parler de l\'avenir et remercier : would like to, going to, thanks to',
    rules: [
      ['Un souhait poli', '« I would like to » + verbe : je voudrais. I would like to work in an electrical company.'],
      ['Un projet', '« I\'m going to » + verbe : j\'ai prévu de. I\'m going to apply for a job.'],
      ['Un espoir', '« I hope to » + verbe : j\'espère. I hope to work here again.'],
      ['Remercier', '« Thank you for » + nom ou -ing : Thank you for welcoming me. « Thanks to » + nom : grâce à. Thanks to you, I improved.']
    ],
    examples: [['I would like to work in this company.', 'Je voudrais travailler dans cette entreprise.'], ['I\'m going to apply for an apprenticeship.', 'Je vais postuler pour une alternance.'], ['Thank you for welcoming me.', 'Merci de m\'avoir accueilli.e.'], ['Thanks to you, I learnt a lot.', 'Grâce à vous, j\'ai beaucoup appris.']],
    verbs: [['would like to','je voudrais'],['going to','je vais'],['hope to','j\'espère'],['thank you for','merci de'],['thanks to','grâce à']],
    verbsLabel: 'Expressions utiles',
    check: [
      { q: 'I ___ like to work in this company.', opts: ['would', 'am', 'will to', 'do'], ans: 0 },
      { q: 'I am ___ to apply for a job next year.', opts: ['going', 'would', 'hope', 'thanks'], ans: 0 },
      { q: '___ to my tutor, I learnt a lot.', opts: ['Thanks', 'Thank', 'Because', 'Although'], ans: 0 },
      { q: 'I hope ___ work here again.', opts: ['to', 'for', 'at', 'of'], ans: 0 },
      { q: 'I would ___ this company to my friends.', opts: ['recommend', 'recommending', 'recommended', 'to recommend'], ans: 0 }
    ]
  },
  6: {
    title: 'Les mots de l\'oral : structurer ton discours',
    rules: [
      ['Commencer', '« Hello everyone. I\'m going to talk about… » annonce le sujet.'],
      ['Enchaîner', 'First of all, … Then, … After that, … Finally, … : ils montrent l\'ordre de ton récit.'],
      ['Donner son avis', 'In my opinion, … / I think that … + because : un avis se justifie toujours.'],
      ['Conclure', 'To conclude, … / To sum up, … puis : Thank you for listening. Do you have any questions?']
    ],
    examples: [['Hello everyone. I\'m going to talk about my internship.', 'Bonjour à tous. Je vais parler de mon stage.'], ['First of all, I helped my tutor.', 'Tout d\'abord, j\'ai aidé mon tuteur.'], ['In my opinion, it was a great experience.', 'À mon avis, c\'était une super expérience.'], ['To conclude, I loved my internship.', 'Pour conclure, j\'ai adoré mon stage.']],
    verbs: [['first of all','tout d\'abord'],['then','ensuite'],['finally','enfin'],['in my opinion','à mon avis'],['to conclude','pour conclure']],
    verbsLabel: 'Mots de l\'oral',
    check: [
      { q: '___ of all, I helped my tutor.', opts: ['First', 'Last', 'Then', 'Next'], ans: 0 },
      { q: 'In my ___, it was a great experience.', opts: ['opinion', 'think', 'idea of', 'mind to'], ans: 0 },
      { q: 'To ___, I loved my internship.', opts: ['conclude', 'concluding', 'concluded', 'conclusion'], ans: 0 },
      { q: 'Thank you for ___.', opts: ['listening', 'listen', 'to listen', 'listened'], ans: 0 },
      { q: 'I\'m going to ___ about my internship.', opts: ['talk', 'talking', 'talked', 'tell'], ans: 0 }
    ]
  }
};
})();
