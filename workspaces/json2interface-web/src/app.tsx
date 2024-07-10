import { parse } from '@imnull/json2interface'
import { useState } from 'react'
import Markdown from 'react-markdown'
import './app.scss'

const formatCode = (code: string) => {
    return '```ts\n' + code + '\n```'
}

const defaultData = {
    name: "marvin",
    age: 18,
    address: {
        city: "北京",
        country: "中国"
    },
    hobby: ["eat", "sleep", "run"],
    pets: [
        {
            type: 'cat',
            name: '卡卡',
            age: 2
        },
        {
            type: 'cat',
            name: '石头',
            age: 1
        },
        {
            type: 'dog',
            name: '大碗',
            age: 5
        },
    ]
}

const defaultName = 'person'

export default () => {

    const [json, setJson] = useState(JSON.stringify(defaultData, null, '  '))
    const [name, setName] = useState(defaultName)
    const [markdown, setMarkdown] = useState(parse(name, JSON.parse(json)))

    return <div className="app">
        <div className="wrap left">
            <input
                type="text"
                placeholder="输入接口名..."
                className="input"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <textarea
                placeholder="输入JSON内容..."
                className="json-input"
                value={json}
                onChange={e => setJson(e.target.value)}
            />
        </div>
        <div className="wrap right">
            <div className="toolbar">
                <button
                    className="btn full"
                    onClick={() => {
                        try {
                            const result = parse(name, JSON.parse(json))
                            setMarkdown(result)
                        } catch (e: any) {
                            setMarkdown(`parse error: ${e.message}`)
                        }
                    }}
                >转换为接口</button>
                <button
                    className="btn"
                    onClick={() => {
                        navigator.clipboard.writeText(markdown)
                        alert('复制成功')
                    }}
                >复制代码</button>
            </div>
            <Markdown className="markdown">{formatCode(markdown)}</Markdown>
        </div>
    </div>
}