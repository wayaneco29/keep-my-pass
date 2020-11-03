import React from 'react';

import { CloseOutlined } from '@ant-design/icons';

import SlidingPlane from 'react-sliding-pane';
import { Input, Typography, Card, Button, notification } from 'antd'

import { firestore } from '../../../../firebase';

import { DateTime as DT } from 'luxon';

const { Paragraph } = Typography;


const Create = ({ isOpen, onClose, user, setRefresh }) => {
    const [credentials, setCredentials] = React.useState({  displayName: '', password: '' });
    const [loading, setLoading] = React.useState(false);

    const handleChange = (event) => {
        event.persist();
        const { name, value } = event.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            if (!credentials.displayName) {
                notification.open({ message: 'Please enter the Display Name.', className: 'grey' })
                return;
            }

            if (!credentials.password) {
                notification.open({ message: 'Please enter a password.', className: 'grey' });
                return;
            }

            setLoading(true);
            const documentRef = firestore.collection(`users/EEf9NXQ2seaLlys0L1FF/${user.uid}`).doc();
            await documentRef.set({
                ...credentials,
                date: DT.local().toUTC().toISO(),
            });
            setRefresh(prev => ({ ...prev }));
            setCredentials({  displayName: '', password: '' })
            notification.open({ message: 'Registered successfully.' });
            onClose();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <SlidingPlane 
            isOpen={isOpen}
            onRequestClose={() => {
                if (!loading) {
                    onClose();
                }
            }}
            width="100%"
            closeIcon={<CloseOutlined />}
        >
            <Card>
                <Paragraph style={{ fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '1rem', textAlign: 'center', fontWeight: 500 }}>
                    CREATE
                </Paragraph>
                <div>
                    <label>Display Name</label>
                    <Input 
                        style={{marginTop: '6px' }} 
                        size="large" 
                        placeholder="Display Name"
                        type="text"
                        name="displayName"
                        value={credentials.displayName} 
                        onChange={handleChange} 
                        autoComplete="off"
                    />
                </div>
                <br />
                <div>
                    <label>Password</label>
                    <Input 
                        style={{marginTop: '6px' }} 
                        size="large"
                        placeholder="Password" 
                        type="text"
                        name="password"
                        value={credentials.password} 
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <br />
                <Button size="middle" size="large" shape="round" type="primary" block={true} onClick={handleSave} disabled={loading}>{loading ? 'SAVING...' : 'SAVE'}</Button>
            </Card>
        </SlidingPlane> 
    )
}

export default Create;