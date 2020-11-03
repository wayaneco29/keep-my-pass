import React from 'react';

import SlidingPlane from 'react-sliding-pane';

import { CloseOutlined } from '@ant-design/icons';
import { Card, Input, Space, Button, Typography, notification } from 'antd';

import { firestore } from '../../../../firebase';

const { Paragraph } = Typography;

const root = {
    div: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}

const InfoPage = ({ isOpen, onClose, user, selectedAccount, setSelectedAccount, accounts, setAccounts }) => {
    const [isEditable, setIsEditable] = React.useState(false);
    const [credential, setCredential] = React.useState({ displayName: '', password: '' });
    const [loading, setLoading] = React.useState(false);

    const handleToggleEdit = () => setIsEditable(!isEditable);
    
    const handleChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        setCredential(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleCancel = () => {
        setCredential(selectedAccount);
        setIsEditable(false);
    }
    
    const handleSave = async () => {
        try {
            setLoading(true);
            const documentRef = firestore.doc(`users/EEf9NXQ2seaLlys0L1FF/${user.uid}/${selectedAccount.id}`);
            await documentRef.set(credential, { merge: true })

            const newList = [];

            accounts.forEach(account => {
                if (account.id === selectedAccount.id) {
                    const items = {
                        id: selectedAccount.id,
                        displayName: credential.displayName,
                        password: credential.password,
                        date: selectedAccount.date,
                    }
                    newList.push(items);
                    return;
                }

                newList.push(account);
            })

            setAccounts(newList);
            setIsEditable(false);
            notification.open({ message: 'Updated successfully.' })
            setLoading(false)
            onClose();  
        } catch (error) {
            notification.open({ message: error.messsage, className: "is-grey" });
            setLoading(false);
        }
    }

    const handleDelete = async () => {
        try {
            setLoading(true);
            const documentRef = firestore.doc(`users/EEf9NXQ2seaLlys0L1FF/${user.uid}/${selectedAccount.id}`);
            await documentRef.delete();
            const newList = accounts.filter(account => account.id !== selectedAccount.id);
            setAccounts(newList);
            setLoading(false)
            notification.open({ message: 'Deleted successfully.' })
            onClose();  
        } catch (error) {
            notification.open({ message: error.messsage, className: "is-grey" });
            setLoading(false);
        }
    }

    React.useEffect(() => {
        if (isOpen) {
            setCredential(selectedAccount)
        } else {
            setCredential({ displayName: '', password: '' })
            setSelectedAccount({});
        }
    }, [isOpen])

    return (
        <React.Fragment>
            <SlidingPlane isOpen={isOpen} onRequestClose={() => !loading && onClose()} width="100%" closeIcon={<CloseOutlined />} >
                <div>
                    <Card style={{ marginTop: '1.5rem', textTransform: 'capitalize' }}>
                        <Paragraph style={{ paddingBottom: '1rem', borderBottom: '1px solid #eee', fontWeight: 500, fontSize: '1rem', textAlign: 'center' }}>Show Details</Paragraph>
                        <Space direction="vertical" style={{ width: '100%',marginBottom: '1rem' }}>
                            <label>Display Name</label>
                            <Input 
                                size="large" 
                                
                                placeholder="Display Name" 
                                type="text"
                                name="displayName"
                                value={credential.displayName}
                                readOnly={!isEditable}
                                onChange={handleChange}
                                disabled={loading}
                                />
                        </Space>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <label>Password</label>
                            <Input.Password 
                                size="large" 
                                
                                placeholder="Password" 
                                type="password" 
                                name="password"
                                value={credential.password}
                                readOnly={!isEditable}
                                onChange={handleChange}
                                disabled={loading}
                                />
                        </Space>
                        <div style={root.div}>
                            {isEditable ? (
                                <Button 
                                    type="primary" 
                                    size="large" 
                                    style={{ width: '45%'}} 
                                    shape="round" 
                                    onClick={handleSave}
                                    disabled={loading}
                                >
                                    {loading ? 'SAVING...' : 'SAVE'}
                                </Button>
                            ) : (
                                <Button 
                                    type="primary" 
                                    size="large" 
                                    style={{ width: '45%'}} 
                                    shape="round" 
                                    onClick={handleToggleEdit}
                                    disabled={loading}
                                >
                                    EDIT
                                </Button>
                            )}
                            {isEditable ? (
                                <Button 
                                    type="danger" 
                                    size="large" 
                                    style={{ width: '45%'}} 
                                    shape="round" 
                                    onClick={handleCancel}
                                    disabled={loading}
                                >
                                    CANCEL
                                </Button>
                            ): (
                                <Button 
                                    type="danger" 
                                    size="large" 
                                    style={{ width: '45%'}} 
                                    shape="round"
                                    disabled={loading}
                                    onClick={handleDelete}
                                >
                                    {loading ? 'DELETING...' : 'DELETE'}
                                </Button>
                            )}
                        </div>
                    </Card>
                </div>
            </SlidingPlane>
        </React.Fragment>
    )
}

export default InfoPage;