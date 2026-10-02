# Kaimen — site immersif

Site vitrine one-page en français pour Kaimen, agence d’accompagnement académique Congo–Chine. Le moteur `app.js` est conservé depuis le kit Site Immersif ; les textes et références visuelles se règlent dans `content.js`.

- `index.html`, `app.js`, `styles.css` : structure et moteur canonique du site immersif ; thème sombre et liens CTA WhatsApp configurés selon les choix validés.
- `content.js` : marque, contenu, parcours, coordonnées et chemins des visuels.
- `kaimen-sections.js` et `kaimen-sections.css` : sections Éligibilité, documents à prévoir et méthodologie, avec mise en page responsive.
- `images/` : 36 photographies Pexels téléchargées et recadrées localement, dont quatre photos haute résolution assorties aux tuiles bento (campus, dossier, bibliothèque/bourses, diplômés/départ).
- `manus-routes.json` : manifeste de la route `/`.

Les CTA « Candidater », « Parler à un conseiller » et le CTA du processus ouvrent WhatsApp au `https://wa.me/242065491329` ; le niveau choisi dans Éligibilité préremplit le message, sans l’envoyer. Le bloc à 400 $ est rédigé comme un engagement de Kaimen, pas comme un témoignage client.

Pour remplacer des photos, déposer les fichiers dans `images/` puis modifier les chemins correspondants dans `content.js`. Consulter `IMAGE-CREDITS.md` pour la provenance des photographies.
