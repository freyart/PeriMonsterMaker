type StatblockHeader = {
    name: string
    size: Size
    origin: Origin
    form: Form
    level: number
    rank: Rank
    role: Role
    keywords: string
}

type StatblockStats = {
    ac: number
    hp: number
    init: number
    perception: number
    stealth: number
    atk: number
    dc: number
    dmg: number
    prof: number
    cr: string
    xp: number
}

type StatblockAbilities = {
    strMod: number | null
    strDef: number | null
    dexMod: number | null
    dexDef: number | null
    conMod: number | null
    conDef: number | null
    intMod: number | null
    intDef: number | null
    wisMod: number | null
    wisDef: number | null
    chaMod: number | null
    chaDef: number | null
}

type StatblockStatsAutres = {
    movement: string
    skills: string
    dThreshold: string
    vulnerable: string
    resistant: string
    dImmune: string
    cImmune: string
    senses: string
    languages: string
}

class Statblock {
    type: StatblockType|null
    header: StatblockHeader|null
    stats: StatblockStats|null
    abilities: StatblockAbilities|null
    statsAutres: StatblockStatsAutres|null
    features: Feature[]

    constructor (){
        this.type = null
        this.header = null
        this.stats = null
        this.abilities = null
        this.statsAutres = null
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
            statblock.appendChild(this.CreateStats())
            statblock.appendChild(this.CreateAbilities())
            statblock.appendChild(this.CreateOtherStats())
            statblock.appendChild(this.CreateFeatures())
            destination.appendChild(statblock)
        }
    }

    private CreateHeader() : Element {
        const conteneur = this.CreateDivWithClass("header")

        if(this.header != undefined){
            const top = this.CreateDivWithClass("header-top")

            const top1 = this.CreateDivWithClass("identification")
            const top11 = this.CreateDivWithClass("name titletext")
            top11.textContent = this.header.name
            const top12 = this.CreateDivWithClass("desc")
            top12.textContent = 
                Size[Number(this.header.size)] + ' ' 
                + Origin[Number(this.header.origin)] + ' ' 
                + Form[Number(this.header.form)]
            if(this.header.keywords != "") {
                top12.textContent += " (" + this.header.keywords + ")"
            }
            top1.appendChild(top11)
            top1.appendChild(top12)
            top.appendChild(top1)

            const top2 = this.CreateDivWithClass("icons")
            const top21 = this.CreateDivWithClass("titletext")
            top21.textContent = "L" + this.header.level
            top21.appendChild(this.CreateIconFor(Role[Number(this.header.role)].toLowerCase()))
            top2.appendChild(top21)
            const top22 = this.CreateDivWithClass("stars")
            top22.appendChild(this.CreateIconFor("star-filled"))

            switch (this.header.rank) {
                case Rank.Minion:
                    top22.appendChild(this.CreateIconFor("star-empty"))
                    top22.appendChild(this.CreateIconFor("star-empty"))
                    top22.appendChild(this.CreateIconFor("star-empty"))
                    break;
                case Rank.Grunt:
                    top22.appendChild(this.CreateIconFor("star-filled"))
                    top22.appendChild(this.CreateIconFor("star-empty"))
                    top22.appendChild(this.CreateIconFor("star-empty"))
                    break;
                case Rank.Elite:
                    top22.appendChild(this.CreateIconFor("star-filled"))
                    top22.appendChild(this.CreateIconFor("star-filled"))
                    top22.appendChild(this.CreateIconFor("star-empty"))
                    break;
                default:
                    top22.appendChild(this.CreateIconFor("star-filled"))
                    top22.appendChild(this.CreateIconFor("star-filled"))
                    top22.appendChild(this.CreateIconFor("star-filled"))
                    break;
            }
            top2.appendChild(top22)
            top.appendChild(top2)
            conteneur.appendChild(top)
            
            const keywords = this.CreateDivWithClass("keywords")
            const keywords1 = document.createElement("div")
            keywords1.textContent = "Level " + this.header.level
            keywords.appendChild(keywords1)
            const keywords2 = document.createElement("div")
            keywords2.textContent = Rank[this.header.rank]
            keywords.appendChild(keywords2)

            const keywords3 = document.createElement("div")
            keywords3.textContent = Role[this.header.role]
            keywords.appendChild(keywords3)

            conteneur.appendChild(keywords)
        }

        return conteneur
    }

    private CreateStats() : Element {
        const statblock = this.CreateDivWithClass("stats") 
        const col1 = this.CreateDivWithClass("col1") 
        const col2 = this.CreateDivWithClass("col2") 

        if(this.stats != undefined){
            col1.appendChild(this.CreateLineStat("ac","ac",this.stats.ac))
            col1.appendChild(this.CreateLineStat("hp","hp",this.stats.hp))
            col1.appendChild(this.CreateLineStat("init","initiative", showPlusMinus(this.stats.init)))
            col1.appendChild(this.CreateLineStat("perception","Passive Perc.",this.stats.perception))
            col1.appendChild(this.CreateLineStat("stealth","Passive Stealth",this.stats.stealth))

            col2.appendChild(this.CreateLineStat("atk","Atk Bonus", showPlusMinus(this.stats.atk)))
            col2.appendChild(this.CreateLineStat("dcs","Atk DC", showPlusMinus(this.stats.dc)))
            col2.appendChild(this.CreateLineStat("dmg","Damage",this.stats.dmg))
            col2.appendChild(this.CreateLineStat("prof","Proficiency", showPlusMinus(this.stats.prof)))
            col2.appendChild(this.CreateLineStat("cr","CR", this.stats.cr + " (" + this.stats.xp + " XP)"))
        }

        statblock.appendChild(col1)
        statblock.appendChild(col2)
        return statblock
    }

    private CreateAbilities() : Element {
        const statblock = this.CreateDivWithClass("attributes") 
        if(this.abilities != null){
            statblock.appendChild(this.CreateLineAttr("str", this.abilities.strMod))
            statblock.appendChild(this.CreateLineAttr("dex", this.abilities.dexMod))
            statblock.appendChild(this.CreateLineAttr("con", this.abilities.conMod))
            statblock.appendChild(this.CreateLineAttr("int", this.abilities.intMod))
            statblock.appendChild(this.CreateLineAttr("wis", this.abilities.wisMod))
            statblock.appendChild(this.CreateLineAttr("cha", this.abilities.chaMod))
        }

        return statblock
    }

    private CreateOtherStats() : Element {
        const autres = this.CreateDivWithClass("autres") 
        const abil = this.abilities
        if(abil.strMod != abil.strDef || 
            abil.dexMod != abil.dexDef ||
            abil.conMod != abil.conDef ||
            abil.intMod != abil.intDef ||
            abil.wisMod != abil.wisDef ||
            abil.chaMod != abil.chaDef ) {
                autres.appendChild(this.CreateLineStatAutre(
                    "save", "Saves", this.GenererValeurSaves()))
            }


        if(this.statsAutres != null){
            if(this.statsAutres.movement) autres.appendChild(this.CreateLineStatAutre(
                "speed", "Speed", this.statsAutres.movement))
            if(this.statsAutres.skills) autres.appendChild(this.CreateLineStatAutre(
                "skill", "Skills", this.statsAutres.skills))
            if(this.statsAutres.dThreshold) autres.appendChild(this.CreateLineStatAutre(
                "threshold", "Damage threshold", this.statsAutres.dThreshold))
            if(this.statsAutres.vulnerable) autres.appendChild(this.CreateLineStatAutre(
                "vulnerable", "Vulnerable", this.statsAutres.vulnerable))
            if(this.statsAutres.resistant) autres.appendChild(this.CreateLineStatAutre(
                "resist", "Resistant", this.statsAutres.resistant))
            if(this.statsAutres.dImmune) autres.appendChild(this.CreateLineStatAutre(
                "immunity", "D. Immune", this.statsAutres.dImmune))
            if(this.statsAutres.cImmune) autres.appendChild(this.CreateLineStatAutre(
                "immunity", "C. Immune", this.statsAutres.cImmune))
            if(this.statsAutres.senses) autres.appendChild(this.CreateLineStatAutre(
                "senses", "Senses", this.statsAutres.senses))
            if(this.statsAutres.languages) autres.appendChild(this.CreateLineStatAutre(
                "language", "Languages", this.statsAutres.languages))
        }

        return autres
    }

    private CreateFeatures() : Element {
        const traits = this.CreateDivWithClass("traits") 
        if(this.statsAutres != null){

            getAllEnumValues(FeatureType).forEach(type => {
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

    private CreateLineStat(forWhat: string, label: string, value: string|number) : Element {
        let element = this.CreateDivWithClass("item")
        let name = this.CreateDivWithClass("name")
        name.appendChild(this.CreateIconFor(forWhat))
        name.innerHTML += label
        let contenu = document.createElement("div")
        contenu.textContent = String(value)
        element.appendChild(name)
        element.appendChild(contenu)
        return element
    }

    private CreateLineStatAutre(forWhat: string, label: string, value: string|number) : Element {
        let element = this.CreateDivWithClass("item")
        let name = document.createElement("span")
        name.className = "name"
        name.appendChild(this.CreateIconFor(forWhat))
        name.innerHTML += label
        element.appendChild(name)
        element.innerHTML += endsWithDot(String(value))
        return element
    }

    private CreateLineAttr(ability: string, statMod: number | null): Element {
        const attribute = document.createElement("div")
        const score = document.createElement("div")
        const mod = document.createElement("div")

        score.textContent = ability
        mod.innerHTML = this.ShowAbilityScore(statMod)

        attribute.appendChild(score)
        attribute.appendChild(mod)

        return attribute
    }

    private CreateFeatureSection(name: string): Element {
        const section = this.CreateDivWithClass("section")
        const contenu = document.createElement("div")
        contenu.textContent = name
        section.appendChild(contenu)
        return section
    }

    private CreateFeature(feature: Feature): Element{
        const item = this.CreateDivWithClass("item")
        const name = this.CreateDivWithClass("name " + FeatureRarity[feature.rarity].toLowerCase())
        name.textContent += feature.name
        if(feature.particularity != ""){
            const partic = this.CreateDivWithClass("special")
            partic.textContent = feature.particularity
            name.appendChild(partic)
        }
        item.appendChild(name)
        item.innerHTML += feature.description

        return item
    }

    private ShowAbilityScore(ability:number|null) : string {
        if(ability === null){
            return "0"
        }
        else {
            const score = Math.max(1, (ability + 5 ) * 2)
            return `${score}&nbsp;(${showPlusMinus(ability)})` 
        }
    }

    private GenererValeurSaves(): string {
        let saves: string[] = Array()
        const abi = this.abilities

        if(abi.strMod != abi.strDef) saves.push("Str&nbsp;" + showPlusMinus(abi.strDef))
        if(abi.dexMod != abi.dexDef) saves.push("Dex&nbsp;" + showPlusMinus(abi.dexDef))
        if(abi.conMod != abi.conDef) saves.push("Con&nbsp;" + showPlusMinus(abi.conDef))
        if(abi.intMod != abi.intDef) saves.push("Int&nbsp;" + showPlusMinus(abi.intDef))
        if(abi.wisMod != abi.wisDef) saves.push("Wis&nbsp;" + showPlusMinus(abi.wisDef))
        if(abi.chaMod != abi.chaDef) saves.push("Cha&nbsp;" + showPlusMinus(abi.chaDef))

        return saves.join(", ")
    }
}

class StatBlockWithPath extends Statblock{
    path: string
}
