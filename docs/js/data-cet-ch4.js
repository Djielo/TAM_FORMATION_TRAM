/** CET ch. 4 — Consignes d'urgence (pages 59–75) */
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
          "Incident imposant l'arrêt : séquence de base (4 étapes CET) ?",
        choices: [
          "Arrêt, détresse, appel flash PCC, information clients",
          "Évacuation immédiate sans appel",
          "Reprise à 40 km/h",
          "Dé-préparation seule",
        ],
        correct: 0,
        explanation: "Quatre gestes communs à tout arrêt d'urgence (p.60).",
      },
      {
        id: "ch4-41-02",
        prompt: "Arrêt prolongé : évacuation de la rame…",
        choices: [
          "Sur accord PCC",
          "Par décision conducteur seul",
          "Interdite",
          "Automatique après 5 min",
        ],
        correct: 0,
        explanation: "Évacuation si arrêt prolongé, d'accord PCC (p.60).",
      },
      {
        id: "ch4-41-03",
        prompt: "Départ urgent de la zone de danger (feu, projectiles…) :",
        choices: [
          "Autorisé ; prévenir PCC après ; respecter signalisation",
          "Interdit",
          "Uniquement au dépôt",
          "Sans feux",
        ],
        correct: 0,
        explanation: "Quitter la zone puis informer PCC (p.60).",
      },
      {
        id: "ch4-41-04",
        prompt: "Incident grave : rôle du conducteur en attente des secours ?",
        choices: [
          "Coordinateur : témoignages, compte-rendu PCC",
          "Quitter les lieux",
          "Reprendre le service",
          "Réparer la rame",
        ],
        correct: 0,
        explanation: "Coordinateur jusqu'à prise en charge maîtrise (p.60).",
      },
      {
        id: "ch4-41-05",
        prompt:
          "Maîtrise sur place : qui devient coordinateur face pompiers/police ?",
        choices: [
          "Le supérieur hiérarchique présent",
          "Le conducteur toujours",
          "Le premier voyageur",
          "Le PCC à distance",
        ],
        correct: 0,
        explanation: "Relais coordinateur au supérieur (p.60).",
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
        prompt: "Accident matériel : constat à remplir dans la rame pour…",
        choices: [
          "Rester joignable par le PCC pendant le pré-constat",
          "Partir chercher le tiers",
          "Évacuer sans formulaire",
          "Ignorer le tiers",
        ],
        correct: 0,
        explanation: "Pré-constat dans la rame, joignabilité PCC (p.61).",
      },
      {
        id: "ch4-42a-02",
        prompt: "Choc latéral violent partie avant : mesure de sécurité ?",
        choices: [
          "Mettre le FS (risque électrique HT)",
          "FU en marche",
          "Repartir",
          "Couper batterie sans appel",
        ],
        correct: 0,
        explanation: "FS si choc violent avant (encadré p.61).",
      },
      {
        id: "ch4-42a-03",
        prompt: "Déplacement des véhicules après accident matériel :",
        choices: [
          "Uniquement sur ordre PCC ; reprise service idem",
          "Libre si dégâts légers",
          "Par le tiers",
          "Immédiat",
        ],
        correct: 0,
        explanation: "Déplacement et reprise sur ordre PCC (p.61).",
      },
      {
        id: "ch4-42a-04",
        prompt: "Remise des documents accident matériel :",
        choices: [
          "CONSTAT ACCIDENT partie A au PCC ou boîte rouge JP le jour même",
          "Dans un mois",
          "Au dépôt seulement",
          "Par le tiers",
        ],
        correct: 0,
        explanation: "Partie A signée, remise jour même (p.61).",
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
          "Accident corporel : relevé de l'état du blessé — le conducteur doit…",
        choices: [
          "Sortir de cabine pour signalement précis même si blessé dans la rame",
          "Rester en cabine",
          "Repartir vite",
          "Ne pas appeler le PCC",
        ],
        correct: 0,
        explanation: "Sortie cabine pour évaluation (texte violet p.62).",
      },
      {
        id: "ch4-42b-02",
        prompt: "Reprise de service après accident corporel :",
        choices: [
          "Autorisation PCC après appel",
          "Dès que la rame roule",
          "Sans constat",
          "Si blessé refuse secours",
        ],
        correct: 0,
        explanation: "Appel PCC pour autorisation reprise (p.62).",
      },
      {
        id: "ch4-42b-03",
        prompt: "Blessure légère, victime refuse les secours :",
        choices: [
          "Pas de reprise sans accord PCC ; relever ses coordonnées",
          "Repartir immédiatement",
          "FU",
          "Pas de constat",
        ],
        correct: 0,
        explanation: "Encadré p.62.",
      },
      {
        id: "ch4-42b-04",
        prompt: "Documents à remettre au PCC :",
        choices: [
          "CONSTAT CORPOREL + CONSTAT ACCIDENT partie B",
          "Feuille de route seule",
          "SAT uniquement",
          "Rien",
        ],
        correct: 0,
        explanation: "Deux constats partie B (p.62).",
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
        prompt: "Personne sous la rame : avant coupure batterie…",
        choices: [
          "Appel d'urgence (avant coupure batterie)",
          "Coupure batterie d'abord",
          "Repartir",
          "Évacuation sans appel",
        ],
        correct: 0,
        explanation: "Appel urgence avant coupure (texte rouge p.63).",
      },
      {
        id: "ch4-42c-02",
        prompt: "Victime engagée sous le tramway : déplacement de la rame…",
        choices: [
          "Réservé aux pompiers",
          "Par le conducteur avec FS",
          "Par le PCC à distance",
          "En poussant à 5 km/h",
        ],
        correct: 0,
        explanation: "Seuls les pompiers déplacent la rame (encadré p.63).",
      },
      {
        id: "ch4-42c-03",
        prompt: "Séquence : FS sert notamment à…",
        choices: [
          "Couper l'alimentation électrique (ouverture disjoncteur)",
          "Accélérer",
          "Ouvrir les portes voyageurs",
          "Baisser le pantographe seul",
        ],
        correct: 0,
        explanation: "FS = coupure alimentation (p.63).",
      },
      {
        id: "ch4-42c-04",
        prompt: "Si victime sous rame : après FS et urgence…",
        choices: [
          "Pantographe bas, dé-préparation, protection blessé",
          "Reprise commerciale",
          "40 km/h",
          "Sans dé-préparation",
        ],
        correct: 0,
        explanation: "Dé-préparation si engagement sous rame (p.63).",
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
        prompt: "Malaise ou agression dans la cabine :",
        choices: [
          "Arrêt, détresse, FS, appel détresse, informer clients si possible",
          "Poursuite terminus",
          "Couper SIE",
          "Ouvrir toutes les portes",
        ],
        correct: 0,
        explanation: "Quatre gestes p.64 (section D).",
      },
      {
        id: "ch4-42d-02",
        prompt: "En cabine, le FS en malaise conducteur sert à…",
        choices: [
          "Sécuriser l'immobilisation",
          "Accélérer",
          "Ouvrir portes quai",
          "Baisser pantographe",
        ],
        correct: 0,
        explanation: "FS + détresse (p.64).",
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
        prompt: "Déraillement : le conducteur peut-il tenter un ré-enraillement ?",
        choices: [
          "Non — interdit",
          "Oui à 5 km/h",
          "Oui avec FS",
          "Oui si PCC occupé",
        ],
        correct: 0,
        explanation: "Ré-enraillement interdit au conducteur (encadré p.64).",
      },
      {
        id: "ch4-43-02",
        prompt: "Déraillement : avant dé-préparation pantographe…",
        choices: [
          "Contrôle visuel LAC (risque arrachement)",
          "Montée sur toit",
          "Reprise traction",
          "Évacuation sans PCC",
        ],
        correct: 0,
        explanation: "Contrôle LAC avant descente pantographe (p.64).",
      },
      {
        id: "ch4-43-03",
        prompt: "Évacuation après déraillement :",
        choices: [
          "Après accord PCC (voir 4.7 B/D)",
          "Immédiate sans avis",
          "Interdite",
          "Par le conducteur seul en tunnel",
        ],
        correct: 0,
        explanation: "Évacuation selon 4.7 après accord PCC (p.64).",
      },
      {
        id: "ch4-43-04",
        prompt: "Déraillement : signalisation de la rame immobilisée…",
        choices: [
          "Triangle de pré-signalisation",
          "Uniquement klaxon",
          "Rien si détresse OK",
          "Feux route",
        ],
        correct: 0,
        explanation: "Triangle après immobilisation (p.64).",
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
        prompt: "Malaise voyageur à bord : arrêt de préférence…",
        choices: [
          "À la station la plus proche, détresse, clé KC retirée, cabine fermée",
          "En pleine voie sans arrêt",
          "Au terminus uniquement",
          "À 40 km/h",
        ],
        correct: 0,
        explanation: "Station proche + sécurisation cabine (p.65).",
      },
      {
        id: "ch4-44a-02",
        prompt: "Après assistance au blessé à bord :",
        choices: [
          "Rappeler PCC et suivre ses consignes",
          "Repartir sans avis",
          "Évacuation systématique",
          "FU",
        ],
        correct: 0,
        explanation: "Évaluation puis instructions PCC (p.65).",
      },
      {
        id: "ch4-44a-03",
        prompt: "Témoins d'incident à bord :",
        choices: [
          "Noter leurs coordonnées",
          "Inutiles",
          "Uniquement police",
          "PCC les appelle",
        ],
        correct: 0,
        explanation: "Coordonnées témoins (p.65).",
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
        prompt: "Bris de vitre latérale : après appel urgence…",
        choices: [
          "Éloigner clients de la vitre, attendre ordres PCC",
          "Repartir à 70 km/h",
          "Ouvrir toutes les portes",
          "Sans information PCC",
        ],
        correct: 0,
        explanation: "Protection zone + ordres PCC (p.66).",
      },
      {
        id: "ch4-44b-02",
        prompt: "Bris de vitre sans danger : PCC peut autoriser…",
        choices: [
          "Fin de course commerciale jusqu'au terminus",
          "FU",
          "Évacuation obligatoire",
          "Remorquage immédiat",
        ],
        correct: 0,
        explanation: "Terminus possible si zone sécurisée (p.66).",
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
        prompt: "Casse pare-brise ou visibilité dangereuse :",
        choices: [
          "Arrêt station si possible, urgence, info clients, évacuation, ordres PCC",
          "Poursuite à 30 km/h",
          "Dégivrage seul",
          "Sans évacuation",
        ],
        correct: 0,
        explanation: "Évacuation systématique (p.66).",
      },
      {
        id: "ch4-44c-02",
        prompt: "Après évacuation pour pare-brise :",
        choices: [
          "Informer PCC fin d'évacuation et attendre ordres",
          "Reprendre le service",
          "Dé-préparer sans avis",
          "Quitter les lieux",
        ],
        correct: 0,
        explanation: "Compte-rendu fin évacuation au PCC (p.66).",
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
        prompt: "Incendie à bord : priorité après arrêt et détresse ?",
        choices: [
          "Évacuation voyageurs (4.7), appel urgence, évaluation, pantographe bas",
          "Lutter seul longtemps avant évacuation",
          "Repartir",
          "Ouvrir fenêtres en marche",
        ],
        correct: 0,
        explanation: "Séquence 8 étapes p.67.",
      },
      {
        id: "ch4-44d-02",
        prompt: "Après incendie même léger : pantographe…",
        choices: [
          "Interdit de remonter sans autorisation PCC",
          "Remonter pour repartir",
          "Toujours baissé définitivement",
          "Manivelle conducteur libre",
        ],
        correct: 0,
        explanation: "Encadré p.67.",
      },
      {
        id: "ch4-44d-03",
        prompt: "Incendie au remisage :",
        choices: [
          "Mêmes consignes qu'à bord",
          "Ignorer",
          "Quitter le site sans appel",
          "Uniquement extincteur",
        ],
        correct: 0,
        explanation: "Consignes identiques remisage (p.67).",
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
        prompt: "Colis suspect repéré :",
        choices: [
          "Ne pas toucher ni déplacer ; prudence et discernement",
          "Ouvrir pour identifier",
          "Jeter sur le quai",
          "Emporter en cabine",
        ],
        correct: 0,
        explanation: "Interdiction toucher/déplacer (encadré p.68).",
      },
      {
        id: "ch4-44e-02",
        prompt: "Colis suspect en ligne, difficulté radio :",
        choices: [
          "Évacuer et rejoindre à pied terminus le plus proche",
          "Continuer le service",
          "Laisser le colis à bord sans avis",
          "FU",
        ],
        correct: 0,
        explanation: "Évacuation + terminus à pied si radio HS (p.68).",
      },
      {
        id: "ch4-44e-03",
        prompt: "Rame en tiroir après alerte bombe :",
        choices: [
          "S'éloigner, périmètre de sécurité, attendre police/TaM",
          "Rester à bord",
          "Repartir",
          "Ouvrir le colis avec agents",
        ],
        correct: 0,
        explanation: "Périmètre après mise en tiroir (p.68).",
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
        prompt: "Alerte bombe / colis suspect aux abords (ordre PCC ou police) :",
        choices: [
          "Arrêt, détresse, suivre instructions",
          "Passer à 40 km/h",
          "Klaxonner seulement",
          "Évacuation sans consigne",
        ],
        correct: 0,
        explanation: "Trois étapes p.69.",
      },
      {
        id: "ch4-45a-02",
        prompt: "Ordre d'évacuer la rame (colis abords) :",
        choices: [
          "Prévenir clients, évacuation selon règles sécurité (4.6 B)",
          "Descente côté entrevoie sans avis",
          "Repartir",
          "Portes ouvertes en marche",
        ],
        correct: 0,
        explanation: "Renvoi règles évacuation (p.69).",
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
        prompt: "Chute de LAC : descente des voyageurs…",
        choices: [
          "Uniquement quand PCC confirme LAC non alimentée",
          "Immédiatement",
          "Côté entrevoie toujours",
          "Par le toit",
        ],
        correct: 0,
        explanation: "Attente coupure confirmée PCC (p.70).",
      },
      {
        id: "ch4-45b-02",
        prompt: "Avarie pantographe après chute LAC : conducteur…",
        choices: [
          "Ne monte pas sur la toiture (risque électrique)",
          "Répare en toiture",
          "Remonte pantographe seul",
          "Pousse la LAC",
        ],
        correct: 0,
        explanation: "Interdiction montée toiture (p.70).",
      },
      {
        id: "ch4-45b-03",
        prompt: "Avant descente clients (LAC) : informer qu'ils…",
        choices: [
          "Ne doivent pas descendre tant que LAC alimentée",
          "Peuvent descendre librement",
          "Montent sur le toit",
          "Courent sur la voie",
        ],
        correct: 0,
        explanation: "Interdiction descente avant coupure (p.70).",
      },
      {
        id: "ch4-45b-04",
        prompt: "Chute d'arbre sur voie ou rame :",
        choices: [
          "Mêmes consignes que chute de LAC",
          "Ignorer",
          "40 km/h",
          "Remorquage seul",
        ],
        correct: 0,
        explanation: "Note bas de page p.70.",
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
        prompt: "Inondation < 10 cm (sous bande rouge du repère) :",
        choices: [
          "Franchir en conduite manœuvre 5 km/h et informer PCC",
          "40 km/h",
          "Arrêt systématique",
          "Évacuation",
        ],
        correct: 0,
        explanation: "CM 5 km/h + PCC (p.71).",
      },
      {
        id: "ch4-45c-02",
        prompt: "Inondation > 10 cm (au-dessus repère rouge) :",
        choices: [
          "Arrêt, détresse, urgence, ordres PCC, info voyageurs",
          "5 km/h",
          "30 km/h",
          "Poursuite",
        ],
        correct: 0,
        explanation: "Arrêt et procédure complète (p.71).",
      },
      {
        id: "ch4-45c-03",
        prompt: "Évacuation longue immobilisation (inondation) : PMR/enfants…",
        choices: [
          "Peuvent rester à bord en attendant assistance si ils le souhaitent",
          "Doivent descendre immédiatement",
          "Interdit de rester",
          "Descente toit",
        ],
        correct: 0,
        explanation: "Précision évacuation p.71.",
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
          "Accident sur quai sans implication de votre rame (témoin) :",
        choices: [
          "Arrêt, détresse, urgence, secours, éviter second accident, PCC",
          "Poursuite sans arrêt",
          "Klaxon et repartir",
          "Évacuation de votre rame seule",
        ],
        correct: 0,
        explanation: "Six étapes témoin conducteur (p.72).",
      },
      {
        id: "ch4-45d-02",
        prompt: "Reprise possible après accident plate-forme :",
        choices: [
          "Informer PCC dès que reprise envisageable",
          "Repartir sans avis",
          "Attendre la police uniquement",
          "Fin de service automatique",
        ],
        correct: 0,
        explanation: "Information PCC pour reprise (p.72).",
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
        prompt: "LAC endommagée ou tendeur cassé :",
        choices: [
          "Arrêt impératif et appel PCC",
          "5 km/h",
          "Informer en fin de service",
          "Poursuite",
        ],
        correct: 0,
        explanation: "Liste arrêt obligatoire p.73.",
      },
      {
        id: "ch4-46a-02",
        prompt: "Corps étranger dans gorge de rail ou aiguillage :",
        choices: [
          "Arrêt et PCC",
          "Dégager seul",
          "Klaxon",
          "40 km/h",
        ],
        correct: 0,
        explanation: "Arrêt obligatoire (p.73).",
      },
      {
        id: "ch4-46a-03",
        prompt: "Croisement rame arrêtée : conducteur absent de cabine :",
        choices: [
          "Arrêt et PCC",
          "Passer à 10 km/h",
          "Klaxonner",
          "Ignorer",
        ],
        correct: 0,
        explanation: "Cas listé p.73.",
      },
      {
        id: "ch4-46a-04",
        prompt: "Individu accroché à une rame :",
        choices: [
          "Arrêt et PCC",
          "Accélérer",
          "FU sans appel",
          "Continuer",
        ],
        correct: 0,
        explanation: "Arrêt obligatoire (p.73).",
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
        prompt: "Feux éteints sur une autre rame :",
        choices: [
          "Prévenir le PCC (sans arrêt immédiat imposé)",
          "Arrêt FU",
          "Ignorer",
          "Couper sa LAC",
        ],
        correct: 0,
        explanation: "Colonne B p.73.",
      },
      {
        id: "ch4-46b-02",
        prompt: "Objet accroché à une rame ou comportement suspect au quai :",
        choices: [
          "Prévenir le PCC",
          "Arrêt systématique",
          "Descendre poursuivre",
          "Klaxon continu",
        ],
        correct: 0,
        explanation: "Signalement PCC (p.73).",
      },
      {
        id: "ch4-46b-03",
        prompt: "Arbre ou poteau menaçant la voie :",
        choices: [
          "Prévenir le PCC",
          "Passer vite",
          "Couper les branches seul",
          "Évacuation",
        ],
        correct: 0,
        explanation: "Prévenir PCC (p.73).",
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
        prompt: "Immobilisation en pleine voie :",
        choices: [
          "Détresse ou triangle, appel urgence, informer clients",
          "Repartir",
          "Sans signalisation",
          "Évacuation immédiate sans appel",
        ],
        correct: 0,
        explanation: "Trois étapes 4.7-A (p.74).",
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
        prompt: "Évacuation en pleine voie :",
        choices: [
          "Après accord confirmé PCC",
          "Dès l'arrêt",
          "Par le PCC seul sans conducteur",
          "Côté entrevoie sans condition",
        ],
        correct: 0,
        explanation: "Accord PCC préalable (p.74).",
      },
      {
        id: "ch4-47b-02",
        prompt: "Évacuation : ouverture des portes…",
        choices: [
          "Côté droit sens de marche ; conducteur descend en premier",
          "Les deux côtés",
          "Côté entrevoie systématique",
          "Arrière seulement",
        ],
        correct: 0,
        explanation: "Porte droite, contrôle danger (p.74).",
      },
      {
        id: "ch4-47b-03",
        prompt: "Incendie ou force majeure : évacuation…",
        choices: [
          "Possible sans autorisation PCC",
          "Interdite",
          "Uniquement la nuit",
          "Par le toit",
        ],
        correct: 0,
        explanation: "Exception incendie/force majeure (encadré p.74).",
      },
      {
        id: "ch4-47b-04",
        prompt: "Évacuation côté entrevoie si danger côté droit :",
        choices: [
          "Uniquement après autorisation PCC (trafic antagoniste arrêté)",
          "Libre",
          "Interdit toujours",
          "Sans contrôle",
        ],
        correct: 0,
        explanation: "PCC garantit arrêt circulation opposée (p.74).",
      },
      {
        id: "ch4-47b-05",
        prompt: "Voie unique Sabines–SJD : évacuation sans bus relais…",
        choices: [
          "Chemin piéton le long de la voie vers arrêt bus de substitution",
          "Rester sur voie",
          "Tunnel obligatoire",
          "40 km/h",
        ],
        correct: 0,
        explanation: "Particularité voie unique p.74.",
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
        prompt: "Immobilisation en tunnel :",
        choices: [
          "Détresse ou triangle, urgence, détresse si pas de réponse, informer clients",
          "Repartir",
          "Sans appel",
          "Évacuation immédiate",
        ],
        correct: 0,
        explanation: "Appel détresse si pas de réponse (p.75).",
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
        prompt: "Évacuation tunnel : après accord PCC…",
        choices: [
          "Informer clients, porte droite, diriger vers sortie la plus proche",
          "Côté entrevoie direct",
          "Marche arrière",
          "Sans accompagnement",
        ],
        correct: 0,
        explanation: "Évacuation vers sortie proche (p.75).",
      },
      {
        id: "ch4-47d-02",
        prompt: "Cas 4.7 A à D : en fin de procédure…",
        choices: [
          "Noter l'incident sur la feuille de route",
          "Rien",
          "SAT seul",
          "Quitter le service",
        ],
        correct: 0,
        explanation: "Note commune bas de page p.75.",
      },
    ],
  },
];
