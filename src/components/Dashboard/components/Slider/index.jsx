import React from 'react';

import SlidingPlane from 'react-sliding-pane';

import { CloseOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Card, Input, Space, Button } from 'antd';

const root = {
    div: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}

const InfoPage = ({ isOpen, onClose }) => {
    const [isEditable, setIsEditable] = React.useState(false);

    const handleToggleEdit = () => setIsEditable(!isEditable);

    return (
        <React.Fragment>
            <SlidingPlane isOpen={isOpen} onRequestClose={onClose} width="100%" closeIcon={<CloseOutlined />} >
                <div>
                    <Card title="Facebook, Twitter Passwords Facebook, Twitter Passwords" style={{ marginTop: '1.5rem' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Input.Password 
                            size="large" 
                            bordered={false} 
                            placeholder="Password" 
                            type="password" 
                            value="1234567"
                            style={{ width: '100%', borderBottom: '1px solid #eee' }}
                            readOnly={!isEditable}
                        />
                    </Space>
                    <div style={root.div}>
                        {isEditable ? (
                            <Button 
                                type="primary" 
                                size="large" 
                                style={{ width: '45%'}} 
                                shape="round" 
                                onClick={handleToggleEdit}
                            >
                                SAVE
                            </Button>
                        ) : (
                            <Button 
                                type="primary" 
                                size="large" 
                                style={{ width: '45%'}} 
                                shape="round" 
                                icon={<EditOutlined />} 
                                onClick={handleToggleEdit}
                            >
                                Edit
                            </Button>
                        )}
                        {isEditable ? (
                            <Button 
                                type="primary" 
                                size="large" 
                                style={{ width: '45%'}} 
                                shape="round" 
                                onClick={handleToggleEdit}
                            >
                                Cancel
                            </Button>
                        ): (
                            <Button 
                                type="danger" 
                                size="large" 
                                style={{ width: '45%'}} 
                                shape="round" 
                                icon={<DeleteOutlined />}
                            >
                                Delete
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