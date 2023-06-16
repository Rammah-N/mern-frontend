import React from "react";

import Card from "../../shared/components/UIElements/Card";
import UserItem from "./UserItem";
import "./UsersList.css";

const UsersList = ({ users }) => {
	if (users.length === 0) {
		return (
			<Card>
				<h2>No Users Found</h2>
			</Card>
		);
	}

	return (
		<ul className="users-list">
			{users.map((user) => (
				<UserItem key={user.id} user={user} />
			))}
		</ul>
	);
};

export default UsersList;
