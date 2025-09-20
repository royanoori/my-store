// store/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  score: number | null;
  firstName: string | null;
  lastName: string | null;
  agencyCode:string | null;
  // می‌تونی بعداً فیلدهای دیگه مثل email، avatar و ... اضافه کنی
}

const initialState: UserState = {
  score: null,
  firstName: null,
  lastName: null,
  agencyCode:null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    setName: (state, action: PayloadAction<{ firstName: string; lastName: string }>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
   setAgencyCode:(state, action: PayloadAction<string>) =>{
    state.agencyCode = action.payload
   }
  },
});

export const { setScore, setName,setAgencyCode } = userSlice.actions;
export default userSlice.reducer;
