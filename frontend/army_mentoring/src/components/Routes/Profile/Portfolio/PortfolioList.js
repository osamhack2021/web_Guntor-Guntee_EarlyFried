import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./PortfolioList.scss";
import { UserContext } from '../../../../context/Context';
import { _loadPortfolio, _loadUser } from '../../../../backend/profile';

function PortfolioList({match, history}) {
  
  const [u, setU] = useContext(UserContext);
  const [portfolios, setPortfolios] = useState([]);
  const [other, setOther] = useState({});

  const getId = (url)=>{
    const t = url.split('/');
    return t[4];
  }

  const getUserId = ()=>{
    if(Object.keys(u).length == 0)
        return -1;
    return getId(u.url);
  }

  let isMe = false;
  let user;

  if(match.params.id == getUserId())
    isMe = true;

  if(isMe)
    user = u;
  else
    user = other;

  const load = ()=>{
    _loadUser(match.params.id)
    .then(res=>{
      setOther(res.data);

      const p = user.portfolio;
  
      Promise.all(
        p.map((url)=>{
          const p_id = getId(url);
          return _loadPortfolio(p_id)
                  .then(res=>{
                    return { portfolio : res.data, pid : p_id }
                  })
        })
      )
      .then(res=>{
        setPortfolios(res);
      })
      .catch(err=>{
        console.log(err.response);
      })
    })
    .catch(err=>{
      console.log(err.response);
    })
  }

  useEffect(()=>{load();}, [user]);

  return (
    <div>
      <div className='port_title_2'>{isMe ? '내 포트폴리오' : user.username+'의 포트폴리오' }</div>
      <div className="portfolio-body">
        {
          portfolios.map((p)=>{
            return (
            <div className="portfolio">
              <div className="text-column">
                <div className="title">{p.portfolio.title}</div>
                <div className="title">{p.portfolio.de}</div>
                <Link to={`${match.url}/${p.pid}`} className="link">자세히 보기</Link>
              </div> 
            </div>
            ) 
          })
        }
        <div className='button_body'>
            <div onClick={()=>{history.goBack()}} className="button_cancel">뒤로</div>
            <Link to={`${match.url}/add`} className="button_confirm">추가</Link>
        </div>
      </div>
    </div>
  );
}

export default PortfolioList;