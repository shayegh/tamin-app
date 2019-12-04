/**
 * Created by Mojtaba Shayegh (shayegh@gmail.com) on ۰۱/۱۲/۲۰۱۹
 */

import { AbilityBuilder, Ability } from "@casl/ability";
import { Actions, Subjects } from './../constants/index';



const rules = [
    { subject: Subjects.Todo, action:Actions.Read },
    { subject: Subjects.Todo, action:Actions.Create },
    { subject: Subjects.Todo, action: Actions.Delete },
];

let ability = new Ability().update(rules);

// ability.update(rules);

export default ability;