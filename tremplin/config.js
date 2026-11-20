/* =====================================================================
   TUNNEL TREMPLIN — RÉGLAGES
   C'est le SEUL fichier à modifier pour brancher les outils.
   Tant qu'un réglage est vide, la page affiche un emplacement réservé
   au lieu de planter.
   ===================================================================== */
window.TREMPLIN_CONFIG = {

  /* Événement Calendly « Appel découverte Havening® » d'Aurélie (le même que
     la page choisir-mon-creneau). Ne pas changer le lien /new-meeting dans Calendly. */
  CALENDLY_URL: "https://calendly.com/aurelie-penndu/new-meeting",

  /* Pixel Meta « pixel havening » (compte publicitaire Techniques de Havening).
     Le domaine formationhavening.fr est déjà autorisé dans le Gestionnaire d'événements. */
  META_PIXEL_ID: "2088643361918756",

  /* ActiveCampaign : même compte que le site (assets/config.js). */
  AC_ACCOUNT: "https://repenndu.activehosted.com",
  AC_ORG_ID: "92658a11-3180-4102-8e5e-a5ddd4012abc",

  /* À COMPLÉTER — numéro du formulaire ActiveCampaign « Vidéo auto-havening »
     (champs prénom + e-mail, ajoute le tag « video-auto-havening », qui
     déclenche l'e-mail de livraison). Voir LISEZMOI.
     NE PAS remettre "5" : ce formulaire déclenche les relances du questionnaire.
     Tant qu'il est vide, les inscriptions arrivent seulement dans Formspree
     et AUCUN e-mail de livraison ne part. */
  AC_FORM_ID: "9",

  /* À COMPLÉTER — numéro du champ ActiveCampaign « AD - Métier accompagnement »
     (question facultative Oui / Non du formulaire). Voir LISEZMOI.
     Tant qu'il est vide, la réponse est enregistrée seulement dans Formspree. */
  AC_FIELD_METIER: "",

  /* Formulaire n°8 : ajoute le tag « reservation-confirmee » à la réservation
     Calendly, pour arrêter les relances. */
  AC_BOOKING_FORM_ID: "8",

  /* Formspree : même compte que formulaire.html (copie de sécurité des contacts) */
  FORMSPREE_ID: "mgoqqdyg",

  /* Étiquette envoyée à Formspree avec chaque inscription */
  SOURCE: "video-auto-havening",

  /* À COMPLÉTER — image d'aperçu de la vidéo de 15 min sur la page d'inscription
     (déposer l'image dans le dossier tremplin/, ex. "apercu-video.jpg") */
  PREVIEW_IMG: "",

  /* À COMPLÉTER — identifiant YouTube de la vidéo de 90 s d'Aurélie sur la page
     Tremplin (les 11 caractères après "v=" dans l'adresse YouTube) */
  YOUTUBE_ID: "",

  /* Liens légaux du pied de page */
  LEGAL_URL: "https://techniquesdehavening.fr/mentions-legales/",
  PRIVACY_URL: "https://techniquesdehavening.fr/mentions-legales/" /* remplacer par la page « Politique de confidentialité » si elle existe */
};
