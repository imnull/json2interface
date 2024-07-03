# @imnull/json2interface

转换`JSON`为类似的的`interface`类型

```sh
$ npm install -g @imnull/json2interface
$ j2i package.json

// @imnull/json2interface version 1.0.0
// created Wed Jul 03 2024 20:20:02 GMT+0800 (中国标准时间)

interface IPackageBin {
    j2i: string;
}

interface IPackageScripts {
    test: string;
    build: string;
}

interface IPackageRepository {
    type: string;
    url: string;
}

interface IPackageBugs {
    url: string;
}

interface IPackageDevDependencies {
    ts-node: string;
    typescript: string;
}

interface IPackage {
    name: string;
    version: string;
    description: string;
    main: string;
    bin: IPackageBin;
    scripts: IPackageScripts;
    repository: IPackageRepository;
    keywords: string[];
    author: string;
    license: string;
    bugs: IPackageBugs;
    homepage: string;
    devDependencies: IPackageDevDependencies;
}
```

## 自定义接口名称

`j2i`的第二个参数是对接口重命名，如果不输入该参数，则以文件名为基础为`interface`命名。

```sh
$ j2i package.json coupon

...
interface ICoupon {
    name: string;
    version: string;
    description: string;
    main: string;
    bin: ICouponBin;
    scripts: ICouponScripts;
    repository: ICouponRepository;
    keywords: string[];
    author: string;
    license: string;
    bugs: ICouponBugs;
    homepage: string;
    devDependencies: ICouponDevDependencies;
}
...
```