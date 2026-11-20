/* =====================================================================
   PIXEL META + CONSENTEMENT (CNIL)
   Même mécanisme que le reste du site (assets/app.js) :
   - même clé de mémorisation « hv_consent », valable 6 mois ;
   - un visiteur qui a déjà accepté ou refusé sur la page de vente
     n'a pas à répondre une deuxième fois ;
   - le Pixel ne se charge JAMAIS sans un clic sur « Accepter ».
   Un événement demandé avant l'accord (ex. Lead) est envoyé au moment
   de l'accord ; il n'est jamais envoyé en cas de refus.
   ===================================================================== */
(function () {
  var CFG = window.AH_CONFIG || {};
  var ID = CFG.META_PIXEL_ID;
  var CONSENT_KEY = 'hv_consent';
  var pending = [];

  function getConsent() {
    try {
      var c = JSON.parse(localStorage.getItem(CONSENT_KEY));
      if (c && c.t && (Date.now() - c.t) < 182 * 24 * 3600 * 1000) return c.v;
    } catch (e) {}
    return null;
  }
  function setConsent(v) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ v: v, t: Date.now() })); } catch (e) {}
  }

  function send(name, eventId, params) {
    window.fbq('track', name, params || {}, eventId ? { eventID: eventId } : undefined);
  }

  function loadPixel() {
    if (!ID || window.fbq) return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', ID);
    window.fbq('track', 'PageView');
    pending.forEach(function (ev) { send(ev[0], ev[1], ev[2]); });
    pending = [];
  }

  /* Appelé par les pages : envoie tout de suite si accord, sinon met en attente */
  window.ahTrack = function (name, eventId, params) {
    if (!ID) return;
    if (window.fbq) send(name, eventId, params);
    else if (getConsent() !== 'denied') pending.push([name, eventId, params]);
  };

  var banner = null;
  function showBanner() {
    if (!ID) return;
    if (!banner) {
      banner = document.createElement('div');
      banner.className = 'cookie-banner';
      banner.setAttribute('role', 'dialog');
      banner.setAttribute('aria-label', 'Gestion des cookies');
      banner.innerHTML =
        '<p>Nous utilisons un cookie de mesure Meta pour savoir quelles publicités vous ont amené ici. ' +
        'Il n\u2019est activé qu\u2019avec votre accord. ' +
        '<a href="' + (CFG.PRIVACY_URL || '#') + '" target="_blank" rel="noopener">En savoir plus</a></p>' +
        '<div class="cookie-actions">' +
        '<button type="button" class="cookie-btn" data-consent="denied">Refuser</button>' +
        '<button type="button" class="cookie-btn" data-consent="granted">Accepter</button></div>';
      banner.addEventListener('click', function (e) {
        var b = e.target.closest('[data-consent]'); if (!b) return;
        var v = b.getAttribute('data-consent'), before = getConsent();
        setConsent(v);
        banner.hidden = true;
        if (v === 'granted') loadPixel();
        else { pending = []; if (before === 'granted') location.reload(); }
      });
      document.body.appendChild(banner);
    }
    banner.hidden = false;
  }

  function init() {
    if (!ID) { console.info('[Auto-Havening] Pixel Meta non configuré (config.js).'); return; }
    var c = getConsent();
    if (c === 'granted') loadPixel();
    else if (c === null) showBanner();
    document.querySelectorAll('[data-link="cookies"]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); showBanner(); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
