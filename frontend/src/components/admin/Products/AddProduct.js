import React, { useEffect, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Transition } from '@headlessui/react'
import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";
import DataTable from 'react-data-table-component';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { adminAddProduct, listAllCategory } from "../../../actions/products";
import { useHistory } from "react-router-dom";
import Select from 'react-select';


const AddProduct = () => {
  const dispatch = useDispatch()
  const history  = useHistory();
  const [imgSelected,setImgSelected] = useState([]);
  const [catValue,setCatValue] = useState([]);
  const pData = useSelector(state => state.productsApi);
  
  const formik = useFormik({
     initialValues: {
       p_name: '',
       p_image_name:'',
       p_description:'',
       available:'',
       p_amt:'',
     },
     validationSchema: Yup.object({
      p_name: Yup.string().required('This field is required'),
      cat_id: Yup.string().required('This field is required'),
      p_image_name: Yup.array().min(1, 'This field is required'),
      p_description: Yup.string().required('This field is required'),
      p_amt: Yup.number().typeError('you must specify a number').min(0, 'Min value 0.').max(30, 'Max value 30.')//Yup.string().required('This field is required'),
    }),
     onSubmit: values => {
          const formData = JSON.stringify({
                params: { 
                  p_image_name: values.p_image_name,
                  p_name: values.p_name,
                  p_description: values.p_description,
                  p_amt: values.p_amt,
                  cat_id: values.cat_id,
                  available:values.available,
                } 
          });
       dispatch(adminAddProduct(formData, history))
     },
   });

   useEffect(() => {
     //console.log(imgSelected);
     formik.setFieldValue("p_image_name",imgSelected);
     dispatch(listAllCategory());
   }, [imgSelected])
   

  const handleLogoChange = (i) => {
    let files = i.target.files;
    var file;
    //loop through files
    for (var i = 0; i < files.length; i++) {
      // get item
      file = files.item(i);
      //or
      file = files[i];
      //alert(file.name);
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files[i]);
      fileReader.onload = (event) => {
        setImgSelected(imgSelected => [...imgSelected,event.target.result]);
      }
    }
  }

  const handleCatChange = (e) => {
    if(e?.value){
      formik.setFieldValue('cat_id',e?.value);
      setCatValue({value:e?.value,label:e?.label});
    }
  }

  const handleAvailableChange = (e) => {
    if(e?.target?.checked){
      formik.setFieldValue('available','Active');
    } else {
      formik.setFieldValue('available','Inactive');
    }
  }

  let catOptions = [];
  pData?.categoryData?.data.map((user) => (
    catOptions.push({value:user.id,label:user.name})
  ))

  return (
      <div className="container w-full mx-auto pt-20">
        <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
          <div className="flex flex-row flex-wrap flex-grow mt-2">
            <div className="w-full p-3">
              <div className="bg-white border rounded shadow">
                <div className="border-b p-3">
                  <h5 className="font-bold uppercase text-gray-600">
                    Add Product
                  </h5>
                </div>
                <div className="p-5">
                  <form className="w-full max-w-sm" onSubmit={formik.handleSubmit}>
                    <div className="md:flex md:items-center mb-6 grid grid-cols-4">
                      <div className="md:w-1/3">
                        <label className="block text-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                          Product Name
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="p_name" id="inline-full-name" type="text" onChange={formik.handleChange} value={formik.values.p_name} onBlur={formik.handleBlur}/>
                         {formik.touched.p_name && formik.errors.p_name ? <div className="text-red">{formik.errors.p_name}</div> : null}
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6 grid grid-cols-4">
                      <div className="md:w-1/3">
                        <label className="block text-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                          Category
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder={'Choose a Category'}
                          defaultValue=''
                          value={catValue}
                          onChange={(e) => handleCatChange(e)}
                          options={catOptions}
                          name="cat_id"
                        />
                        {formik.touched.cat_id && formik.errors.cat_id ? <div className="text-red">{formik.errors.cat_id}</div> : null}
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6 grid grid-cols-4">
                      <div className="md:w-1/3">
                        <label className="block text-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                          Product Image
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="p_image_name" id="inline-full-name" type="file" onChange={(event) => {handleLogoChange(event)}} multiple/>
                         {formik.touched.p_image_name && formik.errors.p_image_name ? <div className="text-red">{formik.errors.p_image_name}</div> : null}
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6 grid grid-cols-4">
                      <div className="md:w-1/3">
                        <label className="block text-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                          Product Description
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <textarea className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="p_description" id="inline-full-name" onChange={formik.handleChange} value={formik.values.p_description} onBlur={formik.handleBlur}/>
                         {formik.touched.p_description && formik.errors.p_description ? <div className="text-red">{formik.errors.p_description}</div> : null}
                      </div>
                    </div>
                     <div className="md:flex md:items-center mb-6 grid grid-cols-4">
                      <div className="md:w-1/3">
                        <label className="block text-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                          Product Price
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="p_amt" id="inline-full-name" type="text" onChange={formik.handleChange} value={formik.values.p_amt} onBlur={formik.handleBlur}/>
                         {formik.touched.p_amt && formik.errors.p_amt ? <div className="text-red">{formik.errors.p_amt}</div> : null}
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3"></div>
                      <label className="md:w-2/3 block text-gray-500 font-bold">
                        <input className="mr-2 leading-tight" type="checkbox" name="available" onChange={(e)=>handleAvailableChange(e)}/>
                        <span className="text-sm">
                        Product Available
                        </span>
                      </label>
                    </div>
                    <div className="md:flex md:items-center">
                      <div className="md:w-1/3"></div>
                      <div className="md:w-2/3">
                        <button className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to={'/admin/product'}className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">Cancel</Link>
                      </div>
                    </div>
                  </form>
                  {/* <p className="py-2"><a href="#">See More issues...</a></p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
export default AddProduct