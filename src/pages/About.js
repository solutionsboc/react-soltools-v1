import React from 'react';
import { Link } from 'react-router-dom'
import Card from '../components/shared/Card'

function About() {
  return (
      <div className='about'>
        <h1>About This Project</h1>
        <p>Each new service can be added as Route element (App.js)</p>
        <p>Create Page and Sidebar (SidebarData.js)</p>
        <p>All contributions are welcome!</p>

        {/* <p>
          <Link target="_blank" className='text-link' to='https://confluence.boc-group.com/pages/viewpage.action?pageId=214771460'>Link to confluence page</Link>
          <Link className='text-link' to={{ pathname: "https://confluence.boc-group.com/pages/viewpage.action?pageId=214771460" }} target="_blank" >Link to confluence page</Link>
        </p> */}

        <div className="text-link">
        <p>
          <a target="_blank" href="https://confluence.boc-group.com/display/STA/React+SOL+tools" rel="noreferrer">Link to confluence page</a>
        </p>
        </div>
      </div>

  );
}

export default About;
