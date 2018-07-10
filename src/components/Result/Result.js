import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Result.css';
import icons from '../../utils/icon';
import URL from '../../utils/urls';

class Result extends Component {
  render() {
    const { pointers, percentage } = this.props.result;
    const { whatsappIcon } = icons;
    const { WHATS_APP, WHATS_APP_ANDROID } = URL;
    const whatsAppUrl = `${WHATS_APP}?text=POINTERS: ${pointers.toFixed(2)}, PERCENTAGE: ${percentage.toFixed(2)}`;
    return (
      <div className='resultContainer'>
        <div style={{ marginTop: '10px' }}>
          <span style={{ fontFamily: 'OpenSansBold', color: '#ccc', fontSize: '60px' }}>{pointers.toFixed(2)}</span>&nbsp;&nbsp;
          <span style={{ fontFamily: 'OpenSansBold', color: '#ccc' }}>Pointers</span>
        </div>
        <div>
          <span style={{ fontFamily: 'OpenSansBold', color: '#ccc', fontSize: '60px' }}>{percentage.toFixed(2)}</span>&nbsp;&nbsp;
          <span style={{ fontFamily: 'OpenSansBold', color: '#ccc' }}>Percentage</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
          <span style={{ fontFamily: 'OpenSansBold', color: '#bbb' }}>Share on</span>
          <a style={{ marginTop: '10px' }} href={whatsAppUrl} target="_blank">
            <img src={whatsappIcon} alt='Whats app' width='30' height='30' />
          </a>
        </div>
      </div>
    );
  }
}

Result.propTypes = {
  result: PropTypes.object,
};

export default Result;