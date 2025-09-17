import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div className="alert alert-danger text-center my-3">
      {message}
    </div>
  );
}

export default ErrorMessage;
