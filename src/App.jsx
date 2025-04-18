import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import EnrichmentTable from './components/EnrichmentTable';
import ExportButton from './components/ExportButton';

function App() {
  const [contacts, setContacts] = useState([]);
  const [uploading, setUploading] = useState(false);

  return (
    <div className="container py-4">
      <h1 className="mb-4">📤 Upload LinkedIn Connections</h1>
      <UploadForm setContacts={setContacts} uploading={uploading} setUploading={setUploading} />
      {contacts.length > 0 && (
        <>
          <EnrichmentTable contacts={contacts} />
          <ExportButton contacts={contacts} />
        </>
      )}
    </div>
  );
}

export default App;
