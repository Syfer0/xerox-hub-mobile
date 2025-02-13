import * as React from 'react';
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import { createNavigationContainerRef } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import NoInternetScreen from './screens/NoInternet';
import Layout from './components/layout/Layout';
import TypographyScreen from './screens/components/TypographyScreen';
import ButtonScreen from './screens/components/ButtonScreen';
import CreateAccount from './screens/auth/CreateAccount';
import PreLogin from './screens/auth/PreLogin';
import ChooseLocationScreen from './screens/locations/ChooseLocationScreen';
const Stack = createNativeStackNavigator();

const getIsSignedIn = () => {
  // custom logic
  return true;
};

export const navigationRef = createNavigationContainerRef();

export function navigateRef(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export default function AppNavigations() {
  const [isLoading, setIsLoading] = React.useState(true);
  const isSignedIn = getIsSignedIn();
  const netInfo = useNetInfo();
  const navigation = useNavigation()


  React.useEffect(() => {
    if (!netInfo.isConnected && navigation.isReady()) {
      navigation?.navigate('NoInternet');
    }
    else {
      if (navigation.canGoBack())
        navigation.goBack();
    }
  }, [netInfo, navigation])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000)
    return () => {
      clearTimeout(timer);
    }
  }, []);

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}
      initialRouteName='PreLogin'
    >
      <Stack.Screen name="PreLogin" component={PreLogin} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      {isSignedIn ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="ChooseLocation" component={ChooseLocationScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
      <Stack.Screen name="NoInternet" component={NoInternetScreen} />
      <Stack.Screen name="Typography" component={TypographyScreen} />
      <Stack.Screen name="Button" component={ButtonScreen} />

    </Stack.Navigator>


  );
}

function HomeScreen() {

  return <Layout>
    <Text  >Home Screen</Text>
  </Layout>
}

function ProfileScreen() {
  return <View />;
}

function SettingsScreen() {
  return <View />;
}

function SignInScreen() {
  return <View />;
}

function SignUpScreen() {
  return <View />;
}

