import { PipeTransform, Pipe } from "@angular/core";
import { userTab } from "../../userTab";

@Pipe({
    name:'recordSearch'
})
export class recordSearch implements PipeTransform{
    transform(records:userTab[],searchTerm:string){
        if(!records || !searchTerm){
            return records;
        }
        return records.filter(rec => rec.clientId.toString().toLowerCase().indexOf(searchTerm.toString().toLowerCase())!==-1);
    }
}