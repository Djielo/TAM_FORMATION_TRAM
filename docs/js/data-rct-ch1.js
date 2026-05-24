/** RCT ch. 1 — Utilisation du matériel roulant (pages 3–19) */
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
          "Si un agent habilité l'a déjà faite, ou si la rame est déjà revenue en service sur le réseau ce matin",
          "Sur simple accord oral du régulateur, sans autre condition",
        ],
        correct: 0,
        explanation:
          "Dispense si préparation déjà faite (jockey, etc.) ou rame déjà sortie en service le matin (RCT p. 4).",
      },
      {
        id: "ch1-11a-02",
        prompt:
          "Comment doit être traité un signalement majeur ou à impact sécurité ?",
        choices: [
          "Par un appel immédiat au PCC",
          "Par une inscription au SAT uniquement, sans appel immédiat",
        ],
        correct: 0,
        explanation:
          "Sécurité : appel immédiat au PCC ; les autres anomalies vont au SAT (RCT p. 4).",
      },
      {
        id: "ch1-11a-03",
        prompt: "À quoi servent les deux cales en bois embarquées ?",
        choices: [
          "Maintenir une rame dont les freins sont isolés",
          "Caler le pantographe",
        ],
        correct: 0,
        explanation: "Agrès pour maintien rame freins isolés (p.4).",
      },
      {
        id: "ch1-11a-04",
        prompt:
          "Absence de 24 V sur Citadis 402 : où actionner le commutateur batterie ?",
        choices: ["Sur l'AEL", "Dans le voussoir uniquement"],
        correct: 0,
        explanation:
          "402 : commutateur sur l'AEL ; autres types souvent dans le voussoir (RCT p. 4).",
      },
      {
        id: "ch1-11a-05",
        prompt:
          "Quelle est la première opération pour entrer par la porte de service (côté droit) ?",
        choices: [
          "Déverrouiller la porte avec la clé de service",
          "Fermer la porte avec la clé KC",
        ],
        correct: 0,
        explanation:
          "RCT p. 4 : déverrouiller à la clé de service, puis pousser/ouvrir la porte et entrer. La question porte sur la première opération.",
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
        prompt:
          "Test cabine de queue : position initiale du commutateur de conduite ?",
        choices: ["P", "N"],
        correct: 0,
        explanation: "Clé sur P avant vérifications, puis passage CN (p.5).",
      },
      {
        id: "ch1-11b-02",
        prompt: "Durée d'allumage des voyants de contrôle au test ?",
        choices: ["5 secondes", "10 secondes"],
        correct: 0,
        explanation: "Voyants de contrôle allumés 5 s (p.5).",
      },
      {
        id: "ch1-11b-03",
        prompt: "Après initialisation SIE, le voyant attendu est :",
        choices: ["Rame en service", "Défaut frein uniquement"],
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
        ],
        correct: 0,
        explanation:
          "Quatre points listés ; présences tension sauf sur 402 (p.5).",
      },
      {
        id: "ch1-11b-05",
        prompt: "Avant les tests voyants, on tourne la clé sur :",
        choices: ["CN", "FS"],
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
        prompt:
          "Bouton à accrochage lumineux du pupitre gauche : fonction testée ?",
        choices: ["Dégivrage pare-brise", "Descente pantographe"],
        correct: 0,
        explanation: "BP accrochage : dégivrage (p.6).",
      },
      {
        id: "ch1-11c-02",
        prompt: "Test interphonie cabine (impulsion) comprend :",
        choices: ["Essai micro", "Essai klaxon uniquement"],
        correct: 0,
        explanation: "Interphonie + essai micro (p.6).",
      },
      {
        id: "ch1-11c-03",
        prompt: "Lave-glace et essuie-glaces (pupitre gauche) concernent :",
        choices: ["Citadis 401 uniquement", "Citadis 402 uniquement"],
        correct: 0,
        explanation: "Lave-glace et essuie-glaces : 401 uniquement (p.6).",
      },
      {
        id: "ch1-11c-04",
        prompt:
          "Fin du test pupitre gauche : appel PCC depuis la loge de départ :",
        choices: ["Test Cabine M1 (ou M2)", "Sortie dépôt"],
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
        choices: ["Sélection côtés droit et gauche", "Côté droit seul"],
        correct: 0,
        explanation: "401 : droit et gauche pour ouverture générale (p.7).",
      },
      {
        id: "ch1-11d-02",
        prompt: "Vérification portes ouvertes : indicateurs à contrôler ?",
        choices: ["Rétrovision, SIE, voyant porte ouverte", "Girouette seule"],
        correct: 0,
        explanation: "Trois contrôles listés (p.7).",
      },
      {
        id: "ch1-11d-03",
        prompt: "Test patins : que vérifier sur le SIE ?",
        choices: ["Pictogramme associé", "Présence tension ligne"],
        correct: 0,
        explanation: "Frein magnétique/patins : pictogramme SIE (p.7).",
      },
      {
        id: "ch1-11d-04",
        prompt: "Essuie-glaces au pupitre droit : matériel concerné ?",
        choices: ["Citadis 302", "Citadis 401"],
        correct: 0,
        explanation: "Commutateur essuie-glaces : 302 uniquement (p.7).",
      },
      {
        id: "ch1-11d-05",
        prompt:
          "En fin de test, avant de quitter la cabine : sur quelle position laissez-vous la clé, et que contrôlez-vous ?",
        choices: ["N — verrouillage porte cabine", "FNS — frein service"],
        correct: 0,
        explanation:
          "Clé N, retrait, sortie en vérifiant verrouillage porte cabine (p.7).",
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
        prompt:
          "En se dirigeant vers la cabine de tête, on contrôle notamment :",
        choices: [
          "Éclairage, ventilation, état intérieur, agrès pantographe, cablôts, soufflets",
          "Le poste PCC",
        ],
        correct: 0,
        explanation: "Sept points de contrôle intérieurs (p.8).",
      },
      {
        id: "ch1-11e-02",
        prompt: "Agrès dans le voussoir nacelle pantographe :",
        choices: ["Cales, manivelles, triangle", "Extincteur CO2 uniquement"],
        correct: 0,
        explanation:
          "Cales, manivelle, triangle dans voussoir pantographe (p.8).",
      },
      {
        id: "ch1-11e-03",
        prompt: "Avant d'entrer en cabine de tête :",
        choices: ["Badger", "Appeler le PCC"],
        correct: 0,
        explanation: "Badger avant entrée cabine (p.8).",
      },
      {
        id: "ch1-11e-04",
        prompt: "Les cablôts doivent être présents :",
        choices: ["Dans les voussoirs", "En cabine uniquement"],
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
        ],
        correct: 0,
        explanation:
          "Tests queue + feux, self, FNS, sortie porte service (p.8).",
      },
      {
        id: "ch1-11f-02",
        prompt: "En cabine de tête, le manipulateur est positionné sur :",
        choices: ["FNS", "FS"],
        correct: 0,
        explanation: "Manipulateur sur FNS (p.8).",
      },
      {
        id: "ch1-11f-03",
        prompt: "Sélection des côtés d'ouverture en cabine de tête :",
        choices: ["Droit et gauche en self service", "Droit seul"],
        correct: 0,
        explanation: "Self service droit et gauche (p.8).",
      },
      {
        id: "ch1-11f-04",
        prompt: "Sortie de la rame après test cabine de tête :",
        choices: ["Par la porte de service", "Par la première porte voyageur"],
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
        prompt:
          "Lors du contrôle de l'éclairage extérieur, que vérifiez-vous notamment ?",
        choices: [
          "Codes, feu pilote, antibrouillard, détresse, feux gabarit, rouges, stops",
          "Girouette uniquement",
        ],
        correct: 0,
        explanation: "Liste feux et codes (p.9).",
      },
      {
        id: "ch1-11g-02",
        prompt:
          "Lors du contrôle de la carrosserie, que recherchez-vous notamment ?",
        choices: [
          "Impacts, rayures, éléments en débord de gabarit",
          "Couleur de peinture",
        ],
        correct: 0,
        explanation: "État carrosserie et gabarit (p.9).",
      },
      {
        id: "ch1-11g-03",
        prompt: "Anomalie d'état de la rame constatée en préparation :",
        choices: ["Signalement au PCC", "Ignorer si mineure"],
        correct: 0,
        explanation: "Toute anomalie d'état → PCC (p.9).",
      },
      {
        id: "ch1-11g-04",
        prompt: "Contrôle pantographe :",
        choices: ["Bras, cornes, patins carbone", "Par le PCC à distance"],
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
        prompt: "À quelle fréquence contrôlez-vous le chasse-corps ?",
        choices: [
          "À chaque entrée dans une nouvelle rame, toutes cabines, y compris en service",
          "Par le PCC uniquement",
        ],
        correct: 0,
        explanation:
          "Absence de verrouillage chasse-corps à chaque nouvelle rame (p.9).",
      },
      {
        id: "ch1-11h-02",
        prompt: "En sortie, comment sélectionnez-vous le côté de service ?",
        choices: ["BPIL", "FS"],
        correct: 0,
        explanation: "BPIL pour le côté de service (p.9).",
      },
      {
        id: "ch1-11h-03",
        prompt:
          "Avant la sortie du dépôt, pourquoi appelez-vous le SAE à la radio ?",
        choices: [
          "Autorisation de sortie et signalement anomalies",
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
          "Frein de secours",
        ],
        correct: 0,
        explanation: "Tests aiguille et Petrarque au dépôt (p.9).",
      },
      {
        id: "ch1-11h-05",
        prompt:
          "Pour la rétrovision en sortie du dépôt, que faites-vous si elle n'est pas active ?",
        choices: ["Sur écran SIE si non active", "Uniquement en station"],
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
        ],
        correct: 0,
        explanation:
          "Séquence : hors service, pantographe, batterie (p.10–11).",
      },
      {
        id: "ch1-12-02",
        prompt: "Au dépôt, la clé KC lors de la dé-préparation remisage :",
        choices: ["Reste dans la rame", "Est envoyée au PCC"],
        correct: 0,
        explanation: "Dépôt : clé KC reste dans la rame (p.11).",
      },
      {
        id: "ch1-12-03",
        prompt: "Mise hors service : commande utilisée ?",
        choices: ["Bouton à impulsion mise hors service", "FS coup de poing"],
        correct: 0,
        explanation: "BP impulsion mise hors service (p.10–11).",
      },
      {
        id: "ch1-12-04",
        prompt: "Descente pantographe Citadis 402 au remisage :",
        choices: [
          "Commande temporisée depuis la cabine (~2 min)",
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
        prompt:
          "Pour une dé-préparation complète en ligne, quelle autorisation est requise ?",
        choices: [
          "PCC obligatoire, après évacuation voyageurs",
          "Maintenance uniquement",
        ],
        correct: 0,
        explanation: "PCC + évacuation ; ordre strict (p.10).",
      },
      {
        id: "ch1-121-02",
        prompt:
          "Risque si la séquence de dé-préparation en ligne n'est pas respectée :",
        choices: ["Recul de la rame", "Perte radio seule"],
        correct: 0,
        explanation: "Risque de recul si ordre non respecté (p.10).",
      },
      {
        id: "ch1-121-03",
        prompt:
          "Hors coupure LAC impérative, le PCC n'autorise la dé-préparation en ligne qu'au :",
        choices: ["Terminus", "Quai double"],
        correct: 0,
        explanation: "En ligne : terminus sauf coupure LAC impérative (p.10).",
      },
      {
        id: "ch1-121-04",
        prompt:
          "Mise hors service en ligne : première action sur le manipulateur ?",
        choices: ["Neutre", "FNS"],
        correct: 0,
        explanation: "Manipulateur sur neutre, clé KC sur N (p.10).",
      },
      {
        id: "ch1-121-05",
        prompt: "FS en dé-préparation en ligne (302/402) :",
        choices: [
          "Facultatif ; sur 302 réarmement DJ FS à changement de cabine",
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
        prompt:
          "Dé-préparation remisage : après neutre et clé N, on actionne :",
        choices: [
          "Descente pantographe puis feuille de route puis mise hors service",
          "Mise en service directe",
        ],
        correct: 0,
        explanation:
          "Séquence p.11 : pantographe, feuille de route, hors service.",
      },
      {
        id: "ch1-122-02",
        prompt: "Coupure batterie au remisage (cas le plus fréquent) :",
        choices: [
          "Souvent non coupée si nettoyage rame le soir",
          "Toujours immédiate en cabine",
        ],
        correct: 0,
        explanation: "Commutateur voussoir sauf nettoyage soir (p.11).",
      },
      {
        id: "ch1-122-03",
        prompt:
          "En fin de dé-préparation remisage, que faites-vous avec la porte voyageur côté droit ?",
        choices: [
          "Déverrouiller, ouvrir, reverrouiller et fermer",
          "Ouvrir les deux côtés",
        ],
        correct: 0,
        explanation:
          "Porte simple accès droit : cycle ouverture/fermeture (p.11).",
      },
      {
        id: "ch1-122-04",
        prompt:
          "En fin de dé-préparation, que devez-vous compléter sur la feuille de route ?",
        choices: ["Kilomètres et horaires", "Uniquement le numéro de rame"],
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
        ],
        correct: 0,
        explanation: "Cinq familles d'information (p.12).",
      },
      {
        id: "ch1-13-02",
        prompt:
          "En cas d'alerte sur le SIE, comment le conducteur doit-il agir ?",
        choices: [
          "Selon SIE, chapitre 1.8 et instructions PCC",
          "Sans consulter le PCC",
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
        ],
        correct: 0,
        explanation: "Pannes : origine, lieu, actions, V max (p.12).",
      },
      {
        id: "ch1-13-04",
        prompt: "Emplacement du SIE :",
        choices: ["Écran tactile console de chaque cabine", "Quai uniquement"],
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
        prompt:
          "Dans quelles situations pouvez-vous utiliser le frein d'urgence (FU) ?",
        choices: [
          "Uniquement en cas de danger immédiat",
          "En remplacement courant du frein de service (FNS)",
        ],
        correct: 0,
        explanation: "Le FU est réservé au danger immédiat (RCT p. 14).",
      },
      {
        id: "ch1-14a-02",
        prompt:
          "Lors d'un freinage d'urgence (FU), que déclenche la commande ?",
        choices: [
          "Le freinage électrique, mécanique et électromagnétique (patins)",
          "Les patins seuls, sans freinage électrique",
        ],
        correct: 0,
        explanation:
          "Le FU active les trois modes de freinage jusqu'à l'arrêt (RCT p. 14).",
      },
      {
        id: "ch1-14a-03",
        prompt:
          "Après un freinage d'urgence (FU), avant de redémarrer, que devez-vous faire ?",
        choices: [
          "Vérifier l'absence de blessés et faire l'annonce cabine",
          "Signaler l'incident au PCC et repartir sans annonce aux voyageurs",
        ],
        correct: 0,
        explanation:
          "Contrôle des passagers et annonce cabine avant redépart ; PCC selon la situation (RCT p. 14).",
      },
      {
        id: "ch1-14a-04",
        prompt:
          "Lors d'un freinage d'urgence (FU), que se passe-t-il pour le chasse-corps ?",
        choices: [
          "Il ne descend pas ; le freinage s'exerce au détecteur de barre",
          "Il descend automatiquement comme au frein de service",
        ],
        correct: 0,
        explanation: "Le FU ne fait pas descendre le chasse-corps (RCT p. 14).",
      },
      {
        id: "ch1-14a-05",
        prompt:
          "En adhérence faible, dans quelles situations l'utilisation des patins est-elle autorisée ?",
        cardPrompt:
          "Les patins sont en adhérence faible : dans quelles situations leur utilisation est-elle autorisée ?",
        choices: [
          "Uniquement au démarrage en côte",
          "Uniquement en phase de freinage",
        ],
        correct: 0,
        explanation:
          "En adhérence faible : départ en côte autorisé, freinage interdit (RCT p. 14).",
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
        prompt:
          "Comment le conducteur commande-t-il le frein de secours (FS) ?",
        choices: [
          "Par un bouton coup de poing",
          "Par le bouton d'ouverture des portes (BPAL)",
        ],
        correct: 0,
        explanation:
          "Le FS est commandé par un bouton coup de poing (RCT p. 13–14).",
      },
      {
        id: "ch1-14b-02",
        prompt:
          "Après un freinage d'urgence (FU), le frein de secours (FS) est-il utilisable ?",
        choices: [
          "Non, il est interdit (risque de blocage des roues)",
          "Oui, il est obligatoire avant tout redépart",
        ],
        correct: 0,
        explanation:
          "Interdit après FU : annule freinage électrique et antipatinage (RCT p. 14).",
      },
      {
        id: "ch1-14b-03",
        prompt:
          "Après un FS déclenché à 70 km/h, quelle est la vitesse maximale autorisée pendant 10 minutes ?",
        choices: ["40 km/h", "20 km/h"],
        correct: 0,
        explanation:
          "40 km/h strict pendant 10 min après FS à 70 km/h (RCT p. 14).",
      },
      {
        id: "ch1-14b-04",
        prompt: "Dans quels cas peut-on utiliser le frein de secours (FS) ?",
        choices: [
          "Défaillance d'autres freins, rame à l'arrêt, personne sous rame, urgence sans maîtrise",
          "À chaque arrêt en station",
        ],
        correct: 0,
        explanation: "Quatre cas d'usage listés au RCT (p. 14).",
      },
      {
        id: "ch1-14b-05",
        prompt:
          "Parmi les cinq modes de freinage, lesquels sont à la main du conducteur ?",
        choices: [
          "Le FNS, le FU et le FS uniquement",
          "Les cinq modes (FNS, FU, FS, frein parking et freins automatiques)",
        ],
        correct: 0,
        explanation:
          "À la main du conducteur : FNS, FU et FS. Frein parking et freinage automatique : pas à la main (RCT p. 13).",
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
        ],
        correct: 0,
        explanation: "Adhérence roue/rail (p.15).",
      },
      {
        id: "ch1-15-02",
        prompt: "Sablage automatique :",
        choices: ["En phase de freinage", "Uniquement au dépôt"],
        correct: 0,
        explanation: "Automatique au freinage (p.15).",
      },
      {
        id: "ch1-15-03",
        prompt: "Sablage manuel recommandé si :",
        choices: [
          "Rail glissant (feuilles, verglas, pluie fine…)",
          "Passage piéton",
        ],
        correct: 0,
        explanation: "Adhérence dégradée : action manuelle (p.15).",
      },
      {
        id: "ch1-15-04",
        prompt: "Sablières équipent :",
        choices: ["Bogies moteurs", "Tous les bogies"],
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
        ],
        correct: 0,
        explanation: "Sécurité conducteur (p.15).",
      },
      {
        id: "ch1-16-02",
        prompt: "Disfonctionnement veille : conduite immédiate ?",
        choices: [
          "Arrêt station la plus proche, détresse, PCC et clientèle",
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
        ],
        correct: 0,
        explanation: "PCC + accompagnement FS (p.15).",
      },
      {
        id: "ch1-16-04",
        prompt: "Vitesse max en ligne si veille isolée :",
        choices: ["40 km/h", "20 km/h"],
        correct: 0,
        explanation: "40 km/h en isolation (p.15).",
      },
      {
        id: "ch1-16-05",
        prompt: "Relâchement veille non impératif entre stations sur :",
        choices: ["302 et 402", "401 uniquement"],
        correct: 0,
        explanation:
          "401 : appui/relâchement ; 302/402 : pression continue (p.15).",
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
        choices: ["Arrêt impératif et appel PCC", "SAT en fin de service"],
        correct: 0,
        explanation: "Arrêt et PCC (p.16).",
      },
      {
        id: "ch1-17-02",
        prompt: "Perte de tension (hors micro-coupures) :",
        choices: [
          "Contrôle visuel pantographe, arrêt sécurisé, appel PCC",
          "FS immédiat en marche",
        ],
        correct: 0,
        explanation: "Sortie cabine, arrêt, PCC ; risque LAC (p.16).",
      },
      {
        id: "ch1-17-03",
        prompt: "Perte de tension : risque signalé ?",
        choices: ["Accrochage de la LAC", "Défaut girouette"],
        correct: 0,
        explanation: "Risque d'accrochage LAC (p.16).",
      },
      {
        id: "ch1-17-04",
        prompt: "Perte de tension ne doit pas être confondue avec :",
        choices: ["Micro-coupures", "Défaut girouette"],
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
        choices: ["20 km/h", "40 km/h"],
        correct: 0,
        explanation: "V max 20 km/h (p.17).",
      },
      {
        id: "ch1-18a-02",
        prompt: "Mode remorquage/poussage possible notamment si :",
        choices: [
          "Deux freins isolés ou défaut ordre de marche",
          "Sablière vide seule",
        ],
        correct: 0,
        explanation: "Cas listés colonne A p.17.",
      },
      {
        id: "ch1-18a-03",
        prompt: "Défaut ETF remorquage : codes concernés ?",
        choices: ["M1, M2 et NM = ? ou isolé", "Uniquement girouette"],
        correct: 0,
        explanation: "Défaut ordre de marche ETF (p.17).",
      },
      {
        id: "ch1-18a-04",
        prompt: "Si la remise en service échoue, que devez-vous préparer ?",
        choices: [
          "Remorquage ou poussage (voir 1.9)",
          "Fin de service sans PCC",
        ],
        correct: 0,
        explanation: "Préparer remorquage/poussage (p.16–17).",
      },
    ],
  },

  // ─── 1.8-B Haut Le Pied ───────────────────────────────────
  {
    id: "panne-18b",
    code: "1.8-B",
    title: "Pannes — Haut Le Pied",
    cetPage: 17,
    questions: [
      {
        id: "ch1-18b-01",
        prompt: "Défaut ETF ou manipulateur (302 M1/M2 isolé) en HLP : V max ?",
        choices: ["40 km/h", "20 km/h"],
        correct: 0,
        explanation: "40 km/h (p.17).",
      },
      {
        id: "ch1-18b-02",
        prompt:
          "Défaut boucle sécurité FU/FS permanent (alimentation directe) : V max ?",
        choices: ["25 km/h", "40 km/h"],
        correct: 0,
        explanation: "25 km/h (p.17).",
      },
      {
        id: "ch1-18b-03",
        prompt: "HLP possible si console/SIE :",
        choices: ["SIE non opérationnel", "SIE nominal"],
        correct: 0,
        explanation: "Défaillance console / SIE HS (p.17).",
      },
      {
        id: "ch1-18b-04",
        prompt: "Défaut rétrovision quai ou zone dégagement quai : mode ?",
        choices: ["Haut Le Pied", "Fin de tour"],
        correct: 0,
        explanation: "Colonnes B p.17–18.",
      },
      {
        id: "ch1-18b-05",
        prompt: "Essuie-glace ou dégivrage HS en HLP :",
        choices: ["Selon conditions climatiques", "Toujours fin de journée"],
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
        choices: ["40 km/h", "20 km/h"],
        correct: 0,
        explanation: "40 km/h (p.17).",
      },
      {
        id: "ch1-18c-02",
        prompt: "Deux portes condamnées même côté : mode autorisé ?",
        choices: ["Fin de tour", "Remorquage"],
        correct: 0,
        explanation: "Fin de tour (p.17).",
      },
      {
        id: "ch1-18c-03",
        prompt: "Défaut gong en fin de tour : V max ?",
        choices: ["20 km/h", "40 km/h"],
        correct: 0,
        explanation: "Gong HS : 20 km/h (p.18).",
      },
      {
        id: "ch1-18c-04",
        prompt: "Veille automatique HS fin de tour :",
        choices: [
          "Avec agent TaM présent, 40 km/h max",
          "Remorquage obligatoire",
        ],
        correct: 0,
        explanation: "Agent TaM + 40 km/h (p.18).",
      },
      {
        id: "ch1-18c-05",
        prompt: "Panne phonie totale + GSM secours HS :",
        choices: ["Fin de tour", "Remorquage"],
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
        choices: ["Se référer au tachymètre", "PCC coupe la LAC"],
        correct: 0,
        explanation: "Référence tachymètre (p.17).",
      },
      {
        id: "ch1-18d-02",
        prompt: "Essuie-glace ou dégivrage HS peut autoriser fin de journée :",
        choices: ["Selon conditions climatiques", "Uniquement remorquage"],
        correct: 0,
        explanation: "Note (*) p.18.",
      },
      {
        id: "ch1-18d-03",
        prompt: "Signalisation extérieure HS en immobilisation :",
        choices: ["Triangle à ~40 m devant la rame", "Évacuation immédiate"],
        correct: 0,
        explanation: "Défaut signalisation + immobilisation (p.16).",
      },
      {
        id: "ch1-18d-04",
        prompt: "Bruit anormal bogie/articulation : vitesse ?",
        choices: ["Réduite selon dialogue CR/PCC", "Arrêt interdit"],
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
        choices: ["402-402, 401-401, 302-302", "302-402 sans limite"],
        correct: 0,
        explanation: "Homogènes ; mixtes si pente < 5 % (p.19).",
      },
      {
        id: "ch1-19-02",
        prompt: "Vitesse max convoi remorqué/poussé :",
        choices: ["20 km/h", "40 km/h"],
        correct: 0,
        explanation: "20 km/h (p.19).",
      },
      {
        id: "ch1-19-03",
        prompt: "En convoi, est interdit :",
        choices: ["FU et commande patins", "FS en urgence"],
        correct: 0,
        explanation: "Interdit FU et patins ; urgence FMS ou FS (p.19).",
      },
      {
        id: "ch1-19-04",
        prompt:
          "Rame en panne sur une pente : comment la rame de secours doit-elle se placer ?",
        choices: [
          "En remorquage (devant, sens de la pente)",
          "À l'arrière sans tension",
        ],
        correct: 0,
        explanation: "Tension des barres sans remonter pente (p.19).",
      },
      {
        id: "ch1-19-05",
        prompt:
          "Lors de la préparation d'un accouplement, que ne devez-vous jamais faire ?",
        choices: [
          "Se placer entre les deux rames en rapprochement",
          "Abaisser pantographe",
        ],
        correct: 0,
        explanation: "Interdit entre rames (p.19).",
      },
      {
        id: "ch1-19-06",
        prompt:
          "Dans quel état la rame de secours doit-elle être pour intervenir ?",
        choices: [
          "En état nominal (pas bogie isolé, freinage/radio OK)",
          "En panne légère",
        ],
        correct: 0,
        explanation: "État nominal exigé (p.19).",
      },
    ],
  },
];
