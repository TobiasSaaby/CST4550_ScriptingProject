package utils

import (
	"fmt"
	"os"
)

var DeploymentURL string

func init() {
	DeploymentURL = os.Getenv("PUBLIC_DEPLOY_URL")

	if DeploymentURL == "" {
		DeploymentURL = "http://localhost:5000"
	}

	fmt.Println("Deployment URL set to:", DeploymentURL)
}
