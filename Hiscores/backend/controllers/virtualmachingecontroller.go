package controllers

import (
	"fmt"
	"io/ioutil"
	"main/handlers"
	"main/models"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func ShowAllMachines(c *gin.Context) {
	var machines []models.Machine
	var resMachines []models.MachineGetResponse

	handlers.DB.Find(&machines)

	for _, machine := range machines {
		resMachines = append(resMachines, models.MachineGetResponse{ID: machine.ID, Hosted: machine.Hosted, Description: machine.Description, Access: machine.Access, Score: 200})
	}

	c.JSON(http.StatusOK, gin.H{"data": resMachines})
}

func GetMachineStatusForUser(c *gin.Context) {
	var userMachines []models.UserMachine

	if err := handlers.DB.Where("user_username = ?", c.Param("username")).Find(&userMachines).Error; err != nil {
		fmt.Println("Machines not found")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"machines": userMachines})
}

func InitInstance(c *gin.Context) {
	fmt.Println("Init")
	var initReq models.MachineInitRequest
	var userMachine models.UserMachine

	if err := c.ShouldBindJSON(&initReq); err != nil {
		fmt.Println("Not binding to JSON")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	userMachine = models.UserMachine{UserUsername: initReq.Username, MachineID: initReq.MachineId}
	handlers.DB.First(&userMachine)

	fmt.Println(userMachine)

	req, err := http.Get("http://deployment:5000/ec2/init/" + initReq.ImageId)

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
	userMachine.InstanceId = id

	handlers.DB.Save(&userMachine)

	c.JSON(http.StatusOK, gin.H{"status": id})
}

func CheckInstance(c *gin.Context) {
	fmt.Println("Check")
	var initReq models.MachineCheckRequest
	var userMachine models.UserMachine

	if err := c.ShouldBindJSON(&initReq); err != nil {
		fmt.Println("Not binding to JSON")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	userMachine = models.UserMachine{UserUsername: initReq.Username, MachineID: initReq.MachineId}
	handlers.DB.First(&userMachine)

	fmt.Println(userMachine)

	req, err := http.Get("http://deployment:5000/ec2/" + initReq.InstanceId)

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

	userMachine.IP = ip

	handlers.DB.Save(&userMachine)

	c.JSON(http.StatusOK, gin.H{"ip": ip})
}

func TerminateInstance(c *gin.Context) {
	fmt.Println("Terminate")
	var initReq models.MachineTermRequest
	var userMachine models.UserMachine

	if err := c.ShouldBindJSON(&initReq); err != nil {
		fmt.Println("Not binding to JSON")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	userMachine = models.UserMachine{UserUsername: initReq.Username, MachineID: initReq.MachineId}
	handlers.DB.First(&userMachine)

	fmt.Println(userMachine)

	req, err := http.Get("http://deployment:5000/ec2/term/" + initReq.InstanceId)

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

	userMachine.InstanceId = ""
	userMachine.IP = ""

	handlers.DB.Save(&userMachine)

	c.JSON(http.StatusOK, gin.H{"status": "terminating"})
}
