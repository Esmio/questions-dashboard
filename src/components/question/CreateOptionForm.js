import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { host } from '../../config';
import { handleError } from '../../utils';

const token = Cookies.get('token');

function CreateOptionForm({form, setTime, setCreateOptionModal, topicId}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if(!err) {
                const {text, value} = values;
                const create = Date.now();
                axios({
                    method: 'post',
                    url: `${host}/api/question/option`,
                    headers: {
                        'Authorization': `Berear ${token}`
                    },
                    data: {
                        text,
                        value,
                        topic_id: topicId,
                    }
                }).then(r => {
                    const { code, data } = r.data;
                    if(code === 0) {
                        console.log('create~~~option', r.data);
                        setTime(create);
                        setCreateOptionModal(false);
                    }
                }).catch(e => {
                    handleError(e);
                })
            }
        })
    }

    const { getFieldDecorator } = form;

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Item>
                {
                    getFieldDecorator('text', {
                        rules: [{ required: true, message: '请输入选项!' }],
                      })(
                        <Input placeholder="选项" />
                      )
                }
            </Form.Item>
            <Form.Item>
                {
                    getFieldDecorator('value', {
                        rules: [{ required: true, message: '请输入选项值!' }],
                      })(
                        <Input placeholder="选项值" />
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
                添加选项
            </Button>
        </Form>
    )
}

const WrappedForm = Form.create({name: 'create_option_form'})(CreateOptionForm);

export default WrappedForm;