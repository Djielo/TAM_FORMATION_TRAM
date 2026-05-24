/** RCT ch. 4 — Consignes d'urgence (pages 59–75) */
export const MODULES_CH4 = [
  // ─── 4.1 Consignes générales ────────────────────────────────
  {
    id: "urg-41",
    code: "4.1",
    title: "Consignes générales en cas d'urgence",
    cetPage: 60,
    questions: [
      {
        id: "ch4-41-01",
        prompt:
          "Face à un incident qui impose l'arrêt immédiat de la rame : quelles sont les quatre étapes de base à enchaîner ?",
        choices: [
          "Arrêt, feux de détresse, appel flash PCC, information clients",
          "Évacuation immédiate sans appel",
        ],
        correct: 0,
        explanation:
          "Arrêt, feux de détresse, appel flash PCC, information clients (p.60).",
      },
      {
        id: "ch4-41-02",
        prompt:
          "Après les quatre gestes de base (arrêt, détresse, appel PCC, information clients) : arrêt prolongé, danger immédiat ou incident grave — quelles consignes générales s'appliquent ensuite ?",
        choices: [
          "Arrêt prolongé : évacuation seulement d'accord PCC — danger immédiat (feu, projectiles, etc.) : quitter la zone puis prévenir PCC en respectant la signalisation — incident grave : conducteur coordinateur (témoignages, compte-rendu PCC) jusqu'au relais au supérieur hiérarchique présent (contact pompiers/police)",
          "Évacuation systématique sans PCC, reprise de service immédiate, le PCC devient coordinateur sur place",
        ],
        correct: 0,
        explanation: "RCT § 4.1 p.60 : prolongation, départ urgent et rôle coordinateur.",
      },
    ],
  },

  // ─── 4.2-A Accident matériel ──────────────────────────────
  {
    id: "urg-42a",
    code: "4.2-A",
    title: "Accidents — Accident matériel",
    cetPage: 61,
    questions: [
      {
        id: "ch4-42a-01",
        prompt:
          "Accident matériel (dégâts aux biens uniquement) : quel enchaînement d'actions menez-vous ?",
        choices: [
          "Arrêt et feux de détresse → appel d'urgence et information clients → éviter un autre accident → témoins → pré-constat dans la rame (rester joignable PCC) → exemplaire au tiers → informer PCC → CONSTAT ACCIDENT partie A (PCC ou boîte rouge JP le jour même) → noter sur la feuille de route",
          "Déplacer la rame tout de suite, constat hors rame, reprise de service sans ordre du PCC",
        ],
        correct: 0,
        explanation:
          "RCT § 4.2-A p.61 : les neuf étapes dans l'ordre. Rappels : choc latéral violent sur l'avant → FS (risque HT) ; déplacement de la rame et reprise du service uniquement sur ordre du PCC.",
      },
    ],
  },

  // ─── 4.2-B Accident corporel ──────────────────────────────
  {
    id: "urg-42b",
    code: "4.2-B",
    title: "Accidents — Accident corporel",
    cetPage: 62,
    questions: [
      {
        id: "ch4-42b-01",
        prompt:
          "Accident corporel : quel enchaînement d'actions menez-vous ?",
        choices: [
          "Arrêt et feux de détresse → appel d'urgence et prévenir les clients → éviter un autre accident et protéger les blessés → évaluer l'état du blessé (sortir de cabine pour signalement précis) → informer le PCC → suivre ses ordres → accueillir les secours → témoins → constat corporel dans la rame → appel PCC pour reprise → remettre CONSTAT CORPOREL + CONSTAT ACCIDENT partie B → feuille de route",
          "Rester en cabine pour évaluer, reprise immédiate si blessures légères, pas de constat corporel",
        ],
        correct: 0,
        explanation:
          "RCT § 4.2-B p.62 : douze étapes dans l'ordre. Rappel : si blessures légères et refus de secours, pas de reprise sans accord PCC ; relever quand même les coordonnées de la victime.",
      },
    ],
  },

  // ─── 4.2-C Personne sous la rame ──────────────────────────
  {
    id: "urg-42c",
    code: "4.2-C",
    title: "Accidents — Personne engagée sous la rame",
    cetPage: 63,
    questions: [
      {
        id: "ch4-42c-01",
        prompt:
          "Chute ou accident : personne engagée sous la rame. Quel enchaînement d'actions menez-vous ?",
        choices: [
          "Arrêt et feux de détresse → FS (coupure alimentation électrique) → appel d'urgence avant coupure batterie → abaisser pantographe et dé-préparer (y compris coupure batterie) → informer clients → protéger le blessé et relever son état → accueillir les secours → CONSTAT CORPOREL + CONSTAT ACCIDENT partie B au PCC → feuille de route",
          "Coupure batterie d'abord, le conducteur déplace la rame pour dégager la victime, pas de FS",
        ],
        correct: 0,
        explanation:
          "RCT § 4.2-C p.63 : neuf étapes dans l'ordre. Rappel : seuls les pompiers sont autorisés à déplacer la rame si la victime est engagée dessous.",
      },
    ],
  },

  // ─── 4.2-D Agression / malaise conducteur ─────────────────
  {
    id: "urg-42d",
    code: "4.2-D",
    title: "Accidents — Agression ou malaise du conducteur",
    cetPage: 64,
    questions: [
      {
        id: "ch4-42d-01",
        prompt:
          "Malaise ou agression du conducteur à l'intérieur de la cabine : quelles étapes enchaignez-vous ?",
        choices: [
          "Arrêter la rame et feux de détresse → enclencher le FS (coup de poing) → appel de détresse → informer la clientèle si possible",
          "Abaisser le pantographe, dé-préparer la rame, évacuer les voyageurs sans appel",
        ],
        correct: 0,
        explanation: "RCT § 4.2-D p.64 : quatre étapes dans l'ordre (procédure distincte du déraillement § 4.3).",
      },
    ],
  },

  // ─── 4.3 Déraillement ─────────────────────────────────────
  {
    id: "urg-43",
    code: "4.3",
    title: "Déraillement d'une rame",
    cetPage: 64,
    questions: [
      {
        id: "ch4-43-01",
        prompt:
          "Déraillement de la rame : quel enchaînement d'actions menez-vous ?",
        choices: [
          "Arrêt et feux de détresse → appel d'urgence → informer les clients → abaisser le pantographe après contrôle visuel de la LAC → évacuer après accord du PCC (§ 4.7) → dé-préparer → triangle de pré-signalisation → accueillir les secours",
          "Tenter un ré-enraillement soi-même, abaisser le pantographe sans contrôle LAC, évacuer sans accord PCC",
        ],
        correct: 0,
        explanation:
          "RCT § 4.3 p.64 : huit étapes dans l'ordre. Rappel : le conducteur ne doit pas entamer lui-même une tentative de ré-enraillement.",
      },
    ],
  },

  // ─── 4.4-A Incident voyageur à bord ───────────────────────
  {
    id: "urg-44a",
    code: "4.4-A",
    title: "Incidents à bord — Malaise, agression, chute voyageur",
    cetPage: 65,
    questions: [
      {
        id: "ch4-44a-01",
        prompt:
          "À bord de la rame : malaise, agression, chute ou décès d'un voyageur. Quel enchaînement d'actions menez-vous ?",
        choices: [
          "Appel d'urgence → arrêter la rame (de préférence station la plus proche) et feux de détresse → retirer clé KC et fermer la cabine → porter assistance au blessé → rappeler le PCC et suivre ses consignes → coordonnées des témoins → accueillir les secours si gravité → noter sur la feuille de route",
          "Arrêter au terminus, quitter la cabine sans sécuriser, évacuation systématique sans appel PCC",
        ],
        correct: 0,
        explanation: "RCT § 4.4-A p.65 : huit étapes dans l'ordre (l'appel d'urgence précède l'arrêt).",
      },
    ],
  },

  // ─── 4.4-B Bris de vitre ──────────────────────────────────
  {
    id: "urg-44b",
    code: "4.4-B",
    title: "Incidents à bord — Bris de vitre",
    cetPage: 66,
    questions: [
      {
        id: "ch4-44b-01",
        prompt:
          "Bris de vitre latérale voyageurs ou de vitre de cabine à bord : quel enchaînement d'actions menez-vous ?",
        choices: [
          "Arrêt en station si possible et feux de détresse → appel d'urgence → vérifier l'absence de blessé → éloigner les clients de la vitre → informer le PCC et attendre ses ordres (évacuation ou fin de course jusqu'au terminus si pas de danger) → feuille de route",
          "Évacuation immédiate sans appel, fin de course sans avis PCC, laisser les clients près de la vitre",
        ],
        correct: 0,
        explanation: "RCT § 4.4-B p.66 : six étapes dans l'ordre.",
      },
    ],
  },

  // ─── 4.4-C Pare-brise ─────────────────────────────────────
  {
    id: "urg-44c",
    code: "4.4-C",
    title: "Incidents à bord — Pare-brise / visibilité",
    cetPage: 66,
    questions: [
      {
        id: "ch4-44c-01",
        prompt:
          "Casse du pare-brise de cabine ou visibilité dangereuse pour la sécurité : quel enchaînement d'actions menez-vous ?",
        choices: [
          "Arrêt en station si possible et feux de détresse → appel d'urgence → informer la clientèle → évacuer la rame → informer le PCC de la fin d'évacuation et attendre ses ordres → feuille de route",
          "Poursuivre la course, pas d'évacuation, remonter le pantographe sans PCC",
        ],
        correct: 0,
        explanation:
          "RCT § 4.4-C p.66 : six étapes dans l'ordre. Évacuation systématique (contrairement au bris de vitre latérale).",
      },
    ],
  },

  // ─── 4.4-D Incendie à bord ────────────────────────────────
  {
    id: "urg-44d",
    code: "4.4-D",
    title: "Incidents à bord — Incendie",
    cetPage: 67,
    questions: [
      {
        id: "ch4-44d-01",
        prompt:
          "Incendie à bord de la rame : quel enchaînement d'actions menez-vous ?",
        choices: [
          "Arrêt et feux de détresse → évacuation des voyageurs (§ 4.7) → appel d'urgence → évaluer le sinistre → abaisser pantographe et dé-préparer → vérifier qu'il ne reste personne à bord → combattre le feu aux extincteurs → accueillir les secours",
          "Appel d'urgence avant évacuation, lutter au extincteur d'abord, remonter le pantographe sans PCC",
        ],
        correct: 0,
        explanation:
          "RCT § 4.4-D p.67 : huit étapes dans l'ordre (évacuation avant l'appel d'urgence). Mêmes consignes en remisage. Rappel : interdit de remonter le pantographe sans autorisation PCC après incendie, même léger.",
      },
    ],
  },

  // ─── 4.4-E Colis suspect à bord ───────────────────────────
  {
    id: "urg-44e",
    code: "4.4-E",
    title: "Incidents à bord — Colis suspect (Vigipirate)",
    cetPage: 68,
    questions: [
      {
        id: "ch4-44e-01",
        prompt:
          "Colis suspect signalé en ligne à bord (plan Vigipirate) : quel enchaînement menez-vous ? (Ne jamais toucher ni déplacer l'objet.)",
        choices: [
          "Identifier l'objet et chercher son propriétaire → appeler le PCC et suivre ses consignes → si radio HS : évacuer et rejoindre à pied le terminus le plus proche → rame en tiroir : s'éloigner et périmètre de sécurité en attendant Police et TaM",
          "Ouvrir le colis, le déplacer pour sécuriser, repartir sans prévenir le PCC",
        ],
        correct: 0,
        explanation:
          "RCT § 4.4-E p.68 cas 2. Cas 1 (repéré au changement de loge) : appel urgence PCC puis consignes PCC.",
      },
    ],
  },

  // ─── 4.5-A Colis suspect aux abords ───────────────────────
  {
    id: "urg-45a",
    code: "4.5-A",
    title: "Aux abords de la voie — Colis suspect",
    cetPage: 69,
    questions: [
      {
        id: "ch4-45a-01",
        prompt:
          "Alerte bombe ou colis suspect aux abords de la voie (appel PCC ou police sur site) : quel enchaînement menez-vous ?",
        choices: [
          "Arrêt et feux de détresse → suivre les instructions reçues → si ordre d'évacuer : prévenir la clientèle et évacuer (règles § 4.6-B) → se mettre à disposition de la Police et rendre compte au PCC",
          "Toucher l'objet pour l'éloigner, évacuer sans prévenir les voyageurs",
        ],
        correct: 0,
        explanation: "RCT § 4.5-A p.69 : trois étapes. Ne pas toucher ni déplacer un colis suspect.",
      },
    ],
  },

  // ─── 4.5-B Chute LAC ──────────────────────────────────────
  {
    id: "urg-45b",
    code: "4.5-B",
    title: "Aux abords — Chute de LAC et risques électriques",
    cetPage: 70,
    questions: [
      {
        id: "ch4-45b-01",
        prompt:
          "Chute de la ligne aérienne de contact (LAC) sur la voie : quel enchaînement d'actions menez-vous ?",
        choices: [
          "Arrêt et feux de détresse → appel d'urgence → informer clients (interdiction de descendre tant que LAC alimentée) → abaisser pantographe et dé-préparer → attendre ordre PCC pour faire descendre (LAC confirmée non alimentée) → descente côté moindre risque (accord PCC si entrevoie) → ne pas monter en toiture → feuille de route",
          "Faire descendre les clients tout de suite, monter en toiture pour réparer le pantographe",
        ],
        correct: 0,
        explanation:
          "RCT § 4.5-B p.70 : huit étapes. Mêmes consignes en cas de chute d'arbre sur la voie ou sur la rame.",
      },
    ],
  },

  // ─── 4.5-C Inondation ─────────────────────────────────────
  {
    id: "urg-45c",
    code: "4.5-C",
    title: "Aux abords — Inondation de la voie",
    cetPage: 71,
    questions: [
      {
        id: "ch4-45c-01",
        prompt:
          "Inondation de la voie : le niveau d'eau reste sous la bande rouge du repère (moins de 10 cm). Que faites-vous ?",
        choices: [
          "Franchir en conduite manœuvre à 5 km/h maximum et informer le PCC",
          "Franchir à 40 km/h sans signaler",
        ],
        correct: 0,
        explanation: "RCT § 4.5-C p.71 : cas inondation faible.",
      },
      {
        id: "ch4-45c-02",
        prompt:
          "Inondation de la voie : le niveau dépasse la bande rouge du repère (plus de 10 cm). Quel enchaînement menez-vous ?",
        choices: [
          "Arrêt et feux de détresse → appel d'urgence → se conformer aux instructions du PCC → informer les voyageurs → si évacuation prolongée : PMR et enfants peuvent rester à bord s'ils le souhaitent en attendant assistance → noter sur la feuille de route",
          "Traverser à vitesse normale, évacuation immédiate sans appel PCC",
        ],
        correct: 0,
        explanation: "RCT § 4.5-C p.71 : cas inondation importante (six étapes).",
      },
    ],
  },

  // ─── 4.5-D Accident plate-forme ───────────────────────────
  {
    id: "urg-45d",
    code: "4.5-D",
    title: "Aux abords — Accident sur plate-forme, chute sur voie",
    cetPage: 72,
    questions: [
      {
        id: "ch4-45d-01",
        prompt:
          "Vous êtes témoin d'un accident sur la plate-forme sans implication de votre rame : quel enchaînement menez-vous ?",
        choices: [
          "Arrêt et feux de détresse → appel d'urgence et informer les clients → secourir et protéger les blessés → éviter un autre accident → dès que reprise possible, informer le PCC → feuille de route",
          "Poursuivre sans arrêt pour ne pas bloquer la ligne",
        ],
        correct: 0,
        explanation: "RCT § 4.5-D p.72 : six étapes.",
      },
    ],
  },

  // ─── 4.6-A Anomalies — arrêt obligatoire ──────────────────
  {
    id: "urg-46a",
    code: "4.6-A",
    title: "Anomalies en ligne — Arrêt et appel PCC",
    cetPage: 73,
    questions: [
      {
        id: "ch4-46a-01",
        prompt:
          "Anomalies en ligne imposant l'arrêt immédiat de la rame : que devez-vous faire dans tous ces cas (LAC endommagée, tendeur cassé, corps étranger, affaissement voie, signal illisible, conducteur absent au croisement, personne accrochée…) ?",
        choices: [
          "Arrêter impérativement la rame et appeler le PCC",
          "Prévenir le PCC en fin de service seulement",
        ],
        correct: 0,
        explanation: "RCT § 4.6-A p.73 : huit situations listées, même conduite.",
      },
    ],
  },

  // ─── 4.6-B Anomalies — prévenir PCC ───────────────────────
  {
    id: "urg-46b",
    code: "4.6-B",
    title: "Anomalies en ligne — Prévenir le PCC sans arrêt immédiat",
    cetPage: 73,
    questions: [
      {
        id: "ch4-46b-01",
        prompt:
          "Anomalies en ligne sans arrêt immédiat imposé (feux éteints sur autre rame, objet accroché, comportement suspect, arbre menaçant, voiture sur voie…) : que devez-vous faire ?",
        choices: [
          "Informer impérativement le PCC (sans obligation d'arrêt immédiat pour ces cas)",
          "Arrêt FU systématique avant tout signalement",
        ],
        correct: 0,
        explanation: "RCT § 4.6-B p.73 : sept situations — prévenir le PCC.",
      },
    ],
  },

  // ─── 4.7-A Immobilisation pleine voie ─────────────────────
  {
    id: "urg-47a",
    code: "4.7-A",
    title: "Immobilisation et évacuation — Pleine voie",
    cetPage: 74,
    questions: [
      {
        id: "ch4-47a-01",
        prompt:
          "Rame immobilisée en pleine voie (sans quai) : quelles étapes devez-vous enchaîner avant toute évacuation ?",
        choices: [
          "Feux de détresse (ou triangle si panne) → appel d'urgence → informer la clientèle",
          "Évacuation immédiate sans signalisation ni appel",
        ],
        correct: 0,
        explanation: "RCT § 4.7-A p.74 : immobilisation en trois étapes.",
      },
    ],
  },

  // ─── 4.7-B Évacuation pleine voie ─────────────────────────
  {
    id: "urg-47b",
    code: "4.7-B",
    title: "Évacuation d'une rame en pleine voie",
    cetPage: 74,
    questions: [
      {
        id: "ch4-47b-01",
        prompt:
          "Évacuation d'une rame en pleine voie (après accord confirmé du PCC) : quel enchaînement menez-vous ?",
        choices: [
          "Informer les clients → ouvrir une porte côté droit (sens de marche) → descendre le premier et vérifier l'absence de danger → faire descendre les voyageurs en aidant les personnes en difficulté → prévenir le PCC de la fin d'évacuation",
          "Ouvrir côté entrevoie sans accord, conducteur descend en dernier, repartir sans prévenir le PCC",
        ],
        correct: 0,
        explanation:
          "RCT § 4.7-B p.74 : cinq étapes. Rappels : incendie/force majeure = évacuation possible sans accord PCC ; entrevoie seulement si PCC garantit l'arrêt du trafic opposé ; voie unique Sabines–SJD ou Sablassou–Jacou : chemin piéton vers arrêt bus.",
      },
    ],
  },

  // ─── 4.7-C Immobilisation tunnel ──────────────────────────
  {
    id: "urg-47c",
    code: "4.7-C",
    title: "Immobilisation d'une rame dans le tunnel",
    cetPage: 75,
    questions: [
      {
        id: "ch4-47c-01",
        prompt:
          "Rame immobilisée dans un tunnel : quel enchaînement menez-vous ?",
        choices: [
          "Feux de détresse (ou triangle si panne) → appel d'urgence, puis appel de détresse si pas de réponse du PCC → informer la clientèle",
          "Évacuation immédiate sans appel radio",
        ],
        correct: 0,
        explanation: "RCT § 4.7-C p.75 : trois étapes.",
      },
    ],
  },

  // ─── 4.7-D Évacuation tunnel ──────────────────────────────
  {
    id: "urg-47d",
    code: "4.7-D",
    title: "Évacuation d'une rame dans le tunnel",
    cetPage: 75,
    questions: [
      {
        id: "ch4-47d-01",
        prompt:
          "Évacuation d'une rame dans le tunnel (après accord confirmé du PCC) : quel enchaînement menez-vous ?",
        choices: [
          "Informer les clients → ouvrir une porte côté droit (sens de marche) → descendre le premier et vérifier l'absence de danger → faire descendre les voyageurs en les dirigeant vers la sortie la plus proche → prévenir le PCC de la fin d'évacuation → noter l'incident sur la feuille de route",
          "Évacuation par entrevoie sans accord, sans orientation vers la sortie",
        ],
        correct: 0,
        explanation:
          "RCT § 4.7-D p.75 : cinq étapes + feuille de route (commun aux § 4.7 A à D).",
      },
    ],
  },
];
