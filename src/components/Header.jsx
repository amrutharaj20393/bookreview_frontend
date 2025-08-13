import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { addBookApi } from '../services/allApi'
import { addBookStatusContext } from '../context/ContextShare'

function Header() {
    const [status, setStatus] = useState(false)
    const [dropdownstatus, setDropdownStatus] = useState(false)
    const [token, setToken] = useState("")
    
    const [bookdetails, setBookDetails] = useState({
        title: "",
        author: "",

        description: "",
        imageurl: ""
    })
    const [modalstatus, setModalStatus] = useState(false)
const { setAddBookStatus } = useContext(addBookStatusContext)
//const { addBookStatus } = useContext(addBookStatusContext)



  //  console.log(bookdetails)
   //  console.log(token)
    const navigate = useNavigate()

    const handleAddBook = async () => {
       // console.log("inside add book")
        const { title, author, description, imageurl } = bookdetails
        if (!title || !author || !imageurl || !description) {
            toast.info("Please fill all details")
        }
        else {
            
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }

            const result = await addBookApi({ title, author, description, imageurl },reqHeader)
            // console.log(result)
            if (result.status == 200) {
                toast.success("Book Added Sucessfully")
                setBookDetails({
                    title: "",
                    author: "",

                    description: "",
                    imageurl: ""
                })
                setModalStatus(false)
                setAddBookStatus(result.data)
            }
            else if (result.status == 400) {
                toast.warning(result.response.data)
                setBookDetails({
                    title: "",
                    author: "",

                    description: "",
                    imageurl: ""
                })
            }
            else {
                toast.error("something went wrong")
                setBookDetails({
                    title: "",
                    author: "",

                    description: "",
                    imageurl: ""
                })
            }
        }
    }
     const handleLogout = () => {
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setToken("")
    navigate('/')
  }
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            const storedtoken = sessionStorage.getItem("token")
            setToken(storedtoken)
        }
    }, [])
    return (
        <>
            <div className='grid grid-cols-3 p-3 '>
                <div className='flex items-center'>
                    <img src="https://cdn-icons-png.flaticon.com/512/5402/5402751.png" alt="" style={{ width: '50px,', height: '50px' }} />
                    <h1 className='text-1xl text-blue-700 md:hidden ms-2'>BOOK REVIEW APP</h1>
                </div>
                <div className='md:flex justify-center items-center hidden'><h1 className='text-3xl'>BOOK REVIEW APP</h1></div>
                <div className='md:flex justify-end items-center hidden'>
                    <FontAwesomeIcon icon={faInstagram} className='me-3' />
                    <FontAwesomeIcon icon={faTwitter} className='me-3' />
                    <FontAwesomeIcon icon={faFacebook} className='me-3' />

                    {!token ? <Link to={'/login'}><button className='border border-black rounded px-3 py-2'><FontAwesomeIcon icon={faUser} />Login</button></Link> :


                        <div className="relative inline-block text-left">
                            <div>
                                <button onClick={() => setDropdownStatus(!dropdownstatus)} type="button" className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs  hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt="" style={{ width: '40px', height: '40px' }} className='mx-2' />

                                </button>
                            </div>


                            {dropdownstatus && <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">

                                   
                                    <Link to={'/'}><button  onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1"><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button></Link>

                                </div>
                            </div>}
                        </div>}

                </div>


            </div>
            <nav className='p-3 w-full bg-gray-900 text-white md:flex justify-center items-center'>
                <div className='flex justify-between items-center px-3 md:hidden'>
                    <span onClick={() => setStatus(!status)} className='text-2xl'><FontAwesomeIcon icon={faBars} /></span>

                    {!token ? <Link to={'/login'}><button className='border border-black rounded px-3 py-2 ms-3'><FontAwesomeIcon icon={faUser} className='me-2' />Login</button></Link> :

                        <div className="relative inline-block text-left">
                            <div>
                                <button onClick={() => setDropdownStatus(!dropdownstatus)} type="button" className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs " id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt="" style={{ width: '40px', height: '40px' }} className='mx-2' />

                                </button>
                            </div>


                            {dropdownstatus && <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">

                                  
                                    <Link to={'/'}><p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1"  onClick={handleLogout}><FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</p></Link>

                                </div>
                            </div>}
                        </div>}
                </div>
                <ul className={status ? 'md:flex' : 'md:flex justify-center hidden'}>
                    <Link to={'/'}> <li className='mx-4'>Home</li></Link>
                    <Link to={'/all-Books'}><li className='mx-4'>All Books</li></Link>
                    {token && <li className='mx-4' onClick={() => setModalStatus(true)}>Add Book</li>}
                    {modalstatus && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    {/*title */}
                                    <div className="bg-gray-900 p-4 flex sm:px-6 justify-between">
                                        <h1 className='text-white text-2xl'>Add Book</h1>
                                        <FontAwesomeIcon onClick={() => setModalStatus(false)} icon={faXmark} className='text-white fa-2x' />
                                    </div>

                                    {/*body */}
                                    <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">

                                        <div className='p-3'>
                                            <div className="mb-3">
                                                <input name={bookdetails.title} onChange={(e) => setBookDetails({ ...bookdetails, title: e.target.value })} type="text" value={bookdetails.title} placeholder=' Title' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full text-black' />
                                            </div>
                                            <div className="mb-3">
                                                <input name={bookdetails.author} value={bookdetails.author} onChange={(e) => setBookDetails({ ...bookdetails, author: e.target.value })} type="text" placeholder='Author' className='p-2 border border-gray-400 rounded placeholder-gray-500  text-black w-full' />
                                            </div>
                                            <div className="mb-3">
                                                <input name={bookdetails.description} value={bookdetails.description} onChange={(e) => setBookDetails({ ...bookdetails, description: e.target.value })} type="text" placeholder='description' className='p-2 border border-gray-400   text-black rounded placeholder-gray-500  w-full' />
                                            </div>

                                            <div className="mb-3">
                                                <input  name={bookdetails.imageurl} value={bookdetails.imageurl} onChange={(e) => setBookDetails({ ...bookdetails, imageurl: e.target.value })} type="text" placeholder='image url' className='p-2 border border-gray-400 rounded placeholder-gray-500  text-black  w-full' />
                                            </div>

                                        </div>






                                    </div>

                                    {/*footer of the modal */}
                                    <div className="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button onClick={handleAddBook} type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs  sm:ml-3 sm:w-auto hover:text-black hover:border hover:border-gray-500">Add New Book</button>
                                        <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto hover:text-black">Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                    <Link to={'/contactus'}><li className='mx-4'>Contact</li></Link>
                </ul>

            </nav>
  <ToastContainer theme='colored' position='top-center' autoClose={2000} />
        </>
    )
}

export default Header