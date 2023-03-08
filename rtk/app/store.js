const { configureStore, getDefaultMiddleware } = require('@reduxjs/toolkit');
const { createLogger } = require('redux-logger');
const videosReducer = require('../features/asyncVideo/asyncVideoSlice');

// logger
const logger = createLogger();

const store = configureStore({
  reducer: {
    video: videosReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;