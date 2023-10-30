import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  ClaimLocker: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type ClaimStackParamList = {
  Main: undefined;
  Sub: {mainSel: string};
  Detail: {subSel: number};
};

export type ClaimStackScreenProps<T extends keyof ClaimStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ClaimStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}