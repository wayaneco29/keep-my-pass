import React from 'react';

import { CloseOutlined } from '@ant-design/icons';

import Image from '../../../../image/profile.png';

import SlidingPlane from 'react-sliding-pane';

const Drawer = ({ isOpen, onClose, user }) => {

    return (
        <React.Fragment>
            <SlidingPlane 
                isOpen={isOpen} 
                onRequestClose={onClose} 
                width="250px" 
                closeIcon={<CloseOutlined />} 
                from="left"
                overlayClassName={{
                    'slide-pane__header' :{
                        width: '0px !important',
                    }
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={user && user.photoURL || Image} alt="User Image" style={{ borderRadius: '50%', width: '100px', height: '100px' }}/>
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <p style={{ fontWeight: 500 }}>{user && user.displayName}</p>
                    <p style={{ fontWeight: 500 }}>{user && user.email}</p>
                </div>
            </SlidingPlane>
        </React.Fragment>
    )
}

export default Drawer;