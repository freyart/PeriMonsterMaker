
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
        this.stats.push(new StatLine(0, 14, 16, 2, 7,10, 1, 1,1, [4,2,0], [3,2,1,1,0,-1], 25))
        this.stats.push(new StatLine(1, 14, 26, 3, 8,11, 2, 2,2, [5,3,0], [3,2,1,1,0,-1], 50))
        this.stats.push(new StatLine(2, 14, 29, 3, 8,11, 4, 3,2, [5,3,0], [3,2,1,1,0,-1], 112.5))
        this.stats.push(new StatLine(3, 14, 33, 3, 8,11, 5, 4,2, [5,3,0], [3,2,1,1,0,-1], 175))
        this.stats.push(new StatLine(4, 15, 36, 4, 9,12, 8, 6,2, [6,3,1], [4,3,2,1,1,0], 275))
        this.stats.push(new StatLine(5, 16, 60, 5,10,13, 9, 7,3, [7,4,1], [4,3,2,1,1,0], 450))
        this.stats.push(new StatLine(6, 16, 64, 5,10,13,11, 8,3, [7,4,1], [4,3,2,1,1,0], 575))
        this.stats.push(new StatLine(7, 16, 68, 5,10,13,13,10,3, [7,4,1], [4,3,2,1,1,0], 725))
        this.stats.push(new StatLine(8, 17, 71, 6,11,14,17,12,3, [8,5,1], [5,3,2,2,1,0], 975))
        this.stats.push(new StatLine(9, 18,102, 7,12,15,19,14,4, [9,5,2], [5,3,2,2,1,0], 1250))
        this.stats.push(new StatLine(10,18,106, 7,12,15,21,15,4, [9,5,2], [5,3,2,2,1,0], 1475))
        this.stats.push(new StatLine(11,18,111, 7,12,15,24,17,4, [9,5,2], [5,3,2,2,1,0], 1800))
        this.stats.push(new StatLine(12,18,115, 8,12,15,28,21,4, [10,6,2], [6,4,3,2,1,0], 2100))
        this.stats.push(new StatLine(13,19,152, 9,13,16,30,22,5, [11,7,2], [6,4,3,2,1,0], 2500))
        this.stats.push(new StatLine(14,19,157, 9,13,16,32,24,5, [11,7,2], [6,4,3,2,1,0], 2875))
        this.stats.push(new StatLine(15,19,162, 9,13,16,34,26,5, [11,7,2], [6,4,3,2,1,0], 3250))
        this.stats.push(new StatLine(16,20,166,10,14,17,41,30,5, [12,7,3], [7,5,3,2,2,1], 3750))
        this.stats.push(new StatLine(17,21,210,11,15,18,43,32,6, [13,8,3], [7,5,3,2,2,1], 4500))
        this.stats.push(new StatLine(18,21,215,11,15,18,46,34,6, [13,8,3], [7,5,3,2,2,1], 5000))
        this.stats.push(new StatLine(19,21,221,11,15,18,48,36,6, [13,8,3], [7,5,3,2,2,1], 5500))
        this.stats.push(new StatLine(20,22,226,12,16,19,51,38,6, [14,9,3], [8,6,5,4,2,1], 6250))
        this.stats.push(new StatLine(21,22,276,13,17,20,53,40,7, [15,9,4], [8,6,5,4,2,1], 8250))
        this.stats.push(new StatLine(22,22,282,13,17,20,56,42,7, [15,9,4], [8,6,5,4,2,1], 10250))
        this.stats.push(new StatLine(23,22,288,13,17,20,58,44,7, [15,9,4], [8,6,5,4,2,1], 12500))
        this.stats.push(new StatLine(24,23,293,14,17,20,61,45,7, [16,10,4], [9,6,5,4,2,1], 15500))

        this.ranks = new Array()
        this.ranks.push(new RankLine(Rank.Minion, 0.2, -2, 0, false, 0.75, 0.25))
        this.ranks.push(new RankLine(Rank.Grunt, 1, 0, 0, false, 1, 1))
        this.ranks.push(new RankLine(Rank.Elite, 2, 2, 0, true, 1.1, 2))
        this.ranks.push(new RankLine(Rank["Paragon vs. 3"], 3, 2, 2, true, 1.2, 3))
        this.ranks.push(new RankLine(Rank["Paragon vs. 4"], 4, 2, 2, true, 1.2, 4))
        this.ranks.push(new RankLine(Rank["Paragon vs. 5"], 5, 2, 2, true, 1.2, 5))
        this.ranks.push(new RankLine(Rank["Paragon vs. 6"], 6, 2, 2, true, 1.2, 6))

        this.roles = new Array()
        this.roles.push(new RoleLine(Role.None, 0, 0, 1, 0, 0, 1, 0, false, false, false))
        this.roles.push(new RoleLine(Role.Controller, 2, 1, 1, 0, 0, 0.75, 0, false ,false ,true))
        this.roles.push(new RoleLine(Role.Defender, 4, 2, 0.75, 0, 0, 1, -5, false, false, false))
        this.roles.push(new RoleLine(Role.Lurker,-4, -2, 0.75, 3, 3, 1.5, 5, false, true, false))
        this.roles.push(new RoleLine(Role.Scout, 0, 0, 1, -1, -1, 0.75, 10, true, true, false))
        this.roles.push(new RoleLine(Role.Striker, -2, -1, 1.25, 2, 2, 1.25, 0, false, false, false))
        this.roles.push(new RoleLine(Role.Supporter, 0, 0, 1.5, -2, -2, 1, 0, false, false, true))
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
        output.dcHigh = baseStats.dcHigh + role.dcMod + rank.atkDcsMod
        output.dcLow = baseStats.dcLow + role.dcMod + rank.atkDcsMod
        
        if (<Rank>input.rank === Rank.Minion) {
            output.dmg = Math.round(baseStats.minionDmg * role.dmgMult)
        } else {
            output.dmg = Math.round(baseStats.dmg * role.dmgMult * rank.dmgMult)
        }

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
