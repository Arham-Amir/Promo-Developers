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
  const [byLaws, setByLaws] = useState({
    'Front Side': '',
    'Rear Side': '',
    'Left Side': '',
    'Right Side': '',
  });
  const { areas, imageUploading } = useSelector(state => state.itemManager)
  const dispatch = useDispatch()

  const handleByLawsChange = (e) => {
    const { name, value } = e.target;
    setByLaws((prevByLaws) => ({
      ...prevByLaws,
      [name]: value,
    }));
  };
  function handleSaveByLawsClick() {
    const resp = window.confirm("Are you sure you want to save")
    if (resp) {
      const byLawsToSave = Object.fromEntries(
        Object.entries(byLaws).map(([key, value]) => [key, value === '' ? 'null' : value])
      );
      setByLaws(byLawsToSave);
      dispatch(ItemManagerActions.addByLaws({ 'area': props.area, 'land': props.children, 'value': byLawsToSave }))
    }
  }
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
    if (areas[props.area][props.children]["ByLaws"]) {
      setByLaws(areas[props.area][props.children]["ByLaws"]);
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
          <section className="border-dashed border-y-2 p-4 flex flex-col gap-2">
            <section className="flex gap-2 items-center">
              <p>Front Side:</p>
              <input value={byLaws['Front Side']} onChange={handleByLawsChange} className='focus:outline-none w-[30%] bg-bg-1 py-2 px-3 rounded-md'
                placeholder="Leave empty for not mendatory" type="text" name="Front Side" id="Front Side" />
            </section>
            <section className="flex gap-2 items-center">
              <p>Rear Side:</p>
              <input value={byLaws['Rear Side']} onChange={handleByLawsChange} className='focus:outline-none w-[30%] bg-bg-1 py-2 px-3 rounded-md'
                placeholder="Leave empty for not mendatory" type="text" name="Rear Side" id="Rear Side" />
            </section>
            <section className="flex gap-2 items-center">
              <p>Left Side:</p>
              <input value={byLaws['Left Side']} onChange={handleByLawsChange} className='focus:outline-none w-[30%] bg-bg-1 py-2 px-3 rounded-md'
                placeholder="Leave empty for not mendatory" type="text" name="Left Side" id="Left Side" />
            </section>
            <section className="flex gap-2 items-center">
              <p>Right Side:</p>
              <input value={byLaws['Right Side']} onChange={handleByLawsChange} className='focus:outline-none w-[30%] bg-bg-1 py-2 px-3 rounded-md'
                placeholder="Leave empty for not mendatory" type="text" name="Right Side" id="Right Side" />
            </section>
            <button onClick={handleSaveByLawsClick} className="text-white bg-themeFont">Save</button>
          </section>
          <section className="border-dashed border-y-2 p-4 flex flex-col gap-2">
            <section className="flex gap-10 items-center">
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
              <h3 className="">Square Feet :</h3>
              <p className="text-2xl">{props.item["squareFeet"] || 0}</p>
            </section>
          </section>
          <section>
            <h3 className="p-4">Quanity Info:-</h3>
            <section className="flex gap-x-10 gap-y-5 flex-wrap" >
              {
                Object.keys(props.item).map((el, i) => {
                  {
                    return (el != "order" && el != "images" && el != "squareFeet" && el != "ByLaws") && <QuantityPerHouse
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
          </section>
        </div>
      )}
    </div>
  );
}

export default Areas;
