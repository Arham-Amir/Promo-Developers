'use client'
import { fetchMembers, uploadMemberLogo } from '@redux/itemStore';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const AddMember = () => {
  const [uploadButtonDisabled, setUploadButtonDisabled] = useState(true);
  const [cloading, setcloading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [name, setName] = useState("");
  const dispatch = useDispatch()

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
    if (name == "" || selectedImages.length == 0) {
      toast.error("Complete Input Fields First !")
    }
    else {
      const confirm = window.confirm("Are you sure you want to upload")
      if (confirm) {
        setcloading(prev => true)
        dispatch(uploadMemberLogo({ 'name': name, images: selectedImages })).then(() => {
          dispatch(fetchMembers()).then(() => {
            setcloading(prev => false)
          })
        })
      }
    }
  };

  return (
    <section className="flex flex-col gap-5">
      <input name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}
        className='focus:outline-none w-[30%] bg-bg-1 py-2 px-3 rounded-md'
        placeholder="Enter Member Name" type="text" />
      {cloading ? <p>Uploading image. Please wait...</p>
        : <>
          <section className="flex justify-between">
            <input
              className=""
              type="file"
              required
              name="myImage"
              accept="image/jpg, image/png, image/jpeg"
              id="formFile"
              onChange={handleImageChange}
            />
          </section>
        </>}
      <button
        className="btn btn-primary"
        disabled={uploadButtonDisabled}
        onClick={handleUploadButton}
      >
        Upload
      </button>
    </section>
  );
}

export default AddMember;
