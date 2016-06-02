/* eslint-disable max-len */
/**
 * DeleteConfirmationButtons
 *
 * Shows buttons for delete confirmation
 */

import React from 'react';
import styles from './style.css';
 
class DeleteConfirmationButtons extends React.Component{
  confirmDeleteVariation(e){
    e.preventDefault();
    this.props.confirmDeleteVariation(this.props.variationPath);
  }

  cancelDeleteVariation(e){
    e.preventDefault();
    this.props.cancelDeleteVariation(this.props.variationPath);
  }
  
  render(){
    return(
      <div>
        <button onClick={this.confirmDeleteVariation.bind(this)} className={`${styles.base}`}>
          Delete
        </button>
        <button onClick={this.cancelDeleteVariation.bind(this)} className={`${styles.base} `}>
          Cancel
        </button>
      </div>
    )
  }
}

export default DeleteConfirmationButtons;