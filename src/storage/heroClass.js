export class Hero {
  constructor(
    id,
    name,
    imgUrl,
    int,
    str,
    spd,
    dur,
    pwr,
    cbt,
    bio,
    appearance,
    work
  ) {
    this.id = id;
    this.name = name;
    this.imgUrl = imgUrl;
    this.int = int;
    this.str = str;
    this.spd = spd;
    this.dur = dur;
    this.pwr = pwr;
    this.cbt = cbt;
    this.alg = bio.alignment;
    this.appearance = appearance;
    this.bio = bio;
    this.work = work;
  }
}
