import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'stock-branch',
    templateUrl: 'stock-branch.component.html'
})

export class StockBranchComponent implements OnInit {

    @Input()
    parent: FormGroup;

    get unknown() {
        return (
            this.parent.get('store.branch').hasError('unknownBranch') &&
            this.parent.get('store.branch').dirty 
        );
    }

    get invalid() {
        return (
            this.parent.get('store.branch').hasError('invalidBranch') &&
            this.parent.get('store.branch').dirty &&
            !this.required('branch')
        );
    }

    constructor() { }

    ngOnInit() { }

    required(name: string) {
        return (
            this.parent.get(`store.${name}`).hasError('required') &&
            this.parent.get(`store.${name}`).touched
        );
    }
}