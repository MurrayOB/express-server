const usersDOM = document.querySelector('.users')
const formDOM = document.querySelector('.user-form')
const usernameDOM = document.querySelector('.username')
const emailDOM = document.querySelector('.email')
const nameDOM = document.querySelector('.name')
const responseDOM = document.querySelector('.response')

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const name = nameDOM.value; 
    const email = emailDOM.value; 
    const username = usernameDOM.value; 

    const User = {
        name: name, 
        email: email, 
        username: username
    }

    await axios.post('/api/v1/users/createUser', User)
    .then((res) => {
        responseDOM.textContent = res.data.Message
    })
    .catch((err) => {
        document.getElementById("res").innerHTML = err
    })
})
