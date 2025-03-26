import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const notifcationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotification: build.query({
      query: () => ({
        url: `/notifications/all-notifications`,
        method: "GET",
      }),
      providesTags: [tagTypes.notification],
    }),
  }),
});


export const {useLazyGetNotificationQuery}=notifcationApi