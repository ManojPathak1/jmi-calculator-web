import React, { Component } from 'react';
import _ from 'lodash';
import Notifications, { notify } from 'react-notify-toast';
import './App.css';
import Form from './components/Form/Form';
import Result from './components/Result/Result';
import config from '../src/utils/constantsConfig';
import { getItemLS, setItemLS } from '../src/utils/localStorage';
import backLogo from './assets/icons/left-arrow.png';
import postman from './utils/postman';

const { VIEW, LOCAL_STORAGE_KEYS, POINTERS_ORDER } = config;
const { FORM, RESULT } = VIEW;
const { SAVED_RESULT } = LOCAL_STORAGE_KEYS;

class App extends Component {

  constructor(props, context) {
    super(props);
    this.result = {};
    this.semPointers = {};
    this.semCount = 0;
    this.state = {
      view: FORM,
      enableBtn: false,
      enableViewResult: null,
    };
  }

  UNSAFE_componentWillMount() {
    const result = getItemLS(SAVED_RESULT);
    this.result = result;
    result && (this.setState({ view: RESULT, enableBtn: true, enableViewResult: true }));
  }

  componentDidMount() {
    postman.subscribe('notify', (obj) => {
      notify.show(<span style={{ fontFamily: "OpenSansBold" }}>{obj.message}</span>, obj.type, 3000);
    });
  }

  onChangeInput = (event, semPointers) => {
    let isValid = false;
    let continuousFlag = true;
    let semCount = 0;
    _.forEach(POINTERS_ORDER, (key) => {
      const val = semPointers[key];
      if (val) {
        if (continuousFlag) {
          if (Number(val) <= 10) {
            isValid = true;
            semCount += 1;
          }
          else {
            isValid = false;
          }
        }
        else {
          isValid = false;
        }
      }
      else {
        continuousFlag = false;
      }
    });
    this.semPointers = semPointers;
    this.semCount = semCount;
    this.setState({ enableBtn: isValid });
  }

  onClickGoToResult = () => {
    this.setState({ view: RESULT, enableBtn: true });
  }

  onClickBottomBtn = () => {
    const { view } = this.state;
    switch (view) {
      case FORM:
        this.computeResult();
        break;
      case RESULT:
        postman.publish('notify', { message: 'Result saved !', type: 'success' });
        setItemLS(SAVED_RESULT, this.result);
        this.setState({ enableViewResult: true });
        break;
      default:
        break;
    }
  }

  computeResult = () => {
    const { semCount, semPointers } = this;
    _.forEach(semPointers, (val, key) => { semPointers[key] = Number(val); });
    let pointers = 0;
    let percentage = 0;
    switch (semCount) {
      case 1:
        pointers = semPointers.sem1;
        break;
      case 2:
        pointers = (semPointers.sem1 + semPointers.sem2) * 0.5;
        break;
      case 3:
        pointers = ((semPointers.sem1 + semPointers.sem2) * 0.25 + semPointers.sem3 * 0.5);
        break;
      case 4:
        pointers = ((semPointers.sem1 + semPointers.sem2) * 0.25
          + (semPointers.sem3 + semPointers.sem4) * 0.50) * (2 / 3);
        break;
      case 5:
        pointers = ((semPointers.sem1 + semPointers.sem2) * 0.25
          + (semPointers.sem3 + semPointers.sem4) * 0.50 + semPointers.sem5 * 0.75) * (4 / 9);
        break;
      case 6:
        pointers = ((semPointers.sem1 + semPointers.sem2) * 0.25
          + (semPointers.sem3 + semPointers.sem4) * 0.50 + (semPointers.sem5 + semPointers.sem6) * 0.75)
          * (1 / 3);
        break;
      case 7:
        pointers = ((semPointers.sem1 + semPointers.sem2) * 0.25
          + (semPointers.sem3 + semPointers.sem4) * 0.5 + (semPointers.sem5 + semPointers.sem6) * 0.75
          + (semPointers.sem7) * 1) * (1 / 4);
        break;
      case 8:
        pointers = ((semPointers.sem1 + semPointers.sem2) * 0.25
          + (semPointers.sem3 + semPointers.sem4) * 0.5 + (semPointers.sem5 + semPointers.sem6) * 0.75
          + (semPointers.sem7 + semPointers.sem8) * 1) * (1 / 5);
        break;
      default: // Default case
        break;
    }
    percentage = (20 * pointers * pointers * pointers - 380 * pointers * pointers + 2725 * pointers - 1690) / 84;
    this.result = { pointers, percentage };
    this.setState({ view: RESULT });
  }

  onClickBackBtn = () => {
    this.setState({ view: FORM, enableBtn: false });
  }

  render() {
    const { view, enableBtn, enableViewResult } = this.state;
    const { onClickBackBtn, onChangeInput, onClickBottomBtn, onClickGoToResult, result } = this;
    return (
      <div className="App">
        <Notifications />
        <div className='header'>
          <div onClick={onClickBackBtn} style={{ width: "60px", marginLeft: '20px' }}>
            {view === RESULT &&
              (<div>
                <img alt='Back Button' src={backLogo} width='24' height='24' />
              </div>)
            }
          </div>
          <span>JMI Calculator</span>
          <div style={{ width: '100px', height: '100%' }}>
            {view === FORM && <button disabled={!enableViewResult} className={`${'bottom'} ${enableViewResult ? 'enabledBtn' : 'disabledBtn'}`} style={{ width: '100%', height: "100%", fontSize: "12px" }} onClick={onClickGoToResult}>View Result</button>}
          </div>
        </div>
        <div className='body'>
          {(view === FORM) && <Form onChangeInput={onChangeInput} />}
          {(view === RESULT) && <Result result={result} />}
        </div>
        <button disabled={!enableBtn} className={`${'bottom'} ${enableBtn ? 'enabledBtn' : 'disabledBtn'}`} onClick={onClickBottomBtn}>
          {(view === FORM) ? 'CALCULATE' : 'SAVE RESULT'}
        </button>
      </div>
    );
  }
}

export default App;
