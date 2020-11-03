import React from 'react';

import { useHistory } from 'react-router-dom';

import InfoPage from './components/Slider';
import Drawer from './components/Drawer';
import Create from './components/Create';

import { firebaseAuth, firestore } from '../../firebase';

import { MenuOutlined, RightOutlined, FrownOutlined, PlusOutlined } from '@ant-design/icons';
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
        minHeight: 'calc(100vh - 91px)',
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
        alignItems: 'center',
    },
    cardChild1: {
        flex: 4, 
        textAlign: 'left',
        textTransform: 'capitalize',
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
    },
    button: {
        position: 'fixed',
        right: '21px',
        bottom: '60px',
    }
}

const Dashboard = ({ user }) => {
    const history = useHistory();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [accounts, setAccounts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [isCreate, setIsCreate] = React.useState(false);
    const [refresh, setRefresh] = React.useState({});
    const [selectedAccount, setSelectedAccount] = React.useState({});

    const handleToggleOpen = () => setIsOpen(!isOpen);
    const handleToggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
    const handleToggleCreate = () => setIsCreate(!isCreate);

    const handleSignOut = async () => {
       await firebaseAuth.signOut();
       history.push('/');
    }

    React.useEffect(() => {
        if (!user) {
            history.push('/');
        } else {
            try {
                setLoading(true);
                const collectionRef = firestore.collection(`users/EEf9NXQ2seaLlys0L1FF/${user.uid}`).orderBy('date');
                collectionRef.get().then(async (collections) => {
                        const dataStorage = [];

                        collections.docs.forEach(doc => {
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
    }, [refresh]);

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
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 155px)' }}>
                        <Spin tip="Loading..." style={root.spinner}></Spin>
                    </div>
                ) : (
                    accounts && accounts.length ? (
                        accounts.map(account => (
                            <React.Fragment key={account.id}>
                                <Card onClick={handleToggleOpen} style={{ marginBottom: '1rem' }}>
                                    <div style={root.cardDiv} onClick={() => setSelectedAccount(account)}>
                                        <div style={root.cardChild1}>{account.displayName}</div>
                                        <div style={root.cardChild2}><RightOutlined /></div>
                                    </div>
                                </Card>
                            </React.Fragment>
                        ))
                    ) : (
                        <div style={{...root.spinner, marginTop: '3rem' }}>
                            <FrownOutlined style={{ fontSize: '8rem',color: '#818181' }}/>
                            <p style={{ color: '#818181', marginTop: '0.7rem', color: 'rgb(129, 129, 129)', fontSize: '1.2rem'}}>You haven't posted yet.</p>
                        </div>
                    )
                )}
            </div>
            <Button type="primary" shape="circle" size="large" icon={<PlusOutlined />} style={root.button} onClick={handleToggleCreate} />
            <footer  style={root.footer}>
                <p style={{ margin: 0 }}>Developed by: <a style={{ textDecoration: 'underline', color: 'white' }} href="https://www.facebook.com/Wayandanyael" target="_blank">Wayan Danyael Eco</a> &copy; 2020.</p>
            </footer>
            <InfoPage isOpen={isOpen} onClose={handleToggleOpen} user={user} selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} accounts={accounts} setAccounts={setAccounts} />
            <Drawer isOpen={isDrawerOpen} onClose={handleToggleDrawer} user={user} />
            <Create isOpen={isCreate} onClose={handleToggleCreate} user={user} setRefresh={setRefresh} />
        </React.Fragment>
    )
}

export default Dashboard;