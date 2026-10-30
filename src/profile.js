// create a profile
function createProfile() {
    const proContainer = document.querySelector("#profiles-container")
    const form = document.querySelector("#create-profile form")
    const btn = document.querySelector("#ajouterPro-btn")
    btn.addEventListener("click", (e) => {
        e.stopPropagation()
        document.querySelector("#create-profile").classList.remove("hidden")
        form.addEventListener("submit", (event) => {
            event.preventDefault()
            const { nom, avatar } = form.elements
            let isValid = true
            if (isValidNom(nom)) {
                profiles.forEach((p) => {
                    if (p.nom === nom) {
                        isValid = false

                    }
                })
            }
            if (!isValidNom(nom)) {
                isValid = true

            }
            if (isValid) {
                const profile = {
                    id: "",
                    nickname: nom,
                    avatar: avatar.name,
                    image:  avatar.link,
                    stats: {
                        parties:0,
                        vic: [],
                        draw: [],
                        lose: []
                    },
                    createAt: "",
                }
                profiles.push(profile)
            }
            proContainer.innerHTML = ""
            createProfiles()
            form.reset()
        })
    })
}
function isValidNom(nom) {
    return /^[A-Za-z0-9]{3,15}$/.test(nom)
}
function createProfiles() {
    const proContainer = document.querySelector("#profiles-container")
    const copy = profiles.slice()
    proContainer.innerHTML=""
    copy.forEach((p) => {
        const profile = document.createElement('div')
        profile.className = "flex felx-col items-center justify-center w-full h-20 p-4 gap-4 "
        profile.innerHTML = `
        <img class="w-10 h-10 rounded-full border-white" src="${p.avatar.image}" alt="avatar ${p.avatar.name}">
        <div class="flex flex-col items-center gap-2 p-2">
        <h2>${p.nickname}</h2>
        <p>${p.stats.parties} Parties<p>
        </div>
        `
        const addbutton = document.createElement("button")
        addbutton.textContent = "✎"
        addbutton.className = " btn-edit bg-[#F5B942] p-2 rounded-md text-sm font-bold text-white hover:bg-[#F5B942]/90"
        addbutton.setAttribute()
        addbutton.addEventListener("click", (e) => {
            e.stopPropagation();
           
        });
        const addbutton2 = document.createElement("button")
        addbutton2.textContent = "✖"
        addbutton2.className = " btn-suprime bg-[#F5B942] p-2 rounded-md text-sm font-bold text-white hover:bg-[#F5B942]/90"
        addbutton2.setAttribute()
        addbutton2.addEventListener("click", (e) => {
            e.stopPropagation();
           
        });
        profile.appendChild(addbutton)
        profile.appendChild(addbutton2)
        proContainer.appendChild(profile)
    })
}