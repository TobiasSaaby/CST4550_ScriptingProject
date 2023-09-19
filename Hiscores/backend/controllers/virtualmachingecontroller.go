package controllers

import (
	"fmt"
	"io/ioutil"
	"main/handlers"
	"main/models"
	"main/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func ShowAllChallenges(c *gin.Context) {
	var challenges []models.Challenge
	var resChallenges []models.ChallengeGetResponse

	handlers.DB.Find(&challenges)

	for _, challenge := range challenges {
		resChallenges = append(resChallenges, models.ChallengeGetResponse{ID: challenge.ID, Type: challenge.Type, Description: challenge.Description, Access: challenge.Access, Score: 200})
	}

	c.JSON(http.StatusOK, gin.H{"data": resChallenges})
}

func GetChallengeStatusForUser(c *gin.Context) {
	var userChallenges []models.UserChallenge

	if err := handlers.DB.Where("user_username = ?", c.Param("username")).Find(&userChallenges).Error; err != nil {
		fmt.Println("Challenges not found")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"challenges": userChallenges})
}

func InitInstance(c *gin.Context) {
	fmt.Println("Init")
	var initReq models.ChallengeInitRequest
	var userChallenge models.UserChallenge

	if err := c.ShouldBindJSON(&initReq); err != nil {
		fmt.Println("Not binding to JSON")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	userChallenge = models.UserChallenge{UserUsername: initReq.Username, ChallengeID: initReq.ChallengeId}
	handlers.DB.First(&userChallenge)

	fmt.Println(userChallenge)

	req, err := http.Get(utils.DeploymentURL + "/ec2/init/" + initReq.ImageId)

	if err != nil {
		fmt.Println("Cannot connect to Deployment API")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	res, err := ioutil.ReadAll(req.Body)

	if err != nil {
		fmt.Println("Cannot read response...")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	idDirty := strings.TrimSpace(string(res))
	id := strings.Trim(idDirty, "\"")

	userChallenge.InstanceId = id
	userChallenge.State = models.Initialising

	handlers.DB.Save(&userChallenge)

	c.JSON(http.StatusOK, gin.H{"status": id})
}

func CheckInstance(c *gin.Context) {
	fmt.Println("Check")
	var initReq models.ChallengeCheckRequest
	var userChallenge models.UserChallenge

	if err := c.ShouldBindJSON(&initReq); err != nil {
		fmt.Println("Not binding to JSON")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	userChallenge = models.UserChallenge{UserUsername: initReq.Username, ChallengeID: initReq.ChallengeId}
	handlers.DB.First(&userChallenge)

	fmt.Println(userChallenge)

	req, err := http.Get(utils.DeploymentURL + "/ec2/" + initReq.InstanceId)

	if err != nil {
		fmt.Println("Cannot connect to Deployment API")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	res, err := ioutil.ReadAll(req.Body)

	if err != nil {
		fmt.Println("Cannot read response...")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	ipDirty := strings.TrimSpace(string(res))
	ip := strings.Trim(ipDirty, "\"")

	if ip == "null" {
		c.JSON(http.StatusOK, gin.H{"ip": ""})
	}

	userChallenge.IP = ip
	userChallenge.State = models.Running

	handlers.DB.Save(&userChallenge)

	c.JSON(http.StatusOK, gin.H{"ip": ip})
}

func TerminateInstance(c *gin.Context) {
	fmt.Println("Terminate")
	var initReq models.ChallengeTermRequest
	var userChallenge models.UserChallenge

	if err := c.ShouldBindJSON(&initReq); err != nil {
		fmt.Println("Not binding to JSON")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	userChallenge = models.UserChallenge{UserUsername: initReq.Username, ChallengeID: initReq.ChallengeId}
	handlers.DB.First(&userChallenge)

	fmt.Println(userChallenge)

	req, err := http.Get(utils.DeploymentURL + "/ec2/term/" + initReq.InstanceId)

	if err != nil {
		fmt.Println("Cannot connect to Deployment API")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	res, err := ioutil.ReadAll(req.Body)

	if err != nil {
		fmt.Println("Cannot read response...")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	fmt.Println(string(res))

	userChallenge.InstanceId = ""
	userChallenge.IP = ""
	userChallenge.State = models.Started

	handlers.DB.Save(&userChallenge)

	c.JSON(http.StatusOK, gin.H{"status": "terminating"})
}
