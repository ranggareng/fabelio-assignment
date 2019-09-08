// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';

// IMPORT PROJECT SERVICES
import { ProductService } from '../../Services/ProductService';

// IMPORT PROJECT REFERENCES
import { ProductItem } from './ProductItem';
import { ProductFilter } from './ProductFilter';

// INITIALIZE SERVICES
const productService = new ProductService();

class ProductList extends Component {
	constructor(props){
		super(props);

		this.state = {
			furniture_styles: [],
			products: [],
			filtered_products: []
		}
	}

	componentDidMount() {
		productService
			.getAllProduct()
			.then(response => {
				console.log(response.products);
				this.setState(state => ({ 
					'furniture_styles': response.furniture_styles, 
					'products': response.products,
					'filtered_products' : response.products
				}));
			})
			.catch(error => console.log(error));
	}

	filterProducts = (changed) => {
		console.log(changed);
		let filtered_products = this.state.products;

		filtered_products = filtered_products.filter((product) => {
			let cocok = true;
			let search = changed.filter_search;
			let styles = changed.filter_furniture_style;
			let durations = changed.filter_delivery_time;

			let name = product.name.toLowerCase();
			let desc = product.description.toLowerCase();

			if(search === ''){
				cocok = true;
			}else if(name.includes(search) || desc.includes(search)){
				cocok = true;
			}else{
				cocok = false;
			}

			if(cocok && styles.length !== 0){
				for(let i=0; i<product.furniture_style.length; i++){
					if(styles.includes(product.furniture_style[i])){
						cocok = true;
						break;
					}else{
						cocok = false;
					}
				}
			}

			if(cocok && durations.length !== 0){
				for(let i=0; i<durations.length; i++){
					if(durations[i] === 'more' && parseInt(product.delivery_time) > 30){
						cocok = true;
						break;
					}else if(durations[i] === 7 && parseInt(product.delivery_time) <= 7){
						cocok = true;
						break;
					}else if(durations[i] === 14 && parseInt(product.delivery_time) <= 14 && parseInt(product.delivery_time) > 7){
						cocok = true;
						break;
					}else if(durations[i] === 30 && parseInt(product.delivery_time) <= 30 && parseInt(product.delivery_time) > 14){
						cocok = true;
						break;
					}else{
						cocok = false;
					}
				}
			}

			return cocok;
		});

		this.setState({
			'filtered_products': filtered_products
		});
	}

	render() {
		let data;

		if(this.state.products !== null){
			data = this.state.filtered_products.map((product, key) => (
				<div class="col-6 product-item">
					<ProductItem product={product} key={key} />
				</div>
			))
		}else{
			data = '<div className="w-100 text-center mt-5">'
                + '<i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>'
           		+ '</div>';
		}

		return (
			<div class="row">
				<div class="col-12">
					<ProductFilter furniture_styles={this.state.furniture_styles} onChange={this.filterProducts}/>
				</div>
				<div class="col-12" id="product-list">
					<div class="row ">
						{data}
					</div>
				</div>
			</div>
		);
	}
}

export { ProductList }