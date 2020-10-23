import React from 'react';

import { useHistory } from 'react-router-dom';

import InfoPage from './components/Slider';

import { firebaseAuth, firestore } from '../../firebase';

import { MenuOutlined, RightOutlined, FrownOutlined, PlusOutlined } from '@ant-design/icons';
import Drawer from './components/Drawer';
import { Card, Button, Spin } from 'antd';

const root = {
    nav: {
        height: '2.86rem',
        width: '100%',
        padding: '0rem 1.2rem',
        background: '#4285F4',
        borderBottom: 0,
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    },
    spinner: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }
}

const Dashboard = ({ user }) => {
    const history = useHistory();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [accounts, setAccounts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    
    const handleToggleOpen = () => setIsOpen(!isOpen);
    const handleToggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    const handleSignOut = async () => {
       await firebaseAuth.signOut();
       history.push('/');
    }

    console.log(user)

    React.useEffect(() => {
        if (!user) {
            history.push('/');
        } else {
            try {
                setLoading(true);
                const collectionRef = firestore.collection(`users/${user.uid}/accounts`).orderBy('date');
    
                collectionRef.get().then((collections) => {
                    const dataStorage = [];
                    console.log(collections)
                    collections.forEach(doc => {
                        const item = {
                            ...doc.data(),
                            id: doc.id,
                        }
                        
                        dataStorage.push(item);
                    })

                    setAccounts(dataStorage);
                    setLoading(false);
                })
            } catch (error) {
                setLoading(false);
            }
        }
    }, []);


    return (
        <React.Fragment>
            <nav style={root.nav}>
                <div style={root.div}>
                    <MenuOutlined onClick={handleToggleDrawer} />
                    <div style={{ marginLeft: '0.6rem' }}>KEEP MY PASS</div>
                </div>
                <div>
                    {user && <Button shape="round" type="warning"ghost={true} onClick={handleSignOut}>SIGN OUT</Button>}
                </div>
            </nav>
            <div style={root.container}>
                {loading ? <Spin tip="Loading..." style={root.spinner}></Spin> : (
                    accounts && accounts.length ? (
                        accounts.map(account => (
                            <React.Fragment>
                                <Card onClick={handleToggleOpen}>
                                    <div style={root.cardDiv}>
                                        <div style={root.cardChild1}>{account.title}</div>
                                        <div style={root.cardChild2}><RightOutlined /></div>
                                    </div>
                                </Card>
                            </React.Fragment>
                        ))
                    ) : (
                        <div style={root.spinner}>
                            <FrownOutlined style={{ fontSize: '8rem',color: '#818181' }}/>
                            <p style={{ color: '#818181', marginTop: '0.7rem', color: 'rgb(129, 129, 129)', fontSize: '1.2rem'}}>You haven't posted yet.</p>
                        </div>
                    )
                )}
            </div>
            <Button type="primary" shape="circle" icon={<PlusOutlined />} />
            <footer  style={root.footer}>
                <p style={{ margin: 0 }}>Develop by: Wayan</p>
            </footer>
            <InfoPage isOpen={isOpen} onClose={handleToggleOpen} />
            <Drawer isOpen={isDrawerOpen} onClose={handleToggleDrawer} />
        </React.Fragment>
    )
}

export default Dashboard;