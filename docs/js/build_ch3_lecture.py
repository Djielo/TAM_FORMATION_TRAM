#!/usr/bin/env python3
"""Génère docs/js/data-rct-lecture-ch3.js — chapitre 3 (p. 38–58)."""

import json
from pathlib import Path

OUT = Path(__file__).parent / "data-rct-lecture-ch3.js"


def ps(n):
    return {"type": "page-scan", "src": f"{n:03d}.jpg", "caption": f"Page {n}/76"}


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


def blocks_p38():
    return [
        ps(38),
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
                        "C - Comportement du conducteur dans la rame",
                    ],
                },
                {
                    "title": "3.2 - CIRCULATION EN LIGNE",
                    "page": 42,
                    "subs": [
                        "A - Ouverture de la voie sur voie double ou voie unique",
                        "B - Circulation sur voie double",
                        "C - Circulation sur voie unique",
                        "D - Circulation en voie unique temporaire (VUT)",
                        "E1, E2, E3 - Manœuvres de retournement et de rebroussement",
                    ],
                },
                {"title": "3.3 - CIRCULATION HAUT LE PIED (= SANS VOYAGEURS)", "page": 49},
                {"title": "3.4 - UTILISATION DES FEUX ET DES FEUX DE DETRESSE", "page": 49},
                {"title": "3.5 - UTILISATION DU GONG", "page": 50},
                {"title": "3.6 - DISTANCES DE SECURITE", "page": 50},
                {
                    "title": "3.7 - ARRET EN STATION ET COMMANDE DES PORTES",
                    "page": 51,
                    "subs": [
                        "A - Commande d'ouverture de porte",
                        "B - Commande de fermeture des portes",
                        "C - Départ de la station",
                        "D - Mode dégradé « défaut porte »",
                    ],
                },
                {"title": "3.8 - COMMUNICATION AVEC LA CLIENTELE", "page": 55},
                {
                    "title": "3.9 - COMMUNICATION AVEC LE PCC",
                    "page": 56,
                    "subs": [
                        "A - Signalements par radio",
                        "B - En cas de panne de phonie",
                        "C - Rentrée et circulation dans le dépôt",
                        "D - Signalements par écrit",
                    ],
                },
            ],
        },
    ]


def blocks_p39():
    return [
        ps(39),
        {"type": "rct-section", "text": "3.1 - PRISE DE SERVICE"},
        {"type": "anchor", "id": "s-3-1-a"},
        {"type": "rct-sub", "text": "A - Prise de service au dépôt :"},
        z(
            zc("purple", bullets=[blt("Le conducteur est tenu de se présenter à la prise de service à l'heure prévue.", bold=True)]),
            zc("purple", bullets=[blt("Une apparence correcte est exigée, et la tenue vestimentaire de TaM est obligatoire.", bold=True)]),
            zc(
                "blue",
                bullets=[
                    blt(
                        "Le conducteur qui se présente doit être en règle vis-à-vis des obligations du code de la route, notamment pour ce qui concerne son taux d'alcoolémie (inférieur à 0,20g/l pour la conduite d'un véhicule de transport en commun) et le non usage préalable de substances ou plantes classées comme stupéfiants.",
                        bold=True,
                    ),
                    {
                        "parts": [
                            {"t": "Tout conducteur peut faire l'objet d'un contrôle d'alcoolémie ou de prise de stupéfiants à la prise de service, conformément aux dispositions du ", "bold": True},
                            {"t": "Règlement Intérieur", "bold": True, "purple": True},
                            {"t": ".", "bold": True},
                        ]
                    },
                ],
                extra={"parts": [{"t": "Certains médicaments peuvent entrainer des effets secondaires, baisse de la vigilance etc : en parler avec le médecin traitant.", "blue": True}]},
            ),
            zc(
                "blue2",
                bullets=[
                    blt(
                        "Le conducteur doit avoir son habilitation en règle pour le matériel et la ligne correspondant au service qu'il va effectuer, y compris en cas d'échange de service avec un autre conducteur.",
                        bold=True,
                    ),
                ],
                extra={
                    "parts": [
                        {"t": "Rappel : toute habilitation est suspendue de fait si le titulaire est resté "},
                        {"t": "plus de 70 jours", "bold": True},
                        {"t": " sans conduire en service commercial, sur au moins une des lignes autorisées. Une remise en main doit alors être programmée.", "blue": True},
                    ]
                },
            ),
            zc(
                "blue3",
                bullets=[
                    blt(
                        "Le conducteur enregistre sa prise de service en badgeant à son arrivée au dépôt et au plus tard à l'heure précise de son début de service. Il confirmera ensuite sa prise de service matériel en badgeant à la montée dans la rame.",
                        bold=True,
                    ),
                ],
            ),
            zc(
                "teal",
                bullets=[
                    blt(
                        "Il doit prendre possession de la planchette correspondant à son service, ainsi que de la feuille de route, et rejoindre ensuite son véhicule sur le remisage.",
                        bold=True,
                    ),
                ],
            ),
        ),
        {
            "type": "boxed",
            "tone": "plain",
            "blocks": [
                p(parts=[{"t": "Cas particulier de la Relève en ligne :", "bold": True, "underline": True}]),
                {
                    "type": "arrow-ul",
                    "items": [
                        "Le conducteur relevant est à son lieu de relève au moins deux minutes avant l'heure prévue (trajet à pied jusqu'à la station St Paul, ou en rame jusqu'à Mosson pour la ligne 3) ou en voiture jusqu'à Sabines ou G.Lorca (Ligne 2 & 4).",
                        "Dans le cas où le conducteur relevant ne serait pas présent, le conducteur en service prévient le PCC, poursuit son service et attend les consignes du régulateur.",
                        {
                            "parts": [
                                {"t": "En l'absence de la rame à relever, "},
                                {"t": "le CR relevant appelle le PCC", "bold": True},
                                {"t": " (dans un délai maxi de 5 mn par rapport à l'heure de sa relève théorique) et se conforme à ses instructions."},
                            ]
                        },
                        "Respecter les consignes planchettes pour les déplacements, les pauses et ne pas utiliser son véhicule personnel.",
                    ],
                },
            ],
        },
    ]


def blocks_p40():
    return [
        ps(40),
        {"type": "anchor", "id": "s-3-1-b"},
        {"type": "rct-sub", "text": "B - Préparation de la rame :"},
        {
            "type": "warning",
            "icon": True,
            "text": "Toute prise de rame au dépôt doit commencer par une préparation de la rame sur le remisage, conformément à la procédure décrite dans la partie 1.",
        },
        p(parts=[{"t": "Sortie du dépôt et mise en ligne", "bold": True, "underline": True}]),
        p("Lorsque le conducteur est prêt et que la rame est préparée, il demande l'autorisation au PCC qui lui construit un itinéraire de sortie en fonction des conditions d'exploitation."),
        {
            "type": "arrow-p",
            "parts": [
                {"t": "Toute impossibilité de sortie pour raison technique nécessite d'en informer le PCC.", "blue": True, "bold": True},
                {"t": " Seul le PCC peut autoriser un changement de matériel.", "blue": True, "bold": True},
            ],
        },
        p(parts=[{"t": "Avant la sortie du dépôt", "bold": True, "underline": True}]),
        {
            "type": "arrow-p",
            "parts": [{"t": "Le conducteur doit effectuer le test de la télécommande d'aiguille :"}],
        },
        {
            "type": "ul",
            "items": [
                "✓ Marquer l'arrêt au niveau du panneau de télécommande d'aiguille (voie E) au CEMH, ou en circulant sur l'interface pour la sortie de JP.",
                "✓ Tester, en appuyant sur les boutons de télécommande d'aiguille (gauche, direct et droite), le bon positionnement de l'INDIR.",
            ],
        },
        {
            "type": "arrow-p",
            "parts": [{"t": "Le conducteur doit également effectuer le test des balises PETRARQUE :"}],
        },
        {
            "type": "ul",
            "items": [
                {"parts": [{"t": "✓ Si la balise "}, {"t": "arrière", "bold": True, "underline": True}, {"t": " fonctionne correctement, le feu situé avant la barrière s'allume."}]},
                {"parts": [{"t": "✓ Si la balise "}, {"t": "avant", "bold": True, "underline": True}, {"t": " fonctionne correctement, la barrière s'ouvre."}]},
                "✓ En cas de dysfonctionnement, appeler le PCC.",
            ],
        },
        p(parts=[{"t": "Après la sortie du dépôt", "bold": True, "underline": True}]),
        {
            "type": "arrow-p",
            "parts": [{"t": "Le conducteur doit effectuer le test de la veille (clé KC sur CN) :"}],
        },
        {
            "type": "ul",
            "items": [
                "✓ Maintien et relâchement jusqu'au signal sonore.",
                "✓ Le même test est à répéter au premier changement de cabine.",
            ],
        },
    ]


# Pages 41–58 : suite dans prochaine itération (structure prête)

def blocks_p41():
    return [
        ps(41),
        {"type": "anchor", "id": "s-3-1-c"},
        {"type": "rct-sub", "text": "C - Comportement du conducteur dans la rame :"},
        {"type": "arrow-p", "parts": [{"t": "Le conducteur est tenu de respecter les consignes et les procédures d'exploitation, en relation avec le PCC."}]},
        z(
            zc("purple", bullets=[
                blt("La présence dans la cabine n'est autorisée qu'aux cadres, agents de maîtrise et agents de maintenance de TaM en mission, aux formateurs, ainsi qu'aux personnes munies d'une autorisation écrite."),
                blt("Elle fait toujours l'objet d'un signalement au PCC."),
            ]),
            zc("blue", bullets=[blt("La porte de la cabine doit être tenue fermée, les effets personnels doivent être rangés dans le placard.")]),
            zc("blue2", bullets=[
                blt("Toute action de conduite de la rame, avec ou sans voyageur, doit s'effectuer en position assise."),
                {"parts": [
                    {"t": "Le conducteur doit toujours être en position de vigilance apte à effectuer toute commande d'urgence y compris le FS, ce qui suppose d'avoir le buste droit et les pieds au sol. "},
                    {"t": "Cette position protège aussi le conducteur en cas d'accident.", "blue": True, "italic": True},
                ]},
            ]),
            zc("blue2", bullets=[blt("Il est interdit de fumer, de s'alimenter, d'utiliser un téléphone portable, ou tout autre appareil avec oreillettes. Les appels phonie, hors arrêt, sont gérés en mode mains libres.")]),
            zc("blue3", bullets=[{
                "parts": [
                    {"t": "Lors de l'arrêt d'une rame "},
                    {"t": "en ligne", "bold": True, "underline": True},
                    {"t": ", le conducteur doit rester à son poste de conduite afin de pouvoir être joint à tout moment par le PCC. "},
                    {"t": "Il doit actionner ses feux de détresse.", "blue": True, "italic": True},
                ],
            }]),
            zc("blue3", bullets=[{
                "parts": [
                    {"t": "Hors action courante", "bold": True, "underline": True},
                    {"t": ", le conducteur ne peut quitter son tramway "},
                    {"t": "en ligne", "bold": True, "underline": True},
                    {"t": " qu'en cas de force majeure, après évacuation de la rame : "},
                    {"t": "Il doit en avoir informé le PCC et s'être assuré que toutes les mesures ont été prises pour éviter un accident. Action au BS : voir p.35", "blue": True, "italic": True},
                ],
            }]),
            zc("teal", bullets=[
                blt("Quitter la cabine implique de :"),
                blt("✓ mettre le manipulateur au neutre,"),
                blt("✓ emporter la clé KC,"),
                blt("✓ fermer la porte de cabine."),
            ], extra={"parts": [{"t": "Action au BS : voir p.35", "italic": True}]}),
            zc("teal", bullets=[{
                "parts": [
                    {"t": "Toute anomalie du service doit faire l'objet d'une communication auprès de la clientèle en utilisant l'équipement de sonorisation intérieure de la rame ("},
                    {"t": "voir chapitre 3.9", "italic": True},
                    {"t": ")."},
                ],
            }]),
            zc("teal", bullets=[blt("Rame arrêtée, le conducteur est autorisé à ouvrir la porte de la cabine dans le but de s'adresser directement à la clientèle.")]),
        ),
    ]


def blocks_p42():
    return [
        ps(42),
        {"type": "rct-section", "text": "3.2 - CIRCULATION EN LIGNE"},
        z(
            zc("purple", bullets=[blt("La conduite se fait toujours à partir de la cabine se trouvant dans le sens de la marche (marche arrière interdite).")]),
            zc("blue", rowColor="orange", bullets=[blt("Le conducteur de tramway circule en marche à vue, c'est à dire qu'il adapte sa vitesse à l'environnement dans lequel il progresse.")]),
            zc("blue2", bullets=[blt("Lorsqu'il circule en ligne, le conducteur doit appliquer les mêmes règles de prévoyance et de défiance que celles en vigueur pour la conduite de tout véhicule de transport.")]),
            zc("blue3", bullets=[blt("Il doit être en mesure d'arrêter sa rame en toute circonstance.")]),
            zc("teal", bullets=[
                blt("Le conducteur respecte la signalisation lumineuse ferroviaire et routière, et les limitations de vitesse indiquées en ligne (ou correspondant aux différentes situations de l'environnement de la voie ou de l'état de la rame)."),
            ], extra={"parts": [{"t": "Il évite d'être en mode traction au passage des IS (Isolateurs de Section)", "blue": True}]}),
        ),
        {"type": "warning", "icon": True, "text": "Des relevés réguliers ou aléatoires des centrales tachymétriques sont effectués afin de contrôler le respect des limitations de vitesse."},
        z(
            zc("purple", bullets=[blt("En cas de visibilité réduite (brouillard, dégagement de fumée...), le conducteur doit adapter sa vitesse aux nouvelles conditions de visibilité.")]),
            zc("blue", bullets=[{
                "parts": [
                    {"t": "Pour une triple raison : sécurité (guidage), confort de la clientèle et préservation de l'infrastructure, "},
                    {"t": "en sortie de courbe", "underline": True},
                    {"t": " le conducteur doit attendre que l'intégralité de la rame soit en alignement droit pour effectuer la reprise de vitesse."},
                ],
            }]),
            zc("teal", bullets=[blt("En cas de baisse anormale du niveau de vigilance ou de pertes de vigilance répétées, le conducteur doit alerter immédiatement le PCC sur son état de santé.")]),
        ),
        {"type": "warning", "icon": True, "parts": [{"t": "La prise de médicaments peut entraîner une baisse de vigilance et doit être autorisée au préalable par le médecin traitant de l'agent.", "red": True, "bold": True}]},
    ]


def blocks_p43():
    return [
        ps(43),
        p(parts=[{"t": "Prise en compte du Gabarit Limite d'Obstacle (GLO)", "bold": True}]),
        {"type": "arrow-p", "parts": [{"t": "Une bande au sol dénommée « GLO » délimite la zone de circulation propre au tramway, tenant compte du gabarit des rames roulant sur le réseau.", "blue": True, "italic": True}]},
        z(
            zc("purple", bullets=[blt("En cas de présence de piétons ou de vélos à proximité du GLO, le conducteur doit adapter sa vitesse, faire usage du gong et se préparer à toute manœuvre d'urgence.")]),
            zc("blue", bullets=[blt("En cas d'obstacles situés à proximité du GLO, le conducteur doit ralentir et s'assurer avant de la dépasser qu'il peut le faire en toute sécurité.")]),
            zc("teal", bullets=[blt("En cas d'obstacles empiétant sur la limite GLO, le conducteur doit arrêter sa rame et immédiatement appeler le PCC.")]),
        ),
        {"type": "anchor", "id": "s-3-2-a"},
        {"type": "rct-sub", "text": "A - Ouverture de la voie sur voie double ou voie unique :"},
        {"type": "arrow-p", "parts": [{"t": "Les consignes spécifiques à l'ouverture de voie sont les suivantes :"}]},
        p(parts=[{"t": "La vitesse est limitée à 40 km/h maximum.", "italic": True}]),
        {"type": "arrow-p", "parts": [{"t": "Le conducteur contrôle la position des appareils de voie. Il arrête sa rame avant l'appareil de voie si la position des aiguilles n'est pas visible (neige, .../...)", "italic": True}]},
        {"type": "arrow-p", "parts": [{"t": "Le conducteur signale :"}]},
        z(
            zc("purple", bullets=[blt("La présence d'objets éventuels sur la voie.")]),
            zc("blue", bullets=[blt("L'état de la signalisation.")]),
            zc("blue2", bullets=[blt("L'état de la ligne aérienne.")]),
            zc("blue3", bullets=[blt("Les dysfonctionnements de DAT.")]),
            zc("blue3", bullets=[blt("Les dégâts éventuels commis sur le mobilier d'équipement des stations.")]),
            zc("teal", bullets=[blt("L'absence de l'éclairage en station.")]),
            zc("teal", bullets=[blt("Le conducteur informe le PCC à chaque terminus de l'état de la voie et notamment la présence de zones de voie glissantes.")]),
        ),
    ]


def blocks_p44():
    return [
        ps(44),
        {"type": "anchor", "id": "s-3-2-b"},
        {"type": "rct-sub", "text": "B - Circulation sur voie double :"},
        p(parts=[
            {"t": "La conduite se fait en mode nominal "},
            {"t": "sur la voie de droite", "bold": True},
            {"t": ", par exemple sur V1 dans le sens Mosson vers Odysseum pour la Ligne 1 et Saint Jean de Vedas vers Jacou pour la Ligne 2."},
        ]),
        {"type": "arrow-p", "parts": [{"t": "Le conducteur doit respecter :"}]},
        z(
            zn("1", "purple", bullets=[blt("La signalisation de présence tension.")]),
            zn("2", "blue", bullets=[blt("La signalisation lumineuse de carrefour.")]),
            zn("3", "blue2", bullets=[blt("La signalisation de manœuvre.")]),
            zn("4", "teal", bullets=[blt("La signalisation verticale et la signalisation au sol.")]),
        ),
        {"type": "anchor", "id": "s-3-2-c"},
        {"type": "rct-sub", "text": "C - Circulation sur voie unique :"},
        z(
            zn("1", "purple", bullets=[{
                "parts": [
                    {"t": "Le conducteur "},
                    {"t": "doit impérativement respecter la signalisation de manœuvre sur chaque évitement", "bold": True, "purple": True},
                    {"t": ", cette signalisation protégeant le début d'un canton."},
                ],
            }]),
            zn("2", "blue", bullets=[blt("Pour tenir compte de certaines positions de boucles sur les VU et pour la continuité de l'échange voyageurs, il est nécessaire de ne démarrer de la station qu'après le passage au vert du feu de manœuvre.")]),
            zn("3", "blue2", bullets=[{
                "parts": [
                    {"t": "En cas de franchissement, le conducteur doit immédiatement réagir à la sirène et à l'allumage des lampes flash en effectuant un "},
                    {"t": "freinage d'urgence (FU)", "bold": True, "blue": True},
                    {"t": "."},
                ],
            }]),
            zn("4", "teal", bullets=[{
                "parts": [
                    {"t": "En cas d'allumage des lampes flash en cours de trajet, qui signifie le franchissement d'un signal au rouge par une rame en sens inverse de circulation, le conducteur "},
                    {"t": "doit immédiatement effectuer un freinage d'urgence (FU)", "bold": True, "blue": True},
                    {"t": ", s'arrêter en ligne puis appeler le PCC pour se conformer à ses instructions."},
                ],
            }]),
        ),
        {"type": "warning", "icon": True, "lines": [
            {"text": "TRES IMPORTANT SUR LES SECTIONS A VOIE UNIQUE !", "red": True, "bold": True},
            {"text": "Le contrôle de l'INDIR en entrée d'évitement -comme pour toute aiguille prise par la pointe-", "red": True},
            {"text": "Le respect de la vitesse maxi 15 Km/h en sortie d'évitement -aiguille en voie déviée-", "red": True},
        ]},
    ]


def blocks_p45():
    return [
        ps(45),
        {"type": "anchor", "id": "s-3-2-d"},
        {"type": "rct-sub", "text": "D - Circulation en voie unique temporaire (VUT) :"},
        {"type": "arrow-p", "parts": [{"t": "La voie unique temporaire correspond à la circulation d'une ou de plusieurs rames sur une seule voie, dans les deux sens, sans recours à la signalisation de cantonnement."}]},
        {"type": "arrow-ul", "items": ["La V.U.T. n'est autorisée que sur ordre du PCC ou par consignes spécifiques, à une vitesse de 30 km/h."]},
        p(parts=[{"t": "Manœuvre effectuée par radio et bâton pilote numéroté", "bold": True, "underline": True}]),
        ft(
            {"color": "teal", "parts": [{"t": "Le régulateur donne l'ordre aux rames de stopper aux extrémités de la VUT et il s'assure de la bonne réception de son message par les conducteurs.", "bold": True}]},
            {"color": "blue", "parts": [{"t": "Il donne l'ordre à la première rame de s'engage sur la VUT libre en désignant le numéro du bâton pilote (chaque conducteur étant en possession d'un bâton pilote numéroté).", "bold": True}]},
            {"color": "purple", "parts": [{"t": "Lorsque la rame est sortie de la VUT, elle appelle le PCC qui lui donne les instructions pour la transmission du bâton pilote à une rame en attente dans le sens inverse.", "bold": True}]},
            {"color": "purple", "parts": [{"t": "La rame en sens inverse avant de s'engager sur la VUT demande l'autorisation au P.C.C en annonçant le numéro du bâton pilote.", "bold": True}]},
        ),
        p(parts=[{"t": "Manœuvre effectuée avec la présence d'un ou plusieurs agents de maîtrise", "bold": True, "underline": True}]),
        {"type": "arrow-ul", "items": ["La procédure est identique à celle ci-dessus mais les fonctions dévolues au régulateur du PCC sont déléguées aux agents de maîtrise sur place, ou à toute personne dument habilitée, qui gèrent l'autorisation d'engagement des rames sur le tronçon en VUT."]},
    ]


SECTIONS = [
    {"id": "p38", "level": 1, "code": "3", "page": 38, "title": "Sommaire — chapitre 3", "blocks": blocks_p38()},
    {"id": "s-3-1", "level": 2, "code": "3.1", "page": 39, "title": "PRISE DE SERVICE", "blocks": blocks_p39() + blocks_p40() + blocks_p41()},
    {"id": "s-3-2", "level": 2, "code": "3.2", "page": 42, "title": "CIRCULATION EN LIGNE", "blocks": blocks_p42() + blocks_p43() + blocks_p44() + blocks_p45()},
]

TOC = [
    {"id": "p38", "level": 1, "code": "3", "page": 38, "title": "Sommaire — chapitre 3"},
    {"id": "s-3-1", "level": 2, "code": "3.1", "page": 39, "title": "PRISE DE SERVICE"},
    {"id": "s-3-1-a", "level": 3, "code": "A", "page": 39, "title": "Prise de service au dépôt", "anchorOnly": True, "parentId": "s-3-1"},
    {"id": "s-3-1-b", "level": 3, "code": "B", "page": 40, "title": "Préparation de la rame", "anchorOnly": True, "parentId": "s-3-1"},
    {"id": "s-3-1-c", "level": 3, "code": "C", "page": 41, "title": "Comportement du conducteur dans la rame", "anchorOnly": True, "parentId": "s-3-1"},
    {"id": "s-3-2", "level": 2, "code": "3.2", "page": 42, "title": "CIRCULATION EN LIGNE"},
    {"id": "s-3-2-a", "level": 3, "code": "A", "page": 43, "title": "Ouverture de la voie", "anchorOnly": True, "parentId": "s-3-2"},
    {"id": "s-3-2-b", "level": 3, "code": "B", "page": 44, "title": "Circulation sur voie double", "anchorOnly": True, "parentId": "s-3-2"},
    {"id": "s-3-2-c", "level": 3, "code": "C", "page": 44, "title": "Circulation sur voie unique", "anchorOnly": True, "parentId": "s-3-2"},
    {"id": "s-3-2-d", "level": 3, "code": "D", "page": 45, "title": "Circulation en VUT", "anchorOnly": True, "parentId": "s-3-2"},
]

OUT.write_text(
    "/**\n * RCT EXP-CSG-01-17 — chapitre 3 (pages 38–58).\n"
    " * Texte retranscrit depuis source/images/RCT/00X.jpg\n */\n\n"
    f"export const RCT_LECTURE_CH3_SECTIONS = {json.dumps(SECTIONS, ensure_ascii=False, indent=2)};\n\n"
    f"export const RCT_LECTURE_CH3_TOC = {json.dumps(TOC, ensure_ascii=False, indent=2)};\n",
    encoding="utf-8",
)
print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")
