import axios from "axios";

const URL = "http://localhost:5000/bankHook";

const addMoney = async ({
	amount,
	userId,
}: {
	amount: number;
	userId: string;
}) => {
	const response = await axios.post(URL, {
		token: `token-${Math.floor(Math.random() * 1000000)}`,
		amount,
		userId,
	});

	const data = response?.data;

	return data;
};

export { addMoney };
