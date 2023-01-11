import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DeparetementComponent} from "./deparetement/deparetement.component";
import {SalariesComponent} from "./salaries/salaries.component";
import {SalariesDeparetementComponent} from "./salaries-deparetement/salaries-deparetement.component";
import {PredictComponent} from "./predict/predict.component";

const routes: Routes = [
  {path : "predict",component:PredictComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
