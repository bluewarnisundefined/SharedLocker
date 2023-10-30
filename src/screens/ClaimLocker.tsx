import react from 'react';
import Locker from '@/components/Locker';
import { ScrollView, View } from 'react-native';

export default function ClaimLocker(){

    return (
        
        <ScrollView>
            <View>
                <Locker />
            </View>
        </ScrollView>
    )
}