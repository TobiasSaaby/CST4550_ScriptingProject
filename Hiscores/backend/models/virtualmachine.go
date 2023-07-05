package models

type Machine struct {
	ID          int    `json:"id" gorm:"primary_key"`
	Access      string `json:"access"`
	Hosted      bool   `json:"hosted"`
	Description string `json:"description"`
	Flags       []Flag `json:"flags"`
}

type UserMachine struct {
	MachineID    int    `json:"machineid" gorm:"primaryKey"`
	UserUsername string `json:"userusername" gorm:"primaryKey"`
	InstanceId   string `json:"instanceid"`
	Status       string `json:"status"`
	IP           string `json:"ip"`
}

type MachineInitRequest struct {
	MachineId int    `json:"machineid" binding:"required"`
	ImageId   string `json:"imageid" binding:"required"`
	Username  string `json:"username" binding:"required"`
}

type MachineCheckRequest struct {
	MachineId  int    `json:"machineid" binding:"required"`
	InstanceId string `json:"instanceid" binding:"required"`
	Username   string `json:"username" binding:"required"`
}

type MachineTermRequest struct {
	MachineId  int    `json:"machineid" binding:"required"`
	InstanceId string `json:"instanceid" binding:"required"`
	Username   string `json:"username" binding:"required"`
}

type MachineGetResponse struct {
	ID          int    `json:"id"`
	Hosted      bool   `json:"hosted"`
	Description string `json:"description"`
	Score       int    `json:"score"`
	Access      string `json:"access"`
}
