import CombatEvent from "./combatEvent";

class DamageOverTimeTickEvent extends CombatEvent {
    static type = "damageOverTimeTick";

    constructor(time, sourceRef, target, damage, totalTicks, currentTick, abilityType) {
        super(DamageOverTimeTickEvent.type, time);

        // Calling it 'source' would wrongly clear bleeds when the source dies
        this.sourceRef = sourceRef;
        this.target = target;
        this.damage = damage;
        this.totalTicks = totalTicks;
        this.currentTick = currentTick;
        this.abilityType = abilityType;
    }
}

export default DamageOverTimeTickEvent;
