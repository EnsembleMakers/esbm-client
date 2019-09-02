import React, { Component } from 'react';
import { FaMinusCircle } from 'react-icons/fa';
import './DetailInput.scss';

class DetailInput extends Component {
  render() {
    const { label, deleteButton, onDeleteList, ...rest } = this.props;
    return(
      <div className="detail-input-wrapper">
        <div className="detail-label">{label}</div>
        <div style={{display:'flex', flexDirection: 'row', alignItems:'center'}}>
        <input className="detail-input" {...rest}/>
        { 
          deleteButton===true?<div className="detail-delete-button" onClick={onDeleteList}><FaMinusCircle/></div>:<div className="detail-delete-button"/>
        }
        </div>
      </div>
    )
  }
}

export default DetailInput;