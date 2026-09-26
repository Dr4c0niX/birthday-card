# Projet Carte d'Anniversaire Interactive 🎂 — Spécifications & Architecture

## 1. Vision & Concept
Une web application interactive conçue comme une carte d'anniversaire collective pour Olivier.
Les proches munis du lien peuvent déposer un message personnalisé accompagné d'une photo ou d'une vidéo souvenir.

L'esthétique combine un **tableau de liège chaleureux** (avec des post-its colorés et des polaroids épinglés avec punaises 3D et washi tape) sur un **arrière-plan de route de campagne bucolique animée** (style dessin animé doux avec légers nuages qui défilent).

---

## 2. Déroulement temporel & États de l'application

| Phase | Période | Comportement Front-end | Comportement Back-end |
| :--- | :--- | :--- | :--- |
| **Phase 1 : Collecte** | Jusqu'au 4 octobre à minuit | - Compte à rebours dynamique jusqu'au 4 octobre.<br>- Formulaire d'ajout actif.<br>- Messages sur le liège **floutés par défaut** avec bouton "Révéler / Spoil" individuel pour préserver la surprise. | Écritures autorisées (Firestore + Storage). |
| **Phase 2 : Le Jour J** | À partir du 4 octobre | - Formulaire désactivé, remplacé par un bandeau festif.<br>- Révélation automatique de tous les messages (aucun flou).<br>- Animation festive (pluie de confettis, ambiance anniversaire). | Écritures verrouillées par règles de sécurité Firebase (`request.time < ...`). |

---

## 3. Architecture Technique

* **Front-end** : React (Vite) + TypeScript.
* **Style** : Vanilla CSS moderne avec design tokens, responsive, animations CSS / SVG / Canvas.
* **Base de données** : Firebase Firestore (collection `messages`).
* **Stockage Médias** : Firebase Cloud Storage (dossier `media/{messageId}`) — Plan Blaze (Pay-as-you-go).
* **Icônes & Effets** : `lucide-react`, `canvas-confetti`.
* **Hébergement cible** : Vercel (déploiement continu via Git, HTTPS automatique).

---

## 4. Fonctionnalités Détaillées

### A. Espace Invité (Dépôt de message)
* **Formulaire sans friction** (aucun compte obligatoire) :
  * Prénom & Nom ou Surnom.
  * Message texte (support émojis).
  * Upload Média : Photo ou Vidéo (optionnel).
  * Choix du style de mot : couleur du post-it (jaune soleil, rose pastel, vert menthe, bleu ciel) ou cadre polaroid blanc classique.
  * Barre de progression d'upload en direct pour les vidéos volumineuses.
  * Compression automatique des photos en WebP côté client avant l'envoi pour économiser l'espace et optimiser le chargement.

### B. Le Mur de Souvenirs (Tableau de Liège)
* Texture liège réaliste avec punaises colorées en relief et ruban adhésif (washi tape).
* Cartes post-it et polaroids avec légère inclinaison aléatoire pour un effet naturel et vivant.
* Arrière-plan animé : route de campagne verdoyante style aquarelle / animation (légers nuages flottants, brise, teintes chaleureuses).
* Zoom au clic sur un polaroid ou une vidéo pour affichage agrandi dans une modale élégante.

### C. Mode Diaporama / Plein Écran (Mode TV)
* Bouton pour lancer la projection plein écran.
* Défilement automatique et fluide des messages et photos/vidéos avec transitions soignées, idéal pour le repas d'anniversaire.

### D. Panneau d'Administration Secret
* Accès protégé par un **code PIN à 4 chiffres** (défini par variable d'environnement).
* Permet de :
  * Masquer ou supprimer un message (erreur, doublon, test).
  * Visualiser la liste de tous les messages déposés.

---

## 5. Tarification Firebase (Plan Blaze)
* **Cloud Firestore** : Gratuit jusqu'à 50 000 lectures / jour et 20 000 écritures / jour (coût : 0,00 €).
* **Cloud Storage** : 5 Go gratuits chaque mois, puis ~0,026 $ / Go / mois pour l'excédent vidéo.
* Alerte budgétaire configurée à 1 € ou 2 € dans la console Google Cloud.
