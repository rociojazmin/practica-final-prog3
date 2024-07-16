import React from 'react';
import Link from 'next/link';

const ButtonLink = ({ id }) => {
  return (
    <Link href={`/show/${id}`}>
      <div className="relative inline-block">
        <a className="px-4 py-2  text-indigo-100 bg-blue-500 rounded hover:bg-blue-700">
          Ver detalles
        </a>
        <span className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-blue-500"></span>
      </div>
    </Link>
  );
};

export default ButtonLink;
