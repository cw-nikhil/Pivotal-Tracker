export const getCookie = (cookie) => {
    let name = cookie + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieList = decodedCookie.split(";");
    for (let i = 0; i < cookieList.length; i++) {
        let c = cookieList[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

export const setCookie = (name, value, expiryDays) => {
    const d = new Date();
    d.setTime(d.getTime() + expiryDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
};

export const getUserFromCookie = () => {
	const cookie = getCookie("user");
	if (!cookie) {
		return;
	}
	const list = cookie.split('-');
	if (!list || list.length !== 2) {
		return;
	}
	return {
		name: list[0],
		id: list[1]
	};
}

export const deleteCookie = cookie => {
	const d = new Date();
	d.setTime(0);
	document.cookie = `${cookie}=; expires=${d.toUTCString()}; path=/;`;
}
