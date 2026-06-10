/**
 * RCT EXP-CSG-01-17 — chapitre 2 (pages 20–37).
 * Texte retranscrit depuis source/images/RCT/00X.jpg
 */

export const RCT_LECTURE_CH2_SECTIONS = [
  {
    "id": "p20",
    "level": 1,
    "code": "2",
    "page": 20,
    "title": "Sommaire — chapitre 2",
    "blocks": [
      {
        "type": "page-scan",
        "src": "020.jpg",
        "caption": "Page 20/76"
      },
      {
        "type": "sommaire-ch2",
        "chapter": "2. RESPECT DE LA SIGNALISATION",
        "entries": [
          {
            "title": "2.1 - FRANCHISSEMENT DES APPAREILS DE VOIE",
            "page": 21
          },
          {
            "title": "2.2 - SIGNALISATION LUMINEUSE",
            "page": 22,
            "subs": [
              "A - Le Signal Indicateur de Direction = INDIR",
              "B - Le Signal Indicateur de Destination = INDES",
              "C - Le Signal (ou feu) de Manœuvre = SM",
              "D - Le Signal d'Avertissement = SA",
              "E - Le Signal de Manœuvre et d'Avertissement = SMA",
              "F - Le Signal (ou feu blanc) de sortie de remisage",
              "G - Signal (ou feu) blanc d'anticipation",
              "H - Lampe flash et Avertisseur sonore",
              "I - Signal (ou feu) de présence tension",
              "J - Le Signal (ou Feu) de traversée routière"
            ]
          },
          {
            "title": "2.3 - CONSIGNES EN CAS DE PANNE DE LA SIGNALISATION LUMINEUSE",
            "page": 28
          },
          {
            "title": "2.4 - ZONES SPECIFIQUES : ZONES GARE, ALBERT 1er, CORUM",
            "page": 29
          },
          {
            "title": "2.5 - PANNEAUX FIXES DE SIGNALISATION",
            "page": 33,
            "subs": [
              "A - Vitesse autorisée",
              "B - Aiguillage/ télécommande d'aiguilles",
              "C - Clou de positionnement",
              "D - Panneaux Limite de manœuvre"
            ]
          },
          {
            "title": "2.6 - PANNEAUX TEMPORAIRES",
            "page": 37,
            "subs": [
              "A - Panneaux de chantier",
              "B - Panneaux d'Arrêt absolu"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "s-2-1",
    "level": 2,
    "code": "2.1",
    "page": 21,
    "title": "FRANCHISSEMENT DES APPAREILS DE VOIE",
    "blocks": [
      {
        "type": "page-scan",
        "src": "021.jpg",
        "caption": "Page 21/76"
      },
      {
        "type": "p",
        "text": "Le principe général de la marche à vue est que les conflits entre un tramway et tout autre véhicule en circulation sont gérés par signalisation lumineuse, sauf cas particulier (cf. zones spécifiques Gare, Albert 1er, Corum partie 2.4)."
      },
      {
        "type": "warning",
        "tone": "red",
        "text": "Tout feu éteint ou bloqué au rouge (y compris INDIR et INDES) fait l'objet d'un arrêt immédiat de la rame et d'un appel au PCC."
      },
      {
        "type": "rct-section",
        "text": "2.1 - FRANCHISSEMENT DES APPAREILS DE VOIE"
      },
      {
        "type": "p",
        "text": "Un aiguillage est un appareil de voie qui permet de changer de direction ou de voie. Pour tout franchissement d'un aiguillage, le conducteur est tenu de respecter les consignes spécifiques à ce type d'aiguillage."
      },
      {
        "type": "p",
        "text": "La signalisation de manœuvre permettant l'unité des mouvements doit être impérativement respectée (voir chapitre suivant 2.2)."
      },
      {
        "type": "p",
        "text": "Les aiguillages, qu'ils soient pris en pointe ou en talon, doivent être franchis à vitesse limitée : 15 Km/h en voie déviée, 40 Km/h en voie directe, 10 Km/h au dépôt."
      },
      {
        "type": "p",
        "text": "Cas particulier : 40 Km/h en voie directe ou déviée pour les aiguilles RFF de la voie unique Saint Jean de Vedas."
      },
      {
        "type": "note-red",
        "text": "Les appareils de voies motorisées ne sont pas talonnable."
      },
      {
        "type": "p",
        "text": "Lors de tout franchissement, le conducteur doit vérifier : la bonne programmation de direction ; l'état des feux et la position de l'INDIR (voir chapitre suivant) ; le bon placage des aiguilles."
      },
      {
        "type": "note-blue",
        "text": "En circulation en ligne, le conducteur doit toujours vérifier que l'aiguille qu'il va aborder par la pointe est en bonne position par rapport à l'itinéraire qui est tracé."
      },
      {
        "type": "warning",
        "tone": "red",
        "parts": [
          {
            "t": "Il est strictement interdit de :",
            "bold": true,
            "underline": true,
            "red": true
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          "Franchir un aiguillage entrebâillé car il y a risque de déraillement.",
          "Stationner sur un appareil de voie, sauf sur la zone de la Gare St Roch où les aiguilles sont sécurisées :"
        ]
      },
      {
        "type": "p",
        "text": "En cas de stationnement exceptionnel sur un appareil de voie talonnable, non renversable, toujours dégager complètement l'aiguillage en faisant circuler le tramway dans le sens du talonnage de l'aiguille, et ce jusqu'à la limite de manœuvre."
      },
      {
        "type": "p",
        "text": "La commande de changement de direction (par télécommande et/ou en mode dégradé) est décrite au chapitre 2.5.B",
        "italic": true
      }
    ]
  },
  {
    "id": "s-2-2",
    "level": 2,
    "code": "2.2",
    "page": 22,
    "title": "SIGNALISATION LUMINEUSE",
    "blocks": [
      {
        "type": "page-scan",
        "src": "022.jpg",
        "caption": "Page 22/76"
      },
      {
        "type": "rct-section",
        "text": "2.2 - SIGNALISATION FERROVIAIRE LUMINEUSE"
      },
      {
        "type": "p",
        "text": "On entend par signalisation ferroviaire lumineuse l'ensemble des informations données au conducteur par l'intermédiaire des feux lumineux disposés le long de la voie permettant au tramway d'effectuer des manœuvres protégées."
      },
      {
        "type": "p",
        "text": "Cette signalisation est présente en ligne et au dépôt pour assurer la sécurité de franchissement des aiguillages ou pour garantir la sécurité de zones de circulation à caractère dangereux en créant des cantonnements."
      },
      {
        "type": "anchor",
        "id": "s-2-2-a"
      },
      {
        "type": "rct-sub",
        "text": "A - Le Signal Indicateur de Direction = INDIR :"
      },
      {
        "type": "p",
        "text": "Ce signal est un témoin lumineux de position d'aiguille. Il indique la position du premier aiguillage rencontré, et si le placage des lames d'aiguille est correct."
      },
      {
        "type": "p",
        "text": "Il est composé de multipoints dont la couleur varie en fonction de l'indication qu'il donne :"
      },
      {
        "type": "signal-checks",
        "items": [
          {
            "lead": "Barre horizontale allumée en rouge :",
            "sub": "Arrêt absolu, franchissement interdit.",
            "color": "red"
          },
          {
            "lead": "Barre verticale allumée en vert :",
            "sub": "Passage autorisé, itinéraire en voie directe.",
            "color": "green"
          },
          {
            "lead": "Barre oblique allumée en jaune :",
            "sub": "Passage autorisé, itinéraire en voie déviée à gauche ou à droite selon l'inclinaison de la barre.",
            "color": "yellow"
          },
          {
            "lead": "Feu éteint :",
            "sub": "Arrêt absolu, franchissement interdit.",
            "color": "red"
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "023.jpg",
        "caption": "Page 23/76"
      },
      {
        "type": "anchor",
        "id": "s-2-2-b"
      },
      {
        "type": "rct-sub",
        "text": "B - Le Signal Indicateur de Destination = INDES :"
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Ce signal indique au conducteur sa destination en fonction de l'inscription qui apparait dans le signal multipoints par "
          },
          {
            "t": "un",
            "blue": true
          },
          {
            "t": " ou "
          },
          {
            "t": "deux chiffres",
            "blue": true
          },
          {
            "t": ", ou "
          },
          {
            "t": "par des lettres",
            "blue": true
          },
          {
            "t": "."
          }
        ]
      },
      {
        "type": "codes-dest",
        "title": "Zone Dépôt",
        "rows": [
          {
            "code": "L",
            "text": "Destination Lavage",
            "color": "green"
          },
          {
            "code": "A",
            "text": "Destination Atelier",
            "color": "green"
          },
          {
            "code": "S",
            "qualifier": "(entrée)",
            "text": "Destination Station Service",
            "color": "green"
          },
          {
            "code": "S",
            "qualifier": "(sortie)",
            "text": "Voie Sortie",
            "color": "green"
          },
          {
            "code": "P",
            "text": "Destination Passage",
            "color": "green"
          },
          {
            "code": "C",
            "text": "Voie de Contournement",
            "color": "green"
          },
          {
            "code": "I",
            "text": "Voie d'Interface",
            "color": "green"
          },
          {
            "code": "G",
            "text": "Garage",
            "color": "green"
          },
          {
            "code": "E",
            "text": "Voie Entrée",
            "color": "green"
          },
          {
            "code": "R",
            "text": "Destination Remisage",
            "color": "green"
          },
          {
            "code": "R",
            "qualifier": "(Sabines V2)",
            "text": "Retournement dans le tiroir",
            "color": "green"
          },
          {
            "code": "1 à 16",
            "text": "Remisage 1 à 16",
            "color": "blue"
          },
          {
            "code": "VU",
            "text": "Voie Unique",
            "color": "blue"
          },
          {
            "code": "V1",
            "text": "Voie 1",
            "color": "blue"
          }
        ]
      },
      {
        "type": "codes-cas",
        "left": {
          "title": "Cas particulier de la zone Gare St Roch",
          "ref": "Voir partie 2.4",
          "rows": [
            {
              "code": "MA",
              "text": "Direction Rue Maguelone",
              "color": "green"
            },
            {
              "code": "RO",
              "text": "Direction Rondelet",
              "color": "green"
            },
            {
              "code": "PL",
              "text": "Direction Pont de Lattes",
              "color": "green"
            },
            {
              "code": "OB",
              "text": "Direction Observatoire",
              "color": "green"
            },
            {
              "code": "AT",
              "textParts": [
                {
                  "t": "En attente = "
                },
                {
                  "t": "Arrêt",
                  "red": true
                }
              ],
              "color": "red"
            }
          ]
        },
        "right": {
          "title": "Cas particulier de la zone Galerie Mistral",
          "ref": "Voir partie 2.2 G",
          "rows": [
            {
              "code": "N",
              "text": "mode nominal, sans retournement"
            },
            {
              "code": "VU",
              "text": "mode retournement Corum – Galerie (ou Comédie) – Corum"
            },
            {
              "code": "RE",
              "text": "mode retournement Comédie – Galerie – Comédie"
            }
          ]
        }
      },
      {
        "type": "anchor",
        "id": "s-2-2-c"
      },
      {
        "type": "rct-sub",
        "text": "C - Le Signal (ou feu) de Manœuvre = SM :"
      },
      {
        "type": "p",
        "text": "La signalisation de manœuvre a pour objet de protéger les mouvements des tramways dans certaines zones de ligne où sont implantés des appareils de voie. Cette signalisation doit être respectée scrupuleusement, sauf consigne du PCC ou d'un agent de maîtrise habilité présent sur les lieux."
      },
      {
        "type": "p",
        "text": "Le signal SM est composé de 2 feux superposés, présentant :"
      },
      {
        "type": "signal-checks",
        "items": [
          {
            "lead": "Un T rouge en haut =",
            "sub": "Arrêt obligatoire, franchissement interdit.",
            "color": "red"
          },
          {
            "lead": "Un T vert en bas =",
            "sub": "Franchissement autorisé.",
            "color": "green"
          }
        ]
      },
      {
        "type": "warning",
        "lines": [
          {
            "parts": [
              {
                "t": "Principe de cantonnement",
                "bold": true,
                "underline": true
              }
            ]
          },
          {
            "parts": [
              {
                "t": "Le SM a également pour fonction d'interdire l'accès d'un tramway à un canton sur lequel circule déjà un tramway dans le même sens (tunnel de la Galerie Mistral) ou quel que soit le sens (tronçons en VU). Sa signification est la même = "
              },
              {
                "t": "arrêt obligatoire, franchissement interdit",
                "red": true
              }
            ]
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "024.jpg",
        "caption": "Page 24/76"
      },
      {
        "type": "anchor",
        "id": "s-2-2-d"
      },
      {
        "type": "rct-sub",
        "text": "D - Le Signal d'Avertissement = SA :"
      },
      {
        "type": "p",
        "text": "Le signal SA est composé de 2 feux superposés, présentant :"
      },
      {
        "type": "signal-checks",
        "items": [
          {
            "lead": "Un T orange en haut =",
            "sub": "Prochain FM au rouge, franchissement autorisé, marche à vue.",
            "color": "orange"
          },
          {
            "text": "Si le feu est en panne, prévenir le PCC",
            "italic": true,
            "color": "red"
          },
          {
            "lead": "Un T vert en bas =",
            "sub": "Franchissement autorisé.",
            "color": "green"
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-2-2-e"
      },
      {
        "type": "rct-sub",
        "text": "E - Le Signal de Manœuvre et d'Avertissement = SMA :"
      },
      {
        "type": "p",
        "text": "Le signal SMA est composé de 3 feux superposés, présentant :"
      },
      {
        "type": "signal-checks",
        "items": [
          {
            "lead": "Un T rouge en haut =",
            "sub": "Arrêt absolu",
            "color": "red"
          },
          {
            "lead": "Un T orange fixe au milieu =",
            "sub": "Franchissement autorisé, marche à vue, il indique que le prochain signal de manœuvre est rouge.",
            "color": "orange"
          },
          {
            "lead": "Un T orange clignotant au milieu =",
            "sub": "Franchissement autorisé, marche à vue, il indique la présence d'une rame à quai ou occupation de l'interface JP / Cemh (une rame peut circuler ou être arrêtée sur le canton).",
            "color": "orange",
            "blink": true
          },
          {
            "lead": "Un T vert en bas =",
            "sub": "Franchissement autorisé.",
            "color": "green"
          }
        ]
      },
      {
        "type": "highlight",
        "text": "Si le T Orange est allumé (fixe ou clignotant) — Le conducteur est autorisé à s'engager à vitesse réduite : 30 Km/h, et 15 Km/h en entrée de station en présence d'une autre rame"
      },
      {
        "type": "anchor",
        "id": "s-2-2-f"
      },
      {
        "type": "rct-sub",
        "text": "F - Le Signal (ou feu blanc) de sortie de remisage :"
      },
      {
        "type": "p",
        "text": "Ce signal est en général situé en sortie de faisceau de remisage. Il est composé d'un seul feu blanc :"
      },
      {
        "type": "signal-checks",
        "items": [
          {
            "lead": "Feu allumé blanc :",
            "sub": "Franchissement autorisé.",
            "color": "green"
          },
          {
            "lead": "Feu éteint :",
            "sub": "Franchissement interdit.",
            "color": "red"
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-2-2-g"
      },
      {
        "type": "rct-sub",
        "text": "G - Signal (ou feu) blanc d'anticipation :"
      },
      {
        "type": "p",
        "text": "Signal Autorisant le départ. Feu uniquement positionné en station (ex. : Place de l'Europe), du fait que le SM ou l'INDIR n'est pas visible du quai de départ."
      },
      {
        "type": "page-scan",
        "src": "025.jpg",
        "caption": "Page 25/76"
      },
      {
        "type": "anchor",
        "id": "s-2-2-h"
      },
      {
        "type": "rct-sub",
        "text": "H - Lampe flash et Avertisseur sonore :"
      },
      {
        "type": "p",
        "text": "Elle se compose d'une Alarme Lumineuse de franchissement sur les sections à Voie Unique, associée à un Avertisseur Sonore."
      },
      {
        "type": "p",
        "text": "Les feux clignotants de couleur rouge sont déclenchés sur détection d'un franchissement d'un SM à chaque entrée des tronçons de Voie Unique. Ils indiquent au conducteur soit qu'il vient de franchir un SM, soit qu'une rame arrivant à contre sens s'est engagée sans autorisation."
      },
      {
        "type": "warning",
        "lines": [
          {
            "parts": [
              {
                "t": "Si le signal clignote :",
                "bold": true
              }
            ]
          },
          {
            "text": "1. Arrêt immédiat de la rame (FU).",
            "red": true
          },
          {
            "text": "2. Enclencher les feux de détresse",
            "red": true
          },
          {
            "text": "3. Appel du PCC, et attendre les consignes",
            "red": true
          }
        ]
      },
      {
        "type": "cas-box",
        "title": "Cas particuliers",
        "items": [
          {
            "title": "Zone de manœuvre Léon Blum",
            "text": "(approche sur V2 sens vers Gare) la lampe flash est positionnée à côté du SA pour protéger une zone de manœuvre dont la configuration particulière (passage sur V2 à contre-sens) nécessite un signal renforcé. La lampe flash s'allume lorsque le SM suivant s'est allumé au rouge : la consigne est alors de ralentir, avant de marquer l'arrêt au SM.",
            "emphasis": "blue"
          },
          {
            "title": "Galerie Mistral",
            "text": "lors de l'exploitation en VU entre Corum et Comédie, sous procédure spécifique gérée depuis le PCC, le déclenchement des sirènes & lampes flash a la même signification que sur les tronçons à voie unique L.2 ou L.3 = consigne d'arrêt immédiat de la rame (FU).",
            "emphasis": "blue"
          },
          {
            "title": "Sections en VU",
            "text": "la lampe flash peut être utilisée pour renforcer la signalisation à l'approche d'un INDIR si celui-ci est dans l'état barre horizontale rouge (signal fermé).",
            "emphasis": "red"
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-2-2-i"
      },
      {
        "type": "rct-sub",
        "text": "I - Signal (ou feu) de présence tension :"
      },
      {
        "type": "p",
        "text": "Le Signal de présence ou d'absence tension (ligne aérienne) se compose d'un feu jaune suspendu à hauteur de la ligne aérienne avant chaque sectionnement électrique. Les feux de présence tension doivent être vérifiés au fur et à mesure de l'avancement en ligne."
      },
      {
        "type": "signal-checks",
        "items": [
          {
            "lead": "Feu allumé =",
            "sub": "présence tension, circulation autorisée."
          },
          {
            "lead": "Feu clignotant =",
            "sub": "absence tension, arrêt absolu."
          },
          {
            "lead": "Feu éteint =",
            "sub": "feu en panne, arrêt absolu et appel PCC."
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "026.jpg",
        "caption": "Page 26/76"
      },
      {
        "type": "anchor",
        "id": "s-2-2-j"
      },
      {
        "type": "rct-sub",
        "text": "J - Le Signal (ou Feu) de traversée routière :"
      },
      {
        "type": "rct-sub",
        "text": "a) Pré-signalisation à l'approche du carrefour :"
      },
      {
        "type": "arrow-p",
        "tone": "blue",
        "parts": [
          {
            "t": "La pré-signalisation indique au conducteur que l'arrivée de la rame est prise en compte par le système central de régulation des feux. Le signal est situé sur le poteau en dessous du signal R17, il est composé d'un losange et d'un point d'exclamation de couleur orange."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          "Losange éteint = la prise en compte du tramway est hors service (ou ampoule grillée)",
          {
            "text": "Losange allumé = la prise en compte du tramway est en service.",
            "orange": true
          },
          {
            "text": "Losange avec le point d'exclamation clignotant = le tramway a été pris en compte pour déclencher les feux de traversée routière et changement de phase du carrefour trois secondes (ou plus) après le premier clignotement.",
            "orange": true
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Le pré-signal indique au conducteur qu'il a une forte probabilité de bénéficier de la priorité au carrefour : dans ce cas le conducteur se prépare à franchir le carrefour à la vitesse de consigne, en positionnant son manipulateur sur le mode neutre ou pré-freinage pour faire face à toute situation d'urgence. Lorsque la barre des feux de traversée routière passe à la position verticale, il franchit le carrefour sur sa lancée, "
          },
          {
            "t": "sans jamais anticiper le passage à la barre verticale.",
            "bold": true
          }
        ]
      },
      {
        "type": "p",
        "text": "Si le conducteur n'a pas d'indication de prise en compte : il aborde l'intersection à vitesse réduite de façon à arrêter normalement sa rame si le feu de priorité affiche toujours la position de la barre horizontale."
      },
      {
        "type": "rct-lead",
        "text": "Les différentes phases"
      },
      {
        "type": "phase-list",
        "items": [
          {
            "n": "1",
            "bg": "white",
            "parts": [
              {
                "t": "Barre horizontale => Arrêt absolu. Losange éclairé fixe."
              }
            ]
          },
          {
            "n": "2",
            "bg": "purple",
            "parts": [
              {
                "t": "Barre horizontale => Arrêt absolu. Losange clignotant."
              }
            ]
          },
          {
            "n": "3",
            "bg": "white",
            "parts": [
              {
                "t": "Barre horizontale => Arrêt absolu. Losange clignotant. Point d'exclamation clignotant 3 sec. pour changement de phase de la barre horizontale à la base verticale."
              }
            ]
          },
          {
            "n": "4",
            "bg": "purple",
            "parts": [
              {
                "t": "Barre verticale => Passage autorisé. Losange clignotant seul."
              }
            ]
          },
          {
            "n": "5",
            "bg": "white",
            "parts": [
              {
                "t": "Barre verticale => Passage autorisé. "
              },
              {
                "t": "Losange allumé fixe avertissant du changement de phase dans les 3 secondes (de la barre verticale -5- au disque central -6-)",
                "orange": true
              }
            ]
          },
          {
            "n": "6",
            "bg": "purple",
            "parts": [
              {
                "t": "Disque central => Arrêt absolu : Allumage 3 secondes avant phase 1. Losange allumé fixe."
              }
            ]
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "027.jpg",
        "caption": "Page 27/76"
      },
      {
        "type": "rct-sub",
        "text": "Cas particulier du clignotement lent du losange :"
      },
      {
        "type": "p",
        "text": "Cet état provisoire indique que le feu routier étant asservi au feu SIG, il faut attendre que le SM soit au vert (pour la cohérence des 2 signaux), ou bien que la station en aval étant occupée, il faut attendre que la rame devant libère sa position (pour ne pas bloquer le carrefour en attendant)."
      },
      {
        "type": "rct-sub",
        "text": "b) Signalisation de carrefour"
      },
      {
        "type": "p",
        "text": "Le Signal de traversée routière pour tramway est de type R17. Il est composé de trois feux blancs :"
      },
      {
        "type": "signal-checks",
        "items": [
          {
            "lead": "Barre verticale allumée =",
            "sub": "franchissement autorisé.",
            "color": "green"
          },
          {
            "lead": "Disque central allumé =",
            "sub": "avertissement avant passage à la barre horizontale.",
            "color": "orange"
          },
          {
            "lead": "Barre horizontale allumée =",
            "sub": "franchissement interdit.",
            "color": "red",
            "subColor": "red"
          }
        ]
      },
      {
        "type": "p",
        "text": "Pour franchir le carrefour, le manipulateur doit être au neutre ou sur le mode pré-freinage pour faire face à toute situation d'urgence."
      },
      {
        "type": "arrow-p",
        "tone": "blue",
        "parts": [
          {
            "t": "En situation de dérangement, le disque central peut se présenter en allumage clignotant. Pour tout dysfonctionnement de la Signalisation Lumineuse, voir au chapitre 2.3 pages suivantes."
          }
        ]
      },
      {
        "type": "rct-sub",
        "text": "c) Génération des priorités aux feux"
      },
      {
        "type": "prio-box",
        "items": [
          {
            "title": "Cas n° 1 : Génération de priorité par anticipation du départ de la rame (stations proches d'un carrefour) :",
            "body": "Lorsqu'une rame arrive en station, son arrivée est détectée ce qui déclenche un chronomètre. Lorsque ce chronomètre indique un temps égal à un temps de référence, une priorité stable est générée au carrefour suivant directement la station, puis le chronomètre est remis à zéro.",
            "lead": "Le conducteur doit commencer à s'avancer après la fermeture des portes car le temps de référence est calculé en permanence sur l'historique des cinq derniers arrêts."
          },
          {
            "title": "Cas n° 2 : Génération de priorité par départ de la rame de la station :",
            "body": "Une rame quitte la station : à une certaine distance du carrefour suivant, par détection de la rame, une priorité stable est générée pour ce carrefour. Le déclenchement de la phase tramway est déterminé à l'optimum des conditions de confort et de sécurité.",
            "lead": "Le conducteur doit quitter la station, et adapter sa conduite en fonction de la programmation du carrefour."
          }
        ]
      }
    ]
  },
  {
    "id": "s-2-3",
    "level": 2,
    "code": "2.3",
    "page": 28,
    "title": "CONSIGNES PANNE SIGNALISATION LUMINEUSE",
    "blocks": [
      {
        "type": "page-scan",
        "src": "028.jpg",
        "caption": "Page 28/76"
      },
      {
        "type": "rct-section",
        "text": "2.3 - CONSIGNES EN CAS DE PANNE DE LA SIGNALISATION LUMINEUSE ROUTIERE"
      },
      {
        "type": "boxed",
        "blocks": [
          {
            "type": "arrow-p",
            "parts": [
              {
                "t": "En cas de non fonctionnement du feu de type R 17, le conducteur doit :"
              }
            ]
          },
          {
            "type": "consigne-red",
            "text": "Appeler le PCC."
          },
          {
            "type": "arrow-p",
            "parts": [
              {
                "t": "S'il est autorisé par le PCC à franchir le carrefour, avec les trois feux au noir, ou avec le disque central clignotant, le conducteur doit :"
              }
            ]
          },
          {
            "type": "consigne-steps",
            "items": [
              "1. Se conformer au code de la route : priorité à droite.",
              "2. Actionner le gong et les feux de détresse.",
              "3. Franchir le carrefour à vitesse limitée : 10 Km/h."
            ]
          },
          {
            "type": "arrow-p",
            "parts": [
              {
                "t": "Le passage d'un signal fermé (barre bloquée à l'horizontale) ne peut être autorisé par le PCC qu'en présence d'agents TaM, ou d'agents de Police sur le carrefour."
              }
            ]
          },
          {
            "type": "routier-except",
            "lines": [
              {
                "parts": [
                  {
                    "t": "Les seules exceptions à cette règle impérative sont les configurations de carrefour simples ne présentant pas de risque en cas de franchissement à vitesse réduite. "
                  },
                  {
                    "t": "Le PCC peut dans ce cas donner l'autorisation de franchissement, celui-ci restant à la libre appréciation du conducteur.",
                    "bold": true
                  }
                ]
              },
              {
                "text": "Exemple : cas de voies à sens unique, non traversantes après la plate-forme.",
                "italic": true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "s-2-4",
    "level": 2,
    "code": "2.4",
    "page": 29,
    "title": "ZONES SPECIFIQUES",
    "blocks": [
      {
        "type": "page-scan",
        "src": "029.jpg",
        "caption": "Page 29/76"
      },
      {
        "type": "rct-section",
        "text": "2.4 - ZONES SPECIFIQUES"
      },
      {
        "type": "anchor",
        "id": "s-2-4-1"
      },
      {
        "type": "anchor",
        "id": "s-2-4-1"
      },
      {
        "type": "rct-section",
        "text": "2.4.1 - LE CAS PARTICULIER DE LA ZONE GARE"
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Sur la zone Gare, le principe de conduite est la marche à vue "
          },
          {
            "t": "à vitesse limitée 10 Km/h",
            "red": true
          },
          {
            "t": ", avec priorité systématique à la rame "
          },
          {
            "t": "venant de droite",
            "red": true
          },
          {
            "t": ". Les consignes suivantes sont à respecter point par point, y compris en l'absence d'autres rames sur la zone :"
          }
        ]
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "parts": [
              {
                "t": "Je m'arrête à l'INDES (Indicateur de Destination) qui est en position d'attente = "
              },
              {
                "t": "AT",
                "red": true
              }
            ]
          },
          {
            "n": "2",
            "nColor": "blue",
            "text": "Je sélectionne ma destination en actionnant ma télécommande d'aiguille : Gauche / Tout Droit / Droite."
          },
          {
            "n": "3",
            "nColor": "purple",
            "parts": [
              {
                "t": "Je vérifie que le feu vert de destination qui s'est allumé correspond bien à l'itinéraire commandé (exemple : "
              },
              {
                "t": "PL",
                "green": true
              },
              {
                "t": " pour Pont de Lattes, "
              },
              {
                "t": "voir liste des codes page suivante",
                "italic": true
              },
              {
                "t": "). ATTENTION : en cas d'allumage simultané de deux feux verts ou d'un feu vert et d'un feu rouge = anomalie, j'appelle le PCC et je me conforme à ses instructions. Si le feu rouge supérieur indique "
              },
              {
                "t": "XX",
                "red": true
              },
              {
                "t": " = aiguille dé-contrôlée, j'appelle le PCC et je me conforme à ses instructions."
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "parts": [
              {
                "t": "Je m'engage, en respectant la vitesse limite de "
              },
              {
                "t": "10 Km/h",
                "red": true
              },
              {
                "t": " sur toute la zone, et en contrôlant au fur et à mesure "
              },
              {
                "t": "la bonne position des aiguilles",
                "underline": true
              },
              {
                "t": " par rapport à la destination choisie."
              }
            ]
          },
          {
            "n": "5a",
            "nColor": "purple",
            "parts": [
              {
                "t": "En présence d'une rame arrivant sur ma droite, ",
                "italic": true
              },
              {
                "t": "Je m'arrête",
                "bold": true
              },
              {
                "t": " au PLP (Point Limite de Priorité — "
              },
              {
                "t": "voir photo page suivante",
                "italic": true
              },
              {
                "t": ")."
              }
            ]
          },
          {
            "n": "5b",
            "nColor": "blue",
            "parts": [
              {
                "t": "En présence d'une rame arrivant sur ma gauche, mais ayant dépassé son PLG (Point Limite de Gabarit ",
                "italic": true
              },
              {
                "t": "voir photo page suivante",
                "italic": true
              },
              {
                "t": "). ",
                "italic": true
              },
              {
                "t": "Je m'arrête",
                "bold": true
              },
              {
                "t": " pour la laisser passer."
              }
            ],
            "extra": [
              {
                "parts": [
                  {
                    "t": "ATTENTION, PRUDENCE :",
                    "bold": true,
                    "red": true
                  },
                  {
                    "t": " je m'arrête même si la rame venant sur ma gauche (ici, la rame en vert) peut soit continuer tout droit, soit me couper la route en tournant à gauche. "
                  },
                  {
                    "t": "Si elle continue tout droit,",
                    "italic": true
                  },
                  {
                    "t": " j'attends avant de redémarrer qu'elle ait passé l'aiguille avec le premier bogie"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "warning",
        "tone": "red",
        "parts": [
          {
            "t": "Si vous programmez une destination différente de la destination habituelle de la ligne, actionnez les feux de détresse pour alerter les autres conducteurs !",
            "red": true,
            "bold": true
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "030.jpg",
        "caption": "Page 30/76 — Codes Gare et organigramme croisements"
      },
      {
        "type": "codes-dest",
        "columns": [
          "Codes Destination",
          "PLP",
          "PLG"
        ],
        "rows": [
          [
            {
              "code": "MA",
              "color": "green",
              "text": "Direction Rue Maguelone"
            },
            {
              "text": "(photo PLP — à intégrer)",
              "italic": true
            },
            {
              "text": "Idem Gare",
              "italic": true
            }
          ],
          [
            {
              "code": "RO",
              "color": "green",
              "text": "Direction Rondelet"
            },
            {
              "text": ""
            },
            {
              "text": "Idem Gare",
              "italic": true
            }
          ],
          [
            {
              "code": "PL",
              "color": "green",
              "text": "Direction Pont de Lattes"
            },
            {
              "text": ""
            },
            {
              "text": "Idem Gare",
              "italic": true
            }
          ],
          [
            {
              "code": "OB",
              "color": "green",
              "text": "Direction Observatoire"
            },
            {
              "text": ""
            },
            {
              "text": "Idem Gare",
              "italic": true
            }
          ],
          [
            {
              "empty": true
            },
            {
              "text": ""
            },
            {
              "text": ""
            }
          ],
          [
            {
              "code": "XX",
              "color": "red",
              "text": "Arrêt absolu"
            },
            {
              "text": ""
            },
            {
              "text": ""
            }
          ],
          [
            {
              "code": "AT",
              "color": "red",
              "textParts": [
                {
                  "t": "En attente = "
                },
                {
                  "t": "Arrêt",
                  "red": true
                }
              ]
            },
            {
              "text": ""
            },
            {
              "text": ""
            }
          ]
        ]
      },
      {
        "type": "rct-section",
        "text": "ZONES SPECIFIQUES GARE et ALBERT 1er - GESTION DES CROISEMENTS ENTRE RAMES"
      },
      {
        "type": "figure-placeholder",
        "text": "Organigramme ENGAGEMENT DESTINATION / REPRISE DESTINATION — image à intégrer"
      },
      {
        "type": "page-scan",
        "src": "031.jpg",
        "caption": "Page 31/76"
      },
      {
        "type": "anchor",
        "id": "s-2-4-2"
      },
      {
        "type": "rct-section",
        "text": "2.4.2 - LE CAS PARTICULIER DE LA ZONE ALBERT 1er"
      },
      {
        "type": "note-red",
        "text": "-zone modifiée à compter du 02/07/2016-"
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Sur la zone Albert 1er, comme sur la zone Gare, le principe de conduite est la marche à vue "
          },
          {
            "t": "à vitesse limitée 10 Km/h",
            "red": true
          },
          {
            "t": " à partir du TIV \"10\", avec priorité systématique à la rame "
          },
          {
            "t": "venant de droite",
            "red": true
          },
          {
            "t": ". Les mêmes consignes de franchissement de la zone s'appliquent et sont à respecter point par point ("
          },
          {
            "t": "art. 2.4.1 : points 1-2-3-4-5a-5b",
            "blue": true
          },
          {
            "t": "), y compris en l'absence d'autres rames sur la zone."
          }
        ]
      },
      {
        "type": "codes-dest",
        "columns": [
          "Codes Destination",
          "PLP",
          "PLG"
        ],
        "rows": [
          [
            {
              "code": "SC",
              "color": "green",
              "text": "Direction Albert 1er - St Eloi"
            },
            {
              "text": ""
            },
            {
              "text": "Idem Gare",
              "italic": true
            }
          ],
          [
            {
              "code": "H4",
              "color": "green",
              "text": "Direction Henri IV - Peyrou"
            },
            {
              "text": ""
            },
            {
              "text": "Idem Gare",
              "italic": true
            }
          ],
          [
            {
              "code": "LB",
              "color": "green",
              "text": "Direction Louis Blanc - Corum"
            },
            {
              "text": ""
            },
            {
              "text": "Idem Gare",
              "italic": true
            }
          ],
          [
            {
              "empty": true
            },
            {
              "text": ""
            },
            {
              "text": ""
            }
          ],
          [
            {
              "code": "XX",
              "color": "red",
              "text": "Arrêt absolu"
            },
            {
              "text": ""
            },
            {
              "text": ""
            }
          ],
          [
            {
              "code": "AT",
              "color": "red",
              "textParts": [
                {
                  "t": "En attente = "
                },
                {
                  "t": "Arrêt",
                  "red": true
                }
              ]
            },
            {
              "text": ""
            },
            {
              "text": ""
            }
          ]
        ]
      },
      {
        "type": "p",
        "text": "ZONE ALBERT 1er — PHASE 2 — Ligne 4 définitive (voir scan — plan de zone)."
      },
      {
        "type": "page-scan",
        "src": "032.jpg",
        "caption": "Page 32/76"
      },
      {
        "type": "anchor",
        "id": "s-2-4-3"
      },
      {
        "type": "rct-section",
        "text": "2.4.3 - LE CAS PARTICULIER DE LA ZONE CORUM"
      },
      {
        "type": "note-red",
        "text": "-zone modifiée à compter du 21/08/2017-"
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Sur la zone CORUM, comme sur la zone Gare, le principe de conduite est la marche à vue "
          },
          {
            "t": "à vitesse limitée 10 Km/h",
            "red": true
          },
          {
            "t": " à partir du TIV \"10\", avec priorité systématique à la rame "
          },
          {
            "t": "venant de droite",
            "red": true
          },
          {
            "t": ". Les mêmes consignes de franchissement de la zone s'appliquent et sont à respecter point par point ("
          },
          {
            "t": "art. 2.4.1 : points 1-2-3-4-5a-5b",
            "blue": true
          },
          {
            "t": "), y compris en l'absence d'autres rames sur la zone."
          }
        ]
      },
      {
        "type": "codes-dest",
        "columns": [
          "Codes Destination",
          "PLP",
          "PLG"
        ],
        "rows": [
          [
            {
              "code": "AU",
              "color": "green",
              "text": "Direction Les Aubes"
            },
            {
              "text": ""
            },
            {
              "text": "Idem Gare",
              "italic": true
            }
          ],
          [
            {
              "code": "CO",
              "color": "green",
              "text": "Direction Comédie"
            },
            {
              "text": ""
            },
            {
              "text": "Idem Gare",
              "italic": true
            }
          ],
          [
            {
              "code": "LB",
              "color": "green",
              "text": "Direction Louis Blanc"
            },
            {
              "text": ""
            },
            {
              "text": "Idem Gare",
              "italic": true
            }
          ],
          [
            {
              "code": "SA",
              "color": "green",
              "text": "Direction Sablassou"
            },
            {
              "text": ""
            },
            {
              "text": "Idem Gare",
              "italic": true
            }
          ],
          [
            {
              "empty": true
            },
            {
              "text": ""
            },
            {
              "text": ""
            }
          ],
          [
            {
              "code": "XX",
              "color": "red",
              "text": "Arrêt absolu"
            },
            {
              "text": ""
            },
            {
              "text": ""
            }
          ],
          [
            {
              "code": "AT",
              "color": "red",
              "textParts": [
                {
                  "t": "En attente = "
                },
                {
                  "t": "Arrêt",
                  "red": true
                }
              ]
            },
            {
              "text": ""
            },
            {
              "text": ""
            }
          ]
        ]
      },
      {
        "type": "p",
        "text": "La position d'attente avant le quai Corum L1V2 est utilisée pour libérer le plus tôt possible le croisement entre les lignes 1,2 et 4, mais ne peut en aucun cas être utilisée pour l'échange voyageur car la configuration du quai, pour partie en courbe, ne le permet pas sur l'intégralité de la longueur de la rame."
      },
      {
        "type": "p",
        "text": "En provenance de la station Les Aubes et à destination de la station Corum L1V2 (dans le cas d'une déviation L.1), les rames d'une longueur égale ou supérieure à 40 mètres sont soumises à une temporisation d'accès via la signalisation ferroviaire, de manière à garantir l'accès à la station sans arrêt intermédiaire, afin de ne pas engager le carrefour avec l'avenue de Nîmes. Sur le même trajet, un panneau d'espacement est à respecter en cas d'arrivée simultanée de deux rames, pour garantir la bonne détection de la longueur de la première rame : la deuxième rame doit se positionner en amont de ce panneau."
      },
      {
        "type": "p",
        "text": "Pour la même raison, une rame en provenance de la station Comédie (L1V2) peut voir sa commande d'itinéraire temporisée, pour ne pas interférer sur la circulation d'une rame égale ou supérieure à 40m en provenance de la station Les Aubes vers Corum L1V2."
      },
      {
        "type": "p",
        "text": "(voir scan — plan zone Corum)"
      }
    ]
  },
  {
    "id": "s-2-5",
    "level": 2,
    "code": "2.5",
    "page": 33,
    "title": "PANNEAUX FIXES DE SIGNALISATION",
    "blocks": [
      {
        "type": "page-scan",
        "src": "033.jpg",
        "caption": "Page 33/76"
      },
      {
        "type": "rct-section",
        "text": "2.5 - PANNEAUX FIXES DE SIGNALISATION"
      },
      {
        "type": "anchor",
        "id": "s-2-5-a"
      },
      {
        "type": "rct-sub",
        "text": "A - Vitesse autorisée :"
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Les "
          },
          {
            "t": "TIV",
            "bold": true
          },
          {
            "t": ", panneaux de limitation de vitesse -fond jaune, lettres noires- sont situés à hauteur de la ligne aérienne et indiquent la valeur de vitesse maximale à ne pas dépasser sur la section suivante."
          }
        ]
      },
      {
        "type": "rct-lead",
        "text": "Les conducteurs sont tenus :"
      },
      {
        "type": "tenus-list",
        "items": [
          {
            "n": "1",
            "color": "purple",
            "text": "De respecter les limitations de vitesse affichées en ligne et sur les différentes zones de manœuvres (signalisation fixe à lettres noires sur fond jaune, posée sur la ligne aérienne)."
          },
          {
            "n": "2",
            "color": "blue",
            "parts": [
              {
                "t": "De respecter les vitesses de consigne spécifiques, prévues pour chaque type de situation (voir "
              },
              {
                "t": "tableau des vitesses",
                "bold": true,
                "underline": true
              },
              {
                "t": " page suivante)."
              }
            ]
          },
          {
            "n": "3",
            "color": "sky",
            "text": "D'être particulièrement vigilants à l'approche des carrefours routiers : la vitesse maximum de franchissement est de 40 Km/h. Elle peut être inférieure si une limitation de vitesse spécifique est affichée en amont du carrefour."
          },
          {
            "n": "4",
            "color": "teal",
            "text": "D'adapter sa vitesse en fonction de l'environnement : Exemple : le rail glissant, piétons aux abords de la voie."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          "La consigne de vitesse pour le franchissement des appareils de voie varie selon la position de l'aiguille.",
          "En cas de défaut sur le matériel roulant, une consigne de vitesse spécifique à chaque mode dégradé doit être respectée (isolation des freins ou d'un bogie, secours traction, remorquage/poussage).",
          "La vitesse peut être limitée ponctuellement en cas de présence de travaux aux abords ou sur la voie, par signalisation de chantier (panneaux et signalisation lumineuse).",
          "Les consignes de vitesse inférieures données par le PCC, la Police ou les agents de maîtrises de TaM prévalent sur les limitations préétablies."
        ]
      },
      {
        "type": "warning",
        "parts": [
          {
            "t": "Rappel",
            "bold": true
          },
          {
            "t": " : une consigne spécifique de vitesse maximale de "
          },
          {
            "t": "10 Km/h",
            "red": true,
            "bold": true
          },
          {
            "t": " s'applique sur les "
          },
          {
            "t": "zones spécifiques : Gare St Roch, Albert 1er et Corum",
            "bold": true
          },
          {
            "t": " (voir partie 2.4) pour sécuriser le croisement des rames en circulation."
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "034.jpg",
        "caption": "Page 34/76"
      },
      {
        "type": "rct-section",
        "text": "TABLEAU DES LIMITATIONS DE VITESSE"
      },
      {
        "type": "vitesse-table",
        "speeds": [
          "5 Km/h",
          "10 Km/h",
          "15 Km/h",
          "20 Km/h",
          "25 Km/h",
          "30 Km/h",
          "40 Km/h"
        ],
        "rows": [
          {
            "label": "Conduite de manœuvre",
            "highlight": "5 Km/h"
          },
          {
            "label": "Circulation dans l'atelier",
            "highlight": "5 Km/h"
          },
          {
            "label": "Travaux sur la voie avec présence du personnel",
            "highlight": "10 Km/h"
          },
          {
            "label": "Croisement d'une rame arrêtée",
            "highlight": "10 Km/h"
          },
          {
            "label": "Traversée de voie sur ornière porteuse",
            "highlight": "10 Km/h"
          },
          {
            "label": "Feu Routier en dérangement",
            "highlight": "10 Km/h"
          },
          {
            "label": "Circulation dans le dépôt",
            "highlight": "10 Km/h"
          },
          {
            "label": "Circulation en terminus",
            "highlight": "15 Km/h"
          },
          {
            "label": "Prise d'une aiguille en voie déviée",
            "highlight": "15 Km/h"
          },
          {
            "label": "Danger piéton",
            "highlight": "15 Km/h"
          },
          {
            "label": "Traversée de station en HLP",
            "highlight": "15 Km/h"
          },
          {
            "label": "Défaut d'avertisseur sonore (gong)",
            "highlight": "20 Km/h"
          },
          {
            "label": "Remorquage-poussage",
            "highlight": "20 Km/h"
          },
          {
            "label": "Mode Secours Traction ou Alimentation Directe",
            "highlight": "25 Km/h",
            "notes": {
              "25 Km/h": "= Limite matériel roulant"
            }
          },
          {
            "label": "Voie Unique Temporaire",
            "highlight": "30 Km/h"
          },
          {
            "label": "Entrée en station",
            "highlights": [
              "15 Km/h",
              "30 Km/h"
            ],
            "notes": {
              "15 Km/h": "Présence d'autre rame",
              "30 Km/h": "Absence d'autre rame"
            }
          },
          {
            "label": "Franchissement de carrefour (y compris Passage à Niveau)",
            "highlight": "40 Km/h"
          },
          {
            "label": "Aiguille RFF en direct ou déviée",
            "highlight": "40 Km/h"
          },
          {
            "label": "Ouverture de voie",
            "highlight": "40 Km/h"
          },
          {
            "label": "Prise d'une aiguille en voie directe",
            "highlight": "40 Km/h"
          },
          {
            "label": "Défaut Veille avec accompagnant",
            "highlight": "40 Km/h"
          },
          {
            "label": "Défaut de freins",
            "highlight": "40 Km/h"
          },
          {
            "label": "Bogie isolé",
            "highlight": "40 Km/h"
          },
          {
            "label": "Chasse-Corps HS ou verrouillé",
            "highlight": "40 Km/h",
            "spanNote": {
              "from": "5 Km/h",
              "to": "30 Km/h",
              "text": "En cas d'endommagement ou de conditions climatiques extrêmes"
            }
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "035.jpg",
        "caption": "Page 35/76"
      },
      {
        "type": "anchor",
        "id": "s-2-5-b"
      },
      {
        "type": "rct-sub",
        "text": "B - Zones de Télécommande :"
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Pour changer de direction, en dehors des zones de commande automatique de l'itinéraire, et en dehors de la zone Gare, le conducteur doit actionner la télécommande d'aiguille sur "
          },
          {
            "t": "la zone définie par le panneau jaune de début et de fin de télécommande.",
            "bold": true
          }
        ]
      },
      {
        "type": "hand-p",
        "text": "La télécommande par le conducteur est possible par IMPULSION sur les BP gauche, droit ou tout droit. La télécommande ne sera effective que lorsque les trois voyants (gauche et droite) seront allumés simultanément, c'est-à-dire au passage de la rame sur la boucle de télécommande."
      },
      {
        "type": "p",
        "text": "Un panneau comportant des inscriptions noires sur fond jaune, indique au conducteur la limite de la zone de télécommande d'un itinéraire, hors zone dépôt."
      },
      {
        "type": "p",
        "text": "L'action de télécommande est vérifiable sur le boîtier de secours :"
      },
      {
        "type": "signal-table",
        "rows": [
          {
            "lead": "Voyant rouge :",
            "sub": "télécommande impossible.",
            "color": "red"
          },
          {
            "lead": "Voyant jaune clignotant :",
            "sub": "l'action a été prise en compte, avec temporisation.",
            "color": "yellow",
            "blink": true
          },
          {
            "lead": "Voyant jaune fixe :",
            "sub": "la télécommande est active et l'itinéraire enclenché.",
            "color": "yellow"
          }
        ]
      },
      {
        "type": "arrow-p",
        "arrow": "large",
        "parts": [
          {
            "t": "Une seule action de commande",
            "bold": true
          },
          {
            "t": " de son itinéraire doit être réalisée. "
          },
          {
            "t": "En cas de non fonctionnement de la télécommande, il faut utiliser le boîtier de secours au sol (BS), soit physiquement avec utilisation de la clé de commande (",
            "italic": true
          },
          {
            "t": "et présence de la rame sur le circuit de voie",
            "bold": true,
            "italic": true
          },
          {
            "t": "), soit via le DTS pour les rames équipées (",
            "italic": true
          },
          {
            "t": "une seule action là-aussi !",
            "bold": true,
            "italic": true
          },
          {
            "t": ").",
            "italic": true
          }
        ]
      },
      {
        "type": "p",
        "text": "Appel du PCC depuis la rame si l'action n'a pas immédiatement été suivie d'effet."
      },
      {
        "type": "warning",
        "icon": true,
        "parts": [
          {
            "t": "Il est strictement interdit de :",
            "red": true,
            "bold": true,
            "underline": true
          }
        ],
        "bulletStyle": "arrow",
        "bullets": [
          "Modifier la position d'un appareil de voie sans l'autorisation du PCC, sauf si ce changement s'intègre dans une manœuvre prévue.",
          "Modifier la position d'un appareil de voie sur lequel un tramway est engagé."
        ]
      },
      {
        "type": "page-scan",
        "src": "036.jpg",
        "caption": "Page 36/76"
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Mode dégradé manuel :",
            "bold": true,
            "underline": true
          }
        ]
      },
      {
        "type": "p",
        "text": "Sur demande ou autorisation du PCC, le conducteur peut être amené à modifier la position d'un appareil de voie à l'aide du sabre d'aiguillage."
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "Toute intervention manuelle",
            "bold": true
          },
          {
            "t": " sur un appareil de voie motorisé doit être précédée d'une "
          },
          {
            "t": "condamnation de l'alimentation",
            "bold": true
          },
          {
            "t": " par l'ouverture du trappon avant l'introduction du sabre."
          }
        ]
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "Après la manœuvre manuelle d'un appareil de voie, il faut vérifier la bonne application de la lame d'aiguille contre le rail (si ce n'est pas le cas, vérifier la présence éventuelle d'un corps étranger).",
            "bold": true
          }
        ]
      },
      {
        "type": "warning",
        "icon": true,
        "lines": [
          {
            "text": "Pour enlever un corps étranger d'un aiguillage motorisé :",
            "bold": true
          },
          {
            "parts": [
              {
                "t": "1. ",
                "red": true
              },
              {
                "t": "Mettre le sabre d'aiguillage",
                "red": true,
                "bold": true,
                "underline": true
              },
              {
                "t": " de façon à isoler le moteur.",
                "red": true
              }
            ]
          },
          {
            "parts": [
              {
                "t": "2. ",
                "red": true
              },
              {
                "t": "Mettre une cale",
                "red": true,
                "bold": true,
                "underline": true
              },
              {
                "t": " entre la lame et le rail pour éviter toute commande intempestive de l'aiguille susceptible de provoquer un accident.",
                "red": true
              }
            ]
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-2-5-c"
      },
      {
        "type": "rct-sub",
        "text": "C - Clou de positionnement :"
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Le clou inox fixé au sol sur le quai, à droite, matérialise le "
          },
          {
            "t": "point d'arrêt en station",
            "bold": true
          },
          {
            "t": ", le conducteur devant s'aligner sur ce clou à hauteur d'épaule."
          }
        ]
      },
      {
        "type": "p",
        "text": "Les clous permettent également de voir :"
      },
      {
        "type": "ul",
        "items": [
          "- les limites de zone de manœuvres",
          {
            "text": "ou",
            "bold": true
          },
          "- les limites d'arrêt, avant d'entamer un retournement ou un rebroussement"
        ]
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "(voir chap. 3.2, partie E1)",
            "blue": true,
            "italic": true
          }
        ]
      },
      {
        "type": "p",
        "text": "Ce repère est positionné en prenant en compte les rames les plus longues (type 402). Il est à respecter pour tous les types de rame indépendamment de la longueur de la rame, les rames les plus courtes (type 302) devant marquer l'arrêt en tête de quai."
      },
      {
        "type": "note-red",
        "text": "En cas de quai double, il est impératif que la rame respecte cette consigne"
      },
      {
        "type": "anchor",
        "id": "s-2-5-d"
      },
      {
        "type": "rct-sub",
        "text": "D - Panneaux Limite de Manœuvre :"
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Ce carré noir matérialise la fin d'une zone de retournement, sur les zones de manœuvre à commande d'aiguille manuelle.",
            "blue": true
          },
          {
            "t": " L'arrêt de la rame "
          },
          {
            "t": "ne doit pas se faire avant ce panneau",
            "bold": true
          },
          {
            "t": ", afin de garantir le dégagement complet de l'aiguille par le dernier bogie !"
          }
        ]
      }
    ]
  },
  {
    "id": "s-2-6",
    "level": 2,
    "code": "2.6",
    "page": 37,
    "title": "PANNEAUX TEMPORAIRES",
    "blocks": [
      {
        "type": "page-scan",
        "src": "037.jpg",
        "caption": "Page 37/76"
      },
      {
        "type": "rct-section",
        "text": "2.6 - PANNEAUX TEMPORAIRES"
      },
      {
        "type": "anchor",
        "id": "s-2-6-a"
      },
      {
        "type": "rct-sub",
        "text": "A - Panneaux de chantier :"
      },
      {
        "type": "arrow-p",
        "tone": "blue",
        "parts": [
          {
            "t": "La signalisation de chantier est une signalisation provisoire. Elle protège les ouvriers effectuant des travaux sur la voie ou à proximité de la voie. De part et d'autre du chantier, à 100 m avant et après la zone de travaux, sont disposées des lampes flash, soient seules, soit complétées par des panneaux de limitation et de reprise de vitesse."
          }
        ]
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Les panneaux indiquent soit la limitation de vitesse à respecter ("
          },
          {
            "t": "chiffre rouge",
            "red": true
          },
          {
            "t": "), soit la limite à partir de laquelle la reprise ("
          },
          {
            "t": "lettre R",
            "red": true
          },
          {
            "t": ") de la vitesse normale est autorisée."
          }
        ]
      },
      {
        "type": "p",
        "text": "Placée dans l'entre voie, la lampe flash indique la présence d'agents effectuant des travaux sur ou à proximité de la voie, et impose une limitation de vitesse définie."
      },
      {
        "type": "hand-ul",
        "items": [
          {
            "parts": [
              {
                "t": "Dans le cas où ces panneaux seraient disposés sur une zone de manœuvre avec des "
              },
              {
                "t": "aiguillages motorisés",
                "bold": true
              },
              {
                "t": " les conducteurs doivent être particulièrement vigilants sur la position des aiguillages, et sur la cohérence des signaux de manœuvres."
              }
            ]
          },
          {
            "parts": [
              {
                "t": "Lampe allumée ou éteinte :",
                "bold": true
              },
              {
                "t": " respecter la limitation de vitesse indiquée sur les panneaux, actionner le gong si des ouvriers sont à proximité !"
              }
            ]
          }
        ]
      },
      {
        "type": "arrow-p",
        "tone": "blue",
        "emphasis": true,
        "parts": [
          {
            "t": "La plus grande prudence est demandée aux conducteurs. Ils doivent s'assurer que les ouvriers ont bien vu l'arrivée de la rame et qu'il n'y a pas d'objets sur la voie.",
            "blue": true,
            "bold": true
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-2-6-b"
      },
      {
        "type": "rct-sub",
        "text": "B - Panneaux d'Arrêt absolu"
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Il s'agit de panneaux d'interdiction. Ils sont placés en ligne pour délimiter une zone dont le "
          },
          {
            "t": "franchissement est interdit : ",
            "red": true
          },
          {
            "t": "Arrêt absolu",
            "red": true,
            "underline": true
          }
        ]
      },
      {
        "type": "arrow-ul",
        "items": [
          {
            "text": "Mention d'arrêt obligatoire",
            "bold": true
          },
          {
            "text": "Panneau rouge sans mention particulière",
            "bold": true
          }
        ]
      }
    ]
  }
];

export const RCT_LECTURE_CH2_TOC = [
  {
    "id": "p20",
    "level": 1,
    "code": "2",
    "page": 20,
    "title": "Sommaire — chapitre 2"
  },
  {
    "id": "s-2-1",
    "level": 2,
    "code": "2.1",
    "page": 21,
    "title": "FRANCHISSEMENT DES APPAREILS DE VOIE"
  },
  {
    "id": "s-2-2",
    "level": 2,
    "code": "2.2",
    "page": 22,
    "title": "SIGNALISATION LUMINEUSE"
  },
  {
    "id": "s-2-2-a",
    "level": 3,
    "code": "A",
    "page": null,
    "title": "Le Signal Indicateur de Direction = INDIR",
    "anchorOnly": true,
    "parentId": "s-2-2"
  },
  {
    "id": "s-2-2-b",
    "level": 3,
    "code": "B",
    "page": null,
    "title": "Le Signal Indicateur de Destination = INDES",
    "anchorOnly": true,
    "parentId": "s-2-2"
  },
  {
    "id": "s-2-2-c",
    "level": 3,
    "code": "C",
    "page": null,
    "title": "Le Signal (ou feu) de Manœuvre = SM",
    "anchorOnly": true,
    "parentId": "s-2-2"
  },
  {
    "id": "s-2-2-d",
    "level": 3,
    "code": "D",
    "page": null,
    "title": "Le Signal d'Avertissement = SA",
    "anchorOnly": true,
    "parentId": "s-2-2"
  },
  {
    "id": "s-2-2-e",
    "level": 3,
    "code": "E",
    "page": null,
    "title": "Le Signal de Manœuvre et d'Avertissement = SMA",
    "anchorOnly": true,
    "parentId": "s-2-2"
  },
  {
    "id": "s-2-2-f",
    "level": 3,
    "code": "F",
    "page": null,
    "title": "Le Signal (ou feu blanc) de sortie de remisage",
    "anchorOnly": true,
    "parentId": "s-2-2"
  },
  {
    "id": "s-2-2-g",
    "level": 3,
    "code": "G",
    "page": null,
    "title": "Signal (ou feu) blanc d'anticipation",
    "anchorOnly": true,
    "parentId": "s-2-2"
  },
  {
    "id": "s-2-2-h",
    "level": 3,
    "code": "H",
    "page": null,
    "title": "Lampe flash et Avertisseur sonore",
    "anchorOnly": true,
    "parentId": "s-2-2"
  },
  {
    "id": "s-2-2-i",
    "level": 3,
    "code": "I",
    "page": null,
    "title": "Signal (ou feu) de présence tension",
    "anchorOnly": true,
    "parentId": "s-2-2"
  },
  {
    "id": "s-2-2-j",
    "level": 3,
    "code": "J",
    "page": null,
    "title": "Le Signal (ou Feu) de traversée routière",
    "anchorOnly": true,
    "parentId": "s-2-2"
  },
  {
    "id": "s-2-3",
    "level": 2,
    "code": "2.3",
    "page": 28,
    "title": "CONSIGNES EN CAS DE PANNE DE LA SIGNALISATION LUMINEUSE"
  },
  {
    "id": "s-2-4",
    "level": 2,
    "code": "2.4",
    "page": 29,
    "title": "ZONES SPECIFIQUES"
  },
  {
    "id": "s-2-4-1",
    "level": 3,
    "code": "2.4.1",
    "page": 29,
    "title": "Zone Gare",
    "anchorOnly": true,
    "parentId": "s-2-4"
  },
  {
    "id": "s-2-4-2",
    "level": 3,
    "code": "2.4.2",
    "page": 31,
    "title": "Zone Albert 1er",
    "anchorOnly": true,
    "parentId": "s-2-4"
  },
  {
    "id": "s-2-4-3",
    "level": 3,
    "code": "2.4.3",
    "page": 32,
    "title": "Zone Corum",
    "anchorOnly": true,
    "parentId": "s-2-4"
  },
  {
    "id": "s-2-5",
    "level": 2,
    "code": "2.5",
    "page": 33,
    "title": "PANNEAUX FIXES DE SIGNALISATION"
  },
  {
    "id": "s-2-5-a",
    "level": 3,
    "code": "A",
    "page": null,
    "title": "Vitesse autorisée",
    "anchorOnly": true,
    "parentId": "s-2-5"
  },
  {
    "id": "s-2-5-b",
    "level": 3,
    "code": "B",
    "page": 35,
    "title": "Zones de télécommande",
    "anchorOnly": true,
    "parentId": "s-2-5"
  },
  {
    "id": "s-2-5-c",
    "level": 3,
    "code": "C",
    "page": 36,
    "title": "Clou de positionnement",
    "anchorOnly": true,
    "parentId": "s-2-5"
  },
  {
    "id": "s-2-5-d",
    "level": 3,
    "code": "D",
    "page": 36,
    "title": "Panneaux Limite de manœuvre",
    "anchorOnly": true,
    "parentId": "s-2-5"
  },
  {
    "id": "s-2-6",
    "level": 2,
    "code": "2.6",
    "page": 37,
    "title": "PANNEAUX TEMPORAIRES"
  },
  {
    "id": "s-2-6-a",
    "level": 3,
    "code": "A",
    "page": null,
    "title": "Panneaux de chantier",
    "anchorOnly": true,
    "parentId": "s-2-6"
  },
  {
    "id": "s-2-6-b",
    "level": 3,
    "code": "B",
    "page": null,
    "title": "Panneaux d'Arrêt absolu",
    "anchorOnly": true,
    "parentId": "s-2-6"
  }
];
