/* ============================================================
   CONFIGURATION UNIQUE — Havening® France
   Tout ce qui change souvent se modifie ICI, et uniquement ici.
============================================================ */
window.HV_CONFIG = {

  /* === PROCHAINES SESSIONS ===
     Source unique : bandeau du premier écran, bloc formation ET question 5.
     Une session disparaît automatiquement le lendemain de "fin". */
  sessions: [
    { label: "5 et 6 novembre 2026",  fin: "2026-11-06" },
    { label: "10 et 11 décembre 2026", fin: "2026-12-11" }
  ],

  /* === CALENDLY ===
     REMPLACER par l'URL de l'événement 20 minutes d'Aurélie
     (ex. https://calendly.com/aurelie-xxx/appel-decouverte-havening). */
  calendlyUrl: "https://calendly.com/aurelie-penndu/new-meeting",

  /* === ACTIVECAMPAIGN (méthode proc.php, contourne le CORS) === */
  ac: {
    account: "https://repenndu.activehosted.com",
    orgId:   "47aa5198-b188-4750-9c27-63c4044c768c",

    /* Formulaire n°1 : questionnaire (liste "appel découverte").
       Dans AC, régler ce formulaire pour AJOUTER le tag "formulaire-complete". */
    questionnaireFormId: "5",

    /* Formulaire n°2 : à créer dans AC (champ email seul),
       réglé pour AJOUTER le tag "reservation-confirmee".
       Laisser vide tant qu'il n'existe pas. */
    bookingFormId: "",

    /* Numéros des champs personnalisés AC (field[N]).
       Champs vides = non envoyés. Créer les champs manquants dans AC,
       les AJOUTER au formulaire n°5, puis reporter leur numéro ici. */
    fields: {
      activite:   "10",   // "Votre profession"
      precision:  "1",    // "Commentaires / Questions"
      source:     "13",   // AD - Source
      situations: "14",   // AD - Situations
      approches:  "15",   // AD - Approches
      objectif:   "16",   // AD - Objectif appel
      horizon:    "17",   // AD - Horizon formation
      utm_campaign: "18", // AD - UTM campagne
      utm_content:  "19"  // AD - UTM contenu
    }
  },

  /* === LIENS LÉGAUX === REMPLACER par les vraies URL */
  mentionsLegalesUrl: "#",
  confidentialiteUrl: "#"
};
