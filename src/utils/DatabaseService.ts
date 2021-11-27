import {enablePromise, openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';

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
}