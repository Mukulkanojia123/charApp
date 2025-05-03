import {configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/auth';

const store = configureStore({
    reducer : {
        [authSlice.name] : authSlice.reducer,                        // [authSlice.name] is used to name so we change it in future and we donot need to change every whwre
    }
})

export default store;