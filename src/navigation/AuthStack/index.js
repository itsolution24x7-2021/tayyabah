import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Forgot,
  Login,
  Register,
} from '../../containers';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none" initialRouteName="Login">
    <AuthStack.Screen name="ForgetPassword" component={Forgot} />
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Register" component={Register} />
  </AuthStack.Navigator >
);

export default AuthStackScreen;
