"""Pages 46–58 du chapitre 3 — importé par build_ch3_lecture.py."""


def p(text=None, parts=None, **kw):
    b = {"type": "p"}
    if parts:
        b["parts"] = parts
    elif text is not None:
        b["text"] = text
    b.update({k: v for k, v in kw.items() if k not in ("parts", "text") or v is not None})
    return b


def z(*items):
    return {"type": "zone-table", "items": list(items)}


def zc(color, bullets=None, parts=None, text=None, extra=None, **kw):
    item = {"marker": "chevron", "nColor": color, "boxed": True}
    if bullets:
        item["bullets"] = bullets
    if parts:
        item["parts"] = parts
    if text:
        item["text"] = text
    if extra:
        item["extra"] = extra
    item.update(kw)
    return item


def zn(n, color, **kw):
    return {"n": n, "nColor": color, "boxed": True, **kw}


def ft(*items, **kw):
    return {"type": "flow-table", "items": list(items), **kw}


def blt(text, **kw):
    return {"parts": [{"t": text, **kw}]}


def _cas_box(title, *steps):
    blocks = [{"type": "arrow-p", "parts": [{"t": title, "bold": True}]}]
    for step in steps:
        if isinstance(step, dict):
            blocks.append({"type": "chevron-p", **step})
        else:
            blocks.append({"type": "chevron-p", "text": step})
    return {"type": "boxed", "tone": "plain", "blocks": blocks}


def blocks_p46(ps):
    return [
        ps(46),
        {"type": "anchor", "id": "s-3-2-e"},
        p(parts=[{"t": "E1 - Manœuvres de retournement et de rebroussement", "bold": True, "underline": True}]),
        {
            "type": "hand-p",
            "parts": [
                {"t": "Retournement", "bold": True, "underline": True},
                {"t": " : manœuvre qui consiste à faire un changement de voie par une communication et à repartir dans l'autre sens par l'autre voie."},
            ],
        },
        {
            "type": "hand-p",
            "parts": [
                {"t": "Rebroussement", "bold": True, "underline": True},
                {"t": " : cette manœuvre de retournement sur une même voie correspond à une circulation en Voie Unique Temporaire."},
            ],
        },
        {
            "type": "flow-table",
            "items": [
                {
                    "color": "teal",
                    "parts": [
                        {
                            "t": "La manœuvre de retournement doit se faire de préférence sans voyageurs, sauf pour le cas des stations situées après la communication de retournement.",
                            "bold": True,
                        }
                    ],
                },
                {
                    "color": "blue",
                    "parts": [
                        {
                            "t": "Sur les communications non signalées (communications manuelles), l'ensemble de la manœuvre de retournement ne peut se faire que sur ordre ou avec l'autorisation du PCC.",
                            "bold": True,
                        }
                    ],
                },
                {
                    "color": "blue2",
                    "parts": [
                        {
                            "t": "De manière générale, toute manœuvre hors terminus et non prévue sur la planchette doit être effectuée sous contrôle du PCC y compris sur la 3ème voie d'Occitanie ou de L. Blum.",
                            "bold": True,
                        }
                    ],
                },
                {
                    "color": "purple",
                    "parts": [
                        {
                            "t": "Toute manœuvre de rebroussement ne peut s'effectuer que dans le cadre de la ",
                            "bold": True,
                        },
                        {
                            "t": "consigne 3.2.D : Circulation en Voie Unique Temporaire",
                            "bold": True,
                            "underline": True,
                        },
                        {
                            "t": ", sauf sur un tronçon de longueur limitée et à bonne visibilité entre la station et la communication , ou sur un tronçon à Voie Unique protégée par la signalisation ferroviaire.",
                            "bold": True,
                        },
                    ],
                },
            ],
        },
        _cas_box(
            "Cas n° 1 : communication manuelle située après une station",
            "Effectuer la dépose des voyageurs après les avoir informés de la manœuvre.",
            "Avancer jusqu'à la limite de manœuvre (clou inox) de façon à bien dégager l'aiguillage pour pouvoir le manœuvrer, ou pour pouvoir vérifier sa position.",
            "Enclencher les feux de détresse.",
            "Mettre le manipulateur au neutre, retirer la clé KC et après avoir quitté la cabine de conduite, refermer la porte à clé.",
            "Positionner les aiguillages en position déviée.",
            {
                "parts": [
                    {"t": "Remonter dans la cabine de tête et le cas échéant, pour les manœuvres imposant un franchissement de carrefour ("},
                    {"t": "comme à Albert 1er", "italic": True},
                    {"t": "), mettre le commutateur de l'Armoire Electrique de Loge sur le mode VUT pour déclencher le feu."},
                ]
            },
            "Effectuer son départ en sens inverse jusqu'à la station, après accord confirmé du PCC dans les cas où la visibilité est insuffisante.",
            "Sauf contre-ordre, remettre les aiguillages dans leur position initiale (si d'autres rames doivent effectuer un retournement au même endroit, le PCC donnera l'ordre de laisser les aiguillages en position déviée).",
            "Prévenir le PCC de la fin de la manœuvre.",
        ),
    ]


def blocks_p47(ps):
    return [
        ps(47),
        _cas_box(
            "Cas n° 2 : communication manuelle située avant une station",
            {
                "parts": [
                    {"t": "Arrêter la rame en station après avoir informé les voyageurs "},
                    {"t": "(sauf si retournement en HLP)", "italic": True},
                    {"t": ","},
                ]
            },
            "Enclencher les feux de détresse, mettre le manipulateur au neutre, retirer la clé KC, refermer la porte de cabine,",
            {
                "parts": [
                    {"t": "Changer de cabine et "},
                    {"t": "après autorisation du PCC", "bold": True, "underline": True},
                    {"t": ", rebrousser -avec les feux de détresse- jusqu'à l'aiguille,"},
                ]
            },
            {
                "parts": [
                    {"t": "Positionner l'aiguille en voie déviée et entamer le changement de voie "},
                    {"t": "après accord du PCC", "bold": True, "underline": True},
                    {"t": "."},
                ]
            },
        ),
        p(
            parts=[
                {"t": "La reprise des voyageurs se fait sur le même quai "},
                {"t": "(sauf si retournement en HLP)", "italic": True},
                {"t": "."},
            ]
        ),
        p("Au départ de la station, le conducteur actionne le mode VUT si la configuration des lieux l'impose (carrefour pris à contre-sens)."),
        p("Si le PCC lui en donne l'ordre, il rétablit -après le passage sur l'autre voie- l'aiguillage dans sa position initiale."),
        p(parts=[{"t": "E2 - Manœuvre de retournement en terminus", "bold": True, "underline": True}]),
        {
            "type": "consigne-red",
            "text": "Les manœuvres de retournement en terminus, ou en terminus partiel sont à réaliser conformément aux instructions du SAE ou de la planchette.",
        },
        z(
            zn(
                "1",
                "purple",
                bullets=[
                    blt(
                        "Mettre le commutateur de conduite en position neutre, retirer la clé KC et après avoir quitté le poste de conduite, fermer la porte de la cabine à clé."
                    )
                ],
            ),
            zn(
                "2",
                "blue",
                bullets=[
                    blt(
                        "Lors de la traversée de la rame, vérifier s'il n'y a pas d'objets oubliés : En cas d'objets oubliés ou suspects, prévenir le PCC."
                    )
                ],
            ),
            zn(
                "3",
                "blue2",
                bullets=[
                    blt(
                        "Mettre le commutateur de conduite en service dans la cabine de tête et vérifier la pré-sélection de côté des portes et l'affichage des girouettes."
                    )
                ],
            ),
            zn(
                "4",
                "teal",
                bullets=[
                    blt(
                        "Avancer vers le quai de départ en respectant la signalisation, et déverrouiller les portes."
                    )
                ],
            ),
        ),
        p("En cas de manœuvre d'avant-gare avec voyageurs à bord, attention à la sélection d'ouverture de portes pour la descente des voyageurs !"),
        {
            "type": "p",
            "parts": [
                {"t": "Rappel : la vitesse de circulation en terminus est limitée à ", "bold": True, "blue": True},
                {"t": "15 Km/h", "bold": True, "blue": True, "underline": True},
                {"t": ".", "bold": True, "blue": True},
            ],
        },
        p("Le conducteur est autorisé sur son temps de battement ou de pause à quitter le poste de conduite. En dehors de cette plage horaire il ne peut le faire sans autorisation du PCC."),
        {
            "type": "warning",
            "lines": [
                {"parts": [{"t": "Marche Arrière", "bold": True}]},
                {
                    "parts": [
                        {"t": "La marche arrière, le conducteur se trouvant dans la cabine opposée au sens de marche, est "},
                        {"t": "formellement interdite", "bold": True, "red": True, "underline": True},
                        {
                            "t": ". Elle ne peut être autorisée sur une courte distance que dans le cas de manœuvre de remorquage-poussage, la présence d'un deuxième agent dans la cabine opposée étant obligatoire."
                        },
                    ]
                },
            ],
        },
    ]


def blocks_p48(ps):
    return [
        ps(48),
        p(parts=[{"t": "E3 - Manœuvre de rebroussement sur Voie Unique", "bold": True, "underline": True}]),
        {"type": "arrow-p", "parts": [{"t": "Rebroussement après station (exemple : Station Boirargues sur ligne 3)"}]},
        ft(
            {
                "color": "blue",
                "parts": [{"t": "La rame s'engage jusqu'au repère de rebroussement", "bold": True}],
            },
            {
                "color": "purple",
                "parts": [
                    {"t": "après autorisation du PCC", "underline": True},
                    {
                        "t": ", le conducteur change de loge, contrôle la position de l'aiguille, puis se dirige vers le quai de la station sur la voie opposée"
                    },
                ],
            },
        ),
        {
            "type": "arrow-p",
            "parts": [
                {"t": "En cas de besoin "},
                {"t": "(engagement de deux rames opposées sur une même section en VU, ou : signal de manœuvre au rouge sur problème d'aiguillage)", "italic": True},
            ],
        },
        ft(
            {
                "color": "blue",
                "parts": [
                    {"t": "La rame la plus proche de la station d'évitement effectue la manœuvre de rebroussement après autorisation du PCC.", "bold": True},
                    {"t": " Il est conseillé de garder les voyageurs à bord, après accord du PCC", "blue": True},
                ],
            },
            {
                "color": "blue",
                "parts": [
                    {
                        "t": "Le cas échéant, en fonction de sa position, le conducteur s'assure au préalable de bien dégager l'appareil de voie de la station qu'il vient de quitter, en marche normale (marche avant).",
                        "bold": True,
                    }
                ],
            },
            {
                "color": "blue",
                "parts": [
                    {
                        "t": "Après le changement de cabine, le conducteur effectue la manœuvre de rebroussement à vitesse limitée de 5 km/h en dépassant la station d'évitement (franchissement des 2 appareils de voie). Il s'assure d'avoir bien dégagé l'aiguille de sortie de l'évitement avant de rebrousser.",
                        "bold": True,
                    }
                ],
            },
            {
                "color": "purple",
                "parts": [
                    {
                        "t": "Il informe le PCC de la position de la rame lorsque la rame est revenue sur le quai de départ.",
                        "bold": True,
                    }
                ],
            },
            {
                "color": "purple",
                "parts": [
                    {
                        "t": "Il peut repartir après autorisation du PCC dans la direction normale, vers la station d'évitement.",
                        "bold": True,
                    }
                ],
            },
            {
                "color": "purple",
                "parts": [
                    {
                        "t": "Il marque l'arrêt au niveau du signal de manœuvre de sortie de station, et peut s'engager à l'allumage du signal vert.",
                        "bold": True,
                    }
                ],
            },
        ),
    ]


def blocks_p49_33(ps):
    return [
        ps(49),
        {"type": "rct-section", "text": "3.3 - CIRCULATION HAUT LE PIED (= SANS VOYAGEURS)"},
        {"type": "arrow-p", "parts": [{"t": "Des consignes spécifiques s'ajoutent aux consignes de circulation en ligne."}]},
        z(
            zn("1", "purple", bullets=[blt("La vitesse de passage en station est limitée à 15 km/h.")]),
            zn("2", "blue", bullets=[blt("Au passage en station, le gong doit être actionné, excepté à partir de 22h00 sauf en cas de danger.")]),
            zn("3", "blue2", bullets=[blt("Le conducteur doit veiller au message affiché sur la girouette.")]),
            zn("4", "teal", bullets=[blt("Les feux de détresse doivent être actionnés.")]),
        ),
    ]


def blocks_p49_34(ps):
    return [
        {"type": "rct-section", "text": "3.4 - UTILISATION DES FEUX ET DES FEUX DE DETRESSE"},
        {
            "type": "boxed",
            "tone": "plain",
            "blocks": [
                p(
                    parts=[
                        {
                            "t": "Toute rame de tramway doit circuler avec les feux de croisement allumés, de jour comme de nuit, ainsi qu'avec l'éclairage intérieur.",
                            "bold": True,
                        }
                    ]
                ),
                p("L'emploi des feux de route et des antibrouillards est soumis à la réglementation prescrite par le Code de la Route."),
            ],
        },
        {"type": "arrow-p", "parts": [{"t": "Le conducteur doit allumer les feux de détresse :"}]},
        ft(
            {"color": "blue", "parts": [{"t": "Pour tout arrêt ", "bold": True}, {"t": "anormal et prolongé", "bold": True, "blue": True}, {"t": " en ligne.", "bold": True}]},
            {"color": "blue2", "parts": [{"t": "Lors de circulation ", "bold": True}, {"t": "HLP", "bold": True, "blue": True}, {"t": " et en ", "bold": True}, {"t": "VUT", "bold": True, "blue": True}]},
            {
                "color": "blue2",
                "parts": [
                    {"t": "Dans la zone ", "bold": True},
                    {"t": "Gare", "bold": True, "blue": True},
                    {"t": " en cas d'itinéraire ", "bold": True},
                    {"t": "dévié", "bold": True, "blue": True},
                    {"t": ".", "bold": True},
                ],
            },
            {
                "color": "purple",
                "parts": [
                    {"t": "En cas de franchissement d'un carrefour où les feux de circulation sont ", "bold": True},
                    {"t": "clignotants ou éteints", "bold": True, "blue": True},
                    {"t": ".", "bold": True},
                ],
            },
            {
                "color": "purple",
                "parts": [
                    {"t": "Lors des ", "bold": True},
                    {"t": "poussages", "bold": True, "blue": True},
                    {"t": " ou des ", "bold": True},
                    {"t": "remorquages", "bold": True, "blue": True},
                    {"t": ".", "bold": True},
                ],
            },
        ),
        {
            "type": "warning",
            "icon": True,
            "tone": "red",
            "lines": [
                {
                    "parts": [
                        {
                            "t": "Lorsqu'une rame en circulation croise un tramway arrêté sur l'autre voie avec ou sans les feux de détresse allumés, le conducteur doit ralentir (10 Km/h) et marquer un arrêt à hauteur de la cabine de l'autre rame, pour s'assurer que l'autre conducteur n'a besoin de rien. "
                        },
                        {
                            "t": "Il doit en informer le PCC impérativement avant de repartir.",
                            "underline": True,
                        },
                    ]
                },
                {
                    "text": "Rappel : en cas de panne des feux de détresse lors d'un arrêt anormal et prolongé en ligne, le triangle de signalisation doit être positionné 40 m environ avant la rame"
                },
            ],
        },
    ]


def blocks_p49(ps):
    return blocks_p49_33(ps) + blocks_p49_34(ps)


def blocks_p50_35(ps):
    return [
        ps(50),
        {"type": "rct-section", "text": "3.5 - UTILISATION DU GONG"},
        {
            "type": "arrow-p",
            "parts": [{"t": "L'utilisation du gong est obligatoire dans les cas suivants :", "blue": True, "bold": True}],
        },
        {"type": "arrow-p", "parts": [{"t": "Présence de piétons ou de cycliste à proximité de la voie ou sur la voie."}]},
        {
            "type": "arrow-p",
            "parts": [
                {"t": "Franchissement de "},
                {"t": "carrefour", "bold": True},
                {"t": " ou de "},
                {"t": "zone piétonne", "bold": True},
                {"t": ", en présence de sources de danger"},
            ],
        },
        {"type": "arrow-p", "parts": [{"t": "Croisement avec une rame ou un bus arrêté."}]},
        {"type": "arrow-p", "parts": [{"t": "A partir de 7h00 et jusqu'à 22h00 seulement :"}]},
        {"type": "chevron-p", "text": "Arrivée en station."},
        {"type": "chevron-p", "text": "Départ de station et lors de la mise en mouvement de la rame."},
        {"type": "chevron-p", "text": "Croisement avec une rame en circulation : utilisation au moment du passage à hauteur de la nacelle centrale."},
        {"type": "arrow-p", "parts": [{"t": "En mode dégradé :"}]},
        {"type": "chevron-p", "text": "Au franchissement de carrefour, lorsque les feux sont en dysfonctionnement."},
        {"type": "chevron-p", "text": "Lors de VUT à contresens."},
        {
            "type": "warning",
            "icon": True,
            "prefix": "En cas de panne du gong :",
            "prefixBlack": True,
            "bulletsRed": True,
            "bulletStyle": "arrow",
            "bullets": [
                "Le conducteur doit prévenir le PCC.",
                {"parts": [{"t": "Il doit respecter la vitesse de consigne de "}, {"t": "20 Km/h", "bold": True}, {"t": "."}]},
                "L'usage du klaxon en cas de danger est recommandé, à titre de remplacement.",
            ],
        },
    ]


def blocks_p50_36(ps):
    return [
        {"type": "rct-section", "text": "3.6 - DISTANCES DE SECURITE"},
        {
            "type": "arrow-p",
            "arrow": "large",
            "parts": [
                {"t": "La distance à respecter entre deux rames "},
                {"t": "circulant en ligne", "bold": True, "underline": True},
                {"t": " (en commercial ou en HLP) est de "},
                {"t": "100 mètres minimum", "bold": True},
                {"t": ". Cette distance peut être réduite de moitié "},
                {"t": "sur les tronçons où la vitesse est limitée à 30 Km/h maxi.", "italic": True},
            ],
        },
        {
            "type": "arrow-p",
            "arrow": "large",
            "parts": [
                {"t": "La distance entre deux rames "},
                {"t": "à l'arrêt", "bold": True, "underline": True},
                {"t": " hors station (ex. : rue Jules Ferry, secteur Gare) est de "},
                {"t": "5 mètres minimum", "bold": True},
                {
                    "t": ". Sur certaines zones, une limite pour le positionnement de la deuxième rame peut être matérialisée au sol. Le conducteur adapte sa vitesse d'approche de la rame arrêtée en fonction des conditions de visibilité et d'adhérence."
                },
            ],
        },
        {
            "type": "arrow-p",
            "arrow": "large",
            "parts": [
                {"t": "La distance entre deux rames à l'arrêt "},
                {"t": "en station", "bold": True, "underline": True},
                {"t": ", est réduite à "},
                {"t": "2 mètres minimum", "bold": True},
                {"t": "."},
            ],
        },
        {
            "type": "warning",
            "icon": True,
            "tone": "red",
            "parts": [
                {"t": "La vitesse d'entrée en station sur une "},
                {"t": "station à quai double", "bold": True},
                {"t": " ne doit pas être supérieure à 15 km/h en cas de présence d'une première rame à quai -ou en cas de rame arrêtée sur le quai opposé- ("},
                {"t": "risque de traversée d'un piéton derrière la rame à l'arrêt !", "bold": True},
                {"t": ")"},
            ],
        },
    ]


def blocks_p50(ps):
    return blocks_p50_35(ps) + blocks_p50_36(ps)


def blocks_p51(ps):
    return [
        ps(51),
        {"type": "rct-section", "text": "3.7 - ARRET EN STATION ET COMMANDE DES PORTES"},
        ft(
            {"color": "teal", "parts": [{"t": "La montée et la descente des voyageurs ne doivent s'effectuer qu'en station et seulement du côté prévu, sauf consigne particulière du PCC.", "bold": True}]},
            {"color": "blue", "parts": [{"t": "En service commercial, l'arrêt est marqué à chaque station.", "bold": True}]},
            {
                "color": "blue",
                "parts": [
                    {
                        "t": "L'entrée en station s'effectue à la vitesse maximum de consigne de 30 Km/h, en actionnant le gong, ou à 15 Km/h en cas de présence de rame devant (quais allongés) ou sur la voie opposée : voir consigne 3.6 \"Distances de sécurité\".",
                        "bold": True,
                    }
                ],
            },
            {"color": "purple", "parts": [{"t": "L'attention du conducteur doit être attirée par les voyageurs se trouvant en bordure de quai.", "bold": True}]},
            {"color": "purple", "parts": [{"t": "L'immobilisation de la rame se fait au point matérialisé sur le quai à hauteur d'épaule du conducteur, par un clou rouge", "bold": True}]},
            {"color": "purple", "parts": [{"t": "!!! Les portes ne sont déverrouillées qu'à l'arrêt complet de la rame !!!", "bold": True}]},
        ),
        {"type": "anchor", "id": "s-3-7-a"},
        {"type": "rct-sub", "text": "A - Commande d'ouverture de porte :"},
        {
            "type": "hand-p",
            "lead": {"parts": [{"t": "Sur les CITADIS 401", "underline": True}, {"t": " :"}]},
            "body": {
                "parts": [
                    {
                        "t": "A l'arrêt de la rame, la pré-sélection droite étant active (BPAL enclenché et allumé), le conducteur actionne le bouton de dé-verrouillage des portes (BPAL) : c'est le mode dit self-service."
                    }
                ]
            },
        },
        {
            "type": "hand-p",
            "lead": {
                "parts": [
                    {"t": "Sur les CITADIS 302 ou 402", "underline": True},
                    {"t": " (pas de pré-sélection possible) :"},
                ]
            },
            "body": {
                "parts": [
                    {"t": "A l'arrêt de la rame, le conducteur actionne le bouton de dé-verrouillage des portes (BPAL) côté droit ou gauche "},
                    {"t": "selon l'emplacement du quai.", "bold": True},
                ]
            },
        },
        {
            "type": "arrow-p",
            "tone": "blue",
            "parts": [
                {
                    "t": "Les doubles portes de la caisse centrale s'ouvrent pour l'accès PMR, les autres portes ne s'ouvrant que sur action des voyageurs sur les boutons-poussoirs, de l'intérieur ou de l'extérieur de la rame.",
                    "bold": True,
                    "italic": True,
                }
            ],
        },
        {
            "type": "hand-p",
            "parts": [
                {"t": "Sur le Citadis 402", "underline": True},
                {"t": ", en cas de demande d'ouverture de porte par une Personne à Mobilité Réduite (pictogramme sur la console SIE), il faut acquitter la demande à l'écran pour provoquer l'ouverture des portes de la caisse concernée (en mode self)."},
            ],
        },
        {
            "type": "callout-box",
            "tone": "yellow",
            "blocks": [
                {
                    "type": "hand-p",
                    "text": "En cas de forte affluence, il est recommandé d'actionner le bouton d'ouverture générale (BPAL) afin d'accélérer l'échange voyageur en station.",
                },
            ],
        },
    ]


def blocks_p52(ps):
    return [
        ps(52),
        {"type": "hand-p", "text": "Le conducteur surveille ensuite la montée et la descente des voyageurs"},
        {
            "type": "hand-p",
            "parts": [
                {
                    "t": "La régulation en terminus sur le quai de départ doit s'effectuer avec le mode self activé mais avec le commutateur en position N (neutre). Ceci afin de maintenir les portes centrales fermées pour l'efficacité du chauffage ou de la climatisation de la rame."
                }
            ],
        },
        {
            "type": "note-blue-italic",
            "text": "Les commandes des portes, à disposition du conducteur, sont actives à partir de la cabine en service lorsqu'il y en a une, ou de la dernière cabine en service lorsque aucune cabine n'est en service (pour permettre de conserver le fonctionnement des portes lors d'un changement de cabine).",
        },
        {"type": "anchor", "id": "s-3-7-b"},
        {"type": "rct-sub", "text": "B - Commande de fermeture des portes :"},
        {
            "type": "hand-p",
            "parts": [
                {
                    "t": "Au bout de 15 sec. environ (station à faible fréquentation) ou de 30 sec. environ (station à forte fréquentation), "
                },
                {"t": "en anticipant les dernières montées voyageurs", "bold": True},
                {"t": ", le conducteur libère le bouton de déverrouillage des portes (décrochage du BPAL)."},
            ],
        },
        {
            "type": "note-blue-italic",
            "text": "Cette commande provoque la fermeture des portes de la caisse centrale et des portes encore en mode « self ». L'ensemble des sécurités sont actives (détecteur d'obstacle par cellule et détection d'obstacle par mesure de surintensité sur la motorisation des portes), et les portes se ré-ouvrent puis se referment en cas d'obstacle.",
        },
        {
            "type": "hand-p",
            "text": "En cas de nécessité, par forte affluence, le conducteur peut provoquer la fermeture forcée des portes (par appui prolongé sur le BPI).",
        },
        {
            "type": "note-blue-italic",
            "text": "Les sécurités sont alors inhibées et la fermeture est précédée d'un message d'alerte des voyageurs « attention à la fermeture des portes ».",
        },
        {
            "type": "hand-p",
            "text": "En cas d'obstacle en phase de fermeture, les portes restent alors en position de blocage : le conducteur doit effectuer une commande d'ouverture générale avant de relancer la commande de fermeture.",
        },
        {
            "type": "warning",
            "icon": True,
            "align": "center",
            "lines": [
                {
                    "text": "Sur le Citadis 401, la commande de fermeture forcée des portes via le déverrouillage (BPAL) de la sélection de côté est interdite.",
                    "red": True,
                    "bold": True,
                },
                {
                    "text": "Cela annule le message d'alerte précédant la fermeture et peut provoquer un grave incident après le démarrage de la rame : ouverture de la porte côté entrevoie en cas de tirage de poignée d'alarme.",
                    "blue": True,
                    "bold": True,
                    "italic": True,
                },
                {
                    "text": "Sur les Citadis 302 et 402, il est interdit pour la même raison d'ouvrir les deux côtés simultanément en exploitation commerciale",
                    "red": True,
                    "bold": True,
                },
            ],
        },
    ]


def blocks_p53(ps):
    return [
        ps(53),
        {"type": "anchor", "id": "s-3-7-c"},
        {"type": "rct-sub", "text": "C - Départ de la station :"},
        {
            "type": "hand-p",
            "parts": [
                {
                    "t": "Sur les sections en Voie Unique des lignes 2 et 3 (cantonnement) :",
                    "blue": True,
                    "bold": True,
                    "italic": True,
                },
            ],
        },
        {"type": "chevron-p", "text": "Le départ n'est autorisé que si le feu de Signalisation Ferroviaire est au vert."},
        {"type": "chevron-p", "text": "Ne pas quitter le quai si le feu est au rouge."},
        {
            "type": "hand-p",
            "parts": [{"t": "Sur les stations à quai double :", "blue": True, "bold": True, "italic": True}],
        },
        {
            "type": "chevron-p",
            "parts": [
                {"t": "Si le conducteur s'est arrêté en seconde position derrière une autre rame, "},
                {
                    "t": "il doit marquer un deuxième arrêt en tête de quai pour garantir la prise en charge des PMR.",
                    "red": True,
                },
            ],
        },
        {
            "type": "warning",
            "icon": True,
            "parts": [
                {"t": "La seconde position sur le quai Corum L1V2 est une "},
                {"t": "position d'attente", "bold": True},
                {"t": ". L'échange voyageurs sur cette position est "},
                {"t": "strictement interdit", "bold": True},
                {"t": " car l'ensemble du quai n'est pas aligné par rapport à la rame : risque d'accident grave !"},
            ],
        },
        {
            "type": "hand-p",
            "parts": [
                {"t": "Une fois les portes verrouillées ", "blue": True, "bold": True, "italic": True},
                {"t": "(signalement par un bip sonore en cabine)", "blue": True, "bold": True, "italic": True},
                {"t": " :", "blue": True, "bold": True, "italic": True},
            ],
        },
        {
            "type": "chevron-p",
            "text": "Le conducteur peut effectuer son départ en surveillant le quai au moyen des caméras de rétro-vision, et en actionnant le gong.",
        },
        {
            "type": "hand-p",
            "parts": [
                {
                    "t": "Pendant la première phase d'accélération jusqu'à ce que l'arrière de la rame ait quitté le quai de la station :",
                    "blue": True,
                    "bold": True,
                    "italic": True,
                }
            ],
        },
        {
            "type": "chevron-p",
            "text": "Le conducteur doit s'assurer par l'image des caméras de rétro-vision qu'aucun voyageur n'est entraîné par la rame.",
        },
        {
            "type": "hand-p",
            "parts": [
                {
                    "t": "En cas d'appel inter-phonie voyageur pendant la phase de dégagement du quai, le conducteur doit :",
                    "blue": True,
                    "bold": True,
                    "italic": True,
                }
            ],
        },
        z(
            zc(
                "purple",
                bullets=[
                    blt(
                        "Vérifier l'image des caméras de rétro-vision qui peuvent signaler un danger venant de l'extérieur (piéton entraîné par la rame, piéton circulant en bordure du GLO pouvant être heurté par la rame).",
                        bold=True,
                    )
                ],
            ),
        ),
    ]


def blocks_p54(ps):
    return [
        ps(54),
        {
            "type": "hand-p",
            "parts": [
                {"t": "En cas de tirage de la poignée d'alarme (signalés par l'allumage du BPIL phonie et sur l'écran SIE) "},
                {"t": "pendant la phase de dégagement du quai", "bold": True},
            ],
        },
        {
            "type": "warning",
            "lines": [
                {
                    "text": "Dans ce cas, le FU (ou FMS) est déclenché, et les portes sont libérées au bout de 15 secondes.",
                    "italic": True,
                },
                {
                    "parts": [
                        {"t": "Attention au risque d'ouverture de portes côté entrevoie !", "bold": True, "red": True, "italic": True}
                    ]
                },
            ],
        },
        z(
            zc(
                "purple",
                bullets=[
                    {
                        "parts": [
                            {"t": "Eviter toute ouverture de porte du mauvais côté soit en ré-armant la poignée, soit en sélectionnant le bon côté de dévérouillage des portes "},
                            {"t": "(sur les rames 401, les portes sont libérées du côté pré-sélectionné)", "italic": True},
                        ]
                    }
                ],
            ),
            zc(
                "blue",
                bullets=[
                    blt("Engager le dialogue avec le voyageur qui a tiré la poignée, via l'interphonie"),
                    blt("Informer l'ensemble des voyageurs de la situation, une fois la cause de l'incident identifiée"),
                ],
            ),
            zc(
                "teal",
                bullets=[
                    {
                        "parts": [
                            {"t": "S'assurer de la sécurité des voyageurs avant tout redémarrage de la rame "},
                            {"t": "(suite au déclenchement du FU ou FMS qui a pu provoquer des chutes)", "italic": True},
                        ]
                    }
                ],
            ),
        ),
        {
            "type": "warning",
            "icon": True,
            "lines": [
                {
                    "parts": [
                        {"t": "La même consigne s'applique rame à l'arrêt en ligne, ", "bold": True, "red": True},
                        {"t": "hors zone de dégagement de quai", "bold": True, "red": True, "underline": True},
                    ]
                },
                {
                    "text": "la libération des portes interviendra 15 '' après le tirage de poignée, côté entrevoie si la poignée a été tirée du mauvais côté -en l'absence d'action conducteur-",
                    "bold": True,
                    "italic": True,
                },
            ],
        },
        {"type": "anchor", "id": "s-3-7-d"},
        {"type": "rct-sub", "text": "D - Mode dégradé « défaut porte »"},
        z(
            zc("purple", bullets=[blt("Une porte défaillante doit être condamnée, et l'adhésif d'information de la clientèle doit être apposé sur la porte en défaut.")]),
            zc("blue", bullets=[blt("Après condamnation d'une porte, le conducteur doit contrôler l'information sur la console SIE, ainsi que l'efficacité de la condamnation.")]),
            zc("teal", bullets=[blt("Chaque mode dégradé doit faire l'objet d'un signalement sur la feuille de route et au PCC.")]),
        ),
        {
            "type": "warning",
            "icon": True,
            "tone": "red",
            "lines": [
                {
                    "text": "En cas d'impossibilité de condamner la porte, le PCC pourra donner comme consigne d'isoler la fonction de « contrôle porte » en déplombant le commutateur sur l'armoire de loge.",
                    "bold": True,
                },
                {"text": "Au préalable, une évacuation de la rame est impérative.", "bold": True},
            ],
        },
    ]


def blocks_p55(ps):
    return [
        ps(55),
        {"type": "rct-section", "text": "3.8 - COMMUNICATION AVEC LA CLIENTELE"},
        {
            "type": "hand-p",
            "text": "Le conducteur est le garant de l'image de marque de TaM. En toute circonstance, son attitude et son comportement doivent être guidés par le souci du confort et de la sécurité des clients, en cas de situation perturbée ou hors incident d'exploitation, l'information des voyageurs est un impératif.",
        },
        {
            "type": "hand-p",
            "text": "Cette information facilite l'attente et évite les dérangements successifs et les conflits avec la clientèle.",
        },
        {
            "type": "hand-p",
            "text": "En cas de situation imprévue, le conducteur doit informer les clients en utilisant la sonorisation des salles.",
        },
        {
            "type": "hand-p",
            "text": "En cas d'arrêt prolongé, il expliquera l'évolution de la situation aux usagers afin de les rassurer.",
        },
        {
            "type": "hand-p",
            "text": "Ses propos seront rassurants et préviendront toute panique. Il est conseillé au conducteur de respecter les instructions suivantes pour utiliser la phonie et émettre des messages clairs aux clients :",
        },
        {
            "type": "arrow-ul",
            "tone": "plain",
            "items": [
                "Après avoir connecté la phonie intérieure, prendre une respiration, puis commencer à parler, en sachant que le premier mot ne sera sans doute pas compris.",
                "Parler calmement, en détachant bien les mots, sans traîner pour autant.",
                "Ne pas parler trop fort, la phonie est très sensible : parler comme on parle à son voisin de table.",
                "Ne pas coller la bouche au micro, au contraire. Parler à 5-6 cm du micro.",
            ],
        },
        p(parts=[{"t": "Exemples de messages à la clientèle :", "bold": True}], center=True, frame="dashed"),
        {
            "type": "client-message-panel",
            "tone": "soft",
            "columns": [
                {
                    "title": "Message : Arrêt prolongé en station ou hors station",
                    "blocks": [
                        p(text="« Votre attention SVP. Mesdames, Messieurs,"),
                        {
                            "type": "hand-p",
                            "parts": [
                                {"t": "Un incident nous retarde, "},
                                {"t": "ou", "italic": True},
                            ],
                        },
                        {"type": "hand-p", "text": "Un accident de la circulation nous retarde,"},
                        p(text="Nous devons patienter quelques instants."),
                        p(text="Je vous tiendrai informé de l'évolution de la situation."),
                        p(text="Merci de votre compréhension »."),
                    ],
                },
                {
                    "title": "Message : Descente des voyageurs",
                    "blocks": [
                        p(
                            text="« Votre attention SVP. Mesdames, Messieurs, Nous ne sommes pas en mesure de poursuivre notre voyage. Veuillez nous en excuser. Nous vous demandons de bien vouloir quitter la rame. Selon le cas :"
                        ),
                        {
                            "type": "hand-p",
                            "text": 'Un bus spécial assurera les trajets jusqu\'à "........" (Indiquer la direction)',
                        },
                        {
                            "type": "hand-p",
                            "text": "Veuillez vous reporter sur la rame suivante qui passera dans quelques minutes",
                        },
                        {
                            "type": "hand-p",
                            "text": "Veuillez rejoindre la rame actuellement devant nous ».",
                        },
                    ],
                },
            ],
        },
        {
            "type": "client-message-panel",
            "tone": "soft",
            "fullWidth": True,
            "columns": [
                {
                    "title": "Message : Terminus intermédiaires (Occitanie ou Léon Blum)",
                    "blocks": [
                        p(
                            text='« Votre attention SVP. Mesdames, Messieurs, ce tramway effectue son terminus à "......" (Nommer la station). Veuillez vous reporter sur la rame suivante qui passera dans quelques minutes pour aller en direction de ".....". Merci ».'
                        ),
                    ],
                },
            ],
        },
        {
            "type": "client-message-panel",
            "tone": "accent",
            "columns": [
                {
                    "title": "Message : Fumeurs",
                    "blocks": [
                        p(
                            text="« Votre attention SVP. Mesdames, Messieurs. Nous vous demandons de respecter la qualité de l'air à l'intérieur de la rame en éteignant vos cigarettes. Merci de votre compréhension »."
                        ),
                    ],
                },
                {
                    "title": "Message : Portes",
                    "blocks": [
                        p(
                            text="« Votre attention SVP. Mesdames, Messieurs. Merci de vous tenir en arrière des portes afin de faciliter leur fermeture »."
                        ),
                    ],
                },
            ],
        },
    ]


def blocks_p56(ps):
    return [
        ps(56),
        {"type": "rct-section", "text": "3.9 - COMMUNICATION AVEC LE PCC"},
        {"type": "anchor", "id": "s-3-9-a"},
        {"type": "rct-sub", "text": "A - Signalements par radio :"},
        {
            "type": "hand-p",
            "text": "Selon la nature du signalement que le conducteur veut communiquer au PCC, le conducteur peut utiliser trois niveaux d'appel :",
        },
        {
            "type": "arrow-ul",
            "tone": "plain",
            "items": [
                "Appel normal.",
                "Appel urgent.",
                {
                    "parts": [
                        {"t": "Appel de détresse ("},
                        {"t": "mise en toute écoute, allumage des feux de détresse", "italic": True},
                        {"t": ")."},
                    ],
                },
            ],
        },
        p(parts=[{"t": "Attention : appui long sur Citadis 402", "blue": True, "bold": True}]),
        {
            "type": "arrow-ul",
            "tone": "plain",
            "items": [
                "Accrocher/Décrocher le bouton « feux de détresse pour annuler cette fonction.",
            ],
        },
        {
            "type": "hand-p",
            "text": "Tous les cas suivants font l'objet d'un appel obligatoire au PCC :",
        },
        z(
            zc("purple", bullets=[blt("L'ensemble des cas recensés dans les consignes de circulation en ligne (partie 3) et dans les consignes d'urgence (partie 4).", bold=True)]),
            zc("blue", bullets=[blt("Toute présence suspecte d'individus sur la voie, (handicapés mentaux, enfants, personnes âgées...), et notamment toute présence de piétons dans le tunnel.", bold=True)]),
            zc("blue2", bullets=[blt("En cas de FU ou FS suite à un incident.", bold=True)]),
            zc("blue3", bullets=[blt("Tous les défauts, dégâts, vandalisme ou anomalies décelés sur le matériel roulant en particulier ceux mettant en cause la sécurité (gravage, taggage, bris de glace).", bold=True)]),
            zc("blue3", bullets=[blt("Tout dégât ou défaut décelés sur des équipements au sol mettant en cause la sécurité ou la continuité de l'exploitation.", bold=True)]),
            zc("teal", bullets=[blt("En cas de chantiers sur la voie mal protégés ou mal signalés, et tout chantier aux abords des voies pouvant présenter un risque pour la sécurité sur la ligne aérienne.", bold=True)]),
            zc("teal", bullets=[blt("En cas de panne des feux de traversée routière ou des feux des zones de manœuvres.", bold=True)]),
        ),
        {
            "type": "arrow-p",
            "tone": "blue",
            "parts": [
                {"t": "En fin de service : ", "blue": True, "bold": True},
                {
                    "t": "les signalements par radio au PCC doivent être rapportés par le conducteur sur sa feuille de route.",
                    "blue": True,
                    "bold": True,
                },
            ],
        },
    ]


def blocks_p57(ps):
    return [
        ps(57),
        {"type": "anchor", "id": "s-3-9-b"},
        {"type": "rct-sub", "text": "B - En cas de panne de phonie :"},
        {
            "type": "p",
            "parts": [
                {
                    "t": "En cas de panne générale, ou si l'utilisation du mode « secours phonie » indépendant du pupitre SAE est inopérante sur la rame",
                    "italic": True,
                }
            ],
        },
        {"type": "hand-p", "text": "le conducteur attend l'arrivée d'une autre rame et lui demande de prévenir le PCC."},
        {
            "type": "hand-p",
            "text": "le conducteur peut utiliser son propre téléphone pour appeler le PCC, rame à l'arrêt. Il se conforme ensuite aux instructions du Régulateur.",
        },
        {
            "type": "note-blue-italic",
            "text": "En fin de service : noter l'incident sur la feuille de route.",
        },
        {"type": "anchor", "id": "s-3-9-c"},
        {"type": "rct-sub", "text": "C - Rentrée et circulation dans le dépôt :"},
        {"type": "hand-p", "text": "Lors de la rentrée au dépôt, le conducteur :"},
        z(
            zn("1", "purple", bullets=[blt("Demande l'autorisation de rentrer au dépôt.")]),
            zn(
                "2",
                "blue",
                bullets=[
                    blt(
                        "Stationne sa rame sur le site désigné par le PCC : suivant l'heure de rentrée au dépôt le conducteur peut être amenée à laisser sa rame en voie E, en station, ou sur le remisage."
                    )
                ],
            ),
            zn("3", "blue2", bullets=[blt("Vérifie l'état intérieur et extérieur de la rame.")]),
            zn("4", "blue3", bullets=[blt("Signale tout dégât ou dysfonctionnement sur la feuille de route.")]),
            zn("5", "teal", bullets=[blt("Note le kilométrage effectué ainsi que le nombre d'heures.")]),
            zn("6", "teal", bullets=[blt("La feuille de route est remise dans la boite au lettre prévue à cet effet.")]),
            zn("7", "purple", bullets=[blt("La planchette est rangée en salle de prise de service.")]),
        ),
    ]


def blocks_p58(ps):
    return [
        ps(58),
        {"type": "hand-p", "text": "Pour circuler dans le dépôt :"},
        ft(
            {"color": "blue", "parts": [{"t": "La circulation dans le dépôt se fait toujours sans client.", "bold": True}]},
            {"color": "blue", "parts": [{"t": "La circulation dans le dépôt est placée sous le contrôle du PCC.", "bold": True}]},
            {"color": "purple", "parts": [{"t": "Le conducteur est tenu de respecter la signalisation de manœuvre.", "bold": True}]},
            {"color": "purple", "parts": [{"t": "Les déplacements s'effectuent sous la responsabilité du conducteur.", "bold": True}]},
            {
                "color": "purple",
                "parts": [{"t": "La vitesse sur la zone du dépôt est limitée à 10 Km/h, et 3 Km/h sur la zone ateliers.", "bold": True}],
            },
            {"color": "purple", "parts": [{"t": "La circulation sur la zone atelier n'est pas autorisée aux conducteurs.", "bold": True}]},
        ),
        {"type": "anchor", "id": "s-3-9-d"},
        {"type": "rct-sub", "text": "D - Signalements par feuille de route"},
        {"type": "arrow-p", "arrow": "large", "parts": [{"t": "On distingue :"}]},
        {
            "type": "ul",
            "items": [
                "la feuille de route attaché au conducteur, sur laquelle il note les incidents ayant affecté son service",
                "la feuille de route (de couleur) attachée à la rame sur laquelle sont notés les signalements concernant strictement le fonctionnement du matériel roulant (y compris les équipements embarqués comme les valideurs).",
            ],
        },
        {"type": "hand-p", "text": "Le conducteur doit :"},
        ft(
            {"color": "blue", "parts": [{"t": "Apporter le plus grand soin dans la rédaction de la feuille de route.", "bold": True}]},
            {"color": "blue", "parts": [{"t": "Remplir correctement les différentes rubriques (accidents, incidents.etc.).", "bold": True}]},
            {
                "color": "purple",
                "parts": [
                    {"t": "Noter les anomalies liées au matériel roulant ", "bold": True},
                    {"t": "sur la feuille de route.", "bold": True, "purple": True},
                ],
            },
            {
                "color": "purple",
                "parts": [
                    {"t": "Noter les ", "bold": True},
                    {"t": "appels importants", "bold": True, "underline": True},
                    {"t": " du PCC.", "bold": True},
                ],
            },
        ),
        {"type": "anchor", "id": "s-3-9-e"},
        {"type": "rct-sub", "text": "E - Signalements par rapport interne"},
        {
            "type": "arrow-p",
            "arrow": "large",
            "parts": [
                {
                    "t": "La rédaction d'un rapport interne engage la parole de celui qui le rédige vis-à-vis du Règlement de Circulation mais aussi par rapport à son interprétation administrative. C'est pourquoi le plus grand soin doit être porté à sa rédaction, notamment en cas :"
                }
            ],
        },
        {
            "type": "arrow-ul",
            "tone": "plain",
            "items": [
                "d'incidents divers susceptibles d'entraîner des plaintes ou des réclamations",
                "d'accident corporel ou matériel, et de dégâts divers occasionnés sur le matériel roulant",
            ],
        },
        {
            "type": "note-blue-italic",
            "text": "Le rapport interne pourra être établi dans le cadre d'un entretien de restitution, avec un agent de maîtrise de l'Exploitation.",
        },
    ]
