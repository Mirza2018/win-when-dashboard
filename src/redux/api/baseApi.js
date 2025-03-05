import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getBaseUrl } from "../getBaseUrl";
import { tagTypesList } from "../tagTypes";
import { getFromLocalStorage } from "../utils/local-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    const signUpToken = getFromLocalStorage("carTrading_createUserToken");

    const changePassToken = getFromLocalStorage("carTrading_otp_match_token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    if (signUpToken) {
      headers.set("token", `${signUpToken}`);
    }

    if (changePassToken) {
      headers.set("Forget-password", `Forget-password ${changePassToken}`);
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
