import React, { Component } from 'react';
import { ModelListItem } from '../ModelListItem';
import { FaPlus } from 'react-icons/fa';
import './ModelList.scss';

class ModelList extends Component {
  render() {
    const { userNumber, allModels, search } = this.props;
    const { onOpenModelModal, handleDelete } = this.props;
  
    const modelList = allModels
      .filter(
        c => c.contents.template[0].value.indexOf(search) !== -1
      ).map(
        (modelListItem, i) =>
          <ModelListItem 
            key={i}
            id={modelListItem._id}
            userNumber={userNumber}
            modelName={modelListItem.contents.template[0].value}
            modelImage={modelListItem.modelImage}
            onOpenModelModal={onOpenModelModal}
            handleDelete={handleDelete}
          />
      )
    return(
      <div className="model-list-wrapper">
        {modelList}
        <div className="model-list-add-button" onClick={onOpenModelModal['create']}><FaPlus/></div>
      </div>
    )
  }
}

export default ModelList;