#!/usr/bin/env python3
"""Génère docs/js/data-rct-lecture-ch2.js depuis OCR corrigé + structure manuelle."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OCR_PATH = ROOT / "output" / "ocr-ch2-20-37.json"
OUT = Path(__file__).parent / "data-rct-lecture-ch2.js"

ocr = json.loads(OCR_PATH.read_text(encoding="utf-8"))

SKIP = re.compile(
    r"^(Tam|lam|Tan|Tm|aM|Iam|CONSIGNES|EXP-|Page \d|version du|verslon du|Pege)",
    re.I,
)

FIXES = [
    ("kmlh", "Km/h"), ("Kmlh", "Km/h"), ("lobjet", "l'objet"), ("dun ", "d'un "),
    ("daiguille", "d'aiguille"), ("lINDIR", "l'INDIR"), ("litinéraire", "l'itinéraire"),
    ("laiguille", "l'aiguille"), ("Yensemble", "l'ensemble"), ("lintermédiaire", "l'intermédiaire"),
    ("deffectuer", "d'effectuer"), ("lindication", "l'indication"), ("linclinaison", "l'inclinaison"),
    ("lunité", "l'unité"), ("V'aiguillage", "l'aiguillage"), ("Vaiguille", "l'aiguille"),
    ("ILest_strictement interdit _de", "Il est strictement interdit de :"),
    ("Il_est_strictement interdit_de", "Il est strictement interdit de :"),
    ("SIGNALISAIION EERROVIAIRE", "SIGNALISATION FERROVIAIRE"),
    ("ERANCHISSEMENT", "FRANCHISSEMENT"), ("RI7", "R17"), ("Pcc", "PCC"),
    ("princlpe", "principe"), ("condulte", "conduite"), ("vitesse limltée", "vitesse limitée"),
    ("prlorité", "priorité"), ("labsence", "l'absence"), ("dautres", "d'autres"),
    ("dattente", "d'attente"), ("Titinéraire", "l'itinéraire"), ("mengagé", "m'engage"),
    ("aiquilles", "aiguilles"), ("destinatlon", "destination"), ("dlfférente", "différente"),
    ("franichissernent", "franchissement"), ("pnne", "panne"), ("cliqnotant", "clignotant"),
    ("dune ", "d'une "), ("remisaqe", "remisage"), ("danticipatlon", "d'anticipation"),
    ("VINDIR", "l'INDIR"), ("dabsence", "d'absence"), ("lavancement", "l'avancement"),
    ("allum6", "allumé"), ("cllgnotant", "clignotant"), ("dexclamation", "d'exclamation"),
    ("durgence", "d'urgence"), ("dindication", "d'indication"), ("fize", "fixe"),
    ("RQUIIERE", "ROUTIERE"), ("dagents", "d'agents"), ("détermin6", "déterminé"),
    ("dolt qultter", "doit quitter"), ("statlon", "station"), ("programmatlon", "programmation"),
    ("2.41", "2.4.1"), ("LIV2", "L1V2"), ("léchange", "l'échange"), ("lintégralité", "l'intégralité"),
    ("daccès", "d'accès"), ("laccès", "l'accès"), ("lavenue", "l'avenue"), ("darrivée", "d'arrivée"),
    ("ditinéraire", "d'itinéraire"), ("4Om", "40m"), ("spéclflques", "spécifiques"), ("1 r", "1er"),
    ("verroulllé", "verrouillé"), ("cllmatlques", "climatiques"), ("oxtromes", "extrêmes"),
    ("dautre rrame", "d'autre rame"), ("boitier", "boîtier"), ("laction", "l'action"), ("deffet", "d'effet"),
    ("Ia position", "la position"), ("S 'intègre", "s'intègre"), ("position &un", "position d'un"),
    ("daiguillage", "d'aiguillage"), ("dépaule", "d'épaule"), ("darrêt", "d'arrêt"),
    ("dentamer", "d'entamer"), ("Lmite", "Limite"), ("Lvarrétode", "L'arrêt de"), ("V'alguille", "l'aiguille"),
    ("manæuvre", "manœuvre"), ("chantler", "chantier"), ("lentre voie", "l'entre voie"),
    ("doobjets", "d'objets"), ("dArrêt", "d'Arrêt"), ("dinterdiction", "d'interdiction"),
    ("larrivée", "l'arrivée"), ("ArReT", "ARRÊT"), ("remorquagelpoussage", "remorquage/poussage"),
    ("lapproche", "l'approche"), ("fonctlon", "fonction"), ("Mlstral", "Mistral"),
    ("Mlstral", "Mistral"), ("Destlnatlon", "Destination"), ("Avertlssement", "Avertissement"),
    ("Manœuvre", "Manœuvre"), ("Signallndlcateur", "Signal Indicateur"), ("SlanaL", "Signal"),
    ("SianaL", "Signal"), ("SianaLl", "Signal"), ("Ioul", "ou "), ("oM_Eoul", "ou Feu"),
    ("flash etAvertisseur", "flash et Avertisseur"), ("présence_fension", "présence tension"),
    ("Zones_de_Télécommande", "Zones de Télécommande"), ("Panneaux de_chantier", "Panneaux de chantier"),
    ("etou en mode", "et/ou en mode"), ("talonnable Lors", "talonnable. Lors"),
    ("2. 1", "2.1"), ("2. 2", "2.2"), ("2. 3", "2.3"), ("2. 4", "2.4"), ("2. 5", "2.5"), ("2. 6", "2.6"),
    ("2.41", "2.4.1"), ("2.4.2", "2.4.2"), ("2.4.3", "2.4.3"),
]


def clean(line: str) -> str:
    for a, b in FIXES:
        line = line.replace(a, b)
    line = re.sub(r"\s+", " ", line).strip()
    return line


def ps(n: int, cap: str | None = None) -> dict:
    return {"type": "page-scan", "src": f"{n:03d}.jpg", "caption": cap or f"Page {n}/76"}


def p(text: str, **kw) -> dict:
    b = {"type": "p", "text": text}
    b.update(kw)
    return b


VITESSE_SPEEDS = ["5 Km/h", "10 Km/h", "15 Km/h", "20 Km/h", "25 Km/h", "30 Km/h", "40 Km/h"]
VITESSE_ROWS = [
    {"label": "Conduite de manœuvre", "highlight": "5 Km/h"},
    {"label": "Circulation dans l'atelier", "highlight": "5 Km/h"},
    {"label": "Travaux sur la voie avec présence du personnel", "highlight": "10 Km/h"},
    {"label": "Croisement d'une rame arrêtée", "highlight": "10 Km/h"},
    {"label": "Traversée de voie sur ornière porteuse", "highlight": "10 Km/h"},
    {"label": "Feu Routier en dérangement", "highlight": "10 Km/h"},
    {"label": "Circulation dans le dépôt", "highlight": "10 Km/h"},
    {"label": "Circulation en terminus", "highlight": "15 Km/h"},
    {"label": "Prise d'une aiguille en voie déviée", "highlight": "15 Km/h"},
    {"label": "Danger piéton", "highlight": "15 Km/h"},
    {"label": "Traversée de station en HLP", "highlight": "15 Km/h"},
    {"label": "Défaut d'avertisseur sonore (gong)", "highlight": "20 Km/h"},
    {"label": "Remorquage-poussage", "highlight": "20 Km/h"},
    {"label": "Mode Secours Traction ou Alimentation Directe", "highlight": "25 Km/h", "notes": {"25 Km/h": "= Limite matériel roulant"}},
    {"label": "Voie Unique Temporaire", "highlight": "30 Km/h"},
    {"label": "Entrée en station", "highlights": ["15 Km/h", "30 Km/h"], "notes": {"15 Km/h": "Présence d'autre rame", "30 Km/h": "Absence d'autre rame"}},
    {"label": "Franchissement de carrefour (y compris Passage à Niveau)", "highlight": "40 Km/h"},
    {"label": "Aiguille RFF en direct ou déviée", "highlight": "40 Km/h"},
    {"label": "Ouverture de voie", "highlight": "40 Km/h"},
    {"label": "Prise d'une aiguille en voie directe", "highlight": "40 Km/h"},
    {"label": "Défaut Veille avec accompagnant", "highlight": "40 Km/h"},
    {"label": "Défaut de freins", "highlight": "40 Km/h"},
    {"label": "Bogie isolé", "highlight": "40 Km/h"},
    {"label": "Chasse-Corps HS ou verrouillé", "highlight": "40 Km/h", "spanNote": {"from": "5 Km/h", "to": "30 Km/h", "text": "En cas d'endommagement ou de conditions climatiques extrêmes"}},
]

ANCHORS_22 = [
    ("s-2-2-a", "A - Le Signal Indicateur de Direction = INDIR"),
    ("s-2-2-b", "B - Le Signal Indicateur de Destination = INDES"),
    ("s-2-2-c", "C - Le Signal (ou feu) de Manœuvre = SM"),
    ("s-2-2-d", "D - Le Signal d'Avertissement = SA"),
    ("s-2-2-e", "E - Le Signal de Manœuvre et d'Avertissement = SMA"),
    ("s-2-2-f", "F - Le Signal (ou feu blanc) de sortie de remisage"),
    ("s-2-2-g", "G - Signal (ou feu) blanc d'anticipation"),
    ("s-2-2-h", "H - Lampe flash et Avertisseur sonore"),
    ("s-2-2-i", "I - Signal (ou feu) de présence tension"),
    ("s-2-2-j", "J - Le Signal (ou Feu) de traversée routière"),
]

def sommaire_ch2_blocks():
    return [
        ps(20),
        {
            "type": "sommaire-ch2",
            "chapter": "2. RESPECT DE LA SIGNALISATION",
            "entries": [
                {"title": "2.1 - FRANCHISSEMENT DES APPAREILS DE VOIE", "page": 21},
                {"title": "2.2 - SIGNALISATION LUMINEUSE", "page": 22, "subs": [a[1] for a in ANCHORS_22]},
                {"title": "2.3 - CONSIGNES EN CAS DE PANNE DE LA SIGNALISATION LUMINEUSE", "page": 28},
                {"title": "2.4 - ZONES SPECIFIQUES : ZONES GARE, ALBERT 1er, CORUM", "page": 29},
                {"title": "2.5 - PANNEAUX FIXES DE SIGNALISATION", "page": 33, "subs": [
                    "A - Vitesse autorisée", "B - Aiguillage/ télécommande d'aiguilles",
                    "C - Clou de positionnement", "D - Panneaux Limite de manœuvre",
                ]},
                {"title": "2.6 - PANNEAUX TEMPORAIRES", "page": 37, "subs": [
                    "A - Panneaux de chantier", "B - Panneaux d'Arrêt absolu",
                ]},
            ],
        },
    ]


def blocks_s21():
    return [
        ps(21),
        p("Le principe général de la marche à vue est que les conflits entre un tramway et tout autre véhicule en circulation sont gérés par signalisation lumineuse, sauf cas particulier (cf. zones spécifiques Gare, Albert 1er, Corum partie 2.4)."),
        {"type": "warning", "tone": "red", "text": "Tout feu éteint ou bloqué au rouge (y compris INDIR et INDES) fait l'objet d'un arrêt immédiat de la rame et d'un appel au PCC."},
        {"type": "rct-section", "text": "2.1 - FRANCHISSEMENT DES APPAREILS DE VOIE"},
        p("Un aiguillage est un appareil de voie qui permet de changer de direction ou de voie. Pour tout franchissement d'un aiguillage, le conducteur est tenu de respecter les consignes spécifiques à ce type d'aiguillage."),
        p("La signalisation de manœuvre permettant l'unité des mouvements doit être impérativement respectée (voir chapitre suivant 2.2)."),
        p("Les aiguillages, qu'ils soient pris en pointe ou en talon, doivent être franchis à vitesse limitée : 15 Km/h en voie déviée, 40 Km/h en voie directe, 10 Km/h au dépôt."),
        p("Cas particulier : 40 Km/h en voie directe ou déviée pour les aiguilles RFF de la voie unique Saint Jean de Vedas."),
        {"type": "note-red", "text": "Les appareils de voies motorisées ne sont pas talonnable."},
        p("Lors de tout franchissement, le conducteur doit vérifier : la bonne programmation de direction ; l'état des feux et la position de l'INDIR (voir chapitre suivant) ; le bon placage des aiguilles."),
        {"type": "note-blue", "text": "En circulation en ligne, le conducteur doit toujours vérifier que l'aiguille qu'il va aborder par la pointe est en bonne position par rapport à l'itinéraire qui est tracé."},
        {"type": "warning", "tone": "red", "parts": [{"t": "Il est strictement interdit de :", "bold": True, "underline": True, "red": True}]},
        {"type": "ul", "items": [
            "Franchir un aiguillage entrebâillé car il y a risque de déraillement.",
            "Stationner sur un appareil de voie, sauf sur la zone de la Gare St Roch où les aiguilles sont sécurisées :",
        ]},
        p("En cas de stationnement exceptionnel sur un appareil de voie talonnable, non renversable, toujours dégager complètement l'aiguillage en faisant circuler le tramway dans le sens du talonnage de l'aiguille, et ce jusqu'à la limite de manœuvre."),
        p("La commande de changement de direction (par télécommande et/ou en mode dégradé) est décrite au chapitre 2.5.B", italic=True),
    ]


def signal_checks_indir():
    return {"type": "signal-checks", "items": [
        {"lead": "Barre horizontale allumée en rouge :", "sub": "Arrêt absolu, franchissement interdit.", "color": "red"},
        {"lead": "Barre verticale allumée en vert :", "sub": "Passage autorisé, itinéraire en voie directe.", "color": "green"},
        {"lead": "Barre oblique allumée en jaune :", "sub": "Passage autorisé, itinéraire en voie déviée à gauche ou à droite selon l'inclinaison de la barre.", "color": "yellow"},
        {"lead": "Feu éteint :", "sub": "Arrêt absolu, franchissement interdit.", "color": "red"},
    ]}


def codes_depot():
    return {"type": "codes-dest", "title": "Zone Dépôt", "rows": [
        {"code": "L", "text": "Destination Lavage", "color": "green"},
        {"code": "A", "text": "Destination Atelier", "color": "green"},
        {"code": "S", "qualifier": "(entrée)", "text": "Destination Station Service", "color": "green"},
        {"code": "S", "qualifier": "(sortie)", "text": "Voie Sortie", "color": "green"},
        {"code": "P", "text": "Destination Passage", "color": "green"},
        {"code": "C", "text": "Voie de Contournement", "color": "green"},
        {"code": "I", "text": "Voie d'Interface", "color": "green"},
        {"code": "G", "text": "Garage", "color": "green"},
        {"code": "E", "text": "Voie Entrée", "color": "green"},
        {"code": "R", "text": "Destination Remisage", "color": "green"},
        {"code": "R", "qualifier": "(Sabines V2)", "text": "Retournement dans le tiroir", "color": "green"},
        {"code": "1 à 16", "text": "Remisage 1 à 16", "color": "blue"},
        {"code": "VU", "text": "Voie Unique", "color": "blue"},
        {"code": "V1", "text": "Voie 1", "color": "blue"},
    ]}


def codes_dest_row(code, text, color="green", text_parts=None):
    cell = {"code": code, "color": color}
    if text_parts:
        cell["textParts"] = text_parts
    else:
        cell["text"] = text
    return cell


def codes_zone_matrix(codes, plp_note="", plg_note="Idem Gare", plg_count=4):
    rows = []
    green_seen = 0
    for i, entry in enumerate(codes):
        if entry is None:
            rows.append([{"empty": True}, {"text": ""}, {"text": ""}])
            continue
        plp = {"text": plp_note, "italic": True} if i == 0 and plp_note else {"text": ""}
        is_green = entry.get("color", "green") == "green"
        plg = (
            {"text": plg_note, "italic": True}
            if plg_note and is_green and green_seen < plg_count
            else {"text": ""}
        )
        if is_green:
            green_seen += 1
        rows.append([entry, plp, plg])
    return {"type": "codes-dest", "columns": ["Codes Destination", "PLP", "PLG"], "rows": rows}


def codes_gare():
    return codes_zone_matrix([
        codes_dest_row("MA", "Direction Rue Maguelone"),
        codes_dest_row("RO", "Direction Rondelet"),
        codes_dest_row("PL", "Direction Pont de Lattes"),
        codes_dest_row("OB", "Direction Observatoire"),
        None,
        codes_dest_row("XX", "Arrêt absolu", "red"),
        codes_dest_row("AT", None, "red", [{"t": "En attente = "}, {"t": "Arrêt", "red": True}]),
    ], plp_note="(photo PLP — à intégrer)", plg_note="Idem Gare")


def blocks_s22():
    b = [
        ps(22),
        {"type": "rct-section", "text": "2.2 - SIGNALISATION FERROVIAIRE LUMINEUSE"},
        p("On entend par signalisation ferroviaire lumineuse l'ensemble des informations données au conducteur par l'intermédiaire des feux lumineux disposés le long de la voie permettant au tramway d'effectuer des manœuvres protégées."),
        p("Cette signalisation est présente en ligne et au dépôt pour assurer la sécurité de franchissement des aiguillages ou pour garantir la sécurité de zones de circulation à caractère dangereux en créant des cantonnements."),
        {"type": "anchor", "id": "s-2-2-a"},
        {"type": "rct-sub", "text": "A - Le Signal Indicateur de Direction = INDIR :"},
        p("Ce signal est un témoin lumineux de position d'aiguille. Il indique la position du premier aiguillage rencontré, et si le placage des lames d'aiguille est correct."),
        p("Il est composé de multipoints dont la couleur varie en fonction de l'indication qu'il donne :"),
        signal_checks_indir(),
        ps(23),
        {"type": "anchor", "id": "s-2-2-b"},
        {"type": "rct-sub", "text": "B - Le Signal Indicateur de Destination = INDES :"},
        {"type": "p", "parts": [
            {"t": "Ce signal indique au conducteur sa destination en fonction de l'inscription qui apparait dans le signal multipoints par "},
            {"t": "un", "blue": True},
            {"t": " ou "},
            {"t": "deux chiffres", "blue": True},
            {"t": ", ou "},
            {"t": "par des lettres", "blue": True},
            {"t": "."},
        ]},
        codes_depot(),
        {"type": "codes-cas", "left": {"title": "Cas particulier de la zone Gare St Roch", "ref": "Voir partie 2.4", "rows": [
            {"code": "MA", "text": "Direction Rue Maguelone", "color": "green"},
            {"code": "RO", "text": "Direction Rondelet", "color": "green"},
            {"code": "PL", "text": "Direction Pont de Lattes", "color": "green"},
            {"code": "OB", "text": "Direction Observatoire", "color": "green"},
            {"code": "AT", "textParts": [{"t": "En attente = "}, {"t": "Arrêt", "red": True}], "color": "red"},
        ]}, "right": {"title": "Cas particulier de la zone Galerie Mistral", "ref": "Voir partie 2.2 G", "rows": [
            {"code": "N", "text": "mode nominal, sans retournement"},
            {"code": "VU", "text": "mode retournement Corum – Galerie (ou Comédie) – Corum"},
            {"code": "RE", "text": "mode retournement Comédie – Galerie – Comédie"},
        ]}},
        {"type": "anchor", "id": "s-2-2-c"},
        {"type": "rct-sub", "text": "C - Le Signal (ou feu) de Manœuvre = SM :"},
        p("La signalisation de manœuvre a pour objet de protéger les mouvements des tramways dans certaines zones de ligne où sont implantés des appareils de voie. Cette signalisation doit être respectée scrupuleusement, sauf consigne du PCC ou d'un agent de maîtrise habilité présent sur les lieux."),
        p("Le signal SM est composé de 2 feux superposés, présentant :"),
        {"type": "signal-checks", "items": [
            {"lead": "Un T rouge en haut =", "sub": "Arrêt obligatoire, franchissement interdit.", "color": "red"},
            {"lead": "Un T vert en bas =", "sub": "Franchissement autorisé.", "color": "green"},
        ]},
        {"type": "warning", "lines": [
            {"parts": [{"t": "Principe de cantonnement", "bold": True, "underline": True}]},
            {"parts": [
                {"t": "Le SM a également pour fonction d'interdire l'accès d'un tramway à un canton sur lequel circule déjà un tramway dans le même sens (tunnel de la Galerie Mistral) ou quel que soit le sens (tronçons en VU). Sa signification est la même = "},
                {"t": "arrêt obligatoire, franchissement interdit", "red": True},
            ]},
        ]},
    ]
    b.extend(blocks_s22_p24_27())
    return b


def blocks_s22_p24_27():
    return [
        ps(24),
        {"type": "anchor", "id": "s-2-2-d"},
        {"type": "rct-sub", "text": "D - Le Signal d'Avertissement = SA :"},
        p("Le signal SA est composé de 2 feux superposés, présentant :"),
        {"type": "signal-checks", "items": [
            {"lead": "Un T orange en haut =", "sub": "Prochain FM au rouge, franchissement autorisé, marche à vue.", "color": "orange"},
            {"text": "Si le feu est en panne, prévenir le PCC", "italic": True, "color": "red"},
            {"lead": "Un T vert en bas =", "sub": "Franchissement autorisé.", "color": "green"},
        ]},
        {"type": "anchor", "id": "s-2-2-e"},
        {"type": "rct-sub", "text": "E - Le Signal de Manœuvre et d'Avertissement = SMA :"},
        p("Le signal SMA est composé de 3 feux superposés, présentant :"),
        {"type": "signal-checks", "items": [
            {"lead": "Un T rouge en haut =", "sub": "Arrêt absolu", "color": "red"},
            {"lead": "Un T orange fixe au milieu =", "sub": "Franchissement autorisé, marche à vue, il indique que le prochain signal de manœuvre est rouge.", "color": "orange"},
            {"lead": "Un T orange clignotant au milieu =", "sub": "Franchissement autorisé, marche à vue, il indique la présence d'une rame à quai ou occupation de l'interface JP / Cemh (une rame peut circuler ou être arrêtée sur le canton).", "color": "orange", "blink": True},
            {"lead": "Un T vert en bas =", "sub": "Franchissement autorisé.", "color": "green"},
        ]},
        {"type": "highlight", "text": "Si le T Orange est allumé (fixe ou clignotant) — Le conducteur est autorisé à s'engager à vitesse réduite : 30 Km/h, et 15 Km/h en entrée de station en présence d'une autre rame"},
        {"type": "anchor", "id": "s-2-2-f"},
        {"type": "rct-sub", "text": "F - Le Signal (ou feu blanc) de sortie de remisage :"},
        p("Ce signal est en général situé en sortie de faisceau de remisage. Il est composé d'un seul feu blanc :"),
        {"type": "signal-checks", "items": [
            {"lead": "Feu allumé blanc :", "sub": "Franchissement autorisé.", "color": "green"},
            {"lead": "Feu éteint :", "sub": "Franchissement interdit.", "color": "red"},
        ]},
        {"type": "anchor", "id": "s-2-2-g"},
        {"type": "rct-sub", "text": "G - Signal (ou feu) blanc d'anticipation :"},
        p("Signal Autorisant le départ. Feu uniquement positionné en station (ex. : Place de l'Europe), du fait que le SM ou l'INDIR n'est pas visible du quai de départ."),
        ps(25),
        {"type": "anchor", "id": "s-2-2-h"},
        {"type": "rct-sub", "text": "H - Lampe flash et Avertisseur sonore :"},
        p("Elle se compose d'une Alarme Lumineuse de franchissement sur les sections à Voie Unique, associée à un Avertisseur Sonore."),
        p("Les feux clignotants de couleur rouge sont déclenchés sur détection d'un franchissement d'un SM à chaque entrée des tronçons de Voie Unique. Ils indiquent au conducteur soit qu'il vient de franchir un SM, soit qu'une rame arrivant à contre sens s'est engagée sans autorisation."),
        {"type": "warning", "lines": [
            {"parts": [{"t": "Si le signal clignote :", "bold": True}]},
            {"text": "1. Arrêt immédiat de la rame (FU).", "red": True},
            {"text": "2. Enclencher les feux de détresse", "red": True},
            {"text": "3. Appel du PCC, et attendre les consignes", "red": True},
        ]},
        {"type": "cas-box", "title": "Cas particuliers", "items": [
            {"title": "Zone de manœuvre Léon Blum", "text": "(approche sur V2 sens vers Gare) la lampe flash est positionnée à côté du SA pour protéger une zone de manœuvre dont la configuration particulière (passage sur V2 à contre-sens) nécessite un signal renforcé. La lampe flash s'allume lorsque le SM suivant s'est allumé au rouge : la consigne est alors de ralentir, avant de marquer l'arrêt au SM.", "emphasis": "blue"},
            {"title": "Galerie Mistral", "text": "lors de l'exploitation en VU entre Corum et Comédie, sous procédure spécifique gérée depuis le PCC, le déclenchement des sirènes & lampes flash a la même signification que sur les tronçons à voie unique L.2 ou L.3 = consigne d'arrêt immédiat de la rame (FU).", "emphasis": "blue"},
            {"title": "Sections en VU", "text": "la lampe flash peut être utilisée pour renforcer la signalisation à l'approche d'un INDIR si celui-ci est dans l'état barre horizontale rouge (signal fermé).", "emphasis": "red"},
        ]},
        {"type": "anchor", "id": "s-2-2-i"},
        {"type": "rct-sub", "text": "I - Signal (ou feu) de présence tension :"},
        p("Le Signal de présence ou d'absence tension (ligne aérienne) se compose d'un feu jaune suspendu à hauteur de la ligne aérienne avant chaque sectionnement électrique. Les feux de présence tension doivent être vérifiés au fur et à mesure de l'avancement en ligne."),
        {"type": "signal-checks", "items": [
            {"lead": "Feu allumé =", "sub": "présence tension, circulation autorisée."},
            {"lead": "Feu clignotant =", "sub": "absence tension, arrêt absolu."},
            {"lead": "Feu éteint =", "sub": "feu en panne, arrêt absolu et appel PCC."},
        ]},
        ps(26),
        {"type": "anchor", "id": "s-2-2-j"},
        {"type": "rct-sub", "text": "J - Le Signal (ou Feu) de traversée routière :"},
        {"type": "rct-sub", "text": "a) Pré-signalisation à l'approche du carrefour :"},
        {"type": "arrow-p", "tone": "blue", "parts": [{"t": "La pré-signalisation indique au conducteur que l'arrivée de la rame est prise en compte par le système central de régulation des feux. Le signal est situé sur le poteau en dessous du signal R17, il est composé d'un losange et d'un point d'exclamation de couleur orange."}]},
        {"type": "ul", "items": [
            "Losange éteint = la prise en compte du tramway est hors service (ou ampoule grillée)",
            {"text": "Losange allumé = la prise en compte du tramway est en service.", "orange": True},
            {"text": "Losange avec le point d'exclamation clignotant = le tramway a été pris en compte pour déclencher les feux de traversée routière et changement de phase du carrefour trois secondes (ou plus) après le premier clignotement.", "orange": True},
        ]},
        {"type": "arrow-p", "parts": [
            {"t": "Le pré-signal indique au conducteur qu'il a une forte probabilité de bénéficier de la priorité au carrefour : dans ce cas le conducteur se prépare à franchir le carrefour à la vitesse de consigne, en positionnant son manipulateur sur le mode neutre ou pré-freinage pour faire face à toute situation d'urgence. Lorsque la barre des feux de traversée routière passe à la position verticale, il franchit le carrefour sur sa lancée, "},
            {"t": "sans jamais anticiper le passage à la barre verticale.", "bold": True},
        ]},
        p("Si le conducteur n'a pas d'indication de prise en compte : il aborde l'intersection à vitesse réduite de façon à arrêter normalement sa rame si le feu de priorité affiche toujours la position de la barre horizontale."),
        {"type": "rct-lead", "text": "Les différentes phases"},
        {"type": "phase-list", "items": [
            {"n": "1", "bg": "white", "parts": [{"t": "Barre horizontale => Arrêt absolu. Losange éclairé fixe."}]},
            {"n": "2", "bg": "purple", "parts": [{"t": "Barre horizontale => Arrêt absolu. Losange clignotant."}]},
            {"n": "3", "bg": "white", "parts": [{"t": "Barre horizontale => Arrêt absolu. Losange clignotant. Point d'exclamation clignotant 3 sec. pour changement de phase de la barre horizontale à la base verticale."}]},
            {"n": "4", "bg": "purple", "parts": [{"t": "Barre verticale => Passage autorisé. Losange clignotant seul."}]},
            {"n": "5", "bg": "white", "parts": [
                {"t": "Barre verticale => Passage autorisé. "},
                {"t": "Losange allumé fixe avertissant du changement de phase dans les 3 secondes (de la barre verticale -5- au disque central -6-)", "orange": True},
            ]},
            {"n": "6", "bg": "purple", "parts": [{"t": "Disque central => Arrêt absolu : Allumage 3 secondes avant phase 1. Losange allumé fixe."}]},
        ]},
        ps(27),
        {"type": "rct-sub", "text": "Cas particulier du clignotement lent du losange :"},
        p("Cet état provisoire indique que le feu routier étant asservi au feu SIG, il faut attendre que le SM soit au vert (pour la cohérence des 2 signaux), ou bien que la station en aval étant occupée, il faut attendre que la rame devant libère sa position (pour ne pas bloquer le carrefour en attendant)."),
        {"type": "rct-sub", "text": "b) Signalisation de carrefour"},
        p("Le Signal de traversée routière pour tramway est de type R17. Il est composé de trois feux blancs :"),
        {"type": "signal-checks", "items": [
            {"lead": "Barre verticale allumée =", "sub": "franchissement autorisé.", "color": "green"},
            {"lead": "Disque central allumé =", "sub": "avertissement avant passage à la barre horizontale.", "color": "orange"},
            {"lead": "Barre horizontale allumée =", "sub": "franchissement interdit.", "color": "red", "subColor": "red"},
        ]},
        p("Pour franchir le carrefour, le manipulateur doit être au neutre ou sur le mode pré-freinage pour faire face à toute situation d'urgence."),
        {"type": "arrow-p", "tone": "blue", "parts": [{"t": "En situation de dérangement, le disque central peut se présenter en allumage clignotant. Pour tout dysfonctionnement de la Signalisation Lumineuse, voir au chapitre 2.3 pages suivantes."}]},
        {"type": "rct-sub", "text": "c) Génération des priorités aux feux"},
        {"type": "prio-box", "items": [
            {"title": "Cas n° 1 : Génération de priorité par anticipation du départ de la rame (stations proches d'un carrefour) :", "body": "Lorsqu'une rame arrive en station, son arrivée est détectée ce qui déclenche un chronomètre. Lorsque ce chronomètre indique un temps égal à un temps de référence, une priorité stable est générée au carrefour suivant directement la station, puis le chronomètre est remis à zéro.", "lead": "Le conducteur doit commencer à s'avancer après la fermeture des portes car le temps de référence est calculé en permanence sur l'historique des cinq derniers arrêts."},
            {"title": "Cas n° 2 : Génération de priorité par départ de la rame de la station :", "body": "Une rame quitte la station : à une certaine distance du carrefour suivant, par détection de la rame, une priorité stable est générée pour ce carrefour. Le déclenchement de la phase tramway est déterminé à l'optimum des conditions de confort et de sécurité.", "lead": "Le conducteur doit quitter la station, et adapter sa conduite en fonction de la programmation du carrefour."},
        ]},
    ]


def blocks_s23():
    return [
        ps(28),
        {"type": "rct-section", "text": "2.3 - CONSIGNES EN CAS DE PANNE DE LA SIGNALISATION LUMINEUSE ROUTIERE"},
        {"type": "boxed", "blocks": [
            {"type": "arrow-p", "parts": [{"t": "En cas de non fonctionnement du feu de type R 17, le conducteur doit :"}]},
            {"type": "consigne-red", "text": "Appeler le PCC."},
            {"type": "arrow-p", "parts": [{"t": "S'il est autorisé par le PCC à franchir le carrefour, avec les trois feux au noir, ou avec le disque central clignotant, le conducteur doit :"}]},
            {"type": "consigne-steps", "items": [
                "1. Se conformer au code de la route : priorité à droite.",
                "2. Actionner le gong et les feux de détresse.",
                "3. Franchir le carrefour à vitesse limitée : 10 Km/h.",
            ]},
            {"type": "arrow-p", "parts": [{"t": "Le passage d'un signal fermé (barre bloquée à l'horizontale) ne peut être autorisé par le PCC qu'en présence d'agents TaM, ou d'agents de Police sur le carrefour."}]},
            {"type": "routier-except", "lines": [
                {"parts": [
                    {"t": "Les seules exceptions à cette règle impérative sont les configurations de carrefour simples ne présentant pas de risque en cas de franchissement à vitesse réduite. "},
                    {"t": "Le PCC peut dans ce cas donner l'autorisation de franchissement, celui-ci restant à la libre appréciation du conducteur.", "bold": True},
                ]},
                {"text": "Exemple : cas de voies à sens unique, non traversantes après la plate-forme.", "italic": True},
            ]},
        ]},
    ]


def blocks_s24():
    return [
        ps(29),
        {"type": "rct-section", "text": "2.4 - ZONES SPECIFIQUES"},
        {"type": "anchor", "id": "s-2-4-1"},
        {"type": "rct-section", "text": "2.4.1 - LE CAS PARTICULIER DE LA ZONE GARE"},
        {"type": "p", "parts": [
            {"t": "Sur la zone Gare, le principe de conduite est la marche à vue "},
            {"t": "à vitesse limitée 10 Km/h", "red": True},
            {"t": ", avec priorité systématique à la rame "},
            {"t": "venant de droite", "red": True},
            {"t": ". Les consignes suivantes sont à respecter point par point, y compris en l'absence d'autres rames sur la zone :"},
        ]},
        {"type": "zone-table", "items": [
            {"n": "1", "nColor": "purple", "parts": [
                {"t": "Je m'arrête à l'INDES (Indicateur de Destination) qui est en position d'attente = "},
                {"t": "AT", "red": True},
            ]},
            {"n": "2", "nColor": "blue", "text": "Je sélectionne ma destination en actionnant ma télécommande d'aiguille : Gauche / Tout Droit / Droite."},
            {"n": "3", "nColor": "purple", "parts": [
                {"t": "Je vérifie que le feu vert de destination qui s'est allumé correspond bien à l'itinéraire commandé (exemple : "},
                {"t": "PL", "green": True},
                {"t": " pour Pont de Lattes, "},
                {"t": "voir liste des codes page suivante", "italic": True},
                {"t": "). ATTENTION : en cas d'allumage simultané de deux feux verts ou d'un feu vert et d'un feu rouge = anomalie, j'appelle le PCC et je me conforme à ses instructions. Si le feu rouge supérieur indique "},
                {"t": "XX", "red": True},
                {"t": " = aiguille dé-contrôlée, j'appelle le PCC et je me conforme à ses instructions."},
            ]},
            {"n": "4", "nColor": "blue", "parts": [
                {"t": "Je m'engage, en respectant la vitesse limite de "},
                {"t": "10 Km/h", "red": True},
                {"t": " sur toute la zone, et en contrôlant au fur et à mesure "},
                {"t": "la bonne position des aiguilles", "underline": True},
                {"t": " par rapport à la destination choisie."},
            ]},
            {"n": "5a", "nColor": "purple", "parts": [
                {"t": "En présence d'une rame arrivant sur ma droite, ", "italic": True},
                {"t": "Je m'arrête", "bold": True},
                {"t": " au PLP (Point Limite de Priorité — "},
                {"t": "voir photo page suivante", "italic": True},
                {"t": ")."},
            ]},
            {"n": "5b", "nColor": "blue", "parts": [
                {"t": "En présence d'une rame arrivant sur ma gauche, mais ayant dépassé son PLG (Point Limite de Gabarit ", "italic": True},
                {"t": "voir photo page suivante", "italic": True},
                {"t": "). ", "italic": True},
                {"t": "Je m'arrête", "bold": True},
                {"t": " pour la laisser passer."},
            ], "extra": [
                {"parts": [
                    {"t": "ATTENTION, PRUDENCE :", "bold": True, "red": True},
                    {"t": " je m'arrête même si la rame venant sur ma gauche (ici, la rame en vert) peut soit continuer tout droit, soit me couper la route en tournant à gauche. "},
                    {"t": "Si elle continue tout droit,", "italic": True},
                    {"t": " j'attends avant de redémarrer qu'elle ait passé l'aiguille avec le premier bogie"},
                ]},
            ]},
        ]},
        {"type": "warning", "tone": "red", "parts": [{"t": "Si vous programmez une destination différente de la destination habituelle de la ligne, actionnez les feux de détresse pour alerter les autres conducteurs !", "red": True, "bold": True}]},
        ps(30, "Page 30/76 — Codes Gare et organigramme croisements"),
        codes_gare(),
        {"type": "rct-section", "text": "ZONES SPECIFIQUES GARE et ALBERT 1er - GESTION DES CROISEMENTS ENTRE RAMES"},
        {"type": "figure-placeholder", "text": "Organigramme ENGAGEMENT DESTINATION / REPRISE DESTINATION — image à intégrer"},
        ps(31),
        {"type": "rct-section", "text": "2.4.2 - LE CAS PARTICULIER DE LA ZONE ALBERT 1er"},
        {"type": "note-red", "text": "-zone modifiée à compter du 02/07/2016-"},
        {"type": "p", "parts": [
            {"t": "Sur la zone Albert 1er, comme sur la zone Gare, le principe de conduite est la marche à vue "},
            {"t": "à vitesse limitée 10 Km/h", "red": True},
            {"t": " à partir du TIV \"10\", avec priorité systématique à la rame "},
            {"t": "venant de droite", "red": True},
            {"t": ". Les mêmes consignes de franchissement de la zone s'appliquent et sont à respecter point par point ("},
            {"t": "art. 2.4.1 : points 1-2-3-4-5a-5b", "blue": True},
            {"t": "), y compris en l'absence d'autres rames sur la zone."},
        ]},
        codes_zone_matrix([
            codes_dest_row("SC", "Direction Albert 1er - St Eloi"),
            codes_dest_row("H4", "Direction Henri IV - Peyrou"),
            codes_dest_row("LB", "Direction Louis Blanc - Corum"),
            None,
            codes_dest_row("XX", "Arrêt absolu", "red"),
            codes_dest_row("AT", None, "red", [{"t": "En attente = "}, {"t": "Arrêt", "red": True}]),
        ], plg_count=3),
        p("ZONE ALBERT 1er — PHASE 2 — Ligne 4 définitive (voir scan — plan de zone)."),
        ps(32),
        {"type": "rct-section", "text": "2.4.3 - LE CAS PARTICULIER DE LA ZONE CORUM"},
        {"type": "note-red", "text": "-zone modifiée à compter du 21/08/2017-"},
        {"type": "p", "parts": [
            {"t": "Sur la zone CORUM, comme sur la zone Gare, le principe de conduite est la marche à vue "},
            {"t": "à vitesse limitée 10 Km/h", "red": True},
            {"t": " à partir du TIV \"10\", avec priorité systématique à la rame "},
            {"t": "venant de droite", "red": True},
            {"t": ". Les mêmes consignes de franchissement de la zone s'appliquent et sont à respecter point par point ("},
            {"t": "art. 2.4.1 : points 1-2-3-4-5a-5b", "blue": True},
            {"t": "), y compris en l'absence d'autres rames sur la zone."},
        ]},
        codes_zone_matrix([
            codes_dest_row("AU", "Direction Les Aubes"),
            codes_dest_row("CO", "Direction Comédie"),
            codes_dest_row("LB", "Direction Louis Blanc"),
            codes_dest_row("SA", "Direction Sablassou"),
            None,
            codes_dest_row("XX", "Arrêt absolu", "red"),
            codes_dest_row("AT", None, "red", [{"t": "En attente = "}, {"t": "Arrêt", "red": True}]),
        ]),
        p("La position d'attente avant le quai Corum L1V2 est utilisée pour libérer le plus tôt possible le croisement entre les lignes 1,2 et 4, mais ne peut en aucun cas être utilisée pour l'échange voyageur car la configuration du quai, pour partie en courbe, ne le permet pas sur l'intégralité de la longueur de la rame."),
        p("En provenance de la station Les Aubes et à destination de la station Corum L1V2 (dans le cas d'une déviation L.1), les rames d'une longueur égale ou supérieure à 40 mètres sont soumises à une temporisation d'accès via la signalisation ferroviaire, de manière à garantir l'accès à la station sans arrêt intermédiaire, afin de ne pas engager le carrefour avec l'avenue de Nîmes. Sur le même trajet, un panneau d'espacement est à respecter en cas d'arrivée simultanée de deux rames, pour garantir la bonne détection de la longueur de la première rame : la deuxième rame doit se positionner en amont de ce panneau."),
        p("Pour la même raison, une rame en provenance de la station Comédie (L1V2) peut voir sa commande d'itinéraire temporisée, pour ne pas interférer sur la circulation d'une rame égale ou supérieure à 40m en provenance de la station Les Aubes vers Corum L1V2."),
        p("(voir scan — plan zone Corum)"),
    ]


def blocks_s25():
    return [
        ps(33),
        {"type": "rct-section", "text": "2.5 - PANNEAUX FIXES DE SIGNALISATION"},
        {"type": "anchor", "id": "s-2-5-a"},
        {"type": "rct-sub", "text": "A - Vitesse autorisée :"},
        {"type": "arrow-p", "parts": [
            {"t": "Les "},
            {"t": "TIV", "bold": True},
            {"t": ", panneaux de limitation de vitesse -fond jaune, lettres noires- sont situés à hauteur de la ligne aérienne et indiquent la valeur de vitesse maximale à ne pas dépasser sur la section suivante."},
        ]},
        {"type": "rct-lead", "text": "Les conducteurs sont tenus :"},
        {"type": "tenus-list", "items": [
            {"n": "1", "color": "purple", "text": "De respecter les limitations de vitesse affichées en ligne et sur les différentes zones de manœuvres (signalisation fixe à lettres noires sur fond jaune, posée sur la ligne aérienne)."},
            {"n": "2", "color": "blue", "parts": [
                {"t": "De respecter les vitesses de consigne spécifiques, prévues pour chaque type de situation (voir "},
                {"t": "tableau des vitesses", "bold": True, "underline": True},
                {"t": " page suivante)."},
            ]},
            {"n": "3", "color": "sky", "text": "D'être particulièrement vigilants à l'approche des carrefours routiers : la vitesse maximum de franchissement est de 40 Km/h. Elle peut être inférieure si une limitation de vitesse spécifique est affichée en amont du carrefour."},
            {"n": "4", "color": "teal", "text": "D'adapter sa vitesse en fonction de l'environnement : Exemple : le rail glissant, piétons aux abords de la voie."},
        ]},
        {"type": "ul", "items": [
            "La consigne de vitesse pour le franchissement des appareils de voie varie selon la position de l'aiguille.",
            "En cas de défaut sur le matériel roulant, une consigne de vitesse spécifique à chaque mode dégradé doit être respectée (isolation des freins ou d'un bogie, secours traction, remorquage/poussage).",
            "La vitesse peut être limitée ponctuellement en cas de présence de travaux aux abords ou sur la voie, par signalisation de chantier (panneaux et signalisation lumineuse).",
            "Les consignes de vitesse inférieures données par le PCC, la Police ou les agents de maîtrises de TaM prévalent sur les limitations préétablies.",
        ]},
        {"type": "warning", "parts": [
            {"t": "Rappel", "bold": True},
            {"t": " : une consigne spécifique de vitesse maximale de "},
            {"t": "10 Km/h", "red": True, "bold": True},
            {"t": " s'applique sur les "},
            {"t": "zones spécifiques : Gare St Roch, Albert 1er et Corum", "bold": True},
            {"t": " (voir partie 2.4) pour sécuriser le croisement des rames en circulation."},
        ]},
        ps(34),
        {"type": "rct-section", "text": "TABLEAU DES LIMITATIONS DE VITESSE"},
        {"type": "vitesse-table", "speeds": VITESSE_SPEEDS, "rows": VITESSE_ROWS},
        ps(35),
        {"type": "anchor", "id": "s-2-5-b"},
        {"type": "rct-sub", "text": "B - Zones de Télécommande :"},
        {"type": "p", "parts": [
            {"t": "Pour changer de direction, en dehors des zones de commande automatique de l'itinéraire, et en dehors de la zone Gare, le conducteur doit actionner la télécommande d'aiguille sur "},
            {"t": "la zone définie par le panneau jaune de début et de fin de télécommande.", "bold": True},
        ]},
        {"type": "hand-p", "text": "La télécommande par le conducteur est possible par IMPULSION sur les BP gauche, droit ou tout droit. La télécommande ne sera effective que lorsque les trois voyants (gauche et droite) seront allumés simultanément, c'est-à-dire au passage de la rame sur la boucle de télécommande."},
        p("Un panneau comportant des inscriptions noires sur fond jaune, indique au conducteur la limite de la zone de télécommande d'un itinéraire, hors zone dépôt."),
        p("L'action de télécommande est vérifiable sur le boîtier de secours :"),
        {"type": "signal-table", "rows": [
            {"lead": "Voyant rouge :", "sub": "télécommande impossible.", "color": "red"},
            {"lead": "Voyant jaune clignotant :", "sub": "l'action a été prise en compte, avec temporisation.", "color": "yellow", "blink": True},
            {"lead": "Voyant jaune fixe :", "sub": "la télécommande est active et l'itinéraire enclenché.", "color": "yellow"},
        ]},
        {"type": "arrow-p", "arrow": "large", "parts": [
            {"t": "Une seule action de commande", "bold": True},
            {"t": " de son itinéraire doit être réalisée. "},
            {"t": "En cas de non fonctionnement de la télécommande, il faut utiliser le boîtier de secours au sol (BS), soit physiquement avec utilisation de la clé de commande (", "italic": True},
            {"t": "et présence de la rame sur le circuit de voie", "bold": True, "italic": True},
            {"t": "), soit via le DTS pour les rames équipées (", "italic": True},
            {"t": "une seule action là-aussi !", "bold": True, "italic": True},
            {"t": ").", "italic": True},
        ]},
        p("Appel du PCC depuis la rame si l'action n'a pas immédiatement été suivie d'effet."),
        {"type": "warning", "icon": True, "parts": [{"t": "Il est strictement interdit de :", "red": True, "bold": True, "underline": True}], "bulletStyle": "arrow", "bullets": [
            "Modifier la position d'un appareil de voie sans l'autorisation du PCC, sauf si ce changement s'intègre dans une manœuvre prévue.",
            "Modifier la position d'un appareil de voie sur lequel un tramway est engagé.",
        ]},
        ps(36),
        {"type": "arrow-p", "parts": [{"t": "Mode dégradé manuel :", "bold": True, "underline": True}]},
        p("Sur demande ou autorisation du PCC, le conducteur peut être amené à modifier la position d'un appareil de voie à l'aide du sabre d'aiguillage."),
        {"type": "hand-p", "parts": [
            {"t": "Toute intervention manuelle", "bold": True},
            {"t": " sur un appareil de voie motorisé doit être précédée d'une "},
            {"t": "condamnation de l'alimentation", "bold": True},
            {"t": " par l'ouverture du trappon avant l'introduction du sabre."},
        ]},
        {"type": "hand-p", "parts": [
            {"t": "Après la manœuvre manuelle d'un appareil de voie, il faut vérifier la bonne application de la lame d'aiguille contre le rail (si ce n'est pas le cas, vérifier la présence éventuelle d'un corps étranger).", "bold": True},
        ]},
        {"type": "warning", "icon": True, "lines": [
            {"text": "Pour enlever un corps étranger d'un aiguillage motorisé :", "bold": True},
            {"parts": [
                {"t": "1. ", "red": True},
                {"t": "Mettre le sabre d'aiguillage", "red": True, "bold": True, "underline": True},
                {"t": " de façon à isoler le moteur.", "red": True},
            ]},
            {"parts": [
                {"t": "2. ", "red": True},
                {"t": "Mettre une cale", "red": True, "bold": True, "underline": True},
                {"t": " entre la lame et le rail pour éviter toute commande intempestive de l'aiguille susceptible de provoquer un accident.", "red": True},
            ]},
        ]},
        {"type": "anchor", "id": "s-2-5-c"},
        {"type": "rct-sub", "text": "C - Clou de positionnement :"},
        {"type": "arrow-p", "parts": [
            {"t": "Le clou inox fixé au sol sur le quai, à droite, matérialise le "},
            {"t": "point d'arrêt en station", "bold": True},
            {"t": ", le conducteur devant s'aligner sur ce clou à hauteur d'épaule."},
        ]},
        p("Les clous permettent également de voir :"),
        {"type": "ul", "items": [
            "- les limites de zone de manœuvres",
            {"text": "ou", "bold": True},
            "- les limites d'arrêt, avant d'entamer un retournement ou un rebroussement",
        ]},
        {"type": "p", "parts": [{"t": "(voir chap. 3.2, partie E1)", "blue": True, "italic": True}]},
        p("Ce repère est positionné en prenant en compte les rames les plus longues (type 402). Il est à respecter pour tous les types de rame indépendamment de la longueur de la rame, les rames les plus courtes (type 302) devant marquer l'arrêt en tête de quai."),
        {"type": "note-red", "text": "En cas de quai double, il est impératif que la rame respecte cette consigne"},
        {"type": "anchor", "id": "s-2-5-d"},
        {"type": "rct-sub", "text": "D - Panneaux Limite de Manœuvre :"},
        {"type": "arrow-p", "parts": [
            {"t": "Ce carré noir matérialise la fin d'une zone de retournement, sur les zones de manœuvre à commande d'aiguille manuelle.", "blue": True},
            {"t": " L'arrêt de la rame "},
            {"t": "ne doit pas se faire avant ce panneau", "bold": True},
            {"t": ", afin de garantir le dégagement complet de l'aiguille par le dernier bogie !"},
        ]},
    ]


def blocks_s26():
    return [
        ps(37),
        {"type": "rct-section", "text": "2.6 - PANNEAUX TEMPORAIRES"},
        {"type": "anchor", "id": "s-2-6-a"},
        {"type": "rct-sub", "text": "A - Panneaux de chantier :"},
        {"type": "arrow-p", "tone": "blue", "parts": [{"t": "La signalisation de chantier est une signalisation provisoire. Elle protège les ouvriers effectuant des travaux sur la voie ou à proximité de la voie. De part et d'autre du chantier, à 100 m avant et après la zone de travaux, sont disposées des lampes flash, soient seules, soit complétées par des panneaux de limitation et de reprise de vitesse."}]},
        {"type": "p", "parts": [
            {"t": "Les panneaux indiquent soit la limitation de vitesse à respecter ("},
            {"t": "chiffre rouge", "red": True},
            {"t": "), soit la limite à partir de laquelle la reprise ("},
            {"t": "lettre R", "red": True},
            {"t": ") de la vitesse normale est autorisée."},
        ]},
        p("Placée dans l'entre voie, la lampe flash indique la présence d'agents effectuant des travaux sur ou à proximité de la voie, et impose une limitation de vitesse définie."),
        {"type": "hand-ul", "items": [
            {"parts": [
                {"t": "Dans le cas où ces panneaux seraient disposés sur une zone de manœuvre avec des "},
                {"t": "aiguillages motorisés", "bold": True},
                {"t": " les conducteurs doivent être particulièrement vigilants sur la position des aiguillages, et sur la cohérence des signaux de manœuvres."},
            ]},
            {"parts": [
                {"t": "Lampe allumée ou éteinte :", "bold": True},
                {"t": " respecter la limitation de vitesse indiquée sur les panneaux, actionner le gong si des ouvriers sont à proximité !"},
            ]},
        ]},
        {"type": "arrow-p", "tone": "blue", "emphasis": True, "parts": [
            {"t": "La plus grande prudence est demandée aux conducteurs. Ils doivent s'assurer que les ouvriers ont bien vu l'arrivée de la rame et qu'il n'y a pas d'objets sur la voie.", "blue": True, "bold": True},
        ]},
        {"type": "anchor", "id": "s-2-6-b"},
        {"type": "rct-sub", "text": "B - Panneaux d'Arrêt absolu"},
        {"type": "p", "parts": [
            {"t": "Il s'agit de panneaux d'interdiction. Ils sont placés en ligne pour délimiter une zone dont le "},
            {"t": "franchissement est interdit : ", "red": True},
            {"t": "Arrêt absolu", "red": True, "underline": True},
        ]},
        {"type": "arrow-ul", "items": [
            {"text": "Mention d'arrêt obligatoire", "bold": True},
            {"text": "Panneau rouge sans mention particulière", "bold": True},
        ]},
    ]


SECTIONS = [
    {"id": "p20", "level": 1, "code": "2", "page": 20, "title": "Sommaire — chapitre 2", "blocks": sommaire_ch2_blocks()},
    {"id": "s-2-1", "level": 2, "code": "2.1", "page": 21, "title": "FRANCHISSEMENT DES APPAREILS DE VOIE", "blocks": blocks_s21()},
    {"id": "s-2-2", "level": 2, "code": "2.2", "page": 22, "title": "SIGNALISATION LUMINEUSE", "blocks": blocks_s22()},
    {"id": "s-2-3", "level": 2, "code": "2.3", "page": 28, "title": "CONSIGNES PANNE SIGNALISATION LUMINEUSE", "blocks": blocks_s23()},
    {"id": "s-2-4", "level": 2, "code": "2.4", "page": 29, "title": "ZONES SPECIFIQUES", "blocks": blocks_s24()},
    {"id": "s-2-5", "level": 2, "code": "2.5", "page": 33, "title": "PANNEAUX FIXES DE SIGNALISATION", "blocks": blocks_s25()},
    {"id": "s-2-6", "level": 2, "code": "2.6", "page": 37, "title": "PANNEAUX TEMPORAIRES", "blocks": blocks_s26()},
]

TOC = [
    {"id": "p20", "level": 1, "code": "2", "page": 20, "title": "Sommaire — chapitre 2"},
    {"id": "s-2-1", "level": 2, "code": "2.1", "page": 21, "title": "FRANCHISSEMENT DES APPAREILS DE VOIE"},
    {"id": "s-2-2", "level": 2, "code": "2.2", "page": 22, "title": "SIGNALISATION LUMINEUSE"},
    *[{"id": a[0], "level": 3, "code": a[1].split(" - ")[0], "page": None, "title": a[1].split(" - ", 1)[1], "anchorOnly": True, "parentId": "s-2-2"} for a in ANCHORS_22],
    {"id": "s-2-3", "level": 2, "code": "2.3", "page": 28, "title": "CONSIGNES EN CAS DE PANNE DE LA SIGNALISATION LUMINEUSE"},
    {"id": "s-2-4", "level": 2, "code": "2.4", "page": 29, "title": "ZONES SPECIFIQUES"},
    {"id": "s-2-4-1", "level": 3, "code": "2.4.1", "page": 29, "title": "Zone Gare", "anchorOnly": True, "parentId": "s-2-4"},
    {"id": "s-2-4-2", "level": 3, "code": "2.4.2", "page": 31, "title": "Zone Albert 1er", "anchorOnly": True, "parentId": "s-2-4"},
    {"id": "s-2-4-3", "level": 3, "code": "2.4.3", "page": 32, "title": "Zone Corum", "anchorOnly": True, "parentId": "s-2-4"},
    {"id": "s-2-5", "level": 2, "code": "2.5", "page": 33, "title": "PANNEAUX FIXES DE SIGNALISATION"},
    {"id": "s-2-5-a", "level": 3, "code": "A", "page": None, "title": "Vitesse autorisée", "anchorOnly": True, "parentId": "s-2-5"},
    {"id": "s-2-5-b", "level": 3, "code": "B", "page": 35, "title": "Zones de télécommande", "anchorOnly": True, "parentId": "s-2-5"},
    {"id": "s-2-5-c", "level": 3, "code": "C", "page": 36, "title": "Clou de positionnement", "anchorOnly": True, "parentId": "s-2-5"},
    {"id": "s-2-5-d", "level": 3, "code": "D", "page": 36, "title": "Panneaux Limite de manœuvre", "anchorOnly": True, "parentId": "s-2-5"},
    {"id": "s-2-6", "level": 2, "code": "2.6", "page": 37, "title": "PANNEAUX TEMPORAIRES"},
    {"id": "s-2-6-a", "level": 3, "code": "A", "page": None, "title": "Panneaux de chantier", "anchorOnly": True, "parentId": "s-2-6"},
    {"id": "s-2-6-b", "level": 3, "code": "B", "page": None, "title": "Panneaux d'Arrêt absolu", "anchorOnly": True, "parentId": "s-2-6"},
]

# Add anchors to s-2-4 for subzones
for sec in SECTIONS:
    if sec["id"] == "s-2-4":
        bl = sec["blocks"]
        idx = next(i for i, b in enumerate(bl) if b.get("text", "").startswith("2.4.1"))
        bl.insert(idx, {"type": "anchor", "id": "s-2-4-1"})
        idx2 = next(i for i, b in enumerate(bl) if b.get("text", "").startswith("2.4.2"))
        bl.insert(idx2, {"type": "anchor", "id": "s-2-4-2"})
        idx3 = next(i for i, b in enumerate(bl) if b.get("text", "").startswith("2.4.3"))
        bl.insert(idx3, {"type": "anchor", "id": "s-2-4-3"})

OUT.write_text(
    "/**\n * RCT EXP-CSG-01-17 — chapitre 2 (pages 20–37).\n"
    " * Texte retranscrit depuis les scans RCT (docs/rct-img/00X.jpg)\n */\n\n"
    f"export const RCT_LECTURE_CH2_SECTIONS = {json.dumps(SECTIONS, ensure_ascii=False, indent=2)};\n\n"
    f"export const RCT_LECTURE_CH2_TOC = {json.dumps(TOC, ensure_ascii=False, indent=2)};\n",
    encoding="utf-8",
)
print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")
