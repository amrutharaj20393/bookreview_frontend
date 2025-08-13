import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

//register content-type application-json
export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register`, reqBody)

}
//login api
export const LoginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody)
}

//to add new book
export const addBookApi = async (reqBody,reqHeader) => {
   
    return await commonApi('POST', `${serverUrl}/addbook`, reqBody,reqHeader)
}
//

//get all books
export const getAllBookApi = async (reqHeader) => {
    
    return await commonApi('GET', `${serverUrl}/allbooks`, '', reqHeader)
}


//api to get  a book
export const viewBookApi = async (id) => {
    return await commonApi('GET', `${serverUrl}/viewbook/${id}`)
}


//api to add review  a book
export const AddreviewBookApi = async (reqBody,reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/reviewbook`,reqBody,reqHeader)
}

//get home book
export const homeBookApi = async () => {
    return await commonApi('GET', `${serverUrl}/allhomebook`)
}
