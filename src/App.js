import "./App.css";
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const imagesListRef = ref(storage, "images/");

    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((url) => {
                setImageUrls((prev) => [...prev, { url, ref: imageRef }]);
                toast.success("Uploaded successfully!");
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
                toast.error("Upload failed!");
            });
    };

    const deleteAllFiles = () => {
        imageUrls.forEach(({ ref }) => {
            deleteObject(ref)
                .then(() => {
                    toast.success("Deleted successfully!");
                })
                .catch((error) => {
                    console.error("Error deleting file:", error);
                    toast.error("Delete failed!");
                });
        });
        setImageUrls([]);
    };

    useEffect(() => {
        listAll(imagesListRef)
            .then((response) => {
                return Promise.all(response.items.map((item) => getDownloadURL(item).then((url) => ({ url, ref: item }))));
            })
            .then((urlsWithRefs) => {
                setImageUrls(urlsWithRefs);
            })
            .catch((error) => {
                console.error("Error fetching images:", error);
            });
    }, []);

    return (
        <div className="App">
            <input
                type="file"
                onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                }}
            />
            <button onClick={uploadFile}> Upload Image</button>
            <button onClick={deleteAllFiles}> Delete All Images</button>
            {imageUrls.map(({ url }) => {
                return <img key={url} src={url} alt="" />;
            })}
            <ToastContainer />
        </div>
    );
}

export default App;
