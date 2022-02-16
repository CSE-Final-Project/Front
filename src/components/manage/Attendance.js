import axios from 'axios';
import React, { useEffect ,useState, useRef} from 'react';
import AttendanceCard from './AttendanceCard';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FaCaretLeft } from "react-icons/fa";

const Attendance = (props) => {

    var fix_today = new Date();
    var fix_month = fix_today.getMonth()+1; 
    var fix_date = fix_today.getDate(); 
    var compare1 = [fix_month, fix_date] //1년 넘어가면 에러

    //시작일 필요
   // var today = new Date(); //onclick과 연결, state 적용 필요
    const [today, setToday] = useState(new Date());
    var week = ["일", "월", "화", "수", "목", "금", "토"];
    var weekInfo = []; 
    var month = today.getMonth()+1; 
    var date = today.getDate(); 
    var dayLabel = today.getDay();
    var compare2 = [month,date]
    var num = dayLabel; 
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
    console.log("weekInfo: ", weekInfo);
    
    var resultlist = []; //{}에서 배열로 바꿈
    console.log('5. resultlist: -> {}이어야 정상' ,resultlist);

    var startday = "2022-02-09"
    var isInclude = false;
    var startdate = Number(startday.slice(-2)); 
    var startmonth = Number(startday.slice(5,7)); 
    if(weekInfo.findIndex(i => i.date == startdate) > -1 && startmonth==month){
         isInclude = true;
    }

    const studyId = props.studyID;
    const URL1 = '/api/studies/attendance/'+studyId;
    const URL2 = '/api/studies//mates/'+studyId;
    const [atten,setAtten]=useState(null); 
    const [mate,setMate]=useState(null);
    const [loading, setLoading] = useState(false);
    const [render, setRender] = useState(true);
    //const [today, setToday] = useState(today);

    //리팩토링, 인자로 넘겨주고 changeDate로 합치기
    const changeBefore = () => {
            var new_date = new Date(new Date().setDate(today.getDate() - 7))
            console.log('날짜 바꾸기')
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
            fetchAttendance(new_date);
   
    }

    const changeAfter = () => {
            var new_date = new Date(new Date().setDate(today.getDate() + 7))
            console.log('날짜 바꾸기')
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
            //console.log('날짜 바꾸기 useState 직전')
            setToday(new_date)
           // console.log('2번째 fetchAttendance 시점')
            fetchAttendance(new_date);
 
    }

    const fetchAttendance = async (date) => {
        try{
            console.log('1-1');
            setAtten(null);
            console.log('1-2');
            setLoading(true);
            console.log('1-3');
           // const date = new Date();
            const response = await axios.post(URL1,{date:date});
            console.log('1-4');
            setAtten(response.data);
            console.log('1-5');
        }catch (e){
            console.log(e);
        }
          console.log('1-6');
          setLoading(false);
          console.log('1-7');
    }

    console.log('전체 렌더링')

    const fetchMateInfo = async () => {
        try{
            console.log('2-1');
            const response = await axios.get(URL2); //check
            setMate(response.data);
            console.log('2-2');
        }catch (e){
            console.log(e);
        }
    } 

    useEffect(()=>{
       fetchAttendance(today);
       fetchMateInfo();
    //     setTimeout(() => {
    //      console.log('2초 지남');
    //      setRender(!render);
    //    }, 2000);
    },[]); 

    //문제: atten, mate set 되고 나면 바로 resultlist 초기화 되어버림..if문 수행하지도 않았는데.. 어떻게..??
        if(atten&&mate){
        console.log('5. if 블록 렌더링')
        console.log('5. resultlist: -> {}이어야 정상' ,resultlist);
        var attendlist=[null, null, null, null, null, null, null];
       // weekInfo.reverse();
        var list = Object.values(atten)

        for(var i=0; i< Object.keys(mate).length; i++){
            console.log('5. i for문: ' ,i, "번째");
            var matename = mate[i];  //mate 이름 추출
            console.log('5. mate[i]: ' , mate[i], ' i: ',i);
            console.log('5. list: ',list);
            var obj = list.filter(data => data.user_id == mate[i]);
            console.log('5. obj: ', obj);
            var obj_date= list.filter(data => data.user_id == mate[i]).map(data => data.date);
            console.log('5. obj_date 변환 전: ', obj_date);

            for(var k=0; k<obj_date.length; k++){ 
                obj_date[k] = Number(obj_date[k].slice(-2));
            }
            
            console.log('5. obj_date 변환 후: ', obj_date);

            for(var j=0; j<weekInfo.length; j++){ 
                console.log('5. j for문: ' ,j, "번째");
                    if((obj_date.indexOf(weekInfo[j].date) == -1)){
                        console.log('5. (obj_date.indexOf(weekInfo[j]) == -1) ',obj_date.indexOf(weekInfo[j].date));
                       // attendlist[j] = null;
                        attendlist[j] = '-';

                    }else{
                        console.log('5. (obj_date.indexOf(weekInfo[j]) == -1) ',obj_date.indexOf(weekInfo[j].date));
                        var num = obj_date.indexOf(weekInfo[j].date);
                        //attendlist[j] = obj[num].attendance
                         if(obj[num].attendance){
                             attendlist[j]='O';
                            }
                         else{
                             attendlist[j]='X';
                         }
                    }
            } 

            console.log('5. attendlist:' ,attendlist);
            //resultlist[matename] = attendlist; //[matename]
            resultlist.push(attendlist);
            console.log('5. resultlist:' ,resultlist);
            } 
        console.log('5. for문 이후 resultlist:' ,resultlist);
   }  


   const weekTabParentStyle = {
    display: 'flex',
    padding: '5%'
}

    const weekTabChildStyle = {
        flex: '1'
    }

    //시작일 포함된 주간이면 숨김 처리
    const weekTabLeftButtonStyle = {
        visibility: isInclude ? 'hidden' : 'visible',
        flex: '1',
        marginTop: '2.5%',
        marginRight: '3%'
    }

    //당일 포함된 주간이면 숨김 처리
    const weekTabRightButtonStyle = {
        visibility: JSON.stringify(compare1)===JSON.stringify(compare2) ? 'hidden' : 'visible',
        flex: '0.5',
        marginTop: '2.5%',
        marginLeft: '1%'
    }

    const weekTabMonthStyle = {
        flex: '1',
        marginTop: '1.5%'
    }

    const mateStyle = {
        display: 'flex',
        padding: '5%'
    }

    console.log('4. 데이터 결과(atten): ',atten)
    console.log('4. 데이터 결과(mate): ',mate)

     //의도 데이터 형식
    //result = { id1: [{date,atten}, {data,atten}], id2: [{}, {}]}
    //팀원 데이터: ['aaaa', 'bbbb', 'ffff', 'jjjj']
    /*출석 데이터: 0: {user_id: 'aaaa', date: '2022-02-09', attendance: true}
                   1: {user_id: 'bbbb', date: '2022-02-09', attendance: true}
                   2: {user_id: 'aaaa', date: '2022-02-10', attendance: true} */
    //팀원 id 별로 날짜, 출석 여부 추출해서 정보 구성한 배열 생성해서 전체 배열에 push
    //atten 에서 date는 -2 slice 해서 집어넣기
    //['id' : [{date:'02', atten:'true'}, {},{},{},{},{}.{}],  ] 
    //** 행 아예 없을 경우 예외 처리 필요한가? -> 필요함 당일에는 행 안 만들어져있으니까
    //** 날짜 차례대로 저장 안되었을 경우에 대한 예외처리 
    //**  렌더링 되어야 useState 반영되는 에러 해결

    //var result = { mate[0]: null };


    /*
    //var resultlist = {};
    var attendlist=[null, null, null, null, null, null, null];
    weekInfo.reverse();

    if(atten&&mate){
        for(var i=0; i<Object.keys(mate).length; i++){
            var matename = mate[i];  //mate 이름 추출
            console.log('mate[i]: ' , mate[i]);
            var list = Object.values(atten)
            //var obj = list.filter(data => data.user_id == mate[i]) 여기까지 한다면?
            var obj = list.filter(data => data.user_id == mate[i]).map(data => data.attendance);
            console.log('추출 결과:' ,obj);
            resultlist[matename] = obj;
    } 
    console.log('resultlist:' ,resultlist);
    } */


    if(loading) return <div>loading...</div>;
    if(!atten) return null;

    //{weekInfo.slice(0).reverse().map((day, index)
    //이중 맵으로 배치
    //< > 버튼 

    
    console.log('return 직전 resultlist:', resultlist);
    return (
        
        <div>
            {console.log('3. 데이터 결과(atten): ',atten)}
            {console.log('3. 데이터 결과(mate): ',mate)}
            <div style={weekTabParentStyle}>
                <span style={weekTabMonthStyle}>{month}월</span>
                <FaChevronLeft style={weekTabLeftButtonStyle} onClick={()=>changeBefore()}/>
                {weekInfo&&weekInfo.map((day, index) => {
              return (
                  <div style={weekTabChildStyle} key={index}>{day.weekday}<br/>{day.date}</div>
              )
          })}   
                <FaChevronRight style={weekTabRightButtonStyle} onClick={()=>changeAfter()}/>    
            </div>
            <div>
                <div>
                    {
                         mate&&mate.map((id)=> {
                            return(
                                <div>
                                {id}
                                </div>
                            )
                        })
                    }
                </div>
                
                <div>
                    {resultlist.map((x,i) =>{
                        console.log('in JSX: ', x);
                        console.log('in JSX: ', x[0]);
                         return (
                            <div key={i}>
                                <ul>
                                    {x.map((y) => <span style={{marginLeft: '10%'}}>{y}</span>)}
                                </ul>
                            </div>  
                        )
                    })} 
          </div>
            </div>
            {/*{
                atten&&atten.map(function(atten,i){
                        return(
                            <AttendanceCard atten={atten} i={i} key={i}/>
                        )
                    }       
                )
            } */}
            
        </div>
    );
};

export default Attendance;