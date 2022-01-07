function getAllEnumKeys(enumType:any) { return Object.keys(enumType).filter(key => isNaN(Number(key)))}
function getAllEnumValues(enumType:any) { return getAllEnumKeys(enumType).map(key => enumType[key])}
function getAllEnumEntries(enumType:any) { return getAllEnumKeys(enumType).map(key => [key, enumType[key]])}