import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteBtns = document.querySelectorAll(".video__comments-btn-del");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};
const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const addComment = comment => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("video__comments-btn-del");
  deleteBtn.innerHTML = "X";
  span.innerHTML = comment;
  li.appendChild(span);
  li.appendChild(deleteBtn);
  commentList.prepend(li);
  increaseNumber();
};

const delComment = target => {
  try {
    const span = target.parentNode;
    const list = span.parentNode;
    commentList.removeChild(list);
    decreaseNumber();
  } catch (error) {}
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const handleDelete = async event => {
  const videoId = window.location.href.split("/videos/")[1];
  const { target } = event;
  const commentId = target.id;
  const response = await axios({
    url: `/api/${videoId}/deleteComment`,
    method: "POST",
    data: {
      commentId
    }
  });
  if (response.status === 200) {
    delComment(target);
  }
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  deleteBtns.forEach(delBtn => {
    delBtn.addEventListener("click", handleDelete);
  });
}

init();
