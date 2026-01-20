import { Text } from "react-konva";
import BaseNode from "./BaseNodes/BaseNode3";

const BranchNode3 = (props) => {
  const { node } = props;

  return (
    <BaseNode {...props}>
      <Text
        // text="Branch"
        width={node.width}
        height={node.height}
        align="center"
        verticalAlign="middle"
      />
    </BaseNode>
  );
};

export default BranchNode3;