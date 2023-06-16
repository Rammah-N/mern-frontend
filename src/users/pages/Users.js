import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
	const USERS = [
		{
			id: "1",
			image: "https://dummyimage.com/400x400/000/fff",
			name: "John Doe",
			places: 7,
		},
		{
			id: "2",
			image: "https://dummyimage.com/400x400/000/fff",
			name: "Jane Smith",
			places: 3,
		},
		{
			id: "3",
			image: "https://dummyimage.com/400x400/000/fff",
			name: "David Johnson",
			places: 10,
		},
		{
			id: "4",
			image: "https://dummyimage.com/400x400/000/fff",
			name: "Sarah Williams",
			places: 5,
		},
		{
			id: "5",
			image: "https://dummyimage.com/400x400/000/fff",
			name: "Michael Brown",
			places: 2,
		},
	];

	return <UsersList users={USERS} />;
};

export default Users;
