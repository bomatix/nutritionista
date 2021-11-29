import {enablePromise, openDatabase, ResultSet, SQLiteDatabase} from 'react-native-sqlite-storage';
import { FoodComponent } from '../models/FoodComponent';

enablePromise(true);

export class DatabaseService {
  private static db: SQLiteDatabase;

  static async getDBConnection(): Promise<SQLiteDatabase> {
    if(DatabaseService.db == undefined) {
      DatabaseService.db = await openDatabase({name: 'todo-data.db', location: 'Library'});
    }
    return DatabaseService.db;
  }

  static async executeDDLQuery(query: string) {
    DatabaseService.db.executeSql(query)
  }

  static readRows<RowType>(results: ResultSet[]): RowType[] {
    let data: RowType[] = []
    results.forEach(result => {
      for(let i = 0; i < result.rows.length; i++) {
          const item =  result.rows.item(i) as RowType;
          data.push(item);
      }
    });

    return data;
  }
}