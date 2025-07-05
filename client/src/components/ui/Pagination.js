import React from 'react';
import './Pagination.css';

const Pagination = () => {
    return (
        <div className="pagination-container">
            <button className="pagination-arrow"> &lt; Previous </button>
            <div className="page-numbers">
                <button className="page-number active">1</button>
                <button className="page-number">2</button>
                <button className="page-number">3</button>
                <span className="page-ellipsis">...</span>
                <button className="page-number">8</button>
                <button className="page-number">9</button>
                <button className="page-number">10</button>
            </div>
            <button className="pagination-arrow"> Next &gt; </button>
        </div>
    )
}

export default Pagination; 