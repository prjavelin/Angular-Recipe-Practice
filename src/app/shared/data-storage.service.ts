import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

constructor(private http: HttpClient,
            private recipeService: RecipeService,
            private authService: AuthService){

}

storeRecipes(){
  const recipes = this.recipeService.getRecipes();
  const user = this.authService.user
  this.http.put(`https://recipe-practice-801c4-default-rtdb.firebaseio.com/recipes.json`, recipes)
  .subscribe(response => {
    console.log(response)
  })
}
// `https://recipe-practice-801c4-default-rtdb.firebaseio.com/recipes/${user.id}.json`

// fetchRecipes(){
//  return this.http.get<Recipe[]>('https://recipe-practice-801c4-default-rtdb.firebaseio.com/recipes.json')
//   .pipe(map(recipes =>{
//     return recipes.map(recipe=> {
//       return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
//     }), tap(recipes =>{
//       this.recipeService.setRecipes(recipes);
//     })
//   }))
 
// }

fetchRecipes() {
  
  return this.http.get<{ [key: string]: Recipe }>( `https://recipe-practice-801c4-default-rtdb.firebaseio.com/recipes.json`)
  .pipe(map(responseData => {
        const recipesArray: Recipe[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            recipesArray.push({ ...responseData[key], id: key });
          }
        }
        return recipesArray;
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }))
  
  }


}
