// import { decodedToken } from "@/utils/jwt";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `/auth/login`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    userSignUp: build.mutation({
      query: (signupData) => ({
        url: `/users/create`,
        method: "POST",
        body: signupData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userForgotEmail: build.mutation({
      query: (emailData) => ({
        url: `forgot-password-otp-match`,
        method: "PATCH",
        body: emailData,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    // verifiedEmail: build.mutation({
    //   query: (otpData) => {
    //     const token = localStorage.getItem("carTrading_createUserToken");
    //     return {
    //       url: `${AUTH_URL}/auth/verify-email`,
    //       method: "POST",
    //       body: otpData,
    //       // headers: {
    //       //   SignUpToken: `signUpToken ${token}`,
    //       //   "Content-Type": "application/json",
    //       // },
    //     };
    //   },
    //   invalidatesTags: [tagTypes.user],
    // }),

    userOtp: build.mutation({
      query: (otpData) => {
        const token = localStorage.getItem("carTrading_createUserToken");
        console.log("token from api ", token);

        return {
          url: `/users/create-user-verify-otp`,
          method: "POST",
          body: otpData,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    forgotPassOtp: build.mutation({
      query: (otpData) => {
        const token = localStorage.getItem("carTrading_createUserToken");
        console.log("/auth/forgot-password-otp-match ");

        return {
          url: `/users/create-user-verify-otp`,
          method: "PATCH",
          body: otpData,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserSignUpMutation,
  useUserOtpMutation,
  useUserForgotEmailMutation,
  useForgotPassOtpMutation,
} = authApi;
