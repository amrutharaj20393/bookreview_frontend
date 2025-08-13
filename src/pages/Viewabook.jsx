import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import { viewBookApi } from '../services/allApi';

function Viewabook() {


  const [token, setToken] = useState("")
  const [viewbookdetails, setViewBookDetails] = useState({
    title: "",
    author: "",
    description: "",
    imageurl: "",
    rating: "",
    comment: "",
    id: ""
  })

  const { id } = useParams()//hook to access data from parameter
  const navigate = useNavigate()
 // console.log(id)
  const viewABook = async (id) => {
    const result = await viewBookApi(id)
    //console.log(result)
    if (result.status == 200) {
      setViewBookDetails(result.data)
      //setReviewDetails(result.data)
    }
  }
  //console.log(reviewDetails)
  useEffect(() => {
    viewABook(id)
    if (sessionStorage.getItem("token")) {
      const storedtoken = sessionStorage.getItem("token")
      setToken(storedtoken)
    }
  }, [])
  return (

    <>
      <Header />
      <h3 className='text-3xl mt-5 text-center'>Book Details</h3>
      <div className='md:grid grid-cols-3 '>

        <div></div>
        <div className='flex justify-center items-center flex-col md:px-10 p-5'>
          <div className='md:grid grid-cols-2 w-full border-2 p-5'>

            <div className='w-full  shadow rounded'>

              <img src={viewbookdetails?.imageurl ? viewbookdetails?.imageurl : null} alt={viewbookdetails.title || "Book cover"} style={{ width: '100%', height: '500px' }} />


            </div>

            <div className='flex  justify-center  flex-col ms-3'>

              <p className='text-blue-700 font-medium mt-3'>{viewbookdetails?.author}</p>
              <h3 className='mt-3 text-amber-700'>{viewbookdetails?.title}</h3>
              <p className='text-justify'>{viewbookdetails?.description}</p>
              <p className='text-blue-700 '>Rating:<span className='text-red-600 ms-2'>{viewbookdetails?.rating}</span></p>
              <p className='text-blue-700 '>Comment:<span className='text-red-600 ms-2'>{viewbookdetails?.comment}</span></p>

              <Link to={`/`}><button className='w-full px-3 py-2 mt-3 bg-blue-800 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>Back</button></Link>
            </div>


          </div>
        </div>
        <div></div>

      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      <Footer />
    </>
  )
}

export default Viewabook