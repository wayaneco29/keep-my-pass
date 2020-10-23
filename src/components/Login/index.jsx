import React from 'react';

import { CloseOutlined, UserOutlined, LockOutlined, UnlockOutlined, FontSizeOutlined, GoogleOutlined  } from '@ant-design/icons';
import { Input, Button, Typography, Card, Form  } from 'antd';

import SlidingPlane from 'react-sliding-pane';

const { Paragraph } = Typography;

function Login({ show, close, isLogin }) {

    return (
        <React.Fragment>
            <SlidingPlane
                isOpen={show}
                onRequestClose={close}
                width="100%"
                closeIcon={<CloseOutlined size="large" />}
            >
                <Card style={{ boxShadow: '-1px 1px 5px -2px rgba(0,0,0,0.4)'}}>
                    <Form>
                        {isLogin ? (
                            <React.Fragment>
                                <Paragraph 
                                    strong={true} 
                                    style={{ 
                                        paddingBottom: '1rem', 
                                        borderBottom: '1px solid #eee', 
                                        textAlign: 'center', 
                                        fontSize: '1rem' 
                                        }}
                                >
                                    SIGN IN
                                </Paragraph>
                                <Input 
                                    autoComplete="off" 
                                    size="large" 
                                    type="text" 
                                    placeholder="Email" 
                                    prefix={<UserOutlined />}  
                                    style={{ marginBottom: '1.2rem' }}
                                />
                                <Input 
                                    autoComplete="off" 
                                    size="large" 
                                    type="password" 
                                    placeholder="Password" 
                                    prefix={<LockOutlined />} 
                                    style={{ marginBottom: '1.2rem' }} 
                                />
                                <Button 
                                    shape="round" 
                                    type="primary" 
                                    size="large" 
                                    block={true} 
                                    style={{ margin: '10px 0px' }} 
                                    icon={<UnlockOutlined />} 
                                >
                                    SIGN IN
                                </Button>
                                <Paragraph 
                                    style={{ textAlign: 'center', margin: '0.7rem 0rem' }}
                                >
                                    OR USE
                                </Paragraph>
                                <Button 
                                    shape="round" 
                                    type="danger" 
                                    size="large" 
                                    block={true} 
                                    style={{ margin: '10px 0px' }} 
                                    icon={<GoogleOutlined />} 
                                >
                                    GMAIL
                                </Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Paragraph 
                                    strong={true} 
                                    style={{ 
                                        paddingBottom: '1rem', 
                                        borderBottom: '1px solid #eee', 
                                        textAlign: 'center', 
                                        fontSize: '1rem' }}
                                >
                                     REGISTER
                                </Paragraph>
                                <Input 
                                    autoComplete="off" 
                                    size="large" 
                                    type="text" 
                                    placeholder="Name" 
                                    prefix={<FontSizeOutlined />} 
                                    style={{ marginBottom: '1.2rem' }} 
                                />
                                <Input 
                                    autoComplete="off" 
                                    size="large" 
                                    type="text" 
                                    placeholder="Email" 
                                    prefix={<UserOutlined />}  
                                    style={{ marginBottom: '1.2rem' }}
                                />
                                <Input 
                                    autoComplete="off" 
                                    size="large" 
                                    type="password" 
                                    placeholder="Password" 
                                    prefix={<LockOutlined />} 
                                    style={{ marginBottom: '1.2rem' }} 
                                />
                                <Input 
                                    autoComplete="off" 
                                    size="large" 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    prefix={<LockOutlined />} 
                                    style={{ marginBottom: '1.2rem' }} 
                                />
                                <Button 
                                    shape="round"
                                    type="primary" 
                                    size="large" 
                                    block={true} 
                                    style={{ margin: '10px 0px' }} 
                                    icon={<UnlockOutlined />} 
                                >
                                    REGISTER
                                </Button>
                            </React.Fragment>
                        )}
                        
                    </Form>
                </Card>
            </SlidingPlane>
        </React.Fragment>
    )
}

export default Login;