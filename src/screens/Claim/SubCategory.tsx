import react from 'react';
import Step from '@/components/Step';
import { Button } from 'react-native-paper';
import { ClaimStackScreenProps } from '@/navigation/types';

export default function SubCategory({ navigation }: ClaimStackScreenProps<'Sub'>) {
    const onButtonPressed = (floor: number) => {
        navigation.navigate('Detail', {subSel: floor});
    }

    return (
        <Step title='층수를 선택하세요'>
            <Button mode='contained' onPress={() => onButtonPressed(1)}>1층</Button>
            <Button mode='contained' onPress={() => onButtonPressed(2)}>2층</Button>
            <Button mode='contained' onPress={() => onButtonPressed(3)}>3층</Button>
            <Button mode='contained' onPress={() => onButtonPressed(4)}>4층</Button>
            <Button mode='contained' onPress={() => onButtonPressed(5)}>5층</Button>
            <Button mode='contained' onPress={() => onButtonPressed(6)}>6층</Button>
            <Button mode='contained' onPress={() => onButtonPressed(7)}>7층</Button>
        </Step>
    )
}