import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { host } from '../../config';

const token = Cookies.get('token');

function CreateIssueForm({form, setTime, setCreateIssueModal}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if(!err) {
                const {title, issue} = values;
                const create = Date.now();
                axios({
                    method: 'post',
                    url: `${host}/api/question/issue`,
                    headers: {
                        'Authorization': `Berear ${token}`
                    },
                    data: {
                        title,
                        issue,
                        create,
                    }
                }).then(r => {
                    const { code, data } = r.data;
                    if(code === 0) {
                        console.log('create~~~issue', r.data);
                        setTime(create);
                        setCreateIssueModal(false);
                    }
                }).catch(e => {
                    if(!e.response) message.error(e.message);
                    else {
                        const { data } = e.response;
                        message.error(data.msg);
                    }
                })
            }
        })
    }

    const { getFieldDecorator } = form;

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Item>
                {
                    getFieldDecorator('issue', {
                        rules: [{ required: true, message: '请输入期号!' }],
                      })(
                        <Input placeholder="期号" />
                      )
                }
            </Form.Item>
            <Form.Item>
                {
                    getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入标题!' }],
                      })(
                        <Input placeholder="标题" />
                      )
                }
            </Form.Item>
            <Button 
                type="primary"
                htmlType="submit"
                style={{
                    width: '100%'
                }}
            >
                创建问卷
            </Button>
        </Form>
    )
}

const WrappedForm = Form.create({name: 'create_issue_form'})(CreateIssueForm);

export default WrappedForm;