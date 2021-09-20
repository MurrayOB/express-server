const formDOM = document.querySelector(".loginForm");
const usernameDOM = document.querySelector(".username");
const passwordDOM = document.querySelector(".password");
const responseDOM = document.querySelector(".response")

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();

  await axios
    .post("/api/v1/users/login", {
      username: usernameDOM.value,
      password: passwordDOM.value,
    })
    .then((res) => {
        responseDOM.textContent = JSON.stringify(res.data)
        if(res.data.success){
          window.location.href = "/dashboard"
        }
    })
    .catch((err) => {
      responseDOM.textContent = err
    });
});
