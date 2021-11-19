import React, { useEffect, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Chip from "@mui/material/Chip";
import * as PATHS from "../../utils/paths";
import * as PHOTOS_SERVICES from "../../services/photos";
import { Navigate, useNavigate } from "react-router";
import LoadingComponent from "../../components/Loading";
import { fileUpload } from "../../services/fileUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

function Photos({ user }) {
  const [listOfPhotos, setListOfPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageIsUploading, setImageIsUploading] = useState(false);
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState(null);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState("");

  const handleOpen = (id) => {};

  const handleClose = () => setOpen("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "max-content",
    bgcolor: "rgba(255, 255, 255, 0)",
    p: 4,
  };

  function handleChange(event) {
    const { name, value } = event.target;
    return setPhoto(value);
  }

  function handleImageUpload(event) {
    setImageIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("fileUrl", event.target.files[0]);
    fileUpload(uploadData).then((res) => {
      setPhoto(res.data.filePath);
      setImageIsUploading(false);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      photo,
      owner: user._id,
    };
    console.log(data);
    PHOTOS_SERVICES.addPhoto(data)
      .then((res) => {
        return PHOTOS_SERVICES.getAll();
      })
      .then((res) => {
        setListOfPhotos(res.data.photos);
        setIsLoading(false);
        setPhoto("");
        setShow(!show);
        navigate(PATHS.PHOTOS);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  function handleDelete(id) {
    PHOTOS_SERVICES.deletePhoto(id)
      .then((res) => {
        return PHOTOS_SERVICES.getAll();
      })
      .then((res) => {
        handleClose();
        setListOfPhotos(res.data.photos);
        navigate(PATHS.PHOTOS);
      })
      .catch((err) => setError(err.response.data.errorMessage));
  }

  useEffect(() => {
    PHOTOS_SERVICES.getAll()
      .then((res) => {
        setListOfPhotos(res.data.photos);
        setIsLoading(false);
      })
      .catch((err) => <Navigate to={PATHS.ERROR500} />);
  }, []);

  return (
    <div className="public__container">
      <Chip
        icon={<AddAPhotoIcon style={{ color: "white" }} />}
        label="Add photo"
        sx={{ color: "white" }}
        onClick={() => setShow(!show)}
      />
      <form
        hidden={show}
        onSubmit={handleSubmit}
        style={{ textAlign: "center" }}
      >
        <input
          type="file"
          name="image"
          onChange={handleImageUpload}
          className="form-control add-form form-control-sm"
          style={{ width: "70%", display: "inline" }}
        />
        <IconButton
          type="submit"
          disabled={imageIsUploading}
          sx={{ display: "inline" }}
        >
          <CheckCircleIcon fontSize="large" sx={{ color: "white" }} />
        </IconButton>
        {error && (
          <div className="error-block">
            <p className="auth__error">
              <span>{error}</span>
            </p>
          </div>
        )}
        {imageIsUploading && <LoadingComponent />}
      </form>
      {isLoading && <LoadingComponent />}
      <div className="photos__container">
        {listOfPhotos &&
          listOfPhotos.map((eachPhoto) => {
            return (
              <>
                <img
                  src={eachPhoto.photo}
                  alt="User's photo"
                  className="photos__image"
                  key={eachPhoto._id}
                  onClick={() => setOpen(eachPhoto._id)}
                />
              </>
            );
          })}
      </div>
      <div>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <button
              className="button__submit btn-orange btn add-recipe__submit-btn"
              type="button"
              onClick={() => handleDelete(open)}
            >
              Delete
            </button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Photos;
