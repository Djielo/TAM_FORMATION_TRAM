/**
 * RCT EXP-CSG-01-17 — chapitre 4 (pages 59–76) + annexe 5.1.
 * Texte retranscrit depuis les scans RCT (docs/rct-img/00X.jpg)
 */

export const RCT_LECTURE_CH4_SECTIONS = [
  {
    "id": "p59",
    "level": 1,
    "code": "4",
    "page": 59,
    "title": "Sommaire — chapitre 4",
    "blocks": [
      {
        "type": "page-scan",
        "src": "059.jpg",
        "caption": "Page 59/76"
      },
      {
        "type": "sommaire-ch2",
        "chapter": "4. CONSIGNES D'URGENCE",
        "entries": [
          {
            "title": "4.1 - CONSIGNES GENERALES EN CAS D'URGENCE",
            "page": 60
          },
          {
            "title": "4.2 - ACCIDENTS & AGRESSIONS",
            "page": 61,
            "subs": [
              "A - Accident matériel",
              "B - Accident corporel",
              "C - Chute ou accident : cas d'une personne engagée sous la rame",
              "D - Agression ou malaise du conducteur"
            ]
          },
          {
            "title": "4.3 - DERAILLEMENT D'UNE RAME",
            "page": 64
          },
          {
            "title": "4.4 - INCIDENTS A BORD DES RAMES",
            "page": 65,
            "subs": [
              "A - Agression, malaise, chute ou décès d'un voyageur",
              "B - Bris de vitre",
              "C - Incident de pare- brise",
              "D - Incendie à bord",
              "E - Alerte à la bombe ou colis suspect à bord"
            ]
          },
          {
            "title": "4.5 - INCIDENTS AUX ABORDS DE LA VOIE",
            "page": 69,
            "subs": [
              "A - Alerte à la bombe ou aux paquets suspects aux abords de la voie",
              "B - Chute de la ligne aérienne et risques électriques",
              "C - Inondation de la voie",
              "D - Accident sur la plate-forme, Chute d'une personne sur la voie"
            ]
          },
          {
            "title": "4.6 - ANOMALIES CONSTATEES EN LIGNE",
            "page": 73,
            "subs": [
              "A - Incident imposant l'arrêt de la rame",
              "B - Incident n'imposant pas l'arrêt de la rame"
            ]
          },
          {
            "title": "4.7 - IMMOBILISATION ET EVACUATION D'UNE RAME",
            "page": 74,
            "subs": [
              "A - Immobilisation en pleine voie",
              "B - Evacuation d'une rame en pleine voie",
              "C - Immobilisation d'une rame dans le tunnel",
              "D - Evacuation d'une rame dans le tunnel"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "s-4-1",
    "level": 2,
    "code": "4.1",
    "page": 60,
    "title": "CONSIGNES GENERALES EN CAS D'URGENCE",
    "blocks": [
      {
        "type": "page-scan",
        "src": "060.jpg",
        "caption": "Page 60/76"
      },
      {
        "type": "rct-section",
        "text": "4.1 - CONSIGNES GENERALES EN CAS D'URGENCE"
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Incident ou accident imposant l'arrêt de la rame :",
            "bold": true,
            "underline": true
          }
        ]
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Arrêt de la rame."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Enclenchement des feux de détresse."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Appel du PCC par un message flash donnant la position du tramway, sa direction, la nature de l'incident."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Information des clients à bord de la rame."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "warning",
        "icon": true,
        "lines": [
          {
            "text": "Ces 4 consignes s'appliquent à toutes situations d'urgence imposant l'arrêt de la rame !",
            "red": true
          },
          {
            "parts": [
              {
                "t": "En cas d'arrêt prolongé, et en accord avec le PCC, faire évacuer la rame",
                "red": true,
                "underline": true
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Situation imposant un départ urgent de la rame :",
            "bold": true,
            "underline": true
          }
        ]
      },
      {
        "type": "hand-p",
        "text": "Dans le cas où la situation d'urgence impose de dégager la rame le plus vite possible de la zone de danger :"
      },
      {
        "type": "arrow-ul",
        "tone": "plain",
        "items": [
          "Cas d'un début d'incendie à proximité de la rame.",
          "Cas de jets de projectiles sur la rame.",
          "Tout autre cas justifiant un départ immédiat de la rame."
        ]
      },
      {
        "type": "p",
        "text": "Le conducteur est autorisé à quitter en urgence la zone dangereuse, quitte à anticiper son départ du terminus, et à prévenir le PCC une fois le danger écarté."
      },
      {
        "type": "p",
        "text": "Cette évacuation doit cependant s'effectuer dans le respect des règles de circulation (respect de la SIG routière et ferroviaire)."
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "En cas d'incident grave :",
            "bold": true,
            "underline": true
          }
        ]
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "En attendant l'arrivée d'un responsable hiérarchique, c'est le conducteur qui assure la fonction de "
          },
          {
            "t": "coordinateur",
            "bold": true,
            "blue": true
          },
          {
            "t": " sur les lieux de l'incident. Le "
          },
          {
            "t": "coordinateur",
            "bold": true,
            "blue": true
          },
          {
            "t": " doit notamment recueillir les témoignages et rendre compte de l'évolution de la situation au PCC."
          }
        ]
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Une fois arrivé sur les lieux, le responsable hiérarchique le plus élevé prend le commandement à titre de "
          },
          {
            "t": "coordinateur",
            "bold": true,
            "blue": true
          },
          {
            "t": " et devient l'interlocuteur des Pompiers et de la Police. Dès que la gestion de l'incident le permet, un agent de maîtrise présent sur les lieux mène un "
          },
          {
            "t": "entretien de restitution et d'analyse",
            "bold": true,
            "blue": true,
            "italic": true
          },
          {
            "t": " avec le conducteur."
          }
        ]
      }
    ]
  },
  {
    "id": "s-4-2",
    "level": 2,
    "code": "4.2",
    "page": 61,
    "title": "ACCIDENTS & AGRESSIONS",
    "blocks": [
      {
        "type": "page-scan",
        "src": "061.jpg",
        "caption": "Page 61/76"
      },
      {
        "type": "rct-section",
        "text": "4.2 - ACCIDENTS & AGRESSIONS"
      },
      {
        "type": "anchor",
        "id": "s-4-2-a"
      },
      {
        "type": "rct-sub",
        "text": "A - Accident matériel"
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Arrêter la rame, mettre les feux de détresse."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Faire un appel d'urgence et informer les clients."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Prendre toutes les dispositions afin d'éviter un autre accident."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Relever l'identité des témoins."
                  }
                ]
              }
            ]
          },
          {
            "n": "5",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Remplir la fiche de PRE CONSTAT ACCIDENT et noter les coordonnées du tiers sur sa feuille de route. "
                  },
                  {
                    "t": "Il est impératif que la rédaction des documents se fasse dans la rame avec les tiers afin que le conducteur soit joignable à tout moment par le PCC."
                  }
                ]
              }
            ]
          },
          {
            "n": "6",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Donner l'exemplaire à remettre au tiers."
                  }
                ]
              }
            ]
          },
          {
            "n": "7",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Informer le PCC de la mise à disposition de la rame."
                  }
                ]
              }
            ]
          },
          {
            "n": "8",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Remettre le CONSTAT ACCIDENT avec la partie A remplie et signée, le jour même au Pcc ou dans la boite au lettre rouge constat sur JP."
                  }
                ]
              }
            ]
          },
          {
            "n": "9",
            "nColor": "teal",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Noter l'accident sur la feuille de route en précisant les circonstances."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "warning",
        "icon": true,
        "lines": [
          {
            "text": "En cas de choc latéral violent sur la partie avant de la rame,",
            "red": true
          },
          {
            "text": "mettre le FS : risques électriques au niveau de la descente de la Haute Tension.",
            "red": true
          }
        ]
      },
      {
        "type": "warning",
        "icon": true,
        "lines": [
          {
            "text": "Le déplacement des véhicules n'est possible que sur ordre du PCC.",
            "red": true
          },
          {
            "text": "La reprise du service n'est possible que sur ordre du PCC.",
            "red": true
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "062.jpg",
        "caption": "Page 62/76"
      },
      {
        "type": "anchor",
        "id": "s-4-2-b"
      },
      {
        "type": "rct-sub",
        "text": "B - Accident corporel"
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Arrêter la rame, mettre les feux de détresse."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Faire un appel d'urgence, prévenir les clients."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Prendre toutes les dispositions afin d'éviter un autre accident et protéger les blessés"
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Relever l'état du blessé : conscient ou inconscient, nature des blessures, âge, traitements médicaux... "
                  },
                  {
                    "t": "Même dans le cas où le blessé est à l'intérieur de la rame, le conducteur doit sortir de sa loge pour pouvoir fournir un signalement précis.",
                    "blue": true
                  }
                ]
              }
            ]
          },
          {
            "n": "5",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Communiquer ces informations au PCC."
                  }
                ]
              }
            ]
          },
          {
            "n": "6",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Se conformer aux ordres du PCC."
                  }
                ]
              }
            ]
          },
          {
            "n": "7",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Réceptionner les secours et se mettre à leur disposition."
                  }
                ]
              }
            ]
          },
          {
            "n": "8",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Rechercher des témoins."
                  }
                ]
              }
            ]
          },
          {
            "n": "9",
            "nColor": "teal",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Rédiger la fiche de "
                  },
                  {
                    "t": "CONSTAT CORPOREL",
                    "bold": true
                  },
                  {
                    "t": ", dans la rame afin que le conducteur soit joignable à tout moment par le PCC et noter les coordonnées des victimes et des témoins."
                  }
                ]
              }
            ]
          },
          {
            "n": "10",
            "nColor": "teal",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Appeler le PCC pour avoir l'autorisation de reprise du service."
                  }
                ]
              }
            ]
          },
          {
            "n": "11",
            "nColor": "green",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Remettre au PCC le "
                  },
                  {
                    "t": "CONSTAT CORPOREL",
                    "bold": true
                  },
                  {
                    "t": " ainsi que le "
                  },
                  {
                    "t": "CONSTAT ACCIDENT",
                    "bold": true
                  },
                  {
                    "t": " avec la partie B remplie et signée."
                  }
                ]
              }
            ]
          },
          {
            "n": "12",
            "nColor": "green",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Noter l'accident sur la feuille de route en précisant les circonstances."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "warning",
        "icon": true,
        "lines": [
          {
            "text": "En cas de blessures en apparence légères, si la victime refuse d'être secourue, le conducteur ne doit pas reprendre son service sans accord du PCC.",
            "red": true
          },
          {
            "text": "Même dans ce cas, le conducteur doit recueillir les coordonnées de la victime.",
            "red": true
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "063.jpg",
        "caption": "Page 63/76"
      },
      {
        "type": "anchor",
        "id": "s-4-2-c"
      },
      {
        "type": "rct-sub",
        "text": "C - Chute ou accident : cas d'une personne engagée sous la rame"
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Arrêter la rame, mettre les feux de détresse."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Mettre le frein de secours (FS), qui assure la coupure de l'alimentation électrique de la rame (ouverture disjoncteur)."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Faire un appel d'urgence "
                  },
                  {
                    "t": "(avant de couper la batterie !)",
                    "red": true
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Abaisser la pantographe et dé-préparer la rame si la victime est engagée sous la rame, y compris "
                  },
                  {
                    "t": "coupure batterie",
                    "blue": true
                  },
                  {
                    "t": "."
                  }
                ]
              }
            ]
          },
          {
            "n": "5",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Informer les clients."
                  }
                ]
              }
            ]
          },
          {
            "n": "6",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Protéger la personne blessée et relever son état : Conscient ou inconscient, nature des blessures, incarcération ou non, renseignements particuliers : âge, traitements médicaux..."
                  }
                ]
              }
            ]
          },
          {
            "n": "7",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Réceptionner les secours et se mettre à leur disposition."
                  }
                ]
              }
            ]
          },
          {
            "n": "8",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Remettre au PCC le CONSTAT CORPOREL ainsi que le CONSTAT ACCIDENT avec la partie B remplie et signée."
                  }
                ]
              }
            ]
          },
          {
            "n": "9",
            "nColor": "teal",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Noter l'accident sur la feuille de route."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "warning",
        "icon": true,
        "align": "center",
        "lines": [
          {
            "text": "Si la victime est engagée sous le tramway, seuls les Pompiers sont autorisés à faire déplacer la rame !",
            "red": true
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "064.jpg",
        "caption": "Page 64/76"
      },
      {
        "type": "anchor",
        "id": "s-4-2-d"
      },
      {
        "type": "rct-sub",
        "text": "D - Agression ou malaise du conducteur"
      },
      {
        "type": "hand-p",
        "text": "En cas de malaise ou d'agression à l'intérieur de la cabine, le conducteur doit :"
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Arrêter la rame, mettre les feux de détresse."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Enclencher "
                  },
                  {
                    "t": "le frein de secours (FS)",
                    "bold": true,
                    "blue": true
                  },
                  {
                    "t": "."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Déclencher l'appel de détresse."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Dans la mesure du possible",
                    "bold": true,
                    "italic": true
                  },
                  {
                    "t": ", Informer la clientèle."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-4-3"
      },
      {
        "type": "rct-section",
        "text": "4.3 - DERAILLEMENT DE LA RAME"
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Arrêter la rame, mettre les feux de détresse."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Faire un appel d'urgence."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Informer les clients."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Abaisser le pantographe "
                  },
                  {
                    "t": "après contrôle visuel de la LAC",
                    "bold": true,
                    "underline": true
                  },
                  {
                    "t": " (risque d'arrachement)."
                  }
                ]
              }
            ]
          },
          {
            "n": "5",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Faire évacuer la rame, après l'accord du PCC "
                  },
                  {
                    "t": "(voir chapitre 4.7.B - 4.7.D)",
                    "italic": true
                  },
                  {
                    "t": "."
                  }
                ]
              }
            ]
          },
          {
            "n": "6",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Dé-préparer la rame."
                  }
                ]
              }
            ]
          },
          {
            "n": "7",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Signaler la présence du tramway avec le triangle de pré-signalisation."
                  }
                ]
              }
            ]
          },
          {
            "n": "8",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Réceptionner les secours et se mettre à leur disposition."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "warning",
        "icon": true,
        "lines": [
          {
            "text": "Il est interdit au conducteur d'entamer lui-même une tentative de ré-enraillement.",
            "red": true
          }
        ]
      }
    ]
  },
  {
    "id": "s-4-4",
    "level": 2,
    "code": "4.4",
    "page": 65,
    "title": "INCIDENTS A BORD DE LA RAME",
    "blocks": [
      {
        "type": "page-scan",
        "src": "065.jpg",
        "caption": "Page 65/76"
      },
      {
        "type": "rct-section",
        "text": "4.4 - INCIDENTS A BORD DE LA RAME"
      },
      {
        "type": "anchor",
        "id": "s-4-4-a"
      },
      {
        "type": "rct-sub",
        "text": "A - Agression, malaise, chute ou décès d'un voyageur"
      },
      {
        "type": "hand-p",
        "text": "En cas de malaise ou d'agression à l'intérieur de la rame, le conducteur doit :"
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Faire un appel d'urgence."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Arrêter la rame (de préférence à la station la plus proche), mettre les feux de détresse."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Enlever la clé KC et fermer la cabine."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Se rendre auprès de la personne blessée et lui porter assistance."
                  }
                ]
              }
            ]
          },
          {
            "n": "5",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Rappeler le PCC après évaluation de la situation et se conformer à ses instructions."
                  }
                ]
              }
            ]
          },
          {
            "n": "6",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Noter les coordonnées des témoins de l'incident."
                  }
                ]
              }
            ]
          },
          {
            "n": "7",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Le cas échéant selon la gravité de l'incident :",
                    "italic": true
                  },
                  {
                    "t": " Réceptionner les secours et se mettre à leur disposition."
                  }
                ]
              }
            ]
          },
          {
            "n": "8",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Noter l'incident sur la feuille de route."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "066.jpg",
        "caption": "Page 66/76"
      },
      {
        "type": "anchor",
        "id": "s-4-4-b"
      },
      {
        "type": "rct-sub",
        "text": "B - Bris de vitre"
      },
      {
        "type": "hand-p",
        "text": "En cas de bris de vitre latérale, ou de bris de glace de cabine à l'intérieur de la rame :"
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Arrêter la rame si possible en station et mettre les feux de détresse."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Faire un appel d'urgence."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "S'assurer qu'il n'y a pas de blessé."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Eloigner les clients se trouvant à proximité de la vitre brisée."
                  }
                ]
              }
            ]
          },
          {
            "n": "5",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Après avoir informé le PCC de la situation, attendre ses ordres : évacuation de la rame, ou fin de course en commercial jusqu'au prochain terminus si la vitre ne présente pas de danger pour la clientèle ou si du personnel de TaM à bord peut sécuriser la zone à risque."
                  }
                ]
              }
            ]
          },
          {
            "n": "6",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Noter l'incident sur la feuille de route."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-4-4-c"
      },
      {
        "type": "rct-sub",
        "text": "C - Incident de pare- brise"
      },
      {
        "type": "hand-p",
        "text": "En cas de casse du pare-brise de la cabine de conduite, ou de problème de visibilité influant sur la sécurité :"
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Arrêter la rame si possible en station et mettre les feux de détresse."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Faire un appel d'urgence."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Informer la clientèle."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Faire évacuer la rame."
                  }
                ]
              }
            ]
          },
          {
            "n": "5",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Apres avoir informé le PCC de la fin de l'évacuation, attendre ses ordres."
                  }
                ]
              }
            ]
          },
          {
            "n": "6",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Noter l'incident sur la feuille de route."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "067.jpg",
        "caption": "Page 67/76"
      },
      {
        "type": "anchor",
        "id": "s-4-4-d"
      },
      {
        "type": "rct-sub",
        "text": "D - Incendie à bord"
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Arrêter la rame et mettre les feux de détresse."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Procéder à l'évacuation des voyageurs "
                  },
                  {
                    "t": "(voir chapitre 4.7.B - 4.7.D)",
                    "italic": true
                  },
                  {
                    "t": "."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Faire un appel d'urgence."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Evaluer le sinistre."
                  }
                ]
              }
            ]
          },
          {
            "n": "5",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Abaisser le pantographe et dé-préparer la rame."
                  }
                ]
              }
            ]
          },
          {
            "n": "6",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "S'assurer que personne n'est resté à l'intérieur de la rame."
                  }
                ]
              }
            ]
          },
          {
            "n": "7",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Combattre le feu à l'aide des extincteurs."
                  }
                ]
              }
            ]
          },
          {
            "n": "8",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Réceptionner les secours et se mettre à leur disposition."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "arrow-p",
        "tone": "blue",
        "parts": [
          {
            "t": "Les mêmes consignes s'appliquent pour un incendie sur le lieu de remisage.",
            "blue": true
          }
        ]
      },
      {
        "type": "warning",
        "icon": true,
        "lines": [
          {
            "text": "Après un incendie même léger, il est formellement interdit de remonter le pantographe sans autorisation du PCC.",
            "red": true
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "068.jpg",
        "caption": "Page 68/76"
      },
      {
        "type": "anchor",
        "id": "s-4-4-e"
      },
      {
        "type": "rct-sub",
        "text": "E - Alerte à la bombe ou colis suspect à bord (plan Vigipirate)"
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "En cas de présence d'un paquet insolite ou suspect dans la rame, l'attitude recommandée est la "
          },
          {
            "t": "prudence",
            "bold": true
          },
          {
            "t": ", sans exagérer le risque encouru."
          }
        ]
      },
      {
        "type": "callout-box",
        "tone": "yellow",
        "icon": true,
        "blocks": [
          {
            "type": "p",
            "parts": [
              {
                "t": "Un colis suspect ne doit ni être touché ni être déplacé !",
                "bold": true,
                "red": true
              }
            ]
          },
          {
            "type": "p",
            "parts": [
              {
                "t": "Précision :",
                "bold": true,
                "italic": true
              },
              {
                "t": " tout objet abandonné ne doit pas être considéré de fait comme un colis suspect. La nature de l'objet (documents, trousseau de clés, paquet, sac ouvert ou hermétiquement fermé...), son volume, doivent conduire les agents sur place à apprécier par eux-mêmes le risque potentiel lié à chaque objet, en faisant preuve de bon sens et de discernement.",
                "italic": true
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Cas 1) :",
            "bold": true
          },
          {
            "t": " un colis suspect est repéré par le conducteur lors du ",
            "bold": true
          },
          {
            "t": "changement de loge",
            "bold": true
          }
        ]
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "En présence d'un objet suspect : appeler le PCC par appel d'urgence."
                  }
                ]
              }
            ],
            "extra": {
              "parts": [
                {
                  "t": "Préciser la nature et l'emplacement de l'objet.",
                  "bold": true,
                  "blue": true
                }
              ]
            }
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Se conformer aux instructions du PCC"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Cas 2) :",
            "bold": true
          },
          {
            "t": " un colis suspect est signalé "
          },
          {
            "t": "en ligne",
            "bold": true
          }
        ]
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Identifier l'objet, et s'enquérir de son éventuel propriétaire."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Appeler le PCC et se conformer à ses instructions."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "En cas de difficulté de liaison radio :",
                    "italic": true
                  },
                  {
                    "t": " "
                  },
                  {
                    "t": "Evacuer la rame et Rejoindre en haut le pied le terminus le plus proche.",
                    "bold": true
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Une fois la rame stationnée en tiroir, s'éloigner de la rame et faire respecter un périmètre de sécurité, en attendant l'arrivée de la Police et des équipes d'intervention de TaM.",
                    "bold": true
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "s-4-5",
    "level": 2,
    "code": "4.5",
    "page": 69,
    "title": "INCIDENTS AUX ABORDS DE LA VOIE",
    "blocks": [
      {
        "type": "page-scan",
        "src": "069.jpg",
        "caption": "Page 69/76"
      },
      {
        "type": "rct-section",
        "text": "4.5 - INCIDENTS AUX ABORDS DE LA VOIE"
      },
      {
        "type": "anchor",
        "id": "s-4-5-a"
      },
      {
        "type": "rct-sub",
        "text": "A - Alerte à la bombe ou au colis suspect aux abords de la voie"
      },
      {
        "type": "hand-p",
        "text": "Dans de telles circonstances, l'attitude recommandée est la prudence, sans exagérer le risque encouru."
      },
      {
        "type": "callout-box",
        "tone": "yellow",
        "icon": true,
        "blocks": [
          {
            "type": "p",
            "parts": [
              {
                "t": "Un colis suspect ne doit ni être touché ni être déplacé !",
                "bold": true,
                "red": true
              }
            ]
          },
          {
            "type": "p",
            "parts": [
              {
                "t": "Précision :",
                "bold": true,
                "italic": true
              },
              {
                "t": " tout objet abandonné ne doit pas être considéré de fait comme un colis suspect. La nature de l'objet (documents, trousseau de clés, paquet, sac ouvert ou hermétiquement fermé...), son volume, doivent conduire les agents sur place à apprécier par eux-mêmes le risque potentiel lié à chaque objet, en faisant preuve de bon sens et de discernement.",
                "italic": true
              }
            ]
          }
        ]
      },
      {
        "type": "hand-p",
        "text": "En cas d'alerte à la bombe (appel PCC ou intervention Police sur site) :"
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Arrêter la rame, mettre les feux de détresse et se conformer aux instructions reçues.",
                    "bold": true
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "En cas d'ordre d'évacuer la rame :",
                    "bold": true,
                    "blue": true,
                    "italic": true
                  },
                  {
                    "t": " prévenir la clientèle et procéder à l'évacuation en respectant les règles de sécurité ",
                    "bold": true
                  },
                  {
                    "t": "(voir chapitre 4.6.B)",
                    "bold": true,
                    "italic": true
                  },
                  {
                    "t": ".",
                    "bold": true
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Se mettre à la disposition de la Police et rendre compte au PCC.",
                    "bold": true
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "070.jpg",
        "caption": "Page 70/76"
      },
      {
        "type": "anchor",
        "id": "s-4-5-b"
      },
      {
        "type": "rct-sub",
        "text": "B - Chute de la ligne aérienne et risques électriques"
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Arrêter la rame, mettre les feux de détresse."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Faire un appel d'urgence."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Informer les clients de l'interdiction de descendre de la rame et des risques encourus."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Abaisser le pantographe et dé-préparer la rame."
                  }
                ]
              }
            ]
          },
          {
            "n": "5",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Attendre l'ordre du PCC pour faire descendre les clients : "
                  },
                  {
                    "t": "la descente des clients ne peut s'effectuer que lorsque le PCC confirme que la ligne aérienne n'est pas alimentée.",
                    "bold": true,
                    "blue": true
                  }
                ]
              }
            ]
          },
          {
            "n": "6",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Faire descendre les clients du côté où ils encourent le moins de risque, après accord du PCC "
                  },
                  {
                    "t": "en cas de descente côté entrevoie.",
                    "bold": true,
                    "blue": true
                  }
                ]
              }
            ]
          },
          {
            "n": "7",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "En cas d'incident sur la rame (avarie sur le pantographe par exemple), il est interdit au conducteur de tenter de monter en toiture, du fait des risques électriques."
                  }
                ]
              }
            ]
          },
          {
            "n": "8",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Noter l'accident sur la feuille de route."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "Les mêmes consignes s'appliquent en cas de chute d'un arbre sur la voie ou sur une rame.",
            "bold": true,
            "italic": true,
            "blue": true
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "071.jpg",
        "caption": "Page 71/76"
      },
      {
        "type": "anchor",
        "id": "s-4-5-c"
      },
      {
        "type": "rct-sub",
        "text": "C - Inondation de la voie"
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "A noter : des repères de hauteur sont placés à proximité de la voie dans les secteurs à risque.",
            "italic": true,
            "blue": true
          }
        ]
      },
      {
        "type": "hand-p",
        "text": "En cas d'inondation de la voie inférieure à 10 cm"
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Franchir la zone inondée en Conduite Manoeuvre = 5 km/h."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Informer le PCC."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "En cas d'inondation de la voie supérieure à 10 cm = au-dessus du niveau "
          },
          {
            "t": "rouge",
            "red": true
          },
          {
            "t": " du repère"
          }
        ]
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Arrêter la rame et mettre les feux de détresse."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Faire un appel d'urgence."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Se conformer aux instructions du PCC."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Informer les voyageurs de la situation."
                  }
                ]
              }
            ]
          },
          {
            "n": "5",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "En cas d'évacuation suite à une longue immobilisation de la rame, précisez aux voyageurs (notamment les PMR et les enfants), qu'ils peuvent rester à bord de la rame s'ils le souhaitent, en attendant l'arrivée d'une assistance extérieur."
                  }
                ]
              }
            ]
          },
          {
            "n": "6",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Noter l'incident sur la feuille de route."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "072.jpg",
        "caption": "Page 72/76"
      },
      {
        "type": "anchor",
        "id": "s-4-5-d"
      },
      {
        "type": "rct-sub",
        "text": "D - Accident sur la plate-forme. Chute d'une personne sur la voie"
      },
      {
        "type": "hand-p",
        "text": "Lorsqu'un conducteur est témoin d'un accident survenant sur la plate-forme mais n'impliquant pas son matériel, il doit :"
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "parts": [
              {
                "t": "Arrêter la rame et mettre les feux de détresse.",
                "bold": true
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "parts": [
              {
                "t": "Faire un appel d'urgence et informer les clients.",
                "bold": true
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "parts": [
              {
                "t": "Prendre toutes les mesures pour porter secours et protéger les blessés le cas échéant.",
                "bold": true
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "parts": [
              {
                "t": "Prendre toutes les dispositions afin d'éviter un autre accident.",
                "bold": true
              }
            ]
          },
          {
            "n": "5",
            "nColor": "blue2",
            "boxed": true,
            "parts": [
              {
                "t": "Dès que la reprise du service est possible, informer le PCC.",
                "bold": true
              }
            ]
          },
          {
            "n": "6",
            "nColor": "blue2",
            "boxed": true,
            "parts": [
              {
                "t": "Noter l'incident sur la feuille de route.",
                "bold": true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "s-4-6",
    "level": 2,
    "code": "4.6",
    "page": 73,
    "title": "ANOMALIES CONSTATEES EN LIGNE",
    "blocks": [
      {
        "type": "page-scan",
        "src": "073.jpg",
        "caption": "Page 73/76"
      },
      {
        "type": "rct-section",
        "text": "4.6 - ANOMALIES CONSTATEES EN LIGNE"
      },
      {
        "type": "anchor",
        "id": "s-4-6-a"
      },
      {
        "type": "rct-sub",
        "text": "A - Incidents imposant l'arrêt de la rame"
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "Dans tous les cas suivants le conducteur de tramway doit impérativement "
          },
          {
            "t": "arrêter sa rame et appeler le PCC",
            "bold": true,
            "blue": true
          },
          {
            "t": " qui lui donnera la consigne à suivre :"
          }
        ]
      },
      {
        "type": "zone-table",
        "items": [
          {
            "marker": "chevron",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Ligne aérienne endommagée ou détendue."
                  }
                ]
              }
            ]
          },
          {
            "marker": "chevron",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Tendeur de ligne aérienne cassé."
                  }
                ]
              }
            ]
          },
          {
            "marker": "chevron",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Potence de ligne aérienne affaissée."
                  }
                ]
              }
            ]
          },
          {
            "marker": "chevron",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Corps étranger sur la voie ou dans la gorge du rail et les aiguillages."
                  }
                ]
              }
            ]
          },
          {
            "marker": "chevron",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Affaissement de la voie, soulèvement des pavés de la plate forme."
                  }
                ]
              }
            ]
          },
          {
            "marker": "chevron",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Tout signal ou feux mal orientés et illisibles."
                  }
                ]
              }
            ]
          },
          {
            "marker": "chevron",
            "nColor": "teal",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Absence du conducteur au poste de conduite lors du croisement d'une rame arrêtée."
                  }
                ]
              }
            ]
          },
          {
            "marker": "chevron",
            "nColor": "teal",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Individu accroché à une rame"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-4-6-b"
      },
      {
        "type": "rct-sub",
        "text": "B - Incidents n'imposant pas l'arrêt immédiat de la rame"
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "Dans tous les cas suivants le conducteur de tramway doit impérativement "
          },
          {
            "t": "prévenir le PCC",
            "bold": true,
            "blue": true
          },
          {
            "t": " :"
          }
        ]
      },
      {
        "type": "zone-table",
        "items": [
          {
            "marker": "chevron",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Feux de croisements, feux stops ou positions éteints sur une autre rame."
                  }
                ]
              }
            ]
          },
          {
            "marker": "chevron",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Toutes anomalies extérieures constatées sur une autre rame."
                  }
                ]
              }
            ]
          },
          {
            "marker": "chevron",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Objet accroché à une rame."
                  }
                ]
              }
            ]
          },
          {
            "marker": "chevron",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Personnes au comportement suspect ou dangereux aux abords de la plate forme."
                  }
                ]
              }
            ]
          },
          {
            "marker": "chevron",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Barrières détériorées aux abords de la plate forme."
                  }
                ]
              }
            ]
          },
          {
            "marker": "chevron",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Arbre ou poteau menaçant de tomber sur la voie."
                  }
                ]
              }
            ]
          },
          {
            "marker": "chevron",
            "nColor": "teal",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Voitures stationnées sur voie."
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "s-4-7",
    "level": 2,
    "code": "4.7",
    "page": 74,
    "title": "IMMOBILISATION ET EVACUATION D'UNE RAME",
    "blocks": [
      {
        "type": "page-scan",
        "src": "074.jpg",
        "caption": "Page 74/76"
      },
      {
        "type": "rct-section",
        "text": "4.7 - IMMOBILISATION ET EVACUATION D'UNE RAME"
      },
      {
        "type": "anchor",
        "id": "s-4-7-a"
      },
      {
        "type": "rct-sub",
        "text": "A - Immobilisation en pleine voie"
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Mettre les feux de détresse (ou le triangle de pré-signalisation en cas de panne)."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Faire un appel d'urgence."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Informer la clientèle."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-4-7-b"
      },
      {
        "type": "rct-sub",
        "text": "B - Evacuation d'une rame en pleine voie"
      },
      {
        "type": "arrow-p",
        "emphasis": true,
        "parts": [
          {
            "t": "Après l'accord confirmé du PCC :",
            "bold": true,
            "blue": true
          }
        ]
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Informer les clients de l'évacuation de la rame, en les incitants à la prudence."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Ouvrir une des portes du côté droit dans le sens de la marche."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Descendre le premier et s'assurer qu'aucun danger ne s'oppose à l'évacuation."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Inviter les voyageurs à descendre en aidant les personnes en difficulté."
                  }
                ]
              }
            ]
          },
          {
            "n": "5",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Prévenir le PCC de la fin de l'évacuation."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "warning",
        "icon": true,
        "lines": [
          {
            "text": "En cas d'incendie ou de force majeure, le conducteur peut procéder à l'évacuation sans autorisation du PCC.",
            "red": true
          },
          {
            "text": "En cas de danger à évacuer la rame côté droit, l'évacuation ne pourra se faire côté entrevoie qu'après autorisation du PCC qui doit s'assurer de l'arrêt absolu de toute circulation antagoniste.",
            "red": true
          }
        ]
      },
      {
        "type": "boxed",
        "tone": "plain",
        "blocks": [
          {
            "type": "p",
            "parts": [
              {
                "t": "Particularité de la voie unique",
                "bold": true,
                "underline": true
              },
              {
                "t": " : en cas d'impossibilité de transbordement des voyageurs sur une autre rame,"
              }
            ]
          },
          {
            "type": "p",
            "parts": [
              {
                "t": "Sur le tronçon Sabines – Saint Jean de Vedas :",
                "bold": true
              },
              {
                "t": " les voyageurs seront dirigés sur le cheminement piéton qui se trouve en bordure de voie, jusqu'au point d'arrêt des bus de substitution où ils seront pris en charge."
              }
            ]
          },
          {
            "type": "p",
            "parts": [
              {
                "t": "Sur le tronçon Notre Dame de Sablassou - Jacou :",
                "bold": true
              },
              {
                "t": " les voyageurs emprunteront la piste cyclable située en bordure de voie, jusqu'au point d'arrêt des bus de substitution où ils seront pris en charge."
              }
            ]
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "075.jpg",
        "caption": "Page 75/76"
      },
      {
        "type": "anchor",
        "id": "s-4-7-c"
      },
      {
        "type": "rct-sub",
        "text": "C - Immobilisation d'une rame dans le tunnel"
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Mettre les feux de détresse (ou le triangle de pré-signalisation en cas de panne)."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Faire un appel d'urgence, et un appel de détresse en l'absence de réponse."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Informer la clientèle."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-4-7-d"
      },
      {
        "type": "rct-sub",
        "text": "D - Evacuation d'une rame dans le tunnel"
      },
      {
        "type": "arrow-p",
        "emphasis": true,
        "parts": [
          {
            "t": "Après l'accord confirmé du PCC :",
            "bold": true,
            "blue": true
          }
        ]
      },
      {
        "type": "zone-table",
        "items": [
          {
            "n": "1",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Informer les clients de l'évacuation de la rame, en les incitants à la prudence."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Ouvrir une des portes du côté droit dans le sens de la marche."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Descendre le premier et s'assurer qu'aucun danger ne s'oppose à l'évacuation."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Inviter les voyageurs à descendre en aidant les personnes en difficulté, et les diriger vers la sortie la plus proche."
                  }
                ]
              }
            ]
          },
          {
            "n": "5",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Prévenir le PCC de la fin de l'évacuation."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "arrow-p",
        "tone": "blue",
        "parts": [
          {
            "t": "Dans tous les cas de A à D : Noter l'incident sur la feuille de route.",
            "bold": true,
            "blue": true
          }
        ]
      }
    ]
  },
  {
    "id": "s-5-1",
    "level": 2,
    "code": "5.1",
    "page": 76,
    "title": "SAT : Sommaire des codes",
    "blocks": [
      {
        "type": "page-scan",
        "src": "076.jpg",
        "caption": "Page 76/76"
      },
      {
        "type": "chapter-banner",
        "text": "5. ANNEXES"
      },
      {
        "type": "rct-section",
        "text": "5.1 – SAT : Sommaire des codes"
      },
      {
        "type": "sat-codes",
        "tables": [
          {
            "title": "Carrosserie",
            "rows": [
              {
                "parts": [
                  {
                    "t": "Acrotères",
                    "bold": true
                  },
                  {
                    "t": " (rayé, etc...)",
                    "italic": true
                  }
                ],
                "code": "1001"
              },
              {
                "parts": [
                  {
                    "t": "Cache bogie",
                    "bold": true
                  },
                  {
                    "t": " (rayé, etc...)",
                    "italic": true
                  }
                ],
                "code": "1002"
              },
              {
                "parts": [
                  {
                    "t": "Fanaux",
                    "bold": true
                  },
                  {
                    "t": " (rayé, etc...)",
                    "italic": true
                  }
                ],
                "code": "1005"
              },
              {
                "parts": [
                  {
                    "t": "Imposte",
                    "bold": true
                  },
                  {
                    "t": " (rayé, etc...)",
                    "italic": true
                  }
                ],
                "code": "1023"
              },
              {
                "parts": [
                  {
                    "t": "Joue",
                    "bold": true
                  },
                  {
                    "t": " (rayé, etc...)",
                    "italic": true
                  }
                ],
                "code": "1025"
              },
              {
                "parts": [
                  {
                    "t": "Pare-brise",
                    "bold": true
                  },
                  {
                    "t": " (impact et fissure hors surface de balayage)",
                    "italic": true
                  }
                ],
                "code": "1029"
              },
              {
                "parts": [
                  {
                    "t": "Soufflet",
                    "bold": true
                  },
                  {
                    "t": " (intérieur/extérieur) (dégradé, etc..)",
                    "italic": true
                  }
                ],
                "code": "1033"
              },
              {
                "parts": [
                  {
                    "t": "Vitrage latéral cabine conducteur",
                    "bold": true
                  },
                  {
                    "t": " (gravure, etc...)",
                    "italic": true
                  }
                ],
                "code": "1040"
              },
              {
                "parts": [
                  {
                    "t": "Vitrage latéral voyageur",
                    "bold": true
                  },
                  {
                    "t": " (gravure, etc...)",
                    "italic": true
                  }
                ],
                "code": "1048"
              }
            ]
          },
          {
            "title": "Poste de conduite",
            "rows": [
              {
                "parts": [
                  {
                    "t": "Chauffage Conducteur",
                    "bold": true
                  },
                  {
                    "t": " (bruyant)",
                    "italic": true
                  }
                ],
                "code": "2009"
              },
              {
                "parts": [
                  {
                    "t": "Climatisation Conducteur",
                    "bold": true
                  },
                  {
                    "t": " (bruyant)",
                    "italic": true
                  }
                ],
                "code": "2011"
              },
              {
                "parts": [
                  {
                    "t": "Eclairage cabine",
                    "bold": true
                  },
                  {
                    "t": " (défaillant)",
                    "italic": true
                  }
                ],
                "code": "2023"
              },
              {
                "parts": [
                  {
                    "t": "Manipulateur",
                    "bold": true
                  },
                  {
                    "t": " (dur)",
                    "italic": true
                  }
                ],
                "code": "2037"
              },
              {
                "parts": [
                  {
                    "t": "Pare soleil",
                    "bold": true
                  },
                  {
                    "t": " (dégradé)",
                    "italic": true
                  }
                ],
                "code": "2043"
              },
              {
                "parts": [
                  {
                    "t": "Porte de loge",
                    "bold": true
                  },
                  {
                    "t": " (bruyante, dure, gravure, etc...)",
                    "italic": true
                  }
                ],
                "code": "2045"
              },
              {
                "parts": [
                  {
                    "t": "Repose pieds",
                    "bold": true
                  },
                  {
                    "t": " (dégradé)",
                    "italic": true
                  }
                ],
                "code": "2051"
              },
              {
                "parts": [
                  {
                    "t": "Sélection porte côté droit",
                    "bold": true
                  },
                  {
                    "t": " (voyant HS)",
                    "italic": true
                  }
                ],
                "code": "2071"
              },
              {
                "parts": [
                  {
                    "t": "Sélection porte côté gauche",
                    "bold": true
                  },
                  {
                    "t": " (voyant HS)",
                    "italic": true
                  }
                ],
                "code": "2073"
              },
              {
                "parts": [
                  {
                    "t": "Siège accompagnateur",
                    "bold": true
                  },
                  {
                    "t": " (dégradé)",
                    "italic": true
                  }
                ],
                "code": "2075"
              },
              {
                "parts": [
                  {
                    "t": "Siège CR",
                    "bold": true
                  },
                  {
                    "t": " (dégradé, réglage difficile, confort, etc...)",
                    "italic": true
                  }
                ],
                "code": "2077"
              }
            ]
          },
          {
            "title": "Salle voyageur",
            "rows": [
              {
                "parts": [
                  {
                    "t": "Afficheur voyageur (Ecran TFT)",
                    "bold": true
                  },
                  {
                    "t": " (dégradé, erroné, noir, etc..)",
                    "italic": true
                  }
                ],
                "code": "3001"
              },
              {
                "parts": [
                  {
                    "t": "Assises voyageurs",
                    "bold": true
                  },
                  {
                    "t": " (dégradées, salissures, taguées, etc...)",
                    "italic": true
                  }
                ],
                "code": "3009"
              },
              {
                "parts": [
                  {
                    "t": "Barres de maintien",
                    "bold": true
                  },
                  {
                    "t": " (dégradées, salissures, taguées, etc...)",
                    "italic": true
                  }
                ],
                "code": "3023"
              },
              {
                "parts": [
                  {
                    "t": "Chauffage passagers",
                    "bold": true
                  },
                  {
                    "t": " (manque d'efficacité, bruyant, etc..)",
                    "italic": true
                  }
                ],
                "code": "3030"
              },
              {
                "parts": [
                  {
                    "t": "Climatisation passagers",
                    "bold": true
                  },
                  {
                    "t": " (manque d'efficacité, bruyante, etc..)",
                    "italic": true
                  }
                ],
                "code": "3035"
              },
              {
                "parts": [
                  {
                    "t": "Eclairage salle",
                    "bold": true
                  },
                  {
                    "t": " (défaillant 1 sur 3 maximums)",
                    "italic": true
                  }
                ],
                "code": "3045"
              },
              {
                "parts": [
                  {
                    "t": "Portes voyageurs",
                    "bold": true
                  },
                  {
                    "t": " (bruyante, dure, gravure, sensibilité, etc...)",
                    "italic": true
                  }
                ],
                "code": "3211"
              },
              {
                "parts": [
                  {
                    "t": "Valideurs",
                    "bold": true
                  },
                  {
                    "t": " (bruyants, dégradés, endommagés, etc..)",
                    "italic": true
                  }
                ],
                "code": "3311"
              },
              {
                "parts": [
                  {
                    "t": "Voussoirs",
                    "bold": true
                  },
                  {
                    "t": " (dégradés, bruyants, etc..)",
                    "italic": true
                  }
                ],
                "code": "3050"
              }
            ]
          },
          {
            "title": "Motorisation",
            "rows": [
              {
                "parts": [
                  {
                    "t": "Bogie",
                    "bold": true
                  },
                  {
                    "t": " (bruyant)",
                    "italic": true
                  }
                ],
                "code": "4001"
              },
              {
                "parts": [
                  {
                    "t": "Roue TW",
                    "bold": true
                  },
                  {
                    "t": " (bruyante)",
                    "italic": true
                  }
                ],
                "code": "4003"
              }
            ]
          }
        ]
      }
    ]
  }
];

export const RCT_LECTURE_CH4_TOC = [
  {
    "id": "p59",
    "level": 1,
    "code": "4",
    "page": 59,
    "title": "Sommaire — chapitre 4"
  },
  {
    "id": "s-4-1",
    "level": 2,
    "code": "4.1",
    "page": 60,
    "title": "CONSIGNES GENERALES EN CAS D'URGENCE"
  },
  {
    "id": "s-4-2",
    "level": 2,
    "code": "4.2",
    "page": 61,
    "title": "ACCIDENTS & AGRESSIONS"
  },
  {
    "id": "s-4-2-a",
    "level": 3,
    "code": "A",
    "page": 61,
    "title": "Accident matériel",
    "anchorOnly": true,
    "parentId": "s-4-2"
  },
  {
    "id": "s-4-2-b",
    "level": 3,
    "code": "B",
    "page": 62,
    "title": "Accident corporel",
    "anchorOnly": true,
    "parentId": "s-4-2"
  },
  {
    "id": "s-4-2-c",
    "level": 3,
    "code": "C",
    "page": 63,
    "title": "Personne engagée sous la rame",
    "anchorOnly": true,
    "parentId": "s-4-2"
  },
  {
    "id": "s-4-2-d",
    "level": 3,
    "code": "D",
    "page": 64,
    "title": "Agression ou malaise du conducteur",
    "anchorOnly": true,
    "parentId": "s-4-2"
  },
  {
    "id": "s-4-3",
    "level": 2,
    "code": "4.3",
    "page": 64,
    "title": "DERAILLEMENT DE LA RAME"
  },
  {
    "id": "s-4-4",
    "level": 2,
    "code": "4.4",
    "page": 65,
    "title": "INCIDENTS A BORD DE LA RAME"
  },
  {
    "id": "s-4-4-a",
    "level": 3,
    "code": "A",
    "page": 65,
    "title": "Agression, malaise, chute ou décès d'un voyageur",
    "anchorOnly": true,
    "parentId": "s-4-4"
  },
  {
    "id": "s-4-4-b",
    "level": 3,
    "code": "B",
    "page": 66,
    "title": "Bris de vitre",
    "anchorOnly": true,
    "parentId": "s-4-4"
  },
  {
    "id": "s-4-4-c",
    "level": 3,
    "code": "C",
    "page": 66,
    "title": "Incident de pare-brise",
    "anchorOnly": true,
    "parentId": "s-4-4"
  },
  {
    "id": "s-4-4-d",
    "level": 3,
    "code": "D",
    "page": 67,
    "title": "Incendie à bord",
    "anchorOnly": true,
    "parentId": "s-4-4"
  },
  {
    "id": "s-4-4-e",
    "level": 3,
    "code": "E",
    "page": 68,
    "title": "Alerte à la bombe ou colis suspect",
    "anchorOnly": true,
    "parentId": "s-4-4"
  },
  {
    "id": "s-4-5",
    "level": 2,
    "code": "4.5",
    "page": 69,
    "title": "INCIDENTS AUX ABORDS DE LA VOIE"
  },
  {
    "id": "s-4-5-a",
    "level": 3,
    "code": "A",
    "page": 69,
    "title": "Colis suspect aux abords de la voie",
    "anchorOnly": true,
    "parentId": "s-4-5"
  },
  {
    "id": "s-4-5-b",
    "level": 3,
    "code": "B",
    "page": 70,
    "title": "Chute ligne aérienne",
    "anchorOnly": true,
    "parentId": "s-4-5"
  },
  {
    "id": "s-4-5-c",
    "level": 3,
    "code": "C",
    "page": 71,
    "title": "Inondation de la voie",
    "anchorOnly": true,
    "parentId": "s-4-5"
  },
  {
    "id": "s-4-5-d",
    "level": 3,
    "code": "D",
    "page": 72,
    "title": "Accident plate-forme / chute sur voie",
    "anchorOnly": true,
    "parentId": "s-4-5"
  },
  {
    "id": "s-4-6",
    "level": 2,
    "code": "4.6",
    "page": 73,
    "title": "ANOMALIES CONSTATEES EN LIGNE"
  },
  {
    "id": "s-4-6-a",
    "level": 3,
    "code": "A",
    "page": 73,
    "title": "Incidents imposant l'arrêt",
    "anchorOnly": true,
    "parentId": "s-4-6"
  },
  {
    "id": "s-4-6-b",
    "level": 3,
    "code": "B",
    "page": 73,
    "title": "Incidents sans arrêt immédiat",
    "anchorOnly": true,
    "parentId": "s-4-6"
  },
  {
    "id": "s-4-7",
    "level": 2,
    "code": "4.7",
    "page": 74,
    "title": "IMMOBILISATION ET EVACUATION D'UNE RAME"
  },
  {
    "id": "s-4-7-a",
    "level": 3,
    "code": "A",
    "page": 74,
    "title": "Immobilisation en pleine voie",
    "anchorOnly": true,
    "parentId": "s-4-7"
  },
  {
    "id": "s-4-7-b",
    "level": 3,
    "code": "B",
    "page": 74,
    "title": "Evacuation en pleine voie",
    "anchorOnly": true,
    "parentId": "s-4-7"
  },
  {
    "id": "s-4-7-c",
    "level": 3,
    "code": "C",
    "page": 75,
    "title": "Immobilisation dans le tunnel",
    "anchorOnly": true,
    "parentId": "s-4-7"
  },
  {
    "id": "s-4-7-d",
    "level": 3,
    "code": "D",
    "page": 75,
    "title": "Evacuation dans le tunnel",
    "anchorOnly": true,
    "parentId": "s-4-7"
  },
  {
    "id": "s-5-1",
    "level": 2,
    "code": "5.1",
    "page": 76,
    "title": "SAT : Sommaire des codes"
  }
];
