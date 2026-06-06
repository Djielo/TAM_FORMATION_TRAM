/** RCT — Consignes de circulation en ligne (p. 34, 38–58) */
export const MODULES_CH3 = [
  // ─── Tableau des limitations de vitesse (p. 34) — une consigne par palier ───
  {
    id: "vit-05",
    code: "p. 34",
    title: "5 km/h maximum",
    cetPage: 34,
    questions: [
      {
        id: "ch3-vit-05",
        prompt: "Dans quelles conditions conduit-on à 5 km/h maximum ?",
        cardPrompt:
          "Dans quelles conditions conduit-on à 5 km/h maximum ?",
        answer:
          "- Conduite de manœuvre\n- Circulation dans l'atelier",
      },
    ],
  },
  {
    id: "vit-10",
    code: "p. 34",
    title: "10 km/h maximum",
    cetPage: 34,
    questions: [
      {
        id: "ch3-vit-10",
        prompt: "Dans quelles conditions conduit-on à 10 km/h maximum ?",
        cardPrompt:
          "Dans quelles conditions conduit-on à 10 km/h maximum ?",
        answer:
          "- Travaux sur la voie (présence du personnel)\n- Croisement d'une rame arrêtée\n- Traversée de voies sur ornières porteuses\n- Feu routier en dérangement\n- Circulation dans le dépôt",
      },
    ],
  },
  {
    id: "vit-15",
    code: "p. 34",
    title: "15 km/h maximum",
    cetPage: 34,
    questions: [
      {
        id: "ch3-vit-15",
        prompt: "Dans quelles conditions conduit-on à 15 km/h maximum ?",
        cardPrompt:
          "Dans quelles conditions conduit-on à 15 km/h maximum ?",
        answer:
          "- Circulation en terminus\n- Prise d'une aiguille en voie déviée\n- Danger pour piéton\n- Traversée de station en HLP\n- Entrée en station (présence d'autres rames)",
      },
    ],
  },
  {
    id: "vit-20",
    code: "p. 34",
    title: "20 km/h maximum",
    cetPage: 34,
    questions: [
      {
        id: "ch3-vit-20",
        prompt: "Dans quelles conditions conduit-on à 20 km/h maximum ?",
        cardPrompt:
          "Dans quelles conditions conduit-on à 20 km/h maximum ?",
        answer:
          "- Défaut d'avertisseur sonore (gong)\n- Remorquage / Poussage (RP)",
      },
    ],
  },
  {
    id: "vit-25",
    code: "p. 34",
    title: "25 km/h maximum",
    cetPage: 34,
    questions: [
      {
        id: "ch3-vit-25",
        prompt: "Dans quelles conditions conduit-on à 25 km/h maximum ?",
        cardPrompt:
          "Dans quelles conditions conduit-on à 25 km/h maximum ?",
        answer:
          "- Mode secours traction ou alimentation directe (limite matériel roulant)",
      },
    ],
  },
  {
    id: "vit-30",
    code: "p. 34",
    title: "30 km/h maximum",
    cetPage: 34,
    questions: [
      {
        id: "ch3-vit-30",
        prompt: "Dans quelles conditions conduit-on à 30 km/h maximum ?",
        cardPrompt:
          "Dans quelles conditions conduit-on à 30 km/h maximum ?",
        answer:
          "- Voie unique temporaire (VUT)\n- Entrée en station (absence d'autre rame)",
      },
    ],
  },
  {
    id: "vit-40",
    code: "p. 34",
    title: "40 km/h maximum",
    cetPage: 34,
    questions: [
      {
        id: "ch3-vit-40",
        prompt: "Dans quelles conditions conduit-on à 40 km/h maximum ?",
        cardPrompt:
          "Dans quelles conditions conduit-on à 40 km/h maximum ?",
        answer:
          "- Franchissement de carrefours (y compris passages à niveau)\n- Aiguille RFF en direct ou dévier\n- Ouverture de voie\n- Prise d'une aiguille en voie directe\n- Défaut veille avec accompagnant\n- Défaut de frein\n- Bogie isolé\n- Chasse-corps HS ou verrouillé",
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
          "1. Retournement : changement de voie par une communication, repartir dans l'autre sens par l'autre voie.\n2. Rebroussement : retournement sur une même voie, équivalent à une circulation en VUT.\n3. Retournement de préférence sans voyageurs, sauf stations situées après la communication de retournement.\n4. Communications manuelles non signalées : manœuvre entière sur ordre ou autorisation du PCC.\n5. Les manœuvres « Hors terminus » et « non prévue sur planchette », y compris 3e voie Occitanie ou L. Blum, sont sous contrôle obligatoire du PCC.\n6. Rebroussement : uniquement dans le cadre de la consigne 3.2-D (VUT), sauf tronçon court à bonne visibilité entre station et communication, ou tronçon VU protégé par la signalisation ferroviaire.\n@@INFO@@\nCas n° 1, communication manuelle après une station :\nDéposer les voyageurs après les avoir informés de la manœuvre.\nAvancer jusqu'au clou de limite de manœuvre pour dégager l'aiguillage ou vérifier sa position.\nEnclencher les feux de détresse.\nManipulateur au neutre, retirer clé KC, quitter cabine, refermer porte à clé.\nPositionner les aiguillages en déviée.\nRemonter en cabine de tête, mode VUT sur AEL si carrefour (ex. Albert 1er).\nDépart en sens inverse jusqu'à la station, accord PCC confirmé si visibilité insuffisante.\nSauf contre-ordre PCC, remettre les aiguillages en position initiale.\nPrévenir le PCC de la fin de manœuvre.\n@@INFO@@\nCas n° 2, communication manuelle avant une station :\nArrêter en station après information des voyageurs (sauf HLP).\nFeux de détresse, neutre, clé KC, fermer cabine à clé.\nChanger de cabine, après autorisation PCC, rebrousser jusqu'à l'aiguille.\nAiguille en déviée, changement de voie après accord PCC.\nVoyageurs montent sur le même quai (sauf HLP).\nAu départ, mode VUT si l'implantation l'impose (ex. contre-sens carrefour).\nRepositionner l'aiguille sur ordre PCC après passage.",
      },
    ],
  },

  // ─── 3.2-E2 Retournement en terminus (p. 47) ─────────────────
  {
    id: "retournement-terminus",
    code: "3.2-E2",
    title: "Manœuvre de retournement en terminus",
    cetPage: 47,
    questions: [
      {
        id: "ch3-e2-00",
        prompt: "Quelles sont les consignes de retournement en terminus ?",
        cardPrompt: "Quelles sont les consignes de retournement en terminus ?",
        answer:
          "1. Manœuvres en terminus ou terminus partiel selon instructions SAE ou planchette.\n2. Neutre, retirer clé KC, quitter cabine, fermer porte à clé.\n3. Traversée de la rame : vérifier objets oubliés ou suspects, prévenir le PCC si besoin.\n4. Cabine de tête en service : vérifier pré-sélection côté portes et girouettes.\n5. Avancer vers le quai, respecter la signalisation, déverrouiller les portes.\n6. Manœuvre avant-gare avec voyageurs, attention à la sélection d'ouverture des portes pour la descente.\n7. Vitesse en terminus limitée à 15 km/h.\n8. Quitter le poste sur temps de battement ou pause. Hors créneau, autorisation PCC.\n@@WARNING@@\nLa marche arrière depuis la cabine opposée au sens est formellement interdite.\nException : courtes distances en RP avec second agent dans la cabine opposée.",
      },
    ],
  },

  // ─── 3.2-E3 Rebroussement sur VU (p. 48) ─────────────────────
  {
    id: "rebroussement-vu",
    code: "3.2-E3",
    title: "Manœuvre de rebroussement sur voie unique",
    cetPage: 48,
    questions: [
      {
        id: "ch3-e3-00",
        prompt:
          "Quelles sont les consignes de rebroussement sur voie unique ?",
        cardPrompt:
          "Quelles sont les consignes de rebroussement sur voie unique ?",
        answer:
          "1. Rebroussement après station : s'engager jusqu'au repère de rebroussement (ex. Boirargues L3).\n2. Après autorisation PCC : changer de cabine, contrôler l'aiguille, se diriger vers le quai sur la voie opposée.\n@@INFO@@\nEn cas de conflit (deux rames opposées en VU) ou SM rouge (problème d'aiguillage) :\nLa rame la plus proche de l'évitement fait le rebroussement après autorisation PCC. Voyageurs à bord conseillés, après accord PCC.\nDégager au préalable l'appareil de voie de la station quittée, en marche avant si besoin.\nAprès changement de cabine : rebroussement à 5 km/h max, dépasser l'évitement (2 appareils), dégager l'aiguille de sortie avant de rebrousser.\nInformer le PCC de la position au retour sur le quai de départ.\nAprès autorisation PCC, repartir en direction de la station d'évitement.\nMarquer l'arrêt au SM de sortie de station, s'engager au vert.",
      },
    ],
  },

  // ─── 3.3 Circulation Haut Le Pied (p. 49) ────────────────────
  {
    id: "circulation-hlp",
    code: "3.3",
    title: "Circulation Haut Le Pied (sans voyageurs)",
    cetPage: 49,
    questions: [
      {
        id: "ch3-hlp-00",
        prompt:
          "Quelles sont les consignes de circulation Haut Le Pied (sans voyageurs) ?",
        cardPrompt:
          "Quelles sont les consignes de circulation Haut Le Pied (sans voyageurs) ?",
        answer:
          "1. Vitesse en station limitée à 15 km/h.\n2. Au passage en station : gong obligatoire, excepté à partir de 22 h, sauf si danger.\n3. Vérifier le message affiché sur la girouette.\n4. Feux de détresse actionnés.",
      },
    ],
  },

  // ─── 3.4 Feux et feux de détresse (p. 49) ─────────────────────
  {
    id: "feux-detresse",
    code: "3.4",
    title: "Utilisation des feux et feux de détresse",
    cetPage: 49,
    questions: [
      {
        id: "ch3-feux-00",
        prompt:
          "Quelles sont les consignes d'utilisation des feux et feux de détresse ?",
        cardPrompt:
          "Quelles sont les consignes d'utilisation des feux et feux de détresse ?",
        answer:
          "1. Circuler avec feux de croisement et éclairage intérieur allumés, jour et nuit.\n2. Feux de route et de brouillard selon Code de la route.\n3. Feux de détresse :\n- Arrêt anormal et prolongé en ligne.\n- Circulation HLP et en VUT.\n- Zone gare en cas d'itinéraire dévié.\n- Franchissement d'un carrefour, feux clignotants ou éteints.\n- Poussages ou remorquages.\n@@WARNING@@\nCroisement d'une rame arrêtée sur l'autre voie : ralentir à 10 km/h, arrêt à hauteur de la cabine de l'autre rame, informer impérativement le PCC avant de repartir.\nPanne feux de détresse sur arrêt anormal prolongé : placer le triangle de signalisation environ 40 m avant la rame.",
      },
    ],
  },

  // ─── 3.5 Utilisation du gong (p. 50) ───────────────────────────
  {
    id: "utilisation-gong",
    code: "3.5",
    title: "Utilisation du gong",
    cetPage: 50,
    questions: [
      {
        id: "ch3-gong-00",
        prompt: "Quelles sont les consignes d'utilisation du gong ?",
        cardPrompt: "Quelles sont les consignes d'utilisation du gong ?",
        answer:
          "1. Gong obligatoire dans les cas suivants :\n- Piétons ou cyclistes à proximité ou sur la voie.\n- Franchissement de carrefour ou de zone piétonne, en présence de sources de danger.\n- Croisement avec une rame ou un bus arrêté.\n2. De 7 h à 22 h seulement :\n- Arrivée en station.\n- Départ de station et mise en mouvement de la rame.\n- Croisement avec une rame en circulation, au passage à hauteur de la nacelle centrale.\n3. En mode dégradé :\n- Franchissement de carrefour avec feux en disfonctionnement.\n- VUT à contresens.\n@@WARNING@@\nEn cas de panne du gong :\n- Prévenir le PCC.\n- Respecter la vitesse de consigne de 20 km/h.\n- Klaxon si danger recommandé en remplacement.",
      },
    ],
  },

  // ─── 3.6 Distances de sécurité (p. 50) ───────────────────────
  {
    id: "distances-securite",
    code: "3.6",
    title: "Distances de sécurité",
    cetPage: 50,
    questions: [
      {
        id: "ch3-dist-00",
        prompt: "Quelles sont les distances de sécurité entre rames ?",
        cardPrompt: "Quelles sont les distances de sécurité entre rames ?",
        answer:
          "1. Entre deux rames circulant en ligne (commercial ou HLP) : 100 m minimum.\n2. Distance réduite à 50 m sur les tronçons limités à 30 km/h maxi.\n3. Deux rames à l'arrêt hors station : 5 m minimum.\n4. Adapter la vitesse d'approche d'une rame arrêtée selon visibilité et adhérence.\n5. Deux rames à l'arrêt en station : 2 m minimum.\n@@WARNING@@\nEntrée en station à quai double : vitesse max 15 km/h si première rame au quai ou rame arrêtée sur le quai opposé (risque de piéton traversant derrière la rame à l'arrêt).",
      },
    ],
  },

  // ─── 3.7 Arrêt en station — principes (p. 51) ──────────────────
  {
    id: "arret-station",
    code: "3.7",
    title: "Arrêt en station — Principes généraux",
    cetPage: 51,
    questions: [
      {
        id: "ch3-arret-00",
        prompt:
          "Quelles sont les consignes d'arrêt en station (avant ouverture des portes) ?",
        cardPrompt:
          "Quelles sont les consignes d'arrêt en station (avant ouverture des portes) ?",
        answer:
          "1. Montée et descente en station, seulement du côté prévu, sauf consigne particulière du PCC.\n2. En service commercial, arrêt marqué à chaque station.\n3. Entrée en station à 30 km/h maxi, gong actionné, ou 15 km/h si rame devant (quais allongés) ou sur la voie opposée (cf. § 3.6).\n4. Attention renforcée envers les voyageurs en bordure de quai.\n5. Immobilisation au clou rouge, à hauteur d'épaule du conducteur.\n6. Portes déverrouillées uniquement à l'arrêt complet de la rame.",
      },
    ],
  },

  // ─── 3.7-A Ouverture des portes (p. 51–52, jusqu'à § B) ───────
  {
    id: "ouverture-portes",
    code: "3.7-A",
    title: "Arrêt en station — Ouverture des portes",
    cetPage: 51,
    questions: [
      {
        id: "ch3-ouv-portes-00",
        prompt: "Quelles sont les consignes d'ouverture des portes en station ?",
        cardPrompt:
          "Quelles sont les consignes d'ouverture des portes en station ?",
        answer:
          "1. Citadis 401 : à l'arrêt, pré-sélection droite active (BPAL enclenché et allumé), actionner le BPAL du mode self-service.\n2. Citadis 302 ou 402 : à l'arrêt, actionner le BPAL côté droit ou gauche selon l'emplacement du quai.\n3. Ouverture auto des doubles portes CC pour accès PMR ; autres portes ouvertes par voyageurs par bouton intérieur ou extérieur.\n4. Citadis 402 : demande PMR (pictogramme SIE), acquitter à l'écran pour ouvrir la caisse concernée (mode self).\n5. Surveiller la montée et la descente des voyageurs.\n6. Au terminus sur quai de départ : mode self activé, commutateur en N pour garder les portes centrales fermées (chauffage ou climatisation).\n7. Commandes portes actives depuis la cabine en service, ou depuis la dernière cabine en cas de changement de cabine en cours.\n@@WARNING@@\nForte affluence : actionner l'ouverture générale (BPAL) pour accélérer l'échange voyageur en station.",
      },
    ],
  },

  // ─── 3.7-B Fermeture des portes (p. 52) ──────────────────────
  {
    id: "fermeture-portes",
    code: "3.7-B",
    title: "Fermeture des portes",
    cetPage: 52,
    questions: [
      {
        id: "ch3-ferm-portes-00",
        prompt: "Quelles sont les consignes de fermeture des portes en station ?",
        cardPrompt:
          "Quelles sont les consignes de fermeture des portes en station ?",
        answer:
          "1. Après environ 15s (faible affluence) ou 30s (forte affluence), en anticipant les dernières montées, décrocher le BPAL.\n2. Fermeture des portes centrales et portes en mode self, sécurités actives ; en cas d'obstacle, réouverture puis refermeture.\n3. Obstacle en phase de fermeture, portes bloquées : commande d'ouverture générale avant de relancer la fermeture.\n4. Forte affluence : appui prolongé sur le BPI, fermeture forcée, sécurités inhibées, message « attention à la fermeture des portes ».\n@@WARNING@@\nCitadis 401 : fermeture forcée via le BPAL du côté sélectionné interdite (annule le message d'alerte, risque d'ouverture côté entrevoie après poignée d'alarme).\nCitadis 302 et 402 : interdit d'ouvrir les deux côtés simultanément en exploitation commerciale, pour la même raison.",
      },
    ],
  },

  // ─── 3.7-C Départ de station (p. 53) ─────────────────────────
  {
    id: "depart-station",
    code: "3.7-C",
    title: "Départ de la station",
    cetPage: 53,
    questions: [
      {
        id: "ch3-depart-00",
        prompt: "Quelles sont les consignes de départ de station ?",
        cardPrompt: "Quelles sont les consignes de départ de station ?",
        answer:
          "1. VU lignes 2 et 3 (cantonnement) : départ autorisé uniquement si signalisation ferroviaire au vert, ne pas quitter le quai au rouge.\n2. Quai double, seconde position derrière une autre rame : marquer un deuxième arrêt en tête de quai pour la prise en charge des personnes handicapées.\n3. Portes verrouillées (bip cabine) : départ en surveillant le quai par rétrovisions, gong actionné.\n4. Jusqu'à ce que l'arrière de la rame ait quitté le quai : vérifier par rétrovisions qu'aucun voyageur n'est entraîné.\n5. Appel interphonie voyageur pendant le dégagement du quai : vérifier les rétrovisions.\n@@INFO@@\nRétrovisions : piéton entraîné par la rame, piéton en bordure du GLO pouvant être heurté.\n@@WARNING@@\nCorum L1V2, seconde position : position d'attente uniquement, échange voyageurs strictement interdit (quai non aligné, risque d'accident grave).",
      },
    ],
  },

  // ─── 3.7-D Défaut porte et poignée d'alarme (p. 54) ───────────
  {
    id: "defaut-porte",
    code: "3.7-D",
    title: "Défaut porte et poignée d'alarme",
    cetPage: 54,
    questions: [
      {
        id: "ch3-def-porte-00",
        prompt:
          "Quelles sont les consignes en cas de poignée d'alarme ou défaut porte ?",
        cardPrompt:
          "Quelles sont les consignes en cas de poignée d'alarme ou défaut porte ?",
        answer:
          "1. Poignée tirée pendant le dégagement du quai (BPIL phonie + SIE) : FU ou FMS, portes libérées après 15 s, risque d'ouverture côté entrevoie.\n2. Éviter toute ouverture du mauvais côté : réarmer la poignée ou sélectionner le bon côté de déverrouillage (401 = côté pré-sélectionné).\n3. Dialoguer avec l'auteur via interphonie, informer l'ensemble des voyageurs une fois la cause identifiée.\n4. Vérifier la sécurité des voyageurs avant redémarrage (chutes possibles après FU ou FMS).\n5. Même consigne rame à l'arrêt en ligne, hors zone de dégagement de quai.\n6. Mode dégradé défaut porte : condamner la porte, apposer l'autocollant d'information clientèle.\n7. Contrôler l'information sur la console SIE et l'efficacité de la condamnation.\n8. Signaler sur la feuille de route et au PCC.\n@@WARNING@@\nHors zone de dégagement : libération des portes 15 s après tirage de poignée, côté entrevoie si mauvais côté, en l'absence d'action conducteur.\nImpossible de condamner : le PCC peut ordonner d'isoler le contrôle portes (déplombage commutateur armoire de loge). Évacuation de la rame impérative au préalable.",
      },
    ],
  },

  // ─── 3.8 Communication avec la clientèle (p. 55) ─────────────
  {
    id: "communication-clientele",
    code: "3.8",
    title: "Communication avec la clientèle",
    cetPage: 55,
    questions: [
      {
        id: "ch3-client-00",
        prompt:
          "Quelles sont les consignes de communication avec la clientèle ?",
        cardPrompt:
          "Quelles sont les consignes de communication avec la clientèle ?",
        answer:
          "1. Garant de l'image TaM : attitude tournée vers le confort et la sécurité des clients.\n2. Situation perturbée ou incident : information impérative, ton rassurant pour éviter la panique.\n3. Situation imprévue : informer via la sonorisation des salles ; arrêt prolongé, expliquer l'évolution et rassurer.\n4. Phonie : respirer après connexion (premier mot souvent perdu).\n5. Parler calmement, mots détachés, voix posée, pas trop fort.\n6. Tenir la bouche à 5-6 cm du micro.\n@@INFO@@\nExemples d'annonces type :\n- Arrêt prolongé : informer du retard et de l'évolution de la situation.\n- Descente voyageurs : quitter la rame, préciser le relais (bus spécial, rame suivante, rame devant).\n- Terminus intermédiaire (Occitanie, L. Blum) : reporter sur la rame suivante.\n- Fumeurs : éteindre les cigarettes.\n- Portes : se tenir en arrière des portes pour faciliter la fermeture.",
      },
    ],
  },

  // ─── 3.9-A Signalements radio PCC (p. 56) ─────────────────────
  {
    id: "signalements-radio",
    code: "3.9-A",
    title: "Communication PCC — Signalements radio",
    cetPage: 56,
    questions: [
      {
        id: "ch3-radio-00",
        prompt: "Quelles sont les consignes de signalement radio au PCC ?",
        cardPrompt: "Quelles sont les consignes de signalement radio au PCC ?",
        answer:
          "1. Trois niveaux d'appel : normal, urgent, détresse (mise en toute écoute + feux de détresse).\n2. Citadis 402 détresse : appui long ; annuler en accrochant/décrochant le bouton feux de détresse.\n3. Appel obligatoire au PCC :\n- Tous les cas des consignes de circulation en ligne (partie 3) et d'urgence (partie 4).\n- Présence suspecte sur voie (handicapés mentaux, enfants, personnes âgées, etc.) ou piétons en tunnel.\n- Après FU ou FS suite à incident.\n- Défauts, dégâts, vandalisme ou anomalies sur matériel roulant (gravage, taggage, bris de glace, etc.).\n- Dégâts ou défauts au sol mettant en cause sécurité ou continuité d'exploitation.\n- Chantier sur voie mal protégé ou mal signalé, ou risque pour la ligne aérienne.\n- Panne des feux de traversée routière ou des feux des zones de manœuvre.\n@@WARNING@@\nFin de service : reporter les signalements radio sur la feuille de route.",
      },
    ],
  },

  // ─── 3.9-B Panne de phonie (p. 57) ─────────────────────────────
  {
    id: "panne-phonie",
    code: "3.9-B",
    title: "Communication PCC — Panne de phonie",
    cetPage: 57,
    questions: [
      {
        id: "ch3-phonie-00",
        prompt: "Quelles sont les consignes en cas de panne de phonie ?",
        cardPrompt: "Quelles sont les consignes en cas de panne de phonie ?",
        answer:
          "1. Panne générale, ou mode secours phonie indépendant du pupitre SAE inopérant sur la rame.\n2. Attendre l'arrivée d'une autre rame et lui demander de prévenir le PCC.\n3. Ou appeler le PCC avec son téléphone personnel, rame à l'arrêt, puis suivre les instructions du régulateur.\n@@WARNING@@\nFin de service : noter l'incident sur la feuille de route.",
      },
    ],
  },

  // ─── 3.9-C Rentrée et circulation dépôt (p. 57–58) ─────────────
  {
    id: "rentree-depot",
    code: "3.9-C",
    title: "Rentrée et circulation dans le dépôt",
    cetPage: 57,
    questions: [
      {
        id: "ch3-rentree-00",
        prompt:
          "Quelles sont les consignes de rentrée et circulation dans le dépôt ?",
        cardPrompt:
          "Quelles sont les consignes de rentrée et circulation dans le dépôt ?",
        answer:
          "1. Demander l'autorisation de rentrer au dépôt.\n2. Stationner sur le site désigné par le PCC (voie E, en station ou sur remisage selon l'heure).\n3. Vérifier l'état intérieur et extérieur de la rame.\n4. Signaler tout dégât ou dysfonctionnement sur la feuille de route.\n5. Noter le kilométrage effectué et le nombre d'heures.\n6. Déposer la feuille de route dans la boîte aux lettres prévue.\n7. Ranger la planchette en salle de prise de service.\n8. Pour circuler dans le dépôt :\n- Circulation toujours sans client.\n- Circulation sous contrôle du PCC.\n- Respecter la signalisation de manœuvre.\n- Déplacements sous responsabilité du conducteur.\n- Vitesse max 10 km/h (3 km/h en zone ateliers).\n- Circulation en zone atelier interdite aux conducteurs.",
      },
    ],
  },

  // ─── 3.9-D Signalements par écrit (p. 58) ──────────────────────
  {
    id: "signalements-ecrits",
    code: "3.9-D",
    title: "Signalements par écrit",
    cetPage: 58,
    questions: [
      {
        id: "ch3-ecrit-00",
        prompt: "Quelles sont les consignes de signalement par écrit ?",
        cardPrompt: "Quelles sont les consignes de signalement par écrit ?",
        answer:
          "1. On distingue :\n- Feuille de route attachée au conducteur : incidents ayant affecté son service.\n- Feuille de route (de couleur) attachée à la rame : fonctionnement du matériel roulant et embarqué (valideurs, etc.).\n2. Le conducteur doit :\n- Apporter le plus grand soin à la rédaction de la feuille de route.\n- Remplir correctement les rubriques (accidents, incidents, etc.).\n- Noter les anomalies liées au matériel roulant sur la feuille de route.\n- Noter les appels importants du PCC.\n3. Rapport interne, notamment en cas :\n- D'incidents susceptibles d'entraîner plaintes ou réclamations.\n- D'accident corporel ou matériel, ou dégâts sur le matériel roulant.\n@@WARNING@@\nRapport interne : formulation engageante vis-à-vis du RCT et de l'interprétation administrative ; porter le plus grand soin à sa rédaction. Peut être établi lors d'un entretien de restitution avec un AM Exploitation.",
      },
    ],
  },
];

/** Regroupements affichés avant la liste des consignes (pré-examen ch. circulation). */
export const MODULE_GROUPS_CH3 = [
  {
    id: "vitesses",
    code: "p. 34",
    title: "Tableau des Limitations de Vitesse",
    moduleIds: [
      "vit-05",
      "vit-10",
      "vit-15",
      "vit-20",
      "vit-25",
      "vit-30",
      "vit-40",
    ],
  },
  {
    id: "pds-conduite",
    code: "3.1",
    title: "Prise de Service, Relève et Conduite",
    moduleIds: [
      "pds-depot",
      "pds-releve",
      "sortie-depot",
      "comportement-rame",
    ],
  },
  {
    id: "circulation-ligne",
    code: "3.2",
    title: "Circulation en Ligne",
    moduleIds: [
      "circulation-ligne",
      "glo-gabarit",
      "ouverture-voie",
      "circulation-voie-double",
      "circulation-voie-unique",
      "circulation-vut",
      "retournement-rebroussement",
      "retournement-terminus",
      "rebroussement-vu",
    ],
  },
  {
    id: "hlp-feux-gong",
    code: "3.3–3.6",
    title: "HLP, Feux, Gong et Distances",
    moduleIds: [
      "circulation-hlp",
      "feux-detresse",
      "utilisation-gong",
      "distances-securite",
    ],
  },
  {
    id: "station",
    code: "3.7",
    title: "Station : Arrêt, Départ et Portes",
    moduleIds: [
      "arret-station",
      "ouverture-portes",
      "fermeture-portes",
      "depart-station",
      "defaut-porte",
    ],
  },
  {
    id: "communication-signalements",
    code: "3.8–3.9",
    title: "Communication, Rentrée Dépôt et Signalements",
    moduleIds: [
      "communication-clientele",
      "signalements-radio",
      "panne-phonie",
      "rentree-depot",
      "signalements-ecrits",
    ],
  },
];
