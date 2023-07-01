import React, { useRef, useState, useEffect } from "react";
import "./ImageUpload.css";
import Button from "./Button";

const ImageUpload = (props) => {
	const [file, setFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const [valid, setValid] = useState(false);

	const inputRef = useRef();
	const toggleUpload = () => {
		inputRef.current.click();
	};

	const uploadFile = (event) => {
		let validity, file;
		if (event.target.files.length === 1) {
			console.log(event.target.files[0]);
			file = event.target.files[0];
			validity = true;
			setFile(file);
			setValid(true);
		} else {
			setValid(false);
			validity = false;
		}

		props.onInput(props.id, file, validity);
	};

	useEffect(() => {
		if (!file) {
			return;
		}

		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}, [file]);
	return (
		<div className="form-control">
			<input
				id={props.id}
				style={{ display: "none" }}
				type="file"
				accept=".jpg,.jpeg,.png"
				ref={inputRef}
				onChange={uploadFile}
			/>
			<div className={`image-upload ${props.center && "center"}`}>
				<div className="image-upload__preview">
					{previewUrl ? (
						<img src={previewUrl} alt="preview" />
					) : (
						<p>Please upload a profile picture</p>
					)}
				</div>
				<Button type="button" onClick={toggleUpload}>
					Upload Image
				</Button>
			</div>
			{!valid && <p>{props.errorText}</p>}
		</div>
	);
};

export default ImageUpload;
