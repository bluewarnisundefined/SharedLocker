import React from 'react';
import { View } from 'react-native';
import {
  Button,
  Text,
} from 'react-native-paper';
import { MainScreenProps } from '@/types';

export default function Main(props: MainScreenProps): JSX.Element {
  return (
      <View style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        gap: 64,
        padding: 16,
      }}>
        <View style={{
          alignItems: 'center',
          gap: 4
        }}>
          <Text variant="displayLarge">공유 사물함</Text>
          <Text variant="titleLarge">SHARED LOCKER</Text>
        </View>
        <View
          style={{
            gap: 8,
          }}>
          
          <Button mode='contained-tonal' onPress={() => {
            props.navigation.navigate('Login');
          }}>
            로그인
          </Button>
          <Button mode='elevated' onPress={() => {
            props.navigation.navigate('Register');
          }}>
            회원가입
          </Button>
        </View>
      </View>
  );
}
