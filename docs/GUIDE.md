# Guide d'Utilisation du Système de Règles et Templates

## Vue d'Ensemble du Système

```mermaid
graph TB
    A[Règles Cursor] --> B[Templates]
    A --> C[Workflow Agile]
    B --> D[PRD]
    B --> E[Architecture]
    B --> F[Stories]
    C --> G[Cycle de Développement]

    subgraph "Règles Fondamentales"
        A1[000-cursor-rules] --> A2[400-md-docs]
        A1 --> A3[801-workflow-agile]
    end

    subgraph "Templates Standards"
        D --> D1[901-prd-template]
        E --> E1[902-arch-template]
        F --> F1[903-story-template]
    end

    subgraph "Workflow"
        G --> G1[PRD]
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
    [*] --> PRD_Draft
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
    B --> B2[901-prd-template.mdc]
    B --> B3[...]

    C --> C1[prd.md]
    C --> C2[arch.md]
    C --> C3[stories/*.md]
```

### 2. Création d'un Nouveau Projet

1. **Initialisation**

   - Créer le dossier `.cursor/rules/`
   - Copier les règles standardisées
   - Initialiser le dossier `.ai/`

2. **Workflow Documentation**
   - Créer le PRD (`.ai/prd.md`)
   - Créer l'Architecture (`.ai/arch.md`)
   - Créer les Stories (`.ai/stories/*.md`)

### 3. Application des Règles

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
```

## Références

- [Documentation Mermaid](https://mermaid-js.github.io/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
