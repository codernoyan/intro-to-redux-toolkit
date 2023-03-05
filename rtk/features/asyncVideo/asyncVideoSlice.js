const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const fetch = require('node-fetch');

// initial state
const initialState = {
  loading: false,
  video: {},
  error: '',
  relatedVideos: {
    loading: false,
    videos: [],
    error: '',
  },
};

// fetch video
const fetchVideo = createAsyncThunk('video/fetchVideo', async () => {
  const response = await fetch('http://localhost:9000/videos');
  const video = await response.json();
  return video;
});

// fetch related videos
const fetchRelatedVidoes = createAsyncThunk('relatedVideos/fetchRelatedVidoes', async (videoData) => {
  const response = await fetch(`http://localhost:9000/videos?tags_like=${videoData.join('&tags_like=')}`);
  const vidoes = await response.json();
  console.log(videoData);
  return vidoes;
});


// create a videos slice
const videoSlice = createSlice({
  name: 'video',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVideo.pending, (state, action) => {
      state.loading = true;
      state.error = '';
      state.video = {};
    });
    builder.addCase(fetchVideo.fulfilled, (state, action) => {
      state.loading = false;
      state.video = action.payload;
      state.error = '';
      
    });
    builder.addCase(fetchVideo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.video = {};
    });
    
    // fetch related vidoes
    builder.addCase(fetchRelatedVidoes.pending, (state, action) => {
      state.relatedVideos.loading = true;
      state.relatedVideos.error = '';
    });
    builder.addCase(fetchRelatedVidoes.fulfilled, (state, action) => {
      state.relatedVideos.loading = false;
      state.relatedVideos.videos = action.payload;
    });
    builder.addCase(fetchRelatedVidoes.rejected, (state, action) => {
      state.relatedVideos.loading = false;
      state.relatedVideos.error = action.error;
    });
  },
});

module.exports = videoSlice.reducer;
module.exports.fetchVideo = fetchVideo;
// module.exports.videoActions = videoSlice.actions;
// fetch related vidoes

module.exports.fetchRelatedVidoes = fetchRelatedVidoes;