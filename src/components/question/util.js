import { Parser } from 'json2csv';

import { places, ages } from './data/places';

export function convertResult(arr, topic) {
    const fields = topic.map((item, index) => {
        const { number, title } = item;
        return {
            label: `${number}.${title}`,
            value: number.toString(),
        }
    })
    fields.unshift({
        label: '提交时间',
        value: 'createTime'
    });
    fields.unshift({
        label: '用户ID',
        value: 'id',
    })
    const results = arr.map((item, index) => {
        const { create_time, uid, items } = item;
        const result = JSON.parse(items);
        const collect = {};
        collect['createTime'] = create_time;
        collect['id'] = uid;
        topic.map((item, index) => {
            const {
                type,
                number,
                options,
                other_value,
            } = item;
            const valueObj = result[number]
            if(type === 'choice') {
                let target_value = undefined;
                const {value} = valueObj
                if(value === other_value) target_value = valueObj.other;
                else {
                    const m = options.find(option => option.value === value);
                    target_value = m.text;
                }
                collect[number] = target_value;
            }
            if(type === 'selector') {
                const { value } = valueObj;
                const m = ages.find(option => option.value === value);
                collect[number] = m.text;
            }
            if(type === 'placepicker') {
                const { prov, city } = valueObj;
                const provObj = places.find(place => place.id === prov);
                const prov_name = provObj.name;
                const cityObj = provObj.cities.find(ci => ci.id === city);
                const city_name = cityObj.name;
                collect[number] = `${prov_name}，${city_name}`;
            }
            if(type === 'input' && !!valueObj) {
                const { value } = valueObj;
                collect[number] = value;
            }
            if(type === 'multiselector') {
                let target_value = '';
                const {value} = valueObj;
                value.map(v => {
                    if(other_value === v) target_value += valueObj.other;
                    else {
                        const m = options.find(option => option.value === v);
                        target_value += `${m.text};`;
                    }
                })
                collect[number] = target_value;
            }
        })
        return collect;
    })
    const json2csvParser = new Parser({fields});
    const csv = json2csvParser.parse(results);
    console.log('csv', csv);
    return {
        fields,
        results,
        csv,
    }
}

export function exportCsv (csv) {
    try {
        var link = document.createElement("a");
        // var csvContent = "data:text/csv;charset=GBK,\uFEFF" + csv;
        // var encodedUri = encodeURI(csvContent);
        // link.setAttribute("href", encodedUri);
        var blob = new Blob(["\ufeff" + csv], {type: 'text/csv'}); //解决大文件下载失败
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); // Required for FF
        link.click(); // This will download the data file named "my_data.csv".
        document.body.removeChild(link); // Required for FF
    } catch (err) {
        // Errors are thrown for bad options, or if the data is empty and no fields are provided.
        // Be sure to provide fields if it is possible that your data array will be empty.
        console.error(err);
    }
}

