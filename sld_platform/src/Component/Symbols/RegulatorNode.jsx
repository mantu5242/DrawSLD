import { Text } from "react-konva";
import BaseNode from "./BaseNode";

const RegulatorNode = (props) => {
  const { node } = props;

  return (
    <BaseNode {...props}>
      <Text
        text="Reg"
        width={node.width}
        height={node.height}
        align="center"
        verticalAlign="middle"
      />
    </BaseNode>
  );
};

export default RegulatorNode;
