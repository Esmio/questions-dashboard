import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';

import Issue from './Issue';
import Topic from './Topic';

const { TabPane } = Tabs;

function Question({}) {

    let [ activeKey, setActiveKey ] = useState('1')
    let [issueId, setIssueId] = useState();

    const callback = (key) => {
        setActiveKey(key)
    }
    return (
        <Tabs  
            activeKey={activeKey}
            defaultActiveKey="1" 
            onChange={callback}
            style={{
                height: 'calc(100vh - 160px)',                
            }}
        >
            <TabPane tab="问卷" key="1">
                <Issue
                    setActiveKey={setActiveKey}
                    setIssueId={setIssueId}
                />
            </TabPane>
            <TabPane tab="题目" key="2">
                <Topic
                    issue_id={issueId}
                />
            </TabPane>
        </Tabs>
    )
}

export default Question;