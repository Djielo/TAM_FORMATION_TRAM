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
          "Taux d'alcoolémie maximum pour un conducteur de transport public (CET) ?",
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
          "Habilitation ligne/matériel : suspension automatique si absence de conduite commerciale depuis…",
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
        prompt: "Badge (prise de service) : quand ?",
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
        prompt: "Relève en ligne : le conducteur relèveur doit être sur place…",
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
          "Rame à relever absente à l'heure : le relèveur appelle le PCC dans un délai max de…",
        choices: ["5 minutes", "15 minutes", "1 minute", "30 minutes"],
        correct: 0,
        explanation: "Appel PCC sous 5 min après heure théorique de relève (p.39).",
      },
      {
        id: "ch3-31a-06",
        prompt: "Déplacements pour relève ou pause :",
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
        prompt: "Prise de rame au dépôt : la préparation sur remisage…",
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
        prompt: "Sortie du dépôt et mise en ligne : autorisation…",
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
        prompt: "Avant sortie dépôt : tests obligatoires…",
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
        prompt: "Test de la veille après sortie dépôt : clé KC sur…",
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
        prompt: "Balise Petrarque arrière OK : conséquence attendue ?",
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
        prompt: "Toute action de conduite (avec ou sans voyageurs) s'effectue…",
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
        prompt: "Dans la cabine, il est interdit de…",
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
        prompt: "Arrêt prolongé en ligne : le conducteur…",
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
        prompt: "Présence autorisée en cabine (hors conducteur) :",
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
        prompt: "Quitter la cabine en ligne (hors action courante) :",
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
        prompt: "Sens de marche : la conduite s'effectue…",
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
        prompt: "Marche à vue signifie notamment…",
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
        prompt: "Passage d'un sectionneur (IS) :",
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
        prompt: "Sortie de courbe : reprise de vitesse…",
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
        prompt: "Baisse de vigilance répétée :",
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
        prompt: "Le GLO (gabarit limite d'obstacle) matérialise…",
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
        prompt: "Obstacle empiétant sur la limite GLO :",
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
        prompt: "Ouverture de voie (double ou unique) : vitesse max ?",
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
        prompt: "Au terminus, le conducteur signale au PCC notamment…",
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
        prompt: "En voie double, circulation nominale…",
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
        prompt: "En voie double, le conducteur respecte notamment…",
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
        prompt: "Franchissement signal + sirène / lampes flash :",
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
        prompt: "Entrée en évitement : contrôle INDIR…",
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
        prompt: "La VUT est autorisée…",
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
        prompt: "Vitesse maximale en VUT ?",
        choices: ["30 km/h", "40 km/h", "20 km/h", "15 km/h"],
        correct: 0,
        explanation: "30 km/h max en VUT (p.45).",
      },
      {
        id: "ch3-32d-03",
        prompt: "Manœuvre au bâton pilote numéroté : avant d'entrer en VUT…",
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
        prompt: "En VUT, le gong est obligatoire…",
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
        prompt: "Retournement : définition CET ?",
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
        prompt: "Rebroussement sur même voie équivaut à…",
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
        prompt: "Communication manuelle non signalisée : retournement…",
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
          "Cas 1 (communication après station) : avant de manœuvrer l'aiguille…",
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
        prompt: "Croisement carrefour (ex. Albert 1er) en retournement :",
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
        prompt: "Vitesse max en terminus (retournement) ?",
        choices: ["15 km/h", "40 km/h", "30 km/h", "10 km/h"],
        correct: 0,
        explanation: "15 km/h en terminus (p.47).",
      },
      {
        id: "ch3-32e2-02",
        prompt: "Marche arrière (cabine opposée au sens) :",
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
        prompt: "Changement de cabine en terminus : vérifier notamment…",
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
        prompt: "Quitter la cabine hors pause/régulation :",
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
        prompt: "Rebroussement en conflit (deux rames, SM rouge…) : vitesse ?",
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
        prompt: "Rebroussement : avant de reculer, souvent…",
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
        prompt: "Rebroussement terminé : informer…",
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
        prompt: "Rebroussement après station (ex. Boirargues) : autorisation…",
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
        prompt: "HLP : vitesse de passage en station ?",
        choices: ["15 km/h", "30 km/h", "40 km/h", "10 km/h"],
        correct: 0,
        explanation: "15 km/h en station en HLP (p.49).",
      },
      {
        id: "ch3-33-02",
        prompt: "HLP en station : gong…",
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
        prompt: "En HLP, le conducteur veille aussi à…",
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
        prompt: "Feux de croisement et éclairage intérieur :",
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
        prompt: "Feux de détresse : cas obligatoire ?",
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
        prompt: "Croisement d'une rame arrêtée (autre voie) :",
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
        prompt: "Détresse HS en arrêt prolongé :",
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
        prompt: "Gong obligatoire notamment…",
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
        prompt: "Gong 7 h–22 h : aussi…",
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
        prompt: "Panne de gong :",
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
        prompt: "Mode dégradé : gong au carrefour si…",
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
        prompt: "Distance min entre rames en circulation (ligne) ?",
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
        prompt: "Deux rames arrêtées hors station : distance min ?",
        choices: ["5 m", "100 m", "2 m", "40 m"],
        correct: 0,
        explanation: "5 m hors station (p.50).",
      },
      {
        id: "ch3-36-03",
        prompt: "Deux rames arrêtées en station : distance min ?",
        choices: ["2 m", "100 m", "5 m", "15 m"],
        correct: 0,
        explanation: "2 m en station (p.50).",
      },
      {
        id: "ch3-36-04",
        prompt: "Entrée station quai double : autre rame sur quai ou voie opposée ?",
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
        prompt: "Montée/descente voyageurs :",
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
        prompt: "Vitesse entrée en station (service commercial) ?",
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
        prompt: "Point d'arrêt commercial :",
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
        prompt: "Déverrouillage des portes :",
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
        prompt: "Citadis 401 : ouverture en self au quai ?",
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
        prompt: "Délai avant fermeture (décrochage BPAL) :",
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
        prompt: "Fermeture forcée (forte affluence) :",
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
        prompt: "Citadis 401 : fermeture forcée via BPAL côté sélection…",
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
        prompt: "Terminus : régulation quai départ avec self et commutateur…",
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
        prompt: "Voie unique avec cantonnement : départ si feu manœuvre…",
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
        prompt: "Quai double, 2e position : avant reprise service…",
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
        prompt: "Corum L1V2 — 2e position d'attente :",
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
        prompt: "Après verrouillage portes, jusqu'à dégagement complet du quai :",
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
        prompt: "Tirage poignée en phase départ quai : risque…",
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
        prompt: "Après poignée : avant redépart…",
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
        prompt: "Porte défectueuse : première action ?",
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
        prompt: "Impossible de condamner : isolement « contrôle portes »…",
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
        prompt: "Incident ou retard : vis-à-vis des voyageurs…",
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
        prompt: "Utilisation du micro cabine : distance bouche…",
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
        prompt: "Interruption de service : message type invite à…",
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
        prompt: "Avant de parler au micro après connexion :",
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
        prompt: "Niveaux d'appel radio vers le PCC :",
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
        prompt: "Citadis 402 : appel détresse…",
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
        prompt: "Signalement obligatoire au PCC :",
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
        prompt: "Fin de service : signalements radio…",
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
        prompt: "Panne phonie (secours pupitre inopérant) :",
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
        prompt: "Téléphone personnel pour joindre le PCC :",
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
        prompt: "Fin de service après panne phonie :",
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
        prompt: "Rentrée au dépôt : première étape ?",
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
        prompt: "Feuille de route en rentrée :",
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
        prompt: "Circulation au dépôt : vitesse max ?",
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
        prompt: "Zone ateliers :",
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
        prompt: "Feuille de route conducteur : sert à…",
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
        prompt: "Feuille de route colorée (rame) :",
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
        prompt: "Rapport interne : particulièrement pour…",
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
        prompt: "Circulation au dépôt :",
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
