// Source - https://stackoverflow.com/a
// Posted by aghidini
// Retrieved 2025-11-19, License - CC BY-SA 4.0

'use client';

import React from 'react';

const Axe: React.FC = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    Promise.all([import('@axe-core/react'), import('react-dom')]).then(
      ([axe, ReactDOM]) => axe.default(React, ReactDOM, 1000)
    );
  }
  return null;
};

export default Axe;
