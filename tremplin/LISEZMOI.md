# Dossier `tremplin/` — nouveau tunnel appel découverte

Ce dossier est indépendant : il ne modifie ni `index.html` ni `formulaire.html` à la racine du dépôt.

## Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | Formulaire court : prénom, nom, email, téléphone |
| `merci.html` | Page Tremplin : confirmation, vidéo, Calendly intégré, mot des formatrices |
| `config.js` | **Seul fichier de réglages** : Calendly, Pixel Meta, ActiveCampaign, vidéo |
| `pixel.js` | Pixel Meta (ne s'active que si l'identifiant est renseigné) |
| `style.css` | Mise en forme commune aux deux pages |

Adresses une fois en ligne :
- formulaire : `https://rejoindre.formationhavening.fr/tremplin/`
- page Tremplin : `https://rejoindre.formationhavening.fr/tremplin/merci.html`

## Mise en ligne

1. **Point de retour d'abord.** Sur GitHub, dépôt `Havening-en-France-web` : *Releases* → *Create a new release* → tag `stable-nov-2026` → *Publish release*.
2. **Créer le dossier.** *Add file* → *Upload files*, glisser le dossier `tremplin` entier → *Commit changes*.
3. Attendre une à deux minutes, puis ouvrir l'adresse du formulaire.

## Réglages (`config.js`)

Déjà repris du site en ligne : lien Calendly (`/new-meeting`), compte ActiveCampaign, formulaire n°5 (tag `formulaire-complete`, déclenche les relances) et formulaire n°8 (tag `reservation-confirmee`, arrête les relances), Pixel Meta.

Reste à compléter :
- `YOUTUBE_ID` : vidéo de 90 s d'Aurélie, quand elle sera tournée.
- `PRIVACY_URL` : page de politique de confidentialité, si elle existe.

Le téléphone est converti au format +33 avant l'envoi à ActiveCampaign, et prérempli dans Calendly (1re question).

## Ce que mesure le Pixel

Pixel « pixel havening » (`2088643361918756`), déjà renseigné. Il partage le bandeau cookies de la page de vente (même mémorisation `hv_consent`) : un visiteur qui a déjà répondu n'est pas réinterrogé, et rien n'est envoyé à Meta sans son accord.

- `PageView` sur les deux pages.
- `Lead` sur `merci.html`, **une seule fois et uniquement après un vrai envoi du formulaire**.
- `Schedule` quand le visiteur réserve dans Calendly.

Chaque événement porte un identifiant unique (`eventID`), prêt pour l'ajout ultérieur de la CAPI.

## Basculer, puis revenir en arrière

- **Basculer** : dans le `index.html` racine, remplacer les liens `formulaire.html` par `tremplin/`.
- **Revenir** : remettre `formulaire.html` dans ces liens. En dernier recours, restaurer la release `stable-nov-2026`.
