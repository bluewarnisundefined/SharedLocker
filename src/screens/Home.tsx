import { RootStackScreenProps } from '@/navigation/types';
import React from 'react';
import { ScrollView, View } from 'react-native';
import {
    Button,
    Card,
    Checkbox,
    Text,
    TextInput,
} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

export default function Home(props: RootStackScreenProps<'Home'>): JSX.Element {
    return (
        <ScrollView style={{
            padding: 16,
        }}>
            <Card mode='contained' style={{
                padding: 8
            }}>
                <Card.Title title="보관함" />
                {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                <Card.Content>
                    <View style={{
                        margin: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 8
                    }}>
                        <QRCode
                            value="http://awesome.link.qr"
                            logoBackgroundColor='transparent'
                        />
                        <Text>ABC 123</Text>
                    </View>
                    <View>
                        <Text style={{
                            fontWeight: 'bold'
                        }}>
                            정보공학관-8-4
                        </Text>
                    </View>

                </Card.Content>
                {/* <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions> */}
            </Card>
            <Button 
                mode='outlined' 
                onPress={() => {
                    props.navigation.navigate('ClaimLocker');
                }}
            >
                ClaimLocker
            </Button>
        </ScrollView>
    );
}
