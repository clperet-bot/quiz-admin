/*
  From Art to Ad — parcours d'aiguillage (2nde MES).
  Partagé par la page élève (cours-art-ad.html) et le suivi enseignante (cours-suivi.html).
*/
(function(){

// Adresse de ClassArena (thème « From Art to Ad ») — à modifier ici si le lien change
const CLASSARENA_URL = 'https://clperet-bot.github.io/classarena/';

const CONNECTORS = [['but','mais'],['however','cependant'],['while','alors que'],['whereas','tandis que']];

const FRAMES = [
  'In the painting, there is/are ___, but in the ad, there is/are ___.',
  'The painting has ___, however, the ad has ___.',
  'While the painting shows ___, the ad shows ___.',
  'The painting doesn\'t have ___, whereas the ad has ___.'
];

const VOCAB = {
  'Les mots de la pub':[['ad / advertisement','publicité'],['logo','logo'],['brand name','nom de la marque'],['slogan','slogan'],['caption','légende, texte'],['picture','image'],['banner / warning','bandeau / avertissement']],
  'Ce qui a changé':[['to add','ajouter'],['to replace','remplacer'],['to cover','couvrir, cacher'],['to change','changer'],['to remove','enlever'],['instead of','à la place de'],['more visible','plus visible']],
  'Les couleurs':[['color','couleur'],['pink / turquoise / yellow','rose / turquoise / jaune'],['golden yellow','jaune doré'],['warm colors','couleurs chaudes'],['cool colors / grey tones','couleurs froides / tons gris'],['bright / vivid colors','couleurs vives'],['muted / dull colors','couleurs ternes, adoucies'],['earthy colors','couleurs terreuses'],['dark / light','sombre / clair'],['brown / golden tones','tons marron / dorés']],
  'La position':[['in front of','devant'],['behind','derrière'],['background','arrière-plan'],['in the corner','dans le coin'],['at the top / at the bottom','en haut / en bas'],['on the left / on the right','à gauche / à droite'],['near the eyes','près des yeux'],['close-up','gros plan']],
  'Le texte':[['text / lettering','texte / lettrage'],['letters','lettres'],['font / style','police / style'],['bold','gras'],['serif font','police à empattements'],['old-style / fancy letters','lettres à l\'ancienne / ornées']],
  'Les objets':[['sunglasses','lunettes de soleil'],['torn paper','papier déchiré'],['headlights','phares'],['vase / sunflowers','vase / tournesols'],['bag of chips','paquet de chips'],['fork / eclair','fourchette / éclair'],['bubble','bulle'],['plant / pot','plante / pot']]
};

// Les 5 couples œuvre / publicité du cours (pour s'entraîner)
// facts = description de référence pour l'IA (jamais montrée à l'élève)
const PAIRS = [
  { id:'marilyn', title:'Marilyn — Ray-Ban', painting:'art-ad/marilyn-painting.jpg', ad:'art-ad/marilyn-ad.jpg',
    caption:"Pop art (Andy Warhol, Marilyn) et la publicité Ray-Ban",
    facts:"Peinture : portrait pop art de Marilyn, fond rose fuchsia, cheveux jaunes, pas de logo, pas de lunettes. Pub Ray-Ban : même portrait mais fond turquoise ; du papier déchiré (torn paper) près des yeux ; sous le papier déchiré, des lunettes de soleil rouges ; logo Ray-Ban en bas à droite." },
  { id:'sunflowers', title:'Les tournesols — Lexus', painting:'art-ad/sunflowers-painting.jpg', ad:'art-ad/sunflowers-ad.jpg',
    caption:"Van Gogh, Tournesols (1888) et la publicité Lexus",
    facts:"Peinture de Van Gogh : tournesols dans un vase, couleurs chaudes jaune et orange, fond jaune doré. Pub Lexus : les tournesols sont remplacés par des phares de voiture (headlights) aux tons gris et métalliques, le vase est devenu un pot en métal, le fond reste jaune doré ; logo Lexus et slogan en bas à droite." },
  { id:'gleaners', title:'Les glaneuses — Lay\'s', painting:'art-ad/gleaners-painting.jpg', ad:'art-ad/gleaners-ad.jpg',
    caption:"Millet, Les Glaneuses (1857) et la publicité Lay's",
    facts:"Peinture de Millet : trois femmes penchées dans un champ de blé, couleurs ternes et terreuses (marron, beige), aucun texte. Pub Lay's : un paquet de chips Lay's en bas à gauche devant le champ ; logo Lay's en haut à gauche ; texte rouge en haut (un savoir-faire artisanal à votre service depuis 1987) ; bandeau d'avertissement en petits caractères noirs en bas (pour votre santé, évitez de manger trop gras, trop sucré, trop salé) ; couleurs plus vives (rouge, jaune) à cause du paquet." },
  { id:'monalisa', title:'La Joconde — Fauchon', painting:'art-ad/monalisa-painting.jpg', ad:'art-ad/monalisa-ad.jpg',
    caption:"Léonard de Vinci, La Joconde et la publicité Fauchon",
    facts:"Peinture : la Mona Lisa, ses yeux et son célèbre sourire, tons marron et dorés, arrière-plan de paysage, cheveux lisses. Pub Fauchon : un éclair (eclair) cache (covers) les yeux de la femme, une main tient une fourchette (fork) près de l'éclair, une tresse (braid) rousse, gros plan, logo FAUCHON PARIS en bas, texte L'éclair Madame Joconde ; la peinture n'a ni fourchette ni texte." },
  { id:'bubbles', title:'Bubbles — Pears\' soap', painting:'art-ad/bubbles-painting.jpg', ad:'art-ad/bubbles-ad.jpg',
    caption:"Millais, Bubbles (1886) et la publicité Pears' soap",
    facts:"La peinture et la pub montrent presque la même image d'un garçon qui regarde une bulle. La pub a un texte en lettres anciennes ornées (fancy old-style letters) « Pears' soap » en haut, seules les premières lettres sont des majuscules ; la bulle est devant le texte ; les joues du garçon sont plus rouges dans la pub, les couleurs sont un peu plus vives ; la plante derrière lui et le pot rouge en bas sont plus visibles dans la pub." }
];

const course = {
  id:'art-to-ad',
  title:'From Art to Ad',
  subtitle:'Ma pub et mon texte de comparaison',
  studentPage:'cours-art-ad.html',
  steps:[
    { n:1, title:"Où j'en suis", skill:'bilan',
      goal:"Objectif : dire à ta prof où tu en es. Deux petites questions pour te proposer la bonne suite.",
      qs:[{id:'1-ad', prompt:'As-tu fini de créer ta publicité ?'},{id:'1-txt', prompt:'As-tu rédigé ton texte de comparaison ?'}] },
    { n:2, title:'Ma publicité', skill:'rendu',
      goal:"Objectif : rendre ton travail (l'œuvre originale + ta publicité), ou savoir ce qu'il te reste à faire.",
      qs:[{id:'2-send', prompt:'Envoi de l\'œuvre originale et de la publicité'}] },
    { n:3, title:'Mon texte de comparaison', skill:'EE', lu:'Expression écrite (EE)',
      goal:"Objectif : comparer l'œuvre et la publicité avec but / however / while / whereas et du vocabulaire précis.",
      qs:[{id:'3-done', prompt:'Texte de comparaison / révisions ClassArena'}] }
  ]
};
course.allQuestions = [];
course.steps.forEach(s => (s.qs || []).forEach((q, i) => { q.step = s.n; q.level = '—'; q.index = i; course.allQuestions.push(q); }));
// questions « dynamiques » connues du suivi
course.extraIds = { '3-text':'Texte de comparaison (version élève)', '3-arena':'ClassArena' };

window.ARTAD_COURSE = course;
window.ARTAD_PAIRS = PAIRS;
window.ARTAD_VOCAB = VOCAB;
window.ARTAD_FRAMES = FRAMES;
window.ARTAD_CONNECTORS = CONNECTORS;
window.ARTAD_CLASSARENA = CLASSARENA_URL;
})();
