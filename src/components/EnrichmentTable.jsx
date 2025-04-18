import React from 'react';

const EnrichmentTable = ({ contacts }) => {
  return (
    <div className="table-responsive mt-4">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Position</th>
            <th>LinkedIn</th>
            <th>Verified Email</th>
            <th>Guessed Emails</th>
            <th>Verified?</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c, i) => (
            <tr key={i}>
              <td>{c.firstName} {c.lastName}</td>
              <td>{c.company}</td>
              <td>{c.position}</td>
              <td><a href={c.linkedinUrl} target="_blank" rel="noreferrer">Profile</a></td>
              <td>{c.verifiedEmail || '—'}</td>
              <td>
                {c.guessedEmails?.length > 0 ? (
                  <ul className="mb-0 ps-3">
                    {c.guessedEmails.map((g, idx) => (
                      <li key={idx}>
                        {g.email} {g.verified ? '✅' : ''}
                      </li>
                    ))}
                  </ul>
                ) : '—'}
              </td>
              <td>{c.verifiedEmail ? '✅ Yes' : '❌ No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrichmentTable;
