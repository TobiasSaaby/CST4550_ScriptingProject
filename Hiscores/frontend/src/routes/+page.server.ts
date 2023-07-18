import { BACKEND_URL } from "../static/static_values"
import type { UserMachine } from "src/models/model.machine";

export const load = async ({locals}: {locals: any}) => {
    const reqUsers = await fetch(`${BACKEND_URL}/users`, {method: "GET"});
    const reqMachines = await fetch(`${BACKEND_URL}/machines`, {method: "GET"});

    const userTableData = (await reqUsers.json()).data;
    const machineTableData = (await reqMachines.json()).data;
    
    if(locals.user){
        const reqUserMachines = await fetch(`${BACKEND_URL}/machines/${locals.user}`, {method: "GET"});

        let userMachineState: UserMachine[] = (await reqUserMachines.json()).machines;

        userMachineState.map(x => machineTableData.find(y => y.id == x.machineid).state = x)
    }
    
    return {userTableData, machineTableData};
}

