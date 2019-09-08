// IMPORT PACKAGE REFERENCES
import React from 'react';

const ProductItem = ({ product }) => (
	<div class="row">
		<div class="product-name col-8">
			{product.name}
		</div>
		<div class="product-price col-4">{product.price}</div>
		<div class="product-desc col-12">{product.description.substring(0,114)}</div>
		<div class="product-style col-12">{product.furniture_style.map((style, $key) => ( style + (product.furniture_style.length === $key+1 ? "" : ", " )))}</div>
		<div class="col-8">&nbsp;</div>
		<div class="product-delivery col-4">{product.delivery_time + ' hari'}</div>
	</div>
);

export { ProductItem }