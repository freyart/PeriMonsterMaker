class FeatureManager {
    constructor() {
        this.compteurId = 0;
        this.conteneur = document.getElementsByClassName("features-container")[0];
        const btnAddFeature = document.getElementById("btnAddFeature");
        btnAddFeature.addEventListener('click', () => {
            this.AddFeatureLine();
        });
        this.AddFeatureLine();
        this.templates = this.GetQuickTemplates();
    }
    Count() {
        return this.conteneur.getElementsByClassName("feature-row").length;
    }
    GetFeature(index) {
        let ligneFeature;
        if (index > this.Count() - 1 || index < 0)
            throw new RangeError();
        else
            ligneFeature = this.conteneur.getElementsByClassName("feature-row")[index];
        const name_input = ligneFeature.querySelector(".feature-name");
        const type_input = ligneFeature.querySelector(".feature-type");
        const rarity_input = ligneFeature.querySelector(".feature-rarity");
        const particularity_input = ligneFeature.querySelector(".feature-particularity");
        const description_input = ligneFeature.querySelector(".feature-description");
        let feature = {
            name: name_input.value,
            type: Number(type_input.value),
            rarity: Number(rarity_input.value),
            particularity: particularity_input.value,
            description: description_input.value,
        };
        return feature;
    }
    GetFeatures() {
        let list = new Array();
        for (let i = 0; i < this.Count(); i++) {
            let feature = this.GetFeature(i);
            list.push({
                name: feature.name,
                type: feature.type,
                rarity: feature.rarity,
                particularity: feature.particularity,
                description: feature.description
            });
        }
        return list;
    }
    AddFeatureLine() {
        const ligneFeature = document.createElement("div");
        ligneFeature.className = "feature-row form-row bg-dark border p-2";
        ligneFeature.setAttribute("data-lineid", String(this.compteurId));
        ligneFeature.appendChild(this.createColName(this.compteurId));
        ligneFeature.appendChild(this.createColType());
        ligneFeature.appendChild(this.createColRarity());
        ligneFeature.appendChild(this.createColParticularity());
        ligneFeature.appendChild(this.createColDescription());
        this.conteneur.insertBefore(ligneFeature, this.conteneur.childNodes[this.Count() + 3]);
        this.compteurId++;
    }
    AddFeatureLineFrom(feature) {
        const ligneFeature = document.createElement("div");
        ligneFeature.className = "feature-row form-row bg-dark border p-2";
        ligneFeature.setAttribute("data-lineid", String(this.compteurId));
        ligneFeature.appendChild(this.createColName(this.compteurId, feature.name));
        ligneFeature.appendChild(this.createColType(feature.type));
        ligneFeature.appendChild(this.createColRarity(feature.rarity));
        ligneFeature.appendChild(this.createColParticularity(feature.particularity));
        ligneFeature.appendChild(this.createColDescription(feature.description));
        this.conteneur.insertBefore(ligneFeature, this.conteneur.childNodes[this.Count() + 3]);
        this.compteurId++;
    }
    RemoveFeatureLine(ligneid) {
        let ligneFeature;
        if (window.confirm("Delete this feature?")) {
            ligneFeature = this.conteneur.querySelector("[data-lineid='" + ligneid + "']");
            if (ligneFeature != null)
                ligneFeature.remove();
        }
    }
    MoveUp(ligneid) {
        const feature = this.conteneur.querySelector("[data-lineid='" + ligneid + "']");
        if (feature.previousElementSibling) {
            console.log("moving Up before");
            feature.parentNode.insertBefore(feature, feature.previousElementSibling);
        }
    }
    MoveDown(ligneid) {
        const feature = this.conteneur.querySelector("[data-lineid='" + ligneid + "']");
        if (feature.nextElementSibling) {
            console.log("moving Down");
            feature.parentNode.insertBefore(feature, feature.nextElementSibling.nextElementSibling);
        }
    }
    RemoveAllFeatures() {
        this.conteneur.innerHTML = "";
    }
    createColName(ligneId, value = "") {
        let colonne = document.createElement("div");
        const btnDel = document.createElement("button");
        const btnUp = document.createElement("button");
        const btnDown = document.createElement("button");
        const lblName = document.createElement("label");
        const txtName = document.createElement("input");
        colonne.className = "col-5";
        btnDel.className = "btn btn-sm btn-outline-danger mt-1 mb-1";
        btnDel.innerHTML = "<i class='bi bi-x-lg'></i>";
        btnDel.addEventListener('click', () => {
            this.RemoveFeatureLine(ligneId);
            updatePreview();
        });
        btnUp.innerHTML = "<i class='bi bi-arrow-bar-up'></i>";
        btnUp.className = "btn btn-sm btn-outline-secondary m-1";
        btnUp.addEventListener('click', () => {
            this.MoveUp(ligneId);
            updatePreview();
        });
        btnDown.innerHTML = "<i class='bi bi-arrow-bar-down'></i>";
        btnDown.className = "btn btn-sm btn-outline-secondary mt-1 mb-1";
        btnDown.addEventListener('click', () => {
            this.MoveDown(ligneId);
            updatePreview();
        });
        lblName.innerText = " Feature Name";
        lblName.className = "ml-2";
        txtName.type = "text";
        txtName.className = "form-control feature-name";
        txtName.placeholder = "Insert name here";
        txtName.value = value;
        txtName.addEventListener('change', () => {
            updatePreview();
        });
        colonne.appendChild(btnDel);
        colonne.appendChild(btnUp);
        colonne.appendChild(btnDown);
        colonne.appendChild(lblName);
        colonne.appendChild(txtName);
        return colonne;
    }
    createColType(value = FeatureType.Action) {
        let colonne = document.createElement("div");
        const label = document.createElement("label");
        const controle = document.createElement("select");
        const spacer = document.createElement("span");
        colonne.className = "col-2";
        label.innerText = "Type";
        spacer.className = "feature-label-spacer";
        controle.className = "form-control feature-type";
        controle.addEventListener('change', () => {
            updatePreview();
        });
        this.initializeSelectBox(controle, FeatureType, value);
        colonne.appendChild(spacer);
        colonne.appendChild(label);
        colonne.appendChild(controle);
        return colonne;
    }
    createColRarity(value = FeatureRarity.Common) {
        let colonne = document.createElement("div");
        const label = document.createElement("label");
        const controle = document.createElement("select");
        const spacer = document.createElement("span");
        colonne.className = "col-2";
        label.innerText = "Rarity";
        spacer.className = "feature-label-spacer";
        controle.className = "form-control feature-rarity";
        controle.addEventListener('change', () => {
            updatePreview();
        });
        this.initializeSelectBox(controle, FeatureRarity, value);
        colonne.appendChild(spacer);
        colonne.appendChild(label);
        colonne.appendChild(controle);
        return colonne;
    }
    createColParticularity(value = "") {
        let colonne = document.createElement("div");
        const label = document.createElement("label");
        const controle = document.createElement("input");
        const spacer = document.createElement("span");
        colonne.className = "col-3";
        label.innerText = "Particularities";
        spacer.className = "feature-label-spacer";
        controle.className = "form-control feature-particularity";
        controle.value = value;
        controle.placeholder = "ex: Recharge 5-6";
        controle.addEventListener('change', () => {
            updatePreview();
        });
        colonne.appendChild(spacer);
        colonne.appendChild(label);
        colonne.appendChild(controle);
        return colonne;
    }
    createColDescription(value = "") {
        let colonne = document.createElement("div");
        const label = document.createElement("label");
        const controle = document.createElement("textarea");
        colonne.className = "col-12";
        label.innerText = "Description";
        controle.className = "form-control feature-description";
        controle.rows = 3;
        controle.value = value;
        controle.addEventListener('change', () => {
            updatePreview();
        });
        colonne.appendChild(label);
        colonne.appendChild(controle);
        return colonne;
    }
    initializeSelectBox(selectbox, e, defaultValue) {
        const entries = getAllEnumEntries(e);
        for (let i = 0; i < entries.length; i++) {
            let option = document.createElement("option");
            option.text = entries[i][0];
            option.value = entries[i][1];
            option.selected = entries[i][1] === defaultValue;
            if (entries[i][0] === "None") {
                option.text = "—";
            }
            selectbox.add(option);
        }
    }
    InitializeQuickTemplates() {
        // <ul id="quick-templates" class="dropdown-menu">
        // <li><a class="dropdown-item"> Dropdown link</a></li>
        const conteneur = document.getElementById("quick-templates");
        conteneur.querySelectorAll("li").forEach(x => x.remove());
        this.templates.forEach((feature, i) => {
            const line = document.createElement("li");
            const link = document.createElement("a");
            link.className = "dropdown-item";
            link.text = feature.name;
            link.addEventListener('click', () => {
                quickTemplateClick(String(i));
            });
            line.appendChild(link);
            conteneur.appendChild(line);
        });
    }
    GetQuickTemplates() {
        const listeTemplates = Array();
        listeTemplates.push({ name: "Melee Attack", type: FeatureType.Action, rarity: FeatureRarity.Common, particularity: "",
            description: "<em>Melee:</em> +0 to hit, reach 5 ft., one target. <em>Hit:</em> 0 (1d4 + 0) slashing damage." });
        listeTemplates.push({ name: "Ranged Attack", type: FeatureType.Action, rarity: FeatureRarity.Common, particularity: "",
            description: "<em>Ranged:</em> +X to hit, range 30 ft., one target. <em>Hit:</em> 0 (1d4 + 0) slashing damage." });
        listeTemplates.push({ name: "Save Effect", type: FeatureType.Action, rarity: FeatureRarity.Common, particularity: "",
            description: "<em>Save:</em> DC 10 vs STAT, reach 5 ft., one target. <em>Hit:</em> 0 (1d4 + 0) slashing damage. The target is <em>Condition</em> (save ends, DC 10 STAT)." });
        listeTemplates.push({ name: "Area Save", type: FeatureType.Action, rarity: FeatureRarity.Common, particularity: "",
            description: "<em>Save:</em> DC 10 vs STAT, a 10 ft. radius sphere centered on a point within 30 ft. of you, all target. <em>Hit:</em> 0 (1d4 + 0) slashing damage. <em>Miss:</em> half damage." });
        listeTemplates.push({ name: "Utility: Damaging Terrain", type: FeatureType.Action, rarity: FeatureRarity.Uncommon, particularity: "Recharge 5-6",
            description: "<em>Utility:</em> Select a 10 ft. radius circle centered on a point within 30 ft. of you. <em>Effect: </em> the ground is difficult and unstable terrain until the start of your next turn. Any creature that enters or starts their turn within the terrain takes X bludgeoning damage." });
        listeTemplates.push({ name: "Utility: Buff", type: FeatureType.Action, rarity: FeatureRarity.Common, particularity: "Recharge 5-6",
            description: "<em>Utility:</em> range 30 ft., two friendly creatures. <em>Effect:</em> the creature gains advantage on saving throws. This effect ends at the start of your next turn." });
        /* ARCHETYPES */
        listeTemplates.push({ name: "Spell", type: FeatureType.Action, rarity: FeatureRarity.Common, particularity: "",
            description: "<em>Spell:</em> Cantrip, School, VSM|CR <[verbal, somatic, material, concentration, ritual]. <em>Ranged: </em> +X to hit, range 60 ft., one target. <em>Hit:</em> 0 (1d4 + 0) slashing damage." });
        /* PARAGON EFFECTS */
        listeTemplates.push({ name: "Paragon Power", type: FeatureType.Free, rarity: FeatureRarity.Uncommon, particularity: "1/round",
            description: "At the end of another creature's turn, you may regain one reaction and choose one of the following:<br>A. <b>Act:</b> Take an action. You may also spend some or all of your remaining movement as part of that action.<br>B. <b>Resist:</b> Reroll a saving throw against an ongoing effect. Spend [2*lvl] hit points to gain advantage on the roll." });
        listeTemplates.push({ name: "Paragon Defenses", type: FeatureType.Free, rarity: FeatureRarity.Rare, particularity: "3/lr",
            description: "When you would fail a saving throw, you may spend [2*lvl] hit points to succeed." });
        return listeTemplates;
    }
}
var GalleryFilterType;
(function (GalleryFilterType) {
    GalleryFilterType[GalleryFilterType["Name"] = 0] = "Name";
    GalleryFilterType[GalleryFilterType["Level"] = 1] = "Level";
    GalleryFilterType[GalleryFilterType["Rank"] = 2] = "Rank";
    GalleryFilterType[GalleryFilterType["Role"] = 3] = "Role";
})(GalleryFilterType || (GalleryFilterType = {}));
var GalleryFilterOrder;
(function (GalleryFilterOrder) {
    GalleryFilterOrder[GalleryFilterOrder["Asc"] = 0] = "Asc";
    GalleryFilterOrder[GalleryFilterOrder["Desc"] = 1] = "Desc";
})(GalleryFilterOrder || (GalleryFilterOrder = {}));
class GalleryManager {
    constructor(idTableau, idFolderSelect) {
        this.statblocks = Array();
        this.folderList = Array();
        this.table = document.getElementById(idTableau);
        this.tableBody = this.table.querySelector("tbody");
        this.folderSelect = getSelectById(idFolderSelect);
        this.filter = GalleryFilterType.Name;
        this.filterOrder = GalleryFilterOrder.Asc;
    }
    AddStatblock(statblock, path) {
        const rawPath = "https://raw.githubusercontent.com/" + this.gitUsername + "/" + this.gitRepo + "/main/";
        const hierarchy = decodeURI(path.replace(rawPath, "").replace(".json", ""));
        statblock.path = hierarchy.substring(0, hierarchy.lastIndexOf("/"));
        this.statblocks.push(statblock);
    }
    GetStatblockByName(name) {
        return this.statblocks.find((x) => x.header.name === name);
    }
    EmptyStatblocks() {
        this.statblocks = Array();
        this.folderList = Array();
    }
    EmptyTable() {
        this.tableBody.querySelectorAll("tr").forEach(x => x.remove());
    }
    GetStatblocksInFolder(folder, showChilden) {
        let statList;
        if (folder === "" && showChilden) {
            statList = this.statblocks;
        }
        else if (showChilden) {
            statList = this.statblocks.filter(statblock => statblock.path.startsWith(folder));
        }
        else {
            statList = this.statblocks.filter(statblock => statblock.path === folder);
        }
        this.FillTable(statList);
    }
    RefreshSortArrow() {
        const headerRow = this.table.querySelector("thead tr");
        let header;
        headerRow.querySelectorAll("i").forEach(x => x.remove());
        if (this.filter === GalleryFilterType.Name) {
            header = headerRow.querySelectorAll("th")[0];
        }
        else if (this.filter === GalleryFilterType.Level) {
            header = headerRow.querySelectorAll("th")[1];
        }
        else if (this.filter === GalleryFilterType.Rank) {
            header = headerRow.querySelectorAll("th")[2];
        }
        else if (this.filter === GalleryFilterType.Role) {
            header = headerRow.querySelectorAll("th")[3];
        }
        const icon = document.createElement("i");
        if (this.filterOrder === GalleryFilterOrder.Asc) {
            icon.className = "bi bi-arrow-down ml-1";
        }
        else {
            icon.className = "bi bi-arrow-up ml-1";
        }
        header.appendChild(icon);
    }
    ApplyFilter(statblocksAFiltrer) {
        //Always Order by name first, will act as secondary sort
        statblocksAFiltrer.sort((a, b) => this.statblockSortString(a.header.name, b.header.name));
        if (this.filter != GalleryFilterType.Name && this.filterOrder === GalleryFilterOrder.Desc) {
            statblocksAFiltrer.reverse();
        }
        if (this.filter === GalleryFilterType.Level) {
            statblocksAFiltrer.sort((a, b) => this.statblockSortNumber(a.header.level, b.header.level));
        }
        else if (this.filter === GalleryFilterType.Rank) {
            statblocksAFiltrer.sort((a, b) => this.statblockSortNumber(a.header.rank, b.header.rank));
        }
        else if (this.filter === GalleryFilterType.Role) {
            statblocksAFiltrer.sort((a, b) => this.statblockSortNumber(a.header.role, b.header.role));
        }
        if (this.filterOrder === GalleryFilterOrder.Desc) {
            statblocksAFiltrer.reverse();
        }
        return statblocksAFiltrer;
    }
    statblockSortString(string1, string2) {
        let a = String(string1).toLowerCase();
        let b = String(string2).toLowerCase();
        if (a < b)
            return -1;
        else if (a > b)
            return 1;
        else
            return 0;
    }
    statblockSortNumber(nb1, nb2) {
        return nb1 - nb2;
    }
    FillTable(statblocks) {
        this.EmptyTable();
        let statFiltrees = this.ApplyFilter(statblocks);
        statFiltrees.forEach(statblock => this.CreateRow(statblock));
    }
    async RefreshData(gitUsername, gitRepo) {
        this.ShowLoading();
        const sourcesStats = await this.fetchSourceGitHub(gitUsername, gitRepo);
        await sourcesStats.forEach(async (sourceStatblock, index) => {
            const statblock = await this.fetchStatblock(sourceStatblock);
            gallery.AddStatblock(statblock, sourceStatblock);
        });
        setTimeout(() => {
            this.FillTable(this.statblocks);
            this.InitializeFolderList();
        }, 2000);
    }
    fetchSourceGitHub(gitUsername, gitRepo) {
        this.gitUsername = gitUsername;
        this.gitRepo = gitRepo;
        const apiCall = "https://api.github.com/repos/" + this.gitUsername + "/" + this.gitRepo + "/git/trees/main?recursive=1";
        const rawPath = "https://raw.githubusercontent.com/" + this.gitUsername + "/" + this.gitRepo + "/main/";
        return fetch(apiCall)
            .then(response => response.json())
            .then(data => {
            const filteredData = data.tree.filter((file) => {
                if (file.type === "blob" && file.path.substring(file.path.length - 5) == ".json") {
                    return file;
                }
            });
            const filePaths = filteredData.map((file) => {
                return encodeURI(rawPath + file.path);
            });
            return filePaths;
        })
            .catch(function (e) { console.error(e); });
    }
    fetchStatblock(source) {
        return fetch(source)
            .then(response => response.json())
            .then(data => {
            return Object.setPrototypeOf(data, Statblock.prototype);
        })
            .catch(function (e) { console.error(e); });
    }
    CreateRow(statblock) {
        const row = document.createElement("tr");
        row.addEventListener('click', () => {
            clickGalleryRow(String(statblock.header.name));
        });
        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        const cell3 = document.createElement("td");
        const cell4 = document.createElement("td");
        cell1.textContent = String(statblock.header.name);
        cell2.textContent = String(statblock.header.level);
        cell3.textContent = Rank[Number(statblock.header.rank)];
        cell4.textContent = Role[Number(statblock.header.role)];
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        this.tableBody.appendChild(row);
    }
    ShowLoading() {
        this.EmptyTable();
        const row = document.createElement("tr");
        row.className = "loading";
        const cell = document.createElement("td");
        cell.colSpan = 4;
        cell.innerHTML = "<div class='text-center'><h4>Chargement...</h4><div class='spin'></div></div>";
        row.appendChild(cell);
        this.tableBody.appendChild(row);
    }
    InitializeFolderList() {
        let map = gallery.statblocks.map((x) => { return x.path; });
        this.folderList = Array.from(new Set(map));
        this.folderList.sort();
        removeOptions(this.folderSelect);
        addDefaultOptionToSelect(this.folderSelect, true);
        this.folderList.forEach(folder => {
            if (folder != "") {
                addOptionToSelect(this.folderSelect, folder.replace("/", " / "), folder);
            }
        });
    }
}
function navMenuPrincipal() {
    show("mainMenu");
    hide("loginScreen");
    hide("statblockCreation");
    hide("statblockGallery");
}
function navStatblockCreation() {
    hide("mainMenu");
    hide("loginScreen");
    show("statblockCreation");
    hide("statblockGallery");
}
function navLogin() {
    hide("mainMenu");
    show("loginScreen");
    hide("statblockCreation");
    hide("statblockGallery");
}
function navStatblockGallery() {
    hide("mainMenu");
    hide("loginScreen");
    hide("statblockCreation");
    show("statblockGallery");
    initializeGallery();
}
function openGitHub() {
    if (githubRepo.value != "" && githubUsername.value != "") {
        const urlGitHub = `https://github.com/${githubUsername.value}/${githubRepo.value}`;
        window.open(urlGitHub, "_blank");
    }
}
/* NAVIGATION */
const nav_EcranPrincipal = getElementById("mainMenu");
const nav_EcranLogin = getElementById("loginScreen");
const nav_EcranCreation = getElementById("statblockCreation");
const nav_EcranGallerie = getElementById("statblockGallery");
const info_stats = getElementById("info-stats");
const info_damage = getElementById("info-dam");
const info_damage_avg = getInputById("info-dam-avg");
const info_damage_dice = getSelectById("info-dam-dice");
const info_damage_formula = getInputById("info-dam-formula");
const info_damage_range = getInputById("info-dam-range");
const info_damage_maxDices = getInputById("info-dam-maxDices");
const info_damage_maxStatic = getInputById("info-dam-maxStatic");
const info_damage_multiplier = getInputById("info-dam-multiplier");
const info_preview = getElementById("info-prev");
const input_importJson = document.getElementById("import-statblock");
const githubUsername = document.getElementById("githubUsername");
const githubRepo = document.getElementById("githubRepo");
/* SECTION ENTÊTE */
const input_name = getInputById("name");
const input_level = getInputById("level");
const input_rank = getSelectById("rank");
const input_role = getSelectById("role");
const input_type = getSelectById("type");
const input_keywords = getInputById("keywords");
const input_size = getSelectById("size");
const input_origin = getSelectById("origin");
const input_form = getSelectById("form");
/* SECTION CALCULS */
const input_ac = getInputById("ac");
const input_hp = getInputById("hp");
const input_init = getInputById("init");
const input_perception = getInputById("perception");
const input_stealth = getInputById("stealth");
const input_speed = getInputById("speed");
const input_atk = getInputById("atk");
const input_dcLow = getInputById("dc-low");
const input_dcHigh = getInputById("dc-high");
const input_dmg = getInputById("dmg");
const input_prof = getInputById("prof");
const input_cr = getInputById("cr");
const input_xp = getInputById("xp");
/* SECTION STATSAUTRES */
const input_movement = getInputById("movement");
const input_skills = getInputById("skills");
const input_threshold = getInputById("dthreshold");
const input_vulnerable = getInputById("vulnerable");
const input_resistant = getInputById("resistant");
const input_dImmune = getInputById("dimmune");
const input_cImmune = getInputById("cimmune");
const input_senses = getInputById("senses");
const input_languages = getInputById("languages");
class Statblock {
    constructor() {
        this.type = null;
        this.header = null;
        this.stats = null;
        this.abilities = null;
        this.statsAutres = null;
        this.features = new Array();
    }
    Export() {
        //ajouter check pour valider le data
        const filename = this.header.name + ".json";
        const jsonStr = JSON.stringify(this);
        let element = document.createElement('a');
        element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonStr));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    /** Exporte le statblock complet */
    Show(idDestination, emptyBeforeShow = true) {
        var _a;
        const destination = document.getElementById(idDestination);
        if (destination != null) {
            if (emptyBeforeShow) {
                destination.innerHTML = "";
            }
            const statblock = this.CreateDivWithClass((_a = this.type) !== null && _a !== void 0 ? _a : "monster");
            statblock.appendChild(this.CreateHeader());
            statblock.appendChild(this.CreateStats());
            statblock.appendChild(this.CreateAbilities());
            statblock.appendChild(this.CreateOtherStats());
            statblock.appendChild(this.CreateFeatures());
            destination.appendChild(statblock);
        }
    }
    CreateHeader() {
        const conteneur = this.CreateDivWithClass("header");
        if (this.header != undefined) {
            const top = this.CreateDivWithClass("header-top");
            const top1 = this.CreateDivWithClass("identification");
            const top11 = this.CreateDivWithClass("name titletext");
            top11.textContent = this.header.name;
            const top12 = this.CreateDivWithClass("desc");
            top12.textContent =
                Size[Number(this.header.size)] + ' '
                    + Origin[Number(this.header.origin)] + ' '
                    + Form[Number(this.header.form)];
            if (this.header.keywords != "") {
                top12.textContent += " (" + this.header.keywords + ")";
            }
            top1.appendChild(top11);
            top1.appendChild(top12);
            top.appendChild(top1);
            const top2 = this.CreateDivWithClass("icons");
            const top21 = this.CreateDivWithClass("titletext");
            top21.textContent = "L" + this.header.level;
            top21.appendChild(this.CreateIconFor(Role[Number(this.header.role)].toLowerCase()));
            top2.appendChild(top21);
            const top22 = this.CreateDivWithClass("stars");
            top22.appendChild(this.CreateIconFor("star-filled"));
            switch (this.header.rank) {
                case Rank.Minion:
                    top22.appendChild(this.CreateIconFor("star-empty"));
                    top22.appendChild(this.CreateIconFor("star-empty"));
                    top22.appendChild(this.CreateIconFor("star-empty"));
                    break;
                case Rank.Grunt:
                    top22.appendChild(this.CreateIconFor("star-filled"));
                    top22.appendChild(this.CreateIconFor("star-empty"));
                    top22.appendChild(this.CreateIconFor("star-empty"));
                    break;
                case Rank.Elite:
                    top22.appendChild(this.CreateIconFor("star-filled"));
                    top22.appendChild(this.CreateIconFor("star-filled"));
                    top22.appendChild(this.CreateIconFor("star-empty"));
                    break;
                default:
                    top22.appendChild(this.CreateIconFor("star-filled"));
                    top22.appendChild(this.CreateIconFor("star-filled"));
                    top22.appendChild(this.CreateIconFor("star-filled"));
                    break;
            }
            top2.appendChild(top22);
            top.appendChild(top2);
            conteneur.appendChild(top);
            const keywords = this.CreateDivWithClass("keywords");
            const keywords1 = document.createElement("div");
            keywords1.textContent = "Level " + this.header.level;
            keywords.appendChild(keywords1);
            const keywords2 = document.createElement("div");
            keywords2.textContent = Rank[this.header.rank];
            keywords.appendChild(keywords2);
            if (this.header.role != Role.None) {
                const keywords3 = document.createElement("div");
                keywords3.textContent = Role[this.header.role];
                keywords.appendChild(keywords3);
            }
            conteneur.appendChild(keywords);
        }
        return conteneur;
    }
    CreateStats() {
        const statblock = this.CreateDivWithClass("stats");
        const col1 = this.CreateDivWithClass("col1");
        const col2 = this.CreateDivWithClass("col2");
        if (this.stats != undefined) {
            col1.appendChild(this.CreateLineStat("ac", "ac", this.stats.ac));
            col1.appendChild(this.CreateLineStat("hp", "hp", this.stats.hp));
            col1.appendChild(this.CreateLineStat("init", "initiative", showPlusMinus(this.stats.init)));
            col1.appendChild(this.CreateLineStat("perception", "Passive Perc.", this.stats.perception));
            col1.appendChild(this.CreateLineStat("stealth", "Passive Stealth", this.stats.stealth));
            col2.appendChild(this.CreateLineStat("atk", "Atk Bonus", showPlusMinus(this.stats.atk)));
            col2.appendChild(this.CreateLineStat("dcs", "Atk DCs", this.stats.dc_low + "-" + this.stats.dc_high));
            col2.appendChild(this.CreateLineStat("dmg", "Damage", this.stats.dmg));
            col2.appendChild(this.CreateLineStat("prof", "Proficiency", showPlusMinus(this.stats.prof)));
            col2.appendChild(this.CreateLineStat("cr", "CR", this.stats.cr + " (" + this.stats.xp + " XP)"));
        }
        statblock.appendChild(col1);
        statblock.appendChild(col2);
        return statblock;
    }
    CreateAbilities() {
        const statblock = this.CreateDivWithClass("attributes");
        if (this.abilities != null) {
            statblock.appendChild(this.CreateLineAttr("str", this.abilities.strMod, this.abilities.strDef));
            statblock.appendChild(this.CreateLineAttr("dex", this.abilities.dexMod, this.abilities.dexDef));
            statblock.appendChild(this.CreateLineAttr("con", this.abilities.conMod, this.abilities.conDef));
            statblock.appendChild(this.CreateLineAttr("int", this.abilities.intMod, this.abilities.intDef));
            statblock.appendChild(this.CreateLineAttr("wis", this.abilities.wisMod, this.abilities.wisDef));
            statblock.appendChild(this.CreateLineAttr("cha", this.abilities.chaMod, this.abilities.chaDef));
        }
        return statblock;
    }
    CreateOtherStats() {
        const autres = this.CreateDivWithClass("autres");
        if (this.statsAutres != null) {
            if (this.statsAutres.movement)
                autres.appendChild(this.CreateLineStatAutre("speed", "Speed", this.statsAutres.movement));
            if (this.statsAutres.skills)
                autres.appendChild(this.CreateLineStatAutre("skill", "Skills", this.statsAutres.skills));
            if (this.statsAutres.dThreshold)
                autres.appendChild(this.CreateLineStatAutre("threshold", "Damage threshold", this.statsAutres.dThreshold));
            if (this.statsAutres.vulnerable)
                autres.appendChild(this.CreateLineStatAutre("vulnerable", "Vulnerable", this.statsAutres.vulnerable));
            if (this.statsAutres.resistant)
                autres.appendChild(this.CreateLineStatAutre("resist", "Resistant", this.statsAutres.resistant));
            if (this.statsAutres.dImmune)
                autres.appendChild(this.CreateLineStatAutre("immunity", "D. Immune", this.statsAutres.dImmune));
            if (this.statsAutres.cImmune)
                autres.appendChild(this.CreateLineStatAutre("immunity", "C. Immune", this.statsAutres.cImmune));
            if (this.statsAutres.senses)
                autres.appendChild(this.CreateLineStatAutre("senses", "Senses", this.statsAutres.senses));
            if (this.statsAutres.languages)
                autres.appendChild(this.CreateLineStatAutre("language", "Languages", this.statsAutres.languages));
        }
        return autres;
    }
    CreateFeatures() {
        const traits = this.CreateDivWithClass("traits");
        if (this.statsAutres != null) {
            getAllEnumValues(FeatureType).forEach(type => {
                const selectionFeature = this.features.filter(function (x) { return x.type === type; });
                if (selectionFeature.length > 0) {
                    traits.appendChild(this.CreateFeatureSection(FeatureType[type]));
                    selectionFeature.forEach(element => {
                        traits.appendChild(this.CreateFeature(element));
                    });
                }
            });
        }
        return traits;
    }
    CreateDivWithClass(className) {
        const conteneur = document.createElement("div");
        conteneur.className = className;
        return conteneur;
    }
    CreateIconFor(iconClass) {
        const icon = document.createElement("i");
        icon.className = "icon " + iconClass;
        return icon;
    }
    CreateLineStat(forWhat, label, value) {
        let element = this.CreateDivWithClass("item");
        let name = this.CreateDivWithClass("name");
        name.appendChild(this.CreateIconFor(forWhat));
        name.innerHTML += label;
        let contenu = document.createElement("div");
        contenu.textContent = String(value);
        element.appendChild(name);
        element.appendChild(contenu);
        return element;
    }
    CreateLineStatAutre(forWhat, label, value) {
        let element = this.CreateDivWithClass("item");
        let name = document.createElement("span");
        name.className = "name";
        name.appendChild(this.CreateIconFor(forWhat));
        name.innerHTML += label;
        element.appendChild(name);
        element.innerHTML += endsWithDot(String(value));
        return element;
    }
    CreateLineAttr(ability, strMod, strDef) {
        const attribute = document.createElement("div");
        const score = document.createElement("div");
        const mod = document.createElement("div");
        const def = document.createElement("div");
        score.textContent = ability;
        mod.appendChild(this.CreateIconFor(ability));
        mod.innerHTML += showNullsAsQuadra(strMod);
        def.appendChild(this.CreateIconFor("def"));
        def.innerHTML += showNullsAsQuadra(strDef);
        attribute.appendChild(score);
        attribute.appendChild(mod);
        attribute.appendChild(def);
        return attribute;
    }
    CreateFeatureSection(name) {
        const section = this.CreateDivWithClass("section");
        const contenu = document.createElement("div");
        contenu.textContent = name;
        section.appendChild(contenu);
        return section;
    }
    CreateFeature(feature) {
        const item = this.CreateDivWithClass("item");
        const name = this.CreateDivWithClass("name " + FeatureRarity[feature.rarity].toLowerCase());
        name.textContent += feature.name;
        if (feature.particularity != "") {
            const partic = this.CreateDivWithClass("special");
            partic.textContent = feature.particularity;
            name.appendChild(partic);
        }
        item.appendChild(name);
        item.innerHTML += feature.description;
        return item;
    }
}
class StatBlockWithPath extends Statblock {
}
let featureManager;
let statblockSortie;
function initMonsterMakerForm() {
    featureManager = new FeatureManager();
    statblockSortie = new Statblock();
    initAbilityScoresDistribution();
    initAbilityScoresSelection();
    initSelectLists();
    infoPannelInit();
    updatePreview();
    featureManager.InitializeQuickTemplates();
    const inputAction = document.querySelectorAll("#name, #level, #rank, #role");
    inputAction.forEach(element => {
        element.addEventListener('change', () => {
            getStats();
        });
    });
    const inputUpdatingPreview = document.querySelectorAll("input, select, textarea");
    inputUpdatingPreview.forEach(element => {
        element.addEventListener('change', () => {
            updatePreview();
        });
    });
}
function resetStatblock() {
    if (window.confirm("All unsaved data will be lost.\n\nDo you want to continue ?")) {
        nav_EcranCreation.querySelectorAll("input").forEach(element => {
            element.value = "";
        });
        nav_EcranCreation.querySelectorAll("select.attr").forEach(element => {
            const select = element;
            select.value = "";
        });
        initAbilityScoresSelection();
        initAbilityScoresDistribution();
        featureManager.RemoveAllFeatures();
        featureManager.AddFeatureLine();
        updatePreview();
    }
}
function exportJSON() {
    prepareMonster();
    statblockSortie.Export();
}
function importJSON() {
    if (window.confirm("All unsaved data will be lost.\n\nDo you want to continue ?")) {
        let file = input_importJson.files[0];
        if (file != undefined) {
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                let rawContent = String(event.target.result);
                let fileContent = Object.setPrototypeOf(JSON.parse(rawContent), Statblock.prototype);
                loadStatblock(fileContent);
            });
            reader.readAsText(file);
        }
    }
}
function loadStatblock(statblock) {
    input_name.value = statblock.header.name;
    input_level.value = String(statblock.header.level);
    input_rank.value = String(statblock.header.rank);
    input_role.value = String(statblock.header.role);
    input_type.value = statblock.type;
    input_keywords.value = statblock.header.keywords;
    input_size.value = String(statblock.header.size);
    input_origin.value = String(statblock.header.origin);
    input_form.value = String(statblock.header.form);
    input_movement.value = statblock.statsAutres.movement;
    input_skills.value = statblock.statsAutres.skills;
    input_threshold.value = statblock.statsAutres.dThreshold;
    input_vulnerable.value = statblock.statsAutres.vulnerable;
    input_resistant.value = statblock.statsAutres.resistant;
    input_dImmune.value = statblock.statsAutres.dImmune;
    input_cImmune.value = statblock.statsAutres.cImmune;
    input_senses.value = statblock.statsAutres.senses;
    input_languages.value = statblock.statsAutres.languages;
    //Importer ability Scores
    const monsterMaker = new StatsGenerator();
    const statOrder = monsterMaker.getAttributeOrder(statblock.abilities.strMod, statblock.abilities.dexMod, statblock.abilities.conMod, statblock.abilities.intMod, statblock.abilities.wisMod, statblock.abilities.chaMod);
    for (let i = 1; i <= 6; i++) {
        let attribute = getInputById("attr" + i);
        if (statOrder.length > 0) {
            attribute.value = statOrder.shift();
        }
        else
            attribute.value = "";
    }
    getStats();
    //Importer overrides si différents des stats calculées
    setValueIfNotEqual(input_ac, statblock.stats.ac, input_ac.placeholder);
    setValueIfNotEqual(input_hp, statblock.stats.hp, input_hp.placeholder);
    setValueIfNotEqual(input_init, statblock.stats.init, input_init.placeholder);
    setValueIfNotEqual(input_perception, statblock.stats.perception, input_perception.placeholder);
    setValueIfNotEqual(input_stealth, statblock.stats.stealth, input_stealth.placeholder);
    setValueIfNotEqual(input_atk, statblock.stats.atk, input_atk.placeholder);
    setValueIfNotEqual(input_dcLow, statblock.stats.dc_low, input_dcLow.placeholder);
    setValueIfNotEqual(input_dcHigh, statblock.stats.dc_high, input_dcHigh.placeholder);
    setValueIfNotEqual(input_dmg, statblock.stats.dmg, input_dmg.placeholder);
    setValueIfNotEqual(input_prof, statblock.stats.prof, input_prof.placeholder);
    setValueIfNotEqual(input_cr, statblock.stats.cr, input_cr.placeholder);
    setValueIfNotEqual(input_xp, statblock.stats.xp, input_xp.placeholder);
    featureManager.RemoveAllFeatures();
    statblock.features.forEach(feature => {
        featureManager.AddFeatureLineFrom(feature);
    });
    updatePreview();
    input_importJson.value = "";
}
function updatePreview() {
    prepareMonster();
    statblockSortie.Show("info-prev");
}
function getStats() {
    const level = Number(input_level.value);
    const rank = Number(input_rank.value);
    const role = Number(input_role.value);
    const attributes = getValuesForMonster();
    const monsterMaker = new StatsGenerator();
    const input = new MonsterInput(level, rank, role, attributes);
    const output = monsterMaker.getMonsterStats(input);
    input_ac.placeholder = String(output.ac);
    input_hp.placeholder = String(output.hp);
    input_init.placeholder = String(output.initMod);
    input_perception.placeholder = String(output.passivePercept);
    input_stealth.placeholder = String(output.passiveStealth);
    input_speed.placeholder = String(output.speed);
    input_atk.placeholder = String(output.atk);
    input_dcLow.placeholder = String(output.dcLow);
    input_dcHigh.placeholder = String(output.dcHigh);
    input_dmg.placeholder = String(output.dmg);
    info_damage_avg.placeholder = String(output.dmg);
    input_prof.placeholder = String(output.proficiency);
    input_cr.placeholder = String(output.cr);
    input_xp.placeholder = String(output.xp);
    statblockSortie.abilities = {
        strMod: output.strMod,
        strDef: output.strDef,
        dexMod: output.dexMod,
        dexDef: output.dexDef,
        conMod: output.conMod,
        conDef: output.conDef,
        intMod: output.intMod,
        intDef: output.intDef,
        wisMod: output.wisMod,
        wisDef: output.wisDef,
        chaMod: output.chaMod,
        chaDef: output.chaDef,
    };
    calculateDamage();
}
/* ABILITY SCORE DISTRIBUTION LOGIC */
function initAbilityScoresSelection() {
    for (let i = 1; i <= 6; i++) {
        let element = getInputById("attr" + i);
        element.value = "";
        element.addEventListener('change', () => {
            abilityScoreOnChange(i);
        });
    }
}
function initAbilityScoresDistribution() {
    for (let i = 1; i <= 6; i++) {
        let element = getInputById("attr" + i + "null");
        element.checked = false;
        element.disabled = false;
        enableDisableConnectedElement(i, false);
        element.addEventListener('change', () => {
            enableDisableConnectedElement(i, element.checked);
            previousAbilityCheckChange(i, element.checked);
        });
    }
}
function previousAbilityCheckChange(indexClicked, isChecked) {
    for (let i = 1; i <= 6; i++) {
        if (i > indexClicked) {
            let element = getInputById("attr" + i + "null");
            if (isChecked) {
                element.checked = true;
                element.disabled = true;
                enableDisableConnectedElement(i, true);
            }
            else if (i === indexClicked + 1) {
                element.disabled = false;
            }
        }
    }
}
function enableDisableConnectedElement(index, desactivate) {
    let element = getInputById("attr" + index);
    if (desactivate) {
        element.value = "";
    }
    element.disabled = desactivate;
}
function abilityScoreOnChange(indexChanged) {
    let element = getInputById("attr" + indexChanged);
    const value = element.value;
    if (value != null) {
        for (let i = 1; i <= 6; i++) {
            if (i != indexChanged) {
                let selection = getInputById("attr" + i);
                if (selection.value === element.value) {
                    selection.value = "";
                }
            }
        }
    }
    getStats();
}
function getValuesForMonster() {
    let attributes = new Array();
    for (let i = 1; i <= 6; i++) {
        let attribute = getInputById("attr" + i);
        let nullifier = getInputById("attr" + i + "null");
        if (!nullifier.checked && attribute.value != "") {
            attributes.push(attribute.value);
        }
    }
    return attributes;
}
//GENERER LE CONTENU DES DROPDOWN LIST SELON LES ENUMS
function initSelectLists() {
    getSelectByIdFromEnum("rank", Rank, Rank.Grunt);
    getSelectByIdFromEnum("role", Role, Role.None);
    getSelectByIdFromEnum("type", StatblockType, StatblockType.Monster);
    getSelectByIdFromEnum("size", Size, Size.Medium);
    getSelectByIdFromEnum("origin", Origin, Origin.Natural);
    getSelectByIdFromEnum("form", Form, Form.Humanoid);
    getSelectByIdFromEnum("attr1", Ability, Ability.None);
    getSelectByIdFromEnum("attr2", Ability, Ability.None);
    getSelectByIdFromEnum("attr3", Ability, Ability.None);
    getSelectByIdFromEnum("attr4", Ability, Ability.None);
    getSelectByIdFromEnum("attr5", Ability, Ability.None);
    getSelectByIdFromEnum("attr6", Ability, Ability.None);
    getSelectByIdFromEnum("info-dam-dice", DiceType, DiceType.D6);
}
//Pour exportation JSON
function prepareMonster() {
    getStats();
    statblockSortie.type = input_type.value;
    statblockSortie.header = {
        name: getValueOrPlaceholder(input_name),
        level: Number(input_level.value),
        rank: Number(input_rank.value),
        role: Number(input_role.value),
        keywords: input_keywords.value,
        size: Number(input_size.value),
        origin: Number(input_origin.value),
        form: Number(input_form.value)
    };
    statblockSortie.stats = {
        ac: Number(getValueOrPlaceholder(input_ac)),
        hp: Number(getValueOrPlaceholder(input_hp)),
        init: Number(getValueOrPlaceholder(input_init)),
        perception: Number(getValueOrPlaceholder(input_perception)),
        stealth: Number(getValueOrPlaceholder(input_stealth)),
        atk: Number(getValueOrPlaceholder(input_atk)),
        dc_low: Number(getValueOrPlaceholder(input_dcLow)),
        dc_high: Number(getValueOrPlaceholder(input_dcHigh)),
        dmg: Number(getValueOrPlaceholder(input_dmg)),
        prof: Number(getValueOrPlaceholder(input_prof)),
        cr: getValueOrPlaceholder(input_cr),
        xp: Number(getValueOrPlaceholder(input_xp))
    };
    statblockSortie.statsAutres = {
        movement: input_movement.value,
        skills: input_skills.value,
        dThreshold: input_threshold.value,
        vulnerable: input_vulnerable.value,
        resistant: input_resistant.value,
        dImmune: input_dImmune.value,
        cImmune: input_cImmune.value,
        senses: input_senses.value,
        languages: input_languages.value
    };
    statblockSortie.features = featureManager.GetFeatures();
}
function infoPannelInit() {
    const infoPannel = document.getElementById("info-pannel");
    info_damage_formula.disabled = true;
    info_damage_range.disabled = true;
    infoPannel.querySelectorAll(`
    #${info_damage_avg.id}, 
    #${info_damage_dice.id}, 
    #${info_damage_maxDices.id}, 
    #${info_damage_maxStatic.id},
    #${info_damage_multiplier.id}`).forEach(element => {
        element.addEventListener('change', () => {
            calculateDamage();
        });
    });
    showInfo(info_stats.id);
    calculateDamage();
}
function calculateDamage() {
    const damage = Number(getValueOrPlaceholder(info_damage_avg)) * Number(getValueOrPlaceholder(info_damage_multiplier));
    const resultat = DamageCalculator(damage, Number(info_damage_dice.value), Number(getValueOrPlaceholder(info_damage_maxDices)), Number(getValueOrPlaceholder(info_damage_maxStatic)));
    info_damage_formula.value = resultat.formula;
    info_damage_range.value = resultat.range;
}
function showInfo(id) {
    if (id === info_damage.id) {
        showElement(info_damage, "flex");
        hideElement(info_preview);
        hideElement(info_stats);
    }
    else if (id === info_preview.id) {
        hideElement(info_damage);
        showElement(info_preview, "flex");
        hideElement(info_stats);
    }
    else if (id === info_stats.id) {
        hideElement(info_damage);
        hideElement(info_preview);
        showElement(info_stats, "flex");
    }
}
function quickTemplateClick(idTemplate) {
    featureManager.AddFeatureLineFrom(featureManager.templates[idTemplate]);
}
let gallery;
async function initializeGallery() {
    if (gallery == undefined) {
        gallery = new GalleryManager("tableGallery", "selectGalleryFolder");
        if (githubUsername.value != "" && githubRepo.value != "") {
            const checkBoxEnfant = document.getElementById("checkGalleryFolder");
            checkBoxEnfant.checked = true;
            gallery.RefreshData(githubUsername.value, githubRepo.value);
        }
        else {
            alert("You need to connect to github");
        }
    }
}
function clickGalleryRow(name) {
    gallery.GetStatblockByName(name).Show("statblockShow");
}
function folderSelectionChanged() {
    const selectValue = document.getElementById("selectGalleryFolder").value;
    const showChildren = document.getElementById("checkGalleryFolder").checked;
    gallery.GetStatblocksInFolder(selectValue, showChildren);
}
function galleryRefresh() {
    if (githubUsername.value != "" && githubRepo.value != "") {
        gallery = new GalleryManager("tableGallery", "selectGalleryFolder");
        const checkBoxEnfant = document.getElementById("checkGalleryFolder");
        checkBoxEnfant.checked = true;
        gallery.RefreshData(githubUsername.value, githubRepo.value);
    }
    else {
        alert("You need to connect to github");
    }
}
function gallerySort(column) {
    if (column === "name") {
        gallery.filterOrder = toggleFilterOrder(gallery.filter != GalleryFilterType.Name);
        gallery.filter = GalleryFilterType.Name;
    }
    else if (column === "level") {
        gallery.filterOrder = toggleFilterOrder(gallery.filter != GalleryFilterType.Level);
        gallery.filter = GalleryFilterType.Level;
    }
    else if (column === "rank") {
        gallery.filterOrder = toggleFilterOrder(gallery.filter != GalleryFilterType.Rank);
        gallery.filter = GalleryFilterType.Rank;
    }
    else if (column === "role") {
        gallery.filterOrder = toggleFilterOrder(gallery.filter != GalleryFilterType.Role);
        gallery.filter = GalleryFilterType.Role;
    }
    gallery.RefreshSortArrow();
    folderSelectionChanged();
}
function toggleFilterOrder(forceAsc = false) {
    if (forceAsc || gallery.filterOrder === GalleryFilterOrder.Desc) {
        return GalleryFilterOrder.Asc;
    }
    else {
        return GalleryFilterOrder.Desc;
    }
}
class MonsterInput {
    constructor(level, rank, role, abilityOrder, speed = 30) {
        this.level = level;
        this.rank = rank;
        this.role = role;
        this.abilityOrder = abilityOrder;
        this.baseSpeed = speed;
    }
}
class MonsterOutput {
    constructor() {
        this.strMod = null;
        this.strDef = null;
        this.dexMod = null;
        this.dexDef = null;
        this.conMod = null;
        this.conDef = null;
        this.intMod = null;
        this.intDef = null;
        this.wisMod = null;
        this.wisDef = null;
        this.chaMod = null;
        this.chaDef = null;
    }
}
class StatsGenerator {
    constructor() {
        this.stats = new Array();
        this.stats.push(new StatLine(0, 14, 16, 2, 7, 10, 1, 1, 1, [4, 2, 0], [3, 2, 1, 1, 0, -1], 25));
        this.stats.push(new StatLine(1, 14, 26, 3, 8, 11, 2, 2, 2, [5, 3, 0], [3, 2, 1, 1, 0, -1], 50));
        this.stats.push(new StatLine(2, 14, 29, 3, 8, 11, 4, 3, 2, [5, 3, 0], [3, 2, 1, 1, 0, -1], 112.5));
        this.stats.push(new StatLine(3, 14, 33, 3, 8, 11, 5, 4, 2, [5, 3, 0], [3, 2, 1, 1, 0, -1], 175));
        this.stats.push(new StatLine(4, 15, 36, 4, 9, 12, 8, 6, 2, [6, 3, 1], [4, 3, 2, 1, 1, 0], 275));
        this.stats.push(new StatLine(5, 16, 60, 5, 10, 13, 9, 7, 3, [7, 4, 1], [4, 3, 2, 1, 1, 0], 450));
        this.stats.push(new StatLine(6, 16, 64, 5, 10, 13, 11, 8, 3, [7, 4, 1], [4, 3, 2, 1, 1, 0], 575));
        this.stats.push(new StatLine(7, 16, 68, 5, 10, 13, 13, 10, 3, [7, 4, 1], [4, 3, 2, 1, 1, 0], 725));
        this.stats.push(new StatLine(8, 17, 71, 6, 11, 14, 17, 12, 3, [8, 5, 1], [5, 3, 2, 2, 1, 0], 975));
        this.stats.push(new StatLine(9, 18, 102, 7, 12, 15, 19, 14, 4, [9, 5, 2], [5, 3, 2, 2, 1, 0], 1250));
        this.stats.push(new StatLine(10, 18, 106, 7, 12, 15, 21, 15, 4, [9, 5, 2], [5, 3, 2, 2, 1, 0], 1475));
        this.stats.push(new StatLine(11, 18, 111, 7, 12, 15, 24, 17, 4, [9, 5, 2], [5, 3, 2, 2, 1, 0], 1800));
        this.stats.push(new StatLine(12, 18, 115, 8, 12, 15, 28, 21, 4, [10, 6, 2], [6, 4, 3, 2, 1, 0], 2100));
        this.stats.push(new StatLine(13, 19, 152, 9, 13, 16, 30, 22, 5, [11, 7, 2], [6, 4, 3, 2, 1, 0], 2500));
        this.stats.push(new StatLine(14, 19, 157, 9, 13, 16, 32, 24, 5, [11, 7, 2], [6, 4, 3, 2, 1, 0], 2875));
        this.stats.push(new StatLine(15, 19, 162, 9, 13, 16, 34, 26, 5, [11, 7, 2], [6, 4, 3, 2, 1, 0], 3250));
        this.stats.push(new StatLine(16, 20, 166, 10, 14, 17, 41, 30, 5, [12, 7, 3], [7, 5, 3, 2, 2, 1], 3750));
        this.stats.push(new StatLine(17, 21, 210, 11, 15, 18, 43, 32, 6, [13, 8, 3], [7, 5, 3, 2, 2, 1], 4500));
        this.stats.push(new StatLine(18, 21, 215, 11, 15, 18, 46, 34, 6, [13, 8, 3], [7, 5, 3, 2, 2, 1], 5000));
        this.stats.push(new StatLine(19, 21, 221, 11, 15, 18, 48, 36, 6, [13, 8, 3], [7, 5, 3, 2, 2, 1], 5500));
        this.stats.push(new StatLine(20, 22, 226, 12, 16, 19, 51, 38, 6, [14, 9, 3], [8, 6, 5, 4, 2, 1], 6250));
        this.stats.push(new StatLine(21, 22, 276, 13, 17, 20, 53, 40, 7, [15, 9, 4], [8, 6, 5, 4, 2, 1], 8250));
        this.stats.push(new StatLine(22, 22, 282, 13, 17, 20, 56, 42, 7, [15, 9, 4], [8, 6, 5, 4, 2, 1], 10250));
        this.stats.push(new StatLine(23, 22, 288, 13, 17, 20, 58, 44, 7, [15, 9, 4], [8, 6, 5, 4, 2, 1], 12500));
        this.stats.push(new StatLine(24, 23, 293, 14, 17, 20, 61, 45, 7, [16, 10, 4], [9, 6, 5, 4, 2, 1], 15500));
        this.ranks = new Array();
        this.ranks.push(new RankLine(Rank.Minion, 0.2, -2, 0, false, 0.75, 0.25));
        this.ranks.push(new RankLine(Rank.Grunt, 1, 0, 0, false, 1, 1));
        this.ranks.push(new RankLine(Rank.Elite, 2, 2, 0, true, 1.1, 2));
        this.ranks.push(new RankLine(Rank["Paragon vs. 3"], 3, 2, 2, true, 1.2, 3));
        this.ranks.push(new RankLine(Rank["Paragon vs. 4"], 4, 2, 2, true, 1.2, 4));
        this.ranks.push(new RankLine(Rank["Paragon vs. 5"], 5, 2, 2, true, 1.2, 5));
        this.ranks.push(new RankLine(Rank["Paragon vs. 6"], 6, 2, 2, true, 1.2, 6));
        this.roles = new Array();
        this.roles.push(new RoleLine(Role.None, 0, 0, 1, 0, 0, 1, 0, false, false, false));
        this.roles.push(new RoleLine(Role.Controller, 2, 1, 1, 0, 0, 0.75, 0, false, false, true));
        this.roles.push(new RoleLine(Role.Defender, 4, 2, 0.75, 0, 0, 1, -5, false, false, false));
        this.roles.push(new RoleLine(Role.Lurker, -4, -2, 0.75, 3, 3, 1.5, 5, false, true, false));
        this.roles.push(new RoleLine(Role.Scout, 0, 0, 1, -1, -1, 0.75, 10, true, true, false));
        this.roles.push(new RoleLine(Role.Striker, -2, -1, 1.25, 2, 2, 1.25, 0, false, false, false));
        this.roles.push(new RoleLine(Role.Supporter, 0, 0, 1.5, -2, -2, 1, 0, false, false, true));
    }
    getMonsterStats(input) {
        var _a, _b, _c, _d;
        let output = new MonsterOutput();
        const baseStats = this.getStats(input.level);
        const role = this.getRole(input.role);
        const rank = this.getRank(input.rank);
        output.ac = baseStats.ac + role.acMod + rank.acSavesMod;
        output.atk = baseStats.atk + role.atkMod + rank.atkDcsMod;
        output.hp = Math.floor(baseStats.hp * role.hpMult * rank.hpMult);
        output.speed = (_a = input.baseSpeed) !== null && _a !== void 0 ? _a : 30 + role.speedMod;
        output.proficiency = baseStats.prof;
        output.dcHigh = baseStats.dcHigh + role.dcMod + rank.atkDcsMod;
        output.dcLow = baseStats.dcLow + role.dcMod + rank.atkDcsMod;
        if (input.rank === Rank.Minion) {
            output.dmg = Math.round(baseStats.minionDmg * role.dmgMult);
        }
        else {
            output.dmg = Math.round(baseStats.dmg * role.dmgMult * rank.dmgMult);
        }
        this.getAbilityModifiers(input, output);
        output.initMod = (_b = output.dexMod) !== null && _b !== void 0 ? _b : 0;
        output.passiveStealth = 10 + ((_c = output.dexMod) !== null && _c !== void 0 ? _c : 0);
        output.passivePercept = 10 + ((_d = output.wisMod) !== null && _d !== void 0 ? _d : 0);
        if (this.getRole(input.role).trainedInit || this.getRank(input.rank).trainedInit)
            output.initMod += this.getStats(input.level).prof;
        if (this.getRole(input.role).trainedStealth)
            output.passiveStealth += this.getStats(input.level).prof;
        if (this.getRole(input.role).trainedPerception)
            output.passivePercept += this.getStats(input.level).prof;
        let xpTable = new ExperienceToChallengeRating();
        output.xp = Math.floor(baseStats.xp * rank.xpMult);
        output.cr = xpTable.getCrFromXp(output.xp);
        return output;
    }
    getAttributeOrder(str, dex, con, int, wis, cha) {
        const characteristics = new Array;
        characteristics.push({ "text": "str", "value": str });
        characteristics.push({ "text": "dex", "value": dex });
        characteristics.push({ "text": "con", "value": con });
        characteristics.push({ "text": "int", "value": int });
        characteristics.push({ "text": "wis", "value": wis });
        characteristics.push({ "text": "cha", "value": cha });
        characteristics.sort((attr1, attr2) => {
            return attr2.value - attr1.value;
        });
        return Array.from(characteristics.map(x => x.text));
    }
    getStats(lvl) {
        let i = this.stats.findIndex((line) => {
            if (line.level == lvl)
                return true;
        });
        return this.stats[i];
    }
    getRank(rank) {
        let i = this.ranks.findIndex((line) => {
            if (line.rank == rank)
                return true;
        });
        return this.ranks[i];
    }
    getRole(role) {
        let i = this.roles.findIndex((line) => {
            if (line.role == role)
                return true;
        });
        return this.roles[i];
    }
    getAbilityModifiers(input, output) {
        output.strMod = null;
        output.strDef = null;
        output.dexMod = null;
        output.dexDef = null;
        output.conMod = null;
        output.conDef = null;
        output.intMod = null;
        output.intDef = null;
        output.wisMod = null;
        output.wisDef = null;
        output.chaMod = null;
        output.chaDef = null;
        input.abilityOrder.forEach((value, index) => {
            this.attribuerAbilityMod(input.level, input.rank, input.role, output, value, index);
        });
    }
    attribuerAbilityMod(level, rank, role, output, ability, order) {
        let saveOrder = function (x) {
            if (x === 0)
                return 0;
            else if (x < 3)
                return 1;
            else
                return 2;
        };
        switch (ability) {
            case Ability.Strength:
                output.strMod = this.getStats(level).abilityMods[order];
                output.strDef = this.getStats(level).saves[saveOrder(order)] + this.getRank(rank).acSavesMod + this.getRole(role).saveMod;
                break;
            case Ability.Dexterity:
                output.dexMod = this.getStats(level).abilityMods[order];
                output.dexDef = this.getStats(level).saves[saveOrder(order)] + this.getRank(rank).acSavesMod + this.getRole(role).saveMod;
                break;
            case Ability.Constitution:
                output.conMod = this.getStats(level).abilityMods[order];
                output.conDef = this.getStats(level).saves[saveOrder(order)] + this.getRank(rank).acSavesMod + this.getRole(role).saveMod;
                break;
            case Ability.Intelligence:
                output.intMod = this.getStats(level).abilityMods[order];
                output.intDef = this.getStats(level).saves[saveOrder(order)] + this.getRank(rank).acSavesMod + this.getRole(role).saveMod;
                break;
            case Ability.Wisdom:
                output.wisMod = this.getStats(level).abilityMods[order];
                output.wisDef = this.getStats(level).saves[saveOrder(order)] + this.getRank(rank).acSavesMod + this.getRole(role).saveMod;
                break;
            case Ability.Charisma:
                output.chaMod = this.getStats(level).abilityMods[order];
                output.chaDef = this.getStats(level).saves[saveOrder(order)] + this.getRank(rank).acSavesMod + this.getRole(role).saveMod;
                break;
            default:
                console.error("attribut inconnu");
                break;
        }
    }
}
class RoleLine {
    constructor(role, acMod, saveMod, hpMult, atkMod, dcMod, dmgMult, speedMod, percept, stealth, init) {
        this.role = role;
        this.acMod = acMod;
        this.saveMod = saveMod;
        this.hpMult = hpMult;
        this.atkMod = atkMod;
        this.dcMod = dcMod;
        this.dmgMult = dmgMult;
        this.speedMod = speedMod;
        this.trainedPerception = percept;
        this.trainedStealth = stealth;
        this.trainedInit = init;
    }
}
class RankLine {
    constructor(rank, hpMult, acSavesMod, atkDcsMod, trainedInit, dmgMult, xpMult) {
        this.rank = rank;
        this.hpMult = hpMult;
        this.acSavesMod = acSavesMod;
        this.atkDcsMod = atkDcsMod;
        this.trainedInit = trainedInit;
        this.dmgMult = dmgMult;
        this.xpMult = xpMult;
    }
}
class StatLine {
    constructor(level, ac, hp, atk, dcLow, dcHigh, dmg, minionDmg, prof, saves, abilityMods, xp) {
        this.level = level;
        this.ac = ac;
        this.hp = hp;
        this.atk = atk;
        this.dcLow = dcLow;
        this.dcHigh = dcHigh;
        this.dmg = dmg;
        this.minionDmg = minionDmg;
        this.prof = prof;
        this.saves = saves;
        this.abilityMods = abilityMods;
        this.xp = xp;
    }
}
class XpLine {
    constructor(xp, cr) {
        this.xp = xp;
        this.cr = cr;
    }
}
class ExperienceToChallengeRating {
    constructor() {
        this.challengeTable = new Array();
        this.challengeTable.push(new XpLine(0, "0"));
        this.challengeTable.push(new XpLine(25, "1/8"));
        this.challengeTable.push(new XpLine(50, "1/4"));
        this.challengeTable.push(new XpLine(100, "1/2"));
        this.challengeTable.push(new XpLine(200, "1"));
        this.challengeTable.push(new XpLine(450, "2"));
        this.challengeTable.push(new XpLine(700, "3"));
        this.challengeTable.push(new XpLine(1100, "4"));
        this.challengeTable.push(new XpLine(1800, "5"));
        this.challengeTable.push(new XpLine(2300, "6"));
        this.challengeTable.push(new XpLine(2900, "7"));
        this.challengeTable.push(new XpLine(3900, "8"));
        this.challengeTable.push(new XpLine(5000, "9"));
        this.challengeTable.push(new XpLine(5900, "10"));
        this.challengeTable.push(new XpLine(7200, "11"));
        this.challengeTable.push(new XpLine(8400, "12"));
        this.challengeTable.push(new XpLine(10000, "13"));
        this.challengeTable.push(new XpLine(11500, "14"));
        this.challengeTable.push(new XpLine(13000, "15"));
        this.challengeTable.push(new XpLine(15000, "16"));
        this.challengeTable.push(new XpLine(18000, "17"));
        this.challengeTable.push(new XpLine(20000, "18"));
        this.challengeTable.push(new XpLine(22000, "19"));
        this.challengeTable.push(new XpLine(25000, "20"));
        this.challengeTable.push(new XpLine(30000, "21"));
        this.challengeTable.push(new XpLine(41000, "22"));
        this.challengeTable.push(new XpLine(50000, "23"));
        this.challengeTable.push(new XpLine(62000, "24"));
        this.challengeTable.push(new XpLine(75000, "25"));
        this.challengeTable.push(new XpLine(90000, "26"));
        this.challengeTable.push(new XpLine(105000, "27"));
        this.challengeTable.push(new XpLine(120000, "28"));
        this.challengeTable.push(new XpLine(135000, "29"));
        this.challengeTable.push(new XpLine(155000, "30"));
    }
    getCrFromXp(xp) {
        const index = this.challengeTable.findIndex(function (value) {
            if (value.xp > xp)
                return true;
        });
        return this.challengeTable[index - 1].cr;
    }
}
function DamageCalculator(avgDamage, dice, maxDices, maxStaticBonus) {
    const avg = Math.max(Math.round(avgDamage), 0);
    const nbDices = Math.min(Math.floor(avg / AvgDamageForDice(dice)), Math.max(maxDices !== null && maxDices !== void 0 ? maxDices : 10, 0));
    const damBonus = Math.min(avg - Math.floor(nbDices * AvgDamageForDice(dice)), Math.max(maxStaticBonus !== null && maxStaticBonus !== void 0 ? maxStaticBonus : 20, 0));
    let formula = "";
    if (Math.round(AvgDamageForDice(dice) * nbDices + damBonus) < avg) {
        formula = `! ${Math.round(AvgDamageForDice(dice) * nbDices + damBonus)} (${nbDices}d${dice} + ${damBonus})`;
    }
    else {
        formula = `${avg} (${nbDices}d${dice} + ${damBonus})`;
    }
    const range = `${nbDices + damBonus}-${(nbDices * dice) + damBonus}`;
    return { formula, range };
}
function AvgDamageForDice(diceSize) {
    return (diceSize / 2) + 0.5;
}
var Rank;
(function (Rank) {
    Rank[Rank["Minion"] = 0] = "Minion";
    Rank[Rank["Grunt"] = 1] = "Grunt";
    Rank[Rank["Elite"] = 2] = "Elite";
    Rank[Rank["Paragon vs. 3"] = 3] = "Paragon vs. 3";
    Rank[Rank["Paragon vs. 4"] = 4] = "Paragon vs. 4";
    Rank[Rank["Paragon vs. 5"] = 5] = "Paragon vs. 5";
    Rank[Rank["Paragon vs. 6"] = 6] = "Paragon vs. 6";
})(Rank || (Rank = {}));
var Role;
(function (Role) {
    Role[Role["None"] = 0] = "None";
    Role[Role["Controller"] = 1] = "Controller";
    Role[Role["Defender"] = 2] = "Defender";
    Role[Role["Lurker"] = 3] = "Lurker";
    Role[Role["Scout"] = 4] = "Scout";
    Role[Role["Striker"] = 5] = "Striker";
    Role[Role["Supporter"] = 6] = "Supporter";
})(Role || (Role = {}));
var Ability;
(function (Ability) {
    Ability["None"] = "";
    Ability["Strength"] = "str";
    Ability["Dexterity"] = "dex";
    Ability["Constitution"] = "con";
    Ability["Intelligence"] = "int";
    Ability["Wisdom"] = "wis";
    Ability["Charisma"] = "cha";
})(Ability || (Ability = {}));
var StatblockType;
(function (StatblockType) {
    StatblockType["Monster"] = "monster";
    StatblockType["Hazard"] = "hazard";
    StatblockType["Npc"] = "npc";
})(StatblockType || (StatblockType = {}));
var Size;
(function (Size) {
    Size[Size["Tiny"] = 0] = "Tiny";
    Size[Size["Small"] = 1] = "Small";
    Size[Size["Medium"] = 2] = "Medium";
    Size[Size["Large"] = 3] = "Large";
    Size[Size["Huge"] = 4] = "Huge";
    Size[Size["Gargantuan"] = 5] = "Gargantuan";
})(Size || (Size = {}));
var Origin;
(function (Origin) {
    Origin[Origin["Aberrant"] = 0] = "Aberrant";
    Origin[Origin["Arcane"] = 1] = "Arcane";
    Origin[Origin["Corrupted"] = 2] = "Corrupted";
    Origin[Origin["Elemental"] = 3] = "Elemental";
    Origin[Origin["Fey"] = 4] = "Fey";
    Origin[Origin["Immortal"] = 5] = "Immortal";
    Origin[Origin["Natural"] = 6] = "Natural";
    Origin[Origin["Spiritual"] = 7] = "Spiritual";
})(Origin || (Origin = {}));
var Form;
(function (Form) {
    Form[Form["Animate"] = 0] = "Animate";
    Form[Form["Beast"] = 1] = "Beast";
    Form[Form["Hazard"] = 2] = "Hazard";
    Form[Form["Humanoid"] = 3] = "Humanoid";
    Form[Form["Monstrosity"] = 4] = "Monstrosity";
})(Form || (Form = {}));
var FeatureType;
(function (FeatureType) {
    FeatureType[FeatureType["Trait"] = 0] = "Trait";
    FeatureType[FeatureType["Trigger"] = 1] = "Trigger";
    FeatureType[FeatureType["Free"] = 2] = "Free";
    FeatureType[FeatureType["Bonus"] = 3] = "Bonus";
    FeatureType[FeatureType["Action"] = 4] = "Action";
    FeatureType[FeatureType["Reaction"] = 5] = "Reaction";
    FeatureType[FeatureType["Countermeasure"] = 6] = "Countermeasure";
    FeatureType[FeatureType["Salvage"] = 7] = "Salvage";
})(FeatureType || (FeatureType = {}));
var FeatureRarity;
(function (FeatureRarity) {
    FeatureRarity[FeatureRarity["Common"] = 0] = "Common";
    FeatureRarity[FeatureRarity["Uncommon"] = 1] = "Uncommon";
    FeatureRarity[FeatureRarity["Rare"] = 2] = "Rare";
    FeatureRarity[FeatureRarity["Other"] = 3] = "Other";
    FeatureRarity[FeatureRarity["Text"] = 4] = "Text";
})(FeatureRarity || (FeatureRarity = {}));
var DiceType;
(function (DiceType) {
    DiceType[DiceType["D4"] = 4] = "D4";
    DiceType[DiceType["D6"] = 6] = "D6";
    DiceType[DiceType["D8"] = 8] = "D8";
    DiceType[DiceType["D10"] = 10] = "D10";
    DiceType[DiceType["D12"] = 12] = "D12";
    DiceType[DiceType["D20"] = 20] = "D20";
    DiceType[DiceType["D100"] = 100] = "D100";
})(DiceType || (DiceType = {}));
function getInputById(id) {
    return getElementById(id);
}
function getSelectById(id) {
    return getElementById(id);
}
function getElementById(id, parent = null) {
    if (parent != null) {
        return parent.querySelector("#" + id);
    }
    else {
        return document.querySelector("#" + id);
    }
}
function getValueOrPlaceholder(element) {
    if (element.value != "")
        return element.value;
    return element.placeholder;
}
function removeOptions(selectElement) {
    for (let i = selectElement.options.length; i >= 0; i--) {
        selectElement.remove(i);
    }
}
function hide(id) {
    var element = document.getElementById(id);
    hideElement(element);
}
function hideElement(element) {
    if (element != undefined) {
        element.style.display = "none";
    }
}
function show(id, defaultClass = "block") {
    var element = document.getElementById(id);
    showElement(element, defaultClass);
}
function showElement(element, defaultClass = "block") {
    if (element != undefined) {
        element.style.display = defaultClass;
    }
}
function addOptionToSelect(parent, text, value, isSelected = false) {
    const opt = document.createElement("option");
    opt.text = text;
    opt.value = String(value);
    if (isSelected)
        opt.selected = true;
    parent.appendChild(opt);
}
function addDefaultOptionToSelect(parent, isSelected = false) {
    addOptionToSelect(parent, "—", "", isSelected);
}
function getSelectByIdFromEnum(idSelect, e, defaultValue) {
    let selection = getSelectById(idSelect);
    removeOptions(selection);
    const entries = getAllEnumEntries(e);
    for (let i = 0; i < entries.length; i++) {
        let option = document.createElement("option");
        option.text = entries[i][0];
        option.value = entries[i][1];
        option.selected = entries[i][1] === defaultValue;
        if (entries[i][0] === "None") {
            option.text = "—";
        }
        selection.add(option);
    }
}
function setValueIfNotEqual(controle, value, compareValue) {
    if (value != compareValue) {
        controle.value = String(value);
    }
}
function getAllEnumKeys(enumType) { return Object.keys(enumType).filter(key => isNaN(Number(key))); }
function getAllEnumValues(enumType) { return getAllEnumKeys(enumType).map(key => enumType[key]); }
function getAllEnumEntries(enumType) { return getAllEnumKeys(enumType).map(key => [key, enumType[key]]); }
function showPlusMinus(value) {
    if (value >= 0)
        return "+" + value;
    return String(value);
}
function showNullsAsQuadra(value) {
    if (value === null)
        return "—";
    else
        return showPlusMinus(value);
}
function endsWithDot(value) {
    if (value.endsWith("."))
        return value;
    return value += ".";
}
function getNumberOrNull(value) {
    if (typeof (value) === "string") {
        if (value === "")
            return null;
        return Number(value);
    }
    else
        return value;
}
//# sourceMappingURL=code.js.map