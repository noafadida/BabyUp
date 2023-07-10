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
	allergies: boolean[];
	stars?: Stars;

	constructor(id: string, categoryIds: string[], title: string, complexity: string, imageUrl: string, duration: number, ingredients: string[], steps: string[], isVegan: boolean, isVegetarian: boolean, allergies: boolean[], stars?: Stars) {
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
		this.allergies = allergies;
		this.stars = stars
	}
};

export default Meal;