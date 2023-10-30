import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Main: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    ClaimLocker: undefined;
  };

export type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type ClaimLockerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ClaimLocker'
>;
export type MainScreenProps = {
    navigation: MainScreenNavigationProp;
};
export type LoginScreenProps = {
    navigation: LoginScreenNavigationProp;
};
export type RegisterScreenProps = {
    navigation: RegisterScreenNavigationProp;
};
export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};
export type ClaimLockerScreenProps = {
  navigation: ClaimLockerScreenNavigationProp;
};
