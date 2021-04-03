import React from 'react';
import { css, Global } from '@emotion/react';
import normalize from "normalize.css";

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        ${normalize}

        :root {
          --background-color: #fafafa;

        }
        body {
          background: var(--background-color);
        }
      `}
    />
  );
};

export default GlobalStyles;
