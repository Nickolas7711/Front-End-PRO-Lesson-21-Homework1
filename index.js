document.addEventListener("DOMContentLoaded", () => {
    const postIdInput = document.querySelector("#postIdInput");
    const searchButton = document.querySelector("#searchButton");
    const postBlock = document.querySelector("#postBlock");

    searchButton.addEventListener("click", () => {
        const postId = parseInt(postIdInput.value);
        if (postId >= 1 && postId <= 100) {
            fetchPost(postId)
                .then(post => {
                    displayPost(post);
                    return fetchComments(postId);
                })
                .then(comments => {
                    displayComments(comments);
                })
                .catch(error => {
                    console.error("Помилка:", error);
                });
        } else {
            alert("Будь ласка, введіть ідентифікатор від 1 до 100.");
        }
    });

    function fetchPost(postId) {
        return new Promise((resolve, reject) => {
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                .then(response => response.json())
                .then(post => resolve(post))
                .catch(error => reject(error));
        });
    }

    function fetchComments(postId) {
        return new Promise((resolve, reject) => {
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
                .then(response => response.json())
                .then(comments => resolve(comments))
                .catch(error => reject(error));
        });
    }

    function displayPost(post) {
        postBlock.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;
        const commentsButton = document.createElement("button");
        commentsButton.textContent = "Коментарі до посту";
        commentsButton.id = "commentsButton";
        postBlock.appendChild(commentsButton);
    }

    function displayComments(comments) {
        const commentsButton = document.querySelector("#commentsButton");
        const commentsList = document.createElement("ul");

        comments.forEach(comment => {
            const listItem = document.createElement("li");
            listItem.textContent = comment.body;
            commentsList.append(listItem);
        });

        commentsButton.addEventListener("click", () => {
            postBlock.append(commentsList);
            commentsButton.disabled = true;
        });
    }
});