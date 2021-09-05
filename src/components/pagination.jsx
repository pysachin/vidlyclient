import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = props => {
     
    const {itemCount,pageSize, onPageChange, currentPage} = props;
    const pagesCount = Math.ceil(itemCount / pageSize);

    if(pagesCount === 1)
    return null

    const pages = _.range(1,pagesCount+1);
    

    return (  

    <nav aria-label="Page navigation">
        <ul className="pagination">          
        {pages.map(
            p => (                                
            <li key={p} className={p === currentPage ? "page-item active" : "page-item"}> 
                <a className="page-link" 
                onClick={()=> onPageChange(p)}
                >{p}</a>               
            </li>                      
            ))
        }              
        </ul>
    </nav>

    );
}

Pagination.propTypes = {
    itemCount:PropTypes.number.isRequired,
    pageSize:PropTypes.number.isRequired, 
    onPageChange:PropTypes.func.isRequired, 
    currentPage:PropTypes.number.isRequired
}

export default Pagination;