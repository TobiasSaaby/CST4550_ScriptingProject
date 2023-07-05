export interface Machine{
    id: number;
    description: string;
    score: number;
    access: string;
    hosted: boolean;
    state: UserMachine;
}

export interface UserMachine {
	machineid: number;
	userusername: string;
	instanceid: string;
	status: string;
	ip: string;
}
