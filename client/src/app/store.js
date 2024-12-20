import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "../features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";
import { purchaseApi } from "@/features/api/purchaseApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (dm) =>
    dm().concat(
      authApi.middleware,
      courseApi.middleware,
      courseProgressApi.middleware,
      purchaseApi.middleware
    ),
});

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
