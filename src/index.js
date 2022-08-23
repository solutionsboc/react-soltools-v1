/* React v17 removed -> v18 createRoot
* https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-strict-mode
* DAK 2022.08.19
*/

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

/* React v17 removed v18 createRoot */
import * as ReactDOMClient from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(<App tab="home" />);

// During an update, there's no need to pass the container again.
// root.render(<App tab="profile" />);
