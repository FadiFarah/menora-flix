/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import UserAuthenticationScreen from '../screens/UserAuthenticationScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setIsUserAuthenticated } from '../redux/slices/userAuthenticationSlice';
import { setUserFavoritesIndicator } from '../redux/slices/userFavoritesIndicatorSlice';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Logout } from '../components/Logout';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const userAuthentication: boolean = useSelector((state: any)=>state.reducerUserAuthenticationSlice.value);

  const dispatch = useDispatch();

  React.useEffect(() =>  {
    AsyncStorage.getItem("auth")
    .then((result) => {
      if(result) {
        dispatch(setIsUserAuthenticated(true));
      }
      else {
        dispatch(setIsUserAuthenticated(false));
      }
    })
    .catch((error) => {
      console.log(error);
    })

    AsyncStorage.getItem("indicator")
    .then((result) => {
      if(result) {
        dispatch(setUserFavoritesIndicator(result));
      }
      else {
        dispatch(setIsUserAuthenticated(0));
      }
    })
    .catch((error) => {
      console.log(error);
    })

  }, []);

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {
        userAuthentication ?
        <RootNavigator /> :
        <UserAuthenticationScreen />
      }
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Tab" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const userFavoritesIndicator: number = useSelector((state: any)=>state.reducerUserFavoritesIndicatorSlice.value);
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'My home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: 'red'
          }
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: 'red'
          },
          tabBarBadge: userFavoritesIndicator,
          tabBarBadgeStyle: {display: userFavoritesIndicator === 0 ? 'none' : 'flex'}
        }}
        
      />
    </BottomTab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Tab" options={{headerShown: false, drawerItemStyle: {display: 'none'}}} component={BottomTabNavigator}  />
      <Drawer.Screen name="Logout" component={Logout}  />
    </Drawer.Navigator>
  )
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
