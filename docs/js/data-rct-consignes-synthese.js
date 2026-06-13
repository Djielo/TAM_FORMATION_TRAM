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
          "Se présenter à l'heure prévue de prise de service",
          "Porter la tenue réglementaire TaM",
          "Alcoolémie < 0,20 g/l, stupéfiants interdits, médicaments : parler au médecin traitant",
          "Habilitation valide ligne et matériel, suspendue après 70 j sans conduite commerciale : remise en main obligatoire",
          "Badger à l'arrivée au dépôt et à la montée en rame",
          "Récupérer planchette et feuille de route avant de rejoindre la rame en remisage",
        ],
      },
      {
        id: "pds-releve",
        title: "Relève en ligne",
        refs: "3.1-A relève · p. 39",
        memo: [
          "Point de relève : y être au moins 2 minutes avant l'heure théorique",
          "Releveur absent : prévenir PCC, poursuivre mission, attendre consignes régulateur",
          "Rame absente : releveur appelle PCC au plus tard 5 min après l'heure théorique",
          "Déplacements relève ou pause : suivre planchette, véhicule personnel interdit",
        ],
      },
      {
        id: "sortie-depot",
        title: "Sortie du dépôt et mise en ligne",
        refs: "3.1-B · p. 40",
        memo: [
          "Préparer la rame sur remisage selon partie 1 du RCT",
          "Rame prête : demander autorisation PCC, il construit l'itinéraire de sortie",
          "Sortie impossible technique : informer PCC, seul le PCC peut changer le matériel",
          "Avant sortie : test télécommande aiguille (panneau voie E CEMH ou interface JP), tester G, TD, D et INDIR",
          "Test PETRARQUE : balise arrière OK allume feu barrière, balise avant OK ouvre barrière, défaut : appeler PCC",
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
          "Cabine réservée, signaler toute présence non autorisée au PCC",
          "Porte cabine fermée en circulation, effets personnels rangés",
          "Conduite assise, position vigilance pour commandes d'urgence dont FS",
          "Interdit de fumer, manger, téléphone, phonie mains libres hors arrêt seulement",
          "Arrêt en ligne : rester au poste de conduite, feu détresse",
          "Hors action courante : ne pas quitter le tram en ligne sauf force majeure après évacuation, informer PCC, mesures anti-accident BS p. 35",
          "Quitter cabine : neutre, clé KC, porte fermée BS p. 35",
          "Anomalie service : info clientèle par sonorisation intérieure",
          "Rame arrêtée : porte cabine autorisée pour s'adresser à la clientèle",
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
      "Retournement : autre voie par communication · Rebroussement : même voie, type VUT",
      "Hors terminus ou hors planchette : sous contrôle PCC · Communication manuelle : ordre PCC",
    ],
    entries: [
      {
        id: "retournement-rebroussement",
        title: "Manœuvre de retournement et de rebroussement",
        refs: "3.2-E1 · p. 47",
        memo: [
          "Retournement : changement de voie par communication, repartir sens inverse par l'autre voie",
          "Rebroussement : retournement sur même voie, équivalent circulation VUT",
          "Retournement : de préférence sans voyageurs, sauf station située après communication de retournement",
          "Communication manuelle non signalée : manœuvre entière sur ordre ou autorisation PCC",
          "Hors terminus ou non prévu planchette : sous contrôle PCC, 3e voie Occitanie ou L. Blum incluse",
          "Rebroussement : cadre consigne 3.2-D VUT, sauf tronçon court visible ou VU protégée par SIG",
        ],
      },
      {
        id: "retournement-terminus",
        title: "Manœuvre de retournement en terminus",
        refs: "3.2-E2 · p. 48",
        memo: [
          "Terminus ou terminus partiel : selon instructions SAE ou planchette",
          "Changement cabine : neutre, KC, quitter poste, fermer porte cabine à clé",
          "Traversée rame : vérifier objets oubliés ou suspects, prévenir PCC si besoin",
          "Cabine de tête : vérifier pré-sélection côté portes et girouettes",
          "Avancer vers quai : respecter SIG, déverrouiller portes",
          "Avant-gare avec voyageurs : attention sélection portes pour la descente",
          "Terminus : vitesse limitée à 15 km/h",
          "Quitter son poste de conduite est autorisé sur temps de battement ou pause, sinon autorisation PCC obligatoire",
        ],
        note: "Marche arrière cabine opposée interdite, sauf RP court avec second agent cabine opposée",
      },
      {
        id: "rebroussement-vu",
        title: "Manœuvre de rebroussement sur voie unique",
        refs: "3.2-E3 · p. 48",
        memo: [
          "Après station : rame s'engage jusqu'au repère de rebroussement",
          "Après autorisation PCC : changer cabine, contrôler aiguille, rejoindre quai voie opposée",
          "Conflit VU ou SM rouge : rame la plus proche de l'évitement rebrousse après autorisation PCC",
          "Conflit : voyageurs à bord conseillés après accord PCC, dégager aiguille station quittée si besoin",
          "Rebroussement conflit : 5 km/h max, dépasser évitement, dégager aiguille sortie",
          "Retour quai : informer PCC, repartir vers station d'évitement après autorisation, arrêt SM sortie, engagement au vert",
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
        title: "Circulation Haut Le Pied (sans voyageurs)",
        refs: "3.3 · p. 49",
        memo: [
          "Vitesse en station limitée à 15 km/h",
          "Passage en station : gong obligatoire sauf à partir de 22 h, sauf danger",
          "Vérifier le message affiché sur la girouette",
          "Feu détresse actionnés",
        ],
      },
      {
        id: "feux-detresse",
        title: "Utilisation des feux et feux de détresse",
        refs: "3.4 · p. 49",
        memo: [
          "Feux croisement et éclairage intérieur allumés jour et nuit",
          "Feux route et brouillard selon Code de la route",
          "Feu détresse : arrêt anormal prolongé, HLP, VUT, itinéraire dévié gare, carrefour feux HS, RP",
        ],
        note: "Croisement rame arrêtée autre voie : 10 km/h, arrêt à hauteur cabine autre rame, informer PCC avant repartir · Panne feu détresse arrêt prolongé : triangle environ 40 m avant rame",
      },
      {
        id: "utilisation-gong",
        title: "Utilisation du gong",
        refs: "3.5 · p. 50",
        memo: [
          "Gong obligatoire : piétons ou cyclistes, carrefour ou zone piétonne dangereux, croisement rame ou bus arrêté",
          "De 7 h à 22 h seulement : arrivée ou départ station, croisement rame en circulation",
          "Mode dégradé : carrefour feux HS, VUT à contresens",
        ],
        note: "Gong HS : prévenir PCC, 20 km/h, klaxon si danger",
      },
      {
        id: "distances-securite",
        title: "Distances de sécurité",
        refs: "3.6 · p. 50",
        memo: [
          "Entre deux rames en ligne : 100 m minimum, 50 m si tronçon limité à 30 km/h",
          "Deux rames arrêtées hors station : 5 m minimum, adapter vitesse d'approche",
          "Deux rames arrêtées en station : 2 m minimum",
        ],
        note: "Quai double : entrée station 15 km/h max si rame au quai ou rame arrêtée quai opposé",
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
        title: "Arrêt en station — principes généraux",
        refs: "3.7 · p. 51",
        memo: [
          "Montée et descente côté prévu seulement, sauf consigne particulière PCC",
          "Service commercial : arrêt marqué à chaque station",
          "Entrée station : 30 km/h max, gong, ou 15 km/h si rame devant ou voie opposée cf. §3.6",
          "Attention renforcée vers voyageurs en bordure de quai",
          "Immobilisation au clou rouge, à hauteur d'épaule conducteur",
          "Portes déverrouillées uniquement à l'arrêt complet",
        ],
      },
      {
        id: "ouverture-portes",
        title: "Arrêt en station — ouverture des portes",
        refs: "3.7-A · p. 52",
        memo: [
          "401 : BPAL self-service en pré-sélection droite active",
          "302 ou 402 : BPAL côté droit ou gauche selon quai",
          "PMR : double portes CC auto, autres portes par bouton voyageur",
          "402 PMR : acquitter demande SIE pour ouvrir la caisse concernée",
          "Surveiller montée et descente, terminus départ : mode self, commutateur N portes centrales fermées",
        ],
        note: "Forte affluence : ouverture générale BPAL",
      },
      {
        id: "fermeture-portes",
        title: "Fermeture des portes",
        refs: "3.7-B · p. 52",
        memo: [
          "Après environ 15 s ou 30 s selon affluence, anticiper dernières montées puis décrocher BPAL",
          "Obstacle en fermeture : ouverture générale avant de relancer fermeture",
          "Forte affluence : appui prolongé BPI, fermeture forcée, message attention fermeture portes",
        ],
        note: "401 : fermeture forcée via BPAL côté sélectionné interdite · 302/402 : pas les deux côtés ouverts simultanément en commercial",
      },
      {
        id: "depart-station",
        title: "Départ de la station",
        refs: "3.7-C · p. 53",
        memo: [
          "VU L2/L3 : départ uniquement si SIG ferroviaire au vert",
          "Quai double 2e position : deuxième arrêt tête quai pour PMR",
          "Portes verrouillées : départ en surveillant quai par rétros, gong actionné",
          "Jusqu'à fin dégagement quai : vérifier rétros qu'aucun voyageur entraîné",
          "Appel interphonie voyageur pendant dégagement : vérifier rétros",
        ],
        note: "Corum L1V2 2e position : attente seule, échange voyageurs interdit",
      },
      {
        id: "defaut-porte",
        title: "Défaut porte et poignée d'alarme",
        refs: "3.7-D · p. 54",
        memo: [
          "Poignée au dégagement quai : FU ou FMS, portes libérées après 15 s, risque entrevoie",
          "Éviter mauvais côté : réarmer poignée ou bon côté déverrouillage",
          "Dialoguer interphonie, informer voyageurs une fois cause identifiée",
          "Vérifier sécurité voyageurs avant redémarrage",
          "Mode dégradé : condamner porte, autocollant info clientèle, contrôler SIE, signaler feuille de route et PCC",
        ],
        note: "Hors zone dégagement : portes libérées 15 s après poignée sans action conducteur · Impossible condamner : PCC peut ordonner isolement contrôle portes après évacuation",
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
        title: "Communication avec la clientèle",
        refs: "3.8 · p. 54",
        memo: [
          "Garant image TaM : confort et sécurité clients",
          "Incident ou perturbation : informer impérativement, ton rassurant",
          "Arrêt prolongé ou imprévu : sonorisation salles, expliquer évolution, rassurer",
          "Phonie : respirer après connexion, parler calmement mots détachés, bouche à 5-6 cm du micro",
        ],
      },
      {
        id: "signalements-radio",
        title: "Communication PCC — signalements radio",
        refs: "3.9-A · p. 55",
        memo: [
          "Trois niveaux : normal, urgent, appel détresse (toute écoute + feu détresse)",
          "402 appel détresse : appui long, annuler en accrochant-décrochant bouton feu détresse",
          "Appel PCC obligatoire : consignes partie 3 et 4, personne suspecte sur voie, après FU ou FS, dégâts matériel ou voie, chantier mal protégé, feux traversée ou manœuvre HS",
        ],
        note: "Fin de service : reporter signalements radio sur feuille de route",
      },
      {
        id: "panne-phonie",
        title: "Communication PCC — panne de phonie",
        refs: "3.9-B · p. 56",
        memo: [
          "Panne générale ou phonie secours inopérante : attendre autre rame relais",
          "Ou appeler PCC avec téléphone personnel, rame à l'arrêt, suivre instructions régulateur",
        ],
        note: "Fin de service : noter incident sur feuille de route",
      },
      {
        id: "rentree-depot",
        title: "Rentrée et circulation dans le dépôt",
        refs: "3.9-C · p. 57",
        memo: [
          "Demander autorisation PCC pour rentrer au dépôt",
          "Stationner sur site désigné par PCC",
          "Vérifier état intérieur et extérieur rame, signaler dégâts sur feuille de route",
          "Noter kilométrage et heures, déposer feuille de route, ranger planchette",
          "Dépôt : circulation sans client sous contrôle PCC, 10 km/h max, 3 km/h zone ateliers, zone atelier interdite conducteurs",
        ],
      },
      {
        id: "signalements-ecrits",
        title: "Signalements par écrit",
        refs: "3.9-D · p. 58",
        memo: [
          "Feuille conducteur : incidents du service · Feuille rame couleur : matériel roulant et embarqué",
          "Rédiger avec soin, rubriques correctes, anomalies matériel et appels PCC notés",
          "Rapport interne si plainte possible, accident corporel ou matériel, dégâts matériel roulant",
        ],
        note: "Rapport interne : formulation engageante, soin de rédaction, possible avec AM Exploitation",
      },
    ],
  },
  // ─── URGENCE ───
  {
    id: "urgence-socle",
    chapter: "urgence",
    title: "Socle commun — arrêt imposé (4.1)",
    common: [
      "Arrêter la rame, feu détresse, flash PCC avec position sens et nature, informer clients",
    ],
    entries: [
      {
        id: "urgence-arret-rame",
        title: "Incident ou accident imposant l'arrêt",
        refs: "4.1 · p. 60",
        memo: [
          "Arrêter la rame",
          "Feu détresse",
          "Appeler PCC par message flash : position, direction, nature incident",
          "Informer clients à bord",
        ],
        note: "Arrêt prolongé : évacuation possible selon accord PCC",
      },
      {
        id: "urgence-depart-urgent",
        title: "Départ urgent de la zone de danger",
        refs: "4.1 · p. 60",
        memo: [
          "Cas : incendie proche, projectiles, tout danger imposant départ immédiat",
          "Conducteur peut quitter zone dangereuse, prévenir PCC une fois danger écarté",
          "Évacuation dans le respect SIG routière et ferroviaire",
        ],
      },
      {
        id: "urgence-coordinateur",
        title: "Incident grave — rôle de coordinateur",
        refs: "4.1 · p. 60",
        memo: [
          "En attendant responsable : conducteur assure coordinateur sur lieux, témoins et compte rendu PCC",
          "Responsable hiérarchique sur place prend commandement, interlocuteur Pompiers et Police",
          "Dès que possible : AM mène entretien de restitution et analyse avec conducteur",
        ],
      },
    ],
  },
  {
    id: "accidents",
    chapter: "urgence",
    title: "Accidents et agression conducteur",
    common: [
      "Arrêt, feu détresse, urgence, informer clients, protéger, PCC, feuille de route",
    ],
    entries: [
      {
        id: "accident-materiel",
        title: "Accident matériel",
        refs: "4.2-A · p. 61",
        memo: [
          "Arrêt, feu détresse, urgence, informer clients, éviter un autre accident",
          "Témoins, PRE CONSTAT avec tiers, CONSTAT A au PCC ou boîte rouge JP le jour même",
          "Exemplaire au tiers, PCC informé mise à disposition rame, noter sur feuille de route",
        ],
        note: "Choc latéral violent avant : FS · Reprise service : ordre PCC seul",
      },
      {
        id: "accident-corporel",
        title: "Accident corporel",
        refs: "4.2-B · p. 62",
        memo: [
          "Arrêt, feu détresse, urgence, informer clients, protéger blessés, éviter un autre accident",
          "État blessé précis, sortir cabine si besoin pour signalement, communiquer au PCC",
          "CONSTAT CORPOREL + ACCIDENT B, témoins, secours, reprise après accord PCC, feuille de route",
        ],
        note: "Blessure légère et refus secours : ne pas repartir sans accord PCC, relever coordonnées victime",
      },
      {
        id: "personne-sous-rame",
        title: "Personne engagée sous la rame",
        refs: "4.2-C · p. 63",
        memo: [
          "Arrêt, feu détresse, FS, urgence avant coupure batterie",
          "Pantographe bas et dé-préparer si victime sous rame, informer clients, protéger blessé",
          "Secours, CONSTAT CORPOREL + ACCIDENT B au PCC, feuille de route",
        ],
        note: "Victime sous tramway : seuls les Pompiers déplacent la rame",
      },
      {
        id: "agression-conducteur",
        title: "Agression ou malaise du conducteur",
        refs: "4.2-D · p. 64",
        memo: [
          "Arrêt, feu détresse, FS, appel détresse, informer clients si possible",
        ],
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
        title: "Déraillement de la rame",
        refs: "4.3 · p. 64",
        memo: [
          "Arrêt, feu détresse, urgence, informer clients",
          "Pantographe bas après contrôle LAC, évacuation après accord PCC",
          "Dé-préparer rame, triangle pré-signalisation, secours",
        ],
        note: "Interdit au conducteur de tenter un ré-enraillement",
      },
      {
        id: "voyageur-malaise",
        title: "Malaise, agression ou chute d'un voyageur",
        refs: "4.4-A · p. 65",
        memo: [
          "Urgence, arrêt de préférence en station, feu détresse",
          "KC retirée, cabine fermée, assistance à la personne",
          "Rappeler PCC après évaluation, témoins, secours si besoin, feuille de route",
        ],
      },
      {
        id: "bris-vitre",
        title: "Bris de vitre",
        refs: "4.4-B · p. 66",
        memo: [
          "Arrêt en station si possible, feu détresse, urgence",
          "Pas de blessé, éloigner clients de la vitre brisée",
          "Informer PCC, attendre ordres évacuation ou fin course, feuille de route",
        ],
      },
      {
        id: "incident-pare-brise",
        title: "Incident de pare-brise",
        refs: "4.4-C · p. 66",
        memo: [
          "Arrêt en station si possible, feu détresse, urgence, informer clientèle",
          "Évacuer la rame, informer PCC fin évacuation, attendre ordres, feuille de route",
        ],
      },
      {
        id: "incendie-bord",
        title: "Incendie à bord",
        refs: "4.4-D · p. 67",
        memo: [
          "Arrêt, feu détresse, évacuer voyageurs cf. 4.7-B ou 4.7-D",
          "Urgence, évaluer sinistre, pantographe bas, dé-préparer, personne restée à bord",
          "Extincteurs, secours",
        ],
        note: "Même consignes incendie au remisage · Après incendie : pas de pantographe sans accord PCC",
      },
      {
        id: "colis-suspect-bord",
        title: "Colis suspect à bord (Vigipirate)",
        refs: "4.4-E · p. 68",
        memo: [
          "Prudence, ne pas toucher ni déplacer colis suspect",
          "Repéré au changement de loge : urgence PCC avec nature et emplacement",
          "Signalé en ligne : identifier objet, enquêter propriétaire, consignes PCC",
          "Liaison HS : évacuer, rejoindre terminus à pied, périmètre si stationné en tiroir",
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
        title: "Colis suspect aux abords de la voie",
        refs: "4.5-A · p. 69",
        memo: [
          "Prudence, ne pas toucher ni déplacer colis suspect",
          "Alerte bombe : arrêt, feu détresse, suivre instructions PCC ou Police",
          "Ordre d'évacuer : prévenir clientèle, évacuation cf. 4.7-B, Police et compte rendu PCC",
        ],
      },
      {
        id: "chute-lac",
        title: "Chute de la LAC et risques électriques",
        refs: "4.5-B · p. 70",
        memo: [
          "Arrêt, feu détresse, urgence, interdire descente aux clients",
          "Pantographe bas, dé-préparer, attendre ordre PCC pour faire descendre",
          "Descente côté moindre risque, entrevoie seulement après accord PCC",
        ],
        note: "Panne pantographe : interdit monter en toiture · Même consignes chute arbre sur voie ou rame",
      },
      {
        id: "inondation-voie",
        title: "Inondation de la voie",
        refs: "4.5-C · p. 71",
        memo: [
          "Moins de 10 cm : franchir en conduite manœuvre à 5 km/h, informer PCC",
          "Plus de 10 cm repère rouge : arrêt, feu détresse, urgence, consignes PCC, informer voyageurs",
          "Évacuation longue immobilisation : PMR et enfants peuvent rester à bord si assistance extérieure souhaitée",
        ],
      },
      {
        id: "accident-plateforme",
        title: "Accident plate-forme ou chute sur voie",
        refs: "4.5-D · p. 72",
        memo: [
          "Arrêt, feu détresse, urgence, informer clients",
          "Porter secours, protéger blessés, éviter un autre accident",
          "Informer PCC dès reprise possible, feuille de route",
        ],
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
        title: "Anomalies imposant l'arrêt",
        refs: "4.6-A · p. 73",
        memo: [
          "Dans tous les cas : arrêter rame et appeler PCC",
          "LAC endommagée ou détendue, tendeur cassé, potence affaissée",
          "Corps étranger voie ou aiguillage, affaissement voie, pavés soulevés",
          "SIG illisible, conducteur absent au croisement, individu accroché à rame",
        ],
      },
      {
        id: "anomalies-sans-arret",
        title: "Anomalies sans arrêt immédiat",
        refs: "4.6-B · p. 73",
        memo: [
          "Dans tous les cas : prévenir impérativement PCC sans arrêt immédiat",
          "Feux éteints autre rame, anomalies autre rame, objet accroché à rame",
          "Comportement suspect plate-forme, barrières détériorées, arbre menaçant, voiture sur voie",
        ],
      },
    ],
  },
  {
    id: "immobilisation-evacuation",
    chapter: "urgence",
    title: "Immobilisation et évacuation",
    common: [
      "Immobilisation : feu détresse ou triangle si panne, urgence, informer clients",
      "Évacuation après accord PCC, sauf incendie ou force majeure, côté droit sens marche, descendre le 1er, fin : prévenir PCC",
    ],
    entries: [
      {
        id: "immobilisation-voie",
        title: "Immobilisation en pleine voie",
        refs: "4.7-A · p. 74",
        memo: [
          "Feu détresse ou triangle si panne",
          "Urgence",
          "Informer clientèle",
        ],
      },
      {
        id: "immobilisation-tunnel",
        title: "Immobilisation dans le tunnel",
        refs: "4.7-C · p. 75",
        memo: [
          "Feu détresse ou triangle si panne",
          "Urgence, appel détresse si pas de réponse PCC",
          "Informer clientèle",
        ],
      },
      {
        id: "evacuation-voie",
        title: "Évacuation en pleine voie",
        refs: "4.7-B · p. 74",
        memo: [
          "Après accord PCC : informer clients, ouvrir porte côté droit sens marche",
          "Descendre le 1er, vérifier absence de danger, aider voyageurs en difficulté",
          "Prévenir PCC fin évacuation, noter feuille de route",
        ],
        note: "Incendie ou force majeure : évacuer sans accord PCC · Danger côté droit : entrevoie après autorisation PCC · VU Sabines ou Sablassou : cheminement piéton + bus",
      },
      {
        id: "evacuation-tunnel",
        title: "Évacuation dans le tunnel",
        refs: "4.7-D · p. 75",
        memo: [
          "Après accord PCC : informer clients, ouvrir porte côté droit sens marche",
          "Descendre le 1er, vérifier absence de danger, aider voyageurs, diriger vers sortie la plus proche",
          "Prévenir PCC fin évacuation, noter feuille de route",
        ],
        note: "Incendie ou force majeure : évacuer sans accord PCC · Danger côté droit : entrevoie après autorisation PCC",
      },
    ],
  },
];
