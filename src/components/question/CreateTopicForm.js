import React, {useState} from 'react';
import { Form, Input, InputNumber, Button, Radio, Select } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { host } from '../../config';
import { handleError } from '../../utils';

const Option = Select.Option;

const token = Cookies.get('token');

function CreateOptionForm({form, setTime, setCreateTopicModal, issueId}) {

    let [type, setType] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if(!err) {
                const {
                    type,
                    title,
                    number,
                    required
                } = values;
                const create = Date.now();
                axios({
                    method: 'post',
                    url: `${host}/api/question/topic`,
                    headers: {
                        'Authorization': `Berear ${token}`
                    },
                    data: {
                        type,
                        title,
                        number,
                        required,
                        issue_id: issueId,
                    }
                }).then(r => {
                    const { code, data } = r.data;
                    if(code === 0) {
                        console.log('create~~~topic', r.data);
                        setTime(create);
                        setCreateTopicModal(false);
                    }
                }).catch(e => {
                    handleError(e);
                })
            }
        })
    }

    const handleTypeChange = (type) => {
        console.log('type', type);
        setType(type);
    }

    const { getFieldDecorator } = form;

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Item
                label="题号"
                hasFeedback
            >
                {
                    getFieldDecorator('number', {
                        rules: [{ required: true, message: '请输入题号!' }],
                      })(
                        <Input placeholder="题号" />
                      )
                }
            </Form.Item>
            <Form.Item
                label="选择题型"
                hasFeedback
            >
                {getFieldDecorator('type', {
                    rules: [
                    { required: true, message: '请选择题型' },
                    ],
                })(
                    <Select 
                        placeholder="请选择一个题型"
                        onChange={handleTypeChange}
                    >
                        <Option value="choice">单选题</Option>
                        <Option value="selector">下拉选择</Option>
                        <Option value="placepicker">城市选择</Option>
                        <Option value="multiselector">多选题</Option>
                        <Option value="input">问答题</Option>
                    </Select>
                )}
            </Form.Item>
            {
                type === 'choice' || type === 'multiselector' ? 
                <Form.Item
                    label="其他选项值"
                >
                    {getFieldDecorator('otherValue', { initialValue: 5 })(
                        <InputNumber min={1} max={10} />
                    )}
                </Form.Item> : ''
            }
            {
                type === 'multiselector' ? 
                <Form.Item
                    label="最多选择个数(默认不限)"
                >
                    {getFieldDecorator('multi', { initialValue: 3 })(
                        <InputNumber min={2} max={10} />
                    )}
                </Form.Item> : ''
            }
            {
                type === 'input' ? 
                <Form.Item
                    label="是否为textarea"
                >
                    {getFieldDecorator('textarea', {
                            initialValue: '0'
                        })(
                        <Radio.Group>
                            <Radio value="0">不是</Radio>
                            <Radio value="1">是</Radio>
                        </Radio.Group>
                    )}
                </Form.Item> : ''
            }
            {
                type === 'input' ? 
                <Form.Item
                    label="(如果需要根据答案展示)请选择相应的题号和值"
                >   
                    <span style={{paddingLeft: '20px'}}>题号：</span>
                    {getFieldDecorator('follow_number', { initialValue: 1 })(
                        <InputNumber  />
                    )}
                    <span style={{paddingLeft: '20px'}}>值：</span>
                    {getFieldDecorator('follow_value', { initialValue: 1 })(
                        <InputNumber />
                    )}
                </Form.Item> : ''
            }
            <Form.Item
                label="题目"            
                hasFeedback
            >
                {
                    getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入题目!' }],
                      })(
                        <Input placeholder="题目" />
                      )
                }
            </Form.Item>
            <Form.Item
                label="是否必须"
            >
                {getFieldDecorator('required', {
                        rules: [{ required: true, message: '请输入题号!' }],
                    })(
                    <Radio.Group>
                        <Radio value="0">非必须</Radio>
                        <Radio value="1">必须</Radio>
                    </Radio.Group>
                )}
            </Form.Item>
            <Button 
                type="primary"
                htmlType="submit"
                style={{
                    width: '100%'
                }}
            >
                添加题目
            </Button>
        </Form>
    )
}

const WrappedForm = Form.create({name: 'create_option_form'})(CreateOptionForm);

export default WrappedForm;