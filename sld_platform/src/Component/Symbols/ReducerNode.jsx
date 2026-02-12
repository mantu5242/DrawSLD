import { Text } from "react-konva";
import BaseNode from "./BaseNode";

const ReducerNode = (props) => {
  const { node } = props;

  return (
    <BaseNode {...props}>
      <Text
        text="Reducer"
        width={node.width}
        height={node.height}
        align="center"
        verticalAlign="middle"
      />
    </BaseNode>
  );
};

export default ReducerNode;
