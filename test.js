
// // Here i call the api to get the notification , here the api is called first time were the website is render first time. 


// const { data } = useGetNotificationQuery({});

// <Dropdown
//   overlay={notificationMenu}
//   placement="bottomRight"
//   className="cursor-pointer"
// >
//   <Badge
//     style={{ backgroundColor: "#839f9f" }}
//     count={newNotificationCount}
//     overflowCount={999}
//     size="default"
//   >
//     <BellFilled
//       shape="circle"
//       size="small"
//       className="text-secondary-color font-bold text-xl rounded-full border border-secondary-color w-11 aspect-square p-1 flex justify-center items-center"
//     />
//   </Badge>
// </Dropdown>;
// --------------------------------------------------------------

// // Here i call the api to get the notification , here the api is called when the user mouse enter on the BellFilled icon.


// const [trigger, { data, isFetching, error }] = useLazyGetNotificationQuery();

// <Dropdown
//   onMouseEnter={() => trigger()}
//   overlay={notificationMenu}
//   trigger={["hover"]}
//   placement="bottomRight"
//   className="cursor-pointer"
// >
//   <Badge
//     style={{ backgroundColor: "#839f9f" }}
//     count={newNotificationCount}
//     overflowCount={999}
//     size="default"
//   >
//     <BellFilled
//       shape="circle"
//       size="small"
//       className="text-secondary-color font-bold text-xl rounded-full border border-secondary-color w-11 aspect-square p-1 flex justify-center items-center"
//     />
//   </Badge>
// </Dropdown>;

// --------------------------------------------


// //Thsi is my api 

// import { tagTypes } from "../tagTypes";
// import { baseApi } from "./baseApi";

// export const notifcationApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     getNotification: build.query({
//       query: ({ page, limit }) => ({
//         url: `/notifications/notifications`,
//         method: "GET",
//         params: {
//           page,
//           limit,
//         },
//       }),
//       providesTags: [tagTypes.notification],
//     }),

//     getNotificationCount: build.query({
//       query: () => ({
//         url: `/notifications/unreadCount`,
//         method: "GET",
//       }),
//       providesTags: [tagTypes.notificationCount],
//     }),

//     notificationRead: build.mutation({
//       query: () => ({
//         url: `/notifications/read-all`,
//         method: "PATCH",
//       }),
//       invalidatesTags: [tagTypes.notificationCount, tagTypes.notification],
//     }),
//   }),
// });

// export const {
//   useLazyGetNotificationQuery,
//   useGetNotificationQuery,
//   useGetNotificationCountQuery,
//   useNotificationReadMutation,
// } = notifcationApi;


// ---------------------------------------------------

//     Here i useLazyGetNotificationQuery i didn't get any data.
// and get this error: -----
    
// TypeError: Cannot destructure property 'page' of 'undefined' as it is undefined.
//     at Object.query(notificationApi.js: 7: 17)
    
//     what is the problem ? give me the solution
