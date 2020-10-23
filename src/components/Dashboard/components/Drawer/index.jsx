import React from 'react';

import { CloseOutlined } from '@ant-design/icons';

import SlidingPlane from 'react-sliding-pane';

const Drawer = ({ isOpen, onClose }) => {

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
                <h1>Hello</h1>
            </SlidingPlane>
        </React.Fragment>
    )
}

export default Drawer;