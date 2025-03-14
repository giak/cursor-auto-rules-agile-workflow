# 📝 Template de User Story

<version>2.1.0</version>

> Ce template définit la structure standardisée pour les user stories dans le contexte d'un projet agile. Il assure que toutes les informations essentielles sont capturées pour faciliter l'implémentation et le suivi.

## 🎯 Vue d'Ensemble

Les user stories sont au cœur de la méthodologie agile, capturant les besoins utilisateurs sous forme d'histoires concises qui décrivent qui, quoi et pourquoi. Ce template standardisé assure que chaque story contient toutes les sections nécessaires pour une implémentation efficace.

## 📝 Structure Requise

### 1️⃣ Méta-information

```
Epic-{N}: {Titre de l'Epic}
Story-{M}: {Titre de la Story}
```

### 2️⃣ Description de la Story

```
**En tant que** {rôle}
**Je veux** {action}
**afin de** {bénéfice}
```

### 3️⃣ Statut

- Draft
- In Progress
- Complete
- Cancelled

### 4️⃣ Contexte

Description du contexte de la story, incluant:

- Relation avec l'epic parent
- Dépendances avec d'autres stories
- Contraintes spécifiques
- Hypothèses générales

### 5️⃣ Risques et Hypothèses

Identification et gestion proactive des risques et hypothèses spécifiques:

```
#### 🔴 Risques identifiés

| Risque | Impact potentiel | Probabilité | Mesures d'atténuation |
|--------|------------------|-------------|------------------------|
| {Description du risque} | {Faible/Moyen/Élevé} | {Faible/Moyenne/Élevée} | {Actions pour atténuer le risque} |

#### 🟡 Hypothèses formulées

| Hypothèse | Validation nécessaire | Responsable | Statut |
|-----------|----------------------|-------------|--------|
| {Description de l'hypothèse} | {Méthode de validation} | {Personne responsable} | {Non validée/En cours/Validée/Invalidée} |
```

### 6️⃣ Estimation

```
Story Points: {nombre}
```

### 7️⃣ Critères d'Acceptation

Liste des critères qui déterminent quand la story est complète:

```
1. Étant donné {contexte}, quand {action}, alors {résultat attendu}
2. Étant donné {contexte}, quand {action}, alors {résultat attendu}
...
```

### 8️⃣ Tâches

Liste hiérarchique des tâches techniques à accomplir:

```
1. - [ ] {Tâche principale 1}
   1. - [ ] {Sous-tâche 1.1}
   2. - [ ] {Sous-tâche 1.2}
2. - [ ] {Tâche principale 2}
   1. - [ ] {Sous-tâche 2.1}
   ...
```

### 9️⃣ Notes de Développement

Informations techniques pertinentes pour les développeurs:

- Choix d'implémentation
- Détails techniques
- Ressources utiles

### 🔟 Journal de Communication

Historique des discussions importantes autour de la story:

```
- {Personne}: {Commentaire/Question}
- {Personne}: {Réponse}
...
```

## 💡 Exemple

<example>
# Story: Interface Utilisateur du Plateau d'Échecs

Epic-2: Jeu d'Échecs en Ligne
Story-3: Interface du Plateau d'Échecs

## Description de la Story

**En tant que** joueur d'échecs
**Je veux** visualiser clairement le plateau d'échecs avec les pièces
**afin de** pouvoir planifier et exécuter mes mouvements efficacement

## Statut

In Progress

## Contexte

Cette story fait partie de l'Epic-2 qui implémente le jeu d'échecs complet. Elle se concentre sur les aspects visuels et interactifs du plateau d'échecs. La mise en place du projet (Story-1) est terminée, fournissant la base pour l'implémentation de l'interface utilisateur.

## Risques et Hypothèses

### 🔴 Risques identifiés

| Risque                                                 | Impact potentiel            | Probabilité | Mesures d'atténuation                                                     |
| ------------------------------------------------------ | --------------------------- | ----------- | ------------------------------------------------------------------------- |
| Performance de rendu avec de nombreuses pièces animées | Moyen (latence perceptible) | Moyenne     | Utiliser le rendering optimisé et limiter les animations simultanées      |
| Incompatibilité avec certains navigateurs anciens      | Élevé (non-fonctionnement)  | Faible      | Tester sur les navigateurs cibles et utiliser des polyfills si nécessaire |

### 🟡 Hypothèses formulées

| Hypothèse                                                              | Validation nécessaire              | Responsable | Statut      |
| ---------------------------------------------------------------------- | ---------------------------------- | ----------- | ----------- |
| Les utilisateurs préfèrent les pièces 3D aux pièces 2D traditionnelles | Test utilisateur avec prototypes   | Sarah       | En cours    |
| Les animations de mouvement améliorent la compréhension du jeu         | Analyse des métriques d'engagement | Mark        | Non validée |

## Estimation

Story Points: 2

## Critères d'Acceptation

1. Étant donné que l'application est chargée, quand un utilisateur ouvre la page principale, alors un plateau d'échecs 8x8 est affiché avec l'alternance correcte de cases blanches et noires
2. Étant donné un plateau d'échecs, quand l'application démarre, alors toutes les pièces sont placées dans leurs positions initiales correctes
3. Étant donné un plateau avec des pièces, quand un utilisateur clique sur une pièce, alors la case est mise en surbrillance pour indiquer la sélection
4. Étant donné une pièce sélectionnée, quand un utilisateur clique sur une case valide, alors la pièce se déplace vers cette case

## Tâches

1. - [x] Créer la Grille du Plateau
   1. - [x] Implémenter la disposition 8x8
   2. - [x] Ajouter la coloration des cases
   3. - [x] Écrire les tests de la grille
2. - [ ] Ajouter les Pièces d'Échecs
   1. - [ ] Créer les composants de pièces
   2. - [ ] Ajouter les images des pièces
   3. - [ ] Écrire les tests des pièces
3. - [ ] Implémenter l'Interaction de Base
   1. - [ ] Ajouter les gestionnaires de clics
   2. - [ ] Mettre en surbrillance la case sélectionnée
   3. - [ ] Écrire les tests d'interaction

## Notes de Développement

- Utilisation de React pour les composants UI
- SVGs des pièces d'échecs provenant d'une bibliothèque open-source
- Implémentation d'un design responsive pour différentes tailles d'écran

## Journal de Communication

- BMad: Implémentons l'interface du plateau d'échecs
- AiAgent: Je vérifie les exigences de design. Devrions-nous utiliser SVG ou PNG pour les pièces?
  - BMad: Utilisons SVG pour une meilleure mise à l'échelle
- AiAgent: Implémentation de la grille terminée, je procède au placement des pièces
  </example>

<example type="invalid">
**Exemple à éviter**:

```markdown
Story Plateau d'Échecs

À faire:

- créer plateau
- ajouter pièces
- le faire fonctionner
```

Ce "story" manque de presque tous les éléments requis et notamment:

- Pas de section Risques et Hypothèses identifiés proactivement
- Pas de mesures d'atténuation pour les risques potentiels
- Pas de plan de validation des hypothèses sous-jacentes
  </example>

## ✅ Bonnes Pratiques

- **Clarté**: Utilisez un langage précis dans la description de la story
- **Atomicité**: Chaque story doit être suffisamment petite pour être complétée dans un sprint
- **Indépendance**: Minimisez les dépendances entre stories
- **Estimations**: Basez les points de story sur la complexité, pas sur le temps
- **Risques**: Identifiez proactivement les risques et prévoyez des mesures d'atténuation concrètes
- **Hypothèses**: Explicitez clairement les hypothèses et définissez comment les valider
- **Revues régulières**: Réévaluez périodiquement les risques et hypothèses pendant le développement
- **Tâches**: Décomposez en tâches techniques concrètes et vérifiables
- **Progression**: Mettez à jour régulièrement l'état des tâches et des hypothèses
- **Communication**: Documentez les décisions importantes dans le journal
- **Critères d'Acceptation**: Formulez-les dans un format "étant donné/quand/alors"

## 🔗 Références

- [Technique INVEST pour les User Stories](mdc:https:/www.agilealliance.org/glossary/invest)
- [Guide de l'Estimation Agile](mdc:https:/www.mountaingoatsoftware.com/blog/what-are-story-points)
- [Gestion des Risques en Agile](mdc:https:/www.pmi.org/learning/library/identifying-reducing-risks-agile-projects-6497)
- [Validation des Hypothèses](mdc:https:/www.thoughtworks.com/insights/blog/validating-product-ideas-through-hypothesis-driven-development)

<version>2.1.0</version>
