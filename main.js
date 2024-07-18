const festivalApiKey = `59746b4962686f7436334e564e6778`;
let festivalUrl = new URL(`http://openapi.seoul.go.kr:8088/${festivalApiKey}/json/culturalEventInfo/1/50///2024-07-21`); // API 키
const menus = document.querySelectorAll(".menus button"); 
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event))); // 메뉴 버튼과 클릭시 이벤트 발생
let festivalList = []; // API 정보 받을 배열


const festivalView = async () => { // API 값을 불러오는 함수
    
    const response = await fetch(festivalUrl);
    const data = await response.json()
    festivalList = data.culturalEventInfo.row;
    

    cardRender();
    
};

const getNewsByCategory = async (event) => { // 버튼을 누르면 해당 카테고리의 행사를 찾아주는 함수
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

const cardRender = () => {

    const cardsHTML = festivalList.map((festival) => 
        `   <a href="${festival.ORG_LINK}" class="move-card-area">
                <div class="position">
                    <div class="card">
                        <img src="${festival.MAIN_IMG}" class="card-img-top" alt="NO-Image">   
                        
                        <div class="card-body">
                            <h5 class="card-title">${festival.TITLE.length>16?festival.TITLE.substring(0,16)+'...':festival.TITLE}</h5>
                            <p class="card-text">${festival.DATE}</p>
                        </div>        
                    </div>
                </div>
            </a>
            `).join("");
         
          document.getElementById("festival-card-section").innerHTML=cardsHTML;

    
};


festivalView();