
import { Form, Select } from "antd";
import { useQuery } from 'react-query';
import { useHttp } from "../../../hooks/useHttp";

 const AntdSelect = ({
    name,
    placeholder
}) => {

    const { request } = useHttp();

    const { data } = useQuery(
        ['get Data',],
        () => {
            return request({
                url: '/v1/categories/list',
                token: true,
            })
        },
        {
            onSuccess: res => {},
            onError: err => console.log(err)
        }
    )
    return (
        <Form.Item
            name={name}
            valuePropName='select'
            rules={[
                {
                    required: true,
                    message: `Iltimos barcha ma'lumotlarni kiriting`
                },
            ]}
        >
            <Select
                placeholder={placeholder}
                // optionFilterProp="children"
            >
                {
                    data?.data?.map(value => {
                        return <Select.Option
                            value={value.id}
                            key={value.id}
                        >
                            {value.name}
                        </Select.Option>
                    })
                }

            </Select>
        </Form.Item>
    );
}
export default AntdSelect;