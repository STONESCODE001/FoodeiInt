import React from "react";
import ImageUploading from "react-images-uploading";
import { Typography, Button } from "@material-tailwind/react";

export default function ImgUploader({ setImages }) {
    const [images, setLocalImages] = React.useState([]);
    const maxNumber = 3;

    const onChange = imageList => {
        setLocalImages(imageList);
        setImages(imageList); // Update parent component's state
    };

    return (
        <>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg"]}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => (
                    <div>
                        <div className="upload__image-wrapper flex p-5">
                            <Button
                                style={isDragging ? { color: "red" } : null}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Click or Drop Images
                            </Button>
                            &nbsp;
                            <Button onClick={onImageRemoveAll}>
                                Remove all images
                            </Button>
                        </div>
                        <Typography className="font-normal">
                            Limit is 3 images
                        </Typography>
                        <div className="flex p-2">
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item w-full">
                                    <img
                                        src={image.data_url}
                                        alt=""
                                        width="100"
                                        className="w-full"
                                    />
                                    <div className="image-item__btn-wrapper">
                                        <button
                                            onClick={() => onImageUpdate(index)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => onImageRemove(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </ImageUploading>
        </>
    );
}
