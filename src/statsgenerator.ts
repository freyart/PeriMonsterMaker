
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
    atk: number | undefined
    dcLow: number | undefined
    dcHigh: number | undefined
    dmg: number | undefined
    proficiency: number | undefined
    cr: string | undefined
    xp: number | undefined
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

    constructor(){
        this.strMod = null
        this.strDef = null
        this.dexMod = null
        this.dexDef = null
        this.conMod = null
        this.conDef = null
        this.intMod = null
        this.intDef = null
        this.wisMod = null
        this.wisDef = null
        this.chaMod = null
        this.chaDef = null       
    }
}

class StatsGenerator {
    readonly stats: StatLine[]
    readonly ranks: RankLine[]
    readonly roles: RoleLine[]

    constructor() {
        this.stats = new Array()
        this.stats.push(new StatLine(0, 12, 16, 2, 9,   1, 1, [3,2,1,1,0,-1], 25))
        this.stats.push(new StatLine(1, 12, 21, 3, 10,  2, 2, [3,2,1,1,0,-1], 50))
        this.stats.push(new StatLine(2, 12, 26, 3, 10,  4, 2, [3,2,1,1,0,-1], 112.5))
        this.stats.push(new StatLine(3, 12, 31, 3, 10,  5, 2, [3,2,1,1,0,-1], 175))
        this.stats.push(new StatLine(4, 13, 40, 4, 11,  8, 2, [4,3,2,1,0,-1], 275))
        this.stats.push(new StatLine(5, 14, 47, 5, 12, 10, 3, [4,3,2,1,0,-1], 450))
        this.stats.push(new StatLine(6, 14, 54, 5, 12, 12, 3, [4,3,2,1,0,-1], 575))
        this.stats.push(new StatLine(7, 14, 61, 5, 12, 14, 3, [4,3,2,1,0,-1], 725))
        this.stats.push(new StatLine(8, 15, 75, 6, 13, 18, 3, [5,4,2,1,1,-1], 975))
        this.stats.push(new StatLine(9, 16, 82, 7, 14, 20, 4, [5,4,2,1,1,0], 1250))
        this.stats.push(new StatLine(10,16, 90, 7, 14, 23, 4, [5,4,2,1,1,0], 1475))
        this.stats.push(new StatLine(11,16, 95, 7, 14, 25, 4, [5,4,2,1,1,0], 1800))
        this.stats.push(new StatLine(12,16,109, 8, 15, 30, 4, [6,5,3,2,1,0], 2100))
        this.stats.push(new StatLine(13,17,114, 9, 16, 33, 5, [6,5,3,2,1,0], 2500))
        this.stats.push(new StatLine(14,17,120, 9, 16, 35, 5, [6,5,3,2,1,0], 2875))
        this.stats.push(new StatLine(15,17,125, 9, 16, 38, 5, [6,5,3,2,1,0], 3250))
        this.stats.push(new StatLine(16,28,141,10, 16, 40, 5, [7,5,3,2,1,0], 3750))
        this.stats.push(new StatLine(17,19,147,11, 17, 43, 6, [7,5,3,2,1,0], 4500))
        this.stats.push(new StatLine(18,19,152,11, 17, 45, 6, [7,5,3,2,1,0], 5000))
        this.stats.push(new StatLine(19,19,158,11, 17, 48, 6, [7,5,3,2,1,0], 5500))
        this.stats.push(new StatLine(20,20,176,12, 18, 50, 6, [8,6,4,2,1,0], 6250))
        this.stats.push(new StatLine(21,20,182,13, 19, 53, 7, [8,6,4,2,1,0], 8250))
        this.stats.push(new StatLine(22,20,188,13, 19, 55, 7, [8,6,4,2,1,0], 10250))
        this.stats.push(new StatLine(23,20,195,13, 19, 58, 7, [8,6,4,2,1,0], 12500))
        this.stats.push(new StatLine(24,21,214,14, 20, 60, 7, [9,7,4,2,1,0], 15500))

        this.ranks = new Array()
        this.ranks.push(new RankLine(Rank.Minion, 0.2, -2, 0, false, 0.75, 0.25))
        this.ranks.push(new RankLine(Rank.Grunt, 1, 0, 0, false, 1, 1))
        this.ranks.push(new RankLine(Rank.Elite, 2, 1, 1, true, 1.1, 2))
        this.ranks.push(new RankLine(Rank["Paragon vs. 3"], 3, 2, 2, true, 1.2, 3))
        this.ranks.push(new RankLine(Rank["Paragon vs. 4"], 4, 2, 2, true, 1.2, 4))
        this.ranks.push(new RankLine(Rank["Paragon vs. 5"], 5, 2, 2, true, 1.2, 5))
        this.ranks.push(new RankLine(Rank["Paragon vs. 6"], 6, 2, 2, true, 1.2, 6))

        this.roles = new Array()
        this.roles.push(new RoleLine(Role.Controller, 2, 1, 1, 0, 0, 0.25, 0, false, false, true))
        this.roles.push(new RoleLine(Role.Defender, 4, 2, 0.75, 0, 0, 0.5, -5, false, false, false))
        this.roles.push(new RoleLine(Role.Lurker,-4, -2, 0.75, 2, 1, 1.25, 5, false, true, false))
        this.roles.push(new RoleLine(Role.Scout, -2, -1, 1, -1, -1, 0.75, 10, true, true, false))
        this.roles.push(new RoleLine(Role.Striker, 0, 0, 1, 0, 0, 1, 0, false, false, false))
        this.roles.push(new RoleLine(Role.Supporter, -1, -1, 1.25, -1, -1, 0.75, 0, true, false, true))
    }

    getMonsterStats(input: MonsterInput): MonsterOutput {
        let output = new MonsterOutput()

        const baseStats = this.getStats(input.level)
        const role = this.getRole(input.role)
        const rank = this.getRank(input.rank)
        
        output.ac = baseStats.ac + role.acMod + rank.acSavesMod
        output.atk = baseStats.atk + role.atkMod + rank.atkDcsMod
        output.hp = Math.floor(baseStats.hp * role.hpMult * rank.hpMult)
        output.speed = input.baseSpeed??30 + role.speedMod
        output.proficiency = baseStats.prof
        output.dcLow = baseStats.dcLow + role.dcMod + rank.atkDcsMod
        output.dcHigh = output.dcLow + 2
        output.dmg = Math.round(baseStats.minionDmg * role.dmgMult)

        this.getAbilityModifiers(input, output)

        output.initMod = output.dexMod ?? 0
        output.passiveStealth = 10 + (output.dexMod ?? 0)
        output.passivePercept = 10 + (output.wisMod ?? 0)

        if(this.getRole(input.role).trainedInit || this.getRank(input.rank).trainedInit)
            output.initMod += this.getStats(input.level).prof

        if(this.getRole(input.role).trainedStealth) 
            output.passiveStealth += this.getStats(input.level).prof

        if(this.getRole(input.role).trainedPerception)
            output.passivePercept += this.getStats(input.level).prof

        
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
        output.strDef = null
        output.dexMod = null
        output.dexDef = null
        output.conMod = null
        output.conDef = null
        output.intMod = null
        output.intDef = null
        output.wisMod = null
        output.wisDef = null
        output.chaMod = null
        output.chaDef = null

        input.abilityOrder.forEach( (value, index) => {
            this.attribuerAbilityMod(input.level, input.rank, input.role, output, <Ability>value, index)
        })
        
    }

    private getSaveModifier(level: number, saveType: TrainedValue): number{
        const profBonus = this.getStats(level).prof
        if(saveType == TrainedValue.Proficient) {
            return profBonus
        }
        else if (saveType === TrainedValue.Half){
            return Math.floor(this.getStats(level).prof)
        }
        else {
            return 0
        }
    }

    private attribuerAbilityMod(level: number, rank: Rank, role: Role, output:MonsterOutput, ability:Ability, order: number):void {

        let saveOrder = function (x:number):number {
            if (x === 0) return 0 
            else if (x < 3) return 1
            else return 2
        }

       switch (ability) {
            case Ability.Strength:
                output.strMod = this.getStats(level).abilityMods[order]
                output.strDef = this.getStats(level).saves[saveOrder(order)] + this.getRank(rank).acSavesMod + this.getRole(role).saveMod
                break;
            case Ability.Dexterity:
                output.dexMod = this.getStats(level).abilityMods[order]
                output.dexDef = this.getStats(level).saves[saveOrder(order)] + this.getRank(rank).acSavesMod + this.getRole(role).saveMod
                break;
            case Ability.Constitution:
                output.conMod = this.getStats(level).abilityMods[order]
                output.conDef = this.getStats(level).saves[saveOrder(order)] + this.getRank(rank).acSavesMod + this.getRole(role).saveMod
                break;
            case Ability.Intelligence:
                output.intMod = this.getStats(level).abilityMods[order]
                output.intDef = this.getStats(level).saves[saveOrder(order)] + this.getRank(rank).acSavesMod + this.getRole(role).saveMod
                break;
            case Ability.Wisdom:
                output.wisMod = this.getStats(level).abilityMods[order]
                output.wisDef = this.getStats(level).saves[saveOrder(order)] + this.getRank(rank).acSavesMod + this.getRole(role).saveMod
                break;
            case Ability.Charisma:
                output.chaMod = this.getStats(level).abilityMods[order]
                output.chaDef = this.getStats(level).saves[saveOrder(order)] + this.getRank(rank).acSavesMod + this.getRole(role).saveMod
                break;       
           default:
               console.error("attribut inconnu");
               break;
       }
    }

}
