# Système de Validation pour Documentation Agile

Ce répertoire contient l'ensemble des outils d'automatisation pour valider la qualité des documents dans notre workflow agile standardisé. Ces outils garantissent la cohérence, la complétude et la conformité de notre documentation.

## 📋 Fonctionnalités

Le système de validation offre les fonctionnalités suivantes :

- **Validation syntaxique Markdown** - Vérification du formatage et de la structure des documents
- **Validation des diagrammes Mermaid** - Détection et vérification de la syntaxe des diagrammes
- **Vérification des critères d'acceptation** - Validation du format Gherkin (Étant donné/Quand/Alors)
- **Validation des tables de risques et hypothèses** - Vérification de la structure et des colonnes obligatoires
- **Génération de rapports de qualité** - Métriques et diagnostics sur la documentation du projet
- **Intégration Git** - Hooks pre-commit pour validation automatique lors des commits

## 🚀 Installation

### Prérequis

- Node.js v14 ou supérieur
- PNPM v10 ou supérieur

```bash
# Installation des outils et configuration
./setup-validation.sh
```

Ce script:

1. Vérifie les prérequis (Node.js v14+ et PNPM v10+)
2. Installe les dépendances locales avec PNPM
3. Installe markdownlint-cli et mermaid-cli globalement avec PNPM
4. Crée la configuration markdownlint personnalisée
5. Configure les hooks Git pour validation automatique

## 🔍 Utilisation

### Validation de Base

```bash
# Validation simple
./validate-docs.js .ai/*.md

# Validation avec sortie détaillée
./validate-docs.js --verbose .ai/*.md

# Tentative de correction automatique
./validate-docs.js --fix .ai/*.md
```

### Validation Ciblée

```bash
# Valider un document spécifique
./validate-docs.js --verbose path/to/document.md

# Valider tous les documents d'un type
./validate-docs.js --verbose .ai/*story*.md

# Valider et générer un rapport
./validate-docs.js --report .ai/*.md
```

### Scripts PNPM

Depuis le répertoire `scripts/`, vous pouvez utiliser les commandes pnpm suivantes:

```bash
# Installation
pnpm run install:tools

# Validation (diverses options)
pnpm run validate
pnpm run validate:verbose
pnpm run validate:fix
pnpm run validate:report
pnpm run validate:ci
```

## 🔧 Configuration

### Règles Markdownlint

Le fichier `.markdownlint.json` à la racine du projet contient les règles de validation Markdown. Vous pouvez l'ajuster selon vos besoins spécifiques.

Principales règles configurées:

- Longueur de ligne: 120 caractères maximum
- Indentation des listes: 2 espaces
- Structure de titre: Pas de titre dupliqué au même niveau
- Éléments HTML autorisés: `<version>`, `<critical>`, `<example>`

### Règles Personnalisées

Le dossier `.markdownlint-rules/` contient des règles supplémentaires spécifiques à notre workflow:

- `required-sections.js` - Vérifie la présence des sections obligatoires selon le type de document

## 📊 Rapports

Le rapport de validation généré par `--report` inclut:

```json
{
  "timestamp": "2023-03-01T12:34:56.789Z",
  "summary": {
    "total": 10,
    "passed": 8,
    "failed": 2,
    "duration": 1234
  },
  "results": {
    "path/to/document.md": {
      "markdownLint": { "success": true, "messages": [] },
      "mermaidDiagrams": {
        "success": false,
        "messages": ["Diagram #1 has syntax errors: ..."]
      },
      "acceptanceCriteria": {
        "success": true,
        "messages": ["3 acceptance criteria validated successfully"]
      },
      "risksAndAssumptions": {
        "success": true,
        "messages": ["Risks table structure is valid"]
      }
    }
  }
}
```

## 🔄 Intégration CI/CD

Pour intégrer ces validations dans un pipeline CI/CD (GitHub Actions, GitLab CI, etc.), utilisez:

```bash
./validate-docs.js --ci path/to/docs/*.md
```

L'option `--ci` fait que le script retourne un code d'erreur non-zéro en cas d'échec de validation, ce qui permet au pipeline de détecter les problèmes.

## 📃 Structure des Fichiers

```
scripts/
├── validate-docs.js            # Script principal de validation
├── create-markdownlint-config.js # Générateur de configuration
├── setup-validation.sh         # Script d'installation
├── package.json                # Définition des dépendances et scripts
├── validate-docs.bat           # Script Windows
└── README.md                   # Cette documentation
```

## 📚 Bonnes Pratiques

1. **Exécuter les validations localement** avant de commit pour éviter les surprises
2. **Corriger les problèmes rapidement** plutôt que de les laisser s'accumuler
3. **Mettre à jour les configurations** si les standards de documentation évoluent
4. **Consulter les rapports** régulièrement pour identifier les tendances
5. **Intégrer les validations** dans les revues d'itération pour discuter de la qualité documentaire

## 🔍 Résolution des Problèmes Courants

### Problèmes d'Installation

- **Échec de l'installation des dépendances**: Exécutez `pnpm install` manuellement dans le répertoire `scripts/` pour voir les messages d'erreur détaillés
- **Outils globaux non disponibles**: Assurez-vous que le répertoire global de PNPM est dans votre PATH

### Problèmes de Validation

- **Erreurs de Mermaid**: Vérifiez la syntaxe de vos diagrammes avec l'éditeur en ligne Mermaid Live Editor
- **Critères d'Acceptation Invalides**: Assurez-vous de suivre exactement le format "Étant donné/Quand/Alors"
- **Tables mal formatées**: Vérifiez que vos tables Markdown ont des en-têtes corrects et des lignes de séparation
