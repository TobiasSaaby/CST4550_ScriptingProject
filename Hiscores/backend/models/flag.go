package models

type Flag struct {
	Flag        string `json:"flag" gorm:"primary_key"`
	Score       int    `json:"score"`
	Hint        string `json:"hint"`
	ChallengeID int    `json:"challengeid"`
}

type SubmitFlag struct {
	Flag     string `json:"flag" binding:"required"`
	Username string `json:"username" binding:"required"`
}

type CreateFlag struct {
	Flag        string `json:"flag" binding:"required"`
	Description string `json:"description" binding:"required"`
	Access      string `json:"access" binding:"required"`
	Score       int    `json:"score" binding:"required"`
}
