import React from 'react';
import styles from './AppGenresLst.module.css';
import classNames from 'classnames'

const ListGroup = (props) => {
    return (         
    <div className={classNames(styles.listgroup,'list-group')}>        
        {props.items.map(g => (
            <li 
            className={ props.selectedItem.name === g[props.textProperty] ?  "list-group-item active " : "list-group-item" }
            onClick={()=>{ props.onItemSelect(g) }} 
            key={g[props.valueProprty]}>{g[props.textProperty]}</li>
        ))}
    </div>
   );
}

ListGroup.defaultProps = {
    textProperty:"name",
    valueProprty:"_id"
}

export default ListGroup;