enum GalleryFilterType {
    Name,
    Level,
    Rank,
    Role,
}

enum GalleryFilterOrder {
    Asc,
    Desc,
}

class GalleryManager {
    private statblocks: StatBlockWithPath[]
    folderList: string[]
    table: HTMLElement
    tableBody: HTMLElement
    folderSelect: HTMLSelectElement
    gitUsername: string
    gitRepo: string
    filter: GalleryFilterType
    filterOrder: GalleryFilterOrder

    constructor(idTableau: string, idFolderSelect: string){
        this.statblocks = Array()
        this.folderList = Array()
        this.table = document.getElementById(idTableau)
        this.tableBody = this.table.querySelector("tbody")
        this.folderSelect = getSelectById(idFolderSelect)
        this.filter = GalleryFilterType.Name
        this.filterOrder = GalleryFilterOrder.Asc
    }

    AddStatblock(statblock: StatBlockWithPath, path: string){
        const rawPath = "https://raw.githubusercontent.com/" + this.gitUsername + "/" + this.gitRepo + "/main/";
        const hierarchy = decodeURI(path.replace(rawPath, "").replace(".json", ""))
        statblock.path = hierarchy.substring(0, hierarchy.lastIndexOf("/"))
        this.statblocks.push(statblock)
    }

    GetStatblockByName(name: string) : Statblock {
        return this.statblocks.find((x) => x.header.name === name)
    }

    EmptyStatblocks(){
        this.statblocks = Array()
        this.folderList = Array()
    }

    EmptyTable(){
        this.tableBody.querySelectorAll("tr").forEach(x => x.remove())
    }

    GetStatblocksInFolder(folder: string, showChilden: boolean){
        let statList: StatBlockWithPath[]
        if(folder === "" && showChilden){
            statList = this.statblocks
        }
        else if(showChilden) {
            statList = this.statblocks.filter(statblock => statblock.path.startsWith(folder))
        }
        else{
            statList = this.statblocks.filter(statblock => statblock.path === folder)
        }
        this.FillTable(statList)
    }

    RefreshSortArrow() {
        const headerRow = this.table.querySelector("thead tr")
        let header: HTMLElement
        headerRow.querySelectorAll("i").forEach(x => x.remove())

        if(this.filter === GalleryFilterType.Name){ header = headerRow.querySelectorAll("th")[0] }
        else if (this.filter === GalleryFilterType.Level) { header = headerRow.querySelectorAll("th")[1] }
        else if (this.filter === GalleryFilterType.Rank) { header = headerRow.querySelectorAll("th")[2] }
        else if (this.filter === GalleryFilterType.Role) { header = headerRow.querySelectorAll("th")[3] }

        const icon = document.createElement("i")
        if(this.filterOrder === GalleryFilterOrder.Asc){
            icon.className = "bi bi-arrow-down ml-1"
        }
        else {
            icon.className = "bi bi-arrow-up ml-1"
        }
        header.appendChild(icon)
    }

    private ApplyFilter(statblocksAFiltrer: StatBlockWithPath[]){
        //Always Order by name first, will act as secondary sort
        statblocksAFiltrer.sort((a, b) => this.statblockSortString(a.header.name,b.header.name))

        if(this.filter != GalleryFilterType.Name && this.filterOrder === GalleryFilterOrder.Desc) {
            statblocksAFiltrer.reverse()
        }

        if (this.filter === GalleryFilterType.Level){
            statblocksAFiltrer.sort((a, b) => this.statblockSortNumber(a.header.level, b.header.level))
        }
        else if (this.filter === GalleryFilterType.Rank){
            statblocksAFiltrer.sort((a, b) => this.statblockSortNumber(a.header.rank, b.header.rank))
        }
        else if (this.filter === GalleryFilterType.Role){
            statblocksAFiltrer.sort((a, b) => this.statblockSortNumber(a.header.role, b.header.role))
        }

        if(this.filterOrder === GalleryFilterOrder.Desc) {
            statblocksAFiltrer.reverse()
        }

        return statblocksAFiltrer
    }

    private statblockSortString(string1: string, string2: string){
        let a = String(string1).toLowerCase()
        let b = String(string2).toLowerCase()
        if (a < b) return -1
        else if (a > b) return 1
        else return 0
    }
    private statblockSortNumber(nb1: number, nb2: number){
        return nb1 - nb2
    }

    private FillTable(statblocks: StatBlockWithPath[]){
        this.EmptyTable()
        let statFiltrees = this.ApplyFilter(statblocks)
        statFiltrees.forEach(statblock => this.CreateRow(statblock))
    }

    async RefreshData(gitUsername: string, gitRepo: string){
        this.ShowLoading()
        const sourcesStats: string[] = await this.fetchSourceGitHub(gitUsername, gitRepo)
        await sourcesStats.forEach(async (sourceStatblock, index) => {
            const statblock = await this.fetchStatblock(sourceStatblock)
            gallery.AddStatblock(statblock, sourceStatblock)
        })
        setTimeout(() => {
            this.FillTable(this.statblocks)
            this.InitializeFolderList()
        }, 2000);
    }

    private fetchSourceGitHub(gitUsername: string, gitRepo: string){
            this.gitUsername = gitUsername
            this.gitRepo = gitRepo
            const apiCall = "https://api.github.com/repos/" + this.gitUsername + "/" + this.gitRepo + "/git/trees/main?recursive=1";
            const rawPath = "https://raw.githubusercontent.com/" + this.gitUsername + "/" + this.gitRepo + "/main/";
        
            return fetch(apiCall)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.tree.filter((file: { path: string, type: string }) => {
                    if(file.type === "blob" && file.path.substring(file.path.length-5) == ".json"){
                        return file
                    }
                })
                const filePaths = filteredData.map((file: { path: string, type: string }) => {
                    return encodeURI(rawPath+file.path);
                })
                return filePaths
            })
            .catch(function(e) {console.error(e) })

    }
    
    private fetchStatblock(source:string)  {
        return fetch(source)
        .then(response => response.json())
        .then(data => {
            return Object.setPrototypeOf(data, Statblock.prototype)
        })
        .catch(function(e) {console.error(e) })
    }
        
    private CreateRow(statblock: Statblock) {
        const row = document.createElement("tr")
        row.addEventListener('click', () => {
            clickGalleryRow(String(statblock.header!.name))
        })
        const cell1 = document.createElement("td")
        const cell2 = document.createElement("td")
        const cell3 = document.createElement("td")
        const cell4 = document.createElement("td")
    
        cell1.textContent = String(statblock.header!.name)
        cell2.textContent = String(statblock.header!.level)
        cell3.textContent = Rank[Number(statblock.header!.rank)]
        cell4.textContent = Role[Number(statblock.header!.role)]
    
        row.appendChild(cell1)
        row.appendChild(cell2)
        row.appendChild(cell3)
        row.appendChild(cell4)
    
        this.tableBody.appendChild(row)
    }

    private ShowLoading() {
        this.EmptyTable()
        const row = document.createElement("tr")
        row.className = "loading"
        const cell = document.createElement("td")
        cell.colSpan = 4
        cell.innerHTML = "<div class='text-center'><h4>Chargement...</h4><div class='spin'></div></div>"
        row.appendChild(cell)
        this.tableBody.appendChild(row)
    }

    private InitializeFolderList() {
        let map = gallery.statblocks.map((x) => {return x.path})
        this.folderList = Array.from(new Set(map))
        this.folderList.sort()
        removeOptions(this.folderSelect)
        addDefaultOptionToSelect(this.folderSelect, true)
        this.folderList.forEach(folder => {
            if(folder != "") {
                addOptionToSelect(this.folderSelect, folder.replace("/", " / "), folder)
            }
        })
    }
}
