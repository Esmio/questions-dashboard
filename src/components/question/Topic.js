import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Table, Button, Pagination, Radio, message, Modal } from 'antd';
import CreateOptionForm from './CreateOptionForm';
import CreateTopicForm from './CreateTopicForm';
import { host } from '../../config';
import { handleError } from '../../utils';

const user = Cookies.getJSON('user');
const token = Cookies.get('token');

function ChoiceOptions({_id, text, value, setTime}) {

    const deleteOption = (_id) => () =>  {
        axios({
            method: 'post',
            url: `${host}/api/question/option/remove`,
            headers: {
                'Authorization': `Berear ${token}`,
            },
            data: {
                option_id: _id
            }
        }).then(r => {
            const { code, data } = r.data;
            if(code === 0) {
                console.log('delete option', data);
                setTime(Date.now());
                message.success("删除成功！");
            }
        }).catch(e => {
            handleError(e)
        })
    }
    
    return (
        <div
            style={{
                height: '40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <div>
                <Radio 
                    disabled
                />
                <span>{text}</span>
                <span
                    style={{
                        fontSize: '12px',
                    }}
                >（value: {value}）</span>
            </div>
            <Button
                type="danger"
                size="small"
                onClick={deleteOption(_id)}
            >删除</Button>
        </div>
    )
}

function Topic({issue_id}) {

    let [topic, setTopic] = useState([]);
    let [time, setTime] = useState(null);
    let [addOptionModal, setAddOptionModal] = useState(false);
    let [addTopicModal, setAddTopicModal] = useState(false);
    let [curTopicId, setCurTopicId] = useState();
    
    useEffect(() => {
        axios({
            method: 'post',
            url: `${host}/api/question/topic/list`,
            data: {
                issue_id,
            }
        }).then(r => {
            const { code, data } = r.data;
            if(code === 0) {
                console.log('topic data', data);
                setTopic(data.list.map((item, index) => {
                    item.key = index;
                    return item;
                }));
            }
        }).catch(e => {
            handleError(e);
        })
    }, [issue_id, time])

    const typeDict = {
        'choice': '单选题',
        'selector': '下拉选择',
        'multiselector': '多选题',
        'input': '问答题',
        'placepicker': '城市选择',
    }

    const columns = [
        {
            title: '题号',
            dataIndex: 'number',
            key: 'number', 
            width: '100px'
        },
        {
            title: '必选',
            dataIndex: 'required',
            key: 'required',
            width: '120px',
            render: required => (
                <span
                    style={{
                        color: ['green', 'red'][required]
                    }}
                >
                    {['非必选', '必选'][required]}
                </span>
            )
        },
        {
            title: '题目',
            dataIndex: 'title',
            key: 'title',
            width: '200px',
        },
        {
            title: '题型',
            dataIndex: 'type',
            key: 'type',
            width: '120px',
            render: type => typeDict[type],
        },
        {
            title: '操作', 
            dataIndex: '_id', 
            key: '_id', 
            width: '160px',
            render: id => (
                <div>
                    <Button
                        size="small"
                        type="primary"
                        onClick={handleAddOptionModalShow(id)}
                    >添加</Button>
                    <Button
                        size="small"
                        type="danger"
                        style={{
                            marginLeft: '10px',
                        }}
                        onClick={handleDeleteTopic(id)}
                    >删除</Button>
                </div>
            ),
        },
    ];  
    // 删除题目
    const handleDeleteTopic = (id) => () => {
        axios({
            method: 'post',
            url: `${host}/api/question/topic/remove`,
            headers: {
                'Authorization': `Berear ${token}`
            },
            data: {
                topic_id: id,
            }
        }).then(r => {
            const {code, data} = r.data
            if(code === 0) {
                message.success('删除题目成功！')
                setTime(Date.now());
            }
        }).catch(e => {
            handleError(e);
        })
    }
    // 添加选项弹框
    const handleAddOptionModalShow = (id) => () => {
        setAddOptionModal(true);
        setCurTopicId(id);
    }
    // 添加题目弹框
    const handleAddTopicModalShow = () => {
        setAddTopicModal(true);
    }

    const _renderExpend = (record) => {
        const {
            options,
            type,
        } = record; 
        return options.map((item, index) => (
            <ChoiceOptions 
                key={index}
                setTime={setTime}
                {...item}
            />
        ))
    }

    return (
        <div
            style={{
                height: 'calc(100vh - 221px)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: '45px',
                }}
            >
                <Button
                    type="primary"
                    onClick={handleAddTopicModalShow}
                >
                    添加题目
                </Button>
            </div>
            <Table
                bordered
                columns={columns}
                expandedRowRender={record => _renderExpend(record)}
                dataSource={topic}
                pagination={false}
            />
            <Modal
                visible={addOptionModal}
                title="添加选项"
                footer={false}
                onCancel={() => setAddOptionModal(false)}
            >
                <CreateOptionForm
                    setTime={setTime}
                    setCreateOptionModal={setAddOptionModal}
                    topicId={curTopicId}
                />
            </Modal>
            <Modal
                visible={addTopicModal}
                title="添加题目"
                footer={false}
                onCancel={() => setAddTopicModal(false)}
            >
                <CreateTopicForm 
                    setTime={setTime}
                    setCreateTopicModal={setAddTopicModal}
                    issueId={issue_id}
                />
            </Modal>
        </div>
    )
}

export default Topic;