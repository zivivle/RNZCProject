- NavigationContainer 가 기본적으로 safe-area-view를 기본적으로 장착하고 있어서 따로 감싸줄 필요가 없음
- Pressable, Button, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback 등 6가지의 버튼이 존재

- 안드로이드와 iOS의 동일한 화면을 원한다면 Pressable,TouchableWithoutFeedback을 쓰는 것이 좋다
- navigation.navigate로 이동 가능하다
- navigation.push는 히스토리를 쌓는 게 가능하다.
- push로 쌓이는 페이지로 돌아갈경우 이전 상태들이 그대로 남아있게 된다.
- navigation.goBack으로 이전으로 이동 가능하다.
- params 추가 가능
  - 객체와 같은 복잡한 데이터는 넣지말자
  - 글로벌 스토어에 넣기
- Screen에 다양한 options들이 존재한다.
- Screen options.title: 제목
- Screen options에 함수를 넣어서 route.params로 접근 가능
- navigation.setOptions로 옵션 변경 가능
- Navigator screenOptions로 공통 옵션 설정 가능
- Screen options.headerShown로 헤더표시 여부 설정 가능
- Screen options.headerTitle로 커스텀 컴포넌트 설정
- Screen options.headerRight로 우측 버튼(useLayoutEffect)

기존 컴포넌트 덮어씌우고 싶다면 요소들 하위에 위치하면 된다

// 위에 작성된 position: 'absolute'인 요소는
// 메인 컨텐츠에 가려져서 보이지 않는다.

```js
<View style={{position: 'absolute'}}>
  <Text>Hello</Text>
</View>
```

```js
</View>
  // 아래에 작성된 position: 'absolute'인 요소는
  // 메인 컨텐츠를 덮어써서 위에 위치해 보인다.
  <View style={{position: 'absolute'}}>
    <Text>Hello</Text>
  </View>
</View>
```

- 억지로 zIndex를 줘서 덮어씌우는 것보다 좋다

```
...StyleSheet.absoulteFillObject
```

: 위 속성을 style로 적용하면 obsoulte 상태로 부모 영역만큼 가득차게 된다.<br/>
-> `top: 0, right: 0, bottom: 0, left: 0` 스타일을 준 것과 같다.

- Tab, Stack 요소들은 미리 flex: 1이 적용되어 있다.

## 중첩 라우팅

### @react-navigation/bottom-tabs 라이브러리 설치

```
npm install @react-navigation/bottom-tabs
```

- 스택으로 지정한 컴포넌트 안에서 다시 Stack.Navigator 설정해 중첩으로 설정할 수 있다.

```js
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Delivery, Orders, Settings, SignIn, SignUp} from './src/pages';

type LoggedInStackParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
};

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator<LoggedInStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Orders"
            component={Orders}
            options={{title: '오더 목록'}}
          />
          <Tab.Screen
            name="Delivery"
            component={Delivery}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{title: '내 정보'}}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{title: '로그인'}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
```

```js
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
```

**[Tip]** 내 앱이 어떤 라우트로 구성이 될지 생각하면서 구조 잡기
