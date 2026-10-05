package config

import (
	"fmt"
	"os"
	"strconv"
)

type Config struct {
	Port               string
	DBHost             string
	DBPort             string
	DBUser             string
	DBPassword         string
	DBName             string
	DBSSLMode          string
	CORSAllowedOrigins string
}

func Load() *Config {
	return &Config{
		Port:               getEnv("PORT", "8080"),
		DBHost:             getEnv("DB_HOST", "localhost"),
		DBPort:             getEnv("DB_PORT", "5432"),
		DBUser:             getEnv("POSTGRES_USER", getEnv("DB_USER", "katharos_user")),
		DBPassword:         getEnv("POSTGRES_PASSWORD", getEnv("DB_PASSWORD", "katharos_secret")),
		DBName:             getEnv("POSTGRES_DB", getEnv("DB_NAME", "katharos_db")),
		DBSSLMode:          getEnv("DB_SSLMODE", "disable"),
		CORSAllowedOrigins: getEnv("CORS_ALLOWED_ORIGINS", "*"),
	}
}

func (c *Config) DSN() string {
	port, _ := strconv.Atoi(c.DBPort)
	if port == 0 {
		port = 5432
	}
	return fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		c.DBHost, port, c.DBUser, c.DBPassword, c.DBName, c.DBSSLMode)
}

func getEnv(key, defaultVal string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return defaultVal
}
