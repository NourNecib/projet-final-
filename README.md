UrbanBoard – Tableau de bord citoyen pour Tunis

UrbanBoard est une application web full-stack qui permet aux citoyens de Tunis d’interagir avec leur environnement urbain en temps réel. L’objectif est de créer un **prototype de quartier intelligent** et de poser les bases d’un futur **jumeau numérique urbain**.

---

Objectifs du projet

- Fournir une plateforme interactive pour :
  - Consulter les **conditions urbaines en temps réel** (trafic, météo, bruit, stationnement)
  - **Signaler des problèmes** dans la ville
  - **Réserver des places de stationnement**
  - Participer via des **commentaires ou sondages**
- Encourager la **participation citoyenne** et améliorer la **transparence urbaine**

---

Technologies utilisées

 Frontend
- React.js
- HTML / CSS / JavaScript
- Leaflet.js (carte interactive)
- Axios

 Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT + Bcrypt (authentification sécurisée)

 APIs externes
- OpenWeatherMap (météo)
- Données simulées (trafic, bruit, stationnement)

---

Fonctionnalités principales

 Utilisateur (citoyen)
- Consulter les données urbaines en temps réel
- Visualiser une **carte interactive de Tunis** :
  - 🟢 Place disponible
  - 🔴 Place occupée
- Réserver une place de stationnement pour 2h (après authentification)
- Signaler un problème urbain via un formulaire
- Voir ses propres signalements et réservations

Authentification
- Inscription / Connexion avec rôles : `user` ou `admin`
- Sécurité via JSON Web Tokens (JWT)

Interface Admin
- Visualiser tous les signalements
- Marquer les signalements comme "en cours" ou "résolus"
- Supprimer des signalements
- Ajouter ou supprimer des places de stationnement**
- Gérer les données de la carte

Dashboard public
- Accessible sans connexion
- Affiche :
  - Température en temps réel
  - Niveau de trafic (simulé)
  - Niveau sonore (simulé)
  - Carte interactive avec les places disponibles

---

Lancer le projet en local

1. Cloner le repo

```bash
git clone https://github.com/ton-utilisateur/urbanboard.git
cd urbanboard

L'application sera accessible sur http://localhost:3000

3000

Roadmap
Intégration de données réelles (open data, capteurs urbains, etc.)
Ajout d’un système de notifications (email / app)
Simulation dynamique du trafic et de l’occupation des places
Visualisation 3D du quartier avec CesiumJS
Application mobile (React Native)
Intégration de paiement pour la réservation
Mode offline pour consultation rapide

Contexte académique
Ce projet a été conçu à la croisée de l'architecture urbaine et des technologies web intelligentes. Il s'inscrit dans une démarche de recherche personnelle sur la ville intelligente, les quartiers connectés, la participation citoyenne et les jumeaux numériques urbains.
Diplômé(e) en architecture en novembre 2024, j’ai suivi une formation intensive en développement full-stack (bootcamp de 5 mois). UrbanBoard est le projet de fin de formation, combinant mes deux domaines d'expertise. Ce projet constitue également la base de réflexion pour un futur doctorat en smart cities et digital urbanism.

Contact
Développé par : [Nour Necib]
📧 Email : [nour.necib02@gmail.com]
🔗 LinkedIn : https://www.linkedin.com/in/nour-necib

⚖️ Licence
Ce projet est open-source sous licence MIT.
