import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Treemap } from 'react-vis';
// import 'react-vis/dist/styles/examples.scss';
// import 'react-vis/dist/styles/plot.scss';
// import 'react-vis/dist/styles/legends.scss';
// import 'react-vis/dist/styles/radial-chart.scss';
// import 'react-vis/dist/styles/treemap.scss';

class App extends Component {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Treemap
          title={'My New Treemap'}
          width={600}
          height={600}
          animation={true}
          mode={'squarify'}
          padding={4}
          data={{
            "title": "analytics",
            "color": "#12939A",
            "children": [
              {
                "title": "clus",
                "children": [
                  { "title": <Title votes={1} />, "color": "#12939A", "size": 1 },
                  { "title": "CommunityStructure", "color": "#12939A", "size": 2 },
                  { "title": "HierarchicalCluster", "color": "#12939A", "size": 3 },
                  { "title": "MergeEdge", "color": "#12939A", "size": 4 }
                ]
              }
            ]
          }}
        />
      </div>
    );
  }
}

const Title = ({ votes }) =>
  <div style={{
    width: '100%',
    height: '100%',
    background: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <h1>{votes}</h1>
  </div>
export default App;

