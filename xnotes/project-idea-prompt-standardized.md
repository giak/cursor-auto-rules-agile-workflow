# Template d'Idée de Projet

<version>2.0.0</version>

> Ce template sert à documenter les idées initiales de projet et à préparer le lancement d'un nouveau projet en suivant la méthodologie agile. Il aide à structurer les premières réflexions qui serviront de base à la création du PRD.

## 🎯 Vue d'Ensemble

Le template d'idée de projet est le point de départ pour tout nouveau projet. Il permet de capturer les premières réflexions et concepts qui seront ensuite développés dans le PRD (Product Requirements Document). Ce document sert de base pour la discussion initiale avec l'équipe ou l'agent IA et permet de clarifier la vision avant d'entrer dans les détails techniques.

## 📝 Structure Recommandée

### 1️⃣ Concept de Base

Décrivez brièvement le concept fondamental de votre projet en 2-3 phrases.

```
Je souhaite développer [type d'application] qui permettra à [utilisateurs cibles] de [action principale/bénéfice].
```

### 2️⃣ Problème Résolu

Quel problème spécifique ce projet résout-il?

```
Actuellement, [description du problème existant]. Ce projet vise à résoudre cela en [approche de solution].
```

### 3️⃣ Fonctionnalités Principales

Listez les 3-5 fonctionnalités essentielles que le projet devrait avoir.

```
- Fonctionnalité 1: [brève description]
- Fonctionnalité 2: [brève description]
- Fonctionnalité 3: [brève description]
```

### 4️⃣ Technologies Envisagées

Mentionnez les technologies que vous préférez utiliser ou souhaitez explorer.

```
Technologies frontend: [liste]
Technologies backend: [liste]
Base de données: [type]
Autres outils: [liste]
```

### 5️⃣ Contraintes ou Exigences Particulières

Y a-t-il des contraintes spécifiques à prendre en compte?

```
- Contrainte 1: [description]
- Contrainte 2: [description]
```

### 6️⃣ Questions Ouvertes

Questions auxquelles vous n'avez pas encore de réponse.

```
- Comment gérer [aspect spécifique]?
- Quelle approche serait meilleure pour [fonctionnalité]?
```

## 💡 Utilisation avec Cursor

Pour lancer un projet basé sur cette idée avec Cursor:

1. Complétez ce template avec vos idées initiales
2. Utilisez la commande `@agile` pour démarrer le workflow agile avec Cursor
3. Travaillez avec l'agent IA pour raffiner l'idée en un PRD complet
4. Suivez le processus agile pour développer l'architecture et les stories

## 📋 Exemple Complet

```markdown
# Idée de Projet: Application de Suivi des Dépenses

## Concept de Base

Je souhaite développer une application web NextJS 15 qui permettra aux particuliers de suivre leurs revenus et dépenses mensuelles avec une interface moderne et intuitive.

## Problème Résolu

Actuellement, de nombreuses personnes ont du mal à suivre efficacement leurs finances personnelles et se retrouvent souvent à utiliser des feuilles de calcul complexes ou des applications trop simplistes. Ce projet vise à résoudre cela en offrant une solution équilibrée entre simplicité d'utilisation et fonctionnalités avancées.

## Fonctionnalités Principales

- Tableau de bord visuel présentant un aperçu des finances avec graphiques
- Catégorisation automatique des transactions avec possibilité d'ajustement manuel
- Définition d'objectifs d'épargne et suivi des progrès
- Génération de rapports mensuels/annuels exportables
- Notifications pour dépenses inhabituelles ou dépassement de budget

## Technologies Envisagées

Technologies frontend: NextJS 15, React, TailwindCSS, Chart.js
Technologies backend: Next API Routes, Typescript
Base de données: Supabase (PostgreSQL)
Autres outils: NextAuth pour l'authentification, Vercel pour l'hébergement

## Contraintes ou Exigences Particulières

- L'application doit être entièrement responsive pour une utilisation mobile
- Sécurité renforcée pour les données financières sensibles
- Possibilité d'importation de données bancaires via CSV
- Temps de chargement rapide même avec de grandes quantités de données

## Questions Ouvertes

- Comment gérer la synchronisation avec les comptes bancaires des utilisateurs?
- Quelle approche serait la plus sécurisée pour stocker les données financières?
- Devrait-on proposer une application mobile native en plus de la version web?
```

## ⚠️ Points Importants

- Ce document est un point de départ, pas un PRD final
- Soyez aussi spécifique que possible tout en restant concis
- N'hésitez pas à inclure des inspirations (sites, applications existantes)
- Pensez aux besoins des utilisateurs plutôt qu'aux implémentations techniques à ce stade
- Utilisez ce template comme base de discussion avec l'agent IA pour développer un PRD complet

<version>2.0.0</version>
