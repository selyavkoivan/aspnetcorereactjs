import React, { Component } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import {faCloudUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSrc: null,
            cropData: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                rotate: 0,
                scaleX: 1,
                scaleY: 1,
            },
        };
        this.imageElement = React.createRef();
    }

    handleFileSelect = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            this.setState({ imageSrc: event.target.result });
            this.initCropper();
        };
        reader.readAsDataURL(file);
    };

    handleCrop = () => {
        const cropper = this.imageElement.current.cropper;
        const cropData = cropper.getData();
        this.setState({ cropData });
    };

    handleSubmit = () => {
        const { cropData } = this.state;
        const canvas = this.imageElement.current.cropper.getCroppedCanvas({
            width: cropData.width,
            height: cropData.height,
            left: cropData.x,
            top: cropData.y,
        });
        canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append('image', blob);
            // здесь вы можете отправить formData на сервер через AJAX или другим способом
        });
    };

    initCropper = () => {
        const cropper = new Cropper(this.imageElement.current, {
            viewMode: 1,
            aspectRatio: 1,
            crop: this.handleCrop,
        });
        cropper.cropper.setData(this.state.cropData);
    };

    render() {
        const { imageSrc } = this.state;
        return (
            <div>
                <label htmlFor="file" id="drop-area" className="col-12 p-5 border border-5 rounded">
                    <FontAwesomeIcon icon={faCloudUpload}/> Выберите или перетащите фото ...
                </label>
                <input type="file" id="file" name="file" className="d-none" accept="image/*"/>

                {imageSrc && (
                    <>
                        <img ref={this.imageElement} src={imageSrc} alt="Selected Image" />
                        <button onClick={this.handleSubmit}>Upload Image</button>
                    </>
                )}
            </div>
        );
    }
}
