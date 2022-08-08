let featureManager : FeatureManager
let statblockSortie : Statblock

function initMonsterMakerForm(){ 
    featureManager = new FeatureManager()
    statblockSortie = new Statblock()
    initAbilityScoresSelection()
    initSelectLists()
    infoPannelInit()
    updatePreview()
    featureManager.InitializeQuickTemplates()

    const inputAction = document.querySelectorAll("#name, #level, #rank, #role")
    inputAction.forEach(element => {
        element.addEventListener('change', () => {
            getStats()
       })
    });

    const inputUpdatingPreview = document.querySelectorAll("input, select, textarea")
    inputUpdatingPreview.forEach(element => {
        element.addEventListener('change', () => {
            updatePreview()
       })
    });
}

function resetStatblock() {
    if(window.confirm("All unsaved data will be lost.\n\nDo you want to continue ?")) {
        nav_EcranCreation.querySelectorAll("input").forEach(element => {
            element.value = ""
        });
        nav_EcranCreation.querySelectorAll("select.attr").forEach(element => {
            const select = <HTMLSelectElement>element
            select.value= ""
        })
        initAbilityScoresSelection()
        featureManager.RemoveAllFeatures()
        featureManager.AddFeatureLine()
        updatePreview()

    }
}

function exportJSON(){
    prepareMonster()
    statblockSortie.Export()
}

function importJSON(){
    if(window.confirm("All unsaved data will be lost.\n\nDo you want to continue ?")) { 
        let file = input_importJson.files[0]
        if(file != undefined) {
            const reader = new FileReader()
            reader.addEventListener('load', (event) => {
                let rawContent = String(event.target.result)
                let fileContent = Object.setPrototypeOf(JSON.parse(rawContent), Statblock.prototype)
                loadStatblock(fileContent)
            })
            reader.readAsText(file)
        }
    }
}

function loadStatblock(statblock: Statblock){
    input_name.value = statblock.header.name 
    input_level.value = String(statblock.header.level)
    input_rank.value = String(statblock.header.rank)
    input_role.value = String(statblock.header.role)
    input_type.value = statblock.type
    input_keywords.value = statblock.header.keywords
    input_other.value = statblock.header.other
    input_size.value = String(statblock.header.size)
    input_monstertype.value = String(statblock.header.monstertype)

    input_movement.value = statblock.stats.speed
    input_skills.value = statblock.stats.skills
    input_threshold.value = statblock.stats.dThreshold
    input_vulnerable.value = statblock.stats.vulnerable
    input_resistant.value = statblock.stats.resistant
    input_dImmune.value = statblock.stats.dImmune
    input_cImmune.value = statblock.stats.cImmune
    input_senses.value = statblock.stats.senses
    input_languages.value = statblock.stats.languages

    for (let i = 1; i <= 6; i++) {
        getInputById("attr"+i).value = String(statblock.abilities.abilityRanks[i-1])
    }

    //Importer ability Scores
    const monsterMaker = new StatsGenerator();
    getStats()

    //Importer ability overrides
    setValueIfNotEqual(input_str, statblock.abilities.strScore, input_str.placeholder)
    setValueIfNotEqual(input_dex, statblock.abilities.dexScore, input_dex.placeholder)
    setValueIfNotEqual(input_con, statblock.abilities.conScore, input_con.placeholder)
    setValueIfNotEqual(input_int, statblock.abilities.intScore, input_int.placeholder)
    setValueIfNotEqual(input_wis, statblock.abilities.wisScore, input_wis.placeholder)
    setValueIfNotEqual(input_cha, statblock.abilities.chaScore, input_cha.placeholder)

    //Importer overrides si différents des stats calculées
    setValueIfNotEqual(input_ac, statblock.stats.ac, input_ac.placeholder)
    setValueIfNotEqual(input_hp, statblock.stats.hp, input_hp.placeholder )
    setValueIfNotEqual(input_init, statblock.stats.initiative, input_init.placeholder)
    setValueIfNotEqual(input_perception, statblock.stats.perception, input_perception.placeholder)
    setValueIfNotEqual(input_atk, statblock.stats.atk, input_atk.placeholder)
    setValueIfNotEqual(input_dcLow, statblock.stats.dc, input_dcLow.placeholder)
    setValueIfNotEqual(input_dmg, statblock.stats.dmg, input_dmg.placeholder)
    setValueIfNotEqual(input_prof, statblock.stats.prof, input_prof.placeholder)
    setValueIfNotEqual(input_cr, statblock.stats.cr, input_cr.placeholder)
    setValueIfNotEqual(input_xp, statblock.stats.xp, input_xp.placeholder)

    //Importer trained
    input_str_trained.checked = statblock.abilities.strTrained
    input_dex_trained.checked = statblock.abilities.dexTrained
    input_con_trained.checked = statblock.abilities.conTrained
    input_int_trained.checked = statblock.abilities.intTrained
    input_wis_trained.checked = statblock.abilities.wisTrained
    input_cha_trained.checked = statblock.abilities.chaTrained

    featureManager.RemoveAllFeatures()
    statblock.features.forEach(feature => {
        featureManager.AddFeatureLineFrom(feature)
    })

    updatePreview()
    
    input_importJson.value = ""
}

function updatePreview(){
   prepareMonster()
   statblockSortie.Show("info-prev")
}

function getStats(){
    const level:number = Number(input_level.value)
    const rank:Rank = <Rank>Number(input_rank.value)
    const role:Role = <Role>Number(input_role.value)
    const attributes:AbilityAttr[] = getAttributesOrderForMonster()
    const monsterMaker = new StatsGenerator();

    const input = new MonsterInput(level, rank, role, attributes, this.getAttributesForMonster());
    const output = monsterMaker.getMonsterStats(input)

    input_ac.placeholder = String(output.ac)
    input_hp.placeholder = String(output.hp)
    input_init.placeholder = String(output.initMod)
    input_perception.placeholder = String(output.passivePercept)
    input_speed.placeholder = String(output.speed)
    input_tSaves.value = String(output.tSaves)

    input_atk.placeholder = String(output.atkBonus)
    input_dcLow.placeholder = String(output.dcBonus)
    input_dmg.placeholder = String(output.dmg)
    info_damage_avg.placeholder = String(output.dmg)
    input_prof.placeholder = String(output.prof)
    input_cr.placeholder = String(output.cr)
    input_xp.placeholder = String(output.xp)

    statblockSortie.abilities = {
        strScore: output.strScore,
        strTrained: input_str_trained.checked,
        dexScore: output.dexScore,
        dexTrained: input_dex_trained.checked,
        conScore: output.conScore,
        conTrained: input_con_trained.checked,
        intScore: output.intScore,
        intTrained: input_int_trained.checked,
        wisScore: output.wisScore,
        wisTrained: input_wis_trained.checked,
        chaScore: output.chaScore,
        chaTrained: input_cha_trained.checked,
        abilityRanks: attributes
    }

    for (let i = 1; i <= 6; i++) {
        let attributeInput = getInputById("attr" + i)
        let attributeScoreInput = getInputById("attr" + i + "score")
        if(attributeInput.value != ""){
            attributeScoreInput.placeholder = String(getAbilityScoreFor(i))
        }
        else {
            attributeScoreInput.placeholder = ""
        }
    }

    calculateDamage()
}

/* ABILITY SCORE DISTRIBUTION LOGIC */
function initAbilityScoresSelection() {
    for (let i = 1; i <= 6; i++) {
        let element = getInputById("attr" + i)
        element.value="0"
        element.addEventListener('change', () => {
            abilityScoreOnChange(i)
        })
    }
}

function abilityScoreOnChange(indexChanged: number) {
    getStats()
}

function getAttributesOrderForMonster():AbilityAttr[] {
    let order : AbilityAttr[] = new Array()
    for (let i = 1; i <= 6; i++) {
        let attribute = getInputById("attr" + i)
        if(attribute.value != ""){
            order.push(<AbilityAttr>attribute.value)
        }
    }
    return order
}

function getAttributesForMonster():Number[] {
    let attributes : (Number|null)[] = new Array()
    for (let i = 1; i <= 6; i++) {
        let attribute = getInputById("attr" + i + "score")
        if(attribute.value === ""){
            attributes.push(null)
        } 
        else {
            attributes.push(Number(attribute.value))
        }
    }
    return attributes
}

//GENERER LE CONTENU DES DROPDOWN LIST SELON LES ENUMS
function initSelectLists(){
    getSelectByIdFromEnum<Rank>("rank", Rank, Rank.Grunt)
    getSelectByIdFromEnum<Role>("role", Role, Role.Striker)
    getSelectByIdFromEnum<StatblockType>("type", StatblockType, StatblockType.Monster)
    getSelectByIdFromEnum<Size>("size", Size, Size.Medium)
    getSelectByIdFromEnum<MonsterType>("monstertype", MonsterType, MonsterType.Humanoid)
    getSelectByIdFromEnum<AbilityAttr>("attr1", AbilityAttr, AbilityAttr.Low) 
    getSelectByIdFromEnum<AbilityAttr>("attr2", AbilityAttr, AbilityAttr.Low) 
    getSelectByIdFromEnum<AbilityAttr>("attr3", AbilityAttr, AbilityAttr.Low) 
    getSelectByIdFromEnum<AbilityAttr>("attr4", AbilityAttr, AbilityAttr.Low) 
    getSelectByIdFromEnum<AbilityAttr>("attr5", AbilityAttr, AbilityAttr.Low) 
    getSelectByIdFromEnum<AbilityAttr>("attr6", AbilityAttr, AbilityAttr.Low) 

    getSelectByIdFromEnum<DiceType>("info-dam-dice", DiceType, DiceType.D6) 
}

//Pour exportation JSON
function prepareMonster() {
    getStats()
    statblockSortie.type = <StatblockType>input_type.value
    statblockSortie.header = {
        name: getValueOrPlaceholder(input_name),
        level: Number(input_level.value),
        rank: Number(input_rank.value),
        role: Number(input_role.value),
        keywords: input_keywords.value,
        other: input_other.value,
        size: <Size>input_size.value,
        monstertype: <MonsterType>input_monstertype.value
    }
    statblockSortie.stats = {
        ac: Number(getValueOrPlaceholder(input_ac)),
        hp: Number(getValueOrPlaceholder(input_hp)),
        initiative: Number(getValueOrPlaceholder(input_init)),
        perception: Number(getValueOrPlaceholder(input_perception)),
        atk: Number(getValueOrPlaceholder(input_atk)),
        dc: Number(getValueOrPlaceholder(input_dcLow)),
        dmg: Number(getValueOrPlaceholder(input_dmg)),
        prof: Number(getValueOrPlaceholder(input_prof)),
        cr: getValueOrPlaceholder(input_cr),
        xp: Number(getValueOrPlaceholder(input_xp)),
        speed: input_movement.value,
        skills: input_skills.value,
        dThreshold: input_threshold.value,
        vulnerable: input_vulnerable.value,
        resistant: input_resistant.value,
        dImmune: input_dImmune.value,
        cImmune: input_cImmune.value,
        senses: input_senses.value,
        languages: input_languages.value,
        items: input_items.value,
        reach: input_reach.value,
        range: input_range.value
    }

    statblockSortie.abilities = {
        strScore: Number(getValueOrPlaceholder(getInputById("attr1score"))),
        dexScore: Number(getValueOrPlaceholder(getInputById("attr2score"))),
        conScore: Number(getValueOrPlaceholder(getInputById("attr3score"))),
        intScore: Number(getValueOrPlaceholder(getInputById("attr4score"))),
        wisScore: Number(getValueOrPlaceholder(getInputById("attr5score"))),
        chaScore: Number(getValueOrPlaceholder(getInputById("attr6score"))),
        strTrained: statblockSortie.abilities.strTrained,
        dexTrained: statblockSortie.abilities.dexTrained,
        conTrained: statblockSortie.abilities.conTrained,
        intTrained: statblockSortie.abilities.intTrained,
        wisTrained: statblockSortie.abilities.wisTrained,
        chaTrained: statblockSortie.abilities.chaTrained,
        abilityRanks: statblockSortie.abilities.abilityRanks
    }

    statblockSortie.features = featureManager.GetFeatures()
}

function infoPannelInit(){
    const infoPannel = document.getElementById("info-pannel")
    info_damage_formula.disabled = true
    info_damage_range.disabled = true

    infoPannel.querySelectorAll(`
    #${info_damage_avg.id}, 
    #${info_damage_dice.id}, 
    #${info_damage_maxDices.id}, 
    #${info_damage_maxStatic.id},
    #${info_damage_multiplier.id}`).forEach(element => {
        element.addEventListener('change', () => {
            calculateDamage()
        })
    });

    showInfo(info_stats.id)
    calculateDamage()
}

function calculateDamage(){
    const damage = Number(getValueOrPlaceholder(info_damage_avg)) * Number(getValueOrPlaceholder(info_damage_multiplier))
    const resultat = DamageCalculator(
        damage, 
        Number(info_damage_dice.value),
        Number(getValueOrPlaceholder(info_damage_maxDices)),
        Number(getValueOrPlaceholder(info_damage_maxStatic)))
    info_damage_formula.value = resultat.formula
    info_damage_range.value = resultat.range
}

function showInfo(id: string){
    if(id === info_damage.id){
        showElement(info_damage, "flex")
        hideElement(info_preview)
        hideElement(info_stats)
    }
    else if(id === info_preview.id) {
        hideElement(info_damage)
        showElement(info_preview, "flex")
        hideElement(info_stats)
    }
    else if(id === info_stats.id) {
        hideElement(info_damage)
        hideElement(info_preview)
        showElement(info_stats, "flex")
    }
}

function quickTemplateClick(idTemplate: string){
    featureManager.AddFeatureLineFrom(featureManager.templates[idTemplate])
    updatePreview()
}

function getAbilityScoreFor(order: number): number{
    let score: number = 0
    switch (order) {
        case 1:
            score = statblockSortie.abilities.strScore
            break;
        case 2:
            score = statblockSortie.abilities.dexScore
            break;
        case 3:
            score = statblockSortie.abilities.conScore
            break;   
        case 4:
            score = statblockSortie.abilities.intScore
            break;   
        case 5:
            score = statblockSortie.abilities.wisScore
            break;   
        case 6:
            score = statblockSortie.abilities.chaScore
            break;   
        default:
            break;
    }
    return score
}