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
          "1. Se présenter à l'heure prévue de prise de service.\n2. Porter la tenue réglementaire TaM.\n3. Alcoolémie < 0,20 g/l. Stupéfiants interdits. Contrôles possibles à la PDS. Médicaments : vigilance accrue, en parler au médecin traitant.\n4. Habilitation valide pour la ligne et le matériel. Suspendue après 70 jours sans conduite commerciale => remise en main obligatoire.\n5. Badger à l'arrivée au dépôt (au plus tard à l'heure de PDS) et à la montée dans la rame.\n6. Récupérer sa planchette et sa feuille de route avant de rejoindre la rame en remisage.",
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
          "1. Être au point de relève au moins 2 minutes avant l'heure théorique de relève.\n2. Si le conducteur releveur ne se présente pas, le conducteur en service prévient le PCC, poursuit sa mission et attend les consignes du régulateur.\n3. Si la rame à relever est absente à l'heure théorique, le releveur appelle le PCC au plus tard 5 minutes après l'heure théorique et suit ses consignes.\n4. Déplacements relève / pause, suivre les indications de la planchette. Véhicule personnel interdit.",
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
          "1. Préparation de la rame sur le remisage selon la partie 1 du RCT.\n2. Rame prête, demander l'autorisation de sortie au PCC, le PCC construit l'itinéraire de sortie.\n3. Sortie impossible pour raison technique, informer le PCC et suivre ses consignes.\n4. Avant la sortie du dépôt, test télécommande d'aiguille, arrêt au panneau de télécommande d'aiguille (piste E) au CEMH, ou en marche à l'interface de sortie JP. Test G/TD/D + positionnement INDIR.\n5. Avant la sortie dépôt, test balises PETRARQUE, balise arrière OK → feu avant barrière allumé. Balise avant OK → ouverture barrière. Défaut → appel PCC.",
      },
    ],
  },

  // ─── 3.1-C Comportement du conducteur dans la rame (p. 41) ───
  {
    id: "comportement-rame",
    code: "3.1-C",
    title: "Comportement du conducteur dans la rame",
    cetPage: 41,
    questions: [
      {
        id: "ch3-conduite-00",
        prompt:
          "Quel doit être le comportement du conducteur dans la rame ?",
        cardPrompt:
          "Quel doit être le comportement du conducteur dans la rame ?",
        answer:
          "1. Présence en cabine (signalement obligatoire PCC) : cadres, maîtrise, maintenance TaM en mission, formateurs, ou autorisation écrite.\n2. Rouler porte cabine fermée. Effets personnels dans le placard.\n3. Conduite assise. Position vigilance (buste droit, pieds au sol) adaptée pour effectuer une commande d'urgence, comme un FS.\n4. Interdit de fumer, de s'alimenter, de téléphoner avec ou sans oreillettes. Phonie hors arrêt en mains libres.\n5. Arrêt en ligne, rester au poste + feux de détresse.\n6. Ne pas quitter le tram en ligne, sauf cas de force majeure après évacuation => informer le PCC + appliquer mesures anti-accident (BS p. 35).\n7. Quitter la cabine: Manipulateur neutre, clé KC, porte fermée (BS p. 35).\n8. Anomalie de service: Annonce clientèle via sonorisation intérieure (ch. 3.9).\n9. Rame arrêtée: Ouverture porte cabine autorisée pour s'adresser à la clientèle.",
      },
    ],
  },

  // ─── 3.2 Circulation en ligne (p. 42) ────────────────────────
  {
    id: "circulation-ligne",
    code: "3.2",
    title: "Circulation en ligne",
    cetPage: 42,
    questions: [
      {
        id: "ch3-circ-00",
        prompt:
          "Quelles sont les règles de circulation en ligne ?",
        cardPrompt:
          "Quelles sont les règles de circulation en ligne ?",
        answer:
          "1. Conduire toujours depuis la cabine dans le sens de la marche (marche arrière interdite).\n2. Circuler en marche à vue, adapter sa vitesse à l'environnement.\n3. En ligne, appliquer les mêmes règles de prévoyance et de défiance que pour tout véhicule de transport.\n4. Être en mesure d'arrêter la rame en toute circonstance.\n5. Respecter la signalisation ferroviaire et routière, et les limitations de vitesse en ligne. Éviter le mode traction au passage des IS.\n6. Visibilité réduite (brouillard, dégagement de fumée), adapter la vitesse aux conditions.\n7. En sortie de courbe, attendre que la rame soit droite pour reprendre de la vitesse : sécurité, guidage pour éviter le déraillement, confort clientèle, préservation de l'infrastructure.\n8. Baisse anormale du niveau de vigilance ou pertes de vigilance répétées, alerter immédiatement le PCC sur son état de santé.\n@@WARNING@@\nRelevés tachymétriques réguliers et aléatoires.\nMédicaments : baisse de vigilance, autorisation du médecin traitant.",
      },
    ],
  },

  // ─── 3.2-A Gabarit limite d'obstacle — GLO (p. 43) ───────────
  {
    id: "glo-gabarit",
    code: "3.2-A",
    title: "Prise en compte du gabarit limite d'obstacle (GLO)",
    cetPage: 43,
    questions: [
      {
        id: "ch3-glo-00",
        prompt:
          "Quelle conduite adopter face au gabarit limite d'obstacle (GLO) ?",
        cardPrompt:
          "Quelle conduite adopter face au gabarit limite d'obstacle (GLO) ?",
        answer:
          "1. La bande au sol GLO délimite la zone de circulation propre au tramway, tenant compte du gabarit des rames.\n2. Piétons ou vélos à proximité du GLO : Adapter la vitesse. Faire usage du gong. Se préparer à toute manœuvre d'urgence.\n3. Obstacles à proximité du GLO : Ralentir. S'assurer de pouvoir dépasser en toute sécurité.\n4. Obstacles empiétant sur le GLO : Arrêter la rame. Appeler immédiatement le PCC.",
      },
    ],
  },

  // ─── 3.2-A Ouverture de voie (p. 43) ─────────────────────────
  {
    id: "ouverture-voie",
    code: "3.2-A ouverture",
    title: "Ouverture de la voie sur voie double ou voie unique",
    cetPage: 43,
    questions: [
      {
        id: "ch3-ouv-00",
        prompt:
          "Quelles sont les consignes d'ouverture de voie sur voie double ou voie unique ?",
        cardPrompt:
          "Quelles sont les consignes d'ouverture de voie sur voie double ou voie unique ?",
        answer:
          "1. Vitesse limitée à 40 km/h maximum.\n2. Contrôler la position des appareils de voie. Si non visible (neige, …), arrêter la rame.\n3. Signaler la présence d'objets éventuels sur la voie.\n4. Signaler l'état de la signalisation.\n5. Signaler l'état de la ligne aérienne.\n6. Signaler les dysfonctionnements de DAT.\n7. Signaler les dégâts éventuels commis sur le mobilier d'équipement des stations.\n8. Signaler l'absence de l'éclairage en station.\n9. À chaque terminus, informer le PCC de l'état de la voie, notamment la présence de zones de voie glissantes.",
      },
    ],
  },

  // ─── 3.2-B Circulation sur voie double (p. 44) ───────────────
  {
    id: "circulation-voie-double",
    code: "3.2-B",
    title: "Circulation sur voie double",
    cetPage: 44,
    questions: [
      {
        id: "ch3-vd-00",
        prompt: "Quelles sont les règles de circulation sur voie double ?",
        cardPrompt: "Quelles sont les règles de circulation sur voie double ?",
        answer:
          "1. Circulation nominale sur la voie de droite, dans le sens de marche.\n2. Respecter la signalisation (SIG) de présence tension, SIG lumineuse de carrefour, SIG de manœuvre, SIG de signalisation verticale et SIG de signalisation au sol.\n@@WARNING@@\nVoie nominale V1 >>> L1 : Mosson → Odysseum ; L2 : Saint-Jean-de-Védas → Jacou.",
      },
    ],
  },

  // ─── 3.2-C Circulation sur voie unique (p. 44) ───────────────
  {
    id: "circulation-voie-unique",
    code: "3.2-C",
    title: "Circulation sur voie unique",
    cetPage: 44,
    questions: [
      {
        id: "ch3-vu-00",
        prompt: "Quelles sont les règles de circulation sur voie unique ?",
        cardPrompt: "Quelles sont les règles de circulation sur voie unique ?",
        answer:
          "1. Respecter impérativement la signalisation de manœuvre sur chaque évitement, elle protège le début d'un canton.\n2. Ne démarrer de la station qu'après le passage au vert du feu de manœuvre, pour tenir compte des boucles sur VU et la continuité de l'échange voyageurs.\n3. En cas de franchissement, réagir immédiatement à la sirène et aux lampes flash par un freinage d'urgence (FU).\n4. Si les lampes flash s'allument en cours de trajet (franchissement d'un signal au rouge par une rame en sens inverse), effectuer immédiatement un FU, s'arrêter en ligne, appeler le PCC et suivre ses consignes.\n@@WARNING@@\nEntrée d'évitement : contrôler l'INDIR, comme pour toute aiguille prise par la pointe.\nSortie d'évitement, aiguille en voie déviée : vitesse maxi 15 km/h.",
      },
    ],
  },

  // ─── 3.2-D Circulation en VUT (p. 45) ───────────────────────
  {
    id: "circulation-vut",
    code: "3.2-D",
    title: "Circulation en voie unique temporaire (VUT)",
    cetPage: 45,
    questions: [
      {
        id: "ch3-vut-00",
        prompt:
          "Quelles sont les conditions de circulation en voie unique temporaire, dite VUT ?",
        cardPrompt:
          "Quelles sont les conditions de circulation en voie unique temporaire, dite VUT ?",
        answer:
          "1. La VUT correspond à la circulation d'une ou plusieurs rames sur une seule voie, dans les deux sens, sans recours à la signalisation de cantonnement.\n2. Autorisée uniquement sur ordre du PCC ou par consignes spécifiques, à 30 km/h maximum.\n3. Bâton pilote : le régulateur ordonne aux rames de stopper aux extrémités de la VUT et vérifie la bonne réception du message.\n4. Première rame : s'engager sur la VUT libre sur ordre du régulateur, numéro du bâton pilote annoncé (chaque conducteur en possède un).\n5. En sortie de VUT : appeler le PCC pour les instructions de transmission du bâton pilote à la rame en attente en sens inverse.\n6. Avant engagement en sens inverse : demander l'autorisation au PCC en annonçant le numéro du bâton pilote.\n@@WARNING@@\nEn présence d'agents de maîtrise sur place, même procédure, sauf que le régulateur PCC délègue aux AMs l'autorisation d'engagement des rames sur le tronçon en VUT.",
      },
    ],
  },

  // ─── 3.2-E1 Retournement et rebroussement (p. 46–47) ─────────
  {
    id: "retournement-rebroussement",
    code: "3.2-E1",
    title: "Manœuvres de retournement et de rebroussement",
    cetPage: 46,
    questions: [
      {
        id: "ch3-e1-00",
        prompt:
          "Quelles sont les consignes de manœuvre de retournement et de rebroussement ?",
        cardPrompt:
          "Quelles sont les consignes de manœuvre de retournement et de rebroussement ?",
        answer:
          "1. Retournement : changement de voie par une communication, repartir dans l'autre sens par l'autre voie.\n2. Rebroussement : retournement sur une même voie, équivalent à une circulation en VUT.\n3. Retournement de préférence sans voyageurs, sauf stations situées après la communication de retournement.\n4. Communications manuelles non signalées : manœuvre entière sur ordre ou autorisation du PCC.\n5. Les manoeuvres 'Hors terminus' et 'non prévue sur planchette', y compris 3e voie Occitanie ou L. Blum, sont sous contrôle obligatoire du PCC.\n6. Rebroussement : uniquement dans le cadre de la consigne 3.2-D (VUT), sauf tronçon court à bonne visibilité entre station et communication, ou tronçon VU protégé par la signalisation ferroviaire.\n@@INFO@@\nCas n° 1, communication manuelle après une station :\nDéposer les voyageurs après les avoir informés de la manœuvre.\nAvancer jusqu'au clou de limite de manœuvre pour dégager l'aiguillage ou vérifier sa position.\nEnclencher les feux de détresse.\nManipulateur au neutre, retirer clé KC, quitter cabine, refermer porte à clé.\nPositionner les aiguillages en déviée.\nRemonter en cabine de tête, mode VUT sur AEL si carrefour (ex. Albert 1er).\nDépart en sens inverse jusqu'à la station, accord PCC confirmé si visibilité insuffisante.\nSauf contre-ordre PCC, remettre les aiguillages en position initiale.\nPrévenir le PCC de la fin de manœuvre.\n@@INFO@@\nCas n° 2, communication manuelle avant une station :\nArrêter en station après information des voyageurs (sauf HLP).\nFeux de détresse, neutre, clé KC, fermer cabine à clé.\nChanger de cabine, après autorisation PCC, rebrousser jusqu'à l'aiguille.\nAiguille en déviée, changement de voie après accord PCC.\nVoyageurs montent sur le même quai (sauf HLP).\nAu départ, mode VUT si l'implantation l'impose (ex. contre-sens carrefour).\nRepositionner l'aiguille sur ordre PCC après passage.",
      },
    ],
  },
];
