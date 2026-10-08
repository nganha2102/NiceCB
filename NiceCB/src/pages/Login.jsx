import { Button, Form, Input } from 'antd';

export default function Login() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className="items-center w-full flex justify-center h-screen bg-gray-100">
            <Form
                onFinish={onFinish}
                className="w-96 p-8 bg-white rounded-lg shadow-md"
            >
                <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"

                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
