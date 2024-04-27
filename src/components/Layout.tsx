import { ScrollView, View } from "react-native";

export default function Layout(props: {children: React.ReactNode}): JSX.Element {
    return (
        <ScrollView
          style={{
            padding: 16,
          }}>
          <View
            style={{
              gap: 16,
            }}>
            <View
              style={{
                marginTop: 64,
                marginBottom: 16,
                gap: 8,
              }}>
                {props.children}
            </View>
          </View>
        </ScrollView>
      );
}