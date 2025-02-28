#!/bin/bash

# Script d'installation et de configuration des outils de validation pour la documentation agile
# Ce script installe et configure tous les outils nécessaires pour valider la documentation dans le flux agile

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Installation des Outils de Validation de Documentation Agile ===${NC}"

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js n'est pas installé. Veuillez l'installer avant de continuer.${NC}"
    echo "Vous pouvez l'installer depuis https://nodejs.org/"
    exit 1
fi

# Vérifier que PNPM est installé
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}PNPM n'est pas installé. Veuillez l'installer avant de continuer.${NC}"
    echo "Vous pouvez l'installer avec 'npm install -g pnpm' ou suivre les instructions sur https://pnpm.io/installation"
    exit 1
fi

# Vérifier la version de Node.js
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
NODE_MAJOR=$(echo $NODE_VERSION | cut -d '.' -f 1)

if [ $NODE_MAJOR -lt 14 ]; then
    echo -e "${RED}Version de Node.js trop ancienne. Version 14 ou supérieure requise.${NC}"
    echo "Version actuelle: $NODE_VERSION"
    echo "Veuillez mettre à jour Node.js avant de continuer."
    exit 1
fi

echo -e "${GREEN}✓ Node.js version $NODE_VERSION détecté${NC}"

# Vérifier la version de PNPM
PNPM_VERSION=$(pnpm --version)
echo -e "${GREEN}✓ PNPM version $PNPM_VERSION détecté${NC}"

# Aller dans le répertoire scripts
cd "$(dirname "$0")"

# Installer les dépendances locales
echo -e "\n${BLUE}Installation des dépendances locales...${NC}"
pnpm install
echo -e "${GREEN}✓ Dépendances locales installées${NC}"

# Installer les outils globaux
echo -e "\n${BLUE}Installation des outils globaux...${NC}"
pnpm add -g markdownlint-cli @mermaid-js/mermaid-cli
echo -e "${GREEN}✓ Outils globaux installés${NC}"

# Créer la configuration markdownlint
echo -e "\n${BLUE}Création de la configuration markdownlint...${NC}"
node create-markdownlint-config.js
echo -e "${GREEN}✓ Configuration markdownlint créée${NC}"

# Créer les hooks Git
HOOKS_DIR="../.git/hooks"
if [ -d "$HOOKS_DIR" ]; then
    echo -e "\n${BLUE}Configuration des hooks Git...${NC}"
    
    # Créer le hook pre-commit
    PRE_COMMIT="$HOOKS_DIR/pre-commit"
    cat > "$PRE_COMMIT" << 'EOF'
#!/bin/bash
# Hook de pre-commit pour valider les documents markdown
STAGED_MD_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.md$')

if [ -n "$STAGED_MD_FILES" ]; then
    echo "🔍 Validation des documents markdown modifiés..."
    
    # Récupérer le chemin absolu du répertoire du projet
    PROJECT_ROOT=$(git rev-parse --show-toplevel)
    
    # Exécuter la validation sur les fichiers stages
    "$PROJECT_ROOT/scripts/validate-docs.js" --ci $STAGED_MD_FILES
    RESULT=$?
    
    if [ $RESULT -ne 0 ]; then
        echo "❌ La validation a échoué. Veuillez corriger les problèmes avant de commit."
        exit 1
    else
        echo "✅ La validation a réussi."
    fi
fi

exit 0
EOF
    
    chmod +x "$PRE_COMMIT"
    echo -e "${GREEN}✓ Hook pre-commit créé${NC}"
else
    echo -e "${RED}Répertoire .git/hooks non trouvé. Les hooks Git n'ont pas été configurés.${NC}"
fi

# Créer un script d'exécution pour Windows
cat > validate-docs.bat << 'EOF'
@echo off
REM Script Windows pour exécuter la validation des documents
node "%~dp0\validate-docs.js" %*
EOF

echo -e "\n${GREEN}=== Installation terminée avec succès ===${NC}"
echo -e "Vous pouvez maintenant exécuter les validations avec: ${BLUE}./scripts/validate-docs.js${NC}"
echo -e "Ou utiliser les scripts pnpm: ${BLUE}cd scripts && pnpm run validate${NC}"
echo -e "\nLes validations seront également exécutées automatiquement lors des commits Git." 