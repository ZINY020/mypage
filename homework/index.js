const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTQzZjc1MWYwYTkzZThjYzI1ZTY3YTBmZjdjZTIwYiIsInN1YiI6IjY0NzZkMzllMWY5OGQxMDI4NDcyMDMxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RuIAVlQUl20fBN2Xc_ioKANo0BQZOtlpssi6XoxAxGU'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())  // API로 가져온 데이터를 json 파일 형식으로 변환
  .then(response => {   //json 파일에서
    let results = response["results"];  // results 데이터만 변수에 저장
    const movieArray = results.map((e) => {   // results에서 필요한 정보만 추출
      const { id, title, overview, poster_path, vote_average } = e;
      return { id, title, overview, poster_path, vote_average };
    });

    // 영화 탬플릿 카드 만들기
    let card = document.querySelector(".card_list");  // 영화 카드 리스트 공간 가져오기

    // results에서 추출한 정보를 변수에 담기
    movieArray.forEach(element => {     // forEach는 배열의 모든 요소를 불러옴  (반복문)
      let movie_id = element["id"];
      let movie_title = element["title"];
      let movie_overview = element["overview"];
      let movie_poster_path = "https://image.tmdb.org/t/p/w500" + element["poster_path"]  // poster_path는 파일 이름만 있으므로 앞에 경로를 붙여서 저장
      let movie_vote_average = element["vote_average"];

      
      // 카드 html로 만들기
      let temp_html = `<div class="movie_card" id="${movie_id}" onclick="alert('id:' + ${movie_id})">
                  <img class="card_img" src="${movie_poster_path}" alt=${movie_id}"/>
                  <h3>${movie_title}</h3>
                  <p>${movie_overview}</p>
                  <p>Rating: ${movie_vote_average}</p>
          </div>`;

      card.insertAdjacentHTML("beforeend", temp_html);   // 카드를 카드 리스트에 삽입
    });

  })
  .catch(err => console.error(err));



// 검색 함수
function findMove() {
  let input_value, keywords, movie_list, div, title;
  input_value = document.getElementById("search").value;
  if (input_value === "") {
    alert("영화 제목을 한 글자 이상 입력 하셨을까요?^_^?");
  }
  keywords = input_value.toUpperCase(); //대문자로 만들어주는 함수
  movie_list = document.getElementById("list");   // 카드 리스트 가져오기
  div = movie_list.getElementsByTagName("div");   // 카드 리스트의 카드 가져오기
  for (i = 0; i < div.length; i++) {    // 같은 스펠링이 있으면 보이고 없으면 안보이게 하기
    title = div[i].getElementsByTagName("h3")[0].innerText; 
    if (title.toUpperCase().indexOf(keywords) > -1) {
      div[i].style.display = "block";   // 안보이게 막기
    } else {
      div[i].style.display = "none";    // 보이게 하기
    }
  }
}