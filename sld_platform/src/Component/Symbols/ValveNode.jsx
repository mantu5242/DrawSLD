import { Text } from "react-konva";
import BaseNode2 from "./BaseNodes/BaseNode2";

const ValveNode = (props) => {
  const { node } = props;

  return (
    <BaseNode2 {...props}>
      <Text
        text="Valve"
        width={node.width}
        height={node.height}
        align="center"
        verticalAlign="middle"
      />
    </BaseNode2>
  );
};

export default ValveNode;
