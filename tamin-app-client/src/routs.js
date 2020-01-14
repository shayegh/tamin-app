import SupList from "./supervision/SupList";
import NewSup2 from "./supervision/NewSup2";
import ChangePass from "./user/changepass/ChangePass";
import UserList from "./user/UserList";
import NotFound from "./common/NotFound";

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
        path: "/newsuprep/:headerId([0-9]+)?",
        component: NewSup2
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