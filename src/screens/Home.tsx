import {RootStackScreenProps} from '@/navigation/types';
import authAPI from '@/network/auth/api';
import lockerAPI from '@/network/locker/api';
import userAPI from '@/network/user/api';
import {ILockerWithUserInfo} from '@/types/locker';
import {removeAllSecureToken} from '@/utils/keychain';
import { mutationErrorHandler } from '@/utils/mutationHandler';
import {useFocusEffect} from '@react-navigation/native';
import {useMutation, useQuery} from '@tanstack/react-query';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-toast-message';

export default function Home(props: RootStackScreenProps<'Home'>): JSX.Element {
  const {
    status: authStatus,
    data: authData,
    refetch: authRefetch,
  } = useQuery(['auth'], () => authAPI().signOut(), {
    enabled: false,
    retry: false,
  });

  // 유저 소유 보관함.
  const {data: userLockerData, refetch: userLockerRefetch} = useQuery(
    ['userLocker'],
    () => userAPI().locker(),
  );

  // 유저가 공유받은 보관함.
  const {data: sharedLockerData, refetch: sharedLockerRefetch} = useQuery(
    ['sharedLocker'],
    () => userAPI().sharedLocker(),
  )

  // QR Key 요청
  const { data: qrKeyData } = useQuery(['qrKey'], () => authAPI().qrKey(), {
    refetchInterval: (data, query) => {
      if(!data || !data.data.success) return false;

      const _data = data.data;

      const currentTime = new Date().getTime();
      const expiresIn = _data.qrKey.expiredAt - currentTime;

      return expiresIn;
    }
  });

  const cancelLockerMutation = useMutation({
    mutationFn: (data: {
      building: string,
      floorNumber: number,
      lockerNumber: number,
      isOwner: boolean,
    }) => {
      return lockerAPI().cancelLocker(
        data.building,
        data.floorNumber,
        data.lockerNumber,
        data.isOwner,
      );
    },
    onSuccess: (data) => {
      if (data.data.success) {
        Toast.show({
          type: 'success',
          text1: '성공',
          text2: '보관함 취소가 완료되었습니다.',
        });
        userLockerRefetch();
      }
    },
    onError: (error) => {
      mutationErrorHandler(error);
    }
  })


  // 유저가 이용할 수 있는 보관함의 전체 목록입니다. 소유 보관함과 공유 보관함을 모두 포함합니다.
  const [userLocker, setUserLocker] = useState<
    Map<string, ILockerWithUserInfo>
  >(new Map());
  const [selectedLocker, setSelectedLocker] = useState<ILockerWithUserInfo>();
  const [showDropDown, setShowDropDown] = useState(false);
  const [selLocker, setSelLocker] = useState<string>();
  const [selLockerDesc, setSelLockerDesc] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
      userLockerRefetch();
      sharedLockerRefetch();
    }, [userLockerRefetch, sharedLockerRefetch]),
  );

  useEffect(() => {
    const locker: ILockerWithUserInfo = userLockerData?.data.locker[0];
    const sharedLocker: ILockerWithUserInfo[] = sharedLockerData?.data.locker;
    const combinedLocker = [...sharedLocker, locker].filter((locker) => {
      return locker !== undefined;
    });
    let lockerKey = '';

    if (!combinedLocker || combinedLocker.length === 0) {
      setUserLocker(new Map());
      setSelLocker('');
      return;
    }

    if(!locker) {
      lockerKey = `${combinedLocker[0].building}-${combinedLocker[0].floorNumber}-${combinedLocker[0].lockerNumber}`;
    }else{
      lockerKey = `${locker.building}-${locker.floorNumber}-${locker.lockerNumber}`;
    }
    const lockerDesc = `${locker.building} ${locker.floorNumber}층 ${locker.lockerNumber}번`;

    setUserLocker(map => {
      const newMap = new Map(map);

      combinedLocker.forEach((locker) => {
        newMap.set(`${locker.building}-${locker.floorNumber}-${locker.lockerNumber}`, locker);
      });
      return newMap;
    });
    setSelLockerDesc(lockerDesc);
    setSelLocker(lockerKey);
  }, [userLockerData, sharedLockerData]);

  useEffect(() => {
    if (authStatus === 'success' && authData) {
      const _data = authData.data;

      if (_data && _data.success) {
        const tokenExist = _data.token ? true : false;
        if (!tokenExist) {
          removeAllSecureToken();
        }
      }
    }
  }, [authStatus, authData]);

  const getLockerList = useCallback(() => {
    const res: any[] = [];

    userLocker.forEach((value, key) => {
      res.push({
        label: `[${value.owned ? '소유' : '공유'}] ${value.building} ${value.floorNumber}층 ${value.lockerNumber}번`,
        value: key,
      });
    });

    return res;
  }, [userLocker]);

  const generateQRCode = useCallback(() => {
    if (typeof selectedLocker === 'undefined') {
      return;
    }

    if (!qrKeyData || !qrKeyData.data.success) return;

    const lockerInfo = `${selectedLocker?.building}-${selectedLocker?.floorNumber}-${selectedLocker?.lockerNumber}`;

    if (!lockerInfo) return;

    return `${qrKeyData.data.qrKey.key}-${lockerInfo}`;
  }, [selectedLocker, qrKeyData]);

  const cancelLocker = useCallback(() => {
    if (!selectedLocker) return;

    Alert.alert(
      '보관함 취소',
      `${selLockerDesc} 보관함 신청을 취소하시겠습니까?`,
      [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            cancelLockerMutation.mutate({
              building: selectedLocker.building,
              floorNumber: selectedLocker.floorNumber,
              lockerNumber: selectedLocker.lockerNumber,
              isOwner: true,
            });
          },
        },
      ],
    );
  }, [selLockerDesc, selectedLocker, cancelLockerMutation]);

  useEffect(() => {
    if (!selLocker || selLocker === '') {
      setSelectedLocker(undefined);
      return;
    }

    setSelectedLocker(userLocker.get(selLocker));
  }, [userLocker, selLocker]);

  return (
    <ScrollView
      style={{
        padding: 16,
      }}>
      <Card
        mode="contained"
        style={{
          padding: 8,
        }}>
        <Card.Title title="사용중인 보관함" />
        <Card.Content>
          <View
            style={{
              margin: 16,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
            }}>
              {
              generateQRCode() ? (
                <QRCode
                  value={generateQRCode()}
                  logoBackgroundColor="transparent"
                />
                ) : (
                  <Text>보관함을 선택하세요</Text>
                )
              }
          </View>
          <View>
            <DropDown
              label={'보관함을 선택하세요'}
              mode={'outlined'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={selLocker}
              setValue={setSelLocker}
              list={getLockerList()}
            />
          </View>
        </Card.Content>
      </Card>
      
      <Button
        mode="outlined"
        onPress={() => {
          props.navigation.navigate('ClaimLocker');
        }}>
        보관함 신청
      </Button>

      {userLocker.size > 0 ? (
        <>
          <Button mode="outlined" onPress={() => { cancelLocker() }}>
            보관함 삭제 (아직 구현 안됨)
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              if (!selectedLocker) {
                Toast.show({
                  type: 'warning',
                  text1: '오류',
                  text2: '보관함 정보가 없습니다.',
                });
                return;
              }
              props.navigation.navigate('ShareLocker', selectedLocker);
            }}>
            보관함 공유
          </Button>
        </>
      ) : null}
      <Button
        mode="outlined"
        onPress={() => {
          authRefetch();
        }}>
        로그아웃
      </Button>
    </ScrollView>
  );
}
