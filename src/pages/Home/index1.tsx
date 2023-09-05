import { addArtClassApi, deleteArtClassApi, getArticleApi, updateCateApi, addArticleApi } from "./api";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
//点击按钮添加文章类别
function AddArtClass() {
    function addArtClassFunc() {
        const data = {
            className: 'nihao'
        }
        addArtClassApi(data).then(({ data }) => {
            console.log(data);

        })
    }
    return (
        <>
            <button onClick={addArtClassFunc}>添加文章类别</button>
        </>
    )
}

//根据id删除对应的文章分类
function DeleteArtClass() {
    function deleteByClassId() {
        console.log("删除！");
        const id = 1
        deleteArtClassApi(id)
    }
    return (
        <>
            <button onClick={deleteByClassId}>点击删除id为1的文章分类</button>
        </>
    )
}

//点击文章的类别获取对应的数据展示
function GetArticle() {
    function getArticleById() {
        //获取数据
        getArticleApi(2)
    }
    return (
        <>
            <button onClick={getArticleById}>点击获取文章类别id=2的数据内容</button>
        </>
    )
}

//根据文章类别的id更新该文章类别的名称
function UpdateCate() {
    function updateCateById() {
        const data = {
            Id: 4,
            className: 'abcde'
        }
        updateCateApi(data)
    }
    return (
        <>
            <button onClick={updateCateById}>点击更新id为4的文章名(math)</button>
        </>
    )
}

//发布新文章
function AddArticle() {
    /*     function addArticleFunc() {
            addArticleApi()
        }
    
        const handleSubmit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            event.preventDefault(); // 阻止默认行为
        }; */
    return (
        <>

            {/* <button onClick={addArticleFunc}>点击上传新文章</button> */}
            <form action="http://127.0.0.1/blog/add" method="POST" encType="multipart/form-data">
                <input type="file" name="cover_img" />
                <input type="text" name="title" placeholder="文章名" />
                {/* <input type="text" name="content" placeholder="文章内容" /> */}
                <textarea name="content" rows={10} cols={50} />

                <input type="text" name="state" placeholder="已发布or草稿" />
                <input type="text" name="cate_id" placeholder="所属文章类别" />
                <button type="submit">提交</button>
            </form>
        </>
    )
}
export const MarkdownEditor = () => {
    const [text, setText] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    return (
        <div>
            <textarea value={text} onChange={handleChange} rows={10} cols={50} />
            <ReactMarkdown>{text}</ReactMarkdown>
        </div>
    );
};
function Home() {
    return (
        <>
            <h1>Markdown Editor</h1>
            <MarkdownEditor />
            <div>个人空间</div>
            <AddArtClass />
            <br />
            <DeleteArtClass />
            <br />
            <GetArticle />
            <br />
            <UpdateCate />
            <br />
            <AddArticle />
        </>
    )
}

export default Home