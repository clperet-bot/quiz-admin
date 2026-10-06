/*
  Dis-le bien — parcours de remédiation en français (autonomie, 2nde bac pro).
  Objectifs : prendre conscience des registres de langue, enrichir le vocabulaire de base,
  connaître les formules du monde du travail, corriger les fautes courantes.
  L’élève choisit ses DIFFICULTÉS (tuiles) ; chaque tuile ouvre des LEÇONS courtes réparties dans 4 étapes,
  puis une ÉTAPE FINALE : écrire un mail complet à un employeur, assemblé à partir de ses textes des étapes précédentes.
  Pour chaque étape : leçons → ROUND A (QCM) → ROUND B (compléter avec la liste) → ROUND C (écriture corrigée par l’IA).
  Partagé par la page élève (cours-francais.html) et le suivi enseignante (cours-suivi.html).
  Identifiants de réponses : 'pick' (tuiles choisies) puis '<étape>-A-1', '<étape>-B-1', '<étape>-C-1'.
*/
(function(){

const MISSION = `Choisis tes **difficultés**, puis avance **étape par étape** : à la fin, tu écris un **vrai mail** à un employeur.`;
const MISSION_FR = `Chaque étape = des **leçons courtes**, **3 rounds**, et un **morceau de ton mail**.`;

/* Tuiles : les difficultés que l’élève peut choisir */
const TILES = [
 { key:'potes',     icon:'🗣️', title:'Je parle comme avec mes potes', tag:'registres, mots de copain' },
 { key:'sms',       icon:'📱', title:'J\'écris comme dans mes SMS', tag:'abréviations, pas de majuscule' },
 { key:'mots',      icon:'🔁', title:'Je répète toujours les mêmes mots', tag:'truc, chose, ouf, bien, nul…' },
 { key:'ortho',     icon:'✏️', title:'Je fais des fautes d\'orthographe', tag:'a / à, et / est, ses / ces…' },
 { key:'phrases',   icon:'🧩', title:'Mes phrases sont courtes ou mal reliées', tag:'mots de liaison, ponctuation' },
 { key:'employeur', icon:'✉️', title:'Je ne sais pas écrire à un employeur', tag:'mail, politesse' },
 { key:'tel',       icon:'☎️', title:'Je ne sais pas quoi dire au téléphone', tag:'appeler une entreprise' },
 { key:'entretien', icon:'🤝', title:'J\'ai peur de l\'entretien ou du stage', tag:'quoi dire, comment répondre' }
];

/* petits constructeurs : A = QCM [question, options, index de la bonne réponse] ; B = trou [phrase avec ___, bonne réponse] */
const A = (q, opts, ans) => ({ q, opts, ans });
const B = (t, ans) => [t, ans];

/*
  Chaque ÉTAPE contient des SECTIONS (leçons). Une section est montrée si l’élève a choisi une de ses tuiles.
  section : { id, tiles, title, tag, lesson:{rules, table, ba (avant/après), examples [[texte, note]], mail, mini:[question, options, bonne, pourquoi]},
              A:[3 QCM], B:{ lines:[3 trous], extra:[mots en plus dans la liste] }, crit:'critère supplémentaire pour le round C' }
*/
const STEPS = [

/* ================= ÉTAPE 1 — Comment je parle ================= */
{ key:'comment', icon:'💬', title:'Comment je parle', tag:'familier · courant · soutenu',
  mission:`Ta mission : repérer **comment tu parles**, puis écrire ta **présentation** pour un employeur.`,
  C:{ title:'Ma présentation', piece:'Ma présentation',
      instruct:`Tu cherches un stage en entreprise. Écris **2 ou 3 phrases** pour te présenter à l’employeur : ton **prénom et ton nom**, ta **formation** et le **métier** qui t’intéresse. Ces phrases seront le **début de ton mail**.`,
      ph:`Je m’appelle … et je suis élève en …`, minWords:14,
      rubric:`ÉTAPE 1 : présentation de l’élève à un employeur (début d’un mail pour chercher un stage). Le texte fait 2 à 3 phrases complètes qui donnent : le prénom et le nom, la formation (niveau ou classe de bac pro) et le métier ou domaine visé. ok = true si les phrases sont complètes (majuscule au début, point à la fin), écrites en registre courant ou soutenu, sans argot ni abréviation de SMS (chui, jsp, kiffe, bcp…), sans tutoiement ni « salut ».` },
  secs:[
  { id:'s1reg', tiles:['potes'], title:'Les trois registres de langue', tag:'familier · courant · soutenu',
    lesson:{
      rules:[`On ne parle pas pareil à un copain, à un prof et à un employeur. Ces façons de parler s’appellent les **registres de langue**.`,
             `**Familier** : entre copains, à l’oral, dans les SMS. **Courant** : avec un prof, un voisin, tous les jours. **Soutenu** : avec un employeur, dans une lettre, quand on veut faire une très bonne impression.`,
             `Aucun registre n’est « mauvais ». Le **problème**, c’est de **ne pas choisir celui qui convient** à la personne.`,
             `**Indices du familier** : des mots d’argot (**mec, ouf, kiffer, bosser**), des phrases sans « ne » (**je sais pas**), des mots avalés (**j’sais, y’a**).`],
      table:{ head:['Registre','À qui ?','Le même message'], rows:[
        ['Familier','un copain','Yo, tu connais pas une boîte qui prend des stagiaires ?'],
        ['Courant','un prof, un adulte','Bonjour, est-ce que vous connaissez une entreprise qui accepte des stagiaires ?'],
        ['Soutenu','un employeur','Bonjour Madame, pourriez-vous m’indiquer une entreprise susceptible d’accueillir un.e stagiaire ?'] ] },
      examples:[['Il est ouf, ce prof !','familier'],['Ce professeur est très exigeant.','courant'],['Ce professeur fait preuve d’une grande exigence.','soutenu']],
      mini:[`« J’ai pas capté, c’est quoi la consigne ? » Quel est le registre ?`, ['familier','courant','soutenu'], 0, `On entend « j’ai pas » (sans « ne ») et « capté » : c’est du familier.`] },
    A:[ A(`« Il est trop sympa, ce mec ! » Quel est le registre ?`, ['familier','courant','soutenu'], 0),
        A(`« Est-ce que je peux sortir un instant, s’il vous plaît ? » Quel est le registre ?`, ['familier','courant','soutenu'], 1),
        A(`« Je vous prie de bien vouloir excuser mon retard. » Quel est le registre ?`, ['familier','courant','soutenu'], 2) ],
    B:{ lines:[ B(`« J’ai pas capté. » En langage courant : « Je n’ai pas ___. »`, 'compris'),
                B(`« Ton sac, il est ouf ! » En langage courant : « Ton sac est vraiment ___. »`, 'magnifique'),
                B(`« Je bosse chez mon oncle. » En langage courant : « Je ___ chez mon oncle. »`, 'travaille') ], extra:['pigé'] },
    crit:`Le registre est courant ou soutenu, pas familier.` },

  { id:'s1sms', tiles:['sms','phrases'], title:'Du SMS à la phrase écrite', tag:'mots entiers · majuscule · point',
    lesson:{
      rules:[`Dans un **SMS**, on écrit vite : « chui », « jsp », « pk », pas de majuscule, pas de point. Dans un **écrit pro** (mail, lettre, devoir), il faut des **mots entiers**.`,
             `Une **phrase complète** commence par une **majuscule**, contient un **sujet** et un **verbe**, et finit par un **point** (.), un **point d’interrogation** (?) ou un **point d’exclamation** (!).`,
             `Les sigles et symboles de SMS disparaissent : « 2m1 » devient **demain**, « + » devient **plus**.`],
      table:{ head:['Dans un SMS','À l’écrit'], rows:[['jsp','je ne sais pas'],['chui','je suis'],['pk','pourquoi'],['bcp','beaucoup'],['dsl','désolé.e'],['stp','s’il te plaît / s’il vous plaît']] },
      ba:[ [`jsp si chui dispo 2m1`, `Je ne sais pas si je suis disponible demain.`],
           [`pk tu réponds pas`, `Pourquoi ne réponds-tu pas ?`],
           [`dsl j’ai oublié`, `Je suis désolé.e, j’ai oublié.`] ],
      mini:[`Quelle phrase est écrite correctement ?`, [`bonjour je suis dispo demain`,`Bonjour, je suis disponible demain.`,`Bonjour je suis dispo 2m1.`], 1, `Majuscule au début, mots entiers, point à la fin.`] },
    A:[ A(`Quelle phrase est bien écrite ?`, [`Pourquoi ne vient-il pas ?`,`pourquoi il vient pas?`,`Pk il ne vient pas`,`Pourquoi, il vient pas`], 0),
        A(`Quelle phrase est une phrase complète, bien ponctuée ?`, [`Je suis en seconde bac pro.`,`en seconde bac pro`,`Je suis en seconde bac pro,`,`Moi en seconde bac pro`], 0),
        A(`Comment écrire « jsp » dans un mail ?`, [`Je ne sais pas`,`Je sais pas`,`Jsp`,`Je n sais pa`], 0) ],
    B:{ lines:[ B(`« bcp » s’écrit en entier : « Merci ___ pour votre réponse. »`, 'beaucoup'),
                B(`« dsl pr le retard » devient : « Je suis ___ pour le retard. »`, 'désolé.e'),
                B(`« jsp » devient : « Je ne ___ pas. »`, 'sais') ], extra:['sait','pourquoi'] },
    crit:`Chaque phrase commence par une majuscule et finit par un point ; aucune abréviation de SMS (jsp, pk, chui, bcp, 2m1…).` },

  { id:'s1o', tiles:['ortho'], title:'a / à · et / est · ou / où', tag:'les trois pièges du début',
    lesson:{
      rules:[`**a** = le verbe **avoir** : on peut dire **avait**. Il **a** (avait) 16 ans. **à** = un petit mot de **lieu** ou de **temps** : **à** Clermont, **à** midi.`,
             `**est** = le verbe **être** : on peut dire **était**. Le patron **est** (était) gentil. **et** = **et puis** : du pain **et** du beurre.`,
             `**ou** = **ou bien** (un choix) : thé **ou** café. **où** = un **lieu**, avec l’accent : **Où** habites-tu ?`],
      table:{ head:['Mot','Le test','Exemple'], rows:[['a','je peux dire « avait »','Elle a un stage.'],['à','lieu ou temps','Je vais à Riom.'],['est','je peux dire « était »','Il est en retard.'],['et','je peux dire « et puis »','Du pain et du beurre.'],['ou','je peux dire « ou bien »','Thé ou café ?'],['où','un lieu','Où vas-tu ?']] },
      examples:[['Il a un entretien à 10 h.','a = avait · à = l’heure'],['Le patron est gentil et poli.','est = était · et = et puis'],['Tu veux du thé ou du café ?','ou = ou bien'],['Où est le bureau ?','où = le lieu']],
      mini:[`Mon frère ___ un stage.`, ['a','à'], 0, `On peut dire « mon frère avait un stage » : c’est le verbe avoir, donc « a » sans accent.`] },
    A:[ A(`Je vais ___ Riom en bus.`, ['a','à','as','ah'], 1),
        A(`Du pain ___ du fromage.`, ['et','est','é','ai'], 0),
        A(`Tu veux du thé ___ du café ?`, ['ou','où','u','au'], 0) ],
    B:{ lines:[ B(`Léo ___ un entretien demain.`, 'a'), B(`Le patron ___ très gentil.`, 'est'), B(`___ travailles-tu ?`, 'où') ], extra:['à','et','ou'] },
    crit:`Les mots a / à, et / est, ou / où sont bien orthographiés.` }
  ] },

/* ================= ÉTAPE 2 — À qui je parle ? ================= */
{ key:'aqui', icon:'🎯', title:'À qui je parle ?', tag:'copain · prof · employeur',
  mission:`Ta mission : dire **la même chose** à un copain, à un prof, à un employeur, puis écrire ta **demande de stage**.`,
  C:{ title:'Ma demande de stage', piece:'Ma demande',
      instruct:`Tu veux faire un **stage de plusieurs semaines** dans cette entreprise. Écris **2 ou 3 phrases** pour le **demander poliment** à l’employeur : tu peux inventer des dates. Ces phrases seront le **milieu de ton mail**.`,
      ph:`Je vous contacte au sujet …`, minWords:14,
      rubric:`ÉTAPE 2 : demande de stage adressée poliment à un employeur. Le texte fait 2 à 3 phrases complètes. ok = true si l’élève VOUVOIE l’employeur (vous, votre), demande clairement un stage (avec une durée ou une période, éventuellement inventée) et emploie une formule de politesse de demande (je souhaiterais, je voudrais, pourriez-vous, je vous contacte au sujet de, s’il vous plaît…). ok = false s’il y a du tutoiement, un « je veux » sec, un « salut » ou des mots familiers.` },
  secs:[
  { id:'s2adapt', tiles:['potes','employeur'], title:'Adapter mon message à la personne', tag:'tu / vous · demander poliment',
    lesson:{
      rules:[`Avant de parler ou d’écrire, pose-toi 3 questions : **À qui** je parle ? **Où** (en classe, au téléphone, par mail) ? **Pourquoi** (demander, remercier, m’excuser) ?`,
             `Le **fond** ne change pas (je veux un stage). Ce qui change, c’est la **forme** : les **mots**, le **tu / vous** et la **politesse**.`,
             `À un copain : **tu**. À un prof ou à un employeur : **vous**, et on commence par **Bonjour Madame** ou **Bonjour Monsieur**.`,
             `Pour **demander poliment** : **Je souhaiterais** ou **Je voudrais** (pas « je veux »), **Pourriez-vous** (pas « tu peux »), **s’il vous plaît**, **merci**.`],
      table:{ head:['À qui ?','Le même message'], rows:[
        ['Un copain','J’ai pas fini, je te le rends demain, ça marche ?'],
        ['Un prof','Je n’ai pas terminé. Puis-je vous le rendre demain, s’il vous plaît ?'],
        ['Un employeur','Je n’ai pas pu terminer. Pourrais-je vous le remettre demain matin ? Je vous remercie de votre compréhension.'] ] },
      ba:[ [`Je veux un stage chez vous.`, `Je souhaiterais effectuer un stage dans votre entreprise.`],
           [`Tu peux me répondre vite ?`, `Pourriez-vous me répondre rapidement, s’il vous plaît ?`] ],
      mini:[`Tu écris à un employeur. Quelle phrase choisis-tu ?`, [`Je veux un stage chez vous.`,`Je souhaiterais effectuer un stage chez vous.`,`Wesh, vous prenez des stagiaires ?`], 1, `« Je souhaiterais » est poli et vouvoie la personne. « Je veux » est trop direct.`] },
    A:[ A(`Tu parles à ta cheffe de stage. Quelle phrase est la bonne ?`, [`Tu peux m’aider ?`,`Pourriez-vous m’aider, s’il vous plaît ?`,`Aide-moi, vite !`,`Tu pourrais m’aider ou quoi ?`], 1),
        A(`Quel début de message convient pour écrire à un employeur ?`, [`Salut,`,`Yo,`,`Bonjour Madame,`,`Coucou,`], 2),
        A(`Pour demander poliment un rendez-vous à un employeur :`, [`Je veux un rendez-vous.`,`Je souhaiterais obtenir un rendez-vous.`,`Donnez-moi un rendez-vous.`,`Je prends un rendez-vous.`], 1) ],
    B:{ lines:[ B(`À un copain : « Est-ce que ___ viens demain ? »`, 'tu'),
                B(`À un professeur : « Est-ce que ___ pouvez m’expliquer ? »`, 'vous'),
                B(`À un employeur : « ___ me recevoir cette semaine, s’il vous plaît ? »`, 'Pourriez-vous') ], extra:['Je souhaiterais'] },
    crit:`L’employeur est vouvoyé et la demande est polie (je souhaiterais, pourriez-vous, s’il vous plaît).` },

  { id:'s2o', tiles:['ortho'], title:'on / ont · son / sont · ce / se', tag:'trois autres pièges',
    lesson:{
      rules:[`**on** = **il** (On commence = Il commence). **ont** = le verbe **avoir** : on peut dire **avaient**. Ils **ont** (avaient) un stage.`,
             `**son** = **mon / ton / son** (il y a un possesseur) : **son** stage. **sont** = le verbe **être** : on peut dire **étaient**. Ils **sont** (étaient) en retard.`,
             `**ce** se place devant un **nom** : **ce** stage. **se** se place devant un **verbe** : elle **se** présente.`],
      table:{ head:['Mot','Le test','Exemple'], rows:[['on','je peux dire « il »','On commence à 8 h.'],['ont','je peux dire « avaient »','Ils ont un entretien.'],['son','je peux dire « mon »','Il cherche son stage.'],['sont','je peux dire « étaient »','Ils sont contents.'],['ce','devant un nom','Ce stage est bien.'],['se','devant un verbe','Elle se présente.']] },
      examples:[['On cherche un stage.','on = il'],['Mes amis ont un stage.','ont = avaient'],['Ils sont en retard.','sont = étaient'],['Il se présente à son patron.','se + verbe · son = mon']],
      mini:[`Mes amis ___ un stage.`, ['on','ont'], 1, `On peut dire « mes amis avaient un stage » : c’est le verbe avoir, donc « ont ».`] },
    A:[ A(`Mes amis ___ un stage à Clermont.`, ['on','ont','ons','sont'], 1),
        A(`Il a rangé ___ bureau.`, ['son','sont','sons','sond'], 0),
        A(`Elle ___ présente au patron.`, ['ce','se','ceux','s'], 1) ],
    B:{ lines:[ B(`___ commence à 8 h le lundi.`, 'on'), B(`Mes collègues ___ très gentils.`, 'sont'), B(`___ métier me plaît beaucoup.`, 'ce') ], extra:['ont','se','son'] },
    crit:`Les mots on / ont, son / sont, ce / se sont bien orthographiés.` }
  ] },

/* ================= ÉTAPE 3 — Mes mots ================= */
{ key:'mots', icon:'🧰', title:'Mes mots', tag:'dire précisément',
  mission:`Ta mission : remplacer les **mots vagues** par des **mots précis**, relier tes phrases, et écrire **pourquoi** ce métier t’intéresse.`,
  C:{ title:'Ma motivation', piece:'Ma motivation',
      instruct:`Explique en **2 ou 3 phrases** **pourquoi** ce métier t’intéresse et **ce que tu sais faire** (une qualité ou une compétence). Utilise au moins **deux mots de liaison** (car, mais, donc, puis, aussi) et des **mots précis**. Ces phrases seront la **fin du corps de ton mail**.`,
      ph:`Ce métier m’intéresse car …`, minWords:16,
      rubric:`ÉTAPE 3 : motivation de l’élève pour un stage (milieu du mail). Le texte fait 2 à 3 phrases complètes qui disent pourquoi ce métier l’intéresse et ce qu’il ou elle sait faire. ok = true si le texte contient au moins DEUX mots de liaison simples bien employés (car, mais, donc, puis, aussi, ensuite, d’abord…), AUCUN mot vague ou argot (truc, chose, machin, mec, genre, ouf, kiffer, bosser, bien, nul, y’a, « c’est trop »…) et pas de mot répété trois fois.` },
  secs:[
  { id:'s3vague', tiles:['mots','potes'], title:'Les mots « fourre-tout » : truc, chose, mec, genre', tag:'dire le vrai nom',
    lesson:{
      rules:[`Des mots comme **truc**, **chose**, **machin**, **bidule** peuvent remplacer **n’importe quoi**. Résultat : la personne **ne sait pas de quoi tu parles**.`,
             `**La méthode en 3 temps** : 1) je repère le mot vague ; 2) je me demande **« quoi exactement ? »** ; 3) je le remplace par le **vrai nom** (un objet, un outil, un document, un problème…).`,
             `**mec / meuf / gars** : on dit **un homme, une femme, un garçon, une fille**, ou le **rôle** : un collègue, un client, un vendeur, le chef.`,
             `**genre** : on dit **comme**, **par exemple**, **environ**, ou on le supprime.`],
      table:{ head:['Mot vague','Mots précis possibles'], rows:[
        ['truc','un objet · un outil · un document · un devoir · un problème · un rendez-vous'],
        ['chose','une idée · une tâche · un travail · une erreur · un sujet'],
        ['mec','un homme · un collègue · un client · un vendeur · un patron'],
        ['genre','comme · par exemple · environ'] ] },
      ba:[ [`J’ai un truc à rendre demain.`, `J’ai un devoir à rendre demain.`],
           [`Passe-moi le truc pour visser.`, `Passe-moi le tournevis.`],
           [`Il y a une chose qui me gêne dans ton travail.`, `Il y a une erreur dans ton travail.`],
           [`Le mec du magasin est sympa.`, `Le vendeur du magasin est sympathique.`],
           [`C’était genre trois heures.`, `C’était environ trois heures.`] ],
      mini:[`« Passe-moi le truc pour visser. » Quel mot précis remplace « truc » ?`, ['tournevis','machin','chose'], 0, `Pour visser, on utilise un tournevis. « Machin » et « chose » sont aussi vagues que « truc ».`] },
    A:[ A(`« J’ai un truc à rendre demain. » Quel mot est plus précis ?`, ['devoir','truc','machin','bidule'], 0),
        A(`« Le mec du magasin m’a bien conseillé. » Quel groupe de mots est plus précis ?`, ['Le vendeur','Le gars','Le type','Le machin'], 0),
        A(`« C’était genre trois heures. » Que mettre à la place de « genre » ?`, ['environ','comme ça','du coup','ouf'], 0) ],
    B:{ lines:[ B(`Passe-moi le ___ pour visser cette vis.`, 'tournevis'),
                B(`Un ___ attend à la caisse depuis dix minutes.`, 'client'),
                B(`Il y a un ___ : la machine ne démarre plus.`, 'problème') ], extra:['machin'] },
    crit:`Aucun mot passe-partout (truc, chose, machin, mec, genre) : chaque idée est dite avec un mot précis.` },

  { id:'s3adj', tiles:['mots','potes'], title:'Dire ce que je pense : ouf, kiffer, bien, nul, y\'a', tag:'des mots qui expliquent',
    lesson:{
      rules:[`**bien**, **nul**, **ouf**, **trop**… ne disent **pas pourquoi**. Cherche un mot qui dit **ce que tu penses vraiment** : intéressant ? difficile ? ennuyeux ? impressionnant ?`,
             `Les verbes familiers ont un **équivalent courant** : **kiffer** → aimer, adorer · **bosser** → travailler · **bouffer** → manger · **capter / piger** → comprendre.`,
             `**y’a** s’écrit **il y a**. **Trop** veut dire « **beaucoup trop** » : on ne dit pas « c’est trop bien », on dit **« c’est très bien »**.`],
      table:{ head:['Je dis…','Je peux dire…'], rows:[
        ['c’est bien','c’est intéressant · utile · agréable · clair'],
        ['c’est nul','c’est ennuyeux · difficile · décevant · inutile'],
        ['c’est ouf','c’est incroyable · impressionnant · surprenant'],
        ['je kiffe','j’aime · j’adore · j’apprécie'],
        ['y’a','il y a'] ] },
      ba:[ [`Mon stage, c’est bien.`, `Mon stage est intéressant : j’apprends beaucoup.`],
           [`Le cours est nul.`, `Le cours est ennuyeux : je ne comprends pas.`],
           [`J’ai kiffé ce film.`, `J’ai adoré ce film.`],
           [`Y’a un client à la caisse.`, `Il y a un client à la caisse.`] ],
      mini:[`« Je kiffe mon stage. » Quelle phrase dit la même chose en langage courant ?`, [`J’aime mon stage.`,`Mon stage, c’est ouf.`,`Je bosse en stage.`], 0, `« Kiffer » veut dire « aimer ». « Ouf » et « bosser » sont familiers eux aussi.`] },
    A:[ A(`Remplace « bosser » : « Je ___ dans un garage. »`, ['travaille','bosse','taffe','kiffe'], 0),
        A(`Remplace « c’est ouf » : « Ce chantier est ___. »`, ['impressionnant','ouf','bien','nul'], 0),
        A(`Remplace « y’a » : « ___ trois stagiaires dans l’atelier. »`, ['Il y a','Y’a','Ya','Il ya'], 0) ],
    B:{ lines:[ B(`À l’atelier, j’___ travailler avec mes mains.`, 'aime'),
                B(`Je ne ___ pas la consigne : pouvez-vous la relire ?`, 'comprends'),
                B(`Ce cours est ___ : je dois lire chaque phrase trois fois.`, 'difficile') ], extra:['kiffe'] },
    crit:`Aucun mot d’argot (kiffer, bosser, ouf, nul, y’a, c’est trop…) : des mots précis à la place.` },

  { id:'s3lien', tiles:['phrases','mots'], title:'Relier mes phrases', tag:'car · mais · donc · puis · aussi',
    lesson:{
      rules:[`Pour éviter les phrases **courtes et collées** (« J’aime ce métier. Je suis sérieux.se. Je veux un stage. »), on les **relie** avec des **mots de liaison**.`,
             `**car** (la raison) · **mais** (l’opposition) · **donc** (la conséquence) · **puis**, **ensuite** (l’ordre) · **aussi** (en plus).`,
             `On évite **« et puis »**, **« du coup »**, **« genre »** dans un écrit pro.`],
      table:{ head:['Mot','Il sert à…','Exemple'], rows:[
        ['car','donner la raison','Je cherche un stage car je veux apprendre.'],
        ['mais','opposer','Je suis timide mais motivé.e.'],
        ['donc','donner la conséquence','Il pleut, donc je prends un parapluie.'],
        ['puis','donner l’ordre','J’ai rangé l’atelier, puis j’ai nettoyé le sol.'],
        ['aussi','ajouter','Je sais aussi utiliser un ordinateur.'] ] },
      ba:[ [`J’aime l’électricité. Je veux un stage.`, `J’aime l’électricité, donc je cherche un stage.`],
           [`Je suis timide. Je suis sérieux.`, `Je suis timide, mais je suis sérieux.`],
           [`Je viens en stage. J’ai envie d’apprendre.`, `Je viens en stage car j’ai envie d’apprendre.`] ],
      mini:[`Je range l’atelier, ___ je nettoie le sol.`, ['car','puis','mais'], 1, `On donne l’ordre des actions : d’abord ranger, puis nettoyer.`] },
    A:[ A(`Je cherche un stage ___ je veux apprendre le métier.`, ['car','mais','puis','ou'], 0),
        A(`Il pleut, ___ je prends mon parapluie.`, ['donc','mais','car','aussi'], 0),
        A(`Le travail est fatigant, ___ il est intéressant.`, ['mais','car','donc','puis'], 0) ],
    B:{ lines:[ B(`Je suis en retard ___ le bus est tombé en panne.`, 'car'),
                B(`Je n’ai pas beaucoup d’expérience, ___ j’apprends vite.`, 'mais'),
                B(`J’ai raté le bus, ___ je suis arrivé.e en retard.`, 'donc') ], extra:['puis'] },
    crit:`Les phrases sont reliées par au moins deux mots de liaison simples (car, mais, donc, puis, aussi).` },

  { id:'s3o', tiles:['ortho'], title:'ses / ces · c\'est / s\'est · leur / leurs', tag:'les homophones qui piègent',
    lesson:{
      rules:[`**ses** = **mes / tes / ses** (il y a un possesseur) : Léa prend **ses** clés. **ces** = « **ces… -ci / -là** » (on montre) : **ces** gants-là.`,
             `**c’est** = **cela est** : **c’est** important. **s’est** = « **se** » + « **est** », devant un participe passé : elle **s’est** présentée.`,
             `**leur** devant un **verbe** ne prend jamais de s : je **leur** parle. **leurs** devant un **nom pluriel** : ils rangent **leurs** outils.`],
      table:{ head:['Mot','Le test','Exemple'], rows:[['ses','je peux dire « mes »','Elle range ses outils.'],['ces','ces… -ci / -là','Regarde ces gants-là.'],['c’est','cela est','C’est important.'],['s’est','se + est (devant un verbe)','Il s’est présenté.'],['leur','devant un verbe','Je leur parle.'],['leurs','devant un nom pluriel','Ils rangent leurs outils.']] },
      examples:[['Léa prend sa veste et ses clés.','ses = mes · possesseur'],['C’est un bon stage.','c’est = cela est'],['Elle s’est trompée de bus.','s’est = se + est'],['Les élèves rangent leurs affaires.','leurs + nom pluriel']],
      mini:[`Il ___ trompé de bus.`, [`c’est`,`s’est`], 1, `On peut dire « il se trompe » : c’est « se » + « est », donc « s’est ».`] },
    A:[ A(`Léa prend sa veste et ___ clés.`, ['ses','ces',`c’est`,`s’est`], 0),
        A(`Il ___ trompé de bus.`, [`c’est`,`s’est`,'ces','ses'], 1),
        A(`Les stagiaires rangent ___ outils.`, ['leur','leurs','leures','leurt'], 1) ],
    B:{ lines:[ B(`___ important d’arriver à l’heure.`, `c’est`), B(`Elle ___ présentée au patron.`, `s’est`), B(`Mes collègues sont gentils : je ___ dis bonjour.`, 'leur') ], extra:['ces'] },
    crit:`Les mots ses / ces, c’est / s’est et leur / leurs sont bien orthographiés.` }
  ] },

/* ================= ÉTAPE 4 — Au travail ================= */
{ key:'travail', icon:'💼', title:'Au travail', tag:'mail · téléphone · entretien',
  mission:`Ta mission : apprendre les **formules** du monde du travail et écrire le **début** et la **fin** de ton mail.`,
  C:{ title:'Le début et la fin de mon mail', piece:'Début et fin', two:true,
      instruct:`Écris l'**objet** du mail et la **formule d’appel** (le début), puis la **formule de politesse** et ta **signature** (la fin).`,
      ph:`Objet : …`, ph2:`Dans l’attente de votre réponse, …`, minWords:12,
      rubric:`ÉTAPE 4 : début et fin d’un mail à un employeur (l’élève cherche un stage). Le texte comporte deux parties : DÉBUT DU MAIL et FIN DU MAIL. ok = true si le début contient un objet clair (qui dit de quoi on parle, par exemple une demande de stage) et une formule d’appel avec Madame ou Monsieur (Bonjour Madame, Monsieur…), et si la fin contient une vraie formule de politesse (Cordialement, Dans l’attente de votre réponse je vous prie d’agréer…, Je vous remercie de votre attention…) suivie de la signature (prénom et nom). ok = false si on trouve « salut », « coucou », « bisous », « à+ » ou si une partie manque.` },
  secs:[
  { id:'s4mail', tiles:['employeur'], title:'Écrire un mail à un employeur', tag:'objet · appel · corps · politesse',
    lesson:{
      rules:[`Un mail pro a **5 parties** : 1) l'**objet** ; 2) la **formule d’appel** ; 3) le **corps** (qui je suis, ce que je demande, pourquoi) ; 4) la **formule de politesse** ; 5) la **signature** (prénom et nom).`,
             `L'**objet** dit **de quoi on parle** en quelques mots : « Demande de stage en cuisine ». Jamais « stage » tout seul, ni « coucou ».`,
             `On ne met **pas** de « salut », de « coucou », d’émoji, de « bisous » ni de « à+ ».`],
      table:{ head:['Partie','Je peux écrire…'], rows:[
        ['Objet','Demande de stage en mécanique automobile'],
        ['Appel','Bonjour Madame, Monsieur,'],
        ['Qui je suis','Je m’appelle … et je suis élève en seconde bac pro.'],
        ['Ma demande','Je vous contacte au sujet d’un stage de … semaines.'],
        ['Politesse','Dans l’attente de votre réponse, je vous prie d’agréer, Madame, Monsieur, mes salutations distinguées.'],
        ['Signature','Prénom Nom'] ] },
      ba:[ [`salut, c’est pour un stage`, `Bonjour Madame, Monsieur, je vous contacte au sujet d’un stage.`],
           [`bisous, à+`, `Cordialement,`] ],
      mini:[`Quel objet est le plus clair pour un mail ?`, [`Demande de stage en électricité`,`Salut`,`stage`], 0, `L’objet doit dire de quoi on parle : ici, une demande de stage dans un métier précis.`] },
    A:[ A(`Quelle formule d’appel convient pour écrire à un employeur dont tu ne connais pas le nom ?`, [`Bonjour Madame, Monsieur,`,`Salut,`,`Coucou !`,`Hello,`], 0),
        A(`Quelle formule termine bien un mail à un employeur ?`, [`Cordialement,`,`Bisous,`,`À+`,`Bye`], 0),
        A(`Quel objet est le plus clair ?`, [`Demande de stage en cuisine`,`Stage`,`Bonjour`,`Coucou, c’est moi`], 0) ],
    B:{ lines:[ B(`___, je m’appelle Lina Moreau et je suis élève en seconde bac pro.`, 'Bonjour Madame'),
                B(`Je vous contacte ___ d’un stage en entreprise.`, 'au sujet'),
                B(`Je vous remercie de votre attention. ___, Lina Moreau`, 'Cordialement') ], extra:['Salut'] },
    crit:`` },

  { id:'s4tel', tiles:['tel'], title:'Téléphoner à une entreprise', tag:'saluer · me présenter · dire pourquoi · conclure',
    lesson:{
      rules:[`Au **téléphone**, on ne se voit pas : il faut parler **clairement** et **poliment**. Suis **4 étapes** : **1 Saluer** · **2 Me présenter** · **3 Dire pourquoi j’appelle** · **4 Remercier et conclure**.`,
             `Si je veux parler à quelqu’un : « **Pourrais-je** parler à Madame … ? ». Si je n’ai pas entendu : « **Pourriez-vous répéter**, s’il vous plaît ? ».`,
             `Si la personne n’est pas là : « **Quand puis-je la rappeler ?** » ou « **Pouvez-vous lui dire que j’ai appelé ?** ».`],
      table:{ head:['Étape','Je dis…'], rows:[
        ['1. Saluer','Bonjour Madame, bonjour Monsieur.'],
        ['2. Me présenter','Je m’appelle Lina Moreau, je suis élève en seconde bac pro.'],
        ['3. Dire pourquoi','Je vous appelle au sujet d’un stage.'],
        ['4. Conclure','Je vous remercie. Bonne journée.'] ] },
      ba:[ [`Allô ? C’est pour un stage.`, `Bonjour, je m’appelle Lina Moreau. Je vous appelle au sujet d’un stage.`],
           [`Vous êtes le patron ? Je veux parler à quelqu’un.`, `Bonjour Monsieur, pourrais-je parler au responsable, s’il vous plaît ?`],
           [`Hein ? J’ai pas entendu.`, `Pourriez-vous répéter, s’il vous plaît ?`],
           [`Bon ben ciao.`, `Je vous remercie. Bonne journée.`] ],
      mini:[`Tu n’as pas bien entendu. Que dis-tu ?`, [`Hein ? C’est quoi ?`,`Pourriez-vous répéter, s’il vous plaît ?`,`Parle plus fort !`], 1, `On vouvoie et on demande poliment : « Pourriez-vous répéter, s’il vous plaît ? ».`] },
    A:[ A(`Quelle est la bonne première phrase au téléphone avec une entreprise ?`, [`Bonjour Madame, je m’appelle Lina Moreau.`,`Allô c’est qui ?`,`Salut, vous prenez des stagiaires ?`,`Je veux parler au patron.`], 0),
        A(`Pour demander à parler à une personne :`, [`Pourrais-je parler à Monsieur Durand, s’il vous plaît ?`,`Passez-moi Durand !`,`Il est où, Durand ?`,`Je veux Durand.`], 0),
        A(`Pour finir l’appel :`, [`Je vous remercie. Bonne journée.`,`Bon, ciao.`,`C’est bon, j’ai fini.`,`Ok, bye.`], 0) ],
    B:{ lines:[ B(`___, je m’appelle Lina Moreau, je suis élève en seconde bac pro.`, 'Bonjour Madame'),
                B(`Je vous appelle ___ d’un stage.`, 'au sujet'),
                B(`Je n’ai pas bien entendu. Pourriez-vous ___, s’il vous plaît ?`, 'répéter') ], extra:['Pourrais-je'] },
    crit:`` },

  { id:'s4ent', tiles:['entretien'], title:'L\'entretien et le stage', tag:'répondre · poser une question · remercier',
    lesson:{
      rules:[`À l'**entretien** ou le **premier jour de stage**, on **vouvoie** et on fait des **phrases complètes**. On évite « ouais », « ben », « euh » en boucle et « j’sais pas ».`,
             `**Arriver** : « Bonjour Madame, je suis Lina Moreau, j’ai rendez-vous à 10 h. »`,
             `**Si je ne sais pas** : « Je ne sais pas encore, mais j’aimerais apprendre. » **Si je n’ai pas compris** : « Pourriez-vous reformuler, s’il vous plaît ? »`,
             `**Finir** : « Je vous remercie de votre temps. »`],
      table:{ head:['Situation','Au lieu de…','Je dis…'], rows:[
        ['Dire oui','Ouais','Oui, tout à fait.'],
        ['Ne pas savoir','J’sais pas','Je ne sais pas encore, mais j’aimerais apprendre.'],
        ['Ne pas comprendre','Hein ?','Pourriez-vous reformuler, s’il vous plaît ?'],
        ['Remercier','Merci, ciao','Je vous remercie de votre temps.'] ] },
      examples:[['Oui, j’aime travailler en équipe car j’apprends des autres.','réponse complète'],['Je serais ravi.e de commencer lundi.','poli et motivé']],
      mini:[`Le patron demande : « Vous aimez le travail en équipe ? » Quelle réponse est adaptée ?`, [`Ouais, ça va.`,`Oui, j’aime travailler en équipe car j’apprends des autres.`,`Bof, j’sais pas.`], 1, `Une réponse complète donne une raison (« car… ») et utilise un langage poli.`] },
    A:[ A(`Que réponds-tu pour dire oui à un employeur ?`, [`Oui, tout à fait.`,`Ouais.`,`Ouais ouais.`,`Ben oui.`], 0),
        A(`Tu ne sais pas répondre à une question. Quelle phrase est la meilleure ?`, [`J’sais pas.`,`Je ne sais pas encore, mais j’aimerais apprendre.`,`Aucune idée.`,`Euh... bah...`], 1),
        A(`À la fin de l’entretien, tu dis :`, [`Je vous remercie de votre temps.`,`Bon, ben, salut.`,`C’est bon ?`,`À plus.`], 0) ],
    B:{ lines:[ B(`Êtes-vous disponible lundi ? — ___, je suis libre toute la journée.`, 'Oui, tout à fait'),
                B(`Je n’ai pas compris : pourriez-vous ___ la question autrement ?`, 'reformuler'),
                B(`Je vous remercie de votre ___.`, 'temps') ], extra:['mot'] },
    crit:`` },

  { id:'s4o', tiles:['ortho'], title:'Accorder le verbe · é / er / ez', tag:'sujet-verbe · terminaisons',
    lesson:{
      rules:[`**Le verbe s’accorde avec son sujet.** Trouve **qui fait l’action** : les stagiaires **arrivent**. Astuce : remplace le sujet par **il** ou **ils** et écoute.`,
             `**-er** : je peux remplacer par **vendre** (infinitif) : je dois ranger → je dois vendre. **-é** : je peux remplacer par **vendu** (participe passé) : j’ai rangé → j’ai vendu.`,
             `**-ez** : le sujet est **vous** : vous rangez, vous pouvez.`],
      table:{ head:['Fin','Le test','Exemple'], rows:[['-er','je peux dire « vendre »','Je vais ranger l’atelier.'],['-é','je peux dire « vendu »','J’ai rangé l’atelier.'],['-ez','le sujet est « vous »','Vous rangez l’atelier.'],['-ent','le sujet est « ils / elles »','Les élèves rangent l’atelier.']] },
      examples:[['Les clients attendent à la caisse.','les clients = ils → attendent'],['Je dois terminer avant midi.','terminer = vendre'],['Hier, j’ai terminé mon travail.','terminé = vendu']],
      mini:[`Les stagiaires ___ à 8 h.`, ['arrive','arrives','arrivent'], 2, `« Les stagiaires » = « ils » : le verbe prend -ent.`] },
    A:[ A(`Les clients ___ à la caisse.`, ['attend','attends','attendent','attendes'], 2),
        A(`Je dois ___ mon dossier avant midi.`, ['terminé','terminer','terminez','terminée'], 1),
        A(`Hier, j’ai ___ l’atelier.`, ['rangé','ranger','rangez','rangés'], 0) ],
    B:{ lines:[ B(`Les stagiaires ___ tous à 8 h.`, 'arrivent'), B(`Vous ___ commencer dès lundi.`, 'pouvez'), B(`Hier, j’ai ___ mon dossier.`, 'rangé') ], extra:['ranger'] },
    crit:`Les verbes sont bien accordés avec leur sujet et les terminaisons é / er / ez sont correctes.` }
  ] },

/* ================= ÉTAPE 5 — Mon mail de stage (finale) ================= */
{ key:'mail', icon:'✉️', title:'Mon mail de stage', tag:'tout assembler', final:true,
  mission:`Ta mission : **assembler** tes textes, les **réécrire** et envoyer ton **mail complet** à un employeur.`,
  secs:[
  { id:'smail', tiles:[], title:'Mon mail complet', tag:'modèle et check-list',
    lesson:{
      rules:[`Ton mail final **assemble** tout ce que tu as écrit : ta **présentation**, ta **demande**, ta **motivation**, et le **début** et la **fin** du mail.`,
             `**Ta mission en 3 temps** : 1) tu **relis** chaque morceau ; 2) tu **relies** les morceaux et tu **corriges** les fautes ; 3) tu vérifies avec la **check-list**.`],
      mail:`**Objet :** Demande de stage en mécanique automobile\n\nBonjour Madame, Monsieur,\n\nJe m’appelle Lina Moreau et je suis élève en seconde bac pro. Je cherche un stage dans votre garage.\n\nJe vous contacte au sujet d’un stage de quatre semaines, du 5 au 30 janvier. Je souhaiterais l’effectuer dans votre entreprise.\n\nCe métier me plaît car j’aime réparer des machines. Je suis sérieuse et je sais travailler en équipe.\n\nDans l’attente de votre réponse, je vous prie d’agréer, Madame, Monsieur, mes salutations distinguées.\n\nLina Moreau`,
      checklist:[`**Objet** clair`, `**Bonjour Madame, Monsieur**`, `**Je me présente** : prénom, nom, formation`, `**Je demande** poliment un stage (je souhaiterais…)`, `**Je dis pourquoi** avec des mots précis et des mots de liaison`, `**Politesse** et **signature**`, `**Je me relis** : majuscules, points, a / à, et / est, ses / ces / c’est / s’est, on / ont, son / sont, leur / leurs, accords`],
      mini:[`Avant d’envoyer ton mail, que fais-tu en dernier ?`, [`Je me relis phrase par phrase.`,`J’envoie tout de suite.`,`Je rajoute des émojis.`], 0, `Une relecture attentive évite les fautes : c’est ce qui fait bonne impression.`] },
    A:[ A(`Parmi ces débuts de mail, lequel convient pour demander un stage ?`, [`Bonjour Madame, Monsieur, je vous contacte au sujet d’un stage.`,`Salut, c’est pour un stage.`,`Yo, vous prenez des stagiaires ?`,`Bonjour, jveux un stage.`], 0),
        A(`Quelle phrase est bien orthographiée ?`, [`Il a un entretien à 10 h et il est prêt.`,`Il à un entretien a 10 h et il est prêt.`,`Il a un entretien à 10 h et il et prêt.`,`Il a un entretien a 10 h est il est prêt.`], 0),
        A(`Quelle phrase évite les mots vagues ?`, [`J’ai envie de travailler dans un garage car j’aime réparer les voitures.`,`J’ai envie de faire un truc dans un garage.`,`J’kiffe les bagnoles.`,`C’est ouf, les garages.`], 0),
        A(`Quelle fin de mail est correcte ?`, [`Dans l’attente de votre réponse, je vous prie d’agréer mes salutations distinguées. Lina Moreau`,`Bisous, Lina`,`Merci, à+`,`Voilà, bye`], 0) ],
    B:{ lines:[ B(`Objet : ___ de stage en mécanique automobile`, 'Demande'),
                B(`___ Madame, Monsieur,`, 'Bonjour'),
                B(`Je m’appelle Lina Moreau et je ___ élève en seconde bac pro.`, 'suis'),
                B(`Je souhaiterais effectuer un stage de quatre semaines ___ votre entreprise.`, 'dans'),
                B(`Mes professeurs ___ confiance en moi.`, 'ont'),
                B(`___, Lina Moreau`, 'Cordialement') ], extra:['est','on'] },
    crit:`` }
  ],
  C:{ title:'Mon mail complet', piece:'Mon mail',
      instruct:`**Scénario** : tu cherches un **stage en entreprise**. Voici ton mail, assemblé à partir de tes étapes. **Relis-le, relie les morceaux, corrige les fautes** et remplace les **[crochets]** par ton texte. Quand il est prêt, tu l’envoies à l’employeur.`,
      ph:`Objet : …`, minWords:45,
      rubric:`ÉTAPE FINALE : mail complet de l’élève à un employeur pour demander un stage (relecture finale : structure, registre, orthographe). ok = true si TOUTES ces conditions sont remplies : (1) un objet clair ; (2) une formule d’appel avec Madame ou Monsieur ; (3) une présentation de l’élève ; (4) une demande de stage polie (vouvoiement, je souhaiterais / je voudrais / pourriez-vous) ; (5) une raison ou une motivation ; (6) une formule de politesse et une signature ; (7) un registre courant ou soutenu, sans argot (truc, chose, mec, genre, ouf, kiffer, bosser, y’a, c’est trop, bien, nul…) ni abréviation de SMS ; (8) des phrases complètes avec majuscule et point ; (9) au plus TROIS fautes d’orthographe restantes parmi : a/à, et/est, ce/se, ses/ces/c’est/s’est, on/ont, son/sont, ou/où, leur/leurs, accord sujet-verbe, é/er/ez, accord des noms et adjectifs. Si au moins une condition de (1) à (8) n’est pas remplie ou s’il y a plus de trois fautes, ok = false. Dans le feedback, signale au plus TROIS erreurs précises à corriger (orthographe ou registre), avec la règle en une phrase.` }
}
];

/* Descriptions utilisées par le suivi (une entrée par étape ; n = rang de l’étape) */
const course = {
  id:'francais-boost',
  title:'Dis-le bien',
  subtitle:'Parler et écrire comme il faut : un parcours de français sur mesure',
  studentPage:'cours-francais.html',
  pick:{ id:'pick', prompt:'Quelles sont tes difficultés ?' },
  steps: STEPS.map((s, i) => ({ n:i + 1, key:s.key, chip:s.icon, title:s.title, skill:'Langue', lu:'', goal:s.title, always:!!s.final,
    tiles:Array.from(new Set(s.secs.flatMap(x => x.tiles))),
    levels:{
      A:{ title:'Round A', tag:'QCM', qs:[{id:s.key + '-A-1', prompt:s.title + ' — Round A (QCM)'}] },
      B:{ title:'Round B', tag:'je complète avec la liste', qs:[{id:s.key + '-B-1', prompt:s.title + ' — Round B (compléter)'}] },
      C:{ title:'Round C', tag:s.C.piece, qs:[{id:s.key + '-C-1', prompt:s.title + ' — Round C (' + s.C.title + ' : ' + s.C.instruct.replace(/\*\*/g, '') + ')'}] } } }))
};
course.allQuestions = [{ id:'pick', step:0, level:'—', index:0, prompt:'Quelles sont tes difficultés ?' }];
course.steps.forEach(s => ['A','B','C'].forEach(L => s.levels[L].qs.forEach((q, k) => { q.step = s.n; q.level = L; q.index = k; course.allQuestions.push(q); })));

window.FRANCAIS_COURSE = course;
window.FRANCAIS_DATA = { MISSION, MISSION_FR, TILES, STEPS };
})();
