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
/* ABILITIES */
const input_str = getInputById("attr1score");
const input_dex = getInputById("attr2score");
const input_con = getInputById("attr3score");
const input_int = getInputById("attr4score");
const input_wis = getInputById("attr5score");
const input_cha = getInputById("attr6score");
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
            const keywords3 = document.createElement("div");
            keywords3.textContent = Role[this.header.role];
            keywords.appendChild(keywords3);
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
            col2.appendChild(this.CreateLineStat("dcs", "Atk DC", showPlusMinus(this.stats.dc)));
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
            statblock.appendChild(this.CreateLineAttr("str", this.abilities.strScore));
            statblock.appendChild(this.CreateLineAttr("dex", this.abilities.dexScore));
            statblock.appendChild(this.CreateLineAttr("con", this.abilities.conScore));
            statblock.appendChild(this.CreateLineAttr("int", this.abilities.intScore));
            statblock.appendChild(this.CreateLineAttr("wis", this.abilities.wisScore));
            statblock.appendChild(this.CreateLineAttr("cha", this.abilities.chaScore));
        }
        return statblock;
    }
    CreateOtherStats() {
        const autres = this.CreateDivWithClass("autres");
        const abi = this.abilities;
        if (!(abi.strScore === 0 || abi.strDef === 0) ||
            !(abi.dexScore === 0 || abi.dexDef === 0) ||
            !(abi.conScore === 0 || abi.conDef === 0) ||
            !(abi.intScore === 0 || abi.intDef === 0) ||
            !(abi.wisScore === 0 || abi.wisDef === 0) ||
            !(abi.chaScore === 0 || abi.chaDef === 0)) {
            autres.appendChild(this.CreateLineStatAutre("save", "Saves", this.GenererValeurSaves()));
        }
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
    CreateLineAttr(ability, statScore) {
        const attribute = document.createElement("div");
        const score = document.createElement("div");
        const mod = document.createElement("div");
        score.textContent = ability;
        if (statScore === 0) {
            mod.innerHTML = "0";
        }
        else {
            mod.innerHTML = `${statScore}&nbsp;(${showPlusMinus(getAbilityModFromScore(statScore))})`;
        }
        attribute.appendChild(score);
        attribute.appendChild(mod);
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
    GenererValeurSaves() {
        let saves = Array();
        const abi = this.abilities;
        if (!(abi.strScore === 0 || abi.strDef === 0)) {
            saves.push("Str&nbsp;" + showPlusMinus(getAbilityModFromScore(abi.strScore) + abi.strDef));
        }
        if (!(abi.dexScore === 0 || abi.dexDef === 0)) {
            saves.push("Dex&nbsp;" + showPlusMinus(getAbilityModFromScore(abi.dexScore) + abi.dexDef));
        }
        if (!(abi.conScore === 0 || abi.conDef === 0)) {
            saves.push("Con&nbsp;" + showPlusMinus(getAbilityModFromScore(abi.conScore) + abi.conDef));
        }
        if (!(abi.intScore === 0 || abi.intDef === 0)) {
            saves.push("Int&nbsp;" + showPlusMinus(getAbilityModFromScore(abi.intScore) + abi.intDef));
        }
        if (!(abi.wisScore === 0 || abi.wisDef === 0)) {
            saves.push("Wis&nbsp;" + showPlusMinus(getAbilityModFromScore(abi.wisScore) + abi.wisDef));
        }
        if (!(abi.chaScore === 0 || abi.chaDef === 0)) {
            saves.push("Cha&nbsp;" + showPlusMinus(getAbilityModFromScore(abi.chaScore) + abi.chaDef));
        }
        return saves.join(", ");
    }
}
class StatBlockWithPath extends Statblock {
}
let featureManager;
let statblockSortie;
function initMonsterMakerForm() {
    featureManager = new FeatureManager();
    statblockSortie = new Statblock();
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
    for (let i = 1; i <= 6; i++) {
        getInputById("attr" + i).value = String(statblock.abilities.abilityRanks[i - 1]);
    }
    //Importer ability Scores
    const monsterMaker = new StatsGenerator();
    getStats();
    //Importer ability overrides
    setValueIfNotEqual(input_str, statblock.abilities.strScore, input_str.placeholder);
    setValueIfNotEqual(input_dex, statblock.abilities.dexScore, input_dex.placeholder);
    setValueIfNotEqual(input_con, statblock.abilities.conScore, input_con.placeholder);
    setValueIfNotEqual(input_int, statblock.abilities.intScore, input_int.placeholder);
    setValueIfNotEqual(input_wis, statblock.abilities.wisScore, input_wis.placeholder);
    setValueIfNotEqual(input_cha, statblock.abilities.chaScore, input_cha.placeholder);
    //Importer overrides si différents des stats calculées
    setValueIfNotEqual(input_ac, statblock.stats.ac, input_ac.placeholder);
    setValueIfNotEqual(input_hp, statblock.stats.hp, input_hp.placeholder);
    setValueIfNotEqual(input_init, statblock.stats.init, input_init.placeholder);
    setValueIfNotEqual(input_perception, statblock.stats.perception, input_perception.placeholder);
    setValueIfNotEqual(input_stealth, statblock.stats.stealth, input_stealth.placeholder);
    setValueIfNotEqual(input_atk, statblock.stats.atk, input_atk.placeholder);
    setValueIfNotEqual(input_dcLow, statblock.stats.dc, input_dcLow.placeholder);
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
    const attributes = getAttributesOrderForMonster();
    const monsterMaker = new StatsGenerator();
    const input = new MonsterInput(level, rank, role, attributes, this.getAttributesForMonster());
    const output = monsterMaker.getMonsterStats(input);
    input_ac.placeholder = String(output.ac);
    input_hp.placeholder = String(output.hp);
    input_init.placeholder = String(output.initMod);
    input_perception.placeholder = String(output.passivePercept);
    input_stealth.placeholder = String(output.passiveStealth);
    input_speed.placeholder = String(output.speed);
    input_atk.placeholder = String(output.atkBonus);
    input_dcLow.placeholder = String(output.dcBonus);
    input_dmg.placeholder = String(output.dmg);
    info_damage_avg.placeholder = String(output.dmg);
    input_prof.placeholder = String(output.prof);
    input_cr.placeholder = String(output.cr);
    input_xp.placeholder = String(output.xp);
    statblockSortie.abilities = {
        strScore: output.strScore,
        strDef: output.strSaveMod,
        dexScore: output.dexScore,
        dexDef: output.dexSaveMod,
        conScore: output.conScore,
        conDef: output.conSaveMod,
        intScore: output.intScore,
        intDef: output.intSaveMod,
        wisScore: output.wisScore,
        wisDef: output.wisSaveMod,
        chaScore: output.chaScore,
        chaDef: output.chaSaveMod,
        abilityRanks: attributes
    };
    for (let i = 1; i <= 6; i++) {
        let attributeInput = getInputById("attr" + i);
        let attributeScoreInput = getInputById("attr" + i + "score");
        if (attributeInput.value != "") {
            attributeScoreInput.placeholder = String(getAbilityScoreFor(i));
        }
        else {
            attributeScoreInput.placeholder = "";
        }
    }
    calculateDamage();
}
/* ABILITY SCORE DISTRIBUTION LOGIC */
function initAbilityScoresSelection() {
    for (let i = 1; i <= 6; i++) {
        let element = getInputById("attr" + i);
        element.value = "0";
        element.addEventListener('change', () => {
            abilityScoreOnChange(i);
        });
    }
}
function abilityScoreOnChange(indexChanged) {
    getStats();
}
function getAttributesOrderForMonster() {
    let order = new Array();
    for (let i = 1; i <= 6; i++) {
        let attribute = getInputById("attr" + i);
        if (attribute.value != "") {
            order.push(Number(attribute.value));
        }
    }
    return order;
}
function getAttributesForMonster() {
    let attributes = new Array();
    for (let i = 1; i <= 6; i++) {
        let attribute = getInputById("attr" + i + "score");
        if (attribute.value === "") {
            attributes.push(null);
        }
        else {
            attributes.push(Number(attribute.value));
        }
    }
    return attributes;
}
//GENERER LE CONTENU DES DROPDOWN LIST SELON LES ENUMS
function initSelectLists() {
    getSelectByIdFromEnum("rank", Rank, Rank.Grunt);
    getSelectByIdFromEnum("role", Role, Role.Striker);
    getSelectByIdFromEnum("type", StatblockType, StatblockType.Monster);
    getSelectByIdFromEnum("size", Size, Size.Medium);
    getSelectByIdFromEnum("origin", Origin, Origin.Natural);
    getSelectByIdFromEnum("form", Form, Form.Humanoid);
    getSelectByIdFromEnum("attr1", AbilityAttr, AbilityAttr.Low);
    getSelectByIdFromEnum("attr2", AbilityAttr, AbilityAttr.Low);
    getSelectByIdFromEnum("attr3", AbilityAttr, AbilityAttr.Low);
    getSelectByIdFromEnum("attr4", AbilityAttr, AbilityAttr.Low);
    getSelectByIdFromEnum("attr5", AbilityAttr, AbilityAttr.Low);
    getSelectByIdFromEnum("attr6", AbilityAttr, AbilityAttr.Low);
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
        dc: Number(getValueOrPlaceholder(input_dcLow)),
        dmg: Number(getValueOrPlaceholder(input_dmg)),
        prof: Number(getValueOrPlaceholder(input_prof)),
        cr: getValueOrPlaceholder(input_cr),
        xp: Number(getValueOrPlaceholder(input_xp))
    };
    statblockSortie.abilities = {
        strScore: Number(getValueOrPlaceholder(getInputById("attr1score"))),
        dexScore: Number(getValueOrPlaceholder(getInputById("attr2score"))),
        conScore: Number(getValueOrPlaceholder(getInputById("attr3score"))),
        intScore: Number(getValueOrPlaceholder(getInputById("attr4score"))),
        wisScore: Number(getValueOrPlaceholder(getInputById("attr5score"))),
        chaScore: Number(getValueOrPlaceholder(getInputById("attr6score"))),
        strDef: statblockSortie.abilities.strDef,
        dexDef: statblockSortie.abilities.dexDef,
        conDef: statblockSortie.abilities.conDef,
        intDef: statblockSortie.abilities.intDef,
        wisDef: statblockSortie.abilities.wisDef,
        chaDef: statblockSortie.abilities.chaDef,
        abilityRanks: statblockSortie.abilities.abilityRanks
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
function getAbilityScoreFor(order) {
    let score = 0;
    switch (order) {
        case 1:
            score = statblockSortie.abilities.strScore;
            break;
        case 2:
            score = statblockSortie.abilities.dexScore;
            break;
        case 3:
            score = statblockSortie.abilities.conScore;
            break;
        case 4:
            score = statblockSortie.abilities.intScore;
            break;
        case 5:
            score = statblockSortie.abilities.wisScore;
            break;
        case 6:
            score = statblockSortie.abilities.chaScore;
            break;
        default:
            break;
    }
    return score;
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
    constructor(level, rank, role, abilityOrder, abilitiesOverrides, speed = 30) {
        this.level = level;
        this.rank = rank;
        this.role = role;
        this.abilityOrder = abilityOrder;
        this.baseSpeed = speed;
        this.abilitiiesOverrides = abilitiesOverrides;
    }
}
class MonsterOutput {
    constructor() {
    }
}
class StatsGenerator {
    constructor() {
        this.stats = new Array();
        this.stats.push(new StatLine(0, 10, 16, 1, 9, 1, 1, { high: 3, med: 1, low: 0 }, 25));
        this.stats.push(new StatLine(1, 11, 22, 2, 10, 2, 2, { high: 3, med: 1, low: 0 }, 50));
        this.stats.push(new StatLine(2, 12, 28, 2, 10, 4, 2, { high: 3, med: 1, low: 0 }, 112.5));
        this.stats.push(new StatLine(3, 12, 34, 2, 10, 8, 2, { high: 3, med: 1, low: 0 }, 175));
        this.stats.push(new StatLine(4, 12, 40, 2, 10, 10, 2, { high: 4, med: 1, low: 0 }, 275));
        this.stats.push(new StatLine(5, 13, 48, 3, 11, 13, 3, { high: 4, med: 1, low: 0 }, 450));
        this.stats.push(new StatLine(6, 14, 57, 3, 11, 15, 3, { high: 4, med: 2, low: 0 }, 575));
        this.stats.push(new StatLine(7, 14, 66, 3, 11, 18, 3, { high: 4, med: 2, low: 0 }, 725));
        this.stats.push(new StatLine(8, 14, 75, 3, 11, 20, 3, { high: 5, med: 2, low: 0 }, 975));
        this.stats.push(new StatLine(9, 15, 83, 4, 12, 25, 4, { high: 5, med: 2, low: 0 }, 1250));
        this.stats.push(new StatLine(10, 15, 92, 4, 12, 28, 4, { high: 5, med: 2, low: 0 }, 1475));
        this.stats.push(new StatLine(11, 15, 98, 4, 12, 31, 4, { high: 5, med: 2, low: 0 }, 1800));
        this.stats.push(new StatLine(12, 16, 104, 4, 12, 34, 4, { high: 5, med: 3, low: 1 }, 2100));
        this.stats.push(new StatLine(13, 17, 111, 5, 13, 37, 5, { high: 5, med: 3, low: 1 }, 2500));
        this.stats.push(new StatLine(14, 17, 117, 5, 13, 39, 5, { high: 5, med: 3, low: 1 }, 2875));
        this.stats.push(new StatLine(15, 17, 124, 5, 13, 47, 5, { high: 5, med: 3, low: 1 }, 3250));
        this.stats.push(new StatLine(16, 17, 130, 5, 13, 50, 5, { high: 6, med: 3, low: 1 }, 3750));
        this.stats.push(new StatLine(17, 18, 137, 6, 14, 53, 6, { high: 6, med: 3, low: 1 }, 4500));
        this.stats.push(new StatLine(18, 18, 144, 6, 14, 56, 6, { high: 6, med: 4, low: 1 }, 5000));
        this.stats.push(new StatLine(19, 18, 151, 6, 14, 59, 6, { high: 6, med: 4, low: 1 }, 5500));
        this.stats.push(new StatLine(20, 19, 158, 6, 14, 63, 6, { high: 6, med: 4, low: 1 }, 6250));
        this.stats.push(new StatLine(21, 20, 165, 7, 15, 72, 7, { high: 6, med: 4, low: 1 }, 8250));
        this.stats.push(new StatLine(22, 20, 172, 7, 15, 76, 7, { high: 6, med: 4, low: 1 }, 10250));
        this.stats.push(new StatLine(23, 20, 180, 7, 15, 79, 7, { high: 6, med: 4, low: 1 }, 12500));
        this.stats.push(new StatLine(24, 20, 187, 7, 15, 83, 7, { high: 7, med: 5, low: 2 }, 15500));
        this.ranks = new Array();
        this.ranks.push(new RankLine(Rank.Minion, 0.2, -1, -1, TrainedValue.Untrained, 0.75, 0.25));
        this.ranks.push(new RankLine(Rank.Grunt, 1, 0, 0, TrainedValue.Untrained, 1, 1));
        this.ranks.push(new RankLine(Rank.Elite, 2, 1, 1, TrainedValue.Half, 1.1, 2));
        this.ranks.push(new RankLine(Rank["Paragon vs. 3"], 3, 2, 2, TrainedValue.Trained, 1.2, 3));
        this.ranks.push(new RankLine(Rank["Paragon vs. 4"], 4, 2, 2, TrainedValue.Trained, 1.2, 4));
        this.ranks.push(new RankLine(Rank["Paragon vs. 5"], 5, 2, 2, TrainedValue.Trained, 1.2, 5));
        this.ranks.push(new RankLine(Rank["Paragon vs. 6"], 6, 2, 2, TrainedValue.Trained, 1.2, 6));
        this.ranks.push(new RankLine(Rank["Paragon vs. 7"], 7, 2, 2, TrainedValue.Trained, 1.2, 7));
        this.roles = new Array();
        this.roles.push(new RoleLine(Role.Controller, 2, 1, 1, -1, -1, 0.5, true, 0, false, false));
        this.roles.push(new RoleLine(Role.Defender, 4, 0.75, 2, 0, 0, 0.5, false, -5, false, false));
        this.roles.push(new RoleLine(Role.Lurker, -4, 0.75, -2, +2, +1, 1.25, false, 5, false, true));
        this.roles.push(new RoleLine(Role.Scout, -2, 1, -1, -1, -1, 0.75, false, 10, true, true));
        this.roles.push(new RoleLine(Role.Striker, 0, 1, 0, 0, 0, 1, false, 0, false, false));
        this.roles.push(new RoleLine(Role.Supporter, -1, 1.25, -1, -1, -1, 0.75, true, 0, true, false));
    }
    getMonsterStats(input) {
        var _a, _b, _c, _d, _e, _f, _g;
        let output = new MonsterOutput();
        const baseStats = this.getStats(input.level);
        const role = this.getRole(input.role);
        const rank = this.getRank(input.rank);
        output.ac = baseStats.baseAc + role.acMod + rank.acMod;
        output.hp = Math.round(baseStats.baseHp * role.hpMult * rank.hpMult);
        output.atkBonus = baseStats.atkMod + role.atkMod;
        output.dcBonus = baseStats.dcMod + role.dcMod;
        output.speed = (_a = input.baseSpeed) !== null && _a !== void 0 ? _a : 30 + role.speedMod;
        output.prof = baseStats.prof;
        output.dmg = Math.round(baseStats.baseDmg * rank.dmgMult * role.dmgMult);
        this.getAbilityModifiers(input, output);
        output.initMod = (_c = getAbilityModFromScore((_b = input.abilitiiesOverrides[1]) !== null && _b !== void 0 ? _b : output.dexScore)) !== null && _c !== void 0 ? _c : 0;
        output.passiveStealth = (_e = 10 + getAbilityModFromScore((_d = input.abilitiiesOverrides[1]) !== null && _d !== void 0 ? _d : output.dexScore)) !== null && _e !== void 0 ? _e : 0;
        output.passivePercept = (_g = 10 + getAbilityModFromScore((_f = input.abilitiiesOverrides[4]) !== null && _f !== void 0 ? _f : output.wisScore)) !== null && _g !== void 0 ? _g : 0;
        if (this.getRole(input.role).trainedInit)
            output.initMod += baseStats.prof;
        if (this.getRank(input.rank).initMod == TrainedValue.Trained) {
            output.initMod += baseStats.prof;
        }
        else if (this.getRank(input.rank).initMod == TrainedValue.Half) {
            output.initMod += baseStats.halfProf;
        }
        if (this.getRole(input.role).trainedStealth)
            output.passiveStealth += baseStats.prof;
        if (this.getRole(input.role).trainedPerception)
            output.passivePercept += baseStats.prof;
        let xpTable = new ExperienceToChallengeRating();
        output.xp = Math.floor(baseStats.xp * rank.xpMult);
        output.cr = xpTable.getCrFromXp(output.xp);
        return output;
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
        input.abilityOrder.forEach((value, index) => {
            const values = this.attribuerAbilities(input.level, input.rank, input.role, value);
            switch (index) {
                case 0:
                    output.strScore = values.abilityScore;
                    output.strSaveMod = values.save;
                    break;
                case 1:
                    output.dexScore = values.abilityScore;
                    output.dexSaveMod = values.save;
                    break;
                case 2:
                    output.conScore = values.abilityScore;
                    output.conSaveMod = values.save;
                    break;
                case 3:
                    output.intScore = values.abilityScore;
                    output.intSaveMod = values.save;
                    break;
                case 4:
                    output.wisScore = values.abilityScore;
                    output.wisSaveMod = values.save;
                    break;
                case 5:
                    output.chaScore = values.abilityScore;
                    output.chaSaveMod = values.save;
                    break;
            }
        });
    }
    attribuerAbilities(level, rank, role, abilityValue) {
        const baseStats = this.getStats(level);
        let mod, save, prof;
        switch (abilityValue) {
            case AbilityAttr.High:
                mod = baseStats.abilityMods.high;
                prof = baseStats.prof;
                break;
            case AbilityAttr.Med:
                mod = baseStats.abilityMods.med;
                prof = baseStats.halfProf;
                break;
            default:
                mod = baseStats.abilityMods.low;
                prof = 0;
                break;
        }
        mod = mod + this.getRank(rank).attrMod;
        save = 0 + this.getRole(role).saveMod + prof;
        return { abilityScore: getAbilityScoreFromMod(mod), save: save };
    }
}
class RoleLine {
    constructor(role, acMod, hpMult, saveMod, atkMod, dcMod, dmgMult, init, speedMod, percept, stealth) {
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
    constructor(rank, hpMult, acMod, attrMod, trainedInit, dmgMult, xpMult) {
        this.rank = rank;
        this.hpMult = hpMult;
        this.acMod = acMod;
        this.attrMod = attrMod;
        this.initMod = trainedInit;
        this.dmgMult = dmgMult;
        this.xpMult = xpMult;
    }
}
class StatLine {
    constructor(level, baseAc, baseHp, atkMod, dcMod, baseDmg, prof, abilityMods, xp) {
        this.level = level;
        this.baseAc = baseAc;
        this.baseHp = baseHp;
        this.atkMod = atkMod;
        this.dcMod = dcMod;
        this.baseDmg = baseDmg;
        this.prof = prof;
        this.halfProf = Math.floor(prof / 2);
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
    Rank[Rank["Paragon vs. 7"] = 7] = "Paragon vs. 7";
})(Rank || (Rank = {}));
var Role;
(function (Role) {
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
var AbilityAttr;
(function (AbilityAttr) {
    AbilityAttr[AbilityAttr["Low"] = 0] = "Low";
    AbilityAttr[AbilityAttr["Med"] = 1] = "Med";
    AbilityAttr[AbilityAttr["High"] = 2] = "High";
})(AbilityAttr || (AbilityAttr = {}));
var TrainedValue;
(function (TrainedValue) {
    TrainedValue[TrainedValue["Untrained"] = 0] = "Untrained";
    TrainedValue[TrainedValue["Half"] = 1] = "Half";
    TrainedValue[TrainedValue["Trained"] = 2] = "Trained";
})(TrainedValue || (TrainedValue = {}));
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
function getAbilityModFromScore(ability) {
    if (ability === 0)
        return null;
    return Math.floor(ability / 2) - 5;
}
function getAbilityScoreFromMod(mod) {
    if (mod === null || mod < -5)
        return 0;
    return Math.floor(mod * 2) + 10;
}
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