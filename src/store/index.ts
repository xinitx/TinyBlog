import { createStore } from 'redux'
import rootReducer from './rootReducer.ts'; // 引入reducer

const store = createStore(rootReducer);

export default store;
