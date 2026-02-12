import { Text } from "react-konva";
import BaseNode from "./BaseNode";

const GbNode = (props) => {
  const { node } = props;

  return (
    <BaseNode {...props}>
      <Text
        text="GB"
        width={node.width}
        height={node.height}
        align="center"
        verticalAlign="middle"
      />
    </BaseNode>
  );
};

export default GbNode;
