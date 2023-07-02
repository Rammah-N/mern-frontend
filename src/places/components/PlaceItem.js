import React, { useState, useContext } from "react";

import { AuthContext } from "../../shared/context/authContext";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { useHttp } from "../../shared/hooks/httpHook";
import "./PlaceItem.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const API = process.env.REACT_APP_API;
const URL = process.env.REACT_APP_URL;
const PlaceItem = ({ place, onDelete }) => {
	const auth = useContext(AuthContext);
	const { loading, error, sendRequest, clearError } = useHttp(auth.token);
	const [showMap, setShowMap] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const openMap = () => setShowMap(true);
	const closeMap = () => setShowMap(false);

	const openDelete = () => setShowDelete(true);
	const closeDelete = () => setShowDelete(false);

	const deletePlace = async () => {
		await sendRequest(`${API}/places/${place.id}`, "DELETE");
		onDelete(place.id);
		setShowDelete(false);
	};
	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{loading && <LoadingSpinner asOverlay />}
			<Modal
				show={showMap}
				onCancel={closeMap}
				header={place.address}
				contentClass="place-item__modal-content"
				footerClass="place-item__modal-actions"
				footer={<Button onClick={closeMap}>Close Map</Button>}>
				<div className="map-container">
					<Map center={place.location} zoom={16} title={place.title} />
				</div>
			</Modal>
			<Modal
				show={showDelete}
				onCancel={closeDelete}
				header="Delete place"
				footerClass="place-item__modal-actions"
				footer={
					<div className="center">
						<Button onClick={closeDelete} inverse>
							Cancel
						</Button>
						<Button danger onClick={deletePlace}>
							Delete
						</Button>
					</div>
				}>
				<div className="center">
					<p>Do you want to proceed?</p>
				</div>
			</Modal>
			<li className="place-item">
				<Card>
					<div className="place-item__image">
						<img src={`${URL}/${place.image}`} alt={place.title} />
					</div>
					<div className="place-item__info">
						<h2>{place.title}</h2>
						<h3>{place.address}</h3>
						<p>{place.description}</p>
					</div>
					<div className="place-item__actions">
						<Button inverse onClick={openMap}>
							View On Map
						</Button>
						{auth.user?.id === place?.creator && (
							<>
								<Button to={`/places/${place.id}`}>Edit</Button>
								<Button danger onClick={openDelete}>
									Delete
								</Button>
							</>
						)}
					</div>
				</Card>
			</li>
		</>
	);
};

export default PlaceItem;
