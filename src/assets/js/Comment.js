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

const delComment = commentId => {
  deleteBtns.forEach(deleteBtn => {
    if (deleteBtn === commentId) {
      deleteBtn.remove();
    }
  });
  decreaseNumber();
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
  const commentId = event.target.value;
  const response = await axios({
    url: `/api/${videoId}/deleteComment`,
    method: "POST",
    data: {
      commentId
    }
  });
  console.log(commentId, typeof commentId);
  if (response.status === 200) {
    delComment(commentId);
  }
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener("click", handleDelete);
  });
}

init();
