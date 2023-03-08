const store = require('./rtk/app/store');
const { fetchVideo, fetchRelatedVidoes } = require('./rtk/features/asyncVideo/asyncVideoSlice');

// fetch default video
store.dispatch(fetchVideo())
  .then((requestedVideo) => {
    console.log(requestedVideo.payload.tags);
    store.dispatch(fetchRelatedVidoes(requestedVideo.payload.tags));
  })
