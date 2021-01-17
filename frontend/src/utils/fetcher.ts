import axios from 'axios';

const fetcher = (url: string) => 
  axios
    .get(url, { headers: { Authorization: `${localStorage.getItem('jwtToken')}` } })
    .then((response) => response.data);

export default fetcher;
