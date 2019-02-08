import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name:'filterInfo'
})
export class filterInfo implements PipeTransform{
    transform(names:string[],searchTerm:string):string[]{
        if(!names||!searchTerm){
            return names;
        }
        return names.filter(name =>
            name.toLowerCase().indexOf(searchTerm.toLowerCase()) !==-1);
    }
}