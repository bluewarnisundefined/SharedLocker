import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainCategory from './MainCategory';
import SubCategory from './SubCategory';
import {ClaimStackParamList, HomeTabScreenProps} from '@/navigation/types';
import DetailCategory from './DetailCategory';

export default function ClaimLocker(props: HomeTabScreenProps<'ClaimLocker'>): JSX.Element {
  // 건물 이름 (대분류) ex) 정보공학관, 지천관 등
  // 건물 층수 (중분류) ex) 1층 2층..
  // 보관함 번호 (소분류) ex) 1번 2번..

  const Stack = createNativeStackNavigator<ClaimStackParamList>();

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainCategory} options={{headerShown: false}}/>
      <Stack.Screen name="Sub" component={SubCategory} options={{headerShown: false}}/>
      <Stack.Screen name="Detail" component={DetailCategory} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}
