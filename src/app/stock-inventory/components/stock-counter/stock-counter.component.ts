import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTER_CONTROL_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StockCounterComponent),
    multi: true
};

@Component({
    selector: 'stock-counter',
    providers: [COUNTER_CONTROL_ACCESSOR],
    templateUrl: 'stock-counter.component.html'
})

export class StockCounterComponent implements OnInit, ControlValueAccessor {

    @Input() step: number = 10;
    @Input() min: number = 10;
    @Input() max: number = 1000;

    value: number = 10;
    focus: boolean;

    constructor() { }

    ngOnInit() {

    }

    onKeyDown(event: KeyboardEvent) {
        const handlers = {
            ArrowDown: () => this.decrement(),
            ArrowUp: () => this.increment()
        };

        console.log(event.code);

        if (handlers[event.code]) {
            handlers[event.code]();
            event.preventDefault();
            event.stopPropagation();
        }
        this.onTouch();
    }

    onBlur(event : FocusEvent) {
        this.focus = false;
        event.preventDefault();
        this.onTouch();
    }

    onFocus(event : FocusEvent) {
        this.focus = true;
        event.stopPropagation();
        this.onTouch();
    }

    increment() {
        if (this.value < this.max) {
            this.value = this.value + this.step;
            this.onModelChange(this.value);
        }
        this.onTouch();
    }

    decrement() {
        if (this.value > this.min) {
            this.value = this.value - this.step;
            this.onModelChange(this.value);
        }
        this.onTouch();
    }

    writeValue(value) {
        console.log(value);
        this.value = value || 0;
    }

    registerOnTouched(fn) {
        this.onTouch = fn;
    }

    registerOnChange(fn) {
        this.onModelChange = fn;
    }

    private onTouch: Function;
    private onModelChange: Function;
}