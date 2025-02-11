import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setThumbnail(image);
    setPreview(URL.createObjectURL(image));
  };

  const loadPdf = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleThumbnailClick = () => {
    document.getElementById('thumbnailInput').click();
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    if (thumbnail) formData.append('thumbnail', thumbnail);
    if (pdfFile) formData.append('file', pdfFile);

    try {
      await axios.post('http://localhost:5000/products', formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: '500px', width: '100%' }}
      >
        <h2 className="text-center mb-4">Add New Product</h2>
        <form onSubmit={saveProduct}>
          {/* Book Name */}
          <div className="mb-3">
            <label className="form-label fw-bold">Book Name</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter book name"
            />
          </div>

          {/* Thumbnail Upload */}
          <div className="mb-3 text-center">
            <label className="form-label fw-bold">Thumbnail</label>
            <input
              id="thumbnailInput"
              type="file"
              accept="image/*"
              className="d-none"
              onChange={loadImage}
            />
            <div
              className="border rounded shadow-sm d-flex align-items-center justify-content-center"
              onClick={handleThumbnailClick}
              style={{
                width: '150px',
                height: '200px',
                margin: 'auto',
                cursor: 'pointer',
                backgroundColor: '#f8f9fa',
                overflow: 'hidden',
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-100 h-100 rounded"
                  style={{ objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                />
              ) : (
                <span className="text-muted">Click to upload</span>
              )}
            </div>
          </div>

          {/* Upload PDF */}
          <div className="mb-3">
            <label className="form-label fw-bold">Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              className="form-control"
              onChange={loadPdf}
            />
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Save Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
