import {RootStackScreenProps} from '@/navigation/types';
import authAPI from '@/network/auth/api';
import {useMutation} from '@tanstack/react-query';
// import { handleNetworkError } from '@/utils/axios';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Checkbox, Text, TextInput} from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function Register(
  props: RootStackScreenProps<'Register'>,
): JSX.Element {
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: () => {
      return authAPI().signUp(id, password, name);
    },
    onSuccess: data => {
      const _data = data.data;

      if (_data.success) {
        Toast.show({
          type: 'success',
          text2: _data?.message,
        });
        props.navigation.navigate('Main');
      }
    },
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
            gap: 8,
          }}>
          <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
            새로운 계정 생성
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text variant="titleSmall">이미 계정이 있으신가요?</Text>
            <Button 
              onPress={() => {
                props.navigation.navigate('Login')
              }}
            >
              로그인
            </Button>
          </View>
          
        </View>
        <View
          style={{
            gap: 14,
          }}>
          <TextInput
            placeholder="이름"
            onChangeText={newText => setName(newText)}
          />
          <TextInput
            placeholder="아이디"
            onChangeText={newText => setId(newText)}
          />
          <TextInput
            placeholder="비밀번호"
            onChangeText={newText => setPassword(newText)}
          />
          <TextInput
            placeholder="비밀번호 재입력"
            onChangeText={newText => setPassword(newText)}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text>이용약관에 동의합니다.</Text>
        </View>

        <View>
          <Button
            mode="contained-tonal"
            onPress={() => {
              mutation.mutate();
            }}>
            회원가입
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
