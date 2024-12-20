import { useState } from "react";
import { pinata } from "../utils/config";

function SingleFile() {
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target?.files?.[0]);
  };

  const handleSubmission = async () => {
    try {
      const upload = await pinata.upload.file(selectedFile)
      console.log(upload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label className="form-label"> Choose File</label>
      <input type="file" onChange={changeHandler} />
      <button onClick={handleSubmission}>Submit</button>
    </>
  );
}

export default SingleFile;
