package controllers

import (
	"fmt"
	"main/handlers"
	"main/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GET /books
// Get all books
func ShowAllUsers(c *gin.Context) {
	var users []models.User
	handlers.DB.Preload("Flags").Find(&users)

	c.JSON(http.StatusOK, gin.H{"data": users})
}

func RegisterUser(c *gin.Context) {
	fmt.Println("In Register")
	fmt.Println(c)

	var registerRequest models.RegisterUserRequest

	if err := c.ShouldBindJSON(&registerRequest); err != nil {
		fmt.Println("Not binding to JSON")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	if registerRequest.Password != registerRequest.RepeatPassword {
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": "Password not the same as RepeatPassword"})
		return
	}

	user := models.User{Username: registerRequest.Username, Password: registerRequest.Password}
	handlers.DB.Create(&user)

	c.JSON(http.StatusOK, gin.H{"data": user})
}

func LoginUser(c *gin.Context) {
	fmt.Println("Logging user in")

	var loginRequest models.LoginUserRequest
	var userCompare models.User

	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		fmt.Println("Not binding to JSON")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	if err := handlers.DB.Where("username = ?", loginRequest.Username).First(&userCompare).Error; err != nil {
		fmt.Println("User not found")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	if userCompare.Password != loginRequest.Password {
		fmt.Println("Passwords not matching")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": "Password not right"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": userCompare})
}
