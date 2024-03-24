import {Button, Card, Text} from 'react-native-paper';

export default function Locker(props: {id: string}) {
  return (
    <Card mode="outlined">
      <Card.Title title="보관함" />
      <Card.Content>
        <Text>{props.id}</Text>
      </Card.Content>
      <Card.Actions>
        <Button>신청</Button>
      </Card.Actions>
    </Card>
  );
}
