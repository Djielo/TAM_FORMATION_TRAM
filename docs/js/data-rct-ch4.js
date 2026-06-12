/** RCT — Consignes d'urgence (p. 59–75) */
export const MODULES_CH4 = [
  // ─── 4.1 Consignes générales en cas d'urgence (p. 60) ───────
  {
    id: "urgence-arret-rame",
    code: "4.1",
    title: "Incident ou accident imposant l'arrêt",
    cetPage: 60,
    questions: [
      {
        id: "ch4-41-arret",
        prompt:
          "Quelles sont les consignes pour un incident ou un accident imposant l'arrêt de la rame ?",
        cardPrompt:
          "Quelles sont les consignes pour un incident ou un accident imposant l'arrêt de la rame ?",
        answer:
          "1. Arrêter la rame.\n2. Enclencher les feux de détresse.\n3. Appeler le PCC par message flash : position, direction, nature de l'incident.\n4. Informer les clients à bord.\n@@WARNING@@\nCes 4 consignes s'appliquent à toute situation d'urgence imposant l'arrêt de la rame.\nEn cas d'arrêt prolongé, et en accord avec le PCC, faire évacuer la rame.",
      },
    ],
  },
  {
    id: "urgence-depart-urgent",
    code: "4.1",
    title: "Départ urgent de la zone de danger",
    cetPage: 60,
    questions: [
      {
        id: "ch4-41-depart",
        prompt:
          "Quelles sont les consignes lorsque la situation impose un départ urgent de la rame ?",
        cardPrompt:
          "Quelles sont les consignes lorsque la situation impose un départ urgent de la rame ?",
        answer:
          "1. Cas concernés :\n- Début d'incendie à proximité de la rame.\n- Jets de projectiles sur la rame.\n- Tout autre cas justifiant un départ immédiat.\n2. Le conducteur est autorisé à quitter en urgence la zone dangereuse, quitte à anticiper son départ du terminus, et à prévenir le PCC une fois le danger écarté.\n3. L'évacuation s'effectue dans le respect des règles de circulation (SIG routière et ferroviaire).",
      },
    ],
  },
  {
    id: "urgence-coordinateur",
    code: "4.1",
    title: "Incident grave — rôle de coordinateur",
    cetPage: 60,
    questions: [
      {
        id: "ch4-41-coord",
        prompt:
          "En cas d'incident grave, quel est le rôle du conducteur en attendant un responsable hiérarchique ?",
        cardPrompt:
          "En cas d'incident grave, quel est le rôle du conducteur en attendant un responsable hiérarchique ?",
        answer:
          "1. En attendant l'arrivée d'un responsable hiérarchique, le conducteur assure la fonction de coordinateur sur les lieux : recueillir les témoignages et rendre compte de l'évolution au PCC.\n2. Une fois sur les lieux, le responsable hiérarchique le plus élevé prend le commandement à titre de coordinateur et devient l'interlocuteur des Pompiers et de la Police.\n3. Dès que la gestion de l'incident le permet, un agent de maîtrise mène un entretien de restitution et d'analyse avec le conducteur.",
      },
    ],
  },

  // ─── 4.2 Accidents et agressions (p. 61–64) ──────────────────
  {
    id: "accident-materiel",
    code: "4.2-A",
    title: "Accident matériel",
    cetPage: 61,
    questions: [
      {
        id: "ch4-42a",
        prompt:
          "Quelles sont les consignes à suivre pour un accident matériel ?",
        cardPrompt:
          "Quelles sont les consignes à suivre pour un accident matériel ?",
        answer:
          "1. Arrêter la rame, mettre les feux de détresse.\n2. Faire un appel d'urgence et informer les clients.\n3. Prendre toutes les dispositions pour éviter un autre accident.\n4. Relever l'identité des témoins.\n5. Remplir la fiche PRE CONSTAT ACCIDENT dans la rame avec les tiers (conducteur joignable par le PCC). Noter les coordonnées du tiers sur la feuille de route.\n6. Donner l'exemplaire à remettre au tiers.\n7. Informer le PCC de la mise à disposition de la rame.\n8. Remettre le CONSTAT ACCIDENT (partie A remplie et signée) le jour même au PCC ou dans la boîte aux lettres rouge constat sur JP.\n9. Noter l'accident sur la feuille de route en précisant les circonstances.\n@@WARNING@@\nChoc latéral violent sur la partie avant : mettre le FS (risques électriques au niveau de la descente HT).\nDéplacement des véhicules et reprise du service : uniquement sur ordre du PCC.",
      },
    ],
  },
  {
    id: "accident-corporel",
    code: "4.2-B",
    title: "Accident corporel",
    cetPage: 62,
    questions: [
      {
        id: "ch4-42b",
        prompt:
          "Quelles sont les consignes à suivre pour un accident corporel ?",
        cardPrompt:
          "Quelles sont les consignes à suivre pour un accident corporel ?",
        answer:
          "1. Arrêter la rame, mettre les feux de détresse.\n2. Faire un appel d'urgence, prévenir les clients.\n3. Prendre toutes les dispositions pour éviter un autre accident et protéger les blessés.\n4. Relever l'état du blessé (conscient ou inconscient, nature des blessures, âge, traitements médicaux). Sortir de la loge pour un signalement précis, même si le blessé est dans la rame.\n5. Communiquer ces informations au PCC.\n6. Se conformer aux ordres du PCC.\n7. Réceptionner les secours et se mettre à leur disposition.\n8. Rechercher des témoins.\n9. Rédiger la fiche CONSTAT CORPOREL dans la rame. Noter les coordonnées des victimes et témoins.\n10. Appeler le PCC pour avoir l'autorisation de reprise du service.\n11. Remettre au PCC le CONSTAT CORPOREL et le CONSTAT ACCIDENT (partie B remplie et signée).\n12. Noter l'accident sur la feuille de route.\n@@WARNING@@\nBlessures en apparence légères, victime refusant d'être secourue : ne pas reprendre le service sans accord du PCC. Recueillir quand même les coordonnées de la victime.",
      },
    ],
  },
  {
    id: "personne-sous-rame",
    code: "4.2-C",
    title: "Personne engagée sous la rame",
    cetPage: 63,
    questions: [
      {
        id: "ch4-42c",
        prompt:
          "Quelles sont les consignes lorsqu'une personne est engagée sous la rame ?",
        cardPrompt:
          "Quelles sont les consignes lorsqu'une personne est engagée sous la rame ?",
        answer:
          "1. Arrêter la rame, mettre les feux de détresse.\n2. Mettre le FS (coupure alimentation électrique, ouverture disjoncteur).\n3. Faire un appel d'urgence avant de couper la batterie.\n4. Abaisser le pantographe et dé-préparer la rame si la victime est engagée sous la rame, y compris coupure batterie.\n5. Informer les clients.\n6. Protéger la personne blessée et relever son état (conscient ou inconscient, nature des blessures, incarcération, âge, traitements médicaux).\n7. Réceptionner les secours et se mettre à leur disposition.\n8. Remettre au PCC le CONSTAT CORPOREL et le CONSTAT ACCIDENT (partie B remplie et signée).\n9. Noter l'accident sur la feuille de route.\n@@WARNING@@\nSi la victime est engagée sous le tramway, seuls les Pompiers sont autorisés à faire déplacer la rame.",
      },
    ],
  },
  {
    id: "agression-conducteur",
    code: "4.2-D",
    title: "Agression ou malaise du conducteur",
    cetPage: 64,
    questions: [
      {
        id: "ch4-42d",
        prompt:
          "Quelles sont les consignes en cas de malaise ou d'agression du conducteur en cabine ?",
        cardPrompt:
          "Quelles sont les consignes en cas de malaise ou d'agression du conducteur en cabine ?",
        answer:
          "1. Arrêter la rame, mettre les feux de détresse.\n2. Enclencher le frein de secours (FS).\n3. Déclencher l'appel de détresse.\n4. Dans la mesure du possible, informer la clientèle.",
      },
    ],
  },

  // ─── 4.3 Déraillement (p. 64) ───────────────────────────────
  {
    id: "deraillement",
    code: "4.3",
    title: "Déraillement de la rame",
    cetPage: 64,
    questions: [
      {
        id: "ch4-43",
        prompt: "Quelles sont les consignes en cas de déraillement de la rame ?",
        cardPrompt:
          "Quelles sont les consignes en cas de déraillement de la rame ?",
        answer:
          "1. Arrêter la rame, mettre les feux de détresse.\n2. Faire un appel d'urgence.\n3. Informer les clients.\n4. Abaisser le pantographe après contrôle visuel de la LAC (risque d'arrachement).\n5. Faire évacuer la rame, après accord du PCC (voir 4.7-B et 4.7-D).\n6. Dé-préparer la rame.\n7. Signaler la présence du tramway avec le triangle de pré-signalisation.\n8. Réceptionner les secours et se mettre à leur disposition.\n@@WARNING@@\nIl est interdit au conducteur d'entamer lui-même une tentative de ré-enraillement.",
      },
    ],
  },

  // ─── 4.4 Incidents à bord (p. 65–68) ────────────────────────
  {
    id: "voyageur-malaise",
    code: "4.4-A",
    title: "Malaise, agression ou chute d'un voyageur",
    cetPage: 65,
    questions: [
      {
        id: "ch4-44a",
        prompt:
          "Quelles sont les consignes en cas de malaise, d'agression, de chute ou de décès d'un voyageur à bord ?",
        cardPrompt:
          "Quelles sont les consignes en cas de malaise, d'agression, de chute ou de décès d'un voyageur à bord ?",
        answer:
          "1. Faire un appel d'urgence.\n2. Arrêter la rame (de préférence à la station la plus proche), mettre les feux de détresse.\n3. Enlever la clé KC et fermer la cabine.\n4. Se rendre auprès de la personne blessée et lui porter assistance.\n5. Rappeler le PCC après évaluation de la situation et se conformer à ses instructions.\n6. Noter les coordonnées des témoins.\n7. Selon la gravité : réceptionner les secours et se mettre à leur disposition.\n8. Noter l'incident sur la feuille de route.",
      },
    ],
  },
  {
    id: "bris-vitre",
    code: "4.4-B",
    title: "Bris de vitre",
    cetPage: 66,
    questions: [
      {
        id: "ch4-44b",
        prompt:
          "Quelles sont les consignes en cas de bris de vitre latérale ou de glace de cabine ?",
        cardPrompt:
          "Quelles sont les consignes en cas de bris de vitre latérale ou de glace de cabine ?",
        answer:
          "1. Arrêter la rame si possible en station, mettre les feux de détresse.\n2. Faire un appel d'urgence.\n3. S'assurer qu'il n'y a pas de blessé.\n4. Éloigner les clients à proximité de la vitre brisée.\n5. Après avoir informé le PCC, attendre ses ordres : évacuation de la rame, ou fin de course en commercial jusqu'au prochain terminus si la vitre ne présente pas de danger ou si du personnel TaM à bord peut sécuriser la zone.\n6. Noter l'incident sur la feuille de route.",
      },
    ],
  },
  {
    id: "incident-pare-brise",
    code: "4.4-C",
    title: "Incident de pare-brise",
    cetPage: 66,
    questions: [
      {
        id: "ch4-44c",
        prompt:
          "Quelles sont les consignes en cas de casse du pare-brise ou de problème de visibilité mettant en cause la sécurité ?",
        cardPrompt:
          "Quelles sont les consignes en cas de casse du pare-brise ou de problème de visibilité mettant en cause la sécurité ?",
        answer:
          "1. Arrêter la rame si possible en station, mettre les feux de détresse.\n2. Faire un appel d'urgence.\n3. Informer la clientèle.\n4. Faire évacuer la rame.\n5. Après avoir informé le PCC de la fin de l'évacuation, attendre ses ordres.\n6. Noter l'incident sur la feuille de route.",
      },
    ],
  },
  {
    id: "incendie-bord",
    code: "4.4-D",
    title: "Incendie à bord",
    cetPage: 67,
    questions: [
      {
        id: "ch4-44d",
        prompt: "Quelles sont les consignes en cas d'incendie à bord ?",
        cardPrompt: "Quelles sont les consignes en cas d'incendie à bord ?",
        answer:
          "1. Arrêter la rame, mettre les feux de détresse.\n2. Procéder à l'évacuation des voyageurs (voir 4.7-B et 4.7-D).\n3. Faire un appel d'urgence.\n4. Évaluer le sinistre.\n5. Abaisser le pantographe et dé-préparer la rame.\n6. S'assurer que personne n'est resté à l'intérieur.\n7. Combattre le feu à l'aide des extincteurs.\n8. Réceptionner les secours et se mettre à leur disposition.\n@@WARNING@@\nMêmes consignes pour un incendie sur le lieu de remisage.\nAprès un incendie même léger, interdit de remonter le pantographe sans autorisation du PCC.",
      },
    ],
  },
  {
    id: "colis-suspect-bord",
    code: "4.4-E",
    title: "Colis suspect à bord (Vigipirate)",
    cetPage: 68,
    questions: [
      {
        id: "ch4-44e",
        prompt:
          "Quelles sont les consignes en cas de colis suspect à bord (plan Vigipirate) ?",
        cardPrompt:
          "Quelles sont les consignes en cas de colis suspect à bord (plan Vigipirate) ?",
        answer:
          "1. Attitude de prudence, sans exagérer le risque. Un colis suspect ne doit ni être touché ni déplacé.\n2. Cas 1 — repéré au changement de loge :\n- Appeler le PCC par appel d'urgence en précisant nature et emplacement de l'objet.\n- Se conformer aux instructions du PCC.\n3. Cas 2 — signalé en ligne :\n- Identifier l'objet et s'enquérir de son éventuel propriétaire.\n- Appeler le PCC et se conformer à ses instructions.\n- En cas de difficulté de liaison radio : évacuer la rame et rejoindre en haut le pied le terminus le plus proche.\n- Une fois la rame stationnée en tiroir, s'éloigner et faire respecter un périmètre de sécurité en attendant la Police et les équipes TaM.\n@@INFO@@\nTout objet abandonné n'est pas forcément suspect : apprécier la nature, le volume et le risque avec bon sens et discernement.",
      },
    ],
  },

  // ─── 4.5 Incidents aux abords de la voie (p. 69–72) ────────
  {
    id: "colis-suspect-voie",
    code: "4.5-A",
    title: "Colis suspect aux abords de la voie",
    cetPage: 69,
    questions: [
      {
        id: "ch4-45a",
        prompt:
          "Quelles sont les consignes en cas d'alerte à la bombe ou de colis suspect aux abords de la voie ?",
        cardPrompt:
          "Quelles sont les consignes en cas d'alerte à la bombe ou de colis suspect aux abords de la voie ?",
        answer:
          "1. Attitude de prudence. Un colis suspect ne doit ni être touché ni déplacé.\n2. En cas d'alerte à la bombe (appel PCC ou intervention Police) :\n- Arrêter la rame, mettre les feux de détresse, se conformer aux instructions reçues.\n- En cas d'ordre d'évacuer : prévenir la clientèle et procéder à l'évacuation en respectant les règles de sécurité (voir 4.7-B).\n- Se mettre à la disposition de la Police et rendre compte au PCC.",
      },
    ],
  },
  {
    id: "chute-lac",
    code: "4.5-B",
    title: "Chute de la LAC et risques électriques",
    cetPage: 70,
    questions: [
      {
        id: "ch4-45b",
        prompt:
          "Quelles sont les consignes en cas de chute de la ligne aérienne ou de risques électriques ?",
        cardPrompt:
          "Quelles sont les consignes en cas de chute de la ligne aérienne ou de risques électriques ?",
        answer:
          "1. Arrêter la rame, mettre les feux de détresse.\n2. Faire un appel d'urgence.\n3. Informer les clients de l'interdiction de descendre et des risques encourus.\n4. Abaisser le pantographe et dé-préparer la rame.\n5. Attendre l'ordre du PCC pour faire descendre les clients : descente uniquement lorsque le PCC confirme que la LAC n'est pas alimentée.\n6. Faire descendre du côté où ils encourent le moins de risque, après accord du PCC en cas de descente côté entrevoie.\n7. En cas d'avarie sur le pantographe, interdit de monter en toiture (risques électriques).\n8. Noter l'accident sur la feuille de route.\n@@INFO@@\nMêmes consignes en cas de chute d'un arbre sur la voie ou sur une rame.",
      },
    ],
  },
  {
    id: "inondation-voie",
    code: "4.5-C",
    title: "Inondation de la voie",
    cetPage: 71,
    questions: [
      {
        id: "ch4-45c",
        prompt: "Quelles sont les consignes en cas d'inondation de la voie ?",
        cardPrompt: "Quelles sont les consignes en cas d'inondation de la voie ?",
        answer:
          "1. Inondation inférieure à 10 cm :\n- Franchir la zone en conduite manœuvre à 5 km/h.\n- Informer le PCC.\n2. Inondation supérieure à 10 cm (au-dessus du niveau rouge du repère) :\n- Arrêter la rame, mettre les feux de détresse.\n- Faire un appel d'urgence.\n- Se conformer aux instructions du PCC.\n- Informer les voyageurs.\n- En cas d'évacuation après longue immobilisation, préciser aux PMR et aux enfants qu'ils peuvent rester à bord en attendant une assistance extérieure s'ils le souhaitent.\n- Noter l'incident sur la feuille de route.\n@@INFO@@\nDes repères de hauteur sont placés à proximité de la voie dans les secteurs à risque.",
      },
    ],
  },
  {
    id: "accident-plateforme",
    code: "4.5-D",
    title: "Accident plate-forme ou chute sur voie",
    cetPage: 72,
    questions: [
      {
        id: "ch4-45d",
        prompt:
          "Quelles sont les consignes si vous êtes témoin d'un accident sur la plate-forme ou d'une chute d'une personne sur la voie (sans implication de votre matériel) ?",
        cardPrompt:
          "Quelles sont les consignes si vous êtes témoin d'un accident sur la plate-forme ou d'une chute sur la voie ?",
        answer:
          "1. Arrêter la rame, mettre les feux de détresse.\n2. Faire un appel d'urgence et informer les clients.\n3. Prendre toutes les mesures pour porter secours et protéger les blessés le cas échéant.\n4. Prendre toutes les dispositions pour éviter un autre accident.\n5. Dès que la reprise du service est possible, informer le PCC.\n6. Noter l'incident sur la feuille de route.",
      },
    ],
  },

  // ─── 4.6 Anomalies constatées en ligne (p. 73) ──────────────
  {
    id: "anomalies-arret",
    code: "4.6-A",
    title: "Anomalies imposant l'arrêt",
    cetPage: 73,
    questions: [
      {
        id: "ch4-46a",
        prompt:
          "Quelles anomalies constatées en ligne imposent d'arrêter la rame et d'appeler le PCC ?",
        cardPrompt:
          "Quelles anomalies constatées en ligne imposent d'arrêter la rame et d'appeler le PCC ?",
        answer:
          "Dans tous les cas suivants, arrêter la rame et appeler le PCC qui donnera la consigne à suivre :\n- Ligne aérienne endommagée ou détendue.\n- Tendeur de LAC cassé.\n- Potence de LAC affaissée.\n- Corps étranger sur la voie ou dans la gorge du rail et les aiguillages.\n- Affaissement de la voie, soulèvement des pavés de la plate-forme.\n- Signal ou feux mal orientés et illisibles.\n- Absence du conducteur au poste lors du croisement d'une rame arrêtée.\n- Individu accroché à une rame.",
      },
    ],
  },
  {
    id: "anomalies-sans-arret",
    code: "4.6-B",
    title: "Anomalies sans arrêt immédiat",
    cetPage: 73,
    questions: [
      {
        id: "ch4-46b",
        prompt:
          "Quelles anomalies constatées en ligne imposent de prévenir le PCC sans arrêt immédiat ?",
        cardPrompt:
          "Quelles anomalies constatées en ligne imposent de prévenir le PCC sans arrêt immédiat ?",
        answer:
          "Dans tous les cas suivants, prévenir impérativement le PCC :\n- Feux de croisements, feux stops ou positions éteints sur une autre rame.\n- Toutes anomalies extérieures constatées sur une autre rame.\n- Objet accroché à une rame.\n- Personnes au comportement suspect ou dangereux aux abords de la plate-forme.\n- Barrières détériorées aux abords de la plate-forme.\n- Arbre ou poteau menaçant de tomber sur la voie.\n- Voitures stationnées sur voie.",
      },
    ],
  },

  // ─── 4.7 Immobilisation et évacuation (p. 74–75) ─────────────
  {
    id: "immobilisation-voie",
    code: "4.7-A",
    title: "Immobilisation en pleine voie",
    cetPage: 74,
    questions: [
      {
        id: "ch4-47a",
        prompt:
          "Quelles sont les consignes d'immobilisation d'une rame en pleine voie ?",
        cardPrompt:
          "Quelles sont les consignes d'immobilisation d'une rame en pleine voie ?",
        answer:
          "1. Mettre les feux de détresse (ou le triangle de pré-signalisation en cas de panne).\n2. Faire un appel d'urgence.\n3. Informer la clientèle.",
      },
    ],
  },
  {
    id: "evacuation-voie",
    code: "4.7-B",
    title: "Évacuation en pleine voie",
    cetPage: 74,
    questions: [
      {
        id: "ch4-47b",
        prompt:
          "Quelles sont les consignes d'évacuation d'une rame en pleine voie ?",
        cardPrompt:
          "Quelles sont les consignes d'évacuation d'une rame en pleine voie ?",
        answer:
          "1. Après accord confirmé du PCC :\n- Informer les clients de l'évacuation, en les incitant à la prudence.\n- Ouvrir une des portes du côté droit dans le sens de la marche.\n- Descendre le premier et s'assurer qu'aucun danger ne s'oppose à l'évacuation.\n- Inviter les voyageurs à descendre en aidant les personnes en difficulté.\n- Prévenir le PCC de la fin de l'évacuation.\n2. Noter l'incident sur la feuille de route.\n@@WARNING@@\nIncendie ou force majeure : le conducteur peut évacuer sans autorisation du PCC.\nDanger côté droit : évacuation côté entrevoie uniquement après autorisation du PCC (arrêt absolu de toute circulation antagoniste).\n@@INFO@@\nVoie unique, impossibilité de transbordement : Sabines–Saint Jean de Vedas, cheminement piéton en bordure de voie jusqu'aux bus de substitution. Notre Dame de Sablassou–Jacou, piste cyclable en bordure de voie jusqu'aux bus de substitution.",
      },
    ],
  },
  {
    id: "immobilisation-tunnel",
    code: "4.7-C",
    title: "Immobilisation dans le tunnel",
    cetPage: 75,
    questions: [
      {
        id: "ch4-47c",
        prompt:
          "Quelles sont les consignes d'immobilisation d'une rame dans le tunnel ?",
        cardPrompt:
          "Quelles sont les consignes d'immobilisation d'une rame dans le tunnel ?",
        answer:
          "1. Mettre les feux de détresse (ou le triangle de pré-signalisation en cas de panne).\n2. Faire un appel d'urgence, et un appel de détresse en l'absence de réponse.\n3. Informer la clientèle.",
      },
    ],
  },
  {
    id: "evacuation-tunnel",
    code: "4.7-D",
    title: "Évacuation dans le tunnel",
    cetPage: 75,
    questions: [
      {
        id: "ch4-47d",
        prompt:
          "Quelles sont les consignes d'évacuation d'une rame dans le tunnel ?",
        cardPrompt:
          "Quelles sont les consignes d'évacuation d'une rame dans le tunnel ?",
        answer:
          "1. Après accord confirmé du PCC :\n- Informer les clients de l'évacuation, en les incitant à la prudence.\n- Ouvrir une des portes du côté droit dans le sens de la marche.\n- Descendre le premier et s'assurer qu'aucun danger ne s'oppose à l'évacuation.\n- Inviter les voyageurs à descendre en aidant les personnes en difficulté, et les diriger vers la sortie la plus proche.\n- Prévenir le PCC de la fin de l'évacuation.\n2. Noter l'incident sur la feuille de route.\n@@WARNING@@\nIncendie ou force majeure : le conducteur peut évacuer sans autorisation du PCC.\nDanger côté droit : évacuation côté entrevoie uniquement après autorisation du PCC.",
      },
    ],
  },
];

/** Regroupements affichés avant la liste des consignes (pré-examen ch. urgence). */
export const MODULE_GROUPS_CH4 = [
  {
    id: "consignes-generales",
    code: "4.1",
    title: "Consignes Générales en Cas d'Urgence",
    moduleIds: [
      "urgence-arret-rame",
      "urgence-depart-urgent",
      "urgence-coordinateur",
    ],
  },
  {
    id: "accidents-agressions",
    code: "4.2",
    title: "Accidents et Agressions",
    moduleIds: [
      "accident-materiel",
      "accident-corporel",
      "personne-sous-rame",
      "agression-conducteur",
    ],
  },
  {
    id: "deraillement-incidents-bord",
    code: "4.3–4.4",
    title: "Déraillement et Incidents à Bord",
    moduleIds: [
      "deraillement",
      "voyageur-malaise",
      "bris-vitre",
      "incident-pare-brise",
      "incendie-bord",
      "colis-suspect-bord",
    ],
  },
  {
    id: "incidents-abords-voie",
    code: "4.5",
    title: "Incidents aux Abords de la Voie",
    moduleIds: [
      "colis-suspect-voie",
      "chute-lac",
      "inondation-voie",
      "accident-plateforme",
    ],
  },
  {
    id: "anomalies-evacuation",
    code: "4.6–4.7",
    title: "Anomalies en Ligne, Immobilisation et Évacuation",
    moduleIds: [
      "anomalies-arret",
      "anomalies-sans-arret",
      "immobilisation-voie",
      "evacuation-voie",
      "immobilisation-tunnel",
      "evacuation-tunnel",
    ],
  },
];
