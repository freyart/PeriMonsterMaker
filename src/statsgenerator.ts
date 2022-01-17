
class MonsterInput {
    level: number
    rank: Rank
    role: Role
    abilityOrder: string[]
    baseSpeed: number

    constructor( level:number, rank:Rank, role:Role, abilityOrder:string[], speed:number = 30){
        this.level= level
        this.rank = rank
        this.role = role
        this.abilityOrder = abilityOrder
        this.baseSpeed = speed
    }
}

class MonsterOutput {
    ac: number | undefined
    hp: number | undefined
    initMod: number | undefined
    passivePercept: number | undefined
    passiveStealth: number | undefined
    speed: number | undefined
    atkBonus: number | undefined
    dcBonus: number | undefined
    dmg: number | undefined
    prof: number | undefined
    cr: string | undefined
    xp: number | undefined
    strMod: number | null
    strSave: number | null
    dexMod: number | null
    dexSave: number | null
    conMod: number | null
    conSave: number | null
    intMod: number | null
    intSave: number | null
    wisMod: number | null
    wisSave: number | null
    chaMod: number | null
    chaSave: number | null

    constructor(){
        this.strMod = null
        this.strSave = null
        this.dexMod = null
        this.dexSave = null
        this.conMod = null
        this.conSave = null
        this.intMod = null
        this.intSave = null
        this.wisMod = null
        this.wisSave = null
        this.chaMod = null
        this.chaSave = null       
    }
}

class StatsGenerator {
    readonly stats: StatLine[]
    readonly ranks: RankLine[]
    readonly roles: RoleLine[]

    constructor() {
        this.stats = new Array()
        this.stats.push(new StatLine(0, 10, 16, 1, 9,   1, 1, {high:3,med:1,low:0}, 25))
        this.stats.push(new StatLine(1, 11, 22, 2, 10,  2, 2, {high:3,med:1,low:0}, 50))
        this.stats.push(new StatLine(2, 12, 28, 2, 10,  4, 2, {high:3,med:1,low:0}, 112.5))
        this.stats.push(new StatLine(3, 12, 34, 2, 10,  8, 2, {high:3,med:1,low:0}, 175))
        this.stats.push(new StatLine(4, 12, 40, 2, 10, 10, 2, {high:4,med:1,low:0}, 275))
        this.stats.push(new StatLine(5, 13, 48, 3, 11, 13, 3, {high:4,med:1,low:0}, 450))
        this.stats.push(new StatLine(6, 14, 57, 3, 11, 15, 3, {high:4,med:2,low:0}, 575))
        this.stats.push(new StatLine(7, 14, 66, 3, 11, 18, 3, {high:4,med:2,low:0}, 725))
        this.stats.push(new StatLine(8, 14, 75, 3, 11, 20, 3, {high:5,med:2,low:0}, 975))
        this.stats.push(new StatLine(9, 15, 83, 4, 12, 25, 4, {high:5,med:2,low:0}, 1250))
        this.stats.push(new StatLine(10,15, 92, 4, 12, 28, 4, {high:5,med:2,low:0}, 1475))
        this.stats.push(new StatLine(11,15, 98, 4, 12, 31, 4, {high:5,med:2,low:0}, 1800))
        this.stats.push(new StatLine(12,16,104, 4, 12, 34, 4, {high:5,med:3,low:1}, 2100))
        this.stats.push(new StatLine(13,17,111, 5, 13, 37, 5, {high:5,med:3,low:1}, 2500))
        this.stats.push(new StatLine(14,17,117, 5, 13, 39, 5, {high:5,med:3,low:1}, 2875))
        this.stats.push(new StatLine(15,17,124, 5, 13, 47, 5, {high:5,med:3,low:1}, 3250))
        this.stats.push(new StatLine(16,17,130, 5, 13, 50, 5, {high:6,med:3,low:1}, 3750))
        this.stats.push(new StatLine(17,18,137, 6, 14, 53, 6, {high:6,med:3,low:1}, 4500))
        this.stats.push(new StatLine(18,18,144, 6, 14, 56, 6, {high:6,med:4,low:1}, 5000))
        this.stats.push(new StatLine(19,18,151, 6, 14, 59, 6, {high:6,med:4,low:1}, 5500))
        this.stats.push(new StatLine(20,19,158, 6, 14, 63, 6, {high:6,med:4,low:1}, 6250))
        this.stats.push(new StatLine(21,20,165, 7, 15, 72, 7, {high:6,med:4,low:1}, 8250))
        this.stats.push(new StatLine(22,20,172, 7, 15, 76, 7, {high:6,med:4,low:1}, 10250))
        this.stats.push(new StatLine(23,20,180, 7, 15, 79, 7, {high:6,med:4,low:1}, 12500))
        this.stats.push(new StatLine(24,20,187, 7, 15, 83, 7, {high:7,med:5,low:2}, 15500))

        this.ranks = new Array()
        this.ranks.push(new RankLine(Rank.Minion, 0.2, -1, -1, TrainedValue.Untrained, 0.75, 0.25))
        this.ranks.push(new RankLine(Rank.Grunt, 1, 0, 0, TrainedValue.Untrained, 1, 1))
        this.ranks.push(new RankLine(Rank.Elite, 2, 1, 1, TrainedValue.Half, 1.1, 2))
        this.ranks.push(new RankLine(Rank["Paragon vs. 3"], 3, 2, 2, TrainedValue.Trained, 1.2, 3))
        this.ranks.push(new RankLine(Rank["Paragon vs. 4"], 4, 2, 2, TrainedValue.Trained, 1.2, 4))
        this.ranks.push(new RankLine(Rank["Paragon vs. 5"], 5, 2, 2, TrainedValue.Trained, 1.2, 5))
        this.ranks.push(new RankLine(Rank["Paragon vs. 6"], 6, 2, 2, TrainedValue.Trained, 1.2, 6))
        this.ranks.push(new RankLine(Rank["Paragon vs. 7"], 7, 2, 2, TrainedValue.Trained, 1.2, 7))

        this.roles = new Array()
        this.roles.push(new RoleLine(Role.Controller, 2, 1, 1, -1, -1, 0.5, true, 0, false, false))
        this.roles.push(new RoleLine(Role.Defender, 4, 0.75, 2, 0, 0, 0.5, false, -5, false, false))
        this.roles.push(new RoleLine(Role.Lurker, -4, 0.75, -2, +2, +1, 1.25, false, 5, false, true))
        this.roles.push(new RoleLine(Role.Scout, -2, 1, -1, -1, -1, 0.75, false, 10, true, true))
        this.roles.push(new RoleLine(Role.Striker, 0, 1, 0, 0, 0, 1, false, 0, false, false))
        this.roles.push(new RoleLine(Role.Supporter, -1, 1.25, -1, -1, -1, 0.75, true, 0, true, false))
    }

    getMonsterStats(input: MonsterInput): MonsterOutput {
        let output = new MonsterOutput()

        const baseStats = this.getStats(input.level)
        const role = this.getRole(input.role)
        const rank = this.getRank(input.rank)
        
        output.ac = baseStats.baseAc + role.acMod + rank.acMod
        output.hp = Math.floor(baseStats.baseHp * role.hpMult * rank.hpMult)
        
        output.atkBonus = baseStats.atkMod + role.atkMod
        output.dcBonus = baseStats.dcMod + role.dcMod
        output.speed = input.baseSpeed??30 + role.speedMod
        output.prof = baseStats.prof
        output.dmg = Math.round(baseStats.baseDmg * rank.dmgMult * role.dmgMult)
        
        this.getAbilityModifiers(input, output)
        
        output.initMod = output.dexMod ?? 0
        output.passiveStealth = 10 + (output.dexMod ?? 0)
        output.passivePercept = 10 + (output.wisMod ?? 0)

        if(this.getRole(input.role).trainedInit)
            output.initMod += baseStats.prof
        
        if(this.getRank(input.rank).initMod == TrainedValue.Trained)
        {
            output.initMod += baseStats.prof
        }
        else if(this.getRank(input.rank).initMod == TrainedValue.Half){
            output.initMod += baseStats.halfProf
        }

        if(this.getRole(input.role).trainedStealth) 
            output.passiveStealth += baseStats.prof

        if(this.getRole(input.role).trainedPerception)
            output.passivePercept += baseStats.prof

        
        let xpTable = new ExperienceToChallengeRating()
        output.xp = Math.floor(baseStats.xp * rank.xpMult)
        output.cr = xpTable.getCrFromXp(output.xp)

        return output
    }

    getAttributeOrder(str: number, dex: number, con: number, int: number, wis: number, cha: number): string[] {
        const characteristics: TextNumberPair[] = new Array
        characteristics.push({"text":"str", "value":str})
        characteristics.push({"text":"dex", "value":dex})
        characteristics.push({"text":"con", "value":con})
        characteristics.push({"text":"int", "value":int})
        characteristics.push({"text":"wis", "value":wis})
        characteristics.push({"text":"cha", "value":cha})

        characteristics.sort((attr1, attr2) => {
            return attr2.value - attr1.value
        })

        return Array.from(characteristics.map(x => x.text))
    }

    private getStats(lvl: number): StatLine {
        let i = this.stats.findIndex((line) => {
                if (line.level == lvl)
                    return true
            })
        return this.stats[i]
    }

    private getRank(rank: Rank): RankLine {
        let i = this.ranks.findIndex((line) => {
                if (line.rank == rank)
                    return true
            })
        return this.ranks[i]
    }

    private getRole(role: Role): RoleLine {
        let i = this.roles.findIndex((line) => {
                if (line.role == role)
                    return true
            })
        return this.roles[i]
    }

    private getAbilityModifiers(input:MonsterInput, output:MonsterOutput):void{
        output.strMod = null
        output.strSave = null
        output.dexMod = null
        output.dexSave = null
        output.conMod = null
        output.conSave = null
        output.intMod = null
        output.intSave = null
        output.wisMod = null
        output.wisSave = null
        output.chaMod = null
        output.chaSave = null

        input.abilityOrder.forEach( (value, index) => {
            this.attribuerAbilityMod(input.level, input.rank, input.role, output, <Ability>value, index)
        })
        
    }

    private getSaveModifier(level: number, saveType: TrainedValue): number{
        const profBonus = this.getStats(level).prof
        if(saveType == TrainedValue.Trained) {
            return profBonus
        }
        else if (saveType === TrainedValue.Half){
            return Math.floor(this.getStats(level).prof)
        }
        else {
            return 0
        }
    }

    private attribuerAbilityMod(level: number, rank: Rank, role: Role, output:MonsterOutput, ability:Ability, index: number):void {
        const baseStats = this.getStats(level)
        switch (ability) {
            case Ability.Strength:
                output.strMod = this.getAbilityModFromOrder(baseStats.abilityMods, index) + this.getRank(rank).attrMod
                output.strSave = output.strMod + this.getRole(role).saveMod + this.getProfBonusFromOrder(level, index)
                break;
            case Ability.Dexterity:
                output.dexMod = this.getAbilityModFromOrder(baseStats.abilityMods, index) + this.getRank(rank).attrMod
                output.dexSave = output.dexMod + this.getRole(role).saveMod + this.getProfBonusFromOrder(level, index)
                break;
            case Ability.Constitution:
                output.conMod = this.getAbilityModFromOrder(baseStats.abilityMods, index) + this.getRank(rank).attrMod
                output.conSave = output.conMod + this.getRole(role).saveMod + this.getProfBonusFromOrder(level, index)
                break;
            case Ability.Intelligence:
                output.intMod = this.getAbilityModFromOrder(baseStats.abilityMods, index) + this.getRank(rank).attrMod
                output.intSave = output.intMod + this.getRole(role).saveMod + this.getProfBonusFromOrder(level, index)
                break;
            case Ability.Wisdom:
                output.wisMod = this.getAbilityModFromOrder(baseStats.abilityMods, index) + this.getRank(rank).attrMod
                output.wisSave = output.wisMod + this.getRole(role).saveMod + this.getProfBonusFromOrder(level, index)
                break;
            case Ability.Charisma:
                output.chaMod = this.getAbilityModFromOrder(baseStats.abilityMods, index) + this.getRank(rank).attrMod
                output.chaSave = output.chaMod + this.getRole(role).saveMod + this.getProfBonusFromOrder(level, index)
                break;       
           default:
               console.error("attribut inconnu");
               break;
       }
    }

    private getAbilityModFromOrder(abilityMods: HighMedLow, index: number) : number {
        if(index === 0)
            return abilityMods.high
        else if(index === 1 || index === 2)
            return abilityMods.med
        else
            return abilityMods.low
    }

    private getProfBonusFromOrder(level: number, index: number) : number {
        if(index === 0)
        return this.getStats(level).prof
    else if(index === 1 || index === 2)
        return this.getStats(level).halfProf
    else
        return 0
    }

}
