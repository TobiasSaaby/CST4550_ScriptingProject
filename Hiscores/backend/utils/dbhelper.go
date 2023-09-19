package utils

import (
	"main/models"
	"strconv"
)

func CompareUserChallengeFlags(user models.User, challengeFlags []models.Flag) string {
	total := len(challengeFlags)
	solved := 0

	for _, flag := range challengeFlags {
		if ContainsFlag(user.Flags, flag) {
			solved += 1
		}
	}

	if total == solved {
		return "Solved!"
	}

	return strconv.Itoa(solved) + "/" + strconv.Itoa(total)
}
