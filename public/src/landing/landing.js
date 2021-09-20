const contentDOM = document.querySelector('.content')

const onLoad = () => {
    const content = 
    `
        <div class="landing">
            <h1>This is some Content</h1>
        </div>
    `; 

    return contentDOM.innerHTML = content; 
}

onLoad()