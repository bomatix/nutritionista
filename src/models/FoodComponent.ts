import { SQLiteDatabase } from "react-native-sqlite-storage";
import { DatabaseService } from "../utils/DatabaseService";
import { FoodComponentDBRow } from "./DatabaseInterfaces";
import { Quantity } from "./Quantity";

/**
 * Model for food components that represents two types
 * of food components: simple and complex. Simple food 
 * components represent food that can be eaten alone and
 * is not represented by other food components. Complex
 * food components constist of multiple simple and/or complex
 * food components.
 */
export class FoodComponent {

    // STATIC FIELDS

    static tableName: string = 'food_component';

    // FIELDS

    id?: number;

    name?: string;
    
    kcal?: number;
    
    carbs?: number;
    
    protein?: number;
    
    fat?: number;

    isComplex?: boolean = false;

    areMacronutrientsCalculated?: boolean = true;

    quantities?: Quantity[];

    ingredients?: FoodComponent[];

    /**
     * Constructor.
     */
    constructor() { }

    /**
     * 
     * @returns 
     */
    getQuantities(): Quantity[] {
        if(this.quantities == undefined) {
            Quantity.getByFoodComponentId(this.id!);
        }

        return this.quantities!;
    }

    getIngredients(): FoodComponent[] {
        if(!this.isComplex) throw new Error('This food component is not a meal!');
        // TODO: Add fetching of ingredients
        return [];
    }

    // FACTORY METHODS

    /**
     * Creates a FoodComponent object from a row read from database
     * including nutrition data.
     * @param rowData Data read from the database row.
     * @returns An object of a FoodComponent class.
     */
    static createFromDBRow(rowData: FoodComponentDBRow): FoodComponent {
        let foodComponent = new FoodComponent();
        foodComponent.id = rowData.id;
        foodComponent.name = rowData.name;
        foodComponent.kcal = rowData.kcal;
        foodComponent.carbs = rowData.carbs;
        foodComponent.protein = rowData.protein;
        foodComponent.fat = rowData.fat;
        foodComponent.isComplex = rowData.is_complex;
        foodComponent.areMacronutrientsCalculated = rowData.are_macronutrients_calculated;
        return foodComponent;
    }

    /**
     * Empty constructor.
     * @param name 
     * @param isComplex 
     */
    static create(): FoodComponent {
        let foodComponent = new FoodComponent();
        return foodComponent;
    }  

    // STATIC DATABASE METHODS

    /**
     * Method for creating a table if it does not exist.
     */
    static async createTable(): Promise<void> {
        const query = `CREATE TABLE IF NOT EXISTS ${FoodComponent.tableName}(
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            kcal DOUBLE,
            carbs DOUBLE,
            protein DOUBLE,
            fat DOUBLE,
            is_complex INTEGER DEFAULT 0,
            are_macronutrients_calculated INTEGER DEFAULT 1
        );`;
        DatabaseService.executeDDLQuery(query);
        console.log(query);
    }

    /**
     * 
     */
    static async createIngredientsTable(): Promise<void> {
        const query = `CREATE TABLE IF NOT EXISTS ingredient(
            meal_id INTEGER,
            ingredient_id INTEGER,
            FOREIGN KEY (meal_id) REFERENCES food_component(id),
            FOREIGN KEY (ingredient_id) REFERENCES food_component(id),
            PRIMARY KEY (meal_id, ingredient_id)
        );`;
        DatabaseService.executeDDLQuery(query);
        console.log(query);
    }

    /**
     * 
     * @param foodComponent 
     */
    static async insert(foodComponent: FoodComponent): Promise<void> {
        try {
            console.log(JSON.stringify(foodComponent));
            if(foodComponent.areFieldsUndefined()) throw new Error('Some of the fields are undefined.');
            const query = `INSERT INTO ${FoodComponent.tableName} VALUES(
                NULL,
                '${foodComponent.name}',
                ${foodComponent.kcal},
                ${foodComponent.carbs},
                ${foodComponent.protein},
                ${foodComponent.fat},
                ${foodComponent.isComplex},
                ${foodComponent.areMacronutrientsCalculated}
            );`;
            // TODO: get inserted id.
            DatabaseService.executeDDLQuery(query);
            console.log(query)
        }
        catch(error) {
            console.log(error)
        }
    }

    /**
     * 
     * @param includeNutritionData 
     * @returns 
     */
    static async getAll(): Promise<FoodComponent[]> {
        const db = await DatabaseService.getDBConnection();
        const query = `SELECT * FROM ${FoodComponent.tableName}`;
        const results = await db.executeSql(query);
        const data = DatabaseService.readRows<FoodComponentDBRow>(results);
        return data.map(item => FoodComponent.createFromDBRow(item));
    }

    // UTILS

    areFieldsUndefined(): boolean {
        if (this.name == undefined ||
            this.kcal == undefined ||
            this.carbs == undefined ||
            this.protein == undefined ||
            this.fat == undefined)
            return true;
        return false;
    }
}