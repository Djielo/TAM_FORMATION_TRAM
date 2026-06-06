/** RCT — Consignes de circulation en ligne (p. 34, 38–58) */
export const MODULES_CH3 = [
  {
    id: "circ-tableau-vitesse",
    code: "p. 34",
    title: "Tableau des limitations de vitesse",
    cetPage: 34,
    questions: [
      {
        id: "ch3-vit-05",
        prompt: "Dans quelles conditions conduit-on à 5 km/h maximum ?",
        choices: [
          "Conduite de manœuvre et circulation dans l'atelier",
          "Circulation en terminus ; prise d'une aiguille en voie déviée ; traversée de station en HLP",
        ],
        correct: 0,
        explanation: "RCT p. 34 — tableau des limitations : 5 km/h.",
      },
      {
        id: "ch3-vit-10",
        prompt: "Dans quelles conditions conduit-on à 10 km/h maximum ?",
        choices: [
          "Travaux sur la voie (présence du personnel) ; croisement d'une rame arrêtée ; traversée de voies sur ornières porteuses ; feu routier en dérangement ; circulation dans le dépôt",
          "Circulation en terminus ; danger pour piéton ; entrée en station (présence d'autres rames) ; traversée de station en HLP",
        ],
        correct: 0,
        explanation: "RCT p. 34 — tableau des limitations : 10 km/h.",
      },
      {
        id: "ch3-vit-15",
        prompt: "Dans quelles conditions conduit-on à 15 km/h maximum ?",
        choices: [
          "Circulation en terminus ; prise d'une aiguille en voie déviée ; danger pour piéton ; traversée de station en HLP ; entrée en station (présence d'autres rames)",
          "Défaut d'avertisseur sonore (gong) ; remorquage / poussage (RP) ; mode secours traction ou alimentation directe",
        ],
        correct: 0,
        explanation: "RCT p. 34 — tableau des limitations : 15 km/h.",
      },
      {
        id: "ch3-vit-20",
        prompt: "Dans quelles conditions conduit-on à 20 km/h maximum ?",
        choices: [
          "Défaut d'avertisseur sonore (gong) ; remorquage / poussage (RP)",
          "Voie unique temporaire (VUT) ; entrée en station (absence d'autre rame) ; franchissement de carrefours",
        ],
        correct: 0,
        explanation: "RCT p. 34 — tableau des limitations : 20 km/h.",
      },
      {
        id: "ch3-vit-25",
        prompt: "Dans quelles conditions conduit-on à 25 km/h maximum ?",
        choices: [
          "Mode secours traction ou alimentation directe (limite matériel roulant)",
          "Défaut de frein ; bogie isolé ; chasse-corps HS ou verrouillé",
        ],
        correct: 0,
        explanation: "RCT p. 34 — tableau des limitations : 25 km/h.",
      },
      {
        id: "ch3-vit-30",
        prompt: "Dans quelles conditions conduit-on à 30 km/h maximum ?",
        choices: [
          "Voie unique temporaire (VUT) ; entrée en station (absence d'autre rame)",
          "Franchissement de carrefours (y compris passages à niveau) ; ouverture de voie ; prise d'une aiguille en voie directe",
        ],
        correct: 0,
        explanation: "RCT p. 34 — tableau des limitations : 30 km/h.",
      },
      {
        id: "ch3-vit-40",
        prompt: "Dans quelles conditions conduit-on à 40 km/h maximum ?",
        choices: [
          "Franchissement de carrefours (y compris passages à niveau) ; aiguille RFF en direct ou dévier ; ouverture de voie ; prise d'une aiguille en voie directe ; défaut veille avec accompagnant ; défaut de frein ; bogie isolé ; chasse-corps HS ou verrouillé",
          "Conduite de manœuvre et circulation dans l'atelier ; circulation dans le dépôt ; traversée de station en HLP",
        ],
        correct: 0,
        explanation: "RCT p. 34 — tableau des limitations : 40 km/h.",
      },
    ],
  },

  // ─── 3.1-A Prise de service au dépôt (p. 39) ───────────────
  {
    id: "pds-depot",
    code: "3.1-A",
    title: "Prise de service au dépôt",
    cetPage: 39,
    questions: [
      {
        id: "ch3-pds-00",
        prompt:
          "Quelles sont les six étapes d'une prise de service au dépôt ?",
        cardPrompt:
          "Quelles sont les six étapes d'une prise de service au dépôt ?",
        choices: [
          "1. Se présenter à l'heure prévue de prise de service\n2. Porter la tenue réglementaire TaM\n3. Alcoolémie strictement < 0,20 g/l ; stupéfiants interdits ; contrôles possibles à la PDS\n4. Habilitation valide pour la ligne et le matériel ; suspendue automatiquement après plus de 70 jours sans conduite commerciale sur une ligne autorisée (remise en main)\n5. Badger à l'arrivée au dépôt (au plus tard à l'heure de PDS) et à la montée dans la rame\n6. Récupérer sa planchette et sa feuille de route avant de rejoindre la rame en remisage",
          "1. Arriver dans les 15 minutes après l'heure de PDS\n2. Tenue civile correcte\n3. Alcoolémie < 0,50 g/l tolérée\n4. Habilitation valable 1 an sans condition\n5. Badger uniquement en fin de service\n6. Rejoindre la rame sans planchette",
        ],
        correct: 0,
        explanation: "RCT § 3.1 p. 39 — prise de service au dépôt (6 points).",
      },
    ],
  },

  // ─── 3.1-A Relève en ligne (p. 39) ───────────────────────────
  {
    id: "pds-releve",
    code: "3.1-A relève",
    title: "Relève en ligne",
    cetPage: 39,
    questions: [
      {
        id: "ch3-rel-00",
        prompt:
          "Quelles sont les quatre étapes d'une relève en ligne ?",
        cardPrompt:
          "Quelles sont les quatre étapes d'une relève en ligne ?",
        choices: [
          "1. Être au point de relève au moins 2 minutes avant l'heure théorique de relève\n2. Si le conducteur releveur ne se présente pas : le conducteur en service prévient le PCC, poursuit sa mission et attend les consignes du régulateur\n3. Si la rame à relever est absente à l'heure théorique : le releveur appelle le PCC au plus tard 5 minutes après l'heure théorique et suit ses consignes\n4. Déplacements relève / pause : suivre les indications de la planchette ; véhicule personnel interdit",
          "1. Être au point de relève à l'heure théorique exacte\n2. Si le releveur est absent : le conducteur en service quitte la rame et regagne le dépôt\n3. Si la rame est absente : attendre 15 minutes sans appeler le PCC\n4. Véhicule personnel autorisé pour les déplacements relève / pause",
        ],
        correct: 0,
        explanation: "RCT § 3.1 p. 39 — relève en ligne (4 points).",
      },
    ],
  },
];
