import itemDetailMap from "./data/itemDetailMap.json";
import enhancementLevelTotalMultiplierTable from "./data/enhancementLevelTotalMultiplierTable.json";

class Equipment {
    constructor(hrid, enhancementLevel) {
        this.hrid = hrid;
        let gameItem = itemDetailMap[this.hrid];
        if (!gameItem) {
            throw new Error("No equipment found for hrid: " + this.hrid);
        }
        this.gameItem = gameItem;
        this.enhancementLevel = enhancementLevel;
    }

    static createFromDTO(dto) {
        let equipment = new Equipment(dto.hrid, dto.enhancementLevel);

        return equipment;
    }

    getCombatStat(combatStat) {
        let multiplier = enhancementLevelTotalMultiplierTable[this.enhancementLevel];

        let bonus = multiplier * this.gameItem.equipmentDetail.combatEnhancementBonuses[combatStat];

        // From the game guide: As an exception, jewelry enhancements receives a 5x the normal bonus.
        // For instance, a +1 enhancement on jewelry is a 10% bonus.
        const jewelryTypes = ['/equipment_types/neck', '/equipment_types/earrings', '/equipment_types/ring'];
        if (this.gameItem.equipmentDetail.type in jewelryTypes) {
            bonus = bonus * 5;
        }

        let stat = this.gameItem.equipmentDetail.combatStats[combatStat] + bonus;

        return stat;
    }

    getCombatStyle() {
        return this.gameItem.equipmentDetail.combatStats.combatStyleHrids[0];
    }

    getDamageType() {
        return this.gameItem.equipmentDetail.combatStats.damageType;
    }
}

export default Equipment;
