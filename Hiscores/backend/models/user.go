package models

type User struct {
  Username  string  `json:"username" gorm:"primary_key"` 
  Password  string  `json:"password"`
  Flags     []Flag  `json:"flags" gorm:"many2many:user_flags"`
}

type RegisterUserRequest struct {
  Username  string  `json:"username" binding:"required"` 
  Password  string  `json:"password" binding:"required"`
  RepeatPassword  string  `json:"repeat_password" binding:"required"`
}

type LoginUserRequest struct {
  Username  string  `json:"username" binding:"required"` 
  Password  string  `json:"password" binding:"required"`
}
