import React from 'react';

const AvatarIcon = ({ name, size = 40 }) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : '';
  const backgroundColor = `hsl(${name.charCodeAt(0) % 360}, 70%, 50%)`;

  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor,
        color: 'white',
        fontSize: size * 0.5,
      }}
    >
      {firstLetter}
    </div>
  );
};

export default AvatarIcon;
