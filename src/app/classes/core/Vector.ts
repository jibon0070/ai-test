export class Vector {
  constructor(public x: number, public y: number) {
  }

  add(vector: Vector, delta_time: number | null = null) {
    if (delta_time) {
      this.x += vector.x / delta_time;
      this.y += vector.y / delta_time;
    } else {
      this.x += vector.x;
      this.y += vector.y;
    }
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
      if (this.y>0)
      this.y = number;
      else
        this.y = -number;
    }
  }
}
