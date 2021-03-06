import axios from 'axios';
import { API_KEY as REACT_NATIVE_API } from '../../environmentVars';
import AsyncStorage from '@react-native-async-storage/async-storage';

//user reducer
let initialState = {
  id: '',
  username: '',
  role: '',
  token: ''
}

// create a function that saves your data asyncronously
const storeToken = async (token, userId) => {
  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user_id', userId);
    // console.log('stored token ', token);
  } catch (error) {
    // Error saving data
  }
}

// fetch the data back asyncronously
export const retrieveToken = () => async dispatch => {
  try {
    // AsyncStorage.clear();
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('user_id');

    if (token && userId) {
      // Our data is fetched successfully
      // console.log('got the token!', token, ' and user id ', userId);
      dispatch(getToken({ token, userId }));
    }
  } catch (error) {
    // Error retrieving data
  }
}

const getToken = (payload) => {
  return {
    type: 'UPDATETOKEN',
    payload: payload
  }
}

export const invalidateToken = () => {
  // console.log('invalidating token');
  AsyncStorage.clear();
  return {
    type: 'UPDATETOKEN',
    payload: ''
  }
}

export const signUp = (newUser) => async dispatch => {
  // console.log('hello-world')
  await axios.post(REACT_NATIVE_API + '/signup', {
    username: newUser.username,
    password: newUser.password,
    email: newUser.email,
    role: 'user'
  })
    .then(result => {
      let user = result.data.user;
      console.log({ user });
      //save the auth token in the device's async storage (like a cookie)
      storeToken(user.token, user.id);
      dispatch(getSignUp(user));
    })
    // .catch(error => {
    //   console.log(error, 'This username already exists, please choose another.')
    //   throw error;
    // });
}

const getSignUp = (newUser) => {
  return {
    type: 'SIGNUP',
    payload: newUser
  }
}

export const signIn = (user) => dispatch => {
  // console.log(user);

  return axios.post(REACT_NATIVE_API + '/signin', {}, {
    auth: {
      username: user.username,
      password: user.password
    }
  })
    .then(result => {
      let user = result.data.user;
      //save the auth token in the device's async storage (like a cookie)
      storeToken(user.token, user.id);
      dispatch(getSignIn(user));
    });

}

const getSignIn = payload => {
  return {
    type: 'SIGNIN',
    payload
  }
}

const userReducer = (state = initialState, action) => {
  let { type, payload } = action;
  // console.log('userReducer Payload:', payload);
  switch (type) {
    case 'SIGNUP':
      return payload;

    case 'SIGNIN':
      // console.log("payload", payload);
      return payload;

    //return payload;
    case 'UPDATETOKEN':
      // console.log("payload", payload);
      return { ...state, token: payload.token, id: payload.userId };
    default:
      return state;
  }
}

export default userReducer;
