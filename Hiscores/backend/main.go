package main

import (
	"fmt"
	"main/controllers"
	"main/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var err error

func main() {
	fmt.Println("wtf", err)

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders: []string{"Content-Type,access-control-allow-origin, access-control-allow-headers"},
	}))
	// r.Use(cors.Default())

	handlers.ConnectDatabase()
	handlers.InitiateDatabase()

	r.GET("/users", controllers.ShowAllUsers)
	r.POST("/users/register", controllers.RegisterUser)
	r.POST("/users/login", controllers.LoginUser)

	r.GET("/flags", controllers.ShowAllFlags)
	r.GET("/flags/:username", controllers.GetAllUserFlags)
	r.POST("/flags/create", controllers.CreateFlag)
	r.POST("/flags/submit", controllers.SubmitFlag)

	r.GET("/challenges", controllers.ShowAllChallenges)
	r.GET("/challenges/:username", controllers.GetChallengeStatusForUser)
	r.POST("/challenges", controllers.CheckInstance)
	r.POST("/challenges/init", controllers.InitInstance)
	r.POST("/challenges/terminate", controllers.TerminateInstance)

	r.Run()
}
