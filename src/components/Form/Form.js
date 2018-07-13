import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import Result from '../Result/Result';

class Form extends Component {

  constructor(props) {
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
      this.setState({ semPointers: { ...semPointers, [name]: value } }, () => this.props.onChangeInput(this.state.semPointers));
    }
  }

  render() {
    const { semPointers } = this.state;
    return (
      <React.Fragment>
        <div className='inputContainer'>
          <input
            value={semPointers.sem1}
            name='sem1'
            onChange={this.onChangeInput}
            placeholder='Sem 1'
            type='number'
            className='inputBox' />
          <input
            value={semPointers.sem2}
            name='sem2'
            onChange={this.onChangeInput}
            placeholder='Sem 2'
            type='number'
            className='inputBox' />
        </div>
        <div className='inputContainer'>
          <input
            value={semPointers.sem3}
            name='sem3'
            onChange={this.onChangeInput}
            placeholder='Sem 3'
            type='number'
            className='inputBox' />
          <input
            value={semPointers.sem4}
            name='sem4'
            onChange={this.onChangeInput}
            placeholder='Sem 4'
            type='number'
            className='inputBox' />
        </div>
        <div className='inputContainer'>
          <input
            value={semPointers.sem5}
            name='sem5'
            onChange={this.onChangeInput}
            placeholder='Sem 5'
            type='number'
            className='inputBox' />
          <input
            value={semPointers.sem6}
            name='sem6'
            onChange={this.onChangeInput}
            placeholder='Sem 6'
            type='number'
            className='inputBox' />
        </div>
        <div className='inputContainer'>
          <input
            value={semPointers.sem7}
            name='sem7'
            onChange={this.onChangeInput}
            placeholder='Sem 7'
            type='number'
            className='inputBox' />
          <input
            value={semPointers.sem8}
            name='sem8'
            onChange={this.onChangeInput}
            placeholder='Sem 8'
            type='number'
            className='inputBox' />
        </div>
      </React.Fragment>
    );
  }
}

Result.propTypes = {
  onChangeInput: PropTypes.func,
};

export default Form;