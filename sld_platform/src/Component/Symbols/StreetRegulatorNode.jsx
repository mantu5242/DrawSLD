import { Text } from "react-konva";
import BaseNode from "./BaseNode";

const StreetRegulatorNode = (props) => {
  const { node } = props;

  return (  
    <BaseNode {...props}>
      <Text
        text="str_Reg"
        width={node.width}
        height={node.height}
        align="center"
        verticalAlign="middle"
      />
    </BaseNode>
  );
};

export default StreetRegulatorNode;
