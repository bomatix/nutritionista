export interface FoodComponentDBRow {
    id: number;
    name: string;
    kcal: number;
    carbs: number;
    protein:number;
    fat:number;
    is_complex: boolean;
    are_macronutrients_calculated: boolean;
}

export interface QuantityDBRow {
    id: number;
    quantity_name: string;
    grams: number;
    food_component_id: number;
}