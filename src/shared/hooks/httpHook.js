import { useState, useCallback, useRef, useEffect, useContext } from "react";
const AuthContext = require("../context/authContext");

export const useHttp = (token) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const auth = useContext(AuthContext);

	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(
		async (url, method = "GET", body = null, headers = {}) => {
			setLoading(true);
			if (token) {
				headers.authorization = `Bearer ${token}`;
			}

			const httpAbortCtrl = new AbortController();
			activeHttpRequests.current.push(httpAbortCtrl);
			try {
				const response = await fetch(url, {
					method,
					body,
					headers,
					signal: httpAbortCtrl.signal,
				});
				const data = await response?.json();

				if (!response.ok) {
					if (data?.message) {
						throw new Error(data.message);
					} else {
						throw new Error(
							"Something went wrong on our side, please try again"
						);
					}
				}

				activeHttpRequests.current = activeHttpRequests.current.filter(
					(ctrl) => ctrl !== httpAbortCtrl
				);
				setLoading(false);
				return data;
			} catch (err) {
				setError(err.message);
				setLoading(false);
				throw err;
			}
		},
		[token]
	);
	const clearError = () => setError(null);

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
		};
	}, []);
	return { loading, error, sendRequest, clearError };
};
