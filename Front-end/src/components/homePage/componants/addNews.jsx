import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddNews(props) {
  const [file, setFile] = useState(null);
  const [topic, setTopic] = useState("");
  const [detail, setDetail] = useState("");
  const [open, setOpen] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleTopicChange = (e) => setTopic(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    console.log("File:", file);
    console.log("Topic:", topic);
    console.log("Detail:", detail);

    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={{ backgroundColor: "#002880", color: "#fff" }}>
        Open modal
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <IconButton aria-label="close" onClick={handleClose} sx={{ position: "absolute", top: 0, right: 0, color: "#002880" }}>
            <CloseIcon />
          </IconButton>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={2} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Button component="label" variant="contained" sx={{ width: "100%", padding: 1, backgroundColor: "#002880", color: "#fff" }}>
                Select File
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
            </Grid>
            <Grid item xs={12} md={10} sx={{ position: "relative" }}>
              <TextField size="small" fullWidth value={file ? file.name : ""} disabled />
              {file && (
                <IconButton aria-label="remove file" onClick={handleRemoveFile} sx={{ position: "absolute", top: 0, right: 0, transform: "translateY(40%)", color: "gray" }}>
                  <ClearIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Title
          </Typography>
          <TextField size="small" fullWidth value={topic} onChange={handleTopicChange} />

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Detail
          </Typography>
          <TextareaAutosize minRows={7} maxRows={10} style={{ width: "100%", marginTop: "8px", border: "1px solid #ccc", borderRadius: "4px", padding: "8px" }} value={detail} onChange={handleDetailChange} />

          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2, backgroundColor: "#002880", color: "#fff" }}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
