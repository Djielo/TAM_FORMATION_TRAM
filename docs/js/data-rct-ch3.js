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
        answer:
          "Conduite de manœuvre et circulation dans l'atelier",
      },
      {
        id: "ch3-vit-10",
        prompt: "Dans quelles conditions conduit-on à 10 km/h maximum ?",
        answer:
          "Travaux sur la voie (présence du personnel) ; croisement d'une rame arrêtée ; traversée de voies sur ornières porteuses ; feu routier en dérangement ; circulation dans le dépôt",
      },
      {
        id: "ch3-vit-15",
        prompt: "Dans quelles conditions conduit-on à 15 km/h maximum ?",
        answer:
          "Circulation en terminus ; prise d'une aiguille en voie déviée ; danger pour piéton ; traversée de station en HLP ; entrée en station (présence d'autres rames)",
      },
      {
        id: "ch3-vit-20",
        prompt: "Dans quelles conditions conduit-on à 20 km/h maximum ?",
        answer:
          "Défaut d'avertisseur sonore (gong) ; remorquage / poussage (RP)",
      },
      {
        id: "ch3-vit-25",
        prompt: "Dans quelles conditions conduit-on à 25 km/h maximum ?",
        answer:
          "Mode secours traction ou alimentation directe (limite matériel roulant)",
      },
      {
        id: "ch3-vit-30",
        prompt: "Dans quelles conditions conduit-on à 30 km/h maximum ?",
        answer:
          "Voie unique temporaire (VUT) ; entrée en station (absence d'autre rame)",
      },
      {
        id: "ch3-vit-40",
        prompt: "Dans quelles conditions conduit-on à 40 km/h maximum ?",
        answer:
          "Franchissement de carrefours (y compris passages à niveau) ; aiguille RFF en direct ou dévier ; ouverture de voie ; prise d'une aiguille en voie directe ; défaut veille avec accompagnant ; défaut de frein ; bogie isolé ; chasse-corps HS ou verrouillé",
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
        answer:
          "1. Se présenter à l'heure prévue de prise de service\n2. Porter la tenue réglementaire TaM\n3. Alcoolémie < 0,20 g/l ; stupéfiants interdits ; contrôles possibles à la PDS ; médicaments : vigilance — en parler au médecin traitant\n4. Habilitation valide pour la ligne et le matériel ; suspendue automatiquement après plus de 70 jours sans conduite commerciale sur une ligne autorisée (remise en main)\n5. Badger à l'arrivée au dépôt (au plus tard à l'heure de PDS) et à la montée dans la rame\n6. Récupérer sa planchette et sa feuille de route avant de rejoindre la rame en remisage",
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
        answer:
          "1. Être au point de relève au moins 2 minutes avant l'heure théorique de relève\n2. Si le conducteur releveur ne se présente pas : le conducteur en service prévient le PCC, poursuit sa mission et attend les consignes du régulateur\n3. Si la rame à relever est absente à l'heure théorique : le releveur appelle le PCC au plus tard 5 minutes après l'heure théorique et suit ses consignes\n4. Déplacements relève / pause : suivre les indications de la planchette ; véhicule personnel interdit",
      },
    ],
  },

  // ─── 3.1-B Sortie du dépôt et mise en ligne (p. 40) ─────────
  {
    id: "sortie-depot",
    code: "3.1-B",
    title: "Sortie du dépôt et mise en ligne",
    cetPage: 40,
    questions: [
      {
        id: "ch3-sortie-00",
        prompt:
          "Quelles sont les étapes de la sortie du dépôt et de la mise en ligne ?",
        cardPrompt:
          "Quelles sont les étapes de la sortie du dépôt et de la mise en ligne ?",
        answer:
          "1. Préparation de la rame sur le remisage selon la partie 1 du RCT\n2. Rame prête : demander l'autorisation de sortie au PCC — le PCC construit l'itinéraire de sortie\n3. Sortie impossible pour raison technique : informer le PCC et suivre ses consignes\n4. Avant la sortie du dépôt — test télécommande d'aiguille : arrêt au panneau de télécommande d'aiguille (piste E) au CEMH, ou en marche à l'interface de sortie JP ; test G/TD/D + positionnement INDIR\n5. Avant la sortie dépôt — test balises PETRARQUE : balise arrière OK → feu avant barrière allumé ; balise avant OK → ouverture barrière ; défaut → appel PCC",
      },
    ],
  },
];
