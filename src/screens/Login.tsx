import {RootStackScreenProps} from '@/navigation/types';
import authAPI from '@/network/auth/api';
import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Checkbox, Text, TextInput} from 'react-native-paper';

export default function Login(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  props: RootStackScreenProps<'Login'>,
): JSX.Element {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const {refetch} = useQuery(['auth'], () => authAPI().signIn(id, password), {
    enabled: false,
    retry: false,
  });

  return (
    <ScrollView
      style={{
        padding: 16,
      }}>
      <View
        style={{
          gap: 16,
        }}>
        <View
          style={{
            marginTop: 64,
            marginBottom: 16,
          }}>
          <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
            로그인
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text variant="titleSmall">계정이 없으신가요?</Text>
            <Button 
              onPress={() => {
                props.navigation.navigate('Register')
              }}
            >
              회원 가입
            </Button>
          </View>
        </View>
        <View
          style={{
            gap: 14,
          }}>
          <TextInput
            placeholder="아이디"
            onChangeText={newText => {
              setId(newText);
            }}
          />
          <TextInput
            placeholder="비밀번호"
            secureTextEntry={true}
            onChangeText={newText => {
              setPassword(newText);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
        </View>

        <View>
          <Button mode="contained-tonal" onPress={() => refetch()}>
            로그인
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
