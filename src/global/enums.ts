interface Enum {
    [id: number|string]: string
}

enum Rank {
    Minion = 0,
    Grunt = 1,
    Elite = 2,
    "Paragon T3" = 3,
    "Paragon T4" = 4,
    "Paragon T5" = 5,
    "Paragon T6" = 6,
    "Paragon T7" = 7,
}

enum Role {
    Controller = 1,
    Defender = 2,
    Lurker = 3,
    Skirmisher = 4,
    Striker = 5,
    Supporter = 6,
}

enum Ability {
    None = '',
    Strength = 'str',
    Dexterity = 'dex',
    Constitution = 'con',
    Intelligence = 'int',
    Wisdom = 'wis',
    Charisma = 'cha',
}

enum AbilityAttr {
    Low = "low",
    Mid = "mid",
    High = "high",
}

enum StatblockType {
    Monster = "monster", 
    Hazard = "hazard", 
    Npc = "npc"
}

enum Size {
    Tiny = "tiny", 
    Small = "small", 
    Medium = "medium", 
    Large = "large", 
    Huge = "huge", 
    Gargantuan = "gargantuan"
}

enum MonsterType {
    Aberration = "aberration", 
    Beast = "beast", 
    Celestial = "celestial", 
    Construct = "construct", 
    Dragon = "dragon", 
    Elemental = "elemental", 
    Fey = "fey", 
    Fiend = "fiend", 
    Giant = "giant", 
    Humanoid = "humanoid", 
    Monstrosity = "monstrosity", 
    Ooze = "ooze", 
    Plant = "plant", 
    Undead = "undead", 
    Hazard = "hazard",
    Other = "other"
}

enum FeatureType {
    Trait,
    Trigger,
    Free, 
    Bonus,
    Action, 
    Reaction, 
    Countermeasure,
    Salvage
}

enum FeatureRarity {
    Common,
    Uncommon,
    Rare,
    Other,
    Text,
}

enum DiceType {
    D4 = 4,
    D6 = 6,
    D8 = 8,
    D10 = 10,
    D12 = 12,
    D20 = 20,
    D100 = 100
}