#!/bin/bash

# === SCRIPT SETTINGS ===
# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Load environment variables from .env
if [ -f "$SCRIPT_DIR/.env" ]; then
    MONGO_URI=$(grep -E '^MONGO_URI=' "$SCRIPT_DIR/.env" | cut -d '=' -f2-)
else
    echo "Error: .env file not found in $SCRIPT_DIR"
    exit 1
fi

# Check if MONGO_URI is set
if [ -z "$MONGO_URI" ]; then
    echo "Error: MONGO_URI is not set in .env"
    exit 1
fi

# Use the project directory as the folder where the script is located
PROJECT_DIR="$SCRIPT_DIR"
BACKUP_DIR="$PROJECT_DIR/DatabaseBackup"
DATE=$(date +%F_%H-%M-%S)
ARCHIVE_NAME="mongo_backup_$DATE.tar.gz"

# === CREATE BACKUP FOLDER ===
mkdir -p "$BACKUP_DIR"

# === DUMP DATABASE ===
echo "Backing up MongoDB database..."
mongodump --uri="$MONGO_URI" --out="$BACKUP_DIR/$DATE"

# Check if dump was successful
if [ ! -d "$BACKUP_DIR/$DATE" ]; then
    echo "Error: mongodump failed. Backup folder not created."
    exit 1
fi

# === COMPRESS BACKUP ===
tar -czf "$BACKUP_DIR/$ARCHIVE_NAME" -C "$BACKUP_DIR" "$DATE"
rm -rf "$BACKUP_DIR/$DATE"
echo "Backup compressed to $ARCHIVE_NAME"

# === CLEANUP OLD BACKUPS (keep last 7) ===
ls -t $BACKUP_DIR/mongo_backup_* 2>/dev/null | sed -e '1,7d' | xargs -r rm -f

echo "Backup completed successfully!"
