import { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !title) {
      alert('Judul dan file harus diisi!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      const response = await axios.post(
        'http://localhost:5000/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      console.log('Upload berhasil:', response.data);
      alert('File berhasil diunggah!');
    } catch (error) {
      console.error('Error saat mengunggah file:', error);
      alert('Gagal mengunggah file.');
    }
  };

  return (
    <div className="mt-3">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Judul Buku"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        className="form-control mb-2"
        onChange={handleFileChange}
      />
      <button className="btn btn-success w-100" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}

export default FileUpload;
