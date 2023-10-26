import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiKey = '9973533';

  constructor(private http: HttpClient) {}

  // API returns ingredients as seperate properties therfor this function to loop through them
  getIngredients(meal: any) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal['strIngredient' + i]) {
        ingredients.push(meal['strIngredient' + i]);
      }
    }
    return ingredients;
  }

  // API returns measurements as seperate properties therfor this function to loop through them
  getMeasurements(meal: any) {
    let measurement = [];
    for (let i = 1; i <= 20; i++) {
      if (meal['strMeasure' + i]) {
        measurement.push(meal['strMeasure' + i]);
      }
    }
    return measurement;
  }

  async getRecipieByIngredients(ingredients: string[]) {
    try {
      const ingredientString = ingredients.join(',');
      const response$ = this.http.get(
        `https://www.themealdb.com/api/json/v2/${this.apiKey}/filter.php?i=${ingredientString}`
      );
      const response = await lastValueFrom(response$);
      return response;
    } catch (error) {
      console.log('Error during getRecipieByName: ', error); // Log the error
      throw new Error('Failed to fetch recipe. Please try again.');
    }
  }
}
