/** RCT ch. 2 — Respect de la signalisation (pages 20–37) */
export const MODULES_CH2 = [
  // Ordre = chapitrage RCT (ch. 2) : 2.1 … 2.6-B (pages 20–37 du RCT). Acronymes : chapitre dédié.

  // ─── 2.1 Franchissement des appareils de voie ─────────────
  {
    id: "sign-general",
    code: "2.1",
    title:
      "Franchissement des appareils de voie — Vitesses, interdictions et vérifications",
    cetPage: 21,
    questions: [
      {
        id: "sg-def-01",
        prompt:
          "Sur un aiguillage, que signifie la position « voie directe » ?",
        choices: [
          "L'itinéraire poursuit le tracé principal sans emprunter la branche déviée",
          "L'itinéraire emprunte obligatoirement la branche latérale",
        ],
        correct: 0,
        explanation:
          "Voie directe : tracé sans déviation ; à l'INDIR, barre verticale verte (p.21–22).",
      },
      {
        id: "sg-def-02",
        prompt: "Sur un aiguillage, que signifie la position « voie déviée » ?",
        choices: [
          "L'itinéraire emprunte la branche déviée (gauche ou droite selon la position de l'aiguille)",
          "L'itinéraire reste sur le tracé principal sans bifurcation",
        ],
        correct: 0,
        explanation:
          "Voie déviée : emprunt de la branche ; à l'INDIR, barre oblique jaune (p.21–22).",
      },
      {
        id: "sg-rec-01",
        prompt:
          "À l'INDIR, comment reconnaître qu'un franchissement est autorisé en voie directe ?",
        choices: [
          "Barre verticale allumée en vert",
          "Barre oblique allumée en jaune",
        ],
        correct: 0,
        explanation:
          "Barre verticale verte = passage autorisé, voie directe (p.22).",
      },
      {
        id: "sg-rec-02",
        prompt:
          "À l'INDIR, comment reconnaître qu'un franchissement est autorisé en voie déviée ?",
        choices: [
          "Barre oblique allumée en jaune (côté selon l'inclinaison de la barre)",
          "Barre horizontale allumée en rouge seule",
        ],
        correct: 0,
        explanation:
          "Barre oblique jaune = voie déviée ; sens selon inclinaison (p.22).",
      },
      {
        id: "sg-rec-03",
        prompt:
          "Comment reconnaître un aiguillage « entrebâillé » sur l'appareil de voie ?",
        choices: [
          "Les lames d'aiguille ne sont pas plaquées contre le rail",
          "L'appareil est motorisé et talonnable à 15 km/h",
        ],
        correct: 0,
        explanation:
          "Entrebâillé = lames non plaquées — franchissement formellement interdit (p.21).",
      },
      {
        id: "sg-rec-04",
        prompt:
          "À l'INDIR, quelle indication interdit le franchissement (voie directe ou déviée) ?",
        choices: [
          "Barre horizontale allumée en rouge, ou feu éteint",
          "Barre verticale allumée en vert",
        ],
        correct: 0,
        explanation:
          "Barre rouge ou feu éteint = arrêt absolu, franchissement interdit (p.22).",
      },
      {
        id: "sg-01",
        prompt:
          "Franchissement d'un aiguillage en voie déviée : vitesse maximum (hors cas particulier) ?",
        choices: ["15 km/h", "10 km/h"],
        correct: 0,
        explanation: "Voie déviée : 15 km/h (p.21).",
      },
      {
        id: "sg-02",
        prompt:
          "Franchissement d'un aiguillage en voie directe : vitesse maximum (hors cas particulier) ?",
        choices: ["40 km/h", "15 km/h"],
        correct: 0,
        explanation: "Voie directe : 40 km/h (p.21).",
      },
      {
        id: "sg-03",
        prompt: "Franchissement d'aiguillage au dépôt : vitesse max ?",
        choices: ["10 km/h", "15 km/h"],
        correct: 0,
        explanation: "Au dépôt : 10 km/h (p.21).",
      },
      {
        id: "sg-04",
        prompt:
          "Que vaut le franchissement d'un aiguillage « entrebâillé » (lames non plaquées) ?",
        choices: [
          "Formellement interdit — risque de déraillement",
          "Autorisé si PCC informé",
        ],
        correct: 0,
        explanation: "Strictement interdit — risque de déraillement (p.21).",
      },
      {
        id: "sg-05",
        prompt:
          "Que dit la consigne concernant le stationnement sur un aiguillage ?",
        choices: [
          "Interdit sauf zone Gare Saint-Roch où les aiguilles sont sécurisées",
          "Autorisé au dépôt uniquement",
        ],
        correct: 0,
        explanation: "Interdit sauf exception Gare Saint-Roch (p.21).",
      },
      {
        id: "sg-06",
        prompt:
          "Concernant les appareils de voie motorisés, que dit-on du talonnage ?",
        choices: ["Non talonnables", "Toujours talonnables"],
        correct: 0,
        explanation: "Appareils motorisés non talonnables (p.21, texte rouge).",
      },
      {
        id: "sg-07",
        prompt:
          "Hors zone Gare Saint-Roch, place Albert 1er et Corum, par quoi les conflits sont-ils gérés, en principe général ?",
        choices: [
          "La signalisation lumineuse (Marche À Vue complétée par la signalisation)",
          "La priorité systématique à la rame venant de droite",
        ],
        correct: 0,
        explanation:
          "Marche À Vue ; conflits gérés par signalisation lumineuse sauf zones spécifiques (p.21).",
      },
      {
        id: "sg-08",
        prompt:
          "Avant de franchir un aiguillage, que doit notamment vérifier le conducteur ?",
        choices: [
          "La programmation de direction, les feux/INDIR et le placage des aiguilles",
          "Uniquement le prochain arrêt client",
        ],
        correct: 0,
        explanation: "Trois vérifications listées p.21.",
      },
    ],
  },

  // ─── 2.2 Signalisation ferroviaire lumineuse (vue d'ensemble) ─
  {
    id: "sfl-22",
    code: "2.2",
    title:
      "Signalisation ferroviaire lumineuse — Rappel avant les paragraphes 2.2-A à J",
    cetPage: 22,
    questions: [
      {
        id: "sfl-01",
        prompt:
          "La signalisation ferroviaire lumineuse sur équipement fixe regroupe notamment quelles familles d'indicateurs ou de feux ?",
        choices: [
          "INDIR, INDES, SM, SA, SMA, lampes flash, avertisseurs sonores, feux blancs (remisage, anticipation), feu de présence tension",
          "Seulement les panneaux TIV et les feux tricolores privés",
        ],
        correct: 0,
        explanation:
          "Le volet 2.2 couvre notamment INDIR, INDES, SM, SA, SMA et les feux / alarmes associés (RCT, signalisation ferroviaire lumineuse).",
      },
      {
        id: "sfl-02",
        prompt:
          "À quoi sert principalement la signalisation ferroviaire lumineuse pour le conducteur ?",
        choices: [
          "Indiquer l'itinéraire autorisé, les limitations et les protections aux points sensibles (aiguillages, cantonnement, remisage)",
          "Remplacer uniquement la radio du PCC",
        ],
        correct: 0,
        explanation:
          "Elle renseigne itinéraires, protections et consignes aux points critiques, en complément des autres consignes (RCT ch. 2).",
      },
      {
        id: "sfl-03",
        prompt:
          "À quoi servent respectivement les feux blancs dits « remisage » et « anticipation » ?",
        choices: [
          "Autoriser ou non la sortie du faisceau de remisage (remisage) et le départ depuis une station (anticipation) selon les cas décrits",
          "Contrôler uniquement la présence de voyageurs sur le quai",
        ],
        correct: 0,
        explanation:
          "Rôle décrit dans le volet feux blancs 2.2-F / 2.2-G : gestion des mouvements en remisage et des départs lorsque le SM n'est pas visible.",
      },
    ],
  },

  // ─── 2.2-A INDIR ─────────────────────────────────────────
  {
    id: "indir",
    code: "2.2-A",
    title: "INDIR — Signal indicateur de direction",
    cetPage: 22,
    questions: [
      {
        id: "indir-02",
        prompt: "À quoi sert l'INDIR pour le conducteur ?",
        choices: [
          "Indiquer la position du premier aiguillage et si l'aiguille est correctement positionnée",
          "Contrôler la présence de tension caténaire",
        ],
        correct: 0,
        explanation:
          "L'INDIR est un indicateur lumineux de position d'aiguille (RCT p. 22).",
      },
      {
        id: "indir-03",
        prompt: "INDIR : barre horizontale allumée en rouge. Votre conduite ?",
        choices: [
          "Arrêt absolu — franchissement interdit",
          "Passage autorisé en voie directe",
        ],
        correct: 0,
        explanation:
          "Barre horizontale rouge = arrêt absolu, franchissement interdit.",
      },
      {
        id: "indir-04",
        prompt: "INDIR : barre verticale allumée en vert. Consigne ?",
        choices: [
          "Passage autorisé, itinéraire en voie directe",
          "Passage autorisé, voie déviée selon l'inclinaison",
        ],
        correct: 0,
        explanation: "Barre verticale verte = passage autorisé, voie directe.",
      },
      {
        id: "indir-05",
        prompt: "INDIR : barre oblique allumée en jaune. Que faire ?",
        choices: [
          "Passage autorisé, itinéraire en voie déviée à gauche ou à droite selon l'inclinaison de la barre",
          "Passage autorisé uniquement en voie directe",
        ],
        correct: 0,
        explanation:
          "Barre oblique jaune = voie déviée ; le côté dépend de l'inclinaison de la barre (RCT p. 22).",
      },
      {
        id: "indir-06",
        prompt: "INDIR éteint (feu éteint). Consigne ?",
        choices: [
          "Arrêt absolu — franchissement interdit",
          "Passage autorisé si voie libre",
        ],
        correct: 0,
        explanation:
          "Feu éteint = arrêt absolu, franchissement interdit (comme barre rouge, p.22).",
      },
      {
        id: "indir-07",
        prompt:
          "Sur un INDIR, quelle affirmation est exacte pour la barre horizontale rouge et pour le feu éteint ?",
        choices: [
          "Dans les deux cas : arrêt absolu et franchissement de l'aiguillage interdit",
          "Barre rouge : arrêt absolu ; feu éteint : passage autorisé en marche à vue si la voie est libre",
        ],
        correct: 0,
        explanation:
          "RCT p. 22, § 2.2-A : barre horizontale rouge et feu éteint imposent la même consigne — arrêt absolu, franchissement interdit.",
      },
      {
        id: "indir-08",
        prompt: "Combien d'indications distinctes l'INDIR peut-il présenter ?",
        choices: ["4", "2"],
        correct: 0,
        explanation:
          "Quatre cas : barre rouge, verte, oblique jaune, feu éteint (p.22).",
      },
      {
        id: "indir-09",
        prompt: "INDIR ou INDES éteint ou bloqué au rouge : action immédiate ?",
        choices: [
          "Arrêt immédiat de la rame et appel au PCC",
          "Couper la traction seulement",
        ],
        correct: 0,
        explanation:
          "Encadré p.21 : tout feu éteint ou bloqué au rouge (y compris INDIR et INDES) → arrêt immédiat + appel PCC.",
      },
      {
        id: "indir-10",
        prompt:
          "De quoi est composé l'INDIR du point de vue de la signalisation lumineuse ?",
        choices: [
          "Multipoints formant des barres de couleur variable",
          "Deux feux superposés en forme de T",
        ],
        correct: 0,
        explanation:
          "L'INDIR utilise des multipoints (barres horizontale, verticale, oblique) — pas des T (p.22).",
      },
      {
        id: "indir-11",
        prompt:
          "L'INDES diffère de l'INDIR : à quoi sert l'INDES pour le conducteur ?",
        choices: [
          "Informer le conducteur de sa destination (chiffres ou lettres)",
          "Indiquer la position d'aiguille",
        ],
        correct: 0,
        explanation:
          "INDES = destination ; INDIR = position d'aiguille (p.22–23).",
      },
      {
        id: "indir-12",
        prompt:
          "Avant de franchir un aiguillage, le contrôle de l'INDIR s'inscrit dans quelles vérifications obligatoires ?",
        choices: [
          "L'état des feux et la position de l'INDIR ainsi que le bon placage des aiguilles",
          "Seulement le feu de traversée routière",
        ],
        correct: 0,
        explanation:
          "Avant franchissement : direction programmée, feux/INDIR, placage des aiguilles (p.21).",
      },
    ],
  },

  // ─── 2.2-B INDES ──────────────────────────────────────────
  {
    id: "indes",
    code: "2.2-B",
    title: "INDES — Signal indicateur de destination",
    cetPage: 23,
    questions: [
      {
        id: "indes-02",
        prompt: "De quoi l'INDES informe-t-il le conducteur ?",
        choices: [
          "Sa destination (un ou deux chiffres ou lettres sur multipoints)",
          "La vitesse sur le prochain TIV",
        ],
        correct: 0,
        explanation: "Destination par chiffres ou lettres (p.23).",
      },
      {
        id: "indes-03",
        prompt: "Au dépôt, que signifie l'affichage INDES « L » ?",
        choices: ["Destination Lavage", "Ligne de dérivation"],
        correct: 0,
        explanation: "L = Destination Lavage (p.23, zone dépôt).",
      },
      {
        id: "indes-04",
        prompt: "Au dépôt, que signifie l'affichage INDES « A » ?",
        choices: ["Destination Atelier", "Aiguillage non télécommandé"],
        correct: 0,
        explanation: "A = Destination Atelier (p.23, zone dépôt).",
      },
      {
        id: "indes-05",
        prompt: "Au dépôt, que signifie l'affichage INDES « S » (entrée) ?",
        choices: ["Destination Station Service", "Signal de cantonnement"],
        correct: 0,
        explanation:
          "S (entrée) = Destination Station Service (p.23, zone dépôt).",
      },
      {
        id: "indes-11",
        prompt: "Au dépôt, que signifie l'affichage INDES « S » (sortie) ?",
        choices: ["Voie Sortie", "Sortie de service voyageurs"],
        correct: 0,
        explanation: "S (sortie) = Voie Sortie (p.23, zone dépôt).",
      },
      {
        id: "indes-12",
        prompt: "Au dépôt, que signifie l'affichage INDES « P » ?",
        choices: ["Destination Passage", "Parking conducteur"],
        correct: 0,
        explanation: "P = Destination Passage (p.23, zone dépôt).",
      },
      {
        id: "indes-13",
        prompt: "Au dépôt, que signifie l'affichage INDES « C » ?",
        choices: ["Voie de Contournement", "Contrôle PCC avant manœuvre"],
        correct: 0,
        explanation: "C = Voie de Contournement (p.23, zone dépôt).",
      },
      {
        id: "indes-14",
        prompt: "Au dépôt, que signifie l'affichage INDES « I » ?",
        choices: ["Voie d'Interface", "Installation de maintenance"],
        correct: 0,
        explanation: "I = Voie d'Interface (p.23, zone dépôt).",
      },
      {
        id: "indes-15",
        prompt: "Au dépôt, que signifie l'affichage INDES « G » ?",
        choices: ["Garage", "Gabarit réduit en dépôt"],
        correct: 0,
        explanation: "G = Garage (p.23, zone dépôt).",
      },
      {
        id: "indes-16",
        prompt: "Au dépôt, que signifie l'affichage INDES « E » ?",
        choices: ["Voie Entrée", "Évitement d'aiguillage"],
        correct: 0,
        explanation: "E = Voie Entrée (p.23, zone dépôt).",
      },
      {
        id: "indes-17",
        prompt: "Au dépôt, que signifie l'affichage INDES « R » ?",
        choices: ["Destination Remisage", "Roulement PCC obligatoire"],
        correct: 0,
        explanation: "R = Destination Remisage (p.23, zone dépôt).",
      },
      {
        id: "indes-18",
        prompt:
          "Au dépôt, que signifie l'affichage INDES « R » (Sabines V2) ?",
        choices: [
          "Retournement dans le tiroir",
          "Remisage voie 2 uniquement",
        ],
        correct: 0,
        explanation: "R (Sabines V2) = retournement dans le tiroir (p.23).",
      },
      {
        id: "indes-19",
        prompt:
          "Au dépôt, l'INDES affiche un numéro de 1 à 16 : que désigne cette indication ?",
        choices: ["Remisage 1 à 16", "Ligne de tramway 1 à 16"],
        correct: 0,
        explanation: "1 à 16 = Remisage 1 à 16 (p.23, zone dépôt).",
      },
      {
        id: "indes-20",
        prompt: "Au dépôt, que signifie l'affichage INDES « VU » ?",
        choices: ["Voie Unique", "Vitesse unique 10 km/h"],
        correct: 0,
        explanation: "VU = Voie Unique (p.23, zone dépôt).",
      },
      {
        id: "indes-21",
        prompt: "Au dépôt, que signifie l'affichage INDES « V1 » ?",
        choices: ["Voie 1", "Voie Unique"],
        correct: 0,
        explanation: "V1 = Voie 1 (p.23, zone dépôt).",
      },
      {
        id: "indes-22",
        prompt:
          "En zone Galerie Mistral, que signifie l'affichage INDES « N » ?",
        choices: [
          "Mode nominal, sans retournement",
          "Neutralisation du canton",
        ],
        correct: 0,
        explanation: "N = mode nominal, sans retournement (p.23, Galerie Mistral).",
      },
      {
        id: "indes-23",
        prompt:
          "En zone Galerie Mistral, que signifie l'affichage INDES « VU » ?",
        choices: [
          "Mode retournement Corum – Galerie (ou Comédie) – Corum",
          "Voie Unique",
        ],
        correct: 0,
        explanation:
          "VU = mode retournement Corum – Galerie (ou Comédie) – Corum (p.23, Galerie Mistral).",
      },
      {
        id: "indes-24",
        prompt:
          "En zone Galerie Mistral, que signifie l'affichage INDES « RE » ?",
        choices: [
          "Mode retournement Comédie – Galerie – Comédie",
          "Retournement d'urgence PCC",
        ],
        correct: 0,
        explanation:
          "RE = mode retournement Comédie – Galerie – Comédie (p.23, Galerie Mistral).",
      },
      {
        id: "indes-25",
        prompt:
          "En zone Gare Saint-Roch, que signifie l'affichage INDES « MA » ?",
        choices: ["Direction Rue Maguelone", "Manœuvre en attente"],
        correct: 0,
        explanation: "MA = direction Rue Maguelone (p.23, zone gare).",
      },
      {
        id: "indes-26",
        prompt:
          "En zone Gare Saint-Roch, que signifie l'affichage INDES « RO » ?",
        choices: ["Direction Rondelet", "Retournement obligatoire"],
        correct: 0,
        explanation: "RO = direction Rondelet (p.23, zone gare).",
      },
      {
        id: "indes-06",
        prompt:
          "En zone Gare Saint-Roch, que signifie l'affichage INDES « AT » ?",
        choices: ["En attente = Arrêt", "Direction Atelier"],
        correct: 0,
        explanation: "AT = en attente = Arrêt (p.23, zone gare).",
      },
      {
        id: "indes-07",
        prompt:
          "En zone Gare Saint-Roch, que signifie l'affichage INDES « PL » ?",
        choices: ["Direction Pont de Lattes", "Passage libre"],
        correct: 0,
        explanation: "PL = direction Pont de Lattes (p.23, zone gare).",
      },
      {
        id: "indes-27",
        prompt:
          "En zone Gare Saint-Roch, que signifie l'affichage INDES « OB » ?",
        choices: ["Direction Observatoire", "Ordre de blocage"],
        correct: 0,
        explanation: "OB = direction Observatoire (p.23, zone gare).",
      },
      {
        id: "indes-08",
        prompt:
          "À votre arrivée sur un INDES en zone Gare Saint-Roch, que signifie l'affichage « XX » ?",
        choices: [
          "Aiguille dé-contrôlée — appeler le PCC",
          "Voie interdite temporaire",
        ],
        correct: 0,
        explanation:
          "À l'arrivée sur l'INDES (pas le « XX » transitoire pendant une commande en cours) : XX = aiguille dé-contrôlée — appeler le PCC (p.29, rappel p.23).",
      },
      {
        id: "indes-09",
        prompt:
          "INDES en position d'attente à la zone Gare : quelle indication ?",
        choices: ["AT", "PL"],
        correct: 0,
        explanation:
          "Arrêt à l'INDES en position d'attente = AT (p.29, étape 1).",
      },
      {
        id: "indes-10",
        prompt:
          "Deux voyants verts ou un voyant vert et un voyant rouge affichés simultanément sur l'INDES : que faire ?",
        choices: ["Anomalie — appeler le PCC", "Ralentir à 15 km/h"],
        correct: 0,
        explanation: "Anomalie d'affichage → appel PCC (p.29).",
      },
    ],
  },

  // ─── 2.2-C SM ─────────────────────────────────────────────
  {
    id: "sm",
    code: "2.2-C",
    title: "SM — Signal de manœuvre",
    cetPage: 23,
    questions: [
      {
        id: "sm-02",
        prompt: "Le SM est composé de combien de feux superposés ?",
        choices: ["2", "1"],
        correct: 0,
        explanation:
          "Deux feux superposés : T rouge en haut, T vert en bas (p.23).",
      },
      {
        id: "sm-03",
        prompt: "SM : T rouge (feu du haut) allumé. Consigne ?",
        choices: [
          "Arrêt obligatoire — franchissement interdit",
          "Franchissement autorisé",
        ],
        correct: 0,
        explanation: "T rouge = arrêt obligatoire, franchissement interdit.",
      },
      {
        id: "sm-04",
        prompt: "SM : T vert (feu du bas) allumé. Consigne ?",
        choices: ["Franchissement autorisé", "Arrêt obligatoire"],
        correct: 0,
        explanation: "T vert = franchissement autorisé (p.23).",
      },
      {
        id: "sm-05",
        prompt:
          "Le SM protège notamment les mouvements aux aiguillages, au remisage et au retournement : avec quelle exigence générale devez-vous le traiter ?",
        choices: [
          "Respecté strictement sauf consigne contraire du PCC ou agent habilité",
          "Respecté sauf urgence personnelle",
        ],
        correct: 0,
        explanation:
          "Respect strict du SM sauf consigne PCC ou agent de maîtrise habilité (p.23).",
      },
      {
        id: "sm-06",
        prompt:
          "En cantonnement, lorsque le SM d'entrée est au rouge alors que le canton est déjà occupé (ex. galerie Mistral, voie unique), quelle consigne en tirez-vous ?",
        choices: [
          "Arrêt obligatoire — franchissement interdit",
          "Franchissement autorisé si retard",
        ],
        correct: 0,
        explanation:
          "Même signification que T rouge : arrêt obligatoire, franchissement interdit (p.23).",
      },
      {
        id: "sm-07",
        prompt:
          "Par rapport au SM, que vous annonce surtout le SA concernant la manœuvre à venir ?",
        choices: [
          "Un prochain feu de manœuvre au rouge — passage en Marche À Vue",
          "Un arrêt absolu immédiat",
        ],
        correct: 0,
        explanation:
          "SA = avertissement (T orange) ; SM = arrêt ou passage (T rouge/vert) — p.23–24.",
      },
      {
        id: "sm-08",
        prompt:
          "Par rapport au SM, combien de feux superposés comporte le SMA et comment sont-ils répartis ?",
        choices: [
          "Trois feux superposés (T rouge, T orange, T vert)",
          "Des barres multipoints comme l'INDIR",
        ],
        correct: 0,
        explanation: "SMA = 3 feux ; SM = 2 feux (p.23–24).",
      },
      {
        id: "sm-09",
        prompt:
          "Lampe flash déclenchée au franchissement d'un SM en voie unique (p.25) : signification pour le conducteur ?",
        choices: [
          "Franchissement non autorisé ou rame adverse — arrêt immédiat (FU), détresse, appel PCC",
          "Passage autorisé à 40 km/h",
        ],
        correct: 0,
        explanation:
          "Alarme = franchissement SM non autorisé ou rame en sens inverse — arrêt immédiat FU (p.25).",
      },
      {
        id: "sm-10",
        prompt:
          "Zone Léon Blum : lampe flash à côté du SA quand le SM suivant est rouge. Consigne ?",
        choices: ["Ralentir avant de s'arrêter au SM", "Passer sans s'arrêter"],
        correct: 0,
        explanation:
          "Cas particulier p.25 : ralentir avant l'arrêt au SM (pas FU immédiat comme en VU classique).",
      },
    ],
  },

  // ─── 2.2-D SA ─────────────────────────────────────────────
  {
    id: "sa",
    code: "2.2-D",
    title: "SA — Signal d'avertissement",
    cetPage: 24,
    questions: [
      {
        id: "sa-02",
        prompt: "Le SA comporte combien de feux superposés ?",
        choices: ["2", "1"],
        correct: 0,
        explanation: "Deux feux : T orange en haut, T vert en bas (p.24).",
      },
      {
        id: "sa-03",
        prompt: "SA : T orange (haut) allumé. Signification ?",
        choices: [
          "Prochain feu de manœuvre au rouge — franchissement autorisé en Marche À Vue",
          "Franchissement interdit",
        ],
        correct: 0,
        explanation:
          "T orange = prochain FM au rouge, passage autorisé en Marche À Vue (p.24).",
      },
      {
        id: "sa-04",
        prompt: "SA : T vert (bas) allumé. Consigne ?",
        choices: [
          "Franchissement autorisé",
          "Appel PCC obligatoire avant de passer",
        ],
        correct: 0,
        explanation: "T vert = franchissement autorisé (p.24).",
      },
      {
        id: "sa-05",
        prompt: "SA en panne. Que faites-vous ?",
        choices: ["Prévenir le PCC", "Franchir prudemment"],
        correct: 0,
        explanation: "Feu en panne → prévenir le PCC (p.24, texte en rouge).",
      },
      {
        id: "sa-06",
        prompt:
          "T orange allumé sur SA ou SMA : vitesses maximum indiquées (encadré jaune p.24) ?",
        choices: [
          "30 km/h — et 15 km/h en entrée de station si une autre rame est présente",
          "40 km/h en permanence",
        ],
        correct: 0,
        explanation:
          "30 km/h, ou 15 km/h en entrée de station si autre rame (p.24).",
      },
      {
        id: "sa-07",
        prompt:
          "Quelle est la principale différence de structure entre le SA et le SMA ?",
        choices: [
          "Le SA a 2 feux, le SMA 3 (avec T orange fixe ou clignotant au milieu)",
          "Le SA a 3 feux, le SMA 2",
        ],
        correct: 0,
        explanation:
          "SA = 2 feux ; SMA = 3 feux dont T orange fixe/clignotant (p.24).",
      },
      {
        id: "sa-08",
        prompt:
          "Sur un SA, le T orange allumé indique quel état pour le prochain feu de manœuvre ?",
        choices: [
          "De manœuvre au rouge (FM au rouge)",
          "De tension clignotant",
        ],
        correct: 0,
        explanation: "Prochain feu de manœuvre au rouge (p.24).",
      },
      {
        id: "sa-09",
        prompt:
          "Le SM au rouge et le SA au T orange imposent tous deux un arrêt immédiat sans MAV ?",
        choices: [
          "Non — le SM rouge impose l'arrêt ; le SA orange autorise le passage en Marche À Vue",
          "Non — les deux autorisent le passage",
        ],
        correct: 0,
        explanation:
          "SM rouge = arrêt obligatoire ; SA orange = passage autorisé en MAV (p.23–24).",
      },
    ],
  },

  // ─── 2.2-E SMA ────────────────────────────────────────────
  {
    id: "sma",
    code: "2.2-E",
    title: "SMA — Signal de manœuvre et d'avertissement",
    cetPage: 24,
    questions: [
      {
        id: "sma-02",
        prompt: "Le SMA comporte combien de feux superposés ?",
        choices: ["3", "2"],
        correct: 0,
        explanation:
          "Trois feux : T rouge, T orange (milieu), T vert (bas) — p.24.",
      },
      {
        id: "sma-03",
        prompt: "SMA : T rouge (haut) allumé. Consigne ?",
        choices: ["Arrêt absolu", "30 km/h"],
        correct: 0,
        explanation: "T rouge = arrêt absolu (p.24).",
      },
      {
        id: "sma-04",
        prompt: "SMA : T orange fixe (milieu) allumé. Que indique-t-il ?",
        choices: [
          "Franchissement autorisé en MAV — prochain signal de manœuvre au rouge",
          "Rame à quai obligatoirement",
        ],
        correct: 0,
        explanation: "T orange fixe = MAV, prochain SM au rouge (p.24).",
      },
      {
        id: "sma-05",
        prompt: "SMA : T orange clignotant (milieu). Que indique-t-il ?",
        choices: [
          "Rame à quai ou occupation du canton / interface — franchissement autorisé en MAV",
          "Prochain SM au rouge seulement",
        ],
        correct: 0,
        explanation:
          "T orange clignotant = présence rame à quai ou occupation interface JP/Cemh (p.24).",
      },
      {
        id: "sma-06",
        prompt: "SMA : T vert (bas) allumé. Consigne ?",
        choices: ["Franchissement autorisé", "10 km/h au carrefour"],
        correct: 0,
        explanation: "T vert = franchissement autorisé (p.24).",
      },
      {
        id: "sma-07",
        prompt:
          "T orange fixe vs T orange clignotant sur SMA : quelle différence ?",
        choices: [
          "Fixe = prochain SM rouge ; clignotant = rame à quai ou canton occupé",
          "Fixe = arrêt ; clignotant = passage libre",
        ],
        correct: 0,
        explanation:
          "Distinction explicite p.24 entre les deux aspects orange.",
      },
      {
        id: "sma-08",
        prompt: "T orange (fixe ou clignotant) sur SMA : vitesses max ?",
        choices: [
          "30 km/h — 15 km/h en entrée de station si autre rame",
          "40 km/h puis 20 km/h",
        ],
        correct: 0,
        explanation: "Encadré jaune p.24 (identique logique SA/SMA).",
      },
      {
        id: "sma-09",
        prompt: "Le SMA combine les fonctions de quel(s) autre(s) signal(s) ?",
        choices: [
          "SM (manœuvre) et SA (avertissement) — 3 feux type tricolore avec T",
          "Feu R17 uniquement",
        ],
        correct: 0,
        explanation:
          "3 feux empilés : arrêt (rouge), avertissement (orange), passage (vert) — p.24.",
      },
      {
        id: "sma-10",
        prompt:
          "SMA et SM affichant un T rouge : quelle affirmation est exacte sur la conduite à adopter ?",
        choices: [
          "Dans les deux cas : arrêt et franchissement interdit (SMA = arrêt absolu)",
          "Dans les deux cas : marche à vue autorisée après contrôle visuel de la voie",
        ],
        correct: 0,
        explanation:
          "RCT p. 23–24, § 2.2 : T rouge sur SMA ou SM — arrêt, franchissement interdit ; SMA précise l'arrêt absolu.",
      },
      {
        id: "sma-11",
        prompt:
          "Au carrefour, un clignotement lent du losange (p.27) peut vous conduire à attendre le SM au vert : avec quel ensemble restez-vous cohérent ?",
        choices: [
          "La signalisation de manœuvre (SM) en cohérence avec le SIG",
          "Le TIV uniquement",
        ],
        correct: 0,
        explanation:
          "Losange lent = attente SM au vert pour cohérence avec le signal carrefour (p.27).",
      },
    ],
  },

  // ─── 2.2 F-G Feux blancs ──────────────────────────────────
  {
    id: "feux-blancs",
    code: "2.2-F/G",
    title: "Feux blancs — Remisage & anticipation",
    cetPage: 24,
    questions: [
      {
        id: "fb-01",
        prompt: "Feu blanc de sortie de remisage allumé : consigne ?",
        choices: ["Franchissement autorisé", "Marche À Vue 30 km/h"],
        correct: 0,
        explanation: "Feu blanc allumé = franchissement autorisé (p.24-F).",
      },
      {
        id: "fb-02",
        prompt:
          "Lorsque le feu blanc de sortie de remisage est éteint, que vaut le franchissement ?",
        choices: [
          "Franchissement interdit",
          "Franchissement autorisé prudemment",
        ],
        correct: 0,
        explanation: "Feu éteint = franchissement interdit (p.24-F).",
      },
      {
        id: "fb-03",
        prompt: "Où se trouve en général le feu blanc de sortie de remisage ?",
        choices: [
          "À la sortie du faisceau de remisage",
          "En entrée de station voyageurs",
        ],
        correct: 0,
        explanation: "Généralement en sortie de faisceau de remisage (p.24-F).",
      },
      {
        id: "fb-04",
        prompt: "À quoi sert le feu blanc d'anticipation ?",
        choices: [
          "Autoriser le départ lorsque le SM ou l'INDIR n'est pas visible du quai",
          "Signaler l'absence de tension",
        ],
        correct: 0,
        explanation:
          "Autorise le départ si SM/INDIR non visible depuis le quai (ex. Place de l'Europe) — p.24-G.",
      },
      {
        id: "fb-05",
        prompt: "Où le feu blanc d'anticipation est-il implanté en général ?",
        choices: [
          "Uniquement en station, quand le signal principal n'est pas visible du quai de départ",
          "En tunnel uniquement",
        ],
        correct: 0,
        explanation: "Uniquement en station dans ce cas (p.24-G).",
      },
      {
        id: "fb-06",
        prompt:
          "Vous distinguez le feu blanc de remisage du feu d'anticipation : que couvre le dispositif de remisage ?",
        choices: [
          "La sortie du faisceau de remisage",
          "Le départ quand le SM n'est pas visible",
        ],
        correct: 0,
        explanation:
          "Remisage = sortie faisceau ; anticipation = départ en station (p.24).",
      },
    ],
  },

  // ─── 2.2 H-I Lampe flash & tension ───────────────────────
  {
    id: "lampe-tension",
    code: "2.2-H/I",
    title: "Lampe flash, avertisseur & feu de tension",
    cetPage: 25,
    questions: [
      {
        id: "lt-01",
        prompt:
          "En voie unique, dans quelle situation la lampe flash et l'avertisseur sonore se déclenchent-ils ensemble ?",
        choices: [
          "Franchissement du SM d'entrée de VU non autorisé ou rame sens inverse",
          "Le feu R17 est vertical",
        ],
        correct: 0,
        explanation:
          "Détection franchissement SM ou rame adverse en VU (p.25-H).",
      },
      {
        id: "lt-02",
        prompt:
          "Lampe flash qui s'allume en VU (hors cas Léon Blum) : conduite à tenir ?",
        choices: [
          "Arrêt immédiat (FU), feux de détresse, appel PCC et attendre consignes",
          "Passer si voie visible",
        ],
        correct: 0,
        explanation: "Arrêt immédiat FU, détresse, appel PCC (encadré p.25).",
      },
      {
        id: "lt-03",
        prompt:
          "En galerie Mistral en voie unique, lorsque la sirène et la lampe flash se déclenchent, quelle conduite devez-vous tenir ?",
        choices: ["Arrêt immédiat (FU) — comme L2/L3", "Ralentir au SM"],
        correct: 0,
        explanation:
          "Même sens que voies uniques classiques : FU immédiat (p.25).",
      },
      {
        id: "lt-04",
        prompt:
          "Feu de présence tension : que signifie un feu jaune fixe allumé ?",
        choices: [
          "Tension présente — circulation autorisée",
          "Absence de tension — arrêt absolu",
        ],
        correct: 0,
        explanation:
          "Feu allumé = tension présente, circulation autorisée (p.25-I).",
      },
      {
        id: "lt-05",
        prompt: "Feu de présence tension : que signifie un feu clignotant ?",
        choices: [
          "Absence de tension — arrêt absolu",
          "Prévenir le PCC sans arrêt",
        ],
        correct: 0,
        explanation:
          "Feu clignotant = absence de tension, arrêt absolu (p.25-I).",
      },
      {
        id: "lt-06",
        prompt: "Feu de présence tension : que signifie un feu éteint ?",
        choices: [
          "Feu en panne — arrêt absolu et appel PCC",
          "Circulation autorisée",
        ],
        correct: 0,
        explanation: "Feu éteint = panne, arrêt absolu + PCC (p.25-I).",
      },
      {
        id: "lt-07",
        prompt: "Où est placé le feu de présence tension ?",
        choices: [
          "À hauteur de la ligne aérienne avant les points de sectionnement",
          "Au centre du carrefour",
        ],
        correct: 0,
        explanation: "Suspendu à hauteur LAC avant sectionnement (p.25-I).",
      },
      {
        id: "lt-08",
        prompt:
          "En voie unique, une lampe flash peut renforcer un INDIR à barre horizontale rouge : quel sens donnez-vous à ce renfort ?",
        choices: [
          "Renforcement du signal fermé — même vigilance qu'INDIR fermé",
          "Priorité routière",
        ],
        correct: 0,
        explanation: "Renfort si INDIR barre rouge (p.25, cas VU).",
      },
    ],
  },

  // ─── 2.2-J Traversée routière R17 ─────────────────────────
  {
    id: "traversee-r17",
    code: "2.2-J",
    title: "Traversée routière — R17 & pré-signalisation",
    cetPage: "26–27",
    questions: [
      {
        id: "tr-00",
        prompt: "Dans le RCT, le signal type R17 est :",
        choices: [
          "Le signal de traversée routière du tramway",
          "Un indicateur de direction d'aiguillage",
        ],
        correct: 0,
        explanation: "R17 = signal de traversée routière (p.26–27).",
      },
      {
        id: "tr-01",
        prompt:
          "Sur un signal de traversée routière type R17, que signifie une barre verticale blanche allumée ?",
        choices: ["Franchissement autorisé", "Franchissement interdit"],
        correct: 0,
        explanation: "Barre verticale = franchissement autorisé (p.27).",
      },
      {
        id: "tr-02",
        prompt:
          "Sur un signal R17, que signifie une barre horizontale blanche allumée ?",
        choices: ["Franchissement interdit", "Franchissement autorisé"],
        correct: 0,
        explanation: "Barre horizontale = franchissement interdit (p.27).",
      },
      {
        id: "tr-03",
        prompt: "Sur un R17, que signifie un disque central allumé ?",
        choices: [
          "Avertissement avant passage à la barre horizontale",
          "Passage autorisé",
        ],
        correct: 0,
        explanation: "Disque = avertissement avant barre horizontale (p.27).",
      },
      {
        id: "tr-04",
        prompt:
          "Pour la pré-signalisation (losange orange sous le R17), que signifie un losange éteint ?",
        choices: [
          "Système de détection hors service ou ampoule grillée",
          "Détection active",
        ],
        correct: 0,
        explanation: "Losange éteint = détection HS ou ampoule grillée (p.26).",
      },
      {
        id: "tr-05",
        prompt:
          "Losange fixe allumé et point d'exclamation clignotant : que signifie cette combinaison ?",
        choices: [
          "Tram détecté — changement de phase du carrefour dans 3 s ou plus",
          "Passage à 40 km/h",
        ],
        correct: 0,
        explanation:
          "Point d'exclamation clignotant = détection, phase dans ≥3 s (p.26).",
      },
      {
        id: "tr-06",
        prompt:
          "Pourquoi place-t-on le manipulateur en neutre ou assure-t-on un pré-freinage avant le carrefour ?",
        choices: ["Pouvoir traiter une urgence", "Éviter l'appel PCC"],
        correct: 0,
        explanation:
          "Neutre ou pré-freinage pour urgence (p.27, b signalisation carrefour).",
      },
      {
        id: "tr-07",
        prompt:
          "Sans indication de détection (losange), quelle conduite devez-vous adopter à l'approche ?",
        choices: [
          "Approcher à vitesse permettant un arrêt normal si barre reste horizontale",
          "Appeler le PCC systématiquement",
        ],
        correct: 0,
        explanation:
          "Approche modérée pour pouvoir s'arrêter si barre horizonte (p.26).",
      },
      {
        id: "tr-08",
        prompt:
          "En dérangement, comment peut se comporter le disque central du R17 ?",
        choices: [
          "Clignoter (voir aussi chapitre panne p.28)",
          "Rester éteint uniquement",
        ],
        correct: 0,
        explanation: "Disque peut clignoter en dérangement (p.27).",
      },
      {
        id: "tr-09",
        prompt: "De quelle couleur sont les feux du signal R17 ?",
        choices: ["Blancs", "Jaunes"],
        correct: 0,
        explanation: "Trois feux blancs (p.27).",
      },
    ],
  },

  // ─── 2.3 Panne signalisation lumineuse routière ────────────
  {
    id: "panne-r17",
    code: "2.3",
    title:
      "Consignes en cas de panne de la signalisation lumineuse routière — Appel PCC, franchissement et vitesses",
    cetPage: 28,
    questions: [
      {
        id: "pr-01",
        prompt:
          "Panne du feu type R17 (signalisation routière) : première action ?",
        choices: ["Appeler le PCC", "Franchir à 40 km/h"],
        correct: 0,
        explanation: "Panne R17 → appeler le PCC (p.28).",
      },
      {
        id: "pr-02",
        prompt:
          "Si le PCC autorise à franchir avec les 3 feux éteints ou disque central clignotant : vitesse au carrefour ?",
        choices: ["10 km/h", "30 km/h"],
        correct: 0,
        explanation: "Franchir à 10 km/h max (p.28).",
      },
      {
        id: "pr-03",
        prompt:
          "Franchissement autorisé par PCC en panne R17 : actions obligatoires ?",
        choices: [
          "Code de la route (priorité à droite), gong + feux de détresse, 10 km/h",
          "Feux de détresse seuls",
        ],
        correct: 0,
        explanation: "Priorité à droite, gong, détresse, 10 km/h (p.28).",
      },
      {
        id: "pr-04",
        prompt:
          "Sans agents TaM ni Police sur place, que vaut le franchissement d'un signal fermé (barre horizontale) ?",
        choices: [
          "En principe non — sauf configurations simples sans risque, à appréciation conducteur après accord PCC",
          "Autorisé si PCC dit oui",
        ],
        correct: 0,
        explanation:
          "Barre horizontale fermée : pas d'autorisation PCC sauf agents sur place, sauf cas simples (p.28).",
      },
      {
        id: "pr-05",
        prompt:
          "Quel exemple de configuration « simple » la page 28 cite-t-elle pour une dérogation éventuelle ?",
        choices: [
          "Voies uniques ne croisant rien après le quai",
          "Carrefour complexe en centre-ville",
        ],
        correct: 0,
        explanation: "Ex. voies uniques sans croisement après le quai (p.28).",
      },
    ],
  },

  // ─── 2.4 Zones spécifiques (réseau Montpellier) ──────────
  {
    id: "zones-specifiques",
    code: "2.4",
    title: "Zones spécifiques — Gare Saint-Roch, place Albert 1er, Corum",
    cetPage: 21,
    questions: [
      {
        id: "zs-01",
        prompt:
          "Quelles zones du réseau Montpellier sont qualifiées de zones spécifiques dans le document ?",
        choices: [
          "Zone Gare Saint-Roch, place Albert 1er et Corum",
          "Le dépôt et le poste de retournement uniquement",
        ],
        correct: 0,
        explanation:
          "Le RCT distingue ces trois zones spécifiques ; les règles y sont détaillées pour la cohabitation des rames (voir p.21 et zones dédiées).",
      },
      {
        id: "zs-02",
        prompt:
          "Comparé au reste du réseau, en quoi reconnaître les zones spécifiques est-il surtout utile pour un conducteur ?",
        choices: [
          "D'appliquer les consignes locales (priorités, procédures) propres à ces secteurs et de ne pas généraliser bêtement une règle « hors zone »",
          "Qu'il n'y ait plus aucun feu à respecter",
        ],
        correct: 0,
        explanation:
          "Chaque zone spécifique a des règles à suivre (Gare détaillée en 2.4.1, etc.) ; les mélanger avec le régime général serait une erreur.",
      },
    ],
  },

  // ─── 2.4.1 Zone Gare Saint-Roch ───────────────────────────
  {
    id: "zone-gare",
    code: "2.4.1",
    title:
      "Zone Gare Saint-Roch (2.4.1) — Priorités, INDES et étapes de procédure",
    cetPage: 29,
    questions: [
      {
        id: "zg-01",
        prompt: "En zone Gare Saint-Roch : vitesse maximum ?",
        choices: ["10 km/h", "15 km/h"],
        correct: 0,
        explanation: "Zone gare : 10 km/h (p.29).",
      },
      {
        id: "zg-02",
        prompt: "En zone Gare : principe de priorité entre rames ?",
        choices: [
          "Priorité systématique à la rame venant de droite",
          "Priorité au PCC",
        ],
        correct: 0,
        explanation: "Priorité à la rame venant de droite (p.29).",
      },
      {
        id: "zg-03",
        prompt: "Étape 1 zone gare : où s'arrêter en position d'attente ?",
        choices: ["À l'INDES en position AT", "Au feu R17"],
        correct: 0,
        explanation: "Arrêt à l'INDES position attente = AT (p.29).",
      },
      {
        id: "zg-04",
        prompt:
          "Après programmation de la destination, à quoi devez-vous vérifier que le voyant vert correspond ?",
        choices: [
          "À l'itinéraire commandé (ex. PL si direction Pont de Lattes)",
          "Au feu blanc uniquement",
        ],
        correct: 0,
        explanation: "Cohérence voyant vert / itinéraire commandé (p.29).",
      },
      {
        id: "zg-05",
        prompt:
          "Une rame arrive par la droite en zone gare : quelle conduite devez-vous tenir ?",
        choices: ["Vous arrêter au PLP", "Appeler le PCC systématiquement"],
        correct: 0,
        explanation: "Rame de droite → arrêt au PLP (p.29, étape 5a).",
      },
      {
        id: "zg-06",
        prompt:
          "Lorsque la destination programmée diffère de la destination habituelle de la ligne, que faites-vous ?",
        choices: [
          "Activer les feux de détresse pour alerter les autres conducteurs",
          "Rien de particulier",
        ],
        correct: 0,
        explanation: "Feux de détresse si destination atypique (encadré p.29).",
      },
      {
        id: "zg-07",
        prompt:
          "Zone gare : les consignes s'appliquent-elles s'il n'y a pas d'autre rame ?",
        choices: [
          "Oui — point par point même sans autre rame",
          "Non — seulement si trafic dense",
        ],
        correct: 0,
        explanation: "Consignes à suivre même sans autre rame (p.29).",
      },
      {
        id: "zg-08",
        prompt:
          "Organigramme Gare / Albert 1er : la zone est vide — après engagement destination ?",
        choices: [
          "Reprise destination sans autre formalité",
          "Appeler le PCC avant toute reprise",
        ],
        correct: 0,
        explanation:
          "Si la zone est vide : enchaînement vers reprise destination (schéma p.30).",
      },
      {
        id: "zg-09",
        prompt:
          "Présence d'une rame à droite et vous n'avez pas engagé le PLP : conduite à tenir ?",
        choices: [
          "Arrêt absolu, laisser le passage, puis reprise destination",
          "Forcer le passage à 10 km/h",
        ],
        correct: 0,
        explanation:
          "Sans engagement PLP avec présence à droite : arrêt absolu, laisser passer (p.30).",
      },
      {
        id: "zg-10",
        prompt:
          "Vous avez engagé le PLP ; l'autre rame est engagée (PLG) : conduite à tenir ?",
        choices: [
          "Arrêt absolu, appel PCC, puis reprise selon consignes",
          "Passer en priorité à droite systématiquement",
        ],
        correct: 0,
        explanation:
          "Conflit d'engagement : arrêt absolu et appel PCC (chemins p.30).",
      },
    ],
  },

  // ─── 2.4.2 Zone Albert 1er ────────────────────────────────
  {
    id: "zone-albert",
    code: "2.4.2",
    title: "Zone place Albert 1er (2.4.2) — Vitesses, codes et télécommandes",
    cetPage: 31,
    questions: [
      {
        id: "za-01",
        prompt: "Zone Albert 1er : vitesse maximale à partir du TIV « 10 » ?",
        choices: ["10 km/h", "15 km/h"],
        correct: 0,
        explanation: "Limitation à 10 km/h dès le TIV 10 (p.31).",
      },
      {
        id: "za-02",
        prompt:
          "En zone place Albert 1er, à quelle rame la priorité entre rames revient-elle en principe ?",
        choices: ["La rame venant de droite", "La rame venant de gauche"],
        correct: 0,
        explanation: "Priorité systématique à la rame venant de droite (p.31).",
      },
      {
        id: "za-03",
        prompt:
          "En zone place Albert 1er, comment se comportent pour vous les prescriptions des points 1 à 5b de l'article 2.4.1 (zone Gare Saint-Roch) ?",
        choices: [
          "S'appliquent également (Marche À Vue, procédures)",
          "Ne s'appliquent pas",
        ],
        correct: 0,
        explanation:
          "Renvoi explicite aux procédures 2.4.1 points 1-2-3-4-5a-5b (p.31).",
      },
      {
        id: "za-04",
        prompt: "Code destination SC en zone Albert 1er signifie ?",
        choices: [
          "Direction Albert 1er — Saint-Éloi (Saint-Charles)",
          "Direction Sablassou",
        ],
        correct: 0,
        explanation:
          "SC = direction Albert 1er — Saint-Éloi (p.31, tableau des codes).",
      },
      {
        id: "za-05",
        prompt: "Code LB à Albert 1er : direction ?",
        choices: ["Louis Blanc — Corum", "Pont de Lattes"],
        correct: 0,
        explanation: "LB = direction Louis Blanc — Corum (p.31).",
      },
      {
        id: "za-06",
        prompt:
          "Pour les repères PLP et PLG en zone place Albert 1er, quelle règle s'applique ?",
        choices: [
          "Idem zone Gare Saint-Roch",
          "Règles différentes de la gare (priorité inversée)",
        ],
        correct: 0,
        explanation: "« Idem Gare » pour PLP et PLG au tableau p.31.",
      },
    ],
  },

  // ─── 2.4.3 Zone Corum ─────────────────────────────────────
  {
    id: "zone-corum",
    code: "2.4.3",
    title:
      "Zone Corum (2.4.3) — Codes, quai L1V2, rames longues et sécurisation croisements",
    cetPage: 32,
    questions: [
      {
        id: "zc-01",
        prompt:
          "Zone Corum : vitesse à partir du TIV « 10 » et principe de priorité ?",
        choices: [
          "10 km/h, priorité à la rame venant de droite",
          "15 km/h, priorité PCC",
        ],
        correct: 0,
        explanation:
          "Comme les autres zones spécifiques : 10 km/h et priorité à droite (p.32).",
      },
      {
        id: "zc-02",
        prompt: "Code CO en zone Corum : direction ?",
        choices: ["Comédie", "Les Aubes"],
        correct: 0,
        explanation: "CO = direction Comédie (p.32).",
      },
      {
        id: "zc-03",
        prompt:
          "En zone Corum, à quoi sert la position d'attente avant le quai L1V2 ?",
        choices: [
          "Dégager au plus vite le croisement L1 / L2 / L4 — sans échange voyageurs (quai courbe)",
          "Effectuer l'échange voyageurs sur tout le long de la rame",
        ],
        correct: 0,
        explanation:
          "Fluidifier le carrefour ; interdit pour montée/descente (géométrie du quai, p.32).",
      },
      {
        id: "zc-04",
        prompt:
          "Depuis Les Aubes vers Corum L1V2, pour une rame d'au moins 40 m, pourquoi la signalisation peut-elle retarder l'accès au quai ?",
        choices: [
          "Garantir l'accès quai sans s'arrêter au milieu et bloquer le croisement avenue de Nîmes",
          "Forcer un croisement à vue sur le PN",
        ],
        correct: 0,
        explanation:
          "Temporisation pour les rames longues : sécuriser l'itinéraire complet (p.32).",
      },
      {
        id: "zc-05",
        prompt:
          "Deux rames arrivent simultanément : rôle du panneau d'espacement (Corum) ?",
        choices: [
          "Le second conducteur s'arrête en amont pour respecter la détection / l'intervalle avec la première",
          "Remplacer l'appel PCC",
        ],
        correct: 0,
        explanation: "Espacement pour détection correcte des longueurs (p.32).",
      },
      {
        id: "zc-06",
        prompt:
          "En zone Corum, les prescriptions détaillées aux points 1, 2, 3, 4, 5a et 5b de l'article 2.4.1 s'appliquent-elles même sans autre rame présente ?",
        choices: [
          "S'appliquent même sans autre rame",
          "Sont suspendus si le quai est vide",
        ],
        correct: 0,
        explanation:
          "Même obligation qu'en gare : respect point par point (p.32).",
      },
    ],
  },

  // ─── 2.5-A TIV ────────────────────────────────────────────
  {
    id: "tiv",
    code: "2.5-A",
    title: "TIV — Panneaux de vitesse",
    cetPage: 33,
    questions: [
      {
        id: "tiv-02",
        prompt: "Qu'indique un panneau TIV pour la conduite à venir ?",
        choices: [
          "La vitesse maximale à ne pas dépasser sur la section suivante",
          "La vitesse minimale obligatoire",
        ],
        correct: 0,
        explanation: "Vitesse max sur section suivante (p.33).",
      },
      {
        id: "tiv-03",
        prompt:
          "Franchissement d'un carrefour routier : vitesse max par défaut (sans TIV plus bas) ?",
        choices: ["40 km/h", "10 km/h"],
        correct: 0,
        explanation: "40 km/h max au carrefour sauf TIV inférieur (p.33).",
      },
      {
        id: "tiv-04",
        prompt:
          "Zones Gare Saint-Roch, Albert 1er et Corum : vitesse spécifique ?",
        choices: ["10 km/h", "30 km/h"],
        correct: 0,
        explanation: "Rappel : 10 km/h en zones spécifiques (p.33).",
      },
      {
        id: "tiv-05",
        prompt:
          "Une consigne de vitesse donnée par le PCC, la Police ou un agent TaM se situe à quel niveau par rapport aux limitations préétablies ?",
        choices: [
          "Prime sur les limitations préétablies",
          "S'applique seulement au dépôt",
        ],
        correct: 0,
        explanation:
          "Consignes PCC/Police/agents TaM priment sur limites préétablies (p.33).",
      },
      {
        id: "tiv-06",
        prompt: "Où sont en général posés les TIV ?",
        choices: ["À hauteur de la ligne aérienne", "Au sol entre les rails"],
        correct: 0,
        explanation: "À hauteur LAC (p.33).",
      },
      {
        id: "tiv-07",
        prompt:
          "Tableau des limitations (RCT) : croisement d'une rame arrêtée — vitesse max ?",
        choices: ["10 km/h", "15 km/h"],
        correct: 0,
        explanation: "10 km/h (tableau p.34).",
      },
      {
        id: "tiv-08",
        prompt:
          "Entrée en station : autre rame déjà présente sur place — vitesse max indiquée au tableau ?",
        choices: ["15 km/h", "30 km/h"],
        correct: 0,
        explanation:
          "15 km/h si présence d'autre rame ; 30 km/h si absence (p.34).",
      },
    ],
  },

  // ─── 2.5-B Zones de télécommande d'aiguilles ─────────────
  {
    id: "telecommande-aiguilles",
    code: "2.5-B",
    title:
      "Télécommande d'aiguilles — Panneaux, boucle, boîtier de secours, interdits",
    cetPage: 35,
    questions: [
      {
        id: "tc-01",
        prompt:
          "Hors zone à itinéraire automatique et hors zone gare, dans quel segment utilise-t-on la télécommande d'aiguilles ?",
        choices: [
          "Uniquement entre le panneau jaune « début » et le panneau jaune « fin » de zone",
          "Uniquement la nuit",
        ],
        correct: 0,
        explanation:
          "La zone est délimitée par les panneaux jaunes début / fin (p.35).",
      },
      {
        id: "tc-02",
        prompt:
          "À partir de quel moment la commande télécommandée est-elle réputée effective ?",
        choices: [
          "Les trois voyants (gauche, centre, droite) sont allumés simultanément sur passage de la boucle",
          "Le PCC a validé au téléphone",
        ],
        correct: 0,
        explanation:
          "Prise en compte sur la boucle : trois feux allumés en même temps (p.35).",
      },
      {
        id: "tc-03",
        prompt: "Nombre d'actions de commande à envoyer pour un itinéraire ?",
        choices: [
          "Une seule impulsion pour l'itinéraire voulu",
          "Trois impulsions successives obligatoires",
        ],
        correct: 0,
        explanation: "Une seule action pour l'itinéraire (p.35).",
      },
      {
        id: "tc-04",
        prompt:
          "Boîtier de secours au sol : voyant jaune fixe — signification ?",
        choices: [
          "Itinéraire enclenché / télécommande active",
          "Télécommande impossible",
        ],
        correct: 0,
        explanation:
          "Jaune clignotant = prise en compte retardée ; jaune fixe = enclenché (p.35).",
      },
      {
        id: "tc-05",
        prompt:
          "Concernant la modification de la position d'un appareil de voie motorisé, quelle affirmation est exacte ?",
        choices: [
          "Sans l'accord du PCC sauf si intégré à une manœuvre prévue, et jamais si une rame est déjà engagée dessus",
          "Jamais, même avec le PCC",
        ],
        correct: 0,
        explanation:
          "Encadré p.35 : autorisation PCC sauf manœuvre planifiée ; interdit si rame engagée.",
      },
      {
        id: "tc-06",
        prompt:
          "En mode dégradé manuel avec le sabre d'aiguillage sur un appareil motorisé, que faire avant d'insérer le sabre ?",
        choices: [
          "Couper l'alimentation (condamnation) du moteur après ouverture de la trappe",
          "Demander uniquement aux voyageurs de descendre",
        ],
        correct: 0,
        explanation:
          "Coupure d'alimentation du moteur avant intervention (p.36).",
      },
      {
        id: "tc-07",
        prompt:
          "Corps étranger dans une lame motorisée : après isolement du moteur au sabre, quelle autre action de sécurité est exigée ?",
        choices: [
          "Caler la lame contre le rail pour éviter tout mouvement accidentel",
          "Rouler à 5 km/h pour éjecter l'objet",
        ],
        correct: 0,
        explanation:
          "Consigne de sécurité : cale entre lame et rail (encadré p.36).",
      },
    ],
  },

  // ─── 2.5-C Clou de positionnement ─────────────────────────
  {
    id: "clou-positionnement",
    code: "2.5-C",
    title: "Clou de positionnement — Repère d'arrêt et gabarits",
    cetPage: 36,
    questions: [
      {
        id: "cp-01",
        prompt:
          "À quoi sert principalement le clou de positionnement sur le quai ?",
        choices: [
          "Indiquer l'arrêt commercial : alignement conducteur / repère à hauteur d'épaule",
          "Marquer uniquement la fin de ligne",
        ],
        correct: 0,
        explanation:
          "Point d'arrêt gabarit 402 ; alignement épaule conducteur (p.36).",
      },
      {
        id: "cp-02",
        prompt:
          "Quai double : consigne sur le respect du clou de positionnement ?",
        choices: [
          "Impératif — toutes les rames doivent respecter ce repère",
          "Sauf pour les rames courtes",
        ],
        correct: 0,
        explanation:
          "Mention impérative pour quai double (p.36, texte en rouge).",
      },
      {
        id: "cp-03",
        prompt:
          "Rame type 302 (plus courte) sur quai réglé au gabarit 402 : où s'arrêter ?",
        choices: ["En tête de quai", "Où le PCC indique par radio uniquement"],
        correct: 0,
        explanation: "Les 302 s'arrêtent en tête de quai (p.36).",
      },
    ],
  },

  // ─── 2.5-D Panneaux limite de manœuvre ────────────────────
  {
    id: "limite-manoeuvre",
    code: "2.5-D",
    title: "Panneaux limite de manœuvre — Fin de zone de retournement",
    cetPage: 36,
    questions: [
      {
        id: "lm-01",
        prompt:
          "Quelle est l'apparence du panneau limite de manœuvre et quel en est le rôle ?",
        choices: [
          "Carré noir : ne pas s'arrêter avant pour que le dernier bogie dégage l'aiguillage",
          "Disque jaune : vitesse 30 km/h",
        ],
        correct: 0,
        explanation:
          "Fin de zone retournement en commande manuelle ; dégagement complet (p.36).",
      },
      {
        id: "lm-02",
        prompt:
          "Pourquoi ne pas s'arrêter avant le panneau limite de manœuvre ?",
        choices: [
          "Pour garantir que le dernier bogie a franchi l'appareil de voie",
          "Pour éviter d'utiliser le gong",
        ],
        correct: 0,
        explanation: "Éviter un arrêt à cheval sur l'aiguille (p.36).",
      },
    ],
  },

  // ─── 2.6-A Panneaux de chantier ──────────────────────────
  {
    id: "panneaux-chantier",
    code: "2.6-A",
    title: "Panneaux temporaires — Chantier (flashs, vitesses, R)",
    cetPage: 37,
    questions: [
      {
        id: "ch-01",
        prompt:
          "À quelle distance type les éclairages flash de chantier sont-ils placés par rapport à la zone de travaux ?",
        choices: ["100 m avant et 100 m après la zone", "50 m avant seulement"],
        correct: 0,
        explanation: "Flashs à 100 m avant et après (p.37).",
      },
      {
        id: "ch-02",
        prompt:
          "Sur un panneau de chantier temporaire, que signifie la lettre R ?",
        choices: [
          "Point à partir duquel la reprise de vitesse normale est autorisée",
          "Rappel d'arrêt d'urgence",
        ],
        correct: 0,
        explanation: "R = reprise de vitesse (p.37).",
      },
      {
        id: "ch-03",
        prompt:
          "Sur un panneau de chantier temporaire, que représente le chiffre rouge ?",
        choices: [
          "Vitesse limite à respecter dans le secteur balisé",
          "Distance en mètres entre deux arrêts",
        ],
        correct: 0,
        explanation: "Limite de vitesse imposée (p.37).",
      },
      {
        id: "ch-04",
        prompt:
          "Lorsque la lampe flash du balisage chantier est éteinte, la limitation de vitesse affichée reste-t-elle applicable ?",
        choices: ["Reste obligatoire", "Ne vaut que de jour"],
        correct: 0,
        explanation:
          "Lampe allumée ou éteinte : respecter l'indication de vitesse (p.37).",
      },
    ],
  },

  // ─── 2.6-B Panneaux d'arrêt absolu ────────────────────────
  {
    id: "arret-absolu",
    code: "2.6-B",
    title: "Panneaux temporaires — Arrêt absolu",
    cetPage: 37,
    questions: [
      {
        id: "aa-01",
        prompt:
          "Quels dispositifs relèvent notamment des panneaux « arrêt absolu » au sens du RCT ?",
        choices: [
          "« ARRÊT OBLIGATOIRE » et le panneau rouge uni sans mention",
          "Uniquement un feu rouge clignotant",
        ],
        correct: 0,
        explanation: "Deux types illustrés p.37.",
      },
      {
        id: "aa-02",
        prompt: "Face à un panneau d'arrêt absolu : conduite à tenir ?",
        choices: [
          "Franchissement interdit tant que le signal n'est pas levé / levée l'interdiction",
          "Passage si le feu de route est vert",
        ],
        correct: 0,
        explanation:
          "Arrêt de principe : pas de contournement sans procédure (p.37).",
      },
    ],
  },
];
