import { Text } from "react-konva";
import BaseNode from "./BaseNode";

const ConsumerNode = (props) => {
  const { node } = props;

  return (
    <BaseNode {...props}>
      <Text
        text="Consumer"
        width={node.width}
        height={node.height}
        align="center"
        verticalAlign="middle"
      />
    </BaseNode>
  );
};

export default ConsumerNode;