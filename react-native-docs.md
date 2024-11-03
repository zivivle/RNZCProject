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

## axios로 서버에 요청 보내기

서버 요청은 axios 사용 (요즘 ky나 got로 넘어가는 추세이나 react-native에서는 아직 적용하기 쉽지 않음)

```js
npm i axios
```

- async await 문법에는 try, catch, finally문을 사용해야한다. finally는 최근에 추가된 문법으로 try를 하던 catch를 하던 항상 실행되는 문이다.

```js
function SignUp({navigator}: SignUpScreenProps){
  const [loading, setLoading] = useState(false)
  ...

  const onSubmit = useCallback(async() => {
    ...
    try {
      // 요청을 보내기 전에 로딩상태 활성화
      setLoading(true)
      const response = await axios.post( `${__DEV__ ? 'localhost:3150' : '실서버 주소'}/user`, { email, name, password },
        header: {
          token: '고유한 값'
        }
      )
      console.log(response);
    } catch (error) {
      console.log(error.response)
    } finally {
      setLoading(false)
    }
  }, [ email, name, password ])


  return (
    <View>
      ...
      <Button
        ...
        // 로딩중일때 버튼 클릭을 방지해주어야한다
        disabled={loading || !canGoBack}
      >
        <Text>화원가입</Text>
        {loading && <ActivityIndicator />}
      </Button>
    </View>
  )
}
```

## 서버 주소 react-native-config로 관리하기 -> 환경변수

.env 파일을 만들어서

```
API_URL=http://localhost:3150
```

이렇게 만들어주면 `Config.API_URL` 이렇게 가져와서 사용할 수 있다.

```js
...
import Config from 'react-native-config'

function SignUp({navigator}: SignUpScreenProps){
  const [loading, setLoading] = useState(false)
  ...

  const onSubmit = useCallback(async() => {
    ...
    try {
      // 요청을 보내기 전에 로딩상태 활성화
      setLoading(true)
      const response = await axios.post( `${Config.API_URL}/user`, { email, name, password },
        header: {
          token: '고유한 값'
        }
      )
      console.log(response);
    } catch (error) {
      console.log(error.response)
    } finally {
      setLoading(false)
    }
  }, [ email, name, password ])
}
```

- 그리고 env 파일 수정이나 새로운 라이브러리 설치하면 항상 새로 시작 해줘야한다.

## Redux, Config, EncryptedStorage, AsyncStorage의 차이 알기

```js

function SignIn() {
  ...

  const onSubmit = useCallback(async() => {
    ...
    try {
      setLoading(true)
      const response = await axios.post(`${Config.API_URL}/login`, {
        email,
        password,
      })
      console.log(response.data)
      Alert.alert('알림', '로그인 되었습니다.');

      // 전역상태 저장
      setUserInfo({
        name: response.data.data.name,
        email: response.data.data.email,
        accessToken: response.data.data.accessToken,
      })

      // 영구적으로 보관
      await EncryptedStorage.setItem(
        'refreshToken',
        response.data.data.refreshToken
      )
    } catch {

    } finally {
      setLoading(false)
    }
  }, [])
}
```

### AsyncStorage의, EncryptedStorage 차이

**AsyncStorage**는 저장될때 암호화되지 않아 누구나 접근해서 확인할 수 있다는 문제점이 있다.
그래서 민감한 정보를 저장하기에는 좋지 않다
**[주의]** 기존의 React-Native의 AsyncStorage는 더이상 사용하면 안되고 라이브러리를 설치해서 사용해줘야 한다.

**AsyncStorage 사용법**

```
npm install @react-native-async-storage/async-storage
```

```js
// Promise이기 때문에 await을 꼭 붙여줘야한다.
await AsyncStorage.setItem('키', '값');
await AsyncStorage.removeItem('키', '값');
const 값 = await AsyncStorage.getItem('키', '값');
```

-> 만약 보안에 민감한 데이터를 저장해야 한다면 EncryptedStorage를 사용하는 것이 좋다<br/><br/>
**EncryptedStorage 사용법**

```
npm i react-native-encrypted-storage
```

```js
// Promise이기 때문에 await을 꼭 붙여줘야한다.
await EncryptedStorage.setItem('키', '값');
await EncryptedStorage.removeItem('키', '값');
const 값 = await EncryptedStorage.getItem('키', '값');
```

## accessToken과 refreshToken

**accessToken** <br/>
: accessToken은 서버에 어떠한 요청을 보낼 때 요청 보낸 사람을 구별할 수 있도록 도와주는 장치 역할을 한다.
그렇기 때문에 accessToken을 탈취당하면 요청을 보내는 사람인 척 하면서 해커가 여러 활동이 가능해진다.
그래서 accessToken에 유효기간(10분, 5분, 1시간, ... 회사마다 다름)을 두고 유효기간이 지나면 토큰을 만료시키는 처리를 한다.

**refreshToken** <br/>
: accessToken의 유효기간이 만료될 때마다 사용자가 재로그인을 하게된다면 사용자 경험에 매우 안좋기 때문에 refreshToken을 사용하게 된다.
refreshToken을 서버에 보내게되면 accessToken의 유효기간을 새로 연장하도록 한다.

```js
await EncryptedStorage.setItem('refreshToken', response.data.data.refreshToken);
```

-> 그렇기 때문에 refreshToken까지 유출되게 되면 답이 없는 상황이 발생한다. 그걸 방지하기 위해서 refreshToken은 EncryptedStorage와 같은 암호화되는 저장소에 저장하도록 한다!

## 웹소켓 연결하기

: 앱에서 자주 사용되는 실시간 통신 방법에는 **웹소캣을 사용**하거나 **푸시알림을 사용**하는 방법이 있다.
<br/> 단, 웹 소켓을 사용하는 방법은 베터리 소모가 있을 수 있다.

### 웹소캣을 사용 방법

```
npm i socket.io-client
```

이후 커스텀훅으로 useSocket를 만들어준다.

```js
// useSocket.ts

import {useCallback} from 'react';
import SocketIOClient, {Socket} from 'socket.io-client';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';

let socket: Socket | undefined;
const useSocket = (): [Socket | undefined, () => void] => {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const disconnect = useCallback(() => {
    if (socket && !isLoggedIn) {
      console.log(socket && !isLoggedIn, '웹소켓 연결을 해제합니다.');
      socket.disconnect();
      socket = undefined;
    }
  }, [isLoggedIn]);
  if (!socket && isLoggedIn) {
    console.log(!socket && isLoggedIn, '웹소켓 연결을 진행합니다.');
    socket = SocketIOClient(`${Config.API_URL}`, {
      transports: ['websocket'],
    });
  }
  return [socket, disconnect];
};

export default useSocket;
```

## 실시간 데이터 받기, 로그아웃(Bearer 토큰)

### 실시간 데이터 받기

```js
function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const [socket, disconnect] = useSocket();

  // socket.io에서 데이터를 받으면 키=값 형태로 오게됨
  //
  useEffect(() => {
    const helloCallback = (date: any) => {
      console.log(data);
    };
    if (socket && isLoggedIn) {
      console.log(socket);
      // 서버에게 데이터를 보내는 게 socket.emit
      socket.emit('login', 'hello');
      // 서버에게 데이터를 받는 게 socket.on
      socket.on('hello', helloCallback);
    }
    return () => {
      if (socket) {
        // 서버에게 데이터를 받는 걸 그만하기가 socket.off
        socket.off('hello', helloCallback);
      }
    };
  }, [isLoggedIn, socket]);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('!isLoggedIn', !isLoggedIn);
      disconnect();
    }
  }, [isLoggedIn, disconnect]);
}
```

### 로그아웃 하기

```js
function Settings() {
  const accessToken = useUserInfoStore((state) => state.userInfo.accessToken);
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);
  const onLogout = useCallback(async() => {
    try {
      await axios.post(
        `${Config.API_URL}/logout`,
        {},
        header: {
          Authorization: `Bearer ${accessToken}`,
        },
      );
      Alert.alert('알림', '로그아웃 되었습니다.')
      // 전역 상태 초기화
      setUserInfo({
        name: '',
        email: '',
        accessToken: '',
      })
      // EncryptedStorage에서 refreshToken 초기화
      await EncryptedStorage.removeItem('refreshToken');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.log(errorResponse);
    }
  }, [accessToken, setUserInfo])
}
```

## 앱을 껐다 켜도 로그인 유지하기

- refreshToken의 만료기간이 남아있는 사람인지 확인한 후에 아니라면 다시 로그인 시키고 맞다면 로그인 상태 유지되도록하기
  ex) refreshToken의 만료기간이 한달인 경우 -> 한달이 지나서 로그인하면 다시 로그인하도록 아니라면 로그인 상태 유지

```js
useEffect(() => {
    const getTokenAndRefresh = async () => {
      try {
        const token = await EncryptedStorage.getItem('refreshToken');
        if (!token) {
          return;
        }
        const response = await axios.post(
          `${Config.API_URL}/refreshToken`,
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        setUserInfo({
          name: response.data.data.name,
          email: response.data.data.email,
          accessToken: response.data.data.accessToken,
        })
      } catch (error) {
        console.error(error);
        if ((error as AxiosError).response?.data.code === 'expired') {
          Alert.alert('알림', '다시 로그인 해주세요.');
        }
      } finally {
        TODO: 스플래쉬스크린 넣어주기
      }
    };
    // useEffect는 async함수가 안되기 때문에 어쩔 수 없이 다시 실행해줘야함
    getTokenAndRefresh();
  }, [dispatch]);
```

## 주문 목록 화면 만들기 (FlatList)

```js
import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {Order} from '../slices/order';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import EachOrder from '../components/EachOrder';

function Orders() {
  const orders = useSelector((state: RootState) => state.order.orders);

  // 반복 대상이 되는 부분은 항상 컴포넌트를 분리해라
  // ex) EachOrder
  const renderItem = useCallback(({item}: {item: Order}) => {
    return <EachOrder item={item} />;
  }, []);

  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={item => item.orderId}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Orders;
```

<br/>

## navigation

Screen과 연결된 컴포넌트에만 인자로 navigation을 받아와서 사용해야 하고 <br/>
연결된 컴포넌트의 자식 컴포넌트인 경우 navigation을 props로 내려주거나 (비추) <br/>
`const navigation = useNavigation();` 해당 훅을 사용해서 사용함 (추천)
<br/>
<br/>

## 토큰 재발급하기(axios Interceptor)

axios 사용하는 작업중 너무 코드가 중복될 것 같다면 **axios Interceptor** 기능을 사용하는 게 좋다

```js
useEffect(() => {
  axios.interceptors.response.use(
    // 1. 첫번째 함수가 성공했을 때 처리하는 함수
    response => {
      return response;
    },
    // 2. 두번째 함수가 실패했을 때 처리하는 함수
    async error => {
      const {
        // config가 원래 요청을 의미함
        config,
        response: {status},
      } = error;
      if (status === 419) {
        if (error.response.data.code === 'expired') {
          const originalRequest = config;
          const refreshToken = await EncryptedStorage.getItem('refreshToken');
          // token refresh 요청
          const {data} = await axios.post(
            `${Config.API_URL}/refreshToken`, // token refresh api
            {},
            {headers: {authorization: `Bearer ${refreshToken}`}},
          );
          // 새로운 토큰 저장
          dispatch(userSlice.actions.setAccessToken(data.data.accessToken));
          originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
          // 419로 요청 실패했던 요청 새로운 토큰으로 재요청
          return axios(originalRequest);
        }
      }
      // 그 외의 에러는 reject로 error를 넘겨줌
      return Promise.reject(error);
    },
  );
}, [dispatch]);
```

## 네이버지도 사용하기

[참고 링크](https://github.com/zerocho/react-native-naver-map)

```
npm i https://github.com/zerocho/react-native-naver-map
npx pod-install
```

```js
<View
  style={{
    width: Dimensions.get('window').width - 30,
    height: 200,
    marginTop: 10,
  }}>
  <NaverMapView
    style={{width: '100%', height: '100%'}}
    zoomControl={false}
    center={{
      zoom: 10,
      tilt: 50,
      latitude: (start.latitude + end.latitude) / 2,
      longitude: (start.longitude + end.longitude) / 2,
    }}>
    // 출발지
    <Marker
      coordinate={{
        latitude: start.latitude,
        longitude: start.longitude,
      }}
      pinColor="blue"
    />
    // 경로 연결해줌
    <Path
      coordinates={[
        {
          latitude: start.latitude,
          longitude: start.longitude,
        },
        {latitude: end.latitude, longitude: end.longitude},
      ]}
    />
    // 도착지
    <Marker coordinate={{latitude: end.latitude, longitude: end.longitude}} />
  </NaverMapView>
</View>
```

## 위치정보, 카메라 권한 얻기(react-native-permissions)

: 위치 정보, 카메라, 갤러리 등 권한에 대한 요청이 필요함

```
npm i react-native-permissions
```

퍼미션 요청 플로우는 docs에서 확인할 수 있다.<br/>
https://github.com/zoontek/react-native-permissions

```js
import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

function usePermissions() {
  // 권한 관련
  useEffect(() => {
    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(result => {
          console.log('check location', result);
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            Alert.alert(
              '이 앱은 위치 권한 허용이 필요합니다.',
              '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.',
              [
                {
                  text: '네',
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: '아니오',
                  onPress: () => console.log('No Pressed'),
                  style: 'cancel',
                },
              ],
            );
          }
        })
        .catch(console.error);
    } else if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(result => {
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            Alert.alert(
              '이 앱은 백그라운드 위치 권한 허용이 필요합니다.',
              '앱 설정 화면을 열어서 항상 허용으로 바꿔주세요.',
              [
                {
                  text: '네',
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: '아니오',
                  onPress: () => console.log('No Pressed'),
                  style: 'cancel',
                },
              ],
            );
          }
        })
        .catch(console.error);
    }
    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.CAMERA)
        .then(result => {
          if (result === RESULTS.DENIED || result === RESULTS.GRANTED) {
            return request(PERMISSIONS.ANDROID.CAMERA);
          } else {
            console.log(result);
            throw new Error('카메라 지원 안 함');
          }
        })
        .catch(console.error);
    } else {
      check(PERMISSIONS.IOS.CAMERA)
        .then(result => {
          if (
            result === RESULTS.DENIED ||
            result === RESULTS.LIMITED ||
            result === RESULTS.GRANTED
          ) {
            return request(PERMISSIONS.IOS.CAMERA);
          } else {
            console.log(result);
            throw new Error('카메라 지원 안 함');
          }
        })
        .catch(console.error);
    }
  }, []);
}

export default usePermissions;
```

만약 usePermissions를 각각 따로 usePermissions.android.ts, usePermissions.ios.ts 이렇게 분리해서 만들어준다면 import시 자동으로 안드로이드일 경우 .android.ts 파일을 ios일 경우 .ios.ts을 가지고 올 수 있다.

-> 하지만 이 방법이 vscode나 인텔리제이에서 인식되지 않아서 문제가 될 수 있음

## 내 위치 정보 가져오기

```
npm i @react-native-community/geolocation
```

## 이미지 선택해서 리사이징하기

```shell
npm i react-native-image-crop-picker
npm i react-native-image-resizer
```

: 프론트단에서 이미지 리사이징을 해주는게 더 좋음

## RN에서 폼데이터 사용해서 이미지 업로드하기

```
// { uri: '경로', filename: '파일이름', type: '확장자' } 이 형식으로 만들어주고
// multipart/form-data 통해서 업로드해주면 된다.
```

[주의] axios 0.25.0 버전에서 이미지업로드 이슈가 있다고함 이 버전을 쓰면 안됨

- 프리뷰 이미지에서 이미지 스타일의 resizeMode: 'contain'을 적용하면 이미지 크기에 딱 맞게 들어간다
- resizeMode: 'cover'는 이미지가 공간에 꽉차게 적용할 수 있음
