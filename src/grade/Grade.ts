import {
  SmartContract,
  State,
  state,
  method,
  Character,
  Field,
  Provable,
} from 'o1js';

export class Grade extends SmartContract {
  @state(Character) grade = State<Character>();

  init() {
    super.init();
  }

  @method get(score: Field) {
    score.assertGreaterThanOrEqual(0);
    const grade = Provable.switch(
      [
        score.greaterThanOrEqual(80),
        score.greaterThanOrEqual(70).and(score.lessThan(80)),
        score.greaterThanOrEqual(60).and(score.lessThan(70)),
        score.greaterThanOrEqual(50).and(score.lessThan(60)),
        score.lessThan(50),
      ],
      Character,
      [
        Character.fromString('A'),
        Character.fromString('B'),
        Character.fromString('C'),
        Character.fromString('D'),
        Character.fromString('F'),
      ]
    );
    this.grade.set(grade);
  }
}
