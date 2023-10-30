import react, { useEffect, useState } from 'react';
import Step from '@/components/Step';
import { Button, Surface } from 'react-native-paper';
import { View } from 'react-native';
import { ClaimStackScreenProps } from '@/navigation/types';

export default function MainCategory({ navigation }: ClaimStackScreenProps<'Main'>) {
    const [sel, setSel] = useState('');
    
    useEffect(() => {
        if(sel == '') return;

        navigation.navigate('Sub', {mainSel: sel});
    }, [sel]);

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
                <Button mode='contained' onPress={() => setSel('정보공학관')}>정보공학관</Button>
                <Button mode='contained' onPress={() => setSel('지천관')}>지천관</Button>
                <Button mode='contained' onPress={() => setSel('중앙도서관')}>중앙도서관</Button>
                <Button mode='contained' onPress={() => setSel('공학관')}>공학관</Button>
                <Button mode='contained' onPress={() => setSel('제1인문관')}>제1인문관</Button>
                <Button mode='contained' onPress={() => setSel('법정관')}>법정관</Button>
                <Button mode='contained' onPress={() => setSel('국제관')}>국제관</Button>
            </Surface>
        </Step>
    )
}