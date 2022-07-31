
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
    speed: number | undefined
    tSaves: number | undefined
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
        this.stats.push(new StatLine(0, 25))
        this.stats.push(new StatLine(1, 50))
        this.stats.push(new StatLine(2, 112.5))
        this.stats.push(new StatLine(3, 175))
        this.stats.push(new StatLine(4, 275))
        this.stats.push(new StatLine(5, 450))
        this.stats.push(new StatLine(6, 575))
        this.stats.push(new StatLine(7, 725))
        this.stats.push(new StatLine(8, 975))
        this.stats.push(new StatLine(9, 1250))
        this.stats.push(new StatLine(10, 1475))
        this.stats.push(new StatLine(11, 1800))
        this.stats.push(new StatLine(12, 2100))
        this.stats.push(new StatLine(13, 2500))
        this.stats.push(new StatLine(14, 2875))
        this.stats.push(new StatLine(15, 3250))
        this.stats.push(new StatLine(16, 3750))
        this.stats.push(new StatLine(17, 4500))
        this.stats.push(new StatLine(18, 5000))
        this.stats.push(new StatLine(19, 5500))
        this.stats.push(new StatLine(20, 6250))
        this.stats.push(new StatLine(21, 8250))
        this.stats.push(new StatLine(22, 10250))
        this.stats.push(new StatLine(23, 12500))
        this.stats.push(new StatLine(24, 15500))
        this.stats.push(new StatLine(25, 18750))
        this.stats.push(new StatLine(26, 22500))
        this.stats.push(new StatLine(27, 26250))
        this.stats.push(new StatLine(28, 30000))
        this.stats.push(new StatLine(29, 33750))
        this.stats.push(new StatLine(30, 38750))

        this.ranks = new Array()
        this.ranks.push(new RankLine(Rank.Minion, 0.2, 0, 0, false, 0.75, 0.25, 1))
        this.ranks.push(new RankLine(Rank.Grunt, 1, 0, 0, false, 1, 1, 2))
        this.ranks.push(new RankLine(Rank.Elite, 2, 1, 1, true, 1.1, 2, 3))
        this.ranks.push(new RankLine(Rank["Paragon T3"], 3, 2, 2, true, 1.2, 3, 3))
        this.ranks.push(new RankLine(Rank["Paragon T4"], 4, 2, 2, true, 1.2, 4, 3))
        this.ranks.push(new RankLine(Rank["Paragon T5"], 5, 2, 2, true, 1.2, 5, 3))
        this.ranks.push(new RankLine(Rank["Paragon T6"], 6, 2, 2, true, 1.2, 6, 3))
        this.ranks.push(new RankLine(Rank["Paragon T7"], 7, 2, 2, true, 1.2, 7, 3))

        this.roles = new Array()
        this.roles.push(new RoleLine(Role.Controller, true, 0, 2, 1, 0, 0.75, false, false))
        this.roles.push(new RoleLine(Role.Defender, false, -5, 4, 0.75, 1, 0.75, false, false ))
        this.roles.push(new RoleLine(Role.Lurker, false, 0, -4, 0.75, -1, 1.25, false, true))
        this.roles.push(new RoleLine(Role.Skirmisher, false, 5, -2, 0.75, 0, 1, true, false ))
        this.roles.push(new RoleLine(Role.Striker, false, 0, 0, 1, 0, 1, false, false))
        this.roles.push(new RoleLine(Role.Supporter, true, 0, 0, 1.25, 0, 0.75, false, false))
    }

    getMonsterStats(input: MonsterInput): MonsterOutput {
        let output = new MonsterOutput()

        const baseStats = this.getStats(input.level)
        const role = this.getRole(input.role)
        const rank = this.getRank(input.rank)
        const lvl = input.level
        
        output.ac = 12 + Math.floor(lvl/4) + role.acMod + rank.acMod
        
        output.prof = 1 + Math.floor((lvl + 3) / 4)
        output.atkBonus = output.prof
        output.dcBonus = 8 + output.prof
        output.hp = Math.round((16 + lvl * 7) * role.hpMult * rank.hpMult)
        output.dmg = Math.max(1, Math.round((lvl * 3) * rank.dmgMult * role.dmgMult))
        output.tSaves = rank.tSaves + role.tSaves
        output.speed = input.baseSpeed??30 + role.speedMod
        
        this.getAbilityModifiers(input, output)
        
        output.initMod = getAbilityModFromScore(input.abilitiiesOverrides[1] ?? output.dexScore) ?? 0
        output.passivePercept = 10 + getAbilityModFromScore(input.abilitiiesOverrides[4] ?? output.wisScore) ?? 0

        if(this.getRole(input.role).initBonus)
            output.initMod += output.prof
        
        if(this.getRank(input.rank).initBonus)
            output.initMod += output.prof

        if(this.getRole(input.role).trainedPerception)
            output.passivePercept += output.prof

        
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
                break;
            case AbilityAttr.Mid:
                mod = baseStats.abilityMods.mid
                break;       
            default:
                mod = baseStats.abilityMods.low
                break;
        }

        mod = mod + this.getRank(rank).attrMod
        save = 0
        
        return {abilityScore: getAbilityScoreFromMod(mod), save: save}
    }
}
