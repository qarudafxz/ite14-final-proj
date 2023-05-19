import { Queue } from "./regularQueue.js";
import { Stack } from "./vipStack.js";

const vipStack = new Stack();
const regularQueue = new Queue();

//first constraint -> the basis of lineups is the arrival of the boss
//whether he is arrived or left
//if arrived, only one line will be executed and that would be the Queue process

//second constraint -> the basis of serving is the type of the client
//if VIP, then the VIP stack will be served
//if regular, then the regular queue will be served

export const lineUp = (name, type, isSupervisorPresent) => {
	//served. All regular or VIP clients line up in
	//the queue if the supervisor is present.
	if (isSupervisorPresent) {
		regularQueue.enqueue(name);
		//If the supervisor is not in the office, it determines where a client lines
		//up. If the client is a regular client, then this client lines up at the RegularQueue. If the client is a VIP client,
		//then the client is pushed into the VIPStack.
	} else {
		if (type === "VIP") {
			vipStack.push(name);
			console.log(`VIP client ${name} lines up at VIPStack`);
		} else {
			regularQueue.enqueue(name);
			console.log(`Regular client ${name} lines up at RegularQueue`);
		}
	}
};

//second constraint -> the basis of serving is the type of the client
/*Serve signals that the counter is free and can accommodate one client. If the VIPStack contains clients,
these clients are prioritized over those in the RegularQueue. */
export const serve = (isSupervisorPresent) => {
	// Check if supervisor is present
	if (isSupervisorPresent) {
		// Serve VIP clients from VIPStack first
		if (!vipStack.isEmpty()) {
			console.log(`Now serving ${vipStack.pop()} from VIPStack`);
		} else if (!regularQueue.isEmpty()) {
			console.log(`Now serving ${regularQueue.dequeue()} from RegularQueue`);
		}
	} else {
		// Serve VIP clients from VIPStack
		if (!vipStack.isEmpty()) {
			console.log(`Now serving ${vipStack.pop()} from VIPStack`);
		} else if (!regularQueue.isEmpty()) {
			console.log(`Now serving ${regularQueue.dequeue()} from RegularQueue`);
		} else {
			console.log("RegularQueue empty");
		}
	}
};

//third constraint -> the basis of supervisor is the arrival of the supervisor
/* 
When a supervisor arrives and
the VIP stack has contents, pop them off and enqueue them onto the regular queue in the popped order.
CorruptQueue RegularQueue VIPStack
Once the VIP client is in the regular queue, the client never transfers to the VIP stack, even when the
supervisor leaves.*/
export const supervisorArrived = (isSupervisorPresent) => {
	isSupervisorPresent = true;
	console.log("Supervisor present");
	if (isSupervisorPresent && !vipStack.isEmpty()) {
		while (!vipStack.isEmpty()) {
			const client = vipStack.pop();
			//once the vip client is in the regular queue,
			//the client will never transfers to the VIP Stack
			regularQueue.enqueue(client);
		}
	}
};

export const supervisorLeft = (isSupervisorPresent) => {
	isSupervisorPresent = false;
	console.log("Supervisor not here");
};
