import React, { Component } from 'react';
import { Treemap } from 'react-vis';
import _ from 'lodash';
import superagent from 'superagent';
import './App.css';

const modes = ['squarify', 'resquarify', 'binary'];

const giphy = {
  start:'https://media.giphy.com/media/',
  end: '/giphy.gif',
  getId: (src) => src.replace(giphy.start,'').replace(giphy.end,''),
  getURL: (id) => giphy.start + id + giphy.end
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      mode: modes[Math.floor(Math.random() * modes.length)],
      data: []
    }

    this._fetchData = this._fetchData.bind(this)
    this._fetchData()
    setInterval(this._fetchData,1000*10)
  }

  componentDidMount() {
    const _this = this
    setInterval(() => {
      let mode = modes[Math.floor(Math.random() * modes.length)]
      _this.setState({ mode })
    }, 5000)
  }

  _fetchData() {
    const _this = this
    superagent
    // .get(process.env.REACT_APP_API_URL+'/vote/?kittenId=' + kittenId)
    .get('http://test01-externalloa-zsbljwn53rge-1833574909.us-west-1.elb.amazonaws.com:3100/results')
    .end(function (err, {body}) {
      if (err) return console.log(err)
      _this.setState({ data: body })
    });
  }

  _shuffleData(a) {
    return _.shuffle(a)
  }

  _formatData(data) {
    return _.map(data, o => ({ "title": <Title votes={o.votes} kittenId={o.kittenId} />, "size": o.votes }))
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {this.state.data.length ?
        <Treemap
          title={'My New Treemap'}
          width={window.innerWidth}
          height={window.innerHeight}
          animation={true}
          mode={this.state.mode}
          padding={1}
          data={{
            "children": this._shuffleData(this._formatData(this.state.data))
          }}
          /> :
          <div>there is no data</div>
        }
      </div>
    );
  }
}

// background: 'url("' + giphy.getURL(kittenId) + '") no-repeat local center',
const Title = ({ votes, kittenId }) =>
  <div style={{
    width: '100%',
    height: '100%',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'url("http://s3.amazonaws.com/giphygifs/media/' + kittenId + '/200w_s.gif") no-repeat local center',
    backgroundSize: 'cover',
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
  }}>
    <span style={{ fontSize:'xx-large' }} >{votes}</span>
    <span style={{ fontSize:'12px' }} >{kittenId}</span>
  </div>

export default App;

