import CombatEvent from "./combatEvent";

class CastTimeReadyEvent extends CombatEvent {
    static type = "castTimeReady";

    constructor(time, source, ability) {
        super(CastTimeReadyEvent.type, time);
        this.source = source;
        this.ability = ability;
    }
}

export default CastTimeReadyEvent;
