import React, {useState, useEffect } from 'react';
import './ArticleList.scss';
import { Link } from 'react-router-dom';
import { _loadArticleList } from '../../../backend/community';
import heartImg from '../img/heart.png'; 
import dialogImg from '../img/dialog.png';
import { Input } from 'reactstrap';

function ArticleList({match}) {

  const [list,setList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const load = ()=>{
    _loadArticleList()
        .then(res=>{
            res.data.sort((a,b)=>{
                let front = a.updated_at;
                let back = b.updated_at;
                if(front < back)
                    return 1;
                else if(front > back)
                    return -1;
                return 0;
            })
            setList(res.data);
            setSearchResult(res.data);
        }).catch(err=>{
            console.log(err.response);
        });
  }
  useEffect(()=>{ load(); }, []);

  const searchArticle = (text)=>{
    setSearchText(text);
    const result = list.filter((article)=>{
        return article.title.toLowerCase().includes(text.toLowerCase());
    });
    setSearchResult(result);
  }
    return (
        <div>
            <div className='community_board'>
                <div className="title-container">
                    <div className='title'>군토&군티 커뮤니티 게시판</div>
                    <div className='button_set'>
                    <Link to={`${match.url}/add`}><button>새 글쓰기</button></Link>
                    </div>
                </div>
                <div className='search_bar'>
                        <Input onChange={(e)=>{searchArticle(e.target.value)}} type='text' className='txt_field' placeholder='검색할 게시글 제목..'></Input>
                        {/* <div className='s_button'>검색</div> */}
                    </div>

            {searchResult.map((li) => {
                let u = li.url.split('/');
                let id = u[4];
                return (
                    <Link to={`${match.url}/${id}`}>
                        <div key={id} className='community_post'>
                            <div className='community_title'>{li.title}</div>
                            <div className='community_contents'>{li.content}</div>
                            <div className='community_statistics'>
                                <div className='community_comments'><img src={dialogImg} alt='dialogImg'></img>{li.question_comments.length}</div>
                                <div className='community_likes'><img src={heartImg} alt='heartImg'></img>{li.liked_user.length}</div>
                            </div>
                        </div>
                    </Link>
                )
            })}
            </div>
        </div>
    );
  }

  export default ArticleList;