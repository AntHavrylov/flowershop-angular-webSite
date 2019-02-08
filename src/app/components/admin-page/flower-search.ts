
import { PipeTransform, Pipe } from "@angular/core";
import { flower } from "../../flower";

@Pipe({
    name:'flowerSearch'
})
export class flowerSearch implements PipeTransform{
    transform(flowers:flower[],searchTerm:string):flower[]{
        if(!flowers || !searchTerm){
            return flowers;
        }
        return flowers.filter(flo => flo.name.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
    }
}
