import itemManagerSlice from "@redux/itemStore"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    itemManager: itemManagerSlice.reducer,
  }
})
export default store
