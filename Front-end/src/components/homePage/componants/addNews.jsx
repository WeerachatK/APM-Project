import React, { useState } from "react";

const AddNews = () => {
  const [file, setFile] = useState(null);
  const [topic, setTopic] = useState("");
  const [detail, setDetail] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  const handleSubmit = () => {
    // Perform any actions with the selected file, topic, and detail here
    console.log("File:", file);
    console.log("Topic:", topic);
    console.log("Detail:", detail);

    // Close the modal or perform any other actions as needed
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>Add New Item</h2>
        <label>
          Select Image:
          <input type="file" onChange={handleFileChange} />
        </label>
        <label>
          Topic:
          <input type="text" value={topic} onChange={handleTopicChange} />
        </label>
        <label>
          Detail:
          <textarea value={detail} onChange={handleDetailChange}></textarea>
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddNews;
