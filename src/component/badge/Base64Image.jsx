import React from 'react';

function Base64Image({ base64Image }) {
  // Create data URL
  const imageUrl = `data:image/png;base64,${base64Image}`;

  return (
    <div>
 
      <img width={90} src={imageUrl} alt="Decoded Image" />
    </div>
  );
}

export default Base64Image;
