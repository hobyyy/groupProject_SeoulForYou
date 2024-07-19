import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const swiperArea = document.getElementById('festival-swiper');
const moreButtonArea = document.querySelector('.festival-more-btn');
const FESTIVAL_API_KEY =
  '4Jj5rc%2BmE6PU5FPhSUrBLlZ%2F7YU9rhZSd7xA4SnN17zDZGzvJs5bJhMuZKGgwOyDZIDXqzRjWAMakxfgk3jjQQ%3D%3D';
const FESTIVAL_PAGE_SIZE = 10;
const today = new Date();
const todayYear = today.getFullYear().toString();
const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0');
const todayDate = today.getDate().toString().padStart(2, '0');
const startDate = `${todayYear}${todayMonth}${todayDate}`;
const festivalUrl = new URL(
  `http://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${FESTIVAL_API_KEY}&numOfRows=${FESTIVAL_PAGE_SIZE}&MobileOS=ETC&MobileApp=APPTest&_type=Json&areaCode=1&eventStartDate=${startDate}`
);

let festivalList = [];
let totalPage = undefined;
let currentPage = 1;

moreButtonArea.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') getMoreInfo();
});

getDefaultInfo();

//기본 축제정보&캐러샐 불러오기
async function getDefaultInfo() {
  await fetchFestivalInfo();
  renderCarousel();
  initSwiper();
}

// 추가 축제정보 불러오기
async function getMoreInfo() {
  currentPage++;
  await fetchFestivalInfo();
  renderMoreList();
  if (currentPage === totalPage) {
    moreButtonArea.innerHTML = '';
  }
}

async function fetchFestivalInfo() {
  festivalUrl.searchParams.set('pageNo', currentPage);
  try {
    const res = await fetch(festivalUrl);
    const data = await res.json();
    if (res.status === 200) {
      if (data.resultCode) {
        throw new Error(data.resultMsg);
      }
      if (!data.response.body.totalCount) {
        throw new Error('일치하는 데이터가 없습니다');
      }
      totalPage = Math.ceil(data.response.body.totalCount / FESTIVAL_PAGE_SIZE);
      festivalList = data.response.body.items.item;
    } else {
      throw new Error('데이터를 불러오는데 실패했습니다');
    }
  } catch (error) {
    console.log('error', error.message);
  }
}

function renderCarousel() {
  let swiperHtml = '<div class="swiper-wrapper">';
  festivalList.forEach((item) => {
    swiperHtml += `<div class="swiper-slide ${
      !item.firstimage ? 'no-img' : ''
    }" style="background-image:url(${
      item.firstimage || 'image/noImage.png'
    })"><a href="festivalDetail.html?id=${
      item.contentid
    }"><span class="swiper-status translatable ${
      startDate > item.eventstartdate ? 'ing' : 'wil'
    }">${
      startDate > item.eventstartdate ? '진행중' : '오픈예정'
    }</span><div class="swiper-desc"><p class="swiper-title translatable">${
      item.title
    }</p><p class="swiper-date">${changeFormat(
      item.eventstartdate
    )} - ${changeFormat(item.eventenddate)}</p></div></a></div>`;
  });
  swiperHtml += `</div>`;
  swiperArea.innerHTML = swiperHtml;
  document.querySelector('.swiper-wrap').insertAdjacentHTML(
    'beforeend',
    `   <div class="swiper-btn-prev">
          <i class="fa-solid fa-chevron-left"></i>
        </div>
        <div class="swiper-btn-next">
          <i class="fa-solid fa-chevron-right"></i>
        </div>
        <div class="swipe-pagination"></div>
        `
  );
  if (totalPage > 1) {
    moreButtonArea.innerHTML = `<button class="translatable"><i class="fa-solid fa-chevron-down"></i> 더보기</button>`;
  }
}

function renderMoreList() {
  console.log('more', festivalList);
  let newHtml = '';
  festivalList.forEach((item) => {
    newHtml += `<li class="card more-item">
            <a href="festivalDetail.html?id=${item.contentid}">
              <div
                class="card-img-top more-item-img ${
                  !item.firstimage ? 'no-img' : ''
                }"
                style="background-image: url(
                  ${item.firstimage || 'image/noImage.jpg'}
                )"
              ></div>
              <div class="card-body">
                <h5 class="card-title more-item-title translatable">${
                  item.title
                }</h5>
                <p class="more-item-date">${changeFormat(
                  item.eventstartdate
                )} - ${changeFormat(item.eventenddate)}</p>
                <span class="more-item-location translatable">${
                  item.addr1.split(' ')[0]
                } ${item.addr1.split(' ')[1]}</span>
              </div>
            </a>
          </li>`;
  });
  document
    .querySelector('.festival-more-list')
    .insertAdjacentHTML('beforeend', `${newHtml}`);
}

function renderMoreList2() {
  let newHtml = '';
  festivalList.forEach((item) => {
    newHtml += `<li class="card more-item">
              <div class="card-body" style="background-image: url(
                  ${item.firstimage || 'image/noImage.jpg'}
                )">
                <h5 class="card-title more-item-title" style="color:#fff;text-shadow: 0px 0px 6px rgba(0,0,0,0.8)">${
                  item.title
                }</h5>
                <p class="more-item-date">${changeFormat(
                  item.eventstartdate
                )} - ${changeFormat(item.eventenddate)}</p>
                <span class="more-item-location">${item.addr1.split(' ')[0]} ${
      item.addr1.split(' ')[1]
    }</span>
              </div>
            </a>
          </li>`;
  });
  document
    .querySelector('.festival-more-list')
    .insertAdjacentHTML('beforeend', `${newHtml}`);
}

//캐러샐 초기화
function initSwiper() {
  const swiper = new Swiper(swiperArea, {
    slidesPerView: 1,
    spaceBetween: 15,
    pagination: {
      el: '.swipe-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 5,
      },
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
  });
}

//날짜 형식 변환
function changeFormat(date) {
  const newFormat =
    date.slice(0, 4) + '.' + date.slice(4, 6) + '.' + date.slice(6);
  return newFormat;
}
