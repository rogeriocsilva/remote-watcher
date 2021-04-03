import React, { useState } from 'react';
import styled from '@emotion/styled';
import QRCode from 'qrcode.react';
import si from 'systeminformation';

const Hello = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);

  si.cpu()
    .then((data) => ({}))
    .catch((error) => ({}));

  var ipcRenderer = require('electron').ipcRenderer;
  ipcRenderer.on('public-key', (event: any, data: any) => {
    console.log({ data });
    setPublicKey(JSON.stringify(data));
  });
  return (
    <div>
      <p>HEllo</p>
      {publicKey && <QRCode value={publicKey} />}

      <Button>button</Button>
    </div>
  );
};

export default Hello;

const Button = styled.button`
  height: 50px;
`;
