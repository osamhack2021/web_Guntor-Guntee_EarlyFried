import React, { useEffect } from 'react';
import './Mentoringintroduction.scss';
import Subnavbar from '../Subnavbar';

function Mentoringintroduction(props){
    const menu = 
    [
        {id:'home', desc:'홈'},
        {id:'mentorintro', desc:'멘토 소개'},
        {id:'assignmentinro', desc:'과제 소개'},
        {id:'plan', desc:'세부 일정'},
        {id:'review', desc:'후기'}
    ]


    useEffect(()=>{
        window.scroll({
            top:0,
            left:0,
            behavior:'instant'
        })}
    );

    return (
        <div>           
            <Subnavbar menu={menu}></Subnavbar>

            <div className="section" id="home">
                <h2>홈 {props.location.state.id}</h2>
            </div>

            <div className="section" id="mentorintro">
                <h2>멘토 소개</h2>
            </div>

            <div className="section" id="assignmentintro">
                <h2>과제 소개</h2>
            </div>

            <div className="section" id="plan">
                <h2>세부 일정</h2>
            </div>

            <div className="section" id="review">
                <h2>후기</h2>
            </div>
        </div>
    )

}

export default Mentoringintroduction;