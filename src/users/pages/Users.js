import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttp } from "../../shared/hooks/httpHook";

const API = process.env.REACT_APP_API;
const Users = () => {
	const [users, setUsers] = useState(null);
	const { error, loading, sendRequest, clearError } = useHttp();
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await sendRequest(`${API}/users`);
				setUsers(data);
			} catch (err) {}
		};

		fetchUsers();
	}, [sendRequest]);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{loading && (
				<div className="center">
					<LoadingSpinner asOverlay />
				</div>
			)}
			<UsersList users={users} />
		</>
	);
};

export default Users;
