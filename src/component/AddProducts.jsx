import React, { useState } from "react";
import { storage, fs } from "../config/Config";

const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const [imageError, setImageError] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImage = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError("");
      } else {
        setImage(null);
        setImageError("please select valid image file type (png or jpg)");
      }
    } else {
      console.log("please select your file");
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => setUploadError(error.message),
      () => {
        storage
          .ref("product-images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            fs.collection("Products")
              .add({
                title,
                description,
                price: Number(price),
                url,
              })
              .then(() => {
                setSuccessMsg("Product added successfully.");
                setTitle("");
                setDescription("");
                setPrice("");
                document.getElementById("file").value = "";
                setImageError("");
                setUploadError("");
                setTimeout(() => {
                  setSuccessMsg("");
                }, 3000);
              })
              .catch((error) => setUploadError(error.message));
          });
      }
    );
  };

  return (
    <div className="container">
      <br />
      <h1>Add Products</h1>
      <hr />
      {successMsg && (
        <>
          <div className="error-msg">{successMsg}</div>
          <br />
        </>
      )}
      <form
        autoComplete="off"
        className="form-group"
        onSubmit={handleAddProduct}
      >
        <label htmlFor="title">Product Title</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />

        <label htmlFor="description">Product Description</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <br />

        <label htmlFor="price">Product Price</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <br />

        <label htmlFor="image">Upload Product Image</label>
        <input
          type="file"
          id="file"
          className="form-control"
          required
          onChange={handleProductImage}
        />

        <br />
        {imageError && (
          <>
            <br />
            <div className="error-msg">{imageError}</div>
          </>
        )}

        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <button type="submit" className="btn btn-success btn-md">
            Submit
          </button>
        </div>
      </form>
      {uploadError && (
        <>
          <br />
          <div className="error-msg">{uploadError}</div>
        </>
      )}
    </div>
  );
};

export default AddProducts;
