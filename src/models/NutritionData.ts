import { DatabaseService } from "../utils/DatabaseService";
import { NutritionDataDBRow } from "./DatabaseInterfaces";

/**
 * 
 */
export class NutritionData {
    
    static tableName: string = 'nutrition_data';

    // CLASS FIELDS

    kcal?: number;

    carbs?: number;

    protein?: number;

    fat?: number;

    /**
     * Constructor.
     */
    private constructor() { }

    // FACTORY METHODS

    /**
     * Creates a NutritionData object from a row read from database.
     * @param dataRow Data read from the database row.
     * @returns An object of a NutritionData class.
     */
    static createFromDBRow(dataRow: NutritionDataDBRow): NutritionData {
        let nutritionData = new NutritionData();
        nutritionData.kcal = dataRow.kcal;
        nutritionData.carbs = dataRow.carbs;
        nutritionData.protein = dataRow.protein;
        nutritionData.fat = dataRow.fat;
        return nutritionData;
    }

    /**
     * Creates a NutritionData object having all necessary information
     * provided through parameters.
     * @param kcal Kilocalories of the food component.
     * @param carbs Carbs of the food component.
     * @param protein Proetin of the food component.
     * @param fat Fat of the food component.
     * @returns An object of a NutritionData class.
     */
    static create(kcal: number, carbs: number, protein: number, fat: number): NutritionData {
        let nutritionData = new NutritionData();
        nutritionData.kcal = kcal;
        nutritionData.carbs = carbs;
        nutritionData.protein = protein;
        nutritionData.fat = fat;
        return nutritionData;
    }

    // STATIC DATABASE METHODS

    /**
     * 
     */
    static async createTable(): Promise<void> {
        const query = `CREATE TABLE IF NOT EXISTS ${NutritionData.tableName}(
            food_component_id INTEGER PRIMARY KEY,
            kcal DOUBLE,
            carbs DOUBLE,
            protein DOUBLE,
            fat DOUBLE,
            FOREIGN KEY(food_component_id) REFERENCES food_component(id)
        );`
        DatabaseService.executeDDLQuery(query);
    }

    /**
     * 
     * @param nutritionData 
     * @param foodComponentId 
     */
    static async insert(nutritionData: NutritionData, foodComponentId: number): Promise<void> {
        const query = `INSERT INTO ${NutritionData.tableName} VALUES(
            ${nutritionData.kcal},
            ${nutritionData.carbs},
            ${nutritionData.protein},
            ${nutritionData.fat},
            ${foodComponentId}
        )`;
        DatabaseService.executeDDLQuery(query);
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    static async getById(id: number): Promise<NutritionData> {
        const db = await DatabaseService.getDBConnection();
        const query = `SELECT * FROM ${NutritionData.tableName} WHERE food_component_id = ${id}`;
        const results = await db.executeSql(query);
        const data = DatabaseService.readRows<NutritionDataDBRow>(results);
        return data.map(item => NutritionData.createFromDBRow(item))[0];
    }

}