# Cursor Auto Rules pour Workflow Agile

## À propos du Projet

Ce projet fournit un ensemble complet de règles Cursor, de templates standardisés et d'outils de validation pour mettre en œuvre un workflow agile robuste, basé sur une documentation de haute qualité.

Conçu pour les équipes de développement qui souhaitent combiner l'agilité avec une documentation solide, ce projet offre:

- Des règles Cursor standardisées pour divers types de documents (PRD, Architecture, Stories)
- Un système de validation automatisée pour assurer la cohérence et la qualité
- Des tutoriels détaillés pour différents scénarios d'utilisation
- Des intégrations avec les pipelines CI/CD

## Structure du Projet

```
.
├── .cursor/rules/          # Règles Cursor standardisées
├── docs/                   # Tutoriels et documentation
│   ├── scenario-*.md       # Guides pour différents scénarios
│   └── index.md            # Table des matières des scénarios
├── scripts/                # Outils de validation et d'automation
│   ├── validate-docs.js    # Script de validation de la documentation
│   └── setup-validation.sh # Script d'installation
├── templates/              # Templates standardisés
│   ├── workflow-agile-standardized.md
│   ├── template-prd-standardized.md
│   ├── template-arch-standardized.md
│   └── template-story-standardized.md
└── README.md               # Ce fichier
```

## Démarrage Rapide

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-organisation/cursor-auto-rules-agile-workflow.git
cd cursor-auto-rules-agile-workflow

# Configurer les outils de validation
./scripts/setup-validation.sh
```

### Utilisation des règles Cursor

1. **Copiez les règles** dans votre répertoire `.cursor/rules/` (personnel ou projet)
2. **Consultez les tutoriels** dans le dossier `docs/` pour des instructions détaillées
3. **Utilisez les scripts** du dossier `scripts/` pour valider votre documentation

### Validation de Documentation

```bash
# Valider tous les documents
./scripts/validate-docs.js

# Valider un document spécifique
./scripts/validate-docs.js chemin/vers/document.md

# Générer un rapport détaillé
./scripts/validate-docs.js --report
```

## Tutoriels

Nous fournissons des guides détaillés pour différents scénarios d'utilisation:

1. [Première Utilisation des Règles Cursor](docs/scenario-1-premiere-utilisation.md)
2. [Mise à Jour d'une Story Existante](docs/scenario-2-mise-a-jour-story.md)
3. [Création et Intégration de Diagrammes Mermaid](docs/scenario-3-diagrammes-mermaid.md)
4. [Validation Automatisée de la Documentation](docs/scenario-4-validation-documentation.md)
5. [Adaptation des Templates Standardisés](docs/scenario-5-adaptation-templates.md)
6. [Intégration dans un Pipeline CI/CD](docs/scenario-6-integration-cicd.md)
7. [Création d'une Nouvelle Règle Cursor](docs/scenario-7-creation-regle-cursor.md)

Consultez le [guide d'utilisation complet](docs/index.md) pour une vue d'ensemble.

## Système de Validation

Le système de validation automatisée vérifie:

- **Formatage Markdown**: Structure des titres, formatage, etc.
- **Diagrammes Mermaid**: Syntaxe et validité des diagrammes
- **Critères d'Acceptation**: Format Gherkin et cohérence
- **Tableaux de Risques**: Structure et contenu

Pour une documentation complète sur la validation, consultez [le guide de validation](docs/scenario-4-validation-documentation.md).

## Contribution

Les contributions sont les bienvenues! Pour contribuer:

1. Forker le repository
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/nom-fonctionnalite`)
3. Committer vos changements (`git commit -am 'Ajout de fonctionnalité'`)
4. Pousser vers la branche (`git push origin feature/nom-fonctionnalite`)
5. Créer une Pull Request

Veuillez respecter les standards de code et de documentation du projet.

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue ou à contacter les mainteneurs du projet.

---

_Projet maintenu par Giak - 2023_
