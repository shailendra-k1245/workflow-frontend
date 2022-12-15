import { Handle, Position } from "reactflow"
import { BiText } from "react-icons/bi";
import "./OutputNode.css"
export function OutputNode() {
    return (
        <>
            <Handle type='source' position={Position.Left}></Handle>
            <div className="outputNode">
                <label htmlFor="text"><BiText /> <u>Final Output:</u>
                    <p>  </p>
                </label>
            </div>
        </>
    )
}