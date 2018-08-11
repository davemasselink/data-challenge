data-challenge
================
data challenge for Caleb

Installation and Run
--------------------
If you've got a modestly well setup nodeJS and npm environment (with both accessible via $PATH), getting this project installed and running should be pretty straight-forward.

`> npm install && npm run start`

At that point, as long as everything goes well, the final line you should see logged out will list the local server's IP addr and port:

http://localhost:3000

Alternatively, you can also build the UI and start the server separately as:

`> npm run build`

`> npm run serve`

Explore UI
----------
Visit the above mentioned location in a browser to view the UI.

Currently, the user can scroll thru the list of stations and see ALL stations on the map and in the data visualization.

The user can also filter by station name. This will re-render just the remaining sites in the map and data visualization.

Project Structure
-----------------
The server code is configured thru package.json and the code in the /server directory.

* main.js - NodeJS/Express service used for hosting static content

The UI code is primarily defined in the /app directory. Additionally, the dist/index.html file bootstraps the SPA as long as dist/bundle.js exists after having successfully run
`> npm run build`

The individual code files each represent a React component. The entry point can be found in index.js