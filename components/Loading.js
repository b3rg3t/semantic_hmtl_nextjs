import React from 'react';
import { css } from '@emotion/core';
import PulseLoader from 'react-spinners/PulseLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
// `;
 
class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  
  render() {
    return (
      <div className='sweet-loading'>
        <PulseLoader
          color={'#2859a3'}
          loading={this.props.loading}
        />
      </div> 
    )
  }
}

export default Loading;