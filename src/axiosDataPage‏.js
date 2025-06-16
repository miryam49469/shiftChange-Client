import axios from 'axios'
export const updateShift = async (shift) => {
    return axios.put('https://localhost:44355/api/shifts', shift);
  };
  
  export const getMyShifts = async (user) => {
    return axios.get('https://localhost:44355/api/shifts', { params: { user } });
  };
  
  export const offerSwap = async (newRequest) => {
    return axios.post('https://localhost:44355/api/requests', newRequest);
  };
  
  export const getMyRequests = async () => {
    return axios.get('https://localhost:44355/api/requests');
  };
  
  export const UpdateOfferSwap = async (newRequest) => {
    return axios.put('https://localhost:44355/api/requests', newRequest);
  };
  