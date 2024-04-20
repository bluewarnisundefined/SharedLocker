import {ILockerWithUserInfo} from '@/types/locker';
import {CompositeScreenProps} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  ClaimLocker: undefined;
  ShareLocker: ILockerWithUserInfo;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootTabScreenProps<T extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, T>;

export type ClaimStackParamList = {
  Main: undefined;
  Sub: {buildingSelection: string};
  Detail: {
    buildingSelection: string;
    floorSelection: number;
  };
};

export type ClaimStackScreenProps<T extends keyof ClaimStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<ClaimStackParamList, T>,
    RootTabScreenProps<keyof RootTabParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
