import SupList from "./supervision/SupList";
import ChangePass from "./user/changepass/ChangePass";
import UserList from "./user/UserList";
import NotFound from "./common/NotFound";
import NewSup from "./supervision/NewSup";

const routs = [
    {
        path: "/suplist",
        component: SupList
    },
    // {
    //     exact: true,
    //     path: "/newsuprep",
    //     component: NewSup2
    // },
    {
        // path: "/newsuprep/:headerId([0-9]+)?",
        path: "/newsuprep/:hId([0-9]+)?",
        component: NewSup
    },
    {
        path: "/changepass",
        component: ChangePass
    },
    {
        path: "/users",
        component: UserList
    },
    {
        component: NotFound
    },
];

export default routs;