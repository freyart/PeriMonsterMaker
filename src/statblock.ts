type StatblockHeader = {
    name: string
    size: Size
    monstertype: MonsterType
    level: number
    rank: Rank
    role: Role
    keywords: string
    other: string
}

type StatblockAbilities = {
    strScore: number
    strTrained: boolean
    dexScore: number
    dexTrained: boolean
    conScore: number
    conTrained: boolean
    intScore: number
    intTrained: boolean
    wisScore: number
    wisTrained: boolean
    chaScore: number
    chaTrained: boolean
    abilityRanks: AbilityAttr[]
}

type StatblockStats = {
    ac: number
    hp: number
    vulnerable: string
    resistant: string
    dImmune: string
    cImmune: string
    atk: number
    dc: number
    dmg: number
    reach: string
    range: string
    
    speed: string
    initiative: number
    skills: string
    senses: string
    perception: number
    
    languages: string
    prof: number
    cr: string
    xp: number
    items: string
    
    dThreshold: string
}

class Statblock {
    type: StatblockType|null
    header: StatblockHeader|null
    stats: StatblockStats|null
    abilities: StatblockAbilities|null
    features: Feature[]

    constructor (){
        this.type = null
        this.header = null
        this.stats = null
        this.abilities = null
        this.features = new Array()
    }

    Export() {
        //ajouter check pour valider le data
        const filename = this.header!.name + ".json"
        const jsonStr = JSON.stringify(this)

        let element = document.createElement('a')
        element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonStr))
        element.setAttribute('download', filename)
        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()

        document.body.removeChild(element)
    }

    /** Exporte le statblock complet */
    Show(idDestination: string, emptyBeforeShow: boolean = true) {
        const destination = document.getElementById(idDestination)
        if (destination != null){
            if(emptyBeforeShow){
                destination.innerHTML = ""
            }
            const statblock = this.CreateDivWithClass(this.type ?? "monster") 
            statblock.appendChild(this.CreateHeader())
            statblock.appendChild(this.CreateAbilities())
            statblock.appendChild(this.CreateStats())
            statblock.appendChild(this.CreateFeatures())
            destination.appendChild(statblock)
        }
    }

    private CreateHeader() : Element {
        const conteneur = this.CreateDivWithClass("header")

        if(this.header != undefined){
            const top = this.CreateDivWithClass("header-top")
            const top1 = this.CreateDivWithClass("name")
            top1.textContent = this.header.name
            const top2 = this.CreateDivWithClass("subtitle")

            top2.textContent = getKeyFromEnumValue(Size, this.header.size) + ' ' 
                + getKeyFromEnumValue(MonsterType, this.header.monstertype)
            if(this.header.keywords != "") {
                top2.textContent += " (" + this.header.keywords + ")"
            }
            if(this.header.other != ""){
                top2.textContent = addCommaIfNotEmpty(top2.textContent) + this.header.other
            }
            top.appendChild(top1)
            top.appendChild(top2)
            
            const keywords = this.CreateDivWithClass("keywords")
            keywords.textContent = "Level " + this.header.level + " " + Rank[this.header.rank]

            keywords.prepend(this.CreateIconFor(Role[Number(this.header.role)].toLowerCase()))
            keywords.append(", " + Role[Number(this.header.role)])

            conteneur.appendChild(top)
            conteneur.appendChild(keywords)
        }

        return conteneur
    }

    private CreateAbilities() : Element {
        const statblock = this.CreateDivWithClass("attributes") 
        if(this.abilities != null){
            statblock.appendChild(this.CreateLineAttr("str", this.abilities.strScore))
            statblock.appendChild(this.CreateLineAttr("dex", this.abilities.dexScore))
            statblock.appendChild(this.CreateLineAttr("con", this.abilities.conScore))
            statblock.appendChild(this.CreateLineAttr("int", this.abilities.intScore))
            statblock.appendChild(this.CreateLineAttr("wis", this.abilities.wisScore))
            statblock.appendChild(this.CreateLineAttr("cha", this.abilities.chaScore))
        }

        return statblock
    }

    private CreateStats() : Element {
        const statblock = this.CreateDivWithClass("stats")
        if(this.stats == undefined){
            return statblock
        }

        let ligneGen

        // AC + Saves
        let acAndSaves = this.CreateStatFor("AC", this.stats.ac)
        const abi = this.abilities
        if( 
            (abi.strScore != 0 && abi.strTrained) || 
            (abi.dexScore != 0 && abi.dexTrained) || 
            (abi.conScore != 0 && abi.conTrained) || 
            (abi.intScore != 0 && abi.intTrained) || 
            (abi.wisScore != 0 && abi.wisTrained) || 
            (abi.chaScore != 0 && abi.chaTrained)) 
        {
            acAndSaves += this.CreateStatFor("Saving Throws", this.GenererValeurSaves())
        }
            
        ligneGen = this.CreateLineStat("ac", acAndSaves )
        statblock.append(ligneGen)

        // HP Resistances Immunites Vulnerabilites
        
        let hitpoints: string
        if(this.header.rank == Rank.Minion){
            hitpoints = this.CreateStatFor("HP", this.stats.hp + " (no damage from a missed attack)")
        }
        else if(this.header.rank == Rank.Grunt || this.header.rank == Rank.Elite) {
            hitpoints = this.CreateStatFor("HP", this.stats.hp) + 
            this.CreateStatFor("Bloodied", Math.ceil(this.stats.hp/2))
        }
        else {
            hitpoints = this.CreateStatFor("HP", this.stats.hp) + 
            this.CreateStatFor("Bloodied", Math.floor(this.stats.hp/3*2)) +
            this.CreateStatFor("Enraged", Math.floor(this.stats.hp/3))
        }

        let damageThreshold = this.CreateStatFor("Damage Threshold", this.stats.dThreshold)
        let vulnerable = this.CreateStatFor("Vulnerable", this.stats.vulnerable)
        let resistance = this.CreateStatFor("Resistant", this.stats.resistant)
        let immunity = this.CreateStatFor("Immune", this.stats.dImmune)
        if(immunity == "") {
            immunity = this.CreateStatFor("Immune", this.stats.cImmune)
        }
        else {
            immunity += this.CreateStatFor("and", this.stats.cImmune)
            immunity = immunity.replace(".</span> <span class=\"name\">and</span>", "</span> <span class=\"name\">and</span>")
        }

        ligneGen = this.CreateLineStat("hp", hitpoints + damageThreshold + vulnerable + resistance + immunity)
        statblock.append(ligneGen)

        // Quickstats
        ligneGen = this.CreateLineStat("quickstats", 
            this.CreateStatFor("ATK", showPlusMinus(this.stats.atk)) + 
            this.CreateStatFor("DC", showPlusMinus(this.stats.dc)) +
            this.CreateStatFor("DMG", this.stats.dmg) +
            this.CreateStatFor("Reach", this.stats.reach) +
            this.CreateStatFor("Range", this.stats.range))
        statblock.append(ligneGen)
        statblock.appendChild(document.createElement("hr"))

        //Speed
        ligneGen = this.CreateLineStat("speed", 
            this.CreateStatFor("Speed", this.stats.speed) + 
            this.CreateStatFor("Initiative", showPlusMinus(this.stats.initiative)))
        statblock.append(ligneGen)
        
        //Skills
        ligneGen = this.CreateLineStat("skills", 
            this.CreateStatFor("Skills", this.stats.skills))
        statblock.append(ligneGen)

        //Senses
        ligneGen = this.CreateLineStat("senses", 
        this.CreateStatFor("Senses", 
            addCommaIfNotEmpty(this.stats.senses) + "passive Perception " + this.stats.perception))
        statblock.append(ligneGen)

        //Languages
        ligneGen = this.CreateLineStat("languages", 
        this.CreateStatFor("Languages", this.stats.languages))
        statblock.append(ligneGen)

        //Proficiency
        ligneGen = this.CreateLineStat("prof", 
            this.CreateStatFor("Proficiency", showPlusMinus(this.stats.prof)) + 
            this.CreateStatFor("CR", this.stats.cr) +
            this.CreateStatFor("XP", this.stats.xp))
        statblock.append(ligneGen)

        //Items
        ligneGen = this.CreateLineStat("items", 
        this.CreateStatFor("Items", this.stats.items))
        statblock.append(ligneGen)

        return statblock
    }

    private CreateFeatures() : Element {
        const traits = this.CreateDivWithClass("traits") 
        const ordreFeatureType = new Array(
            FeatureType.Trigger, 
            FeatureType.Trait, 
            FeatureType.Free, 
            FeatureType.Bonus, 
            FeatureType.Action, 
            FeatureType.Reaction, 
            FeatureType.Countermeasure, 
            FeatureType.Salvage)

        if(this.stats != null){
            ordreFeatureType.forEach(type => {
                const selectionFeature = this.features.filter(function(x){ return x.type === type})
                if (selectionFeature.length > 0){
                    traits.appendChild(this.CreateFeatureSection(FeatureType[type]))
                    selectionFeature.forEach(element => {
                        traits.appendChild(this.CreateFeature(element))
                    });
                }
            });
        }
        return traits
    }

    private CreateDivWithClass(className:string) : Element {
        const conteneur = document.createElement("div")
        conteneur.className = className
        return conteneur
    }

    private CreateIconFor(iconClass:string) : Element {
        const icon = document.createElement("i")
        icon.className = "icon " + iconClass
        return icon
    }

    private CreateLineStat(iconClass: string, htmlContent: string) : Element {
        if(String(htmlContent) === ""){
            return document.createElement("span");
        }
        let element = this.CreateDivWithClass("line")
        let content = this.CreateDivWithClass("content")
        content.innerHTML = htmlContent
        element.append(content)
        if(iconClass != "") {
            let icon = this.CreateIconFor(iconClass)
            element.prepend(icon)
        }
        return element
    }

    private CreateStatFor(name: string, value: string|number) : string{
        if(String(value) === ""){
            return "";
        }
        let nameSpan = document.createElement("span")
        nameSpan.className = "name"
        nameSpan.innerHTML = name
        let contentSpan = document.createElement("span")
        contentSpan.innerHTML = endsWithDot(String(value).trim())
        return nameSpan.outerHTML + "&nbsp;" + contentSpan.outerHTML + " "
    }

    private CreateLineAttr(ability: string, statScore: number): Element {
        const attribute = document.createElement("div")
        const score = document.createElement("div")
        const mod = document.createElement("div")

        score.textContent = ability + " " + statScore
        if(statScore === 0) {
            mod.innerHTML = "&mdash;"
        }
        else {
            mod.innerHTML = `${showPlusMinus(getAbilityModFromScore(statScore))}`
        }

        attribute.appendChild(score)
        attribute.appendChild(mod)

        return attribute
    }

    private CreateFeatureSection(name: string): Element {
        const section = this.CreateDivWithClass("separateur-section")
        const contenu = document.createElement("div")
        contenu.textContent = name
        section.appendChild(contenu)
        return section
    }

    private CreateFeature(feature: Feature): Element{
        const item = this.CreateDivWithClass("item "+ FeatureRarity[feature.rarity].toLowerCase())
        const name = this.CreateDivWithClass("label")
        name.textContent += feature.name
        if(feature.particularity != ""){
            const partic = document.createElement("span")
            partic.className = "spec"
            partic.textContent = feature.particularity
            name.appendChild(partic)
        }
        item.appendChild(name)
        item.innerHTML += feature.description

        return item
    }

    private GenererValeurSaves(): string {
        let saves: string[] = Array()
        const abi = this.abilities

        if((abi.strScore != 0 && abi.strTrained)) {
            saves.push("Str&nbsp;" + showPlusMinus(getAbilityModFromScore(abi.strScore) + this.stats.prof))
        }
        if((abi.dexScore != 0 && abi.dexTrained)) {
            saves.push("Dex&nbsp;" + showPlusMinus(getAbilityModFromScore(abi.dexScore) + this.stats.prof))
        }
        if((abi.conScore != 0 && abi.conTrained)) {
            saves.push("Con&nbsp;" + showPlusMinus(getAbilityModFromScore(abi.conScore) + this.stats.prof))
        }
        if((abi.intScore != 0 && abi.intTrained)) {
            saves.push("Int&nbsp;" + showPlusMinus(getAbilityModFromScore(abi.intScore) + this.stats.prof))
        }
        if((abi.wisScore != 0 && abi.wisTrained)) {
            saves.push("Wis&nbsp;" + showPlusMinus(getAbilityModFromScore(abi.wisScore) + this.stats.prof))
        }
        if((abi.chaScore != 0 && abi.chaTrained)) {
            saves.push("Cha&nbsp;" + showPlusMinus(getAbilityModFromScore(abi.chaScore) + this.stats.prof))
        }
        return saves.join(", ")
    }
}

class StatBlockWithPath extends Statblock{
    path: string
}
