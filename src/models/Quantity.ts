import { DatabaseService } from "../utils/DatabaseService";
import { QuantityDBRow } from "./DatabaseInterfaces";

export class Quantity {

    // STATIC FIELDS

    static tableName: string = 'quantity';

    // FIELDS

    id?: number;

    quantityName?: string;

    grams?: number;

    // FACTORY METHODS

    /**
     * 
     * @param dataRow 
     * @returns 
     */
    static createFromDBRow(dataRow: QuantityDBRow): Quantity {
        let quantity = new Quantity();
        quantity.id = dataRow.id;
        quantity.grams = dataRow.grams;
        quantity.quantityName = dataRow.quantity_name;
        return quantity;
    }

    // STATIC DATABASE METHODS

    /**
     * 
     */
    static async createTable(): Promise<void> {
        const query = `CREATE TABLE IF NOT EXISTS ${Quantity.tableName}(
            id INTEGER PRIMARY KEY,
            quantity_name TEXT,
            grams DOUBLE,
            food_component_id INTEGER,
            FOREIGN KEY(food_component_id) REFERENCES food_component(id)
        );`;
        DatabaseService.executeDDLQuery(query);
    }

    /**
     * 
     * @param quantity 
     */
    static async insert(quantity: Quantity): Promise<void> {
        const query = `INSERT INTO ${Quantity.tableName}(
            NULL,
        )`;
    }

    /**
     * 
     * @param foodComponentId 
     * @returns 
     */
    static async getByFoodComponentId(foodComponentId: number): Promise<Quantity[]> {
        const db = await DatabaseService.getDBConnection();
        const query = `SELECT * FROM ${Quantity.tableName} WHERE food_component_id = ${foodComponentId}`;
        const results = await db.executeSql(query);
        const data = DatabaseService.readRows<QuantityDBRow>(results);
        return data.map(item => Quantity.createFromDBRow(item));
    }
}