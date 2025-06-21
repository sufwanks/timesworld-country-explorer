import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCountries = createAsyncThunk("countries/fetch", async () => {
  const res = await fetch(
    "https://restcountries.com/v2/all?fields=name,region,flag"
  );
  return await res.json();
});

const countrySlice = createSlice({
  name: "countries",
  initialState: {
    all: [],
    filtered: [],
    displayCount: 6,
    status: "idle",
  },
  reducers: {
    filterByRegion: (state, action) => {
      if (action.payload === "") {
        state.filtered = state.all;
      } else {
        state.filtered = state.all.filter((c) => c.region === action.payload);
      }
    },
    loadMore: (state) => {
      state.displayCount += 6;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.all = action.payload;
      state.filtered = action.payload;
      state.status = "succeeded";
    });
  },
});

export const { filterByRegion, loadMore } = countrySlice.actions;
export default countrySlice.reducer;
