import { FETCH_POST, FETCH_POSTS, DELETE_POST } from '../actions'
import _ from 'lodash'

export default function(state={} , action){
  switch(action.type){

  case FETCH_POST:
    return _.mapKeys(action.payload.data, 'id');

  case FETCH_POSTS:
    const post = action.payload.data;
    const newState = { ...state };
    newState[post.id] = post;
    return newState;
    // can also be written as below in es6
    // return {...state, [action.payload.data.id]: action.payload.data};

  case DELETE_POST:
    return _.omit(state, action.payload);

  default:
    return state;
  }
}
