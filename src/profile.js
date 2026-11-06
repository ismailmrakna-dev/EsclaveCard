
let selectedid=""
export function createProfiles() {
    const proContainer = document.querySelector("#profiles-container")
    proContainer.innerHTML = ""
    const copy = profilesdata.slice()
    copy.forEach((p) => {
        const profile = document.createElement('div')
        profile.className = "flex felx-col items-center justify-center w-full h-30 p-4 gap-4 "
        profile.innerHTML = `
        <img class="w-10 h-10 rounded-full border-white" src="${p.image}" alt="avatar ${p.avatar}">
        <div class="flex flex-col items-center gap-2 p-2">
        <h2>${p.nickname}</h2>
        <p>${p.stats.parties} Parties<p>
        <div>
        `

        profile.style.cursor = "pointer";
        profile.addEventListener("click", (e) => {
            e.stopPropagation()
            showprofile(p)
        })
        profile.addEventListener("click",()=>{
            selectProfile(p)
        })
        const addbutton = document.createElement("button")
        addbutton.textContent = "✎"
        addbutton.className = "btn-edit bg-[#F5B942] p-2 rounded-md text-sm font-bold text-white hover:bg-[#F5B942]/90"
        addbutton.setAttribute("idMod", p.id)
        addbutton.addEventListener("click", (e) => {
            e.stopPropagation()
            modifyProfile(p.id)
        });
        const addbutton2 = document.createElement("button")
        addbutton2.textContent = "✖"
        addbutton2.className = " btn-suprime bg-[#F5B942] p-2 rounded-md text-sm font-bold text-white hover:bg-[#F5B942]/90"
        addbutton2.setAttribute("idDel", p.id)
        addbutton2.addEventListener("click", (e) => {
            e.stopPropagation
            deleteProfile(p.id)

        });
        profile.appendChild(addbutton)
        profile.appendChild(addbutton2)
        proContainer.appendChild(profile)
    })
}



// create a profile
export function createProfile() {
    clearForm()
    const form = document.querySelector("#create-profile form")
    const proContainer = document.querySelector("#create-profile")
    const title = proContainer.querySelector("h1")
    const subBtn = proContainer.querySelector('#submit-form')
    const resBtn = proContainer.querySelector("#reset-form")
    title.textContent = "Creer un Profile"
    subBtn.textContent = "Ajouter"
    resBtn.textContent = "Effacer"


    const message = document.querySelector("#message")
    const avatarCon = document.querySelector("#avatars")

    document.querySelector("#create-profile").classList.remove("hidden")
    let selectavt = null
    avatarCon.addEventListener('click', (e) => {
            const clickavat = e.target.closest(".character");
            if (!clickavat) {
                isValid = false
                message.textContent = ""
                message.className = "text-[#8E202B] font-semibold text-md"
                message.textContent = "should select one avatar"
                return
            }
            clickavat.classList.add("ring-2", "ring-blue-500")
            selectavt = {
                name: clickavat.querySelector("p").textContent.trim(),
                link: clickavat.querySelector("img").src
            }
    })
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const nom = document.querySelector('.nick-name')
        let isValid = true
        if (isValidNom(nom.value)) {
            profilesdata.forEach((p) => {
                if (p.nickname.toLowerCase() === nom.value.toLowerCase()) {
                    isValid = false
                    message.textContent = ""
                    message.className = "text-[#8E202B] font-semibold text-md"
                    message.textContent = "Nom ajouté existe"
                    return
                }
            })
        }
        if (!isValidNom(nom.value)) {
            isValid = false
            message.textContent = ""
            message.className = "text-[#8E202B] font-semibold text-md"
            message.textContent = "NO valid Nom (2-15 character)"
            return

        }

        


        if (isValid) {
            const profile = {
                id: `p_${Date.now()}`,
                nickname: nom.value,
                avatar: "" + selectavt.name,
                image: "" + selectavt.link,
                stats: {
                    parties: 0,
                    score,
                    vic: [],
                    draw: [],
                    lose: []
                },
                createAt: new Date().toJSON().slice(0,10)
            };
            profilesdata.push(profile);
        }
        createProfiles()
        form.reset()
    })
    
    
}

// modify profile
export function modifyProfile(idProfile) {
    clearForm()
    const form = document.querySelector("#create-profile form")
    const proContainer = document.querySelector("#create-profile")
    const title = proContainer.querySelector("h1")
    const subBtn = proContainer.querySelector('#submit-form')
    const resBtn = proContainer.querySelector("#reset-form")
    title.textContent = "Modifier Profil"
    subBtn.textContent = "Enregistrer"
    resBtn.textContent = "Annuler Mod"
    const message = document.querySelector("#message")
    const avatarCon = document.querySelector("#avatars")
    const nom = document.querySelector('.nick-name')
    const arr = avatarCon.querySelectorAll(".character")
    let index = -1
    console.log(idProfile)
    for(let i=0;i<profilesdata.length;i++){
        if(profilesdata[i].id == idProfile){
            index=i
            break
        }
        
    }
    const prof = profilesdata.find(p => p.id === idProfile)
    document.querySelector("#create-profile").classList.remove("hidden")
    nom.value=prof.nickname
    arr.forEach((a) => {
        const navt = a.querySelector("p").textContent.trim().toLowerCase()
        if (navt === prof.avatar.toLowerCase()) {
            a.classList.add("ring-2", "ring-blue-500")
        }
    })
    let selectavt = {
            name: prof.avatar,
            link: prof.image
        }
    avatarCon.addEventListener('click', (e) => {
            const clickavat = e.target.closest(".character");
            if (!clickavat) {
                return
            }
            const arr = document.querySelectorAll(".character")
            arr.forEach((a) => a.classList.remove("ring-2", "ring-blue-500"))
            clickavat.classList.add("ring-2", "ring-blue-500")
            selectavt = {
                name: "" + clickavat.querySelector("p").textContent.trim(),
                link: "" + clickavat.querySelector("img").src
            }
            console.log(selectavt)
        })
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let isValid = true
        
        if (isValidNom(nom.value)) {
            profilesdata.forEach((p,ind ) => {
                if (p.nickname.toLowerCase() === nom.value.toLowerCase() && ind!==index) {
                    isValid = false
                    message.textContent = ""
                    message.className = "text-[#8E202B] font-semibold text-md"
                    message.textContent = "Nom ajouté existe"
                    return
                }
            })
        }
        if (!isValidNom(nom.value)) {
            isValid = false
            message.textContent = ""
            message.className = "text-[#8E202B] font-semibold text-md"
            message.textContent = "NO valid Nom (2-15 character)"
            return

        }


        if (isValid) {
            profilesdata[index].nickname = nom.value
            profilesdata[index].image = selectavt.link
            profilesdata[index].avatar = selectavt.name
            
        }
        createProfiles()
        form.reset()
        clearForm()
        document.querySelector("#create-profile").classList.add("hidden")
    })   
}
function clearForm() {
    const form = document.querySelector("#create-profile form")
    const proContainer = document.querySelector("#create-profile")
    const input = form.querySelector('.nick-name')
    const avatars = form.querySelector('#avatars')
    const title = proContainer.querySelector("h1")
    const message = document.querySelector("#message")
    const subBtn = proContainer.querySelector('#submit-form')
    const resBtn = proContainer.querySelector("#reset-form")
    input.textContent = ""
    title.textContent = ""
    subBtn.textContent = ""
    resBtn.textContent = ""
    message.textContent = ""
    avatars.querySelectorAll('.character').forEach((c) => c.classList.remove("ring-2", "ring-blue-500"))
}

function isValidNom(nom) {
    return /^[A-Za-z0-9]{3,15}$/.test(nom)
}


// show detail profile 
export function showprofile(prof) {
    const show = document.querySelector("#detail-profile")
    show.innerHTML = ""
    const elem = document.createElement('div')
    elem.innerHTML = `
        <img class="w-10 h-10 rounded-full border-white" src="${prof.image}" alt="avatar ${prof.avatar}">
        <div class="flex flex-col items-center gap-2 p-2">
        <h2>${prof.nickname}</h2>
        <p>${prof.stats.parties} Parties</p>
        `
    show.appendChild(elem)

}

/// Suprimmer profile
export function deleteProfile(idprofile) {
    let index = profilesdata.find((p) => p.id === idprofile)
    if (index) {
        profilesdata = profilesdata.filter((p) => p.id !== idprofile)
    }
    createProfiles()
}
// select un joueur
export function selectProfile(prof) {
    const headerprof = document.querySelector("#header-profile")
    selectedid+=prof.id
    headerprof.innerHTML = ""
    headerprof.innerHTML = `<img class="h-7 w-7 rounded-full" src="${prof.image}" alt="">
            <span id="name-profile" class="text-lg font-semibold">${prof.nickname}</span>`
}

