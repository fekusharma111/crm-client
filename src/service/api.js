import axios from "axios";
import { getType } from "../Utils/Common_utils";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLs } from "../Constants/config"
// axios Interceptor//
const API_URL = "https://crmneerajbooksapi.herokuapp.com/"; 

//
const axiosInstance = axios.create({
  baseURL: API_URL, // backend url
  timeout: 10000, // if api rejected/stuck/pending then this is the timeout
  headers: {
    "content-type": "application/json", //optional
  },
});

// Calling the  request interceptor.
// it takes two callback funtion with comma(,) seperated.
// 1st one is for success,
// 2nd one is  for error (if error then we promise.reject and then pass the error )
axiosInstance.interceptors.request.use(
  function (config) {
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//Calling the  response interceptor.
// it takes two callback funtion with comma(,) seperated.
// 1st one is for success,
// 2nd one is  for error (if error then we promise.reject and then pass the error )
axiosInstance.interceptors.response.use(
  function (response) {
    // we should stop the global loader here if present any because the response is came
    //stop global loader here
    return processResponse(response); //a fuction will return in success case with response as a parameter
  },
  function (error) {
    // in error case we also need to stop the global loader if present
    //stop global loader here
    return Promise.reject(processError(error));
  }
);

// in success case we need the process that response.
// ////////////////
// if success --> return { isSuccess:true, data(aactual): object}
// if success then it will the return set isSuccess to true the data as object
//////////////
// if failure -->return {isFailure:true, status:string, msg (msg from backend): string, code(status code):int}
//This is the common response it will goes through (or common for) all api
const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } 
  else if (response?.status === 400) {
    return { isFailure: true, data: response.data };
  } else {
    return {
      isFailure: true,
      message:response.data.message,
      status: response.status,
      msg: response.msg,
      code: response?.code,
    };
  }
};
//  if success --> return { isSuccess:true, data(aactual): object}
const processError = (error) => {
  if (error.response) {
    // request sent successfully but server respond with status code other than 200 or out of range status code (2.x.x)
    console.log("ERROR IN RESPONSE", error.toJSON());
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    // request sent success but no response received i.e may be server closed or network issues
    console.log("ERROR IN REQUEST", error.toJSON());
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    // something happens in setting up the request that triggers an error
    console.log("ERROR IN Network", error.toJSON());
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
};
//Now we will create actual api
const API = {};
for (const [key, value] of Object.entries(SERVICE_URLs)) {
  //ye object ki ekek value utha ke dega(serviceurl objest ki)
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      TYPE: getType(value, body),

      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageCompleted);
        }
      },
    });
}

export { API };
  
  

// export const editCustomer = async (id, Employee) => {
//   try {
//     await axios.post(`${API_URL}/${id}`, Employee);
//   } catch (error) {
//     console.log(`Error occur while  Editing Employee details ${error}`);
//   }
// };

// export const deleteEmployee = async (id) => {
//   try {
//     if (window.confirm("Customer details will be delete permanently")) {
//       return await axios.delete(`${API_URL}/${id}`).then((res) => {
//         alert(res.data.message);
//       });
//     }
//     // alert(res.data.message);
//   } catch (error) {
//     // alert(res.data.message);
//     console.log(`Error occur while Deleting Customer details ${error}`);
//   }
// };
  
  
// export const getcustomer = async (id, setEmployee) => {
//   try {
//     await axios.get(`${API_URL}/${id}`).then((response) => {
//       setEmployee(response.data);
//     });
//   } catch (error) {
//     console.log(
//       `Error occur while getting the Editing Employee details ${error}`
//     );
//   }
// };
// export const detailview = async (id, setUser) => {
//   try {
//     await axios.get(`${API_URL}/${id}`).then((response) => {
//       setUser(response.data);
//     });
//   } catch (error) {
//     console.log(
//       `Error occur while getting the detailed view customer details ${error}`
//     );
//   }
// };
// export const newComment = async (comment) => {
//   try {
//     return await axios.post(`${API_URL}/comment/new`, comment).then((response) => {
//       alert(response.data.message);
//     });
//   } catch (error) {
//     console.log(
//       `Error occur while saving new comments ${error}`
//     );
//   }
// }
// export const getallcomments = async (id, setComments) => {
//   try {
//     await axios.get(`${API_URL}/getcomment/${id}`).then((response) => {
//       setComments(response.data);
//     })
//   } catch (error) {
//     console.log(
//       `Error occur while getting the all comments ${error}`
//     );
//   }
// }

