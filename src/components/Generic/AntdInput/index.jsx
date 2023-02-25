
import { Form, Input, InputNumber } from "antd";

export const AntdInput = ({
    name,
    type,
    placeholder,
    width,
}) => {
    return (
        <Form.Item
            name={name}
        >
            {type ? < InputNumber placeholder={placeholder} style={{ width: width || '96%' }} />
                : <Input placeholder={placeholder} style={{ width: width || '96%' }} />
            }
        </Form.Item>
    );
}
export default AntdInput;