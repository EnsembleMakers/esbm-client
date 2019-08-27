import React, { Component } from 'react';
import { FaSistrix } from 'react-icons/fa';
import './SearchBar.scss';

class SearchBar extends Component {
  render() {
    const { children, search } = this.props;
    const { handleChangeModelSearchInput } = this.props;
    return(
      <div className="model-manage-input-wrapper">
        <FaSistrix className="model-manage-input-icon"/>
        <input 
          className="model-manage-input"
          name="search"
          value={search}
          placeholder="모델 이름을 검색하세요"
          onChange={handleChangeModelSearchInput}
        />
      </div>
    )
  }
}

export default SearchBar;