import { List, Color } from "@raycast/api";
import { IDeparture } from "../types";

export function getDepartureAccessories(departure: IDeparture): List.Item.Accessory[] {
    const accessories: List.Item.Accessory[] = [
        {
            tag: {
                value: departure.expectedArrival,
                color: new Date(departure.expectedArrival).getTime() === Date.now() ? Color.Green : Color.PrimaryText,
            }
        }
    ];

    return accessories;
}