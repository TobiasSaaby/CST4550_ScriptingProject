package utils

import "main/models"

func ContainsFlag(flagArray []models.Flag, flagToCheck models.Flag) bool {
	for _, flag := range flagArray {
		if FlagEqual(flag, flagToCheck) {
			return true
		}
	}
	return false
}

func FlagEqual(f1 models.Flag, f2 models.Flag) bool {
	return f1.Flag == f2.Flag
}
