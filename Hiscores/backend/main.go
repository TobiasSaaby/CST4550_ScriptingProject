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
	r.Use(cors.Default())

	handlers.ConnectDatabase()
	handlers.InitiateDatabase()

	r.GET("/users", controllers.ShowAllUsers)
	r.POST("/users/register", controllers.RegisterUser)
	r.POST("/users/login", controllers.LoginUser)

	r.GET("/flags", controllers.ShowAllFlags)
	r.GET("/flags/:username", controllers.GetAllUserFlags)
	r.POST("/flags/create", controllers.CreateFlag)
	r.POST("/flags/submit", controllers.SubmitFlag)

	r.POST("/machines", controllers.CheckInstance)
	r.POST("/machines/init", controllers.InitInstance)
	r.POST("/machines/terminate", controllers.TerminateInstance)

	r.Run()
}
