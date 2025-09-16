// features/rewardsStore/redux/rewardsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataType } from "../type";

const initialState: DataType = {
  Category: [],
  Products: [],
};

const rewardsSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<DataType>) {
      state.Category = action.payload.Category;
      state.Products = action.payload.Products;
    },
    clearData(state) {
      state.Category = [];
      state.Products = [];
    },
  },
});

export const { setData, clearData } = rewardsSlice.actions;
export default rewardsSlice.reducer;
