import {configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/auth';
import api from './api/api';
import miscSlice from './reducers/misc';

const store = configureStore({
    reducer : {
        [authSlice.name] : authSlice.reducer,                        // [authSlice.name] is used to name so we change it in future and we donot need to change every whwre
        [miscSlice.name] : miscSlice.reducer,
        [api.reducerPath] : api.reducer
    },
    middleware : (mid) => [...mid, api.middleware]
})

export default store;