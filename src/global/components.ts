type Feature = {
    name: string
    type: FeatureType
    rarity: FeatureRarity
    particularity: string
    description: string
}

type HighMidLow = {
    high: number
    mid: number
    low: number
}

class RoleLine {
    readonly role: Role
    readonly initBonus: boolean
    readonly speedMod: number
    readonly acMod: number
    readonly hpMult: number
    readonly tSaves: number
    readonly dmgMult: number
    readonly trainedPerception: boolean
    readonly trainedStealth: boolean

    constructor(role: Role, init: boolean, speedMod: number, acMod: number, hpMult: number, tSaves: number, dmgMult: number, percept: boolean, stealth: boolean) {
        this.role = role
        this.initBonus = init
        this.speedMod = speedMod
        this.acMod = acMod
        this.hpMult = hpMult
        this.tSaves = tSaves
        this.dmgMult = dmgMult
        this.trainedPerception = percept
        this.trainedStealth = stealth
    }
}

class RankLine {
    readonly rank: Rank
    readonly hpMult: number
    readonly acMod: number
    readonly attrMod: number
    readonly initBonus: boolean
    readonly dmgMult: number
    readonly xpMult: number
    readonly tSaves: number

    constructor(rank: Rank, hpMult: number, acMod: number, attrMod: number, trainedInit: boolean, dmgMult: number, xpMult: number, tSaves: number) {
        this.rank = rank

        this.acMod = acMod
        this.hpMult = hpMult
        this.tSaves = tSaves
        this.initBonus = trainedInit

        this.attrMod = attrMod
        this.dmgMult = dmgMult
        this.xpMult = xpMult
    }
}

class StatLine {
    readonly level: number
    readonly abilityMods: HighMidLow
    readonly xp: number

    constructor(level: number, xp: number) {
        this.level = level
        this.xp = xp
        if(level < 8){
            this.abilityMods = {low: Math.floor(level/12) - 1, mid: Math.floor(level/8) + 1, high: Math.floor(level/4) + 3}
        }
        else {
            this.abilityMods = {low: Math.floor(level/12) - 1, mid: Math.floor(level/8) + 1, high: Math.floor((level-8)/8) + 5}
        }
    }
}

class XpLine {
    xp: number
    cr: string
    constructor(xp: number, cr: string) {
        this.xp = xp
        this.cr = cr
    }
}

class ExperienceToChallengeRating {
    readonly challengeTable: XpLine[]

    constructor() {
        this.challengeTable = new Array()
        this.challengeTable.push(new XpLine(0, "0"))
        this.challengeTable.push(new XpLine(25, "1/8"))
        this.challengeTable.push(new XpLine(50, "1/4"))
        this.challengeTable.push(new XpLine(100, "1/2"))
        this.challengeTable.push(new XpLine(200, "1"))
        this.challengeTable.push(new XpLine(450, "2"))
        this.challengeTable.push(new XpLine(700, "3"))
        this.challengeTable.push(new XpLine(1100, "4"))
        this.challengeTable.push(new XpLine(1800, "5"))
        this.challengeTable.push(new XpLine(2300, "6"))
        this.challengeTable.push(new XpLine(2900, "7"))
        this.challengeTable.push(new XpLine(3900, "8"))
        this.challengeTable.push(new XpLine(5000, "9"))
        this.challengeTable.push(new XpLine(5900, "10"))
        this.challengeTable.push(new XpLine(7200, "11"))
        this.challengeTable.push(new XpLine(8400, "12"))
        this.challengeTable.push(new XpLine(10000, "13"))
        this.challengeTable.push(new XpLine(11500, "14"))
        this.challengeTable.push(new XpLine(13000, "15"))
        this.challengeTable.push(new XpLine(15000, "16"))
        this.challengeTable.push(new XpLine(18000, "17"))
        this.challengeTable.push(new XpLine(20000, "18"))
        this.challengeTable.push(new XpLine(22000, "19"))
        this.challengeTable.push(new XpLine(25000, "20"))
        this.challengeTable.push(new XpLine(30000, "21"))
        this.challengeTable.push(new XpLine(41000, "22"))
        this.challengeTable.push(new XpLine(50000, "23"))
        this.challengeTable.push(new XpLine(62000, "24"))
        this.challengeTable.push(new XpLine(75000, "25"))
        this.challengeTable.push(new XpLine(90000, "26"))
        this.challengeTable.push(new XpLine(105000, "27"))
        this.challengeTable.push(new XpLine(120000, "28"))
        this.challengeTable.push(new XpLine(135000, "29"))
        this.challengeTable.push(new XpLine(155000, "30"))
    }

    public getCrFromXp(xp:number) : string {
        const index = this.challengeTable.findIndex(function (value:XpLine) {
            if (value.xp > xp) return true
        })
        return this.challengeTable[index-1].cr
    }
}

function DamageCalculator(avgDamage: number, dice: DiceType, maxDices: number|null, maxStaticBonus: number|null) : DamageResult{
    const avg = Math.max(Math.round(avgDamage), 0)
    const nbDices = Math.min(Math.floor(avg/AvgDamageForDice(dice)), Math.max(maxDices??10, 0))
    const damBonus = Math.min(avg - Math.floor(nbDices*AvgDamageForDice(dice)), Math.max(maxStaticBonus??20, 0))
    let formula: string = ""
    if(Math.round(AvgDamageForDice(dice) * nbDices + damBonus) < avg) {
        formula = `! ${Math.round(AvgDamageForDice(dice) * nbDices + damBonus)} (${nbDices}d${dice} + ${damBonus})`
    }
    else {
        formula = `${avg} (${nbDices}d${dice} + ${damBonus})`
    }
    const range = `${nbDices+damBonus}-${(nbDices*dice)+damBonus}`
    return {formula, range}
}

type DamageResult = {
    formula: string
    range: string
}

function AvgDamageForDice(diceSize: DiceType) : number{
    return (diceSize/2)+0.5
}

type TextNumberPair = {
    text: string
    value: number
}