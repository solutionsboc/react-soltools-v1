import React from 'react';
import Card from '../components/shared/Card';

function Home() {
  return (
    <div className='home'>
      <h1>SOL React Services</h1>
      <Card reverse={true}>
        <p>This is a React app for SOL services</p>
        <p>Version: 0.1.0</p>
        <p>Current state: Development Playground</p>
        <div className="text-link-invert">
          <p>
            <a target="_blank" href="https://confluence.boc-group.com/display/STA/React+SOL+tools" rel="noreferrer">Link to confluence page</a>
          </p>
        </div>
        <div className="text-link-invert">
          <p>
            <a target="_blank" href="http://soltools:7080/react-soltools-v1" rel="noreferrer">Deployed version</a>
          </p>
        </div>
      </Card>
      <Card reverse={true}>
      <p>Repository of this project</p>
      <p>(todo: make private)</p>
      <div className="text-link">
        <p>
          <a target="_blank" href="https://github.com/solutionsboc/react-soltools-v1" rel="noreferrer">Git Repo</a>
        </p>
      </div>
      </Card>
    </div>
  );
}

export default Home;
