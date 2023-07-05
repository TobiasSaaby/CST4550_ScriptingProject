package utils

import (
	"main/models"
	"strconv"
)

func CompareUserMachineFlags(user models.User, machineFlags []models.Flag) string {
	total := len(machineFlags)
	solved := 0

	for _, flag := range machineFlags {
		if ContainsFlag(user.Flags, flag) {
			solved += 1
		}
	}

	if total == solved {
		return "Solved!"
	}

	return strconv.Itoa(solved) + "/" + strconv.Itoa(total)
}
