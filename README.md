# TAM Formation Tram — Révision Bible

Outil web de révision des consignes d'exploitation tramway (Bible TaM).

## Lancer en local

```bash
cd docs
python -m http.server 8080
```

Ouvrir [http://localhost:8080](http://localhost:8080) (idéalement sur téléphone en même réseau Wi‑Fi).

## Publier sur GitHub Pages

1. Créer un dépôt sur GitHub et y pousser la branche **`master`** (sans inclure `source/`, exclu par `.gitignore`).
2. **Settings → Pages → Build and deployment** :
   - **Source** : **Deploy from a branch** (pas GitHub Actions).
   - **Branch** : **`master`**
   - **Folder** : **`/docs`** (racine du site = contenu du dossier `docs/` du dépôt)
3. Enregistrer. Après une minute environ, l’URL apparaît en haut de **Settings → Pages** (souvent `https://<user>.github.io/<nom-du-depot>/`).

Chaque **push** sur `master` qui modifie `docs/` met à jour le site automatiquement, sans workflow.

## Structure

- `docs/` — application statique (HTML/CSS/JS, sans build)
- `docs/js/data.js` — axes, modules et questions (texte, aligné Bible)
- `source/images/bible/` — scans de la Bible (référence **locale** ; le dossier `source/` est ignoré par Git)

## Contenu actuel

- **Chapitre 2 — Signalisation** : **12 modules**, **~100 questions** (texte, Bible p. 20–33)
  - INDIR, SM, SA, SMA (enrichis) + INDES, aiguillages, feux blancs, lampe/tension, panne R17, traversée R17, zone gare, TIV
- Chapitres 1, 3, 4 : à venir

Roadmap détaillée : [docs/EVOLUTIONS.md](docs/EVOLUTIONS.md) (sacs, répétition espacée, quiz général, maîtrise 100 %).
