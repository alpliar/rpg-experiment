import { PersonEventDetail } from "./models/customEvents.model";
import { BehaviorEvent } from "./models/event.model";
imyarn devport { OverworldMap } from "./OverworldMap";
import { Person } from "./Person";

interface OverworldEventProps {
  map: OverworldMap;
  event: BehaviorEvent;
}

export class OverworldEvent {
  map: OverworldMap;
  event: BehaviorEvent;

  constructor({ event, map }: OverworldEventProps) {
    this.event = event;
    this.map = map;
  }

  stand(resolve: (value: unknown) => void) {
    const who = this.map.gameObjects[this.event.who!] as Person;
    who.startBehavior(
      {
        arrow: this.event.direction,
        map: this.map,
      },
      {
        type: "stand",
        direction: this.event.direction,
        time: this.event.time,
      }
    );

    //TODO: Do not infer params
    const completeHandler = (e: CustomEvent<PersonEventDetail>) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener(
          "PersonStandComplete",
          () => completeHandler
        );
        resolve(true);
      }
    };
    document.addEventListener("PersonStandComplete", () => completeHandler);
  }

  walk(resolve: (value: unknown) => void) {
    const who = this.map.gameObjects[this.event.who!] as Person;
    who.startBehavior(
      {
        arrow: this.event.direction,
        map: this.map,
      },
      {
        type: "walk",
        direction: this.event.direction,
        retry: true,
      }
    );

    //TODO: Do not infer params
    const completeHandler = (e: CustomEvent): void => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener(
          "PersonWalkingComplete",
          () => completeHandler
        );
        resolve(true);
      }
    };
    document.addEventListener(
      "PersonWalkingComplete",
      completeHandler as (e: Event) => void
    );
  }

  init() {
    return new Promise((resolve) => {
      if (this.event.type === "stand") this.stand(resolve);
      if (this.event.type === "walk") this.walk(resolve);
    });
  }
}
