const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const fetch = require('node-fetch');

// initial state
const initialState = {
  loading: false,
  videos: {},
  error: '',
};

// fetch videos
const fetchVideos = createAsyncThunk('videos/requested', async () => {
  const response = await fetch('http://localhost:9000/videos');
  const vidoes = await response.json();
  return vidoes;
})

// create a videos slice
const videoSlice = createSlice({
  name: 'videos',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVideos.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = action.payload;
      state.error = '';
    });
    builder.addCase(fetchVideos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.videos = {};
    });
  },
});

module.exports = videoSlice.reducer;
module.exports.fetchVideos = fetchVideos;