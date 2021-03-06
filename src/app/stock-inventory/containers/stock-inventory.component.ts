import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Product } from '../models/product.interface';
import { StockInventoryService } from '../services/stock-inventory.service';
import { forkJoin, Observable } from 'rxjs';
import { Item } from '../models/item.interface';
import { StockValidators } from './stock-inventory.validators';
import { map } from 'rxjs/operators';

@Component({
    selector: 'stock-inventory',
    templateUrl: 'stock-inventory.component.html'
})

export class StockInventoryComponent implements OnInit {

    products: Product[];
    total: number;
    productMap: Map<number, Product>;

    form = this.fb.group(
        {
            store: this.fb.group({
                // first argument is the default value, second argument is for the sync validators and 
                //third is for async validators
                branch: ['', [Validators.required, StockValidators.checkBranch], [this.validateBranch.bind(this)]],
                code: ['', Validators.required]
            }),
            selector: this.createStock({}),
            stock: this.fb.array([])
        }, {
            // form group custom validators
            validator: StockValidators.checkStockExists
        })

    constructor(
        private fb: FormBuilder,
        private stockService: StockInventoryService
    ) { }

    ngOnInit() {
        const cart = this.stockService.getCartItems();
        const products = this.stockService.getProducts();

        const join = forkJoin(cart, products);
        join.subscribe(([cart, products]: [Item[], Product[]]) => {
            console.log("From subscribe : ");
            console.log(cart, products);

            const myMap = products.map<[number, Product]>(product => [product.id, product]);
            console.log("myMap : ", myMap);

            this.productMap = new Map<number, Product>(myMap);
            console.log("productMap : ", this.productMap);

            this.products = products;

            cart.forEach(item => this.addStock(item));

            this.calculateTotal(this.form.get('stock').value);
            this.form.get('stock').valueChanges.subscribe(value => {
                return this.calculateTotal(value)
            });
        });
    }

    validateBranch(control : AbstractControl) {
        return this.stockService.checkBranchId(control.value).pipe(
            map((response : boolean) => {
                return response ? null : {unknownBranch : true}
            })
        );
    }

    calculateTotal(value: Item[]) {
        const total = value.reduce((prev, next) => {
            return prev + (next.quantity * this.productMap.get(next.product_id).price)
        }, 0);
        this.total = total;
    }

    createStock(stock) {
        return this.fb.group({
            product_id: parseInt(stock.product_id, 10) || '',
            quantity: stock.quantity || 10
        });
    }

    onSubmit() {
        console.log('Submit : ', this.form.value);
    }

    addStock(stock) {
        const control = this.form.get('stock') as FormArray;
        control.push(this.createStock(stock));
    }

    removeStock({ group, index }: { group: FormGroup, index: number }) {
        const control = this.form.get('stock') as FormArray;
        control.removeAt(index);
    }
}