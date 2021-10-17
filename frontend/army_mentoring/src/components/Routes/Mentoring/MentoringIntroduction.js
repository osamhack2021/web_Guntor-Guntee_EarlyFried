import React, { useState, useEffect } from 'react';
import './MentoringIntroduction.scss';
import Subnavbar from '../Subnavbar';
import { _loadMentoring, _loadAssignment, _loadMentoringReviewList } from '../../../backend/mentoring';
import { _loadUser } from '../../../backend/profile';
import { Link } from 'react-router-dom';

function MentoringIntroduction({match, history}){

    const mentoring_id = match.params.id;
    const menu = 
    [
        {id:'home', desc:'홈'},
        {id:'mentorintro', desc:'멘토 소개'},
        {id:'assignmentintro', desc:'과제 소개'},
        {id:'plan', desc:'세부 일정'},
        {id:'review', desc:'후기'}
    ]

    const getId = (url)=>{
        const t = url.split('/');
        return t[4];
    }

    const getMentorId = (url)=>{
        if(url == undefined)
            return -1;
        return getId(url);
    }

    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}, []
    );

    const [mentoring, setMentoring] = useState({
        tags : [],
        assignments : []
    });
    const [mentor, setMentor] = useState({});
    const [assignments, setAssignments] = useState([]);
    const [mentoringReviews, setMentoringReviews] = useState([]);
    const load = ()=>{
        _loadMentoring(mentoring_id)
        .then(res=>{
            setMentoring(res.data);

            Promise.all(
                res.data.assignments.map((a)=>{
                    return _loadAssignment(getId(a))
                            .then(res=>{
                                return res.data;
                            })
                            .catch(err=>{
                                console.log(err.response);
                            })
                })
            )
            .then(res=>{
                setAssignments(res);
            })
            .catch(err=>{console.log(err.response)})

            _loadMentoringReviewList()
            .then(r=>{
                const filtered_array = r.data.filter((review)=>{return getId(review.mentor) == getId(res.data.mentor)})
                Promise.all( 
                    filtered_array.map((el)=>{
                        return _loadUser(getId(el.mentee))
                                .then(res=>{
                                    return { mentee : res.data, review: el }
                                })
                    })
                )
                .then(res=>{
                    setMentoringReviews(res);
                    console.log(res);
                })
            })
            .catch(err=>{console.log(err.response)})

            let mentor_id = getId(res.data.mentor);
            _loadUser(mentor_id)
            .then(res=>{
                setMentor(res.data);
            })
            .catch(err=>{console.log(err.response)})
        })
        .catch(err=>{console.log(err.response)})
    }
    useEffect(()=>{
        load();
    }, []);


    return (
        <div className='mentoring-introduction-body'>           
            
            <div className="header">
                <div className='header-mentor'>
                    <div className='mentor-thumbnail'></div>
                    <Link to={`/profile/${getMentorId(mentor.url)}`} className='mentor-name'>{mentor.username}</Link>
                    <Link to={`/profile/${getMentorId(mentor.url)}/portfolio`} className='mentor-portfolio'>포트폴리오 보러 가기</Link>
                </div>
                <div className='header-content'>
                    <div className='header-title'>{mentoring.title}</div>
                    <div className='header-tags'>
                        {
                            mentoring.tags.map((t)=>{
                                return (<div className='tag'>{'#'+t.name}</div>)
                            })
                        }
                    </div>
                </div>
            </div>

            <div className='content'>
                <div className="mentoring-introduction">
                    <div className='section-title'>멘토링 소개</div>
                    <div>{mentoring.description}</div>
                </div>

                <div className="assignments">
                    <div className='section-title'>과제 소개</div>
                    <div className='assignment-box'>
                        {
                            assignments.map((a)=>{
                                return (<div className='assignment'>
                                            <div>제목 : {a.title}</div>
                                            <div>내용 : {a.content}</div>
                                        </div>)
                            })
                        }
                    </div>
                </div>

                <div className="mentoring-reviews">
                    <div className='section-title'>후기</div>
                    <div>
                        {
                            mentoringReviews.map((r)=>{
                                return (<div> {r.mentee.username}:{r.review.content} </div>)
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MentoringIntroduction;