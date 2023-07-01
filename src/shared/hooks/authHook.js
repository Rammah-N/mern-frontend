import { useEffect, useState, useCallback } from "react";

let logoutTimer;

export const useAuth = () => {
	const [token, setToken] = useState(false);
	const [tokenExpirationDate, setTokenEtokenExpirationDate] = useState(null);
	const [user, setUser] = useState(null);

	const login = useCallback((user, expDate) => {
		setToken(user.token);
		const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenEtokenExpirationDate(tokenExpirationDate);
		localStorage.setItem(
			"userData",
			JSON.stringify({
				...user,
				tokenExpirationDate: expDate || tokenExpirationDate.toISOString(),
			})
		);
		setUser(user);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setTokenEtokenExpirationDate(null);
		localStorage.removeItem("userData");
		setUser(null);
	}, []);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("userData"));
		if (
			userData &&
			userData.token &&
			new Date(userData.tokenExpirationDate) > new Date()
		) {
			login(userData, new Date(userData.tokenExpirationDate));
		}
	}, [login]);

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const expDateInMS = tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, expDateInMS);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	return { token, login, logout, user};
};
