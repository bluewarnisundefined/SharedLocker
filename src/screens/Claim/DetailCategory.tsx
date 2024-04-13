import {useCallback, useEffect, useRef} from 'react';
import Step from '@/components/Step';
import {Button, Chip} from 'react-native-paper';
import {ClaimStackScreenProps} from '@/navigation/types';
import {useMutation, useQuery} from '@tanstack/react-query';
import lockerAPI from '@/network/locker/api';
import {ILocker, ILockerWithStatus, LockerStatus} from '@/types/locker';
import {Alert, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {isAxiosError} from 'axios';
import { LockerStatusAttrMapper, LockerStatusAttributes } from '@/utils/mapper';

export default function DetailCategory({
  route,
  navigation,
}: ClaimStackScreenProps<'Detail'>) {
  const {buildingSelection, floorSelection} = route.params;
  const floorRef = useRef<number>(0);
  const {data} = useQuery(['lockers', buildingSelection, floorSelection], () =>
    lockerAPI().lockers(buildingSelection, floorSelection),
  );

  const claimMutation = useMutation({
    mutationFn: () =>
      lockerAPI().claimLockers(
        buildingSelection,
        floorSelection,
        floorRef.current,
      ),
    onSuccess: claimData => {
      const _data = claimData.data;
      const locker: ILocker = _data?.locker;

      if (!locker) {
        return;
      }

      if (_data?.success) {
        Toast.show({
          type: 'success',
          text2: _data?.message,
        });
        navigation.navigate('Home');
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
      let message = ''
      if (lockerAttr.status === LockerStatus.Share_Available) {
        message = `${buildingSelection} ${floorSelection}층 ${floor}번 보관함을 공유 신청할까요?`
      } else if (lockerAttr.status === LockerStatus.Empty) {
        message = `${buildingSelection} ${floorSelection}층 ${floor}번 보관함을 신청할까요?`
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
              claimMutation.mutate();
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

    const _data: ILockerWithStatus[] = data.data;
    const sortedData = _data.sort((a, b) => a.lockerNumber - b.lockerNumber);

    return sortedData.map(e => {
      const statusAttr = LockerStatusAttrMapper(e.status);

      return (
        <View style={{
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
