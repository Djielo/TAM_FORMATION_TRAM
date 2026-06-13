/**
 * Aide-mémoire consignes — rédigé à la main, consigne par consigne.
 * Points essentiels à ancrer AVANT le texte à trous du pré-examen.
 */

/**
 * @typedef {{ id: string, title: string, refs?: string, memo: string[], note?: string }} SyntheseEntry
 * @typedef {{ id: string, chapter: "circulation"|"urgence", title: string, common?: string[], entries: SyntheseEntry[] }} SyntheseSection
 */

/** @type {SyntheseSection[]} */
export const CONSIGNES_SYNTHESE_SECTIONS = [
  {
    id: "vitesses",
    chapter: "circulation",
    title: "Tableau des vitesses (p. 34)",
    entries: [
      {
        id: "vit-05",
        title: "5 km/h",
        memo: ["Manœuvre", "Atelier"],
      },
      {
        id: "vit-10",
        title: "10 km/h",
        memo: [
          "Travaux + personnel sur voie",
          "Croisement rame arrêtée",
          "Ornières porteuses",
          "Feu routier HS",
          "Dépôt",
        ],
      },
      {
        id: "vit-15",
        title: "15 km/h",
        memo: [
          "Terminus",
          "Aiguille en voie déviée",
          "Danger piéton",
          "Station en HLP",
          "Entrée station (autre rame au quai)",
        ],
      },
      {
        id: "vit-20",
        title: "20 km/h",
        memo: ["Gong HS", "RP (remorquage / poussage)"],
      },
      {
        id: "vit-25",
        title: "25 km/h",
        memo: ["Secours traction ou alimentation directe"],
      },
      {
        id: "vit-30",
        title: "30 km/h",
        memo: ["VUT", "Entrée station (seul au quai)"],
      },
      {
        id: "vit-40",
        title: "40 km/h",
        memo: [
          "Carrefours (dont passages à niveau)",
          "RFF direct ou dévier",
          "Ouverture de voie",
          "Aiguille en voie directe",
          "Veille + accompagnant",
          "Frein HS (max 1 frein isolé)",
          "Bogie isolé",
          "Chasse-corps HS / verrouillé",
        ],
      },
    ],
  },
  {
    id: "service-depot",
    chapter: "circulation",
    title: "Prise de service, relève, sortie dépôt",
    entries: [
      {
        id: "pds-depot",
        title: "Prise de service au dépôt",
        refs: "3.1-A · p. 39",
        memo: [
          "À l'heure de PDS",
          "Tenue réglementaire TaM",
          "Alcool < 0,20 g/l · stupéfiants interdits · médicaments → médecin traitant",
          "Habilitation valide · 70 j sans conduite commerciale → remise en main",
          "Badger au dépôt + à la montée en rame",
          "Planchette + feuille de route → rame en remisage",
        ],
      },
      {
        id: "pds-releve",
        title: "Relève en ligne",
        refs: "3.1-A relève · p. 39",
        memo: [
          "Point de relève : 2 min avant l'heure",
          "Releveur absent → PCC, poursuivre mission, attendre consignes",
          "Rame absente → appeler PCC sous 5 min",
          "Relève / pause : planchette · véhicule perso interdit",
        ],
      },
      {
        id: "sortie-depot",
        title: "Sortie du dépôt",
        refs: "3.1-B · p. 40",
        memo: [
          "Préparer rame (partie 1 RCT)",
          "Autorisation PCC + itinéraire de sortie",
          "Blocage technique → PCC seul peut changer matériel",
          "Test télécommande aiguille (voie E CEMH ou JP) · G, TD, D, INDIR",
          "Test PETRARQUE · défaut → PCC",
        ],
      },
    ],
  },
  {
    id: "conduite-cabine",
    chapter: "circulation",
    title: "Comportement en cabine et circulation en ligne",
    entries: [
      {
        id: "comportement-rame",
        title: "Comportement du conducteur dans la rame",
        refs: "3.1-C · p. 41",
        memo: [
          "Cabine réservée · porte fermée · conduite assise vigilante",
          "Interdit : fumer, manger, téléphone (phonie mains libres hors arrêt)",
          "Arrêt en ligne : rester au poste, feu détresse",
          "Quitter cabine : neutre, clé KC, porte fermée",
          "Anomalie service → info clientèle",
        ],
      },
      {
        id: "circulation-ligne",
        title: "Circulation en ligne",
        refs: "3.2 · p. 42",
        memo: [
          "Cabine sens de la marche (marche arrière interdite)",
          "Marche à vue, vitesse adaptée",
          "Pouvoir s'arrêter en toute circonstance",
          "SIG ferroviaire + routier + vitesses · éviter traction sur isolateurs de section",
          "Brouillard / fumée : ralentir",
          "Pertes de vigilance → alerter PCC",
        ],
        note: "Relevés tachymétriques réguliers et aléatoires · médicaments : avis médecin.",
      },
    ],
  },
  {
    id: "voies",
    chapter: "circulation",
    title: "GLO, types de voie, VUT",
    entries: [
      {
        id: "glo-gabarit",
        title: "GLO (gabarit limite d'obstacle)",
        refs: "3.2-A · p. 43",
        memo: [
          "Bande au sol GLO · zone circulation tramway (gabarit rames)",
          "Piéton/vélo proche GLO → adapter vitesse · gong · se préparer manœuvre d'urgence",
          "Obstacle proche GLO → ralentir · dépasser en toute sécurité",
          "Obstacle empiète sur GLO → arrêter rame · PCC immédiat",
        ],
      },
      {
        id: "ouverture-voie",
        title: "Ouverture de voie",
        refs: "3.2-A · p. 44",
        memo: [
          "40 km/h max",
          "Contrôler appareils de voie · non visible (neige…) → arrêter rame",
          "Signaler : objets voie · signalisation · LAC · DAT · dégâts mobilier station · absence éclairage",
          "Terminus → informer PCC état voie (zones glissantes)",
          "Anomalie constatée → consigner sur feuille de route",
        ],
      },
      {
        id: "circulation-voie-double",
        title: "Circulation sur voie double",
        refs: "3.2-B · p. 45",
        memo: [
          "Circulation nominale · voie de droite · sens marche",
          "Respecter SIG : présence tension · carrefour · manœuvre · verticale · au sol",
        ],
        note: "Voie nominale V1 · L1 Mosson→Odysseum · L2 St-Jean-de-Védas→Jacou",
      },
      {
        id: "circulation-voie-unique",
        title: "Circulation sur voie unique",
        refs: "3.2-C · p. 45",
        memo: [
          "Respecter impérativement SIG manœuvre · chaque évitement · début canton",
          "Départ station feu manœuvre au vert (boucles VU · échange voyageurs)",
          "Franchissement → sirène + lampes flash → FU",
          "Lampes flash en trajet → FU · arrêt en ligne · PCC",
        ],
        note: "Contrôler INDIR · sortie · aiguilles déviées · 15 km/h max",
      },
      {
        id: "circulation-vut",
        title: "Circulation en VUT (voie unique temporaire)",
        refs: "3.2-D · p. 46",
        memo: [
          "Une voie, deux sens, sans cantonnement, 30 km/h max, sur ordre du régulateur PCC.",
          "Régulateur : stoppe les rames aux extrémités VUT, vérifie bonne réception du message",
          "Première rame : régulateur annonce n° bâton pilote, autorise engagement VUT libre",
          "Sortie VUT : rame en sortie appelle PCC avant transmission bâton, suit consigne de remise",
          "Rame sens inverse : appelle PCC, annonce n° bâton, attend autorisation d'engager",
        ],
        note: "AM sur place : le PCC délègue aux AM le rôle de régulateur.",
      },
    ],
  },
  {
    id: "manoeuvres",
    chapter: "circulation",
    title: "Retournement et rebroussement",
    common: [
      "Retournement = autre voie · Rebroussement = même voie (type VUT)",
      "Hors terminus / planchette → accord PCC · comm. manuelle = ordre PCC",
    ],
    entries: [
      {
        id: "retournement-rebroussement",
        title: "Principes retournement / rebroussement",
        refs: "3.2-E1 · p. 47",
        memo: [
          "Sans voyageurs de préférence (sauf après comm. retournement)",
          "Rebroussement = cadre VUT sauf tronçon court visible ou VU protégé",
          "Cas manuels après/après station : KC, feu détresse, aiguille déviée, accord PCC",
        ],
      },
      {
        id: "retournement-terminus",
        title: "Retournement en terminus",
        refs: "3.2-E2 · p. 48",
        memo: [
          "SAE ou planchette · 15 km/h terminus",
          "Neutre, KC, cabine opposée · vérifier portes / girouettes",
          "Marche arrière interdite (sauf RP court avec agent)",
        ],
      },
      {
        id: "rebroussement-vu",
        title: "Rebroussement voie unique",
        refs: "3.2-E3 · p. 48",
        memo: [
          "Après station → repère rebroussement · accord PCC",
          "Conflit VU / SM rouge : rame la plus proche de l'évitement rebrousse",
        ],
      },
    ],
  },
  {
    id: "hlp-feux-gong-dist",
    chapter: "circulation",
    title: "HLP, feux, gong, distances",
    entries: [
      {
        id: "circulation-hlp",
        title: "HLP",
        refs: "3.3 · p. 49",
        memo: ["15 km/h en station", "Gong (sauf après 22 h sauf danger)", "Feu détresse"],
      },
      {
        id: "feux-detresse",
        title: "Feux et détresse",
        refs: "3.4 · p. 49",
        memo: [
          "Croisement + intérieur allumés jour et nuit",
          "Feu détresse : arrêt prolongé, HLP, VUT, itinéraire dévié gare, carrefour HS, RP",
        ],
        note: "Croisement rame arrêtée autre voie : 10 km/h, arrêt cabine, PCC avant repartir.",
      },
      {
        id: "utilisation-gong",
        title: "Gong",
        refs: "3.5 · p. 50",
        memo: [
          "Toujours : piétons/cyclistes, carrefour dangereux, croisement arrêté",
          "7 h–22 h : arrivée/départ station, croisement rame",
          "Dégradé : carrefour HS, VUT contresens",
        ],
        note: "Gong HS → PCC, 20 km/h, klaxon si besoin.",
      },
      {
        id: "distances-securite",
        title: "Distances de sécurité",
        refs: "3.6 · p. 50",
        memo: [
          "100 m entre rames (50 m si tronçon ≤ 30 km/h)",
          "Arrêt hors station : 5 m · en station : 2 m",
        ],
        note: "Quai double + rame opposée : 15 km/h entrée station.",
      },
    ],
  },
  {
    id: "station",
    chapter: "circulation",
    title: "Arrêt, portes, départ en station",
    entries: [
      {
        id: "arret-station",
        title: "Principes généraux",
        refs: "3.7 · p. 51",
        memo: [
          "Montée/descente côté prévu · arrêt marqué chaque station",
          "Entrée 30 km/h (15 si rame devant) · gong · clou rouge · portes à l'arrêt",
        ],
      },
      {
        id: "ouverture-portes",
        title: "Ouverture des portes",
        refs: "3.7-A · p. 52",
        memo: ["401 : BPAL self-service · 402 : séquence RCT", "Pré-sélection côté portes"],
      },
      {
        id: "fermeture-portes",
        title: "Fermeture des portes",
        refs: "3.7-B · p. 52",
        memo: ["~15 s ou ~30 s selon affluence", "Anticiper dernières montées avant BPAL"],
      },
      {
        id: "depart-station",
        title: "Départ de la station",
        refs: "3.7-C · p. 53",
        memo: [
          "VU L2/L3 : vert SIG ferroviaire obligatoire",
          "Quai double 2e position : 2e arrêt tête quai (PMR)",
          "Vérifier rétros jusqu'à fin quai (personne entraînée)",
        ],
        note: "Corum L1V2 2e position : attente seule, pas d'échange voyageurs.",
      },
      {
        id: "defaut-porte",
        title: "Défaut porte / poignée d'alarme",
        refs: "3.7-D · p. 53",
        memo: [
          "Poignée au dégagement → FU/FMS, portes à 15 s",
          "Mauvais côté : réarmer ou bon côté déverrouillage",
          "Mode dégradé : condamner + autocollant + SIE + PCC + feuille de route",
        ],
      },
    ],
  },
  {
    id: "clientele-pcc",
    chapter: "circulation",
    title: "Clientèle, PCC, fin de service",
    entries: [
      {
        id: "communication-clientele",
        title: "Communication clientèle",
        refs: "3.8 · p. 54",
        memo: [
          "Image TaM : informer, rassurer",
          "Phonie : respirer, mots détachés, 5–6 cm du micro",
        ],
      },
      {
        id: "signalements-radio",
        title: "Signalements radio PCC",
        refs: "3.9-A · p. 55",
        memo: [
          "Normal / urgent / appel détresse (toute écoute + feu détresse)",
          "Appeler pour : partie 3 et 4, personne sur voie, FU/FS, dégâts matériel ou voie",
        ],
      },
      {
        id: "panne-phonie",
        title: "Panne de phonie",
        refs: "3.9-B · p. 56",
        memo: [
          "Attendre autre rame relais",
          "Ou téléphone perso, rame arrêtée → consignes PCC",
        ],
      },
      {
        id: "rentree-depot",
        title: "Rentrée dépôt",
        refs: "3.9-C · p. 57",
        memo: [
          "Autorisation PCC · stationner site imposé",
          "Contrôle rame · feuille de route · km + heures · boîte aux lettres · planchette",
          "Dépôt : 10 km/h (3 atelier) · sans client · PCC · pas zone atelier conducteur",
        ],
      },
      {
        id: "signalements-ecrits",
        title: "Signalements par écrit",
        refs: "3.9-D · p. 58",
        memo: [
          "Feuille conducteur (service) + feuille rame (matériel)",
          "Rapport interne si plainte, accident corporel/matériel",
        ],
        note: "Rapport interne : formulation engageante — soin de rédaction.",
      },
    ],
  },
  // ─── URGENCE ───
  {
    id: "urgence-socle",
    chapter: "urgence",
    title: "Socle commun — arrêt imposé (4.1)",
    common: [
      "Base de la plupart des urgences : arrêt · feu détresse · flash PCC (position, sens, nature) · informer clients",
    ],
    entries: [
      {
        id: "urgence-arret-rame",
        title: "Incident imposant l'arrêt",
        refs: "4.1 · p. 60",
        memo: ["Les 4 points ci-dessus"],
        note: "Arrêt prolongé : évacuation possible selon PCC.",
      },
      {
        id: "urgence-depart-urgent",
        title: "Départ urgent (quitter la zone)",
        refs: "4.1 · p. 60",
        memo: [
          "Incendie proche, projectiles, danger immédiat",
          "Quitter zone · prévenir PCC après · respect SIG",
        ],
      },
      {
        id: "urgence-coordinateur",
        title: "Coordinateur (incident grave)",
        refs: "4.1 · p. 60",
        memo: [
          "En attendant : conducteur = coordinateur (témoins, PCC)",
          "Responsable sur place prend le commandement · entretien AM ensuite",
        ],
      },
    ],
  },
  {
    id: "accidents",
    chapter: "urgence",
    title: "Accidents et agression conducteur",
    common: ["Arrêt · feu détresse · urgence · informer · protéger · PCC · feuille de route"],
    entries: [
      {
        id: "accident-materiel",
        title: "Accident matériel",
        refs: "4.2-A · p. 61",
        memo: [
          "Témoins · PRE CONSTAT + CONSTAT A au PCC / boîte rouge JP",
          "Choc latéral violent avant → FS · reprise : ordre PCC seul",
        ],
      },
      {
        id: "accident-corporel",
        title: "Accident corporel",
        refs: "4.2-B · p. 62",
        memo: [
          "État blessé précis (sortir cabine si besoin) → PCC",
          "CONSTAT CORPOREL + ACCIDENT B · reprise : accord PCC",
        ],
        note: "Blessure légère + refus secours : ne pas repartir sans PCC.",
      },
      {
        id: "personne-sous-rame",
        title: "Personne sous la rame",
        refs: "4.2-C · p. 63",
        memo: [
          "FS · urgence avant coupure batterie · pantographe bas · dé-préparer",
          "Pompiers seuls déplacent la rame",
        ],
      },
      {
        id: "agression-conducteur",
        title: "Malaise / agression conducteur",
        refs: "4.2-D · p. 64",
        memo: ["Arrêt · feu détresse · FS · appel détresse · informer clients"],
      },
    ],
  },
  {
    id: "incidents-bord",
    chapter: "urgence",
    title: "Incidents à bord",
    entries: [
      {
        id: "deraillement",
        title: "Déraillement",
        refs: "4.3 · p. 64",
        memo: [
          "Socle urgence · pantographe bas (LAC) · évacuation accord PCC",
          "Triangle · interdit ré-enraillement seul",
        ],
      },
      {
        id: "voyageur-malaise",
        title: "Malaise / chute voyageur",
        refs: "4.4-A · p. 65",
        memo: [
          "Urgence · arrêt station si possible · KC + cabine fermée",
          "Assistance · consignes PCC · témoins",
        ],
      },
      {
        id: "bris-vitre",
        title: "Bris de vitre",
        refs: "4.4-B · p. 66",
        memo: ["Pas de blessé · éloigner clients · ordres PCC (évacuer ou fin course)"],
      },
      {
        id: "incident-pare-brise",
        title: "Pare-brise / visibilité",
        refs: "4.4-C · p. 66",
        memo: ["Évacuation · informer PCC fin évacuation"],
      },
      {
        id: "incendie-bord",
        title: "Incendie à bord",
        refs: "4.4-D · p. 67",
        memo: [
          "Évacuer (cf. évacuation) · pantographe bas · extincteurs · secours",
        ],
        note: "Après incendie : pas de pantographe sans accord PCC.",
      },
      {
        id: "colis-suspect-bord",
        title: "Colis suspect à bord",
        refs: "4.4-E · p. 68",
        memo: [
          "Ne pas toucher · PCC · périmètre si stationné",
          "Liaison HS : évacuer, rejoindre terminus à pied",
        ],
      },
    ],
  },
  {
    id: "incidents-voie",
    chapter: "urgence",
    title: "Incidents aux abords de la voie",
    entries: [
      {
        id: "colis-suspect-voie",
        title: "Colis suspect aux abords",
        refs: "4.5-A · p. 69",
        memo: ["Ne pas toucher · alerte bombe → arrêt, feu détresse, Police, PCC"],
      },
      {
        id: "chute-lac",
        title: "LAC / risque électrique",
        refs: "4.5-B · p. 70",
        memo: [
          "Interdire descente · pantographe bas · descente si PCC confirme LAC coupée",
          "Interdit monter en toiture si panne pantographe",
        ],
      },
      {
        id: "inondation-voie",
        title: "Inondation",
        refs: "4.5-C · p. 71",
        memo: [
          "< 10 cm : 5 km/h + PCC",
          "> 10 cm (repère rouge) : arrêt, urgence, consignes PCC",
        ],
      },
      {
        id: "accident-plateforme",
        title: "Accident plate-forme / chute sur voie",
        refs: "4.5-D · p. 72",
        memo: ["Secours · protéger · éviter 2e accident · reprise selon PCC"],
      },
    ],
  },
  {
    id: "anomalies",
    chapter: "urgence",
    title: "Anomalies en ligne",
    entries: [
      {
        id: "anomalies-arret",
        title: "Anomalies → arrêt + PCC",
        refs: "4.6-A · p. 73",
        memo: [
          "LAC endommagée, tendeur, potence, corps étranger voie/aiguille",
          "Affaissement voie, SIG illisible, conducteur absent au croisement, accroché à rame",
        ],
      },
      {
        id: "anomalies-sans-arret",
        title: "Anomalies → prévenir PCC (sans arrêt)",
        refs: "4.6-B · p. 73",
        memo: [
          "Feux éteints autre rame, anomalies autre rame, objet accroché",
          "Comportement suspect, barrières HS, arbre menaçant, voiture sur voie",
        ],
      },
    ],
  },
  {
    id: "immobilisation-evacuation",
    chapter: "urgence",
    title: "Immobilisation et évacuation",
    common: [
      "Immobilisation : feu détresse (triangle si panne) · urgence · informer clients",
      "Évacuation : accord PCC (sauf incendie / force majeure) · côté droit sens marche · descendre le 1er · fin → PCC",
    ],
    entries: [
      {
        id: "immobilisation-voie",
        title: "Immobilisation pleine voie",
        refs: "4.7-A · p. 74",
        memo: ["Socle immobilisation"],
      },
      {
        id: "immobilisation-tunnel",
        title: "Immobilisation tunnel",
        refs: "4.7-C · p. 75",
        memo: ["Socle immobilisation", "+ appel détresse si pas de réponse PCC"],
      },
      {
        id: "evacuation-voie",
        title: "Évacuation pleine voie",
        refs: "4.7-B · p. 74",
        memo: [
          "Socle évacuation",
          "Danger côté droit → entrevoie après autorisation PCC",
        ],
        note: "VU Sabines / Notre-Dame de Sablassou : cheminement piéton + bus.",
      },
      {
        id: "evacuation-tunnel",
        title: "Évacuation tunnel",
        refs: "4.7-D · p. 75",
        memo: ["Socle évacuation", "Diriger vers sortie la plus proche"],
      },
    ],
  },
];
