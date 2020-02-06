import React from 'react';
import {AuthProviderContextDispatcher} from "../common/components/AuthProvider";

const useAuthActions = () => (
    React.useContext(AuthProviderContextDispatcher)
);

export default useAuthActions;