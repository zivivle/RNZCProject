/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import {Pressable, Text} from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

function HomeScreen({navigation}: HomeScreenProps) {
  const onPress = () => {
    navigation.navigate('Details');
  };
  return (
    <Pressable onPress={onPress}>
      <Text>HomeScreen</Text>
    </Pressable>
  );
}

function DetailScreen({navigation}: DetailScreenProps) {
  const onPress = () => {
    navigation.navigate('Home');
  };
  return (
    <Pressable onPress={onPress}>
      <Text>DetailScreen</Text>
    </Pressable>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
