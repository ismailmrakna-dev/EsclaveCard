// create a profile
function createProfile(){
    const proContainer= document.querySelector("#profiles-container")
    const form =document.querySelector("#create-profile form")
    const btn=document.querySelector("#ajouterPro-btn")
    btn.addEventListener("click",(e)=>{
      form.addEventListener("submit", (event)=>{
        event.preventDefault()
        const {nom,avatar}=form.elements
        let isValid=true
        if(isValidNom(nom)){
            profiles.forEach((p)=>{
                if(p.nom===nom){
                    isValid=false

                }
            })
        }
        if(!isValidNom(nom)){
            isValid=true

        }
        if (isValid){
            const profile={
                id:"", 
                nickname : nom,
                avatar: avatar.name,
                stats:{
                    vic:[],
                    draw:[],
                    lose:[]
                },
                createAt:"",
            }
            profiles.push(profile)
        }
        proContainer.innerHTML=""
        createProfiles()
        form.reset()
      })
    })
}
function isValidNom(nom){
    return /^[A-Za-z0-9]{3,15}$/.test(nom)
}
function createProfiles(){
    const proContainer= document.querySelector("#profiles-container")
    const copy = profiles.slice()
    copy.forEach((p)=>{
        const profile = document.createElement('div')
        profile.className=""
        profile.innerHTML=``
        proContainer.appendChild(profile)
    })
}