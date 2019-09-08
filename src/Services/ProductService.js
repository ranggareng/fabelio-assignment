import axios from 'axios';

const API_BASE_URL = 'http://www.mocky.io/v2';

class ProductService {
	getAllProduct() {
		return new Promise((resolve, reject) => {
			axios
				.get(API_BASE_URL + '/5c9105cb330000112b649af8')
				.then(response => {
					if(response && response.status === 200){
						resolve(response.data);
					}else{
						reject('Something wrong with API');
					}
				})
				.catch(error => reject(error.message));
		})
	}	
}

export { ProductService };