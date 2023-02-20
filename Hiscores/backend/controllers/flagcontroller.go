package controllers

import (
	"fmt"
	"main/handlers"
	"main/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SubmitFlag(c *gin.Context) {
	var submitFlag models.SubmitFlag
	var user models.User
	var flag models.Flag

	if err := c.ShouldBindJSON(&submitFlag); err != nil {
		fmt.Println("Request not binding...")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	fmt.Println(submitFlag)

	if err := handlers.DB.Where("username = ?", submitFlag.Username).Find(&user).Error; err != nil {
		fmt.Println("User not found")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	fmt.Println(user)

	if err := handlers.DB.Where("flag = ?", submitFlag.Flag).Find(&flag).Error; err != nil {
		fmt.Println("Flag not found")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	fmt.Println(flag)

	handlers.DB.Model(&user).Association("Flags").Append(&models.Flag{Flag: flag.Flag})

	fmt.Println(user)
	handlers.DB.Save(user)

	c.JSON(http.StatusOK, gin.H{"Flag submitted:": flag})
}

func CreateFlag(c *gin.Context) {
	var flagToCreate models.CreateFlag

	if err := c.ShouldBindJSON(&flagToCreate); err != nil {
		fmt.Println("Not binding JSON")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	flag := models.Flag{Flag: flagToCreate.Flag, Description: flagToCreate.Description, Score: flagToCreate.Score, Access: flagToCreate.Access}
	handlers.DB.Create(&flag)

	c.JSON(http.StatusOK, gin.H{"Flag created:": flag})
}

func ShowAllFlags(c *gin.Context) {
	var flags []models.Flag
	handlers.DB.Find(&flags)

	c.JSON(http.StatusOK, gin.H{"data": flags})
}

func GetAllUserFlags(c *gin.Context) {
	var user models.User

	fmt.Println(c.Param("username"))
	if err := handlers.DB.Preload("Flags").Where("username = ?", c.Param("username")).First(&user).Error; err != nil {
		fmt.Println("Flags not found")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"Flags": user.Flags})
}
