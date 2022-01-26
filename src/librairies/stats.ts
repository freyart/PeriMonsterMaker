function getAbilityModFromScore(ability:number) : number|null {
    if(ability === 0) return null
    return Math.floor(ability / 2) - 5
}

function getAbilityScoreFromMod(mod:number|null) : number {
    if(mod === null || mod < -5) return 0
    return Math.floor(mod * 2) + 10
}