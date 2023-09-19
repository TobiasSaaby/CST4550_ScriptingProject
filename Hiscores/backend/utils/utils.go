package utils

import (
	"main/models"
	"strings"
)

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

func AccessToType(access string) int {
	CTFType := 0

	if access != "" {
		CTFType++

		if strings.Contains(access, "ami") {
			CTFType++
		}
	}

	return CTFType
}
