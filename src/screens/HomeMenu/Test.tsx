import Layout from "@/components/Layout";
import { HomeMenuStackScreenProps } from "@/navigation/types";
import { Text } from "react-native-paper";

export default function Test(props: HomeMenuStackScreenProps<'Test'>) {
    return (
        <Layout>
        <Text>Test</Text>
        </Layout>
    );
}