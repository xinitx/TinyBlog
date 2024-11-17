import express from 'express';
import * as fs from "fs";
import path from 'path'
import {pathToFileURL} from "url";
import serve from 'serve-static'
import multer from 'multer';
import bodyParser from 'body-parser';
import cors from 'cors';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
const isProduction = true;
const __dirname = process.cwd()
const app = express();


var corsOptions = {
    origin: "*"
};



// 用户登录成功后的处理逻辑
function generateToken(username) {
    const payload = { username: username};
    const secret = 'your_secret_key'; // 用于签名的密钥
    const options = { expiresIn: '1h' }; // 设置token的有效期为1小时

    return jwt.sign(payload, secret, options);
}
function authenticateToken(req, res, next) {
    //console.log(req.headers)
    const authHeader = req.headers['authorization'];
    //console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]; // 获取token部分

    if (token == null) return res.sendStatus(401); // 如果没有token，则返回401状态码

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) return res.sendStatus(403); // 如果验证失败，返回403状态码
        req.user = user; // 将解码后的用户信息附加到请求对象上
        next(); // 继续执行后续的路由处理函数
    });
}
app.use(cors(corsOptions));

// content-type：application/json
app.use(bodyParser.json());

// content-type：application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// 设置Multer存储配置
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log(222)
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        //console.log(333)
        cb(null, `${Date.now()}`);
    }
});
const upload = multer({ storage: storage });

// 创建上传目录
const dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


app.get("/api/md", (req, res) => {
    const filePath = path.join(__dirname, 'README_ZH.md');
    //console.log(filePath)
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            //console.error('读取文件时出错:', err);
            res.status(500).json({ error: '读取文件时出错' });
            return;
        }

        //console.log('Markdown 内容:');
        //console.log(data);
        // 返回 Markdown 内容或 HTML 内容
        res.json({ markdown: data});
    });
});
app.get("/api/article/:id", (req, res) => {
    const filePath = path.join(__dirname, 'articles/'+req.params.id+'.md');
    //console.log(filePath)
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            //console.error('读取文件时出错:', err);
            res.status(500).json({ error: '读取文件时出错' });
            return;
        }

        //console.log('Markdown 内容:');
        //console.log(data);
        // 返回 Markdown 内容或 HTML 内容
        res.send(data);
    });
});
app.get("/api/summaries", (req, res) => {

    const summariesDir = path.join(__dirname, 'summaries');
    // 读取目录内容
    fs.readdir(summariesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: '无法读取目录' });
        }
        // 读取每个文件的内容
        const filePromises = files.map(file => {
            const filePath = path.join(summariesDir, file);
            return fs.promises.readFile(filePath, 'utf8').then(content => {
                let title = '';
                let summary = '';
                let tags = [];
                let category = [];
                title = content.match(/title:(.*?)\n/).map(e => e.trim())[1]
                //console.log('title:', title)
                tags = content.match(/tags:(.*?)\n/)[1].split(",").map(e => e.trim())
                //console.log('tags:', tags)
                category = content.match(/category:(.*?)\n/)[1].split(',').map(e => e.trim())
                //console.log('category:', category)
                summary = content.split('---').length > 1 ? content.split('---')[1].trim() : '';
                //console.log('summary:', summary)
                const basename = path.basename(file)
                const extname = path.extname(file)
                const id = basename.slice(0, -extname.length)
                return ({
                    id: id,
                    title: title ? title : "NO Title",
                    summary: summary ? summary : "NO Summary",
                    tags: tags,
                    category: category,
                })
            });
        });

        // 等待所有文件读取完成
        Promise.all(filePromises)
            .then(filesContent => {
                //console.log(filesContent)
                res.send(filesContent);
            })
            .catch(err => {
                res.status(500).json({ error: err, info:"读取文件时出错"});
            });
    });
});


// 定义路由
app.post('/api/uploadImage',authenticateToken,upload.single('image/*'), (req, res) => {
    //console.log(111)
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const originalFilePath = `./uploads/${req.file.filename}`; // 原始文件路径

// 替换文件扩展名为 .webp
    const newFilePath = path.join(
        path.dirname(originalFilePath),
        path.basename(originalFilePath, path.extname(originalFilePath)) + '.webp'
    );
    sharp(originalFilePath)
        .toFormat('webp') // 转换为 WebP 格式
        .toFile(newFilePath) // 保存到指定路径
        .then(info => {
            //console.log('图片已成功转换为 WebP 格式:', info);
            const fileUrl = `https://init33.top/api/uploads/${path.basename(newFilePath)}`;
            res.send({ url: fileUrl });
        })
        .catch(err => {
            //console.error('转换过程中发生错误:', err);
        });

});
app.get("/api/songs", (req, res) => {
    const summariesDir = path.join(__dirname, 'uploads/music');
    const songs = []
    // 读取目录内容
    fs.readdir(summariesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: '无法读取目录' });
        }
        //console.log(files)
        files.forEach((file, index) => {
            const info = file.split('-')
            songs.push({
                title: info[0],
                artist: info[1],
                url: `https://init33.top/api/uploads/music/${file}`,
                id: index
            })
        })
        //console.log("songs", songs)
        res.send(songs)
    })
});
// 定义路由
app.post('/api/uploadArticle', authenticateToken, (req, res) => {
    //console.log(req.body)
    let id = Date.now()
    if(req.body.id !== "0"){
        id = req.body.id
    }

    let parts = req.body.articleContent.split(`<!--more-->`);

    const date = parts[0].match(/date:(.*?)\n/)
    if(date && date[1].trim()){
        let time = date[1].trim().replace(' ', 'T')
        console.log(time)
        let finaldate = new Date(time)
        if(!isNaN(finaldate)){
            id = finaldate.getTime()
        }
    }
    console.log(id)
    fs.writeFileSync(`./summaries/${id}.md`, parts[0]);
    fs.writeFileSync(`./articles/${id}.md`, req.body.articleContent);
    res.send(true);
});


app.post('/api/deleteArticle/:id', authenticateToken, (req, res) => {

    const sourcePath = path.join(__dirname, 'articles', '/'+req.params.id+'.md');
    const destinationPath = path.join(__dirname, 'trash', '/'+req.params.id+'.md');
    const filePath = path.join(__dirname, 'summaries', '/'+req.params.id+'.md');

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('删除文件时出错:', err);
            res.send(false);
            return;
        }
        console.log('文件已成功删除');
        // 确保目标文件夹存在
fs.mkdir(path.dirname(destinationPath), { recursive: true }, (err) => {
    if (err) {
        console.error('创建目标文件夹时出错:', err);
        res.send(false);
        return;
    }

    fs.rename(sourcePath, destinationPath, (err) => {
        if (err) {
            console.error('移动文件时出错:', err);
            res.send(false);
            return;
        }
        console.log('文件已成功移动到', destinationPath);
        res.send(true);
    });
});
    });



});
app.post('/api/login', (req, res) => {
    //console.log(req.body)
    if(!req.body.password){
        res.send(false);
    }
    const toekn = generateToken(req.body.username);
    if(req.body.password === "Init0.61833"){
        res.send(toekn);
    }else{
        res.send(false);
    }

});
// 静态文件服务
app.use('/api/uploads', express.static('uploads'));


//过滤出页面请求
function matchPageUrl(url){
    if (!url.includes('.') && url.startsWith('/')){
        return true;
    }
    return false;
}

// src/ssr-server/index.ts
function resolveTemplatePath() {
    console.log(__dirname)
    return isProduction ?
        pathToFileURL(path.join(__dirname, 'dist/client/index.html')) :
        path.join(__dirname, 'index.html');
}
async function loadSsrEntryModule(vite) {
    // 生产模式下直接 require 打包后的产物
    if (isProduction) {
        const entryPath = pathToFileURL(path.join(__dirname, 'dist/server/entry-server.js'));
        return import(entryPath);
    }
    // 开发环境下通过 no-bundle 方式加载
    else {
        const entryPath = path.join(__dirname, 'src/entry-server.tsx');
        return vite.ssrLoadModule(entryPath);
    }
}
export async function fetchData() {
    return { user: 'xxx' }
}
async function createSsrMiddleware(app) {
    let vite = null;

    if (!isProduction) {
        vite = await (await import('vite')).createServer({
            root: __dirname,
            server: {
                middlewareMode: 'ssr',
            }
        })
        // 注册 Vite Middlewares
        // 主要用来处理客户端资源
        app.use(vite.middlewares);
    }
    return async (req, res, next) => {
        try{
            const url = req.originalUrl;
            console.log(url)
            if (!matchPageUrl(url)){

                //走静态资源的处理
                return await next();
            }
            // SSR 的逻辑
            // 1. 加载服务端入口模块
            const { ServerEntry } = await loadSsrEntryModule(vite);
            // 2. 数据预取
            const data = await fetchData();
            // 3. 「核心」渲染组件
            const appHtml = await ServerEntry(url);
            // 4. 拼接 HTML，返回响应
            const templatePath = resolveTemplatePath();
            let template = fs.readFileSync(templatePath, 'utf-8');
            // 开发模式下需要注入 HMR、环境变量相关的代码，因此需要调用 vite.transformIndexHtml
            if (!isProduction && vite) {
                template = await vite.transformIndexHtml(url, template);
            }
            const html = template
                .replace('<!-- SSR_APP -->', appHtml)
                // 注入数据标签，用于客户端 hydrate
                .replace(
                    '<!-- SSR_DATA -->',
                    `<script>window.__SSR_DATA__=${JSON.stringify(data)}</script>`
                );
            res.status(200).setHeader('Content-Type', 'text/html').end(html);
        }catch (e){
            vite?.ssrFixStacktrace(e);
            console.error(e);
            res.status(500).end(e.message);
        }
    };
}

async function createServer() {
    // 加入 Vite SSR 中间件
    console.log(isProduction)
    app.use(await createSsrMiddleware(app));
    if (isProduction) {
        app.use(serve(path.join(__dirname, 'dist/client')))
    }
    app.listen(8088, () => {
        console.log('Node 服务器已启动~')
    });
}
createServer();