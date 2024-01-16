import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}

// *ngFor="let ingredientCtrl of recipeForm.get('ingredients').controls; let i = index"

// This code will fail with the latest Angular version.

// You can fix it easily though. Outsource the "get the controls" logic into a getter of your component code (the .ts file):

// get controls() {  a getter!
//   return (<FormArray>this.recipeForm.get('ingredients')).controls;
// }
// In the template, you can then use:

// *ngFor="let ingredientCtrl of controls; let i = index"
