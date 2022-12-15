import { BiGitBranch } from "react-icons/bi"
import { Handle, Position } from "reactflow"
import "./ConditionNode.css"

const successHandleStyle = { top: 10 }
const fialureHandleStyle = { bottom: 10 }

export function ConditionNode() {
    return (<>
        <Handle position={Position.Left} type='source' />
        <div className="conditionNode">
            <label htmlFor="text" ><BiGitBranch /> Decision:
                <select>
                    <option>.</option>
                    <option>New user</option>
                    <option>Vegetable</option>
                </select>
                <select>
                    <option>.</option>
                    <option>Existing user</option>
                    <option>Groceries</option>
                </select>

            </label>
        </div>
        <Handle position={Position.Right} id="a" style={successHandleStyle} type='target'>IF</Handle>
        <Handle position={Position.Right} id="b" style={fialureHandleStyle} type='target'>ELSE</Handle>
    </>)
}