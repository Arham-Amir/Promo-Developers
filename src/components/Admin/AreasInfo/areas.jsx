'use client'
import { useEffect, useState } from "react";
import QuantityPerHouse from "@components/Admin/AreasInfo/quantityPerHouse";
import { ItemManagerActions, fetchAreas, uploadMaps } from "@redux/itemStore";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";

const Areas = (props = {}) => {
  const [squareFeet, setSquareFeet] = useState(0)
  const [show, setShow] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [uploadButtonDisabled, setUploadButtonDisabled] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const { areas, imageUploading } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()

  function handleSquareFeet() {
    dispatch(ItemManagerActions.editSqFeet({
      'area': props.area,
      'land': props.children,
      squareFeet
    }))
    dispatch(fetchAreas())
  }
  function handledeletebutton(e) {
    e.stopPropagation();
    dispatch(ItemManagerActions.deleteLandSize({ 'area': props.area, 'land': props.children }));
    dispatch(fetchAreas());
  }
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
    dispatch(uploadMaps({ 'area': props.area, 'land': props.children, images: selectedImages })).then(() => {
      dispatch(fetchAreas());
    })
  };

  useEffect(() => {
    if (areas[props.area][props.children]["images"]) {
      setExistingImages(areas[props.area][props.children]["images"]);
    } else {
      setExistingImages([]);
    }
  }, [areas]);

  return (
    <div className={`max-w-full collapse collapse-arrow bg-base-200 rounded-none border-b border-bg-dark text-themeFont ${show ? 'collapse-open' : ''}`}>
      <input onChange={() => { }} className="max-w-full" type="radio" name={`my-accordion-${props.id}`} checked={show} onClick={() => setShow(!show)} />
      <div className="max-w-full collapse-title text-2xl font-bold bg-bg-1 flex justify-between items-center" onClick={() => setShow(!show)}>
        <p>{props.children}</p>
        <button className='z-20' onClick={handledeletebutton}><RiDeleteBin5Line /></button>
      </div>
      {show && (
        <div className="collapse-content bg-white flex flex-col gap-5">
          <section className="flex flex-col gap-5 p-4">
            {imageUploading ? <p>Uploading images. Please wait...</p>
              : <>
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
                <section className="flex flex-row gap-2 items-end">
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
              </>}
          </section>
          <section>
            <section className="flex mx-4 gap-10 items-center">
              <input
                className='focus:outline-none h-[70%] w-[40%] bg-bg-1 py-2 px-3 rounded-md'
                value={squareFeet}
                onChange={(e) => setSquareFeet(e.target.value)}
                type="text"
                placeholder="Add Square Feet"
              />
              <button onClick={handleSquareFeet} className='text-white bg-themeFont'>ADD</button>
            </section>
            <section className="flex gap-5 items-center">
              <h3 className="p-4">Square Feet :</h3>
              <p className="text-2xl">{props.item["squareFeet"] || 0}</p>
            </section>
          </section>
          <h3 className="p-4">Quanity Info:-</h3>
          <section className="flex gap-10 flex-wrap" >
            {
              Object.keys(props.item).map((el, i) => {
                {
                  return (el != "order" && el != "images") && <QuantityPerHouse
                    key={i}
                    item={el}
                    area={props.area}
                    value={props.item[el]}
                    land={props.children}
                  />
                }
              })
            }
          </section>
        </div>
      )}
    </div>
  );
}

export default Areas;
