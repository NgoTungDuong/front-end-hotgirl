import React, { Component } from 'react'

export default class Pagination extends Component {
    render() {
        return (
            <div>
                <nav className='mt-5' aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {this.props.myArray.map((item) => {
                            return (
                                <li key={item} className={this.props.pageNumber === item + 1 ? "page-item active" : "page-item"}>
                                    <a className="page-link" onClick={this.props.handlePaginationClick}>{item + 1}</a>
                                </li>
                            );
                        })}
                        <li className="page-item">
                            <a className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
