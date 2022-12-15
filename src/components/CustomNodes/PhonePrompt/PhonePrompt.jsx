import { Handle, Position } from "reactflow";
import { HiOutlinePhone } from "react-icons/hi"
import "./PhonePrompt.css"

export function PhonePrompt() {
    return (
        <>
            <Handle position={Position.Left} type="source" />
            <div className="phonePrompt">
                <label htmlFor="text"> <HiOutlinePhone /> <u>Phone</u></label>
                <input type="text" placeholder="Please provide phone number" />

            </div>
            <Handle position={Position.Right} type="target" />
        </>
    )
}