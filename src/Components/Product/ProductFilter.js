// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

class ProductFilter extends Component {

	constructor(props) {
		super(props);

		this.state = {
			'filter_search': '',
			'filter_furniture_style': [],
			'filter_delivery_time': []
		}
	}

	handleChange() {
		this.props.onChange(this.state);
	}

	handleFurnitureSyleSelectChange(e){
		this.handleSelectChange('filter_furniture_style', e);
	}

	handleDeliverySelectChange(e){
		this.handleSelectChange('filter_delivery_time', e);
	}

	handleSelectChange(type, e){
		let selected_style = [];

		e.map((style, key) => (
			selected_style[key] = style.value
		));

		if(type === 'filter_furniture_style')
			this.setState({
				'filter_furniture_style': selected_style
			});
		else if(type === 'filter_delivery_time')
			this.setState({
				'filter_delivery_time': selected_style
			});
	}

	handleSearchChange(e){
		this.setState({
			'filter_search': e.target.value 
		});

		this.handleChange();
	}

	render() {
		let data;
		let options = [];

		const delivery_option = [
	  		{ label: '1 week', value: 7},
	  		{ label: '2 weeks', value: 14},
	  		{ label: '1 month', value: 30},
	  		{ label: 'More', value: 'more'},
		];

		this.props.furniture_styles.map((style, key) => (
			options[key] = {
				label: style,
				value: style
			}
		));

		return (
			<div class="row" id="product-filter">
				<div class="col-12" id="search">
					 <input type="text" id="filter" placeholder="Search Furniture" onKeyUp={this.handleSearchChange.bind(this)}/>
				</div>
				<div class="col-6" id="filter-furniture-style">
					<ReactMultiSelectCheckboxes placeholderButtonLabel="Furniture Syle" options={options} onChange={this.handleFurnitureSyleSelectChange.bind(this)} onMenuClose={this.handleChange.bind(this)}/>
				</div>
				<div class="col-6" id="filter-furniture-style">
					<ReactMultiSelectCheckboxes placeholderButtonLabel="Delivery Time" options={delivery_option} onChange={this.handleDeliverySelectChange.bind(this)} onMenuClose={this.handleChange.bind(this)}/>
				</div>
			</div>
		);
	}
}

export { ProductFilter }