import { useCallback } from 'react';
import Step from '@/components/Step';
import { Button, Surface } from 'react-native-paper';
import { ClaimStackScreenProps } from '@/navigation/types';
import { useQuery } from '@tanstack/react-query';
import lockerAPI from '@/network/locker/api';
import { IBuildings } from '@/types/locker';

export default function MainCategory({ navigation }: ClaimStackScreenProps<'Main'>) {
    const { data } = useQuery(['buildings'], () => lockerAPI().buildings());

    const buildingList = useCallback(() => {
        if(!data) return [];

        const _data: IBuildings = data.data;

        return (
            _data.map(e => <Button key={e} mode='contained' onPress={() => onButtonPressed(e)}>{e}</Button>)
        )
    }, [data])

    const onButtonPressed = useCallback((selection: string) => {
        navigation.navigate('Sub', {buildingSelection: selection});
    }, []);

    return (
        <Step 
            title='건물을 선택하세요'
            subTitle='신청하고자 하는 보관함의 건물 위치를 선택하세요'
        >
            <Surface 
                elevation={5}
                style={{
                    gap: 18
                }}
            >
                {buildingList()}
            </Surface>
        </Step>
    )
}