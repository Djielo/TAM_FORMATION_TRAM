# Évolutions prévues — Révision CET

Document de référence pour la suite du développement.

**État actuel (données)** : 4 chapitres CET couverts dans `data-cet-ch1.js` … `ch4.js` — **88 modules**, **404 questions** QCM (choix multiples + correction).

**Prochaine étape (interface)** : onglets Révision (QCM par module) / Pré-examen (cartes **par chapitre** + SRS) / Examen final (cartes **tous chapitres** + note), déverrouillage progressif — voir ci-dessous.

---

## Modèle « sacs » (conteneurs de questions)

```
Sac général (toutes questions, mélangées)
├── Sac 1 — Utilisation du matériel roulant (CET p. 3–19)
│   └── petits sacs par sous-thème (à définir)
├── Sac 2 — Respect de la signalisation (p. 20–37)
│   ├── INDIR
│   ├── INDES
│   ├── SM, SA, SMA
│   ├── Feux blancs, lampe flash, tension
│   ├── Traversée routière R17
│   ├── Panne signalisation / TIV…
│   └── …
├── Sac 3 — Circulation en ligne (p. 38–58)
└── Sac 4 — Consignes d'urgence (p. 59–75)
```

Chaque **petit sac** = un module de l’app (`id` dans `data.js`).  
Chaque question garde une **étiquette** (module + axe) pour l’affichage en mode général.

---

## Enrichissement contenu

Contenu CET ch. 1–4 : **fait** (voir `data.js` + fichiers par chapitre).  
Évolutions ponctuelles possibles si retour terrain (formateurs / conducteurs).

---

## Maîtrise par module (exemple utilisateur)

| Module | Score | Interprétation suggérée |
|--------|-------|-------------------------|
| INDIR | 6/6 (100 %) | Module **maîtrisé** — moins prioritaire en révision immédiate |
| SM | 2/3 | À **repasser** |
| SA | 2/3 | À **repasser** |
| SMA | 4/5 | Une question à revoir |

**Comportement souhaité (à coder plus tard)** :
- À **100 %** sur un module : ne pas le forcer en révision quotidienne, mais **ne pas l’oublier** (rappels espacés).
- Le mode **général** peut quand même inclure ces questions, avec fréquence réduite.

---

## Interface — en-tête et onglets

**En-tête fixe**
- Titre : **CET**
- Sous-titre : **Consignes d'exploitation TaM** (orthographe TaM du projet)

**Onglets** (barre sous l'en-tête) — **trois modes distincts** :

| Onglet | Format | Périmètre | Rôle |
|--------|--------|----------|------|
| **Révision** | **QCM** (4 choix + correction immédiate) | Par chapitre → **module** | Apprendre et valider ; score **par module** (ex. 4/5). |
| **Pré-examen** | **Cartes recto-verso** | **Un chapitre** à la fois (+ nombre de questions) | Mémorisation active ; **SRS** via « Je maîtrise » / « À revoir ». |
| **Examen final** | **Cartes recto-verso** (même UX que Pré-examen) | **Tous chapitres** confondus (pool global 404) | Évaluation globale honnête ; **note** finale (vert / orange / rouge), **sans SRS**. |

**Périmètre** : Révision = **module** · Pré-examen = **chapitre** (un seul) · Examen final = **l'ensemble du CET**.

### Aide contextuelle (pop-ups)

À chaque mode, une **modale explicative** (fermable, « ne plus afficher » optionnel par mode) :

| Moment | Contenu |
|--------|---------|
| **Ouverture de l'app** (onglet Révision actif par défaut) | Rôle de la Révision (QCM par module), progression, lien avec le déverrouillage Pré-examen / Examen final. |
| **Premier clic** (ou démarrage) **Pré-examen** | Chapitre, quota 25…150, session en cours vs nouvelle, SRS, **conseil de pause ≥ 5 min** entre deux sessions (quel que soit le chapitre), erreurs réparties sur plusieurs sessions si besoin. |
| **Premier clic** (ou démarrage) **Examen final** | Pool global, auto-évaluation Correct / Incorrect, note finale, pas de SRS. |

Les textes reprennent les règles ci-dessous ; les mettre à jour si la spec change.

- Seule la **Révision** utilise le QCM avec choix proposés.
- **Pré-examen** et **Examen final** : même type de carte (réflexion → retournement → réponse attendue) ; seul le **périmètre** et les **boutons** après le verso diffèrent.
- **SRS** : alimenté **uniquement** par le Pré-examen (« Je maîtrise » / « À revoir »). L'Examen final n'écrit pas dans l'échéancier SRS.

---

## Déverrouillage des onglets Pré-examen et Examen final

### Pré-examen

Onglet actif lorsque :

> **Chaque question** du pool (404) a été **vue** en Révision (QCM) **et** **répondue correctement au moins une fois** (`questionId` / `everCorrect`).

- Distinct du « Meilleur : 4/5 » par module.
- Indicateur : « 312 / 404 questions validées ».

### Examen final (en plus du pré-examen)

Onglet actif lorsque **les deux** conditions sont remplies :

1. Révision **404/404** (ci-dessus).
2. **Pré-examen** : pour **chaque chapitre** (1 à 4), au moins une session **terminée** avec **≥ 80 %** de cartes marquées **« Je maîtrise »** (meilleur score conservé par chapitre).

- Aligné sur le seuil de réussite de l'examen final (80 %).
- Affichage par chapitre : « Meilleur : 65 % / 80 % requis » jusqu'à validation.

### Test local (formateurs)

- URL : `?dev=1` sur **localhost** — déverrouille tout pour essayer l'examen final sans parcours complet.
- Ou : `localStorage.setItem('tam-cet-dev-unlock-v1', '1')` dans la console du navigateur.

---

## Affichage carte (Pré-examen et Examen final)

**Recto** — hiérarchie visuelle :
1. **En-tête** : titre du **chapitre** (ex. « Respect de la signalisation ») — élément principal.
2. **Énoncé** de la question (sans les 4 choix QCM).
3. **Sous l'énoncé**, en second plan : code module entre parenthèses, ex. `(voir ch. 2.2-A)` — champ `code` du module dans `data.js`, pas en titre.

**Verso** : bonne réponse (texte du choix correct) + explication (`explanation`).

---

## Mode Pré-examen — cartes recto / verso

**Par chapitre** (un seul chapitre par session). Tailles des pools (données actuelles) :

| Chapitre | Questions |
|----------|-----------|
| 1 Matériel | 100 |
| 2 Signalisation | 141 |
| 3 Circulation | 100 |
| 4 Urgence | 63 |

Ne pas proposer « tout le chapitre d'un coup » : sessions **découpées**, pilotées par le SRS et par un **quota par session** choisi par la personne.

### Démarrage ou reprise

1. Choisir le **chapitre**.
2. Choisir le **nombre de questions de la session** : **25 · 50 · 75 · 100 · 125 · 150** (pas de 20/30/40 — **tranches de 25**). Options **> taille du chapitre** masquées ou désactivées (ex. ch. 4 : max **63**).
3. **Pré-sélection mémorisée** par chapitre (`localStorage`), modifiable.
4. **Court texte d'aide** à l'écran de choix : expliquer session **en cours** vs **nouvelle** (voir ci-dessous).

**Session en cours** (prioritaire à l'ouverture du chapitre)
- Si la personne a commencé une session (ex. 50 cartes) et n'en a fait que 25 : à la **prochaine visite**, **reprendre à la carte 26** — **pas** de redémarrage à 1 tant que les N cartes ne sont pas passées.
- Persistance : `chapterId`, `targetCount`, `queue` (ordre des `questionId`), `index`, réponses déjà données.

**Nouvelle session** (tirage) — uniquement si session précédente **terminée** (N/N) ou absente ; moteur exécuté **au lancement**, pas en arrière-plan.

**Composition de la file (ex. N = 50, 4 erreurs en attente)** :
1. **Dettes « À revoir »** : toutes doivent être rattrapées **à terme**, mais **pas toutes dans une seule session** si leur nombre dépasse ce qu'on peut mélanger utilement avec des **nouvelles** cartes.
2. **Par session** : inclure un **sous-ensemble** des erreurs en attente (ex. jusqu'à ~50 % de N, plafond à caler) + le reste en **cartes nouvelles / échues SRS** + cartes peu vues, pour total = N.
3. **Erreurs restantes** : reportées aux **sessions suivantes** (2ᵉ, 3ᵉ… session) jusqu'à épuisement de la file d'erreurs — objectif : **intégrer des nouvelles questions** à chaque passage, pas une session 100 % rattrapage.
4. **Exclure** (sauf échéance) : cartes **maîtrisées** non encore rééligibles (SRS + saut de sessions).
5. **Mélanger** toute la file : erreurs **disséminées** parmi les nouvelles, pas en bloc au début.

Exemple : 30 erreurs en attente, quota N = 25 → session 1 ≈ 12 erreurs + 13 nouvelles ; session 2 ≈ 18 erreurs restantes + 7 nouvelles ; etc.

**Entre deux sessions terminées** (pré-examen, **tout chapitre confondu**)
- **Conseil : pause d'au moins 5 minutes** avant de relancer une session (même chapitre **ou** autre chapitre).
- **Pas de blocage dur** : si relance &lt; 5 min → **avertissement** (mieux vaut espacer les sessions pour mémoriser ; enchaîner fatigue l'effet) avec **continuer quand même**.
- Horodatage : **global** dernière session pré-examen terminée (pas un délai par chapitre).

**Reprise** d'une session interrompue : pas de nouveau tirage, **pas** d'avertissement 5 min — on continue la file en cours.

Pendant la session : **« Je maîtrise »** / **« À revoir »** met à jour le SRS **immédiatement** ; la file suivante est construite à la **prochaine nouvelle session**.

**Lien avec la Révision**
- Même banque `questionId` : Révision → `seen` / `everCorrect` (déverrouillage) ; Pré-examen → **SRS** en plus.

---

## Répétition espacée (SRS — spaced repetition)

Objectif : ancrage sur **~6 semaines** — erreurs rattrapées **sur plusieurs sessions**, succès espacés dans le temps **et** par numéro de session.

### Échelle d'intervalles (cible métier)

Échelle de référence (indicative) : **1 · 2 · 3 · 5 · 10 · 15 · 30 min → 1 h → 3 h → 6 h → 12 h → 24 h → 3 j → 5 j → 7 j → 10 j → 15 j** après succès répétés (**« Je maîtrise »**).

**Implémentation pragmatique** :
- Une session de 25 cartes dure **bien plus d'une minute** : les premiers paliers (minutes) sont en pratique souvent **déjà dépassés** quand la personne revient — cohérent avec le **conseil 5 min** entre sessions.
- On peut regrouper les paliers proches en implémentation (ex. ~10 paliers effectifs) tant que la **montée** vers jours / semaines est respectée.
- Aux **paliers longs** (jours), le temps calendaire prime : moins de sessions nécessaires, le SRS « rattrape » naturellement l'espacement.

Palier **0** = **« À revoir »** ou nouvel échec après maîtrise → remise à zéro, file d'erreurs (répartition multi-sessions si besoin).

Règles :
- **« Je maîtrise »** : palier +1 → `nextReviewAt = now + délai[palier]` + **saut de sessions** (pas à la session suivante immédiate ; écarts plus grands aux paliers hauts).
- **« À revoir »** : palier 0, priorité dans les prochaines sessions (sous-ensemble par session, voir ci-dessus).
- **Nouvel échec** après maîtrise : palier 0.

Stockage par `questionId` : `intervalIndex`, `nextReviewAt`, `sessionsUntilEligible`, `pendingReview`, file d'erreurs globale au chapitre.

Le **conseil 5 min entre sessions** (pré-examen, **global**) est un **garde-fou UX**, complémentaire du SRS — pas un doublon exact du palier « 5 min ».

---

## Mode Examen final — cartes recto / verso (pool global)

**Seul mode** où le tirage couvre **tous les modules** (404 questions, tous chapitres mélangés). Même **méthodologie carte** que le Pré-examen ; **pas** de QCM (pas de choix proposés à l'écran).

**Avant la session**
- Choix du **nombre de questions** N (boutons radio, ex. 25 / 50 / 100 / 150) — **pré-sélection** mémorisée (`localStorage`), modifiable.
- Tirage **aléatoire** dans le pool global (**sans** priorité SRS).

**Déroulé d'une question**
1. **Recto** : même mise en page que Pré-examen (titre chapitre, énoncé, `(voir ch. …)` optionnel).
2. La personne réfléchit → clic → **verso** : bonne réponse + explication.
3. Elle compare mentalement avec sa réponse → boutons **« Correct »** / **« Incorrect »** (auto-évaluation **honnête** ; la note repose là-dessus).
4. **Pas** de « Je maîtrise » / « À revoir » — **pas** d'écriture SRS.
5. **Pas** de bilan intermédiaire après chaque carte : enregistrement silencieux, **question suivante** immédiatement.

**Fin de session — écran résultat**
- **Score** : X / N (ex. 42/50), pourcentage, pastille **vert / orange / rouge** (seuils ci-dessous).
- **Messages d'encouragement** : plusieurs formulations par palier (tirage aléatoire ou rotation).
- **Liste des erreurs** uniquement : pour chaque carte marquée **Incorrect**, afficher :
  - titre du **chapitre** ;
  - **énoncé** ;
  - `(voir ch. …)` si utile ;
  - **réponse attendue**.

### Seuil de réussite (80 %)

Pour une session de **N** questions (score = nombre de **Correct**) :

| Résultat | Condition (ex. N = 50) | Couleur |
|----------|-------------------------|---------|
| **Réussi** | ≥ **80 %** (≥ 40/50) | Vert |
| **Presque** | ≥ **70 %** et < 80 % (35–39/50) | Orange |
| **Insuffisant** | < **70 %** (≤ 34/50) | Rouge |

Formules : `seuilVert = ceil(0,8 × N)` · `seuilOrange = ceil(0,7 × N)`.

---

## Tirage des questions

**Pré-examen** — nouvelle session (chapitre + quota N) :
1. Sous-ensemble des dettes **« À revoir »** (quota interne, reste pour sessions suivantes).
2. Cartes **échues** SRS + cartes **nouvelles / peu vues** jusqu'à N.
3. Mélange global (erreurs disséminées).

**Examen final** : tirage aléatoire simple dans les **404** questions (**tous chapitres**), sans SRS.

---

## Réinitialisation

- **Reset par petit sac** (un module) : efface progression locale de ce module.
- **Reset global** : option séparée, avec confirmation.
- Le reset module ne supprime pas obligatoirement l’historique du mode général (à préciser à l’implémentation).

---

## Données à persister (localStorage)

Clés suggérées (à affiner à l'implémentation) :

| Clé | Contenu |
|-----|---------|
| `tam-cet-revision-v1` | Existant : scores par module (QCM Révision). |
| `tam-cet-question-mastery-v1` | Par `questionId` : `seen`, `everCorrect`, `lastCorrectAt`. |
| `tam-cet-srs-v1` | Par `questionId` : `nextReviewAt`, `intervalIndex`, stats auto-éval carte. |
| `tam-cet-pretest-prefs-v1` | Dernier quota N choisi **par chapitre** (25…150). |
| `tam-cet-pretest-active-v1` | Session **en cours** par chapitre : file, index, réponses. |
| `tam-cet-pretest-last-end-v1` | Fin de dernière session pré-examen **terminée** (avertissement 5 min **global**). |
| `tam-cet-pretest-stats-v1` | Meilleur % « Je maîtrise » par chapitre (seuil examen final 80 %). |
| `tam-cet-dev-unlock-v1` | Bypass test formateur (`1`). |
| `tam-cet-pretest-review-queue-v1` | File d'erreurs « À revoir » encore à répartir **par chapitre**. |
| `tam-cet-help-dismissed-v1` | Pop-ups d'aide déjà vues (par mode). |
| `tam-cet-final-exam-prefs-v1` | Dernier nombre de questions choisi (Examen final). |
| `tam-cet-final-exam-history-v1` | Optionnel : historique des sessions examen final. |

Déverrouillage global : `everCorrect === true` pour **toutes** les questions du pool actif (404).

---

## Déploiement

- Hébergement **GitHub Pages** — dossier `/docs`.
- PWA optionnelle plus tard (icône, hors-ligne).

---

## Notes

- Pas d’images en v1 : questions texte uniquement (photos du CET peu exploitables en auto).
- Contenu = **CET TaM EXP-CSG-01-17** ; outil d’entraînement personnel, pas substitut à la formation officielle.
