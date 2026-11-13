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

  /* ActiveCampaign : mêmes réglages que assets/config.js du site.
     - formulaire n°5 : ajoute le tag « formulaire-complete » (déclenche les relances)
     - formulaire n°8 : ajoute le tag « reservation-confirmee » (arrête les relances) */
  AC_ACCOUNT: "https://repenndu.activehosted.com",
  AC_ORG_ID: "92658a11-3180-4102-8e5e-a5ddd4012abc",
  AC_FORM_ID: "5",
  AC_BOOKING_FORM_ID: "8",

  /* Formspree : même compte que formulaire.html (copie de sécurité des contacts) */
  FORMSPREE_ID: "mgoqqdyg",

  /* Étiquette envoyée avec chaque contact, pour comparer avec l'ancien tunnel */
  SOURCE: "source-tremplin",

  /* À COMPLÉTER — identifiant YouTube de la vidéo de 90 s d'Aurélie
     (les 11 caractères après "v=" dans l'adresse YouTube) */
  YOUTUBE_ID: "",

  /* Liens légaux du pied de page */
  LEGAL_URL: "https://techniquesdehavening.fr/mentions-legales/",
  PRIVACY_URL: "https://techniquesdehavening.fr/mentions-legales/" /* remplacer par la page « Politique de confidentialité » si elle existe */
};
