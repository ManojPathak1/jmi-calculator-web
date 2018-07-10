import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import Result from '../Result/Result';

class Form extends Component {

  constructor(props, context) {
    super(props);
    this.state = {
      semPointers: {
        sem1: '',
        sem2: '',
        sem3: '',
        sem4: '',
        sem5: '',
        sem6: '',
        sem7: '',
        sem8: '',
      },
    };
  }

  onChangeInput = (event) => {
    let { semPointers } = this.state;
    const { name, value } = event.target;
    if (Number(value) <= 10) {
      this.setState({ semPointers: { ...semPointers, [name]: value } }, () => this.props.onChangeInput(event, this.state.semPointers));
    }
  }

  render() {
    const { semPointers } = this.state;
    return (
      <React.Fragment>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
          <input value={semPointers.sem1} name='sem1' onChange={this.onChangeInput} placeholder="Sem 1" type='number' style={{ height: '50px', width: '90px', fontFamily: 'OpenSansBold', fontSize: '24px', textAlign: 'center', borderRadius: '5px', border: "1px #ccc solid" }} />
          <input value={semPointers.sem2} name='sem2' onChange={this.onChangeInput} placeholder="Sem 2" type='number' style={{ height: '50px', width: '90px', fontFamily: 'OpenSansBold', fontSize: '24px', textAlign: 'center', borderRadius: '5px', border: "1px #ccc solid" }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
          <input value={semPointers.sem3} name='sem3' onChange={this.onChangeInput} placeholder="Sem 3" type='number' style={{ height: '50px', width: '90px', fontFamily: 'OpenSansBold', fontSize: '24px', textAlign: 'center', borderRadius: '5px', border: "1px #ccc solid" }} />
          <input value={semPointers.sem4} name='sem4' onChange={this.onChangeInput} placeholder="Sem 4" type='number' style={{ height: '50px', width: '90px', fontFamily: 'OpenSansBold', fontSize: '24px', textAlign: 'center', borderRadius: '5px', border: "1px #ccc solid" }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
          <input value={semPointers.sem5} name='sem5' onChange={this.onChangeInput} placeholder="Sem 5" type='number' style={{ height: '50px', width: '90px', fontFamily: 'OpenSansBold', fontSize: '24px', textAlign: 'center', borderRadius: '5px', border: "1px #ccc solid" }} />
          <input value={semPointers.sem6} name='sem6' onChange={this.onChangeInput} placeholder="Sem 6" type='number' style={{ height: '50px', width: '90px', fontFamily: 'OpenSansBold', fontSize: '24px', textAlign: 'center', borderRadius: '5px', border: "1px #ccc solid" }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
          <input value={semPointers.sem7} name='sem7' onChange={this.onChangeInput} placeholder="Sem 7" type='number' style={{ height: '50px', width: '90px', fontFamily: 'OpenSansBold', fontSize: '24px', textAlign: 'center', borderRadius: '5px', border: "1px #ccc solid" }} />
          <input value={semPointers.sem8} name='sem8' onChange={this.onChangeInput} placeholder="Sem 8" type='number' style={{ height: '50px', width: '90px', fontFamily: 'OpenSansBold', fontSize: '24px', textAlign: 'center', borderRadius: '5px', border: "1px #ccc solid" }} />
        </div>
      </React.Fragment>
    );
  }
}

Result.propTypes = {
  onChangeInput: PropTypes.func,
};

export default Form;