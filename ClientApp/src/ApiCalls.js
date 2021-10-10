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