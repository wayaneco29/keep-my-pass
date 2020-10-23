import React from 'react';

import { CloseOutlined, UserOutlined, LockOutlined, UnlockOutlined, FontSizeOutlined, GoogleOutlined  } from '@ant-design/icons';
import { Input, Button, Typography, Card, Form  } from 'antd';

import SlidingPlane from 'react-sliding-pane';

import { useHistory } from 'react-router-dom';

const { Paragraph } = Typography;

function Login({ 
    show, 
    close, 
    isLogin,
    handleSignIn,
    handleGoogleSignIn,
    handleRegister,
}) {
    const history = useHistory();
    const [signInCred, setSignInCred] = React.useState({
        email: '',
        password: '',
    })
    const [registerCred, setRegisterCred] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleSignInChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        setSignInCred(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegisterChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        setRegisterCred(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateEmail = new RegExp(/\S+@\S+\.\S+/);

    const handleValidateSignIn = async () => {
        const { email, password } = signInCred;

        if (!validateEmail.test(email)) {
            alert('INVALID EMAIL')
            return;
        }

        if (!password.length) {
            alert('PLEASE ENTER PASSWORD')
            return;
        }

        if (password.length < 6) {
            alert('PASSWORD MUST ATLEAST 6 CHARACTERS')
            return;
        }

        await handleSignIn(signInCred);
        history.push('/menu')
        close();
    }

    const handleValidateGoogleSignIn = async () => {
        await handleGoogleSignIn();
        history.push('/menu')
        close();
    }

    const handleValidateRegister = async () => {
        const { email, password, confirmPassword } = registerCred;

        if (!validateEmail.test(email)) {
            alert('INVALID EMAIL');
            return;
        }

        if (confirmPassword !== password) {
            alert('PASSWORD NOT MATCH');
            return;
        }

        await handleRegister(registerCred);
        history.push('/menu')
        close();
    }

    const clearAll = () => {
        setSignInCred({});
        setRegisterCred({})
    };

    React.useEffect(() => {
        clearAll()
    }, [show]);

    return (
        <React.Fragment>
            <SlidingPlane
                isOpen={show}
                onRequestClose={close}
                width="100%"
                from={isLogin ? 'left' : 'right' }
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
                                    name="email"
                                    placeholder="Email" 
                                    prefix={<UserOutlined />}  
                                    style={{ marginBottom: '1.2rem' }}
                                    value={signInCred['email']}
                                    onChange={handleSignInChange}
                                />
                                <Input 
                                    autoComplete="off" 
                                    size="large"
                                    name="password"
                                    type="password" 
                                    placeholder="Password" 
                                    prefix={<LockOutlined />} 
                                    style={{ marginBottom: '1.2rem' }} 
                                    value={signInCred['password']}
                                    onChange={handleSignInChange}
                                />
                                <Button 
                                    shape="round" 
                                    type="primary" 
                                    size="large" 
                                    block={true} 
                                    style={{ margin: '10px 0px' }} 
                                    icon={<UnlockOutlined />}
                                    onClick={handleValidateSignIn}
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
                                    onClick={handleValidateGoogleSignIn}
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
                                    name="name"
                                    placeholder="Name" 
                                    prefix={<FontSizeOutlined />} 
                                    style={{ marginBottom: '1.2rem' }}
                                    value={registerCred['name']}
                                    onChange={handleRegisterChange}
                                />
                                <Input 
                                    autoComplete="off" 
                                    size="large" 
                                    type="text" 
                                    name="email"
                                    placeholder="Email" 
                                    prefix={<UserOutlined />}  
                                    style={{ marginBottom: '1.2rem' }}
                                    value={registerCred['email']}
                                    onChange={handleRegisterChange}
                                />
                                <Input 
                                    autoComplete="off" 
                                    size="large" 
                                    type="password" 
                                    name="password"
                                    placeholder="Password" 
                                    prefix={<LockOutlined />} 
                                    style={{ marginBottom: '1.2rem' }}
                                    value={registerCred['password']}
                                    onChange={handleRegisterChange}
                                />
                                <Input 
                                    autoComplete="off" 
                                    size="large" 
                                    name="confirmPassword"
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    prefix={<LockOutlined />} 
                                    style={{ marginBottom: '1.2rem' }} 
                                    value={registerCred['confirmPassword']}
                                    onChange={handleRegisterChange}
                                />
                                <Button 
                                    shape="round"
                                    type="primary" 
                                    size="large" 
                                    block={true} 
                                    style={{ margin: '10px 0px' }} 
                                    icon={<UnlockOutlined />} 
                                    onClick={handleValidateRegister}
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