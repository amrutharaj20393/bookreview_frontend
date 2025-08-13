import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AddreviewBookApi, viewBookApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Viewbook() {

    const [viewbookdetails, setViewBookDetails] = useState({
        title: "",
        author: "",
        description: "",
        imageurl: "",
        rating: "",
        comment: ""
    })

    const [token, setToken] = useState("")
    const [reviewDetails, setReviewDetails] = useState({
        title: "",
        author: "",
        description: "",
        imageurl: "",
        rating: "",
        comment: ""
    })

    const { id } = useParams()//hook to access data from parameter
    const navigate = useNavigate()
    //console.log(id)
    const viewABook = async (id) => {
        const result = await viewBookApi(id)
       // console.log(result)
        if (result.status == 200) {
            setViewBookDetails(result.data)
            setReviewDetails(result.data)
        }
    }
    //console.log(reviewDetails)

    const handleAddReview = async () => {
        const { _id, title, author, description, imageurl, rating, comment } = reviewDetails

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await AddreviewBookApi({ _id, title, author, description, imageurl, rating, comment }, reqHeader)
      //  console.log(result)
        if (result.status == 200) {
            setViewBookDetails(result.data)
            setReviewDetails(result.data)
            toast.success("Review Added Sucessfully")

            setTimeout(() => {

                navigate('/')
            }, 2500)

        }
        else if (result.status == 409) {
            toast.warning(result.response.data)
            setReviewDetails({
                title: "",
                author: "",
                description: "",
                imageurl: "",
                rating: "",
                comment: "",
                id: ""
            })
            navigate('/')
        }
        else {
            toast.error("something went wrong")
            setReviewDetails({
                title: "",
                author: "",
                description: "",
                imageurl: "",
                rating: "",
                comment: "",
                id: ""
            })
            navigate('/')
        }


    }
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
            <h3 className='text-3xl mt-5 text-center'>Add A Review</h3>
            <div className='md:grid grid-cols-3 '>

                <div></div>
                <div className='flex justify-center  flex-col md:px-10 p-5'>
                    <div className='md:grid grid-cols-2 w-full border-2 px-5 py-5'>

                        <div className='w-full mt-5  shadow rounded'>
                            <img src={viewbookdetails?.imageurl ? viewbookdetails?.imageurl : null} alt={viewbookdetails.title || "Book cover"} style={{ width: '100%', height: '500px' }} />


                        </div>

                        <div className='flex  justify-center  flex-col ms-3'>

                            <p className='text-blue-700 mt-3'>{viewbookdetails?.author}</p>
                            <h3 className='mt-3'>{viewbookdetails?.title}</h3>
                            <p className='text-justify'>{viewbookdetails?.description}.</p>
                            <div className="mb-3 mt-5">
                                <label htmlFor="" className='text-red-400'>Rating</label>
                                <input value={reviewDetails.rating} onChange={(e) => setReviewDetails({ ...reviewDetails, rating: e.target.value })} placeholder='Add rating from 1 to 5' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full text-black' type="number"
                                    min="1"
                                    max="5" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className='text-red-400'>Comment</label>
                                <input value={reviewDetails.comment} onChange={(e) => setReviewDetails({ ...reviewDetails, comment: e.target.value })} type="text" placeholder='Comment' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full text-black' />
                            </div>
                            <button onClick={handleAddReview} type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 sm:w-auto hover:text-black hover:border hover:border-gray-500">Add Review</button>
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

export default Viewbook