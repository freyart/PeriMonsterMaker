interface Enum {
    [id: number|string]: string
}

enum Rank {
    Minion = 0,
    Grunt = 1,
    Elite = 2,
    "Paragon vs. 3" = 3,
    "Paragon vs. 4" = 4,
    "Paragon vs. 5" = 5,
    "Paragon vs. 6" = 6,
}

enum Role {
    None = 0,
    Controller = 1,
    Defender = 2,
    Lurker = 3,
    Scout = 4,
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

enum StatblockType {
    Monster = "monster", 
    Hazard = "hazard", 
    Npc = "npc"
}

enum Size {
    Tiny, 
    Small, 
    Medium, 
    Large, 
    Huge, 
    Gargantuan
}

enum Origin {
    Aberrant, Arcane, Corrupted, Elemental, Fey, Immortal, Natural, Spiritual
}

enum Form {
    Animate, Beast, Hazard, Humanoid, Monstrosity
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