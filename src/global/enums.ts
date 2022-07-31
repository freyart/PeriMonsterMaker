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
    Low,
    Mid,
    High,
}

enum TrainedValue {
    Untrained,
    Half,
    Trained,
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

enum MonsterType {
    Aberration, 
    Beast, 
    Celestial, 
    Construct, 
    Dragon, 
    Elemental, 
    Fey, 
    Fiend, 
    Giant, 
    Humanoid, 
    Monstrosity, 
    Ooze, 
    Plant, 
    Undead, 
    Other
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