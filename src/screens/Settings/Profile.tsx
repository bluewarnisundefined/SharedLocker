import Layout from "@/components/Layout";
import { SettingStackScreenProps } from "@/navigation/types";
import userAPI from "@/network/user/api";
import { IUser } from "@/types/api/user";
import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native-paper";

export function Profile(props: SettingStackScreenProps<'Profile'>): JSX.Element {
  const {
    data: userData,
    isError
  } = useQuery<IUser>(['user'], () => userAPI().user());

  const admins = userData?.data?.message.admin;
  const admin_role_available = Array.isArray(admins) && admins.length > 0;

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
              {
                admin_role_available && (
                  <Text>관리자 권한: {admins[0].role}</Text>
                )
              }
            </>
          )
      }
    </Layout>
  );
}
