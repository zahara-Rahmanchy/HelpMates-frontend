import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PayoutState {
  selectedIds: string[];
}

const initialState: PayoutState = {
  selectedIds: [],
};

export const payoutSlice = createSlice({
  name: "payout",
  initialState,
  reducers: {
    toggleSelectedId: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter(x => x !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    setSelectedIds: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = action.payload;
    },
    clearSelectedIds: state => {
      state.selectedIds = [];
    },
  },
});

export const { toggleSelectedId, setSelectedIds, clearSelectedIds } = payoutSlice.actions;
export default payoutSlice.reducer;
