import React, { Component } from 'react';
import './App.css';
import { Treemap } from 'react-vis';
// import 'react-vis/dist/styles/examples.scss';
// import 'react-vis/dist/styles/plot.scss';
// import 'react-vis/dist/styles/legends.scss';
// import 'react-vis/dist/styles/radial-chart.scss';
// import 'react-vis/dist/styles/treemap.scss';
class App extends Component {
  constructor() {
    super()
    this.state = {
      mode: 'squarify'
    }
  }
  componentDidMount() {
    const _this = this
    const modes = ['squarify', 'resquarify', 'slice', 'dice', 'slicedice', 'binary', 'partition', 'partition-pivot']
    setInterval(() => {
      _this.setState({ mode: modes[Math.floor(Math.random()*modes.length)] })
    },5000)
  }
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Treemap
          title={'My New Treemap'}
          width={window.innerWidth}
          height={window.innerHeight}
          animation={true}
          mode={this.state.mode}
          padding={1}
          data={{
            "title": "analytics",
            "color": "#12939A",
            "children": [
              {
                "title": "clus",
                "children": [
                  { "title": <Title votes={4} />, "color": "#12939A", "size": 4 },
                  { "title": <Title votes={2} />, "color": "#12939A", "size": 2 },
                  { "title": <Title votes={3} />, "color": "#12939A", "size": 3 },
                  { "title": <Title votes={4} />, "color": "#12939A", "size": 4 }
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
    background: 'white',
    color: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  }}>
    <h1>{votes}</h1>
  </div>

export default App;

