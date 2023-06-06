package handlers

import (
	"fmt"
	"main/models"
	"os"
	"strconv"
	"strings"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	fmt.Println("Connecting to DB...")

	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	err = database.AutoMigrate(&models.User{}, &models.Flag{})
	if err != nil {
		return
	}

	DB = database
}

func InitiateDatabase() {
	fmt.Println("Initiating DB...")

	i := 1

	for {
		CTFString := fmt.Sprintf("CTF%v_", i)
		CTFScore, err := strconv.Atoi(os.Getenv(CTFString + "SCORE"))

		fmt.Println(fmt.Sprintf("Currently getting env. var. " + CTFString + "SCORE"))

		if err != nil {
			fmt.Println("Error when initiating DB: " + err.Error())
			break
		}

		fmt.Println(fmt.Sprintf("Creating %v flag!", i))

		CTFFlag := os.Getenv(CTFString + "FLAG")
		CTFAccess := os.Getenv(CTFString + "ACCESS")
		CTFDescription := os.Getenv(CTFString + "DESCRIPTION")
		CTFHosted := strings.Contains(CTFDescription, "ami")

		flag := models.Flag{Flag: CTFFlag, Description: CTFDescription, Score: CTFScore, Access: CTFAccess, Hosted: CTFHosted}

		DB.Create(&flag)

		i++
	}
}
