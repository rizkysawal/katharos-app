package main

import (
	"fmt"
	"os"
	"os/exec"
)

// Wrapper script: delegates to backend/cmd/seed_bible with proper module resolution
func main() {
	cmd := exec.Command("go", append([]string{"run", "./cmd/seed_bible"}, os.Args[1:]...)...)
	cmd.Dir = "backend"
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.Stdin = os.Stdin

	if err := cmd.Run(); err != nil {
		fmt.Fprintf(os.Stderr, "Error running seed_bible: %v\n", err)
		os.Exit(1)
	}
}
