import { PipeTransform, Pipe } from "@angular/core";
import { user } from "../../user";

@Pipe({
    name: 'userSearch'
})
export class userSearch implements PipeTransform {
    transform(users: user[], searchTerm: string) {
        if (!users || !searchTerm) {
            return users;
        }
        return users.filter(us => us.login.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
    }
}