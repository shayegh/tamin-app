import {lazy} from 'react';

const SupList = lazy(() => import('supervision/SupList'));
const ChangePass = lazy(() => import('user/changepass/ChangePass'));
const UserList = lazy(() => import('user/UserList'));
const NewSup = lazy(() => import('supervision/NewSup'));
const NotFound = lazy(() => import('common/NotFound'));


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