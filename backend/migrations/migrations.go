package migrations

import (
	"context"
	"database/sql"
	"embed"
	"fmt"
	"log"
	"sort"
	"strings"
)

//go:embed *.sql
var MigrationFS embed.FS

// Run applies all embedded SQL migration files sequentially in alphabetical order.
// All migration scripts in this directory must be idempotent (using IF NOT EXISTS and ON CONFLICT).
func Run(ctx context.Context, db *sql.DB) error {
	entries, err := MigrationFS.ReadDir(".")
	if err != nil {
		return fmt.Errorf("failed to read embedded migrations dir: %w", err)
	}

	var sqlFiles []string
	for _, entry := range entries {
		if !entry.IsDir() && strings.HasSuffix(entry.Name(), ".sql") {
			sqlFiles = append(sqlFiles, entry.Name())
		}
	}
	sort.Strings(sqlFiles)

	for _, filename := range sqlFiles {
		log.Printf("[Migration] Verifying / applying: %s ...", filename)
		content, err := MigrationFS.ReadFile(filename)
		if err != nil {
			return fmt.Errorf("failed to read migration file %s: %w", filename, err)
		}

		if _, err := db.ExecContext(ctx, string(content)); err != nil {
			return fmt.Errorf("error executing migration %s: %w", filename, err)
		}
		log.Printf("[Migration] %s applied successfully.", filename)
	}

	return nil
}
