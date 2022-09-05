import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
	selector: 'app-product-delete',
	templateUrl: './product-delete.component.html',
	styleUrls: ['./product-delete.component.css'],
})
export class ProductDeleteComponent implements OnInit {
	product: Product = {} as Product;

	constructor(
		private router: Router,
		private productService: ProductService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.productService.readById(id).subscribe((product) => {
				this.product = product;
			});
		}
	}

	deleteProduct(): void {
		if (this.product.id) {
			this.productService.delete(this.product.id).subscribe(() => {
				this.productService.showMessage('Produto deletado com sucesso!');
				this.router.navigate(['/products']);
			});
		}
	}

	cancel(): void {
		this.router.navigate(['/products']);
	}
}
