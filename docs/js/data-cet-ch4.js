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
          "Face à un incident qui impose l'arrêt immédiat de la rame, quelles sont les quatre étapes de base décrites dans le CET ?",
        choices: [
          "Arrêt, détresse, appel flash PCC, information clients",
          "Évacuation immédiate sans appel",
        ],
        correct: 0,
        explanation: "Quatre gestes communs à tout arrêt d'urgence (p.60).",
      },
      {
        id: "ch4-41-02",
        prompt:
          "Lorsque l'immobilisation de la rame se prolonge : dans quelles conditions l'évacuation est-elle possible ?",
        choices: ["Sur accord PCC", "Interdite"],
        correct: 0,
        explanation: "Évacuation si arrêt prolongé, d'accord PCC (p.60).",
      },
      {
        id: "ch4-41-03",
        prompt:
          "Vous devez quitter sans délai une zone où vous êtes exposé au danger — flammes à proximité, jets de projectiles ou autre agression analogue — : quelle conduite le CET préconise-t-il ?",
        choices: [
          "Autorisé ; prévenir PCC après ; respecter signalisation",
          "Uniquement au dépôt",
        ],
        correct: 0,
        explanation: "Quitter la zone puis informer PCC (p.60).",
      },
      {
        id: "ch4-41-04",
        prompt:
          "Après un incident grave, tant que vous attendez les secours extérieurs : quel rôle opérationnel le conducteur conserve-t-il toujours sur place ?",
        choices: [
          "Coordinateur : témoignages, compte-rendu PCC",
          "Reprendre le service",
        ],
        correct: 0,
        explanation: "Coordinateur jusqu'à prise en charge maîtrise (p.60).",
      },
      {
        id: "ch4-41-05",
        prompt:
          "Lorsque la maîtrise sur place passe aux services de sécurité (pompiers, police présents sur zone), qui prend la fonction de coordinateur aux relations avec ces services à la place du conducteur ?",
        choices: ["Le supérieur hiérarchique présent", "Le PCC à distance"],
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
        prompt:
          "Après accident matériel seul avec dégâts aux biens, pourquoi le conducteur doit-il remplir le constat en restant à bord avant de quitter les lieux ?",
        choices: [
          "Rester joignable par le PCC pendant le pré-constat",
          "Partir chercher le tiers",
        ],
        correct: 0,
        explanation: "Pré-constat dans la rame, joignabilité PCC (p.61).",
      },
      {
        id: "ch4-42a-02",
        prompt:
          "Choc latéral violent sur le train avant : quelle manœuvre électrique de sécurité devez-vous déclencher en priorité, compte tenu du risque de toucher une zone Haute Tension ?",
        choices: ["Mettre le FS (risque électrique HT)", "Couper batterie sans appel"],
        correct: 0,
        explanation: "FS si choc violent avant (encadré p.61).",
      },
      {
        id: "ch4-42a-03",
        prompt:
          "Après accident matériel, qui autorise tout déplacement de la rame et la reprise du service régulier ?",
        choices: [
          "Uniquement sur ordre PCC ; reprise service idem",
          "Libre si dégâts légers",
        ],
        correct: 0,
        explanation: "Déplacement et reprise sur ordre PCC (p.61).",
      },
      {
        id: "ch4-42a-04",
        prompt:
          "Après constitution du dossier d'accident matériel, où dépose-t-on sans tarder la partie A du constat (« CONSTAT ACCIDENT ») comme le prévoit le CET ?",
        choices: [
          "CONSTAT ACCIDENT partie A au PCC ou boîte rouge JP le jour même",
          "Au dépôt seulement",
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
          "Accident corporel : pour préciser aux secours radio l'état de la victime, que doit faire le conducteur concernant son poste et le blessé même si celui-ci se trouve à l'intérieur de la rame ?",
        choices: [
          "Sortir de cabine pour signalement précis même si blessé dans la rame",
          "Rester en cabine",
        ],
        correct: 0,
        explanation: "Sortie cabine pour évaluation (texte violet p.62).",
      },
      {
        id: "ch4-42b-02",
        prompt:
          "Après prise en charge initiale sur une victime d'accident corporel : à quelle condition la reprise du service régulier est-elle possible ?",
        choices: ["Autorisation PCC après appel", "Si blessé refuse secours"],
        correct: 0,
        explanation: "Appel PCC pour autorisation reprise (p.62).",
      },
      {
        id: "ch4-42b-03",
        prompt:
          "Il s'agit d'une blessure légère mais la victime refuse l'intervention des secours : que faites-vous avant de poursuivre la course avec la rame ?",
        choices: [
          "Pas de reprise sans accord PCC ; relever ses coordonnées",
          "Pas de constat",
        ],
        correct: 0,
        explanation: "Encadré p.62.",
      },
      {
        id: "ch4-42b-04",
        prompt:
          "À l'issue de la prise en charge d'un accident corporel : quel couple de formulaires remettez-vous systématiquement au PCC ?",
        choices: [
          "CONSTAT CORPOREL + CONSTAT ACCIDENT partie B",
          "SAT uniquement",
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
        prompt:
          "Personne encore engagée sous la rame : que devez-vous accomplir avant toute manœuvre consistant à couper la batterie tracteur ou de service ?",
        choices: ["Appel d'urgence (avant coupure batterie)", "Coupure batterie d'abord"],
        correct: 0,
        explanation: "Appel urgence avant coupure (texte rouge p.63).",
      },
      {
        id: "ch4-42c-02",
        prompt:
          "Une victime est coincée sous le tramway : qui est habilité, selon ces consignes, à faire déplacer la rame pour la dégagement ?",
        choices: ["Réservé aux pompiers", "Par le PCC à distance"],
        correct: 0,
        explanation: "Seuls les pompiers déplacent la rame (encadré p.63).",
      },
      {
        id: "ch4-42c-03",
        prompt:
          "Dans la séquence d'urgence consacrée aux personnes prises sous rame : à quel effet essentiel sert avant tout l'activation du FS ?",
        choices: [
          "Couper l'alimentation électrique (ouverture disjoncteur)",
          "Baisser le pantographe seul",
        ],
        correct: 0,
        explanation: "FS = coupure alimentation (p.63).",
      },
      {
        id: "ch4-42c-04",
        prompt:
          "Personne encore engagée sous le tram après action du FS et appel téléphonique d'urgence : quelles autres actions de sécurité et de préparation générale suivez-vous ensuite ?",
        choices: [
          "Pantographe bas, dé-préparation, protection blessé",
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
        prompt:
          "Malaise du conducteur ou agression dans la cabine : quelles actions enchaîne-t-on tout de suite pour protéger le train et faire appeler les secours ?",
        choices: [
          "Arrêt, détresse, FS, appel détresse, informer clients si possible",
          "Couper SIE",
        ],
        correct: 0,
        explanation: "Quatre gestes p.64 (section D).",
      },
      {
        id: "ch4-42d-02",
        prompt:
          "En cabine, lors d'un malaise ou d'agression du conducteur : quel effet poursuit-on en premier lieu en actionnant le FS ?",
        choices: ["Sécuriser l'immobilisation", "Baisser pantographe"],
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
        prompt:
          "En cas de déraillement : le conducteur peut-il lui-même tenter un ré-enraillement depuis la plate-forme de conduite ?",
        choices: ["Non — interdit", "Oui si PCC occupé"],
        correct: 0,
        explanation: "Ré-enraillement interdit au conducteur (encadré p.64).",
      },
      {
        id: "ch4-43-02",
        prompt:
          "Déraillement : avant dé-préparation et abaissement du pantographe, quel contrôle visuel vous impose cet encadré compte tenu du risque d'arrachement sur la partie alimentée aérienne ?",
        choices: ["Contrôle visuel LAC (risque arrachement)", "Évacuation sans PCC"],
        correct: 0,
        explanation: "Contrôle LAC avant descente pantographe (p.64).",
      },
      {
        id: "ch4-43-03",
        prompt:
          "Une rame est immobilisée après déraillement : quel accord téléphonique de l'exploitation et quelles consignes d'évacuation (références 4.7 B ou D au même tableau) doivent encadrer toute mise à pied des voyageurs ?",
        choices: ["Après accord PCC (voir 4.7 B/D)", "Par le conducteur seul en tunnel"],
        correct: 0,
        explanation: "Évacuation selon 4.7 après accord PCC (p.64).",
      },
      {
        id: "ch4-43-04",
        prompt:
          "Déraillement : après immobilisation de la composition, quel équipement de pré-signalisation complète la signalisation de votre convoi ?",
        choices: ["Triangle de pré-signalisation", "Uniquement klaxon"],
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
        prompt:
          "Un voyageur est pris en malaise alors que vous roulez : où arrêtez-vous la rame en priorité et quelles mesures prenez-vous sur le poste de conduite juste après l'arrêt (détresse, clé KC, cabine) ?",
        choices: [
          "À la station la plus proche, détresse, clé KC retirée, cabine fermée",
          "Au terminus uniquement",
        ],
        correct: 0,
        explanation: "Station proche + sécurisation cabine (p.65).",
      },
      {
        id: "ch4-44a-02",
        prompt:
          "Après avoir porté secours à un voyageur blessé à bord : quelle conduite tenez-vous ensuite sur la ligne radio jusqu'à contre-ordre du PCC ?",
        choices: ["Rappeler PCC et suivre ses consignes", "Évacuation systématique"],
        correct: 0,
        explanation: "Évaluation puis instructions PCC (p.65).",
      },
      {
        id: "ch4-44a-03",
        prompt:
          "Des voyageurs ont assisté à l'incident : quelle information devez-vous recueillir sur eux ?",

        choices: ["Noter leurs coordonnées", "PCC les appelle"],
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
        prompt:
          "Bris d'une vitre latérale côté voyageurs : après l'appel téléphonique d'urgence, comment protégez-vous les clients et quelle est la suite immédiate sur le plan des consignes PCC ?",
        choices: [
          "Éloigner clients de la vitre, attendre ordres PCC",
          "Sans information PCC",
        ],
        correct: 0,
        explanation: "Protection zone + ordres PCC (p.66).",
      },
      {
        id: "ch4-44b-02",
        prompt:
          "Lorsque le bris de vitre ne présente pas de danger pour les personnes après sécurisation : quelle suite de trajet le PCC peut-il vous autoriser ?",
        choices: [
          "Fin de course commerciale jusqu'au terminus",
          "Évacuation obligatoire",
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
        prompt:
          "Pare-brise endommagé ou visibilité avant devenue trop dangereuse pour conduire : quelles actions interconnectées le CET impose-t-il (arrêt où possible station, alerte téléphonique d'urgence, information voyageurs, évacuation, ordres PCC) ?",


        choices: [
          "Arrêt station si possible, urgence, info clients, évacuation, ordres PCC",
          "Sans évacuation",
        ],
        correct: 0,
        explanation: "Évacuation systématique (p.66).",
      },
      {
        id: "ch4-44c-02",
        prompt:
          "Après évacuation des voyageurs pour cause de pare-brise : quel est le compte rendu attendu au PCC et quelle attitude devez-vous avoir ensuite ?",


        choices: [
          "Informer PCC fin d'évacuation et attendre ordres",
          "Dé-préparer sans avis",
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
        prompt:
          "Incendie à bord : après arrêt de la rame et mise en détresse, quelles priorités le CET rattache à cette situation — y compris sortie des voyageurs renvoyée au 4.7, appel d'urgence, évaluation situation et pantographe ?",


        choices: [
          "Évacuation voyageurs (4.7), appel urgence, évaluation, pantographe bas",
          "Lutter seul longtemps avant évacuation",
        ],
        correct: 0,
        explanation: "Séquence 8 étapes p.67.",
      },
      {
        id: "ch4-44d-02",
        prompt:
          "Après tout incendie à bord, même de faible ampleur : peut-on remonter le pantographe sans ordre explicite du PCC ?",


        choices: ["Interdit de remonter sans autorisation PCC", "Remonter pour repartir"],
        correct: 0,
        explanation: "Encadré p.67.",
      },
      {
        id: "ch4-44d-03",
        prompt:
          "Incendie sur site de remisage : dans quelle relation se trouvent ces consignes par rapport à celles applicables à bord en ligne ?",


        choices: ["Mêmes consignes qu'à bord", "Uniquement extincteur"],
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
        prompt:
          "Colis suspect repéré parmi les voyageurs : quel comportement le CET impose-t-il tout de suite vis-à-vis de l'objet et de son déplacement ?",




        choices: [
          "Ne pas toucher ni déplacer ; prudence et discernement",
          "Ouvrir pour identifier",
        ],
        correct: 0,
        explanation: "Interdiction toucher/déplacer (encadré p.68).",
      },
      {
        id: "ch4-44e-02",
        prompt:
          "Colis suspect en ligne lorsque vos essais radiotéléphoniques vers le PCC sont infructueux : quelle conduite de repli cet encadré précise ?",


        choices: [
          "Évacuer et rejoindre à pied terminus le plus proche",
          "Laisser le colis à bord sans avis",
        ],
        correct: 0,
        explanation: "Évacuation + terminus à pied si radio HS (p.68).",
      },
      {
        id: "ch4-44e-03",
        prompt:
          "La rame est parquée en cul-de-sac (« tiroir ») après alerte bombe à bord : comment vous positionnez-vous ainsi que les voyageurs en attendant police / TaM ?",






        choices: [
          "S'éloigner, périmètre de sécurité, attendre police/TaM",
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
        prompt:
          "Ordre du PCC ou de la police pour bombe ou colis suspect aux abords de la voie : quelle ligne de conduite sur la rame résume l'arrêt, la mise en détresse radio et le respect des consignes suivantes ?",






        choices: ["Arrêt, détresse, suivre instructions", "Klaxonner seulement"],
        correct: 0,
        explanation: "Arrêt, détresse, puis application des instructions (p.69).",
      },
      {
        id: "ch4-45a-02",
        prompt:
          "Le PCC vous prescrit d'évacuer la rame après colis suspect aux abords : comment informez-vous les voyageurs et quelle référence de règles d'évacuation la consigne associe-t-elle ?",




        choices: [
          "Prévenir clients, évacuation selon règles sécurité (4.6 B)",
          "Descente côté entrevoie sans avis",
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
        prompt:
          "Chute de ligne aérienne de contact sur la voie : à quelle condition le PCC autorise-t-il la descente des voyageurs ?",


        choices: [
          "Uniquement quand PCC confirme LAC non alimentée",
          "Côté entrevoie toujours",
        ],
        correct: 0,
        explanation: "Attente coupure confirmée PCC (p.70).",
      },
      {
        id: "ch4-45b-02",
        prompt:
          "Avarie au pantographe après chute de LAC : quel est le comportement du conducteur concernant l'accès à la toiture du véhicule ?",


        choices: [
          "Ne monte pas sur la toiture (risque électrique)",
          "Répare en toiture",
        ],
        correct: 0,
        explanation: "Interdiction montée toiture (p.70).",
      },
      {
        id: "ch4-45b-03",
        prompt:
          "Avant toute descente de clients lorsqu'une LAC est encore susceptible d'être sous tension : quel message de sécurité leur transmettez-vous clairement ?",


        choices: [
          "Ne doivent pas descendre tant que LAC alimentée",
          "Peuvent descendre librement",
        ],
        correct: 0,
        explanation: "Interdiction descente avant coupure (p.70).",
      },
      {
        id: "ch4-45b-04",
        prompt:
          "Chute d'arbre ou de végétal lourd touchant la voie ou la rame : à quel autre scénario CET rapproche-t-on les consignes applicables ?",


        choices: ["Mêmes consignes que chute de LAC", "Remorquage seul"],
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
        prompt:
          "Selon le repère CET sur une zone inondée : si le niveau d'eau reste sous la bande rouge (cas inférieur strict à 10 cm évoqué au tableau), comment franchissez-vous la zone et quel contact avec le PCC effectuez-vous ?",


        choices: [
          "Franchir en conduite manœuvre 5 km/h et informer PCC",
          "Arrêt systématique",
        ],
        correct: 0,
        explanation: "CM 5 km/h + PCC (p.71).",
      },
      {
        id: "ch4-45c-02",
        prompt:
          "Lorsque la lame d'eau dépasse désormais la bande rouge du repère CET (cas supérieur à 10 cm) : quelle séquence de sécurité CET et de coordination PCC s'applique au conducteur ?",


        choices: [
          "Arrêt, détresse, urgence, ordres PCC, info voyageurs",
          "Poursuite",
        ],
        correct: 0,
        explanation: "Arrêt et procédure complète (p.71).",
      },
      {
        id: "ch4-45c-03",
        prompt:
          "Pour une évacuation liée à une inondation où l'immobilisation se prolonge : quelle règle spécifique les consignes prévoient-elles pour les voyageurs PMR et pour les enfants ?",




        choices: [
          "Peuvent rester à bord en attendant assistance s'ils le souhaitent",
          "Interdit de rester",
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
          "Sur quai vous êtes témoin d'un accident corporel dont votre rame n'est pas partie prenante mécanique dans le choc initial : quelle ligne d'action le CET prescrit-il au conducteur ?",






        choices: [
          "Arrêt, détresse, urgence, secours, éviter second accident, PCC",
          "Poursuite sans arrêt",
        ],
        correct: 0,
        explanation: "Six étapes témoin conducteur (p.72).",
      },
      {
        id: "ch4-45d-02",
        prompt:
          "Après accident sur plate-forme où vous avez dû immobiliser la rame : dès lors qu'une reprise commerciale devient techniquement envisageable, qui informez-vous en premier lieu ?",


        choices: ["Informer PCC dès que reprise envisageable", "Attendre la police uniquement"],
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
        prompt:
          "Une LAC présente une avarie importante ou vous constatez un tendeur cassé : quel est le comportement obligatoire du conducteur ?",
        choices: ["Arrêt impératif et appel PCC", "Informer en fin de service"],
        correct: 0,
        explanation: "Liste arrêt obligatoire p.73.",
      },
      {
        id: "ch4-46a-02",
        prompt:
          "Il y a corps étranger dans la gorge de rail ou dans l'aiguillage sur votre trajectoire : quel réflexe obligatoire impose la liste CET des situations d'arrêt immédiat ?",


        choices: ["Arrêt et PCC", "Dégager seul"],
        correct: 0,
        explanation: "Arrêt obligatoire (p.73).",
      },
      {
        id: "ch4-46a-03",
        prompt:
          "Une rame est arrêtée en croisement et vous constatez l'absence du conducteur en cabine : quel réflexe impose le tableau CET sur les situations d'arrêt immédiat ?",
        choices: ["Arrêt et PCC", "Passer à 10 km/h"],
        correct: 0,
        explanation: "Cas listé p.73.",
      },
      {
        id: "ch4-46a-04",
        prompt:
          "Un individu est accroché à votre rame ou à une composition voisine : quel réflexe impose la liste CET des arrêts obligatoires ?",
        choices: ["Arrêt et PCC", "FU sans appel"],
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
        prompt:
          "Vous voyez une autre rame circuler avec les feux extérieurs éteints : quelle précaution téléphonique indique pour vous la colonne B du tableau CET ?",
        choices: [
          "Prévenir le PCC (sans arrêt immédiat imposé)",
          "Arrêt FU",
        ],
        correct: 0,
        explanation: "Colonne B p.73.",
      },
      {
        id: "ch4-46b-02",
        prompt:
          "Objet accroché visiblement à une composition tram ou comportement suspect d'une personne sur le quai : quel est votre réflexe téléphonique selon cet extrait tableau ?",




        choices: ["Prévenir le PCC", "Klaxon continu"],
        correct: 0,
        explanation: "Signalement PCC (p.73).",
      },
      {
        id: "ch4-46b-03",
        prompt:
          "Arbre ou poteau menaçant la voie sur votre approche : quel signalement le CET prescrit-il dans la colonne des anomalies à signaler au PCC sans arrêt immédiat imposé par la même ligne du tableau ?",


        choices: ["Prévenir le PCC", "Passer vite"],
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
        prompt:
          "Votre rame est immobilisée en pleine voie sans quai adjacent : quel enchaînement CET couvre la signalisation (« détresse ou triangle »), l'appel téléphonique d'urgence et l'information aux voyageurs avant toute évocation d'évacuation ultérieure ?",




        choices: [
          "Détresse ou triangle, appel urgence, informer clients",
          "Évacuation immédiate sans appel",
        ],
        correct: 0,
        explanation: "Détresse ou triangle, puis appel d'urgence et information clients (p.74).",
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
          "Évacuation d'une rame immobilisée en pleine voie : quel accord du PCC doit précéder toute mise à pied des voyageurs ?",




        choices: ["Après accord confirmé PCC", "Par le PCC seul sans conducteur"],
        correct: 0,
        explanation: "Accord PCC préalable (p.74).",
      },
      {
        id: "ch4-47b-02",
        prompt:
          "Évacuation en pleine voie : quel côté de la composition par rapport au sens de marche ouvre-t-on pour les voyageurs et quelle est la consigne pour l'ordre de descente depuis la plate-forme de conduite ?",


        choices: [
          "Côté droit sens de marche ; conducteur descend en premier",
          "Côté entrevoie systématique",
        ],
        correct: 0,
        explanation: "Porte droite, contrôle danger (p.74).",
      },
      {
        id: "ch4-47b-03",
        prompt:
          "Incendie ou force majeure au sens de l'encadré : peut-on évacuer sans autorisation préalable du PCC, contrairement au cas général en pleine voie ?",


        choices: ["Possible sans autorisation PCC", "Uniquement la nuit"],
        correct: 0,
        explanation: "Exception incendie/force majeure (encadré p.74).",
      },
      {
        id: "ch4-47b-04",
        prompt:
          "Vous envisagez une évacuation par le côté entrevoie parce que le côté droit présente un danger immédiat : quelle condition liée au trafic en sens opposé le PCC doit-il avoir sécurisée avant ouverture des portes ?",






        choices: [
          "Uniquement après autorisation PCC (trafic antagoniste arrêté)",
          "Interdit toujours",
        ],
        correct: 0,
        explanation: "PCC garantit arrêt circulation opposée (p.74).",
      },
      {
        id: "ch4-47b-05",
        prompt:
          "Sur la portion en voie unique Sabines–SJD après évacuation, lorsque le bus relais de substitution n'est pas encore disponible sur place : comment les voyageurs doivent-ils rejoindre l'arrêt de car ?",


        choices: [
          "Chemin piéton le long de la voie vers arrêt bus de substitution",
          "Rester sur voie",
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
        prompt:
          "Rame immobilisée dans un tunnel après signalisation (« détresse ou triangle ») et appel téléphonique d'urgence : quel est l'enchaînement radio si vous n'obtenez pas de réponse du PCC ?",
        choices: [
          "Détresse ou triangle, urgence, détresse si pas de réponse, informer clients",
          "Sans appel",
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
        prompt:
          "Évacuation en tunnel après accord téléphonique explicite du PCC : quel est l'enchaînement d'informations voyageurs et d'orientation (portes utilisées et direction générale vers la sortie) ?",


        choices: [
          "Informer clients, porte droite, diriger vers sortie la plus proche",
          "Côté entrevoie direct",
        ],
        correct: 0,
        explanation: "Évacuation vers sortie proche (p.75).",
      },
      {
        id: "ch4-47d-02",
        prompt:
          "Lorsque la situation relève des cas traités sous 4.7 A à D et que la séquence CET est terminée : quelle mention portez-vous sur votre feuille de route ?",
        choices: ["Noter l'incident sur la feuille de route", "SAT seul"],
        correct: 0,
        explanation: "Note commune bas de page p.75.",
      },
    ],
  },
];
