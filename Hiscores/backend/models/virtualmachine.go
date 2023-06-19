package models

type MachineRequest struct {
	ImageId  string `json:"imageid" binding:"required"`
	Username string `json:"username" binding:"required"`
}
