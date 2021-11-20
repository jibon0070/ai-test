export class Vector {
  constructor(public x: number = 0, public y: number = 0) {
  }

  add(vector: Vector, delta_time: number | null = null) {
    if (delta_time) {
      this.x += vector.x / delta_time;
      this.y += vector.y / delta_time;
    } else {
      this.x += vector.x;
      this.y += vector.y;
    }
    return this;
  }

  static from_angle(angle: number) {
    return new Vector(Math.cos(angle), Math.sin(angle));
  }

  limit(number: number) {
    if (Math.abs(this.x) > number) {
      if (this.x > 0)
        this.x = number;
      else
        this.x = -number;
    }
    if (Math.abs(this.y) > number) {
      if (this.y > 0)
        this.y = number;
      else
        this.y = -number;
    }
  }

  static distance(vector1: Vector, vector2: Vector) {
    const a = vector1.x - vector2.x;
    const b = vector1.y - vector2.y;
    return Math.sqrt(a * a + b * b);
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  static does_collide(position: Vector, size1: Vector, position2: Vector, size2: Vector): boolean {

    if (
      position.y < position2.y + size2.y &&
      position.x < position2.x + size2.x &&
      position.x + size1.x > position2.x &&
      position.y + size1.y > position2.y
    ) {

      // //top of the ball
      // if (position.y < position2.y + size2.y && position.y + size1.y > position2.y + size2.y / 2 && (position2.x > position2.x && position.x - size1.x < position2.x+ size2.x)) {
      //   position.y = position2.y + size2.y
      // }
      // //bottom of the ball
      // if (position.y + size1.y > position2.y && position.y < position2.y + size2.y / 2 && (position2.x> position2.x && position.x - size1.x < position2.x+ size2.x)) {
      //   position.y = position2.y - size1.y
      // }
      // // right of the ball
      // if (position.x + size1.x > position2.x && position.x > position2.x / size2.x) {
      //   position.x = position2.x - size1.x
      // }
      return true;
    }
    return false;
  }

  reverse() {
    this.x *= -1;
    this.y *= -1;
  }
}
