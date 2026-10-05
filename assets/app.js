/* ============================================================
   HAVENING® FRANCE — script commun (pages d'entrée + page créneau)
============================================================ */
(function () {
  'use strict';
  var CFG = window.HV_CONFIG || {};
  var body = document.body;
  var PAGE = body.getAttribute('data-page');            // "entree" ou "creneau"
  var ROOT = body.getAttribute('data-root') || './';    // chemin vers la racine du site
  var IS_FILE = location.protocol === 'file:';

  /* === STOCKAGE DE SESSION (tolérant aux navigateurs bloqués) === */
  var store = {
    get: function (k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  /* === CONTEXTE : source + UTM (définis par la page d'entrée, jamais demandés) === */
  var ctx = store.get('hv_ctx') || {};
  if (PAGE === 'entree') {
    var qs = new URLSearchParams(location.search);
    ctx.source = body.getAttribute('data-source') || ctx.source || 'inconnu';
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(function (k) {
      if (qs.get(k)) ctx[k] = qs.get(k);
    });
    ctx.entree = location.pathname;
    store.set('hv_ctx', ctx);
  }

  /* === MESURE : un seul point d'envoi (dataLayer / GTM + Meta Pixel si présents) === */
  var sent = store.get('hv_sent') || {};
  function track(name, extra, once) {
    if (once && sent[name]) return;
    var payload = Object.assign({ event: name, source: ctx.source || 'inconnu' }, extra || {});
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.fbq === 'function') {
      if (name === 'form_submit') window.fbq('track', 'Lead');
      else if (name === 'booking_confirmed') window.fbq('track', 'Schedule');
      else window.fbq('trackCustom', name, payload);
    }
    if (once) { sent[name] = 1; store.set('hv_sent', sent); }
  }
  window.hvTrack = track;

  /* === DATES DE SESSION (source unique : config.js) === */
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var sessions = (CFG.sessions || []).filter(function (s) { return new Date(s.fin + 'T23:59:59') >= today; });
  document.querySelectorAll('[data-sessions]').forEach(function (el) {
    if (!sessions.length) { var w = el.closest('[data-sessions-wrap]'); if (w) w.hidden = true; return; }
    el.textContent = sessions.map(function (s) { return s.label; }).join(' · ');
  });

  /* === LIENS LÉGAUX === */
  document.querySelectorAll('[data-link="mentions"]').forEach(function (a) { a.href = CFG.mentionsLegalesUrl || '#'; });
  document.querySelectorAll('[data-link="confidentialite"]').forEach(function (a) { a.href = CFG.confidentialiteUrl || '#'; });

  /* === APPARITION AU SCROLL === */
  if ('IntersectionObserver' in window) {
    var rvObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); rvObs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.rv').forEach(function (el) { rvObs.observe(el); });
  } else {
    document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('visible'); });
  }

  /* === VIDÉOS : façade cliquable, chargement YouTube uniquement au clic === */
  var PLAY_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4l14 8-14 8z" fill="#fff"/></svg>';
  document.querySelectorAll('.yt[data-id]').forEach(function (box) {
    var id = box.getAttribute('data-id');
    var title = box.getAttribute('data-title') || 'Vidéo';
    box.innerHTML =
      '<img src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" alt="" loading="lazy" width="480" height="360">' +
      '<button type="button" class="yt-play" aria-label="Lire la vidéo : ' + title.replace(/"/g, '&quot;') + '">' + PLAY_SVG + '</button>';
    box.addEventListener('click', function () {
      if (box.querySelector('iframe')) return;
      track('video_play', { video: title });
      if (IS_FILE) { window.open('https://www.youtube.com/watch?v=' + id, '_blank'); return; } // YouTube refuse file://
      box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
        '?autoplay=1&rel=0&modestbranding=1" title="' + title.replace(/"/g, '&quot;') +
        '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    });
  });

  /* === TÉMOIGNAGES SUPPLÉMENTAIRES (dépliables) === */
  var moreBtn = document.getElementById('more-testimonials-btn');
  if (moreBtn) {
    moreBtn.addEventListener('click', function () {
      var panel = document.getElementById(moreBtn.getAttribute('aria-controls'));
      var open = moreBtn.getAttribute('aria-expanded') === 'true';
      panel.classList.toggle('open', !open);
      moreBtn.setAttribute('aria-expanded', String(!open));
      moreBtn.textContent = open ? 'Découvrir d\u2019autres témoignages' : 'Masquer les autres témoignages';
    });
  }

  /* === FAQ : accordéon accessible, première réponse ouverte au chargement === */
  var faqBtns = document.querySelectorAll('.faq-btn');
  faqBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      faqBtns.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); document.getElementById(b.getAttribute('aria-controls')).hidden = true; });
      if (!open) { btn.setAttribute('aria-expanded', 'true'); document.getElementById(btn.getAttribute('aria-controls')).hidden = false; }
    });
  });

  /* === BOUTONS D'APPEL : même ancre, même événement === */
  document.querySelectorAll('[data-cta]').forEach(function (a) {
    a.addEventListener('click', function () { track('cta_click', { position: a.getAttribute('data-cta') }); });
  });

  /* === BOUTON FIXE MOBILE : après le 1er bouton, masqué quand le questionnaire est visible === */
  var sticky = document.getElementById('sticky-cta');
  var heroCta = document.getElementById('hero-cta');
  var formSec = document.getElementById('questionnaire');
  if (sticky && heroCta && formSec && 'IntersectionObserver' in window) {
    var heroPassed = false, formVisible = false;
    var upd = function () {
      var show = heroPassed && !formVisible;
      sticky.classList.toggle('show', show);
      body.classList.toggle('has-sticky', show && window.innerWidth < 768);
      sticky.setAttribute('aria-hidden', String(!show));
      sticky.querySelector('a').tabIndex = show ? 0 : -1;
    };
    new IntersectionObserver(function (en) {
      heroPassed = !en[0].isIntersecting && en[0].boundingClientRect.top < 0; upd();
    }).observe(heroCta);
    new IntersectionObserver(function (en) { formVisible = en[0].isIntersecting; upd(); }, { threshold: 0.05 }).observe(formSec);
  }

  /* ============================================================
     ACTIVECAMPAIGN — envoi via proc.php (balise script, sans CORS)
     Résout quand AC répond, ou au bout de 7 s au maximum.
  ============================================================ */
  function acSubmit(formId, data) {
    return new Promise(function (resolve) {
      var ac = CFG.ac || {};
      if (!formId || !ac.account) { resolve({ ok: null, msg: 'non configuré' }); return; }
      var done = false;
      var finish = function (r) { if (done) return; done = true; resolve(r); };
      window._show_thank_you = function () { finish({ ok: true }); };
      window._show_error = function (id, msg) { finish({ ok: false, msg: msg }); };
      window._show_unsubscribe = function () { finish({ ok: true }); };
      var p = { u: formId, f: formId, s: '', c: 0, m: 0, act: 'sub', v: 2, or: ac.orgId || '', jsonp: 'true' };
      Object.keys(data).forEach(function (k) { p[k] = data[k]; });
      var q = Object.keys(p).map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(p[k] == null ? '' : p[k]); }).join('&');
      var s = document.createElement('script');
      s.src = ac.account.replace(/\/$/, '') + '/proc.php?' + q;
      s.onerror = function () { finish({ ok: false, msg: 'réseau' }); };
      document.head.appendChild(s);
      setTimeout(function () { finish({ ok: null, msg: 'délai dépassé' }); }, 7000);
    });
  }

  /* ============================================================
     QUESTIONNAIRE (3 étapes, progression conservée)
  ============================================================ */
  var form = document.getElementById('hv-form');
  if (form) {
    var steps = form.querySelectorAll('.step');
    var bar = document.getElementById('progress-fill');
    var ptxt = document.getElementById('progress-txt');
    var status = document.getElementById('form-status');
    var current = 0;

    /* Options de la question 5 : sessions à venir + choix fixes */
    var horizon = document.getElementById('horizon-choices');
    if (horizon) {
      var opts = sessions.map(function (s) { return 'Session des ' + s.label; })
        .concat(['Dans les trois prochains mois', 'Plus tard', 'Je suis en phase de découverte']);
      horizon.innerHTML = opts.map(function (o) {
        return '<label class="choice"><input type="radio" name="horizon" value="' + o + '" required> ' + o + '</label>';
      }).join('');
    }

    /* Champs "Autre" : saisie libre affichée seulement si cochée */
    form.querySelectorAll('[data-other]').forEach(function (input) {
      var field = document.getElementById(input.getAttribute('data-other'));
      var sync = function () { field.hidden = !input.checked; if (!input.checked) field.value = field.value; };
      input.addEventListener('change', sync); sync.call();
    });

    function serialize() {
      var d = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name) return;
        if (el.type === 'checkbox') { d[el.name] = d[el.name] || []; if (el.checked) d[el.name].push(el.value); }
        else if (el.type === 'radio') { if (el.checked) d[el.name] = el.value; else if (!(el.name in d)) d[el.name] = ''; }
        else d[el.name] = el.value;
      });
      return d;
    }
    function restore(d) {
      if (!d) return;
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name || !(el.name in d)) return;
        if (el.type === 'checkbox') el.checked = (d[el.name] || []).indexOf(el.value) > -1;
        else if (el.type === 'radio') el.checked = d[el.name] === el.value;
        else el.value = d[el.name];
      });
      form.querySelectorAll('[data-other]').forEach(function (i) { document.getElementById(i.getAttribute('data-other')).hidden = !i.checked; });
    }
    var saved = store.get('hv_form');
    if (saved) { restore(saved.data); current = Math.min(saved.step || 0, steps.length - 1); }

    var started = false;
    form.addEventListener('input', function () {
      if (!started) { started = true; track('form_start', null, true); }
      store.set('hv_form', { data: serialize(), step: current });
    });
    form.addEventListener('change', function (e) {
      var q = e.target.closest('.q'); if (q && q.getAttribute('data-invalid')) validateQ(q);
      store.set('hv_form', { data: serialize(), step: current });
    });

    function showStep(i, focus) {
      current = i;
      steps.forEach(function (s, n) { s.hidden = n !== i; });
      bar.style.width = ((i + 1) / steps.length * 100) + '%';
      ptxt.textContent = 'Étape ' + (i + 1) + ' sur ' + steps.length;
      store.set('hv_form', { data: serialize(), step: current });
      if (focus) {
        var top = form.getBoundingClientRect().top;
        if (top < 0 || top > window.innerHeight * 0.6) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        var h = steps[i].querySelector('legend, .q-label'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
      }
    }

    function setErr(q, msg) {
      var e = q.querySelector('.err');
      if (e) e.textContent = msg || '';
      if (msg) q.setAttribute('data-invalid', 'true'); else q.removeAttribute('data-invalid');
      q.querySelectorAll('input:not([type=radio]):not([type=checkbox]),textarea').forEach(function (inp) {
        if (msg) inp.setAttribute('aria-invalid', 'true'); else inp.removeAttribute('aria-invalid');
      });
    }
    function validateQ(q) {
      var type = q.getAttribute('data-validate');
      var msg = '';
      if (type === 'radio') {
        if (!q.querySelector('input:checked')) msg = 'Merci de choisir une réponse.';
      } else if (type === 'checkbox') {
        if (!q.querySelector('input[type=checkbox]:checked')) msg = 'Merci de cocher au moins une réponse.';
      } else if (type === 'text') {
        var inp = q.querySelector('input'); var v = inp.value.trim();
        if (!v) msg = 'Ce champ est obligatoire.';
        else if (inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = 'Cette adresse email ne semble pas valide (exemple : nom@domaine.fr).';
        else if (inp.type === 'tel' && v.replace(/\D/g, '').length < 9) msg = 'Merci d\u2019indiquer un numéro de téléphone complet.';
      }
      setErr(q, msg);
      return !msg;
    }
    function validateStep(i) {
      var first = null;
      steps[i].querySelectorAll('[data-validate]').forEach(function (q) { if (!validateQ(q) && !first) first = q; });
      if (first) {
        var f = first.querySelector('input:not([hidden]),textarea');
        first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (f) f.focus({ preventScroll: true });
      }
      return !first;
    }
    form.querySelectorAll('[data-validate="text"] input').forEach(function (inp) {
      inp.addEventListener('blur', function () { if (inp.value.trim()) validateQ(inp.closest('.q')); });
    });

    form.addEventListener('click', function (e) {
      var nxt = e.target.closest('[data-next]'), prv = e.target.closest('[data-prev]');
      if (nxt) { e.preventDefault(); if (validateStep(current)) showStep(current + 1, true); }
      if (prv) { e.preventDefault(); showStep(current - 1, true); }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateStep(current)) return;
      var d = serialize();
      var withOther = function (list, otherKey) {
        var arr = (list || []).slice();
        if (d[otherKey] && d[otherKey].trim()) arr.push('Autre : ' + d[otherKey].trim());
        return arr.join(' | ');
      };
      var F = (CFG.ac && CFG.ac.fields) || {};
      var acData = { firstname: d.prenom.trim(), lastname: d.nom.trim(), email: d.email.trim(), phone: d.telephone.trim() };
      var map = {
        activite: d.activite, precision: d.precision,
        source: ctx.source, situations: withOther(d.situations, 'situations_autre'),
        approches: withOther(d.approches, 'approches_autre'), objectif: d.objectif, horizon: d.horizon,
        utm_campaign: ctx.utm_campaign || '', utm_content: ctx.utm_content || ''
      };
      Object.keys(map).forEach(function (k) { if (F[k]) acData['field[' + F[k] + ']'] = map[k] || ''; });

      var btn = form.querySelector('[type=submit]');
      btn.disabled = true;
      status.textContent = 'Enregistrement de vos réponses…';

      acSubmit((CFG.ac || {}).questionnaireFormId, acData).then(function (r) {
        if (r.ok === false && r.msg !== 'réseau') { console.warn('ActiveCampaign :', r.msg); }
        track('form_submit', { activite: d.activite, horizon: d.horizon }, true);
        store.set('hv_contact', { prenom: acData.firstname, nom: acData.lastname, email: acData.email, telephone: acData.phone });
        store.set('hv_form', { data: d, step: current });
        location.href = ROOT + 'choisir-mon-creneau/' + (IS_FILE ? 'index.html' : '');
      });
    });

    showStep(current, false);
  }

  /* ============================================================
     PAGE CRÉNEAU — Calendly intégré + préremplissage
  ============================================================ */
  if (PAGE === 'creneau') {
    var qp = new URLSearchParams(location.search);
    var c = store.get('hv_contact') || {};
    // Lien de l'email de reprise : ?email=%EMAIL%&prenom=%FIRSTNAME%&nom=%LASTNAME%
    if (qp.get('email')) { c.email = qp.get('email'); c.prenom = qp.get('prenom') || c.prenom; c.nom = qp.get('nom') || c.nom; }

    var back = document.querySelector('.back-link');
    if (back && ctx.entree && !IS_FILE) back.href = ctx.entree + '#questionnaire';
    var holder = document.getElementById('calendly-box');
    var notice = document.getElementById('calendly-notice');
    track('calendar_view', null, true);

    if (!CFG.calendlyUrl) {
      holder.hidden = true; notice.hidden = false;
    } else {
      var s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      s.onload = function () {
        var prefill = { email: c.email || '' };
        if (c.prenom || c.nom) { prefill.firstName = c.prenom || ''; prefill.lastName = c.nom || ''; prefill.name = ((c.prenom || '') + ' ' + (c.nom || '')).trim(); }
        if (c.telephone) prefill.customAnswers = { a1: c.telephone }; // si la 1re question Calendly est le téléphone
        window.Calendly.initInlineWidget({
          url: CFG.calendlyUrl + (CFG.calendlyUrl.indexOf('?') > -1 ? '&' : '?') + 'hide_gdpr_banner=1',
          parentElement: holder,
          prefill: prefill,
          utm: { utmSource: ctx.source || '', utmCampaign: ctx.utm_campaign || '', utmContent: ctx.utm_content || '' }
        });
      };
      document.head.appendChild(s);
    }

    window.addEventListener('message', function (e) {
      if (!/calendly\.com$/.test((e.origin || '').replace(/^https?:\/\//, '').split('/')[0])) return;
      if (!e.data || e.data.event !== 'calendly.event_scheduled') return;
      track('booking_confirmed', null, true);
      if (c.email && CFG.ac && CFG.ac.bookingFormId) acSubmit(CFG.ac.bookingFormId, { email: c.email });
      var conf = document.getElementById('booking-confirm');
      if (conf) { conf.classList.add('show'); conf.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  }

  /* === page_view (une fois par page et par source) === */
  track('page_view', { page: PAGE, path: location.pathname });
})();
