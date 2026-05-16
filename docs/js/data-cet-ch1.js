/** CET ch. 1 — Utilisation du matériel roulant (pages 3–19) */
export const MODULES_CH1 = [
  // ─── 1.1-A Entrée dans la rame ────────────────────────────
  {
    id: "prep-11a",
    code: "1.1-A",
    title: "Préparation de la rame — Entrée côté droit",
    cetPage: 4,
    questions: [
      {
        id: "ch1-11a-01",
        prompt:
          "Quand le conducteur est-il dispensé de la préparation de la rame ?",
        choices: [
          "Si un autre agent habilité l'a déjà faite ou si la rame a déjà roulé le matin au dépôt",
          "Uniquement le dimanche",
          "Sur accord oral du régulateur",
          "Si le service commence après 10 h",
        ],
        correct: 0,
        explanation:
          "Dispense si préparation déjà effectuée (jockey, etc.) ou rame déjà en service le matin (p.4).",
      },
      {
        id: "ch1-11a-02",
        prompt:
          "Un signalement majeur ou à impact sécurité se traite par :",
        choices: [
          "Appel immédiat au PCC",
          "Inscription au SAT uniquement",
          "Fin de service",
          "Courrier au dépôt le lendemain",
        ],
        correct: 0,
        explanation: "Sécurité : appel immédiat au PCC ; autres anomalies au SAT (p.4).",
      },
      {
        id: "ch1-11a-03",
        prompt: "À quoi servent les deux cales en bois embarquées ?",
        choices: [
          "Maintenir une rame dont les freins sont isolés",
          "Bloquer les portes voyageurs",
          "Caler le pantographe",
          "Signaliser un obstacle sur voie",
        ],
        correct: 0,
        explanation: "Agrès pour maintien rame freins isolés (p.4).",
      },
      {
        id: "ch1-11a-04",
        prompt:
          "Absence de 24 V sur Citadis 402 : où actionner le commutateur batterie ?",
        choices: ["Sur l'AEL", "Dans le voussoir uniquement", "Sous le siège", "Au PCC"],
        correct: 0,
        explanation: "402 : commutateur sur l'AEL ; autres types souvent dans le voussoir (p.4).",
      },
      {
        id: "ch1-11a-05",
        prompt: "Première étape d'entrée par la porte de service (côté droit) :",
        choices: [
          "Déverrouiller avec la clé de service",
          "Fermer avec la clé KC",
          "Appeler le PCC",
          "Vérifier le SIE",
        ],
        correct: 0,
        explanation: "Clé de service sur le dispositif de verrouillage, puis entrée (p.4).",
      },
    ],
  },

  // ─── 1.1-B Test cabine de queue ───────────────────────────
  {
    id: "prep-11b",
    code: "1.1-B",
    title: "Test de la cabine de queue",
    cetPage: 5,
    questions: [
      {
        id: "ch1-11b-01",
        prompt: "Test cabine de queue : position initiale du commutateur de conduite ?",
        choices: ["P", "CN", "N", "FNS"],
        correct: 0,
        explanation: "Clé sur P avant vérifications, puis passage CN (p.5).",
      },
      {
        id: "ch1-11b-02",
        prompt: "Durée d'allumage des voyants de contrôle au test ?",
        choices: ["5 secondes", "10 secondes", "Jusqu'à extinction", "1 minute"],
        correct: 0,
        explanation: "Voyants de contrôle allumés 5 s (p.5).",
      },
      {
        id: "ch1-11b-03",
        prompt: "Après initialisation SIE, le voyant attendu est :",
        choices: [
          "Rame en service",
          "Portes ouvertes uniquement",
          "Vitesse limitée",
          "Défaut frein uniquement",
        ],
        correct: 0,
        explanation: "Initialisation SIE : voyant « rame en service » (p.5).",
      },
      {
        id: "ch1-11b-04",
        prompt:
          "Onglet SIE « état de train » : que vérifier (hors 402 pour présences tension) ?",
        choices: [
          "Cabine en service, pantographe, disjoncteur, présences tension",
          "Uniquement la girouette",
          "Kilométrage et horaires",
          "Liste des arrêts",
        ],
        correct: 0,
        explanation: "Quatre points listés ; présences tension sauf sur 402 (p.5).",
      },
      {
        id: "ch1-11b-05",
        prompt: "Avant les tests voyants, on tourne la clé sur :",
        choices: ["CN", "P", "N", "FS"],
        correct: 0,
        explanation: "Étape 6 : clé sur CN pour test des voyants (p.5).",
      },
    ],
  },

  // ─── 1.1-C Pupitre gauche ─────────────────────────────────
  {
    id: "prep-11c",
    code: "1.1-C",
    title: "Test pupitre gauche et console",
    cetPage: 6,
    questions: [
      {
        id: "ch1-11c-01",
        prompt: "Bouton à accrochage lumineux du pupitre gauche : fonction testée ?",
        choices: [
          "Dégivrage pare-brise",
          "Sablage",
          "Descente pantographe",
          "Ouverture générale des portes",
        ],
        correct: 0,
        explanation: "BP accrochage : dégivrage (p.6).",
      },
      {
        id: "ch1-11c-02",
        prompt: "Test interphonie cabine (impulsion) comprend :",
        choices: [
          "Essai micro",
          "Essai klaxon uniquement",
          "Test patins",
          "Programmation girouette",
        ],
        correct: 0,
        explanation: "Interphonie + essai micro (p.6).",
      },
      {
        id: "ch1-11c-03",
        prompt: "Lave-glace et essuie-glaces (pupitre gauche) concernent :",
        choices: [
          "Citadis 401 uniquement",
          "Toutes les rames",
          "Citadis 402 uniquement",
          "Citadis 302 uniquement",
        ],
        correct: 0,
        explanation: "Lave-glace et essuie-glaces : 401 uniquement (p.6).",
      },
      {
        id: "ch1-11c-04",
        prompt: "Fin du test pupitre gauche : appel PCC depuis la loge de départ :",
        choices: [
          "Test Cabine M1 (ou M2)",
          "Sortie dépôt",
          "Haut le pied",
          "Remorquage",
        ],
        correct: 0,
        explanation: "Appel « Test Cabine M1 (ou M2) » (p.6).",
      },
    ],
  },

  // ─── 1.1-D Pupitre droit ──────────────────────────────────
  {
    id: "prep-11d",
    code: "1.1-D",
    title: "Test pupitre droit",
    cetPage: 7,
    questions: [
      {
        id: "ch1-11d-01",
        prompt: "Citadis 401 : ouverture générale des portes au test exige :",
        choices: [
          "Sélection côtés droit et gauche",
          "Côté droit seul",
          "Mode dégradé portes",
          "Accord PCC préalable",
        ],
        correct: 0,
        explanation: "401 : droit et gauche pour ouverture générale (p.7).",
      },
      {
        id: "ch1-11d-02",
        prompt: "Vérification portes ouvertes : indicateurs à contrôler ?",
        choices: [
          "Rétrovision, SIE, voyant porte ouverte",
          "Girouette seule",
          "Tachymètre",
          "Feux de route",
        ],
        correct: 0,
        explanation: "Trois contrôles listés (p.7).",
      },
      {
        id: "ch1-11d-03",
        prompt: "Test patins : que vérifier sur le SIE ?",
        choices: [
          "Pictogramme associé",
          "Vitesse 70 km/h",
          "Girouette",
          "Présence tension ligne",
        ],
        correct: 0,
        explanation: "Frein magnétique/patins : pictogramme SIE (p.7).",
      },
      {
        id: "ch1-11d-04",
        prompt: "Essuie-glaces au pupitre droit : matériel concerné ?",
        choices: ["Citadis 302", "Citadis 401", "Citadis 402", "Tous"],
        correct: 0,
        explanation: "Commutateur essuie-glaces : 302 uniquement (p.7).",
      },
      {
        id: "ch1-11d-05",
        prompt: "Sortie de cabine en fin de test : clé sur … puis contrôle …",
        choices: [
          "N — verrouillage porte cabine",
          "CN — portes voyageurs",
          "P — pantographe",
          "FNS — frein service",
        ],
        correct: 0,
        explanation: "Clé N, retrait, sortie en vérifiant verrouillage porte cabine (p.7).",
      },
    ],
  },

  // ─── 1.1-E Intérieur rame ─────────────────────────────────
  {
    id: "prep-11e",
    code: "1.1-E",
    title: "Vérifications à l'intérieur de la rame",
    cetPage: 8,
    questions: [
      {
        id: "ch1-11e-01",
        prompt: "En se dirigeant vers la cabine de tête, on contrôle notamment :",
        choices: [
          "Éclairage, ventilation, état intérieur, agrès pantographe, cablôts, soufflets",
          "Uniquement les sièges",
          "La girouette",
          "Le poste PCC",
        ],
        correct: 0,
        explanation: "Sept points de contrôle intérieurs (p.8).",
      },
      {
        id: "ch1-11e-02",
        prompt: "Agrès dans le voussoir nacelle pantographe :",
        choices: [
          "Cales, manivelles, triangle",
          "Extincteur CO2 uniquement",
          "Barres d'aiguillage",
          "Consignes d'exploitation",
        ],
        correct: 0,
        explanation: "Cales, manivelle, triangle dans voussoir pantographe (p.8).",
      },
      {
        id: "ch1-11e-03",
        prompt: "Avant d'entrer en cabine de tête :",
        choices: ["Badger", "Couper la batterie", "Descendre le pantographe", "Appeler le PCC"],
        correct: 0,
        explanation: "Badger avant entrée cabine (p.8).",
      },
      {
        id: "ch1-11e-04",
        prompt: "Les cablôts doivent être présents :",
        choices: ["Dans les voussoirs", "Sous chaque siège", "En cabine uniquement", "Au dépôt"],
        correct: 0,
        explanation: "Présence cablôts dans les voussoirs (p.8).",
      },
    ],
  },

  // ─── 1.1-F Cabine de tête ─────────────────────────────────
  {
    id: "prep-11f",
    code: "1.1-F",
    title: "Test de la cabine de tête",
    cetPage: 8,
    questions: [
      {
        id: "ch1-11f-01",
        prompt: "Tests cabine de tête par rapport à la cabine de queue :",
        choices: [
          "Identiques, plus feux détresse, antibrouillard, self droit/gauche, manipulateur FNS, sortie porte service",
          "Uniquement le SIE",
          "Sans test portes",
          "Sans feux",
        ],
        correct: 0,
        explanation: "Tests queue + feux, self, FNS, sortie porte service (p.8).",
      },
      {
        id: "ch1-11f-02",
        prompt: "En cabine de tête, le manipulateur est positionné sur :",
        choices: ["FNS", "Neutre", "FS", "P"],
        correct: 0,
        explanation: "Manipulateur sur FNS (p.8).",
      },
      {
        id: "ch1-11f-03",
        prompt: "Sélection des côtés d'ouverture en cabine de tête :",
        choices: [
          "Droit et gauche en self service",
          "Droit seul",
          "Gauche seul",
          "Sans sélection",
        ],
        correct: 0,
        explanation: "Self service droit et gauche (p.8).",
      },
      {
        id: "ch1-11f-04",
        prompt: "Sortie de la rame après test cabine de tête :",
        choices: [
          "Par la porte de service",
          "Par la première porte voyageur",
          "Par le toit",
          "Par la cabine de queue",
        ],
        correct: 0,
        explanation: "Descente par porte de service (p.8).",
      },
    ],
  },

  // ─── 1.1-G Extérieur ──────────────────────────────────────
  {
    id: "prep-11g",
    code: "1.1-G",
    title: "Vérifications extérieures de la rame",
    cetPage: 9,
    questions: [
      {
        id: "ch1-11g-01",
        prompt: "Contrôle éclairage extérieur : comprend notamment …",
        choices: [
          "Codes, feu pilote, antibrouillard, détresse, feux gabarit, rouges, stops",
          "Girouette uniquement",
          "Intérieur cabine",
          "Sablage",
        ],
        correct: 0,
        explanation: "Liste feux et codes (p.9).",
      },
      {
        id: "ch1-11g-02",
        prompt: "Carrosserie : on recherche notamment …",
        choices: [
          "Impacts, rayures, éléments en débord de gabarit",
          "Couleur de peinture",
          "Numéro de parc",
          "Pression pneus",
        ],
        correct: 0,
        explanation: "État carrosserie et gabarit (p.9).",
      },
      {
        id: "ch1-11g-03",
        prompt: "Anomalie d'état de la rame constatée en préparation :",
        choices: [
          "Signalement au PCC",
          "Attendre la fin de service",
          "Corriger seul sur voie",
          "Ignorer si mineure",
        ],
        correct: 0,
        explanation: "Toute anomalie d'état → PCC (p.9).",
      },
      {
        id: "ch1-11g-04",
        prompt: "Contrôle pantographe :",
        choices: [
          "Bras, cornes, patins carbone",
          "Uniquement hauteur",
          "Uniquement en mouvement",
          "Par le PCC à distance",
        ],
        correct: 0,
        explanation: "État général bras, cornes, carbone (p.9).",
      },
    ],
  },

  // ─── 1.1-H Préparation sortie ───────────────────────────
  {
    id: "prep-11h",
    code: "1.1-H",
    title: "Préparation de la sortie",
    cetPage: 9,
    questions: [
      {
        id: "ch1-11h-01",
        prompt: "Chasse-corps : contrôle à effectuer …",
        choices: [
          "À chaque entrée dans une nouvelle rame, toutes cabines, y compris en service",
          "Une fois par mois",
          "Uniquement au dépôt le matin",
          "Par le PCC uniquement",
        ],
        correct: 0,
        explanation: "Absence de verrouillage chasse-corps à chaque nouvelle rame (p.9).",
      },
      {
        id: "ch1-11h-02",
        prompt: "Côté de service en sortie : sélection par …",
        choices: ["BPIL", "FS", "Manipulateur FNS", "Triangle"],
        correct: 0,
        explanation: "BPIL pour le côté de service (p.9).",
      },
      {
        id: "ch1-11h-03",
        prompt: "Avant sortie dépôt : appel radio SAE pour …",
        choices: [
          "Autorisation de sortie et signalement anomalies",
          "Horaires pause",
          "Changement de ligne",
          "Test veille uniquement",
        ],
        correct: 0,
        explanation: "Autorisation sortie + anomalies (p.9).",
      },
      {
        id: "ch1-11h-04",
        prompt: "En zone d'injection ligne, tests obligatoires :",
        choices: [
          "Télécommande d'aiguille et balise Petrarque",
          "Gong et klaxon seuls",
          "Frein de secours",
          "Évacuation",
        ],
        correct: 0,
        explanation: "Tests aiguille et Petrarque au dépôt (p.9).",
      },
      {
        id: "ch1-11h-05",
        prompt: "Rétrovision en sortie : activation …",
        choices: [
          "Sur écran SIE si non active",
          "Uniquement en station",
          "Par le régulateur",
          "Interdite au dépôt",
        ],
        correct: 0,
        explanation: "Activer rétrovision SIE si besoin (p.9).",
      },
    ],
  },

  // ─── 1.2 Dé-préparation (principes) ───────────────────────
  {
    id: "deprep-12",
    code: "1.2",
    title: "Dé-préparation de la rame — Principes",
    cetPage: 10,
    questions: [
      {
        id: "ch1-12-01",
        prompt: "La dé-préparation vise notamment à :",
        choices: [
          "Mettre la rame hors service, abaisser le pantographe et couper l'alimentation",
          "Préparer la rame au départ commercial",
          "Tester les portes en ligne",
          "Régler la girouette",
        ],
        correct: 0,
        explanation: "Séquence : hors service, pantographe, batterie (p.10–11).",
      },
      {
        id: "ch1-12-02",
        prompt: "Au dépôt, la clé KC lors de la dé-préparation remisage :",
        choices: [
          "Reste dans la rame",
          "Est emportée par le conducteur",
          "Est envoyée au PCC",
          "Est détruite",
        ],
        correct: 0,
        explanation: "Dépôt : clé KC reste dans la rame (p.11).",
      },
      {
        id: "ch1-12-03",
        prompt: "Mise hors service : commande utilisée ?",
        choices: [
          "Bouton à impulsion mise hors service",
          "FS coup de poing",
          "FU manipulateur",
          "BPAL ouverture",
        ],
        correct: 0,
        explanation: "BP impulsion mise hors service (p.10–11).",
      },
      {
        id: "ch1-12-04",
        prompt: "Descente pantographe Citadis 402 au remisage :",
        choices: [
          "Commande temporisée depuis la cabine (~2 min)",
          "Immédiate sans délai",
          "Interdite le soir",
          "Réservée au PCC",
        ],
        correct: 0,
        explanation: "402 : commande cabine temporisée ~2 min (p.11).",
      },
    ],
  },

  // ─── 1.2.1 Dé-préparation en ligne ────────────────────────
  {
    id: "deprep-121",
    code: "1.2.1",
    title: "Dé-préparation de la rame en ligne",
    cetPage: 10,
    questions: [
      {
        id: "ch1-121-01",
        prompt: "Dé-préparation complète en ligne : autorisation …",
        choices: [
          "PCC obligatoire, après évacuation voyageurs",
          "Conducteur seul au terminus",
          "Maintenance uniquement",
          "Sans condition",
        ],
        correct: 0,
        explanation: "PCC + évacuation ; ordre strict (p.10).",
      },
      {
        id: "ch1-121-02",
        prompt:
          "Risque si la séquence de dé-préparation en ligne n'est pas respectée :",
        choices: [
          "Recul de la rame",
          "Survitesse automatique",
          "Ouverture girouette",
          "Perte radio seule",
        ],
        correct: 0,
        explanation: "Risque de recul si ordre non respecté (p.10).",
      },
      {
        id: "ch1-121-03",
        prompt:
          "Hors coupure LAC impérative, le PCC n'autorise la dé-préparation en ligne qu'au :",
        choices: ["Terminus", "Milieu de section", "Quai double", "Dépôt"],
        correct: 0,
        explanation: "En ligne : terminus sauf coupure LAC impérative (p.10).",
      },
      {
        id: "ch1-121-04",
        prompt: "Mise hors service en ligne : première action sur le manipulateur ?",
        choices: ["Neutre", "FNS", "FS", "Marche arrière"],
        correct: 0,
        explanation: "Manipulateur sur neutre, clé KC sur N (p.10).",
      },
      {
        id: "ch1-121-05",
        prompt: "FS en dé-préparation en ligne (302/402) :",
        choices: [
          "Facultatif ; sur 302 réarmement DJ FS à changement de cabine",
          "Toujours obligatoire",
          "Interdit",
          "Remplace la coupure batterie",
        ],
        correct: 0,
        explanation: "FS optionnel ; 302 : réarmement DJ FS (p.10).",
      },
    ],
  },

  // ─── 1.2.2 Dé-préparation remisage ─────────────────────────
  {
    id: "deprep-122",
    code: "1.2.2",
    title: "Dé-préparation pour remisage",
    cetPage: 11,
    questions: [
      {
        id: "ch1-122-01",
        prompt: "Dé-préparation remisage : après neutre et clé N, on actionne :",
        choices: [
          "Descente pantographe puis feuille de route puis mise hors service",
          "Mise en service directe",
          "FU",
          "Ouverture portes voyageurs",
        ],
        correct: 0,
        explanation: "Séquence p.11 : pantographe, feuille de route, hors service.",
      },
      {
        id: "ch1-122-02",
        prompt: "Coupure batterie au remisage (cas le plus fréquent) :",
        choices: [
          "Souvent non coupée si nettoyage rame le soir",
          "Toujours immédiate en cabine",
          "Interdite",
          "Par le PCC",
        ],
        correct: 0,
        explanation: "Commutateur voussoir sauf nettoyage soir (p.11).",
      },
      {
        id: "ch1-122-03",
        prompt: "Dernière opération décrite : porte voyageur côté droit …",
        choices: [
          "Déverrouiller, ouvrir, reverrouiller et fermer",
          "Laisser ouverte",
          "Condamner au FS",
          "Ouvrir les deux côtés",
        ],
        correct: 0,
        explanation: "Porte simple accès droit : cycle ouverture/fermeture (p.11).",
      },
      {
        id: "ch1-122-04",
        prompt: "Feuille de route en fin de dé-préparation : compléter …",
        choices: [
          "Kilomètres et horaires",
          "Uniquement le numéro de rame",
          "La liste clients",
          "Le plan Vigipirate",
        ],
        correct: 0,
        explanation: "Feuille de route : km et horaires (p.11).",
      },
    ],
  },

  // ─── 1.3 SIE ──────────────────────────────────────────────
  {
    id: "sie-13",
    code: "1.3",
    title: "Utilisation du SIE",
    cetPage: 12,
    questions: [
      {
        id: "ch1-13-01",
        prompt: "Le SIE renseigne notamment sur :",
        choices: [
          "Tension ligne, HT, portes/côté service, appels voyageurs, girouette",
          "Horaires bus de correspondance",
          "Tarification",
          "Maintenance atelier",
        ],
        correct: 0,
        explanation: "Cinq familles d'information (p.12).",
      },
      {
        id: "ch1-13-02",
        prompt: "En cas d'alerte SIE, le conducteur agit …",
        choices: [
          "Selon SIE, chapitre 1.8 et instructions PCC",
          "Sans consulter le PCC",
          "En arrêt d'urgence systématique",
          "En fin de journée",
        ],
        correct: 0,
        explanation: "SIE + consignes 1.8 + PCC (p.12).",
      },
      {
        id: "ch1-13-03",
        prompt: "Le SIE guide le conducteur pour les pannes en indiquant :",
        choices: [
          "Origine, localisation, actions curatives et vitesses limites",
          "Uniquement l'arrêt suivant",
          "Le nom des voyageurs",
          "La météo",
        ],
        correct: 0,
        explanation: "Pannes : origine, lieu, actions, V max (p.12).",
      },
      {
        id: "ch1-13-04",
        prompt: "Emplacement du SIE :",
        choices: [
          "Écran tactile console de chaque cabine",
          "Quai uniquement",
          "Téléphone personnel",
          "SAE dépôt",
        ],
        correct: 0,
        explanation: "Écran tactile sur console cabine (p.12).",
      },
    ],
  },

  // ─── 1.4-A FU ─────────────────────────────────────────────
  {
    id: "frein-14a",
    code: "1.4-A",
    title: "Freinage — Frein d'urgence (FU)",
    cetPage: 14,
    questions: [
      {
        id: "ch1-14a-01",
        prompt: "Le FU est utilisé …",
        choices: [
          "Uniquement en danger immédiat",
          "À chaque station",
          "Pour le parking",
          "En remplacement du FNS",
        ],
        correct: 0,
        explanation: "FU : danger immédiat seulement (p.14).",
      },
      {
        id: "ch1-14a-02",
        prompt: "Le FU déclenche simultanément :",
        choices: [
          "Freinage électrique, mécanique et électromagnétique",
          "Patins seuls",
          "Frein parking",
          "Sablage manuel",
        ],
        correct: 0,
        explanation: "Trois modes jusqu'à l'arrêt (p.14).",
      },
      {
        id: "ch1-14a-03",
        prompt: "Après un FU, avant redépart :",
        choices: [
          "Vérifier absence de blessés (annonce cabine)",
          "Reprendre sans contrôle",
          "FS obligatoire",
          "Évacuation systématique",
        ],
        correct: 0,
        explanation: "Annonce et contrôle passagers (p.14).",
      },
      {
        id: "ch1-14a-04",
        prompt: "Utilisation du FU : le chasse-corps …",
        choices: [
          "Ne descend pas ; action au détecteur de barre",
          "Descend toujours",
          "Est inhibé 10 min",
          "Bloque les portes",
        ],
        correct: 0,
        explanation: "FU ne fait pas descendre le chasse-corps (p.14).",
      },
      {
        id: "ch1-14a-05",
        prompt: "Patins en adhérence faible : utilisation autorisée …",
        choices: [
          "À l'occasion pour démarrer en côte, pas en phase de freinage",
          "En permanence en freinage",
          "Jamais",
          "À la place du FU",
        ],
        correct: 0,
        explanation: "Patins : départ possible, interdit en freinage (p.14).",
      },
    ],
  },

  // ─── 1.4-B FS ─────────────────────────────────────────────
  {
    id: "frein-14b",
    code: "1.4-B",
    title: "Freinage — Frein de secours (FS)",
    cetPage: 14,
    questions: [
      {
        id: "ch1-14b-01",
        prompt: "Le FS est commandé par :",
        choices: [
          "Bouton coup de poing",
          "Manipulateur FNS",
          "BPAL",
          "Veille automatique",
        ],
        correct: 0,
        explanation: "FS : bouton coup de poing (p.13–14).",
      },
      {
        id: "ch1-14b-02",
        prompt: "Après un FU, le FS est :",
        choices: [
          "Interdit (annule freinage électrique et antipatinage)",
          "Obligatoire",
          "Sans effet",
          "Autorisé à 70 km/h",
        ],
        correct: 0,
        explanation: "Interdit après FU : risque blocage roues (p.14).",
      },
      {
        id: "ch1-14b-03",
        prompt: "FS déclenché à 70 km/h : vitesse max ensuite pendant 10 min ?",
        choices: ["40 km/h", "20 km/h", "15 km/h", "70 km/h"],
        correct: 0,
        explanation: "40 km/h strict pendant 10 min après FS à 70 (p.14).",
      },
      {
        id: "ch1-14b-04",
        prompt: "Cas d'usage du FS :",
        choices: [
          "Défaillance autres freins, rame à l'arrêt, personne sous rame, urgence sans maîtrise",
          "Chaque arrêt station",
          "Remplacement FNS courant",
          "Test quotidien",
        ],
        correct: 0,
        explanation: "Quatre cas listés p.14.",
      },
      {
        id: "ch1-14b-05",
        prompt: "Sur les 5 modes de freinage, à la main du conducteur :",
        choices: [
          "Les 3 premiers (FNS, FU, FS)",
          "Tous les cinq",
          "Aucun",
          "Parking seul",
        ],
        correct: 0,
        explanation: "Modes 1–3 conducteur ; 4–5 automatiques (p.13).",
      },
    ],
  },

  // ─── 1.5 Sablières ────────────────────────────────────────
  {
    id: "sabl-15",
    code: "1.5",
    title: "Utilisation des sablières",
    cetPage: 15,
    questions: [
      {
        id: "ch1-15-01",
        prompt: "Rôle des sablières :",
        choices: [
          "Augmenter l'adhérence et limiter l'enrayage",
          "Refroidir les moteurs",
          "Nettoyer les rails",
          "Lubrifier les courbes",
        ],
        correct: 0,
        explanation: "Adhérence roue/rail (p.15).",
      },
      {
        id: "ch1-15-02",
        prompt: "Sablage automatique :",
        choices: [
          "En phase de freinage",
          "À l'ouverture des portes",
          "Uniquement au dépôt",
          "À 70 km/h",
        ],
        correct: 0,
        explanation: "Automatique au freinage (p.15).",
      },
      {
        id: "ch1-15-03",
        prompt: "Sablage manuel recommandé si :",
        choices: [
          "Rail glissant (feuilles, verglas, pluie fine…)",
          "Passage piéton",
          "Gong en panne",
          "Haut le pied",
        ],
        correct: 0,
        explanation: "Adhérence dégradée : action manuelle (p.15).",
      },
      {
        id: "ch1-15-04",
        prompt: "Sablières équipent :",
        choices: ["Bogies moteurs", "Tous les bogies", "Cabine", "Pantographe"],
        correct: 0,
        explanation: "Bogies moteurs uniquement (p.15).",
      },
    ],
  },

  // ─── 1.6 Veille automatique ───────────────────────────────
  {
    id: "veille-16",
    code: "1.6",
    title: "Veille automatique",
    cetPage: 15,
    questions: [
      {
        id: "ch1-16-01",
        prompt: "Objectif de la veille automatique :",
        choices: [
          "Arrêt en cas de malaise du conducteur",
          "Maintenir la vitesse cruise",
          "Contrôler les signaux",
          "Ouvrir les portes",
        ],
        correct: 0,
        explanation: "Sécurité conducteur (p.15).",
      },
      {
        id: "ch1-16-02",
        prompt: "Disfonctionnement veille : conduite immédiate ?",
        choices: [
          "Arrêt station la plus proche, détresse, PCC et clientèle",
          "Poursuite terminus",
          "Retour dépôt à vide sans appel",
          "Isolation sans PCC",
        ],
        correct: 0,
        explanation: "Arrêt, détresse, informations (p.15).",
      },
      {
        id: "ch1-16-03",
        prompt: "Isolation veille autorisée si :",
        choices: [
          "Accord PCC et personne habilitée au frein de secours",
          "Décision conducteur seul",
          "Rame vide",
          "Visibilité > 200 m",
        ],
        correct: 0,
        explanation: "PCC + accompagnement FS (p.15).",
      },
      {
        id: "ch1-16-04",
        prompt: "Vitesse max en ligne si veille isolée :",
        choices: ["40 km/h", "20 km/h", "70 km/h", "15 km/h"],
        correct: 0,
        explanation: "40 km/h en isolation (p.15).",
      },
      {
        id: "ch1-16-05",
        prompt: "Relâchement veille non impératif entre stations sur :",
        choices: ["302 et 402", "401 uniquement", "Toutes rames", "Dépôt"],
        correct: 0,
        explanation: "401 : appui/relâchement ; 302/402 : pression continue (p.15).",
      },
    ],
  },

  // ─── 1.7 Anomalies matériel ───────────────────────────────
  {
    id: "anom-17",
    code: "1.7",
    title: "Constat d'anomalies sur le matériel",
    cetPage: 16,
    questions: [
      {
        id: "ch1-17-01",
        prompt:
          "Vibrations anormales, cache bogie ouvert ou pantographe détérioré :",
        choices: [
          "Arrêt impératif et appel PCC",
          "Poursuite à 40 km/h",
          "Fin de journée",
          "SAT en fin de service",
        ],
        correct: 0,
        explanation: "Arrêt et PCC (p.16).",
      },
      {
        id: "ch1-17-02",
        prompt: "Perte de tension (hors micro-coupures) :",
        choices: [
          "Contrôle visuel pantographe, arrêt sécurisé, appel PCC",
          "Poursuite lente",
          "FS immédiat en marche",
          "Ignorer",
        ],
        correct: 0,
        explanation: "Sortie cabine, arrêt, PCC ; risque LAC (p.16).",
      },
      {
        id: "ch1-17-03",
        prompt: "Perte de tension : risque signalé ?",
        choices: [
          "Accrochage de la LAC",
          "Défaut girouette",
          "Porte cabine",
          "Gong",
        ],
        correct: 0,
        explanation: "Risque d'accrochage LAC (p.16).",
      },
      {
        id: "ch1-17-04",
        prompt: "Perte de tension ne doit pas être confondue avec :",
        choices: [
          "Micro-coupures",
          "Perte 24 V cabine",
          "Défaut girouette",
          "Sablage",
        ],
        correct: 0,
        explanation: "Distinct des micro-coupures (p.16).",
      },
    ],
  },

  // ─── 1.8-A Remorquage / poussage (tableau) ────────────────
  {
    id: "panne-18a",
    code: "1.8-A",
    title: "Pannes — Remorquage / poussage",
    cetPage: 17,
    questions: [
      {
        id: "ch1-18a-01",
        prompt: "Remorquage/poussage : vitesse maximale ?",
        choices: ["20 km/h", "40 km/h", "30 km/h", "15 km/h"],
        correct: 0,
        explanation: "V max 20 km/h (p.17).",
      },
      {
        id: "ch1-18a-02",
        prompt: "Mode remorquage/poussage possible notamment si :",
        choices: [
          "Deux freins isolés ou défaut ordre de marche",
          "Un essuie-glace HS",
          "Gong HS",
          "Sablière vide seule",
        ],
        correct: 0,
        explanation: "Cas listés colonne A p.17.",
      },
      {
        id: "ch1-18a-03",
        prompt: "Défaut ETF remorquage : codes concernés ?",
        choices: [
          "M1, M2 et NM = ? ou isolé",
          "Uniquement girouette",
          "Portes seules",
          "Climatisation",
        ],
        correct: 0,
        explanation: "Défaut ordre de marche ETF (p.17).",
      },
      {
        id: "ch1-18a-04",
        prompt: "Échec remise en service : préparer …",
        choices: [
          "Remorquage ou poussage (voir 1.9)",
          "Fin de service sans PCC",
          "Circulation commerciale",
          "Ouverture toutes portes",
        ],
        correct: 0,
        explanation: "Préparer remorquage/poussage (p.16–17).",
      },
    ],
  },

  // ─── 1.8-B Haut le pied ───────────────────────────────────
  {
    id: "panne-18b",
    code: "1.8-B",
    title: "Pannes — Haut le pied",
    cetPage: 17,
    questions: [
      {
        id: "ch1-18b-01",
        prompt: "Défaut ETF ou manipulateur (302 M1/M2 isolé) en HLP : V max ?",
        choices: ["40 km/h", "20 km/h", "25 km/h", "70 km/h"],
        correct: 0,
        explanation: "40 km/h (p.17).",
      },
      {
        id: "ch1-18b-02",
        prompt:
          "Défaut boucle sécurité FU/FS permanent (alimentation directe) : V max ?",
        choices: ["25 km/h", "40 km/h", "20 km/h", "15 km/h"],
        correct: 0,
        explanation: "25 km/h (p.17).",
      },
      {
        id: "ch1-18b-03",
        prompt: "HLP possible si console/SIE :",
        choices: [
          "SIE non opérationnel",
          "SIE nominal",
          "Girouette seule HS",
          "Pantographe bas",
        ],
        correct: 0,
        explanation: "Défaillance console / SIE HS (p.17).",
      },
      {
        id: "ch1-18b-04",
        prompt: "Défaut rétrovision quai ou zone dégagement quai : mode ?",
        choices: ["Haut le pied", "Remorquage", "Fin de tour", "Commercial"],
        correct: 0,
        explanation: "Colonnes B p.17–18.",
      },
      {
        id: "ch1-18b-05",
        prompt: "Essuie-glace ou dégivrage HS en HLP :",
        choices: [
          "Selon conditions climatiques",
          "Toujours fin de journée",
          "Interdit de rouler",
          "70 km/h",
        ],
        correct: 0,
        explanation: "Note (*) conditions climatiques (p.18).",
      },
    ],
  },

  // ─── 1.8-C Fin de tour ────────────────────────────────────
  {
    id: "panne-18c",
    code: "1.8-C",
    title: "Pannes — Fin de tour",
    cetPage: 17,
    questions: [
      {
        id: "ch1-18c-01",
        prompt: "Un frein isolé ou défaut mesure charge : V max fin de tour ?",
        choices: ["40 km/h", "20 km/h", "25 km/h", "10 km/h"],
        correct: 0,
        explanation: "40 km/h (p.17).",
      },
      {
        id: "ch1-18c-02",
        prompt: "Deux portes condamnées même côté : mode autorisé ?",
        choices: ["Fin de tour", "Remorquage", "Commercial normal", "VUT"],
        correct: 0,
        explanation: "Fin de tour (p.17).",
      },
      {
        id: "ch1-18c-03",
        prompt: "Défaut gong en fin de tour : V max ?",
        choices: ["20 km/h", "40 km/h", "15 km/h", "70 km/h"],
        correct: 0,
        explanation: "Gong HS : 20 km/h (p.18).",
      },
      {
        id: "ch1-18c-04",
        prompt: "Veille automatique HS fin de tour :",
        choices: [
          "Avec agent TaM présent, 40 km/h max",
          "Sans limite",
          "Remorquage obligatoire",
          "Interdit de bouger",
        ],
        correct: 0,
        explanation: "Agent TaM + 40 km/h (p.18).",
      },
      {
        id: "ch1-18c-05",
        prompt: "Panne phonie totale + GSM secours HS :",
        choices: ["Fin de tour", "HLP", "Remorquage", "Dépôt interdit"],
        correct: 0,
        explanation: "Colonne fin de tour (p.17).",
      },
    ],
  },

  // ─── 1.8-D Fin de journée ─────────────────────────────────
  {
    id: "panne-18d",
    code: "1.8-D",
    title: "Pannes — Fin de journée",
    cetPage: 17,
    questions: [
      {
        id: "ch1-18d-01",
        prompt: "Discordance affichage vitesse en fin de journée :",
        choices: [
          "Se référer au tachymètre",
          "Arrêt immédiat",
          "40 km/h sans contrôle",
          "PCC coupe la LAC",
        ],
        correct: 0,
        explanation: "Référence tachymètre (p.17).",
      },
      {
        id: "ch1-18d-02",
        prompt: "Essuie-glace ou dégivrage HS peut autoriser fin de journée :",
        choices: [
          "Selon conditions climatiques",
          "Jamais",
          "Uniquement remorquage",
          "Toujours à 70 km/h",
        ],
        correct: 0,
        explanation: "Note (*) p.18.",
      },
      {
        id: "ch1-18d-03",
        prompt: "Signalisation extérieure HS en immobilisation :",
        choices: [
          "Triangle à ~40 m devant la rame",
          "Rien si détresse OK",
          "Klaxon continu",
          "Évacuation immédiate",
        ],
        correct: 0,
        explanation: "Défaut signalisation + immobilisation (p.16).",
      },
      {
        id: "ch1-18d-04",
        prompt: "Bruit anormal bogie/articulation : vitesse ?",
        choices: [
          "Réduite selon dialogue CR/PCC",
          "70 km/h",
          "Arrêt interdit",
          "20 km/h fixe",
        ],
        correct: 0,
        explanation: "Appréciation CR/PCC (p.18).",
      },
    ],
  },

  // ─── 1.9 Procédure remorquage ─────────────────────────────
  {
    id: "remorq-19",
    code: "1.9",
    title: "Procédure de remorquage / poussage",
    cetPage: 19,
    questions: [
      {
        id: "ch1-19-01",
        prompt: "Accouplements autorisés en nominal :",
        choices: [
          "402-402, 401-401, 302-302",
          "302-402 sans limite",
          "Tout mélange à 70 km/h",
          "401-302 toujours",
        ],
        correct: 0,
        explanation: "Homogènes ; mixtes si pente < 5 % (p.19).",
      },
      {
        id: "ch1-19-02",
        prompt: "Vitesse max convoi remorqué/poussé :",
        choices: ["20 km/h", "40 km/h", "30 km/h", "15 km/h"],
        correct: 0,
        explanation: "20 km/h (p.19).",
      },
      {
        id: "ch1-19-03",
        prompt: "En convoi, est interdit :",
        choices: [
          "FU et commande patins",
          "Radio",
          "Feux détresse",
          "FS en urgence",
        ],
        correct: 0,
        explanation: "Interdit FU et patins ; urgence FMS ou FS (p.19).",
      },
      {
        id: "ch1-19-04",
        prompt: "Rame en panne sur pente : rame secours se place …",
        choices: [
          "En remorquage (devant, sens de la pente)",
          "En poussage systématique",
          "À l'arrière sans tension",
          "Sur voie parallèle",
        ],
        correct: 0,
        explanation: "Tension des barres sans remonter pente (p.19).",
      },
      {
        id: "ch1-19-05",
        prompt: "Préparation accouplement : jamais …",
        choices: [
          "Se placer entre les deux rames en rapprochement",
          "Feux détresse",
          "FS côté accouplement",
          "Abaisser pantographe",
        ],
        correct: 0,
        explanation: "Interdit entre rames (p.19).",
      },
      {
        id: "ch1-19-06",
        prompt: "Rame secours doit être …",
        choices: [
          "En état nominal (pas bogie isolé, freinage/radio OK)",
          "En panne légère",
          "Sans conducteur",
          "À 70 km/h",
        ],
        correct: 0,
        explanation: "État nominal exigé (p.19).",
      },
    ],
  },
];
