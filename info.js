// <------------------------------------------------------------------------소식 하단 파트 --------------------------------------------------------->//
const festivalApiKey = `59746b4962686f7436334e564e6778`;
let festivalUrl = new URL(`http://openapi.seoul.go.kr:8088/${festivalApiKey}/json/culturalEventInfo/1/50///2024-07-21`); // API 키
const typeButtons = document.querySelectorAll(".typeButton button"); 
typeButtons.forEach(menu=>menu.addEventListener("click",(event)=>getCardsByCategory(event))); // 메뉴 버튼과 클릭시 이벤트 발생
const $topBtn = document.querySelector(".moveTopBtn"); // 스크롤 업 버튼
let festivalList = []; // API 정보 받을 배열



const festivalView = async () => { // API 값을 불러오는 기능
    
    const response = await fetch(festivalUrl);
    const data = await response.json()
    festivalList = data.culturalEventInfo.row;
    

    cardRender();
    
};

const getCardsByCategory = async (event) => { // 버튼을 누르면 해당 카테고리의 행사를 찾아주는 기능
    let category = event.target.textContent;
    console.log(category)
    if(category ==="전체"){
        festivalUrl = new URL(`http://openapi.seoul.go.kr:8088/${festivalApiKey}/json/culturalEventInfo/1/50///2024-07-21`);
        await festivalView();
    }
    else{
        let Url = new URL(`http://openapi.seoul.go.kr:8088/${festivalApiKey}/json/culturalEventInfo/1/50/${category}///2024-07-21`);
        festivalUrl = decodeURIComponent(Url)
        
        await festivalView();
    
    }
    
    
  
  };



const cardRender = () => {   // 카드 안에 API 데이터를 넣어서 불러오는 기능

    const cardsHTML = festivalList.map((festival) => 
        `   <a href="${festival.ORG_LINK}" class="move-card-area">
                <div class="position">
                    <div class="card">
                        <img src="${festival.MAIN_IMG}" class="card-img-top" alt="NO-Image">   
                        
                        <div class="card-body">
                            <h5 class="card-title">${festival.TITLE.length>16?festival.TITLE.substring(0,16)+'...':festival.TITLE}</h5>
                            <p class="card-text">${festival.STRTDATE}~${dateFormat(festival.END_DATE)}</p>
                        </div>        
                    </div>
                </div>
            </a>
            `).join("");
         
          document.getElementById("festival-card-section").innerHTML=cardsHTML;

    
};

const dateFormat = (e) => {           //날짜를 년/월/일 방식으로 표기하는 기능
    
    let year = e.substr(0,4);
    
    let month = e.substr(5,2)
    
    let day = e.substr(8,2)
    
    let dateString = year + '년' + month  + '월' + day + '일';
    console.log(dateString)
    
};


$topBtn.onclick = () => {          // 버튼 클릭 시 맨 위로 이동
    window.scrollTo({ top: 0, behavior: "smooth" });  
  }

festivalView();



//<-----------------------------------------------------------------------소식 하단 파트--------------------------------------------------------------------------------->//
