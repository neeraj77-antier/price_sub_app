import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPlan: null,
  duration: 1,
  isSubscription: true,
  billingInfo: {
    name: '',
    email: ''
  }
};

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setSelectedPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setIsSubscription: (state, action) => {
      state.isSubscription = action.payload;
    },
    setBillingInfo: (state, action) => {
      state.billingInfo = action.payload;
    },
    resetPlan: (state) => {
      return initialState;
    }
  }
});

export const { setSelectedPlan, setDuration, setIsSubscription, setBillingInfo, resetPlan } = planSlice.actions;
export default planSlice.reducer;
