import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ setContacts, uploading, setUploading }) => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleUpload = async () => {
    if (!file || !email) {
      setMessage({ type: 'danger', text: 'Please provide both email and file.' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);

    setUploading(true);
    setMessage(null);

    try {
      const res = await axios.post('/api/contacts/upload', formData);
      setMessage({ type: 'success', text: res.data.message });
      setFile(null);
      setEmail('');
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong.';
      console.error(err);
      setMessage({ type: 'danger', text: `Upload error: ${msg}` });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="form-label">Your Email (to be notified):</label>
      <input
        type="email"
        className="form-control mb-2"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com"
      />

      <input
        type="file"
        className="form-control mb-2"
        onChange={e => setFile(e.target.files[0])}
      />

      <button
        className="btn btn-primary"
        onClick={handleUpload}
        disabled={uploading || !file || !email}
      >
        {uploading ? 'Uploading...' : 'Upload & Process'}
      </button>

      {message && (
        <div className={`alert mt-3 alert-${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default UploadForm;
