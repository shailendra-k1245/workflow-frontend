import { Handle, Position } from "reactflow"
import { GiRadioTower } from "react-icons/gi"
import "./StartNode.css"
export function StartNode() {
    return (<>
        <Handle position={Position.Right} type='target'></Handle>
        <div className="startNode">
            <label htmlFor="text"><GiRadioTower /> Start</label>
        </div>
    </>)
}