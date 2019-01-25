import {message} from 'antd';

export function handleError(e) {
    if(!e.response) message.error(e.message);
    else {
        const {data} = e.response;
        message.error(data.msg);
    }
}