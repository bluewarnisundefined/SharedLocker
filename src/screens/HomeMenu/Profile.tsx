import Layout from "@/components/Layout";
import { HomeMenuStackScreenProps } from "@/navigation/types";
import { Text } from "react-native-paper";

export function Profile(props: HomeMenuStackScreenProps<'Profile'>): JSX.Element {
  return (
    <Layout>
      <Text>Profile</Text>
    </Layout>
  );
}