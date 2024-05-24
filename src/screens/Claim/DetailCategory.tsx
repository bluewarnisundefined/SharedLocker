import {useCallback, useRef} from 'react';
import Step from '@/components/Step';
import {Button, Chip, Text} from 'react-native-paper';
import {ClaimStackScreenProps} from '@/navigation/types';
import {useMutation, useQuery} from '@tanstack/react-query';
import lockerAPI from '@/network/locker/api';
import {Alert, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {isAxiosError} from 'axios';
import { LockerStatusAttrMapper, LockerStatusAttributes } from '@/utils/mapper';
import { ILocker, ILockerList, ILockerRequestShare, LockerStatus } from '@/types/api/locker';

export default function DetailCategory({
  route,
  navigation,
}: ClaimStackScreenProps<'Detail'>) {
  const {buildingSelection, floorSelection} = route.params;
  const floorRef = useRef<number>(0);
  const {data} = useQuery<ILockerList>(['lockers', buildingSelection, floorSelection], () =>
    lockerAPI().lockers(buildingSelection.buildingNumber, floorSelection),
  );

  const claimMutation = useMutation<ILocker>({
    mutationFn: () =>
      lockerAPI().claimLockers(
        buildingSelection.buildingNumber,
        floorSelection,
        floorRef.current,
      ),
    onSuccess: claimData => {
      const _data = claimData.data;
      const locker = _data?.value;

      if (!locker) {
        return;
      }

      if (_data?.success) {
        Toast.show({
          type: 'success',
          text2: `${buildingSelection.buildingName} ${floorSelection}층 ${locker.lockerNumber}번 보관함을 신청하였습니다.`,
        });
        navigation.navigate('Home', {refresh: true});
      }
    },
    onError(error) {
      if (isAxiosError(error)) {
        Toast.show({
          type: 'error',
          text2: error.response?.data.message,
        });
      }
    },
  });

  const requestShareLocker = useMutation<ILockerRequestShare>({
    mutationFn: () =>
      lockerAPI().requestShareLocker(
        buildingSelection.buildingNumber,
        floorSelection,
        floorRef.current,
      ),
    onSuccess: shareRequestData => {
      const _data = shareRequestData.data;

      if (_data?.success) {
        Toast.show({
          type: 'success',
          text2: _data?.message,
        });
        navigation.navigate('Home', {refresh: true});
      }
    },
    onError(error) {
      if (isAxiosError(error)) {
        Toast.show({
          type: 'error',
          text2: error.response?.data.message,
        });
      }
    },
  });

  const onLockerButtonPressed = useCallback(
    (floor: number, lockerAttr: LockerStatusAttributes) => {
      let message = '';
      
      if (lockerAttr.status === LockerStatus.Share_Available) {
        message = `${buildingSelection.buildingName} ${floorSelection}층 ${floor}번 보관함을 공유 신청할까요?`
      } else if (lockerAttr.status === LockerStatus.Empty) {
        message = `${buildingSelection.buildingName} ${floorSelection}층 ${floor}번 보관함을 신청할까요?`
      }
      Alert.alert(
        '보관함 신청',
        message,
        [
          {
            text: '취소',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: '신청',
            onPress: () => {
              floorRef.current = floor;

              if (lockerAttr.status === LockerStatus.Share_Available) {
                requestShareLocker.mutate();
              }else if (lockerAttr.status === LockerStatus.Empty) {
                claimMutation.mutate();
              }
            },
          },
        ],
      );
    },
    [buildingSelection, claimMutation, floorSelection],
  );

  const floorList = useCallback(() => {
    if (!data) {
      return [];
    }

    const value = data.data.value;
    if(!value) return <Text>보관함 목록을 불러오지 못했습니다.</Text>;

    const sortedData = value.sort((a, b) => a.lockerNumber - b.lockerNumber);

    return sortedData.map(e => {
      const statusAttr = LockerStatusAttrMapper(e.status);

      return (
        <View 
          key={e.lockerNumber}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
        }}>
          <Button
            key={e.lockerNumber}
            mode="contained"
            onPress={() => onLockerButtonPressed(e.lockerNumber, statusAttr)}
            buttonColor={statusAttr.color}
            disabled={statusAttr.disabled}
            style={{ flex: 1 }}
          >
              {`${e.lockerNumber}번`}
          </Button>
          <Chip icon='information' mode='outlined'>{statusAttr.statusText}</Chip>
        </View>
        
      )
    });
  }, [data, onLockerButtonPressed]);

  return <Step title="보관함 번호를 선택하세요">{floorList()}</Step>;
}
