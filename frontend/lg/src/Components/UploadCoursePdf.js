import React, { useState } from "react";
import ContributorService from "../Services/ContributorService";

const UploadCoursePdf = () => {
  const [files, setFiles] = useState(null);
  const loadFiles = (e) => {
    console.log(e);
  };
  const upload = () => {
    ContributorService.upload(files)
      .then((res) => {
        console.log("uploaded successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group files color">
            <label>Upload Your File </label>
            <input
              type="file"
              name="files"
              multiple
              required
              onChange={(e) => loadFiles(e)}
            ></input>
            <button onClick={upload}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCoursePdf;
