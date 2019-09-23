import React, { Component } from 'react';
import styled from 'styled-components';
import './CustomerInfoInput.scss';

const Label = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: ${props => 20*props.times}px;
  font-weight: 500;
  color: #484848;
`

const Input = styled.input`
  margin-bottom: 20px;
  padding: 8px;
  width: 100%;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  font-size: ${props => 25*props.times}px;
  color: #484848;

  outline: none;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  ${props => props.times<=0.8 && 'justify-content: space-around;'}
`

const Button = styled.div`
  display: inline-block;
  width: 150px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-right: 10px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 5px;
  color: #009e8e;
  font-size: ${props => 15*props.times}px;
  font-weight: 600;
  border: 1px solid #009e8e;

  &:hover{
    color: #027063;
    border: 1px solid #027063;
  }

  ${props => props.times<=0.8 && 'justify-content: space-around; margin-right: 0; width: 48%;'}

  ${props=> props.selected == 'selected' && 'color: white; background-color: #009e8e; &:hover{ color: white; background-color: #009e8e; border: 1px solid #009e8e;}'}

  cursor: pointer;
`


class CustomerInfoInput extends Component {
  render() {
    const { label, buttonView, inputView, onText, offText, times, handleChangeInputView, ...rest } = this.props;

    let frontButton;
    let backButton;

    if(inputView) {
      frontButton = "selected";
      backButton = "";
    }else {
      frontButton = "";
      backButton = "selected";
    }

    return(
      <div className="customer-info-input-wrapper">
        { buttonView &&
          <ButtonWrapper times={times}>
            <Button 
              selected={frontButton}
              times={times}
              onClick={() => handleChangeInputView(true)}
            >{onText}</Button>
            <Button 
              selected={backButton}
              times={times}
              onClick={() => handleChangeInputView(false)}
            >{offText}</Button>
          </ButtonWrapper>
        }
        { inputView &&
          <div>
            <Label times={times}>{label}</Label>
            <Input times={times} {...rest}/>
          </div>
        }
      </div>
    )
  }
}

export default CustomerInfoInput;