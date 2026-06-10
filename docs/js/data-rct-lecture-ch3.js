/**
 * RCT EXP-CSG-01-17 — chapitre 3 (pages 38–58).
 * Texte retranscrit depuis les scans RCT (docs/rct-img/00X.jpg)
 */

export const RCT_LECTURE_CH3_SECTIONS = [
  {
    "id": "p38",
    "level": 1,
    "code": "3",
    "page": 38,
    "title": "Sommaire — chapitre 3",
    "blocks": [
      {
        "type": "page-scan",
        "src": "038.jpg",
        "caption": "Page 38/76"
      },
      {
        "type": "sommaire-ch2",
        "chapter": "3. CONSIGNES DE CIRCULATION EN LIGNE",
        "entries": [
          {
            "title": "3.1 - PRISE DE SERVICE",
            "page": 39,
            "subs": [
              "A - Prise de service au dépôt",
              "B - Préparation de la rame",
              "C - Comportement du conducteur dans la rame"
            ]
          },
          {
            "title": "3.2 - CIRCULATION EN LIGNE",
            "page": 42,
            "subs": [
              "A - Ouverture de la voie sur voie double ou voie unique",
              "B - Circulation sur voie double",
              "C - Circulation sur voie unique",
              "D - Circulation en voie unique temporaire (VUT)",
              "E1, E2, E3 - Manœuvres de retournement et de rebroussement"
            ]
          },
          {
            "title": "3.3 - CIRCULATION HAUT LE PIED (= SANS VOYAGEURS)",
            "page": 49
          },
          {
            "title": "3.4 - UTILISATION DES FEUX ET DES FEUX DE DETRESSE",
            "page": 49
          },
          {
            "title": "3.5 - UTILISATION DU GONG",
            "page": 50
          },
          {
            "title": "3.6 - DISTANCES DE SECURITE",
            "page": 50
          },
          {
            "title": "3.7 - ARRET EN STATION ET COMMANDE DES PORTES",
            "page": 51,
            "subs": [
              "A - Commande d'ouverture de porte",
              "B - Commande de fermeture des portes",
              "C - Départ de la station",
              "D - Mode dégradé « défaut porte »"
            ]
          },
          {
            "title": "3.8 - COMMUNICATION AVEC LA CLIENTELE",
            "page": 55
          },
          {
            "title": "3.9 - COMMUNICATION AVEC LE PCC",
            "page": 56,
            "subs": [
              "A - Signalements par radio",
              "B - En cas de panne de phonie",
              "C - Rentrée et circulation dans le dépôt",
              "D - Signalements par écrit",
              "E - Signalements par rapport interne"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "s-3-1",
    "level": 2,
    "code": "3.1",
    "page": 39,
    "title": "PRISE DE SERVICE",
    "blocks": [
      {
        "type": "page-scan",
        "src": "039.jpg",
        "caption": "Page 39/76"
      },
      {
        "type": "rct-section",
        "text": "3.1 - PRISE DE SERVICE"
      },
      {
        "type": "anchor",
        "id": "s-3-1-a"
      },
      {
        "type": "rct-sub",
        "text": "A - Prise de service au dépôt :"
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
                    "t": "Le conducteur est tenu de se présenter à la prise de service à l'heure prévue.",
                    "bold": true
                  }
                ]
              }
            ]
          },
          {
            "marker": "chevron",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Une apparence correcte est exigée, et la tenue vestimentaire de TaM est obligatoire.",
                    "bold": true
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
                    "t": "Le conducteur qui se présente doit être en règle vis-à-vis des obligations du code de la route, notamment pour ce qui concerne son taux d'alcoolémie (inférieur à 0,20g/l pour la conduite d'un véhicule de transport en commun) et le non usage préalable de substances ou plantes classées comme stupéfiants.",
                    "bold": true
                  }
                ]
              },
              {
                "parts": [
                  {
                    "t": "Tout conducteur peut faire l'objet d'un contrôle d'alcoolémie ou de prise de stupéfiants à la prise de service, conformément aux dispositions du ",
                    "bold": true
                  },
                  {
                    "t": "Règlement Intérieur",
                    "bold": true,
                    "purple": true
                  },
                  {
                    "t": ".",
                    "bold": true
                  }
                ]
              }
            ],
            "extra": {
              "parts": [
                {
                  "t": "Certains médicaments peuvent entrainer des effets secondaires, baisse de la vigilance etc : en parler avec le médecin traitant.",
                  "blue": true
                }
              ]
            }
          },
          {
            "marker": "chevron",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Le conducteur doit avoir son habilitation en règle pour le matériel et la ligne correspondant au service qu'il va effectuer, y compris en cas d'échange de service avec un autre conducteur.",
                    "bold": true
                  }
                ]
              }
            ],
            "extra": {
              "parts": [
                {
                  "t": "Rappel : toute habilitation est suspendue de fait si le titulaire est resté plus de 70 jours sans conduire en service commercial, sur au moins une des lignes autorisées. Une remise en main doit alors être programmée.",
                  "blue": true
                }
              ]
            }
          },
          {
            "marker": "chevron",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Le conducteur enregistre sa prise de service en badgeant à son arrivée au dépôt et au plus tard à l'heure précise de son début de service. Il confirmera ensuite sa prise de service matériel en badgeant à la montée dans la rame.",
                    "bold": true
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
                    "t": "Il doit prendre possession de la planchette correspondant à son service, ainsi que de la feuille de route, et rejoindre ensuite son véhicule sur le remisage.",
                    "bold": true
                  }
                ]
              }
            ]
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
                "t": "Cas particulier de la Relève en ligne :",
                "bold": true,
                "underline": true
              }
            ]
          },
          {
            "type": "chevron-p",
            "text": "Le conducteur relevant est à son lieu de relève au moins deux minutes avant l'heure prévue (trajet à pied jusqu'à la station St Paul, ou en rame jusqu'à Mosson pour la ligne 3) ou en voiture jusqu'à Sabines ou G.Lorca (Ligne 2 & 4)."
          },
          {
            "type": "chevron-p",
            "text": "Dans le cas où le conducteur relevant ne serait pas présent, le conducteur en service prévient le PCC, poursuit son service et attend les consignes du régulateur."
          },
          {
            "type": "chevron-p",
            "parts": [
              {
                "t": "En l'absence de la rame à relever, "
              },
              {
                "t": "le CR relevant appelle le PCC",
                "bold": true
              },
              {
                "t": " (dans un délai maxi de 5 mn par rapport à l'heure de sa relève théorique) et se conforme à ses instructions."
              }
            ]
          },
          {
            "type": "chevron-p",
            "text": "Respecter les consignes planchettes pour les déplacements, les pauses et ne pas utiliser son véhicule personnel."
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "040.jpg",
        "caption": "Page 40/76"
      },
      {
        "type": "anchor",
        "id": "s-3-1-b"
      },
      {
        "type": "rct-sub",
        "text": "B - Préparation de la rame :"
      },
      {
        "type": "warning",
        "icon": true,
        "tone": "red",
        "text": "Toute prise de rame au dépôt doit commencer par une préparation de la rame sur le remisage, conformément à la procédure décrite dans la partie 1."
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Sortie du dépôt et mise en ligne",
            "bold": true,
            "underline": true
          }
        ]
      },
      {
        "type": "p",
        "text": "Lorsque le conducteur est prêt et que la rame est préparée, il demande l'autorisation au PCC qui lui construit un itinéraire de sortie en fonction des conditions d'exploitation."
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Toute impossibilité de sortie pour raison technique nécessite d'en informer le PCC.",
            "blue": true,
            "bold": true
          },
          {
            "t": " Seul le PCC peut autoriser un changement de matériel.",
            "blue": true,
            "bold": true
          }
        ]
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Avant la sortie du dépôt",
            "bold": true,
            "underline": true
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Le conducteur doit effectuer le test de la télécommande d'aiguille :"
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          "✓ Marquer l'arrêt au niveau du panneau de télécommande d'aiguille (voie E) au CEMH, ou en circulant sur l'interface pour la sortie de JP.",
          "✓ Tester, en appuyant sur les boutons de télécommande d'aiguille (gauche, direct et droite), le bon positionnement de l'INDIR."
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Le conducteur doit également effectuer le test des balises PETRARQUE :"
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          {
            "parts": [
              {
                "t": "✓ Si la balise "
              },
              {
                "t": "arrière",
                "bold": true,
                "underline": true
              },
              {
                "t": " fonctionne correctement, le feu situé avant la barrière s'allume."
              }
            ]
          },
          {
            "parts": [
              {
                "t": "✓ Si la balise "
              },
              {
                "t": "avant",
                "bold": true,
                "underline": true
              },
              {
                "t": " fonctionne correctement, la barrière s'ouvre."
              }
            ]
          },
          "✓ En cas de dysfonctionnement, appeler le PCC."
        ]
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Après la sortie du dépôt",
            "bold": true,
            "underline": true
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Le conducteur doit effectuer le test de la veille (clé KC sur CN) :"
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          "✓ Maintien et relâchement jusqu'au signal sonore.",
          "✓ Le même test est à répéter au premier changement de cabine."
        ]
      },
      {
        "type": "page-scan",
        "src": "041.jpg",
        "caption": "Page 41/76"
      },
      {
        "type": "anchor",
        "id": "s-3-1-c"
      },
      {
        "type": "rct-sub",
        "text": "C - Comportement du conducteur dans la rame :"
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Le conducteur est tenu de respecter les consignes et les procédures d'exploitation, en relation avec le PCC."
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
                    "t": "La présence dans la cabine n'est autorisée qu'aux cadres, agents de maîtrise et agents de maintenance de TaM en mission, aux formateurs, ainsi qu'aux personnes munies d'une autorisation écrite."
                  }
                ]
              },
              {
                "parts": [
                  {
                    "t": "Elle fait toujours l'objet d'un signalement au PCC."
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
                    "t": "La porte de la cabine doit être tenue fermée, les effets personnels doivent être rangés dans le placard."
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
                    "t": "Toute action de conduite de la rame, avec ou sans voyageur, doit s'effectuer en position assise."
                  }
                ]
              },
              {
                "parts": [
                  {
                    "t": "Le conducteur doit toujours être en position de vigilance apte à effectuer toute commande d'urgence y compris le FS, ce qui suppose d'avoir le buste droit et les pieds au sol. "
                  },
                  {
                    "t": "Cette position protège aussi le conducteur en cas d'accident.",
                    "blue": true,
                    "italic": true
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
                    "t": "Il est interdit de fumer, de s'alimenter, d'utiliser un téléphone portable, ou tout autre appareil avec oreillettes. Les appels phonie, hors arrêt, sont gérés en mode mains libres."
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
                    "t": "Lors de l'arrêt d'une rame "
                  },
                  {
                    "t": "en ligne",
                    "bold": true,
                    "underline": true
                  },
                  {
                    "t": ", le conducteur doit rester à son poste de conduite afin de pouvoir être joint à tout moment par le PCC. "
                  },
                  {
                    "t": "Il doit actionner ses feux de détresse.",
                    "blue": true,
                    "italic": true
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
                    "t": "Hors action courante",
                    "bold": true,
                    "underline": true
                  },
                  {
                    "t": ", le conducteur ne peut quitter son tramway "
                  },
                  {
                    "t": "en ligne",
                    "bold": true,
                    "underline": true
                  },
                  {
                    "t": " qu'en cas de force majeure, après évacuation de la rame : "
                  },
                  {
                    "t": "Il doit en avoir informé le PCC et s'être assuré que toutes les mesures ont été prises pour éviter un accident. Action au BS : voir p.35",
                    "blue": true,
                    "italic": true
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
                    "t": "Quitter la cabine implique de :"
                  }
                ]
              },
              {
                "parts": [
                  {
                    "t": "✓ mettre le manipulateur au neutre,"
                  }
                ]
              },
              {
                "parts": [
                  {
                    "t": "✓ emporter la clé KC,"
                  }
                ]
              },
              {
                "parts": [
                  {
                    "t": "✓ fermer la porte de cabine."
                  }
                ]
              }
            ],
            "extra": {
              "parts": [
                {
                  "t": "Action au BS : voir p.35",
                  "italic": true
                }
              ]
            }
          },
          {
            "marker": "chevron",
            "nColor": "teal",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Toute anomalie du service doit faire l'objet d'une communication auprès de la clientèle en utilisant l'équipement de sonorisation intérieure de la rame ("
                  },
                  {
                    "t": "voir chapitre 3.9",
                    "italic": true
                  },
                  {
                    "t": ")."
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
                    "t": "Rame arrêtée, le conducteur est autorisé à ouvrir la porte de la cabine dans le but de s'adresser directement à la clientèle."
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
    "id": "s-3-2",
    "level": 2,
    "code": "3.2",
    "page": 42,
    "title": "CIRCULATION EN LIGNE",
    "blocks": [
      {
        "type": "page-scan",
        "src": "042.jpg",
        "caption": "Page 42/76"
      },
      {
        "type": "rct-section",
        "text": "3.2 - CIRCULATION EN LIGNE"
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
                    "t": "La conduite se fait toujours à partir de la cabine se trouvant dans le sens de la marche (marche arrière interdite)."
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
                    "t": "Le conducteur de tramway circule en marche à vue, c'est à dire qu'il adapte sa vitesse à l'environnement dans lequel il progresse."
                  }
                ]
              }
            ],
            "rowColor": "orange"
          },
          {
            "marker": "chevron",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Lorsqu'il circule en ligne, le conducteur doit appliquer les mêmes règles de prévoyance et de défiance que celles en vigueur pour la conduite de tout véhicule de transport."
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
                    "t": "Il doit être en mesure d'arrêter sa rame en toute circonstance."
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
                    "t": "Le conducteur respecte la signalisation lumineuse ferroviaire et routière, et les limitations de vitesse indiquées en ligne (ou correspondant aux différentes situations de l'environnement de la voie ou de l'état de la rame)."
                  }
                ]
              }
            ],
            "extra": {
              "parts": [
                {
                  "t": "Il évite d'être en mode traction au passage des IS (Isolateurs de Section)",
                  "blue": true
                }
              ]
            }
          }
        ]
      },
      {
        "type": "warning",
        "icon": true,
        "text": "Des relevés réguliers ou aléatoires des centrales tachymétriques sont effectués afin de contrôler le respect des limitations de vitesse."
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
                    "t": "En cas de visibilité réduite (brouillard, dégagement de fumée...), le conducteur doit adapter sa vitesse aux nouvelles conditions de visibilité."
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
                    "t": "Pour une triple raison : sécurité (guidage), confort de la clientèle et préservation de l'infrastructure, "
                  },
                  {
                    "t": "en sortie de courbe",
                    "underline": true
                  },
                  {
                    "t": " le conducteur doit attendre que l'intégralité de la rame soit en alignement droit pour effectuer la reprise de vitesse."
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
                    "t": "En cas de baisse anormale du niveau de vigilance ou de pertes de vigilance répétées, le conducteur doit alerter immédiatement le PCC sur son état de santé."
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
        "parts": [
          {
            "t": "La prise de médicaments peut entraîner une baisse de vigilance et doit être autorisée au préalable par le médecin traitant de l'agent.",
            "red": true,
            "bold": true
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "043.jpg",
        "caption": "Page 43/76"
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Prise en compte du Gabarit Limite d'Obstacle (GLO)",
            "bold": true
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Une bande au sol dénommée « GLO » délimite la zone de circulation propre au tramway, tenant compte du gabarit des rames roulant sur le réseau.",
            "blue": true,
            "italic": true
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
                    "t": "En cas de présence de piétons ou de vélos à proximité du GLO, le conducteur doit adapter sa vitesse, faire usage du gong et se préparer à toute manœuvre d'urgence."
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
                    "t": "En cas d'obstacles situés à proximité du GLO, le conducteur doit ralentir et s'assurer avant de la dépasser qu'il peut le faire en toute sécurité."
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
                    "t": "En cas d'obstacles empiétant sur la limite GLO, le conducteur doit arrêter sa rame et immédiatement appeler le PCC."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-3-2-a"
      },
      {
        "type": "rct-sub",
        "text": "A - Ouverture de la voie sur voie double ou voie unique :"
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Les consignes spécifiques à l'ouverture de voie sont les suivantes :"
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "La vitesse est limitée à 40 km/h maximum.",
            "blue": true,
            "italic": true
          },
          {
            "t": " Le conducteur contrôle la position des appareils de voie. Il arrête sa rame avant l'appareil de voie si la position des aiguilles n'est pas visible (neige, .../...)",
            "blue": true,
            "italic": true
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Le conducteur signale :"
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
                    "t": "La présence d'objets éventuels sur la voie."
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
                    "t": "L'état de la signalisation."
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
                    "t": "L'état de la ligne aérienne."
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
                    "t": "Les dysfonctionnements de DAT."
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
                    "t": "Les dégâts éventuels commis sur le mobilier d'équipement des stations."
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
                    "t": "L'absence de l'éclairage en station."
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
                    "t": "Le conducteur informe le PCC à chaque terminus de l'état de la voie et notamment la présence de zones de voie glissantes."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "044.jpg",
        "caption": "Page 44/76"
      },
      {
        "type": "anchor",
        "id": "s-3-2-b"
      },
      {
        "type": "rct-sub",
        "text": "B - Circulation sur voie double :"
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "La conduite se fait en mode nominal "
          },
          {
            "t": "sur la voie de droite",
            "bold": true
          },
          {
            "t": ", par exemple sur V1 dans le sens Mosson vers Odysseum pour la Ligne 1 et Saint Jean de Vedas vers Jacou pour la Ligne 2."
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Le conducteur doit respecter :"
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
                    "t": "La signalisation de présence tension."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "La signalisation lumineuse de carrefour."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "La signalisation de manœuvre."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "teal",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "La signalisation verticale et la signalisation au sol."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-3-2-c"
      },
      {
        "type": "rct-sub",
        "text": "C - Circulation sur voie unique :"
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
                    "t": "Le conducteur "
                  },
                  {
                    "t": "doit impérativement respecter la signalisation de manœuvre sur chaque évitement",
                    "bold": true,
                    "purple": true
                  },
                  {
                    "t": ", cette signalisation protégeant le début d'un canton."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Pour tenir compte de certaines positions de boucles sur les VU et pour la continuité de l'échange voyageurs, il est nécessaire de ne démarrer de la station qu'après le passage au vert du feu de manœuvre."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "En cas de franchissement, le conducteur doit immédiatement réagir à la sirène et à l'allumage des lampes flash en effectuant un "
                  },
                  {
                    "t": "freinage d'urgence (FU)",
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
            "n": "4",
            "nColor": "teal",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "En cas d'allumage des lampes flash en cours de trajet, qui signifie le franchissement d'un signal au rouge par une rame en sens inverse de circulation, le conducteur "
                  },
                  {
                    "t": "doit immédiatement effectuer un freinage d'urgence (FU)",
                    "bold": true,
                    "blue": true
                  },
                  {
                    "t": ", s'arrêter en ligne puis appeler le PCC pour se conformer à ses instructions."
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
        "tone": "red",
        "lines": [
          {
            "text": "TRES IMPORTANT SUR LES SECTIONS A VOIE UNIQUE !",
            "bold": true
          },
          {
            "text": "Contrôler les INDIR en entrée d'évitement, comme pour toute aiguille prise par la pointe."
          },
          {
            "text": "Respecter la vitesse maxi de 15 km/h en sortie d'évitement, comme pour toute aiguille en voie déviée."
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "045.jpg",
        "caption": "Page 45/76"
      },
      {
        "type": "anchor",
        "id": "s-3-2-d"
      },
      {
        "type": "rct-sub",
        "text": "D - Circulation en voie unique temporaire (VUT) :"
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "La voie unique temporaire correspond à la circulation d'une ou de plusieurs rames sur une seule voie, dans les deux sens, sans recours à la signalisation de cantonnement."
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "La V.U.T. n'est autorisée que sur ordre du PCC ou par consignes spécifiques, à une vitesse de 30 km/h."
          }
        ]
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Manœuvre effectuée par radio et bâton pilote numéroté",
            "bold": true,
            "underline": true
          }
        ]
      },
      {
        "type": "flow-table",
        "items": [
          {
            "color": "teal",
            "parts": [
              {
                "t": "Le régulateur donne l'ordre aux rames de stopper aux extrémités de la VUT et il s'assure de la bonne réception de son message par les conducteurs.",
                "bold": true
              }
            ]
          },
          {
            "color": "blue",
            "parts": [
              {
                "t": "Il donne l'ordre à la première rame de s'engager sur la VUT libre en désignant le numéro du bâton pilote (chaque conducteur étant en possession d'un bâton pilote numéroté).",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "Lorsque la rame est sortie de la VUT, elle appelle le PCC qui lui donne les instructions pour la transmission du bâton pilote à une rame en attente dans le sens inverse.",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "La rame en sens inverse avant de s'engager sur la VUT demande l'autorisation au P.C.C en annonçant le numéro du bâton pilote.",
                "bold": true
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Manœuvre effectuée avec la présence d'un ou plusieurs agents de maîtrise",
            "bold": true,
            "underline": true
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "La procédure est identique à celle ci-dessus mais les fonctions dévolues au régulateur du PCC sont déléguées aux agents de maîtrise sur place, ou à toute personne dument habilitée, qui gèrent l'autorisation d'engagement des rames sur le tronçon en VUT."
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "046.jpg",
        "caption": "Page 46/76"
      },
      {
        "type": "anchor",
        "id": "s-3-2-e"
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "E1 - Manœuvres de retournement et de rebroussement",
            "bold": true,
            "underline": true
          }
        ]
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "Retournement",
            "bold": true,
            "underline": true
          },
          {
            "t": " : manœuvre qui consiste à faire un changement de voie par une communication et à repartir dans l'autre sens par l'autre voie."
          }
        ]
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "Rebroussement",
            "bold": true,
            "underline": true
          },
          {
            "t": " : cette manœuvre de retournement sur une même voie correspond à une circulation en Voie Unique Temporaire."
          }
        ]
      },
      {
        "type": "flow-table",
        "items": [
          {
            "color": "teal",
            "parts": [
              {
                "t": "La manœuvre de retournement doit se faire de préférence sans voyageurs, sauf pour le cas des stations situées après la communication de retournement.",
                "bold": true
              }
            ]
          },
          {
            "color": "blue",
            "parts": [
              {
                "t": "Sur les communications non signalées (communications manuelles), l'ensemble de la manœuvre de retournement ne peut se faire que sur ordre ou avec l'autorisation du PCC.",
                "bold": true
              }
            ]
          },
          {
            "color": "blue2",
            "parts": [
              {
                "t": "De manière générale, toute manœuvre hors terminus et non prévue sur la planchette doit être effectuée sous contrôle du PCC y compris sur la 3ème voie d'Occitanie ou de L. Blum.",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "Toute manœuvre de rebroussement ne peut s'effectuer que dans le cadre de la ",
                "bold": true
              },
              {
                "t": "consigne 3.2.D : Circulation en Voie Unique Temporaire",
                "bold": true,
                "underline": true
              },
              {
                "t": ", sauf sur un tronçon de longueur limitée et à bonne visibilité entre la station et la communication , ou sur un tronçon à Voie Unique protégée par la signalisation ferroviaire.",
                "bold": true
              }
            ]
          }
        ]
      },
      {
        "type": "boxed",
        "tone": "plain",
        "blocks": [
          {
            "type": "arrow-p",
            "parts": [
              {
                "t": "Cas n° 1 : communication manuelle située après une station",
                "bold": true
              }
            ]
          },
          {
            "type": "chevron-p",
            "text": "Effectuer la dépose des voyageurs après les avoir informés de la manœuvre."
          },
          {
            "type": "chevron-p",
            "text": "Avancer jusqu'à la limite de manœuvre (clou inox) de façon à bien dégager l'aiguillage pour pouvoir le manœuvrer, ou pour pouvoir vérifier sa position."
          },
          {
            "type": "chevron-p",
            "text": "Enclencher les feux de détresse."
          },
          {
            "type": "chevron-p",
            "text": "Mettre le manipulateur au neutre, retirer la clé KC et après avoir quitté la cabine de conduite, refermer la porte à clé."
          },
          {
            "type": "chevron-p",
            "text": "Positionner les aiguillages en position déviée."
          },
          {
            "type": "chevron-p",
            "parts": [
              {
                "t": "Remonter dans la cabine de tête et le cas échéant, pour les manœuvres imposant un franchissement de carrefour ("
              },
              {
                "t": "comme à Albert 1er",
                "italic": true
              },
              {
                "t": "), mettre le commutateur de l'Armoire Electrique de Loge sur le mode VUT pour déclencher le feu."
              }
            ]
          },
          {
            "type": "chevron-p",
            "text": "Effectuer son départ en sens inverse jusqu'à la station, après accord confirmé du PCC dans les cas où la visibilité est insuffisante."
          },
          {
            "type": "chevron-p",
            "text": "Sauf contre-ordre, remettre les aiguillages dans leur position initiale (si d'autres rames doivent effectuer un retournement au même endroit, le PCC donnera l'ordre de laisser les aiguillages en position déviée)."
          },
          {
            "type": "chevron-p",
            "text": "Prévenir le PCC de la fin de la manœuvre."
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "047.jpg",
        "caption": "Page 47/76"
      },
      {
        "type": "boxed",
        "tone": "plain",
        "blocks": [
          {
            "type": "arrow-p",
            "parts": [
              {
                "t": "Cas n° 2 : communication manuelle située avant une station",
                "bold": true
              }
            ]
          },
          {
            "type": "chevron-p",
            "parts": [
              {
                "t": "Arrêter la rame en station après avoir informé les voyageurs "
              },
              {
                "t": "(sauf si retournement en HLP)",
                "italic": true
              },
              {
                "t": ","
              }
            ]
          },
          {
            "type": "chevron-p",
            "text": "Enclencher les feux de détresse, mettre le manipulateur au neutre, retirer la clé KC, refermer la porte de cabine,"
          },
          {
            "type": "chevron-p",
            "parts": [
              {
                "t": "Changer de cabine et "
              },
              {
                "t": "après autorisation du PCC",
                "bold": true,
                "underline": true
              },
              {
                "t": ", rebrousser -avec les feux de détresse- jusqu'à l'aiguille,"
              }
            ]
          },
          {
            "type": "chevron-p",
            "parts": [
              {
                "t": "Positionner l'aiguille en voie déviée et entamer le changement de voie "
              },
              {
                "t": "après accord du PCC",
                "bold": true,
                "underline": true
              },
              {
                "t": "."
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "La reprise des voyageurs se fait sur le même quai "
          },
          {
            "t": "(sauf si retournement en HLP)",
            "italic": true
          },
          {
            "t": "."
          }
        ]
      },
      {
        "type": "p",
        "text": "Au départ de la station, le conducteur actionne le mode VUT si la configuration des lieux l'impose (carrefour pris à contre-sens)."
      },
      {
        "type": "p",
        "text": "Si le PCC lui en donne l'ordre, il rétablit -après le passage sur l'autre voie- l'aiguillage dans sa position initiale."
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "E2 - Manœuvre de retournement en terminus",
            "bold": true,
            "underline": true
          }
        ]
      },
      {
        "type": "consigne-red",
        "text": "Les manœuvres de retournement en terminus, ou en terminus partiel sont à réaliser conformément aux instructions du SAE ou de la planchette."
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
                    "t": "Mettre le commutateur de conduite en position neutre, retirer la clé KC et après avoir quitté le poste de conduite, fermer la porte de la cabine à clé."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Lors de la traversée de la rame, vérifier s'il n'y a pas d'objets oubliés : En cas d'objets oubliés ou suspects, prévenir le PCC."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Mettre le commutateur de conduite en service dans la cabine de tête et vérifier la pré-sélection de côté des portes et l'affichage des girouettes."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "teal",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Avancer vers le quai de départ en respectant la signalisation, et déverrouiller les portes."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "text": "En cas de manœuvre d'avant-gare avec voyageurs à bord, attention à la sélection d'ouverture de portes pour la descente des voyageurs !"
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Rappel : la vitesse de circulation en terminus est limitée à ",
            "bold": true,
            "blue": true
          },
          {
            "t": "15 Km/h",
            "bold": true,
            "blue": true,
            "underline": true
          },
          {
            "t": ".",
            "bold": true,
            "blue": true
          }
        ]
      },
      {
        "type": "p",
        "text": "Le conducteur est autorisé sur son temps de battement ou de pause à quitter le poste de conduite. En dehors de cette plage horaire il ne peut le faire sans autorisation du PCC."
      },
      {
        "type": "warning",
        "lines": [
          {
            "parts": [
              {
                "t": "Marche Arrière",
                "bold": true
              }
            ]
          },
          {
            "parts": [
              {
                "t": "La marche arrière, le conducteur se trouvant dans la cabine opposée au sens de marche, est "
              },
              {
                "t": "formellement interdite",
                "bold": true,
                "red": true,
                "underline": true
              },
              {
                "t": ". Elle ne peut être autorisée sur une courte distance que dans le cas de manœuvre de remorquage-poussage, la présence d'un deuxième agent dans la cabine opposée étant obligatoire."
              }
            ]
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "048.jpg",
        "caption": "Page 48/76"
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "E3 - Manœuvre de rebroussement sur Voie Unique",
            "bold": true,
            "underline": true
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Rebroussement après station (exemple : Station Boirargues sur ligne 3)"
          }
        ]
      },
      {
        "type": "flow-table",
        "items": [
          {
            "color": "blue",
            "parts": [
              {
                "t": "La rame s'engage jusqu'au repère de rebroussement",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "après autorisation du PCC",
                "underline": true
              },
              {
                "t": ", le conducteur change de loge, contrôle la position de l'aiguille, puis se dirige vers le quai de la station sur la voie opposée"
              }
            ]
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "En cas de besoin "
          },
          {
            "t": "(engagement de deux rames opposées sur une même section en VU, ou : signal de manœuvre au rouge sur problème d'aiguillage)",
            "italic": true
          }
        ]
      },
      {
        "type": "flow-table",
        "items": [
          {
            "color": "blue",
            "parts": [
              {
                "t": "La rame la plus proche de la station d'évitement effectue la manœuvre de rebroussement après autorisation du PCC.",
                "bold": true
              },
              {
                "t": " Il est conseillé de garder les voyageurs à bord, après accord du PCC",
                "blue": true
              }
            ]
          },
          {
            "color": "blue",
            "parts": [
              {
                "t": "Le cas échéant, en fonction de sa position, le conducteur s'assure au préalable de bien dégager l'appareil de voie de la station qu'il vient de quitter, en marche normale (marche avant).",
                "bold": true
              }
            ]
          },
          {
            "color": "blue",
            "parts": [
              {
                "t": "Après le changement de cabine, le conducteur effectue la manœuvre de rebroussement à vitesse limitée de 5 km/h en dépassant la station d'évitement (franchissement des 2 appareils de voie). Il s'assure d'avoir bien dégagé l'aiguille de sortie de l'évitement avant de rebrousser.",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "Il informe le PCC de la position de la rame lorsque la rame est revenue sur le quai de départ.",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "Il peut repartir après autorisation du PCC dans la direction normale, vers la station d'évitement.",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "Il marque l'arrêt au niveau du signal de manœuvre de sortie de station, et peut s'engager à l'allumage du signal vert.",
                "bold": true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "s-3-3",
    "level": 2,
    "code": "3.3",
    "page": 49,
    "title": "CIRCULATION HAUT LE PIED",
    "blocks": [
      {
        "type": "page-scan",
        "src": "049.jpg",
        "caption": "Page 49/76"
      },
      {
        "type": "rct-section",
        "text": "3.3 - CIRCULATION HAUT LE PIED (= SANS VOYAGEURS)"
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Des consignes spécifiques s'ajoutent aux consignes de circulation en ligne."
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
                    "t": "La vitesse de passage en station est limitée à 15 km/h."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Au passage en station, le gong doit être actionné, excepté à partir de 22h00 sauf en cas de danger."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Le conducteur doit veiller au message affiché sur la girouette."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "teal",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Les feux de détresse doivent être actionnés."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-3-4"
      },
      {
        "type": "rct-section",
        "text": "3.4 - UTILISATION DES FEUX ET DES FEUX DE DETRESSE"
      },
      {
        "type": "boxed",
        "tone": "plain",
        "blocks": [
          {
            "type": "p",
            "parts": [
              {
                "t": "Toute rame de tramway doit circuler avec les feux de croisement allumés, de jour comme de nuit, ainsi qu'avec l'éclairage intérieur.",
                "bold": true
              }
            ]
          },
          {
            "type": "p",
            "text": "L'emploi des feux de route et des antibrouillards est soumis à la réglementation prescrite par le Code de la Route."
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Le conducteur doit allumer les feux de détresse :"
          }
        ]
      },
      {
        "type": "flow-table",
        "items": [
          {
            "color": "blue",
            "parts": [
              {
                "t": "Pour tout arrêt ",
                "bold": true
              },
              {
                "t": "anormal et prolongé",
                "bold": true,
                "blue": true
              },
              {
                "t": " en ligne.",
                "bold": true
              }
            ]
          },
          {
            "color": "blue2",
            "parts": [
              {
                "t": "Lors de circulation ",
                "bold": true
              },
              {
                "t": "HLP",
                "bold": true,
                "blue": true
              },
              {
                "t": " et en ",
                "bold": true
              },
              {
                "t": "VUT",
                "bold": true,
                "blue": true
              }
            ]
          },
          {
            "color": "blue2",
            "parts": [
              {
                "t": "Dans la zone ",
                "bold": true
              },
              {
                "t": "Gare",
                "bold": true,
                "blue": true
              },
              {
                "t": " en cas d'itinéraire ",
                "bold": true
              },
              {
                "t": "dévié",
                "bold": true,
                "blue": true
              },
              {
                "t": ".",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "En cas de franchissement d'un carrefour où les feux de circulation sont ",
                "bold": true
              },
              {
                "t": "clignotants ou éteints",
                "bold": true,
                "blue": true
              },
              {
                "t": ".",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "Lors des ",
                "bold": true
              },
              {
                "t": "poussages",
                "bold": true,
                "blue": true
              },
              {
                "t": " ou des ",
                "bold": true
              },
              {
                "t": "remorquages",
                "bold": true,
                "blue": true
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
        "type": "warning",
        "icon": true,
        "tone": "red",
        "lines": [
          {
            "parts": [
              {
                "t": "Lorsqu'une rame en circulation croise un tramway arrêté sur l'autre voie avec ou sans les feux de détresse allumés, le conducteur doit ralentir (10 Km/h) et marquer un arrêt à hauteur de la cabine de l'autre rame, pour s'assurer que l'autre conducteur n'a besoin de rien. "
              },
              {
                "t": "Il doit en informer le PCC impérativement avant de repartir.",
                "underline": true
              }
            ]
          },
          {
            "text": "Rappel : en cas de panne des feux de détresse lors d'un arrêt anormal et prolongé en ligne, le triangle de signalisation doit être positionné 40 m environ avant la rame"
          }
        ]
      }
    ]
  },
  {
    "id": "s-3-5",
    "level": 2,
    "code": "3.5",
    "page": 50,
    "title": "UTILISATION DU GONG",
    "blocks": [
      {
        "type": "page-scan",
        "src": "050.jpg",
        "caption": "Page 50/76"
      },
      {
        "type": "rct-section",
        "text": "3.5 - UTILISATION DU GONG"
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "L'utilisation du gong est obligatoire dans les cas suivants :",
            "blue": true,
            "bold": true
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Présence de piétons ou de cycliste à proximité de la voie ou sur la voie."
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Franchissement de "
          },
          {
            "t": "carrefour",
            "bold": true
          },
          {
            "t": " ou de "
          },
          {
            "t": "zone piétonne",
            "bold": true
          },
          {
            "t": ", en présence de sources de danger"
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "Croisement avec une rame ou un bus arrêté."
          }
        ]
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "A partir de 7h00 et jusqu'à 22h00 seulement :"
          }
        ]
      },
      {
        "type": "chevron-p",
        "text": "Arrivée en station."
      },
      {
        "type": "chevron-p",
        "text": "Départ de station et lors de la mise en mouvement de la rame."
      },
      {
        "type": "chevron-p",
        "text": "Croisement avec une rame en circulation : utilisation au moment du passage à hauteur de la nacelle centrale."
      },
      {
        "type": "arrow-p",
        "parts": [
          {
            "t": "En mode dégradé :"
          }
        ]
      },
      {
        "type": "chevron-p",
        "text": "Au franchissement de carrefour, lorsque les feux sont en dysfonctionnement."
      },
      {
        "type": "chevron-p",
        "text": "Lors de VUT à contresens."
      },
      {
        "type": "warning",
        "icon": true,
        "prefix": "En cas de panne du gong :",
        "prefixBlack": true,
        "bulletsRed": true,
        "bulletStyle": "arrow",
        "bullets": [
          "Le conducteur doit prévenir le PCC.",
          {
            "parts": [
              {
                "t": "Il doit respecter la vitesse de consigne de "
              },
              {
                "t": "20 Km/h",
                "bold": true
              },
              {
                "t": "."
              }
            ]
          },
          "L'usage du klaxon en cas de danger est recommandé, à titre de remplacement."
        ]
      },
      {
        "type": "anchor",
        "id": "s-3-6"
      },
      {
        "type": "rct-section",
        "text": "3.6 - DISTANCES DE SECURITE"
      },
      {
        "type": "arrow-p",
        "arrow": "large",
        "parts": [
          {
            "t": "La distance à respecter entre deux rames "
          },
          {
            "t": "circulant en ligne",
            "bold": true,
            "underline": true
          },
          {
            "t": " (en commercial ou en HLP) est de "
          },
          {
            "t": "100 mètres minimum",
            "bold": true
          },
          {
            "t": ". Cette distance peut être réduite de moitié "
          },
          {
            "t": "sur les tronçons où la vitesse est limitée à 30 Km/h maxi.",
            "italic": true
          }
        ]
      },
      {
        "type": "arrow-p",
        "arrow": "large",
        "parts": [
          {
            "t": "La distance entre deux rames "
          },
          {
            "t": "à l'arrêt",
            "bold": true,
            "underline": true
          },
          {
            "t": " hors station (ex. : rue Jules Ferry, secteur Gare) est de "
          },
          {
            "t": "5 mètres minimum",
            "bold": true
          },
          {
            "t": ". Sur certaines zones, une limite pour le positionnement de la deuxième rame peut être matérialisée au sol. Le conducteur adapte sa vitesse d'approche de la rame arrêtée en fonction des conditions de visibilité et d'adhérence."
          }
        ]
      },
      {
        "type": "arrow-p",
        "arrow": "large",
        "parts": [
          {
            "t": "La distance entre deux rames à l'arrêt "
          },
          {
            "t": "en station",
            "bold": true,
            "underline": true
          },
          {
            "t": ", est réduite à "
          },
          {
            "t": "2 mètres minimum",
            "bold": true
          },
          {
            "t": "."
          }
        ]
      },
      {
        "type": "warning",
        "icon": true,
        "tone": "red",
        "parts": [
          {
            "t": "La vitesse d'entrée en station sur une "
          },
          {
            "t": "station à quai double",
            "bold": true
          },
          {
            "t": " ne doit pas être supérieure à 15 km/h en cas de présence d'une première rame à quai -ou en cas de rame arrêtée sur le quai opposé- ("
          },
          {
            "t": "risque de traversée d'un piéton derrière la rame à l'arrêt !",
            "bold": true
          },
          {
            "t": ")"
          }
        ]
      }
    ]
  },
  {
    "id": "s-3-7",
    "level": 2,
    "code": "3.7",
    "page": 51,
    "title": "ARRET EN STATION ET COMMANDE DES PORTES",
    "blocks": [
      {
        "type": "page-scan",
        "src": "051.jpg",
        "caption": "Page 51/76"
      },
      {
        "type": "rct-section",
        "text": "3.7 - ARRET EN STATION ET COMMANDE DES PORTES"
      },
      {
        "type": "flow-table",
        "items": [
          {
            "color": "teal",
            "parts": [
              {
                "t": "La montée et la descente des voyageurs ne doivent s'effectuer qu'en station et seulement du côté prévu, sauf consigne particulière du PCC.",
                "bold": true
              }
            ]
          },
          {
            "color": "blue",
            "parts": [
              {
                "t": "En service commercial, l'arrêt est marqué à chaque station.",
                "bold": true
              }
            ]
          },
          {
            "color": "blue",
            "parts": [
              {
                "t": "L'entrée en station s'effectue à la vitesse maximum de consigne de 30 Km/h, en actionnant le gong, ou à 15 Km/h en cas de présence de rame devant (quais allongés) ou sur la voie opposée : voir consigne 3.6 \"Distances de sécurité\".",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "L'attention du conducteur doit être attirée par les voyageurs se trouvant en bordure de quai.",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "L'immobilisation de la rame se fait au point matérialisé sur le quai à hauteur d'épaule du conducteur, par un clou rouge",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "!!! Les portes ne sont déverrouillées qu'à l'arrêt complet de la rame !!!",
                "bold": true
              }
            ]
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-3-7-a"
      },
      {
        "type": "rct-sub",
        "text": "A - Commande d'ouverture de porte :"
      },
      {
        "type": "hand-p",
        "lead": {
          "parts": [
            {
              "t": "Sur les CITADIS 401",
              "underline": true
            },
            {
              "t": " :"
            }
          ]
        },
        "body": {
          "parts": [
            {
              "t": "A l'arrêt de la rame, la pré-sélection droite étant active (BPAL enclenché et allumé), le conducteur actionne le bouton de dé-verrouillage des portes (BPAL) : c'est le mode dit self-service."
            }
          ]
        }
      },
      {
        "type": "hand-p",
        "lead": {
          "parts": [
            {
              "t": "Sur les CITADIS 302 ou 402",
              "underline": true
            },
            {
              "t": " (pas de pré-sélection possible) :"
            }
          ]
        },
        "body": {
          "parts": [
            {
              "t": "A l'arrêt de la rame, le conducteur actionne le bouton de dé-verrouillage des portes (BPAL) côté droit ou gauche "
            },
            {
              "t": "selon l'emplacement du quai.",
              "bold": true
            }
          ]
        }
      },
      {
        "type": "arrow-p",
        "tone": "blue",
        "parts": [
          {
            "t": "Les doubles portes de la caisse centrale s'ouvrent pour l'accès PMR, les autres portes ne s'ouvrant que sur action des voyageurs sur les boutons-poussoirs, de l'intérieur ou de l'extérieur de la rame.",
            "bold": true,
            "italic": true
          }
        ]
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "Sur le Citadis 402",
            "underline": true
          },
          {
            "t": ", en cas de demande d'ouverture de porte par une Personne à Mobilité Réduite (pictogramme sur la console SIE), il faut acquitter la demande à l'écran pour provoquer l'ouverture des portes de la caisse concernée (en mode self)."
          }
        ]
      },
      {
        "type": "callout-box",
        "tone": "yellow",
        "blocks": [
          {
            "type": "hand-p",
            "text": "En cas de forte affluence, il est recommandé d'actionner le bouton d'ouverture générale (BPAL) afin d'accélérer l'échange voyageur en station."
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "052.jpg",
        "caption": "Page 52/76"
      },
      {
        "type": "hand-p",
        "text": "Le conducteur surveille ensuite la montée et la descente des voyageurs"
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "La régulation en terminus sur le quai de départ doit s'effectuer avec le mode self activé mais avec le commutateur en position N (neutre). Ceci afin de maintenir les portes centrales fermées pour l'efficacité du chauffage ou de la climatisation de la rame."
          }
        ]
      },
      {
        "type": "note-blue-italic",
        "text": "Les commandes des portes, à disposition du conducteur, sont actives à partir de la cabine en service lorsqu'il y en a une, ou de la dernière cabine en service lorsque aucune cabine n'est en service (pour permettre de conserver le fonctionnement des portes lors d'un changement de cabine)."
      },
      {
        "type": "anchor",
        "id": "s-3-7-b"
      },
      {
        "type": "rct-sub",
        "text": "B - Commande de fermeture des portes :"
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "Au bout de 15 sec. environ (station à faible fréquentation) ou de 30 sec. environ (station à forte fréquentation), "
          },
          {
            "t": "en anticipant les dernières montées voyageurs",
            "bold": true
          },
          {
            "t": ", le conducteur libère le bouton de déverrouillage des portes (décrochage du BPAL)."
          }
        ]
      },
      {
        "type": "note-blue-italic",
        "text": "Cette commande provoque la fermeture des portes de la caisse centrale et des portes encore en mode « self ». L'ensemble des sécurités sont actives (détecteur d'obstacle par cellule et détection d'obstacle par mesure de surintensité sur la motorisation des portes), et les portes se ré-ouvrent puis se referment en cas d'obstacle."
      },
      {
        "type": "hand-p",
        "text": "En cas de nécessité, par forte affluence, le conducteur peut provoquer la fermeture forcée des portes (par appui prolongé sur le BPI)."
      },
      {
        "type": "note-blue-italic",
        "text": "Les sécurités sont alors inhibées et la fermeture est précédée d'un message d'alerte des voyageurs « attention à la fermeture des portes »."
      },
      {
        "type": "hand-p",
        "text": "En cas d'obstacle en phase de fermeture, les portes restent alors en position de blocage : le conducteur doit effectuer une commande d'ouverture générale avant de relancer la commande de fermeture."
      },
      {
        "type": "warning",
        "icon": true,
        "align": "center",
        "lines": [
          {
            "text": "Sur le Citadis 401, la commande de fermeture forcée des portes via le déverrouillage (BPAL) de la sélection de côté est interdite.",
            "red": true,
            "bold": true
          },
          {
            "text": "Cela annule le message d'alerte précédant la fermeture et peut provoquer un grave incident après le démarrage de la rame : ouverture de la porte côté entrevoie en cas de tirage de poignée d'alarme.",
            "blue": true,
            "bold": true,
            "italic": true
          },
          {
            "text": "Sur les Citadis 302 et 402, il est interdit pour la même raison d'ouvrir les deux côtés simultanément en exploitation commerciale",
            "red": true,
            "bold": true
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "053.jpg",
        "caption": "Page 53/76"
      },
      {
        "type": "anchor",
        "id": "s-3-7-c"
      },
      {
        "type": "rct-sub",
        "text": "C - Départ de la station :"
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "Sur les sections en Voie Unique des lignes 2 et 3 (cantonnement) :",
            "blue": true,
            "bold": true,
            "italic": true
          }
        ]
      },
      {
        "type": "chevron-p",
        "text": "Le départ n'est autorisé que si le feu de Signalisation Ferroviaire est au vert."
      },
      {
        "type": "chevron-p",
        "text": "Ne pas quitter le quai si le feu est au rouge."
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "Sur les stations à quai double :",
            "blue": true,
            "bold": true,
            "italic": true
          }
        ]
      },
      {
        "type": "chevron-p",
        "parts": [
          {
            "t": "Si le conducteur s'est arrêté en seconde position derrière une autre rame, "
          },
          {
            "t": "il doit marquer un deuxième arrêt en tête de quai pour garantir la prise en charge des PMR.",
            "red": true
          }
        ]
      },
      {
        "type": "warning",
        "icon": true,
        "parts": [
          {
            "t": "La seconde position sur le quai Corum L1V2 est une "
          },
          {
            "t": "position d'attente",
            "bold": true
          },
          {
            "t": ". L'échange voyageurs sur cette position est "
          },
          {
            "t": "strictement interdit",
            "bold": true
          },
          {
            "t": " car l'ensemble du quai n'est pas aligné par rapport à la rame : risque d'accident grave !"
          }
        ]
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "Une fois les portes verrouillées ",
            "blue": true,
            "bold": true,
            "italic": true
          },
          {
            "t": "(signalement par un bip sonore en cabine)",
            "blue": true,
            "bold": true,
            "italic": true
          },
          {
            "t": " :",
            "blue": true,
            "bold": true,
            "italic": true
          }
        ]
      },
      {
        "type": "chevron-p",
        "text": "Le conducteur peut effectuer son départ en surveillant le quai au moyen des caméras de rétro-vision, et en actionnant le gong."
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "Pendant la première phase d'accélération jusqu'à ce que l'arrière de la rame ait quitté le quai de la station :",
            "blue": true,
            "bold": true,
            "italic": true
          }
        ]
      },
      {
        "type": "chevron-p",
        "text": "Le conducteur doit s'assurer par l'image des caméras de rétro-vision qu'aucun voyageur n'est entraîné par la rame."
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "En cas d'appel inter-phonie voyageur pendant la phase de dégagement du quai, le conducteur doit :",
            "blue": true,
            "bold": true,
            "italic": true
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
                    "t": "Vérifier l'image des caméras de rétro-vision qui peuvent signaler un danger venant de l'extérieur (piéton entraîné par la rame, piéton circulant en bordure du GLO pouvant être heurté par la rame).",
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
        "src": "054.jpg",
        "caption": "Page 54/76"
      },
      {
        "type": "hand-p",
        "parts": [
          {
            "t": "En cas de tirage de la poignée d'alarme (signalés par l'allumage du BPIL phonie et sur l'écran SIE) "
          },
          {
            "t": "pendant la phase de dégagement du quai",
            "bold": true
          }
        ]
      },
      {
        "type": "warning",
        "lines": [
          {
            "text": "Dans ce cas, le FU (ou FMS) est déclenché, et les portes sont libérées au bout de 15 secondes.",
            "italic": true
          },
          {
            "parts": [
              {
                "t": "Attention au risque d'ouverture de portes côté entrevoie !",
                "bold": true,
                "red": true,
                "italic": true
              }
            ]
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
                    "t": "Eviter toute ouverture de porte du mauvais côté soit en ré-armant la poignée, soit en sélectionnant le bon côté de dévérouillage des portes "
                  },
                  {
                    "t": "(sur les rames 401, les portes sont libérées du côté pré-sélectionné)",
                    "italic": true
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
                    "t": "Engager le dialogue avec le voyageur qui a tiré la poignée, via l'interphonie"
                  }
                ]
              },
              {
                "parts": [
                  {
                    "t": "Informer l'ensemble des voyageurs de la situation, une fois la cause de l'incident identifiée"
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
                    "t": "S'assurer de la sécurité des voyageurs avant tout redémarrage de la rame "
                  },
                  {
                    "t": "(suite au déclenchement du FU ou FMS qui a pu provoquer des chutes)",
                    "italic": true
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
            "parts": [
              {
                "t": "La même consigne s'applique rame à l'arrêt en ligne, ",
                "bold": true,
                "red": true
              },
              {
                "t": "hors zone de dégagement de quai",
                "bold": true,
                "red": true,
                "underline": true
              }
            ]
          },
          {
            "text": "la libération des portes interviendra 15 '' après le tirage de poignée, côté entrevoie si la poignée a été tirée du mauvais côté -en l'absence d'action conducteur-",
            "bold": true,
            "italic": true
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-3-7-d"
      },
      {
        "type": "rct-sub",
        "text": "D - Mode dégradé « défaut porte »"
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
                    "t": "Une porte défaillante doit être condamnée, et l'adhésif d'information de la clientèle doit être apposé sur la porte en défaut."
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
                    "t": "Après condamnation d'une porte, le conducteur doit contrôler l'information sur la console SIE, ainsi que l'efficacité de la condamnation."
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
                    "t": "Chaque mode dégradé doit faire l'objet d'un signalement sur la feuille de route et au PCC."
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
        "tone": "red",
        "lines": [
          {
            "text": "En cas d'impossibilité de condamner la porte, le PCC pourra donner comme consigne d'isoler la fonction de « contrôle porte » en déplombant le commutateur sur l'armoire de loge.",
            "bold": true
          },
          {
            "text": "Au préalable, une évacuation de la rame est impérative.",
            "bold": true
          }
        ]
      }
    ]
  },
  {
    "id": "s-3-8",
    "level": 2,
    "code": "3.8",
    "page": 55,
    "title": "COMMUNICATION AVEC LA CLIENTELE",
    "blocks": [
      {
        "type": "page-scan",
        "src": "055.jpg",
        "caption": "Page 55/76"
      },
      {
        "type": "rct-section",
        "text": "3.8 - COMMUNICATION AVEC LA CLIENTELE"
      },
      {
        "type": "hand-p",
        "text": "Le conducteur est le garant de l'image de marque de TaM. En toute circonstance, son attitude et son comportement doivent être guidés par le souci du confort et de la sécurité des clients, en cas de situation perturbée ou hors incident d'exploitation, l'information des voyageurs est un impératif."
      },
      {
        "type": "hand-p",
        "text": "Cette information facilite l'attente et évite les dérangements successifs et les conflits avec la clientèle."
      },
      {
        "type": "hand-p",
        "text": "En cas de situation imprévue, le conducteur doit informer les clients en utilisant la sonorisation des salles."
      },
      {
        "type": "hand-p",
        "text": "En cas d'arrêt prolongé, il expliquera l'évolution de la situation aux usagers afin de les rassurer."
      },
      {
        "type": "hand-p",
        "text": "Ses propos seront rassurants et préviendront toute panique. Il est conseillé au conducteur de respecter les instructions suivantes pour utiliser la phonie et émettre des messages clairs aux clients :"
      },
      {
        "type": "arrow-ul",
        "tone": "plain",
        "items": [
          "Après avoir connecté la phonie intérieure, prendre une respiration, puis commencer à parler, en sachant que le premier mot ne sera sans doute pas compris.",
          "Parler calmement, en détachant bien les mots, sans traîner pour autant.",
          "Ne pas parler trop fort, la phonie est très sensible : parler comme on parle à son voisin de table.",
          "Ne pas coller la bouche au micro, au contraire. Parler à 5-6 cm du micro."
        ]
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Exemples de messages à la clientèle :",
            "bold": true
          }
        ],
        "center": true,
        "frame": "dashed"
      },
      {
        "type": "client-message-panel",
        "tone": "soft",
        "columns": [
          {
            "title": "Message : Arrêt prolongé en station ou hors station",
            "blocks": [
              {
                "type": "p",
                "text": "« Votre attention SVP. Mesdames, Messieurs,"
              },
              {
                "type": "hand-p",
                "parts": [
                  {
                    "t": "Un incident nous retarde, "
                  },
                  {
                    "t": "ou",
                    "italic": true
                  }
                ]
              },
              {
                "type": "hand-p",
                "text": "Un accident de la circulation nous retarde,"
              },
              {
                "type": "p",
                "text": "Nous devons patienter quelques instants."
              },
              {
                "type": "p",
                "text": "Je vous tiendrai informé de l'évolution de la situation."
              },
              {
                "type": "p",
                "text": "Merci de votre compréhension »."
              }
            ]
          },
          {
            "title": "Message : Descente des voyageurs",
            "blocks": [
              {
                "type": "p",
                "text": "« Votre attention SVP. Mesdames, Messieurs, Nous ne sommes pas en mesure de poursuivre notre voyage. Veuillez nous en excuser. Nous vous demandons de bien vouloir quitter la rame. Selon le cas :"
              },
              {
                "type": "hand-p",
                "text": "Un bus spécial assurera les trajets jusqu'à \"........\" (Indiquer la direction)"
              },
              {
                "type": "hand-p",
                "text": "Veuillez vous reporter sur la rame suivante qui passera dans quelques minutes"
              },
              {
                "type": "hand-p",
                "text": "Veuillez rejoindre la rame actuellement devant nous »."
              }
            ]
          }
        ]
      },
      {
        "type": "client-message-panel",
        "tone": "soft",
        "fullWidth": true,
        "columns": [
          {
            "title": "Message : Terminus intermédiaires (Occitanie ou Léon Blum)",
            "blocks": [
              {
                "type": "p",
                "text": "« Votre attention SVP. Mesdames, Messieurs, ce tramway effectue son terminus à \"......\" (Nommer la station). Veuillez vous reporter sur la rame suivante qui passera dans quelques minutes pour aller en direction de \".....\". Merci »."
              }
            ]
          }
        ]
      },
      {
        "type": "client-message-panel",
        "tone": "accent",
        "columns": [
          {
            "title": "Message : Fumeurs",
            "blocks": [
              {
                "type": "p",
                "text": "« Votre attention SVP. Mesdames, Messieurs. Nous vous demandons de respecter la qualité de l'air à l'intérieur de la rame en éteignant vos cigarettes. Merci de votre compréhension »."
              }
            ]
          },
          {
            "title": "Message : Portes",
            "blocks": [
              {
                "type": "p",
                "text": "« Votre attention SVP. Mesdames, Messieurs. Merci de vous tenir en arrière des portes afin de faciliter leur fermeture »."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "s-3-9",
    "level": 2,
    "code": "3.9",
    "page": 56,
    "title": "COMMUNICATION AVEC LE PCC",
    "blocks": [
      {
        "type": "page-scan",
        "src": "056.jpg",
        "caption": "Page 56/76"
      },
      {
        "type": "rct-section",
        "text": "3.9 - COMMUNICATION AVEC LE PCC"
      },
      {
        "type": "anchor",
        "id": "s-3-9-a"
      },
      {
        "type": "rct-sub",
        "text": "A - Signalements par radio :"
      },
      {
        "type": "hand-p",
        "text": "Selon la nature du signalement que le conducteur veut communiquer au PCC, le conducteur peut utiliser trois niveaux d'appel :"
      },
      {
        "type": "arrow-ul",
        "tone": "plain",
        "items": [
          "Appel normal.",
          "Appel urgent.",
          {
            "parts": [
              {
                "t": "Appel de détresse ("
              },
              {
                "t": "mise en toute écoute, allumage des feux de détresse",
                "italic": true
              },
              {
                "t": ")."
              }
            ]
          }
        ]
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "Attention : appui long sur Citadis 402",
            "blue": true,
            "bold": true
          }
        ]
      },
      {
        "type": "arrow-ul",
        "tone": "plain",
        "items": [
          "Accrocher/Décrocher le bouton « feux de détresse pour annuler cette fonction."
        ]
      },
      {
        "type": "hand-p",
        "text": "Tous les cas suivants font l'objet d'un appel obligatoire au PCC :"
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
                    "t": "L'ensemble des cas recensés dans les consignes de circulation en ligne (partie 3) et dans les consignes d'urgence (partie 4).",
                    "bold": true
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
                    "t": "Toute présence suspecte d'individus sur la voie, (handicapés mentaux, enfants, personnes âgées...), et notamment toute présence de piétons dans le tunnel.",
                    "bold": true
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
                    "t": "En cas de FU ou FS suite à un incident.",
                    "bold": true
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
                    "t": "Tous les défauts, dégâts, vandalisme ou anomalies décelés sur le matériel roulant en particulier ceux mettant en cause la sécurité (gravage, taggage, bris de glace).",
                    "bold": true
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
                    "t": "Tout dégât ou défaut décelés sur des équipements au sol mettant en cause la sécurité ou la continuité de l'exploitation.",
                    "bold": true
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
                    "t": "En cas de chantiers sur la voie mal protégés ou mal signalés, et tout chantier aux abords des voies pouvant présenter un risque pour la sécurité sur la ligne aérienne.",
                    "bold": true
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
                    "t": "En cas de panne des feux de traversée routière ou des feux des zones de manœuvres.",
                    "bold": true
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
            "t": "En fin de service : ",
            "blue": true,
            "bold": true
          },
          {
            "t": "les signalements par radio au PCC doivent être rapportés par le conducteur sur sa feuille de route.",
            "blue": true,
            "bold": true
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "057.jpg",
        "caption": "Page 57/76"
      },
      {
        "type": "anchor",
        "id": "s-3-9-b"
      },
      {
        "type": "rct-sub",
        "text": "B - En cas de panne de phonie :"
      },
      {
        "type": "p",
        "parts": [
          {
            "t": "En cas de panne générale, ou si l'utilisation du mode « secours phonie » indépendant du pupitre SAE est inopérante sur la rame",
            "italic": true
          }
        ]
      },
      {
        "type": "hand-p",
        "text": "le conducteur attend l'arrivée d'une autre rame et lui demande de prévenir le PCC."
      },
      {
        "type": "hand-p",
        "text": "le conducteur peut utiliser son propre téléphone pour appeler le PCC, rame à l'arrêt. Il se conforme ensuite aux instructions du Régulateur."
      },
      {
        "type": "note-blue-italic",
        "text": "En fin de service : noter l'incident sur la feuille de route."
      },
      {
        "type": "anchor",
        "id": "s-3-9-c"
      },
      {
        "type": "rct-sub",
        "text": "C - Rentrée et circulation dans le dépôt :"
      },
      {
        "type": "hand-p",
        "text": "Lors de la rentrée au dépôt, le conducteur :"
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
                    "t": "Demande l'autorisation de rentrer au dépôt."
                  }
                ]
              }
            ]
          },
          {
            "n": "2",
            "nColor": "blue",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Stationne sa rame sur le site désigné par le PCC : suivant l'heure de rentrée au dépôt le conducteur peut être amenée à laisser sa rame en voie E, en station, ou sur le remisage."
                  }
                ]
              }
            ]
          },
          {
            "n": "3",
            "nColor": "blue2",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Vérifie l'état intérieur et extérieur de la rame."
                  }
                ]
              }
            ]
          },
          {
            "n": "4",
            "nColor": "blue3",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Signale tout dégât ou dysfonctionnement sur la feuille de route."
                  }
                ]
              }
            ]
          },
          {
            "n": "5",
            "nColor": "teal",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "Note le kilométrage effectué ainsi que le nombre d'heures."
                  }
                ]
              }
            ]
          },
          {
            "n": "6",
            "nColor": "teal",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "La feuille de route est remise dans la boite au lettre prévue à cet effet."
                  }
                ]
              }
            ]
          },
          {
            "n": "7",
            "nColor": "purple",
            "boxed": true,
            "bullets": [
              {
                "parts": [
                  {
                    "t": "La planchette est rangée en salle de prise de service."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "page-scan",
        "src": "058.jpg",
        "caption": "Page 58/76"
      },
      {
        "type": "hand-p",
        "text": "Pour circuler dans le dépôt :"
      },
      {
        "type": "flow-table",
        "items": [
          {
            "color": "blue",
            "parts": [
              {
                "t": "La circulation dans le dépôt se fait toujours sans client.",
                "bold": true
              }
            ]
          },
          {
            "color": "blue",
            "parts": [
              {
                "t": "La circulation dans le dépôt est placée sous le contrôle du PCC.",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "Le conducteur est tenu de respecter la signalisation de manœuvre.",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "Les déplacements s'effectuent sous la responsabilité du conducteur.",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "La vitesse sur la zone du dépôt est limitée à 10 Km/h, et 3 Km/h sur la zone ateliers.",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "La circulation sur la zone atelier n'est pas autorisée aux conducteurs.",
                "bold": true
              }
            ]
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-3-9-d"
      },
      {
        "type": "rct-sub",
        "text": "D - Signalements par feuille de route"
      },
      {
        "type": "arrow-p",
        "arrow": "large",
        "parts": [
          {
            "t": "On distingue :"
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          "la feuille de route attaché au conducteur, sur laquelle il note les incidents ayant affecté son service",
          "la feuille de route (de couleur) attachée à la rame sur laquelle sont notés les signalements concernant strictement le fonctionnement du matériel roulant (y compris les équipements embarqués comme les valideurs)."
        ]
      },
      {
        "type": "hand-p",
        "text": "Le conducteur doit :"
      },
      {
        "type": "flow-table",
        "items": [
          {
            "color": "blue",
            "parts": [
              {
                "t": "Apporter le plus grand soin dans la rédaction de la feuille de route.",
                "bold": true
              }
            ]
          },
          {
            "color": "blue",
            "parts": [
              {
                "t": "Remplir correctement les différentes rubriques (accidents, incidents.etc.).",
                "bold": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "Noter les anomalies liées au matériel roulant ",
                "bold": true
              },
              {
                "t": "sur la feuille de route.",
                "bold": true,
                "purple": true
              }
            ]
          },
          {
            "color": "purple",
            "parts": [
              {
                "t": "Noter les ",
                "bold": true
              },
              {
                "t": "appels importants",
                "bold": true,
                "underline": true
              },
              {
                "t": " du PCC.",
                "bold": true
              }
            ]
          }
        ]
      },
      {
        "type": "anchor",
        "id": "s-3-9-e"
      },
      {
        "type": "rct-sub",
        "text": "E - Signalements par rapport interne"
      },
      {
        "type": "arrow-p",
        "arrow": "large",
        "parts": [
          {
            "t": "La rédaction d'un rapport interne engage la parole de celui qui le rédige vis-à-vis du Règlement de Circulation mais aussi par rapport à son interprétation administrative. C'est pourquoi le plus grand soin doit être porté à sa rédaction, notamment en cas :"
          }
        ]
      },
      {
        "type": "arrow-ul",
        "tone": "plain",
        "items": [
          "d'incidents divers susceptibles d'entraîner des plaintes ou des réclamations",
          "d'accident corporel ou matériel, et de dégâts divers occasionnés sur le matériel roulant"
        ]
      },
      {
        "type": "note-blue-italic",
        "text": "Le rapport interne pourra être établi dans le cadre d'un entretien de restitution, avec un agent de maîtrise de l'Exploitation."
      }
    ]
  }
];

export const RCT_LECTURE_CH3_TOC = [
  {
    "id": "p38",
    "level": 1,
    "code": "3",
    "page": 38,
    "title": "Sommaire — chapitre 3"
  },
  {
    "id": "s-3-1",
    "level": 2,
    "code": "3.1",
    "page": 39,
    "title": "PRISE DE SERVICE"
  },
  {
    "id": "s-3-1-a",
    "level": 3,
    "code": "A",
    "page": 39,
    "title": "Prise de service au dépôt",
    "anchorOnly": true,
    "parentId": "s-3-1"
  },
  {
    "id": "s-3-1-b",
    "level": 3,
    "code": "B",
    "page": 40,
    "title": "Préparation de la rame",
    "anchorOnly": true,
    "parentId": "s-3-1"
  },
  {
    "id": "s-3-1-c",
    "level": 3,
    "code": "C",
    "page": 41,
    "title": "Comportement du conducteur dans la rame",
    "anchorOnly": true,
    "parentId": "s-3-1"
  },
  {
    "id": "s-3-2",
    "level": 2,
    "code": "3.2",
    "page": 42,
    "title": "CIRCULATION EN LIGNE"
  },
  {
    "id": "s-3-2-a",
    "level": 3,
    "code": "A",
    "page": 43,
    "title": "Ouverture de la voie",
    "anchorOnly": true,
    "parentId": "s-3-2"
  },
  {
    "id": "s-3-2-b",
    "level": 3,
    "code": "B",
    "page": 44,
    "title": "Circulation sur voie double",
    "anchorOnly": true,
    "parentId": "s-3-2"
  },
  {
    "id": "s-3-2-c",
    "level": 3,
    "code": "C",
    "page": 44,
    "title": "Circulation sur voie unique",
    "anchorOnly": true,
    "parentId": "s-3-2"
  },
  {
    "id": "s-3-2-d",
    "level": 3,
    "code": "D",
    "page": 45,
    "title": "Circulation en VUT",
    "anchorOnly": true,
    "parentId": "s-3-2"
  },
  {
    "id": "s-3-2-e",
    "level": 3,
    "code": "E",
    "page": 46,
    "title": "Manœuvres retournement et rebroussement",
    "anchorOnly": true,
    "parentId": "s-3-2"
  },
  {
    "id": "s-3-3",
    "level": 2,
    "code": "3.3",
    "page": 49,
    "title": "CIRCULATION HAUT LE PIED"
  },
  {
    "id": "s-3-4",
    "level": 3,
    "code": "3.4",
    "page": 49,
    "title": "Feux et feux de détresse",
    "anchorOnly": true,
    "parentId": "s-3-3"
  },
  {
    "id": "s-3-5",
    "level": 2,
    "code": "3.5",
    "page": 50,
    "title": "UTILISATION DU GONG"
  },
  {
    "id": "s-3-6",
    "level": 3,
    "code": "3.6",
    "page": 50,
    "title": "Distances de sécurité",
    "anchorOnly": true,
    "parentId": "s-3-5"
  },
  {
    "id": "s-3-7",
    "level": 2,
    "code": "3.7",
    "page": 51,
    "title": "ARRET EN STATION ET COMMANDE DES PORTES"
  },
  {
    "id": "s-3-7-a",
    "level": 3,
    "code": "A",
    "page": 51,
    "title": "Commande d'ouverture de porte",
    "anchorOnly": true,
    "parentId": "s-3-7"
  },
  {
    "id": "s-3-7-b",
    "level": 3,
    "code": "B",
    "page": 52,
    "title": "Commande de fermeture des portes",
    "anchorOnly": true,
    "parentId": "s-3-7"
  },
  {
    "id": "s-3-7-c",
    "level": 3,
    "code": "C",
    "page": 53,
    "title": "Départ de la station",
    "anchorOnly": true,
    "parentId": "s-3-7"
  },
  {
    "id": "s-3-7-d",
    "level": 3,
    "code": "D",
    "page": 54,
    "title": "Mode dégradé défaut porte",
    "anchorOnly": true,
    "parentId": "s-3-7"
  },
  {
    "id": "s-3-8",
    "level": 2,
    "code": "3.8",
    "page": 55,
    "title": "COMMUNICATION AVEC LA CLIENTELE"
  },
  {
    "id": "s-3-9",
    "level": 2,
    "code": "3.9",
    "page": 56,
    "title": "COMMUNICATION AVEC LE PCC"
  },
  {
    "id": "s-3-9-a",
    "level": 3,
    "code": "A",
    "page": 56,
    "title": "Signalements par radio",
    "anchorOnly": true,
    "parentId": "s-3-9"
  },
  {
    "id": "s-3-9-b",
    "level": 3,
    "code": "B",
    "page": 57,
    "title": "En cas de panne de phonie",
    "anchorOnly": true,
    "parentId": "s-3-9"
  },
  {
    "id": "s-3-9-c",
    "level": 3,
    "code": "C",
    "page": 57,
    "title": "Rentrée et circulation dans le dépôt",
    "anchorOnly": true,
    "parentId": "s-3-9"
  },
  {
    "id": "s-3-9-d",
    "level": 3,
    "code": "D",
    "page": 58,
    "title": "Signalements par feuille de route",
    "anchorOnly": true,
    "parentId": "s-3-9"
  },
  {
    "id": "s-3-9-e",
    "level": 3,
    "code": "E",
    "page": 58,
    "title": "Signalements par rapport interne",
    "anchorOnly": true,
    "parentId": "s-3-9"
  }
];
