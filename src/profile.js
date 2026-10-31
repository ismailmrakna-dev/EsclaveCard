// create a profile
function createProfile() {
    const form = document.querySelector("#create-profile form")
    const btn = document.querySelector("#ajouterPro-btn")
    const message = document.querySelector("#message")
    const avatarCon = document.querySelector("#avatars")
    let selectavt = null
    avatarCon.addEventListener('click', (e) => {
        const clickavat = e.target.closest(".character");
        if (!clickavat) {
            return
        }
        const arr = document.querySelectorAll(".character")
        arr.forEach((a) => a.classList.remove("ring-2", "ring-blue-500"))
        clickavat.classList.add("ring-2", "ring-blue-500")
        selectavt = {
            name: clickavat.querySelector("p").textContent.trim() ,
            link: clickavat.querySelector("img").src
        }

    })
    btn.addEventListener("click", (e) => {
        e.stopPropagation()
        document.querySelector("#create-profile").classList.remove("hidden")
        form.addEventListener("submit", (event) => {
            event.preventDefault()
            const nom = document.querySelector('.nick-name')
            let isValid = true
            if (isValidNom(nom.value)) {
                profilesdata.forEach((p) => {
                    if (p.nom === nom.value) {
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
                    id: "125",
                    nickname: nom.value,
                    avatar: "" + selectavt.name,
                    image: "" + selectavt.link,
                    stats: {
                        parties: 0,
                        vic: [],
                        draw: [],
                        lose: []
                    },
                    createAt: "",
                }
                profilesdata.push(profile)
            }
            createProfiles()
            form.reset()
        })
    })
}
createProfile()


function isValidNom(nom) {
    return /^[A-Za-z0-9]{3,15}$/.test(nom)
}
function createProfiles() {
    const proContainer = document.querySelector("#profiles-container")
    proContainer.innerHTML = ""
    profilesdata.forEach((p) => {
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
            showprofile(p.id)
        })
        const addbutton = document.createElement("button")
        addbutton.textContent = "✎"
        addbutton.className = "btn-edit bg-[#F5B942] p-2 rounded-md text-sm font-bold text-white hover:bg-[#F5B942]/90"
        addbutton.setAttribute("idMod", p.id)
        addbutton.addEventListener("click", (e) => {
            e.stopPropagation()
            modifyProfile(p)
        });
        const addbutton2 = document.createElement("button")
        addbutton2.textContent = "✖"
        addbutton2.className = " btn-suprime bg-[#F5B942] p-2 rounded-md text-sm font-bold text-white hover:bg-[#F5B942]/90"
        addbutton2.setAttribute("idDel", p.id)
        addbutton2.addEventListener("click", (e) => {
            deleteProfile(p.id)

        });
        profile.appendChild(addbutton)
        profile.appendChild(addbutton2)
        proContainer.appendChild(profile)
    })
}
createProfiles()


// show detail profile 
function showprofile(prof) {
    const show = document.querySelector("#detail-profile")
    show.innerHTML = ""
    const elem = document.createElement('div')
    elem.innerHTML = `
        <img class="w-10 h-10 rounded-full border-white" src="${prof.image}" alt="avatar ${prof.avatar}">
        <div class="flex flex-col items-center gap-2 p-2">
        <h2>${prof.nickname}</h2>
        <p>${prof.stats.parties} Parties<p>
        `
    show.appendChild(elem)

}

/// Suprimmer profile
function deleteProfile(idprofile) {
    let index = profilesdata.find((p) => p.id === idprofile)
    if (index) {
        profilesdata = profilesdata.filter((p) => p.id !== idprofile)
    }
    createProfiles()
}
// modify profile
function modifyProfile(prof) {
    const proContainer = document.querySelector("#profiles-container")
    const form = document.querySelector("#create-profile form")
    const avatarCon = document.querySelector("#avatars")
    const nom = document.querySelector('.nick-name')
    const arr = document.querySelectorAll(".character")
    document.querySelector("#create-profile").classList.remove("hidden")
    arr.forEach((a) => {
        a.classList.remove("ring-2", "ring-blue-500")
        const navt=a.querySelector("p").textContent.trim()
        if (navt === prof.avatar) {
            a.classList.add("ring-2", "ring-blue-500")
        }
    })
    nom.value = prof.nickname

    let selectavt ={ 
        name:prof.avatar,
        link:prof.image
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
                if (p.nom === nom.value) {
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
            
        }
        createProfiles()
        form.reset()
    })

}

// select un joueur
function selectProfile(prof) {
    const headerprof = document.querySelector("#header-profile")
    headerprof.innerHTML = ""
    headerprof.innerHTML = `<img class="h-7 w-7 rounded-full" src="${prof.image}" alt="">
            <span id="name-profile" class="text-lg font-semibold">${prof.nickname}</span>`
}
