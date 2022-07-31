class FeatureManager{

    private conteneur: Element
    templates: Feature[]
    compteurId: number

    constructor(){
        this.compteurId = 0
        this.conteneur = document.getElementsByClassName("features-container")[0]
        const btnAddFeature = document.getElementById("btnAddFeature")
        btnAddFeature!.addEventListener('click', () => {
            this.AddFeatureLine()
        })
        this.AddFeatureLine()
        this.templates = this.GetQuickTemplates()
    }

    public Count(): number {
        return this.conteneur.getElementsByClassName("feature-row").length
    }

    public GetFeature(index: number) : Feature {
        let ligneFeature: Element
        if (index > this.Count() - 1 || index < 0)
            throw new RangeError()
        else
            ligneFeature = this.conteneur.getElementsByClassName("feature-row")[index]
            const name_input = <HTMLInputElement>ligneFeature.querySelector(".feature-name")
            const type_input = <HTMLSelectElement>ligneFeature.querySelector(".feature-type")
            const rarity_input = <HTMLSelectElement>ligneFeature.querySelector(".feature-rarity")
            const particularity_input = <HTMLInputElement>ligneFeature.querySelector(".feature-particularity")
            const description_input = <HTMLTextAreaElement>ligneFeature.querySelector(".feature-description")

            let feature: Feature = {
                name: name_input.value,
                type: <FeatureType>Number(type_input.value),
                rarity: <FeatureRarity>Number(rarity_input.value),
                particularity: particularity_input.value,
                description: description_input.value,
            }

            return feature
    }

    public GetFeatures(): Feature[] {
        let list:Feature[] = new Array()
        for (let i = 0; i < this.Count(); i++) {
            let feature = this.GetFeature(i)
            list.push({
                name: feature.name,
                type: feature.type,
                rarity: feature.rarity,
                particularity: feature.particularity,
                description: feature.description
            })      
        }

        return list
    }

    public AddFeatureLine() {
        const ligneFeature = document.createElement("div")
        ligneFeature.className = "feature-row form-row bg-dark border p-2"
        ligneFeature.setAttribute("data-lineid", String(this.compteurId))
        ligneFeature.appendChild(this.createColName(this.compteurId))
        ligneFeature.appendChild(this.createColType())
        ligneFeature.appendChild(this.createColRarity())
        ligneFeature.appendChild(this.createColParticularity())
        ligneFeature.appendChild(this.createColDescription())
        this.conteneur.insertBefore(ligneFeature, this.conteneur.childNodes[this.Count()+3])
        this.compteurId++
    }

    public AddFeatureLineFrom(feature: Feature) {
        const ligneFeature = document.createElement("div")
        ligneFeature.className = "feature-row form-row bg-dark border p-2"
        ligneFeature.setAttribute("data-lineid", String(this.compteurId))
        ligneFeature.appendChild(this.createColName(this.compteurId, feature.name))
        ligneFeature.appendChild(this.createColType(feature.type))
        ligneFeature.appendChild(this.createColRarity(feature.rarity))
        ligneFeature.appendChild(this.createColParticularity(feature.particularity))
        ligneFeature.appendChild(this.createColDescription(feature.description))
        this.conteneur.insertBefore(ligneFeature, this.conteneur.childNodes[this.Count()+3])
        this.compteurId++
    }

    public RemoveFeatureLine(ligneid:number) {
        let ligneFeature
        if(window.confirm("Delete this feature?")) {
            ligneFeature = this.conteneur.querySelector("[data-lineid='" + ligneid + "']")
            if(ligneFeature != null) ligneFeature.remove()
        }
    }

    public MoveUp(ligneid:number) {
        const feature = this.conteneur.querySelector("[data-lineid='" + ligneid + "']")
        if(feature.previousElementSibling) {
            console.log("moving Up before")
            feature.parentNode.insertBefore(feature, feature.previousElementSibling)
        }
    }

    public MoveDown(ligneid:number) {
        const feature = this.conteneur.querySelector("[data-lineid='" + ligneid + "']")
        if(feature.nextElementSibling) {
            console.log("moving Down")
            feature.parentNode.insertBefore(feature, feature.nextElementSibling.nextElementSibling)
        }
    }

    public RemoveAllFeatures(){
        this.conteneur.innerHTML=""
    }

    private createColName(ligneId: number, value: string = ""): Element{
        let colonne = document.createElement("div")
        const btnDel = document.createElement("button")
        const btnUp = document.createElement("button")
        const btnDown = document.createElement("button")
        const lblName = document.createElement("label")
        const txtName = document.createElement("input")

        colonne.className = "col-5"
        btnDel.className = "btn btn-sm btn-outline-danger mt-1 mb-1"
        btnDel.innerHTML = "<i class='bi bi-x-lg'></i>"
        btnDel.addEventListener('click', () => {
            this.RemoveFeatureLine(ligneId)
            updatePreview()
        })
        btnUp.innerHTML = "<i class='bi bi-arrow-bar-up'></i>"
        btnUp.className = "btn btn-sm btn-outline-secondary m-1"
        btnUp.addEventListener('click', () => {
            this.MoveUp(ligneId)
            updatePreview()
        })
        btnDown.innerHTML = "<i class='bi bi-arrow-bar-down'></i>"
        btnDown.className = "btn btn-sm btn-outline-secondary mt-1 mb-1"
        btnDown.addEventListener('click', () => {
            this.MoveDown(ligneId)
            updatePreview()
        })
        lblName.innerText = " Feature Name"
        lblName.className = "ml-2"
        txtName.type = "text"
        txtName.className = "form-control feature-name"
        txtName.placeholder = "Insert name here"
        txtName.value = value
        txtName.addEventListener('change', () => {
            updatePreview()
        })

        colonne.appendChild(btnDel)
        colonne.appendChild(btnUp)
        colonne.appendChild(btnDown)
        colonne.appendChild(lblName)
        colonne.appendChild(txtName)

        return colonne
    }

    private createColType(value: FeatureType = FeatureType.Action): Element {
        let colonne = document.createElement("div")
        const label = document.createElement("label")
        const controle = document.createElement("select")
        const spacer = document.createElement("span")

        colonne.className = "col-2"
        label.innerText = "Type"
        spacer.className = "feature-label-spacer"
        controle.className = "form-control feature-type"
        controle.addEventListener('change', () => {
            updatePreview()
        })
        this.initializeSelectBox(controle, FeatureType, value)

        colonne.appendChild(spacer)
        colonne.appendChild(label)
        colonne.appendChild(controle)
        
        return colonne
    }

    private createColRarity(value: FeatureRarity = FeatureRarity.Common): Element {
        let colonne = document.createElement("div")
        const label = document.createElement("label")
        const controle = document.createElement("select")
        const spacer = document.createElement("span")

        colonne.className = "col-2"
        label.innerText = "Rarity"
        spacer.className = "feature-label-spacer"
        controle.className = "form-control feature-rarity"
        controle.addEventListener('change', () => {
            updatePreview()
        })
        this.initializeSelectBox(controle, FeatureRarity, value)

        colonne.appendChild(spacer)
        colonne.appendChild(label)
        colonne.appendChild(controle)
        return colonne
    }

    private createColParticularity(value: string = ""): Element {
        let colonne = document.createElement("div")
        const label = document.createElement("label")
        const controle = document.createElement("input")
        const spacer = document.createElement("span")

        colonne.className = "col-3"
        label.innerText = "Particularities"
        spacer.className = "feature-label-spacer"
        controle.className = "form-control feature-particularity"
        controle.value = value
        controle.placeholder = "ex: Recharge 5-6"
        controle.addEventListener('change', () => {
            updatePreview()
        })

        colonne.appendChild(spacer)
        colonne.appendChild(label)
        colonne.appendChild(controle)
        return colonne
    }

    private createColDescription(value: string = ""): Element {
        let colonne = document.createElement("div")
        const label = document.createElement("label")
        const controle = document.createElement("textarea")

        colonne.className = "col-12"
        label.innerText = "Description"
        controle.className = "form-control feature-description"
        controle.rows = 3
        controle.value = value
        controle.addEventListener('change', () => {
            updatePreview()
        })

        colonne.appendChild(label)
        colonne.appendChild(controle)
        return colonne
    }

    private initializeSelectBox<E>(selectbox: HTMLSelectElement, e:any, defaultValue: E|null) {
        const entries = getAllEnumEntries(e)
        for (let i = 0; i < entries.length; i++) {
            let option = document.createElement("option")
            option.text = entries[i][0]
            option.value = entries[i][1]
            option.selected = entries[i][1] === defaultValue
    
            if(entries[i][0] === "None") {
                option.text = "—"
            }
    
            selectbox.add(option)
        }
    }

    InitializeQuickTemplates(){
        // <ul id="quick-templates" class="dropdown-menu">
        // <li><a class="dropdown-item"> Dropdown link</a></li>
        const conteneur = document.getElementById("quick-templates")
        conteneur.querySelectorAll("li").forEach(x => x.remove())
        this.templates.forEach((feature, i) => {
            const line = document.createElement("li")
            const link = document.createElement("a")
            link.className = "dropdown-item"
            link.text = feature.name
            link.addEventListener('click', () => {
                quickTemplateClick(String(i))
            })
            line.appendChild(link)
            conteneur.appendChild(line)
        })
    }

    private GetQuickTemplates() : Feature[] {
        const listeTemplates: Feature[] = Array()

        listeTemplates.push({ name:"Melee Attack", type: FeatureType.Action, rarity: FeatureRarity.Common, particularity: "", 
        description: "<em>Melee:</em> +0 to hit, reach 5 ft., one target. <em>Hit:</em> 0 (1d4 + 0) slashing damage." })
        listeTemplates.push({ name:"Ranged Attack", type: FeatureType.Action, rarity: FeatureRarity.Common, particularity: "", 
        description: "<em>Ranged:</em> +X to hit, range 30 ft., one target. <em>Hit:</em> 0 (1d4 + 0) slashing damage." })
        listeTemplates.push({ name:"Save Effect", type: FeatureType.Action, rarity: FeatureRarity.Common, particularity: "", 
        description: "<em>Save:</em> DC 10 vs STAT, reach 5 ft., one target. <em>Hit:</em> 0 (1d4 + 0) slashing damage. The target is <em>Condition</em> (save ends, DC 10 STAT)." })       
        listeTemplates.push({ name:"Area Save", type: FeatureType.Action, rarity: FeatureRarity.Common, particularity: "", 
        description: "<em>Save:</em> DC 10 vs STAT, a 10 ft. radius sphere centered on a point within 30 ft. of you, all target. <em>Hit:</em> 0 (1d4 + 0) slashing damage. <em>Miss:</em> half damage." })
        listeTemplates.push({ name:"Utility: Damaging Terrain", type: FeatureType.Action, rarity: FeatureRarity.Uncommon, particularity: "Recharge 5-6", 
        description: "<em>Utility:</em> Select a 10 ft. radius circle centered on a point within 30 ft. of you. <em>Effect: </em> the ground is difficult and unstable terrain until the start of your next turn. Any creature that enters or starts their turn within the terrain takes X bludgeoning damage." })
        listeTemplates.push({ name:"Utility: Buff", type: FeatureType.Action, rarity: FeatureRarity.Common, particularity: "Recharge 5-6", 
        description: "<em>Utility:</em> range 30 ft., two friendly creatures. <em>Effect:</em> the creature gains advantage on saving throws. This effect ends at the start of your next turn." })

        /* ARCHETYPES */
        listeTemplates.push({ name:"Cantrip", type: FeatureType.Action, rarity: FeatureRarity.Common, particularity: "", 
        description: "<em>Spell:</em> Cantrip, School, VSM|CR <[verbal, somatic, material, concentration, ritual]. <em>Ranged: </em> +X to hit, range 60 ft., one target. <em>Hit:</em> 0 (1d4 + 0) slashing damage." })
        
        listeTemplates.push({ name:"Spell: Call Lightning", type: FeatureType.Action, rarity: FeatureRarity.Uncommon, particularity: "1/sr", 
        description: "<em>Spell:</em> 3rd-level, Evocation, VS. <em>Save: </em> DC 17 vs DEX, a 10 ft. radius circle centered on a point within 30 ft. of you, all targets. <em>Hit:</em> 30 (4d12 + 4) lightning damage. <em>Miss:</em> half damage." })

        listeTemplates.push({ name: "Summoner", type: FeatureType.Action, rarity: FeatureRarity.Rare,
        particularity: "2 SP/lr",
        description: 
`<em>Utility:</em> range 30 ft. (does not require line of sight), 1-8 humanoid corpses. You spend SP to reanimate the targeted corpses as 6th-level undead creatures. These creatures act after your turn and obey your commands for up to 1 hour, at which point they revert to humanoid corpses.
<div class="container">
    <div class="row">
        <div class="col">
            <strong>1 SP:</strong> 4 Minions<br>
            <strong>1 SP:</strong> 1 Grunt<br>
            <strong>2 SP:</strong> 8 Minions
        </div>
        <div class="col">
            <strong>2 SP:</strong> 4 Minions, 1 Grunt<br>
            <strong>2 SP:</strong> 2 Grunts<br>
            <strong>2 SP:</strong> 1 Elite
        </div>
    </div>
</div>
`})
        listeTemplates.push({ name: "Swarm", type: FeatureType.Trait, rarity: FeatureRarity.Common,
        particularity: "",
        description: "<p>You can occupy another creature's space and vice versa. You can move through any opening large enough for a tiny creature. Your space is considered difficult terrain. You have advantage on attack rolls against creatures in your space, and creatures within your space have disadvantage on attack rolls.</p> <p>You can't regain hit points or gain temporary hit points. When you would be subject to any of the following conditions, you instead lose [LEVEL] hit points: charmed,frightened, grappled, paralyzed, petrified, prone, restrained, or stunned.</p>"})

        /* PARAGON EFFECTS */
        listeTemplates.push({ name:"Paragon Power", type: FeatureType.Free, rarity: FeatureRarity.Uncommon, particularity: "1/round", 
        description: 
`At the end of another creature's turn, you may regain one reaction and choose one of the following:
<ul>
    <li>
        <b>Act:</b> Take an action. You may also spend some or all of your remaining movement as part of that action.
    </li>
    <li>
        <b>Resist:</b> Reroll a saving throw against an ongoing effect. Spend [2*lvl] hit points to gain advantage on the roll.
    </li>
</ul>` })
        listeTemplates.push({ name:"Paragon Defenses", type: FeatureType.Free, rarity: FeatureRarity.Rare, particularity: "3/lr", 
        description: "When you would fail a saving throw, you may spend [2*lvl] hit points to succeed." })
        
        listeTemplates.push({ name: "Example Note", type: FeatureType.Trait, rarity: FeatureRarity.Text,
        particularity: "Lore",
        description: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"})

        return listeTemplates
    }
}
