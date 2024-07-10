import { parse } from '@imnull/json2interface'
import { useState } from 'react'
import Markdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import './app.scss'

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
    const [code, setCode] = useState(parse(name, defaultData))

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
                            setCode(result)
                        } catch (e: any) {
                            setCode(`parse error: ${e.message}`)
                        }
                    }}
                >转换为接口</button>
                <button
                    className="btn"
                    onClick={() => {
                        navigator.clipboard.writeText(code)
                        alert('复制成功')
                    }}
                >复制代码</button>
            </div>
            <SyntaxHighlighter language="typescript">{code}</SyntaxHighlighter>
        </div>
    </div>
}