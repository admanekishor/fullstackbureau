import axios from 'axios';

// Use environment variable for local development, fallback to production URL
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://www.muktainursesbureau.in/API";

// Convenience axios instance pre-configured with baseURL and defaults
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
});

// Basic response interceptor to log and normalize errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Log to console (could be extended to remote logging)
        console.error('API error:', error?.response?.status, error?.response?.data || error.message);
        return Promise.reject(error);
    }
);

const API_URLS = {
    totalActiveClients: `${BASE_URL}/total_active_clients.php`,
    SingleClient: `${BASE_URL}/singleclient.php`,
    clientVisit: `${BASE_URL}/clientvisit.php`,
    updateClientVisit: `${BASE_URL}/updateclientvisit.php`,
    clients: `${BASE_URL}/clients.php`,
    Insertclient: `${BASE_URL}/insertclient.php`,
    inActiveClients: `${BASE_URL}/InActiveClients.php`,
    speciality: `${BASE_URL}/speciality.php`,
    insertClientVisit: `${BASE_URL}/insertclientvisit.php`,
    ActiveClients: `${BASE_URL}/activeclients.php`,
    SelectedClientVisit: `${BASE_URL}/selectedclientvisit.php`,
    Login: `${BASE_URL}/login.php`,
    Staff: `${BASE_URL}/staff.php`,
    Activestaff: `${BASE_URL}/activestaff.php`,
    Deletestaff: `${BASE_URL}/deletestaff.php`,
    Staffdetails: `${BASE_URL}/staffdetails.php`,
    Updatepassword: `${BASE_URL}/updatepassword.php`,
    Areas: `${BASE_URL}/areas.php`,
    Paybill: `${BASE_URL}/paybill.php`,
    Activateclient: `${BASE_URL}/activateclient.php`,
    Speciality: `${BASE_URL}/speciality.php`,
    Getstaffbyspeciality: `${BASE_URL}/getstaffbyspeciality.php`,
    Deleteclient: `${BASE_URL}/deleteclient.php`,
    Editclient: `${BASE_URL}/editclient.php`,
    Updatearea: `${BASE_URL}/updatearea.php`,
    Editemployee: `${BASE_URL}/editemployee.php`,
    Insertarea: `${BASE_URL}/Insertarea.php`,
    Quickbilling: `${BASE_URL}/Quickbilling.php`,
    deletevisit: `${BASE_URL}/deletevisit.php`,
};

export { axiosInstance };
export default API_URLS;