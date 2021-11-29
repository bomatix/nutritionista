export interface FoodComponentWithoutNutritionDataDBRow {
    id: number;
    name: string;
    is_complex: boolean;
}

export interface NutritionDataDBRow {
    kcal: number;
    carbs: number;
    protein:number;
    fat:number;
    food_component_id:number;
}

export interface FoodComponentDBRow extends FoodComponentWithoutNutritionDataDBRow, NutritionDataDBRow {
}