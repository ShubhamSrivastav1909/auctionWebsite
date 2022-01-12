import React, { Component } from 'react';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

class App extends Component {
    render() {
        const data = [{
            id: 'Item343489',
            st: "ongoing",
            bid: "",
            name:"",
        },{
            id: 'Item308907',
            st: "ongoing",
            bid: "",
            name:"",
        },{
            id: 'Item934567',
            st: "Success",
            bid: "$210",
            name:"Shubham Sri",
        },{
            id: 'Item908754',
            st: "upcoming",
            bid: "",
            name:"",
        },{
            id: 'Item890745',
            st: "Success",
            bid: "$200",
            name:"Smriti Komal",
        },{
            id: 'Item098765',
            st: "Success",
            bid: "$205",
            name:"Nividita",
        }]
        const columns = [{
            Header: 'Item ID',
            accessor: 'id'
        },{
            Header: 'Auction Status              ',
            accessor: 'st'
        },{
            Header: 'Max Bidding             ',
            accessor: 'bid'
        },{
                Header: 'Bidder Name            ',
                accessor: 'name'
            }]

        return (
            <div>
<header><h2>ITEM HISTORY</h2></header>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize = {6}
                    pageSizeOptions = {[2,4, 6]}
                />
            </div>
        )
    }
}
export default App;