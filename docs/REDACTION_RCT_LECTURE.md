# Rédaction — consultation RCT intégrale

Document de référence pour `docs/js/data-rct-lecture.js` et `docs/js/data-rct-lecture-ch2.js`.  
**Source unique** : scans `source/images/RCT/00X.jpg` (EXP-CSG-01-17).

## Règle absolue

Reproduire **mot pour mot**, à la virgule et au point près, le texte du RCT papier.

- Pas de résumé, pas de paraphrase, pas d’« adaptation ».
- Pas de titre, séparation ou numéro de page **inventés**.
- En cas de doute : le scan fait foi.

## Structure des données

| Fichier | Rôle |
|---------|------|
| `data-rct-lecture.js` | Ch. 1 (p. 1–19) + fusion ch. 2 |
| `data-rct-lecture-ch2.js` | Ch. 2 — Respect de la signalisation (p. 20–37) |
| `RCT_LECTURE_SECTIONS` | Articles affichés (flux continu par page RCT) |
| `RCT_LECTURE_TOC` | Sommaire cliquable (y compris ancres A, B, C…) |

### Pas de doublon titre / contenu

- Le **sommaire** (`RCT_LECTURE_TOC`) sert à **naviguer** (ex. `A`, `B`, `C` sous `1.1`).
- Le **texte affiché** ne reprend le titre qu’**une seule fois**, comme sur le RCT :
  - `1.1 - PREPARATION DE LA RAME` → majuscules, souligné, pas gras
  - `A - Entrée dans la rame…` → gras + souligné
- Les entrées A–H sont des **ancres** (`type: "anchor"`) dans l’article `1.1`, pas des articles séparés.

### Pas de séparation artificielle entre sous-parties d’une même page

Sur la **page 4**, tout suit dans le même flux : intro § 1.1 → « Les différentes étapes… » → **A** (sans nouvelle page, sans barre, sans re-titre `1.1-A`).

Un scan `page-scan` n’apparaît qu’au **changement de page** RCT (005.jpg, 006.jpg…).

## Typographie RCT

| Élément | Rendu |
|---------|--------|
| `1.1`, `1.2`… (sommaire p. 3) | MAJUSCULES, souligné, **pas gras**, numéro de page à droite |
| `A`, `B`, `C`… (sommaire) | **Gras**, indenté, pas souligné |
| `1.1 - PREPARATION…` (corps) | `rct-section` : majuscules soulignées, pas gras |
| `A - Entrée…` (corps) | `rct-sub` : gras + souligné |
| Références `art. x.x` (p. 2) | Ligne suivante, **rouge** |
| Encadré jaune PCC/SAT | `warning` ; « Cf Annexe 5.1… » **dans le même encadré** (`suffix`) |
| Encadré jaune consigne impérative (ex. p. 16) | `warning` + `tone: "red"` ; annotation bleue : `lines` avec `blue: true` |
| Texte rouge / violet / bleu | `note-red`, `note-purple`, `note-blue` selon le scan |
| Parenthèse rouge **dans la même phrase** | `p` avec `parts` (pas de bloc séparé — pas de saut de ligne) |
| Note violette **dans le même point** (ex. étape 3 § 1.1-A) | `steps` avec `tail` sur l’item — pas de `note-purple` après l’étape suivante |
| Étapes numérotées (`steps`) | Texte **normal** (comme § 1.1) — **pas de gras** sur un item, sauf si le scan le montre explicitement |

## Types de blocs

- `page-scan` — image scan (référence visuelle)
- `rct-section`, `rct-sub`, `rct-lead` — titres RCT
- `p`, `ul`, `ol`, `steps` — corps de texte
- `warning` (+ `suffix` optionnel) — encadré jaune
- `version-table` — tableau p. 2 (lignes + `art.` en rouge)
- `pannes-table` — tableaux pannes § 1.8 p. 17–18 (4 colonnes A–D, vitesses en rouge)
- `page-scan` + `landscape: true` — scan paysage (p. 17–18) avec défilement horizontal
- `freinage-modes`, `sie-cycle` — listes structurées § 1.3–1.4
- `highlight`, `prep-box` — encadrés jaunes § 1.9
- `sommaire-ch1` — sommaire détaillé p. 3
- `sommaire-ch2` — sommaire chapitre 2 p. 20
- `signal-checks` — listes d’états lumineux (INDIR, SM, tension…)
- `codes-dest` — tableaux de codes destination (zone Dépôt, ligne…)
- `codes-cas` — cas particuliers Gare / Galerie (2 colonnes)
- `cas-box` — encadré « Cas particuliers » (lampe flash, sections VU…)
- `phase-list` — phases carrefour (traversée routière)
- `prio-box` — génération des priorités aux feux
- `boxed` — encadré noir § 2.3 (blocs imbriqués)
- `zone-table` — consignes zone Gare en tableau (1, 2, 3, 4, 5a, 5b — numéros colorés)
- `arrow-p` — paragraphe avec flèche (bleu ou noir, p. 26–28)
- `consigne-red` / `consigne-steps` — texte rouge centré / liste numérotée rouge (§ 2.3)
- `routier-except` — exception avec pictogramme ⚠ sans fond jaune (§ 2.3)
- `vitesse-table` — tableau limitations de vitesse p. 34 (cellules surlignées = stabilo terrain, rose + texte rouge)
- `anchor` — point d’ancrage sommaire (invisible à l’écran)

### Annotations manuscrites sur les scans

- **Ne pas retranscrire** les annotations écrites à la main sur les scans.
- **Exception optionnelle** : tableau des vitesses p. 34 — reprendre les surlignages stabilo (fond rose, vitesses / notes en rouge) via `highlight`, `highlights`, `notes`, `spanNote` dans `vitesse-table`.

## Procédure d’ajout d’une page

1. Lire le scan `source/images/RCT/XXX.jpg`.
2. Retranscrire **exactement** dans `blocks`.
3. Si nouvelle page : un seul `page-scan` au début de la zone concernée.
4. Mettre à jour `RCT_LECTURE_TOC` si nouvelle entrée de navigation.
5. Vérifier côte à côte scan + texte dans l’app.
