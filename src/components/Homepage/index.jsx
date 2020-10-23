import React from 'react';

import { Button, Typography } from 'antd';
import { UnlockFilled } from '@ant-design/icons';
import Login from '../Login';

const { Paragraph, Text } = Typography;

const root = {
    Paragraph: {
      fontSize: '1.5rem',
      marginBottom: '0px',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    title: {
      alignSelf: 'flex-start',
      color: 'grey',
      fontWeight: 500,
    },
    subTitle: {
      color: '#a6a3a3',
      fontSize: '1rem',
    },
    Sub: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '0px',
    }
  }

const Homepage = ({ 
    show,
    isLogin,  
    handleToggleShow, 
    handleLoginShow,
    handleSignIn,
    handleGoogleSignIn,
    handleRegister,
}) => {

    return (
        <React.Fragment>
            <header className="App-header">
                <Paragraph style={root.Paragraph}>
                    <UnlockFilled style={{ fontSize: '6rem', color: '#4285F4' }} />
                    <Paragraph style={root.Sub}>
                        <Text style={root.title}>KEEP MY PASS</Text>
                        <small style={root.subTitle}>Trusted, Safe & Secured</small>
                    </Paragraph>
                </Paragraph> 
                <div>
                    <Button 
                        size="large" 
                        shape="round" 
                        type="primary" 
                        style={{ 
                            marginTop: '3rem', 
                            marginRight: '1rem', 
                            width: '109px' 
                        }} 
                        onClick={() => {
                            handleLoginShow(true);
                            handleToggleShow();
                        }}
                    >
                        SIGN IN
                    </Button>
                    <Button 
                        size="large" 
                        shape="round" 
                        type="primary" 
                        style={{ marginTop: '2rem' }} 
                        onClick={() => {
                            handleLoginShow(false);
                            handleToggleShow()
                        }}
                    >
                        REGISTER
                    </Button>
                </div>
                <Login 
                    show={show} 
                    close={handleToggleShow} 
                    isLogin={isLogin}
                    handleSignIn={handleSignIn}
                    handleGoogleSignIn={handleGoogleSignIn}
                    handleRegister={handleRegister}
                />
            </header>
        </React.Fragment>
    )
}

export default Homepage;