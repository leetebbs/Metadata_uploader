
import { useEffect, useState } from "react";
import { pinata } from "../utils/config";


const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [hash, setHash] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [metadataHash, setMetadataHash] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmission = async () => {
    try {
      const upload = await pinata.upload.file(image);
      setHash(upload.IpfsHash);
      console.log(upload.IpfsHash);
      console.log("uploading metadata");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (hash) {
        handleMetadataSubmission();
    }
  },[hash])
  const handleMetadataSubmission = async () => {
    try {
      const metadata = {
        name:name,
        description: description,
        image: "ipfs://" + hash
      };
    //   const upload = await pinata.upload.file(metadata);
      const upload = await pinata.upload.json(metadata);
      console.log(upload.IpfsHash);
      setMetadataHash(upload.IpfsHash);
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="image-uploader">
      <h2>Upload Image and Metadata</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <input 
        type="text"
        placeholder="Name"
        onChange={(event) => setName(event.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <input 
        type="text"
        placeholder="Description"
        onChange={(event) => setDescription(event.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      {preview && (
        <div>
          <img
            src={preview}
            alt="Uploaded Preview"
            style={{ width: '200px', height: '200px', objectFit: 'cover', marginBottom: '10px' }}
          />
          <button onClick={handleRemoveImage} style={{ display: 'block', margin: '10px 0' }}>
            Remove Image
          </button>
          <button onClick={handleSubmission}>Submit</button>
          {hash && <><p>IPFS Hash: {hash}</p>
          <a href={`https://ipfs.io/ipfs/${hash}`} target="_blank" rel="noopener noreferrer">View Image on IPFS</a></>
      }
      {metadataHash && <><p>Metadata Hash: {metadataHash}</p>
          <a href={`https://ipfs.io/ipfs/${metadataHash}`} target="_blank" rel="noopener noreferrer">View Metadata on IPFS</a></>}
        </div>
      )}
      {image && <p>Selected File: {image.name}</p>}
    </div>
  );
};

export default ImageUploader;
