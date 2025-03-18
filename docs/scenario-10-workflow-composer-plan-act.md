# Scénario 10: Utilisation du Workflow Plan-Act dans le Composer

## 📋 Introduction

Ce scénario décrit l'utilisation et le fonctionnement de la règle "812-composer-workflow-standardized.mdc" pour Cursor. Cette règle implémente un workflow structuré en deux phases (Plan et Act) qui transforme fondamentalement la façon dont l'IA interagit avec vous dans le composer/chat de Cursor.

**Objectif principal**: Garantir un développement méthodique, structuré et efficient en séparant clairement les phases de planification et d'implémentation.

## 🔍 Contexte et problématique

### Problèmes courants dans le développement assisté par IA

Sans structure appropriée, l'utilisation de l'IA pour le développement peut entraîner plusieurs problèmes:

1. **Implémentation prématurée**: L'IA propose du code avant qu'un plan complet soit établi
2. **Solutions incomplètes**: Résolution partielle des problèmes sans vision globale
3. **Manque de cohérence**: Approches fragmentées et incohérentes
4. **Surengineering**: Solutions trop complexes par manque de planification claire
5. **Dérive des objectifs**: Perte de vue des objectifs initiaux durant l'implémentation

### Solution: Workflow Plan-Act

La règle "812-composer-workflow-standardized.mdc" résout ces problèmes en:

- Imposant une phase de planification avant toute implémentation
- Exigeant une approbation explicite du plan avant le passage à l'implémentation
- Assurant une implémentation fidèle au plan approuvé
- Fournissant un cadre cohérent et reproductible pour toutes les interactions

## ⚙️ Fonctionnement technique

### Mécanisme d'activation

La règle est configurée pour s'activer automatiquement à chaque utilisation du composer/chat grâce à:

```yaml
description: "TOUJOURS APPLIQUER SYSTÉMATIQUEMENT lors de CHAQUE UTILISATION du composer/chat pour GARANTIR développement méthodique et efficient"
globs: "**/*"
alwaysApply: true
priority: 85
```

Ces paramètres assurent que:

- La règle tente de s'appliquer à tous les fichiers (`globs: "**/*"`)
- Elle est injestée systématiquement dans le contexte (`alwaysApply: true`)
- Elle a une priorité élevée pour prévaloir sur les autres règles (`priority: 85`)

### Architecture des modes

Le workflow fonctionne avec deux modes distincts:

1. **Mode PLAN**:

   - État initial par défaut
   - Focus sur la planification complète
   - Aucun code n'est implémenté dans ce mode

2. **Mode ACT**:
   - Activé uniquement après approbation du plan
   - Focus sur l'implémentation exacte du plan approuvé
   - Pas de déviation par rapport au plan

### Transitions entre modes

- **PLAN → ACT**: L'utilisateur tape "ACT" pour approuver le plan
- **ACT → PLAN**: L'utilisateur tape "PLAN" en début de message pour revenir en planification

## 📝 Guide d'utilisation pas à pas

### 1. Démarrage d'une nouvelle session

Lorsque vous ouvrez un nouveau chat/composer:

1. L'IA indexe automatiquement votre codebase pour comprendre sa structure
2. Elle démarre en mode PLAN (indiqué par "# Mode: PLAN")
3. Chaque message commence par "RULEZ ENGAGED" pour confirmer l'activation de la règle

Exemple de message initial:

```
RULEZ ENGAGED
# Mode: PLAN

Bonjour! Je suis votre développeur senior avec plus de 20 ans d'expérience. Je vais vous aider à travailler sur ce projet.

J'ai analysé votre codebase et je comprends la structure générale. Pour avancer efficacement, travaillons ensemble sur un plan d'action.

Que souhaitez-vous accomplir aujourd'hui?
```

### 2. Phase de planification

Durant cette phase:

1. Décrivez clairement ce que vous souhaitez accomplir
2. L'IA vous posera des questions pour clarifier les exigences
3. Elle élaborera progressivement un plan détaillé incluant:
   - Liste des fichiers à modifier
   - Modifications spécifiques à apporter à chaque fichier
   - Approche technique détaillée

Un plan complet ressemblera à:

```
RULEZ ENGAGED
# Mode: PLAN

Voici le plan complet basé sur notre discussion:

## Fichiers à modifier:
1. `src/components/Auth.js` - Ajouter la validation pour les emails
2. `src/utils/validators.js` - Créer de nouvelles fonctions de validation
3. `src/styles/auth.css` - Ajouter des styles pour les états d'erreur

## Modifications détaillées:

### 1. src/components/Auth.js
- Ajouter un état pour les erreurs de validation email
- Implémenter la fonction validateEmail avant soumission du formulaire
- Afficher les messages d'erreur appropriés

### 2. src/utils/validators.js
- Créer une fonction validateEmail avec regex pour validation standard
- Ajouter des tests pour différents formats d'email
- Documenter les règles de validation

### 3. src/styles/auth.css
- Ajouter une classe .input-error pour champs invalides
- Créer un style pour les messages d'erreur
- Assurer la compatibilité mobile des nouveaux styles

Est-ce que ce plan vous convient? Si oui, tapez "ACT" pour commencer l'implémentation.
```

### 3. Approbation et transition vers l'implémentation

Quand le plan vous satisfait:

1. Tapez simplement "ACT" dans votre message
2. L'IA passera en mode ACT et commencera l'implémentation
3. Elle suivra scrupuleusement le plan approuvé

### 4. Phase d'implémentation

Durant cette phase:

1. L'IA implémente les changements selon le plan approuvé
2. Elle se concentre sur un code concis et efficace
3. Elle applique les meilleures pratiques d'un développeur expérimenté

Exemple de message en mode ACT:

```
RULEZ ENGAGED
# Mode: ACT

Je vais maintenant implémenter les changements selon notre plan approuvé.

Commençons par créer les fonctions de validation dans src/utils/validators.js:

[Implémentation du code selon le plan approuvé]
```

### 5. Retour à la phase de planification (si nécessaire)

Si vous souhaitez revenir à la planification:

1. Commencez votre message par "PLAN"
2. L'IA reviendra en mode PLAN
3. Vous pourrez ajuster ou redéfinir le plan

## 💡 Exemples pratiques

### Exemple 1: Ajout d'une nouvelle fonctionnalité

**Requête utilisateur**: "J'aimerais ajouter un système de notification par email lorsqu'un utilisateur s'inscrit."

**Phase PLAN** - L'IA élabore un plan:

```
RULEZ ENGAGED
# Mode: PLAN

Voici le plan pour implémenter les notifications par email à l'inscription:

## Fichiers à modifier:
1. `src/services/auth.js` - Ajouter l'appel au service d'email après inscription réussie
2. `src/services/email.js` - Créer ce nouveau service pour gérer l'envoi d'emails
3. `src/templates/emails/welcome.js` - Créer un template pour l'email de bienvenue
4. `.env` - Ajouter les variables d'environnement pour le service d'email
5. `package.json` - Ajouter la dépendance à nodemailer

## Modifications détaillées:
[détails pour chaque fichier]

Est-ce que ce plan vous convient? Si oui, tapez "ACT" pour commencer l'implémentation.
```

**Transition**: L'utilisateur tape "ACT"

**Phase ACT** - L'IA implémente la solution:

```
RULEZ ENGAGED
# Mode: ACT

Je vais maintenant implémenter le système de notification email selon notre plan.

Commençons par installer la dépendance nodemailer:

[Commande d'installation]

Maintenant, créons le service d'email dans src/services/email.js:

[Implémentation du code]
```

### Exemple 2: Correction d'un bug

**Requête utilisateur**: "Notre formulaire de contact ne valide pas correctement les numéros de téléphone."

**Phase PLAN** - L'IA analyse et planifie:

```
RULEZ ENGAGED
# Mode: PLAN

Après analyse, voici le plan pour corriger la validation des numéros de téléphone:

## Fichiers à modifier:
1. `src/utils/validators.js` - Corriger la regex de validation téléphonique
2. `src/components/ContactForm.js` - Mettre à jour les messages d'erreur
3. `src/tests/validators.test.js` - Ajouter des tests pour différents formats de numéros

## Modifications détaillées:
[détails pour chaque fichier]

Est-ce que ce plan vous convient? Si oui, tapez "ACT" pour commencer l'implémentation.
```

**Transition**: L'utilisateur tape "ACT"

**Phase ACT** - L'IA implémente la correction:

```
RULEZ ENGAGED
# Mode: ACT

Je vais maintenant corriger la validation des numéros de téléphone selon notre plan.

Commençons par mettre à jour la regex dans src/utils/validators.js:

[Implémentation du code]
```

## 🔧 Troubleshooting

### Problème: La règle ne s'active pas au démarrage

**Symptômes**:

- Les messages ne commencent pas par "RULEZ ENGAGED"
- L'IA n'indique pas "# Mode: PLAN"

**Solutions**:

1. Vérifiez que la règle est correctement placée dans `.cursor/rules/`
2. Confirmez que les paramètres de Cursor incluent "Inclure les règles du dossier .cursor/rules"
3. Forcez l'activation en commençant votre message par "@812-composer-workflow-standardized"

### Problème: L'IA génère du code en mode PLAN

**Symptômes**:

- L'IA propose des implémentations avant l'approbation du plan

**Solutions**:

1. Rappelez à l'IA qu'elle est en mode PLAN
2. Demandez explicitement "Pouvez-vous d'abord établir un plan complet avant toute implémentation?"
3. Redémarrez la conversation si nécessaire

### Problème: L'IA ne suit pas le plan approuvé

**Symptômes**:

- L'implémentation diffère significativement du plan approuvé

**Solutions**:

1. Rappeler à l'IA le plan précédemment approuvé
2. Revenir en mode PLAN avec "PLAN" pour redéfinir le plan si nécessaire
3. Être plus spécifique dans la phase de planification

## ✅ Bonnes pratiques

### Pour une planification efficace

1. **Soyez précis dans vos demandes initiales**

   - Décrivez clairement l'objectif, le contexte et les contraintes
   - Mentionnez les technologies et approches préférées

2. **Évaluez attentivement le plan proposé**

   - Vérifiez que tous les aspects sont couverts
   - Posez des questions si certains points ne sont pas clairs
   - N'hésitez pas à demander des ajustements

3. **Itérez sur le plan avant approbation**
   - Un plan bien défini garantit une implémentation réussie
   - N'approuvez le plan que lorsqu'il est vraiment complet

### Pour une implémentation réussie

1. **Laissez l'IA suivre le plan**

   - Évitez de demander des modifications majeures non planifiées
   - Pour des changements significatifs, revenez au mode PLAN

2. **Fournissez des retours rapides**

   - Indiquez si l'implémentation correspond à vos attentes
   - Signalez rapidement toute déviation par rapport au plan

3. **Utilisez les transitions de mode judicieusement**
   - Passez en mode PLAN pour toute refonte majeure
   - Restez en mode ACT pour des ajustements mineurs dans le cadre du plan

## 🚀 Avantages du workflow Plan-Act

1. **Qualité supérieure**

   - Code mieux pensé et plus cohérent
   - Solutions plus complètes et robustes

2. **Développement plus rapide**

   - Moins de temps perdu en corrections et révisions
   - Implémentation plus directe grâce à un plan clair

3. **Meilleure communication**

   - Compréhension partagée des objectifs et de l'approche
   - Attentes alignées entre l'utilisateur et l'IA

4. **Résultats plus prévisibles**

   - Réduction des surprises et des implémentations non désirées
   - Plus grande confiance dans le code généré

5. **Documentation intégrée**
   - Le plan sert de documentation pour les changements effectués
   - Trace claire des décisions techniques prises

## 📚 Concepts avancés

### Optimisation pour projets complexes

Pour les projets plus importants:

1. Divisez les grandes tâches en sous-plans gérables
2. Utilisez des transitions PLAN-ACT pour chaque composant majeur
3. Maintenez un document externe pour suivre l'avancement global

### Collaboration en équipe avec le workflow Plan-Act

1. Élaborez le plan en équipe pour bénéficier de perspectives diverses
2. Utilisez le plan comme document de référence pour les revues de code
3. Partagez le contexte de la conversation pour maintenir la cohérence

### Intégration avec d'autres règles Cursor

Le workflow Plan-Act fonctionne particulièrement bien avec:

- Règles de tests (TDD)
- Standards de documentation
- Règles de qualité de code
- Workflow agile

## 🔍 Conclusion

Le workflow Plan-Act transforme fondamentalement votre interaction avec l'IA de Cursor en imposant une méthodologie structurée qui favorise la réflexion avant l'action. Cette approche systématique produit un code de meilleure qualité, mieux pensé et plus aligné avec vos objectifs réels.

En suivant ce workflow, vous exploitez pleinement les capacités de l'IA tout en évitant les pièges courants de génération de code prématurée ou mal conçue. Le résultat est un processus de développement plus efficient, plus prévisible et produisant du code de qualité supérieure.
