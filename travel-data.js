/*
  Travel Survival Guide — se débrouiller en anglais en voyage (vie quotidienne).
  Cours en plus, en autonomie, pour les élèves en avance. Niveaux A / B / C à chaque étape.
  Partagé par la page élève (cours-travel.html) et le suivi enseignante (cours-suivi.html).
*/
(function(){

const MISSION = "Three days in **London** with a friend. Get by in English: **airport, street, hotel, restaurant**.";
const LEARN = ['**check in** at the airport','ask for and give **directions**','**book** a hotel room','**order** a meal and pay','explain a **problem** politely'];

// Étapes : { title, skill, lu, goal, vocab, model, read?, A:{items}, B:{bank, lines}, C:{title, instruct, rubric, minWords, ph} }
const STEPS = [
 { title:'At the airport', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:"Objectif : comprendre et utiliser les phrases clés pour t'enregistrer à l'aéroport.",
   vocab:[['passport','passeport'],['boarding pass','carte d\'embarquement'],['gate','porte d\'embarquement'],['luggage / baggage','bagages'],['to check in','s\'enregistrer'],['window seat / aisle seat','place côté hublot / côté couloir'],['delayed','retardé'],['flight','vol']],
   model:[['Agent','Good morning. Your passport, please.'],['You','Here you are.'],['Agent','Are you checking in any luggage?'],['You','Yes, one suitcase.'],['Agent','Would you like a window seat or an aisle seat?'],['You','A window seat, please.'],['Agent','Here is your boarding pass. Your flight leaves from gate 12 at 10:45.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'"Passport, please."', opts:['Here you are.','No, thanks.','I\'m fine.'], ans:0 },
     { q:'"Are you checking in any luggage?"', opts:['Yes, one suitcase.','Yes, I am a student.','No, it\'s Tuesday.'], ans:0 },
     { q:'"Would you like a window seat or an aisle seat?"', opts:['A window seat, please.','Yes, please.','Not at all.'], ans:0 },
     { q:'"Your flight leaves from gate 12."', opts:['Thank you. What time does boarding start?','You\'re welcome, goodbye.','I have no luggage, sorry.'], ans:0 },
     { q:'"I\'m sorry, your flight is delayed by two hours."', opts:['Oh no! Thank you for telling me. Where can I wait?','That\'s a great seat.','Here is my passport, bye.'], ans:0 } ] },
   B:{ title:'Je complète le dialogue', bank:[['passport','passeport'],['luggage','bagages'],['boarding pass','carte d\'embarquement'],['gate','porte'],['delayed','retardé'],['window','hublot']],
     lines:[['Good morning. Your ',{a:'passport'},', please.'],['Are you checking in any ',{a:'luggage'},'?'],['Here is your ',{a:'boarding pass'},'.'],['Your flight leaves from ',{a:'gate'},' 12.'],['I\'m sorry, your flight is ',{a:'delayed'},' by one hour.'],['I\'d like a ',{a:'window'},' seat, please.']] },
   C:{ title:'J\'écris mon dialogue', instruct:'Écris un dialogue de 6 répliques minimum entre toi et l\'agent d\'enregistrement : tu le salues, tu donnes ton passeport, tu dis si tu as des bagages, tu choisis ta place, puis tu poses une question sur la porte ou l\'heure.', ph:'Agent: Good morning. …\nYou: …',
     rubric:'Dialogue d\'enregistrement à l\'aéroport (6 répliques ou plus) : salutation, passeport donné, question/réponse sur les bagages, choix de la place, une question de l\'élève sur la porte (gate) ou l\'heure (boarding). ok = true si au moins 4 de ces éléments sont présents dans un anglais compréhensible.', minWords:30 } },

 { title:'Finding the way', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:"Objectif : demander son chemin et indiquer un itinéraire en anglais.",
   vocab:[['Excuse me, how do I get to…?','Excusez-moi, comment aller à… ?'],['go straight on','continuez tout droit'],['turn left / turn right','tournez à gauche / à droite'],['at the traffic lights','aux feux'],['at the crossroads','au carrefour'],['next to','à côté de'],['opposite','en face de'],['between','entre'],['on the corner','au coin'],['It\'s a five-minute walk.','C\'est à cinq minutes à pied.']],
   model:[['You','Excuse me, how do I get to the station?'],['Passer-by','Go straight on and take the second street on the left.'],['You','Is it far?'],['Passer-by','No, it\'s a five-minute walk. It\'s opposite the bakery.'],['You','Thank you very much!']],
   read:'From the tourist office, go straight on for two blocks. Turn right at the traffic lights. Walk past the bank: the museum is on your left, opposite the post office.',
   A:{ title:'Je lis l\'itinéraire', items:[
     { q:'At the traffic lights, you…', opts:['turn right','turn left','go straight on'], ans:0 },
     { q:'The museum is…', opts:['on your left','on your right','behind the bank'], ans:0 },
     { q:'The post office is…', opts:['opposite the museum','next to the bank','between the bank and the museum'], ans:0 },
     { q:'You go straight on for…', opts:['two blocks','two kilometres','two minutes by bus'], ans:0 },
     { q:'To ask the way politely, you say…', opts:['Excuse me, how do I get to the station?','Where is the station, you?','Station, where, please?'], ans:0 } ] },
   B:{ title:'Je complète les indications', bank:[['straight','tout droit'],['turn','tourner'],['crossroads','carrefour'],['opposite','en face de'],['next to','à côté de'],['left','gauche']],
     lines:[['Go ',{a:'straight'},' on for two hundred metres.'],['At the ',{a:'crossroads'},', turn right.'],[{a:'turn'},' left at the bakery.'],['The station is on your ',{a:'left'},'.'],['The cinema is ',{a:'opposite'},' the pharmacy.'],['The bank is ',{a:'next to'},' the post office.']] },
   C:{ title:'J\'écris mon dialogue', instruct:'Un touriste te demande comment aller à la gare (ou à un lieu de ton choix) depuis ton lycée. Écris le dialogue (6 répliques minimum) : il demande poliment, tu donnes au moins 4 indications avec des verbes à l\'impératif et des mots de lieu (next to, opposite, between…), il te remercie.', ph:'Tourist: Excuse me, …\nYou: …',
     rubric:'Dialogue pour demander et donner son chemin (6 répliques ou plus) : question polie (Excuse me, how do I get to…?), au moins 4 indications (go straight on, turn left/right, at the traffic lights/crossroads…), au moins 2 mots de lieu (next to, opposite, between, behind, on the corner…), remerciement final. ok = true si au moins 4 de ces éléments sont présents. Les lieux peuvent être inventés.', minWords:35 } },

 { title:'At the hotel', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:"Objectif : réserver une chambre d'hôtel et poser les bonnes questions.",
   vocab:[['to book a room','réserver une chambre'],['single / double room','chambre simple / double'],['per night','par nuit'],['breakfast included','petit déjeuner compris'],['available','disponible'],['check-in / check-out','arrivée / départ'],['key card','carte-clé'],['Wi-Fi password','mot de passe Wi-Fi']],
   model:[['You','Hello, I\'d like to book a room, please.'],['Receptionist','Of course. For how many nights?'],['You','For two nights, from Friday.'],['Receptionist','Single or double?'],['You','A single room, please. How much is it per night?'],['Receptionist','It\'s 80 euros per night, breakfast included.'],['You','Perfect. Thank you!']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'"Hello, how can I help you?"', opts:['I\'d like to book a room, please.','I like a room book.','I want room now.'], ans:0 },
     { q:'"For how many nights?"', opts:['For two nights, from Friday.','Two nights are good.','At two o\'clock.'], ans:0 },
     { q:'"Would you like a single or a double room?"', opts:['A single room, please.','Yes, I would.','It is a room.'], ans:0 },
     { q:'You want to know the price. You say…', opts:['How much is it per night?','How many is it by night?','What price is the night?'], ans:0 },
     { q:'"Check-out is at 11 a.m."', opts:['Thank you. Can I leave my luggage here after check-out?','You are welcome. I check in.','Yes, I like the morning.'], ans:0 } ] },
   B:{ title:'Je complète le dialogue', bank:[['book','réserver'],['nights','nuits'],['double','double'],['included','compris'],['available','disponible'],['password','mot de passe']],
     lines:[['I\'d like to ',{a:'book'},' a room, please.'],['For three ',{a:'nights'},'.'],['A ',{a:'double'},' room with a bathroom, please.'],['Is breakfast ',{a:'included'},'?'],['Is there a room ',{a:'available'},' tonight?'],['What is the Wi-Fi ',{a:'password'},'?']] },
   C:{ title:'J\'écris mon e-mail', instruct:'Écris un e-mail à un hôtel (8 phrases environ) pour réserver une chambre : tu te présentes, tu donnes les dates et le type de chambre, tu demandes le prix et si le petit déjeuner est compris, tu termines poliment.', ph:'Dear Sir or Madam,\n\nI would like to book …\n\nYours faithfully,\n…',
     rubric:'E-mail de réservation d\'hôtel (environ 8 phrases) : formule d\'appel (Dear Sir or Madam), demande de réservation (I would like to book…), dates ou nombre de nuits, type de chambre, question sur le prix, question sur le petit déjeuner, formule de fin (I look forward to your reply), formule de politesse et signature (Yours faithfully / sincerely). ok = true si au moins 5 de ces éléments sont présents dans un anglais compréhensible et poli.', minWords:45 } },

 { title:'At the restaurant', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:"Objectif : commander un repas, parler de ses allergies et demander l'addition.",
   vocab:[['starter / main course / dessert','entrée / plat / dessert'],['menu','carte'],['to order','commander'],['I\'ll have…','je prendrai…'],['Could I have…?','Pourrais-je avoir… ?'],['I\'m allergic to…','je suis allergique à…'],['vegetarian','végétarien.ne'],['still / sparkling water','eau plate / gazeuse'],['the bill','l\'addition'],['tip','pourboire']],
   model:[['Waiter','Are you ready to order?'],['You','Yes. For the starter, I\'ll have the soup, please.'],['Waiter','And for the main course?'],['You','The chicken, please. I\'m allergic to nuts.'],['Waiter','No problem. Anything to drink?'],['You','Sparkling water, please.'],['You','Could we have the bill, please?']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'"Are you ready to order?"', opts:['Yes, I\'ll have the chicken, please.','Yes, I am very hungry day.','No, I order yesterday.'], ans:0 },
     { q:'"Would you like something to drink?"', opts:['Sparkling water, please.','I like to drink the water, thanks you.','Yes, it is cold.'], ans:0 },
     { q:'"Do you have any allergies?"', opts:['Yes, I\'m allergic to nuts.','Yes, I am a vegetarian bill.','No, I have the soup.'], ans:0 },
     { q:'You want to pay. You say…', opts:['Could we have the bill, please?','Give me the money, please.','I want to pay the waiter.'], ans:0 },
     { q:'"Is everything all right?"', opts:['Yes, it\'s delicious, thank you.','Yes, I am delicious.','No, thanks, I have the menu.'], ans:0 } ] },
   B:{ title:'Je complète le dialogue', bank:[['menu','carte'],['order','commander'],['starter','entrée'],['allergic','allergique'],['bill','addition'],['tip','pourboire']],
     lines:[['Could I see the ',{a:'menu'},', please?'],['I\'d like to ',{a:'order'},' now.'],['For the ',{a:'starter'},', I\'ll have the soup.'],['I\'m ',{a:'allergic'},' to peanuts.'],['Could we have the ',{a:'bill'},', please?'],['Is the ',{a:'tip'},' included?']] },
   C:{ title:'J\'écris mon dialogue', instruct:'Écris un dialogue au restaurant (8 répliques minimum) : tu demandes la carte, tu commandes une entrée, un plat et une boisson, tu précises une allergie ou un régime, puis tu demandes l\'addition.', ph:'Waiter: Good evening. …\nYou: …',
     rubric:'Dialogue au restaurant (8 répliques ou plus) : demande de la carte ou salutation, commande d\'une entrée, d\'un plat et d\'une boisson (I\'ll have… / Could I have…?), mention d\'une allergie ou d\'un régime (I\'m allergic to… / I\'m vegetarian), demande de l\'addition (Could we have the bill?). ok = true si au moins 4 de ces éléments sont présents dans un anglais compréhensible et poli.', minWords:40 } },

 { title:'When things go wrong', skill:'CE + EE', lu:'Compréhension écrite (CE) et Expression écrite (EE)',
   goal:"Objectif final : expliquer un problème poliment et dire ce que tu veux (aide, échange, remboursement).",
   vocab:[['to lose / lost','perdre / perdu'],['stolen','volé'],['There is a problem with…','il y a un problème avec…'],['It doesn\'t work.','ça ne marche pas.'],['My suitcase hasn\'t arrived.','ma valise n\'est pas arrivée.'],['Could you help me, please?','pourriez-vous m\'aider ?'],['I\'d like a refund.','je voudrais un remboursement.'],['I\'m sorry to bother you, but…','désolé.e de vous déranger, mais…']],
   model:[['You','Excuse me, I\'m sorry to bother you, but there is a problem with my room.'],['Receptionist','What is the problem?'],['You','The shower doesn\'t work. Could you send someone, please?'],['Receptionist','Of course. I\'m very sorry about that.'],['You','Thank you. If it\'s not possible, I\'d like to change rooms.']],
   A:{ title:'Je choisis la bonne réponse', items:[
     { q:'You have lost your wallet.', opts:['Excuse me, I\'ve lost my wallet. Can you help me?','I lose wallet, help.','My wallet is stolen of me.'], ans:0 },
     { q:'The shower doesn\'t work.', opts:['There is a problem with the shower. It doesn\'t work.','The shower is not working of me.','I have a problem, the shower no work.'], ans:0 },
     { q:'Your suitcase is not at the airport.', opts:['My suitcase hasn\'t arrived.','My suitcase is not come.','I don\'t have arrived my suitcase.'], ans:0 },
     { q:'Your soup is cold.', opts:['Excuse me, my soup is cold. Could you heat it up, please?','Your soup is bad, change it.','The soup is not hot, you do it again.'], ans:0 },
     { q:'You want your money back.', opts:['I\'d like a refund, please.','Give me back my money now.','I want the money of return.'], ans:0 } ] },
   B:{ title:'Je complète le dialogue', bank:[['lost','perdu'],['problem','problème'],['work','marcher'],['refund','remboursement'],['sorry','désolé.e'],['help','aider']],
     lines:[['I\'ve ',{a:'lost'},' my passport.'],['There is a ',{a:'problem'},' with my room.'],['The Wi-Fi doesn\'t ',{a:'work'},'.'],['Could you ',{a:'help'},' me, please?'],['I\'m ',{a:'sorry'},' to bother you, but my bag is missing.'],['I\'d like a ',{a:'refund'},', please.']] },
   C:{ title:'Mon défi final : e-mail de réclamation', instruct:'Pendant ton voyage, quelque chose s\'est mal passé (valise perdue, chambre en mauvais état, repas froid…). Écris un e-mail de réclamation (8 à 10 phrases) : explique le problème, dis quand c\'est arrivé, dis ce que tu veux (aide, échange, remboursement), reste poli.', ph:'Dear Sir or Madam,\n\nI am writing to complain about …\n\nYours faithfully,\n…',
     rubric:'E-mail de réclamation (8 à 10 phrases) à la suite d\'un problème de voyage : formule d\'appel, objet du problème clairement expliqué (There is a problem with… / My … doesn\'t work / hasn\'t arrived), précision sur quand ou où, demande claire (I\'d like a refund / Could you help me?), ton poli (I\'m sorry to bother you, but… / I would be grateful if…), formule de fin et signature. ok = true si au moins 5 de ces éléments sont présents dans un anglais compréhensible et poli.', minWords:50 } }
];

const course = {
  id:'travel-survival',
  title:'Travel Survival Guide',
  subtitle:'Se débrouiller en anglais en voyage',
  studentPage:'cours-travel.html',
  steps: STEPS.map((s, i) => ({ n:i + 1, title:s.title, skill:s.skill, lu:s.lu, goal:s.goal,
    levels:{
      A:{ title:'Je démarre en douceur', tag:'je choisis la bonne réponse', qs:[{id:(i + 1) + 'A-1', prompt:s.title + ' — niveau A'}] },
      B:{ title:'Je m\'entraîne davantage', tag:'je complète avec les mots', qs:[{id:(i + 1) + 'B-1', prompt:s.title + ' — niveau B'}] },
      C:{ title:'Je me lance sans filet', tag:s.C.title, qs:[{id:(i + 1) + 'C-1', prompt:s.title + ' — niveau C'}] } } }))
};
course.allQuestions = [];
course.steps.forEach(s => ['A','B','C'].forEach(L => s.levels[L].qs.forEach((q, k) => { q.step = s.n; q.level = L; q.index = k; course.allQuestions.push(q); })));

window.TRAVEL_COURSE = course;
window.TRAVEL_DATA = { MISSION, LEARN, STEPS };
})();

/* ---- Traductions françaises (bouton « Traduire ») ---- */
window.TRAVEL_FR = {
  mission: "Trois jours à **Londres** avec un.e ami.e. Débrouille-toi en anglais : **aéroport, rue, hôtel, restaurant**.",
  learn: ["**s'enregistrer** à l'aéroport", "demander et donner son **chemin**", "**réserver** une chambre d'hôtel", "**commander** un repas et payer", "expliquer un **problème** poliment"],
  titles: ["À l'aéroport", "Trouver son chemin", "À l'hôtel", "Au restaurant", "Quand ça se passe mal"],
  model: [
    ["Bonjour. Votre passeport, s'il vous plaît.", "Voilà.", "Enregistrez-vous des bagages ?", "Oui, une valise.", "Vous voulez une place côté hublot ou côté couloir ?", "Côté hublot, s'il vous plaît.", "Voici votre carte d'embarquement. Votre vol part de la porte 12 à 10 h 45."],
    ["Excusez-moi, comment est-ce que je vais à la gare ?", "Allez tout droit et prenez la deuxième rue à gauche.", "C'est loin ?", "Non, c'est à cinq minutes à pied. C'est en face de la boulangerie.", "Merci beaucoup !"],
    ["Bonjour, je voudrais réserver une chambre, s'il vous plaît.", "Bien sûr. Pour combien de nuits ?", "Pour deux nuits, à partir de vendredi.", "Simple ou double ?", "Une chambre simple, s'il vous plaît. Combien coûte-t-elle par nuit ?", "80 euros la nuit, petit déjeuner compris.", "Parfait. Merci !"],
    ["Vous êtes prêt.e à commander ?", "Oui. En entrée, je prendrai la soupe, s'il vous plaît.", "Et comme plat principal ?", "Le poulet, s'il vous plaît. Je suis allergique aux noix.", "Pas de problème. Quelque chose à boire ?", "De l'eau gazeuse, s'il vous plaît.", "Pourrions-nous avoir l'addition, s'il vous plaît ?"],
    ["Excusez-moi, désolé.e de vous déranger, mais il y a un problème avec ma chambre.", "Quel est le problème ?", "La douche ne marche pas. Pourriez-vous envoyer quelqu'un, s'il vous plaît ?", "Bien sûr. Je suis vraiment désolé.", "Merci. Si ce n'est pas possible, j'aimerais changer de chambre."]
  ],
  read: { 2: "Depuis l'office de tourisme, allez tout droit sur deux pâtés de maisons. Tournez à droite aux feux. Passez devant la banque : le musée est sur votre gauche, en face de la poste." }
};

/* ---- Petit point de grammaire (affiché dans le niveau C de l'étape indiquée) ---- */
window.TRAVEL_GRAMMAR = {
  2: {
    title: "L'impératif (pour donner un ordre, un conseil, un chemin)",
    rules: [
      ["À quoi ça sert ?", "On utilise l'impératif pour donner une indication, un conseil ou un ordre. C'est exactement ce qu'on fait quand on explique un chemin."],
      ["Comment on le forme ?", "En anglais, c'est très simple : le verbe seul, à l'infinitif, sans « to » et sans sujet (pas de « you »). On ne le conjugue pas."],
      ["Pour être poli.e", "On ajoute « please » au début ou à la fin de la phrase."],
      ["Pour interdire", "On met « Don't » devant le verbe."]
    ],
    examples: [
      ["Go straight on.", "Va / allez tout droit."],
      ["Turn left at the traffic lights.", "Tournez à gauche aux feux."],
      ["Take the second street on the right, please.", "Prenez la deuxième rue à droite, s'il vous plaît."],
      ["Don't cross the road here.", "Ne traversez pas la route ici."]
    ],
    verbs: [["go","aller"],["turn","tourner"],["take","prendre"],["walk","marcher"],["cross","traverser"],["follow","suivre"],["stop","s'arrêter"]],
    check: [
      { q: "___ straight on for two blocks.", opts: ["Go", "You go", "Going", "To go"], ans: 0 },
      { q: "___ left at the traffic lights.", opts: ["Turn", "Turning", "You turn", "Turns"], ans: 0 },
      { q: "___ the second street on the right.", opts: ["Take", "Takes", "Taking", "To take"], ans: 0 },
      { q: "___ cross the road here: it's dangerous!", opts: ["Don't", "Not", "No", "Doesn't"], ans: 0 },
      { q: "Walk past the bank, ___.", opts: ["please", "pleasing", "pleased", "to please"], ans: 0 }
    ]
  }
};
