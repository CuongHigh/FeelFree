import {Text, TouchableOpacity} from 'react-native';

type BtnProps = React.PropsWithChildren<{
  name: string;
  onPress: () => void;
}>;

function Btn(props: BtnProps): React.JSX.Element {
  return (
    <TouchableOpacity
      style={{padding: 10, backgroundColor: 'red'}}
      onPress={props.onPress}>
      <Text style={{color: '#fff'}}>{props.name}</Text>
    </TouchableOpacity>
  );
}

export default Btn;
