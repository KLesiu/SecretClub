const joinClubButton = document.querySelector("#joinClub")


const showPopUp =()=>{
    const formPopUp = document.createElement("form")
    formPopUp.id="formPopUp"
    formPopUp.action="/check"
    formPopUp.method="POST"
    const h2 = document.createElement("h2")
    h2.textContent="Type $ecretKey here:"
    
    const input = document.createElement("input")
    input.type="text"
    input.name="key"

    const closeButton = document.createElement("button")
    closeButton.id="closeButton"
    closeButton.textContent="X"
    closeButton.type="button"

    const button = document.createElement("button")
    button.id="joinButton"
    button.type= "submit"
    button.textContent="JOIN"

    const a = document.createElement("a")
    a.href="https://www.flaticon.com/free-icons/crown"
    a.target="_blank"

    const img = document.createElement("img")
    img.src="../images/crown.png"
    a.appendChild(img)

    const p = document.createElement("p")
    p.id="infoJoinForm"
    p.textContent="If you type correct key, you will get a crown next to your nickname."

  
    formPopUp.appendChild(a)
    formPopUp.appendChild(h2)
    formPopUp.appendChild(input)
    formPopUp.appendChild(button)
    formPopUp.appendChild(p)
    formPopUp.appendChild(closeButton)
   

    document.querySelector("#glass").appendChild(formPopUp)

}




joinClubButton.addEventListener("click",()=>{
    const div = document.createElement("div")
    div.id="glass"
    document.body.appendChild(div)
    document.body.classList.add("overflow")
    window.scrollTo(0,0)
    showPopUp()
    document.querySelector("#closeButton").addEventListener("click",()=>{
      document.body.removeChild(document.querySelector("#glass"))  
    })
    
    
})

