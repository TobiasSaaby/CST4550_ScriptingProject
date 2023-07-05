package handlers

import (
	"fmt"
	"main/models"
	"os"
	"strconv"
	"strings"

	"github.com/joho/godotenv"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	envErr := godotenv.Load("../../.env")

	if envErr != nil {
		panic("Error loading .env file")
	}

	fmt.Println("Connecting to DB...")

	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	err = database.SetupJoinTable(&models.User{}, "Machines", &models.UserMachine{})

	if err != nil {
		fmt.Println(err.Error())
		panic("Failed to create join table!")
	}

	err = database.AutoMigrate(&models.User{}, &models.Flag{}, &models.Machine{})
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

		fmt.Println(fmt.Sprintf("Currently getting env. var. " + CTFString + "SCORE"))

		CTFScoreString := os.Getenv(CTFString + "SCORE")

		fmt.Println(CTFScoreString)
		CTFScore, err := strconv.Atoi(CTFScoreString)

		if err != nil {
			fmt.Println("Error when initiating DB: " + err.Error())
			break
		}

		fmt.Println(fmt.Sprintf("Creating %v flag!", i))

		CTFFlags := strings.Split(os.Getenv(CTFString+"FLAG"), ", ")
		CTFAccess := os.Getenv(CTFString + "ACCESS")
		CTFDescription := os.Getenv(CTFString + "DESCRIPTION")
		CTFHosted := strings.Contains(CTFAccess, "ami")

		machine := models.Machine{ID: i, Access: CTFAccess, Description: CTFDescription, Hosted: CTFHosted, Flags: []models.Flag{}}

		for _, CTFFlag := range CTFFlags {
			flag := models.Flag{Flag: string(CTFFlag), Score: CTFScore}

			machine.Flags = append(machine.Flags, flag)

			DB.Create(&flag)
		}

		DB.Create(&machine)

		i++
	}
}
