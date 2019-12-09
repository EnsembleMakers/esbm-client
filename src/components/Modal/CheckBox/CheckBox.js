import React, { Component } from 'react';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import './CheckBox.scss'

const CheckBoxButton = styled.div`
  width: 40%
  margin-right: 10px;
  color: ${props => props.selected? '#fa6e57' : '#c3c3c3'}
  height: 35px;
  display: flex;
  align-items: center;
  ${props => props.clickable && 'cursor: pointer;'}
`

class CheckBox extends Component {
  render() {
    const { label, name, value, list_1, list_2, clickable } = this.props;
    const { handleChangeSpecButton } = this.props;

    return(
      <div className="check-box-wrapper">
        <div className="check-box-label">{label}</div>
        <div className="check-box-value">
          <CheckBoxButton
            selected={value==1}
            clickable={clickable}
            onClick={() => clickable && handleChangeSpecButton(name, 1)}
          ><FaCheckCircle style={{marginRight: '10px'}}/>{list_1}</CheckBoxButton>
          <CheckBoxButton
            selected={value==2}
            clickable={clickable}
            onClick={() => clickable && handleChangeSpecButton(name, 2)}
          ><FaCheckCircle style={{marginRight: '10px'}}/>{list_2}</CheckBoxButton>
        </div>
      </div>
    )
  }
}

export default CheckBox;