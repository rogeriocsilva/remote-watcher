# Remote devices monitor system (WIP)

The goal is to build a system that can register new devices into a server via QR code and monitor those devices via web/mobile app. 


## How it works

If anyone reading this has a better solution, feel free to open an issue to discuss it.

- main-server running locally on a raspberry pie
- device-server running on the device we want to register
    - on start prints a QRcode to the shell with system info (network and such)
    - can still get this QR code via a web browser both (with an image on the API entry point ) or via HTTP (/register)
    - provides REST API to fetch the remaining info (CPU/GPU temps/loads, system details )
- web/mobile app reads QRcode and posts it to the server
- main-server registers new device and fetches info every few seconds
- web/mobile app reads these data and shows it via graphql

## Technologies
(subject to change)

- Device app

 - express.js 
 - systeminformation
 - qrcode

- Server

 - express.js
 - graphql

- Web/mobile app

 - React 

