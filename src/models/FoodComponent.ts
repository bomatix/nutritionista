import { SQLiteDatabase } from "react-native-sqlite-storage";
import { DatabaseService } from "../utils/DatabaseService";
import { FoodComponentDBRow, FoodComponentWithoutNutritionDataDBRow } from "./DatabaseInterfaces";
import { NutritionData } from "./NutritionData";

/**
 * Model for food components that represents two types
 * of food components: simple and complex. Simple food 
 * components represent food that can be eaten alone and
 * is not represented by other food components. Complex
 * food components constist of multiple simple and/or complex
 * food components.
 */
export class FoodComponent {

    // STATIC CLASS FIELDS

    static tableName: string = 'food_component';

    // CLASS FIELDS

    id?: number;

    name?: string;
    
    isComplex?: boolean;

    nutritionData?: NutritionData;

    /**
     * Constructor.
     */
    private constructor() { }

    // GETTER & SETTER

    public getNutritionData(): NutritionData {
        return this.nutritionData!;
    }

    public setNutritionData(nutritionData: NutritionData) {
        this.nutritionData = nutritionData;
    }

    // FACTORY METHODS

    /**
     * Creates a FoodComponent object from a row read from database
     * without nutrition data.
     * @param rowData Data read from the database row.
     * @returns An object of a FoodComponent class.
     */
    static createFromDBRowWithoutNutritionData(rowData: FoodComponentWithoutNutritionDataDBRow): FoodComponent {
        let foodComponent = new FoodComponent();
        foodComponent.id = rowData.id;
        foodComponent.name = rowData.name;
        foodComponent.isComplex = rowData.is_complex;
        return foodComponent;
    }

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
        foodComponent.isComplex = rowData.is_complex;
        const nutritionData = NutritionData.createFromDBRow(rowData);
        foodComponent.nutritionData = nutritionData;
        return foodComponent;
    }

    /**
     * 
     * @param name 
     * @param isComplex 
     */
    static create(name: string, isComplex: boolean = false): FoodComponent {
        let foodComponent = new FoodComponent();
        foodComponent.name = name;
        foodComponent.isComplex = isComplex;
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
            is_complex INTEGER DEFAULT 0
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
            const query = `INSERT INTO ${FoodComponent.tableName} VALUES(
                NULL,
                '${foodComponent.name}',
                ${foodComponent.isComplex}
            );`;
            // TODO: get inserted id.
            DatabaseService.executeDDLQuery(query);
            console.log(query)

            if(foodComponent.nutritionData) {
                // TODO: change id when you recieve it.
                NutritionData.insert(foodComponent.nutritionData, 1);
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    /**
     * 
     * @returns 
     */
    private static async getAllWithNutritionData(): Promise<FoodComponent[]> {
        const db = await DatabaseService.getDBConnection();
        // TODO: add nutrition data to query
        const query = `SELECT * FROM ${FoodComponent.tableName}`;
        const results = await db.executeSql(query);
        const data = DatabaseService.readRows<FoodComponentWithoutNutritionDataDBRow>(results);
        return data.map(item => FoodComponent.createFromDBRowWithoutNutritionData(item));
    }

    /**
     * 
     * @param includeNutritionData 
     * @returns 
     */
    static async getAll(includeNutritionData: boolean = true): Promise<FoodComponent[]> {
        if(includeNutritionData) {
            const db = await DatabaseService.getDBConnection();
            const query = `SELECT * FROM ${FoodComponent.tableName} fc 
                            LEFT JOIN ${NutritionData.tableName} nd ON fc.id = nd.food_component_id`;
            const results = await db.executeSql(query);
            const data = DatabaseService.readRows<FoodComponentDBRow>(results);
            return data.map(item => FoodComponent.createFromDBRow(item));
        }
        else {
            return FoodComponent.getAllWithNutritionData();
        }
    }
}