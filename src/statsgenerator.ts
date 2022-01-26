
class MonsterInput {
    level: number
    rank: Rank
    role: Role
    abilityOrder: AbilityAttr[]
    abilitiiesOverrides: number[]
    baseSpeed: number

    constructor( level:number, rank:Rank, role:Role, abilityOrder:AbilityAttr[], abilitiesOverrides:number[], speed:number = 30){
        this.level= level
        this.rank = rank
        this.role = role
        this.abilityOrder = abilityOrder
        this.baseSpeed = speed
        this.abilitiiesOverrides = abilitiesOverrides
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
    strScore: number
    strSaveMod: number
    dexScore: number
    dexSaveMod: number
    conScore: number
    conSaveMod: number
    intScore: number
    intSaveMod: number
    wisScore: number
    wisSaveMod: number
    chaScore: number
    chaSaveMod: number

    constructor(){

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
        output.hp = Math.round(baseStats.baseHp * role.hpMult * rank.hpMult)
        
        output.atkBonus = baseStats.atkMod + role.atkMod
        output.dcBonus = baseStats.dcMod + role.dcMod
        output.speed = input.baseSpeed??30 + role.speedMod
        output.prof = baseStats.prof
        output.dmg = Math.round(baseStats.baseDmg * rank.dmgMult * role.dmgMult)
        
        this.getAbilityModifiers(input, output)
        
        output.initMod = getAbilityModFromScore(input.abilitiiesOverrides[1] ?? output.dexScore) ?? 0
        output.passiveStealth = 10 + getAbilityModFromScore(input.abilitiiesOverrides[1] ?? output.dexScore) ?? 0
        output.passivePercept = 10 + getAbilityModFromScore(input.abilitiiesOverrides[4] ?? output.wisScore) ?? 0

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
        input.abilityOrder.forEach( (value, index) => {
            const values = this.attribuerAbilities(input.level, input.rank, input.role, <AbilityAttr>value)
            switch (index) {
                case 0:
                    output.strScore = values.abilityScore
                    output.strSaveMod = values.save
                    break;
                case 1:
                    output.dexScore = values.abilityScore
                    output.dexSaveMod = values.save
                    break;
                case 2:
                    output.conScore = values.abilityScore
                    output.conSaveMod = values.save
                    break;
                case 3:
                    output.intScore = values.abilityScore
                    output.intSaveMod = values.save
                    break;
                case 4:
                    output.wisScore = values.abilityScore
                    output.wisSaveMod = values.save
                    break;
                case 5:
                    output.chaScore = values.abilityScore
                    output.chaSaveMod = values.save
                    break;
            }
        })
    }

    private attribuerAbilities(level: number, rank: Rank, role: Role, abilityValue: AbilityAttr):{abilityScore: number, save: number} {
        const baseStats = this.getStats(level)
        let mod, save, prof: number

        switch (abilityValue) {
            case AbilityAttr.High:
                mod = baseStats.abilityMods.high
                prof = baseStats.prof
                break;
            case AbilityAttr.Med:
                mod = baseStats.abilityMods.med
                prof = baseStats.halfProf
                break;       
            default:
                mod = baseStats.abilityMods.low
                prof = 0
                break;
        }

        mod = mod + this.getRank(rank).attrMod
        save = 0 + this.getRole(role).saveMod + prof
        
        return {abilityScore: getAbilityScoreFromMod(mod), save: save}
    }
}
