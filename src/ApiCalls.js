export const login = async (email, password) => {
	const res = await fetch("http://localhost:5000/api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ email, password }),
		credentials: "include",
	}
	)
	return await res.json();
}

export const signup = async (name, email, password) => {
	const res = await fetch("http://localhost:5000/api/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ name, email, password }),
		credentials: "include",
	}
	)
	return await res.json();
}

const fetchData = async (url, method = "GET", body = {}) => {
	if (!url) {
		return {};
	}
	let reqOb = {
		method: method,
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "include",
	}
	if (method !== "GET") {
		reqOb = {
			...reqOb,
			body: JSON.stringify(body),
		}
	}
	const res = await fetch(url, reqOb);
	const r = await res.json();
	return r;
	// return await res.json();
}

export default fetchData;