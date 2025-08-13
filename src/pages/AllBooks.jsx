import React, { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { getAllBookApi } from '../services/allApi'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { addBookStatusContext } from '../context/ContextShare'

function AllBooks() {
    const [token, setToken] = useState("")
    const [allBooks, setAllBooks] = useState([])

    const { addBookStatus } = useContext(addBookStatusContext)
    const getAllBooks = async (tok) => {
        const reqHeader = {
            "Authorization": `Bearer ${tok}`
        }
        const result = await getAllBookApi(reqHeader)
        ///  console.log(result)
        if (result.status == 200) {
            setAllBooks(result.data)

        }
    }
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const tok = sessionStorage.getItem("token")
            setToken(tok)
            getAllBooks(tok)
        }
    }, [addBookStatus])
    return (
        <>
            <Header />
            <section className='flex justify-center items-center flex-col md:p-10 md:px-40 p-5'>
                <h1 className='text-5xl '>New Arrivals</h1>
                <h5 className='text-2xl mt-2'>Explore Our Latest Collection</h5>

                {token && <div className='md:grid grid-cols-4 w-full mt-5 p-2 mx-5'>
                    {
                        allBooks?.length > 0 ?
                            allBooks?.map((item, index) => (
                                <div className='p-3 shadow' key={index}>
                                    <img src={item?.imageurl} alt="" style={{ width: '100%', height: '300px' }} />
                                    <div className='flex  justify-center items-center flex-col ms-3'>
                                        <p className='text-blue-700'>{item?.author}</p>
                                        <h3>{item?.title}</h3>
                                        <p>{item.description.slice(0, 20)}...</p></div>
                                    <div className='sm:flex '>
                                        <Link to={`/review-book/${item?._id}`}><button className='w-full px-3 py-2 mt-3 bg-blue-800 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>Add Review Book</button></Link>
                                        <Link to={`/view-book/${item?._id}`}><button className='w-full px-3 py-2 mt-3 ms-3 bg-green-800 text-white hover:border hover:border-green-900 hover:text-green-900 hover:bg-white'>View Book</button></Link>
                                    </div>

                                </div>
                            )) :
                            <p>Loading</p>
                    }

                </div>}
                {!token && <div className='grid grid-cols-3 py-10'>
                    <div></div>

                    <div className='flex justify-center items-center flex-col w-full'>
                        <img src="https://media.tenor.com/2cwdcFp9k2kAAAAj/lock.gif" alt="" />
                        <p className='mt-3 text-2xl'>Please <Link to={'/login'} className='text-red-600 underline'>Login</Link> To explore more</p>
                    </div>
                    <div></div>
                </div>}
            </section>
            <Footer />
        </>
    )
}

export default AllBooks