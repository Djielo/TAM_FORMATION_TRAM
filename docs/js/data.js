/**
 * CET (consignes d'exploitation tramway) TaM — EXP-CSG-01-17 · Questions texte (sans images)
 * Chaque question : id, prompt, choices[4], correct (index), explanation
 */

export const AXES = [
  {
    id: "materiel",
    num: 1,
    title: "Utilisation du matériel roulant",
    desc: "Cabine, sablières, veille automatique, modes dégradés…",
    cetPages: "3–19",
    available: false,
  },
  {
    id: "signalisation",
    num: 2,
    title: "Respect de la signalisation",
    desc: "Feux, panneaux, zones spécifiques, traversées routières…",
    cetPages: "20–37",
    available: true,
  },
  {
    id: "circulation",
    num: 3,
    title: "Consignes de circulation en ligne",
    desc: "Prise de service, VUT, portes, PCC…",
    cetPages: "38–58",
    available: false,
  },
  {
    id: "urgence",
    num: 4,
    title: "Consignes d'urgence",
    desc: "4 consignes générales, évacuation, coordinateur…",
    cetPages: "59–75",
    available: false,
  },
];

export const MODULES = {
  signalisation: [
    // Ordre = chapitrage CET (ch. 2) : 2.1 … 2.6-B (pages 20–37 du CET).

    // ─── 2.1 Franchissement des appareils de voie ─────────────
    {
      id: "sign-general",
      code: "2.1",
      title: "Franchissement des appareils de voie — Vitesses, interdictions et vérifications",
      cetPage: 21,
      questions: [
        {
          id: "sg-01",
          prompt:
            "Franchissement d'un aiguillage en voie déviée : vitesse maximum (hors cas particulier) ?",
          choices: ["10 km/h", "15 km/h", "30 km/h", "40 km/h"],
          correct: 1,
          explanation: "Voie déviée : 15 km/h (p.21).",
        },
        {
          id: "sg-02",
          prompt:
            "Franchissement d'un aiguillage en voie directe : vitesse maximum (hors cas particulier) ?",
          choices: ["15 km/h", "30 km/h", "40 km/h", "50 km/h"],
          correct: 2,
          explanation: "Voie directe : 40 km/h (p.21).",
        },
        {
          id: "sg-03",
          prompt: "Franchissement d'aiguillage au dépôt : vitesse max ?",
          choices: ["10 km/h", "15 km/h", "30 km/h", "40 km/h"],
          correct: 0,
          explanation: "Au dépôt : 10 km/h (p.21).",
        },
        {
          id: "sg-04",
          prompt:
            "Franchir un aiguillage « entrebâillé » (lames non plaquées) est :",
          choices: [
            "Autorisé à 10 km/h",
            "Formellement interdit — risque de déraillement",
            "Autorisé en marche à vue",
            "Autorisé si PCC informé",
          ],
          correct: 1,
          explanation: "Strictement interdit — risque de déraillement (p.21).",
        },
        {
          id: "sg-05",
          prompt: "Stationner sur un aiguillage est :",
          choices: [
            "Toujours autorisé",
            "Interdit sauf zone Gare Saint-Roch où les aiguilles sont sécurisées",
            "Autorisé au dépôt uniquement",
            "Autorisé si moins de 5 minutes",
          ],
          correct: 1,
          explanation: "Interdit sauf exception Gare Saint-Roch (p.21).",
        },
        {
          id: "sg-06",
          prompt: "Les appareils de voie motorisés sont :",
          choices: [
            "Toujours talonnables",
            "Non talonnables",
            "Talonnables à 15 km/h",
            "Talonnables si SM au vert",
          ],
          correct: 1,
          explanation: "Appareils motorisés non talonnables (p.21, texte rouge).",
        },
        {
          id: "sg-07",
          prompt:
            "Principe général hors zones Gare / Albert 1er / Corum : les conflits sont gérés par…",
          choices: [
            "La priorité à droite uniquement",
            "La signalisation lumineuse (marche à vue complétée par la signalisation)",
            "Le PCC en permanence",
            "L'absence de signalisation",
          ],
          correct: 1,
          explanation:
            "Marche à vue ; conflits gérés par signalisation lumineuse sauf zones spécifiques (p.21).",
        },
        {
          id: "sg-08",
          prompt:
            "Avant de franchir un aiguillage, le conducteur doit vérifier notamment :",
          choices: [
            "Uniquement le prochain arrêt client",
            "La programmation de direction, les feux/INDIR et le placage des aiguilles",
            "Seulement la pression des freins",
            "Le numéro de la rame",
          ],
          correct: 1,
          explanation: "Trois vérifications listées p.21.",
        },
      ],
    },

    // ─── 2.2 Signalisation ferroviaire lumineuse (vue d'ensemble) ─
    {
      id: "sfl-22",
      code: "2.2",
      title: "Signalisation ferroviaire lumineuse — Rappel avant les paragraphes 2.2-A à J",
      cetPage: 22,
      questions: [
        {
          id: "sfl-01",
          prompt:
            "La signalisation ferroviaire lumineuse sur équipement fixe regroupe notamment quelles familles d'indicateurs ou de feux ?",
          choices: [
            "Uniquement les signaux routiers type R17",
            "INDIR, INDES, SM, SA, SMA, lampes flash, avertisseurs sonores, feux blancs (remisage, anticipation), feu de présence tension…",
            "Seulement les panneaux TIV et les feux tricolores privés",
            "Uniquement ce qui est affiché sur l'écran conducteur",
          ],
          correct: 1,
          explanation:
            "Le volet 2.2 couvre notamment INDIR, INDES, SM, SA, SMA et les feux / alarmes associés (CET, signalisation ferroviaire lumineuse).",
        },
        {
          id: "sfl-02",
          prompt:
            "À quoi sert principalement la signalisation ferroviaire lumineuse pour le conducteur ?",
          choices: [
            "Remplacer uniquement la radio du PCC",
            "Indiquer l'itinéraire autorisé, les limitations et les protections aux points sensibles (aiguillages, cantonnement, remisage…)",
            "Afficher la liste des voyageurs",
            "Gérer uniquement la climatisation de cabine",
          ],
          correct: 1,
          explanation:
            "Elle renseigne itinéraires, protections et consignes aux points critiques, en complément des autres consignes (CET ch. 2).",
        },
        {
          id: "sfl-03",
          prompt:
            "Les feux blancs « remisage » et « anticipation » servent à :",
          choices: [
            "Contrôler uniquement la présence de voyageurs sur le quai",
            "Autoriser ou non la sortie du faisceau de remisage (remisage) et le départ depuis une station (anticipation) selon les cas décrits",
            "Remplacer tous les SM en zone gare",
            "Indiquer la couleur de la rame",
          ],
          correct: 1,
          explanation:
            "Rôle décrit dans le volet feux blancs 2.2-F / 2.2-G : gestion des mouvements en remisage et des départs lorsque le SM n'est pas visible.",
        },
      ],
    },

    // ─── 2.2-A INDIR ─────────────────────────────────────────
    {
      id: "indir",
      code: "2.2-A",
      title: "INDIR — Signal indicateur de direction",
      cetPage: 22,
      questions: [
        {
          id: "indir-01",
          prompt: "Que signifie l'acronyme INDIR ?",
          choices: [
            "Signal indicateur de destination",
            "Signal indicateur de direction",
            "Signal d'indication de remisage",
            "Signal indicateur de détresse",
          ],
          correct: 1,
          explanation: "INDIR = Signal Indicateur de Direction (CET p. 22).",
        },
        {
          id: "indir-02",
          prompt:
            "À quoi sert l'INDIR pour le conducteur ?",
          choices: [
            "Afficher la destination chiffrée ou lettre au dépôt",
            "Indiquer la position du premier aiguillage et si l'aiguille est correctement positionnée",
            "Annoncer un prochain feu de manœuvre au rouge",
            "Contrôler la présence de tension caténaire",
          ],
          correct: 1,
          explanation:
            "L'INDIR est un indicateur lumineux de position d'aiguille (CET p. 22).",
        },
        {
          id: "indir-03",
          prompt:
            "INDIR : barre horizontale allumée en rouge. Votre conduite ?",
          choices: [
            "Passage autorisé en voie directe",
            "Arrêt absolu — franchissement interdit",
            "Marche à vue à 30 km/h",
            "Passage autorisé, voie déviée",
          ],
          correct: 1,
          explanation: "Barre horizontale rouge = arrêt absolu, franchissement interdit.",
        },
        {
          id: "indir-04",
          prompt: "INDIR : barre verticale allumée en vert. Consigne ?",
          choices: [
            "Arrêt absolu — franchissement interdit",
            "Passage autorisé, itinéraire en voie directe",
            "Passage autorisé, voie déviée selon l'inclinaison",
            "Feu en panne — appeler le PCC",
          ],
          correct: 1,
          explanation: "Barre verticale verte = passage autorisé, voie directe.",
        },
        {
          id: "indir-05",
          prompt: "INDIR : barre oblique allumée en jaune. Que faire ?",
          choices: [
            "Arrêt absolu",
            "Passage autorisé, itinéraire en voie déviée à gauche ou à droite selon l'inclinaison de la barre",
            "Franchissement interdit jusqu'au PCC",
            "Passage autorisé uniquement en voie directe",
          ],
          correct: 1,
          explanation:
            "Barre oblique jaune = voie déviée ; le côté dépend de l'inclinaison de la barre (CET p. 22).",
        },
        {
          id: "indir-06",
          prompt: "INDIR éteint (feu éteint). Consigne ?",
          choices: [
            "Passage autorisé si voie libre",
            "Arrêt absolu — franchissement interdit",
            "15 km/h en zone gare",
            "Marche à vue sans limite",
          ],
          correct: 1,
          explanation:
            "Feu éteint = arrêt absolu, franchissement interdit (comme barre rouge, p.22).",
        },
        {
          id: "indir-07",
          prompt:
            "Barre horizontale rouge et feu éteint sur un INDIR : même consigne ?",
          choices: [
            "Non — le feu éteint autorise le passage",
            "Oui — arrêt absolu, franchissement interdit dans les deux cas",
            "Non — feu éteint = 30 km/h max",
            "Oui — marche à vue dans les deux cas",
          ],
          correct: 1,
          explanation: "Même signification : arrêt absolu, franchissement interdit.",
        },
        {
          id: "indir-08",
          prompt:
            "Combien d'indications distinctes l'INDIR peut-il présenter ?",
          choices: ["2", "3", "4", "6"],
          correct: 2,
          explanation:
            "Quatre cas : barre rouge, verte, oblique jaune, feu éteint (p.22).",
        },
        {
          id: "indir-09",
          prompt:
            "INDIR ou INDES éteint ou bloqué au rouge : action immédiate ?",
          choices: [
            "Passer en marche à vue",
            "Arrêt immédiat de la rame et appel au PCC",
            "Couper la traction seulement",
            "Enclencher les feux de détresse et continuer",
          ],
          correct: 1,
          explanation:
            "Encadré p.21 : tout feu éteint ou bloqué au rouge (y compris INDIR et INDES) → arrêt immédiat + appel PCC.",
        },
        {
          id: "indir-10",
          prompt:
            "L'INDIR est composé de…",
          choices: [
            "Deux feux superposés en forme de T",
            "Multipoints formant des barres de couleur variable",
            "Trois feux blancs type R17",
            "Un feu jaune de tension",
          ],
          correct: 1,
          explanation:
            "L'INDIR utilise des multipoints (barres horizontale, verticale, oblique) — pas des T (p.22).",
        },
        {
          id: "indir-11",
          prompt: "INDIR ≠ INDES : l'INDES sert à…",
          choices: [
            "Indiquer la position d'aiguille",
            "Informer le conducteur de sa destination (chiffres ou lettres)",
            "Protéger les voies uniques",
            "Signaler l'absence de tension",
          ],
          correct: 1,
          explanation:
            "INDES = indicateur de destination ; INDIR = position d'aiguille (p.22–23).",
        },
        {
          id: "indir-12",
          prompt:
            "Avant de franchir un aiguillage, le conducteur doit notamment vérifier l'INDIR. Il contrôle :",
          choices: [
            "Uniquement la vitesse au TIV",
            "L'état des feux et la position de l'INDIR ainsi que le bon placage des aiguilles",
            "Seulement le feu de traversée routière",
            "La présence tension uniquement",
          ],
          correct: 1,
          explanation:
            "Avant franchissement : direction programmée, feux/INDIR, placage des aiguilles (p.21).",
        },
      ],
    },

    
    // ─── 2.2-B INDES ──────────────────────────────────────────
    {
      id: "indes",
      code: "2.2-B",
      title: "INDES — Signal indicateur de destination",
      cetPage: 23,
      questions: [
        {
          id: "indes-01",
          prompt: "Que signifie l'acronyme INDES ?",
          choices: [
            "Signal indicateur de direction",
            "Signal indicateur de destination",
            "Signal indicateur de détresse",
            "Signal d'entrée en station",
          ],
          correct: 1,
          explanation: "INDES = Signal Indicateur de Destination (p.23).",
        },
        {
          id: "indes-02",
          prompt: "L'INDES informe le conducteur de…",
          choices: [
            "La position de l'aiguille",
            "Sa destination (un ou deux chiffres ou lettres sur multipoints)",
            "La vitesse sur le prochain TIV",
            "La priorité au feu routier",
          ],
          correct: 1,
          explanation: "Destination par chiffres ou lettres (p.23).",
        },
        {
          id: "indes-03",
          prompt: "Au dépôt, INDES « L » signifie :",
          choices: [
            "Voie unique",
            "Destination lavage",
            "Limite de manœuvre",
            "Ligne 1",
          ],
          correct: 1,
          explanation: "L = destination Lavage (p.23).",
        },
        {
          id: "indes-04",
          prompt: "Au dépôt, INDES « A » signifie :",
          choices: [
            "Arrêt absolu",
            "Destination atelier",
            "Albert 1er",
            "Anticipation",
          ],
          correct: 1,
          explanation: "A = destination Atelier (p.23).",
        },
        {
          id: "indes-05",
          prompt: "INDES « VU » en zone dépôt ou Galerie Mistral signifie :",
          choices: [
            "Voie 1",
            "Voie unique",
            "Vert — passage autorisé",
            "Vitesse unique 30 km/h",
          ],
          correct: 1,
          explanation: "VU = Voie Unique (p.23).",
        },
        {
          id: "indes-06",
          prompt: "Zone Gare Saint-Roch : INDES « AT » signifie :",
          choices: [
            "Direction Atelier",
            "En attente = Arrêt",
            "Autorisation de transit",
            "Albert 1er — retournement",
          ],
          correct: 1,
          explanation: "AT = en attente = Arrêt (p.23, tableau zone gare).",
        },
        {
          id: "indes-07",
          prompt: "Zone Gare Saint-Roch : INDES « PL » signifie :",
          choices: [
            "Pont de Lattes",
            "Passage libre",
            "Priorité à gauche",
            "Plateforme logistique",
          ],
          correct: 1,
          explanation: "PL = direction Pont de Lattes (p.23).",
        },
        {
          id: "indes-08",
          prompt: "Zone Gare Saint-Roch : INDES « XX » affiché signifie :",
          choices: [
            "Voie interdite temporaire",
            "Aiguille dé-contrôlée — appeler le PCC",
            "Passage en marche à vue",
            "Fin de ligne",
          ],
          correct: 1,
          explanation:
            "XX = aiguille dé-contrôlée, appel PCC (p.29, rappel p.23 zones).",
        },
        {
          id: "indes-09",
          prompt:
            "INDES en position d'attente à la zone Gare : quelle indication ?",
          choices: ["PL", "RO", "AT", "MA"],
          correct: 2,
          explanation:
            "Arrêt à l'INDES en position d'attente = AT (p.29, étape 1).",
        },
        {
          id: "indes-10",
          prompt:
            "Deux voyants verts ou un vert et un rouge simultanément sur INDES :",
          choices: [
            "Passage autorisé",
            "Anomalie — appeler le PCC",
            "Ralentir à 15 km/h",
            "Couper la traction",
          ],
          correct: 1,
          explanation: "Anomalie d'affichage → appel PCC (p.29).",
        },
      ],
    },

    
    // ─── 2.2-C SM ─────────────────────────────────────────────
    {
      id: "sm",
      code: "2.2-C",
      title: "SM — Signal de manœuvre",
      cetPage: 23,
      questions: [
        {
          id: "sm-01",
          prompt: "Que signifie l'acronyme SM ?",
          choices: [
            "Signal de maintenance",
            "Signal (ou feu) de manœuvre",
            "Signal de marche à vue",
            "Signal de manœuvre et d'avertissement",
          ],
          correct: 1,
          explanation: "SM = Signal (ou feu) de Manœuvre (CET p. 23).",
        },
        {
          id: "sm-02",
          prompt: "Le SM est composé de combien de feux superposés ?",
          choices: ["1", "2", "3", "4"],
          correct: 1,
          explanation: "Deux feux superposés : T rouge en haut, T vert en bas (p.23).",
        },
        {
          id: "sm-03",
          prompt: "SM : T rouge (feu du haut) allumé. Consigne ?",
          choices: [
            "Franchissement autorisé",
            "Arrêt obligatoire — franchissement interdit",
            "Marche à vue à 30 km/h",
            "Passage autorisé en voie déviée",
          ],
          correct: 1,
          explanation: "T rouge = arrêt obligatoire, franchissement interdit.",
        },
        {
          id: "sm-04",
          prompt: "SM : T vert (feu du bas) allumé. Consigne ?",
          choices: [
            "Arrêt obligatoire",
            "Franchissement autorisé",
            "Arrêt absolu",
            "Prochain SM au rouge — marche à vue",
          ],
          correct: 1,
          explanation: "T vert = franchissement autorisé (p.23).",
        },
        {
          id: "sm-05",
          prompt:
            "Le SM protège les mouvements notamment aux aiguillages, remisage, retournement. Il doit être :",
          choices: [
            "Respecté sauf urgence personnelle",
            "Respecté strictement sauf consigne contraire du PCC ou agent habilité",
            "Contourné si la voie est visible",
            "Ignoré en voie unique",
          ],
          correct: 1,
          explanation:
            "Respect strict du SM sauf consigne PCC ou agent de maîtrise habilité (p.23).",
        },
        {
          id: "sm-06",
          prompt:
            "Cantonnement : le SM au rouge en entrée de canton déjà occupé (ex. Galerie Mistral, VU) signifie :",
          choices: [
            "Passage à 15 km/h",
            "Arrêt obligatoire — franchissement interdit",
            "Marche à vue sans limite",
            "Franchissement autorisé si retard",
          ],
          correct: 1,
          explanation:
            "Même signification que T rouge : arrêt obligatoire, franchissement interdit (p.23).",
        },
        {
          id: "sm-07",
          prompt: "SM ≠ SA : le SA annonce surtout…",
          choices: [
            "Un arrêt absolu immédiat",
            "Un prochain feu de manœuvre au rouge — passage en marche à vue",
            "La destination au dépôt",
            "L'absence de tension",
          ],
          correct: 1,
          explanation:
            "SA = avertissement (T orange) ; SM = arrêt ou passage (T rouge/vert) — p.23–24.",
        },
        {
          id: "sm-08",
          prompt: "SM ≠ SMA : le SMA a…",
          choices: [
            "Un seul feu blanc",
            "Trois feux superposés (T rouge, T orange, T vert)",
            "Des barres multipoints comme l'INDIR",
            "Un losange et un point d'exclamation",
          ],
          correct: 1,
          explanation: "SMA = 3 feux ; SM = 2 feux (p.23–24).",
        },
        {
          id: "sm-09",
          prompt:
            "Lampe flash déclenchée au franchissement d'un SM en voie unique (p.25) : signification pour le conducteur ?",
          choices: [
            "Accélérer pour libérer le canton",
            "Franchissement non autorisé ou rame adverse — arrêt immédiat (FU), détresse, appel PCC",
            "Passage autorisé à 40 km/h",
            "Feu de tension en panne",
          ],
          correct: 1,
          explanation:
            "Alarme = franchissement SM non autorisé ou rame en sens inverse — arrêt immédiat FU (p.25).",
        },
        {
          id: "sm-10",
          prompt:
            "Zone Léon Blum : lampe flash à côté du SA quand le SM suivant est rouge. Consigne ?",
          choices: [
            "Arrêt immédiat FU",
            "Ralentir avant de s'arrêter au SM",
            "Passer sans s'arrêter",
            "Couper la traction",
          ],
          correct: 1,
          explanation:
            "Cas particulier p.25 : ralentir avant l'arrêt au SM (pas FU immédiat comme en VU classique).",
        },
      ],
    },

    
    // ─── 2.2-D SA ─────────────────────────────────────────────
    {
      id: "sa",
      code: "2.2-D",
      title: "SA — Signal d'avertissement",
      cetPage: 24,
      questions: [
        {
          id: "sa-01",
          prompt: "Que signifie l'acronyme SA ?",
          choices: [
            "Signal d'arrêt",
            "Signal d'avertissement",
            "Signal d'anticipation",
            "Signal d'aiguillage",
          ],
          correct: 1,
          explanation: "SA = Signal d'Avertissement (p.24).",
        },
        {
          id: "sa-02",
          prompt: "Le SA comporte combien de feux superposés ?",
          choices: ["1", "2", "3", "4"],
          correct: 1,
          explanation: "Deux feux : T orange en haut, T vert en bas (p.24).",
        },
        {
          id: "sa-03",
          prompt: "SA : T orange (haut) allumé. Signification ?",
          choices: [
            "Arrêt absolu",
            "Prochain feu de manœuvre au rouge — franchissement autorisé en marche à vue",
            "Franchissement interdit",
            "Rame à quai sur le canton",
          ],
          correct: 1,
          explanation:
            "T orange = prochain FM au rouge, passage autorisé en marche à vue (p.24).",
        },
        {
          id: "sa-04",
          prompt: "SA : T vert (bas) allumé. Consigne ?",
          choices: [
            "Arrêt absolu",
            "Franchissement autorisé",
            "30 km/h obligatoire",
            "Appel PCC obligatoire avant de passer",
          ],
          correct: 1,
          explanation: "T vert = franchissement autorisé (p.24).",
        },
        {
          id: "sa-05",
          prompt: "SA en panne. Que faites-vous ?",
          choices: [
            "Franchir prudemment",
            "Prévenir le PCC",
            "Arrêt absolu sans appel",
            "Marche à vue à 10 km/h",
          ],
          correct: 1,
          explanation: "Feu en panne → prévenir le PCC (p.24, texte en rouge).",
        },
        {
          id: "sa-06",
          prompt:
            "T orange allumé sur SA ou SMA : vitesses maximum indiquées (encadré jaune p.24) ?",
          choices: [
            "50 km/h puis 40 km/h",
            "30 km/h — et 15 km/h en entrée de station si une autre rame est présente",
            "10 km/h partout",
            "40 km/h en permanence",
          ],
          correct: 1,
          explanation: "30 km/h, ou 15 km/h en entrée de station si autre rame (p.24).",
        },
        {
          id: "sa-07",
          prompt: "SA ≠ SMA : principale différence de structure ?",
          choices: [
            "Le SA a 3 feux, le SMA 2",
            "Le SA a 2 feux, le SMA 3 (avec T orange fixe ou clignotant au milieu)",
            "Le SA utilise des barres, le SMA des T",
            "Aucune différence",
          ],
          correct: 1,
          explanation: "SA = 2 feux ; SMA = 3 feux dont T orange fixe/clignotant (p.24).",
        },
        {
          id: "sa-08",
          prompt:
            "Sur un SA, le T orange signifie que le prochain signal est…",
          choices: [
            "Au vert",
            "De manœuvre au rouge (FM au rouge)",
            "Éteint",
            "De tension clignotant",
          ],
          correct: 1,
          explanation: "Prochain feu de manœuvre au rouge (p.24).",
        },
        {
          id: "sa-09",
          prompt:
            "Le SM au rouge et le SA au T orange imposent tous deux un arrêt immédiat sans MAV ?",
          choices: [
            "Oui pour les deux",
            "Non — le SM rouge impose l'arrêt ; le SA orange autorise le passage en marche à vue",
            "Non — les deux autorisent le passage",
            "Oui — marche à vue pour les deux",
          ],
          correct: 1,
          explanation:
            "SM rouge = arrêt obligatoire ; SA orange = passage autorisé en MAV (p.23–24).",
        },
      ],
    },

    
    // ─── 2.2-E SMA ────────────────────────────────────────────
    {
      id: "sma",
      code: "2.2-E",
      title: "SMA — Signal de manœuvre et d'avertissement",
      cetPage: 24,
      questions: [
        {
          id: "sma-01",
          prompt: "Que signifie l'acronyme SMA ?",
          choices: [
            "Signal de manœuvre avancé",
            "Signal de manœuvre et d'avertissement",
            "Signal de marche automatique",
            "Signal de mise en attente",
          ],
          correct: 1,
          explanation: "SMA = Signal de Manœuvre et d'Avertissement (p.24).",
        },
        {
          id: "sma-02",
          prompt: "Le SMA comporte combien de feux superposés ?",
          choices: ["2", "3", "4", "5"],
          correct: 1,
          explanation: "Trois feux : T rouge, T orange (milieu), T vert (bas) — p.24.",
        },
        {
          id: "sma-03",
          prompt: "SMA : T rouge (haut) allumé. Consigne ?",
          choices: [
            "Franchissement autorisé en MAV",
            "Arrêt absolu",
            "30 km/h",
            "Marche à vue — rame à quai",
          ],
          correct: 1,
          explanation: "T rouge = arrêt absolu (p.24).",
        },
        {
          id: "sma-04",
          prompt: "SMA : T orange fixe (milieu) allumé. Que indique-t-il ?",
          choices: [
            "Rame à quai obligatoirement",
            "Franchissement autorisé en MAV — prochain signal de manœuvre au rouge",
            "Arrêt absolu",
            "Feu en panne",
          ],
          correct: 1,
          explanation:
            "T orange fixe = MAV, prochain SM au rouge (p.24).",
        },
        {
          id: "sma-05",
          prompt: "SMA : T orange clignotant (milieu). Que indique-t-il ?",
          choices: [
            "Prochain SM au rouge seulement",
            "Rame à quai ou occupation du canton / interface — franchissement autorisé en MAV",
            "Arrêt absolu",
            "Priorité routière perdue",
          ],
          correct: 1,
          explanation:
            "T orange clignotant = présence rame à quai ou occupation interface JP/Cemh (p.24).",
        },
        {
          id: "sma-06",
          prompt: "SMA : T vert (bas) allumé. Consigne ?",
          choices: [
            "Arrêt absolu",
            "Franchissement autorisé",
            "FU immédiat",
            "10 km/h au carrefour",
          ],
          correct: 1,
          explanation: "T vert = franchissement autorisé (p.24).",
        },
        {
          id: "sma-07",
          prompt:
            "T orange fixe vs T orange clignotant sur SMA : quelle différence ?",
          choices: [
            "Aucune — même vitesse et même sens",
            "Fixe = prochain SM rouge ; clignotant = rame à quai ou canton occupé",
            "Fixe = arrêt ; clignotant = passage libre",
            "Fixe = 10 km/h ; clignotant = 40 km/h",
          ],
          correct: 1,
          explanation: "Distinction explicite p.24 entre les deux aspects orange.",
        },
        {
          id: "sma-08",
          prompt:
            "T orange (fixe ou clignotant) sur SMA : vitesses max ?",
          choices: [
            "40 km/h puis 20 km/h",
            "30 km/h — 15 km/h en entrée de station si autre rame",
            "10 km/h partout",
            "Vitesse libre en MAV",
          ],
          correct: 1,
          explanation: "Encadré jaune p.24 (identique logique SA/SMA).",
        },
        {
          id: "sma-09",
          prompt:
            "Le SMA combine les fonctions de quel(s) autre(s) signal(s) ?",
          choices: [
            "INDIR uniquement",
            "SM (manœuvre) et SA (avertissement) — 3 feux type tricolore avec T",
            "Feu R17 uniquement",
            "TIV et INDIR",
          ],
          correct: 1,
          explanation:
            "3 feux empilés : arrêt (rouge), avertissement (orange), passage (vert) — p.24.",
        },
        {
          id: "sma-10",
          prompt:
            "SMA au T rouge : même consigne qu'un SM au T rouge ?",
          choices: [
            "Non — le SMA autorise toujours le passage",
            "Oui — arrêt (absolu pour SMA, obligatoire pour SM) — franchissement interdit",
            "Non — le SM impose 30 km/h",
            "Oui — marche à vue pour les deux",
          ],
          correct: 1,
          explanation:
            "Les deux imposent l'arrêt et l'interdiction de franchir ; SMA = « arrêt absolu » (p.23–24).",
        },
        {
          id: "sma-11",
          prompt:
            "Clignotement lent du losange au carrefour (p.27) : le conducteur peut devoir attendre le SM au vert. Cela concerne la cohérence avec :",
          choices: [
            "Le feu de tension",
            "La signalisation de manœuvre (SM) en cohérence avec le SIG",
            "Le TIV uniquement",
            "L'INDES en position AT",
          ],
          correct: 1,
          explanation:
            "Losange lent = attente SM au vert pour cohérence avec le signal carrefour (p.27).",
        },
      ],
    },

    
    // ─── 2.2 F-G Feux blancs ──────────────────────────────────
    {
      id: "feux-blancs",
      code: "2.2-F/G",
      title: "Feux blancs — Remisage & anticipation",
      cetPage: 24,
      questions: [
        {
          id: "fb-01",
          prompt:
            "Feu blanc de sortie de remisage allumé : consigne ?",
          choices: [
            "Arrêt absolu",
            "Franchissement autorisé",
            "Marche à vue 30 km/h",
            "Appel PCC",
          ],
          correct: 1,
          explanation: "Feu blanc allumé = franchissement autorisé (p.24-F).",
        },
        {
          id: "fb-02",
          prompt: "Feu blanc de sortie de remisage éteint :",
          choices: [
            "Franchissement autorisé prudemment",
            "Franchissement interdit",
            "10 km/h",
            "FU puis appel PCC",
          ],
          correct: 1,
          explanation: "Feu éteint = franchissement interdit (p.24-F).",
        },
        {
          id: "fb-03",
          prompt:
            "Où se trouve en général le feu blanc de sortie de remisage ?",
          choices: [
            "En entrée de station voyageurs",
            "À la sortie du faisceau de remisage",
            "Sur chaque carrefour R17",
            "Sur les TIV",
          ],
          correct: 1,
          explanation: "Généralement en sortie de faisceau de remisage (p.24-F).",
        },
        {
          id: "fb-04",
          prompt: "Le feu blanc d'anticipation sert à :",
          choices: [
            "Signaler l'absence de tension",
            "Autoriser le départ lorsque le SM ou l'INDIR n'est pas visible du quai",
            "Remplacer le SA",
            "Indiquer la fin de ligne",
          ],
          correct: 1,
          explanation:
            "Autorise le départ si SM/INDIR non visible depuis le quai (ex. Place de l'Europe) — p.24-G.",
        },
        {
          id: "fb-05",
          prompt:
            "Le feu blanc d'anticipation est implanté :",
          choices: [
            "Sur toute la ligne",
            "Uniquement en station, quand le signal principal n'est pas visible du quai de départ",
            "Au dépôt uniquement",
            "En tunnel uniquement",
          ],
          correct: 1,
          explanation: "Uniquement en station dans ce cas (p.24-G).",
        },
        {
          id: "fb-06",
          prompt:
            "Feu blanc de remisage ≠ feu d'anticipation : le remisage concerne…",
          choices: [
            "Le départ quand le SM n'est pas visible",
            "La sortie du faisceau de remisage",
            "La traversée routière",
            "La zone gare AT",
          ],
          correct: 1,
          explanation: "Remisage = sortie faisceau ; anticipation = départ en station (p.24).",
        },
      ],
    },

    
    // ─── 2.2 H-I Lampe flash & tension ───────────────────────
    {
      id: "lampe-tension",
      code: "2.2-H/I",
      title: "Lampe flash, avertisseur & feu de tension",
      cetPage: 25,
      questions: [
        {
          id: "lt-01",
          prompt:
            "Lampe flash + avertisseur sonore en voie unique : déclenchés si…",
          choices: [
            "Le TIV est à 10",
            "Franchissement du SM d'entrée de VU non autorisé ou rame sens inverse",
            "L'INDIR est au vert",
            "Le feu R17 est vertical",
          ],
          correct: 1,
          explanation: "Détection franchissement SM ou rame adverse en VU (p.25-H).",
        },
        {
          id: "lt-02",
          prompt:
            "Lampe flash qui s'allume en VU (hors cas Léon Blum) : conduite à tenir ?",
          choices: [
            "Ralentir à 30 km/h",
            "Arrêt immédiat (FU), feux de détresse, appel PCC et attendre consignes",
            "Passer si voie visible",
            "Sonner et passer",
          ],
          correct: 1,
          explanation: "Arrêt immédiat FU, détresse, appel PCC (encadré p.25).",
        },
        {
          id: "lt-03",
          prompt:
            "Galerie Mistral en VU : sirène et lampe flash = ",
          choices: [
            "Ralentir au SM",
            "Arrêt immédiat (FU) — comme L2/L3",
            "40 km/h",
            "Pas d'action",
          ],
          correct: 1,
          explanation: "Même sens que voies uniques classiques : FU immédiat (p.25).",
        },
        {
          id: "lt-04",
          prompt:
            "Feu de présence tension : feu jaune fixe allumé signifie :",
          choices: [
            "Absence de tension — arrêt absolu",
            "Tension présente — circulation autorisée",
            "Feu en panne",
            "Marche à vue",
          ],
          correct: 1,
          explanation: "Feu allumé = tension présente, circulation autorisée (p.25-I).",
        },
        {
          id: "lt-05",
          prompt: "Feu de présence tension : feu clignotant signifie :",
          choices: [
            "Tension présente",
            "Absence de tension — arrêt absolu",
            "Passage à 30 km/h",
            "Prévenir le PCC sans arrêt",
          ],
          correct: 1,
          explanation: "Feu clignotant = absence de tension, arrêt absolu (p.25-I).",
        },
        {
          id: "lt-06",
          prompt: "Feu de présence tension : feu éteint signifie :",
          choices: [
            "Circulation autorisée",
            "Feu en panne — arrêt absolu et appel PCC",
            "Voie déviée",
            "10 km/h",
          ],
          correct: 1,
          explanation: "Feu éteint = panne, arrêt absolu + PCC (p.25-I).",
        },
        {
          id: "lt-07",
          prompt:
            "Où est placé le feu de présence tension ?",
          choices: [
            "Au sol dans la cabine",
            "À hauteur de la ligne aérienne avant les points de sectionnement",
            "Sur le pare-brise",
            "Au centre du carrefour",
          ],
          correct: 1,
          explanation: "Suspendu à hauteur LAC avant sectionnement (p.25-I).",
        },
        {
          id: "lt-08",
          prompt:
            "Lampe flash peut renforcer un INDIR à barre horizontale rouge en VU. Cela signifie :",
          choices: [
            "Passage autorisé",
            "Renforcement du signal fermé — même vigilance qu'INDIR fermé",
            "Priorité routière",
            "Tension coupée",
          ],
          correct: 1,
          explanation: "Renfort si INDIR barre rouge (p.25, cas VU).",
        },
      ],
    },

    
    // ─── 2.2-J Traversée routière R17 ─────────────────────────
    {
      id: "traversee-r17",
      code: "2.2-J",
      title: "Traversée routière — R17 & pré-signalisation",
      cetPage: "26–27",
      questions: [
        {
          id: "tr-01",
          prompt:
            "Signal de traversée routière type R17 : barre verticale blanche = ",
          choices: [
            "Franchissement interdit",
            "Franchissement autorisé",
            "Avertissement avant barre horizontale",
            "Panne — appeler PCC",
          ],
          correct: 1,
          explanation: "Barre verticale = franchissement autorisé (p.27).",
        },
        {
          id: "tr-02",
          prompt: "R17 : barre horizontale blanche = ",
          choices: [
            "Franchissement autorisé",
            "Franchissement interdit",
            "30 km/h",
            "Marche à vue illimitée",
          ],
          correct: 1,
          explanation: "Barre horizontale = franchissement interdit (p.27).",
        },
        {
          id: "tr-03",
          prompt: "R17 : disque central allumé signifie :",
          choices: [
            "Passage autorisé",
            "Avertissement avant passage à la barre horizontale",
            "Arrêt définitif",
            "Priorité absolue",
          ],
          correct: 1,
          explanation: "Disque = avertissement avant barre horizontale (p.27).",
        },
        {
          id: "tr-04",
          prompt:
            "Pré-signalisation (losange orange sous R17) : losange éteint = ",
          choices: [
            "Détection active",
            "Système de détection hors service ou ampoule grillée",
            "Passage dans 3 secondes",
            "Priorité garantie",
          ],
          correct: 1,
          explanation: "Losange éteint = détection HS ou ampoule grillée (p.26).",
        },
        {
          id: "tr-05",
          prompt:
            "Losange allumé fixe + point d'exclamation qui clignote :",
          choices: [
            "Arrêt définitif",
            "Tram détecté — changement de phase du carrefour dans 3 s ou plus",
            "Feu en panne",
            "Passage à 40 km/h",
          ],
          correct: 1,
          explanation:
            "Point d'exclamation clignotant = détection, phase dans ≥3 s (p.26).",
        },
        {
          id: "tr-06",
          prompt:
            "Avant le carrefour : manipulateur en neutre ou pré-freinage pour…",
          choices: [
            "Économiser l'énergie",
            "Pouvoir traiter une urgence",
            "Désactiver le SA",
            "Éviter l'appel PCC",
          ],
          correct: 1,
          explanation:
            "Neutre ou pré-freinage pour urgence (p.27, b signalisation carrefour).",
        },
        {
          id: "tr-07",
          prompt:
            "Pas d'indication de détection (losange) : le conducteur doit…",
          choices: [
            "Passer sans ralentir",
            "Approcher à vitesse permettant un arrêt normal si barre reste horizontale",
            "Appeler le PCC systématiquement",
            "FU à l'approche",
          ],
          correct: 1,
          explanation:
            "Approche modérée pour pouvoir s'arrêter si barre horizonte (p.26).",
        },
        {
          id: "tr-08",
          prompt:
            "En dérangement, le disque central du R17 peut :",
          choices: [
            "Rester éteint uniquement",
            "Clignoter (voir aussi chapitre panne p.28)",
            "Devenir vert",
            "Afficher un T orange",
          ],
          correct: 1,
          explanation: "Disque peut clignoter en dérangement (p.27).",
        },
        {
          id: "tr-09",
          prompt:
            "Les feux du signal R17 sont de couleur :",
          choices: [
            "Rouge orange vert",
            "Blancs",
            "Jaunes",
            "Bleus",
          ],
          correct: 1,
          explanation: "Trois feux blancs (p.27).",
        },
      ],
    },

    
    // ─── 2.3 Panne signalisation lumineuse routière ────────────
    {
      id: "panne-r17",
      code: "2.3",
      title:
        "Consignes en cas de panne de la signalisation lumineuse routière — Appel PCC, franchissement et vitesses",
      cetPage: 28,
      questions: [
        {
          id: "pr-01",
          prompt:
            "Panne du feu type R17 (signalisation routière) : première action ?",
          choices: [
            "Franchir à 40 km/h",
            "Appeler le PCC",
            "Couper la traction",
            "Priorité à droite sans appel",
          ],
          correct: 1,
          explanation: "Panne R17 → appeler le PCC (p.28).",
        },
        {
          id: "pr-02",
          prompt:
            "Si le PCC autorise à franchir avec les 3 feux éteints ou disque central clignotant : vitesse au carrefour ?",
          choices: ["30 km/h", "20 km/h", "10 km/h", "40 km/h"],
          correct: 2,
          explanation: "Franchir à 10 km/h max (p.28).",
        },
        {
          id: "pr-03",
          prompt:
            "Franchissement autorisé par PCC en panne R17 : actions obligatoires ?",
          choices: [
            "Accélérer pour libérer",
            "Code de la route (priorité à droite), gong + feux de détresse, 10 km/h",
            "FU immédiat",
            "Feux de détresse seuls",
          ],
          correct: 1,
          explanation: "Priorité à droite, gong, détresse, 10 km/h (p.28).",
        },
        {
          id: "pr-04",
          prompt:
            "Franchir un signal fermé (barre horizontale) sans agents TaM/Police sur place :",
          choices: [
            "Autorisé si PCC dit oui",
            "En principe non — sauf configurations simples sans risque, à appréciation conducteur après accord PCC",
            "Toujours autorisé à 10 km/h",
            "Interdit sans exception",
          ],
          correct: 1,
          explanation:
            "Barre horizontale fermée : pas d'autorisation PCC sauf agents sur place, sauf cas simples (p.28).",
        },
        {
          id: "pr-05",
          prompt:
            "Exemple de configuration « simple » citée p.28 pour dérogation possible :",
          choices: [
            "Carrefour complexe en centre-ville",
            "Voies uniques ne croisant rien après le quai",
            "Zone gare",
            "Tunnel Mistral",
          ],
          correct: 1,
          explanation: "Ex. voies uniques sans croisement après le quai (p.28).",
        },
      ],
    },

    // ─── 2.4 Zones spécifiques (réseau Montpellier) ──────────
    {
      id: "zones-specifiques",
      code: "2.4",
      title:
        "Zones spécifiques — Gare Saint-Roch, place Albert 1er, Corum",
      cetPage: 21,
      questions: [
        {
          id: "zs-01",
          prompt:
            "Quelles zones du réseau Montpellier sont qualifiées de zones spécifiques dans le document ?",
          choices: [
            "Le dépôt et le poste de retournement uniquement",
            "Zone Gare Saint-Roch, place Albert 1er et Corum",
            "Uniquement les terminus de ligne",
            "Tout le centre-ville au-delà de la ligne 1",
          ],
          correct: 1,
          explanation:
            "Le CET distingue ces trois zones spécifiques ; les règles y sont détaillées pour la cohabitation des rames (voir p.21 et zones dédiées).",
        },
        {
          id: "zs-02",
          prompt:
            "Comparé au reste du réseau, l'intérêt de repérer ces zones spécifiques pour un conducteur, c'est surtout :",
          choices: [
            "Qu'il n'y ait plus aucun feu à respecter",
            "D'appliquer les consignes locales (priorités, procédures) propres à ces secteurs et de ne pas généraliser bêtement une règle « hors zone »",
            "De rouler toujours à 40 km/h",
            "D'éteindre toute signalisation embarquée",
          ],
          correct: 1,
          explanation:
            "Chaque zone spécifique a des règles à suivre (Gare détaillée en 2.4.1, etc.) ; les mélanger avec le régime général serait une erreur.",
        },
      ],
    },

    // ─── 2.4.1 Zone Gare Saint-Roch ───────────────────────────
    {
      id: "zone-gare",
      code: "2.4.1",
      title:
        "Zone Gare Saint-Roch (2.4.1) — Priorités, INDES et étapes de procédure",
      cetPage: 29,
      questions: [
        {
          id: "zg-01",
          prompt:
            "En zone Gare Saint-Roch : vitesse maximum ?",
          choices: ["15 km/h", "10 km/h", "30 km/h", "40 km/h"],
          correct: 1,
          explanation: "Zone gare : 10 km/h (p.29).",
        },
        {
          id: "zg-02",
          prompt:
            "En zone Gare : principe de priorité entre rames ?",
          choices: [
            "Priorité à gauche",
            "Priorité systématique à la rame venant de droite",
            "Priorité au PCC",
            "Premier arrivé",
          ],
          correct: 1,
          explanation: "Priorité à la rame venant de droite (p.29).",
        },
        {
          id: "zg-03",
          prompt:
            "Étape 1 zone gare : où s'arrêter en position d'attente ?",
          choices: [
            "Au SM",
            "À l'INDES en position AT",
            "Au TIV",
            "Au feu R17",
          ],
          correct: 1,
          explanation: "Arrêt à l'INDES position attente = AT (p.29).",
        },
        {
          id: "zg-04",
          prompt:
            "Après programmation destination : vérifier que le voyant vert correspond…",
          choices: [
            "Au prochain arrêt client",
            "À l'itinéraire commandé (ex. PL si direction Pont de Lattes)",
            "Au numéro de parc",
            "Au feu blanc uniquement",
          ],
          correct: 1,
          explanation: "Cohérence voyant vert / itinéraire commandé (p.29).",
        },
        {
          id: "zg-05",
          prompt:
            "Rame arrivant par la droite en zone gare : vous devez…",
          choices: [
            "Passer en priorité",
            "Vous arrêter au PLP (point limite de priorité)",
            "Accélérer",
            "Appeler le PCC systématiquement",
          ],
          correct: 1,
          explanation: "Rame de droite → arrêt au PLP (p.29, étape 5a).",
        },
        {
          id: "zg-06",
          prompt:
            "Destination programmée différente de la destination habituelle de la ligne :",
          choices: [
            "Rien de particulier",
            "Activer les feux de détresse pour alerter les autres conducteurs",
            "Couper le SA",
            "Passer à 40 km/h",
          ],
          correct: 1,
          explanation: "Feux de détresse si destination atypique (encadré p.29).",
        },
        {
          id: "zg-07",
          prompt:
            "Zone gare : les consignes s'appliquent-elles s'il n'y a pas d'autre rame ?",
          choices: [
            "Non — seulement si trafic dense",
            "Oui — point par point même sans autre rame",
            "Non — marche à vue libre",
            "Uniquement la nuit",
          ],
          correct: 1,
          explanation: "Consignes à suivre même sans autre rame (p.29).",
        },
        {
          id: "zg-08",
          prompt:
            "Organigramme Gare / Albert 1er : la zone est vide — après engagement destination ?",
          choices: [
            "Appeler le PCC avant toute reprise",
            "Reprise destination sans autre formalité",
            "Attendre 2 minutes",
            "Passer à 40 km/h",
          ],
          correct: 1,
          explanation: "Si la zone est vide : enchaînement vers reprise destination (schéma p.30).",
        },
        {
          id: "zg-09",
          prompt:
            "Présence d'une rame à droite et vous n'avez pas engagé le PLP : conduite à tenir ?",
          choices: [
            "Forcer le passage à 10 km/h",
            "Arrêt absolu, laisser le passage, puis reprise destination",
            "Klaxonner et passer",
            "Priorité à gauche",
          ],
          correct: 1,
          explanation:
            "Sans engagement PLP avec présence à droite : arrêt absolu, laisser passer (p.30).",
        },
        {
          id: "zg-10",
          prompt:
            "Vous avez engagé le PLP ; l'autre rame est engagée (PLG) : conduite à tenir ?",
          choices: [
            "Continuer en marche à vue",
            "Arrêt absolu, appel PCC, puis reprise selon consignes",
            "Reculer sans avis",
            "Passer en priorité à droite systématiquement",
          ],
          correct: 1,
          explanation: "Conflit d'engagement : arrêt absolu et appel PCC (chemins p.30).",
        },
      ],
    },

    // ─── 2.4.2 Zone Albert 1er ────────────────────────────────
    {
      id: "zone-albert",
      code: "2.4.2",
      title: "Zone place Albert 1er (2.4.2) — Vitesses, codes et télécommandes",
      cetPage: 31,
      questions: [
        {
          id: "za-01",
          prompt:
            "Zone Albert 1er : vitesse maximale à partir du TIV « 10 » ?",
          choices: ["15 km/h", "10 km/h", "30 km/h", "40 km/h"],
          correct: 1,
          explanation: "Limitation à 10 km/h dès le TIV 10 (p.31).",
        },
        {
          id: "za-02",
          prompt:
            "En zone Albert 1er, la priorité entre rames va en principe à…",
          choices: [
            "La rame venant de gauche",
            "La rame venant de droite",
            "Le PCC exclusivement",
            "La rame la plus longue",
          ],
          correct: 1,
          explanation: "Priorité systématique à la rame venant de droite (p.31).",
        },
        {
          id: "za-03",
          prompt:
            "Zone Albert 1er : les points 1 à 5b de l'article 2.4.1 (zone gare)…",
          choices: [
            "Ne s'appliquent pas",
            "S'appliquent également (marche à vue, procédures)",
            "Remplacent entièrement la signalisation lumineuse",
            "Valent uniquement la nuit",
          ],
          correct: 1,
          explanation:
            "Renvoi explicite aux procédures 2.4.1 points 1-2-3-4-5a-5b (p.31).",
        },
        {
          id: "za-04",
          prompt:
            "Code destination SC en zone Albert 1er signifie ?",
          choices: [
            "Direction Sablassou",
            "Direction Albert 1er — Saint-Éloi (Saint-Charles)",
            "Direction Comédie",
            "Arrêt absolu",
          ],
          correct: 1,
          explanation: "SC = direction Albert 1er — Saint-Éloi (p.31, tableau des codes).",
        },
        {
          id: "za-05",
          prompt:
            "Code LB à Albert 1er : direction ?",
          choices: [
            "Louis Blanc — Corum",
            "Les Aubes",
            "Observatoire",
            "Pont de Lattes",
          ],
          correct: 0,
          explanation: "LB = direction Louis Blanc — Corum (p.31).",
        },
        {
          id: "za-06",
          prompt:
            "Pour les repères PLP et PLG en zone Albert 1er ?",
          choices: [
            "Règles différentes de la gare (priorité inversée)",
            "Idem zone Gare Saint-Roch",
            "Pas de PLP / PLG",
            "Uniquement en manœuvre de remisage",
          ],
          correct: 1,
          explanation: "« Idem Gare » pour PLP et PLG au tableau p.31.",
        },
      ],
    },

    // ─── 2.4.3 Zone Corum ─────────────────────────────────────
    {
      id: "zone-corum",
      code: "2.4.3",
      title:
        "Zone Corum (2.4.3) — Codes, quai L1V2, rames longues et sécurisation croisements",
      cetPage: 32,
      questions: [
        {
          id: "zc-01",
          prompt:
            "Zone Corum : vitesse à partir du TIV « 10 » et principe de priorité ?",
          choices: [
            "40 km/h, priorité à gauche",
            "10 km/h, priorité à la rame venant de droite",
            "30 km/h, premier arrivé",
            "15 km/h, priorité PCC",
          ],
          correct: 1,
          explanation: "Comme les autres zones spécifiques : 10 km/h et priorité à droite (p.32).",
        },
        {
          id: "zc-02",
          prompt:
            "Code CO en zone Corum : direction ?",
          choices: ["Comédie", "Louis Blanc", "Les Aubes", "Sablassou"],
          correct: 0,
          explanation: "CO = direction Comédie (p.32).",
        },
        {
          id: "zc-03",
          prompt:
            "La position d'attente avant le quai Corum L1V2 sert à…",
          choices: [
            "Effectuer l'échange voyageurs sur tout le long de la rame",
            "Dégager au plus vite le croisement L1 / L2 / L4 — sans échange voyageurs (quai courbe)",
            "Stationner pour la pause conducteur",
            "Remplacer l'INDES",
          ],
          correct: 1,
          explanation:
            "Fluidifier le carrefour ; interdit pour montée/descente (géométrie du quai, p.32).",
        },
        {
          id: "zc-04",
          prompt:
            "Depuis Les Aubes vers Corum L1V2 : rame de 40 m ou plus, accès parfois retardé par la signalisation pour…",
          choices: [
            "Augmenter la cadence commerciale",
            "Garantir l'accès quai sans s'arrêter au milieu et bloquer le croisement avenue de Nîmes",
            "Forcer un croisement à vue sur le PN",
            "Désactiver le TIV",
          ],
          correct: 1,
          explanation: "Temporisation pour les rames longues : sécuriser l'itinéraire complet (p.32).",
        },
        {
          id: "zc-05",
          prompt:
            "Deux rames arrivent simultanément : rôle du panneau d'espacement (Corum) ?",
          choices: [
            "Indiquer la destination Comédie",
            "Le second conducteur s'arrête en amont pour respecter la détection / l'intervalle avec la première",
            "Autoriser 40 km/h",
            "Remplacer l'appel PCC",
          ],
          correct: 1,
          explanation: "Espacement pour détection correcte des longueurs (p.32).",
        },
        {
          id: "zc-06",
          prompt:
            "Les croisements types 2.4.1 (points 1, 2, 3, 4, 5a, 5b) en zone Corum…",
          choices: [
            "Sont suspendus si le quai est vide",
            "S'appliquent même sans autre rame",
            "Ne valent que pour la ligne 4",
            "Remplacent les TIV",
          ],
          correct: 1,
          explanation: "Même obligation qu'en gare : respect point par point (p.32).",
        },
      ],
    },

    // ─── 2.5-A TIV ────────────────────────────────────────────
    {
      id: "tiv",
      code: "2.5-A",
      title: "TIV — Panneaux de vitesse",
      cetPage: 33,
      questions: [
        {
          id: "tiv-01",
          prompt: "Que signifie TIV ?",
          choices: [
            "Tableau indicateur de voie",
            "Tableau indicateur de vitesse (panneau limitation)",
            "Télécommande d'indicateur de direction",
            "Tram indicateur de validation",
          ],
          correct: 1,
          explanation:
            "TIV = panneau limitation de vitesse, fond jaune lettres noires (p.33).",
        },
        {
          id: "tiv-02",
          prompt:
            "Un TIV indique :",
          choices: [
            "La vitesse minimale obligatoire",
            "La vitesse maximale à ne pas dépasser sur la section suivante",
            "L'arrêt prochain",
            "La destination",
          ],
          correct: 1,
          explanation: "Vitesse max sur section suivante (p.33).",
        },
        {
          id: "tiv-03",
          prompt:
            "Franchissement d'un carrefour routier : vitesse max par défaut (sans TIV plus bas) ?",
          choices: ["10 km/h", "30 km/h", "40 km/h", "60 km/h"],
          correct: 2,
          explanation: "40 km/h max au carrefour sauf TIV inférieur (p.33).",
        },
        {
          id: "tiv-04",
          prompt:
            "Zones Gare Saint-Roch, Albert 1er et Corum : vitesse spécifique ?",
          choices: ["30 km/h", "15 km/h", "10 km/h", "40 km/h"],
          correct: 2,
          explanation: "Rappel : 10 km/h en zones spécifiques (p.33).",
        },
        {
          id: "tiv-05",
          prompt:
            "Consigne de vitesse donnée par le PCC, la Police ou un agent TaM :",
          choices: [
            "Peut être ignorée si TIV plus élevé",
            "Prime sur les limitations préétablies",
            "S'applique seulement au dépôt",
            "Ne concerne que la nuit",
          ],
          correct: 1,
          explanation:
            "Consignes PCC/Police/agents TaM priment sur limites préétablies (p.33).",
        },
        {
          id: "tiv-06",
          prompt:
            "Où sont en général posés les TIV ?",
          choices: [
            "Au sol entre les rails",
            "À hauteur de la ligne aérienne",
            "Dans la cabine",
            "Sur le pare-brise",
          ],
          correct: 1,
          explanation: "À hauteur LAC (p.33).",
        },
        {
          id: "tiv-07",
          prompt:
            "Tableau des limitations (CET) : croisement d'une rame arrêtée — vitesse max ?",
          choices: ["5 km/h", "10 km/h", "15 km/h", "30 km/h"],
          correct: 1,
          explanation: "10 km/h (tableau p.34).",
        },
        {
          id: "tiv-08",
          prompt:
            "Entrée en station : autre rame déjà présente sur place — vitesse max indiquée au tableau ?",
          choices: ["30 km/h", "15 km/h", "40 km/h", "10 km/h"],
          correct: 1,
          explanation: "15 km/h si présence d'autre rame ; 30 km/h si absence (p.34).",
        },
      ],
    },

    // ─── 2.5-B Zones de télécommande d'aiguilles ─────────────
    {
      id: "telecommande-aiguilles",
      code: "2.5-B",
      title:
        "Télécommande d'aiguilles — Panneaux, boucle, boîtier de secours, interdits",
      cetPage: 35,
      questions: [
        {
          id: "tc-01",
          prompt:
            "Hors zones à itinéraire automatique et hors zone gare : la télécommande s'utilise…",
          choices: [
            "À tout moment sur la ligne",
            "Uniquement entre le panneau jaune « début » et le panneau jaune « fin » de zone",
            "Seulement au dépôt",
            "Uniquement la nuit",
          ],
          correct: 1,
          explanation: "La zone est délimitée par les panneaux jaunes début / fin (p.35).",
        },
        {
          id: "tc-02",
          prompt:
            "La commande télécommandée n'est effective que lorsque…",
          choices: [
            "Le PCC a validé au téléphone",
            "Les trois voyants (gauche, centre, droite) sont allumés simultanément sur passage de la boucle",
            "Le SA est au vert",
            "La rame est à l'arrêt complet",
          ],
          correct: 1,
          explanation: "Prise en compte sur la boucle : trois feux allumés en même temps (p.35).",
        },
        {
          id: "tc-03",
          prompt:
            "Nombre d'actions de commande à envoyer pour un itinéraire ?",
          choices: [
            "Une seule impulsion pour l'itinéraire voulu",
            "Trois impulsions successives obligatoires",
            "Autant que nécessaire jusqu'au vert",
            "Deux : une gauche, une droite",
          ],
          correct: 0,
          explanation: "Une seule action pour l'itinéraire (p.35).",
        },
        {
          id: "tc-04",
          prompt:
            "Boîtier de secours au sol : voyant jaune fixe — signification ?",
          choices: [
            "Télécommande impossible",
            "Itinéraire enclenché / télécommande active",
            "Appeler la Police",
            "Panne secteur",
          ],
          correct: 1,
          explanation: "Jaune clignotant = prise en compte retardée ; jaune fixe = enclenché (p.35).",
        },
        {
          id: "tc-05",
          prompt:
            "Il est strictement interdit de modifier la position d'un appareil de voie motorisé…",
          choices: [
            "Sans l'accord du PCC sauf si intégré à une manœuvre prévue, et jamais si une rame est déjà engagée dessus",
            "Jamais, même avec le PCC",
            "Uniquement le week-end",
            "Sauf si le voyant rouge est allumé",
          ],
          correct: 0,
          explanation: "Encadré p.35 : autorisation PCC sauf manœuvre planifiée ; interdit si rame engagée.",
        },
        {
          id: "tc-06",
          prompt:
            "Mode dégradé manuel (sabre d'aiguillage), sur aiguillage motorisé : avant d'insérer le sabre…",
          choices: [
            "Couper l'alimentation (condamnation) du moteur après ouverture de la trappe",
            "Appuyer deux fois sur le bouton droit",
            "Rien de particulier",
            "Demander uniquement aux voyageurs de descendre",
          ],
          correct: 0,
          explanation: "Coupure d'alimentation du moteur avant intervention (p.36).",
        },
        {
          id: "tc-07",
          prompt:
            "Corps étranger dans une lame motorisée : après isolement moteur au sabre, il faut aussi…",
          choices: [
            "Caler la lame contre le rail pour éviter tout mouvement accidentel",
            "Rouler à 5 km/h pour éjecter l'objet",
            "Laisser le PCC commander à distance sans cale",
            "Ouvrir les portes voyageurs",
          ],
          correct: 0,
          explanation: "Consigne de sécurité : cale entre lame et rail (encadré p.36).",
        },
      ],
    },

    // ─── 2.5-C Clou de positionnement ─────────────────────────
    {
      id: "clou-positionnement",
      code: "2.5-C",
      title: "Clou de positionnement — Repère d'arrêt et gabarits",
      cetPage: 36,
      questions: [
        {
          id: "cp-01",
          prompt:
            "Le clou de positionnement sur le quai sert principalement à…",
          choices: [
            "Indiquer l'arrêt commercial : alignement conducteur / repère à hauteur d'épaule",
            "Remplacer le TIV",
            "Marquer uniquement la fin de ligne",
            "Signaler un chantier",
          ],
          correct: 0,
          explanation: "Point d'arrêt gabarit 402 ; alignement épaule conducteur (p.36).",
        },
        {
          id: "cp-02",
          prompt:
            "Quai double : consigne sur le respect du clou de positionnement ?",
          choices: [
            "Indicatif si peu de monde",
            "Impératif — toutes les rames doivent respecter ce repère",
            "Sauf pour les rames courtes",
            "Uniquement ligne 1",
          ],
          correct: 1,
          explanation: "Mention impérative pour quai double (p.36, texte en rouge).",
        },
        {
          id: "cp-03",
          prompt:
            "Rame type 302 (plus courte) sur quai réglé au gabarit 402 : où s'arrêter ?",
          choices: [
            "Au même clou, quelle que soit la longueur",
            "En tête de quai",
            "Après le clou",
            "Où le PCC indique par radio uniquement",
          ],
          correct: 1,
          explanation: "Les 302 s'arrêtent en tête de quai (p.36).",
        },
      ],
    },

    // ─── 2.5-D Panneaux limite de manœuvre ────────────────────
    {
      id: "limite-manoeuvre",
      code: "2.5-D",
      title: "Panneaux limite de manœuvre — Fin de zone de retournement",
      cetPage: 36,
      questions: [
        {
          id: "lm-01",
          prompt:
            "Panneau limite de manœuvre : apparence et rôle ?",
          choices: [
            "Carré noir : ne pas s'arrêter avant pour que le dernier bogie dégage l'aiguillage",
            "Disque jaune : vitesse 30 km/h",
            "Triangle blanc : priorité",
            "Panneau R : reprise de marche",
          ],
          correct: 0,
          explanation: "Fin de zone retournement en commande manuelle ; dégagement complet (p.36).",
        },
        {
          id: "lm-02",
          prompt:
            "Pourquoi ne pas s'arrêter avant le panneau limite de manœuvre ?",
          choices: [
            "Pour garantir que le dernier bogie a franchi l'appareil de voie",
            "Pour faciliter la montée des voyageurs",
            "Parce que le panneau est décoratif",
            "Pour éviter d'utiliser le gong",
          ],
          correct: 0,
          explanation: "Éviter un arrêt à cheval sur l'aiguille (p.36).",
        },
      ],
    },

    // ─── 2.6-A Panneaux de chantier ──────────────────────────
    {
      id: "panneaux-chantier",
      code: "2.6-A",
      title: "Panneaux temporaires — Chantier (flashs, vitesses, R)",
      cetPage: 37,
      questions: [
        {
          id: "ch-01",
          prompt:
            "Éclairage flash de chantier : distance type par rapport à la zone de travaux ?",
          choices: [
            "50 m avant seulement",
            "100 m avant et 100 m après la zone",
            "200 m d'un seul côté",
            "Uniquement en gare",
          ],
          correct: 1,
          explanation: "Flashs à 100 m avant et après (p.37).",
        },
        {
          id: "ch-02",
          prompt:
            "Sur un panneau chantier : la lettre R signifie…",
          choices: [
            "Rappel d'arrêt d'urgence",
            "Point à partir duquel la reprise de vitesse normale est autorisée",
            "Radio obligatoire",
            "Voie réservée",
          ],
          correct: 1,
          explanation: "R = reprise de vitesse (p.37).",
        },
        {
          id: "ch-03",
          prompt:
            "Chiffre rouge sur panneau de chantier : signification ?",
          choices: [
            "Numéro de ligne",
            "Vitesse limite à respecter dans le secteur balisé",
            "Distance en mètres entre deux arrêts",
            "Code PCC",
          ],
          correct: 1,
          explanation: "Limite de vitesse imposée (p.37).",
        },
        {
          id: "ch-04",
          prompt:
            "La lampe flash est éteinte : la limitation affichée…",
          choices: [
            "Ne vaut plus",
            "Reste obligatoire",
            "Ne vaut que de jour",
            "Est doublée automatiquement",
          ],
          correct: 1,
          explanation: "Lampe allumée ou éteinte : respecter l'indication de vitesse (p.37).",
        },
      ],
    },

    // ─── 2.6-B Panneaux d'arrêt absolu ────────────────────────
    {
      id: "arret-absolu",
      code: "2.6-B",
      title: "Panneaux temporaires — Arrêt absolu",
      cetPage: 37,
      questions: [
        {
          id: "aa-01",
          prompt:
            "Les panneaux « arrêt absolu » au sens CET comprennent notamment…",
          choices: [
            "Uniquement un feu rouge clignotant",
            "« ARRÊT OBLIGATOIRE » et le panneau rouge uni sans mention",
            "Un TIV à 10",
            "Un panneau jaune R",
          ],
          correct: 1,
          explanation: "Deux types illustrés p.37.",
        },
        {
          id: "aa-02",
          prompt:
            "Face à un panneau d'arrêt absolu : conduite à tenir ?",
          choices: [
            "Franchissement interdit tant que le signal n'est pas levé / levée l'interdiction",
            "Passage à 10 km/h sans avis",
            "Passage si le feu de route est vert",
            "Demander aux piétons uniquement",
          ],
          correct: 0,
          explanation: "Arrêt de principe : pas de contournement sans procédure (p.37).",
        },
      ],
    },
  ],
};
