import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { message, Button } from 'antd';
import { host } from '../../config';
import { handleError } from '../../utils';

const token = Cookies.get('token');

function SelectorOptions({_id, text, value, setTime}) {

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

export default SelectorOptions;