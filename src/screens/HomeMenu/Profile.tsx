import Layout from "@/components/Layout";
import { HomeMenuStackScreenProps } from "@/navigation/types";
import userAPI from "@/network/user/api";
import { IUser } from "@/types/api/user";
import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native-paper";

export function Profile(props: HomeMenuStackScreenProps<'Profile'>): JSX.Element {
  const {
    data: userData,
    isError
  } = useQuery<IUser>(['user'], () => userAPI().user());

  return (
    <Layout>
      <Text>회원 등록 정보</Text>
      {
        isError ?
          (<Text>회원 정보를 가져올 수 없습니다.</Text>) : (
            <>
              <Text>아이디: {userData?.data?.message.userId}</Text>
              <Text>이름: {userData?.data?.message.nickname}</Text>
              <Text>이메일: {userData?.data?.message.email}</Text>
              <Text>등록일: {userData?.data?.message.createdAt}</Text>
            </>
          )
      }
    </Layout>
  );
}
