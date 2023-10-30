import react from 'react';
import Step from '@/components/Step';
import { Button } from 'react-native-paper';
import { ClaimStackScreenProps } from '@/navigation/types';

export default function DetailCategory({ navigation }: ClaimStackScreenProps<'Detail'>) {
    const onButtonPressed = (floor: number) => {
        // navigation.navigate('Detail', {subSel: floor});
    }

    return (
        <Step title='보관함 번호를 선택하세요'>
            <Button mode='contained' onPress={() => onButtonPressed(1)}>1번</Button>
            <Button mode='contained' onPress={() => onButtonPressed(2)}>2번</Button>
            <Button mode='contained' onPress={() => onButtonPressed(3)}>3번</Button>
            <Button mode='contained' onPress={() => onButtonPressed(4)}>4번</Button>
            <Button mode='contained' onPress={() => onButtonPressed(5)}>5번</Button>
            <Button mode='contained' onPress={() => onButtonPressed(6)}>6번</Button>
            <Button mode='contained' onPress={() => onButtonPressed(7)}>7번</Button>
        </Step>
    )
}