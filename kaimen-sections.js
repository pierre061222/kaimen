/* Rendu des informations pratiques Kaimen ; le scroll-scrubbing canonique reste intact. */
(() => {
  'use strict';

  const C = window.SITE_CONTENT;
  const footer = document.querySelector('#contact');
  if (!C || !footer || !C.eligibility || !C.documents || !C.methodology) return;

  const whatsapp = (C.brand.socials || []).find((item) => /^https:\/\/wa\.me\//.test(item.url || ''))?.url;
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  function makeSection(id, data) {
    const section = make('section', 'km-detail');
    section.id = id;
    const inner = make('div', 'km-detail__inner');
    const heading = make('header', 'km-detail__header');
    const kicker = make('p', 'km-kicker mono', data.kicker);
    const title = make('h2', 'km-title', data.title);
    title.id = `${id}-title`;
    section.setAttribute('aria-labelledby', title.id);
    const body = make('div', 'km-detail__body');
    body.append(title);
    if (data.intro) body.append(make('p', 'km-intro', data.intro));
    heading.append(kicker, body);
    inner.append(heading);
    section.append(inner);
    return { section, inner };
  }

  function makeAction(label, className, href) {
    const link = make('a', className, label);
    link.href = href || '#contact';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }

  const details = make('div', 'km-details');
  details.id = 'kaimen-details';
  details.setAttribute('aria-label', 'Informations pratiques pour préparer votre projet d’études en Chine');

  // Éligibilité : le niveau choisi est uniquement ajouté au message WhatsApp prérempli.
  const eligibility = makeSection('eligibilite', C.eligibility);
  const levelRow = make('div', 'km-level-row');
  const fieldset = make('fieldset', 'km-level-fieldset');
  const legend = make('legend', '', C.eligibility.prompt);
  const options = make('div', 'km-options');
  const action = makeAction(C.eligibility.cta, 'km-action', whatsapp);
  action.setAttribute('aria-label', C.eligibility.cta);

  C.eligibility.levels.forEach((level, index) => {
    const id = `kaimen-level-${index + 1}`;
    const label = make('label', 'km-option');
    label.htmlFor = id;
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'kaimen-level';
    input.id = id;
    input.value = level;
    input.autocomplete = 'off';
    label.append(input, make('span', '', level));
    options.append(label);
  });

  fieldset.append(legend, options);
  levelRow.append(fieldset, action);
  eligibility.inner.append(levelRow);
  if (whatsapp) {
    options.addEventListener('change', () => {
      const selected = options.querySelector('input:checked');
      const url = new URL(whatsapp);
      if (selected) {
        url.searchParams.set('text', `Bonjour Kaimen, je souhaite échanger sur mon projet d’études en Chine. Mon niveau d’études visé ou actuel est : ${selected.value}.`);
      }
      action.href = url.toString();
    });
  }

  // Liste des pièces : la note précise que la liste est indicative.
  const documents = makeSection('documents', C.documents);
  const list = make('ol', 'km-doc-list');
  C.documents.items.forEach((item, index) => {
    const row = make('li', 'km-doc-item');
    const number = make('span', 'km-doc-number', String(index + 1).padStart(2, '0'));
    number.setAttribute('aria-hidden', 'true');
    row.append(number, make('span', 'km-doc-name', item));
    list.append(row);
  });

  const help = make('div', 'km-doc-help');
  help.append(make('p', 'km-doc-question', C.documents.question));
  const support = makeAction(C.documents.cta, 'km-text-link', whatsapp);
  if (whatsapp) {
    const url = new URL(whatsapp);
    url.searchParams.set('text', 'Bonjour Kaimen, j’ai besoin d’aide pour réunir les documents de mon dossier d’études en Chine.');
    support.href = url.toString();
  }
  help.append(support);
  documents.inner.append(list, make('p', 'km-doc-note', C.documents.note), help);

  // Méthodologie : cinq étapes typographiques, sans visuels ni promesse d’admission.
  const methodology = makeSection('methodologie', C.methodology);
  const steps = make('ol', 'km-method-list');
  C.methodology.steps.forEach((step, index) => {
    const item = make('li', 'km-method-step');
    item.append(
      make('span', 'km-method-number', String(index + 1).padStart(2, '0')),
      make('h3', 'km-method-title', step.name),
      make('p', 'km-method-copy', step.description)
    );
    steps.append(item);
  });
  methodology.inner.append(steps);

  details.append(eligibility.section, documents.section, methodology.section);
  footer.before(details);
})();
