import React, { useEffect, useState } from "react";
import PlacesList from "../components/PlacesList";
import { useParams } from "react-router-dom";
import { useHttp } from "../../shared/hooks/httpHook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const API = process.env.REACT_APP_API;

const UserPlaces = () => {
	const { userId } = useParams();
	const [places, setPlaces] = useState(null);
	const { loading, error, sendRequest, clearError } = useHttp();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await sendRequest(`${API}/places/user/${userId}`);
				setPlaces(data);
			} catch (error) {}
		};
		fetchData();
	}, [sendRequest, userId]);

	console.log(userId);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{loading && <LoadingSpinner asOverlay />}
			<PlacesList
				places={places?.filter((place) => place.creator === userId)}
			/>
		</>
	);
};

export default UserPlaces;
