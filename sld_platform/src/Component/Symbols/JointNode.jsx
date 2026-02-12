import { Text } from "react-konva";
import BaseNode from "./BaseNodes/BaseNode3";

const JointNode = (props) => {
  const { node } = props;

  return (
    <BaseNode {...props}>
      <Text
        text="J"
        width={node.width}
        height={node.height}
        align="center"
        verticalAlign="middle"
      />
    </BaseNode>
  );
};

export default JointNode;