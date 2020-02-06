import React from 'react';
import {AuthProviderContext} from "../common/components/AuthProvider";

const useAuth = () => (
    React.useContext(AuthProviderContext)
);

export default useAuth;