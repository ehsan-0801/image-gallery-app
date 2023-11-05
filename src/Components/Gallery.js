import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./Gallery.css";
import { BsImageFill } from 'react-icons/bs';
import { IoCheckbox } from 'react-icons/io5';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [featureImageIndex, setFeatureImageIndex] = useState(0);

    // reference to the file input
    const fileInputRef = useRef(null);

    // Setting up the first image as the feature image
    useEffect(() => {
        if (images.length > 0) {
            setFeatureImageIndex(0);
        }
    }, [images]);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const updatedImages = [...images];
        const [reorderedImage] = updatedImages.splice(result.source.index, 1);
        updatedImages.splice(result.destination.index, 0, reorderedImage);

        setImages(updatedImages);

        // Updatting the feature image index
        if (result.source.index === featureImageIndex) {
            setFeatureImageIndex(result.destination.index);
        }
    };

    const addImage = (event) => {
        const newImages = [...images, URL.createObjectURL(event.target.files[0])];
        setImages(newImages);
        // Setting the newly added image as a feature image
        setFeatureImageIndex(newImages.length - 1);
    };

    const deleteImages = () => {
        const newImages = images.filter((_, index) => !selectedImages.includes(index));
        setImages(newImages);
        setSelectedImages([]);

        // Checking if the feature image is deleted and set the first image as the feature image
        if (featureImageIndex >= newImages.length) {
            setFeatureImageIndex(0);
        }
    };

    const handleFeatureImage = (index) => {
        setFeatureImageIndex(index);
    };

    const toggleImageSelection = (index) => {
        const updatedSelectedImages = [...selectedImages];
        if (updatedSelectedImages.includes(index)) {
            updatedSelectedImages.splice(updatedSelectedImages.indexOf(index), 1);
        } else {
            updatedSelectedImages.push(index);
        }
        setSelectedImages(updatedSelectedImages);
    };

    return (
        <div className=" bg-white lg:mx-4 lg:my-4 lg:py-24 lg:px-24 px-4 py-4 mx-2 my-2 rounded">
            {/* Header part */ }
            { selectedImages.length ? (
                <div className="container">
                    <p className="font-bold text-2xl flex justify-between items-center">
                        <IoCheckbox style={ { color: "blue" } }></IoCheckbox>{ selectedImages.length }
                        images selected
                    </p>
                    <button className="font-bold text-2xl" onClick={ deleteImages }>Delete</button>
                </div>
            ) : (
                <div className="container">
                    <h1 className="font-bold text-2xl">Gallery</h1>
                </div>
            ) }
            {/* Image Dragging and Droping part */ }
            <DragDropContext onDragEnd={ onDragEnd }>
                <Droppable droppableId="gallery" direction="horizontal">
                    { (provided) => (
                        <div
                            { ...provided.droppableProps }
                            ref={ provided.innerRef }
                            className="gallery"
                        >
                            { images.map((image, index) => (
                                <Draggable
                                    key={ index }
                                    draggableId={ `image-${index}` }
                                    index={ index }
                                >
                                    { (provided) => (

                                        <div ref={ provided.innerRef }
                                            { ...provided.draggableProps }
                                            { ...provided.dragHandleProps }
                                            className={ `image-container ${featureImageIndex === index ? "featured" : ""}` }>
                                            <img
                                                className="image"
                                                src={ image }
                                                alt={ `Image ${index}` }
                                                onClick={ () => handleFeatureImage(index) }
                                            />
                                            <input
                                                type="checkbox"
                                                checked={ selectedImages.includes(index) }
                                                onChange={ () => toggleImageSelection(index) }
                                                id={ `checkbox-${index}` }
                                                className="round-checkbox"
                                            />
                                        </div>
                                    ) }
                                </Draggable>
                            )) }
                            { provided.placeholder }
                        </div>
                    ) }
                </Droppable>
            </DragDropContext>

            {/* Input field for images */ }
            <div>

                <label className="custom-file-input" htmlFor="fileInput">
                    <div className="label-text">
                        <BsImageFill></BsImageFill>
                        <span>Add Image</span>
                    </div>
                </label>
                <input
                    type="file"
                    accept="image/*"
                    ref={ fileInputRef }
                    style={ { display: "none" } }
                    onChange={ addImage }
                    id="fileInput"
                />
            </div>
        </div>
    );
};

export default Gallery;
