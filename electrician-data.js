/*
  Electrician's Guide — Installation and Safety · English TNE
  Contenu du cours interactif (données pures, partagées par la page élève et le suivi enseignante).
  Types de questions : mcq, tf, gap, part, ai, record.
*/
(function(){
const MANUAL_TF = {
  wet:   "Manuel : « Do not touch electrical parts with wet hands. »",
  gloves:"Manuel : « Always wear gloves and safety glasses. »",
  screw: "Manuel : « Open the machine cover with a screwdriver. »",
  off:   "Manuel : « Check that the power is OFF before touching any part. »",
  repl:  "Manuel : « Replace damaged parts if necessary. »"
};

const TOOLS = ['contactor','wires','screwdriver','fuse','pliers','cover','gloves','machine'];
const PARTS = ['Safety instructions','Operating steps','Troubleshooting'];

const course = {
  id: 'electricians-guide',
  title: "Electrician's Guide",
  subtitle: 'Installation and Safety',
  tag: 'English TNE',
  mission: "You are an experienced technician. A new trainee is learning about electrical equipment. Your task is to explain how to use the tools, read a technical manual, and describe a repair step by step — in English.",
  learnHow: ['read a technical guide','install and test equipment','explain your work to a trainee'],
  icons: [['📘','Technical guide'],['🔎','Test equipment'],['🧑‍🏫','Mentor a trainee']],
  steps: [

  /* ───────────────────────── 1 ───────────────────────── */
  { n:1, title:'Vocabulary & Tools', skill:'CE · LEXIQUE',
    goal:"Objectif : connaître le nom des outils et du matériel électrique en anglais, et savoir dire à quoi ils servent.",
    image:'tools.jpg',
    vocab:[['contactor','contacteur'],['wires','fils'],['screwdriver','tournevis'],['fuse','fusible'],['pliers','pince'],['cover','capot'],['gloves','gants'],['machine','machine'],['to use','utiliser'],['to check','vérifier'],['to open / close','ouvrir / fermer'],['to connect','connecter']],
    levels:{
      A:{ title:'Je démarre en douceur', tag:'QCM guidé', intro:null, qs:[
        {id:'1A-1',type:'mcq',prompt:'🔧 (tournevis) — choisis le bon mot anglais.',options:['pliers','screwdriver','gloves'],answer:'screwdriver',hint:"Regarde la banque de vocabulaire : « tournevis » se dit…"},
        {id:'1A-2',type:'mcq',prompt:'🧤 (gants) — choisis le bon mot anglais.',options:['contactor','wires','gloves'],answer:'gloves',hint:"Regarde la banque de vocabulaire : « gants » se dit…"},
        {id:'1A-3',type:'mcq',prompt:'🛠️ (pince) — choisis le bon mot anglais.',options:['pliers','fuse','cover'],answer:'pliers',hint:"Regarde la banque de vocabulaire : « pince » se dit…"},
        {id:'1A-4',type:'gap',prompt:'Complète avec le mot qui manque.',bank:'screwdriver / gloves / pliers / contactor',parts:['I wear ',{a:['gloves']},' for safety.']},
        {id:'1A-5',type:'gap',prompt:'Complète avec le mot qui manque.',bank:'screwdriver / gloves / pliers / contactor',parts:['I use the ',{a:['screwdriver']},' to open the cover.']},
        {id:'1A-6',type:'gap',prompt:'Complète avec le mot qui manque.',bank:'screwdriver / gloves / pliers / contactor',parts:['I use the ',{a:['pliers']},' to connect the wire.']}
      ]},
      B:{ title:"Je m'entraîne davantage", tag:'mots à réordonner', intro:"Write, in English, the following sentences using the vocabulary above.", tip:'Tips ! Pour (dans le but de) = to', qs:[
        {id:'1B-1',type:'ai',prompt:"contactor / screwdriver / open / use — (J'utilise le tournevis pour ouvrir le contacteur.)",fields:[{k:'s',label:'Ta phrase en anglais',kind:'area',rows:2}],ref:'I use the screwdriver to open the contactor.',rubric:"Phrase au présent simple, sujet I, qui utilise le tournevis pour ouvrir le contacteur. « to » pour exprimer le but."},
        {id:'1B-2',type:'ai',prompt:"gloves / wear / safety — (Je porte des gants pour la sécurité.)",fields:[{k:'s',label:'Ta phrase en anglais',kind:'area',rows:2}],ref:'I wear gloves for safety.',rubric:"Phrase au présent simple : je porte des gants pour la sécurité (« for safety » ou « for my safety »)."},
        {id:'1B-3',type:'ai',prompt:"pliers / use / connect / wire — (J'utilise la pince pour connecter le fil.)",fields:[{k:'s',label:'Ta phrase en anglais',kind:'area',rows:2}],ref:'I use the pliers to connect the wire.',rubric:"Phrase au présent simple : j'utilise la pince pour connecter le fil. « to connect » pour le but."},
        {id:'1B-4',type:'ai',prompt:"contactor / check / carefully — (Je vérifie le contacteur avec attention.)",fields:[{k:'s',label:'Ta phrase en anglais',kind:'area',rows:2}],ref:'I check the contactor carefully.',rubric:"Phrase au présent simple : je vérifie le contacteur avec attention (carefully, à la fin ou avant le verbe)."}
      ]},
      C:{ title:'Je me lance sans filet', tag:'production libre', intro:"Choisis 4 outils de la banque de vocabulaire. Pour chacun, écris une phrase originale expliquant quand et pourquoi tu l'utilises (sans modèle). Un outil par bloc ci-dessous.", qs:[1,2,3,4].map(i=>({
        id:'1C-'+i,type:'ai',prompt:'Outil n°'+i,fields:[{k:'tool',label:"Outil choisi",kind:'select',options:TOOLS},{k:'s',label:'Ta phrase originale (quand et pourquoi tu l\'utilises)',kind:'area',rows:3}],
        rubric:"L'élève choisit un outil/matériel de la banque et écrit UNE phrase originale en anglais expliquant QUAND et POURQUOI il l'utilise (ex : « I use the pliers when I connect wires because it is easier. »). La phrase doit contenir l'outil choisi, être compréhensible, avec un verbe. Pas besoin d'être sophistiquée."
      }))}
    }},

  /* ───────────────────────── 2 ───────────────────────── */
  { n:2, title:'Read the User Manual', skill:'CE',
    goal:"Objectif : repérer dans un manuel technique les consignes de sécurité, les étapes d'utilisation, et le dépannage.",
    image:'manual.jpg', imageAlt:'User manual — air compressor', imageSmall:true,
    levels:{
      A:{ title:'Je démarre en douceur', tag:'QCM guidé', intro:'Pour chaque phrase, choisis la bonne partie du manuel.', qs:[
        {id:'2A-1',type:'mcq',prompt:'1. Wear gloves and glasses.',options:PARTS,answer:'Safety instructions',hint:"Une consigne pour se protéger : dans quelle partie du manuel ?"},
        {id:'2A-2',type:'mcq',prompt:'2. Open the cover with a screwdriver.',options:PARTS,answer:['Operating steps','Troubleshooting'],hint:"C'est une action à faire avec un outil. Cherche la phrase dans le manuel (elle apparaît dans deux parties !).",why:"Cette phrase apparaît dans Operating steps ET dans Troubleshooting."},
        {id:'2A-3',type:'mcq',prompt:'3. The machine does not start.',options:PARTS,answer:'Troubleshooting',hint:"C'est un problème : où trouve-t-on les problèmes et leurs solutions ?"},
        {id:'2A-4',type:'mcq',prompt:'4. Close the cover and test the machine.',options:PARTS,answer:'Operating steps',hint:"C'est la dernière étape quand tout fonctionne normalement."}
      ]},
      B:{ title:"Je m'entraîne davantage", tag:'tableau à compléter', intro:"Read the User Manual. Write in which part of the text each sentence belongs. (Example of parts : Safety instructions, Operating steps, Troubleshooting.) — Exemple : « Porte des gants et des lunettes. » → Safety instructions.", qs:[
        {id:'2B-2',type:'part',prompt:"2. La machine ne démarre pas.",accept:['trouble'],show:'Troubleshooting'},
        {id:'2B-3',type:'part',prompt:"3. Vérifie le contacteur.",accept:['operat','trouble'],show:'Operating steps ou Troubleshooting',why:"« Check the contactor » apparaît dans deux parties : Operating steps (Check the contactor and all terminals) et Troubleshooting (Check the contactor coil…)."},
        {id:'2B-4',type:'part',prompt:"4. Utilise les bons outils.",accept:['safety'],show:'Safety instructions'},
        {id:'2B-5',type:'part',prompt:"5. Nettoie l'intérieur avec un chiffon sec.",accept:['operat'],show:'Operating steps'},
        {id:'2B-6',type:'part',prompt:"6. Ne touche pas les fils électriques avec les mains mouillées.",accept:['safety'],show:'Safety instructions'},
        {id:'2B-7',type:'part',prompt:"7. Vérifie l'alimentation électrique et l'interrupteur principal.",accept:['operat'],show:'Operating steps'},
        {id:'2B-8',type:'part',prompt:"8. Serre les fils s'ils sont desserrés.",accept:['trouble'],show:'Troubleshooting'}
      ]},
      C:{ title:'Je me lance sans filet', tag:'production libre', intro:"Imagine que le manuel a une partie manquante. Écris 2 nouvelles consignes en anglais (une de sécurité, une d'utilisation) qui pourraient s'ajouter au manuel, puis indique dans quelle partie elles iraient et pourquoi.", qs:[
        {id:'2C-1',type:'ai',prompt:'2 nouvelles consignes pour le manuel',fields:[
          {k:'safety',label:'Une consigne de sécurité (en anglais)',kind:'area',rows:2},
          {k:'oper',label:"Une consigne d'utilisation (en anglais)",kind:'area',rows:2},
          {k:'why',label:'Dans quelle partie du manuel irait chacune, et pourquoi ?',kind:'area',rows:3}],
          rubric:"Deux consignes en anglais à l'impératif (ou équivalent) : l'une de SÉCURITÉ (ex : « Wear safety shoes. »), l'autre d'UTILISATION (ex : « Press the start button. »). Puis l'élève indique dans quelle partie (Safety instructions / Operating steps) irait chacune et donne une raison simple (français accepté pour la justification). Les 3 éléments doivent être présents et cohérents."}
      ]}
    }},

  /* ───────────────────────── 3 ───────────────────────── */
  { n:3, title:'Check Your Understanding', skill:'CE',
    goal:"Objectif : vérifier ta compréhension du manuel — vrai/faux, et relier un problème à sa solution.",
    image:'manual.jpg', imageAlt:'User manual — air compressor', imageSmall:true,
    levels:{
      A:{ title:'Je démarre en douceur', tag:'vrai/faux simplifié', intro:'Read the sentences. Choose True or False.', qs:[
        {id:'3A-1',type:'tf',prompt:'1. You must wear gloves and glasses.',answer:true,why:MANUAL_TF.gloves},
        {id:'3A-2',type:'tf',prompt:'2. You can touch electrical parts with wet hands.',answer:false,why:MANUAL_TF.wet},
        {id:'3A-3',type:'tf',prompt:'3. You use a screwdriver to open the cover.',answer:true,why:MANUAL_TF.screw},
        {id:'3A-4',type:'tf',prompt:'4. The power must be off before you start.',answer:true,why:MANUAL_TF.off},
        {id:'3A-5',type:'tf',prompt:"5. You must replace the contactor if it's damaged.",answer:true,why:MANUAL_TF.repl}
      ]},
      B:{ title:"Je m'entraîne davantage", tag:'vrai/faux', intro:'Read the sentences. Choose True or False.', qs:[
        {id:'3B-1',type:'tf',prompt:'1. You can touch the electrical parts with wet hands.',answer:false,why:MANUAL_TF.wet},
        {id:'3B-2',type:'tf',prompt:'2. You must wear gloves and glasses.',answer:true,why:MANUAL_TF.gloves},
        {id:'3B-3',type:'tf',prompt:'3. You can clean the inside with water.',answer:false,why:"Manuel : « Clean the inside with a dry cloth if needed. » — pas d'eau !"},
        {id:'3B-4',type:'tf',prompt:'4. You should check the power before working.',answer:true,why:MANUAL_TF.off},
        {id:'3B-5',type:'tf',prompt:'5. The contactor is in the safety part.',answer:false,why:"Le contacteur apparaît dans Operating steps et Troubleshooting, pas dans Safety instructions."},
        {id:'3B-6',type:'tf',prompt:'6. You use a screwdriver to open the cover.',answer:true,why:MANUAL_TF.screw},
        {id:'3B-7',type:'tf',prompt:'7. You must test the machine before closing the cover.',answer:false,why:"Manuel : « Close the cover and test the machine. » — on ferme le capot, PUIS on teste."},
        {id:'3B-8',type:'tf',prompt:'8. The power must be off before you start.',answer:true,why:MANUAL_TF.off},
        {id:'3B-9',type:'tf',prompt:'9. The problem in the manual is that the machine is noisy.',answer:false,why:"Manuel : « Problem: The air compressor does not start. » — pas de bruit."},
        {id:'3B-10',type:'tf',prompt:"10. You must replace the contactor if it's damaged.",answer:true,why:MANUAL_TF.repl}
      ]},
      C:{ title:'Je me lance sans filet', tag:'production libre', intro:"Complète le tableau sans modèle : invente 3 nouveaux problèmes possibles sur l'air compressor et leur solution, en anglais, en réutilisant le vocabulaire de l'étape 1.", qs:[1,2,3].map(i=>({
        id:'3C-'+i,type:'ai',prompt:'Problème n°'+i,fields:[{k:'p',label:'Problem (en anglais)',kind:'area',rows:2},{k:'s',label:'Solution (en anglais)',kind:'area',rows:2}],
        rubric:"L'élève invente un problème plausible sur un compresseur d'air (ex : « The compressor is too hot. », « The fuse is broken. ») et une solution logique, TOUS DEUX EN ANGLAIS, en réutilisant du vocabulaire de l'étape 1 (gloves, wires, contactor, fuse, cover, pliers, screwdriver, check, replace, tighten, connect…). Le problème et la solution doivent être cohérents entre eux."
      }))}
    }},

  /* ───────────────────────── 4 ───────────────────────── */
  { n:4, title:'Explain the Steps', skill:'EE',
    goal:"Objectif : décrire une action en train de se faire, avec BE + V-ing, pour expliquer une réparation à un stagiaire.",
    situation:"The air compressor does not start when you press the start button. Your task is to find and fix the problem, using the correct steps and safety procedures.",
    stepsList:['Vérifier l\'interrupteur principal.','Inspecter le disjoncteur.','Réarmer le disjoncteur si nécessaire.','Vérifier le contacteur.','Appuyer sur le bouton de démarrage.','Lire le manomètre.'],
    grammar:{ title:'Comment utiliser le temps Be + Verbe en -ing', rule:'Sujet + am / is / are + verbe + ing — pour dire ce qu\'on est en train de faire maintenant.', table:[['I','am'],['You','are'],['He / She / It','is'],['We / They','are']] },
    levels:{
      A:{ title:'Je démarre en douceur', tag:'verbes donnés', intro:'Complète chaque phrase avec am / is / are + le verbe en -ing donné entre parenthèses.', qs:[
        {id:'4A-1',type:'gap',prompt:'Complète.',parts:['I ',{a:['am checking',"'m checking","m checking"]},' (check) the main switch.']},
        {id:'4A-2',type:'gap',prompt:'Complète.',parts:['I ',{a:['am inspecting',"'m inspecting","m inspecting"]},' (inspect) the circuit breaker.']},
        {id:'4A-3',type:'gap',prompt:'Complète.',parts:['I ',{a:['am checking',"'m checking","m checking"]},' (check) the contactor.']},
        {id:'4A-4',type:'gap',prompt:'Complète.',parts:['I ',{a:['am pressing',"'m pressing","m pressing"]},' (press) the start button.']},
        {id:'4A-5',type:'gap',prompt:'Complète.',parts:['I ',{a:['am reading',"'m reading","m reading"]},' (read) the pressure gauge.']}
      ]},
      B:{ title:"Je m'entraîne davantage", tag:'phrases complètes', intro:"Pour chaque étape, écris une phrase complète au présent BE + V-ing pour expliquer ce que tu es en train de faire.", tip:'Verbes utiles : check, inspect, reset, press, read', qs:[
        {id:'4B-1',type:'ai',prompt:"Étape 1 : Vérifier l'interrupteur principal.",fields:[{k:'s',label:'Ta phrase (BE + V-ing)',kind:'area',rows:2}],ref:'I am checking the main switch.',rubric:"Phrase en BE + V-ing (I am / I'm + verbe-ing) : je suis en train de vérifier l'interrupteur principal (main switch)."},
        {id:'4B-2',type:'ai',prompt:"Étape 2 : Inspecter le disjoncteur.",fields:[{k:'s',label:'Ta phrase (BE + V-ing)',kind:'area',rows:2}],ref:'I am inspecting the circuit breaker.',rubric:"Phrase en BE + V-ing : je suis en train d'inspecter le disjoncteur (circuit breaker)."},
        {id:'4B-3',type:'ai',prompt:"Étape 3 : Réarmer le disjoncteur si nécessaire.",fields:[{k:'s',label:'Ta phrase (BE + V-ing)',kind:'area',rows:2}],ref:'I am resetting the circuit breaker.',rubric:"Phrase en BE + V-ing : je suis en train de réarmer le disjoncteur (resetting the circuit breaker). Attention au double t de resetting (faute d'orthographe tolérée)."},
        {id:'4B-4',type:'ai',prompt:"Étape 4 : Vérifier le contacteur.",fields:[{k:'s',label:'Ta phrase (BE + V-ing)',kind:'area',rows:2}],ref:'I am checking the contactor.',rubric:"Phrase en BE + V-ing : je suis en train de vérifier le contacteur (contactor)."},
        {id:'4B-5',type:'ai',prompt:"Étape 5 : Appuyer sur le bouton de démarrage.",fields:[{k:'s',label:'Ta phrase (BE + V-ing)',kind:'area',rows:2}],ref:'I am pressing the start button.',rubric:"Phrase en BE + V-ing : je suis en train d'appuyer sur le bouton de démarrage (start button)."},
        {id:'4B-6',type:'ai',prompt:"Étape 6 : Lire le manomètre.",fields:[{k:'s',label:'Ta phrase (BE + V-ing)',kind:'area',rows:2}],ref:'I am reading the pressure gauge.',rubric:"Phrase en BE + V-ing : je suis en train de lire le manomètre (pressure gauge)."}
      ]},
      C:{ title:'Je me lance sans filet', tag:'production libre', intro:"Imagine un autre appareil électrique en panne (au choix). Écris un court paragraphe (4 à 6 phrases) où tu expliques à un stagiaire, en BE + V-ing, les étapes que tu es en train de suivre pour le réparer.", qs:[
        {id:'4C-1',type:'ai',prompt:'Paragraphe : réparer un autre appareil',fields:[{k:'s',label:'Ton paragraphe (4 à 6 phrases)',kind:'area',rows:7}],
          rubric:"Court paragraphe de 4 à 6 phrases en anglais, adressé à un stagiaire, décrivant les étapes de réparation d'UN AUTRE appareil électrique en panne (pas le compresseur), avec le présent BE + V-ing (I am checking…). Accepte si la majorité des phrases utilisent correctement BE + V-ing et si l'ensemble est compréhensible. Si moins de 4 phrases ou pas de BE + V-ing, n'accepte pas."}
      ]}
    }},

  /* ───────────────────────── 5 ───────────────────────── */
  { n:5, title:'Write Your Own Case', skill:'EE',
    goal:"Objectif : rédiger un texte complet pour expliquer une réparation à un stagiaire, du début à la fin.",
    vocabList:[['contactor','contacteur'],['loosen','desserrer'],['wires','fils'],['replace','remplacer'],['fuse','fusible'],['monitor','surveiller'],['cover','capot'],['switch on / off','allumer / éteindre'],['machine','machine'],['test the circuit','tester le circuit'],['check','vérifier'],['indicator light','voyant'],['remove','retirer'],['overheating','surchauffe'],['tighten','serrer']],
    levels:{
      A:{ title:'Je démarre en douceur', tag:'texte très guidé', intro:"Situation : you are fixing a machine, a trainee is watching, and you are explaining what you are doing. Complete the text with the word given in brackets (use BE + V-ing). — « Hello! How are you today? »", qs:[
        {id:'5A-1',type:'gap',prompt:'First…',parts:['First, I am ',{a:['checking']},' (check) the ',{a:['fuse']},' (fuse) to make sure everything is safe.']},
        {id:'5A-2',type:'gap',prompt:'Then…',parts:['Then, I am ',{a:['removing']},' (remove) the ',{a:['cover']},' (cover) carefully, because it could be dangerous.']},
        {id:'5A-3',type:'gap',prompt:'Next…',parts:['Next, I am ',{a:['checking']},' (check) the ',{a:['wires']},' (wires) and checking the ',{a:['indicator']},' (indicator) light.']},
        {id:'5A-4',type:'gap',prompt:'Finally…',parts:['Finally, I am ',{a:['switching on','turning on']},' (switch on) the ',{a:['machine']},' (machine) and monitoring it while it is working.']}
      ]},
      B:{ title:"Je m'entraîne davantage", tag:'vocabulaire seul', intro:"Complete the text using the vocabulary list above and BE + V-ing, with the structure first / then / next / finally. — « Hello! How are you today? »", qs:[
        {id:'5B-1',type:'gap',prompt:'First…',parts:['First, I am ',{a:['checking','inspecting','testing']},' the ',{a:['fuse','wires','contactor']},' to make sure everything is safe.'],suggest:'checking … fuse'},
        {id:'5B-2',type:'gap',prompt:'Then…',parts:['Then, I am ',{a:['removing','opening','taking off']},' the ',{a:['cover']},' carefully, because it could be dangerous.'],suggest:'removing … cover'},
        {id:'5B-3',type:'gap',prompt:'Next…',parts:['Next, I am ',{a:['checking','tightening','loosening','replacing','testing','inspecting']},' the ',{a:['wires','contactor','fuse']},' and checking the ',{a:['indicator']},' light.'],suggest:'checking … wires … indicator'},
        {id:'5B-4',type:'gap',prompt:'Finally…',parts:['Finally, I am ',{a:['switching on','turning on','testing','starting']},' the ',{a:['machine','circuit']},' and monitoring the machine while it is working.'],suggest:'switching on … machine'}
      ]},
      C:{ title:'Je me lance sans filet', tag:'rewriting libre', intro:"Rewriting. En t'aidant du texte complété ci-dessus, écris un nouveau texte pour expliquer à un stagiaire ce que tu fais pendant une réparation. Tu dois : garder la même structure (bonjour → situation → étapes avec first / then / next / finally → conclusion) • utiliser le présent BE + V-ing pour expliquer ce que tu es en train de faire • réutiliser le vocabulaire de la liste • changer la machine ou le problème (imagine une autre petite situation).", qs:[
        {id:'5C-1',type:'ai',prompt:'Nouveau texte : réparation expliquée à un stagiaire',fields:[{k:'s',label:'Ton texte',kind:'area',rows:10}],
          rubric:"Texte en anglais expliquant à un stagiaire une réparation, avec : (1) un bonjour/introduction, (2) une situation (machine ou problème DIFFÉRENT du texte modèle sur le fusible/capot), (3) des étapes introduites par first / then / next / finally avec le présent BE + V-ing, (4) une courte conclusion. Du vocabulaire de la liste (contactor, loosen, wires, replace, fuse, monitor, cover, switch on/off, test the circuit, check, indicator light, remove, overheating, tighten) doit être réutilisé. Accepte si ces éléments sont globalement présents et le texte compréhensible ; des petites fautes ne comptent pas. Dans le feedback, signale les éléments manquants s'il y en a."}
      ]}
    }},

  /* ───────────────────────── 6 ───────────────────────── */
  { n:6, title:'Prepare Your Scene', skill:'EO',
    goal:"Objectif : t'entraîner à la prononciation, puis remplir la carte mentale pour préparer ta présentation orale.",
    speak:true,
    levels:{
      A:{ title:'Je démarre en douceur', tag:'3 mots', intro:"Pronunciation. Choisis 3 mots de la liste de vocabulaire. Écoute leur prononciation (bouton 🔊 ou WordReference), puis entraîne-toi à les lire à voix haute.", qs:[
        {id:'6A-1',type:'record',prompt:'Mes 3 mots',fields:[{k:'w1',label:'Mot n°1',kind:'text'},{k:'w2',label:'Mot n°2',kind:'text'},{k:'w3',label:'Mot n°3',kind:'text'},{k:'done',label:"Je me suis entraîné.e à les lire à voix haute",kind:'check'}],minFilled:3}
      ]},
      B:{ title:"Je m'entraîne davantage", tag:'5 mots + phrases', intro:"Pronunciation. 1) Choisis 5 mots difficiles dans la liste de vocabulaire. 2) Choisis 1 ou 2 phrases de ton texte. 3) Écoute la prononciation : bouton 🔊 (ou WordReference pour les mots). 4) Entraîne-toi à lire les phrases à voix haute en faisant attention au rythme, aux accents toniques, à la ponctuation.", tip:"N'hésite pas à écrire les mots avec ta PROPRE phonétique et à surligner les syllabes accentuées.", qs:[
        {id:'6B-1',type:'record',prompt:'Mes 5 mots difficiles + ma phonétique',fields:[{k:'words',label:'Mes 5 mots difficiles (avec ma phonétique à moi)',kind:'area',rows:4},{k:'sent',label:'Mes 1 ou 2 phrases à lire à voix haute',kind:'area',rows:3},{k:'done',label:"Je me suis entraîné.e à voix haute",kind:'check'}],minFilled:2}
      ]},
      C:{ title:'Je me lance sans filet', tag:'texte complet', intro:"Pronunciation. Relis tout ton texte à voix haute (rythme, accents, ponctuation). Note ci-dessous les 3 mots ou expressions qui te posent le plus de difficulté, et comment tu comptes les prononcer.", qs:[
        {id:'6C-1',type:'record',prompt:'Mes 3 difficultés de prononciation',fields:[{k:'diff',label:'3 mots ou expressions difficiles + comment je les prononce',kind:'area',rows:5},{k:'done',label:"J'ai relu tout mon texte à voix haute",kind:'check'}],minFilled:2}
      ]}
    },
    finalTask:{ id:'6-map', title:'Ta carte mentale', center:'Repairing a machine', intro:"Complète chaque branche avec les mots-clés de ton texte (pas des phrases entières). Elle t'aidera pour ta présentation orale.",
      branches:[['b1','1. Greeting / Introduction'],['b2','2. Problem'],['b3','3. Steps (BE + ING)'],['b4','4. Tools']] }
  }
  ]
};

// Aplatit toutes les questions pour un accès par id (utilisé par le suivi)
course.allQuestions = [];
course.steps.forEach(s => {
  ['A','B','C'].forEach(L => {
    s.levels[L].qs.forEach((q, i) => { q.step = s.n; q.level = L; q.index = i; course.allQuestions.push(q); });
  });
  if(s.finalTask){
    course.allQuestions.push({id:s.finalTask.id, type:'record', prompt:'Carte mentale — Repairing a machine', step:s.n, level:'—', index:0, final:true});
  }
});

window.ELEC_COURSE = course;
})();
