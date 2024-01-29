import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public id: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public creatorId: string;

  constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[], creatorId: string) {
    this.id = this.id;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.creatorId = creatorId;
  }
}
