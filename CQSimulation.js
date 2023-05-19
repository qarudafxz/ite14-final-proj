import { checkClients } from "./fun/checkClients.js";
import {
	lineUp,
	serve,
	supervisorArrived,
	supervisorLeft,
} from "./fun/action.js";

let isSupervisorPresent = false;

const corruptOffice = async () => {
	try {
		const data = await checkClients();
		const lines = data.toString().split("\n");

		//optimize
		//Time complexity -> O(n)
		//Space complexity -> O(n)
		//#1 step -> separate clients based on their types
		for (let i = 0; i < lines.length; i++) {
			const [action, ...args] = lines[i].split(",");
			const [name, type] = args.map((arg) => arg.trim());

			switch (action) {
				case "lineup":
					lineUp(name, type, isSupervisorPresent);
					break;

				case "serve":
					serve(isSupervisorPresent);
					break;

				case "arrive":
					supervisorArrived(isSupervisorPresent);
					break;

				case "leave":
					supervisorLeft(isSupervisorPresent);
					break;
			}
		}
	} catch (err) {
		console.error("Error occurred:", err);
	}
};

corruptOffice();

//Old

//time complexity -> O(n^2) where I have to loop through each lines of the file and then loop through each client object
// lines.forEach((line) => {
// 	//#1 constraint -> first token would be the lineup
// 	if (line.includes("lineup")) {
// 		const [_, name, type] = line.split(",");
// 		clientObject.client.push({ name, type });

// 		clientObject.client?.forEach((client) => {
// 			client.type === "VIP"
// 				? vipStack.push(client.name)
// 				: regularQueue.enqueue(client.name);
// 		});
// 	} else if (line.includes("serve")) {
// 		const [_, type] = line.split(",");
// 		if (type === "VIP") {
// 			console.log(vipStack.pop());
// 		} else {
// 			console.log(regularQueue.dequeue());
// 		}
// 	}
// });

// clientObject.client?.forEach((client) => {
// 	console.log(client.name, client.type);
// });
