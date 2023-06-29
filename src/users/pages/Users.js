import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
const API = process.env.REACT_APP_API;
const Users = () => {
	const [users, setUsers] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			try {
				const response = await fetch(`${API}/users`);

				const data = await response.json();
				if (!response.ok) {
					throw new Error(data.message);
				}
				setUsers(data.users);
				setLoading(false);
			} catch (err) {
				setLoading(false);
				setError(err.message);
			}
		};

		fetchUsers();
	}, []);

	return (
		<>
			<ErrorModal error={error} onClear={() => setError("")} />
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
