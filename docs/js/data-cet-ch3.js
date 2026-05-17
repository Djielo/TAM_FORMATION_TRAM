/** CET ch. 3 — Consignes de circulation en ligne (pages 38–58) */
export const MODULES_CH3 = [
  // ─── 3.1-A Prise de service au dépôt ───────────────────────
  {
    id: "prise-31a",
    code: "3.1-A",
    title: "Prise de service au dépôt",
    cetPage: 39,
    questions: [
      {
        id: "ch3-31a-01",
        prompt:
          "Quel est le taux maximal d'alcoolémie autorisé au sang pour un conducteur de transport public de voyageurs selon le CET ?",
        choices: [
          "Strictement inférieur à 0,20 g/l de sang",
          "0,50 g/l comme tout conducteur",
          "0,80 g/l",
          "Aucune limite si repos de 11 h",
        ],
        correct: 0,
        explanation: "Obligation code de la route : < 0,20 g/l (p.39).",
      },
      {
        id: "ch3-31a-02",
        prompt:
          "À partir de quelle durée sans conduite commerciale sur au moins une ligne autorisée l'habilitation ligne/matériel est-elle suspendue automatiquement ?",
        choices: [
          "Plus de 70 jours sur au moins une ligne autorisée",
          "30 jours",
          "6 mois",
          "1 an",
        ],
        correct: 0,
        explanation: "Remise en main obligatoire au-delà de 70 jours (p.39).",
      },
      {
        id: "ch3-31a-03",
        prompt:
          "À quels moments le conducteur doit-il badger lors de la prise de service au dépôt et lors de la montée dans la rame ?",
        choices: [
          "À l'arrivée au dépôt et au montée dans la rame",
          "Uniquement en fin de service",
          "Une fois par semaine",
          "Par le PCC à distance",
        ],
        correct: 0,
        explanation: "Badge dépôt + embarquement pour début effectif (p.39).",
      },
      {
        id: "ch3-31a-04",
        prompt:
          "Pour une relève en ligne, combien de temps au minimum avant l'heure théorique le conducteur relèveur doit-il être sur place ?",
        choices: [
          "Au moins 2 minutes avant l'heure théorique",
          "À l'heure pile",
          "5 minutes après",
          "Uniquement si la rame est en retard",
        ],
        correct: 0,
        explanation: "Avance minimale de 2 min au point de relève (p.39).",
      },
      {
        id: "ch3-31a-05",
        prompt:
          "Si la rame à relever est toujours absente à l'heure théorique de relève, dans quel délai maximum le relèveur doit-il appeler le PCC ?",
        choices: ["5 minutes", "15 minutes", "1 minute", "30 minutes"],
        correct: 0,
        explanation: "Appel PCC sous 5 min après heure théorique de relève (p.39).",
      },
      {
        id: "ch3-31a-06",
        prompt:
          "Pour les déplacements entre relève ou pause, quelle consigne suit-on au sujet de la planchette et du véhicule personnel ?",
        choices: [
          "Selon planchette, sans véhicule personnel",
          "En voiture personnelle autorisée",
          "Taxi systématique",
          "À pied interdit",
        ],
        correct: 0,
        explanation: "Respect planchette ; véhicule personnel interdit (p.39).",
      },
    ],
  },

  // ─── 3.1-B Préparation et sortie dépôt ────────────────────
  {
    id: "prise-31b",
    code: "3.1-B",
    title: "Préparation de la rame et sortie du dépôt",
    cetPage: 40,
    questions: [
      {
        id: "ch3-31b-01",
        prompt:
          "Pour la prise de rame au dépôt, comment doit être réalisée la préparation sur remisage ?",
        choices: [
          "Suit la procédure du chapitre 1 (partie 1)",
          "Est facultative si la rame a roulé la veille",
          "Est faite uniquement par le PCC",
          "Remplace le test Petrarque",
        ],
        correct: 0,
        explanation: "Préparation conforme au ch. 1 (encadré p.40).",
      },
      {
        id: "ch3-31b-02",
        prompt:
          "Pour la sortie du dépôt et la mise en ligne, qui délivre l'autorisation et précise notamment quoi pour le départ ?",
        choices: [
          "Du PCC (itinéraire de départ)",
          "Du conducteur seul",
          "Du régulateur voyageurs",
          "De la police municipale",
        ],
        correct: 0,
        explanation: "Demande PCC avant sortie ; changement matériel par PCC seul (p.40).",
      },
      {
        id: "ch3-31b-03",
        prompt:
          "Quels tests sont obligatoires avant la sortie du dépôt, parmi les propositions suivantes ?",
        choices: [
          "Télécommande d'aiguille (INDIR) et balises Petrarque",
          "Uniquement le gong",
          "Évacuation",
          "Remorquage",
        ],
        correct: 0,
        explanation: "INDIR en zone télécommande ; Petrarque (barrière/feu) (p.40).",
      },
      {
        id: "ch3-31b-04",
        prompt:
          "Pour le test de la veille après sortie du dépôt, sur quelle position de la clé KC le réalise-t-on jusqu'à obtention du signal sonore ?",
        choices: [
          "CN — maintien/relâchement jusqu'au signal sonore",
          "N uniquement",
          "P",
          "FS",
        ],
        correct: 0,
        explanation: "Test veille sur CN ; à refaire au premier changement de cabine (p.40).",
      },
      {
        id: "ch3-31b-05",
        prompt:
          "Quand la balise Petrarque indique « arrière OK », quel effet attendez-vous parmi les suivants avant la barrière ?",
        choices: [
          "Allumage du feu avant la barrière",
          "Ouverture immédiate de la barrière",
          "Arrêt du tram",
          "Coupure LAC",
        ],
        correct: 0,
        explanation: "Arrière OK → feu avant barrière ; avant OK → ouverture barrière (p.40).",
      },
    ],
  },

  // ─── 3.1-C Comportement dans la rame ──────────────────────
  {
    id: "prise-31c",
    code: "3.1-C",
    title: "Comportement du conducteur dans la rame",
    cetPage: 41,
    questions: [
      {
        id: "ch3-31c-01",
        prompt:
          "Comment doit s'effectuer toute action de conduite, avec ou sans voyageurs à bord ?",
        choices: [
          "En position assise, pieds au sol, buste droit",
          "Debout si peu de monde",
          "En marche arrière",
          "Sans ceinture si rame vide",
        ],
        correct: 0,
        explanation: "Position de vigilance pour commandes d'urgence dont FS (p.41).",
      },
      {
        id: "ch3-31c-02",
        prompt:
          "Laquelle de ces affirmations décrit correctement les interdictions qui s'appliquent dans la cabine ?",
        choices: [
          "Fumer, s'alimenter, téléphoner ou oreillettes (hors mains libres à l'arrêt)",
          "Parler au PCC",
          "Utiliser le SIE",
          "Fermer la porte",
        ],
        correct: 0,
        explanation: "Interdictions listées ; phonie hors arrêt en mains libres (p.41).",
      },
      {
        id: "ch3-31c-03",
        prompt:
          "En cas d'arrêt prolongé en ligne, comment doit se comporter le conducteur ?",
        choices: [
          "Reste au poste, joignable PCC, feux de détresse",
          "Peut quitter la cabine librement",
          "Coupe la batterie",
          "Évacue systématiquement",
        ],
        correct: 0,
        explanation: "Poste tenu + détresse (p.41).",
      },
      {
        id: "ch3-31c-04",
        prompt:
          "Outre le conducteur, qui peut être présent en cabine et quelle obligation lie cette présence au PCC ?",
        choices: [
          "Cadres, maîtrise, maintenance en mission, formateurs, personnes avec autorisation écrite — signalement PCC",
          "Tout voyageur",
          "Police sans avis",
          "Journalistes",
        ],
        correct: 0,
        explanation: "Liste limitée + signalement systématique au PCC (p.41).",
      },
      {
        id: "ch3-31c-05",
        prompt:
          "Pour quitter la cabine en ligne hors actions courantes d'exploitation, quelles conditions doit-on réunir ?",
        choices: [
          "Force majeure, après évacuation, PCC informé, mesures anti-accident",
          "À tout moment 5 minutes",
          "Pour contrôler les portes",
          "Sans préavis",
        ],
        correct: 0,
        explanation: "Conditions cumulatives (p.41).",
      },
    ],
  },

  // ─── 3.2 Principes généraux ───────────────────────────────
  {
    id: "circ-32",
    code: "3.2",
    title: "Circulation en ligne — Principes généraux",
    cetPage: 42,
    questions: [
      {
        id: "ch3-32-01",
        prompt:
          "Pour respecter le sens de marche, depuis quelle cabine doit-on conduire la rame ?",
        choices: [
          "Depuis la cabine située dans le sens de la marche (marche arrière interdite)",
          "Depuis n'importe quelle cabine",
          "En marche arrière autorisée",
          "Sans cabine en HLP",
        ],
        correct: 0,
        explanation: "Cabine en tête du sens de marche (p.42).",
      },
      {
        id: "ch3-32-02",
        prompt:
          "Parmi les éléments suivants, qu'implique notamment la marche à vue ?",
        choices: [
          "Adapter la vitesse à l'environnement",
          "Rouler toujours à 70 km/h",
          "Ignorer les TIV",
          "Priorité absolue du tram",
        ],
        correct: 0,
        explanation: "Adaptation continue (texte en rouge p.42).",
      },
      {
        id: "ch3-32-03",
        prompt:
          "Au passage d'un sectionneur (IS), que doit-on faire ou éviter ?",
        choices: [
          "Éviter d'être en traction",
          "Accélérer au maximum",
          "Couper le SIE",
          "Ouvrir les portes",
        ],
        correct: 0,
        explanation: "Ne pas être en traction au passage IS (p.42).",
      },
      {
        id: "ch3-32-04",
        prompt:
          "En sortie de courbe, à quel moment peut-on reprendre la vitesse ?",
        choices: [
          "Quand toute la rame est en alignement droit",
          "Dès l'entrée en courbe",
          "À 70 km/h",
          "Sans contrôle",
        ],
        correct: 0,
        explanation: "Confort, sécurité, préservation infrastructure (p.42).",
      },
      {
        id: "ch3-32-05",
        prompt:
          "Face à une baisse de vigilance répétée, que doit faire le conducteur ?",
        choices: [
          "Alerter immédiatement le PCC sur l'état de santé",
          "Continuer le service",
          "Isoler la veille seul",
          "Fin de journée sans avis",
        ],
        correct: 0,
        explanation: "Signalement PCC (p.42).",
      },
    ],
  },

  // ─── 3.2-A GLO et ouverture de voie ───────────────────────
  {
    id: "circ-32a",
    code: "3.2-A",
    title: "GLO et ouverture de la voie",
    cetPage: 43,
    questions: [
      {
        id: "ch3-32a-01",
        prompt:
          "Que représente au sol le tracé du GLO par rapport à la circulation du tram ?",
        choices: [
          "La zone de circulation tram tenant compte du gabarit",
          "La limite vitesse 30 km/h",
          "Le quai client",
          "La voie bus",
        ],
        correct: 0,
        explanation: "Bande au sol délimitant l'emprise tram (p.43).",
      },
      {
        id: "ch3-32a-02",
        prompt:
          "Si un obstacle empiète sur la limite du GLO, quelle est la conduite à tenir ?",
        choices: [
          "Arrêt et appel immédiat au PCC",
          "Passage à 10 km/h",
          "Klaxonner seulement",
          "Contourner sans avis",
        ],
        correct: 0,
        explanation: "Arrêt + PCC (p.43).",
      },
      {
        id: "ch3-32a-03",
        prompt:
          "À l'ouverture de voie sur une infrastructure à double voie ou à voie unique : quelle vitesse maximale ne doit-on pas dépasser ?",
        choices: ["40 km/h", "30 km/h", "20 km/h", "70 km/h"],
        correct: 0,
        explanation: "Limitation 40 km/h en ouverture de voie (p.43).",
      },
      {
        id: "ch3-32a-04",
        prompt:
          "Aiguillage : si position des aiguilles non visible (neige, etc.) ?",
        choices: [
          "Arrêt avant l'appareil",
          "Passage à 15 km/h",
          "FU",
          "Télécommande sans arrêt",
        ],
        correct: 0,
        explanation: "Arrêt si aiguille non visible (p.43).",
      },
      {
        id: "ch3-32a-05",
        prompt:
          "Au terminus, parmi ces éléments, que doit notamment signaler le conducteur au PCC au sujet de la voie ?",
        choices: [
          "Zones de rail glissant constatées",
          "Uniquement les retards voyageurs",
          "La météo seule",
          "Rien si service normal",
        ],
        correct: 0,
        explanation: "État de la voie dont adhérence (p.43).",
      },
    ],
  },

  // ─── 3.2-B Voie double ────────────────────────────────────
  {
    id: "circ-32b",
    code: "3.2-B",
    title: "Circulation sur voie double",
    cetPage: 44,
    questions: [
      {
        id: "ch3-32b-01",
        prompt:
          "En voie double, sur quelle voie s'effectue la circulation nominale par rapport au sens de marche ?",
        choices: [
          "Sur la voie de droite (sens de marche)",
          "Sur la voie de gauche",
          "Au choix du conducteur",
          "Au centre des deux voies",
        ],
        correct: 0,
        explanation: "Ex. L1 V1 Mosson→Odysseum, L2 SJD→Jacou (p.44).",
      },
      {
        id: "ch3-32b-02",
        prompt:
          "En voie double, que doit notamment respecter le conducteur parmi les éléments suivants : présence tension, feux carrefour, feux de manœuvre, signalisation verticale et au sol ?",
        choices: [
          "Présence tension, feux carrefour, manœuvre, signalisation verticale et au sol",
          "Uniquement les panneaux TIV",
          "Le code bus",
          "La girouette seule",
        ],
        correct: 0,
        explanation: "Quatre familles de signalisation (p.44).",
      },
    ],
  },

  // ─── 3.2-C Voie unique ────────────────────────────────────
  {
    id: "circ-32c",
    code: "3.2-C",
    title: "Circulation sur voie unique",
    cetPage: 44,
    questions: [
      {
        id: "ch3-32c-01",
        prompt:
          "Voie unique : départ de station si feu de manœuvre encore au rouge ?",
        choices: [
          "Interdit — attendre le vert",
          "Autorisé à 10 km/h",
          "Autorisé si PCC non joignable",
          "Autorisé en HLP seulement",
        ],
        correct: 0,
        explanation: "Pas de départ quai tant que manœuvre pas au vert (p.44).",
      },
      {
        id: "ch3-32c-02",
        prompt:
          "Si un signal est franchi alors que la sirène ou les lampes flash se déclenchent, quelle est la réaction attendue ?",
        choices: [
          "FU immédiat, arrêt, appel PCC",
          "Poursuite 30 km/h",
          "Klaxon seul",
          "FS en marche",
        ],
        correct: 0,
        explanation: "Réaction urgence + PCC (p.44).",
      },
      {
        id: "ch3-32c-03",
        prompt:
          "Sortie d'évitement, aiguille en voie déviée : vitesse max ?",
        choices: ["15 km/h", "40 km/h", "30 km/h", "10 km/h"],
        correct: 0,
        explanation: "15 km/h en sortie d'évitement aiguille déviée (encadré p.44).",
      },
      {
        id: "ch3-32c-04",
        prompt:
          "À l'entrée en évitement, comment doit être conduit le contrôle INDIR par rapport à une aiguille prise par la pointe ?",
        choices: [
          "Comme pour toute aiguille prise par la pointe",
          "Inutile",
          "Uniquement la nuit",
          "Par le PCC à distance",
        ],
        correct: 0,
        explanation: "Contrôle INDIR à l'entrée d'évitement (p.44).",
      },
    ],
  },

  // ─── 3.2-D VUT ────────────────────────────────────────────
  {
    id: "circ-32d",
    code: "3.2-D",
    title: "Circulation en voie unique temporaire (VUT)",
    cetPage: 45,
    questions: [
      {
        id: "ch3-32d-01",
        prompt:
          "Dans quelles conditions la circulation en voie unique temporaire (VUT) est-elle autorisée ?",
        choices: [
          "Sur ordre du PCC ou consignes spécifiques",
          "Par décision conducteur",
          "Toujours la nuit",
          "Sans limite de vitesse",
        ],
        correct: 0,
        explanation: "VUT uniquement sur ordre PCC (p.45).",
      },
      {
        id: "ch3-32d-02",
        prompt:
          "En circulation sur une voie unique temporaire (VUT) : quelle est la vitesse maximale autorisée ?",
        choices: ["30 km/h", "40 km/h", "20 km/h", "15 km/h"],
        correct: 0,
        explanation: "30 km/h max en VUT (p.45).",
      },
      {
        id: "ch3-32d-03",
        prompt:
          "Pour une manœuvre au bâton pilote numéroté, que doit faire le conducteur avant d'entrer en VUT ?",
        choices: [
          "Demander autorisation PCC en annonçant le numéro du bâton",
          "Klaxonner",
          "Passer au vert seul",
          "Évacuer la rame",
        ],
        correct: 0,
        explanation: "Chaque conducteur a un bâton ; annonce au PCC (p.45).",
      },
      {
        id: "ch3-32d-04",
        prompt:
          "En VUT, dans quel cas précis le conducteur doit-il obligatoirement utiliser le gong ?",
        choices: [
          "En sens inverse de circulation habituel",
          "Jamais",
          "Uniquement au dépôt",
          "À 22 h seulement",
        ],
        correct: 0,
        explanation: "Gong en VUT sens contraire (rappel lié p.50 / VUT p.45).",
      },
    ],
  },

  // ─── 3.2-E1 Retournement (définitions et cas 1) ─────────────
  {
    id: "circ-32e1",
    code: "3.2-E1",
    title: "Retournement et rebroussement — Principes et cas n° 1",
    cetPage: 46,
    questions: [
      {
        id: "ch3-32e1-01",
        prompt:
          "Selon le CET, comment définit-on un retournement parmi les descriptions suivantes ?",
        choices: [
          "Changement de voie par communication et départ sens inverse sur l'autre voie",
          "Marche arrière sur même voie",
          "Remorquage",
          "Haut le pied",
        ],
        correct: 0,
        explanation: "Retournement = communication + autre voie (p.46).",
      },
      {
        id: "ch3-32e1-02",
        prompt:
          "Le rebroussement sur même voie correspond à quel mode de circulation parmi les suivants ?",
        choices: [
          "Circulation en VUT",
          "Voie double nominale",
          "Fin de service",
          "Ouverture de voie",
        ],
        correct: 0,
        explanation: "Rebroussement = VUT sur même voie (p.46).",
      },
      {
        id: "ch3-32e1-03",
        prompt:
          "Pour une communication manuelle non signalisée, dans quelles conditions peut-on réaliser un retournement ?",
        choices: [
          "Sur ordre ou autorisation PCC",
          "Libre",
          "Interdit",
          "À 70 km/h",
        ],
        correct: 0,
        explanation: "Manœuvre complète sur ordre PCC (p.46).",
      },
      {
        id: "ch3-32e1-04",
        prompt:
          "Au cas n° 1 (communication après une station), quelles actions doit avoir réalisées le conducteur avant de manœuvrer l'aiguille ?",
        choices: [
          "Feux détresse, neutre, clé N, sortie cabine, porte fermée",
          "FU",
          "Ouverture portes voyageurs",
          "70 km/h jusqu'au clou",
        ],
        correct: 0,
        explanation: "Séquence sécurité avant mise en déviée (p.46).",
      },
      {
        id: "ch3-32e1-05",
        prompt:
          "Pour franchir un carrefour (ex. Albert 1er) pendant un retournement, comment le conducteur fait-il déclencher le feu nécessaire ?",
        choices: [
          "Mode VUT en armoire de loge pour déclencher le feu",
          "Priorité à gauche",
          "Pas de feu",
          "Marche arrière interdite toujours",
        ],
        correct: 0,
        explanation: "Commutateur VUT en AEL si carrefour à franchir (p.46).",
      },
    ],
  },

  // ─── 3.2-E2 Retournement terminus ─────────────────────────
  {
    id: "circ-32e2",
    code: "3.2-E2",
    title: "Manœuvre de retournement en terminus",
    cetPage: 47,
    questions: [
      {
        id: "ch3-32e2-01",
        prompt:
          "Lors d'une manœuvre de retournement en terminus, quelle vitesse maximale ne doit-on pas dépasser ?",
        choices: ["15 km/h", "40 km/h", "30 km/h", "10 km/h"],
        correct: 0,
        explanation: "15 km/h en terminus (p.47).",
      },
      {
        id: "ch3-32e2-02",
        prompt:
          "La marche arrière depuis une cabine située à l'opposé du sens de marche est-elle permise et dans quelles conditions exceptionnelles ?",
        choices: [
          "Strictement interdite sauf courte distance remorquage/poussage avec 2e agent",
          "Autorisée à 30 km/h",
          "Autorisée en terminus",
          "Libre en VUT",
        ],
        correct: 0,
        explanation: "Interdit sauf remorquage court avec personnel cabine opposée (p.47).",
      },
      {
        id: "ch3-32e2-03",
        prompt:
          "Lors d'un changement de cabine en terminus, que doit-on notamment vérifier parmi les éléments suivants ?",
        choices: [
          "Présélection portes et girouette",
          "Pantographe bas",
          "Évacuation",
          "Triangle",
        ],
        correct: 0,
        explanation: "Étape 3 retournement terminus (p.47).",
      },
      {
        id: "ch3-32e2-04",
        prompt:
          "Hors pause ou régulation de service, peut-on quitter la cabine et sous quelle condition ?",
        choices: [
          "Uniquement avec autorisation PCC",
          "Libre",
          "Interdit toujours",
          "Après évacuation",
        ],
        correct: 0,
        explanation: "Hors pause : pas de sortie cabine sans PCC (p.47).",
      },
    ],
  },

  // ─── 3.2-E3 Rebroussement VU ──────────────────────────────
  {
    id: "circ-32e3",
    code: "3.2-E3",
    title: "Rebroussement sur voie unique",
    cetPage: 48,
    questions: [
      {
        id: "ch3-32e3-01",
        prompt:
          "Lors d'un rebroussement en conflit (deux rames, SM rouge), quelle vitesse maximale respecter après changement de cabine ?",
        choices: [
          "5 km/h max après changement de cabine",
          "40 km/h",
          "15 km/h",
          "20 km/h",
        ],
        correct: 0,
        explanation: "Rebroussement limité à 5 km/h (p.48).",
      },
      {
        id: "ch3-32e3-02",
        prompt:
          "Avant de reculer en rebroussement, que doit-on souvent faire au préalable au sujet de l'aiguille quittée ?",
        choices: [
          "S'engager en marche avant pour dégager complètement l'aiguille quittée",
          "Couper la batterie",
          "Évacuer",
          "FU",
        ],
        correct: 0,
        explanation: "Dégagement appareil en marche avant si besoin (p.48).",
      },
      {
        id: "ch3-32e3-03",
        prompt:
          "Une fois le rebroussement terminé, qui doit être informé et de quoi avant la reprise ?",
        choices: [
          "Le PCC de la position avant reprise",
          "Les voyageurs seulement",
          "La police",
          "Personne",
        ],
        correct: 0,
        explanation: "Compte-rendu position au PCC (p.48).",
      },
      {
        id: "ch3-32e3-04",
        prompt:
          "Pour un rebroussement après une station (ex. Boirargues), qui doit donner l'autorisation et à quel moment par rapport au changement de cabine et à la reprise ?",
        choices: [
          "PCC avant changement de cabine et reprise",
          "Conducteur seul",
          "Régulateur quai",
          "Sans accord",
        ],
        correct: 0,
        explanation: "Autorisation PCC pour rebroussement (p.48).",
      },
    ],
  },

  // ─── 3.3 Haut le pied ─────────────────────────────────────
  {
    id: "circ-33",
    code: "3.3",
    title: "Circulation haut le pied (sans voyageurs)",
    cetPage: 49,
    questions: [
      {
        id: "ch3-33-01",
        prompt:
          "En circulation haut le pied (HLP), à quelle vitesse maximale franchit-on une station ?",
        choices: ["15 km/h", "30 km/h", "40 km/h", "10 km/h"],
        correct: 0,
        explanation: "15 km/h en station en HLP (p.49).",
      },
      {
        id: "ch3-33-02",
        prompt:
          "En HLP à l'arrêt en station, dans quelles conditions le gong est-il obligatoire ou peut-on s'en passer ?",
        choices: [
          "Obligatoire sauf après 22 h sauf danger",
          "Interdit",
          "Uniquement le jour",
          "Remplace les feux",
        ],
        correct: 0,
        explanation: "Gong en station HLP ; exception 22 h (p.49).",
      },
      {
        id: "ch3-33-03",
        prompt:
          "En HLP, à quoi le conducteur doit-il encore veiller au-delà de la conduite proprement dite ?",
        choices: [
          "Message girouette et feux de détresse",
          "Ouverture des portes",
          "Vitesse 70 km/h",
          "Évacuation",
        ],
        correct: 0,
        explanation: "Girouette + détresse (p.49).",
      },
    ],
  },

  // ─── 3.4 Feux et détresse ─────────────────────────────────
  {
    id: "circ-34",
    code: "3.4",
    title: "Feux et feux de détresse",
    cetPage: 49,
    questions: [
      {
        id: "ch3-34-01",
        prompt:
          "Les feux de croisement et l'éclairage intérieur doivent-ils rester allumés et pendant quelles plages horaires ?",
        choices: [
          "Allumés jour et nuit",
          "Nuit seulement",
          "Intermittents",
          "Au choix",
        ],
        correct: 0,
        explanation: "Croisement + intérieur permanents (p.49).",
      },
      {
        id: "ch3-34-02",
        prompt:
          "Dans quels cas parmi les suivants l'allumage des feux de détresse est-il obligatoire ?",
        choices: [
          "Arrêt anormal prolongé, HLP/VUT, destination atypique en zone gare, carrefour feu clignotant/éteint, remorquage/poussage",
          "Uniquement la nuit",
          "En station commerciale",
          "Jamais en ligne",
        ],
        correct: 0,
        explanation: "Cinq situations listées p.49.",
      },
      {
        id: "ch3-34-03",
        prompt:
          "Lorsque l'on croise une rame à l'arrêt sur l'autre voie, quelle procédure respecter avant de poursuivre ?",
        choices: [
          "10 km/h, arrêt au niveau de sa cabine, informer PCC avant reprise",
          "40 km/h sans arrêt",
          "FU",
          "Pas de ralentissement",
        ],
        correct: 0,
        explanation: "Procédure croisement rame arrêtée (p.49).",
      },
      {
        id: "ch3-34-04",
        prompt:
          "Une rame hors service (HS) à l'arrêt prolongé avec détresse : quel aménagement doit être prévu devant elle ?",
        choices: [
          "Triangle ~40 m devant la rame",
          "Rien",
          "Klaxon continu",
          "Évacuation",
        ],
        correct: 0,
        explanation: "Rappel triangle si détresse en panne (p.49).",
      },
    ],
  },

  // ─── 3.5 Gong ─────────────────────────────────────────────
  {
    id: "circ-35",
    code: "3.5",
    title: "Utilisation du gong",
    cetPage: 50,
    questions: [
      {
        id: "ch3-35-01",
        prompt:
          "Dans quels cas parmi les suivants le conducteur doit-il obligatoirement utiliser le gong ?",
        choices: [
          "Piétons/cyclistes proches voie, carrefour/zone piétonne dangereuse, rame ou bus arrêté",
          "Uniquement au dépôt",
          "À 70 km/h",
          "En tunnel uniquement",
        ],
        correct: 0,
        explanation: "Cas généraux p.50.",
      },
      {
        id: "ch3-35-02",
        prompt:
          "Entre 7 h et 22 h, dans quels autres cas le gong doit-il encore être utilisé ?",
        choices: [
          "Arrivée et départ station, croisement rame en marche (nacelle centrale)",
          "Jamais en station",
          "Uniquement la nuit",
          "Remplace le klaxon",
        ],
        correct: 0,
        explanation: "Plage horaire + stations + croisement (p.50).",
      },
      {
        id: "ch3-35-03",
        prompt:
          "En cas de panne du gong, quelles mesures parmi les suivantes doit prendre le conducteur ?",
        choices: [
          "Informer PCC, 20 km/h max, klaxon si danger",
          "Circulation normale",
          "FU",
          "Fin de service",
        ],
        correct: 0,
        explanation: "PCC + limitation 20 km/h (p.50).",
      },
      {
        id: "ch3-35-04",
        prompt:
          "En mode dégradé au carrefour, dans quel cas précis doit-on également utiliser le gong ?",
        choices: [
          "Feux routiers en dérangement",
          "TIV à 40",
          "Portes ouvertes",
          "HLP interdit",
        ],
        correct: 0,
        explanation: "Gong si feux carrefour dégradés (p.50).",
      },
    ],
  },

  // ─── 3.6 Distances de sécurité ────────────────────────────
  {
    id: "circ-36",
    code: "3.6",
    title: "Distances de sécurité",
    cetPage: 50,
    questions: [
      {
        id: "ch3-36-01",
        prompt:
          "Sur ligne en exploitation commerciale, quelle distance minimale doit séparer deux rames en mouvement l'une derrière l'autre ?",
        choices: [
          "100 m (50 m si V max section ≤ 30 km/h)",
          "50 m toujours",
          "200 m",
          "5 m",
        ],
        correct: 0,
        explanation: "100 m ; 50 m si limitation ≤ 30 km/h (p.50).",
      },
      {
        id: "ch3-36-02",
        prompt:
          "Deux rames à l'arrêt hors tout emplacement de station : quelle distance minimale doit les séparer ?",
        choices: ["5 m", "100 m", "2 m", "40 m"],
        correct: 0,
        explanation: "5 m hors station (p.50).",
      },
      {
        id: "ch3-36-03",
        prompt:
          "Deux rames à l'arrêt dans une même station : quelle distance minimale doit les séparer ?",
        choices: ["2 m", "100 m", "5 m", "15 m"],
        correct: 0,
        explanation: "2 m en station (p.50).",
      },
      {
        id: "ch3-36-04",
        prompt:
          "À l'entrée d'une station à quai double lorsqu'une autre rame occupe déjà le quai ou la voie opposée, quelle limitation de vitesse s'applique ?",
        choices: [
          "V max 15 km/h",
          "40 km/h",
          "30 km/h sans limite",
          "Arrêt interdit",
        ],
        correct: 0,
        explanation: "Risque piéton derrière rame arrêtée (p.50).",
      },
    ],
  },

  // ─── 3.7-A Ouverture des portes ───────────────────────────
  {
    id: "circ-37a",
    code: "3.7-A",
    title: "Arrêt en station — Ouverture des portes",
    cetPage: 51,
    questions: [
      {
        id: "ch3-37a-01",
        prompt:
          "Où et dans quelles conditions la montée et la descente des voyageurs sont-elles autorisées ?",
        choices: [
          "En station, côté quai désigné sauf consigne PCC",
          "Entre deux stations",
          "Côté entrevoie si affluence",
          "Quand le tram roule lentement",
        ],
        correct: 0,
        explanation: "Station + côté quai (p.51).",
      },
      {
        id: "ch3-37a-02",
        prompt:
          "En service voyageurs, à quelle vitesse maximale franchit-on l'entrée d'une station, avec ou sans autre rame présente conformément aux distances du § 3.6 ?",
        choices: [
          "30 km/h avec gong, ou 15 km/h si autre rame (3.6)",
          "40 km/h",
          "10 km/h toujours",
          "70 km/h",
        ],
        correct: 0,
        explanation: "30 km/h ou 15 km/h selon présence autre rame (p.51).",
      },
      {
        id: "ch3-37a-03",
        prompt:
          "Comment est défini le point d'arrêt commercial où doit s'effectuer l'immobilisation au quai ?",
        choices: [
          "Clou rouge aligné épaule conducteur",
          "Premier panneau TIV",
          "INDES",
          "Au choix",
        ],
        correct: 0,
        explanation: "Arrêt au clou rouge (p.51).",
      },
      {
        id: "ch3-37a-04",
        prompt:
          "À quel moment peut-on déverrouiller les portes voyageurs après l'arrêt en station ?",
        choices: [
          "Uniquement après arrêt complet",
          "En roulant à 5 km/h",
          "Avant le clou",
          "Par le PCC",
        ],
        correct: 0,
        explanation: "Portes après arrêt complet (p.51).",
      },
      {
        id: "ch3-37a-05",
        prompt:
          "Sur Citadis 401 en ouverture automatique des portes (self) au quai, comment doit être utilisé le BPAL et quel côté doit être pré-sélectionné ?",
        choices: [
          "BPAL engagé côté droit pré-sélectionné",
          "Ouverture automatique toutes portes",
          "Sans BPAL",
          "Côté gauche seul",
        ],
        correct: 0,
        explanation: "401 : self avec BPAL et pré-sélection droite (p.51).",
      },
    ],
  },

  // ─── 3.7-B Fermeture des portes ───────────────────────────
  {
    id: "circ-37b",
    code: "3.7-B",
    title: "Fermeture des portes",
    cetPage: 52,
    questions: [
      {
        id: "ch3-37b-01",
        prompt:
          "Après décrochage du BPAL, combien de temps attend-on en général avant la fermeture des portes selon l'affluence ?",
        choices: [
          "~15 s faible affluence, ~30 s forte affluence",
          "5 s toujours",
          "60 s",
          "Immédiat",
        ],
        correct: 0,
        explanation: "15 / 30 secondes (p.52).",
      },
      {
        id: "ch3-37b-02",
        prompt:
          "En forte affluence, comment réalise-t-on une fermeture forcée des portes au pupitre et quelles sécurités en résultent-elles ?",
        choices: [
          "Appui prolongé BPI — sécurités inhibées, message d'alerte",
          "BPAL rapide",
          "FS",
          "FU",
        ],
        correct: 0,
        explanation: "BPI prolongé ; sécurités coupées (p.52).",
      },
      {
        id: "ch3-37b-03",
        prompt:
          "Sur Citadis 401, la fermeture forcée déclenchée via le BPAL du côté déjà sélectionné est-elle permise et pourquoi ?",
        choices: [
          "Interdite (annule message, risque entrevoie)",
          "Recommandée",
          "Obligatoire",
          "Nuit seulement",
        ],
        correct: 0,
        explanation: "Interdit fermeture forcée par BPAL sur 401 (p.52).",
      },
      {
        id: "ch3-37b-04",
        prompt:
          "Au terminus, pour réguler un départ sur quai avec ouverture automatique des portes (self), sur quelle position du commutateur doit-on régler pour garder les portes centrales fermées de façon à préserver chauffage ou climatisation ?",
        choices: [
          "N (neutre) pour garder portes centrales fermées (chauffage/clim)",
          "CN",
          "FS",
          "P",
        ],
        correct: 0,
        explanation: "Self actif, commutateur N au terminus (p.52).",
      },
    ],
  },

  // ─── 3.7-C Départ de station ──────────────────────────────
  {
    id: "circ-37c",
    code: "3.7-C",
    title: "Départ de la station",
    cetPage: 53,
    questions: [
      {
        id: "ch3-37c-01",
        prompt:
          "En voie unique avec cantonnement, sous quel état du feu de manœuvre un départ depuis la station est-il autorisé ?",
        choices: [
          "Au vert uniquement",
          "Au rouge si retard",
          "Éteint : libre",
          "Clignotant : 40 km/h",
        ],
        correct: 0,
        explanation: "Pas de départ sur rouge (p.53).",
      },
      {
        id: "ch3-37c-02",
        prompt:
          "Sur quai double, depuis une deuxième position d'arrêt avant de reprendre le service voyageurs : où doit-on encore immobiliser la rame pour des raisons d'accessibilité ?",
        choices: [
          "Second arrêt en tête de quai (accessibilité)",
          "Départ direct",
          "40 km/h",
          "Sans voyageurs",
        ],
        correct: 0,
        explanation: "Deuxième arrêt en tête pour PMR (p.53).",
      },
      {
        id: "ch3-37c-03",
        prompt:
          "À Corum pour la relation désignée L1V2 : à la deuxième position d'attente sur quai, quel usage fait-on des voyageurs (montée/descente ou simple attente) ?",
        choices: [
          "Attente uniquement — échange voyageurs interdit (quai non aligné)",
          "Arrêt commercial autorisé",
          "Terminus",
          "VUT",
        ],
        correct: 0,
        explanation: "Position attente sans montée/descente (p.53).",
      },
      {
        id: "ch3-37c-04",
        prompt:
          "Après verrouillage des portes et jusqu'à ce que la rame ait entièrement dégagé le quai : que doit surveiller ou faire le conducteur ?",
        choices: [
          "Surveiller rétrovisions et gong ; si phonie, vérifier absence de piéton traîné",
          "Accélérer fort",
          "Ouvrir une porte",
          "Couper rétrovision",
        ],
        correct: 0,
        explanation: "Contrôle plateforme et GLO (p.53).",
      },
    ],
  },

  // ─── 3.7-D Défaut porte / poignée ──────────────────────────
  {
    id: "circ-37d",
    code: "3.7-D",
    title: "Défaut porte et poignée d'alarme",
    cetPage: 54,
    questions: [
      {
        id: "ch3-37d-01",
        prompt:
          "Si une poignée d'alarme est tirée pendant la phase de départ du quai, quels effets ou risques doit-on attendre parmi les suivants ?",
        choices: [
          "FU/FMS, portes à 15 s, ouverture possible côté entrevoie",
          "Aucun",
          "Ouverture côté quai seul",
          "FS obligatoire",
        ],
        correct: 0,
        explanation: "Freinage urgence + déverrouillage retardé (p.54).",
      },
      {
        id: "ch3-37d-02",
        prompt:
          "Après activation d'une poignée d'alarme : que doit faire le conducteur avant tout redépart ?",
        choices: [
          "Dialogue phonie, info voyageurs, contrôle sécurité (chutes)",
          "Repartir vite",
          "Évacuation systématique",
          "FS",
        ],
        correct: 0,
        explanation: "Phonie + annonce + sécurité passagers (p.54).",
      },
      {
        id: "ch3-37d-03",
        prompt:
          "Une porte défectueuse est constatée : quelle est la première mesure à prendre à bord ?",
        choices: [
          "Condamner + autocollant info voyageurs",
          "Rouler porte ouverte",
          "Fin de service",
          "Ignorer",
        ],
        correct: 0,
        explanation: "Condamnation + étiquette (p.54).",
      },
      {
        id: "ch3-37d-04",
        prompt:
          "Si une porte ne peut être condamnée et que l'on doit procéder à l'isolement « contrôle portes », sous quelles conditions la manœuvre est-elle acceptable ?",
        choices: [
          "Évacuation complète obligatoire avant, sur ordre PCC",
          "Sans condition",
          "En marche",
          "Par le conducteur seul",
        ],
        correct: 0,
        explanation: "Évacuation avant rupture plomb contrôle portes (p.54).",
      },
    ],
  },

  // ─── 3.8 Communication clientèle ──────────────────────────
  {
    id: "circ-38",
    code: "3.8",
    title: "Communication avec la clientèle",
    cetPage: 55,
    questions: [
      {
        id: "ch3-38-01",
        prompt:
          "En présence d'un incident ou d'un retard : comment doit-on informer les voyageurs et avec quel ton ?",
        choices: [
          "Information impérative, ton rassurant, sonorisation",
          "Silence",
          "Évacuation immédiate",
          "Message uniquement au PCC",
        ],
        correct: 0,
        explanation: "Image TaM, confort, sécurité, info (p.55).",
      },
      {
        id: "ch3-38-02",
        prompt:
          "Pour une annonce au micro cabine : à quelle distance environ doit se trouver la bouche du micro et comment moduler la voix ?",
        choices: [
          "5 à 6 cm, voix posée, pas trop fort",
          "Collée au micro",
          "Cri pour être entendu",
          "Micro coupé",
        ],
        correct: 0,
        explanation: "5–6 cm, débit calme (p.55).",
      },
      {
        id: "ch3-38-03",
        prompt:
          "En cas d'interruption de service : vers quelle action un message type oriente habituellement les voyageurs et avec quelles précisions sur les relais ?",
        choices: [
          "Quitter la rame et préciser relais (bus, rame suivante, etc.)",
          "Rester à bord",
          "Descendre sans consigne",
          "Attendre 1 h",
        ],
        correct: 0,
        explanation: "Script descente voyageurs (p.55).",
      },
      {
        id: "ch3-38-04",
        prompt:
          "Une fois la liaison microphone établie : que doit faire le conducteur avant de prononcer la première syllabe ?",
        choices: [
          "Respirer (premier mot peut être coupé)",
          "Appuyer sur FU",
          "Ouvrir les portes",
          "Couper la phonie",
        ],
        correct: 0,
        explanation: "Respiration après connexion (p.55).",
      },
    ],
  },

  // ─── 3.9-A Signalements radio PCC ─────────────────────────
  {
    id: "circ-39a",
    code: "3.9-A",
    title: "Communication PCC — Signalements radio",
    cetPage: 56,
    questions: [
      {
        id: "ch3-39a-01",
        prompt:
          "Quels niveaux d'appel radio vers le PCC sont prévus parmi les réponses suivantes ?",
        choices: [
          "Normal, urgent, détresse (écoute générale + détresse auto)",
          "Un seul niveau",
          "Écrit seulement",
          "Dépôt seulement",
        ],
        correct: 0,
        explanation: "Trois niveaux ; détresse = écoute + feux (p.56).",
      },
      {
        id: "ch3-39a-02",
        prompt:
          "Sur Citadis 402, comment déclenche-t-on un appel détresse radio et comment l'annule-t-on ensuite ?",
        choices: [
          "Appui long ; annulation via bouton détresse",
          "Un clic",
          "Interdit",
          "Par SAT",
        ],
        correct: 0,
        explanation: "402 : appui long détresse (p.56).",
      },
      {
        id: "ch3-39a-03",
        prompt:
          "Laquelle des réponses suivantes regroupe correctement des situations pour lesquelles un signalement obligatoire au PCC est attendu ?",
        choices: [
          "FU/FS après incident, piéton sur voie/tunnel, défauts sécurité, chantier mal protégé, feux R17/manœuvre HS",
          "Retard < 1 min",
          "Girouette",
          "Climatisation",
        ],
        correct: 0,
        explanation: "Liste non exhaustive p.56.",
      },
      {
        id: "ch3-39a-04",
        prompt:
          "À la fin de service : où doit-on retrouver ou reporter les signalements radio déjà effectués ?",
        choices: [
          "Reprise sur la feuille de route",
          "Oublier si service fini",
          "Uniquement SAT",
          "Par SMS",
        ],
        correct: 0,
        explanation: "Trace écrite feuille de route (p.56).",
      },
    ],
  },

  // ─── 3.9-B Panne phonie ───────────────────────────────────
  {
    id: "circ-39b",
    code: "3.9-B",
    title: "Communication PCC — Panne de phonie",
    cetPage: 57,
    questions: [
      {
        id: "ch3-39b-01",
        prompt:
          "Si la phonie de secours au pupitre est inopérante : comment peut-on néanmoins joindre le PCC ?",
        choices: [
          "Demander à un autre tram de prévenir le PCC, ou téléphone perso à l'arrêt",
          "Continuer sans avis",
          "FU",
          "Évacuation",
        ],
        correct: 0,
        explanation: "Relais autre rame ou GSM à l'arrêt (p.57).",
      },
      {
        id: "ch3-39b-02",
        prompt:
          "Pour utiliser son téléphone personnel afin de joindre le PCC : dans quel état la rame doit-elle se trouver ?",
        choices: [
          "Rame à l'arrêt complet uniquement",
          "En marche à 30 km/h",
          "Interdit",
          "Cabine ouverte",
        ],
        correct: 0,
        explanation: "Appel perso seulement à l'arrêt (p.57).",
      },
      {
        id: "ch3-39b-03",
        prompt:
          "Après une panne de phonie jusqu'à la fin de service : que doit-on consigner à propos de l'incident ?",
        choices: [
          "Noter l'incident sur la feuille de route",
          "Rien",
          "SAT seul",
          "Rapport interne seul",
        ],
        correct: 0,
        explanation: "Trace feuille de route (p.57).",
      },
    ],
  },

  // ─── 3.9-C Rentrée dépôt ──────────────────────────────────
  {
    id: "circ-39c",
    code: "3.9-C",
    title: "Rentrée et circulation dans le dépôt",
    cetPage: 57,
    questions: [
      {
        id: "ch3-39c-01",
        prompt:
          "Pour une rentrée au dépôt : quelle est la première démarche avant d'y circuler ?",
        choices: [
          "Demander autorisation PCC",
          "Stationner où l'on veut",
          "Dé-préparer sans avis",
          "Ouvrir les portes voyageurs",
        ],
        correct: 0,
        explanation: "Autorisation PCC avant entrée (p.57).",
      },
      {
        id: "ch3-39c-02",
        prompt:
          "À la rentrée au dépôt : comment doit être exploitée et déposée la feuille de route ainsi que la planchette selon les étapes prévues ?",
        choices: [
          "Dégâts, km, heures ; dépôt dans boîte ; planchette en salle prise de service",
          "Jetable",
          "Au PCC oral",
          "Uniquement SAT",
        ],
        correct: 0,
        explanation: "Étapes 4 à 7 p.57.",
      },
      {
        id: "ch3-39c-03",
        prompt:
          "À quelle vitesse maximale circule-t-on dans le dépôt et à combien est-on limité dans les ateliers selon les valeurs prévues ?",
        choices: [
          "10 km/h (3 km/h ateliers)",
          "40 km/h",
          "30 km/h",
          "15 km/h",
        ],
        correct: 0,
        explanation: "10 km/h dépôt, 3 km/h ateliers (p.58).",
      },
      {
        id: "ch3-39c-04",
        prompt:
          "En zone ateliers du dépôt : les conducteurs peuvent-ils y assurer la conduite des rames comme sur le reste du site ?",
        choices: [
          "Conduite non autorisée aux conducteurs",
          "Libre à 10 km/h",
          "HLP",
          "Remorquage libre",
        ],
        correct: 0,
        explanation: "Pas de conduite en ateliers (p.58).",
      },
    ],
  },

  // ─── 3.9-D Signalements écrits ────────────────────────────
  {
    id: "circ-39d",
    code: "3.9-D",
    title: "Signalements par écrit",
    cetPage: 58,
    questions: [
      {
        id: "ch3-39d-01",
        prompt:
          "À quoi sert la feuille de route du conducteur parmi les usages suivants ?",
        choices: [
          "Noter incidents du service du conducteur",
          "Uniquement km",
          "Remplacer le PCC",
          "SAT",
        ],
        correct: 0,
        explanation: "Feuille conducteur = service (p.58).",
      },
      {
        id: "ch3-39d-02",
        prompt:
          "Pour la feuille de route colorée associée à la rame : quel type d'anomalies doit-on y porter exclusivement ?",
        choices: [
          "Anomalies strictement matériel roulant / embarqué",
          "Incidents voyageurs",
          "Retards",
          "Météo",
        ],
        correct: 0,
        explanation: "Feuille rame = fonctionnement matériel (p.58).",
      },
      {
        id: "ch3-39d-03",
        prompt:
          "Pour quels motifs rédige-t-on particulièrement un rapport interne parmi les réponses suivantes ?",
        choices: [
          "Réclamations, accidents corporels/matériels, dégâts rame",
          "Pause déjeuner",
          "Girouette",
          "Nettoyage",
        ],
        correct: 0,
        explanation: "Cas listés p.58.",
      },
      {
        id: "ch3-39d-04",
        prompt:
          "Quelles sont les conditions de circulation au dépôt au regard des voyageurs, du PCC et des feux de manœuvre ?",
        choices: [
          "Sans voyageurs, sous contrôle PCC, feux manœuvre respectés",
          "Avec voyageurs autorisés",
          "Sans PCC",
          "À 40 km/h",
        ],
        correct: 0,
        explanation: "Sans client, PCC, signaux manœuvre (p.58).",
      },
    ],
  },
];
