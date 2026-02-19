#!/bin/bash
# Database Backup Script
# Run before executing live migration

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups/migration_${TIMESTAMP}"

echo "🔵 Creating MongoDB backup..."
echo "Timestamp: ${TIMESTAMP}"
echo "Backup directory: ${BACKUP_DIR}"

# Note: This requires mongodump to be installed
# For Windows PowerShell, use mongodump directly

mkdir -p "${BACKUP_DIR}"

# Backup command (adjust based on your MongoDB setup)
# mongodump --uri="${MONGODB_URI}" --out="${BACKUP_DIR}"

echo ""
echo "⚠️  MANUAL BACKUP REQUIRED:"
echo "   1. Open MongoDB Compass or mongosh"
echo "   2. Export parashari database to: ${BACKUP_DIR}"
echo "   3. Or run: mongodump --uri=<MONGODB_URI> --out=${BACKUP_DIR}"
echo ""
echo "After backup is complete, proceed with migration."
