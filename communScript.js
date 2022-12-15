let socket = io()

//let myID

let currentCommunity;
let address = window.location.href;
var parts = address.split("?");
let temp = parts[0].split("/");
let communName = temp[3];
var userID = parts[1];



// Grab username and community name to display custom user

document.getElementById("sideBarUsername").innerHTML = userID;

if (true) {
  currentCommunity = {
    id: communName,
  };
}

document.getElementById('communityTitle').innerHTML = currentCommunity.id;

// Post and Comment Id

var postId = 0          
var commentId = 0       

// Socket event to update the displayed posts to the user 
// (this is called once the user posts one of their posts)

socket.on("updatePosts", ({title, content, community, username}) => {
  if(community === currentCommunity.id)
    {
      
      // create post to display
      
      const newDiv = document.createElement("div");
      newDiv.id = "post " + postId
      console.log(newDiv.id)
      
      const p2 = document.createElement("p");
      const p2Text = document.createTextNode("posted by " + username);
  
      const h1 = document.createElement("H1");
      const hText = document.createTextNode(title);

      const p = document.createElement("p");
      const pText = document.createTextNode(content);
      
      // add like and comment button event listeners
      // (note the functionality for these is unfinished)
      
      const likeButton = document.createElement("button");
      likeButton.innerHTML = "Like"
      likeButton.className = "likeButton"
      likeButton.addEventListener("click", function() {
         likePost(postId) 
      }); 
      
      const commentButton = document.createElement("button");
      commentButton.innerHTML = "Comment"
      commentButton.className = "likeButton"
      commentButton.style.width = "90px"
      commentButton.addEventListener("click", function() {
         commentPost(commentId,postId) 
      }); 
      
      // create post to display
    
      h1.appendChild(hText);
      p.appendChild(pText);
      p2.appendChild(p2Text);
      
      p2.style.color = "grey";

      newDiv.appendChild(p2);
      newDiv.appendChild(h1);
      newDiv.appendChild(p);
      newDiv.appendChild(commentButton);
      newDiv.appendChild(likeButton);
      
      newDiv.style.border = "3px solid #000000";
      newDiv.style.padding = "20px"
      newDiv.style.marginTop = "10px";
      newDiv.style.marginLeft = "180px";
      newDiv.style.width = "80%";
      newDiv.style.overflow = "hidden";
            
      newDiv.addEventListener("click", function() {
        viewPost(postId)
      }); 
    

      // display post

      document.body.appendChild(newDiv);

      document.getElementById('modal-container-HTP').classList.remove('show'); 
      
      postId++;
      
    }
})

// Function to show the post creation pop-up

function enablePost()
{
  document.getElementById('modal-container-HTP').classList.add('show');
}

// Function to hide the post creation pop-up

function closePosting()
{
  document.getElementById('modal-container-HTP').classList.remove('show');
}

// Function to emit a socket event to notify the server that 
// a user wants to make a post

function postContent(title, content)
{
  socket.emit("posted", ({title: title, content: content, community: currentCommunity.id, username: userID}));
}

// Function to like a post
// note: the functionality for this function is unfinished

function likePost(postId) {
  
  socket.emit("postLiked", ({postId: 0}))
  
}

// Function to comment on a post
// note: the functionality for this function is unfinished

function commentPost(commentId, postID) {
    console.log("commented! with id: " + commentId + " on post!" + postID)
}

// Function to view a post
// note: the functionality for this function is unfinished

function viewPost(postId) {
  console.log("post viewed! with id:" + postId)
}