package main

import (
    "fmt"
    "log"
    "net/http"
    "os"
    "strings"
    "time"

    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

// Initialize DB connection
func initDB() (*gorm.DB, error) {
    // Load .env file from the root directory
    if err := godotenv.Load("../.env"); err != nil {
        return nil, fmt.Errorf("error loading .env file: %v", err)
    }

    // Get database URL from environment variables
    dbURL := os.Getenv("DATABASE_URL")
    if dbURL == "" {
        return nil, fmt.Errorf("DATABASE_URL not found in environment variables")
    }

    // Configure PostgreSQL connection with SSL
    dsn := dbURL
    if !strings.Contains(dsn, "sslmode=") {
        if strings.Contains(dsn, "?") {
            dsn += "&sslmode=require"
        } else {
            dsn += "?sslmode=require"
        }
    }
    
    // Connect to PostgreSQL
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        return nil, fmt.Errorf("failed to connect to database: %v", err)
    }

    // Test the connection
    sqlDB, err := db.DB()
    if err != nil {
        return nil, fmt.Errorf("failed to get database instance: %v", err)
    }
    if err := sqlDB.Ping(); err != nil {
        return nil, fmt.Errorf("failed to ping database: %v", err)
    }

    // Set connection pool settings
    sqlDB.SetMaxIdleConns(2)
    sqlDB.SetMaxOpenConns(10)
    sqlDB.SetConnMaxLifetime(time.Hour)

    log.Println("Successfully connected to the database")
    return db, nil
}

func main() {
    // Initialize database
    db, err := initDB()
    if err != nil {
        log.Fatalf("Failed to initialize database: %v", err)
    }
    defer func() {
        sqlDB, _ := db.DB()
        sqlDB.Close()
    }()

    // Create Gin router
    r := gin.Default()

    // Test database connection endpoint
    r.GET("/api/health", func(c *gin.Context) {
        sqlDB, err := db.DB()
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "status":  "error",
                "message": "Database connection error",
            })
            return
        }

        if err := sqlDB.Ping(); err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{
                "status":  "error",
                "message": "Database ping failed",
            })
            return
        }

        c.JSON(http.StatusOK, gin.H{
            "status":  "ok",
            "message": "Database connection is healthy",
        })
    })

    // Example endpoint
    r.GET("/api/hello", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "message": "Hello from Go backend with database connection 👋",
        })
    })

    // Run the server on port 8080
    log.Println("Server is running on http://localhost:8080")
    if err := r.Run(":8080"); err != nil {
        log.Fatalf("Failed to start server: %v", err)
    }
}