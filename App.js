/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import configureStore from './app/redux/config/store/index';
import RootStackScreen from './app/screens/RootStackNavigator/RootStackScreen';
import { Provider } from 'react-redux';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Splash from './app/screens/Splash/Splash';
import { NavigationContainer } from '@react-navigation/native';
import networkHOC from './app/components/NetInfoHoc';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkTheme: false,
      isLoading: true,
      isLoggedIn: false,
      isOnBoardingCompleted: false,
      store: configureStore(() => {
      }).store
    };
    console.disableYellowBox = true;
  }
  
  render() {
    return (
      <Provider store={this.state.store}>
        <StatusBar barStyle="dark-content" backgroundColor={'#f1f1f1'} />
          <NavigationContainer>
            {/* <ApplicationLoader /> */}
            {/* <CustomErrorModal /> */}
            <RootStackScreen/>
          </NavigationContainer>
      </Provider>
);
  }
}

export default networkHOC()(App);
