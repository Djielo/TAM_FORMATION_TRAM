/**
 * RCT EXP-CSG-01-17 — consultation intégrale (pages 1–76).
 * Texte mot pour mot depuis les scans RCT (docs/rct-img/00X.jpg)
 */

import {
  RCT_LECTURE_CH2_SECTIONS,
  RCT_LECTURE_CH2_TOC,
} from "./data-rct-lecture-ch2.js";
import {
  RCT_LECTURE_CH3_SECTIONS,
  RCT_LECTURE_CH3_TOC,
} from "./data-rct-lecture-ch3.js";
import {
  RCT_LECTURE_CH4_SECTIONS,
  RCT_LECTURE_CH4_TOC,
} from "./data-rct-lecture-ch4.js";

/** @typedef {{ type: string, text?: string, items?: string[], caption?: string, src?: string }} LectureBlock */
/** @typedef {{ id: string, level: number, code: string | null, page: number | null, title: string, blocks: LectureBlock[] }} LectureSection */

/** Chemin d'un scan dans docs/rct-img/ (ex. /rct-img/002.jpg). */
export function rctImageSrc(filename) {
  const prefix = globalThis.__RCT_IMG_PREFIX__ || "/rct-img/";
  const name = String(filename || "")
    .replace(/^\/+/, "")
    .split(/[?#]/)[0];
  const bust = globalThis.__RCT_BUST__;
  const q = bust ? `?v=${encodeURIComponent(bust)}` : "";
  return `${prefix}${encodeURI(name)}${q}`;
}

/** @type {LectureSection[]} */
export const RCT_LECTURE_SECTIONS = [
  {
    id: "p01",
    level: 0,
    code: null,
    page: 1,
    title: "Page de titre",
    blocks: [
      { type: "page-scan", src: "001.jpg", caption: "Page 1/76 — EXP-CSG-01-17-RCT" },
      { type: "p", text: "CONSIGNES D'EXPLOITATION TRAMWAY – EXP / CSG / 01 / 17" },
      { type: "doc-title", text: "REGLEMENT DE CIRCULATION" },
      { type: "p", text: "(à l'attention des conducteurs)" },
      { type: "h", text: "PARTICIPANTS" },
      { type: "p", text: "DEX :" },
      { type: "p", text: "SILBERZAHN N." },
      { type: "p", text: "GIBELY D." },
      { type: "p", text: "MARQUET L." },
      { type: "h", text: "OBJECTIFS" },
      { type: "p", text: "Descriptif de l'ensemble des consignes d'exploitation relatives :" },
      { type: "p", text: "- à la conduite des rames de tramway sur le réseau de TaM." },
      {
        type: "p",
        text: "- à la gestion des accidents et incidents graves, par le conducteur d'une rame de tramway",
      },
      {
        type: "p",
        text: "Ce document est diffusé à l'ensemble des conducteurs et des agents de maîtrise Exploitation. Il fait partie intégrante du « Règlement de Sécurité de l'Exploitation » approuvé par les services de l'Etat et fait l'objet de mises à jour régulières.",
      },
      { type: "p", text: "Directions concernées :" },
      { type: "p", text: "01 - 03 - 06" },
      { type: "h", text: "SOMMAIRE" },
      {
        type: "table",
        headers: ["SOMMAIRE", "PAGES"],
        rows: [
          ["1. UTILISATION DU MATERIEL ROULANT", "3"],
          ["2. RESPECT DE LA SIGNALISATION", "20"],
          ["3. CONSIGNES DE CIRCULATION EN LIGNE", "38"],
          ["4. CONSIGNES D'URGENCE", "59"],
          ["5. ANNEXES", "76"],
        ],
      },
      { type: "p", text: "Visas de validation" },
      { type: "p", text: "Le Directeur Général :" },
      {
        type: "table",
        headers: ["01/DEX", "02/DTP", "03/DRH", "04/DMD", "05/DSI", "06/R.S.D.F"],
        rows: [
          ["N. SILBERZAHN", "", "T.CASTELLO", "", "", "M.WAUTERS"],
          ["", "", "", "", "", ""],
          ["", "", "", "", "", ""],
        ],
      },
      {
        type: "p",
        text: "Document strictement à usage interne - Toute communication externe exige l'accord formel du Directeur Général",
      },
    ],
  },
  {
    id: "p02",
    level: 0,
    code: null,
    page: 2,
    title: "Tableau de mise à jour du RCT",
    blocks: [
      { type: "page-scan", src: "002.jpg", caption: "Page 2/76 — Liste des évolutions" },
      { type: "h", text: "Tableau de mise à jour du RCT (versions)" },
      { type: "h", text: "Liste des évolutions" },
      {
        type: "version-table",
        headers: ["Version", "Date de mise à jour", "Nature de la modification"],
        entries: [
          {
            version: "V10",
            date: "30/11/2012",
            lines: [
              { text: "Modification des INDES Gare et Galerie Mistral", art: "art.2.2.B et 2.4.1" },
              { text: "Modifications de la zone de manœuvre Corum", art: "art. 2.4.2" },
              { text: "Rappel Vitesse autorisée à Gare et Corum 10 Km/h", art: "art. 2.5" },
              { text: "Durée de validité de l'habilitation multi-ligne", art: "art. 3.1.A" },
              {
                text: "Deuxième arrêt obligatoire sur quais à 2 positions et spécificité quai Corum L1V2",
                art: "art. 3.7.C",
              },
              { text: "Précision du signalement en cas de blessé", art: "art. 4.2.B" },
            ],
          },
          {
            version: "V11",
            date: "28/02/2013",
            lines: [
              { text: "Pose des nouveaux INDES Gare", art: "art. 2.4.1" },
              {
                text: "Précision sur les modes de freinage autorisés en convoi (remorquage-poussage)",
                art: "art. 1.9",
              },
            ],
          },
          {
            version: "V12",
            date: "3/11/2014",
            lines: [
              {
                text: "Modification de consigne de vitesse maxi en ouverture de voie -40 Km/h au lieu de 30 Km/h",
                art: "art. 2.5 A tableau",
              },
              {
                text: "Rappel de consigne sur les sections à voie unique -franchissement des appareils de voie",
                art: "art. 3.2 C",
              },
              {
                text: "Précisions sur la gestion d'un tirage de poignée pour éviter une ouverture côté entrevoie",
                art: "art. 3.7",
              },
            ],
          },
          {
            version: "V13",
            date: "10/04/2016\n06/01/2017",
            lines: [
              { text: "Modifications liées à la mise en service de la ligne 4 bouclée" },
              { text: "Nouvelle configuration de la zone Albert 1er", art: "Zone Spécifique art. 2.4.2" },
              {
                text: "Précisions sur les consignes de dé-préparation en ligne conformément à la note de consigne du 15/02/16",
                art: "art. 1.2.1",
              },
              { text: "Recommandation liée au passage des IS -passage au neutre", art: "art. 3.2" },
              { text: "Complément au tableau des limitations de vitesse -chasse-corps", art: "art.2.5" },
              { text: "Actualisation des consignes en cas de panne de phonie", art: "art. 3.9.B" },
              {
                text: "Actualisation des distances de sécurité en circulation -cas des troncs communs avec vitesse limite inférieure à 30 Km/h",
                art: "art.3.6",
              },
              { text: "Actualisation des consignes Colis Suspect", art: "art. 4.4.E et 4.5" },
              { text: "Précision sur consignes de rebroussement sur VU", art: "art.3.2.E3" },
              {
                text: "Autorisation donnée de descendre de la rame pour action au BS sans appel préalable du PCC",
                art: "art.3.1.C",
              },
            ],
          },
          {
            version: "V14",
            date: "31/05/2017\n13/10/2017\n23/02/2018",
            lines: [
              {
                text: "Nouvelle configuration de la zone Corum à compter du 21/08/2017",
                art: "Zone Spécifique art 2.4.2",
              },
              { text: "Mention du panneau \"Limite de Manœuvre\"", art: "art. 2.6" },
              { text: "Précisions sur la gestion des appels phonie", art: "art. 3.1.C" },
              { text: "Suppression des mentions sur le PN40 L.2", art: "art. 2.3" },
              { text: "Contrôle visuel du pantographe suite à perte de tension", art: "art. 1.7" },
            ],
          },
          {
            version: "V15",
            date: "31/10/2018",
            lines: [
              { text: "Précisions sur le Retournement en ligne", art: "art. 3.2.E1" },
              { text: "et sur la Relève en ligne", art: "art. 3.1" },
            ],
          },
          {
            version: "V16",
            date: "06/11/2019",
            lines: [
              { text: "Précisions sur préparation des rames", art: "art. 1.1" },
              { text: "Précisions sur la gestion de la veille automatique", art: "art. 1.6" },
              { text: "Mention saisie signalements MR via SAT", art: "art. 1.8 et 3.9" },
              {
                text: "Cas particuliers INDIR avec lampes flash, et clignotement lent losange",
                art: "art. 2.2",
              },
              { text: "Précisions sur mode dégradé feux routiers", art: "art. 2.3" },
            ],
          },
          {
            version: "V17",
            date: "01/10/2021",
            lines: [
              { text: "Précision du fonctionnel SMA", art: "art 2.2.E" },
              { text: "Simplification de la signalisation des panneaux temporaires", art: "art 2.6" },
              { text: "Intégration du SAT et annexe des signalements", art: "art 1.1 et 5.1" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "acronymes",
    level: 1,
    code: "Sigles",
    page: null,
    title: "Liste des abréviations",
    blocks: [
      { type: "page-scan", src: "Acronymes.jpg", caption: "Liste des abréviations RCT" },
      { type: "h", text: "LISTE DES ABREVIATIONS" },
      {
        type: "sigles",
        items: [
          "AEL = Armoire Electrique de Loge",
          "BM = Bogie moteur",
          "BP = Bogie porteur",
          "BPA = Bouton Poussoir à Accrochage",
          "BPI = Bouton Poussoir à Impulsion",
          "BPAL = Bouton Poussoir à Accrochage Lumineux",
          "BPIL = Bouton Poussoir à Impulsion Lumineux",
          "BT = Basse Tension",
          "CA = Courant Alternatif",
          "CMR = Communication Manuelle de Retournement",
          "CC = Caisse Centrale",
          "CVS = ConVertisseur Statique",
          "FMS = Freinage Maximal de Service",
          "FNS = Freinage Normal de Service",
          "FS = Freinage de Secours",
          "FU = Freinage d'Urgence",
          "HT = Haute Tension",
          "KC = Commutateur de Conduite",
          "M1 = Motrice 1",
          "M2 = Motrice 2",
          "MT = Moyenne Tension",
          "NM = Nacelle Motorisé",
          "NP = Nacelle Pantographe",
          "P.C.C = Poste de Commande Centralisé",
          "SAE = Service d'Aide à l'Exploitation",
          "SIE = Système Informatique Embarqué",
          "GLO = Gabarit Limite d'Obstacle",
          "V.U.T = Voie Unique Temporaire",
        ],
      },
    ],
  },
  {
    id: "p03",
    level: 1,
    code: "1",
    page: 3,
    title: "Sommaire — chapitre 1",
    blocks: [
      { type: "page-scan", src: "003.jpg", caption: "Page 3/76" },
      {
        type: "sommaire-ch1",
        entries: [
          {
            title: "1.1 - PREPARATION DE LA RAME",
            page: 4,
            subs: [
              "A - Entrée dans la rame, côté droit par la porte de service",
              "B - Test de la cabine de queue",
              "C - Test Pupitre gauche et console",
              "D - Test Pupitre droit",
              "E - Vérifications à l'intérieur de la rame",
              "F - Test de la cabine de tête",
              "G - Vérifications extérieures de la rame",
              "H - Préparation de la sortie",
            ],
          },
          { title: "1.2 - DE-PREPARATION DE LA RAME", page: 10 },
          {
            title: "1.3 - UTILISATION DU SIE (SYSTEME INFORMATIQUE EMBARQUE)",
            page: 12,
          },
          {
            title: "1.4 - UTILISATION DES SYSTEMES DE FREINAGE",
            page: 13,
            subs: [
              "A - Utilisation du frein d'urgence (FU)",
              "B - Utilisation du frein de secours (FS)",
            ],
          },
          { title: "1.5 - UTILISATION DES SABLIERES", page: 15 },
          { title: "1.6 - UTILISATION DE LA VEILLE AUTOMATIQUE", page: 15 },
          { title: "1.7 - CONSTAT D'ANOMALIES SUR LE MATERIEL ROULANT", page: 16 },
          {
            title: "1.8 - PANNES DU MATERIEL ROULANT",
            page: 16,
            subs: [
              "A - Remorquage - Poussage",
              "B - Haut Le Pied",
              "C - Fin de Tour",
              "D - Fin de Journée",
              "Consignes particulières",
            ],
          },
          { title: "1.9 - PROCEDURE DE REMORQUAGE/ POUSSAGE", page: 19 },
        ],
      },
    ],
  },
  {
    id: "s-1-1",
    level: 2,
    code: "1.1",
    page: 4,
    title: "PREPARATION DE LA RAME",
    blocks: [
      { type: "page-scan", src: "004.jpg", caption: "Page 4/76 — § 1.1" },
      { type: "rct-section", text: "1.1 - PREPARATION DE LA RAME" },
      {
        type: "p",
        text: "La préparation de la rame est une étape primordiale et obligatoire de la conduite d'un tramway. Elle permet au conducteur en début de service de prendre contact avec le matériel, de déceler d'éventuelles anomalies et d'éviter ainsi des pannes ultérieures sur la ligne.",
      },
      {
        type: "p",
        parts: [
          {
            t: "Un conducteur prenant une rame au dépôt est dispensé de la préparation si cette opération a été effectuée par un autre agent habilité à le faire (y compris les jockeys), ou lorsque la rame a déjà roulé le matin, pour ce qui concerne les prises de service au dépôt en cours de journée ",
          },
          {
            t: "(dans ce cas, absence de temps de préparation mentionné sur la planchette).",
            red: true,
          },
        ],
      },
      {
        type: "p",
        text: "La préparation de la rame permet notamment de vérifier le bon état des cabines de conduite, le bon fonctionnement des servitudes, commandes et voyants, le bon fonctionnement des lampes témoins et le fonctionnement des avertisseurs sonores, la propreté du compartiment voyageurs (état des sièges et des vitres) et l'extérieur de la rame.",
      },
      { type: "p", text: "Elle comporte aussi le contrôle de la présence des agrès :" },
      {
        type: "ul",
        items: [
          "manivelle pantographe,",
          "2 cales en bois, qui servent à maintenir une rame dont les freins auraient été isolés,",
          "triangle de pré-signalisation,",
          { text: "L'autocollant -non déchiré- sur le voussoir concerné atteste de la présence des agrès.", red: true },
          "barres d'aiguillages,",
          "extincteur Co2 qui pourra être utilisé pour combattre le feu (après avoir abaissé le pantographe),",
          "consignes d'exploitation.",
        ],
      },
      {
        type: "warning",
        text: "Tous signalements majeurs ou pouvant avoir un impact potentiel sur la sécurité doit faire l'objet d'un appel immédiat au PCC. Les autres types de signalements seront tracés via le SAT (Système des Avaries Techniques).",
        suffix: "Cf Annexe 5.1 : Sommaire des codes.",
      },
      { type: "rct-lead", text: "Les différentes étapes de la préparation de la rame sont les suivantes :" },
      { type: "anchor", id: "s-1-1-a" },
      { type: "rct-sub", text: "A - Entrée dans la rame, côté droit par la porte de service :" },
      {
        type: "steps",
        items: [
          "Actionner, à l'aide de la clé de service, le dispositif de verrouillage-déverrouillage de la porte et ouvrir la porte de service.",
          "Remettre dans sa disposition initiale le dispositif de verrouillage-déverrouillage de la porte de service et monter dans la rame.",
          {
            text: "Vérifier la présence du 24V, si absence du 24 V : remise en service de la batterie en actionnant le commutateur situé dans le voussoir ",
            tail: { text: "Sur le Citadis 402, le commutateur est situé sur l'AEL" },
          },
          "prendre la clé KC, refermer la porte manuellement et traverser la rame pour aller dans la loge de queue.",
        ],
      },
      { type: "page-scan", src: "005.jpg", caption: "Page 5/76" },
      { type: "anchor", id: "s-1-1-b" },
      { type: "rct-sub", text: "B - Test de la cabine de queue :" },
      {
        type: "steps",
        items: [
          "Appuyer sur le bouton éclairage cabine.",
          "Mettre la clé dans le commutateur de conduite sur P.",
          "Vérifier la position des commutateurs et des voyants plombés.",
          "Vérifier la présence des agrès cabine.",
          "Vérifier l'initialisation du SIE : allumage du voyant « rame en service ».",
          "Tourner la clé du commutateur de conduite sur CN.",
          [
            "Vérifier le fonctionnement des voyants de contrôle (allumage pendant 5 sec.) :",
            "Liste des voyants de contrôle :",
            "✓ le voyant blanc du bouton poussoir à impulsion du sablage,",
            "✓ le voyant vert portes ouvertes du pupitre,",
            "✓ le voyant rouge descente pantographe de l'armoire électrique de la loge,",
            "✓ le voyant rouge défaut frein du pupitre,",
            "✓ le voyant rouge vitesse limitée du pupitre.",
          ],
          "Accrocher le bouton poussoir éclairage salle voyageurs.",
          {
            text: 'Appuyer sur l\'onglet "état de train" de l\'écran SIE et vérifier :',
            lines: [
              { check: "cabine en service," },
              { check: "pantographe," },
              { check: "disjoncteur," },
              { check: "présences tension", tail: { text: "(sauf sur 402)." } },
            ],
          },
        ],
      },
      { type: "page-scan", src: "006.jpg", caption: "Page 6/76" },
      { type: "anchor", id: "s-1-1-c" },
      { type: "rct-sub", text: "C - Test Pupitre gauche et console :" },
      {
        type: "steps",
        items: [
          "Test bouton poussoir à accrochage lumineux : dégivrage du pare-brise.",
          "Test bouton poussoir à impulsion lumineux : interphonie cabine + essai micro.",
          "Test bouton poussoir à impulsion : sonnerie.",
          "Test bouton poussoir à accrochage : luminosité des moniteurs de rétrovision et vérification du fonctionnement des moniteurs.",
          "Test bouton poussoir à impulsion : lave-glace (Citadis 401 uniquement).",
          "Test commutateur : essuie-glaces (Citadis 401 uniquement).",
          "Test commutateur : signalisation extérieure.",
          'Appel PCC dans la loge de départ "Test Cabine M1 (ou M2)"',
        ],
      },
      { type: "page-scan", src: "007.jpg", caption: "Page 7/76" },
      { type: "anchor", id: "s-1-1-d" },
      { type: "rct-sub", text: "D - Test Pupitre droit :" },
      {
        type: "steps",
        items: [
          [
            "Appuyer sur le bouton poussoir à accrochage lumineux : déverrouillage des portes, et sur le bouton poussoir à accrochage lumineux : ouverture générale des portes",
            "Sur le Citadis 401 il faut sélectionner côté droit et côté gauche .",
          ],
          "S'assurer que toutes les portes sont ouvertes : sur les écrans de rétrovision, sur l'écran SIE, sur le voyant porte ouverte.",
          "Décrocher les boutons poussoir à accrochage lumineux des portes : vérifier le fonctionnement du BPI fermeture forcée et de l'annonce sonore.",
          "Test bouton poussoir à impulsion : cloche électrique (gong) et klaxon.",
          "Test bouton poussoir à impulsion : commande sonorisation salle voyageurs, et essai de la phonie.",
          "Test bouton poussoir à impulsion : commande klaxon.",
          "Test bouton poussoir à impulsion : commande phares.",
          "Test bouton poussoir à impulsion : freinage magnétique (patins), vérifier le pictogramme sur le SIE.",
          "Test commutateur : essuie-glaces (Citadis 302 uniquement).",
          "Positionner la clé du commutateur sur N, la retirer, et quitter la cabine en contrôlant le bon verrouillage de la porte de la cabine",
        ],
      },
      { type: "page-scan", src: "008.jpg", caption: "Page 8/76" },
      { type: "anchor", id: "s-1-1-e" },
      { type: "rct-sub", text: "E - Vérifications à l'intérieur de la rame :" },
      {
        type: "p",
        text: "Se diriger vers la cabine de départ (cabine de tête) en contrôlant :",
      },
      {
        type: "steps",
        items: [
          "Eclairage intérieur.",
          "Ventilation.",
          "Etat intérieur de la rame (propreté, siège...).",
          "Présence des agrès (cales, manivelles, triangle) dans le voussoir de la nacelle pantographe.",
          "Présence des cablôts dans les voussoirs.",
          "Etat des soufflets.",
          "Badger avant d'entrer dans la cabine.",
        ],
      },
      { type: "anchor", id: "s-1-1-f" },
      { type: "rct-sub", text: "F - Test de la cabine de tête :" },
      {
        type: "steps",
        items: [
          "Tests identiques à la cabine de queue.",
          "Mettre les feux de détresse.",
          "Mettre les feux de brouillard.",
          "Sélectionner cotés d'ouvertures droit et gauche en self service.",
          "Positionner le manipulateur sur FNS.",
          "Descendre de la rame par la porte de service.",
        ],
      },
      { type: "page-scan", src: "009.jpg", caption: "Page 9/76" },
      { type: "anchor", id: "s-1-1-g" },
      { type: "rct-sub", text: "G - Vérifications extérieures de la rame :" },
      {
        type: "steps",
        items: [
          "Eclairage (codes, veilleuse frontale, antibrouillard, feux de détresse, feux de gabarit, feux rouge, stops).",
          "Etat de la carrosserie (chocs, rayures, pièces engageant le gabarit).",
          "Vérifier s'il y a des fuites d'huile au niveau des bogies.",
          "Vérifier l'état des soufflets.",
          "Vérifier l'état général du pantographe (bras, cornes, carbone).",
        ],
      },
      {
        type: "warning",
        prefix: "Rappel :",
        text: "Toute anomalie constatée sur l'état de la rame doit être signalée au PCC.",
      },
      { type: "anchor", id: "s-1-1-h" },
      { type: "rct-sub", text: "H - Préparation de la sortie :" },
      {
        type: "steps",
        items: [
          "Remonter dans la rame par la porte de service.",
          [
            "Contrôler visuellement l'absence de verrouillage du chasse-corps :",
            {
              italic:
                "Cette opération doit être effectuée à chaque montée dans une nouvelle rame, dans chaque loge, y compris en cours de service.",
            },
          ],
          "Impulsion sur les BP pour supprimer les feux de détresse, antibrouillard, sélections d'ouverture de porte, et déverrouillage porte.",
          "Sélectionner le côté de service en appuyant sur le BPIL correspondant.",
          "Activer la rétrovision sur l'écran SIE (si elle n'est pas active).",
          "Renseigner la liste des vérifications techniques.",
          "Faire un appel radio sur le pupitre SAE pour demander l'autorisation de sortie et signaler les anomalies constatées au cours de la préparation.",
          "Rejoindre la zone d'injection en ligne et tester la télécommande d'aiguille et la balise Petrarque à la sortie du dépôt.",
        ],
      },
    ],
  },
  {
    id: "s-1-2",
    level: 2,
    code: "1.2",
    page: 10,
    title: "DE-PREPARATION DE LA RAME",
    blocks: [
      { type: "page-scan", src: "010.jpg", caption: "Page 10/76 — § 1.2.1" },
      { type: "anchor", id: "s-1-2-1" },
      { type: "rct-section", text: "1.2.1 - DE-PREPARATION DE LA RAME EN LIGNE" },
      {
        type: "warning",
        parts: [
          { t: "La dé-préparation d'une rame en ligne, hors dépôt, est possible " },
          { t: "uniquement sur autorisation du PCC", red: true, bold: true, underline: true },
          { t: ", et " },
          { t: "après évacuation de la clientèle", red: true, bold: true, underline: true },
          { t: " " },
          { t: "(les portes ne sont alors plus contrôlées)", italic: true },
        ],
      },
      {
        type: "p",
        parts: [
          { t: "En toutes circonstances, respectez scrupuleusement et dans l'ordre les consignes ci-dessous (" },
          { t: "risque de recul de la rame !", purple: true, bold: true },
          { t: ")" },
        ],
      },
      { type: "rct-sub", text: "Mise hors service en ligne :" },
      {
        type: "steps",
        items: [
          "Mettre le manipulateur sur Neutre",
          "Mettre la clé KC sur N",
          {
            text: "Actionner le FS",
            tail: {
              text: " (facultatif sur Citadis 302/402. Sur 302, ré-enclencher le DJ FS , y/c dans l'autre loge au changement suivant)",
              blue: true,
            },
          },
          "Appuyer sur le bouton poussoir à impulsion : Mise Hors Service.",
        ],
      },
      { type: "rct-sub", text: "Dé-préparation complète" },
      {
        type: "steps",
        items: ["Descente du pantographe", "Coupure batterie"],
      },
      {
        type: "warning",
        parts: [
          { t: "Le PCC ne peut l'autoriser qu'" },
          { t: "en terminus", bold: true, underline: true },
          { t: " (sauf impératif lié à une coupure de l'énergie sur la LAC), ceci afin d'" },
          { t: "éviter tout blocage de la ligne", bold: true, underline: true },
          { t: " en cas d'incident à la remise en service de la rame." },
        ],
      },
      { type: "page-scan", src: "011.jpg", caption: "Page 11/76 — § 1.2.2" },
      { type: "anchor", id: "s-1-2-2" },
      { type: "rct-section", text: "1.2.2 - DE-PREPARATION DE LA RAME POUR REMISAGE" },
      {
        type: "steps",
        items: [
          "Mettre le manipulateur sur Neutre",
          "Mettre la clé sur N (au dépôt, la clé KC reste dans la rame).",
          {
            text: "Appuyer sur le bouton poussoir : Descente Pantographe.",
            tail: {
              text: "Sur le Citadis 402, la commande peut être temporisée (refroidissement des moteurs de traction).",
              blue: true,
            },
          },
          "Compléter la feuille de route, kilomètres (et horaires).",
          "Appuyer sur le bouton poussoir à impulsion : Mise Hors Service.",
          "Fermer la porte de la loge.",
          {
            text: "Couper la batterie en actionnant le commutateur situé dans le voussoir (sauf en cas de nettoyage de la rame le soir, ce qui est le cas le plus fréquent).",
            tail: {
              text: "Sur le Citadis 402, la commande s'effectue depuis la loge (action temporisée, environ 2 mn)",
              blue: true,
            },
          },
          "Déverrouiller la porte simple d'accès voyageurs côté droit et ouvrir la porte, puis verrouiller et fermer.",
        ],
      },
    ],
  },
  {
    id: "s-1-3",
    level: 2,
    code: "1.3",
    page: 12,
    title: "UTILISATION DU SIE (SYSTEME INFORMATIQUE EMBARQUE)",
    blocks: [
      { type: "page-scan", src: "012.jpg", caption: "Page 12/76 — § 1.3" },
      { type: "rct-section", text: "1.3 - UTILISATION DU SIE (SYSTEME INFORMATIQUE EMBARQUE)" },
      {
        type: "p",
        text: "Un écran tactile situé sur le pupitre de chaque cabine de conduite, permet d'aider le conducteur dans sa mission de conduite en lui apportant les informations nécessaires à la conduite liées à l'état de la rame, notamment :",
      },
      {
        type: "sie-cycle",
        items: [
          "Présence ou absence tension ligne",
          "Etat du dispositif de protection et d'isolement HT",
          "Etat des portes et côté de service sélectionné",
          "Action voyageur (appel phonie et poignée d'alarme)",
          "Etat d'affichage de la girouette",
        ],
      },
      {
        type: "p",
        text: "L'écran SIE indique au conducteur les défaillances de la rame, leurs origines, leurs localisations en le guidant dans les actions curatives nécessaires à la poursuite de la mission, et en lui signalant des limitations de vitesse spécifiques à appliquer.",
      },
      {
        type: "warning",
        lines: [
          {
            parts: [{ t: "En cas d'alerte :", red: true, bold: true, underline: true }],
          },
          {
            text: "Le conducteur doit agir conformément aux prescriptions du SIE et aux consignes (voir chapitre 1.8), en accord avec les instructions transmises par le PCC.",
            italic: true,
          },
        ],
      },
    ],
  },
  {
    id: "s-1-4",
    level: 2,
    code: "1.4",
    page: 13,
    title: "UTILISATION DES SYSTEMES DE FREINAGE",
    blocks: [
      { type: "page-scan", src: "013.jpg", caption: "Page 13/76 — § 1.4" },
      { type: "rct-section", text: "1.4 - UTILISATION DES SYSTEMES DE FREINAGE" },
      {
        type: "p",
        parts: [
          { t: "On distingue " },
          { t: "5 modes de freinage", underline: true },
          { t: " :" },
        ],
      },
      {
        type: "freinage-modes",
        items: [
          "1. Le freinage normal de service (FNS) qui assure les décélérations courantes.",
          "2. Le freinage d'urgence (FU) qui correspond à un effort calculé pour une décélération d'urgence. Il est commandé automatiquement par l'ouverture d'une boucle de sécurité ou manuellement par le conducteur (fin de course du manipulateur). Ce frein est non modulable par l'agent de conduite.",
          "3. Le frein de secours (FS), qui est commandé par un bouton poussoir à disposition de l'agent de conduite. L'action sur ce frein (appui de type « coup de poing ») est non modulable, sans antipatinage, et provoque l'ouverture du disjoncteur.",
          "4. Le frein d'immobilisation est assuré par le frein de service. Il garantit l'immobilisation du véhicule en station, lors des arrêts dans les rampes et lors des abandons de cabine.",
          "5. Le frein de parking, appliqué lorsque le véhicule est dé-préparé. Ce frein inépuisable est capable de maintenir un véhicule en charge et en pente.",
        ],
      },
      {
        type: "p",
        parts: [
          { t: "Les trois premiers modes sont à la disposition de l'agent de conduite.", purple: true, bold: true, italic: true },
        ],
      },
      {
        type: "p",
        parts: [{ t: "Les modes 4 et 5 sont automatiques.", purple: true, bold: true, italic: true }],
      },
      { type: "page-scan", src: "014.jpg", caption: "Page 14/76 — § 1.4 A–C" },
      { type: "anchor", id: "s-1-4-a" },
      { type: "rct-sub", text: "A - Utilisation du freinage d'urgence (FU) :" },
      {
        type: "p",
        parts: [
          { t: "Le freinage d'urgence doit être employé dans toute situation de " },
          { t: "danger immédiat", bold: true },
          { t: ", mais " },
          { t: "uniquement dans ce cas", italic: true },
          { t: " car les conséquences d'un freinage d'urgence peuvent être la chute de voyageurs à l'intérieur de la rame (surtout à basse vitesse) et l'usure anormale des roues." },
        ],
      },
      {
        type: "p",
        text: "La procédure de freinage d'urgence déclenche la mise en œuvre simultanée des trois systèmes de freinage : électrique, mécanique et électromagnétique, et ce jusqu'à l'arrêt complet du tramway.",
        italic: true,
      },
      {
        type: "p",
        text: "En cas d'utilisation d'un freinage d'urgence (FU), le conducteur doit le signaler au PCC en indiquant le motif et le noter sur sa feuille de route. Il doit s'assurer avant de repartir qu'aucun voyageur n'a été blessé lors du freinage (annonce salle).",
      },
      {
        type: "warning",
        tone: "red",
        text: "L'utilisation du FU n'entraine pas la chute du chasse-corps, celui-ci fonctionne seulement sur détection de la barre.",
      },
      { type: "anchor", id: "s-1-4-b" },
      { type: "rct-sub", text: "B - Utilisation du frein électromagnétique (patins)" },
      {
        type: "p",
        text: "En cas de mauvaise adhérence, pour faciliter le démarrage en côte, il est autorisé d'utiliser ponctuellement la commande des patins",
      },
      {
        type: "p",
        parts: [
          {
            t: "Cette recommandation ne s'applique pas en phase de freinage, car l'usage des patins peut provoquer un arrêt brutal de la rame dangereux pour les passagers.",
            purple: true,
            bold: true,
          },
        ],
      },
      { type: "anchor", id: "s-1-4-c" },
      { type: "rct-sub", text: "C - Utilisation du frein de secours (FS) :" },
      {
        type: "p",
        text: "La procédure par coup de poing déclenche les systèmes de freinage mécanique et électromagnétique (patins magnétiques), le frein de secours ne doit être utilisé :",
      },
      {
        type: "ul",
        items: [
          "Qu'en cas de défaillance des autres systèmes de freinage.",
          "Lorsque la rame est déjà arrêtée.",
          "Lorsqu'une personne est engagée sous la rame",
          "Dans toute situation d'arrêt d'urgence où le conducteur ne maitrise pas le comportement de la rame.",
        ],
      },
      {
        type: "p",
        text: "En situation d'urgence, une fois le frein d'urgence utilisé (FU), il est interdit d'avoir recours au frein de secours (FS) qui annule le freinage électrique et l'anti-patinage (risque de blocage des roues).",
      },
      {
        type: "p",
        text: "En cas d'utilisation du frein de secours pour stopper la rame, le conducteur doit le signaler au PCC et le noter sur sa feuille de route.",
      },
      {
        type: "p",
        parts: [
          { t: "En cas d'utilisation du FS à une vitesse de 70 Km/h, " },
          { t: "respecter impérativement une vitesse maximale de 40 Km/h pendant 10 mn après le déclenchement du FS.", purple: true, bold: true },
        ],
      },
    ],
  },
  {
    id: "s-1-5",
    level: 2,
    code: "1.5",
    page: 15,
    title: "UTILISATION DES SABLIERES",
    blocks: [
      { type: "page-scan", src: "015.jpg", caption: "Page 15/76 — § 1.5 et 1.6" },
      { type: "rct-section", text: "1.5 - UTILISATION DES SABLIERES" },
      {
        type: "p",
        parts: [
          {
            t: "Les bogies moteurs sont équipés de dispositifs de sablage destinés à augmenter l'adhérence des roues sur le rail de façon à limiter les risques d'enrayage. La fonction est automatique en phase de freinage.",
            purple: true,
          },
        ],
      },
      {
        type: "p",
        text: "Quand les circonstances l'exigent, l'utilisation des sablières (action sur le bouton poussoir) est recommandée, notamment en cas de manque d'adhérence -> rail glissant et gras, chutes de feuilles, verglas, neige, pluie fine.",
      },
    ],
  },
  {
    id: "s-1-6",
    level: 2,
    code: "1.6",
    page: 15,
    title: "UTILISATION DE LA VEILLE AUTOMATIQUE",
    blocks: [
      { type: "rct-section", text: "1.6 - UTILISATION DE LA VEILLE AUTOMATIQUE" },
      {
        type: "p",
        parts: [
          {
            t: "La veille automatique vise à prévenir tout danger en cas de malaise du conducteur, en provoquant l'arrêt de la rame.",
            purple: true,
          },
        ],
      },
      {
        type: "p",
        text: "Lors de la marche, le conducteur est tenu d'actionner régulièrement par appui / relâchement la veille du manipulateur de conduite sur les rames de type 401.",
      },
      {
        type: "note-red",
        text: "Sur les rames dotées de la veille à appui continu 302 et 402 (au 06/11/2019, toutes les rames de type 302), l'action de relâchement n'est plus impérative pour l'acquittement de la veille, entre 2 stations.",
      },
      {
        type: "p",
        text: "En cas de disfonctionnement, la consigne est l'arrêt à la station la plus proche.",
      },
      {
        type: "p",
        text: "Le conducteur doit alors mettre les feux de détresse, informer le PCC et informer la clientèle.",
      },
      {
        type: "warning",
        tone: "red",
        lines: [
          {
            text: "S'il y a lieu d'isoler la veille, cela ne peut se faire qu'en présence d'une personne autorisée à actionner le frein de secours d'un tramway au côté du conducteur, et après accord du PCC.",
          },
          {
            text: "Dans ce cas, la circulation en ligne doit se faire à une vitesse maximale de 40 km/h.",
          },
        ],
      },
    ],
  },
  {
    id: "s-1-7",
    level: 2,
    code: "1.7",
    page: 16,
    title: "CONSTAT D'ANOMALIES SUR LE MATERIEL ROULANT",
    blocks: [
      { type: "page-scan", src: "016.jpg", caption: "Page 16/76 — § 1.7 et 1.8" },
      { type: "rct-section", text: "1.7 - CONSTAT D'ANOMALIES SUR LE MATERIEL ROULANT" },
      { type: "p", text: "En cas de :" },
      {
        type: "ul",
        items: [
          "Vibrations anormales au niveau d'un bogie ou des articulations",
          "Cache bogie ouvert",
          "Pantographe détérioré",
        ],
      },
      {
        type: "warning",
        tone: "red",
        text: "Le conducteur doit impérativement arrêter sa rame et appeler le PCC qui lui donnera la consigne à suivre.",
      },
      { type: "p", text: "En cas de :" },
      {
        type: "ul",
        items: ["Perte de tension (à ne pas confondre avec de simples micro-coupures)"],
      },
      {
        type: "warning",
        tone: "red",
        lines: [
          {
            parts: [
              { t: "Le conducteur doit impérativement sortir pour " },
              { t: "contrôler visuellement l'état du pantographe", bold: true },
              { t: ", arrêt immédiat en toute sécurité." },
            ],
          },
          { text: "Appel du PCC pour rendre compte." },
          { text: "Risque d'accrochage de la LAC !", italic: true, blue: true },
        ],
      },
    ],
  },
  {
    id: "s-1-8",
    level: 2,
    code: "1.8",
    page: 16,
    title: "PANNES DU MATERIEL ROULANT",
    blocks: [
      { type: "rct-section", text: "1.8 - PANNES DU MATERIEL ROULANT & SIGNALEMENTS" },
      {
        type: "p",
        text: "(voir ci-dessous le tableau des consignes liées à chaque type de panne)",
        italic: true,
      },
      {
        type: "p",
        text: "Selon les différents cas de panne auxquels le conducteur peut être confronté, il doit :",
      },
      {
        type: "steps",
        items: [
          "Appliquer les consignes adaptées à chaque configuration de la rame.",
          "Agir en concertation avec le PCC qui peut adapter la consigne à suivre si nécessaire.",
          {
            text: "Se préparer au remorquage ou au poussage de la rame défaillante, dans le cas ou toutes les tentatives de remise en service ont échoué (",
            tail: { text: "voir consigne 1.9).", blue: true },
          },
        ],
      },
      {
        type: "warning",
        tone: "red",
        parts: [
          { t: "En cas de panne de la signalisation extérieure de la rame lors d'une immobilisation, y compris les feux de détresse, " },
          { t: "mettre le triangle de pré-signalisation", bold: true, underline: true },
          { t: " (agrès) environ 40 m avant la rame." },
        ],
      },
      {
        type: "page-scan",
        src: "017.jpg",
        caption: "Page 17/76 — Tableau pannes (format paysage)",
        landscape: true,
      },
      { type: "anchor", id: "s-1-8-a" },
      { type: "anchor", id: "s-1-8-b" },
      { type: "anchor", id: "s-1-8-c" },
      { type: "anchor", id: "s-1-8-d" },
      {
        type: "pannes-table",
        headers: [
          { title: "A- Remorquage/ Poussage", speed: "Vitesse max 20 Km/h" },
          { title: "B- Haut Le Pied" },
          { title: "C- Fin de Tour" },
          { title: "D- Fin de Journée" },
        ],
        rows: [
          [
            null,
            { text: "Défaillance de la console : SIE non opérationnel" },
            null,
            null,
          ],
          [
            { text: "Deux freins isolés", bold: true },
            null,
            {
              text: "Un frein isolé, ou défaut de mesure de charge :",
              speed: "Vitesse max 40 Km/h",
            },
            null,
          ],
          [
            { text: "ETF : Défaut ordre de marche M1, M2 et NM = ? ou isolé" },
            {
              text: "Défaut ETF Ou défaut manipulateur : 302 = M1 ou M2 isolé",
              speed: "Vitesse max 40 Km/h",
            },
            {
              text: "Défaut ETF : 401, 402 = M1, M2 ou NM isolé",
              speed: "Vitesse max 40 Km/h",
            },
            null,
          ],
          [
            null,
            {
              text: "Défaut boucle de sécurité (FU ou FS permanent) = Alimentation Directe",
              speed: "Vitesse max 25 Km/h",
            },
            {
              text: "Sablière vide, ou Défaut Roll Back",
              speed: "Vitesse max 40 Km/h",
            },
            null,
          ],
          [
            null,
            { text: "Portes impossible à condamner : « contrôle portes »" },
            { text: "Deux portes condamnées même côté" },
            null,
          ],
          [
            null,
            { text: "Défaut CVS : Perte 24V, batterie" },
            { text: "Défaut CVS : Perte 400V, climatisation", marker: "(*)" },
            null,
          ],
          [{ text: "Défaut ordre de marche" }, null, null, null],
          [
            null,
            { text: "Défaut porte cabine opposée" },
            { text: "Défaut porte cabine opposée : avec présence agent TaM" },
            null,
          ],
          [null, null, { text: "Défaut porte cabine sens de la marche" }, null],
          [
            null,
            {
              text: "Indicateur de vitesse hors service ou défaut centrale tachymétrique",
              speed: "Vitesse réduite",
            },
            {
              text: "Panne totale de phonie sur la rame et du tel. GSM de secours",
            },
            {
              text: "Discordance d'affichage de vitesse",
              speed: "(se référer au tachymètre)",
            },
          ],
        ],
      },
      {
        type: "page-scan",
        src: "018.jpg",
        caption: "Page 18/76 — Tableau pannes (suite, format paysage)",
        landscape: true,
      },
      {
        type: "pannes-table",
        headers: [
          { title: "A- Remorquage/ Poussage", speed: "Vitesse max 20 Km/h" },
          { title: "B- Haut Le Pied" },
          { title: "C- Fin de Tour" },
          { title: "D- Fin de Journée" },
        ],
        rows: [
          [
            null,
            null,
            { text: "Défaut de Gong", speed: "Vitesse max 20 Km/h" },
            null,
          ],
          [
            null,
            null,
            {
              text: "Défaut veille automatique : avec présence agent TaM",
              speed: "Vitesse max 40 Km/h",
            },
            null,
          ],
          [
            null,
            { text: "Défaut rétro-vision en quai" },
            { text: "Défaut rétro-vision en mode conduite" },
            null,
          ],
          [
            null,
            { text: "Défaut « Zone de dégagement de quai »" },
            { text: "Défaut interphonie voyageur (appel d'urgence)" },
            null,
          ],
          [
            null,
            null,
            { text: "Défaut signalisation sonore et lumineuse extérieure" },
            null,
          ],
          [
            null,
            { text: "Défaut essuie-glace", marker: "(*)" },
            { text: "Défaut essuie-glace", marker: "(*)" },
            { text: "Défaut essuie-glace", marker: "(*)" },
          ],
          [
            null,
            { text: "Défaut du dégivrage", marker: "(*)" },
            { text: "Défaut du dégivrage", marker: "(*)" },
            { text: "Défaut du dégivrage", marker: "(*)" },
          ],
          [
            null,
            {
              lines: [
                { text: "Bruit anormal au niveau du bogie ou de l'articulation", marker: "(**)" },
                { speed: "Vitesse réduite" },
              ],
            },
            {
              lines: [
                { text: "Bruit anormal au niveau du bogie ou de l'articulation", marker: "(**)" },
                { speed: "Vitesse réduite" },
              ],
            },
            null,
          ],
        ],
        footnotes: [
          "(*) Selon conditions climatiques",
          "(**) selon appréciation de la situation (dialogue CR/PCC)",
        ],
      },
    ],
  },
  {
    id: "s-1-9",
    level: 2,
    code: "1.9",
    page: 19,
    title: "PROCEDURE DE REMORQUAGE – POUSSAGE",
    blocks: [
      { type: "page-scan", src: "019.jpg", caption: "Page 19/76 — § 1.9" },
      { type: "rct-section", text: "1.9- PROCEDURE DE REMORQUAGE – POUSSAGE" },
      {
        type: "p",
        text: "Toute manœuvre de dépannage d'une rame par poussage ou remorquage doit s'effectuer sous le contrôle :",
      },
      {
        type: "ul",
        items: [
          "d'au moins une personne habilitée (Maîtrise Exploitation ou Maintenance), qui supervise l'opération,",
          "d'au moins un conducteur habilité",
        ],
      },
      {
        type: "p",
        text: "Les couplages autorisés sont les suivants : 402-402, 401-401, 302-302",
      },
      {
        type: "highlight",
        text: "Le couplage 302-402 ou 302-401 est autorisé sous réserve de pente < 5%",
      },
      {
        type: "p",
        text: "En cas de rame immobilisée en pente, la rame secourante devra se mettre en position de remorquage, c'est-à-dire devant la rame secourue dans le sens de la pente, ceci afin de procéder à la tension des barres d'accouplement sans avoir à effectuer une marche arrière en remontant le pente.",
      },
      { type: "rct-sub", text: "PREPARATION DE L'ACCOUPLEMENT" },
      {
        type: "p",
        text: "Le conducteur de la rame en panne est autorisé à faire les manœuvres préparatoires suivantes, dans l'attente de l'arrivée de la rame secourante et du superviseur habilité.",
      },
      {
        type: "prep-box",
        items: [
          "Mettre les feux de détresse.",
          "Fermer les portes (utiliser la porte de service pour descendre).",
          "Mettre la clé KC au neutre.",
          "Descendre le pantographe.",
          "Enclencher le BPI de mise hors service. Isoler la batterie .",
          { text: "Mettre le FS", underline: true, suffix: " du côté où l'attelage va être effectué." },
          "Enlever le carénage inférieur du côté où l'attelage va être effectué (cf. PCC).",
          "Extraire les goupilles.",
          "Sortir la barre d'accouplement",
          "Préparer le câblot (câblot dans le voussoir si accouplement 302 / 402 ou 401)",
          "Mettre le premier axe et sa goupille de sécurité pour immobiliser la barre en position sortie",
        ],
      },
      {
        type: "p",
        text: "Les mêmes manœuvres peuvent être effectuées sur la rame secourante dans l'attente de l'arrivée du superviseur habilité.",
      },
      {
        type: "p",
        parts: [
          { t: "ATTENTION", purple: true, bold: true },
          { t: " : ne jamais se positionner entre les deux rames lors des mouvements d'approche ou de tension des barres !", purple: true, bold: true },
        ],
      },
      {
        type: "warning",
        bullets: [
          "Pour la sécurité du convoi, la rame secourante doit être dans son état de fonctionnement nominal (pas de bogie isolé, pas d'avarie de freinage, pas de panne phonie),",
          "Lors du déplacement du convoi, les deux conducteurs doivent être en mesure de communiquer entre eux (= entre chaque rame), et de stopper le convoi à tout moment.",
        ],
        lines: [
          { text: "Vitesse maxi autorisée en convoi : 20 km/h", red: true },
          { text: "Il est interdit d'utiliser le FU ou la commande des patins en convoi :", bold: true },
          { text: "en cas d'urgence, utiliser le mode FMS ou le FS !", bold: true },
          {
            parts: [
              { t: "Attention", red: true, bold: true, underline: true },
              {
                t: " : sur une rame remorquée dont les freins ont été isolés mécaniquement à la pompe, l'action sur le FS sera inopérante !",
                red: true,
              },
            ],
          },
        ],
      },
    ],
  },
  ...RCT_LECTURE_CH2_SECTIONS,
  ...RCT_LECTURE_CH3_SECTIONS,
  ...RCT_LECTURE_CH4_SECTIONS,
];

/** Sommaire de navigation (ancres A–H sans article séparé). */
export const RCT_LECTURE_TOC = [
  { id: "p01", level: 0, code: null, page: 1, title: "Page de titre" },
  { id: "p02", level: 0, code: null, page: 2, title: "Tableau de mise à jour du RCT" },
  { id: "acronymes", level: 1, code: "Sigles", page: null, title: "Liste des abréviations" },
  { id: "p03", level: 1, code: "1", page: 3, title: "Sommaire — chapitre 1" },
  { id: "s-1-1", level: 2, code: "1.1", page: 4, title: "PREPARATION DE LA RAME" },
  {
    id: "s-1-1-a",
    level: 3,
    code: "A",
    page: null,
    title: "Entrée dans la rame, côté droit par la porte de service",
    anchorOnly: true,
    parentId: "s-1-1",
  },
  {
    id: "s-1-1-b",
    level: 3,
    code: "B",
    page: null,
    title: "Test de la cabine de queue",
    anchorOnly: true,
    parentId: "s-1-1",
  },
  {
    id: "s-1-1-c",
    level: 3,
    code: "C",
    page: null,
    title: "Test Pupitre gauche et console",
    anchorOnly: true,
    parentId: "s-1-1",
  },
  {
    id: "s-1-1-d",
    level: 3,
    code: "D",
    page: null,
    title: "Test Pupitre droit",
    anchorOnly: true,
    parentId: "s-1-1",
  },
  {
    id: "s-1-1-e",
    level: 3,
    code: "E",
    page: null,
    title: "Vérifications à l'intérieur de la rame",
    anchorOnly: true,
    parentId: "s-1-1",
  },
  {
    id: "s-1-1-f",
    level: 3,
    code: "F",
    page: null,
    title: "Test de la cabine de tête",
    anchorOnly: true,
    parentId: "s-1-1",
  },
  {
    id: "s-1-1-g",
    level: 3,
    code: "G",
    page: null,
    title: "Vérifications extérieures de la rame",
    anchorOnly: true,
    parentId: "s-1-1",
  },
  {
    id: "s-1-1-h",
    level: 3,
    code: "H",
    page: null,
    title: "Préparation de la sortie",
    anchorOnly: true,
    parentId: "s-1-1",
  },
  { id: "s-1-2", level: 2, code: "1.2", page: 10, title: "DE-PREPARATION DE LA RAME" },
  {
    id: "s-1-2-1",
    level: 3,
    code: "1.2.1",
    page: null,
    title: "Dé-préparation de la rame en ligne",
    anchorOnly: true,
    parentId: "s-1-2",
  },
  {
    id: "s-1-2-2",
    level: 3,
    code: "1.2.2",
    page: 11,
    title: "Dé-préparation pour remisage",
    anchorOnly: true,
    parentId: "s-1-2",
  },
  {
    id: "s-1-3",
    level: 2,
    code: "1.3",
    page: 12,
    title: "UTILISATION DU SIE (SYSTEME INFORMATIQUE EMBARQUE)",
  },
  {
    id: "s-1-4",
    level: 2,
    code: "1.4",
    page: 13,
    title: "UTILISATION DES SYSTEMES DE FREINAGE",
  },
  {
    id: "s-1-4-a",
    level: 3,
    code: "A",
    page: null,
    title: "Utilisation du freinage d'urgence (FU)",
    anchorOnly: true,
    parentId: "s-1-4",
  },
  {
    id: "s-1-4-b",
    level: 3,
    code: "B",
    page: null,
    title: "Utilisation du frein électromagnétique (patins)",
    anchorOnly: true,
    parentId: "s-1-4",
  },
  {
    id: "s-1-4-c",
    level: 3,
    code: "C",
    page: null,
    title: "Utilisation du frein de secours (FS)",
    anchorOnly: true,
    parentId: "s-1-4",
  },
  { id: "s-1-5", level: 2, code: "1.5", page: 15, title: "UTILISATION DES SABLIERES" },
  {
    id: "s-1-6",
    level: 2,
    code: "1.6",
    page: 15,
    title: "UTILISATION DE LA VEILLE AUTOMATIQUE",
  },
  {
    id: "s-1-7",
    level: 2,
    code: "1.7",
    page: 16,
    title: "CONSTAT D'ANOMALIES SUR LE MATERIEL ROULANT",
  },
  {
    id: "s-1-8",
    level: 2,
    code: "1.8",
    page: 16,
    title: "PANNES DU MATERIEL ROULANT",
  },
  {
    id: "s-1-8-a",
    level: 3,
    code: "A",
    page: 17,
    title: "Remorquage / Poussage (tableau)",
    anchorOnly: true,
    parentId: "s-1-8",
  },
  {
    id: "s-1-8-b",
    level: 3,
    code: "B",
    page: 17,
    title: "Haut Le Pied (tableau)",
    anchorOnly: true,
    parentId: "s-1-8",
  },
  {
    id: "s-1-8-c",
    level: 3,
    code: "C",
    page: 17,
    title: "Fin de Tour (tableau)",
    anchorOnly: true,
    parentId: "s-1-8",
  },
  {
    id: "s-1-8-d",
    level: 3,
    code: "D",
    page: 17,
    title: "Fin de Journée (tableau)",
    anchorOnly: true,
    parentId: "s-1-8",
  },
  {
    id: "s-1-9",
    level: 2,
    code: "1.9",
    page: 19,
    title: "PROCEDURE DE REMORQUAGE – POUSSAGE",
  },
  ...RCT_LECTURE_CH2_TOC,
  ...RCT_LECTURE_CH3_TOC,
  ...RCT_LECTURE_CH4_TOC,
];
