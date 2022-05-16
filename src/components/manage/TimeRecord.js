import axios from 'axios';
import React, { useEffect ,useState, useRef} from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import TimeRecordCard from './TimeRecordCard';
import '../../css/TimeRecord.css';

const TimeRecord = (props) => {
    axios.defaults.withCredentials = true;
    console.log('time_reocord');

    const studyId = props.studyID;

    //리팩토링 필요, Attendance에서 중복 사용, weekTab 컴포넌트로 분리 
    var fix_today = new Date();
    var fix_month = fix_today.getMonth()+1; 
    var fix_date = fix_today.getDate(); 
    var compare1 = [fix_month, fix_date] //1년 넘어가면 에러

    const [today, setToday] = useState(new Date());
    var week = ["일", "월", "화", "수", "목", "금", "토"];
    var weekInfo = []; 
    var month = today.getMonth()+1; 
    var date = today.getDate(); 
    var dayLabel = today.getDay();
    var compare2 = [month,date]
    var num = dayLabel; 
    var dateNum = date; 

    for(var i = 0; i < 7; i++,num--,dateNum--){
        if(dateNum == 0 ){
                if((month-1)%2 == 0){ 
                    if((month-1)==2) dateNum = 28;
                    else dateNum = ((month-1)==8) ? 31 : 30;  
                    //윤년 2월 예외처리 추가
                }else{
                    dateNum = 31;
                }
            console.log("month , dateNum: ", month, dateNum);
        } 
        var weekday = week[num];
        var set = { date: dateNum, weekday: weekday};
        weekInfo.push(set);
        if(num == 0){
            num = 7; 
        }
    }

    weekInfo.reverse();

   var startday = props.startdate;
    var isInclude = false;
    var startdate = Number(startday.slice(8,10)); 
    var startmonth = Number(startday.slice(5,7));
    if(weekInfo.findIndex(i => i.date == startdate) > -1 && startmonth==month){
         isInclude = true;
    }

     //리팩토링, 인자로 넘겨주고 changeDate로 합치기
     const changeBefore = () => {
        weekInfo = [];
        var new_date = new Date(today.setDate(today.getDate() - 7))
        month = new_date.getMonth()+1; 
        date = new_date.getDate(); 
        dayLabel = new_date.getDay();
        num = dayLabel; 
            for(var i = 0; i < 7; i++,num--){
                 var dateNum = date-i; 
                 var weekday = week[num]; 
                 var set = { date: dateNum, weekday: weekday}; 
                 weekInfo.push(set);
                 if(num == 0){
                     num = 7; 
                 }
        }
        weekInfo.reverse();
        setToday(new_date)

}

const changeAfter = () => {
        weekInfo = [];
        var new_date = new Date(today.setDate(today.getDate() + 7))
        month = new_date.getMonth()+1; 
        date = new_date.getDate(); 
        dayLabel = new_date.getDay();
        num = dayLabel; 
            for(var i = 0; i < 7; i++,num--){
                 var dateNum = date-i; 
                 var weekday = week[num];
                 var set = { date: dateNum, weekday: weekday};
                 weekInfo.push(set);
                 if(num == 0){
                     num = 7; 
                 }
        }
        weekInfo.reverse();
        setToday(new_date)
}
   const [time, setTime] = useState(null);
   
   const clickDate = async (e, index) => {
       var clickdate  = new Date(new Date().setDate(today.getDate()-6+index));
       var URL = 'https://nudo-study.cf/api/studies/time/'+studyId; 

        try{
            const response = await axios.post(URL,{date:clickdate});
            if(response.data.code == 200){
            setTime(response.data.user_studytime);
            }else{
            setTime(null)
            }
        }catch (e){
            console.log(e);
        }
   }

   const weekTabParentStyle = {
    display: 'flex',
    padding: '5%',
   
    }

    const weekTabChildStyle = {
        width: '10%',
        border: '1px solid white',
        borderRadius: '0.5rem',
        textAlign: 'center'
    }

    const weekTabChildStyle_unact = {
        width: '10%',
        border: '1px solid white',
        borderRadius: '0.5rem',
        textAlign: 'center',
        opacity: '0.4'
    }

    const weekTabMonthStyle = {
        width: '10%',
        textAlign: 'left',
        paddingTop: '1.5%' //세로 위치
    }

    //시작일 포함된 주간이면 숨김 처리
    const weekTabLeftButtonStyle = {
        visibility: isInclude ? 'hidden' : 'visible',
        width: '10%',
        textAlign: 'center',
        paddingTop: '1.5%' //세로 위치
    }

    //당일 포함된 주간이면 숨김 처리
    const weekTabRightButtonStyle = {
        visibility: JSON.stringify(compare1)===JSON.stringify(compare2) ? 'hidden' : 'visible',
        width: '10%',
        textAlign: 'center',
        paddingTop: '1.5%'
    }

    return (
        
        <div>
            <div style={weekTabParentStyle}>
                <span style={weekTabMonthStyle}>{month}월</span>
                <div style={weekTabLeftButtonStyle}><FaChevronLeft onClick={()=>changeBefore()}/></div>
                {weekInfo&&weekInfo.map((day, index) => {
                   if(!isInclude || day.date >= startdate ){
                        return (
                            <div className="clickStyle" style={weekTabChildStyle} key={index} onClick={(e)=>clickDate(e,index)}>{day.weekday}<br/>{day.date}</div>
                        )
                        }else{
                            return(
                                <div style={weekTabChildStyle_unact} key={index}>{day.weekday}<br/>{day.date}</div>
                            )
                            }
                })}   
                <div style={weekTabRightButtonStyle}><FaChevronRight onClick={()=>changeAfter()}/> </div>   
            </div>

            {/* 발표용-지우기 */}
            {/* &nbsp;&nbsp;&nbsp;&nbsp; 시간
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            3
            &nbsp;&nbsp;&nbsp;&nbsp;
            3.5 */}
            {/* 발표용-지우기 */}

           {
                time&&time.map(function(time,i){
                    return(
                        <>
                            <TimeRecordCard timeInfo={time} i={i} key={i}/>
                        </>
                    )
                })
            }  
        </div> 
    );
};
export default TimeRecord;