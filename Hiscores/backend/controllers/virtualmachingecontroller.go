package controllers

import (
	"fmt"
	"io/ioutil"
	"main/models"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func InitInstance(c *gin.Context) {
	fmt.Println("Init")
	var initReq models.MachineRequest

	if err := c.ShouldBindJSON(&initReq); err != nil {
		fmt.Println("Not binding to JSON")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	fmt.Println(initReq.ImageId)
	fmt.Println(initReq.Username)

	req, err := http.Get("http://localhost:5000/ec2/init/" + initReq.ImageId)

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

	c.JSON(http.StatusOK, gin.H{"status": id})
}

func CheckInstance(c *gin.Context) {
	fmt.Println("Check")
	var initReq models.MachineRequest

	if err := c.ShouldBindJSON(&initReq); err != nil {
		fmt.Println("Not binding to JSON")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	req, err := http.Get("http://localhost:5000/ec2/" + initReq.ImageId)

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
		ip = ""
	}

	c.JSON(http.StatusOK, gin.H{"ip": ip})
}

func TerminateInstance(c *gin.Context) {
	fmt.Println("Terminate")
	var initReq models.MachineRequest

	if err := c.ShouldBindJSON(&initReq); err != nil {
		fmt.Println("Not binding to JSON")
		c.JSON(http.StatusBadRequest, gin.H{"ERROR": err.Error()})
		return
	}

	req, err := http.Get("http://localhost:5000/ec2/term/" + initReq.ImageId)

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

	c.JSON(http.StatusOK, gin.H{"status": "terminating"})
}
