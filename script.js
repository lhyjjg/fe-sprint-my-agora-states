// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // avatar 이미지
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.className = "discussion__avatar--image"
  avatarWrapper.append(avatarImg);

  // title (질문, 닉네임, 날짜)
  const title = document.createElement("h3");
  title.className = "discussion__title";
  const titleUrl = document.createElement("a");
  titleUrl.href = obj.url;
  title.append(titleUrl);
  titleUrl.textContent = obj.title;
  
  const information = document.createElement('div');
  // new.Data 현재 날짜, 표기법 변경하기
  information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleDateString()}`;
  information.className = "discussion__information";
  discussionContent.append(title, information);

  // 답변여부, 삼항연산자 써보기
  const answered = document.createElement('p')
  if(obj.answer === null) {
    answered.textContent = "🤐"
  } else
  answered.textContent = "😘"
  discussionAnswered.append(answered);

  
  

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const form = document.querySelector('form.form');
const newDiscussionTitle = document.querySelector('input#title');
const newDiscussionAuthor = document.querySelector('input#name');
const newDiscussionStory = document.querySelector('textarea#story'); 
form.addEventLostener('submit',(event) => {
  //submit 하면 새로고침되어 Discution 날라감, 아래는 새로고침 안되게 막음
  event.preventDefault();
  //하나의 객체를 만들어서 ㅋconvertToDiscussion함수에 넣어서 ul에 append 해준다.
  const newDiscussion = {
    // 데모데이터 참고
    id: "uuid",
    createdAt: new Date(),
    title: newDiscussionTitle.value,
    author: newDiscussionAuthor.value,
    answer: "",
    bodyHTML:newDiscussionStory.value,
  };
  //append 시 뒤로 붙음 prepend 사용
  ul.prepend.convertToDiscussion(newDiscussion)
  // 서브밋 후 값 없애기
  title.value="";
  author.value="";
  story.value="";
})
