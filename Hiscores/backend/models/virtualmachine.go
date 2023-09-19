package models

const (
	Started      int = 0
	Running          = 1
	Initialising     = 2
	Finished         = 3
)

const (
	Quiz      int = 0
	Spawnable     = 1
	FFA           = 2
)

type Challenge struct {
	ID          int    `json:"id" gorm:"primary_key"`
	Access      string `json:"access"`
	Type        int    `json:"type"`
	Description string `json:"description"`
	Flags       []Flag `json:"flags"`
}

type UserChallenge struct {
	ChallengeID  int    `json:"challengeid" gorm:"primaryKey"`
	UserUsername string `json:"userusername" gorm:"primaryKey"`
	InstanceId   string `json:"instanceid"`
	Status       string `json:"status"`
	IP           string `json:"ip"`
	State        int    `json:"state"`
}

type ChallengeInitRequest struct {
	ChallengeId int    `json:"challengeid" binding:"required"`
	ImageId     string `json:"imageid" binding:"required"`
	Username    string `json:"username" binding:"required"`
}

type ChallengeCheckRequest struct {
	ChallengeId int    `json:"challengeid" binding:"required"`
	InstanceId  string `json:"instanceid" binding:"required"`
	Username    string `json:"username" binding:"required"`
}

type ChallengeTermRequest struct {
	ChallengeId int    `json:"challengeid" binding:"required"`
	InstanceId  string `json:"instanceid" binding:"required"`
	Username    string `json:"username" binding:"required"`
}

type ChallengeGetResponse struct {
	ID          int    `json:"id"`
	Type        int    `json:"type"`
	Description string `json:"description"`
	Score       int    `json:"score"`
	Access      string `json:"access"`
}
