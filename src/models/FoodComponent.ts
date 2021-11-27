import { SQLiteDatabase } from "react-native-sqlite-storage";
import { DatabaseService } from "../utils/DatabaseService";

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

    name: string;
    
    isComplex: boolean;

    /**
     * Constructor.
     */
    constructor(name: string, isComplex: boolean = false) {
        this.name = name;
        this.isComplex = isComplex;
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

    static async insert(foodComponent: FoodComponent): Promise<void> {
        try {
            const query = `INSERT INTO ${FoodComponent.tableName} VALUES(
                NULL,
                '${foodComponent.name}',
                ${foodComponent.isComplex}
            );`;
            DatabaseService.executeDDLQuery(query);
            console.log(query)
        }
        catch(error) {
            console.log(error)
        }
    }

    static async getAll(): Promise<FoodComponent[]> {
        const db = await DatabaseService.getDBConnection();
        const query = `SELECT * FROM ${FoodComponent.tableName}`;
        let foodComponents: FoodComponent[] = [];
        const results = await db.executeSql(query);
        console.log(results);
        results.forEach(result => {
            for(let i = 0; i < result.rows.length; i++) {
                const item =  result.rows.item(i);
                foodComponents.push(new FoodComponent(item['name']));
            }
        });

        return foodComponents;
    }
}