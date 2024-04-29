import Layout from "@/components/Layout";
import { SettingStackScreenProps } from "@/navigation/types";
import { Text } from "react-native-paper";

export default function LockerManagement(props: SettingStackScreenProps<'LockerManagement'>): JSX.Element {
    return (
        <Layout>
            <Text>보관함 관리</Text>
        </Layout>
    );
}