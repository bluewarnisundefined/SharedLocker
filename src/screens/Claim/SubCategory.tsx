import react, { useCallback, useEffect, useState } from 'react';
import Step from '@/components/Step';
import { Button } from 'react-native-paper';
import { ClaimStackScreenProps } from '@/navigation/types';
import { useQuery } from '@tanstack/react-query';
import lockerAPI from '@/network/locker/api';
import { IFloors } from '@/network/locker/types';

export default function SubCategory({ route, navigation }: ClaimStackScreenProps<'Sub'>) {
    const { buildingSelection } = route.params;
    
    const { data } = useQuery(['buildings', buildingSelection], () => lockerAPI().floors(buildingSelection));

    const floorList = useCallback(() => {
        if (!data) return [];

        const _data: IFloors = data.data;
        const sortedData = _data.sort((a, b) => a - b);

        return (
            sortedData.map(e => <Button key={e} mode='contained' onPress={() => onButtonPressed(e)}>{`${e}층`}</Button>)
        )
    }, [data])

    const onButtonPressed = useCallback((selection: number) => {
        navigation.navigate('Detail', {buildingSelection, floorSelection: selection});
    }, []);

    return (
        <Step title='층수를 선택하세요'>
            {floorList()}
        </Step>
    )
}