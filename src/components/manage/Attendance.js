import axios from 'axios';
import React, { useEffect ,useState, useRef} from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaRegCheckSquare } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import { FaRegWindowMinimize } from "react-icons/fa";

const Attendance = (props) => {
    axios.defaults.withCredentials = true;

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
    
    var resultlist = {};

    var startday = props.startdate;
    var isInclude = false;
    var startdate = Number(startday.slice(8,10)); 
    var startmonth = Number(startday.slice(5,7));
    if(weekInfo.findIndex(i => i.date == startdate) > -1 && startmonth==month){
         isInclude = true;
    }

    const studyId = props.studyID;
    const URL1 = 'https://nudo-study.cf/api/studies/attendance/'+studyId;
    const URL2 = 'https://nudo-study.cf/api/studies/mates/'+studyId; //url 중간에 //있었는데 에러 x
    const [atten,setAtten]=useState(null); 
    const [mate,setMate]=useState(null);
    const [loading, setLoading] = useState(false);
    const [render, setRender] = useState(true);
    //const [today, setToday] = useState(today);

    //var update_date = today;

    //리팩토링: 인자로 넘겨주고 changeDate로 합치기
    const changeBefore = () => {
            weekInfo = []; //7일씩만 들어가도록, 비워줘야
            console.log("1. today:" ,today); 
            var new_date = new Date(today.setDate(today.getDate() - 7));
            console.log("2. new_date:" , new_date); 
            month = new_date.getMonth()+1; 
            date = new_date.getDate(); 
            dayLabel = new_date.getDay();
            num = dayLabel; 
            dateNum = date;
                for(var i = 0; i < 7; i++,num--,dateNum--){
                     //var dateNum = date-i; 
                     if(dateNum == 0 ){
                        if(month%2 == 0){ 
                            dateNum = (month==8) ? 31 : 30 
                            //윤년 2월 예외처리 추가
                        }else{
                            dateNum = 31;
                        }
                    } 
                     var weekday = week[num]; 
                     var set = { date: dateNum, weekday: weekday}; 
                     weekInfo.push(set);
                     if(num == 0){
                         num = 7; 
                     }
            }
            weekInfo.reverse();
           // setToday(new_date)
           console.log("weekInfo: ", weekInfo);
            fetchAttendance(new_date);
   
    }

    const changeAfter = () => {
            weekInfo = []; //7일씩만 들어가도록, 비워줘야
           // var new_date = new Date(new Date().setDate(today.getDate() + 7))
            console.log("1. today:" ,today); 
            var new_date = new Date(today.setDate(today.getDate() + 7));
            console.log("2. new_date:" , new_date); 
            month = new_date.getMonth()+1; 
            date = new_date.getDate(); 
            dayLabel = new_date.getDay();
            num = dayLabel; 
            dateNum = date;
                for(var i = 0; i < 7; i++,num--,dateNum--){
                    // var dateNum = date-i; 
                    if(dateNum == 0 ){
                        if((month-1)%2 == 0){ 
                            dateNum = ((month-1)==8) ? 31 : 30 
                            //윤년 2월 예외처리 추가
                        }else{
                            dateNum = 31;
                        }
                    } 
                     var weekday = week[num];
                     var set = { date: dateNum, weekday: weekday};
                     weekInfo.push(set);
                     if(num == 0){
                         num = 7; 
                     }
            }

            weekInfo.reverse();
           // setToday(new_date)
            fetchAttendance(new_date);
 
    }

    const fetchAttendance = async (date) => {
        try{
            setAtten(null);
            setLoading(true);
            const response = await axios.post(URL1,{date:date});
            setAtten(response.data);
        }catch (e){
            console.log(e);
        }
          setLoading(false);
    }

    const fetchMateInfo = async () => {
        try{
            const response = await axios.get(URL2); //check
            setMate(response.data);
        }catch (e){
            console.log(e);
        }
    } 

    useEffect(()=>{
       fetchAttendance(today);
       fetchMateInfo();
    },[]); 


        if(atten&&mate){
        var list = Object.values(atten)
        for(var i=0; i< Object.keys(mate).length; i++){
            var attendlist=[null, null, null, null, null, null, null];
            var matename = mate[i];  //mate 이름 추출
            var obj = list.filter(data => data.user_id == mate[i]);
            var obj_date= list.filter(data => data.user_id == mate[i]).map(data => data.date);

            for(var k=0; k<obj_date.length; k++){ 
                obj_date[k] = Number(obj_date[k].slice(-2));
            }
            
            for(var j=0; j<weekInfo.length; j++){ 
                    if((obj_date.indexOf(weekInfo[j].date) == -1)){
                        attendlist[j] = '-';

                    }else{
                        var num = obj_date.indexOf(weekInfo[j].date);
                         if(obj[num].attendance){
                             attendlist[j]='O';
                            }
                         else{
                             attendlist[j]='X';
                         }
                    }
            } 
            resultlist[matename]=attendlist;
            } 
   }  
   


   const weekTabParentStyle = {
    display: 'flex',
    padding: '5%',
   
    }

    const weekTabChildStyle = {
        width: '10%',
        textAlign: 'center'
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
        paddingTop: '1.5%' //세로 정렬
    }

    //당일 포함된 주간이면 숨김 처리
    const weekTabRightButtonStyle = {
        visibility: JSON.stringify(compare1)===JSON.stringify(compare2) ? 'hidden' : 'visible',
        width: '10%',
        textAlign: 'center',
        paddingTop: '1.5%'
    }


    const checkParentStyle = {
        display: 'flex',
        padding: '5%',
        paddingTop: '1%',
        paddingBottom: '1%'
    }
    const checkStyle = {
        display: 'flex',
        flexDirection: 'row',
        padding: '1%',
        textAlign: 'center'
    }

    const onecheckStyle = {
        width: '10%',
        paddingLeft: '9%', //간격
        paddingBottom: '2%'  //세로 위치
    }

    const idStyle = {
        width: '15.5%',
        textAlign: 'right',
        fontSize: 'large', 
       // paddingRight: '3%',
    }

    const nullStyle = {
        width: '5.5%'
    }

    console.log('4. 데이터 결과(atten): ',atten)
    console.log('4. 데이터 결과(mate): ',mate)


    if(loading) return <div>loading...</div>;
    if(!atten) return null;
    
    console.log('return 직전 resultlist:', resultlist);

    //발표용 - 지우기
    // var k =1
    //

    return (
        
        <div>
            <div style={weekTabParentStyle}>
                <span style={weekTabMonthStyle}>{month}월</span>
                <div style={weekTabLeftButtonStyle}><FaChevronLeft onClick={()=>changeBefore()}/></div>
                {weekInfo&&weekInfo.map((day, index) => {
              return (
                  <div style={weekTabChildStyle} key={index}>{day.weekday}<br/>{day.date}</div>
              )
          })}   
                <div style={weekTabRightButtonStyle}><FaChevronRight onClick={()=>changeAfter()}/> </div>   
            </div>
           {/* <div style={checkParentStyle}>*/}
                {
                    Object.keys(resultlist).map(id => {
                        return (
                                <div style={checkParentStyle}>
                                    <span style={idStyle}>{id}</span>
                                    
                                    {
                                    resultlist[id].map(check => {
                                        if(check == 'O')
                                            return(<div style={onecheckStyle}><FaRegCheckSquare/></div>)
                                        else if(check == 'X')
                                            return(<div style={onecheckStyle}><FaRegSquare/></div>)
                                        // else  
                                        //     //발표용-지우기
                                        //     if(k%3==2){
                                        //         k+=1
                                        //         return(<div style={onecheckStyle}>X</div>)
                                        //     } 
                                        //     else{
                                        //         k+=1
                                        //         return(<div style={onecheckStyle}>O</div>)
                                        //     }
                                        //     //발표용-지우기
                                            
                                            // return(<div style={onecheckStyle}><FaRegWindowMinimize/></div>)
                                    })
                                    }
                                    <div style={nullStyle}></div>
                                </div>
                            )
                    })
                }
                
           {/* </div> */}
           
            
        </div>
    );
};

export default Attendance;