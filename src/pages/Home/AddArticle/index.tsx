import { useState } from "react"
import ReactMarkdown from "react-markdown"
import TextareaAutosize from 'react-textarea-autosize'
//发布新文章
function AddArticle() {
    /*     function addArticleFunc() {
            addArticleApi()
        }
    
        const handleSubmit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            event.preventDefault(); // 阻止默认行为
        }; */
    const [markdown, setMarkdown] = useState('')
    const handleInputChange = (e: any) => {
        setMarkdown(e.target.value)
    }
    return (
        <>

            {/* <button onClick={addArticleFunc}>点击上传新文章</button> */}
            <form action="http://127.0.0.1/blog/add" method="POST" encType="multipart/form-data">
                <input type="file" name="cover_img" />
                <input type="text" name="title" placeholder="文章名" />
                {/* <input type="text" name="content" placeholder="文章内容" /> */}
                {/* <textarea name="content" rows={10} cols={50} /> */}
                <TextareaAutosize
                    value={markdown}
                    onChange={handleInputChange}
                    placeholder="在此处输入Markdown文本..."
                    minRows={3}
                    name="content"
                />
                <ReactMarkdown>{markdown}</ReactMarkdown>
                <input type="text" name="state" placeholder="已发布or草稿" />
                <input type="text" name="cate_id" placeholder="所属文章类别" />
                <button type="submit">提交</button>
            </form>
        </>
    )
}

const App: React.FC = () => {
    return (
        <>
            <h1>你好</h1>
            <AddArticle />
        </>
    )
}

export default App