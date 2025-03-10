# Guide d'Utilisation du Système de Règles et Templates

## Vue d'Ensemble du Système

```mermaid
graph TB
    A[Règles Cursor] --> B[Templates]
    A --> C[Workflow Agile]
    B --> BP[Fondation de Projet]
    B --> D[PRD]
    B --> E[Architecture]
    B --> F[Stories]
    C --> G[Cycle de Développement]
    BP --> D

    subgraph "Règles Fondamentales"
        A1[000-cursor-rules] --> A2[400-md-docs]
        A1 --> A3[801-workflow-agile]
    end

    subgraph "Templates Standards"
        BP --> BP1[800-project-foundation]
        D --> D1[901-prd-template]
        E --> E1[902-arch-template]
        F --> F1[903-story-template]
    end

    subgraph "Workflow"
        G --> G0[Fondation Technique]
        G0 --> G1[PRD]
        G1 --> G2[Architecture]
        G2 --> G3[Stories]
        G3 --> G4[Implémentation]
        G4 --> G5[Tests]
        G5 --> G1
    end
```

## Structure des Règles

```mermaid
classDiagram
    class BaseRule {
        +String title
        +String version
        +String description
        +String[] globs
        +Date lastUpdated
        +String[] tags
        +validate()
        +apply()
    }

    class CursorRule {
        +String context
        +String[] requirements
        +Example[] examples
        +validateFormat()
    }

    class Template {
        +String structure
        +String[] sections
        +String[] requirements
        +validate()
    }

    BaseRule <|-- CursorRule
    BaseRule <|-- Template
```

## Workflow Agile Détaillé

```mermaid
stateDiagram-v2
    [*] --> Project_Foundation
    Project_Foundation --> Project_Foundation_Review: Création
    Project_Foundation_Review --> Project_Foundation_Approved: Validation
    Project_Foundation_Approved --> PRD_Draft: Début PRD

    PRD_Draft --> PRD_Review: Création
    PRD_Review --> PRD_Approved: Validation
    PRD_Approved --> Arch_Draft: Début Architecture

    Arch_Draft --> Arch_Review: Création
    Arch_Review --> Arch_Approved: Validation
    Arch_Approved --> Stories_Draft: Création Stories

    Stories_Draft --> Stories_Review: Rédaction
    Stories_Review --> Stories_Approved: Validation
    Stories_Approved --> Implementation: Développement

    Implementation --> Testing: Tests
    Testing --> [*]: Déploiement
```

## Guide d'Utilisation

### 1. Organisation des Fichiers

```mermaid
graph LR
    A[Workspace] --> B[.cursor/rules]
    A --> C[.ai]
    A --> D[docs]
    A --> E[src]

    B --> B1[000-cursor-rules.mdc]
    B --> B1_5[800-project-foundation.mdc]
    B --> B2[901-prd-template.mdc]
    B --> B3[...]

    C --> C1[prd.md]
    C --> C2[arch.md]
    C --> C3[epic-1]
    C --> C4[epic-2]

    C3 --> C3_1[1-auth-login.story.md]
    C3 --> C3_2[2-user-profile.story.md]

    C4 --> C4_1[1-dashboard-ui.story.md]
    C4 --> C4_2[2-data-visualization.story.md]

    D --> D1[project-foundation.md]
```

### 2. Création d'un Nouveau Projet

1. **Initialisation**

   - Créer le dossier `.cursor/rules/`
   - Copier les règles standardisées
   - Initialiser le dossier `.ai/`

2. **Workflow Documentation**
   - Créer la fondation de projet (`docs/project-foundation.md`)
   - Créer le PRD (`.ai/prd.md`)
   - Créer l'Architecture (`.ai/arch.md`)
   - Créer les dossiers d'Epics (`.ai/epic-{n}/`)
   - Créer les Stories (`.ai/epic-{n}/{m}-{code}.story.md`)

### 3. Convention de Nommage des Stories

La nouvelle convention de nommage des stories suit ce format:

```
.ai/epic-{n}/{m}-{code}.story.md
```

Où:

- `{n}` est le numéro de l'Epic (ex: 1, 2, 3)
- `{m}` est le numéro de la Story dans l'Epic (ex: 1, 2, 3)
- `{code}` est un résumé du titre de la story en minuscules séparés par des tirets

Exemples:

- `.ai/epic-1/1-authentification-utilisateur.story.md`
- `.ai/epic-2/3-interface-plateau-echecs.story.md`
- `.ai/epic-3/7-gestion-erreurs-api.story.md`

### 4. Application des Règles

Les règles sont automatiquement appliquées en fonction des patterns glob :

- `*.md` → Règles de documentation Markdown
- `prd.md` → Template PRD
- `arch.md` → Template Architecture
- `*.story.md` → Template Story

## FAQ

### Questions Fréquentes

1. **Q: Comment sont détectées les règles ?**
   R: Les règles sont détectées via les patterns glob définis dans leur frontmatter.

2. **Q: Puis-je personnaliser les templates ?**
   R: Oui, en créant des versions personnalisées dans `.cursor/rules/` tout en respectant la structure de base.

3. **Q: Comment gérer les conflits entre règles ?**
   R: Les règles suivent une hiérarchie basée sur leur préfixe numérique (0XX > 9XX).

4. **Q: Comment mettre à jour les règles ?**
   R: Modifier les fichiers dans `.cursor/rules/` en incrémentant leur version.

5. **Q: Pourquoi cette nouvelle convention pour les stories ?**
   R: La convention `.ai/epic-{n}/{m}-{code}.story.md` améliore l'organisation et la lisibilité en groupant les stories par epic et en incluant un résumé descriptif dans le nom de fichier.

### Bonnes Pratiques

```mermaid
mindmap
    root((Bonnes Pratiques))
        Structure
            Suivre les templates
            Respecter la hiérarchie
            Maintenir la cohérence
        Documentation
            Être précis
            Inclure des exemples
            Utiliser des diagrammes
        Workflow
            Valider chaque étape
            Maintenir les versions
            Documenter les changements
        Maintenance
            Mettre à jour régulièrement
            Vérifier la cohérence
            Archiver les anciennes versions
        Stories
            Respecter la convention de nommage
            Organiser par epic
            Inclure un code descriptif
```

## Références

- [Documentation Mermaid](https://mermaid-js.github.io/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
