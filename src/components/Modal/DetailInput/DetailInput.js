import React, { Component } from 'react';
import { FaMinusCircle } from 'react-icons/fa';
import './DetailInput.scss';

class DetailInput extends Component {
  render() {
    const { label, deleteButton, handleDeleteList, ...rest } = this.props;
    return(
      <div className="detail-input-wrapper">
        <div className="detail-label">{label}</div>
        <div style={{display:'flex', flexDirection: 'row', alignItems:'center', marginBottom: '1.1em'}}>
        <input className="detail-input" {...rest}/>
        { 
          deleteButton===true?<div className="detail-delete-button" onClick={handleDeleteList}><FaMinusCircle/></div>:<div className="detail-delete-button"/>
        }
        </div>
      </div>
    )
  }
}

export default DetailInput;