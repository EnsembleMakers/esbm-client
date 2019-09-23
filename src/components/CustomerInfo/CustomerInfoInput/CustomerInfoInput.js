import React, { Component } from 'react';
import './CustomerInfoInput.scss';

class CustomerInfoInput extends Component {
  render() {
    const { label, buttonView, inputView, onText, offText, ...rest } = this.props;
    const { handleChangeInputView } = this.props;

    return(
      <div className="customer-info-input-wrapper">
        { buttonView &&
          <div className="customer-info-select-button-wrapper">
            <div className={`customer-info-select-button ${inputView}`} onClick={() => handleChangeInputView(true)}>{onText}</div>
            <div className="customer-info-select-button off" onClick={() => handleChangeInputView(false)}>{offText}</div>
          </div>
        }
        { inputView &&
          <div>
            <div className="customer-info-label">{label}</div>
            <input className="customer-info-input" {...rest}/>
          </div>
        }
      </div>
    )
  }
}

export default CustomerInfoInput;