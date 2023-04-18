export class Meal {
    id: String;
    categoryIds: String[];
    title: String;
    affordability: String;
    complexity: String;
    imageUrl: String;
    duration: number;
    ingredients: String[];
    steps: String[];
    isGlutenFree: boolean;
    isVegan: Boolean;

    constructor(id: string, categoryIds: string[], title: string, affordability: string, complexity: string, imageUrl: string, duration: number, ingredients: string[], steps: string[], isGlutenFree: boolean, isVegan: boolean) {
        this.id = id;
        this.categoryIds = categoryIds;
        this.title = title;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
        this.steps = steps;
        this.duration = duration;
        this.complexity = complexity;
        this.affordability = affordability;
        this.isGlutenFree = isGlutenFree;
        this.isVegan = isVegan;
    }
};

export default Meal;