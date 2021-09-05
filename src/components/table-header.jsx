import React, { Component } from 'react';


class TableHeader extends Component {
    
    raiseSort(path){

        const sortCol = {...this.props.sortColumn}

        if(sortCol.path === path){
            sortCol.orderBy =  sortCol.orderBy === 'asc' ? 'desc' : 'asc';
            
        }else{
            sortCol.path = path;
            sortCol.orderBy = 'asc';            
       }

       this.props.onSort(sortCol);
    }

    renderSortIcon = column =>{

        if (column.path !== this.props.sortColumn.path ) return null;

        if(this.props.sortColumn.orderBy === 'asc') {
            return <i className="fa fa-sort-asc"></i>
        }
        return <i className="fa fa-sort-desc"></i>
    }

    render() { 
        return ( 
            <thead>
                <tr>
                    {this.props.columns.map(col => (   
                        <th className='clickable'
                            key={col.path || col.key} 
                            onClick={ ()=> this.raiseSort(col.path) } 
                            scope="col"
                        
                        >
                                {col.label}   {this.renderSortIcon(col)}
                        </th>
                    ))}
                </tr>
            </thead>
          );
    }
}
 
export default TableHeader;