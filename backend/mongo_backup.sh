#!/bin/bash

# === CONFIG ===
MONGO_URI="mongodb+srv://techvibes:techvibes@cluster0.bkuqljx.mongodb.net/TechVibes"
PROJECT_DIR="/Users/jakaria/Desktop/techvibes/backend"
BACKUP_DIR="$PROJECT_DIR/DatabaseBackup"
DATE=$(date +%F_%H-%M-%S)
ARCHIVE_NAME="mongo_backup_$DATE.tar.gz"

# === BACKUP ===
mkdir -p "$BACKUP_DIR"   # ✅ creates the folder if it doesn’t exist
mongodump --uri="$MONGO_URI" --out="$BACKUP_DIR/$DATE"

# === COMPRESS ===
tar -czf "$BACKUP_DIR/$ARCHIVE_NAME" -C "$BACKUP_DIR" "$DATE"
rm -rf "$BACKUP_DIR/$DATE"

# === CLEANUP (keep only last 7 backups) ===
ls -t $BACKUP_DIR/mongo_backup_* 2>/dev/null | sed -e '1,7d' | xargs rm -f