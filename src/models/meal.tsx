import { Stars } from './stars';

export class Meal {
    id: String;
    categoryIds: String[];
    title: String;
    complexity: String;
    imageUrl: String;
    duration: number;
    ingredients: String[];
    steps: String[];
    isVegan: boolean;
    isVegetarian: boolean;
    isGlutenFree: boolean;
    isNutsFree: boolean;
    isMilkFree: boolean;
    isEggsFree: boolean;
    stars?: Stars;

    constructor(id: string, categoryIds: string[], title: string, complexity: string, imageUrl: string, duration: number, ingredients: string[], steps: string[], isVegan: boolean, isVegetarian: boolean, isGlutenFree: boolean, isNutsFree: boolean, isMilkFree: boolean, isEggsFree: boolean, stars?: Stars) {
        this.id = id;
        this.categoryIds = categoryIds;
        this.title = title;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
        this.steps = steps;
        this.duration = duration;
        this.complexity = complexity;
        this.isVegan = isVegan;
        this.isVegetarian = isVegetarian;
        this.isGlutenFree = isGlutenFree;
        this.isNutsFree = isNutsFree;
        this.isMilkFree = isMilkFree;
        this.isEggsFree = isEggsFree;
        this.stars=stars
    }
};

export default Meal;