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

**[Tip]** 간혹 Tab.Screen을 두개 이상을 조건문으로 감싸야하는 경우가 생긴다면?

```js
{isTrue && (
  <Tab.Group>
    <Tab.Screen ... />
    <Tab.Screen ... />
  </Tab.Group>
)}
```

이런 식으로 Tab.Group으로 하나로 감싸주면 된다

**[Tip]** StyleSheet에서 hairlineWidth를 사용해서 border를 지정하면 눈에 보이는 가장 얇은 보더의 width를 지정해줄 수 있다.

```js
textInput : {
  padding: 5,
  borderBottomWidth: StyleSheet.hairlineWidth,
}
```

- css에서 무언가는 감싸주는 단위는 Wrapper 를 붙여서 작명해보자

## TextInput 제대로 사용하기

- TextInput으로 비밀번호를 받고싶을 경우

- secureTextEntry 속성을 부여하면 비밀번호가 \*\*\*\* 형태로 변경된다.

  ```js
  <TextInput
    ...
    secureTextEntry
  />
  ```

**[Tip]** 이메일이나 비밀번호를 치면 저장되는 기능 사용하려면?<br/>
ex) 삼성패스 이런 곳에 저장되서 지문인식하거나 페이스 인식하면 자동으로 불러와지는 기능을 사용하고 싶은 경우

```js
<TextInput
  ...
  importantForAutoFill="yes"
  autoComplete="email"
  textContentType="emailAddress"
/>

<TextInput
  ...
  importantForAutoFill="yes"
  autoComplete="password"
  textContentType="password"
/>
```

- 이 외에도 자동완성을 지원하는 기능이 많다

  - otp, 우편번호, 주소, ....

**[Tip]** 키보드의 완료 버튼도 변경할 수 있다.

```js
<TextInput
  ...
  returnKeyType="next"
/>
```

**[Tip]** ref를 사용해서 자동으로 다음 input으로 넘어가도록 할수있다.

```js
const emailRef = (useRef < TextInput) | (null > null);
const passwordRef = (useRef < TextInput) | (null > null);
```

- ref는 요소에 지정되기 전까지는 null이나 undefined일 수 있음을 인식해야한다.

```js
<TextInput
  ...
  value={email}
  onSubmitEditing={() => {
    passwordRef.current?.focus();
  }}
  blurOnSubmit={false}
/>
```

-> onSubmitEditing를 사용해서 email 입력이 끝나면 password 입력칸으로 포커싱되도록

-> blurOnSubmit은 키보드가 내려가는 걸 막을 수 있다.

```js
<TextInput
  ...
  value={password}
  ref={passwordRef}
  onSubmitEditing={onSubmit}
/>
```

-> 마지막 입력으로 키보드를 내리고 다음 버튼을 누르거나 onSubmitEditing으로 키보드 엔터를 선택하면 바로 다음이 실행되도록 해서 편의성을 높일 수 있다.

**[주의]** 아이폰에서만 가능한 기능이지만 clearButtonMode="while-editing" 을 설정하면 x버튼을 눌렀을 때 TextInput의 입력값이 없어진다.

```js
<TextInput
  ...
  clearButtonMode="while-editing"
/>
```

## DismissKeyboardView 공용 컴포넌트를 만들어서 사용하면 좋다

```js
import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const DismissKeyboardView = ({children, ...props}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <KeyboardAwareScrollView {...props} style={props.style}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
```

- Keyboard.dismiss는 React-Native에서 제공하는 api로 Keyboard를 닫을 수 있는 함수이다

- accessible는 장애인 앱 접근성을 고려하는 속성이다.<br/>
  -> 위 공용 컴포넌트의 경우에는 실제 버튼 속성이 아닌 키보드를 내리는 기능을 위한 컴포넌트이므로 장애인분들에게 혼란을 줄수있으므로 실제 버튼이 아니면 accessible를 비활성화해주는 게 좋다

**[Tip]** KeyboardAvoidingView 는 사용자가 사용하기에 생각보다 이상하게 동작하는 경우가 많다 그렇기 때문에 KeyboardAwareScrollView를 사용하는 것이 좋다.

- KeyboardAwareScrollView는 `keyboard-aware-scrollview`를 설치하면 사용할 수 있다.

  ```js
  npm install react-native-keyboard-aware-scrollview
  ```

- react-native-keyboard-aware-scrollview 라이브러리는 TypeScript가 장착되지 않은 예전 라이브러리라서 TypeScript와 함께쓰면 에러가 날수있다. 그럴때는 아래 코드를 추가 설치해주자

  ```js
  npm i @types/react-native-keyboard-aware-scrollview
  ```

  -> 만약 불행하게도 아무도 해당 라이브러리에 타입지정을 해둔 사람이 없다면?

  `react-native-keyboard-aware-scrollview.d.ts` 파일을 만들고 직접 만들어주어야 한다.

  ```js
  //react-native-keyboard-aware-scrollview.d.ts

  declare module "react-native-keyboard-aware-scrollview" {
    import * as React from 'react';
    import {ViewProps} from 'react-native';
    import {Constructor} from 'react-native/types/private/Utilities';
    class KeyboardAwareScrollViewComponent extends React.Component<ViewProps> {}
    const KeyboardAwareScrollViewBase: KeyboardAwareScrollViewComponent &
    Constructor<any>;
    class KeyboardAwareScrollView extends KeyboardAwareScrollViewComponent {}
    export {KeyboardAwareScrollView};
  }
  ```

  -> 실제로 직접 만들기는 어렵기떄문에 위에 코드를 붙여서 사용하자

**[TypeScript Tip]**
컴포넌트 중에 children이 있는 컴포넌트의 경우 React.FC를 사용하는 걸 추천한다.

-> 아니면 function 함수 사용

```js
const DismissKeyboardView: React.FC = ({
  children,
  ...props
}) => (
  <TouchableWidthoutFeedback>
    <KeyboardAwareScrollView {...props} style={props.style}>
      {children}
  </TouchableWidthoutFeedback>
)
```
