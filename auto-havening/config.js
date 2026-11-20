/* =====================================================================
   TUNNEL AUTO-HAVENING — RÉGLAGES
   C'est le SEUL fichier à modifier pour brancher les outils.
   Tant qu'un réglage est vide, la page affiche un emplacement réservé
   au lieu de planter.
   ===================================================================== */
window.AH_CONFIG = {

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
  /* Identifiant technique propre au formulaire n°9 (valeur "or" de son code d'intégration) */
  AC_FORM_OR: "aebbb33c-933e-4152-9a4a-2b191ded23da",

  /* Champ ActiveCampaign « AD - Métier accompagnement » (boutons radio Oui / Non),
     ajouté au formulaire n°9 */
  AC_FIELD_METIER: "20",

  /* Formulaire n°8 : ajoute le tag « reservation-confirmee » à la réservation
     Calendly, pour arrêter les relances. */
  AC_BOOKING_FORM_ID: "8",

  /* Formspree : même compte que formulaire.html (copie de sécurité des contacts) */
  FORMSPREE_ID: "mgoqqdyg",

  /* Étiquette envoyée à Formspree avec chaque inscription */
  SOURCE: "video-auto-havening",

  /* Image d'aperçu de la vidéo de 5 min sur la page d'inscription
     (elle contient déjà le bouton de lecture et le texte) */
  PREVIEW_IMG: "apercu-video.jpg",

  /* Identifiants YouTube = les 11 caractères à la fin du lien youtu.be/… */

  /* Vidéo d'Aurélie sur la page de remerciement (merci.html) */
  YOUTUBE_ID: "dSFmj9g6kfk",

  /* === PAGE VIDÉO (video.html, ouverte depuis l'e-mail de livraison) === */

  /* Séance d'Auto-Havening® (5 min), lecteur principal en haut de page */
  PRATIQUE_YOUTUBE_ID: "yKHSjsai164",

  /* Témoignage vidéo de Nadège, au-dessus de « Vos accompagnatrices » */
  TEMOIGNAGE_YOUTUBE_ID: "yCRCIrIMVVM",

  /* Page de vente ThriveCart de l'atelier (dates et horaires gérés dans ThriveCart) */
  ATELIER_URL: "https://aureliepenndu.thrivecart.com/atelier-auto-havening-v2/",


  /* Liens légaux du pied de page */
  LEGAL_URL: "https://techniquesdehavening.fr/mentions-legales/",
  PRIVACY_URL: "https://techniquesdehavening.fr/mentions-legales/" /* remplacer par la page « Politique de confidentialité » si elle existe */
};
