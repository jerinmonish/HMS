import React, { useEffect, useState, useRef, Fragment, useMemo } from "react";
import { Menu, Transition } from '@headlessui/react'
import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";
import DataTable from 'react-data-table-component';
import FilterComponent from "./FilterComponent";

const ListProducts = () => {
  
  const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(5);
	const [paginationPerPage, setPaginationPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const tmpToken = localStorage.getItem('user_token');
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${tmpToken}`
    }
	const fetchUsers = async page => {
		setLoading(true);
    
		const response = await axios.get(`http://127.0.0.1:8000/api/v1/list-products?page=${page}&per_page=${perPage}`,{headers: headers})
    .then((response)=> {
      // console.log(response.data);
      setData(response.data.data);
      setTotalRows(response.data.total);
      setLoading(false);
    });
	};

	const handlePageChange = page => {
		fetchUsers(page);
    setCurrentPage(page);
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setLoading(true);

		const response = await axios.get(`http://127.0.0.1:8000/api/v1/list-products?page=${page}&per_page=${newPerPage}`,{headers: headers});

		setData(response.data.data);
		setPerPage(newPerPage);
		setLoading(false);
	};

	useEffect(() => {
		fetchUsers(1); // fetch page 1 of users
		
	}, []);
  const handleButtonClick = () => {
		
		console.log('clicked');
	};
  const columns = [
    {
      name: 'Product Name',
      selector: row => row.p_name,
      sortable: true,
      // className:"text-left text-blue-900"
    },
    {
      name: 'Status',
      selector: row => row.available,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row => row.p_amt,
      sortable: true,
    },
    {
      name: 'Action',
      key: "action",
      className: "action",
      width: 100,
      align: "left",
      sortable: false,
      cell: record => { 
          return (
              <div>
                  <button onClick={()=>handleButtonClick()} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"><i className="fa fa-eye"></i></button>&nbsp;&nbsp;
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><i className="fa fa-edit"></i></button>&nbsp;&nbsp;
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"><i className="fa fa-trash"></i></button>
              </div>
          );
      }
    }
];

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

  return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const filteredItems = data.filter(
    item => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1
  );
  return (
      <div className="container w-full mx-auto pt-20">
        <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
          <div className="flex flex-row flex-wrap flex-grow mt-2">
            <div className="w-full p-3">
              <div className="bg-white border rounded shadow">
                <div className="border-b p-3">
                  <h5 className="font-bold uppercase text-gray-600">
                    List Product
                    <Link to={'/admin/add-product'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right	">Add Product</Link>
                  </h5>
                </div>
                <div className="p-5">
                  <DataTable
                    // title="Users"
                    columns={columns}
                    data={filteredItems}
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    paginationDefaultPage={currentPage}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    className="w-full p-5 text-gray-700"
                    paginationRowsPerPageOptions = {[5, 15, 20, 25, 30]}
                    paginationPerPage={paginationPerPage}
                    subHeader
                    subHeaderComponent={subHeaderComponent}
                  />
                  {/* <p className="py-2"><a href="#">See More issues...</a></p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
export default ListProducts