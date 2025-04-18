import React from 'react';

const ExportButton = ({ contacts }) => {
  const downloadCSV = () => {
    const headers = ['First Name', 'Last Name', 'Company', 'Position', 'LinkedIn URL', 'Guessed Email'];
    const rows = contacts.map(c => [
      c.firstName,
      c.lastName,
      c.company,
      c.position,
      c.linkedinUrl,
      c.guessedEmail || ''
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'enriched_contacts.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button className="btn btn-success mt-3" onClick={downloadCSV}>
      ⬇️ Export CSV
    </button>
  );
};

export default ExportButton;
