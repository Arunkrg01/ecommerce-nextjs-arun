import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import dynamic from 'next/dynamic';
const UserComment = dynamic(() => import('../components/UserComment'), {
    loading: () => <div>Loading...</div>,
});



function UserReview(props) {
    const { data } = props
    const commentCall = () =>{
      props.commentCall()
    }

    return (
        <div>
            <Tabs
                defaultActiveKey="Comments"
                id="fill-tab-example"
                className="mb-3"
                fill
            >
                <Tab eventKey="Comments" title="Comments" className="black-text" style={{ color: "black" }}>
                    <UserComment data={data} commentCall={commentCall}/>
                </Tab>
                <Tab eventKey="Description" title="Description" className="black-text">
                    No Description Found
                </Tab>
                <Tab
                    eventKey="Additional Information"
                    title="Additional Information"
                    className="black-text"
                >
                    No Additional Information Found
                </Tab>
            </Tabs>
        </div>
    );
}

export default UserReview;