'use client'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadMaps, fetchLandInfo, fetchLandExtraInfo } from "@redux/itemStore";
import AddOthersStuff from "./addOthersStuff/addOthersStuff.jsx";


const ShowLandInfo = ({ land, index }) => {
  const dispatch = useDispatch();
  const { landInfo, landOtherLoading } = useSelector((state) => state.itemManager);
  const [show, setShow] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [uploadButtonDisabled, setUploadButtonDisabled] = useState(true);

  const handleRadioChange = () => {
    dispatch(fetchLandExtraInfo(land))
    setShow(!show);
  };
  const handleImageChange = (event) => {
    const files = event.target.files;
    setSelectedImages(files);
    if (Array.from(files).length != 0) {
      setUploadButtonDisabled(false);
    }
    else {
      setUploadButtonDisabled(true);
    }
  };
  const handleUploadButton = () => {
    dispatch(uploadMaps({ land, images: selectedImages })).then(() => {
      dispatch(fetchLandInfo());
    })
  };

  useEffect(() => {
    if (landInfo[land] && landInfo[land]["images"] != "null") {
      setExistingImages(landInfo[land]["images"]);
    } else {
      setExistingImages([]);
    }
  }, [landInfo, land]);

  return (
    <div
      className={`max-w-full collapse collapse-arrow bg-base-200 rounded-none text-themeFont ${show ? "collapse-open" : ""
        }`}
    >
      <input
        className="max-w-full"
        type="radio"
        name={`my-accordion-${index}`}
        checked={show}
        onChange={() => { }}
        onClick={handleRadioChange}
      />
      <div
        className="max-w-full collapse-title text-2xl font-bold bg-bg-1 flex justify-between items-center"
        onClick={handleRadioChange}
      >
        {land}
      </div>
      {show && (landOtherLoading ? <span className="loading loading-dots loading-lg text-themeFont" />
        :
        <div className="collapse-content bg-white flex flex-col gap-5 pt-5">
          <section className="flex justify-between">
            <input
              className=""
              type="file"
              required
              name="myImage"
              accept="image/jpg, image/png, image/jpeg"
              id="formFile"
              multiple
              onChange={handleImageChange}
            />
          </section>
          <section className="flex flex-row gap-4 items-end">
            {selectedImages.length == 0 && existingImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Existing Image ${index + 1}`}
                width={100}
                height={100}
              />
            ))}
            {Array.from(selectedImages).map((img, ind) => (
              <img
                key={ind}
                src={URL.createObjectURL(img)}
                alt={`New Image ${ind + 1}`}
                width={100}
                height={100}
              />
            ))}
            <button
              className="btn btn-primary"
              disabled={uploadButtonDisabled}
              onClick={handleUploadButton}
            >
              Upload
            </button>
          </section>
          <AddOthersStuff land={land} place="RCC" />
          <AddOthersStuff land={land} place="PlinthADD" />
          <AddOthersStuff land={land} place="PlinthSUB" />
          <AddOthersStuff land={land} place="Radday" />
        </div>
      )}
    </div>
  );
};

export default ShowLandInfo;
