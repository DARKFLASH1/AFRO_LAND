# 🌍 AFRO_LAND - Guide des Fonctionnalités & Modifications

Bienvenue dans la documentation technique et fonctionnelle de l'application **AFRO_LAND**. Ce document récapitule l'ensemble des fonctionnalités implémentées et les améliorations techniques apportées pour faire de cette application un outil d'exploration complet du continent africain.

---

## 🚀 Fonctionnalités Principales

### 1. Carte Interactive de l'Afrique

* **Visualisation par Régions :** Une carte plein écran utilisant **Leaflet** où chaque pays est coloré selon sa région (Nord, Ouest, Centre, Est, Sud).
* **Légende Dynamique :** Une légende interactive en bas de carte pour identifier les zones géographiques.
* **Interactivité Totale :**
  * **Survol :** Mise en surbrillance des frontières et affichage du nom du pays.
  * **Clic :** Redirection immédiate vers la fiche détaillée du pays sélectionné.
* **Limites Géographiques :** Navigation restreinte au continent africain pour éviter de s'égarer.

### 2. Géolocalisation Intégrée

* **Bouton "Locate Me" :** Un bouton dédié sur la carte permettant à l'utilisateur de se positionner en temps réel.
* **Marqueur Personnalisé :** Un marqueur "Vous êtes ici !" s'affiche sur la carte pour situer l'utilisateur par rapport aux pays africains.
* **Gestion des Permissions :** Système sécurisé de vérification et de demande de permissions GPS (Android & Web).

### 3. Recherche Intelligente

* **Filtrage Dynamique :** Recherche de pays en temps réel avec normalisation des accents (ex: "algerie" trouve "Algérie").
* **Tri Prédictif :** Les résultats affichent en priorité les pays dont le nom commence par les lettres saisies, suivis par l'ordre alphabétique.

### 4. Quizz AFRO_LAND (Module Éducatif)

* **Banque de Questions Aléatoires :** Une vaste collection de questions sur les capitales, l'histoire, l'économie et la géographie.
* **Sessions Dynamiques :** Chaque partie sélectionne **10 questions au hasard** pour une rejouabilité infinie.
* **Interface Moderne :** Thème "Sombre & Or", barre de progression, et labels A/B/C/D.
* **Feedback Pédagogique :** Explications détaillées ("Le saviez-vous ?") après chaque réponse pour approfondir ses connaissances.
* **Score Visuel :** Écran de fin avec trophée, jauge de score et messages personnalisés.

### 5. Fiches Pays Immersives

* **Données Complètes :** Informations sur 54 pays (Capitale, Population, Monnaie, Langues, Chef d'État, etc.).
* **Sections Détaillées :** Onglets pour l'Histoire, la Géographie, la Culture et l'Économie.
* **Galerie d'Images :** Photos des sites touristiques et galeries locales.
* **Visionneuse Plein Écran :** Toutes les images sont cliquables et s'ouvrent dans un mode plein écran immersif avec animation de zoom.
* **Partage Social :** Possibilité de partager la fiche d'un pays via les réseaux sociaux ou SMS.

---

## 🛠️ Modifications Techniques Majeures

### Architecture & Frameworks

* **Ionic 8 / Angular 20 :** Utilisation des versions les plus récentes pour des performances optimales.
* **Capacitor 7 :** Intégration des plugins natifs pour la géolocalisation et le partage système.
* **Leaflet & GeoJSON :** Utilisation de données vectorielles pour le tracé précis des frontières africaines.

### Optimisations UI/UX

* **Design Unifié :** Application d'une charte graphique cohérente (Noir Profond et Or) sur l'ensemble des pages (Accueil, Carte, Quizz).
* **Navigation Fluide :** Ajout d'un **Footer Global** avec icônes pour un accès rapide aux fonctions clés.
* **Gestion du Bouton Retour :** Optimisation spécifique pour Android afin d'éviter la fermeture accidentelle de l'application depuis les sous-pages.

### Base de Données (Local)

* **Synchronisation :** Alignement total entre les identifiants de la carte (GeoJSON) et les fiches de données (`infosPays`).
* **Restauration :** Récupération et complétion des 54 pays d'Afrique, incluant les archipels et les pays du Maghreb.

---

## 📂 Structure des Fichiers Clés

* `src/app/carte/` : Logique et design de la carte Leaflet.
* `src/app/quiz/` : Module de jeu et banque de questions.
* `src/app/pays/` : Gestionnaire dynamique des fiches pays et visionneuse d'images.
* `src/app/services/location.service.ts` : Service centralisé de géolocalisation.
* `src/assets/africa.geojson` : Données géographiques des frontières.

---
*Document généré le 1er Mai 2026 pour le projet AFRO_LAND.*
