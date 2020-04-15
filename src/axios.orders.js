import Axios from 'axios';

const Instance = Axios.create({
    baseURL: 'https://burger-builder-55849.firebaseio.com'
});

export default Instance;