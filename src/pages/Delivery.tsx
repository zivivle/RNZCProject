import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Ing} from './Ing';
import {Complete} from './Complete';

const Stack = createNativeStackNavigator();

export function Delivery() {
  return (
    <Stack.Navigator initialRouteName="Ing">
      <Stack.Screen name="Ing" component={Ing} options={{headerShown: false}} />
      <Stack.Screen
        name="Complete"
        component={Complete}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
