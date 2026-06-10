#!/usr/bin/env python3
"""Génère docs/js/data-rct-lecture-ch4.js — chapitre 4 (p. 59–76) + annexe 5.1."""

import json
from pathlib import Path

OUT = Path(__file__).parent / "data-rct-lecture-ch4.js"

CHEVRON_COLORS = (
    "purple",
    "purple",
    "blue",
    "blue",
    "blue2",
    "blue2",
    "blue3",
    "blue3",
    "teal",
    "teal",
    "green",
    "green",
)


def colis_callout():
    return {
        "type": "callout-box",
        "tone": "yellow",
        "icon": True,
        "blocks": [
            p(parts=[{"t": "Un colis suspect ne doit ni être touché ni être déplacé !", "bold": True, "red": True}]),
            p(
                parts=[
                    {"t": "Précision :", "bold": True, "italic": True},
                    {
                        "t": " tout objet abandonné ne doit pas être considéré de fait comme un colis suspect. La nature de l'objet (documents, trousseau de clés, paquet, sac ouvert ou hermétiquement fermé...), son volume, doivent conduire les agents sur place à apprécier par eux-mêmes le risque potentiel lié à chaque objet, en faisant preuve de bon sens et de discernement.",
                        "italic": True,
                    },
                ]
            ),
        ],
    }


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


def blt(text, **kw):
    return {"parts": [{"t": text, **kw}]}


def step_list(*steps):
    items = []
    for i, step in enumerate(steps):
        color = CHEVRON_COLORS[min(i, len(CHEVRON_COLORS) - 1)]
        if isinstance(step, dict):
            items.append(zn(str(i + 1), color, **step))
        else:
            items.append(zn(str(i + 1), color, bullets=[blt(step)]))
    return z(*items)


def warn_red(*lines, icon=True, **kw):
    return {
        "type": "warning",
        "icon": icon,
        **kw,
        "lines": [{"text": line, "red": True} if isinstance(line, str) else line for line in lines],
    }


def sat_row(label, detail, code):
    parts = [{"t": label, "bold": True}]
    if detail:
        parts.append({"t": detail, "italic": True})
    return {"parts": parts, "code": code}


def blocks_p59():
    return [
        ps(59),
        {
            "type": "sommaire-ch2",
            "chapter": "4. CONSIGNES D'URGENCE",
            "entries": [
                {"title": "4.1 - CONSIGNES GENERALES EN CAS D'URGENCE", "page": 60},
                {
                    "title": "4.2 - ACCIDENTS & AGRESSIONS",
                    "page": 61,
                    "subs": [
                        "A - Accident matériel",
                        "B - Accident corporel",
                        "C - Chute ou accident : cas d'une personne engagée sous la rame",
                        "D - Agression ou malaise du conducteur",
                    ],
                },
                {"title": "4.3 - DERAILLEMENT D'UNE RAME", "page": 64},
                {
                    "title": "4.4 - INCIDENTS A BORD DES RAMES",
                    "page": 65,
                    "subs": [
                        "A - Agression, malaise, chute ou décès d'un voyageur",
                        "B - Bris de vitre",
                        "C - Incident de pare- brise",
                        "D - Incendie à bord",
                        "E - Alerte à la bombe ou colis suspect à bord",
                    ],
                },
                {
                    "title": "4.5 - INCIDENTS AUX ABORDS DE LA VOIE",
                    "page": 69,
                    "subs": [
                        "A - Alerte à la bombe ou aux paquets suspects aux abords de la voie",
                        "B - Chute de la ligne aérienne et risques électriques",
                        "C - Inondation de la voie",
                        "D - Accident sur la plate-forme, Chute d'une personne sur la voie",
                    ],
                },
                {
                    "title": "4.6 - ANOMALIES CONSTATEES EN LIGNE",
                    "page": 73,
                    "subs": [
                        "A - Incident imposant l'arrêt de la rame",
                        "B - Incident n'imposant pas l'arrêt de la rame",
                    ],
                },
                {
                    "title": "4.7 - IMMOBILISATION ET EVACUATION D'UNE RAME",
                    "page": 74,
                    "subs": [
                        "A - Immobilisation en pleine voie",
                        "B - Evacuation d'une rame en pleine voie",
                        "C - Immobilisation d'une rame dans le tunnel",
                        "D - Evacuation d'une rame dans le tunnel",
                    ],
                },
            ],
        },
    ]


def blocks_p60():
    return [
        ps(60),
        {"type": "rct-section", "text": "4.1 - CONSIGNES GENERALES EN CAS D'URGENCE"},
        p(parts=[{"t": "Incident ou accident imposant l'arrêt de la rame :", "bold": True, "underline": True}]),
        step_list(
            "Arrêt de la rame.",
            "Enclenchement des feux de détresse.",
            "Appel du PCC par un message flash donnant la position du tramway, sa direction, la nature de l'incident.",
            "Information des clients à bord de la rame.",
        ),
        {
            "type": "warning",
            "icon": True,
            "lines": [
                {"text": "Ces 4 consignes s'appliquent à toutes situations d'urgence imposant l'arrêt de la rame !", "red": True},
                {
                    "parts": [
                        {"t": "En cas d'arrêt prolongé, et en accord avec le PCC, faire évacuer la rame", "red": True, "underline": True}
                    ]
                },
            ],
        },
        p(parts=[{"t": "Situation imposant un départ urgent de la rame :", "bold": True, "underline": True}]),
        {
            "type": "hand-p",
            "text": "Dans le cas où la situation d'urgence impose de dégager la rame le plus vite possible de la zone de danger :",
        },
        {
            "type": "arrow-ul",
            "tone": "plain",
            "items": [
                "Cas d'un début d'incendie à proximité de la rame.",
                "Cas de jets de projectiles sur la rame.",
                "Tout autre cas justifiant un départ immédiat de la rame.",
            ],
        },
        p("Le conducteur est autorisé à quitter en urgence la zone dangereuse, quitte à anticiper son départ du terminus, et à prévenir le PCC une fois le danger écarté."),
        p("Cette évacuation doit cependant s'effectuer dans le respect des règles de circulation (respect de la SIG routière et ferroviaire)."),
        p(parts=[{"t": "En cas d'incident grave :", "bold": True, "underline": True}]),
        {
            "type": "hand-p",
            "parts": [
                {"t": "En attendant l'arrivée d'un responsable hiérarchique, c'est le conducteur qui assure la fonction de "},
                {"t": "coordinateur", "bold": True, "blue": True},
                {"t": " sur les lieux de l'incident. Le "},
                {"t": "coordinateur", "bold": True, "blue": True},
                {"t": " doit notamment recueillir les témoignages et rendre compte de l'évolution de la situation au PCC."},
            ],
        },
        p(
            parts=[
                {"t": "Une fois arrivé sur les lieux, le responsable hiérarchique le plus élevé prend le commandement à titre de "},
                {"t": "coordinateur", "bold": True, "blue": True},
                {"t": " et devient l'interlocuteur des Pompiers et de la Police. Dès que la gestion de l'incident le permet, un agent de maîtrise présent sur les lieux mène un "},
                {"t": "entretien de restitution et d'analyse", "bold": True, "blue": True, "italic": True},
                {"t": " avec le conducteur."},
            ]
        ),
    ]


def blocks_p61():
    return [
        ps(61),
        {"type": "rct-section", "text": "4.2 - ACCIDENTS & AGRESSIONS"},
        {"type": "anchor", "id": "s-4-2-a"},
        {"type": "rct-sub", "text": "A - Accident matériel"},
        step_list(
            "Arrêter la rame, mettre les feux de détresse.",
            "Faire un appel d'urgence et informer les clients.",
            "Prendre toutes les dispositions afin d'éviter un autre accident.",
            "Relever l'identité des témoins.",
            {
                "bullets": [
                    {
                        "parts": [
                            {
                                "t": "Remplir la fiche de PRE CONSTAT ACCIDENT et noter les coordonnées du tiers sur sa feuille de route. ",
                            },
                            {
                                "t": "Il est impératif que la rédaction des documents se fasse dans la rame avec les tiers afin que le conducteur soit joignable à tout moment par le PCC.",
                            },
                        ]
                    }
                ]
            },
            "Donner l'exemplaire à remettre au tiers.",
            "Informer le PCC de la mise à disposition de la rame.",
            "Remettre le CONSTAT ACCIDENT avec la partie A remplie et signée, le jour même au Pcc ou dans la boite au lettre rouge constat sur JP.",
            "Noter l'accident sur la feuille de route en précisant les circonstances.",
        ),
        warn_red(
            "En cas de choc latéral violent sur la partie avant de la rame,",
            "mettre le FS : risques électriques au niveau de la descente de la Haute Tension.",
        ),
        warn_red(
            "Le déplacement des véhicules n'est possible que sur ordre du PCC.",
            "La reprise du service n'est possible que sur ordre du PCC.",
        ),
    ]


def blocks_p62():
    return [
        ps(62),
        {"type": "anchor", "id": "s-4-2-b"},
        {"type": "rct-sub", "text": "B - Accident corporel"},
        step_list(
            "Arrêter la rame, mettre les feux de détresse.",
            "Faire un appel d'urgence, prévenir les clients.",
            "Prendre toutes les dispositions afin d'éviter un autre accident et protéger les blessés",
            {
                "bullets": [
                    {
                        "parts": [
                            {"t": "Relever l'état du blessé : conscient ou inconscient, nature des blessures, âge, traitements médicaux... "},
                            {
                                "t": "Même dans le cas où le blessé est à l'intérieur de la rame, le conducteur doit sortir de sa loge pour pouvoir fournir un signalement précis.",
                                "blue": True,
                            },
                        ]
                    }
                ]
            },
            "Communiquer ces informations au PCC.",
            "Se conformer aux ordres du PCC.",
            "Réceptionner les secours et se mettre à leur disposition.",
            "Rechercher des témoins.",
            {
                "bullets": [
                    {
                        "parts": [
                            {"t": "Rédiger la fiche de "},
                            {"t": "CONSTAT CORPOREL", "bold": True},
                            {
                                "t": ", dans la rame afin que le conducteur soit joignable à tout moment par le PCC et noter les coordonnées des victimes et des témoins.",
                            },
                        ]
                    }
                ]
            },
            "Appeler le PCC pour avoir l'autorisation de reprise du service.",
            {
                "bullets": [
                    {
                        "parts": [
                            {"t": "Remettre au PCC le "},
                            {"t": "CONSTAT CORPOREL", "bold": True},
                            {"t": " ainsi que le "},
                            {"t": "CONSTAT ACCIDENT", "bold": True},
                            {"t": " avec la partie B remplie et signée."},
                        ]
                    }
                ]
            },
            "Noter l'accident sur la feuille de route en précisant les circonstances.",
        ),
        warn_red(
            "En cas de blessures en apparence légères, si la victime refuse d'être secourue, le conducteur ne doit pas reprendre son service sans accord du PCC.",
            "Même dans ce cas, le conducteur doit recueillir les coordonnées de la victime.",
        ),
    ]


def blocks_p63():
    return [
        ps(63),
        {"type": "anchor", "id": "s-4-2-c"},
        {"type": "rct-sub", "text": "C - Chute ou accident : cas d'une personne engagée sous la rame"},
        step_list(
            "Arrêter la rame, mettre les feux de détresse.",
            "Mettre le frein de secours (FS), qui assure la coupure de l'alimentation électrique de la rame (ouverture disjoncteur).",
            {
                "bullets": [
                    {
                        "parts": [
                            {"t": "Faire un appel d'urgence "},
                            {"t": "(avant de couper la batterie !)", "red": True},
                        ]
                    }
                ]
            },
            {
                "bullets": [
                    {
                        "parts": [
                            {
                                "t": "Abaisser la pantographe et dé-préparer la rame si la victime est engagée sous la rame, y compris "
                            },
                            {"t": "coupure batterie", "blue": True},
                            {"t": "."},
                        ]
                    }
                ]
            },
            "Informer les clients.",
            "Protéger la personne blessée et relever son état : Conscient ou inconscient, nature des blessures, incarcération ou non, renseignements particuliers : âge, traitements médicaux...",
            "Réceptionner les secours et se mettre à leur disposition.",
            {
                "bullets": [
                    blt(
                        "Remettre au PCC le CONSTAT CORPOREL ainsi que le CONSTAT ACCIDENT avec la partie B remplie et signée."
                    )
                ]
            },
            "Noter l'accident sur la feuille de route.",
        ),
        {"type": "warning", "icon": True, "align": "center", "lines": [{"text": "Si la victime est engagée sous le tramway, seuls les Pompiers sont autorisés à faire déplacer la rame !", "red": True}]},
    ]


def blocks_p64_d():
    return [
        ps(64),
        {"type": "anchor", "id": "s-4-2-d"},
        {"type": "rct-sub", "text": "D - Agression ou malaise du conducteur"},
        {
            "type": "hand-p",
            "text": "En cas de malaise ou d'agression à l'intérieur de la cabine, le conducteur doit :",
        },
        step_list(
            "Arrêter la rame, mettre les feux de détresse.",
            {
                "bullets": [
                    {
                        "parts": [
                            {"t": "Enclencher "},
                            {"t": "le frein de secours (FS)", "bold": True, "blue": True},
                            {"t": "."},
                        ]
                    }
                ]
            },
            "Déclencher l'appel de détresse.",
            {
                "bullets": [
                    {
                        "parts": [
                            {"t": "Dans la mesure du possible", "bold": True, "italic": True},
                            {"t": ", Informer la clientèle."},
                        ]
                    }
                ]
            },
        ),
    ]


def blocks_p43_content():
    return [
        {"type": "anchor", "id": "s-4-3"},
        {"type": "rct-section", "text": "4.3 - DERAILLEMENT DE LA RAME"},
        step_list(
            "Arrêter la rame, mettre les feux de détresse.",
            "Faire un appel d'urgence.",
            "Informer les clients.",
            {
                "bullets": [
                    {
                        "parts": [
                            {"t": "Abaisser le pantographe "},
                            {"t": "après contrôle visuel de la LAC", "bold": True, "underline": True},
                            {"t": " (risque d'arrachement)."},
                        ]
                    }
                ]
            },
            {
                "bullets": [
                    {
                        "parts": [
                            {"t": "Faire évacuer la rame, après l'accord du PCC "},
                            {"t": "(voir chapitre 4.7.B - 4.7.D)", "italic": True},
                            {"t": "."},
                        ]
                    }
                ]
            },
            "Dé-préparer la rame.",
            "Signaler la présence du tramway avec le triangle de pré-signalisation.",
            "Réceptionner les secours et se mettre à leur disposition.",
        ),
        warn_red("Il est interdit au conducteur d'entamer lui-même une tentative de ré-enraillement."),
    ]


def blocks_p65():
    return [
        ps(65),
        {"type": "rct-section", "text": "4.4 - INCIDENTS A BORD DE LA RAME"},
        {"type": "anchor", "id": "s-4-4-a"},
        {"type": "rct-sub", "text": "A - Agression, malaise, chute ou décès d'un voyageur"},
        {
            "type": "hand-p",
            "text": "En cas de malaise ou d'agression à l'intérieur de la rame, le conducteur doit :",
        },
        step_list(
            "Faire un appel d'urgence.",
            "Arrêter la rame (de préférence à la station la plus proche), mettre les feux de détresse.",
            "Enlever la clé KC et fermer la cabine.",
            "Se rendre auprès de la personne blessée et lui porter assistance.",
            "Rappeler le PCC après évaluation de la situation et se conformer à ses instructions.",
            "Noter les coordonnées des témoins de l'incident.",
            {
                "bullets": [
                    {
                        "parts": [
                            {"t": "Le cas échéant selon la gravité de l'incident :", "italic": True},
                            {"t": " Réceptionner les secours et se mettre à leur disposition."},
                        ]
                    }
                ]
            },
            "Noter l'incident sur la feuille de route.",
        ),
    ]


def blocks_p66():
    return [
        ps(66),
        {"type": "anchor", "id": "s-4-4-b"},
        {"type": "rct-sub", "text": "B - Bris de vitre"},
        {
            "type": "hand-p",
            "text": "En cas de bris de vitre latérale, ou de bris de glace de cabine à l'intérieur de la rame :",
        },
        step_list(
            "Arrêter la rame si possible en station et mettre les feux de détresse.",
            "Faire un appel d'urgence.",
            "S'assurer qu'il n'y a pas de blessé.",
            "Eloigner les clients se trouvant à proximité de la vitre brisée.",
            "Après avoir informé le PCC de la situation, attendre ses ordres : évacuation de la rame, ou fin de course en commercial jusqu'au prochain terminus si la vitre ne présente pas de danger pour la clientèle ou si du personnel de TaM à bord peut sécuriser la zone à risque.",
            "Noter l'incident sur la feuille de route.",
        ),
        {"type": "anchor", "id": "s-4-4-c"},
        {"type": "rct-sub", "text": "C - Incident de pare- brise"},
        {
            "type": "hand-p",
            "text": "En cas de casse du pare-brise de la cabine de conduite, ou de problème de visibilité influant sur la sécurité :",
        },
        step_list(
            "Arrêter la rame si possible en station et mettre les feux de détresse.",
            "Faire un appel d'urgence.",
            "Informer la clientèle.",
            "Faire évacuer la rame.",
            "Apres avoir informé le PCC de la fin de l'évacuation, attendre ses ordres.",
            "Noter l'incident sur la feuille de route.",
        ),
    ]


def blocks_p67():
    return [
        ps(67),
        {"type": "anchor", "id": "s-4-4-d"},
        {"type": "rct-sub", "text": "D - Incendie à bord"},
        step_list(
            "Arrêter la rame et mettre les feux de détresse.",
            {
                "bullets": [
                    {
                        "parts": [
                            {"t": "Procéder à l'évacuation des voyageurs "},
                            {"t": "(voir chapitre 4.7.B - 4.7.D)", "italic": True},
                            {"t": "."},
                        ]
                    }
                ]
            },
            "Faire un appel d'urgence.",
            "Evaluer le sinistre.",
            "Abaisser le pantographe et dé-préparer la rame.",
            "S'assurer que personne n'est resté à l'intérieur de la rame.",
            "Combattre le feu à l'aide des extincteurs.",
            "Réceptionner les secours et se mettre à leur disposition.",
        ),
        {
            "type": "arrow-p",
            "tone": "blue",
            "parts": [{"t": "Les mêmes consignes s'appliquent pour un incendie sur le lieu de remisage.", "blue": True}],
        },
        warn_red("Après un incendie même léger, il est formellement interdit de remonter le pantographe sans autorisation du PCC."),
    ]


def blocks_p68():
    return [
        ps(68),
        {"type": "anchor", "id": "s-4-4-e"},
        {"type": "rct-sub", "text": "E - Alerte à la bombe ou colis suspect à bord (plan Vigipirate)"},
        {
            "type": "hand-p",
            "parts": [
                {"t": "En cas de présence d'un paquet insolite ou suspect dans la rame, l'attitude recommandée est la "},
                {"t": "prudence", "bold": True},
                {"t": ", sans exagérer le risque encouru."},
            ],
        },
        colis_callout(),
        p(parts=[{"t": "Cas 1) :", "bold": True}, {"t": " un colis suspect est repéré par le conducteur lors du ", "bold": True}, {"t": "changement de loge", "bold": True}]),
        step_list(
            {
                "bullets": [blt("En présence d'un objet suspect : appeler le PCC par appel d'urgence.")],
                "extra": {"parts": [{"t": "Préciser la nature et l'emplacement de l'objet.", "bold": True, "blue": True}]},
            },
            "Se conformer aux instructions du PCC",
        ),
        p(
            parts=[
                {"t": "Cas 2) :", "bold": True},
                {"t": " un colis suspect est signalé "},
                {"t": "en ligne", "bold": True},
            ]
        ),
        step_list(
            "Identifier l'objet, et s'enquérir de son éventuel propriétaire.",
            "Appeler le PCC et se conformer à ses instructions.",
            {
                "bullets": [
                    {
                        "parts": [
                            {"t": "En cas de difficulté de liaison radio :", "italic": True},
                            {"t": " "},
                            {"t": "Evacuer la rame et Rejoindre en haut le pied le terminus le plus proche.", "bold": True},
                        ]
                    }
                ]
            },
            {
                "bullets": [
                    blt(
                        "Une fois la rame stationnée en tiroir, s'éloigner de la rame et faire respecter un périmètre de sécurité, en attendant l'arrivée de la Police et des équipes d'intervention de TaM.",
                        bold=True,
                    )
                ]
            },
        ),
    ]


def blocks_p69():
    return [
        ps(69),
        {"type": "rct-section", "text": "4.5 - INCIDENTS AUX ABORDS DE LA VOIE"},
        {"type": "anchor", "id": "s-4-5-a"},
        {"type": "rct-sub", "text": "A - Alerte à la bombe ou au colis suspect aux abords de la voie"},
        {
            "type": "hand-p",
            "text": "Dans de telles circonstances, l'attitude recommandée est la prudence, sans exagérer le risque encouru.",
        },
        colis_callout(),
        {
            "type": "hand-p",
            "text": "En cas d'alerte à la bombe (appel PCC ou intervention Police sur site) :",
        },
        step_list(
            {
                "bullets": [
                    blt(
                        "Arrêter la rame, mettre les feux de détresse et se conformer aux instructions reçues.",
                        bold=True,
                    )
                ]
            },
            {
                "bullets": [
                    {
                        "parts": [
                            {"t": "En cas d'ordre d'évacuer la rame :", "bold": True, "blue": True, "italic": True},
                            {"t": " prévenir la clientèle et procéder à l'évacuation en respectant les règles de sécurité ", "bold": True},
                            {"t": "(voir chapitre 4.6.B)", "bold": True, "italic": True},
                            {"t": ".", "bold": True},
                        ]
                    }
                ]
            },
            {
                "bullets": [
                    blt("Se mettre à la disposition de la Police et rendre compte au PCC.", bold=True)
                ]
            },
        ),
    ]


def blocks_p70():
    return [
        ps(70),
        {"type": "anchor", "id": "s-4-5-b"},
        {"type": "rct-sub", "text": "B - Chute de la ligne aérienne et risques électriques"},
        step_list(
            "Arrêter la rame, mettre les feux de détresse.",
            "Faire un appel d'urgence.",
            "Informer les clients de l'interdiction de descendre de la rame et des risques encourus.",
            "Abaisser le pantographe et dé-préparer la rame.",
            {
                "bullets": [
                    {
                        "parts": [
                            {"t": "Attendre l'ordre du PCC pour faire descendre les clients : "},
                            {
                                "t": "la descente des clients ne peut s'effectuer que lorsque le PCC confirme que la ligne aérienne n'est pas alimentée.",
                                "bold": True,
                                "blue": True,
                            },
                        ]
                    }
                ]
            },
            {
                "bullets": [
                    {
                        "parts": [
                            {"t": "Faire descendre les clients du côté où ils encourent le moins de risque, après accord du PCC "},
                            {"t": "en cas de descente côté entrevoie.", "bold": True, "blue": True},
                        ]
                    }
                ]
            },
            "En cas d'incident sur la rame (avarie sur le pantographe par exemple), il est interdit au conducteur de tenter de monter en toiture, du fait des risques électriques.",
            "Noter l'accident sur la feuille de route.",
        ),
        {
            "type": "hand-p",
            "parts": [
                {
                    "t": "Les mêmes consignes s'appliquent en cas de chute d'un arbre sur la voie ou sur une rame.",
                    "bold": True,
                    "italic": True,
                    "blue": True,
                }
            ],
        },
    ]


def blocks_p71():
    return [
        ps(71),
        {"type": "anchor", "id": "s-4-5-c"},
        {"type": "rct-sub", "text": "C - Inondation de la voie"},
        p(
            parts=[
                {
                    "t": "A noter : des repères de hauteur sont placés à proximité de la voie dans les secteurs à risque.",
                    "italic": True,
                    "blue": True,
                }
            ]
        ),
        {
            "type": "hand-p",
            "text": "En cas d'inondation de la voie inférieure à 10 cm",
        },
        step_list(
            "Franchir la zone inondée en Conduite Manoeuvre = 5 km/h.",
            "Informer le PCC.",
        ),
        {
            "type": "hand-p",
            "parts": [
                {"t": "En cas d'inondation de la voie supérieure à 10 cm = au-dessus du niveau "},
                {"t": "rouge", "red": True},
                {"t": " du repère"},
            ],
        },
        step_list(
            "Arrêter la rame et mettre les feux de détresse.",
            "Faire un appel d'urgence.",
            "Se conformer aux instructions du PCC.",
            "Informer les voyageurs de la situation.",
            "En cas d'évacuation suite à une longue immobilisation de la rame, précisez aux voyageurs (notamment les PMR et les enfants), qu'ils peuvent rester à bord de la rame s'ils le souhaitent, en attendant l'arrivée d'une assistance extérieur.",
            "Noter l'incident sur la feuille de route.",
        ),
    ]


def blocks_p72():
    return [
        ps(72),
        {"type": "anchor", "id": "s-4-5-d"},
        {"type": "rct-sub", "text": "D - Accident sur la plate-forme. Chute d'une personne sur la voie"},
        {
            "type": "hand-p",
            "text": "Lorsqu'un conducteur est témoin d'un accident survenant sur la plate-forme mais n'impliquant pas son matériel, il doit :",
        },
        step_list(
            blt("Arrêter la rame et mettre les feux de détresse.", bold=True),
            blt("Faire un appel d'urgence et informer les clients.", bold=True),
            blt("Prendre toutes les mesures pour porter secours et protéger les blessés le cas échéant.", bold=True),
            blt("Prendre toutes les dispositions afin d'éviter un autre accident.", bold=True),
            blt("Dès que la reprise du service est possible, informer le PCC.", bold=True),
            blt("Noter l'incident sur la feuille de route.", bold=True),
        ),
    ]


def blocks_p73():
    return [
        ps(73),
        {"type": "rct-section", "text": "4.6 - ANOMALIES CONSTATEES EN LIGNE"},
        {"type": "anchor", "id": "s-4-6-a"},
        {"type": "rct-sub", "text": "A - Incidents imposant l'arrêt de la rame"},
        {
            "type": "hand-p",
            "parts": [
                {"t": "Dans tous les cas suivants le conducteur de tramway doit impérativement "},
                {"t": "arrêter sa rame et appeler le PCC", "bold": True, "blue": True},
                {"t": " qui lui donnera la consigne à suivre :"},
            ],
        },
        z(
            zc("purple", bullets=[blt("Ligne aérienne endommagée ou détendue.")]),
            zc("blue", bullets=[blt("Tendeur de ligne aérienne cassé.")]),
            zc("blue2", bullets=[blt("Potence de ligne aérienne affaissée.")]),
            zc("blue2", bullets=[blt("Corps étranger sur la voie ou dans la gorge du rail et les aiguillages.")]),
            zc("blue3", bullets=[blt("Affaissement de la voie, soulèvement des pavés de la plate forme.")]),
            zc("blue3", bullets=[blt("Tout signal ou feux mal orientés et illisibles.")]),
            zc("teal", bullets=[blt("Absence du conducteur au poste de conduite lors du croisement d'une rame arrêtée.")]),
            zc("teal", bullets=[blt("Individu accroché à une rame")]),
        ),
        {"type": "anchor", "id": "s-4-6-b"},
        {"type": "rct-sub", "text": "B - Incidents n'imposant pas l'arrêt immédiat de la rame"},
        {
            "type": "hand-p",
            "parts": [
                {"t": "Dans tous les cas suivants le conducteur de tramway doit impérativement "},
                {"t": "prévenir le PCC", "bold": True, "blue": True},
                {"t": " :"},
            ],
        },
        z(
            zc("purple", bullets=[blt("Feux de croisements, feux stops ou positions éteints sur une autre rame.")]),
            zc("blue", bullets=[blt("Toutes anomalies extérieures constatées sur une autre rame.")]),
            zc("blue2", bullets=[blt("Objet accroché à une rame.")]),
            zc("blue2", bullets=[blt("Personnes au comportement suspect ou dangereux aux abords de la plate forme.")]),
            zc("blue3", bullets=[blt("Barrières détériorées aux abords de la plate forme.")]),
            zc("blue3", bullets=[blt("Arbre ou poteau menaçant de tomber sur la voie.")]),
            zc("teal", bullets=[blt("Voitures stationnées sur voie.")]),
        ),
    ]


def blocks_p74():
    return [
        ps(74),
        {"type": "rct-section", "text": "4.7 - IMMOBILISATION ET EVACUATION D'UNE RAME"},
        {"type": "anchor", "id": "s-4-7-a"},
        {"type": "rct-sub", "text": "A - Immobilisation en pleine voie"},
        step_list(
            "Mettre les feux de détresse (ou le triangle de pré-signalisation en cas de panne).",
            "Faire un appel d'urgence.",
            "Informer la clientèle.",
        ),
        {"type": "anchor", "id": "s-4-7-b"},
        {"type": "rct-sub", "text": "B - Evacuation d'une rame en pleine voie"},
        {
            "type": "arrow-p",
            "emphasis": True,
            "parts": [{"t": "Après l'accord confirmé du PCC :", "bold": True, "blue": True}],
        },
        step_list(
            "Informer les clients de l'évacuation de la rame, en les incitants à la prudence.",
            "Ouvrir une des portes du côté droit dans le sens de la marche.",
            "Descendre le premier et s'assurer qu'aucun danger ne s'oppose à l'évacuation.",
            "Inviter les voyageurs à descendre en aidant les personnes en difficulté.",
            "Prévenir le PCC de la fin de l'évacuation.",
        ),
        warn_red(
            "En cas d'incendie ou de force majeure, le conducteur peut procéder à l'évacuation sans autorisation du PCC.",
            "En cas de danger à évacuer la rame côté droit, l'évacuation ne pourra se faire côté entrevoie qu'après autorisation du PCC qui doit s'assurer de l'arrêt absolu de toute circulation antagoniste.",
        ),
        {
            "type": "boxed",
            "tone": "plain",
            "blocks": [
                p(
                    parts=[
                        {"t": "Particularité de la voie unique", "bold": True, "underline": True},
                        {"t": " : en cas d'impossibilité de transbordement des voyageurs sur une autre rame,"},
                    ]
                ),
                p(
                    parts=[
                        {"t": "Sur le tronçon Sabines – Saint Jean de Vedas :", "bold": True},
                        {
                            "t": " les voyageurs seront dirigés sur le cheminement piéton qui se trouve en bordure de voie, jusqu'au point d'arrêt des bus de substitution où ils seront pris en charge."
                        },
                    ]
                ),
                p(
                    parts=[
                        {"t": "Sur le tronçon Notre Dame de Sablassou - Jacou :", "bold": True},
                        {
                            "t": " les voyageurs emprunteront la piste cyclable située en bordure de voie, jusqu'au point d'arrêt des bus de substitution où ils seront pris en charge."
                        },
                    ]
                ),
            ],
        },
    ]


def blocks_p75():
    return [
        ps(75),
        {"type": "anchor", "id": "s-4-7-c"},
        {"type": "rct-sub", "text": "C - Immobilisation d'une rame dans le tunnel"},
        step_list(
            "Mettre les feux de détresse (ou le triangle de pré-signalisation en cas de panne).",
            "Faire un appel d'urgence, et un appel de détresse en l'absence de réponse.",
            "Informer la clientèle.",
        ),
        {"type": "anchor", "id": "s-4-7-d"},
        {"type": "rct-sub", "text": "D - Evacuation d'une rame dans le tunnel"},
        {
            "type": "arrow-p",
            "emphasis": True,
            "parts": [{"t": "Après l'accord confirmé du PCC :", "bold": True, "blue": True}],
        },
        step_list(
            "Informer les clients de l'évacuation de la rame, en les incitants à la prudence.",
            "Ouvrir une des portes du côté droit dans le sens de la marche.",
            "Descendre le premier et s'assurer qu'aucun danger ne s'oppose à l'évacuation.",
            "Inviter les voyageurs à descendre en aidant les personnes en difficulté, et les diriger vers la sortie la plus proche.",
            "Prévenir le PCC de la fin de l'évacuation.",
        ),
        {
            "type": "arrow-p",
            "tone": "blue",
            "parts": [
                {"t": "Dans tous les cas de A à D : Noter l'incident sur la feuille de route.", "bold": True, "blue": True}
            ],
        },
    ]


def blocks_p76():
    sat_carrosserie = [
        sat_row("Acrotères", " (rayé, etc...)", "1001"),
        sat_row("Cache bogie", " (rayé, etc...)", "1002"),
        sat_row("Fanaux", " (rayé, etc...)", "1005"),
        sat_row("Imposte", " (rayé, etc...)", "1023"),
        sat_row("Joue", " (rayé, etc...)", "1025"),
        sat_row("Pare-brise", " (impact et fissure hors surface de balayage)", "1029"),
        sat_row("Soufflet", " (intérieur/extérieur) (dégradé, etc..)", "1033"),
        sat_row("Vitrage latéral cabine conducteur", " (gravure, etc...)", "1040"),
        sat_row("Vitrage latéral voyageur", " (gravure, etc...)", "1048"),
    ]
    sat_poste = [
        sat_row("Chauffage Conducteur", " (bruyant)", "2009"),
        sat_row("Climatisation Conducteur", " (bruyant)", "2011"),
        sat_row("Eclairage cabine", " (défaillant)", "2023"),
        sat_row("Manipulateur", " (dur)", "2037"),
        sat_row("Pare soleil", " (dégradé)", "2043"),
        sat_row("Porte de loge", " (bruyante, dure, gravure, etc...)", "2045"),
        sat_row("Repose pieds", " (dégradé)", "2051"),
        sat_row("Sélection porte côté droit", " (voyant HS)", "2071"),
        sat_row("Sélection porte côté gauche", " (voyant HS)", "2073"),
        sat_row("Siège accompagnateur", " (dégradé)", "2075"),
        sat_row("Siège CR", " (dégradé, réglage difficile, confort, etc...)", "2077"),
    ]
    sat_voyageur = [
        sat_row("Afficheur voyageur (Ecran TFT)", " (dégradé, erroné, noir, etc..)", "3001"),
        sat_row("Assises voyageurs", " (dégradées, salissures, taguées, etc...)", "3009"),
        sat_row("Barres de maintien", " (dégradées, salissures, taguées, etc...)", "3023"),
        sat_row("Chauffage passagers", " (manque d'efficacité, bruyant, etc..)", "3030"),
        sat_row("Climatisation passagers", " (manque d'efficacité, bruyante, etc..)", "3035"),
        sat_row("Eclairage salle", " (défaillant 1 sur 3 maximums)", "3045"),
        sat_row("Portes voyageurs", " (bruyante, dure, gravure, sensibilité, etc...)", "3211"),
        sat_row("Valideurs", " (bruyants, dégradés, endommagés, etc..)", "3311"),
        sat_row("Voussoirs", " (dégradés, bruyants, etc..)", "3050"),
    ]
    sat_motor = [
        sat_row("Bogie", " (bruyant)", "4001"),
        sat_row("Roue TW", " (bruyante)", "4003"),
    ]
    return [
        ps(76),
        {"type": "chapter-banner", "text": "5. ANNEXES"},
        {"type": "rct-section", "text": "5.1 – SAT : Sommaire des codes"},
        {
            "type": "sat-codes",
            "tables": [
                {"title": "Carrosserie", "rows": sat_carrosserie},
                {"title": "Poste de conduite", "rows": sat_poste},
                {"title": "Salle voyageur", "rows": sat_voyageur},
                {"title": "Motorisation", "rows": sat_motor},
            ],
        },
    ]


SECTIONS = [
    {"id": "p59", "level": 1, "code": "4", "page": 59, "title": "Sommaire — chapitre 4", "blocks": blocks_p59()},
    {"id": "s-4-1", "level": 2, "code": "4.1", "page": 60, "title": "CONSIGNES GENERALES EN CAS D'URGENCE", "blocks": blocks_p60()},
    {
        "id": "s-4-2",
        "level": 2,
        "code": "4.2",
        "page": 61,
        "title": "ACCIDENTS & AGRESSIONS",
        "blocks": blocks_p61() + blocks_p62() + blocks_p63() + blocks_p64_d() + blocks_p43_content(),
    },
    {
        "id": "s-4-4",
        "level": 2,
        "code": "4.4",
        "page": 65,
        "title": "INCIDENTS A BORD DE LA RAME",
        "blocks": blocks_p65() + blocks_p66() + blocks_p67() + blocks_p68(),
    },
    {
        "id": "s-4-5",
        "level": 2,
        "code": "4.5",
        "page": 69,
        "title": "INCIDENTS AUX ABORDS DE LA VOIE",
        "blocks": blocks_p69() + blocks_p70() + blocks_p71() + blocks_p72(),
    },
    {"id": "s-4-6", "level": 2, "code": "4.6", "page": 73, "title": "ANOMALIES CONSTATEES EN LIGNE", "blocks": blocks_p73()},
    {
        "id": "s-4-7",
        "level": 2,
        "code": "4.7",
        "page": 74,
        "title": "IMMOBILISATION ET EVACUATION D'UNE RAME",
        "blocks": blocks_p74() + blocks_p75(),
    },
    {"id": "s-5-1", "level": 2, "code": "5.1", "page": 76, "title": "SAT : Sommaire des codes", "blocks": blocks_p76()},
]

TOC = [
    {"id": "p59", "level": 1, "code": "4", "page": 59, "title": "Sommaire — chapitre 4"},
    {"id": "s-4-1", "level": 2, "code": "4.1", "page": 60, "title": "CONSIGNES GENERALES EN CAS D'URGENCE"},
    {"id": "s-4-2", "level": 2, "code": "4.2", "page": 61, "title": "ACCIDENTS & AGRESSIONS"},
    {"id": "s-4-2-a", "level": 3, "code": "A", "page": 61, "title": "Accident matériel", "anchorOnly": True, "parentId": "s-4-2"},
    {"id": "s-4-2-b", "level": 3, "code": "B", "page": 62, "title": "Accident corporel", "anchorOnly": True, "parentId": "s-4-2"},
    {"id": "s-4-2-c", "level": 3, "code": "C", "page": 63, "title": "Personne engagée sous la rame", "anchorOnly": True, "parentId": "s-4-2"},
    {"id": "s-4-2-d", "level": 3, "code": "D", "page": 64, "title": "Agression ou malaise du conducteur", "anchorOnly": True, "parentId": "s-4-2"},
    {"id": "s-4-3", "level": 2, "code": "4.3", "page": 64, "title": "DERAILLEMENT DE LA RAME"},
    {"id": "s-4-4", "level": 2, "code": "4.4", "page": 65, "title": "INCIDENTS A BORD DE LA RAME"},
    {"id": "s-4-4-a", "level": 3, "code": "A", "page": 65, "title": "Agression, malaise, chute ou décès d'un voyageur", "anchorOnly": True, "parentId": "s-4-4"},
    {"id": "s-4-4-b", "level": 3, "code": "B", "page": 66, "title": "Bris de vitre", "anchorOnly": True, "parentId": "s-4-4"},
    {"id": "s-4-4-c", "level": 3, "code": "C", "page": 66, "title": "Incident de pare-brise", "anchorOnly": True, "parentId": "s-4-4"},
    {"id": "s-4-4-d", "level": 3, "code": "D", "page": 67, "title": "Incendie à bord", "anchorOnly": True, "parentId": "s-4-4"},
    {"id": "s-4-4-e", "level": 3, "code": "E", "page": 68, "title": "Alerte à la bombe ou colis suspect", "anchorOnly": True, "parentId": "s-4-4"},
    {"id": "s-4-5", "level": 2, "code": "4.5", "page": 69, "title": "INCIDENTS AUX ABORDS DE LA VOIE"},
    {"id": "s-4-5-a", "level": 3, "code": "A", "page": 69, "title": "Colis suspect aux abords de la voie", "anchorOnly": True, "parentId": "s-4-5"},
    {"id": "s-4-5-b", "level": 3, "code": "B", "page": 70, "title": "Chute ligne aérienne", "anchorOnly": True, "parentId": "s-4-5"},
    {"id": "s-4-5-c", "level": 3, "code": "C", "page": 71, "title": "Inondation de la voie", "anchorOnly": True, "parentId": "s-4-5"},
    {"id": "s-4-5-d", "level": 3, "code": "D", "page": 72, "title": "Accident plate-forme / chute sur voie", "anchorOnly": True, "parentId": "s-4-5"},
    {"id": "s-4-6", "level": 2, "code": "4.6", "page": 73, "title": "ANOMALIES CONSTATEES EN LIGNE"},
    {"id": "s-4-6-a", "level": 3, "code": "A", "page": 73, "title": "Incidents imposant l'arrêt", "anchorOnly": True, "parentId": "s-4-6"},
    {"id": "s-4-6-b", "level": 3, "code": "B", "page": 73, "title": "Incidents sans arrêt immédiat", "anchorOnly": True, "parentId": "s-4-6"},
    {"id": "s-4-7", "level": 2, "code": "4.7", "page": 74, "title": "IMMOBILISATION ET EVACUATION D'UNE RAME"},
    {"id": "s-4-7-a", "level": 3, "code": "A", "page": 74, "title": "Immobilisation en pleine voie", "anchorOnly": True, "parentId": "s-4-7"},
    {"id": "s-4-7-b", "level": 3, "code": "B", "page": 74, "title": "Evacuation en pleine voie", "anchorOnly": True, "parentId": "s-4-7"},
    {"id": "s-4-7-c", "level": 3, "code": "C", "page": 75, "title": "Immobilisation dans le tunnel", "anchorOnly": True, "parentId": "s-4-7"},
    {"id": "s-4-7-d", "level": 3, "code": "D", "page": 75, "title": "Evacuation dans le tunnel", "anchorOnly": True, "parentId": "s-4-7"},
    {"id": "s-5-1", "level": 2, "code": "5.1", "page": 76, "title": "SAT : Sommaire des codes"},
]

OUT.write_text(
    "/**\n * RCT EXP-CSG-01-17 — chapitre 4 (pages 59–76) + annexe 5.1.\n"
    " * Texte retranscrit depuis les scans RCT (docs/rct-img/00X.jpg)\n */\n\n"
    f"export const RCT_LECTURE_CH4_SECTIONS = {json.dumps(SECTIONS, ensure_ascii=False, indent=2)};\n\n"
    f"export const RCT_LECTURE_CH4_TOC = {json.dumps(TOC, ensure_ascii=False, indent=2)};\n",
    encoding="utf-8",
)
print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")
