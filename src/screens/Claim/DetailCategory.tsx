import {useCallback, useRef} from 'react';
import Step from '@/components/Step';
import {Button} from 'react-native-paper';
import {ClaimStackScreenProps} from '@/navigation/types';
import {useMutation, useQuery} from '@tanstack/react-query';
import lockerAPI from '@/network/locker/api';
import {ILocker, ILockers} from '@/types/locker';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import {isAxiosError} from 'axios';

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

  const onButtonPressed = useCallback(
    (floor: number) => {
      Alert.alert(
        '보관함 신청',
        `${buildingSelection} ${floorSelection}층 ${floor}번 보관함을 신청할까요?`,
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

    const _data: ILockers = data.data;
    const sortedData = _data.sort((a, b) => a - b);

    return sortedData.map(e => (
      <Button
        key={e}
        mode="contained"
        onPress={() => onButtonPressed(e)}>{`${e}번`}</Button>
    ));
  }, [data, onButtonPressed]);

  return <Step title="보관함 번호를 선택하세요">{floorList()}</Step>;
}
