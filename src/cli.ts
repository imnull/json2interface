#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { parse } from './index'

const main = () => {
    let [file, rename] = process.argv.slice(2)

    if(!file) {
        console.log('')
        console.log(`请输入要转换的JSON文件路径`)
        console.log('')
        return
    }

    const filename = path.resolve(process.cwd(), file)
    
    if(!fs.existsSync(filename)) {
        console.log('')
        console.log(`文件${file}不存在 (${filename})`)
        console.log('')
        return
    }

    if(!rename) {
        rename = path.basename(file).split('.').shift() || 'main'
    }
    
    // console.log(filename, rename)
    const json = fs.readFileSync(filename, 'utf-8')
    try {
        const data = JSON.parse(json)
        const result = parse(rename, data)
        console.log(result)
    } catch(ex) {
        console.log(`Failed:`, ex)
    }
}

main()