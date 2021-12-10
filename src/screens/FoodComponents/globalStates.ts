import { atom } from "recoil";
import { FoodComponent } from "../../models/FoodComponent";

export const foodComponentsList = atom<FoodComponent[]>({
    key: 'foodComponentsList',
    default: []
})

export const mealSelectedFoodComponents = atom<number[]>({
    key: 'mealSelectedFoodComponents',
    default: []
})