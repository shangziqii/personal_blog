### 创建项目

### 配置cors跨域

### 配置解析表单数据的中间件

### 初始化路由相关的中间件

### 初始化用户路由模块

### 配置全局错误中间件res.cc()



### 登录&注册

register（注册）

1. 配置中间件，对前端传来的数据进行验证是否符合规则
2. 判断用户注册的账号和密码是否为空（有了第一步可以省略该逻辑）
3. 对数据库进行连接查找，是否username重合
4. 对用户传递的密码进行加密处理
5. 以上步骤都进行完成，可以对该条用户数据进行插入

login（登录）

1. 检测前端传递的表单数据是否合法
2. 根据username查询用户的数据
3. 判断用户输入的password是否正确
4. 生成JWT的token字符串（方便以后用户个人中心的使用）


前端发送参数,后台接收数据为{}的情况
这是因为后台缺少了解析json的中间件

- 使用body-parser中间件来解析请求体
  app.use(bodyParser.json());

这里有一个问题:
如果文章的类别已经删除(删除信号),那么新增文章类别是可以进行覆盖的吧?未解决


## 接口信息：

### articate.js（文章分类对应接口）

- /blog/cates 获取文章的全部分类（现有的）
- /blog/addcates 新增文章分类 token
- /blog/deleteCateById/:id 删除对应id的文章分类 token
- /blog/cates/:id 根据id获取文章分类数据（一次性全部获取） 管理员获取 token（这里获取的文章为发布+草稿）
- /blog/updatecate id+classname更换文章的类名（这里存在一个逻辑问题就是跟换名字时，如果是已经删除了的文章类名，应该是可以进行覆盖的？） token
- /blog/getCate 根据id获取其对应的文章类名

### article.js（文章管理对应接口）

- /blog/add 发布新文章 token
- /blog/getArticle 获取全部（或者对应文章分类）的所有文章数据
- /blog/getText/Id(自定义) 根据Id获取对应文章的数据（单条获取）

### router.js（用户登录注册接口）

- /blog/login 用户进行登录（目前进行的设计：登录账号密码only one）登录成功后=>token存在本地进行后续的使用（10h）
- /blog/register 用户注册接口（暂时不需要）

### userinfo.js（用户个人信息管理接口）

- /userinfo 用户个人中心 token
- /update/avatar 更新用户头像（后续可以拓展为更新用户信息的唯一接口）token


### comment.js（用户发送对应文章评论，前缀/blog）

- //comment/publish 发送评论

`<ReactMarkdown>{content ? content : 'no...'}</ReactMarkdown>`

  
