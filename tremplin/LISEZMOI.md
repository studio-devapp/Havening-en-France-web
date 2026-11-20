# Dossier `tremplin/` — tunnel vidéo gratuite → appel découverte

Ce dossier est indépendant : il ne modifie ni `index.html` ni `formulaire.html` à la racine du dépôt.

## Le parcours

1. **Page d'inscription** (`index.html`) : le visiteur demande la vidéo gratuite de 5 minutes sur l'auto-havening (prénom, e-mail, case de consentement).
2. **Page Tremplin** (`merci.html`) : confirmation d'envoi, message vidéo de 90 s d'Aurélie, calendrier Calendly pour l'appel découverte de 20 minutes sur la certification.
3. **E-mail de livraison** (ActiveCampaign) : le bouton « Regarder la vidéo » ouvre la **page vidéo** (`video.html`).
4. **Page vidéo** (`video.html`) : la pratique guidée de 5 minutes, puis l'offre de l'atelier auto-havening (49 €, ThriveCart).
5. **Séquence de conseils** (ActiveCampaign, à rédiger), puis l'atelier auto-havening.

## Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'inscription à la vidéo gratuite |
| `merci.html` | Page Tremplin : confirmation, vidéo, Calendly intégré, mot des formatrices |
| `video.html` | Page vidéo ouverte depuis l'e-mail : pratique guidée + atelier |
| `config.js` | **Seul fichier de réglages** |
| `pixel.js` | Pixel Meta et bandeau cookies |
| `style.css` | Mise en forme commune aux deux pages |
| `logo-havening.jpg` | Logo affiché en haut des deux pages |
| `aurelie.jpg` | Photo d'Aurélie (« Qui suis-je ? ») |

Adresses une fois en ligne :
- inscription : `https://rejoindre.formationhavening.fr/tremplin/`
- page vidéo (lien du bouton de l'e-mail) : `https://rejoindre.formationhavening.fr/tremplin/video.html`
- page Tremplin : `https://rejoindre.formationhavening.fr/tremplin/merci.html`

## Mise en ligne

1. Sur GitHub, ouvrir le dossier `tremplin`, puis *Add file* → *Upload files*.
2. Glisser les fichiers modifiés (ils remplacent les anciens) → message `Tunnel vidéo gratuite` → *Commit changes*.
3. Attendre la coche verte, puis tester en fenêtre privée.

La version précédente (formulaire d'appel à 4 champs) reste dans l'historique GitHub du dossier, et le point de retour `stable-nov-2026` couvre le reste du site.

## Réglages (`config.js`)

Déjà renseignés : Calendly (`/new-meeting`), compte ActiveCampaign, formulaire n°8 (tag `reservation-confirmee` à la réservation), Formspree, Pixel Meta.

**À compléter :**
- `AC_FORM_ID` : numéro du formulaire ActiveCampaign « Vidéo auto-havening » (voir ci-dessous). **Indispensable** : tant qu'il est vide, aucun e-mail de livraison ne part.
- `PREVIEW_IMG` : image d'aperçu de la vidéo de 5 minutes.
- `YOUTUBE_ID` : vidéo de 90 s d'Aurélie pour la page Tremplin.
- `PRATIQUE_YOUTUBE_ID` : vidéo de la pratique guidée (5 min, YouTube « non répertoriée ») pour `video.html`.
- `UNSUBSCRIBE_URL` : lien « Se désinscrire » de `video.html` (par défaut, un e-mail à Aurélie).

Photo de Susan : déposer `susan.jpg` dans le dossier, puis suivre le commentaire dans `video.html`.
- `PRIVACY_URL` : politique de confidentialité, citée deux fois sur la page d'inscription.

Photo de Susan et Aurélie ensemble : déposer `susan-aurelie.jpg` dans le dossier, puis suivre le commentaire dans `merci.html`.

## ActiveCampaign : à créer

**1. Formulaire « Vidéo auto-havening »** (type formulaire en ligne)
- Champs : Prénom, E-mail.
- Action : ajouter à une liste dédiée (ex. « Vidéo auto-havening ») et ajouter le tag `video-auto-havening`.
- Double opt-in : désactivé (le consentement est recueilli par la case du formulaire).
- Relever son numéro dans l'adresse (`/app/forms/N`) et le mettre dans `AC_FORM_ID`.

**2. Automatisation « Livraison vidéo auto-havening »**
- Déclencheur : le tag `video-auto-havening` est ajouté.
- Action 1 : envoyer l'e-mail de livraison ci-dessous.
- Ensuite : la séquence de conseils (à rédiger). Ajouter une condition qui arrête les e-mails d'invitation à l'appel si le contact porte `reservation-confirmee`.

**E-mail de livraison, prêt à coller**

> **Objet :** Votre vidéo sur l'Auto-Havening® est là
> **Texte d'aperçu :** 5 minutes pour découvrir et vivre l'exercice.
>
> Bonjour %FIRSTNAME%,
>
> Merci pour votre inscription. Voici votre vidéo :
>
> **[Regarder la vidéo : L'Auto-Havening®, un outil de régulation à transmettre à vos clients]** ← bouton vers le lien de la vidéo de 5 min
>
> Un conseil avant de la lancer : installez-vous dans un endroit calme et choisissez une petite contrariété du quotidien, autour de 4 ou 5 sur 10. Vous allez faire l'exercice guidé avec moi, et c'est en le vivant qu'on le transmet le mieux.
>
> Après la vidéo, j'aimerais beaucoup savoir ce que vous avez remarqué. Écrivez-moi directement à **[adresse à vérifier]**. Je lis toutes vos réponses.
>
> Dans les prochains jours, je vous enverrai quelques conseils pour utiliser l'auto-havening avec vos clients, ainsi que les informations sur mon atelier auto-havening pour praticiens.
>
> À très bientôt,
> Aurélie Penndu-Ouaknine
> Formatrice certifiée en Techniques de Havening® · formationhavening.fr
>
> *Vous recevez cet e-mail parce que vous avez demandé la vidéo sur formationhavening.fr.* %UNSUBSCRIBELINK%

Points à vérifier : l'adresse de réponse (le document indique `aurelie.pendu@gmail.com`, avec un seul « n ») ; de préférence un expéditeur sur le domaine du site, avec l'adresse Gmail en adresse de réponse.

**3. Champ « Métier de l'accompagnement »** (question facultative Oui / Non)
- *Contacts* → *Champs* → *Ajouter un champ* : type **Boutons radio**, nom `AD - Métier accompagnement`, options `Oui` et `Non` (exactement ces mots).
- L'ajouter au formulaire n°9 (onglet *Champs* de l'éditeur), puis *Intégrer* pour enregistrer.
- Relever son numéro (`field[N]` dans le code d'intégration) et le mettre dans `AC_FIELD_METIER`.
- Sans ce réglage, la réponse est enregistrée uniquement dans Formspree.

## Ce que mesure le Pixel

Pixel « pixel havening » (`2088643361918756`). Il partage le bandeau cookies de la page de vente (mémorisation `hv_consent`) : rien n'est envoyé à Meta sans accord.

- `PageView` sur les deux pages.
- `Lead` sur `merci.html`, une seule fois et uniquement après une vraie inscription.
- `Schedule` quand le visiteur réserve dans Calendly.

Chaque événement porte un identifiant unique (`eventID`), prêt pour la CAPI.

## Brancher, puis revenir en arrière

Le tunnel n'est relié à aucune page : on l'utilise d'abord comme adresse de destination d'une publicité Meta. Pour revenir en arrière, il suffit de retirer l'adresse de la publicité, ou de restaurer la version précédente du dossier depuis l'historique GitHub.
