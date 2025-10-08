'use client';

import * as React from 'react';

const X = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m9.276 12.97-7.858 9.029h3.48l6.015-6.93 5.3 6.931L23 21.963l-8.605-11.456 7.343-8.468L18.313 2l-5.547 6.364L8.021 2.01 1 2.003zm9.613 6.95-1.756-.005L5.065 4.009h1.89z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
);

const GitHub = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 1C5.923 1 1 6.047 1 12.278c0 4.99 3.148 9.205 7.522 10.7.55.098.755-.24.755-.537 0-.267-.014-1.154-.014-2.1-2.763.523-3.478-.689-3.698-1.324-.124-.324-.66-1.325-1.128-1.592-.385-.212-.935-.734-.014-.748.867-.014 1.485.818 1.692 1.156.99 1.706 2.572 1.227 3.203.93.097-.732.385-1.226.702-1.508-2.447-.281-5.005-1.254-5.005-5.568 0-1.226.426-2.242 1.128-3.031-.11-.282-.495-1.438.11-2.989 0 0 .92-.296 3.024 1.156a10 10 0 0 1 2.75-.38c.936 0 1.87.126 2.75.38 2.104-1.466 3.025-1.155 3.025-1.155.605 1.55.22 2.706.11 2.988.701.79 1.128 1.79 1.128 3.031 0 4.328-2.57 5.287-5.018 5.568.398.352.742 1.03.742 2.087 0 1.508-.014 2.72-.014 3.102 0 .294.207.648.757.534a11.04 11.04 0 0 0 5.425-4.114A11.5 11.5 0 0 0 23 12.279C23 6.047 18.078 1 12 1"
      ></path>
    </svg>
  )
);

X.displayName = 'X';
GitHub.displayName = 'GitHub';

export { X, GitHub };
