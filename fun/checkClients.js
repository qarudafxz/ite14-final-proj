import fs from "fs";

export const checkClients = () => {
	return new Promise((resolve, reject) => {
		fs.readFile("./test_cases/INPUT - 2.txt", (err, data) => {
			if (err) {
				console.error("Error opening file!");
				reject(err);
				return;
			}

			resolve(data);
		});
	});
};
