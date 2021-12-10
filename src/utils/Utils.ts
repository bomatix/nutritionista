import { FoodComponent } from "../models/FoodComponent";

export class Utils {
    static parseFloatInput(input: string, defaultValue: number = 0): number | undefined{
        let result: number | undefined = defaultValue;
        if(input != '') {
            result = parseFloat(input);
        }
        else {
            result = undefined;
        }
        return result;
    }

    static parseIntInput(input: string, defaultValue: number = 0): number {
        let result = defaultValue;
        if(input != '' && input != undefined) {
            result = parseInt(input);
        }
        return result;
    }

    static copyObject<T extends Object>(obj: T): T {
        let temp: T = Object.assign({}, obj);
        Object.setPrototypeOf(temp, Object.getPrototypeOf(obj));
        return temp;
    }
}