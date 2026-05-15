# Évolutions prévues — Révision CET

Document de référence pour la suite du développement.  
**État actuel (v1)** : quiz texte par module, 4 axes, chapitre Signalisation partiellement rempli.

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

## Enrichissement contenu (priorité actuelle)

1. **Compléter** INDIR, SM, SA, SMA (définitions, recoupements, pièges).
2. **Ajouter** tous les sous-modules signalisation du CET (sommaire p. 20).
3. Puis axes Matériel, Circulation, Urgence module par module.

Types de questions utiles :
- « Que signifie [sigle] ? »
- « Que faites-vous si… ? »
- Vitesses, appels PCC, distinctions entre signaux proches (SA vs SMA, INDIR vs INDES).

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

## Répétition espacée (mémorisation long terme)

Intervalles envisagés après une bonne réponse (ou une session réussie) :

`1 h → 3 h → 6 h → 12 h → 24 h → 3 j → 7 j → 30 j`

- Stockage par **question** (ou par carte) : prochaine échéance, historique bon / raté.
- Module à 100 % : rappels plus espacés, pas suppression définitive.

---

## Mode « test général » (sac général)

- Pool = **toutes** les questions de tous les modules disponibles.
- Au lancement : choix du nombre de questions (**50 / 100 / 150 / 200** selon taille du pool).
- Tirage **aléatoire** avec **mémoire** :
  - Prioriser les questions **ratées** à la session précédente.
  - Compléter avec des questions jamais ou peu vues.
  - Éviter de reprendre les 50 mêmes à chaque fois si le pool est grand.
- Chaque question affiche son **origine** (ex. « SMA · p. 24 »).

---

## Réinitialisation

- **Reset par petit sac** (un module) : efface progression locale de ce module.
- **Reset global** : option séparée, avec confirmation.
- Le reset module ne supprime pas obligatoirement l’historique du mode général (à préciser à l’implémentation).

---

## Données à persister (localStorage ou équivalent)

Par question / module :
- Meilleur score, dernière session.
- Liste des questions ratées.
- Échéance de rappel (répétition espacée).
- Historique des tirages en mode général.

---

## Déploiement

- Hébergement **GitHub Pages** — dossier `/docs`.
- PWA optionnelle plus tard (icône, hors-ligne).

---

## Notes

- Pas d’images en v1 : questions texte uniquement (photos du CET peu exploitables en auto).
- Contenu = **CET TaM EXP-CSG-01-17** ; outil d’entraînement personnel, pas substitut à la formation officielle.
