import React from 'react';

import InfoPage from './components/Slider';

import { MenuOutlined, RightOutlined } from '@ant-design/icons';

import { Card } from 'antd';
import Drawer from './components/Drawer';

const root = {
    nav: {
        height: '2.86rem',
        width: '100%',
        padding: '0rem 1.2rem',
        background: '#4285F4',
        borderBottom: 0,
        position: 'relative',
    },
    div: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        color: '#eee',
    },
    container: {
        width: '100%',
        height: 'calc(100vh - 91px)',
        padding: '2rem 1rem',
    },
    footer: {
        border: 'none',
        height: '2.86rem',
        width: '100%',
        background: '#4285f4',
        color: '#eee',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardDiv: {
        display: 'flex',
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    cardChild1: {
        flex: 4, 
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    cardChild2: {
        borderLeft: '1px solid #eee',
        flex: '1 1 0%',
        position: 'relative',
        right: '-17px',
    }
}

const Dashboard = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    
    const handleToggleOpen = () => setIsOpen(!isOpen);
    const handleToggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    return (
        <React.Fragment>
            <nav style={root.nav}>
                <div style={root.div}>
                    <MenuOutlined onClick={handleToggleDrawer} />
                    <div style={{ marginLeft: '0.6rem' }}>KEEP MY PASS</div>
                </div>
            </nav>
            <div style={root.container}>
                <Card onClick={handleToggleOpen}>
                    <div style={root.cardDiv}>
                        <div style={root.cardChild1}>Facebook, Twitter PasswordsFacebook, Twitter Passwords</div>
                        <div style={root.cardChild2}><RightOutlined /></div>
                    </div>
                </Card>
                <Card onClick={handleToggleOpen}>
                    <div style={root.cardDiv}>
                        <div style={root.cardChild1}>Facebook, Twitter Passwords</div>
                        <div style={root.cardChild2}><RightOutlined /></div>
                    </div>
                </Card><Card onClick={handleToggleOpen}>
                    <div style={root.cardDiv}>
                        <div style={root.cardChild1}>Facebook, Twitter Passwords</div>
                        <div style={root.cardChild2}><RightOutlined /></div>
                    </div>
                </Card><Card onClick={handleToggleOpen}>
                    <div style={root.cardDiv}>
                        <div style={root.cardChild1}>Facebook, Twitter Passwords</div>
                        <div style={root.cardChild2}><RightOutlined /></div>
                    </div>
                </Card><Card onClick={handleToggleOpen}>
                    <div style={root.cardDiv}>
                        <div style={root.cardChild1}>Facebook, Twitter Passwords</div>
                        <div style={root.cardChild2}><RightOutlined /></div>
                    </div>
                </Card>
            </div>
            <footer  style={root.footer}>
                <p style={{ margin: 0 }}>Aw</p>
            </footer>
            <InfoPage isOpen={isOpen} onClose={handleToggleOpen} />
            <Drawer isOpen={isDrawerOpen} onClose={handleToggleDrawer} />
        </React.Fragment>
    )
}

export default Dashboard;