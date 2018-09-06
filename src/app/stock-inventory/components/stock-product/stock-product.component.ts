import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Product } from '../../models/product.interface';

@Component({
    selector: 'stock-product',
    templateUrl: 'stock-product.component.html'
})

export class StockProductComponent implements OnInit {

    @Input()
    parent: FormGroup;

    @Input()
    map: Map<number, Product>;

    @Output()
    removed = new EventEmitter<any>();

    get stocks() {
        return (this.parent.get('stock') as FormArray).controls;
    }

    constructor() { }

    ngOnInit() { }

    getProduct(id) {
        return this.map.get(id);
    }

    onRemove(group, index) {
        this.removed.emit({ group, index });
    }
}