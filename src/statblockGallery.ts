let gallery: GalleryManager

async function initializeGallery(){
    if(gallery == undefined){
        gallery = new GalleryManager("tableGallery", "selectGalleryFolder")
        if(githubUsername.value != "" && githubRepo.value != ""){
            const checkBoxEnfant = <HTMLInputElement>document.getElementById("checkGalleryFolder")
            checkBoxEnfant.checked = true
            gallery.RefreshData(githubUsername.value, githubRepo.value)
        }
        else {
            alert("You need to connect to github")
        }
    }
}

function clickGalleryRow(name: string) {
    gallery.GetStatblockByName(name).Show("statblockShow")
}

function folderSelectionChanged(){
    const selectValue:string = (<HTMLSelectElement>document.getElementById("selectGalleryFolder")).value
    const showChildren:boolean = (<HTMLInputElement>document.getElementById("checkGalleryFolder")).checked

    gallery.GetStatblocksInFolder(selectValue, showChildren)
}

function galleryRefresh(){
    if(githubUsername.value != "" && githubRepo.value != ""){
        gallery = new GalleryManager("tableGallery", "selectGalleryFolder")
        const checkBoxEnfant = <HTMLInputElement>document.getElementById("checkGalleryFolder")
        checkBoxEnfant.checked = true
        gallery.RefreshData(githubUsername.value, githubRepo.value)
    }
    else {
        alert("You need to connect to github")
    }
}

function gallerySort(column: string){
    if(column === "name"){
        gallery.filterOrder = toggleFilterOrder(gallery.filter != GalleryFilterType.Name)
        gallery.filter = GalleryFilterType.Name
    }
    else if (column === "level") {
        gallery.filterOrder = toggleFilterOrder(gallery.filter != GalleryFilterType.Level)
        gallery.filter = GalleryFilterType.Level
    }
    else if (column === "rank") {
        gallery.filterOrder = toggleFilterOrder(gallery.filter != GalleryFilterType.Rank)
        gallery.filter = GalleryFilterType.Rank
    }
    else if (column === "role") {
        gallery.filterOrder = toggleFilterOrder(gallery.filter != GalleryFilterType.Role)
        gallery.filter = GalleryFilterType.Role
    }

    gallery.RefreshSortArrow()
    folderSelectionChanged()
}

function toggleFilterOrder(forceAsc: boolean = false): GalleryFilterOrder{
    if(forceAsc || gallery.filterOrder === GalleryFilterOrder.Desc){
        return GalleryFilterOrder.Asc
    }
    else {
        return GalleryFilterOrder.Desc
    }
}