import {baseApi} from "./api/baseApi";
import payoutReducer from "./slices/payoutSlice";

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    payout: payoutReducer,

};
