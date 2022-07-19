const comment1 = {
    user: "bob@gmail.com",
    content: "This is my first comment"
}
const comment2 = {
    user: "bob@gmail.com",
    content: "This is my first comment"
}
const post1 = {
    id: "1",
    user: "kant95270@gmail.com",
    content: "This is my first post",
    url: "https://picsum.photos/400/200",
    comments: [comment1,comment2]
}
const post2 = {
    id: "2",
    user: "kant95270@gmail.com",
    content: "This is my second post",
    url: "https://picsum.photos/400/200",
    comments: [comment2]
}
const post3 = {
    id: "3",
    user: "kant95270@gmail.com",
    content: "This is my third post",
    url: "https://picsum.photos/400/200",
    comments: [ ]
}

const posts = [post1, post2, post3]

function getPosts(req, res) {
    const email = req.email 
    res.send({ posts, email })    
}

function createPost(req ,res) {
    const content = req.body.content
    const hasImage= req.file != null
    
    const url = hasImage ? createImageUrl(req) : null
    const email = req.email
    const post = { content , user: email , comments: [], imageUrl : url, id: posts.length + 1}
    posts.unshift(post)
    res.send({ post })
}

function createImageUrl(req) {
    let pathToImage = req.file.path.replace("\\","/")
    const protocol = req.protocol
    const host =req.get("host")
    return `${protocol}://${host}/${pathToImage}`
}

function deletePost(req, res) {
    const postId = req.params.id
    const post = posts.find((post) => post.id === postId)
    if ( post == null) {
        return res.status(404).send({ error: "Post not found"})
    }
    const index = posts.indexOf(post)
    posts.splice(index, 1)
    deleteComments(post)
    res.send({ message : `Post ${postId} was deleted`, posts})
}

function deleteComments(post){
    post.comments = []
}

function createComment(req, res) {
    const postId = req.params.id
    const post =posts.find((post) => post.id === postId)
   
    const id =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const user = req.email
    const commentToSend = { id, user, content: req.body.comment }
    post.comments.push(commentToSend)
    res.send({ post })
}

module.exports = {getPosts, createPost, deletePost, createComment }