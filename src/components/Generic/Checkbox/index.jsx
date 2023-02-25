
import { Form } from "antd";
import { AntdCheckbox, Container, Title } from "./style";
// import { Checkbox } from 'antd';

export const Checkbox = ({
    onClick,
    mt,
    mr,
    mb,
    ml,
    children,
    name
}) => {
    return (
        <Form.Item
            name={name}
            valuePropName='checked'
            initialValue={false}
        >
            <Container
                mt={mt}
                mr={mr}
                mb={mb}
                ml={ml}
            >
                <AntdCheckbox
                    onChange={onClick}
                />
                <Title>{children}</Title>
            </Container>
        </Form.Item>
    );
}
export default Checkbox;