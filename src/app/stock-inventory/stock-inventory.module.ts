import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  
import { StockInventoryComponent } from './containers/stock-inventory.component';
import { StockBranchComponent } from './components/stock-branch/stock-branch.component';
import { StockProductComponent } from './components/stock-product/stock-product.component';
import { StockSelectorComponent } from './components/stock-selector/stock-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { StockInventoryService } from './services/stock-inventory.service';
import { StockCounterComponent } from './components/stock-counter/stock-counter.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [
        StockInventoryComponent
    ],
    declarations: [
        StockInventoryComponent,
        StockBranchComponent,
        StockProductComponent,
        StockSelectorComponent,
        StockCounterComponent
    ],
    providers: [
        StockInventoryService
    ],
})
export class StockInventoryModule { }
