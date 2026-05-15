# TAM Formation Tram — Révision Bible

Outil web de révision des consignes d'exploitation tramway (Bible TaM).

## Lancer en local

```bash
cd docs
python -m http.server 8080
```

Ouvrir [http://localhost:8080](http://localhost:8080) (idéalement sur téléphone en même réseau Wi‑Fi).

## Publier sur GitHub Pages

1. Créer un dépôt sur GitHub et y pousser cette branche (sans inclure `source/`, exclu par `.gitignore`).
2. **Settings → Pages → Build and deployment → Source** : choisir **GitHub Actions** (le workflow `.github/workflows/pages.yml` déploie le dossier `docs/` à chaque push sur `main` ou `master`).
3. Après le premier run réussi, l’URL est affichée dans l’onglet **Actions** et dans **Settings → Pages**.

Alternative sans Actions : source **Deploy from a branch** → branche `main`, dossier `/docs`.

## Structure

- `docs/` — application statique (HTML/CSS/JS, sans build)
- `docs/js/data.js` — axes, modules et questions (texte, aligné Bible)
- `source/images/bible/` — scans de la Bible (référence **locale** ; le dossier `source/` est ignoré par Git)

## Contenu actuel

- **Chapitre 2 — Signalisation** : **12 modules**, **~100 questions** (texte, Bible p. 20–33)
  - INDIR, SM, SA, SMA (enrichis) + INDES, aiguillages, feux blancs, lampe/tension, panne R17, traversée R17, zone gare, TIV
- Chapitres 1, 3, 4 : à venir

Roadmap détaillée : [docs/EVOLUTIONS.md](docs/EVOLUTIONS.md) (sacs, répétition espacée, quiz général, maîtrise 100 %).
