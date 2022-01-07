function navMenuPrincipal(){
    show("mainMenu")
    hide("loginScreen")
    hide("statblockCreation")
    hide("statblockGallery")
}

function navStatblockCreation(){
    hide("mainMenu")
    hide("loginScreen")
    show("statblockCreation")
    hide("statblockGallery")
}

function navLogin(){
    hide("mainMenu")
    show("loginScreen")
    hide("statblockCreation")
    hide("statblockGallery")
}

function navStatblockGallery(){
    hide("mainMenu")
    hide("loginScreen")
    hide("statblockCreation")
    show("statblockGallery")

    initializeGallery();
}

function openGitHub(){
    if(githubRepo.value != "" && githubUsername.value != ""){
        const urlGitHub = `https://github.com/${githubUsername.value}/${githubRepo.value}`
        window.open(urlGitHub, "_blank")
    }
}